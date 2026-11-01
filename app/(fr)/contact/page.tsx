import type { Metadata } from "next";
import PageContact from "@/components/pages/PageContact";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Contact et horaires du showroom à Paris 10e",
  description:
    "Joindre MADAMOON, boutique de robes de mariée à Paris 10e : 234 rue du Faubourg Saint-Martin, téléphone, courriel, horaires et rendez-vous en ligne.",
  alternates: {
    canonical: "/contact/",
    languages: { fr: "/contact/", en: "/en/contact/", "x-default": "/contact/" },
  },
  openGraph: partage("/contact/"),
};

export default function Contact() {
  return <PageContact langue="fr" />;
}
