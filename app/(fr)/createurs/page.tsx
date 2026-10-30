import type { Metadata } from "next";
import PageCreateurs from "@/components/pages/PageCreateurs";
import { partage } from "@/lib/meta";

/* Vise « créateur robe de mariée paris » et ses variantes, sans faire de
 * la boutique un créateur : ce sont des robes de créateurs, à Paris.
 * Mots-clés et volumes : docs/seo/. */
export const metadata: Metadata = {
  title: "Robes de mariée de créateurs à Paris",
  description:
    "Watters Designs, Casablanca Bridal, Olya Mak, Monica Loretti : les robes de mariée de créateurs à essayer à Paris, au showroom MADAMOON du 10e, sur rendez-vous.",
  alternates: {
    canonical: "/createurs/",
    languages: { fr: "/createurs/", en: "/en/designers/", "x-default": "/createurs/" },
  },
  openGraph: partage("/createurs/"),
};

export default function Createurs() {
  return <PageCreateurs langue="fr" />;
}
