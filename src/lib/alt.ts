import { MAISON, type Robe } from "@/content/madamoon";
import { FAMILLES } from "@/content/madamoon";

/*
 * Les descriptions d'images : ce que c'est, ce qu'on y voit, de qui c'est,
 * où on l'essaie. Jamais un angle de prise de vue qu'on n'a pas regardé.
 * Sous 130 caractères.
 */
const LIEU = `showroom ${MAISON.nom} ${MAISON.ville} 10e`;

export function altRobe(robe: Pick<Robe, "nom" | "categorie" | "createur">): string {
  const maison = robe.createur && robe.createur !== "Autres créateurs" ? ` ${robe.createur}` : "";
  const alt = `Robe de mariée ${robe.categorie.toLowerCase()} ${robe.nom}${maison}, ${LIEU}`;
  return alt.length <= 130 ? alt : `Robe de mariée ${robe.categorie.toLowerCase()} ${robe.nom}, ${LIEU}`;
}

export function altScene(sujet: string): string {
  return `${sujet}, ${LIEU}`;
}

export { FAMILLES };
