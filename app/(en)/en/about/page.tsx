import type { Metadata } from "next";
import PageAPropos from "@/components/pages/PageAPropos";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "The MADAMOON story, by its founder",
  description:
    "Mouna left the running of a railway site to open MADAMOON, a wedding dress boutique in Paris 10e. Her story: the name, the turning point, the showroom.",
  alternates: {
    canonical: "/en/about/",
    languages: { fr: "/a-propos/", en: "/en/about/", "x-default": "/a-propos/" },
  },
  openGraph: partage("/en/about/", "en"),
};

export default function About() {
  return <PageAPropos langue="en" />;
}
