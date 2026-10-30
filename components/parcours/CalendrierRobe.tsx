"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { langueDe } from "@/lib/langue";
import { ROBES } from "@/lib/madamoon";
import Calendly from "@/components/parcours/Calendly";

/*
 * Le calendrier, au courant de la robe repérée.
 *
 * Le modèle voyage dans l'adresse (?robe=uma) depuis sa fiche. Il est
 * transmis à Calendly en marqueur de campagne, jamais écrit dans une
 * réponse : le champ libre appartient à la mariée.
 *
 * La lecture se fait côté navigateur, comme pour la phrase qui annonce la
 * robe : la page de rendez-vous reste une page statique.
 */

export default function CalendrierRobe() {
  const langue = langueDe(usePathname() ?? "/");
  const slug = useSearchParams().get("robe");
  const robe = ROBES.find((r) => r.slug === slug);
  return <Calendly robe={robe?.slug} langue={langue} />;
}
