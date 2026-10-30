#!/usr/bin/env python3
"""
Le pipeline média des robes.

Il prend les photographies telles que la maison les envoie et produit ce
que le site sait servir : trois formats (AVIF, WebP, JPEG), quatre
largeurs, et un aperçu flouté de vingt pixels de haut inscrit dans le
manifeste. Il met ensuite `lib/medias.ts` à jour — seulement pour les
robes traitées, les autres ne sont pas touchées.

Il n'existait pas : le manifeste portait la mention « généré par le
pipeline média » sans que le pipeline soit versionné nulle part. La
première mise à jour de photographies l'a fait redécouvrir de zéro.

    uv run --with pillow python outils/medias.py demande.json

Le fichier de demande est une liste d'objets :

    [{"slug": "mira", "coupe": "sirene", "sources": ["/chemin/1.jpg", …]}]

L'ordre des sources est l'ordre des vues. La première est celle que
l'accueil, les tuiles et les catalogues montrent : une robe entière, de
face.
"""

import base64
import io
import json
import re
import sys
from pathlib import Path

from PIL import Image

RACINE = Path(__file__).resolve().parent.parent
SORTIE = RACINE / "public" / "robes"
MANIFESTE = RACINE / "lib" / "medias.ts"

# L'échelle du site. On ne monte jamais au-dessus de la source : une
# image agrandie ne montre rien de plus et pèse davantage.
LARGEURS = [480, 800, 1200, 1700]
# Le repli JPEG s'arrête à mille pixels : il ne sert que les navigateurs
# qui ignorent les deux autres formats, et ceux-là ne sont plus sur des
# écrans à forte densité.
PLAFOND_JPEG = 1000

QUALITES = {"avif": 55, "webp": 78, "jpg": 82}


def echelle(largeur_source, plafond=None):
    """
    Les largeurs à produire pour une source donnée.

    L'échelle fixe ne suffisait pas : une photographie de 700 pixels ne
    tombait que sur 480 — la seule marche en dessous d'elle —, et le
    site servait donc 480 pixels d'une image qui en avait 700. Étirée
    sur un écran, elle paraissait floue. La largeur de la source est
    maintenant produite elle aussi, sauf si une marche l'approche déjà
    de très près : deux fichiers presque identiques ne valent pas leur
    poids.
    """
    haut = min(largeur_source, plafond) if plafond else largeur_source
    tenues = [w for w in LARGEURS if w <= haut]
    # On n'ajoute la largeur native que si la source reste sous le haut
    # de l'échelle : au-delà, l'échelle est un plafond voulu, et un
    # fichier de 3 840 pixels n'a rien à faire sur un site.
    if not tenues or (haut < LARGEURS[-1] and haut > tenues[-1] * 1.05):
        tenues.append(haut)
    return tenues


def apercu(im):
    """
    L'aperçu flouté, vingt pixels de haut, en WebP inscrit dans le
    manifeste. Vingt pixels tiennent en deux cents octets et suffisent à
    poser une couleur sous l'image le temps qu'elle arrive.
    """
    h = 20
    w = max(1, round(im.width * h / im.height))
    petit = im.convert("RGB").resize((w, h), Image.LANCZOS)
    tampon = io.BytesIO()
    petit.save(tampon, "WEBP", quality=60, method=6)
    return "data:image/webp;base64," + base64.b64encode(tampon.getvalue()).decode()


def produire(source, base):
    """Écrit toutes les déclinaisons d'une photographie. Rend sa fiche."""
    with Image.open(source) as brut:
        im = brut.convert("RGB")
        w, h = im.size
        largeurs = echelle(w)
        jpgw = echelle(w, PLAFOND_JPEG)
        for cible in sorted(set(largeurs) | set(jpgw)):
            hauteur = max(1, round(h * cible / w))
            vue = im.resize((cible, hauteur), Image.LANCZOS)
            if cible in largeurs:
                vue.save(SORTIE / f"{base}-{cible}.avif", "AVIF", quality=QUALITES["avif"])
                vue.save(SORTIE / f"{base}-{cible}.webp", "WEBP",
                         quality=QUALITES["webp"], method=6)
            if cible in jpgw:
                vue.save(SORTIE / f"{base}-{cible}.jpg", "JPEG",
                         quality=QUALITES["jpg"], optimize=True, progressive=True)
        return {"name": base, "w": w, "h": h, "widths": largeurs,
                "blur": apercu(im), "jpgw": jpgw}


def lire_manifeste():
    """Le manifeste actuel, et les deux morceaux de texte qui l'entourent."""
    t = MANIFESTE.read_text()
    debut = t.index("export const ROBE_MEDIAS")
    ouvrante = t.index("{", debut)
    profondeur, i = 0, ouvrante
    for i in range(ouvrante, len(t)):
        if t[i] == "{":
            profondeur += 1
        elif t[i] == "}":
            profondeur -= 1
            if profondeur == 0:
                break
    return json.loads(t[ouvrante:i + 1]), t[:ouvrante], t[i + 1:]


def ecrire_manifeste(donnees, avant, apres):
    MANIFESTE.write_text(avant + json.dumps(donnees, ensure_ascii=False, indent=2) + apres)


def main():
    demande = json.loads(Path(sys.argv[1]).read_text())
    SORTIE.mkdir(parents=True, exist_ok=True)
    manifeste, avant, apres = lire_manifeste()

    for robe in demande:
        slug, coupe, sources = robe["slug"], robe["coupe"], robe["sources"]
        # Les anciennes déclinaisons partent : leurs largeurs ne sont pas
        # celles des nouvelles, et un fichier orphelin dans public/ finit
        # toujours par être servi à quelqu'un.
        for ancien in manifeste.get(slug, []):
            for f in SORTIE.glob(f"{ancien['name']}-*"):
                f.unlink()
        vues = []
        for i, src in enumerate(sources, 1):
            base = f"robe-de-mariee-{coupe}-{slug}-{i}"
            vues.append(produire(Path(src), base))
            print(f"   {base:<44} {vues[-1]['w']}×{vues[-1]['h']} → {vues[-1]['widths']}")
        manifeste[slug] = vues
        print(f"{slug} : {len(vues)} vue(s)\n")

    ecrire_manifeste(manifeste, avant, apres)
    print(f"{MANIFESTE} mis à jour ({len(manifeste)} robes)")


if __name__ == "__main__":
    main()
