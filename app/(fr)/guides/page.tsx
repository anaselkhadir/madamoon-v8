import type { Metadata } from "next";
import PageGuides from "@/components/pages/PageGuides";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Guides de la robe de mariée",
  description:
    "Coupes, morphologies, essayage : tous les guides de la boutique MADAMOON pour choisir sa robe de mariée à Paris, une question par page.",
  alternates: {
    canonical: "/guides/",
    languages: { fr: "/guides/", en: "/en/guides/", "x-default": "/guides/" },
  },
  openGraph: partage("/guides/"),
};

export default function Guides() {
  return <PageGuides langue="fr" />;
}
