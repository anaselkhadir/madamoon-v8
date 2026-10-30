"""
Encoder la vidéo du hero, bureau et mobile.

avconvert, fourni par macOS, ne laisse pas choisir le débit : ses présets
sortaient 8,7 Mo pour dix secondes — quatre fois le poids admissible pour
un premier écran. Blender encode à débit imposé, et sait recadrer : la
version mobile est un vrai portrait, pas un rognage au centre laissé au
navigateur.

    blender --background --python outils/encoder-hero.py
"""

import bpy

SOURCE = "/Users/mac/Desktop/madamoon files /Anas EL KHADIR - web site/2573- Meredith.mp4"
SORTIE = "/Users/mac/Desktop/madamoon-v7/public/film/"

# Le film passe presque en entier : on ne retire que le carton de marque
# de la fin. Le fondu au blanc qui l'amène commence à 53,05 s — mesuré
# sur la luminance, qui saute de 104 à 150 entre 53,00 et 53,15.
DEBUT = 0.0
DUREE = 53.0   # None pour toute la durée de la source

VERSIONS = [
    ("hero-desktop", 1600, 900, 1200),
    ("hero-mobile", 720, 1280, 650),
]


def bandes(se):
    return se.strips if hasattr(se, "strips") else se.sequences


def encoder(nom, largeur, hauteur, debit):
    scene = bpy.context.scene
    if scene.sequence_editor:
        scene.sequence_editor_clear()
    se = scene.sequence_editor_create()

    b = bandes(se).new_movie(nom, SOURCE, channel=1, frame_start=1,
                             fit_method="FILL")
    ips = round(getattr(b, "fps", 0) or 25)
    scene.render.fps = ips
    scene.render.resolution_x = largeur
    scene.render.resolution_y = hauteur
    scene.render.resolution_percentage = 100
    scene.frame_start = 1
    total = b.frame_final_duration          # la longueur entière de la source
    scene.frame_end = total if DUREE is None else int(DUREE * ips)

    # Rogner la tête d'une bande décale aussi son début : il faut reculer
    # la bande d'autant pour que le plan retenu tombe sur l'image 1.
    # Sans cela, la scène rend du vide et la vidéo sort noire.
    saut = int(DEBUT * ips)
    b.frame_offset_start = saut
    b.frame_start = 1 - saut
    b.frame_final_duration = scene.frame_end
    print("   bande visible de", b.frame_final_start, "à", b.frame_final_end)

    r = scene.render
    # Blender 5 range les formats vidéo derrière un type de média :
    # sans cette ligne, FFMPEG n'existe pas dans l'énumération.
    if hasattr(r.image_settings, "media_type"):
        r.image_settings.media_type = "VIDEO"
    r.image_settings.file_format = "FFMPEG"
    r.ffmpeg.format = "MPEG4"
    r.ffmpeg.codec = "H264"
    # La qualité constante ignore le plafond et sortait 16 Mo pour la
    # minute de film. Le débit imposé rend le poids prévisible : c'est lui
    # qui décide, pas l'encodeur.
    r.ffmpeg.constant_rate_factor = "NONE"
    r.ffmpeg.ffmpeg_preset = "GOOD"
    r.ffmpeg.video_bitrate = debit
    r.ffmpeg.maxrate = int(debit * 1.5)
    r.ffmpeg.minrate = 0
    r.ffmpeg.buffersize = debit * 2
    r.ffmpeg.gopsize = ips * 2
    r.ffmpeg.audio_codec = "NONE"
    r.filepath = SORTIE + nom + "-brut"
    r.use_file_extension = True

    print("ENCODAGE", nom, largeur, "x", hauteur, "|", ips, "ips |", debit, "ko/s")
    bpy.ops.render.render(animation=True)


for v in VERSIONS:
    encoder(*v)
print("TERMINÉ")
