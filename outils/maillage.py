#!/usr/bin/env python3
"""
Le maillage interne de MADAMOON, en arbre radial.

Il lit le site tel qu'il est construit — pas les intentions, les pages —
et dessine qui mène à quoi. L'en-tête, le pied, le menu plein écran et
le panneau d'Élise sont écartés : leurs liens sont sur les
quatre-vingt-sept pages et ne disent rien du maillage. Ce qui reste est
le lien éditorial, celui qu'un moteur pèse.

Le document porte l'identité d'ANVSLAB et non celle de MADAMOON : c'est
un livrable d'agence sur le site d'une cliente, pas une pièce du site.
Même grille que le cahier des charges — seize-neuvièmes, fond blanc,
intertitres en mono espacé sous un filet, titre en néo-grotesque, signal
orangé pour ce qui compte.

    uv run --with reportlab --with fonttools python outils/maillage.py

Rend public/maillage-interne-madamoon.pdf.
"""

import json
import math
import os
import pathlib
import re
import sys
from collections import Counter
from html.parser import HTMLParser

from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as pdfcanvas

RACINE = pathlib.Path(__file__).resolve().parent.parent
SORTIE = RACINE / "public" / "maillage-interne-madamoon.pdf"
POLICES = os.environ.get("POLICES_ANVSLAB", "")
BASE = "/madamoon-v7"

PO = 72  # un pouce
# Seize-neuvièmes, comme le cahier des charges.
LARGEUR, HAUTEUR = 13.333 * PO, 7.5 * PO
MX, MY = 0.85 * PO, 0.62 * PO
CW = LARGEUR - 2 * MX

# Les jetons du système ANVSLAB.
SNOW = (1, 1, 1)
INK = (0, 0, 0)
PANEL = (0.957, 0.957, 0.957)
LINE = (0.878, 0.878, 0.878)
FOG = (0.412, 0.412, 0.412)
DIM = (0.604, 0.604, 0.604)
SIGNAL = (1, 0.176, 0)
NIGHT = (0.051, 0.051, 0.051)

SANS = "AnvsSans"
SANS_M = "AnvsSansMoyen"
SANS_G = "AnvsSansGras"
MONO = "AnvsMono"


# Le système ANVSLAB compose en Geist ; à défaut, en néo-grotesque et en
# mono du système. Les fichiers ne sont pas versionnés — ce sont des
# polices Apple, qui ne se redistribuent pas — mais extraits à la volée
# dans un dossier temporaire.
COLLECTIONS = {
    SANS: ("HelveticaNeue.ttc", "Helvetica Neue", "Regular"),
    SANS_M: ("HelveticaNeue.ttc", "Helvetica Neue", "Medium"),
    SANS_G: ("HelveticaNeue.ttc", "Helvetica Neue", "Bold"),
    MONO: ("Menlo.ttc", "Menlo", "Regular"),
}


def polices():
    dossier = pathlib.Path(POLICES) if POLICES else pathlib.Path(
        os.environ.get("TMPDIR", "/tmp")) / "polices-anvslab"
    dossier.mkdir(parents=True, exist_ok=True)
    for nom, (collection, famille, style) in COLLECTIONS.items():
        chemin = dossier / f"{nom}.ttf"
        if not chemin.exists():
            source = pathlib.Path("/System/Library/Fonts") / collection
            if not source.exists():
                sys.exit(f"Police introuvable : {source}\n"
                         "Déposez les .ttf dans un dossier et définissez POLICES_ANVSLAB.")
            from fontTools.ttLib import TTCollection
            c = TTCollection(str(source))
            f = next((f for f in c.fonts
                      if f["name"].getDebugName(1) == famille
                      and f["name"].getDebugName(2) == style), None)
            if f is None:
                sys.exit(f"{famille} {style} absente de {collection}.")
            f.flavor = None
            f.save(str(chemin))
        pdfmetrics.registerFont(TTFont(nom, str(chemin)))


def espace(c, texte, x, y, police, corps, couleur, ecart=1.6):
    """
    Le mono espacé des intertitres.

    L'interlettrage appartient à l'état de page dans un PDF : posé une
    fois, il vaut pour tout ce qui suit. On le remet donc à zéro avant de
    rendre la main.
    """
    c.saveState()
    c.setFillColorRGB(*couleur)
    t = c.beginText()
    t.setTextOrigin(x, y)
    t.setFont(police, corps)
    t.setCharSpace(ecart)
    t.textLine(texte)
    t.setCharSpace(0)
    c.drawText(t)
    c.restoreState()


