import type { Metadata } from "next";
import PageShowroom from "@/components/pages/PageShowroom";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Showroom robe de mariée à Paris 10e",
  description:
    "Le showroom MADAMOON, 234 rue du Faubourg Saint-Martin à Paris 10e : essayage privé d'une heure, sur rendez-vous, accompagnée de qui vous voulez.",
  alternates: {
    canonical: "/showroom/",
    languages: { fr: "/showroom/", en: "/en/showroom/", "x-default": "/showroom/" },
  },
  openGraph: partage("/showroom/"),
};

export default function Showroom() {
  return <PageShowroom langue="fr" />;
}
