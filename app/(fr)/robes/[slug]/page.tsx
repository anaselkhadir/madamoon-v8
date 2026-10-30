import type { Metadata } from "next";
import Link from "@/components/Lien";
import { notFound } from "next/navigation";
import Photo from "@/components/media/Photo";
import Film from "@/components/media/Film";
import Tuile from "@/components/Tuile";
import Catalogue from "@/components/Catalogue";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import TitreSection from "@/components/TitreSection";
import { ROBES, FAMILLES, MAISON, MORPHOLOGIES, SITE_URL } from "@/lib/madamoon";
import { FILMS } from "@/lib/films";
import { SCENES } from "@/lib/medias";
import { coupe, PLURIEL } from "@/lib/coupes";
import { altRobe } from "@/lib/alt";
import { coupeNom } from "@/lib/contenu";
import { de } from "@/lib/francais";
import { CoeurFiche } from "@/components/parcours/Coeur";
import { epingleRobe } from "@/lib/schema";

import PageRobe from "@/components/pages/PageRobe";
import { couverture } from "@/lib/couverture";

/*
 * La fiche d'une robe, en français.
 *
 * La page ne porte plus que ce qui lui est propre : ses adresses
 * statiques et ses métadonnées. Le corps est commun aux deux langues.
 */

export function generateStaticParams() {
  return ROBES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const robe = ROBES.find((r) => r.slug === slug);
  if (!robe) return {};

  const epingle = epingleRobe({
    slug: robe.slug,
    nom: robe.nom,
    ligne: robe.ligne,
    regard: robe.regard,
    createur: robe.createur,
    media: couverture(robe),
    alt: altRobe(robe, "fr"),
  });

  /* La première lettre de la ligne tombe en minuscule, et elle seule :
   * « toLowerCase() » sur toute la phrase écrasait aussi les noms propres
   * des maisons qu'elle cite. */
  const ligneBasse = robe.ligne.charAt(0).toLowerCase() + robe.ligne.slice(1);

  return {
    /*
     * Court, parce que Google coupe.
     *
     * Le titre portait la ligne entière, et la description y ajoutait le
     * regard : chez Santana, cela donnait cent deux caractères de titre
     * et neuf cents de description, là où le résultat de recherche en
     * montre une soixantaine et cent soixante. Ce qui dépassait était
     * remplacé par des points de suspension — l'adresse du showroom, qui
     * est précisément ce qu'une mariée cherche, n'apparaissait jamais.
     * Le titre ne garde donc que le nom et la coupe, la description la
     * ligne et le rendez-vous. Le regard reste sur la page, où il se lit.
     */
    title: `Robe de mariée ${robe.nom} — ${coupeNom(robe.categorie, "fr").toLowerCase()}`,
    description: `${robe.nom} : ${ligneBasse}. À essayer sur rendez-vous au showroom MADAMOON, Paris 10e.`,
    alternates: {
      canonical: `/robes/${robe.slug}/`,
      languages: {
        fr: `/robes/${robe.slug}/`,
        en: `/en/dresses/${robe.slug}/`,
        "x-default": `/robes/${robe.slug}/`,
      },
    },
    /*
     * L'Open Graph du gabarit est écarté ici, et réécrit dans la page.
     *
     * Une épingle enrichie demande « og:type: product », que l'API de
     * Next ne sait pas produire — son type n'accepte que « website »,
     * « article » et quelques autres. Laisser l'héritage en place
     * donnerait deux « og:type » contradictoires sur la même page ; on le
     * coupe donc, et l'on écrit les balises à la main, avec « property »
     * comme le veut le protocole.
     *
     * La carte Twitter, elle, doit être écrite : Next la déduisait de
     * l'Open Graph hérité, et la couper la faisait disparaître. On la
     * reprend en grand format, ce qui vaut mieux qu'une vignette pour une
     * robe entière.
     */
    openGraph: null,
    twitter: {
      card: "summary_large_image",
      title: epingle.titre,
      description: epingle.description,
      images: epingle.image ? [epingle.image.url] : undefined,
    },
  };
}

export default async function Fiche({ params }: { params: Promise<{ slug: string }> }) {
  return <PageRobe params={params} langue="fr" />;
}
