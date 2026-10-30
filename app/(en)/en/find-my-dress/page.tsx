import type { Metadata } from "next";
import PageTrouver from "@/components/pages/PageTrouver";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Find my wedding dress",
  description:
    "Three ways to begin: by silhouette, by your body shape, or in conversation with Élise. MADAMOON wedding dresses, showroom in Paris 10e.",
  alternates: {
    canonical: "/en/find-my-dress/",
    languages: {
      fr: "/trouver-ma-robe/",
      en: "/en/find-my-dress/",
      "x-default": "/trouver-ma-robe/",
    },
  },
  openGraph: partage("/en/find-my-dress/", "en"),
};

export default function FindMyDress() {
  return <PageTrouver langue="en" />;
}
