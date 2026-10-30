import type { Metadata } from "next";
import Ouverture from "@/components/accueil/Ouverture";
import Hero from "@/components/accueil/Hero";
import Maison from "@/components/accueil/Maison";
import Robes from "@/components/accueil/Robes";
import Morphologies from "@/components/accueil/Morphologies";
import Coupes from "@/components/accueil/Coupes";
import Createurs from "@/components/accueil/Createurs";
import Avis from "@/components/accueil/Avis";
import Showroom from "@/components/accueil/Showroom";
import { partage } from "@/lib/meta";

/*
 * L'accueil.
 *
 * Une seule phrase, en six temps : on entre par une image, on comprend
 * sa ligne, on voit ce qu'une coupe en fait, on apprend qui dessine les
 * robes, on écoute celles qui les ont portées, on pousse la porte. Puis
 * on prend rendez-vous.
 *
 * L'ordre n'est jamais énoncé — il est seulement tenu. Les robes elles-
 * mêmes ne sont pas montrées ici : on y arrive par une coupe ou par une
 * maison, ce qui vaut mieux qu'une vitrine de plus. L'accueil présente
 * des façons de chercher, pas un catalogue.
 *
 * Le hero défile comme le reste. Il est resté un temps collé, la
 * silhouette remontant par-dessus ; la maison n'a pas aimé cette
 * transition, et elle avait raison — le hero y restait figé pendant huit
 * cents pixels, coupé par une ligne blanche franche. Une image qui s'en
 * va vers le haut se passe d'effet.
 */

export const metadata: Metadata = {
  /* Le nom d'abord, puis le métier et la ville : c'est la forme que
   * Google reprend au-dessus de l'adresse, et celle qu'une mariée
   * reconnaît dans une page de résultats. */
  title: { absolute: "MADAMOON | Robes de mariée à Paris" },
  description:
    "Boutique de robes de mariée à Paris 10e. Les collections de plusieurs créateurs, essayage privé sur rendez-vous, confection sur mesure à partir de 1 500 €.",
  alternates: { canonical: "/", languages: { fr: "/", en: "/en/", "x-default": "/" } },
  openGraph: partage("/"),
};

export default function Accueil() {
  return (
    <>
      <Ouverture />
      <Hero langue="fr" />
      <Maison langue="fr" />
      <Robes langue="fr" />
      <Morphologies langue="fr" />
      <Coupes langue="fr" />
      <Createurs langue="fr" />
      <Avis langue="fr" />
      <Showroom langue="fr" />
    </>
  );
}
