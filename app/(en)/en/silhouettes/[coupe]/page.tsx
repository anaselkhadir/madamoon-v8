import type { Metadata } from "next";
import PageCoupe from "@/components/pages/PageCoupe";
import { FAMILLES } from "@/lib/madamoon";
import { COUPES, coupeParAncre } from "@/lib/coupes";
import { COUPES_EN } from "@/lib/langue";
import { coupeNom, familleTexte } from "@/lib/contenu";
import { description, partage } from "@/lib/meta";

/*
 * La page d'une coupe, en anglais.
 *
 * L'adresse porte l'ancre anglaise — « mermaid » et non « sirene ». La
 * page la reconvertit en ancre française avant de chercher la coupe :
 * les données ne connaissent que le français.
 */

/* mermaid → sirene, ball-gown → princesse, et ainsi de suite. */
const VERS_FR = Object.fromEntries(Object.entries(COUPES_EN).map(([fr, en]) => [en, fr]));

export function generateStaticParams() {
  return COUPES.map((s) => ({ coupe: COUPES_EN[s.ancre] ?? s.ancre }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ coupe: string }>;
}): Promise<Metadata> {
  const { coupe } = await params;
  const s = coupeParAncre(VERS_FR[coupe] ?? coupe);
  if (!s) return {};
  const nom = coupeNom(s, "en");
  return {
    title: `${nom} wedding dresses in Paris`,
    description: description(
      `The ${nom.toLowerCase()} wedding dresses of the MADAMOON showroom, Paris 10e.`,
      familleTexte(s.nom, "en", FAMILLES[s.nom]),
      "Private fitting by appointment.",
      "Private fitting by appointment, made to measure.",
    ),
    alternates: {
      canonical: `/en/silhouettes/${coupe}/`,
      languages: {
        fr: `/coupes/${s.ancre}/`,
        en: `/en/silhouettes/${coupe}/`,
        "x-default": `/coupes/${s.ancre}/`,
      },
    },
    openGraph: partage(`/en/silhouettes/${coupe}/`, "en"),
  };
}

export default async function Silhouette({ params }: { params: Promise<{ coupe: string }> }) {
  const { coupe } = await params;
  return <PageCoupe params={Promise.resolve({ coupe: VERS_FR[coupe] ?? coupe })} langue="en" />;
}
