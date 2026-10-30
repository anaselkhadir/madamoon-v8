import ArticleQuestion from "@/components/pages/ArticleQuestion";
import PageStyle from "@/components/pages/PageStyle";
import { coupeNom, questionsCoupe } from "@/lib/contenu";
import { coupeParAncre } from "@/lib/coupes";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * La page d'une question de coupe : /coupes/sirene/…
 *
 * La mise en page est celle de toutes les pages de question ; ce fichier
 * la nourrit avec la question de la coupe, son fil d'Ariane — Coupes ›
 * Robes de mariée sirène › la question — et les autres questions de la
 * même coupe. Le retour mène à la page de la coupe.
 */

export default function PageQuestionCoupe({
  ancre,
  slug,
  langue,
}: {
  /* L'ancre française de la coupe : « sirene ». */
  ancre: string;
  slug: string;
  langue: Langue;
}) {
  const T = t(langue);
  const s = coupeParAncre(ancre);
  const liste = s ? questionsCoupe(s.ancre, langue) : undefined;
  const rang = liste?.findIndex((x) => x.slug === slug) ?? -1;
  if (!s || !liste || rang < 0) return null;
  const x = liste[rang];
  const base = `/coupes/${s.ancre}`;
  /* « Robes de mariée sirène » : le nom de la page de la coupe, tel que
   * la barre et le fil d'Ariane le donnent. */
  const nom =
    langue === "fr"
      ? `Robes de mariée ${coupeNom(s, langue).toLowerCase()}`
      : `${coupeNom(s, langue)} wedding dresses`;

  /* Une page de style a sa propre mise en page. */
  if (x.style) return <PageStyle coupe={s} x={{ ...x, style: x.style }} langue={langue} />;

  return (
    <ArticleQuestion
      langue={langue}
      q={x.q}
      r={x.r}
      article={x}
      adresse={`${base}/${slug}`}
      ariane={[
        { nom: T.barre.coupes, adresse: "/coupes" },
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
