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
import { de } from "@/lib/francais";
import { CoeurFiche } from "@/components/parcours/Coeur";
import { epingleRobe } from "@/lib/schema";

import PageRobe from "@/components/pages/PageRobe";
import { coupeNom, robeLigne } from "@/lib/contenu";
import { couverture } from "@/lib/couverture";

/*
 * La fiche d'une robe, en anglais.
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
    alt: altRobe(robe, "en"),
  });

  const ligne = robeLigne(robe, "en");
  const ligneBasse = ligne.charAt(0).toLowerCase() + ligne.slice(1);

  return {
    /* Court, pour la même raison que la fiche française : le résultat de
     * recherche montre une soixantaine de caractères de titre et cent
     * soixante de description, et coupait l'adresse du showroom. */
    title: `${robe.nom} wedding dress — ${coupeNom(robe.categorie, "en").toLowerCase()}`,
    description: `${robe.nom}: ${ligneBasse}. To try on by appointment at the MADAMOON showroom, Paris 10e.`,
    alternates: {
      canonical: `/en/dresses/${robe.slug}/`,
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
  return <PageRobe params={params} langue="en" />;
}