def filet(c, x, y, largeur, couleur=LINE, epaisseur=0.75):
    c.saveState()
    c.setStrokeColorRGB(*couleur)
    c.setLineWidth(epaisseur)
    c.line(x, y, x + largeur, y)
    c.restoreState()


def chapeau(c, oeil, folio):
    """L'intertitre en mono, le filet dessous, le folio en bas à droite."""
    espace(c, oeil.upper(), MX, HAUTEUR - MY - 8, MONO, 8, DIM)
    filet(c, MX, HAUTEUR - MY - 20, CW)
    espace(c, folio, LARGEUR - MX - 18, MY - 2, MONO, 8, DIM, 1.2)


# ————————————————————————————————————— la lecture du site —————

VIDES = {"br", "img", "input", "meta", "link", "hr", "source", "area",
         "base", "col", "embed", "param", "track", "wbr"}
GABARIT_ID = {"menu-principal", "mega-navigation"}


class Liens(HTMLParser):
    """
    Les liens du corps d'une page.

    Tout ce qui se répète d'une page à l'autre est sauté : l'en-tête, le
    pied, le menu, le panneau d'Élise. Sans cela, chaque page pointerait
    vers les soixante robes du menu et le graphe ne serait qu'un
    peloton.
    """

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.pile, self.saut, self.liens = [], 0, set()

    def handle_starttag(self, tag, attrs):
        if tag in VIDES:
            return
        a = dict(attrs)
        if self.saut:
            self.pile.append(tag)
            return
        exclu = (
            a.get("id") in GABARIT_ID
            or a.get("role") == "dialog"
            or tag in ("header", "footer")
            or "verre" in (a.get("class") or "")
        )
        self.pile.append(tag)
        if exclu:
            self.saut = len(self.pile)
            return
        if tag == "a" and "href" in a:
            h = a["href"]
            if h.startswith(BASE + "/") or h == BASE:
                self.liens.add(h[len(BASE):].split("?")[0].split("#")[0].rstrip("/") or "/")

    def handle_endtag(self, tag):
        if tag in VIDES:
            return
        if self.pile:
            if self.saut and len(self.pile) == self.saut:
                self.saut = 0
            self.pile.pop()


def lire_site():
    pages = {}
    titres = {}
    for f in sorted((RACINE / "out").rglob("index.html")):
        a = "/" + str(f.parent.relative_to(RACINE / "out")).replace(".", "").strip("/")
        a = "/" if a == "/" else a.rstrip("/")
        t = f.read_text(errors="ignore")
        p = Liens()
        p.feed(t)
        p.liens.discard(a)
        pages[a] = p.liens
        m = re.search(r"<title>(.*?)</title>", t, re.S)
        titres[a] = (m.group(1).split("—")[0].strip() if m else a)
    connues = set(pages)
    return {a: sorted(l & connues) for a, l in pages.items()}, titres


FIXES = {
    "/": "Accueil",
    "/robes": "Le catalogue",
    "/coupes": "Les coupes",
    "/morphologies": "Les morphologies",
    "/showroom": "Le showroom",
    "/a-propos": "La maison",
    "/trouver-ma-robe": "Trouver ma robe",
    "/rendez-vous": "Rendez-vous",
    "/coups-de-coeur": "Coups de cœur",
}


def nom_court(a, titres):
    """
    Le nom tel qu'on le dirait à voix haute.

    Les titres du site sont écrits pour les moteurs — « Robe de mariée
    pour une silhouette en A » — et n'ont pas leur place autour d'un
    schéma, où chaque étiquette dispose de sept millimètres.
    """
    if a in FIXES:
        return FIXES[a]
    dernier = a.rstrip("/").split("/")[-1]
    if a.startswith("/morphologies/"):
        return f"Silhouette {dernier.upper()}"
    t = titres.get(a, dernier).split(" — ")[0]
    if a.startswith("/robes/"):
        n = re.sub(r"^Robe de mariée\s*", "", t).strip() or dernier
        # « Clover avec ou sans perles » débordait la page à lui seul.
        return n if len(n) <= 16 else n[:15] + "…"
    if a.startswith("/coupes/"):
        return re.sub(r"^Robe de mariée\s*|\s*à Paris.*$", "", t).strip().capitalize() or dernier
    if a.startswith("/createurs/"):
        return re.sub(r"^Robes de mariée\s*|\s*à Paris.*$", "", t).strip() or dernier
    return t.strip() or dernier


