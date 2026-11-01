import Link from "@/components/Lien";
import AppelElise from "@/components/AppelElise";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import FilDAriane from "@/components/FilDAriane";
import { GROUPES } from "@/components/pages/PageFaq";
import { COUPES } from "@/lib/coupes";
import { MORPHOLOGIES } from "@/lib/madamoon";
import { coupeNom, faq, morphoNom, questionsCoupe, questionsMorpho } from "@/lib/contenu";
import { SLUGS_QUESTIONS } from "@/lib/questions";
import { GUIDES } from "@/lib/guides";
import { PAGES_FAMILLES, adresseFamille } from "@/lib/familles";
import { t } from "@/lib/textes";
import { versLangue, type Langue } from "@/lib/langue";
import { collection } from "@/lib/schema";

/*
 * Les guides.
 *
 * Le sommaire de toutes les pages de question du site : celles des
 * coupes, celles des morphologies, celles de la FAQ. Chacune vit déjà
 * sous sa rubrique ; ici, elles se lisent ensemble, rangées par thème
 * puis par coupe ou par silhouette.
 *
 * Rien n'est écrit sur cette page : elle lit les tables. Une question
 * ajoutée à une coupe y paraît d'elle-même, une morphologie sans
 * questions n'y paraît pas. Pas de compte non plus — la maison ne veut
 * pas de nombres affichés.
 */

type Groupe = { titre: string; href?: string; liens: { href: string; q: string }[] };

