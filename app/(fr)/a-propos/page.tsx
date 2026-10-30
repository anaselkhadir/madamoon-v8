import type { Metadata } from "next";
import PageAPropos from "@/components/pages/PageAPropos";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "L'histoire de MADAMOON, par sa fondatrice",
  description:
    "Mouna a quitté la direction d'un site ferroviaire pour ouvrir MADAMOON, boutique de robes de mariée à Paris 10e. Son récit : le nom, le déclic, le showroom.",
  alternates: {
    canonical: "/a-propos/",
    languages: { fr: "/a-propos/", en: "/en/about/", "x-default": "/a-propos/" },
  },
  openGraph: partage("/a-propos/"),
};

export default function AProps() {
  return <PageAPropos langue="fr" />;
}