# ————————————————————————————————————— l'arbre —————
#
# Le graphe réel n'est pas un arbre : une fiche robe est atteinte par sa
# coupe, sa morphologie, son créateur et ses voisines. Pour le dessiner
# en couronnes, on choisit une épine dorsale — celle que le site raconte,
# de l'accueil aux coupes, des coupes aux robes — et les liens qui la
# débordent restent lisibles dans les tailles : un cercle grossit avec le
# nombre de pages qui le tirent, quelle que soit sa branche.

def bâtir_arbre(graphe, titres):
    robes = sorted(a for a in graphe if a.startswith("/robes/"))
    coupes = sorted(a for a in graphe if a.startswith("/coupes/"))
    morphos = sorted(a for a in graphe if a.startswith("/morphologies/"))
    createurs = sorted(a for a in graphe if a.startswith("/createurs/"))
    rubriques = [a for a in ("/robes", "/showroom", "/a-propos",
                             "/trouver-ma-robe", "/rendez-vous", "/coups-de-coeur")
                 if a in graphe]

    # Chaque robe se range sous la coupe qui la présente.
    sous = {c: [] for c in coupes}
    for r in robes:
        pere = next((c for c in coupes if r in graphe[c]), None)
        if pere:
            sous[pere].append(r)
        else:
            sous.setdefault("__orphelines__", []).append(r)

    branches = []
    for c in coupes:
        branches.append({"a": c, "nom": nom_court(c, titres), "enfants": sous[c]})
    branches.append({"a": "/morphologies", "nom": "Morphologies", "enfants": morphos})
    branches.append({"a": None, "nom": "Créateurs", "enfants": createurs})
    branches.append({"a": None, "nom": "Rubriques", "enfants": rubriques})
    if sous.get("__orphelines__"):
        branches.append({"a": None, "nom": "Hors coupe",
                         "enfants": sous["__orphelines__"]})
    return branches


# ————————————————————————————————————— le dessin —————

def secteur(c, cx, cy, r0, r1, a0, a1, couleur, alpha):
    """L'éventail pâle derrière une branche."""
    c.saveState()
    c.setFillColorRGB(*couleur, alpha=alpha)
    p = c.beginPath()
    pas = max(2, int(abs(a1 - a0) / 0.04))
    p.moveTo(cx + r0 * math.cos(a0), cy + r0 * math.sin(a0))
    for i in range(pas + 1):
        a = a0 + (a1 - a0) * i / pas
        p.lineTo(cx + r1 * math.cos(a), cy + r1 * math.sin(a))
    for i in range(pas + 1):
        a = a1 + (a0 - a1) * i / pas
        p.lineTo(cx + r0 * math.cos(a), cy + r0 * math.sin(a))
    p.close()
    c.drawPath(p, stroke=0, fill=1)
    c.restoreState()


def rond(c, x, y, r, couleur, alpha=1.0):
    c.saveState()
    c.setFillColorRGB(*couleur, alpha=alpha)
    c.setStrokeColorRGB(*SNOW)
    c.setLineWidth(0.8)
    c.circle(x, y, r, stroke=1, fill=1)
    c.restoreState()


def texte_radial(c, x, y, angle, texte, police, corps, couleur):
    """Une étiquette dans l'axe de son rayon, jamais à l'envers."""
    c.saveState()
    c.setFillColorRGB(*couleur)
    c.setFont(police, corps)
    deg = math.degrees(angle)
    c.translate(x, y)
    if -90 <= ((deg + 180) % 360) - 180 <= 90:
        c.rotate(deg)
        c.drawString(0, -corps * 0.34, texte)
    else:
        c.rotate(deg + 180)
        c.drawRightString(0, -corps * 0.34, texte)
    c.restoreState()


