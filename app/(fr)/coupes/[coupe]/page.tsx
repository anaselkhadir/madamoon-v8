import type { Metadata } from "next";
import PageCoupe from "@/components/pages/PageCoupe";
import { FAMILLES } from "@/lib/madamoon";
import { COUPES, coupeParAncre } from "@/lib/coupes";
import { COUPES_EN } from "@/lib/langue";
import { description, partage } from "@/lib/meta";

export function generateStaticParams() {
  return COUPES.map((s) => ({ coupe: s.ancre }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ coupe: string }>;
}): Promise<Metadata> {
  const { coupe } = await params;
  const s = coupeParAncre(coupe);
  if (!s) return {};
  const en = COUPES_EN[s.ancre] ?? s.ancre;
  return {
    /* Le gabarit du site ajoute « — MADAMOON » : ne pas le redire ici. */
    title: `Robe de mariée ${s.nom.toLowerCase()} à Paris`,
    description: description(
      `Les robes de mariée ${s.nom.toLowerCase()} du showroom MADAMOON, Paris 10e.`,
      FAMILLES[s.nom],
      "Essayage privé sur rendez-vous.",
      "Essayage privé sur rendez-vous, confection sur mesure.",
    ),
    alternates: {
      canonical: `/coupes/${s.ancre}/`,
      languages: {
        fr: `/coupes/${s.ancre}/`,
        en: `/en/silhouettes/${en}/`,
        "x-default": `/coupes/${s.ancre}/`,
      },
    },
    openGraph: partage(`/coupes/${s.ancre}/`),
  };
}

export default async function Coupe({ params }: { params: Promise<{ coupe: string }> }) {
  return <PageCoupe params={params} langue="fr" />;
}
