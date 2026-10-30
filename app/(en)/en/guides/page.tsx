import type { Metadata } from "next";
import PageGuides from "@/components/pages/PageGuides";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Wedding dress guides",
  description:
    "Silhouettes, body shapes, fittings: every guide from the MADAMOON boutique to help you choose your wedding dress in Paris, one question per page.",
  alternates: {
    canonical: "/en/guides/",
    languages: { fr: "/guides/", en: "/en/guides/", "x-default": "/guides/" },
  },
  openGraph: partage("/en/guides/", "en"),
};

export default function Guides() {
  return <PageGuides langue="en" />;
}
