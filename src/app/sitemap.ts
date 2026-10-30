import type { MetadataRoute } from "next";
import { ROBES, SITE_URL } from "@/content/madamoon";
import arbo from "@/content/arborescence.json";
import { MISE_A_JOUR } from "@/content/version";

/*
 * Le plan du site vient de l'arborescence (src/content/arborescence.json) :
 * seules les pages dont le statut commence par « existante » ou qui sont
 * construites dans ce dépôt sont déclarées. Les fiches robes viennent du
 * catalogue. Les pages encore à créer n'apparaissent qu'une fois livrées.
 */
const LIVREES = new Set(["/", "/robes/", "/robes/[slug]/"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const freq = (f: string) => f as MetadataRoute.Sitemap[number]["changeFrequency"];
  const pages = arbo.pages
    .filter((p) => LIVREES.has(p.url) && p.url !== "/robes/[slug]/")
    .map((p) => ({ url: `${SITE_URL}${p.url}`, changeFrequency: freq(p.freq), priority: p.sitemap, lastModified: MISE_A_JOUR }));
  const fiches = ROBES.map((r) => ({ url: `${SITE_URL}/robes/${r.slug}/`, changeFrequency: freq("monthly"), priority: 0.7, lastModified: MISE_A_JOUR }));
  return [...pages, ...fiches];
}
