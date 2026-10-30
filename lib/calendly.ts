import type { Langue } from "@/lib/langue";

/*
 * Le formulaire de rendez-vous.
 *
 * C'est celui de la maison, et le même que celui de madamoon.fr : un
 * WordPress qui embarque déjà ce widget. Rien n'y est touché — le
 * nouveau site se branche sur le même compte, pas sur une copie.
 *
 * Relevé sur le compte Calendly de contact@madamoon.fr le 8 septembre
 * 2026 : un seul type actif, « RDV essayage », une heure, au showroom,
 * avec six questions dont la date du mariage et la taille.
 *
 * L'adresse pointe le type d'événement et non la page du compte. Les deux
 * mènent au même formulaire tant qu'il n'y en a qu'un ; celle-ci épargne
 * un clic, et le jour où la maison en ajoutera un second, elle continuera
 * de mener à l'essayage plutôt que d'ouvrir une liste.
 */

export const CALENDLY = {
  compte: "madamoon-prise-de-rendez-vous",
  evenement: "prise-de-rendez-vous",
  script: "https://assets.calendly.com/assets/external/widget.js",
} as const;

export const CALENDLY_URL = `https://calendly.com/${CALENDLY.compte}/${CALENDLY.evenement}`;

/*
 * Les couleurs du widget — envoyées, mais pas appliquées.
 *
 * Calendly les accepte en hexadécimal sans dièse, et ne les honore que
 * sur ses offres payantes. Vérifié sur le rendu : les dates restent
 * bleues. On les laisse parce qu'elles ne coûtent rien et qu'elles
 * prendront effet le jour d'un changement d'offre — mais il ne faut pas
 * croire qu'elles habillent quoi que ce soit aujourd'hui.
 *
 * Ce qui donne réellement sa couleur au widget est le réglage du type
 * d'événement dans le compte, actuellement #0099ff. Il se change en un
 * clic depuis Calendly, et il est partagé avec madamoon.fr : les deux
 * sites en dépendent. La maison a demandé qu'on n'y touche pas.
 *
 * Le reste ne se contourne pas : le widget est un cadre d'origine
 * différente, aucune feuille de style du site ne l'atteint. Pour aller
 * plus loin il faudrait poser nos propres champs et n'utiliser Calendly
 * que pour enregistrer.
 *
 * « hide_gdpr_banner » reprend le réglage de madamoon.fr, pour que les
 * deux sites se comportent de la même façon.
 */
const HABILLAGE = {
  background_color: "ffffff",
  text_color: "14100c",
  primary_color: "910000",
  hide_gdpr_banner: "1",
};

/*
 * L'adresse du formulaire, éventuellement marquée.
 *
 * Quand la visiteuse arrive depuis une fiche, le nom de la robe est joint
 * en marqueur de campagne plutôt qu'écrit dans une réponse : le champ
 * libre appartient à la mariée, on n'y met pas de mots à sa place. La
 * maison retrouve l'information sur la réservation.
 */
export function urlCalendly(robe?: string, langue: Langue = "fr"): string {
  const p = new URLSearchParams(HABILLAGE);
  /*
   * La langue du widget, et elle seule.
   *
   * « locale » n'agit que sur l'habillage de Calendly — « Select a Date
   * & Time », les noms de mois, les boutons. Les questions du formulaire
   * appartiennent au compte et restent écrites en français : elles sont
   * partagées avec madamoon.fr, et la maison a demandé qu'on n'y touche
   * pas. Un paramètre d'adresse ne modifie rien chez elle.
   */
  if (langue === "en") p.set("locale", "en");
  if (robe) {
    p.set("utm_source", "madamoon.fr");
    p.set("utm_medium", "fiche-robe");
    p.set("utm_content", robe);
  }
  return `${CALENDLY_URL}?${p.toString()}`;
}
