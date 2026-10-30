# -*- coding: utf-8 -*-
"""
Les catalogues MADAMOON, en PDF.

Un catalogue par univers : une coupe, une maison, une morphologie, une
robe. Le nom du fichier reprend le contexte du bouton du site — voir
`fichierCatalogue` dans lib/catalogue.ts — pour que le téléchargement
tombe juste sans table de correspondance.

L'identité est celle du site, reprise à la source et non réinventée :
les couleurs de app/globals.css, les deux polices de app/layout.tsx
converties depuis la construction, le logo de public/marque. Rien n'est
approché « à peu près » — un catalogue qui ne ressemble pas au site n'a
pas l'air du même atelier.

La dernière page porte un code QR vers la prise de rendez-vous. C'est la
seule raison d'être du document : on regarde des robes sur un écran, on
les essaie rue du Faubourg Saint-Martin.

    uv run --with reportlab --with segno --with pillow \
        python outils/catalogues.py
"""

import os
import re
import sys
import unicodedata

from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas as pdfcanvas
import segno

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POLICES = os.environ.get("POLICES_PDF", "")
SORTIE = os.path.join(RACINE, "public", "catalogues")

# ————————————————————————————————————————— l'identité —————

MM = 72 / 25.4
LARGEUR, HAUTEUR = A4
MARGE = 18 * MM

BLANC = (1, 1, 1)
IVOIRE = (0.992, 0.984, 0.973)
CRAIE = (0.965, 0.949, 0.925)
FIL = (0.890, 0.863, 0.820)
ENCRE = (0.078, 0.063, 0.047)
PLUME = (0.184, 0.176, 0.176)
PLOMB = (0.420, 0.394, 0.349)
BRUME = (0.659, 0.627, 0.576)
ACTION = (0.569, 0, 0)

SERIF = "MadamoonSerif"
SERIF_IT = "MadamoonSerifItalique"
SANS = "MadamoonSans"
SANS_G = "MadamoonSansGras"


def polices():
    """Les deux polices du site, converties depuis la construction.

    Inter a remplacé le Quattrocento Sans sur le site : le catalogue le
    suit, sinon le document imprimé ne ressemblerait plus à la page dont
    il est tiré. Inter est une police variable — le gras s'en extrait en
    figeant l'axe de graisse à sept cents.
    """
    paires = [
        (SERIF, "InstrumentSerif-Regular.ttf"),
        (SERIF_IT, "InstrumentSerif-Italic.ttf"),
        (SANS, "Inter-Regular.ttf"),
        (SANS_G, "Inter-Bold.ttf"),
    ]
    for nom, fichier in paires:
        chemin = os.path.join(POLICES, fichier)
        if not os.path.exists(chemin):
            sys.exit(f"Police introuvable : {chemin}\nDéfinissez POLICES_PDF.")
        pdfmetrics.registerFont(TTFont(nom, chemin))


# ————————————————————————————————————————— les données —————
#
# Elles sont lues dans les fichiers TypeScript du site plutôt que
# recopiées : une donnée écrite deux fois finit toujours par diverger, et
# c'est le catalogue imprimé qui aurait tort.


def lire(fichier):
    with open(os.path.join(RACINE, fichier), encoding="utf-8") as f:
        return f.read()


def champ(bloc, cle):
    m = re.search(r'\b%s:\s*"((?:[^"\\]|\\.)*)"' % cle, bloc)
    return m.group(1).replace('\\"', '"') if m else ""


