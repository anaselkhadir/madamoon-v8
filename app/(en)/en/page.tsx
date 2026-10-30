import type { Metadata } from "next";
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
 * L'accueil, en anglais.
 *
 * La même page que le français, dans la même langue de composants :
 * seules les propriétés changent. Rien n'est recopié — le jour où une
 * section bouge, elle bouge des deux côtés.
 *
 * L'ouverture n'est pas montée ici. Elle se joue une fois par session
 * sur l'accueil français, et la rejouer en passant à l'anglais ferait
 * quatre secondes de noir pour un changement de langue.
 */

export const metadata: Metadata = {
  /* Absolu : la page anglaise est un segment enfant de son gabarit, et
   * le modèle « %s — MADAMOON » s'y appliquerait — le titre disait deux
   * fois le nom de la maison. La page française, elle, partage son
   * segment avec le gabarit et y échappe. */
  title: { absolute: "MADAMOON | Wedding dresses in Paris" },
  description:
    "Bridal boutique in Paris 10e. The collections of several designers, private fittings by appointment, made to measure from €1,500.",
  alternates: { canonical: "/en/", languages: { fr: "/", en: "/en/", "x-default": "/" } },
  openGraph: partage("/en/", "en"),
};

export default function Home() {
  return (
    <>
      <Hero langue="en" />
      <Maison langue="en" />
      <Robes langue="en" />
      <Morphologies langue="en" />
      <Coupes langue="en" />
      <Createurs langue="en" />
      <Avis langue="en" />
      <Showroom langue="en" />
    </>
  );
}
