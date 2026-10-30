import type { Langue } from "@/lib/langue";

/*
 * Les pages de style, et les robes qui y figurent.
 *
 * Un style n'est pas une coupe : il traverse le catalogue. Sa page vit
 * sous la coupe qui le porte le mieux — le bohème sous la fluide —, et
 * les fiches des robes qu'elle montre y renvoient. Une robe n'est
 * rangée ici que si la page la nomme.
 */

export type Style = {
  href: string;
  label: Record<Langue, string>;
  robes: string[];
};

export const STYLES: Style[] = [
  {
    href: "/coupes/fluide/robe-de-mariee-boheme-paris",
    label: { fr: "Robe de mariée bohème à Paris", en: "Boho wedding dress in Paris" },
    robes: ["helene", "murielle", "ryle", "tessa"],
  },
];

export const stylesDe = (slug: string) => STYLES.filter((s) => s.robes.includes(slug));
