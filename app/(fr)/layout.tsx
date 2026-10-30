import type { Metadata, Viewport } from "next";
import Gabarit from "@/components/chrome/Gabarit";
import "../globals.css";

import { SITE_URL } from "@/lib/madamoon";
import { APERCU } from "@/lib/chemin";
import { partage } from "@/lib/meta";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MADAMOON | Robes de mariée à Paris",
    template: "%s — MADAMOON",
  },
  description:
    "Boutique et showroom de robes de mariée à Paris 10e. Essayage privé sur rendez-vous, créateurs sélectionnés, confection sur mesure à partir de 1 500 €.",
  keywords: [
    "robe de mariée",
    "robes de mariée",
    "boutique robe de mariée",
    "robe de mariée Paris",
    "boutique robe de mariée Paris",
    "showroom robe de mariée Paris",
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
    canonical: "/",
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
  openGraph: partage("/"),
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
  /* La Search Console, par la balise HTML.
   *
   * Le jeton fourni l'a été sous la forme « google-site-verification=… »,
   * qui est celle d'un enregistrement DNS TXT. Le domaine est bien servi
   * par les serveurs de Hostinger, mais il appartient à un autre compte
   * que celui relié ici : l'API refuse d'y toucher. La balise est donc
   * la voie praticable.
   *
   * Si Google refuse la vérification, c'est que ce jeton était celui du
   * DNS : il faut alors reprendre celui que la Search Console donne pour
   * la méthode « Balise HTML », qui est un autre texte.
   *
   * La balise reste sur toutes les pages : Google relit la racine, mais
   * une propriété vérifiée se perd si la preuve disparaît. */
  verification: {
    google: "4G-bRcILjkqMghmAlEeeWb4qvktBQIF6buHi-1Kr-Kc",
    other: { "p:domain_verify": "3186bf4f89c6999a6178fa094b93f66e" },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function GabaritFrancais({ children }: { children: React.ReactNode }) {
  return <Gabarit langue="fr">{children}</Gabarit>;
}
