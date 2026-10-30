import type { Metadata } from "next";
import ListeCoupsDeCoeur from "@/components/parcours/ListeCoupsDeCoeur";
import { partage } from "@/lib/meta";

/*
 * Les coups de cœur.
 *
 * Le contenu appartient au navigateur de la visiteuse ; cette page n'est
 * qu'un cadre. Elle reste hors des moteurs : il n'y a rien à indexer
 * d'une liste qui n'existe que chez elle, et une adresse vide dans les
 * résultats de recherche ne rendrait service à personne.
 */

export const metadata: Metadata = {
  title: "Vos coups de cœur",
  description:
    "Les robes de mariée que vous avez retenues chez MADAMOON, à retrouver avant votre essayage privé à Paris 10e.",
  alternates: { canonical: "/coups-de-coeur/" },
  openGraph: partage("/coups-de-coeur/"),
  robots: { index: false, follow: true },
};

export default function CoupsDeCoeur() {
  /* L'intitulé appartient au composant client : il n'est pas le même
   * selon que l'on regarde sa propre liste ou la sélection de quelqu'un
   * d'autre, et cela ne se sait qu'une fois l'adresse lue. */
  return (
    <div className="pt-[var(--entete)]">
      <ListeCoupsDeCoeur />
    </div>
  );
}
