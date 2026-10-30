"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { bas, robeLigne } from "@/lib/contenu";
import { langueDe } from "@/lib/langue";
import { t } from "@/lib/textes";
import { ROBES } from "@/lib/madamoon";

/*
 * La robe repérée pendant la visite.
 *
 * Le modèle voyage dans l'adresse (?robe=uma) depuis la fiche. La lecture
 * se fait côté navigateur : la page de rendez-vous reste ainsi une page
 * statique, servable partout, y compris sur un hébergement de fichiers.
 */

export default function RobeChoisie() {
  const langue = langueDe(usePathname() ?? "/");
  const L = t(langue).pages.rendezvous;
  const robe = ROBES.find((r) => r.slug === useSearchParams().get("robe"));
  if (!robe) return null;

  return (
    <p className="texte mt-6">
      {L.robeAvant}
      <strong className="text-encre">{robe.nom}</strong>
      {L.robeApres(bas(robeLigne(robe, langue), langue))}
    </p>
  );
}
