/* Recopié de madamoon-v7/lib/couverture.ts le 2026-10-30 par scripts/importer-v7.py — ne pas modifier ici : corriger la source. */
import type { Robe } from "@/content/madamoon";
import { vues, type Media } from "@/content/medias";

/*
 * L'image qui représente une robe à elle seule.
 *
 * La première vue, sauf si la robe en désigne une autre. La liste des
 * vues est générée par le pipeline média et ne se réordonne pas à la
 * main : le choix se fait donc ici, sur la donnée de la robe.
 */
export function couverture(robe: Pick<Robe, "slug" | "couverture">): Media | undefined {
  const liste = vues(robe.slug);
  return liste[(robe.couverture ?? 1) - 1] ?? liste[0];
}
