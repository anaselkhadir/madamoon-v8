import type { Metadata } from "next";
import ListeCoupsDeCoeur from "@/components/parcours/ListeCoupsDeCoeur";
import { partage } from "@/lib/meta";

/*
 * Les coups de cœur, en anglais.
 *
 * Le contenu appartient au navigateur de la visiteuse ; cette page n'est
 * qu'un cadre. Elle reste hors des moteurs, comme sa jumelle française.
 */

export const metadata: Metadata = {
  title: "Your favourites",
  description:
    "The MADAMOON wedding dresses you have kept, to find again before your private fitting in Paris 10e.",
  alternates: { canonical: "/en/favourites/" },
  openGraph: partage("/en/favourites/", "en"),
  robots: { index: false, follow: true },
};

export default function Favourites() {
  return (
    <div className="pt-[var(--entete)]">
      <ListeCoupsDeCoeur />
    </div>
  );
}
