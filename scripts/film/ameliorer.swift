import AVFoundation
import CoreImage
import CoreImage.CIFilterBuiltins
import Foundation

// Usage : ameliorer <entrée.mp4> <sortie.mp4> <affiche.png>
// 720p -> 1080p (Lanczos), bandes noires retirées plan par plan,
// léger débruitage puis renfort de netteté, H.264 sans le son.

let args = CommandLine.arguments
let entree = URL(fileURLWithPath: args[1])
let sortie = URL(fileURLWithPath: args[2])
let affiche = URL(fileURLWithPath: args[3])
try? FileManager.default.removeItem(at: sortie)

let LARGEUR = 1920.0, HAUTEUR = 1080.0
let DEBIT = 5_200_000

let asset = AVURLAsset(url: entree)
let sem = DispatchSemaphore(value: 0)
var piste: AVAssetTrack!
var fps: Float = 24
Task {
  piste = try await asset.loadTracks(withMediaType: .video).first!
  fps = try await piste.load(.nominalFrameRate)
  sem.signal()
}
sem.wait()

let lecteur = try AVAssetReader(asset: asset)
let sortieLecteur = AVAssetReaderTrackOutput(
  track: piste,
  outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA])
lecteur.add(sortieLecteur)

let ecrivain = try AVAssetWriter(outputURL: sortie, fileType: .mp4)
ecrivain.shouldOptimizeForNetworkUse = true
let reglages: [String: Any] = [
  AVVideoCodecKey: AVVideoCodecType.h264,
  AVVideoWidthKey: Int(LARGEUR),
  AVVideoHeightKey: Int(HAUTEUR),
  AVVideoColorPropertiesKey: [
    AVVideoColorPrimariesKey: AVVideoColorPrimaries_ITU_R_709_2,
    AVVideoTransferFunctionKey: AVVideoTransferFunction_ITU_R_709_2,
    AVVideoYCbCrMatrixKey: AVVideoYCbCrMatrix_ITU_R_709_2,
  ],
  AVVideoCompressionPropertiesKey: [
    AVVideoAverageBitRateKey: DEBIT,
    AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
    AVVideoMaxKeyFrameIntervalKey: 48,
    AVVideoExpectedSourceFrameRateKey: Int(fps.rounded()),
    AVVideoAllowFrameReorderingKey: true,
    AVVideoH264EntropyModeKey: AVVideoH264EntropyModeCABAC,
  ],
]
let entreeEcrivain = AVAssetWriterInput(mediaType: .video, outputSettings: reglages)
entreeEcrivain.expectsMediaDataInRealTime = false
let adaptateur = AVAssetWriterInputPixelBufferAdaptor(
  assetWriterInput: entreeEcrivain,
  sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: Int(LARGEUR),
    kCVPixelBufferHeightKey as String: Int(HAUTEUR),
  ])
ecrivain.add(entreeEcrivain)

let espace = CGColorSpace(name: CGColorSpace.itur_709)!
let contexte = CIContext(options: [.workingColorSpace: espace, .outputColorSpace: espace])

// Un plan porte des bandes noires si ses premières et dernières lignes sont noires.
func bandes(_ tampon: CVPixelBuffer) -> Bool {
  CVPixelBufferLockBaseAddress(tampon, .readOnly)
  defer { CVPixelBufferUnlockBaseAddress(tampon, .readOnly) }
  let base = CVPixelBufferGetBaseAddress(tampon)!.assumingMemoryBound(to: UInt8.self)
  let pas = CVPixelBufferGetBytesPerRow(tampon)
  let l = CVPixelBufferGetWidth(tampon), h = CVPixelBufferGetHeight(tampon)
  func moyenne(_ y: Int) -> Double {
    var s = 0
    var n = 0
    var x = 0
    while x < l {
      let p = base + y * pas + x * 4
      s += Int(p[0]) + Int(p[1]) + Int(p[2])
      n += 3
      x += 8
    }
    return Double(s) / Double(n)
  }
  return moyenne(12) < 14 && moyenne(24) < 14 && moyenne(h - 13) < 14 && moyenne(h - 25) < 14
}