def page_schema(c, branches, graphe, entrants, titres):
    """
    Le schéma occupe la droite, le texte la gauche.

    Le seize-neuvièmes est bas : une couronne centrée sur la page, avec un
    titre au-dessus et une légende dessous, ne laissait plus que quatre
    cents points de diamètre et coupait les étiquettes du bas. En colonne,
    le schéma retrouve toute la hauteur.
    """
    c.setFillColorRGB(*SNOW)
    c.rect(0, 0, LARGEUR, HAUTEUR, stroke=0, fill=1)
    chapeau(c, "Maillage interne  ·  madamoon.fr", "01")

    COL = 262  # la colonne de gauche

    c.setFillColorRGB(*INK)
    c.setFont(SANS, 30)
    c.drawString(MX, HAUTEUR - MY - 62, "Qui mène")
    c.drawString(MX, HAUTEUR - MY - 92, "à quoi")
    c.saveState()
    c.setFillColorRGB(*SIGNAL)
    c.rect(MX, HAUTEUR - MY - 104, 52, 3, stroke=0, fill=1)
    c.restoreState()

    liens = sum(len(v) for v in graphe.values())
    c.setFillColorRGB(*FOG)
    c.setFont(SANS, 10)
    y = HAUTEUR - MY - 132
    for l in [f"{len(graphe)} pages, {liens} liens éditoriaux,",
              f"{liens / len(graphe):.1f} par page en moyenne.",
              "",
              "L'en-tête, le pied de page, le menu et",
              "le panneau d'Élise sont exclus : leurs",
              "liens sont sur toutes les pages et ne",
              "disent rien du maillage."]:
        c.drawString(MX, y, l)
        y -= 14

    y -= 16
    espace(c, "LIRE LE SCHÉMA", MX, y, MONO, 7, DIM)
    y -= 18
    c.setFillColorRGB(*FOG)
    c.setFont(SANS, 9)
    for l in ["Le disque grossit avec le nombre de",
              "pages qui mènent à lui. Chaque robe est",
              "rangée sous la coupe qui la présente ;",
              "les autres chemins — morphologie,",
              "créateur, robes voisines — comptent",
              "dans la taille des disques."]:
        c.drawString(MX, y, l)
        y -= 12.5

    maxi = max(entrants.values()) or 1
    y -= 20
    espace(c, "LIENS ENTRANTS", MX, y, MONO, 7, DIM)
    for i, v in enumerate([2, 10, 30, maxi]):
        px = MX + i * 56
        rond(c, px + 6, y - 22, 1.5 + 5.0 * math.sqrt(v / maxi), SIGNAL)
        c.setFillColorRGB(*DIM)
        c.setFont(MONO, 7)
        c.drawCentredString(px + 6, y - 38, str(v))

    # ————— la couronne, à droite
    zone_g = MX + COL + 30
    cx = (zone_g + LARGEUR - MX) / 2
    cy = HAUTEUR / 2 - 12
    R1, R2 = 90, 156

    feuilles = sum(max(1, len(b["enfants"])) for b in branches)
    ecart = 0.55
    pas = 2 * math.pi / (feuilles + ecart * len(branches))

    def rayon(a):
        return 1.5 + 5.0 * math.sqrt(entrants.get(a, 0) / maxi)

    angle = math.pi / 2
    for b in branches:
        n = max(1, len(b["enfants"]))
        a0, a1 = angle, angle + n * pas
        milieu = (a0 + a1) / 2
        secteur(c, cx, cy, R1 + 10, R2 - 6, a0 + pas * 0.12, a1 - pas * 0.12, PANEL, 1)

        bx, by = cx + R1 * math.cos(milieu), cy + R1 * math.sin(milieu)
        c.setStrokeColorRGB(*LINE)
        c.setLineWidth(0.7)
        c.line(cx, cy, bx, by)

        for i, e in enumerate(b["enfants"]):
            af = a0 + (i + 0.5) * pas
            fx, fy = cx + R2 * math.cos(af), cy + R2 * math.sin(af)
            c.setStrokeColorRGB(*LINE)
            c.setLineWidth(0.5)
            c.line(bx, by, fx, fy)
            r = rayon(e)
            rond(c, fx, fy, r, SIGNAL)
            texte_radial(c, cx + (R2 + r + 5) * math.cos(af),
                         cy + (R2 + r + 5) * math.sin(af), af,
                         nom_court(e, titres), SANS, 6, FOG)

        rb = 7 if b["a"] is None else max(6, rayon(b["a"]) * 1.1)
        rond(c, bx, by, rb, INK)
        texte_radial(c, cx + (R1 - rb - 6) * math.cos(milieu),
                     cy + (R1 - rb - 6) * math.sin(milieu), milieu + math.pi,
                     b["nom"].upper(), SANS_G, 6.2, INK)

        angle = a1 + ecart * pas

    rond(c, cx, cy, 22, INK)
    c.setFillColorRGB(*SNOW)
    c.setFont(SANS_M, 7.4)
    c.drawCentredString(cx, cy - 2.5, "ACCUEIL")


def panneau(c, x, y, w, h, oeil, titre, corps):
    """Le bloc gris du système : label mono, titre sans, corps gris."""
    c.saveState()
    c.setFillColorRGB(*PANEL)
    c.rect(x, y, w, h, stroke=0, fill=1)
    c.restoreState()
    espace(c, oeil.upper(), x + 16, y + h - 22, MONO, 7, DIM)
    c.setFillColorRGB(*INK)
    c.setFont(SANS, 13)
    yy = y + h - 44
    for l in simpleSplit(titre, SANS, 13, w - 32):
        c.drawString(x + 16, yy, l)
        yy -= 16
    c.setFillColorRGB(*FOG)
    c.setFont(SANS, 8.6)
    yy -= 6
    for m in simpleSplit(corps, SANS, 8.6, w - 32):
        c.drawString(x + 16, yy, m)
        yy -= 12


