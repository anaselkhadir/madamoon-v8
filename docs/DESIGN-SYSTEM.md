# Design system v2 — MADAMOON

Tokens : `src/styles/tokens-v2.css` (à brancher à la place de `tokens.css`
après validation). Direction artistique : `DIRECTION-ARTISTIQUE.md`.

## Fondations

**Couleurs.** Sept valeurs, toutes nommées : Blanc, Ivoire, Noir doux, Gris,
Gris clair, Rouge MADAMOON, Grenat. Pas de dégradés, pas de transparence
colorée ; le seul voile est blanc à 92 % (en-tête au défilement, passage).

**Typographie.**
| Style | Famille | Taille | Interligne | Notes |
|---|---|---|---|---|
| `affiche` | Fraunces 300, opsz 144, SOFT 60 | clamp(3.5rem, 11vw, 13rem) | 0.88 | approche −0.03em ; un mot en italique rouge |
| `chapitre` | Fraunces 300 | clamp(2.5rem, 7vw, 8rem) | 0.92 | titres H2 |
| `grand` | Fraunces 300 | clamp(1.75rem, 3.6vw, 3.5rem) | 1.05 | noms de robes, noms de maisons, H3 |
| `citation` | Fraunces 300 italique | clamp(1.5rem, 3vw, 2.75rem) | 1.2 | paroles, citations tirées |
| `corps` | Jost 300 | clamp(1.0625rem, 1.1vw, 1.1875rem) | 1.6 | mesure 60ch |
| `ui` | Jost 500, capitales | 0.75rem | 1 | approche 0.14em : boutons, navigation |
| `mono` | DM Mono 400, capitales | 0.6875rem | 1.4 | approche 0.08em : numéros, index, méta, horaires |
| `lettrine` | Fraunces 300 rouge | 5.5em flottante | — | édito seulement |

**Grille.** 12 colonnes, gouttière `clamp(1.25rem, 3.4vw, 4rem)`, conteneur
1 760 px. Chapitres : `clamp(7rem, 14vw, 14rem)` entre eux. Une seule
colonne sous 768 px, gouttière 20 px.

**Formes.** Rayon 0. Filet 1 px Gris clair, horizontal seulement. Trait
signature 2 px Rouge. Aucune ombre.

## Composants

| Composant | Règle |
|---|---|
| **Bouton** (`.btn`) | fond Rouge, texte Blanc `ui`, hauteur 52 px, padding 0 28 px, flèche « → » à 12 px du texte ; survol : vague Grenat qui monte (pseudo-élément scaleY), flèche +4 px ; actif : échelle 0,98 ; focus : contour 2 px Noir décalé 3 px. Variante `.btn-blanc` (sur vidéo) : fond Blanc, texte Noir, survol Ivoire. Variante `.btn-trait` : texte Noir + trait rouge dessous qui se dessine |
| **Lien** | Noir, trait Rouge 1 px dessiné de gauche à droite au survol (background-size) |
| **Eyebrow** | `mono` : « N° 03 — Les coupes », le numéro en Rouge |
| **Trait** | `<i class="trait">` 2 px Rouge, largeur 0 → 100 % à l'entrée (scaleX, origine gauche) |
| **Masque image** (`.masque`) | overflow hidden ; l'image s'ouvre par clip-path depuis la gauche (hero) ou le bas (chapitres), contre-échelle 1,06 ; `aspect-ratio` imposé |
| **Index** (`.index`) | `mono` « 02 / 07 » posé dans le coin haut-gauche de l'image, à 12 px |
| **Nom à cheval** | `grand` italique, positionné à −0,5em sous le bord bas de l'image, dans la colonne de gauche |
| **Liste typographique** (`.index-typo`) | lignes en `chapitre`, filet entre elles, numéro mono rouge à gauche, image flottante à droite (sticky) |
| **Lettres en contour** | `-webkit-text-stroke: 1px Noir`, remplissage transparent ; active : remplissage Rouge |
| **Bandeau défilant** | Fraunces italique `grand`, séparateur « — », vitesse liée au défilement, pause au survol |
| **Citation géante** | guillemet ouvrant Fraunces 8vw Rouge en marge, texte `citation`, auteur `mono` |
| **Édito** | lettrine Rouge, deux colonnes `corps` avec `column-gap` gouttière, citation tirée en `citation` à cheval sur les deux colonnes |
| **En-tête** | 72 px, transparent, logo PNG de la maison à gauche (hauteur 14 px), navigation `mono` au centre droit avec point rouge sur l'actif, bouton `.btn` compact (44 px) ; devient Blanc 92 % + flou 10 px au défilement |
| **Menu plein écran** | Blanc, entrées en `chapitre`, numéros mono, image à droite (desktop), adresse et téléphone en pied |
| **Curseur** | point Rouge 10 px ; cercle 72 px avec « Voir » sur `[data-cursor]` ; masqué sous `(hover: none)` |
| **Chargement** | voile Blanc, compteur `mono` 00 → 100 en bas à gauche en 5vw, trait Rouge en haut qui traverse, voile qui remonte (clip-path) ; sauté après la première visite (sessionStorage) et sous reduced-motion |
| **Pied** | Blanc, trait Rouge au-dessus, trois colonnes mono (adresse/horaires, navigation, réseaux et légal), logo en masthead de fin sur toute la largeur |
| **Fil d'Ariane** | `mono`, séparateur « / » |
| **Fiche robe** (principe) | couverture : photographie plein cadre à gauche sur 60 %, titre `chapitre` qui déborde sur l'image ; index mono « vue 01 / 07 » ; galerie en mosaïque éditoriale (deux colonnes décalées) ; détails en liste typographique ; même coupe / même maison en bande horizontale |
| **Pages SEO** (principe) | ouverture typographique (eyebrow mono + titre `chapitre` + une phrase `citation`) ; corps en double page avec lettrine ; une image débordante tous les deux écrans ; FAQ en liste typographique ; jamais un bloc de texte continu de plus de 60 lignes |

## Mouvement (tokens)
`--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` (sorties, révélations) ;
`--ease-io: cubic-bezier(0.76, 0, 0.24, 1)` (masques, voiles) ;
`--d-court 300ms` (survols), `--d-moyen 900ms` (titres), `--d-long 1300ms`
(masques), `--d-voile 700ms` ; décalage mots 60 ms ; dérive 4-8 %.
Tous à 0 sous `prefers-reduced-motion` ; aucune animation si l'onglet est
caché au chargement.

## Accessibilité et performance
Contrastes AA partout ; focus visible ; menu piégeant le focus ; curseur
personnalisé jamais obligatoire ; texte en contour doublé d'un `aria-label`
lisible ; vidéos muettes avec affiche ; `prefers-reduced-motion` respecté ;
polices sous-ensemble latin + latin-ext en `swap` ; JavaScript initial
< 95 ko (GSAP par morceaux, Lenis) ; LCP < 2 s (photographie du hero en
`fetchpriority=high`, pas de vidéo au-dessus de la ligne de flottaison sur
mobile).
