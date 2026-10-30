import type { Metadata } from "next";
import PageCreateurs from "@/components/pages/PageCreateurs";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Designer wedding dresses in Paris",
  description:
    "Watters Designs, Casablanca Bridal, Olya Mak, Monica Loretti: designer wedding dresses to try on in Paris, at the MADAMOON showroom in the 10th, by appointment.",
  alternates: {
    canonical: "/en/designers/",
    languages: { fr: "/createurs/", en: "/en/designers/", "x-default": "/createurs/" },
  },
  openGraph: partage("/en/designers/", "en"),
};

export default function Designers() {
  return <PageCreateurs langue="en" />;
}
