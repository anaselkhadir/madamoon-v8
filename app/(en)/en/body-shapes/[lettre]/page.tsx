import type { Metadata } from "next";
import PageMorphologie from "@/components/pages/PageMorphologie";
import { MORPHOLOGIES, morphologieParSlug } from "@/lib/madamoon";
import { edito } from "@/lib/contenu";
import { description, partage } from "@/lib/meta";

/* Les lettres ne se traduisent pas : /en/body-shapes/a comme
 * /morphologies/a. C'est un repère, pas un mot. */
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
  const e = edito(m.lettre, "en");
  const slug = m.lettre.toLowerCase();
  return {
    title: `Wedding dresses for the ${m.lettre} body shape`,
    description: description(
      `The ${m.lettre} body shape: how to recognise it, and the cuts that suit it.`,
      e.promesse,
      "To try on at the MADAMOON showroom, Paris 10e.",
      "The models are to try on at the MADAMOON showroom, Paris 10e.",
    ),
    alternates: {
      canonical: `/en/body-shapes/${slug}/`,
      languages: {
        fr: `/morphologies/${slug}/`,
        en: `/en/body-shapes/${slug}/`,
        "x-default": `/morphologies/${slug}/`,
      },
    },
    openGraph: partage(`/en/body-shapes/${slug}/`, "en"),
  };
}

export default async function BodyShape({ params }: { params: Promise<{ lettre: string }> }) {
  return <PageMorphologie params={params} langue="en" />;
}
