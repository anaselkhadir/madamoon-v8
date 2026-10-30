/*
 * Les règles de la langue qui ne se voient qu'une fois écrites.
 *
 * Un nom de robe est une donnée : on ne peut pas savoir en l'écrivant
 * s'il commencera par une voyelle. « La fiche de Uma » se lisait donc
 * sur seize pages du site, et « les coupes de Olya Mak » sur deux
 * autres. Une maison de couture française ne peut pas écrire cela.
 */

/* Voyelles et h muet : devant eux, la préposition s'élide. Aucun nom du
 * catalogue ne porte de h aspiré — Héra et Hélène s'élident, comme
 * l'usage le veut. */
const ELIDE = /^[aàâäeéèêëiîïoôöuùûüyhAÀÂÄEÉÈÊËIÎÏOÔÖUÙÛÜYH]/;

/**
 * « de » devant un nom : rend « de Tessa » mais « d'Uma ».
 *
 * L'apostrophe est la courbe typographique, celle du reste du site.
 */
export function de(nom: string): string {
  return ELIDE.test(nom) ? `d’${nom}` : `de ${nom}`;
}

/* Fine insécable avant ? ! ; et dans les guillemets, insécable pleine
 * avant les deux-points — la règle française, celle que le reste du site
 * applique déjà dans sa copie. */
const FINE = "\u202f";
const INSEC = "\u00a0";

/**
 * La typographie d'un texte que l'on n'a pas écrit.
 *
 * Les avis sont reproduits mot pour mot : on ne touche ni aux mots, ni à
 * l'ordre, ni à la ponctuation. Mais une espace ordinaire devant un point
 * d'exclamation le laisse tomber seul en début de ligne, et « je
 * recommande à Paris » suivi d'un « ! » orphelin se lisait ainsi sur la
 * page d'accueil.
 *
 * On ne remplace donc qu'un caractère d'espacement par un autre, à
 * l'affichage. Le texte déclaré aux moteurs, lui, reste celui que Google
 * publie, caractère pour caractère : c'est `reviewBody` qui fait foi.
 */
export function typographie(texte: string): string {
  return texte
    .replace(/(\S)[ \u00a0]([?!;»])/g, `$1${FINE}$2`)
    .replace(/(«)[ \u00a0](\S)/g, `$1${FINE}$2`)
    .replace(/(\S)[ \u00a0](:)(\s)/g, `$1${INSEC}$2$3`);
}
