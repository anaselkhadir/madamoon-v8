#!/usr/bin/env python3
"""
Les films du site en HD, repris des originaux 4K.

Les premiers encodages sortaient du 720p à un peu plus d'un mégabit — et
le hero en 1600 × 900 à 1,2 Mb/s, étalé sur tout l'écran : le blocage se
voyait dans la dentelle, précisément ce qu'on vient regarder. Les
originaux sont en 3840 × 2160 ; on repart d'eux, jamais des fichiers du
site, pour ne pas compresser une compression.

    uv run --with av python outils/films-hd.py            # tout
    uv run --with av python outils/films-hd.py hero-mobile tessa

— le hero du bureau passe en 1920 × 1080, celui du téléphone en
  1080 × 1350 : la largeur d'un écran de téléphone en pixels réels ;
— les extraits des fiches passent en 1920 × 1080.

La qualité est constante (CRF) mais plafonnée : un plan très animé ne
fait pas exploser le débit, et la lecture démarre toujours vite sur un
réseau mobile. L'index est en tête (« faststart ») : la première image
arrive après quelques dizaines de kilooctets.

Les points d'entrée des extraits ont été retrouvés image par image dans
les originaux, pour que chaque film montre exactement le même plan
qu'avant.
"""

import pathlib
import sys
from fractions import Fraction

import av

RACINE = pathlib.Path(__file__).resolve().parent.parent
FILMS = RACINE / "public" / "film"
SOURCES = pathlib.Path("/Users/mac/Desktop/madamoon files /Anas EL KHADIR - web site")

# nom : (source, début en s, nombre d'images, recadrage (x, y, l, h) ou
# None pour l'image entière, largeur, hauteur, crf, plafond en kb/s)
FILMS_HD = {
    # Le cadre du bureau resserre l'original d'un cinquième, centré :
    # c'est le cadre validé sur le site, on le garde.
    "hero-desktop": ("2573- Meredith.mp4", 0.0, 1271, (320, 180, 3200, 1800), 1920, 1080, 21, 7000),
    # Le portrait du téléphone : toute la hauteur, 1728 pixels de large,
    # la même fenêtre que l'ancien film — la mariée au centre.
    "hero-mobile": ("2573- Meredith.mp4", 0.0, 1271, (1056, 0, 1728, 2160), 1080, 1350, 22, 4500),
    "ariel": ("BL444 - Ariel.mp4", 21.980, 169, None, 1920, 1080, 21, 7000),
    "escalier": ("2561-Addison.mp4", 5.797, 141, None, 1920, 1080, 21, 7000),
    "meredith": ("2573- Meredith.mp4", 20.020, 168, None, 1920, 1080, 21, 7000),
    "montana": ("BL441 Montana.mov", 10.0, 168, None, 1920, 1080, 21, 7000),
    "solana": ("BL452 -Solana.mp4", 23.982, 169, None, 1920, 1080, 21, 7000),
    "tessa": ("2565 - Tessa.mp4", 18.018, 168, None, 1920, 1080, 21, 7000),
    "venus": ("BL456- Venus.mp4", 14.014, 168, None, 1920, 1080, 21, 7000),
    # Seraphina est filmée en portrait, en 60 images par seconde : le
    # téléphone la garde entière, l'ordinateur en prend une bande au
    # format paysage centrée à 30 % de la hauteur — les visages et le
    # corsage. Les deux passent à 30 images par seconde.
    "seraphina": ("/Users/mac/Desktop/Anas EL KHADIR - web site/Seraphina vidéo.mp4", 0.0, 396, (0, 545, 2160, 1215), 1920, 1080, 21, 7000),
    "seraphina-mobile": ("/Users/mac/Desktop/Anas EL KHADIR - web site/Seraphina vidéo.mp4", 0.0, 396, None, 1080, 1920, 22, 4500),
}


def encoder(nom):
    source, debut, images, coupe, largeur, hauteur, crf, plafond = FILMS_HD[nom]
    entree = av.open(str(SOURCES / source))
    v = entree.streams.video[0]
    v.thread_type = "AUTO"

    provisoire = FILMS / f"{nom}.hd.mp4"
    sortie = av.open(str(provisoire), mode="w", options={"movflags": "+faststart"})
    # Au-delà de 40 images par seconde, on n'en garde qu'une sur deux :
    # un film muet en boucle n'a rien à gagner à soixante.
    pas = 2 if v.average_rate > 40 else 1
    cadence = v.average_rate / pas
    piste = sortie.add_stream("libx264", rate=cadence)
    piste.width, piste.height = largeur, hauteur
    piste.pix_fmt = "yuv420p"
    piste.time_base = Fraction(1, 1) / cadence
    piste.options = {
        "crf": str(crf),
        "preset": "slow",
        "tune": "film",
        "profile": "high",
        "maxrate": f"{plafond}k",
        "bufsize": f"{plafond * 2}k",
        # Une image clé toutes les deux secondes : la boucle et la reprise
        # après une pause repartent sans attendre.
        "g": str(round(cadence * 2)),
        "x264-params": "colorprim=bt709:transfer=bt709:colormatrix=bt709",
    }

    graphe = av.filter.Graph()
    tampon = graphe.add_buffer(template=v)
    maillons = [tampon]
    if coupe:
        x, y, l, h = coupe
        maillons.append(graphe.add("crop", f"{l}:{h}:{x}:{y}"))
    maillons.append(graphe.add("scale", f"{largeur}:{hauteur}:flags=lanczos"))
    maillons.append(graphe.add("format", "yuv420p"))
    maillons.append(graphe.add("buffersink"))
    for a, b in zip(maillons, maillons[1:]):
        a.link_to(b)
    graphe.configure()

    if debut > 1:
        entree.seek(int((debut - 1) / v.time_base), stream=v)

    rendues = 0
    lues = 0
    for image in entree.decode(v):
        if image.time is None or image.time < debut - 0.02:
            continue
        lues += 1
        if (lues - 1) % pas:
            continue
        graphe.push(image)
        while True:
            try:
                prete = graphe.pull()
            except (av.BlockingIOError, av.EOFError):
                break
            prete.pts = rendues
            prete.time_base = Fraction(1, 1) / cadence
            for p in piste.encode(prete):
                sortie.mux(p)
            rendues += 1
        if rendues >= images:
            break
    for p in piste.encode():
        sortie.mux(p)
    sortie.close()
    entree.close()
    provisoire.replace(FILMS / f"{nom}.mp4")
    taille = (FILMS / f"{nom}.mp4").stat().st_size / 1048576
    print(f"  {nom:<14} {largeur}×{hauteur}  {rendues} images  {taille:.1f} Mo", flush=True)


if __name__ == "__main__":
    for nom in sys.argv[1:] or FILMS_HD:
        encoder(nom)
