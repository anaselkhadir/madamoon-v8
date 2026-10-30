"""
Refaire les affiches du hero à partir de la première image du film.

L'affiche doit être exactement l'image sur laquelle la vidéo démarre :
sans cela, le passage de la photo à la vidéo se voit comme un saut.

On travaille depuis la source 4K, jamais depuis l'encodage : le rognage
portrait et les réductions y gagnent en netteté.

sips, fourni par macOS, écrit l'AVIF et le JPEG mais pas le WebP ;
OpenCV écrit le WebP. À eux deux ils couvrent les trois formats.

    outils/.venv/bin/python outils/affiches-hero.py
"""

import base64
import pathlib
import subprocess

import cv2

SOURCE = "/Users/mac/Desktop/madamoon files /Anas EL KHADIR - web site/2573- Meredith.mp4"
SCENES = pathlib.Path("/Users/mac/Desktop/madamoon-v7/public/scenes")
TEMPO = pathlib.Path("/tmp/affiches-hero")

AFFICHES = [
    # nom, largeur, hauteur, largeurs AVIF/WebP, largeurs JPEG
    ("hero-affiche", 1600, 900, [640, 1000, 1500], [640, 1000]),
    ("hero-affiche-mobile", 720, 1280, [480, 720], [480, 720]),
]


def cadrer(image, largeur, hauteur):
    """Rogner au centre au bon rapport, puis réduire."""
    h, w = image.shape[:2]
    if w / h > largeur / hauteur:
        c = int(h * largeur / hauteur)
        image = image[:, (w - c) // 2 : (w - c) // 2 + c]
    else:
        c = int(w * hauteur / largeur)
        image = image[(h - c) // 2 : (h - c) // 2 + c, :]
    return cv2.resize(image, (largeur, hauteur), interpolation=cv2.INTER_AREA)


def apercu(image):
    """Les vingt pixels de l'aperçu, en WebP, en data-URI."""
    h, w = image.shape[:2]
    petit = cv2.resize(image, (20, max(1, round(20 * h / w))), interpolation=cv2.INTER_AREA)
    ok, tampon = cv2.imencode(".webp", petit, [cv2.IMWRITE_WEBP_QUALITY, 72])
    assert ok
    return "data:image/webp;base64," + base64.b64encode(tampon).decode()


capture = cv2.VideoCapture(SOURCE)
ok, image = capture.read()          # la première image du film
capture.release()
assert ok, "source illisible"
TEMPO.mkdir(exist_ok=True)

manifeste = {}
for nom, largeur, hauteur, formats, jpegs in AFFICHES:
    maitre = cadrer(image, largeur, hauteur)
    for l in sorted(set(formats) | set(jpegs)):
        petit = cv2.resize(maitre, (l, round(l * hauteur / largeur)), interpolation=cv2.INTER_AREA)
        if l in jpegs:
            cv2.imwrite(str(SCENES / f"{nom}-{l}.jpg"), petit, [cv2.IMWRITE_JPEG_QUALITY, 80])
        if l in formats:
            cv2.imwrite(str(SCENES / f"{nom}-{l}.webp"), petit, [cv2.IMWRITE_WEBP_QUALITY, 76])
            source = TEMPO / f"{nom}-{l}.png"
            cv2.imwrite(str(source), petit)
            subprocess.run(
                ["sips", "-s", "format", "avif", "-s", "formatOptions", "55",
                 str(source), "--out", str(SCENES / f"{nom}-{l}.avif")],
                check=True, capture_output=True)
    manifeste[nom] = dict(name=nom, w=largeur, h=hauteur, widths=formats,
                          blur=apercu(maitre), jpgw=jpegs)
    print(f"  {nom} {largeur}×{hauteur} : {sorted(set(formats) | set(jpegs))}")

import json
pathlib.Path("/tmp/affiches-hero/manifeste.json").write_text(json.dumps(manifeste, indent=2))
print("TERMINÉ")
