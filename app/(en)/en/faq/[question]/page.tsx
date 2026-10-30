import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageQuestion from "@/components/pages/PageQuestion";
import { faq } from "@/lib/contenu";
import { ARTICLES_EN } from "@/lib/en/questions";
import { partage } from "@/lib/meta";

/* The page of a question, in English. Same address as the French one,
 * under /en. */

export function generateStaticParams() {
  return ARTICLES_EN.map((a) => ({ question: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ question: string }>;
}): Promise<Metadata> {
  const { question } = await params;
  const rang = ARTICLES_EN.findIndex((a) => a.slug === question);
  if (rang < 0) return {};
  const adresse = `/faq/${question}/`;
  return {
    title: faq("en")[rang]?.q,
    description: ARTICLES_EN[rang].description,
    alternates: {
      canonical: `/en${adresse}`,
      languages: { fr: adresse, en: `/en${adresse}`, "x-default": adresse },
    },
    openGraph: partage(`/en${adresse}`, "en"),
  };
}

export default async function Question({ params }: { params: Promise<{ question: string }> }) {
  const { question } = await params;
  if (!ARTICLES_EN.some((a) => a.slug === question)) notFound();
  return <PageQuestion slug={question} langue="en" />;
}
