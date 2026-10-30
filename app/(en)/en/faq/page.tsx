import type { Metadata } from "next";
import PageFaq from "@/components/pages/PageFaq";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Wedding dress questions, answered",
  description:
    "How long it takes, how a fitting works, the stages of made-to-measure, payment, price, showroom hours: the answers from MADAMOON, Paris 10e.",
  alternates: {
    canonical: "/en/faq/",
    languages: { fr: "/faq/", en: "/en/faq/", "x-default": "/faq/" },
  },
  openGraph: partage("/en/faq/", "en"),
};

export default function Faq() {
  return <PageFaq langue="en" />;
}