def charger():
    src = lire("lib/madamoon.ts")

    robes = []
    deb = src.index("export const ROBES: Robe[] = [")
    fin = src.index("\n];", deb)
    for m in re.finditer(r'\{\n    slug: "[^"]+",[\s\S]*?\n  \}', src[deb:fin]):
        b = m.group(0)
        morphos = re.search(r"morphos:\s*\[([^\]]*)\]", b)
        # La vue qui représente la robe seule — la première par défaut.
        couv = re.search(r"couverture:\s*(\d+)", b)
        robes.append(
            dict(
                slug=champ(b, "slug"),
                nom=champ(b, "nom"),
                ligne=champ(b, "ligne"),
                categorie=champ(b, "categorie"),
                regard=champ(b, "regard"),
                createur=champ(b, "createur"),
                morphos=re.findall(r'"([^"]+)"', morphos.group(1)) if morphos else [],
                couverture=int(couv.group(1)) - 1 if couv else 0,
            )
        )

    createurs = []
    deb = src.index("export const CREATEURS: Createur[] = [")
    fin = src.index("\n];", deb)
    for m in re.finditer(r"\{[\s\S]*?\n  \}", src[deb:fin]):
        b = m.group(0)
        if not champ(b, "slug"):
            continue
        createurs.append(
            dict(nom=champ(b, "nom"), slug=champ(b, "slug"),
                 origine=champ(b, "origine"), note=champ(b, "note"))
        )

    morphologies = []
    deb = src.index("export const MORPHOLOGIES: Morphologie[] = [")
    fin = src.index("\n];", deb)
    for m in re.finditer(r"\{\n    lettre:[\s\S]*?\n  \}", src[deb:fin]):
        b = m.group(0)
        morphologies.append(
            dict(lettre=champ(b, "lettre"), nom=champ(b, "nom"),
                 silhouette=champ(b, "silhouette"), objectif=champ(b, "objectif"),
                 conseil=champ(b, "conseil"))
        )

    familles = {}
    deb = src.index("export const FAMILLES")
    for m in re.finditer(r'"?([^":\n]+)"?:\s*"([^"]+)"', src[deb:src.index("};", deb)]):
        familles[m.group(1).strip()] = m.group(2)

    # Les entrées de COUPES ne sont pas toutes écrites pareil : certaines
    # tiennent sur une ligne, d'autres non. On découpe donc sur le début
    # d'entrée plutôt que d'essayer d'apparier les accolades.
    coupes = []
    csrc = lire("lib/coupes.ts")
    deb = csrc.index("export const COUPES: Coupe[] = [")
    fin = csrc.index("\n];", deb)
    for bloc in re.split(r"\n  \{", csrc[deb:fin])[1:]:
        if champ(bloc, "ancre"):
            coupes.append(dict(nom=champ(bloc, "nom"), ancre=champ(bloc, "ancre"),
                               note=champ(bloc, "note")))

    maison = {}
    deb = src.index("export const MAISON")
    bloc = src[deb:src.index("\n} as const", deb)]
    for cle in ("nom", "baseline", "adresse", "codePostal", "ville",
                "telephone", "email", "reservation", "prixDepart"):
        maison[cle] = champ(bloc, cle)
    maison["horaires"] = [
        (a, b) for a, b in re.findall(r'jour:\s*"([^"]+)",\s*heures:\s*"([^"]+)"', bloc)
    ]

    medias = {}
    msrc = lire("lib/medias.ts")
    deb = msrc.index("export const ROBE_MEDIAS")
    fin = msrc.index("\n};", deb)
    for m in re.finditer(r'\n  "([a-z0-9-]+)": \[([\s\S]*?)\n  \]', msrc[deb:fin]):
        vues = []
        for v in re.finditer(r'\{[\s\S]*?"jpgw": \[([\s\S]*?)\]\s*\}', m.group(2)):
            nom = re.search(r'"name": "([^"]+)"', v.group(0))
            jpgw = [int(x) for x in re.findall(r"\d+", v.group(1))]
            if nom and jpgw:
                vues.append((nom.group(1), max(jpgw)))
        if vues:
            medias[m.group(1)] = vues

    return robes, createurs, morphologies, coupes, familles, medias, maison


# ————————————————————————————————————————— la mise en page —————


def sansacc(x):
    return unicodedata.normalize("NFKD", x).encode("ascii", "ignore").decode()


def largeur(txt, police, corps, espacement=0):
    txt = rendu(txt)
    return pdfmetrics.stringWidth(txt, police, corps) + espacement * max(len(txt) - 1, 0)


FINE = "\u202f"   # espace fine insécable, avant ? ! ; et dans les guillemets
INSEC = "\u00a0"  # espace insécable pleine, avant les deux-points


def mots(txt):
    """
    Découpe en mots pour la césure.

    On ne coupe que sur les espaces ordinaires : les insécables, elles,
    collent le signe à son mot. C'est tout leur objet — sans quoi le
    « ? » retombe seul en début de ligne, ici comme sur le site.
    """
    return [m for m in re.split(r"[ \t\n\r]+", txt) if m]


def rendu(txt):
    """
    Le texte tel qu'il sera tracé.

    La police du site n'a pas à posséder le dessin de l'espace fine : au
    tracé elle redevient une espace ordinaire. La coupure, elle, a déjà
    été empêchée au découpage — l'insécable a fait son travail avant.
    """
    return txt.replace(FINE, " ").replace(INSEC, " ")


