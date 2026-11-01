import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageQuestionCoupe from "@/components/pages/PageQuestionCoupe";
import { COUPES } from "@/lib/coupes";
import { COUPES_EN } from "@/lib/langue";
import { QUESTIONS_COUPES } from "@/lib/coupes-questions";
import { QUESTIONS_COUPES_EN } from "@/lib/en/coupes-questions";
import { partage, titre } from "@/lib/meta";

/* Une page par question de coupe, sous l'adresse de la coupe :
 * /coupes/sirene/qu-est-ce-qu-une-robe-de-mariee-sirene/. */

export function generateStaticParams() {
  return COUPES.flatMap((s) =>
    (QUESTIONS_COUPES[s.ancre] ?? []).map((x) => ({ coupe: s.ancre, question: x.slug })),
  );
}

const trouver = (coupe: string, question: string) =>
  QUESTIONS_COUPES[coupe]?.find((x) => x.slug === question);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ coupe: string; question: string }>;
}): Promise<Metadata> {
  const { coupe, question } = await params;
  const x = trouver(coupe, question);
  if (!x) return {};
  const fr = `/coupes/${coupe}/${question}/`;
  const en = `/en/silhouettes/${COUPES_EN[coupe] ?? coupe}/${question}/`;
  /* Les questions ajoutées pour le référencement n'existent qu'en
   * français : pas de « hreflang » vers une page anglaise absente. */
  const enExiste = (QUESTIONS_COUPES_EN[coupe] ?? []).some((q) => q.slug === question);
  return {
    title: titre(x.titre ?? x.q),
    description: x.description,
    alternates: { canonical: fr, languages: enExiste ? { fr, en, "x-default": fr } : { fr, "x-default": fr } },
    openGraph: partage(fr),
  };
}

export default async function Question({
  params,
}: {
  params: Promise<{ coupe: string; question: string }>;
}) {
  const { coupe, question } = await params;
  if (!trouver(coupe, question)) notFound();
  return <PageQuestionCoupe ancre={coupe} slug={question} langue="fr" />;
}
