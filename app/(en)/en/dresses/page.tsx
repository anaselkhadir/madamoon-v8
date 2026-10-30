import type { Metadata } from "next";
import PageRobes from "@/components/pages/PageRobes";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Wedding dresses to try on in our Paris showroom",
  description:
    "MADAMOON wedding dresses: mermaid, ball gown, sheath, A-line, two-in-one. The collections of several designers, to try on by appointment in Paris 10e.",
  alternates: {
    canonical: "/en/dresses/",
    languages: { fr: "/robes/", en: "/en/dresses/", "x-default": "/robes/" },
  },
  openGraph: partage("/en/dresses/", "en"),
};

export default function Dresses() {
  return <PageRobes langue="en" />;
}
