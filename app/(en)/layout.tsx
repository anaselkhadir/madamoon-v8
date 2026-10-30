import type { Metadata, Viewport } from "next";
import Gabarit from "@/components/chrome/Gabarit";
import "../globals.css";

import { SITE_URL } from "@/lib/madamoon";
import { APERCU } from "@/lib/chemin";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MADAMOON | Wedding dresses in Paris",
    template: "%s — MADAMOON",
  },
  description:
    "Bridal boutique and showroom in Paris 10e. Private fittings by appointment, selected designers, made to measure from €1,500.",
  keywords: [
    "wedding dress",
    "wedding dresses",
    "bridal boutique",
    "wedding dress Paris",
    "bridal boutique Paris",
    "bridal showroom Paris",
  ],
  /*
   * L'image de partage, et les liens de langue.
   *
   * Sans « images », un lien du site collé dans WhatsApp, sur Instagram
   * ou dans Pinterest sortait sans visuel — seules les fiches de robe en
   * avaient une, héritée de leur photographie. L'image est le showroom
   * de la maison, et non une robe : un lien partagé doit dire « voici
   * une vraie boutique à Paris », ce qu'aucune photographie de robe ne
   * dit. Mille deux cents sur six cent trente, la mesure que tous
   * attendent.
   *
   * « languages » déclare enfin que le français et l'anglais sont la
   * même page en deux langues. Sans cela, Google voyait deux sites qui
   * se répètent et devait deviner lequel servir à qui.
   */
  alternates: {
    canonical: "/en/",
    languages: { fr: "/", en: "/en/", "x-default": "/" },
  },
  /*
   * L'Open Graph vient de « partage() », comme sur chaque page.
   *
   * Le gabarit fixait ici le titre, la description et l'adresse, et les
   * imposait à toutes ses pages : un lien vers « L'histoire de MADAMOON »
   * collé dans WhatsApp annonçait « Robes de mariée à Paris » et renvoyait
   * à la racine. Les pages ont donc déclaré le leur — et comme Next
   * remplace « openGraph » au lieu de le compléter, elles ont effacé
   * l'image du même coup. Une seule fonction les écrit maintenant toutes,
   * et il n'y a plus qu'un endroit où se tromper.
   *
   * Le titre et la description restent absents : Next les reprend de la
   * page, ce qui est exactement ce qu'on veut.
   */
  openGraph: partage("/en/", "en"),
  twitter: {
    card: "summary_large_image",
    images: ["/partage/madamoon-showroom-paris-10e.jpg"],
  },
  /* L'aperçu GitHub Pages est fermé aux moteurs : une copie indexée
   * ferait concurrence au vrai site. */
  robots: APERCU ? { index: false, follow: false } : { index: true, follow: true },
  /* La revendication du domaine chez Pinterest : sans elle, les épingles
   * du site ne portent pas le nom de la maison et ne rapportent aucune
   * statistique. La balise doit rester sur toutes les pages — Pinterest
   * relit la racine, mais une revendication ne se retire pas. */
  verification: { other: { "p:domain_verify": "3186bf4f89c6999a6178fa094b93f66e" } },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function GabaritAnglais({ children }: { children: React.ReactNode }) {
  return <Gabarit langue="en">{children}</Gabarit>;
}