function Theme({
  id,
  titre,
  texte,
  groupes,
}: {
  id: string;
  titre: string;
  texte: string;
  groupes: Groupe[];
}) {
  return (
    <section
      id={id}
      className="gouttiere scroll-mt-[calc(var(--entete)+1.5rem)] border-t border-fil py-[clamp(3rem,6vw,5.5rem)]"
    >
      <h2 className="titre-section">{titre}</h2>
      <p className="texte mesure-l mt-4">{texte}</p>
      {groupes
        .filter((g) => g.liens.length)
        .map((g) => (
          <div
            key={g.titre}
            className="mt-[clamp(2rem,4.5vw,3.5rem)] grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-3 lg:grid-cols-12"
          >
            <h3 className="legende lg:col-span-3 lg:pt-3">
              {g.href ? (
                <Link href={g.href} className="transition-colors duration-300 hover:text-action">
                  {g.titre}
                </Link>
              ) : (
                g.titre
              )}
            </h3>
            {/* Deux colonnes dès la tablette : une coupe et ses quatorze
              * questions tiennent sur un écran. */}
            <ul className="grid gap-x-[clamp(1.5rem,4vw,3rem)] md:grid-cols-2 lg:col-span-9">
              {g.liens.map((x) => (
                <li key={x.href} className="border-t border-fil">
                  <Link
                    href={x.href}
                    className="texte flex items-baseline justify-between gap-4 py-3 transition-colors duration-300 hover:text-action"
                  >
                    <span className="lien-texte">{x.q}</span>
                    <span aria-hidden="true" className="shrink-0">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </section>
  );
}

export default function PageGuides({ langue }: { langue: Langue }) {
  const T = t(langue);
  const L = T.pages.guides;
  const F = T.pages.faq;
  const questions = faq(langue);

  const coupes: Groupe[] = COUPES.map((c) => ({
    titre: coupeNom(c, langue),
    href: `/coupes/${c.ancre}`,
    liens: (questionsCoupe(c.ancre, langue) ?? []).map((x) => ({
      href: `/coupes/${c.ancre}/${x.slug}`,
      q: x.q,
    })),
  }));

  const morphologies: Groupe[] = MORPHOLOGIES.map((m) => {
    const base = `/morphologies/${m.lettre.toLowerCase()}`;
    return {
      titre: morphoNom(m, langue),
      href: base,
      liens: (questionsMorpho(m.lettre, langue) ?? []).map((x) => ({
        href: `${base}/${x.slug}`,
        q: x.q,
      })),
    };
  });

  /* La FAQ, dans les thèmes de sa page : les sept premières questions
   * d'abord, puis les groupes de « D'autres questions ». */
  const versFaq = (rangs: number[]) =>
    rangs
      .filter((i) => questions[i] && SLUGS_QUESTIONS[i])
      .map((i) => ({ href: `/faq/${SLUGS_QUESTIONS[i]}`, q: questions[i].q }));
  const essayage: Groupe[] = [
    { titre: L.lessentiel, href: "/faq", liens: versFaq([0, 1, 2, 3, 4, 5, 6]) },
    ...GROUPES.map((g) => ({ titre: F.groupes[g.cle], liens: versFaq(g.rangs) })),
  ];

  /* Les guides et les pages de style, de matière et de détail : écrits en
   * français pour l'instant, ils n'apparaissent que sur la page française. */
  const guides: Groupe[] =
    langue === "fr"
      ? [
          { titre: "Les guides", liens: GUIDES.map((g) => ({ href: `/guides/${g.slug}`, q: g.titre })) },
          {
            titre: "Styles, matières, détails et grande taille",
            liens: PAGES_FAMILLES.map((p) => ({ href: adresseFamille(p), q: p.titre })),
          },
        ]
      : [];

  const themes = [
    ...(guides.length
      ? [
          {
            id: "guides",
            titre: "Choisir sa robe",
            texte: "Le prix, les styles, les matières et les détails : des pages qui répondent à ce que l'on cherche avant d'avoir choisi une coupe.",
            groupes: guides,
          },
        ]
      : []),
    { id: "coupes", titre: L.coupes, texte: L.coupesTexte, groupes: coupes },
    { id: "morphologies", titre: L.morphologies, texte: L.morphologiesTexte, groupes: morphologies },
    { id: "essayage", titre: L.essayage, texte: L.essayageTexte, groupes: essayage },
  ];

  /* Pour le moteur : les guides et les pages transversales, qui ne
   * vivent que dans ce sommaire ; les questions de coupe, de morphologie
   * et de FAQ sont déjà listées par leurs propres rubriques. */
  const liste = collection({
    adresse: versLangue("/guides", langue),
    nom: L.titre,
    description: L.accroche,
    langue,
    elements: guides.flatMap((g) => g.liens.map((x) => ({ nom: x.q, adresse: x.href }))),
  });

  return (
    <>
      {liste.mainEntity.numberOfItems > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(liste) }}
        />
      )}
      <FilDAriane langue={langue} rangs={[{ nom: T.raccourcis.lesGuides, adresse: "/guides" }]} />

      <header className="gouttiere pb-[clamp(2rem,4vw,3.5rem)] pt-[calc(var(--entete)+clamp(2.5rem,5.5vw,5rem))]">
        <h1 className="affiche">{L.titre}</h1>
        <p className="phrase est-moyenne mesure-l mt-6">{L.accroche}</p>
      </header>

      <nav aria-label={L.sommaire} className="gouttiere pb-[clamp(2.5rem,5vw,4.5rem)]">
        <h2 className="legende">{L.sommaire}</h2>
        <ul className="mt-4 grid gap-x-[clamp(1.5rem,4vw,4rem)] md:grid-cols-3">
          {themes.map((x) => (
            <li key={x.id} className="border-t border-fil">
              <a
                href={`#${x.id}`}
                className="texte flex items-baseline justify-between gap-4 py-3 transition-colors duration-300 hover:text-action"
              >
                <span className="lien-texte">{x.titre}</span>
                <span aria-hidden="true">↓</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {themes.map((x) => (
        <Theme key={x.id} {...x} />
      ))}

      {/* ————————————————————————————————————— la sortie ————— */}
      <section className="gouttiere border-t border-fil py-[clamp(3rem,6vw,5.5rem)]">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="phrase">{F.autreQuestion}</h2>
            <p className="texte mesure-l mt-4">{F.autreQuestionTexte}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AppelElise className="bouton-trait">{F.demanderAElise}</AppelElise>
            <AppelRendezvous className="bouton">{F.prendreRendezvous}</AppelRendezvous>
          </div>
        </div>
      </section>
    </>
  );
}
