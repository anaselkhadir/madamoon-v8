import type { Metadata } from "next";
import PageRobes from "@/components/pages/PageRobes";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Robes de mariée à essayer en showroom à Paris",
  description:
    "Les robes de mariée MADAMOON : sirène, princesse, fluide, trapèze, deux-en-un. Les collections de plusieurs créateurs, à essayer sur rendez-vous à Paris 10e.",
  alternates: {
    canonical: "/robes/",
    languages: { fr: "/robes/", en: "/en/dresses/", "x-default": "/robes/" },
  },
  openGraph: partage("/robes/"),
};

export default function Robes() {
  return <PageRobes langue="fr" />;
}