func traiter(_ tampon: CVPixelBuffer) -> CIImage {
  let l = Double(CVPixelBufferGetWidth(tampon)), h = Double(CVPixelBufferGetHeight(tampon))
  var image = CIImage(cvPixelBuffer: tampon, options: [.colorSpace: espace])
  // Le cadre utile : sans les bandes (36 px en haut et en bas), rogné sur
  // les côtés pour garder le 16:9 ; sinon l'image entière.
  var cadre = CGRect(x: 0, y: 0, width: l, height: h)
  if bandes(tampon) {
    let hu = h - 72
    let lu = (hu * LARGEUR / HAUTEUR).rounded()
    cadre = CGRect(x: ((l - lu) / 2).rounded(), y: 36, width: lu, height: hu)
  }
  image = image.cropped(to: cadre).transformed(
    by: CGAffineTransform(translationX: -cadre.minX, y: -cadre.minY))

  // Un débruitage léger d'abord : accentuer les blocs de compression les
  // rendrait visibles.
  let bruit = CIFilter.noiseReduction()
  bruit.inputImage = image.clampedToExtent()
  bruit.noiseLevel = 0.012
  bruit.sharpness = 0.35
  image = bruit.outputImage!.cropped(to: CGRect(x: 0, y: 0, width: cadre.width, height: cadre.height))

  let echelle = CIFilter.lanczosScaleTransform()
  echelle.inputImage = image.clampedToExtent()
  echelle.scale = Float(HAUTEUR / cadre.height)
  echelle.aspectRatio = Float((LARGEUR / cadre.width) / (HAUTEUR / cadre.height))
  image = echelle.outputImage!

  let net = CIFilter.sharpenLuminance()
  net.inputImage = image
  net.sharpness = 0.45
  net.radius = 1.6
  image = net.outputImage!

  let masque = CIFilter.unsharpMask()
  masque.inputImage = image
  masque.radius = 2.4
  masque.intensity = 0.3
  image = masque.outputImage!

  return image.cropped(to: CGRect(x: 0, y: 0, width: LARGEUR, height: HAUTEUR))
}

lecteur.startReading()
ecrivain.startWriting()
ecrivain.startSession(atSourceTime: .zero)

var n = 0
var avecBandes = 0
let file = DispatchQueue(label: "film")
let fin = DispatchSemaphore(value: 0)
entreeEcrivain.requestMediaDataWhenReady(on: file) {
  while entreeEcrivain.isReadyForMoreMediaData {
    guard let echantillon = sortieLecteur.copyNextSampleBuffer(),
      let tampon = CMSampleBufferGetImageBuffer(echantillon)
    else {
      entreeEcrivain.markAsFinished()
      fin.signal()
      return
    }
    let t = CMSampleBufferGetPresentationTimeStamp(echantillon)
    if bandes(tampon) { avecBandes += 1 }
    let image = traiter(tampon)
    var cible: CVPixelBuffer?
    CVPixelBufferPoolCreatePixelBuffer(nil, adaptateur.pixelBufferPool!, &cible)
    contexte.render(image, to: cible!, bounds: CGRect(x: 0, y: 0, width: LARGEUR, height: HAUTEUR), colorSpace: espace)
    if n == 0 {
      let cg = contexte.createCGImage(image, from: CGRect(x: 0, y: 0, width: LARGEUR, height: HAUTEUR))!
      let dest = CGImageDestinationCreateWithURL(affiche as CFURL, "public.png" as CFString, 1, nil)!
      CGImageDestinationAddImage(dest, cg, nil)
      CGImageDestinationFinalize(dest)
    }
    adaptateur.append(cible!, withPresentationTime: t)
    n += 1
  }
}
fin.wait()
let fini = DispatchSemaphore(value: 0)
ecrivain.finishWriting { fini.signal() }
fini.wait()
print("images: \(n), avec bandes: \(avecBandes), fps: \(fps), statut: \(ecrivain.status.rawValue), erreur: \(String(describing: ecrivain.error))")