def page_releves(c, graphe, entrants, titres):
    c.showPage()
    c.setFillColorRGB(*SNOW)
    c.rect(0, 0, LARGEUR, HAUTEUR, stroke=0, fill=1)
    chapeau(c, "Le relevé", "02")

    c.setFillColorRGB(*INK)
    c.setFont(SANS, 34)
    c.drawString(MX, HAUTEUR - MY - 58, "Ce que le schéma montre")

    compte = {a: n for a, n in entrants.items() if a not in ("/404", "/")}
    orphelines = sorted(a for a, n in compte.items() if n == 0)
    plus = sorted(compte.items(), key=lambda x: (-x[1], x[0]))[:10]
    moins = [x for x in sorted(compte.items(), key=lambda x: (x[1], x[0])) if x[1] > 0][:10]

    # ————— trois colonnes de relevés
    y = HAUTEUR - MY - 92
    largeur = (CW - 2 * 0.42 * PO) / 3
    colonnes = [
        ("Les plus tirées", [f"{n}   {nom_court(a, titres)}" for a, n in plus]),
        ("Les moins tirées", [f"{n}   {nom_court(a, titres)}" for a, n in moins]),
        ("Sans lien éditorial entrant",
         [f"—   {nom_court(a, titres)}" for a in orphelines]),
    ]
    bas = y
    for i, (titre, lignes) in enumerate(colonnes):
        x = MX + i * (largeur + 0.42 * PO)
        espace(c, titre.upper(), x, y, MONO, 7, DIM)
        yy = y - 18
        for l in lignes:
            c.setFillColorRGB(*INK)
            c.setFont(SANS, 9.6)
            c.drawString(x, yy, l)
            yy -= 14
        if i == 2:
            yy -= 4
            c.setFillColorRGB(*DIM)
            c.setFont(SANS, 8.4)
            for l in ["Atteintes par le seul gabarit —",
                      "barre, menu, pied de page."]:
                c.drawString(x, yy, l)
                yy -= 11
        bas = min(bas, yy)

    # ————— quatre panneaux de lecture
    yp = MY + 26
    hp = bas - 26 - yp
    lp = (CW - 3 * 14) / 4
    lectures = [
        ("Convergence", "Le rendez-vous tire tout le site",
         "Quatre-vingt-six pages y mènent. C'est le seul point où tous les chemins "
         "se rejoignent, et c'est ce qu'on lui demande."),
        ("Priorité", "Les morphologies portent le maillage",
         "De trente-six à cinquante-deux liens chacune, davantage que les coupes. "
         "C'est l'entrée que le site privilégie, et celle qui le distingue d'un catalogue."),
        ("Écart", "Les fiches robes ne sont pas égales",
         "De deux à vingt-quatre liens entrants. Les mieux tirées sont citées par une "
         "coupe, une morphologie et un créateur à la fois."),
        ("À corriger", "Trois pages sans lien éditorial",
         "La maison, Trouver ma robe et Coups de cœur ne sont atteintes que par le "
         "gabarit. Un lien depuis un texte leur donnerait le poids qui leur manque."),
    ]
    for i, (oeil, titre, corps) in enumerate(lectures):
        x = MX + i * (lp + 14)
        panneau(c, x, yp, lp, hp, oeil, titre, corps)
        if oeil == "À corriger":
            c.saveState()
            c.setFillColorRGB(*SIGNAL)
            c.rect(x, yp + hp - 3, lp, 3, stroke=0, fill=1)
            c.restoreState()


def main():
    polices()
    graphe, titres = lire_site()
    entrants = Counter()
    for a, ls in graphe.items():
        for l in ls:
            entrants[l] += 1
    for a in graphe:
        entrants.setdefault(a, 0)

    branches = bâtir_arbre(graphe, titres)
    c = pdfcanvas.Canvas(str(SORTIE), pagesize=(LARGEUR, HAUTEUR))
    c.setTitle("MADAMOON — Le maillage interne")
    c.setAuthor("ANVSLAB")
    page_schema(c, branches, graphe, entrants, titres)
    page_releves(c, graphe, entrants, titres)
    c.save()
    print(f"{SORTIE.relative_to(RACINE)} — {len(graphe)} pages, "
          f"{sum(len(v) for v in graphe.values())} liens, {len(branches)} branches")


if __name__ == "__main__":
    main()
