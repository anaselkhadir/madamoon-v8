/*
 * Les catalogues.
 *
 * Un catalogue par univers, nommé d'après le contexte : « coupe:sirene »
 * donne coupe-sirene.pdf. Les fichiers sont fabriqués par
 * outils/catalogues.py et déposés dans /public/catalogues.
 *
 * Il n'y a rien à demander avant de les remettre. Le formulaire qui les
 * gardait — prénom, nom, courriel, date du mariage — a été retiré : la
 * maison préfère donner le catalogue plutôt que de l'échanger, et la
 * collecte n'était reliée à aucun point de dépôt.
 */

export const CATALOGUES_DISPONIBLES = true;

export function fichierCatalogue(contexte: string): string {
  return `/catalogues/${contexte.replace(":", "-")}.pdf`;
}
