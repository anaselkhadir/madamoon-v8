import type { Metadata } from "next";
import PageMorphologies from "@/components/pages/PageMorphologies";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Robe de mariée selon sa morphologie",
  description:
    "Morphologie en O, A, V, H, 8 ou X : les coupes de robe de mariée conseillées pour chaque morphologie, à essayer au showroom MADAMOON, Paris 10e.",
  alternates: {
    canonical: "/morphologies/",
    languages: { fr: "/morphologies/", en: "/en/body-shapes/", "x-default": "/morphologies/" },
  },
  openGraph: partage("/morphologies/"),
};

export default function Morphologies() {
  return <PageMorphologies langue="fr" />;
}
