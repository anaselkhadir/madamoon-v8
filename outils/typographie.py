"""
La typographie française, appliquée aux chaînes de caractères.

Le français pose une espace avant les signes doubles. Une espace fine
insécable devant « ? ! ; » et après « « », une insécable ordinaire devant
« : ». Sans elles, le point d'interrogation tombe seul en début de ligne
et la citation s'ouvre sur un blanc cassable.

L'outil ne touche qu'à l'intérieur des chaînes de caractères, et
seulement à celles qui portent de la prose. C'est la leçon de deux
tentatives : un « ? » de ternaire transformé en « ? » à espace fine, et
un « (max-width: 700px) » devenu une requête média invalide.

Les commentaires sont masqués avant la lecture. Une apostrophe française
— « ce qu'il faut » — ouvre une chaîne aux yeux d'une expression
régulière, et la phrase entière se retrouvait réécrite.

Il ne touche pas non plus à l'anglais, qui ne veut aucune de ces espaces.
Dans lib/textes.ts, seule la table française est traitée.

    python3 outils/typographie.py            # signale
    python3 outils/typographie.py --ecrire   # corrige
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent

FINE = " "  # espace fine insécable
DURE = " "  # espace insécable

# Les chaînes : guillemets droits et gabarits. Pas les apostrophes —
# elles appartiennent au français bien plus souvent qu'au code.
CHAINES = re.compile(r'"(?:[^"\\\n]|\\.)*"' r"|`(?:[^`\\]|\\.)*`")

# Les commentaires, masqués avant tout le reste.
COMMENTAIRES = re.compile(r"/\*.*?\*/|//[^\n]*", re.S)

# Ce qui n'est pas de la prose : adresses, requêtes média, tailles,
# sélecteurs, classes utilitaires. Une phrase a des espaces et ne
# commence pas par une parenthèse.
TECHNIQUE = re.compile(
    r"://|^[(.#/@\[]|\d(px|vw|vh|svh|rem|em|%)|max-width|min-width|clamp\(|application/|image/"
)


def prose(contenu: str) -> bool:
    """Une chaîne vaut d'être corrigée si elle se lit."""
    return " " in contenu and not TECHNIQUE.search(contenu)
# Les interpolations d'un gabarit : du code, on n'y touche pas.
TROU = re.compile(r"\$\{[^}]*\}")


def corrige(texte: str) -> str:
    """Pose la bonne espace devant les signes doubles, insécable.

    Les règles absorbent l'espace déjà présente au lieu d'en ajouter une
    seconde : passer l'outil deux fois de suite ne change rien.
    """
    t = texte
    # Devant ? ! ; — une fine insécable, quelle que soit l'espace en place.
    t = re.sub(r"([^\s])[ \u00a0\u202f]*([?!;])", r"\1" + FINE + r"\2", t)
    # Devant : — une insécable ordinaire. Ni « 12:30 » ni « https:// ».
    t = re.sub(r"([^\s:/])[ \u00a0\u202f]*(:)(?=\s|$)", r"\1" + DURE + r"\2", t)
    # Au dedans des guillemets français.
    t = re.sub(r"«[\s\u00a0\u202f]*", "«" + FINE, t)
    t = re.sub(r"[\s\u00a0\u202f]*»", FINE + "»", t)
    return t


def traite(source: str) -> str:
    def surChaine(m: re.Match[str]) -> str:
        brut = m.group(0)
        if not prose(brut[1:-1]):
            return brut
        # Les trous d'un gabarit sont mis de côté puis remis en place.
        trous: list[str] = []

        def garde(x: re.Match[str]) -> str:
            trous.append(x.group(0))
            return f"\x00{len(trous) - 1}\x00"

        abrite = TROU.sub(garde, brut)
        abrite = corrige(abrite)
        return re.sub(r"\x00(\d+)\x00", lambda x: trous[int(x.group(1))], abrite)

    # Les commentaires sont mis de côté le temps de la lecture.
    gardes: list[str] = []

    def masque(m: re.Match[str]) -> str:
        gardes.append(m.group(0))
        return f"\x01{len(gardes) - 1}\x01"

    sans = COMMENTAIRES.sub(masque, source)
    sans = CHAINES.sub(surChaine, sans)
    return re.sub(r"\x01(\d+)\x01", lambda x: gardes[int(x.group(1))], sans)


def region_francaise(source: str) -> tuple[int, int] | None:
    """Dans le dictionnaire, la table française et elle seule."""
    debut = source.find("const FR = {")
    fin = source.find("const EN: Textes = {")
    return (debut, fin) if debut != -1 and fin != -1 else None


def main() -> int:
    ecrire = "--ecrire" in sys.argv
    fichiers = [
        *sorted((RACINE / "components").rglob("*.tsx")),
        *sorted((RACINE / "app").rglob("*.tsx")),
        RACINE / "lib" / "textes.ts",
        RACINE / "lib" / "madamoon.ts",
        RACINE / "lib" / "morphologies.ts",
    ]
    touches = 0
    for f in fichiers:
        if not f.exists() or "/en/" in str(f) or "(en)" in str(f):
            continue
        source = f.read_text()
        if f.name == "textes.ts":
            bornes = region_francaise(source)
            if not bornes:
                continue
            d, fi = bornes
            neuf = source[:d] + traite(source[d:fi]) + source[fi:]
        else:
            neuf = traite(source)
        if neuf != source:
            touches += 1
            print(f"  {f.relative_to(RACINE)}")
            if ecrire:
                f.write_text(neuf)
    print(f"{touches} fichier(s) {'corrigés' if ecrire else 'à corriger'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
