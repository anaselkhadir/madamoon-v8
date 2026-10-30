import ArticleQuestion from "@/components/pages/ArticleQuestion";
import { morphoNom, questionsMorpho } from "@/lib/contenu";
import { morphologieParSlug } from "@/lib/madamoon";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * La page d'une question de morphologie : /morphologies/o/…
 *
 * La mise en page est celle de toutes les pages de question ; ce fichier
 * la nourrit avec la question de la morphologie, son fil d'Ariane —
 * Morphologies › Morphologie en O › la question — et les autres
 * questions de la même morphologie. Le retour mène à sa page.
 */

export default function PageQuestionMorpho({
  lettre,
  slug,
  langue,
}: {
  lettre: string;
  slug: string;
  langue: Langue;
}) {
  const T = t(langue);
  const m = morphologieParSlug(lettre);
  const liste = m ? questionsMorpho(m.lettre, langue) : undefined;
  const rang = liste?.findIndex((x) => x.slug === slug) ?? -1;
  if (!m || !liste || rang < 0) return null;
  const x = liste[rang];
  const base = `/morphologies/${m.lettre.toLowerCase()}`;
  const nom = morphoNom(m, langue);

  return (
    <ArticleQuestion
      langue={langue}
      q={x.q}
      r={x.r}
      article={x}
      adresse={`${base}/${slug}`}
      ariane={[
        { nom: T.barre.morphologies, adresse: "/morphologies" },
        { nom, adresse: base },
        { nom: x.q, adresse: `${base}/${slug}` },
      ]}
      retour={{ href: base, label: nom }}
      autres={liste
        .map((y, i) => ({ href: `${base}/${y.slug}`, q: y.q, rang: i }))
        .filter((a) => a.rang !== rang)}
    />
  );
}
