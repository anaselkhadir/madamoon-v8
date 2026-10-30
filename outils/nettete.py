#!/usr/bin/env python3
"""
Rendre aux petites photographies leur pleine définition.

L'échelle des largeurs ne comptait que 480, 800, 1200 et 1700 pixels.
Une photographie de 700 pixels ne tombait donc que sur 480 : le site en
servait 480, étirés sur tout l'écran d'une fiche. D'où le flou que la
maison a vu.

« echelle() » produit désormais aussi la largeur native. Ce script
refait les vues concernées depuis leurs originaux — appariés à l'image
près — et met le manifeste à jour.

    uv run --with pillow python outils/nettete.py apparier.json
"""

import json
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageOps

sys.path.insert(0, str(Path(__file__).resolve().parent))
import medias  # noqa: E402

Image.MAX_IMAGE_PIXELS = None


def redresser(chemin: str) -> Path:
    """L'orientation EXIF n'est pas lue par le pipeline : on la fixe."""
    with Image.open(chemin) as im:
        if im.getexif().get(0x0112, 1) == 1:
            return Path(chemin)
        droite = ImageOps.exif_transpose(im).convert("RGB")
    tmp = Path(tempfile.mkdtemp()) / "source.png"
    droite.save(tmp)
    return tmp


def main():
    appariement = json.loads(Path(sys.argv[1]).read_text())
    manifeste, avant, apres = medias.lire_manifeste()

    refaites = 0
    for nom, fiche in appariement.items():
        if not fiche.get("source"):
            continue
        slug = fiche["slug"]
        vues = manifeste.get(slug, [])
        place = next((i for i, v in enumerate(vues) if v["name"] == nom), None)
        if place is None:
            continue

        ancienne = vues[place]
        neuve = medias.produire(redresser(fiche["source"]), nom)
        if neuve["widths"] == ancienne["widths"]:
            continue
        vues[place] = neuve
        refaites += 1
        print(f"   {nom:<52} {ancienne['widths']} → {neuve['widths']}", flush=True)

    medias.ecrire_manifeste(manifeste, avant, apres)
    print(f"{refaites} vue(s) refaites")


if __name__ == "__main__":
    main()
