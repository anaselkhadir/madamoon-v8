import type { Metadata } from "next";
import PageCoupes from "@/components/pages/PageCoupes";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Les coupes de robe de mariée",
  description:
    "Sirène, princesse, fluide, trapèze, deux-en-un : les coupes du showroom MADAMOON, Paris 10e. Essayage privé sur rendez-vous.",
  alternates: {
    canonical: "/coupes/",
    languages: { fr: "/coupes/", en: "/en/silhouettes/", "x-default": "/coupes/" },
  },
  openGraph: partage("/coupes/"),
};

export default function Coupes() {
  return <PageCoupes langue="fr" />;
}
