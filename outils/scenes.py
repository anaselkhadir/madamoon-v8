#!/usr/bin/env python3
"""
Le pipeline média des scènes.

Le jumeau de `medias.py`, pour les photographies qui ne sont pas des
robes : le showroom, l'escalier, le vitrail, la fondatrice. Elles vivent
dans `public/scenes/` et dans la table `SCENES` du manifeste, et leur
échelle n'est pas celle des robes — une scène sert souvent en pleine
largeur, et monte donc plus haut.

Il n'existait pas non plus. La table `SCENES` avait été écrite à la
main, ou par un script perdu ; la première photographie à ajouter l'a
fait redécouvrir.

    uv run --with pillow python outils/scenes.py demande.json

Le fichier de demande est une liste d'objets :

    [{"cle": "showroom", "nom": "showroom-madamoon-paris", "source": "…"}]

« cle » est la clé dans `SCENES`, celle qu'écrit le code. « nom » est le
nom des fichiers servis : il se lit dans une adresse, et Google le lit
aussi — on y met les mots de la photographie, pas un numéro d'appareil.

Une clé déjà présente est remplacée, ses anciens fichiers supprimés.

Les photographies de téléphone portent leur orientation en EXIF plutôt
que dans leurs pixels : Pillow ne la suit pas, et un portrait sortait
couché. « exif_transpose » la rend aux pixels avant tout le reste.
"""

import base64
import io
import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

RACINE = Path(__file__).resolve().parent.parent
SORTIE = RACINE / "public" / "scenes"
MANIFESTE = RACINE / "lib" / "medias.ts"

# L'échelle des scènes, plus haute que celle des robes : une scène sert
# en pleine largeur, parfois sur un écran à forte densité.
LARGEURS = [640, 1000, 1500, 2000, 2600]
# Le repli JPEG ne sert que les navigateurs qui ignorent l'AVIF et le
# WebP. Ceux-là ne sont pas sur des écrans fins.
PLAFOND_JPEG = 1000

QUALITES = {"avif": 55, "webp": 78, "jpg": 82}


def echelle(largeur_source, plafond=None):
    """Les largeurs à produire. On ne monte jamais au-dessus de la source."""
    haut = min(largeur_source, plafond) if plafond else largeur_source
    tenues = [w for w in LARGEURS if w <= haut]
    if not tenues or (haut < LARGEURS[-1] and haut > tenues[-1] * 1.05):
        tenues.append(haut)
    return tenues


def apercu(im):
    """L'aperçu flouté, vingt pixels de haut, inscrit dans le manifeste."""
    h = 20
    w = max(1, round(im.width * h / im.height))
    petit = im.convert("RGB").resize((w, h), Image.LANCZOS)
    tampon = io.BytesIO()
    petit.save(tampon, "WEBP", quality=60, method=6)
    return "data:image/webp;base64," + base64.b64encode(tampon.getvalue()).decode()


def produire(source, base):
    """Écrit toutes les déclinaisons d'une photographie. Rend sa fiche."""
    with Image.open(source) as brut:
        im = ImageOps.exif_transpose(brut).convert("RGB")
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
    """La table SCENES, et les deux morceaux de texte qui l'entourent."""
    t = MANIFESTE.read_text()
    debut = t.index("export const SCENES")
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


def main():
    demande = json.loads(Path(sys.argv[1]).read_text())
    SORTIE.mkdir(parents=True, exist_ok=True)
    scenes, avant, apres = lire_manifeste()

    for scene in demande:
        cle, nom, source = scene["cle"], scene["nom"], scene["source"]
        # Les anciennes déclinaisons partent : leurs largeurs ne sont pas
        # celles des nouvelles, et un fichier orphelin dans public/ finit
        # toujours par être servi à quelqu'un.
        ancien = scenes.get(cle)
        if ancien:
            for f in SORTIE.glob(f"{ancien['name']}-*"):
                f.unlink()
        fiche = produire(Path(source), nom)
        scenes[cle] = fiche
        print(f"   {cle:<22} {nom:<52} {fiche['w']}×{fiche['h']} → {fiche['widths']}")

    MANIFESTE.write_text(
        avant + json.dumps(scenes, ensure_ascii=False, indent=2) + apres
    )
    print(f"\n{MANIFESTE} mis à jour ({len(scenes)} scènes)")


if __name__ == "__main__":
    main()
