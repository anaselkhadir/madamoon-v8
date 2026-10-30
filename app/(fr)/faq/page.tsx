import type { Metadata } from "next";
import PageFaq from "@/components/pages/PageFaq";
import { partage } from "@/lib/meta";

/* L'adresse est celle de l'ancien site WordPress : /faq/ existait, elle
 * était indexée, et elle était renvoyée faute de page. Elle reprend sa
 * place plutôt que de rediriger. */

export const metadata: Metadata = {
  title: "Questions fréquentes sur la robe de mariée",
  description:
    "Délais, déroulé d'un essayage, étapes du sur-mesure, paiement, prix, horaires du showroom : les réponses de la boutique MADAMOON, Paris 10e.",
  alternates: {
    canonical: "/faq/",
    languages: { fr: "/faq/", en: "/en/faq/", "x-default": "/faq/" },
  },
  openGraph: partage("/faq/"),
};

export default function Faq() {
  return <PageFaq langue="fr" />;
}
