/*
 * Les descriptions, taillées pour ce que Google montre.
 *
 * Le moteur coupe vers cent soixante signes. Au-delà, ce n'est pas la
 * phrase de trop qui disparaît : c'est la fin, c'est-à-dire presque
 * toujours « Essayage privé sur rendez-vous » — la seule ligne qui
 * demande quelque chose à la lectrice.
 *
 * Les descriptions du site étaient bâties en trois morceaux : une tête
 * qui situe la page, une phrase du contenu, une queue qui appelle. La
 * phrase du milieu est la seule dont la longueur varie, et c'est elle
 * qui faisait déborder — deux cent vingt-deux signes sur la morphologie
 * en O, cent quatre-vingt-dix-huit chez Olya Mak.
 *
 * Elle n'entre donc que si l'ensemble tient, et seulement par sa
 * première phrase. Sinon elle saute, et la queue s'allonge d'un mot
 * pour que la description ne paraisse pas amputée. Une description
 * courte vaut mieux qu'une longue coupée au milieu d'un mot.
 */

/* Cent cinquante-huit, et non cent soixante : la limite de Google est
 * approximative, et dépend de la largeur des lettres. Deux signes de
 * marge coûtent moins qu'une coupure. */
const LIMITE = 158;

export function description(
  tete: string,
  milieu: string,
  queue: string,
  queueSeule: string,
): string {
  /* La première phrase seulement : le découpage se fait sur un point
   * suivi d'une espace, et ces textes n'ont ni abréviation ni décimale.
   * Un texte d'une seule phrase se rend lui-même. */
  const premiere = milieu.split(/(?<=\.)\s/)[0];
  const avec = `${tete} ${premiere} ${queue}`;
  return avec.length <= LIMITE ? avec : `${tete} ${queueSeule}`;
}

/*
 * L'Open Graph d'une page.
 *
 * Next fusionne les métadonnées champ par champ, au premier niveau
 * seulement : une page qui déclare « openGraph » remplace celui de son
 * gabarit, elle ne le complète pas. En posant « openGraph: { url } » sur
 * chaque page pour que l'adresse de partage soit la bonne, on a effacé
 * du même coup l'image, le type, la langue et le nom du site — toutes
 * les pages du site sauf les fiches de robe ont perdu leur visuel de
 * partage, l'accueil compris.
 *
 * D'où cette fonction : une page ne décrit plus son Open Graph, elle le
 * demande. Le seul paramètre qui change d'une page à l'autre est
 * l'adresse ; tout le reste est celui de la maison, écrit une fois.
 *
 * Les fiches de robe n'en veulent pas : elles posent « openGraph: null »
 * et écrivent leurs balises à la main, parce qu'une épingle Pinterest
 * demande « og:type: product », que l'API de Next ne sait pas produire.
 */

const IMAGE_PARTAGE = "/partage/madamoon-showroom-paris-10e.jpg";

const ALT_PARTAGE = {
  fr: "Le showroom MADAMOON à Paris 10e, ses portants de robes de mariée et son escalier",
  en: "The MADAMOON showroom in Paris 10e, its rails of wedding dresses and its staircase",
} as const;

export function partage(url: string, langue: "fr" | "en" = "fr") {
  return {
    type: "website" as const,
    locale: langue === "fr" ? "fr_FR" : "en_GB",
    /* Le même nom que le nœud « WebSite » : Google lit les deux, et
     * deux réponses différentes le laissent choisir. */
    siteName: langue === "fr" ? "MADAMOON | Robes de mariée à Paris" : "MADAMOON | Wedding dresses in Paris",
    url,
    images: [
      {
        url: IMAGE_PARTAGE,
        width: 1200,
        height: 630,
        alt: ALT_PARTAGE[langue],
      },
    ],
  };
}
