import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageQuestionMorpho from "@/components/pages/PageQuestionMorpho";
import { MORPHOLOGIES, morphologieParSlug } from "@/lib/madamoon";
import { QUESTIONS_MORPHO_EN } from "@/lib/en/morphologies-questions";
import { partage } from "@/lib/meta";

/* The page of a body-shape question, in English: same address as the
 * French one, under /en/body-shapes. */

export function generateStaticParams() {
  return MORPHOLOGIES.flatMap((m) =>
    (QUESTIONS_MORPHO_EN[m.lettre] ?? []).map((x) => ({
      lettre: m.lettre.toLowerCase(),
      question: x.slug,
    })),
  );
}

const trouver = (lettre: string, question: string) => {
  const m = morphologieParSlug(lettre);
  return m ? QUESTIONS_MORPHO_EN[m.lettre]?.find((x) => x.slug === question) : undefined;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lettre: string; question: string }>;
}): Promise<Metadata> {
  const { lettre, question } = await params;
  const x = trouver(lettre, question);
  if (!x) return {};
  const fr = `/morphologies/${lettre}/${question}/`;
  const en = `/en/body-shapes/${lettre}/${question}/`;
  return {
    title: x.q,
    description: x.description,
    alternates: { canonical: en, languages: { fr, en, "x-default": fr } },
    openGraph: partage(en, "en"),
  };
}

export default async function Question({
  params,
}: {
  params: Promise<{ lettre: string; question: string }>;
}) {
  const { lettre, question } = await params;
  if (!trouver(lettre, question)) notFound();
  return <PageQuestionMorpho lettre={lettre} slug={question} langue="en" />;
}
