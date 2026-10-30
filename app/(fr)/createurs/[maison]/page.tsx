import type { Metadata } from "next";
import PageMaison from "@/components/pages/PageMaison";
import { CREATEURS, createurParSlug } from "@/lib/madamoon";
import { description, partage } from "@/lib/meta";

export function generateStaticParams() {
  return CREATEURS.map((c) => ({ maison: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ maison: string }>;
}): Promise<Metadata> {
  const { maison } = await params;
  const createur = createurParSlug(maison);
  if (!createur) return {};
  return {
    /* Le gabarit du site ajoute « — MADAMOON » : ne pas le redire ici. */
    title: `Robes de mariée ${createur.nom} à Paris`,
    description: description(
      `Robes de mariée ${createur.nom} (${createur.origine.toLowerCase()}) au showroom MADAMOON, Paris 10e.`,
      createur.note,
      "Essayage privé sur rendez-vous.",
      "Essayage privé sur rendez-vous, confection sur mesure.",
    ),
    alternates: {
      canonical: `/createurs/${createur.slug}/`,
      languages: {
        fr: `/createurs/${createur.slug}/`,
        en: `/en/designers/${createur.slug}/`,
        "x-default": `/createurs/${createur.slug}/`,
      },
    },
    openGraph: partage(`/createurs/${createur.slug}/`),
  };
}

export default async function Maison({ params }: { params: Promise<{ maison: string }> }) {
  return <PageMaison params={params} langue="fr" />;
}
