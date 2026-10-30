import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageQuestionCoupe from "@/components/pages/PageQuestionCoupe";
import { COUPES } from "@/lib/coupes";
import { COUPES_EN } from "@/lib/langue";
import { QUESTIONS_COUPES_EN } from "@/lib/en/coupes-questions";
import { partage } from "@/lib/meta";

/*
 * The page of a silhouette question, in English.
 *
 * The address carries the English silhouette — « mermaid », not
 * « sirene » — and is converted back to the French anchor before looking
 * the question up: the data only knows French anchors.
 */

const VERS_FR = Object.fromEntries(Object.entries(COUPES_EN).map(([fr, en]) => [en, fr]));

export function generateStaticParams() {
  return COUPES.flatMap((s) =>
    (QUESTIONS_COUPES_EN[s.ancre] ?? []).map((x) => ({
      coupe: COUPES_EN[s.ancre] ?? s.ancre,
      question: x.slug,
    })),
  );
}

const trouver = (coupe: string, question: string) =>
  QUESTIONS_COUPES_EN[VERS_FR[coupe] ?? coupe]?.find((x) => x.slug === question);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ coupe: string; question: string }>;
}): Promise<Metadata> {
  const { coupe, question } = await params;
  const x = trouver(coupe, question);
  if (!x) return {};
  const ancre = VERS_FR[coupe] ?? coupe;
  const fr = `/coupes/${ancre}/${question}/`;
  const en = `/en/silhouettes/${coupe}/${question}/`;
  return {
    title: x.titre ?? x.q,
    description: x.description,
    alternates: { canonical: en, languages: { fr, en, "x-default": fr } },
    openGraph: partage(en, "en"),
  };
}

export default async function Question({
  params,
}: {
  params: Promise<{ coupe: string; question: string }>;
}) {
  const { coupe, question } = await params;
  if (!trouver(coupe, question)) notFound();
  return <PageQuestionCoupe ancre={VERS_FR[coupe] ?? coupe} slug={question} langue="en" />;
}
