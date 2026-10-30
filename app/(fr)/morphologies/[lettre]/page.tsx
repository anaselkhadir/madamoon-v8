import type { Metadata } from "next";
import PageMorphologie from "@/components/pages/PageMorphologie";
import { MORPHOLOGIES, morphologieParSlug } from "@/lib/madamoon";
import { EDITO } from "@/lib/morphologies";
import { description, partage } from "@/lib/meta";

export function generateStaticParams() {
  return MORPHOLOGIES.map((m) => ({ lettre: m.lettre.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lettre: string }>;
}): Promise<Metadata> {
  const { lettre } = await params;
  const m = morphologieParSlug(lettre);
  if (!m) return {};
  const e = EDITO[m.lettre];
  const slug = m.lettre.toLowerCase();
  return {
    /* Le gabarit ajoute « — MADAMOON » : ne pas le redire ici. Et la
     * lettre garde sa capitale — « morphologie en x » ne veut rien dire. */
    title: `Robe de mariée pour une morphologie en ${m.lettre}`,
    description: description(
      `Morphologie en ${m.lettre} : comment la reconnaître, et les coupes qui la mettent en valeur.`,
      e.promesse,
      "À essayer au showroom MADAMOON, Paris 10e.",
      "Les modèles sont à essayer au showroom MADAMOON, Paris 10e.",
    ),
    alternates: {
      canonical: `/morphologies/${slug}/`,
      languages: {
        fr: `/morphologies/${slug}/`,
        en: `/en/body-shapes/${slug}/`,
        "x-default": `/morphologies/${slug}/`,
      },
    },
    openGraph: partage(`/morphologies/${slug}/`),
  };
}

export default async function Morpho({ params }: { params: Promise<{ lettre: string }> }) {
  return <PageMorphologie params={params} langue="fr" />;
}
