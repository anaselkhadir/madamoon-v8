import type { Metadata } from "next";
import PageRendezVous from "@/components/pages/PageRendezVous";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Book an appointment — private fitting in Paris",
  description:
    "Book your private wedding dress fitting at the MADAMOON showroom, 234 rue du Faubourg Saint-Martin, Paris 10e. One hour, the showroom to yourself.",
  alternates: {
    canonical: "/en/appointment/",
    languages: { fr: "/rendez-vous/", en: "/en/appointment/", "x-default": "/rendez-vous/" },
  },
  openGraph: partage("/en/appointment/", "en"),
};

export default function Appointment() {
  return <PageRendezVous langue="en" />;
}