def poser(c, txt, x, y, police, corps, couleur, espacement=0):
    """
    Une ligne de texte, avec interlettrage éventuel.

    L'interlettrage est remis à zéro avant de rendre la main. Dans un PDF,
    « Tc » appartient à l'état de page et non à l'objet texte : posé une
    fois pour des capitales espacées, il s'appliquait ensuite à tout le
    document. Les paragraphes débordaient alors leur colonne, puisque le
    calcul de césure, lui, l'ignorait.
    """
    c.setFillColorRGB(*couleur)
    t = c.beginText()
    t.setTextOrigin(x, y)
    t.setFont(police, corps)
    t.setCharSpace(espacement)
    t.textLine(rendu(txt))
    t.setCharSpace(0)
    c.drawText(t)


def legende(c, txt, x, y, couleur=PLOMB):
    """Les petites capitales du site : 11 px, grasses, très espacées."""
    poser(c, txt.upper(), x, y, SANS_G, 7.2, couleur, espacement=1.15)


def paragraphe(c, txt, x, y, large, police, corps, couleur, interligne=None):
    """Un paragraphe justifié à gauche. Rend l'ordonnée atteinte."""
    interligne = interligne or corps * 1.55
    lignes = []
    ligne = ""
    for mot in mots(txt):
        essai = (ligne + " " + mot).strip()
        if pdfmetrics.stringWidth(rendu(essai), police, corps) <= large or not ligne:
            ligne = essai
        else:
            lignes.append(ligne)
            ligne = mot
    if ligne:
        lignes.append(ligne)

    c.setFillColorRGB(*couleur)
    t = c.beginText()
    t.setTextOrigin(x, y)
    t.setFont(police, corps)
    t.setCharSpace(0)
    t.setLeading(interligne)
    for l in lignes:
        t.textLine(rendu(l))
    c.drawText(t)
    return y - interligne * len(lignes)


def filet(c, x1, y, x2, couleur=FIL):
    c.setStrokeColorRGB(*couleur)
    c.setLineWidth(0.6)
    c.line(x1, y, x2, y)


def image_couvrante(c, chemin, x, y, l, h):
    """Une photographie qui remplit son cadre, recadrée comme au web."""
    img = ImageReader(chemin)
    iw, ih = img.getSize()
    r_cadre, r_img = l / h, iw / ih
    if r_img > r_cadre:
        dh = h
        dl = h * r_img
    else:
        dl = l
        dh = l / r_img
    c.saveState()
    p = c.beginPath()
    p.rect(x, y, l, h)
    c.clipPath(p, stroke=0, fill=0)
    # Cadrage haut : sur une robe entière, on garde le buste.
    c.drawImage(img, x - (dl - l) / 2, y + h - dh + (dh - h) * 0.12,
                dl, dh, mask="auto")
    c.restoreState()


def fichier_image(medias, slug, vue=0):
    entrees = medias.get(slug)
    if not entrees:
        return None
    nom, w = entrees[min(vue, len(entrees) - 1)]
    chemin = os.path.join(RACINE, "public", "robes", f"{nom}-{w}.jpg")
    return chemin if os.path.exists(chemin) else None


# ————————————————————————————————————————— les pages —————


LOGO = os.path.join(RACINE, "public", "marque", "logo-encre.png")
LOGO_BLANC = os.path.join(RACINE, "public", "marque", "logo-blanc.png")


def signature(c, blanc=False):
    """Le logo, toujours au même endroit : en haut à gauche."""
    img = ImageReader(LOGO_BLANC if blanc else LOGO)
    iw, ih = img.getSize()
    l = 34 * MM
    c.drawImage(img, MARGE, HAUTEUR - MARGE - l * ih / iw, l, l * ih / iw, mask="auto")


def couverture(c, surtitre, titre, ligne, image):
    """
    La couverture.

    Une photographie qui occupe les deux tiers bas, le titre posé sur le
    fond ivoire au-dessus. C'est la composition des pages de rubrique du
    site, tournée au format portrait.
    """
    c.setFillColorRGB(*IVOIRE)
    c.rect(0, 0, LARGEUR, HAUTEUR, stroke=0, fill=1)

    haut_image = HAUTEUR * 0.58
    if image:
        image_couvrante(c, image, 0, 0, LARGEUR, haut_image)

    signature(c)

    # Le titre d'abord : c'est sa hauteur de capitale qui dit où poser le
    # surtitre. Placé à l'aveugle, celui-ci se faisait recouvrir.
    corps = 46 if len(titre) <= 16 else (34 if len(titre) <= 26 else 26)
    while largeur(titre.upper(), SERIF, corps) > LARGEUR - 2 * MARGE and corps > 14:
        corps -= 1

    y = haut_image + 40 * MM
    poser(c, titre.upper(), MARGE, y, SERIF, corps, ENCRE)
    hauteur_titre = pdfmetrics.getAscent(SERIF, corps)
    if surtitre:
        legende(c, surtitre, MARGE, y + hauteur_titre + 6 * MM)
    y -= 10 * MM

    if ligne:
        paragraphe(c, ligne, MARGE, y, LARGEUR - 2 * MARGE - 30 * MM, SANS, 9.5, PLOMB)

    c.showPage()


