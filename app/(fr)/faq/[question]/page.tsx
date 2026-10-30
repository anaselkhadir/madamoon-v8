import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageQuestion from "@/components/pages/PageQuestion";
import { faq } from "@/lib/contenu";
import { ARTICLES, questionParSlug } from "@/lib/questions";
import { partage } from "@/lib/meta";

/* Une page par question de la FAQ, sous /faq/. L'adresse est la même
 * dans les deux langues : seul le préfixe /en change. */

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ question: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ question: string }>;
}): Promise<Metadata> {
  const { question } = await params;
  const trouve = questionParSlug(question);
  if (!trouve) return {};
  const adresse = `/faq/${question}/`;
  return {
    /* La question elle-même : c'est ce qu'une mariée tape. Le gabarit
     * ajoute le nom de la maison. */
    title: faq("fr")[trouve.rang]?.q,
    description: trouve.article.description,
    alternates: {
      canonical: adresse,
      languages: { fr: adresse, en: `/en${adresse}`, "x-default": adresse },
    },
    openGraph: partage(adresse),
  };
}

export default async function Question({ params }: { params: Promise<{ question: string }> }) {
  const { question } = await params;
  if (!questionParSlug(question)) notFound();
  return <PageQuestion slug={question} langue="fr" />;
}
