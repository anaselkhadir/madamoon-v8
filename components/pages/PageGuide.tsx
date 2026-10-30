import ArticleQuestion from "@/components/pages/ArticleQuestion";
import { GUIDES, type Guide } from "@/lib/guides";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * La page d'un guide : la mise en page des pages de question, nourrie
 * par « lib/guides.ts ». Fil d'Ariane Guides › titre, retour au sommaire
 * des guides, et les autres guides en bas.
 */
export default function PageGuide({ guide, langue }: { guide: Guide; langue: Langue }) {
  const T = t(langue);
  return (
    <ArticleQuestion
      langue={langue}
      q={guide.q}
      r={guide.r}
      article={{ ...guide, titre: guide.titre }}
      adresse={`/guides/${guide.slug}`}
      ariane={[
        { nom: T.raccourcis.lesGuides, adresse: "/guides" },
        { nom: guide.titre, adresse: `/guides/${guide.slug}` },
      ]}
      retour={{ href: "/guides", label: T.raccourcis.lesGuides }}
      autres={GUIDES.filter((g) => g.slug !== guide.slug).map((g, i) => ({ href: `/guides/${g.slug}`, q: g.titre, rang: i }))}
    />
  );
}