def page_robe(c, robe, medias, familles, rang=None, total=None):
    """
    Une robe par page.

    La photographie tient la moitié gauche sur toute la hauteur utile ; le
    texte occupe la colonne de droite. Un catalogue se feuillette : deux
    robes par page obligeraient à choisir avant d'avoir regardé.
    """
    c.setFillColorRGB(*BLANC)
    c.rect(0, 0, LARGEUR, HAUTEUR, stroke=0, fill=1)

    haut = HAUTEUR - MARGE
    bas = MARGE + 16 * MM
    col = (LARGEUR - 2 * MARGE) * 0.52
    image = fichier_image(medias, robe["slug"], robe.get("couverture", 0))
    if image:
        image_couvrante(c, image, MARGE, bas, col, haut - bas)

    x = MARGE + col + 12 * MM
    large = LARGEUR - MARGE - x
    y = haut - 6 * MM

    legende(c, robe["categorie"], x, y)
    y -= 12 * MM

    corps = 30 if len(robe["nom"]) <= 14 else 22
    while largeur(robe["nom"], SERIF, corps) > large and corps > 12:
        corps -= 1
    poser(c, robe["nom"], x, y, SERIF, corps, ENCRE)
    y -= 9 * MM

    y = paragraphe(c, robe["ligne"], x, y, large, SANS, 9.5, PLUME)
    y -= 3 * MM
    y = paragraphe(c, robe["regard"], x, y, large, SANS, 9, PLOMB)
    y -= 6 * MM

    lignes = []
    if robe.get("createur"):
        lignes.append(("La maison", robe["createur"]))
    lignes.append(("La coupe", familles.get(robe["categorie"], robe["categorie"])))
    if robe.get("morphos"):
        toutes = len(robe["morphos"]) >= 6
        lignes.append((
            "Les silhouettes",
            "Toutes" if toutes else ", ".join(robe["morphos"]),
        ))
    # Watters Designs travaille en demi-mesure : la fiche le dit.
    confection = ("Semi-mesure, retouches incluses"
                  if robe.get("createur") == "Watters Designs"
                  else "Sur mesure, retouches incluses")
    lignes.append(("La confection", confection))

    for intitule, valeur in lignes:
        filet(c, x, y, LARGEUR - MARGE)
        y -= 6 * MM
        legende(c, intitule, x, y, BRUME)
        y -= 5.5 * MM
        y = paragraphe(c, valeur, x, y, large, SANS, 9, PLUME)
        y -= 2 * MM
    filet(c, x, y + 2 * MM, LARGEUR - MARGE)

    # Pas de folio « 3 sur 12 » : il dirait combien de robes compte le
    # catalogue, et le site ne donne jamais ce nombre.
    poser(c, "MADAMOON", MARGE, MARGE, SANS_G, 7.2, BRUME, espacement=1.15)

    c.showPage()


def page_finale(c, maison, intitule):
    """
    La dernière page : le code QR vers la prise de rendez-vous.

    C'est la seule raison d'être du document. Le reste se regarde ; ici on
    donne le moyen de venir essayer.
    """
    c.setFillColorRGB(*CRAIE)
    c.rect(0, 0, LARGEUR, HAUTEUR, stroke=0, fill=1)
    signature(c)

    y = HAUTEUR * 0.64
    legende(c, "Essayage privé", MARGE, y)
    y -= 13 * MM
    poser(c, "VENEZ L'ESSAYER", MARGE, y, SERIF, 34, ENCRE)
    y -= 10 * MM
    y = paragraphe(
        c,
        "Une heure, le showroom pour vous seule, et quelqu'un qui connaît "
        "chaque robe. Le sur-mesure et les retouches sont compris.",
        MARGE, y, (LARGEUR - 2 * MARGE) * 0.56, SANS, 10, PLUME,
    )

    # Le code QR, à droite du texte.
    qr = segno.make(maison["reservation"], error="m")
    tmp = os.path.join(SORTIE, "_qr.png")
    qr.save(tmp, scale=12, border=0, dark="#14100c", light="#f6f2ec")
    cote = 38 * MM
    qx = LARGEUR - MARGE - cote
    qy = y + 6 * MM
    c.drawImage(ImageReader(tmp), qx, qy, cote, cote, mask="auto")
    legende(c, "Prendre rendez-vous", qx, qy - 7 * MM, PLOMB)
    # L'adresse tient sous le carré, quitte à rapetisser : elle est là
    # pour qui n'a pas d'appareil photo sous la main, pas pour être lue de
    # loin.
    url = maison["reservation"].replace("https://", "").rstrip("/")
    corps_url = 7.4
    while largeur(url, SANS, corps_url) > cote and corps_url > 4.5:
        corps_url -= 0.2
    poser(c, url, qx, qy - 12 * MM, SANS, corps_url, BRUME)

    # Les coordonnées, en bas.
    y = MARGE + 50 * MM
    filet(c, MARGE, y, LARGEUR - MARGE, BRUME)
    y -= 8 * MM
    colonnes = [
        ("Le showroom", [maison["adresse"], f'{maison["codePostal"]} {maison["ville"]}']),
        ("Nous joindre", [maison["telephone"], maison["email"]]),
        ("Horaires", [f"{j} — {h}" for j, h in maison["horaires"]][:3]),
    ]
    pas = (LARGEUR - 2 * MARGE) / 3
    for i, (intit, valeurs) in enumerate(colonnes):
        cx = MARGE + i * pas
        legende(c, intit, cx, y, BRUME)
        cy = y - 6 * MM
        for v in valeurs:
            cy = paragraphe(c, v, cx, cy, pas - 8 * MM, SANS, 8.6, PLUME, interligne=11)

    poser(c, f"Catalogue {intitule}", MARGE, MARGE, SANS, 7.4, BRUME)
    c.showPage()
    if os.path.exists(tmp):
        os.remove(tmp)


