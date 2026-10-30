/*
 * Les six morphologies, en anglais.
 *
 * Les lettres restent. C'est le système de la maison — elles se lisent
 * en gros serif sur les photographies de l'accueil — et les traduire en
 * « pear », « apple », « hourglass » aurait remplacé un vocabulaire
 * clair par un autre qui compare les femmes à des fruits.
 *
 * Ce qui se traduit, c'est ce qu'elles décrivent.
 */

export const MORPHO_NOM: Record<string, string> = {
  O: "The O shape",
  A: "The A shape",
  V: "The V shape",
  H: "The H shape",
  "8": "The 8 shape",
  X: "The X shape",
};

export const MORPHO_SILHOUETTE: Record<string, string> = {
  O: "Generous curves, a full bust and a soft middle.",
  A: "Shoulders narrower than the hips, a clearly drawn waist.",
  V: "Broad shoulders, narrower hips.",
  H: "A straight line, a waist that barely marks.",
  "8": "Shoulders and hips in balance, a marked waist.",
  X: "A balanced figure, soft curves, a fine waist.",
};

export const MORPHO_OBJECTIF: Record<string, string> = {
  O: "Lengthen the line and bring the bust forward.",
  A: "Draw the eye back up to the shoulders.",
  V: "Soften the top and give volume below.",
  H: "Create curve, without forcing it.",
  "8": "Bring out a harmony that is already there.",
  X: "Show the figure without overstating it.",
};

/* Ce que l'on conseille, morphologie par morphologie. Ce sont des
 * phrases, pas des étiquettes : elles se lisent l'une après l'autre. */
export const MORPHO_COUPES: Record<string, string[]> = {
  O: [
    "Fluid falls, that glide without marking the body.",
    "A-lines, that structure the bust and leave the rest free.",
    "V or sweetheart necklines.",
  ],
  A: [
    "A worked bodice, rich in detail.",
    "A flared skirt, that balances the hips.",
    "Boat necklines or straight bodices, that widen the shoulders.",
  ],
  V: [
    "Full skirts, A-line or ball gown.",
    "Light structures, barely built at the shoulders.",
    "V necklines, crossed or asymmetric.",
  ],
  H: [
    "Models fitted at the waist, or worn with a belt.",
    "Light mermaids, that draw the line without gripping it.",
    "Empire cuts, that lengthen.",
  ],
  "8": [
    "Mermaids and sheaths, that follow the line.",
    "Sweetheart bodices and V necklines.",
    "Anything that nips in at the waist.",
  ],
  X: [
    "Good news: almost every cut suits you.",
    "Ball gown, mermaid, sheath or A-line — let the style of the wedding decide.",
  ],
};

/* Le conseil en une phrase, celui qui tient sous une définition. */
export const MORPHO_CONSEIL: Record<string, string> = {
  O: "Fluid falls and A-line cuts lengthen the figure beautifully. A V or sweetheart neckline shows the bust at its best.",
  A: "A worked bodice and a flared skirt balance the hips. Boat necklines widen the shoulders nicely.",
  V: "Full skirts and V or crossed necklines soften the line of the shoulders.",
  H: "Models fitted at the waist and light mermaids draw curves while lengthening the figure.",
  "8": "Mermaids and sheaths follow the curves; a sweetheart bodice or a V neckline underlines the natural balance.",
  X: "Good news: almost every cut suits you. Let the style of your wedding guide the choice.",
};
