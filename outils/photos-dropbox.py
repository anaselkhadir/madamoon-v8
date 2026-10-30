#!/usr/bin/env python3
"""
Ajouter aux robes les photographies de la Dropbox qui manquaient.

Les fiches ne montraient que trois vues par robe, souvent moins, alors
que la maison en a envoyé davantage — jusqu'à une cinquantaine pour
Pendant. La mariée doit pouvoir voir la robe sous tous les angles.

Le script lit un inventaire (robe → photographies nouvelles, déjà
dédoublonnées et appariées aux vues existantes), produit chaque
nouvelle vue par le pipeline média, et les ajoute à la suite des vues
existantes : l'ordre et les numéros des vues déjà en ligne ne bougent
pas — couvertures, vignettes et ouvertures restent justes.

    uv run --with pillow python outils/photos-dropbox.py inventaire.json
"""

import json
import re
import sys
import tempfile
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

from PIL import Image, ImageOps

sys.path.insert(0, str(Path(__file__).resolve().parent))
import medias  # noqa: E402

Image.MAX_IMAGE_PIXELS = None
RACINE = Path(__file__).resolve().parent.parent
MADAMOON = RACINE / "lib" / "madamoon.ts"


def une(tache):
    source, base = tache
    # Le pipeline ne lit pas l'orientation EXIF : une photographie prise
    # en portrait sortirait couchée. On la redresse d'abord.
    with Image.open(source) as im:
        orientation = im.getexif().get(0x0112, 1)
    if orientation != 1:
        with Image.open(source) as im:
            droite = ImageOps.exif_transpose(im).convert("RGB")
        tmp = Path(tempfile.gettempdir()) / f"{base}.png"
        droite.save(tmp)
        source = str(tmp)
    return base, medias.produire(Path(source), base)


def main():
    inventaire = json.loads(Path(sys.argv[1]).read_text())
    res, fichiers = inventaire["res"], inventaire["fic"]
    manifeste, avant, apres = medias.lire_manifeste()

    taches, places = [], {}
    for slug, info in res.items():
        if not info["nouvelles"]:
            continue
        existantes = manifeste[slug]
        # « robe-de-mariee-{coupe}-{slug}-{n} » : la coupe se relit sur
        # le nom de la première vue.
        prefixe = re.sub(r"-\d+$", "", existantes[0]["name"])
        for i, f in enumerate(info["nouvelles"], len(existantes) + 1):
            base = f"{prefixe}-{i}"
            taches.append((fichiers[f], base))
            places[base] = (slug, i)

    fiches = {}
    with ProcessPoolExecutor(max_workers=6) as pool:
        for base, fiche in pool.map(une, taches):
            fiches[base] = fiche
            print(f"   {base:<52} {fiche['w']}×{fiche['h']}", flush=True)

    comptes = {}
    for base, (slug, i) in sorted(places.items(), key=lambda kv: (kv[1][0], kv[1][1])):
        manifeste[slug].append(fiches[base])
        comptes[slug] = len(manifeste[slug])
    medias.ecrire_manifeste(manifeste, avant, apres)

    # Le nombre de vues de chaque robe, dans le catalogue.
    t = MADAMOON.read_text()
    for slug, n in comptes.items():
        t, k = re.subn(rf'(slug: "{re.escape(slug)}",(?:(?!\n  \}},).)*?vues: )\d+',
                       rf"\g<1>{n}", t, count=1, flags=re.S)
        if not k:
            print(f"   ! vues introuvables pour {slug}")
    MADAMOON.write_text(t)
    print(f"{len(taches)} photographies ajoutées à {len(comptes)} robes")


if __name__ == "__main__":
    main()