# ————————————————————————————————————————— la fabrication —————


def catalogue(nom_fichier, surtitre, titre, ligne, robes, medias, familles, maison,
              image_couv=None):
    chemin = os.path.join(SORTIE, nom_fichier)
    c = pdfcanvas.Canvas(chemin, pagesize=A4)
    c.setTitle(f"MADAMOON — Catalogue {titre}")
    c.setAuthor("MADAMOON")
    c.setSubject("Robes de mariée, Paris 10e")

    couv = image_couv or (fichier_image(medias, robes[0]["slug"], robes[0].get("couverture", 0)) if robes else None)
    couverture(c, surtitre, titre, ligne, couv)
    for i, r in enumerate(robes, 1):
        page_robe(c, r, medias, familles, i, len(robes))
    page_finale(c, maison, titre)
    c.save()
    return chemin, 2 + len(robes)


def main():
    polices()
    os.makedirs(SORTIE, exist_ok=True)
    robes, createurs, morphologies, coupes, familles, medias, maison = charger()
    avec_photo = [r for r in robes if fichier_image(medias, r["slug"])]
    faits = []

    for cp in coupes:
        lot = [r for r in avec_photo if r["categorie"] == cp["nom"]]
        if not lot:
            continue
        faits.append(catalogue(
            f'coupe-{cp["ancre"]}.pdf', "La coupe", cp["nom"],
            f'{cp["note"]}. {familles.get(cp["nom"], "")} '
            f'Au showroom, à essayer sur rendez-vous.',
            lot, medias, familles, maison))

    for cr in createurs:
        # « Autres créateurs » n'est pas une maison : c'est le reste du
        # catalogue, celui des robes sans créateur renseigné.
        if cr["nom"] == "Autres créateurs":
            lot = [r for r in avec_photo if not r.get("createur")]
        else:
            lot = [r for r in avec_photo if r.get("createur") == cr["nom"]]
        if not lot:
            continue
        faits.append(catalogue(
            f'maison-{cr["slug"]}.pdf', cr["origine"], cr["nom"], cr["note"],
            lot, medias, familles, maison))

    for m in morphologies:
        lot = [r for r in avec_photo if m["lettre"] in r.get("morphos", [])]
        if not lot:
            continue
        faits.append(catalogue(
            f'morphologie-{m["lettre"].lower()}.pdf', m["nom"],
            f'Silhouette en {m["lettre"]}',
            f'{m["silhouette"]} {m["conseil"]}',
            lot, medias, familles, maison))

    for r in avec_photo:
        faits.append(catalogue(
            f'robe-{r["slug"]}.pdf', r["categorie"], r["nom"], r["ligne"],
            [r], medias, familles, maison))

    total = sum(p for _, p in faits)
    poids = sum(os.path.getsize(f) for f, _ in faits)
    print(f"{len(faits)} catalogues, {total} pages, {poids/1048576:.1f} Mo")
    for f, p in faits[:6]:
        print(f"   {os.path.basename(f):34s} {p:3d} pages  "
              f"{os.path.getsize(f)//1024:5d} ko")


if __name__ == "__main__":
    main()
