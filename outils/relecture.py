"""
Le document de relecture de l'anglais.

Il met en regard, phrase par phrase, le français et l'anglais tels
qu'ils paraissent sur le site — non tels qu'ils sont écrits dans le
dictionnaire. C'est une différence qui compte : la cliente relit ce
qu'elle verra, ponctuation et accords compris, et non des clefs.

La matière vient de out/, donc d'une compilation faite :

    PAGES=1 npx next build
    python3 outils/relecture.py

Les deux versions d'une même page rendent la même suite de blocs de
texte, dans le même ordre. On les aligne donc par différence — les
blocs identiques, un nom de robe, un prix, servent d'ancres — et l'on
ne garde que ce qui diffère : le reste n'a rien à relire.

Une page par modèle, pas les soixante fiches : elles partagent toutes le
même gabarit, et relire soixante fois la même phrase n'apprend rien.

Le HTML produit est publié en Artifact, avec la capacité « db » : la
cliente marque, ses marques sont gardées, et se relisent ensuite.
"""

from __future__ import annotations

import difflib
import html
import json
import re
from pathlib import Path

RACINE = Path(__file__).resolve().parent.parent
OUT = RACINE / "out"

COUPLES = [
    ("L’accueil", "/", "index.html", "en/index.html"),
    ("Toutes les robes", "/robes", "robes/index.html", "en/dresses/index.html"),
    ("Une robe", "/robes/uma", "robes/uma/index.html", "en/dresses/uma/index.html"),
    ("Les coupes", "/coupes", "coupes/index.html", "en/silhouettes/index.html"),
    ("Une coupe", "/coupes/sirene", "coupes/sirene/index.html", "en/silhouettes/mermaid/index.html"),
    ("Les morphologies", "/morphologies", "morphologies/index.html", "en/body-shapes/index.html"),
    ("Une morphologie", "/morphologies/a", "morphologies/a/index.html", "en/body-shapes/a/index.html"),
    ("Une maison", "/createurs/olya-mak", "createurs/olya-mak/index.html", "en/designers/olya-mak/index.html"),
    ("Le showroom", "/showroom", "showroom/index.html", "en/showroom/index.html"),
    ("La maison", "/a-propos", "a-propos/index.html", "en/about/index.html"),
    ("Le rendez-vous", "/rendez-vous", "rendez-vous/index.html", "en/appointment/index.html"),
    ("Trouver ma robe", "/trouver-ma-robe", "trouver-ma-robe/index.html", "en/find-my-dress/index.html"),
    ("Les coups de cœur", "/coups-de-coeur", "coups-de-coeur/index.html", "en/favourites/index.html"),
]


def nettoie(t: str) -> str:
    return re.sub(r"<script.*?</script>|<style.*?</style>|<svg.*?</svg>|<!--.*?-->", " ", t, flags=re.S)


def decoupe(t: str) -> list[str]:
    morceaux = [html.unescape(x).strip() for x in re.split(r"<[^>]+>", t)]
    return [re.sub(r"\s+", " ", x) for x in morceaux if x.strip()]


def blocs(fichier: Path, zone: str) -> list[str]:
    m = re.search(rf"<{zone}.*?>(.*)</{zone}>", fichier.read_text(), re.S)
    return decoupe(nettoie(m.group(1))) if m else []


def hors_main(fichier: Path) -> list[str]:
    t = re.sub(r"<main.*?</main>", " ", nettoie(fichier.read_text()), flags=re.S)
    m = re.search(r"<body.*?>(.*)</body>", t, re.S)
    return decoupe(m.group(1) if m else t)


def apparie(a: list[str], b: list[str]) -> list[dict[str, str]]:
    """Aligne deux suites de blocs, même quand l'une en compte plus."""
    s = difflib.SequenceMatcher(None, a, b, autojunk=False)
    sorties: list[dict[str, str]] = []
    for op, i1, i2, j1, j2 in s.get_opcodes():
        if op == "equal":
            continue
        gauche, droite = a[i1:i2], b[j1:j2]
        for k in range(max(len(gauche), len(droite))):
            sorties.append(
                {
                    "fr": gauche[k] if k < len(gauche) else "",
                    "en": droite[k] if k < len(droite) else "",
                }
            )
    return sorties


def meta(fichier: Path) -> tuple[str, str]:
    t = fichier.read_text()
    ti = re.search(r"<title>(.*?)</title>", t, re.S)
    de = re.search(r'<meta name="description" content="([^"]*)"', t)
    return (
        html.unescape(ti.group(1)).strip() if ti else "",
        html.unescape(de.group(1)).strip() if de else "",
    )


def recolte() -> dict:
    if not OUT.exists():
        raise SystemExit("out/ est absent — compiler d'abord : PAGES=1 npx next build")

    sections = [
        {
            "id": "cadre",
            "titre": "Sur toutes les pages",
            "note": "L’en-tête, le menu, le pied de page. Relu une fois, il vaut pour toutes les pages.",
            "adresse": "",
            "lignes": apparie(hors_main(OUT / "index.html"), hors_main(OUT / "en/index.html")),
        }
    ]
    entetes = []
    for i, (titre, adresse, fr, en) in enumerate(COUPLES):
        f, e = OUT / fr, OUT / en
        a, b = blocs(f, "main"), blocs(e, "main")
        if not a:
            a, b = decoupe(nettoie(f.read_text())), decoupe(nettoie(e.read_text()))
        sections.append(
            {"id": f"p{i}", "titre": titre, "note": "", "adresse": adresse, "lignes": apparie(a, b)}
        )
        tf, df = meta(f)
        te, de = meta(e)
        entetes.append(
            {"page": titre, "adresse": adresse, "titreFr": tf, "titreEn": te, "descFr": df, "descEn": de}
        )

    return {
        "sections": sections,
        "meta": entetes,
        "total": sum(len(s["lignes"]) for s in sections),
    }


def main() -> int:
    d = recolte()
    sortie = RACINE / "relecture-anglaise.json"
    sortie.write_text(json.dumps(d, ensure_ascii=False, indent=1))
    print(f"{d['total']} phrases, {len(d['sections'])} sections → {sortie.name}")
    for s in d["sections"]:
        print(f"   {s['titre']:26} {len(s['lignes']):4}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
