import Link from "@/components/Lien";
import { notFound } from "next/navigation";
import AppelElise from "@/components/AppelElise";
import HeroPage from "@/components/HeroPage";
import Photo from "@/components/media/Photo";
import Tuile from "@/components/Tuile";
import TitreSection from "@/components/TitreSection";
import RangeesQuestions from "@/components/RangeesQuestions";
import CoupesFixes, { type Station } from "@/components/morphologie/CoupesFixes";
import Showroom from "@/components/accueil/Showroom";
import {
  MAISON,
  ROBES,
  SITE_URL,
  maisonsPour,
  morphologieParSlug,
  type Categorie,
} from "@/lib/madamoon";
import { coupe } from "@/lib/coupes";
import { vues } from "@/lib/medias";
import { altCoupe, altRobe } from "@/lib/alt";
import {
  auDela,
  bas,
  coupeApposition,
  coupeNom,
  coupePluriel,
  edito,
  morphoNom,
  morphoObjectif,
  morphoSilhouette,
  questions,
  questionsMorpho,
  robeLigne,
} from "@/lib/contenu";
import { versLangue, type Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { couverture } from "@/lib/couverture";
import FilDAriane from "@/components/FilDAriane";

/*
 * La page d'une morphologie.
 *
 * Troisième entrée du catalogue, après les maisons et les coupes. Là on
 * partait d'un créateur ou d'une coupe ; ici on part d'un corps.
 *
 * Elle est écrite pour être lue, pas seulement indexée. La matière tient
 * dans lib/morphologies.ts et sa jumelle anglaise ; cette page en fait
 * une suite de scènes qui se découvrent au défilement, et non une pile
 * de blocs.
 *
 * Deux règles de ton, tenues jusqu'au bout et dans les deux langues :
 * aucune robe n'est déconseillée — les trois niveaux disent une
 * préférence, jamais une interdiction — et aucun corps n'est un problème
 * à corriger. On écrit ce qu'une coupe fait, jamais ce qu'elle
 * « cacherait ».
 */

export default async function PageMorphologie({
  params,
  langue,
}: {
  params: Promise<{ lettre: string }>;
  langue: Langue;
}) {
  const { lettre } = await params;
  const m = morphologieParSlug(lettre);
  if (!m) notFound();
  const e = edito(m.lettre, langue);
  const L = t(langue).pages.morpho;

  const robesDe = (c: Categorie) => ROBES.filter((r) => r.categorie === c);

  /* Les stations de la scène : les coupes conseillées d'abord, avec la
   * raison rédigée et deux modèles chacune. */
  const stations: Station[] = m.premieres
    .map((c) => {
      const robes = robesDe(c);
      const vedette = robes.find((r) => vues(r.slug).length > 0);
      const media = vedette ? couverture(vedette) : undefined;
      if (!media) return null;
      return {
        nom: coupeNom(c, langue),
        categorie: c,
        ancre: coupe(c).ancre,
        pourquoi: e.pourquoi[c] ?? "",
        media,
        alt: altCoupe(c, langue, { morphologie: m.lettre }),
        robes: robes
          .slice(0, 2)
          .map((r) => ({ slug: r.slug, nom: r.nom, ligne: robeLigne(r, langue) })),
      };
    })
    .filter(Boolean) as Station[];

  /* Les trois niveaux. Aucun ne ferme une porte : le troisième dit
   * « selon vos envies », et c'est exactement ce qu'il veut dire. */
  const niveaux = [
    {
      titre: L.particulierement,
      robes: ROBES.filter((r) => m.premieres.includes(r.categorie)).slice(0, 6),
    },
    {
      titre: L.egalement,
      robes: ROBES.filter((r) => m.secondes.includes(r.categorie)).slice(0, 3),
    },
    {
      titre: L.selonVosEnvies,
      robes: ROBES.filter(
        (r) => !m.premieres.includes(r.categorie) && !m.secondes.includes(r.categorie)
      ).slice(0, 3),
    },
  ].filter((n) => n.robes.length > 0);

  /* Les trois questions écrites, plus celle qui dit comment se
   * reconnaître — sa réponse est déjà sur la page, plus haut. Google
   * demande que la réponse figure visiblement : c'est la même. */
  const lesQuestions = [
    {
      q: L.commentSavoir(m.lettre),
      r: e.reperes.map((r) => r.texte).join(" "),
    },
    ...questions(m.lettre, langue),
  ];

  /*
   * Les questions de la maison, quand elle les a envoyées pour cette
   * morphologie. Elles remplacent les anciennes : une rangée par
   * question, la question seule et un bouton « Savoir plus » qui mène à
   * sa page, où se trouve la réponse. Sans elles, la page garde les
   * anciennes questions, réponses dépliées.
   */
  const nouvelles = questionsMorpho(m.lettre, langue);
  const base = `/morphologies/${m.lettre.toLowerCase()}`;

  const maisons = maisonsPour(m.lettre).filter((o) => o.premieres.length > 0);
  const scene = vues(m.ouverture.robe)[1] ?? vues(m.ouverture.robe)[0];

  const donnees = {
    "@context": "https://schema.org",
    "@graph": [
      {
    "@type": "Article",
    headline: e.question,
    description: e.promesse,
    url: `${SITE_URL}${versLangue(`/morphologies/${m.lettre.toLowerCase()}/`, langue)}`,
    inLanguage: langue === "fr" ? "fr-FR" : "en-GB",
    isPartOf: { "@type": "WebSite", name: MAISON.nom, url: SITE_URL },
    publisher: { "@type": "Organization", name: MAISON.nom, url: SITE_URL },
    about: {
      "@type": "Thing",
      name: morphoNom(m, langue),
      description: morphoSilhouette(m, langue),
    },
    mentions: stations.map((s) => ({
      "@type": "Thing",
      name:
        langue === "fr"
          ? `Robe de mariée ${s.nom.toLowerCase()}`
          : `${s.nom} wedding dress`,
      url: `${SITE_URL}${versLangue(`/coupes/${s.ancre}`, langue)}/`,
    })),
      },
      /* Le balisage des questions, pour l'ancien format seulement : les
       * nouvelles questions n'affichent pas leur réponse sur cette page,
       * et Google demande que la réponse d'un FAQPage y soit visible.
       * Chacune a sa page, balisée comme article. */
      ...(nouvelles ? [] : [
      {
        /* Le balisage des questions.
         *
         * Google a fermé les extraits enrichis FAQ en 2023 : ils ne
         * s'affichent plus que pour les sites publics et de santé. Le
         * balisage reste néanmoins juste, il aide à comprendre la page,
         * et le contenu visible, lui, capte les requêtes longues. */
        "@type": "FAQPage",
        mainEntity: lesQuestions.map((x) => ({
          "@type": "Question",
          name: x.q,
          acceptedAnswer: { "@type": "Answer", text: x.r },
        })),
      }
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <FilDAriane
        langue={langue}
        rangs={[
          { nom: t(langue).barre.morphologies, adresse: "/morphologies" },
          { nom: morphoNom(m, langue), adresse: `/morphologies/${m.lettre.toLowerCase()}` },
        ]}
      />

      {/* ————————————————————————————— 01 · le premier écran ————— */}
      <HeroPage
        surtitre={morphoNom(m, langue)}
        titre={e.question}
        ligne={e.promesse}
        robe={m.ouverture.robe}
        vue={m.ouverture.vue}
        alt={altCoupe(m.premieres[0] ?? "de mariée", langue, { morphologie: m.lettre })}
        action={t(langue).hero.trouverMaRobe}
        langue={langue}
        catalogue={{
          /* Seule l'initiale passe en bas de casse : la lettre de la
            * morphologie est une désignation, pas un mot. « silhouette
            * en X », jamais « morphologie en x ». */
          /* « le catalogue morphologie A » : la préposition alourdissait
           * le bouton sans rien préciser. En anglais, l'article est déjà
           * dans la phrase et la lettre suffit. */
          intitule: langue === "fr" ? `morphologie ${m.lettre}` : `${m.lettre} shape`,
          contexte: `morphologie:${m.lettre.toLowerCase()}`,
        }}
      />

      {/* ————————————————————————————— 02 · se reconnaître ————— */}
      <section aria-labelledby="reconnaitre" className="pt-[clamp(4rem,8vw,8rem)]">
        <div className="gouttiere grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-10 md:grid-cols-2">
          {/* La photographie tient sa colonne pendant que le texte
            * s'écrit à côté : le même geste que la scène des coupes, en
            * plus court. */}
          <div className="md:sticky md:top-[calc(var(--barre)+var(--entete))] md:h-fit">
            <div className="tuile" data-rideau>
              {scene && (
                <Photo
                  media={scene}
                  dossier="robes"
                  alt={altCoupe(m.premieres[0] ?? "de mariée", langue, { morphologie: m.lettre })}
                  sizes="(max-width: 768px) 100vw, 46vw"
                />
              )}
            </div>
          </div>

          <div className="md:py-[clamp(2rem,4vw,4rem)]">
            <h2 id="reconnaitre" className="titre-section" data-lever>
              {L.reconnaitre(m.lettre)}
            </h2>
            <p className="phrase mt-5 text-encre">{morphoSilhouette(m, langue)}</p>

            <dl className="mt-10 border-t border-fil" data-suite>
              {e.reperes.map((r) => (
                <div key={r.titre} className="border-b border-fil py-5">
                  <dt className="legende">{r.titre}</dt>
                  <dd className="texte mt-2">{r.texte}</dd>
                </div>
              ))}
            </dl>

            <p className="mention mt-8 text-brume">{L.lesProportions}</p>
            <p className="texte mt-1">
              {e.proportions}
            </p>

            <p className="texte mesure-l mt-8">
              {L.pasExacte}{" "}
              <AppelElise className="souligne text-action">{L.eliseVousGuide}</AppelElise>
              {L.enTroisQuestions}
            </p>
          </div>
        </div>
      </section>

      {/* ————————————————————————————— 03 · les coupes ————— */}
      {stations.length > 0 && (
        <section aria-labelledby="coupes" className="pt-[clamp(4rem,8vw,8rem)]">
          <TitreSection
            id="coupes"
            titre={L.lesCoupes}
            lien={{ href: "/coupes", label: L.toutesLesCoupes }}
          />
          <div className="gouttiere">
            <p className="texte mesure-l pb-[clamp(2rem,4vw,4rem)]">
              {morphoObjectif(m, langue)} {L.voiciPourquoi}
            </p>
          </div>
          <CoupesFixes stations={stations} langue={langue} />
          <div className="gouttiere pt-[clamp(2rem,4vw,4rem)]">
            <p className="phrase mesure-l text-encre" data-lever>
              {e.detail}
            </p>

            {/* Le maillage contextuel.
              *
              * Des phrases, pas une liste de liens : l'ancre dit ce qu'on
              * trouve au bout et pourquoi cela concerne cette
              * morphologie. « Cliquez ici » n'apprend rien, ni à la
              * lectrice ni à un moteur. */}
            <div className="mesure-l mt-8" data-lever data-retard="100">
              {stations.map((s) => {
                const modeles = s.robes;
                return (
                  <p key={s.ancre} className="texte mt-4">
                    <Link href={`/coupes/${s.ancre}`} className="lien-texte text-action">
                      {L.decouvrez(coupeApposition(s.categorie, langue), m.lettre)}
                    </Link>
                    {modeles.length > 0 && (
                      <>
                        {L.ouDirectement}
                        {modeles.map((r, i) => (
                          <span key={r.slug}>
                            {i > 0 && (i === modeles.length - 1 ? L.et : ", ")}
                            <Link href={`/robes/${r.slug}`} className="lien-texte text-encre">
                              {r.nom}, {bas(r.ligne, langue)}
                            </Link>
                          </span>
                        ))}
                        .
                      </>
                    )}
                  </p>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ————————————————————————————— 04 · les robes ————— */}
      <section aria-labelledby="modeles" className="pt-[clamp(4rem,8vw,8rem)]">
        <TitreSection
          id="modeles"
          titre={L.nosRobes}
          lien={{ href: "/robes", label: L.voirToutLeCatalogue }}
        />
        {niveaux.map((n, rang) => (
          <div key={n.titre} className={rang > 0 ? "pt-[clamp(2.5rem,5vw,5rem)]" : ""}>
            <div className="gouttiere">
              {/* Plus de sous-titre sous ces intitulés : la maison les a
                * tous fait retirer. Ils expliquaient ce que leur titre
                * disait déjà. Le blanc qu'ils occupaient demeure, sans
                * quoi le titre se collerait aux photographies. */}
              <h3 className="legende pb-6">{n.titre}</h3>
              <div className="trame-tuiles grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {n.robes.map((robe, i) => {
                  const media = couverture(robe);
                  if (!media) return null;
                  return (
                    <Tuile
                      key={robe.slug}
                      retard={(i % 3) * 70}
                      href={`/robes/${robe.slug}`}
                      coupDeCoeur={robe.slug}
                      media={media}
                      dossier="robes"
                      alt={altRobe(robe, langue)}
                      nom={robe.nom}
                      sizes="(max-width: 768px) 50vw, 31vw"
                      priorite={rang === 0 && i < 3}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ————————————————————————————— 05 · les questions ————— */}
      <section aria-labelledby="questions" className="pt-[clamp(4rem,8vw,8rem)]">
        <TitreSection
          id="questions"
          titre={L.lesQuestions}
          lien={{ href: "/rendez-vous", label: L.poserLaVotre }}
        />
        <div className="gouttiere pb-[clamp(2rem,4vw,4rem)]">
          {nouvelles ? (
            <RangeesQuestions base={base} questions={nouvelles} savoirPlus={L.savoirPlus} />
          ) : (
            <dl className="mesure-l border-t border-fil" data-suite>
              {lesQuestions.map((x) => (
                <div key={x.q} className="border-b border-fil py-6">
                  <dt className="phrase text-[1.125rem] text-encre">{x.q}</dt>
                  <dd className="texte mt-3">{x.r}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* ————————————————————————————— 06 · au-delà ————— */}
      <section aria-labelledby="au-dela" className="mt-[clamp(4rem,8vw,8rem)] bg-craie">
        <TitreSection id="au-dela" titre={L.auDela} />
        <div className="gouttiere pb-[clamp(4rem,7vw,7rem)]">
          <p
            className="affiche mesure-l text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] text-encre"
            data-lever
          >
            {L.auDelaPhrase}
          </p>
          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4" data-suite>
            {auDela(langue).map((r) => (
              <div key={r.titre}>
                <dt className="legende">{r.titre}</dt>
                <dd className="texte mt-2">{r.texte}</dd>
              </div>
            ))}
          </dl>

          {maisons.length > 0 && (
            <div className="mt-14">
              <p className="mention text-brume">{L.lesMaisons}</p>
              <ol className="mesure-l mt-3 border-t border-fil" data-suite>
                {maisons.map((o, i) => (
                  <li key={o.createur.slug}>
                    <Link
                      href={`/createurs/${o.createur.slug}`}
                      className="group flex items-baseline gap-4 border-b border-fil py-3"
                    >
                      <span className="legende pt-1">{String(i + 1).padStart(2, "0")}</span>
                      <span>
                        <span className="phrase text-[1.125rem] text-encre transition-colors duration-500 group-hover:text-action">
                          {o.createur.nom}
                        </span>
                        <span className="texte">
                          {L.enCoupes(
                            o.premieres
                              .map((r) => coupePluriel(r.categorie, langue))
                              .filter((v, j, t) => t.indexOf(v) === j)
                              .join(", ")
                          )}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* ————————————————————————————— 07 · la boutique ————— */}
      <Showroom langue={langue} />
    </>
  );
}
