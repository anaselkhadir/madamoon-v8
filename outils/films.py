#!/usr/bin/env python3
"""
Les films du site : départ rapide, et rien de noir dans l'image.

Deux défauts relevés sur téléphone :

— les deux films du hero portaient leur index en fin de fichier. Un
  navigateur ne peut alors rien afficher avant d'avoir téléchargé le
  fichier entier : quatre mégaoctets sur un réseau mobile avant la
  première image. L'index remonte en tête, et la lecture commence après
  quelques dizaines de kilooctets ;

— le film mobile était une image de 720 × 900 rembourrée de cent
  quatre-vingt-dix pixels de noir en haut et en bas, dans un cadre de
  720 × 1280. « object-fit: cover » remplit bien la boîte, mais avec un
  contenu qui porte ses bandes : elles se voyaient à l'écran, alors que
  l'affiche qui précède le film est un vrai portrait sans bande. On les
  retire.

    uv run --with av python outils/films.py

Le film du bureau est simplement recopié — même flux, même qualité,
seul l'ordre des atomes change. Celui du téléphone est réencodé, parce
que recadrer change les pixels.
"""

import os
import pathlib

import av

RACINE = pathlib.Path(__file__).resolve().parent.parent
FILMS = RACINE / "public" / "film"

# La qualité constante plutôt qu'un débit imposé : les plans lents du
# hero n'ont pas besoin du même débit que les plans qui bougent.
# Vingt-neuf rend un fichier du poids de l'original : le défaut à
# corriger était le départ, pas l'image. À trente et un, le blocage se
# voyait dans les aplats de peau.
CRF = os.environ.get("CRF_FILMS", "29")
PRESET = "slow"


def index_en_tete(fichier: pathlib.Path):
    """
    Remonte l'index (« moov ») devant les données.

    Aucun pixel n'est touché : les paquets sont recopiés tels quels.
    """
    entree = av.open(str(fichier))
    provisoire = fichier.with_suffix(".rapide.mp4")
    sortie = av.open(str(provisoire), mode="w",
                     options={"movflags": "+faststart"})
    flux = {}
    for s in entree.streams:
        if s.type in ("video", "audio"):
            flux[s.index] = sortie.add_stream_from_template(s)
    for paquet in entree.demux(list(flux)):
        if paquet.dts is None:
            continue
        paquet.stream = flux[paquet.stream.index]
        sortie.mux(paquet)
    sortie.close()
    entree.close()
    provisoire.replace(fichier)


def bandes(fichier: pathlib.Path, seuil=18):
    """Les bandes noires de la première image, en pixels."""
    c = av.open(str(fichier))
    image = next(c.decode(video=0)).to_ndarray(format="gray")
    c.close()
    h, w = image.shape
    haut = 0
    while haut < h and image[haut].max() < seuil:
        haut += 1
    bas = 0
    while bas < h and image[h - 1 - bas].max() < seuil:
        bas += 1
    return haut, bas, w, h


def recadrer(fichier: pathlib.Path, haut: int, bas: int):
    """Réencode le film sans ses bandes, index en tête."""
    entree = av.open(str(fichier))
    v = entree.streams.video[0]
    largeur, hauteur = v.codec_context.width, v.codec_context.height - haut - bas
    # Les encodeurs demandent des dimensions paires.
    hauteur -= hauteur % 2

    provisoire = fichier.with_suffix(".neuf.mp4")
    sortie = av.open(str(provisoire), mode="w",
                     options={"movflags": "+faststart"})
    piste = sortie.add_stream("libx264", rate=v.average_rate)
    piste.width, piste.height = largeur, hauteur
    piste.pix_fmt = "yuv420p"
    piste.options = {"crf": CRF, "preset": PRESET, "profile": "high"}
    piste.time_base = v.time_base

    graphe = av.filter.Graph()
    source = graphe.add_buffer(template=v)
    coupe = graphe.add("crop", f"{largeur}:{hauteur}:0:{haut}")
    puits = graphe.add("buffersink")
    source.link_to(coupe)
    coupe.link_to(puits)
    graphe.configure()

    for image in entree.decode(video=0):
        graphe.push(image)
        while True:
            try:
                coupee = graphe.pull()
            except (av.BlockingIOError, av.EOFError):
                break
            for p in piste.encode(coupee):
                sortie.mux(p)
    for p in piste.encode():
        sortie.mux(p)
    sortie.close()
    entree.close()
    provisoire.replace(fichier)


def poids(f):
    return f.stat().st_size / 1048576


def main():
    for f in sorted(FILMS.glob("*.mp4")):
        avant = poids(f)
        h, b, w, ht = bandes(f)
        if h + b > 2:
            print(f"  {f.name:<20} bandes {h}/{b} sur {w}×{ht} → recadrage")
            recadrer(f, h, b)
        else:
            index_en_tete(f)
            print(f"  {f.name:<20} index remonté")
        print(f"  {'':<20} {avant:.2f} Mo → {poids(f):.2f} Mo")


if __name__ == "__main__":
    main()
