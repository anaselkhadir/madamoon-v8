import type { Langue } from "@/lib/langue";
import { PAGES_FAMILLES, adresseFamille, robesDePage } from "@/lib/familles";

/*
 * Les pages transversales qui nomment une robe, pour le lien depuis sa
 * fiche. La liste n'est plus écrite ici : elle se lit dans
 * « lib/familles.ts », où chaque page nomme ses robes. Une robe n'est
 * rangée dans une page que si la page la montre.
 */

export type Style = {
  href: string;
  label: Record<Langue, string>;
  robes: string[];
};

const LABELS_EN: Record<string, string> = {
  "/styles/boheme": "Boho wedding dress in Paris",
  "/styles/minimaliste": "Simple, minimalist wedding dress in Paris",
  "/matieres/dentelle": "Lace wedding dress in Paris",
  "/details/manches-longues": "Long-sleeve wedding dress in Paris",
  "/matieres/satin": "Satin wedding dress in Paris",
  "/details/bustier": "Strapless wedding dress in Paris",
  "/details/dos-nu": "Backless wedding dress in Paris",
  "/styles/romantique": "Romantic wedding dress in Paris",
  "/styles/mariage-civil": "Civil wedding dress in Paris",
  "/details/courte": "Short wedding dress in Paris",
};

/* La grande taille n'est pas un style : une fiche ne dit pas « robe grande
 * taille », elle dit la coupe, la matière et les morphologies. La page
 * reste liée depuis les morphologies et les guides, pas depuis les fiches. */
export const STYLES: Style[] = PAGES_FAMILLES.filter((p) => p.famille !== "morphologies").map((p) => {
  const href = adresseFamille(p);
  return { href, label: { fr: p.titre, en: LABELS_EN[href] ?? p.titre }, robes: robesDePage(p) };
});

export const stylesDe = (slug: string) => STYLES.filter((s) => s.robes.includes(slug));
