# DESIGN.md — MADAMOON

## Theme

Clair, éditorial, dense en images. Ivoire et craie au sol, encre au texte, le rouge
réservé à l'action. Jamais de mode sombre : une robe blanche se regarde sur du clair.

## Color

Tokens dans `app/globals.css`, sous `@theme`.

| rôle | token | valeur |
|---|---|---|
| fond principal | `--color-ivoire` | `#fdfbf8` |
| fond secondaire | `--color-craie` | `#f6f2ec` |
| fond appuyé | `--color-sable` | `#ece5da` |
| filets | `--color-fil` | `#e3dcd1` |
| texte | `--color-encre` | `#14100c` |
| texte secondaire | `--color-plomb` | `#6b6459` |
| texte tertiaire | `--color-brume` | `#a8a093` |
| action | `--color-action` | `#910000` |
| accent | `--color-accent` | `#ce0a2c` |

Stratégie : **restrained**. L'action rouge ne dépasse jamais quelques pour cent de
la surface, sauf le bandeau de fin — la seule grande surface rouge du site, et elle
n'apparaît qu'une fois.

## Typography

Serif de titrage + sans de texte. `.affiche` pour le titre d'un premier écran
(clamp 2.5→5rem, interligne 0.95, capitales), `.titre-section` pour les intitulés
(clamp 1.375→2rem, capitales), `.phrase` pour une phrase éditoriale en serif,
`.texte` pour le corps (clamp 0.9375→1.0625rem, interligne 1.7), `.legende` et
`.mention` pour les petites capitales.

Mesures : `.mesure` = 34ch, `.mesure-l` = 48ch.

## Layout

Gouttière unique : `clamp(1.125rem, 3.34vw, 3.5rem)` — 48 px à 1440. Deux barres
fixes : bandeau 38 px, navigation 56 px.

Les tuiles sont au rapport 447/621, jointives à 1,5 px de jeu (`.trame-tuiles`). Le
pied et le bandeau de rendez-vous partagent une grille de quatre colonnes.

## Motion

Trois matières, chacune avec un rôle, et rien d'autre :

- **le rideau** (`data-rideau`) — pour les photographies seules. Le cadre s'ouvre par
  le bas et l'image se pose en contre-échelle. Elle se développe, elle ne glisse pas.
- **la ligne** (`data-ligne`) — pour un intitulé de section, un par section. Le texte
  monte de derrière un masque.
- **la suite** (`data-suite`) — pour une vraie liste, avec un décalage plafonné.

Le corps de texte n'est pas animé : il est là. Une signature par famille de page,
jamais plus. Toute la mécanique passe par `components/Mouvement.tsx` et se coupe
entièrement sous `prefers-reduced-motion`.
