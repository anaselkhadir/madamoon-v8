import type { Metadata } from "next";
import PageContact from "@/components/pages/PageContact";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Contact and showroom hours in Paris 10e",
  description:
    "Reach MADAMOON, bridal boutique in Paris 10e: 234 rue du Faubourg Saint-Martin, phone, email, opening hours by appointment and online booking.",
  alternates: {
    canonical: "/en/contact/",
    languages: { fr: "/contact/", en: "/en/contact/", "x-default": "/contact/" },
  },
  openGraph: partage("/en/contact/", "en"),
};

export default function Contact() {
  return <PageContact langue="en" />;
}
