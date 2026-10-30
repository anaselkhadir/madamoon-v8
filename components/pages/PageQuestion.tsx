import ArticleQuestion from "@/components/pages/ArticleQuestion";
import { articles, faq } from "@/lib/contenu";
import { SLUGS_QUESTIONS } from "@/lib/questions";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * La page d'une question de la FAQ.
 *
 * La mise en page est celle de toutes les pages de question
 * (« ArticleQuestion ») ; ce fichier ne fait que la nourrir : la réponse
 * courte de la FAQ, l'article de « lib/questions.ts », le fil d'Ariane
 * FAQ › question, et les autres questions de la FAQ.
 */

export default function PageQuestion({ slug, langue }: { slug: string; langue: Langue }) {
  const T = t(langue);
  const liste = articles(langue);
  const rang = liste.findIndex((a) => a.slug === slug);
  const article = liste[rang];
  const courte = faq(langue)[rang];
  if (!article || !courte) return null;

  return (
    <ArticleQuestion
      langue={langue}
      q={courte.q}
      r={courte.r}
      article={article}
      adresse={`/faq/${slug}`}
      ariane={[
        { nom: T.raccourcis.lesQuestions, adresse: "/faq" },
        { nom: courte.q, adresse: `/faq/${slug}` },
      ]}
      retour={{ href: "/faq", label: T.pages.question.toutesLesQuestions }}
      autres={SLUGS_QUESTIONS.map((s, i) => ({ href: `/faq/${s}`, q: faq(langue)[i]?.q ?? "", rang: i })).filter(
        (a) => a.rang !== rang && a.q,
      )}
      /* L'adresse appelle un itinéraire : le site ne décrit pas l'accès
       * en transports, la fiche Google le fait. « Où essayer à Paris »
       * donne la même adresse, et le même lien. */
      itineraire={slug === SLUGS_QUESTIONS[6] || slug === SLUGS_QUESTIONS[20]}
    />
  );
}
