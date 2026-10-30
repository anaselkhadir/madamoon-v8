import type { Metadata } from "next";
import PageMaison from "@/components/pages/PageMaison";
import { CREATEURS, createurParSlug } from "@/lib/madamoon";
import { createurNom, createurNote, createurOrigine } from "@/lib/contenu";
import { description, partage } from "@/lib/meta";

/* Les identifiants de maison ne se traduisent pas : « olya-mak » est un
 * nom propre, pas un mot. Seule la rubrique change. */
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
  const nom = createurNom(createur, "en");
  return {
    title: `${nom} wedding dresses in Paris`,
    description: description(
      `${nom} wedding dresses (${createurOrigine(createur, "en").toLowerCase()}) at the MADAMOON showroom, Paris 10e.`,
      createurNote(createur, "en"),
      "Private fitting by appointment.",
      "Private fitting by appointment, made to measure.",
    ),
    alternates: {
      canonical: `/en/designers/${createur.slug}/`,
      languages: {
        fr: `/createurs/${createur.slug}/`,
        en: `/en/designers/${createur.slug}/`,
        "x-default": `/createurs/${createur.slug}/`,
      },
    },
    openGraph: partage(`/en/designers/${createur.slug}/`, "en"),
  };
}

export default async function Designer({ params }: { params: Promise<{ maison: string }> }) {
  return <PageMaison params={params} langue="en" />;
}
