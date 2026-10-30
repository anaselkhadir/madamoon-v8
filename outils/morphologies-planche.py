"""
Les six morphologies, tirées de la planche fournie.

Trois opérations, dans cet ordre.

Le fond s'en va. Le trait est clair sur noir : la luminance fait donc
directement la transparence. On ne détoure pas, on convertit — aucun
contour à deviner, aucune frange grise autour des lignes. Un plancher
efface le bruit du JPEG, qui laissait un voile là où il n'y a rien.

Les figures sont recadrées sur leur axe, mesuré sur la planche. La pose
est la même pour les six : le bras gauche s'écarte de 90,5 pixels de
l'axe, le droit de 76,5. Le cadre commun tient compte de ce déport, si
bien que les six gardent la même échelle et les mêmes hauteurs d'épaule
et de hanche : elles restent une famille.

La première figure commence au bord de la planche, à 77 pixels de son
axe. Il lui manque donc les treize derniers pixels du bras gauche —
c'est-à-dire sa main, et elle seule : au-dessus du poignet le trait
tient dans le cadre. On la reprend sur une figure sœur, le A, dont le
bras gauche se superpose au sien à un pixel près sur toute sa longueur.
Rien d'autre n'est touché : le reste du O est celui de la planche.

La définition monte d'un facteur trois, et le trait est raffermi.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

SOURCE = Path.home() / "Downloads" / "Gemini_Generated_Image_3ew5sk3ew5sk3ew5.jpeg"
SORTIE = Path(__file__).resolve().parent.parent / "public" / "croquis"
SORTIE.mkdir(parents=True, exist_ok=True)

HAUT, BAS = 68, 522          # la bande des figures, lettres exclues
NOIR, BLANC = 26, 165        # les bornes de la luminance du trait
MARGE = 10                   # l'air autour de chaque figure
ECHELLE = 3
LARGE = 500                  # la carte n'en demande pas plus, même en double densité

# L'axe de chaque figure, relevé sur la planche.
FIGURES = [("o", 77.0), ("a", 320.5), ("v", 567.5), ("h", 815.5), ("8", 1053.2), ("x", 1300.0)]

DEMI_G, DEMI_D = 91, 77      # l'écart maximal du trait à l'axe, de part et d'autre

# La main gauche manquante du O : les rangées concernées, et la colonne
# au-delà de laquelle on reprend le A. Coordonnées relatives à l'axe.
GREFFE_HAUT, GREFFE_BAS, GREFFE_X = 300, 452, -74


def alpha(bande: np.ndarray) -> np.ndarray:
    """La luminance devient l'opacité du trait."""
    a = (bande - NOIR) / (BLANC - NOIR)
    a = np.clip(a, 0, 1)
    a[a < 0.10] = 0          # le voile du JPEG
    return a


def recadre(source: np.ndarray, axe: float, ecarts: np.ndarray) -> np.ndarray:
    """La figure, prélevée autour de son axe au pixel fractionnaire près."""
    colonnes = np.arange(source.shape[1], dtype=float)
    cibles = axe + ecarts
    return np.stack([np.interp(cibles, colonnes, ligne, left=0, right=0) for ligne in source])


def main() -> None:
    source = np.asarray(Image.open(SOURCE).convert("L")).astype(float)
    ecarts = np.arange(-DEMI_G - MARGE, DEMI_D + MARGE + 1, dtype=float)
    bande = source[HAUT:BAS, :]

    figures = {nom: recadre(bande, axe, ecarts) for nom, axe in FIGURES}

    # La main gauche du O, reprise sur le A.
    jusqu_a = int(np.searchsorted(ecarts, GREFFE_X, side="right"))
    lignes = slice(GREFFE_HAUT - HAUT, GREFFE_BAS - HAUT)
    figures["o"][lignes, :jusqu_a] = figures["a"][lignes, :jusqu_a]

    for nom, _ in FIGURES:
        a = (alpha(figures[nom]) * 255).astype(np.uint8)
        img = Image.fromarray(a)
        img = img.resize((img.width * ECHELLE, img.height * ECHELLE), Image.LANCZOS)
        img = img.filter(ImageFilter.UnsharpMask(radius=2.2, percent=95, threshold=2))

        # Le trait est noir ; c'est la transparence qui le dessine. Le site
        # le recolorera par masque, donc la couleur n'a pas d'importance.
        if img.width > LARGE:
            img = img.resize((LARGE, round(img.height * LARGE / img.width)), Image.LANCZOS)
        sortie = Image.new("RGBA", img.size, (0, 0, 0, 0))
        sortie.putalpha(img)
        chemin = SORTIE / f"morphologie-{nom}.webp"
        sortie.save(chemin, "WEBP", quality=74, method=6, exact=True)
        print(f"  {chemin.name:24} {sortie.size}  {chemin.stat().st_size // 1024} ko")


if __name__ == "__main__":
    main()
