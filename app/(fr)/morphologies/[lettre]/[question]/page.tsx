import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageQuestionMorpho from "@/components/pages/PageQuestionMorpho";
import { MORPHOLOGIES, morphologieParSlug } from "@/lib/madamoon";
import { QUESTIONS_MORPHO } from "@/lib/morphologies-questions";
import { partage } from "@/lib/meta";

/* Une page par question de morphologie, sous l'adresse de la
 * morphologie : /morphologies/o/quelle-robe-de-mariee-morphologie-o/. */

export function generateStaticParams() {
  return MORPHOLOGIES.flatMap((m) =>
    (QUESTIONS_MORPHO[m.lettre] ?? []).map((x) => ({
      lettre: m.lettre.toLowerCase(),
      question: x.slug,
    })),
  );
}

const trouver = (lettre: string, question: string) => {
  const m = morphologieParSlug(lettre);
  return m ? QUESTIONS_MORPHO[m.lettre]?.find((x) => x.slug === question) : undefined;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lettre: string; question: string }>;
}): Promise<Metadata> {
  const { lettre, question } = await params;
  const x = trouver(lettre, question);
  if (!x) return {};
  const adresse = `/morphologies/${lettre}/${question}/`;
  return {
    title: x.q,
    description: x.description,
    alternates: {
      canonical: adresse,
      languages: {
        fr: adresse,
        en: `/en/body-shapes/${lettre}/${question}/`,
        "x-default": adresse,
      },
    },
    openGraph: partage(adresse),
  };
}

export default async function Question({
  params,
}: {
  params: Promise<{ lettre: string; question: string }>;
}) {
  const { lettre, question } = await params;
  if (!trouver(lettre, question)) notFound();
  return <PageQuestionMorpho lettre={lettre} slug={question} langue="fr" />;
}
