import { notFound } from "next/navigation";
import Link from "@/components/Lien";
import AppelElise from "@/components/AppelElise";
import HeroPage from "@/components/HeroPage";
import Tuile from "@/components/Tuile";
import TitreSection from "@/components/TitreSection";
import RangeesQuestions from "@/components/RangeesQuestions";
import Showroom from "@/components/accueil/Showroom";
import { CREATEURS, FAMILLES, MAISON, MORPHOLOGIES, ROBES, SITE_URL } from "@/lib/madamoon";
import { coupeParAncre } from "@/lib/coupes";
import { altCoupe, altRobe } from "@/lib/alt";
import {
  bas,
  coupeApposition,
  coupeIntro,
  coupeNom,
  coupeNote,
  coupePluriel,
  familleTexte,
  morphoConseil,
  morphoNom,
  morphoSilhouette,
  questionsCoupe,
  robeLigne,
} from "@/lib/contenu";
import { versLangue, type Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { couverture } from "@/lib/couverture";
import FilDAriane from "@/components/FilDAriane";

/*
 * La page d'une coupe.
 *
 * Bâtie comme celle d'une maison, mais l'axe est inversé : là on prenait
 * une maison et on montrait ses coupes, ici on prend une coupe et on
 * montre les maisons qui la travaillent.
 *
 * Les robes sont donc rangées par créateur — « Nos sirènes Watters
 * Designs » — dans l'ordre du catalogue. Les modèles dont le créateur
 * n'est pas renseigné forment un dernier groupe, à part : on ne les
 * attribue à personne pour faire joli.
 */

export default async function PageCoupe({
  params,
  langue,
}: {
  params: Promise<{ coupe: string }>;
  langue: Langue;
}) {
  const { coupe } = await params;
  const s = coupeParAncre(coupe);
  if (!s) notFound();

  const L = t(langue).pages.coupe;
  /* Les intitulés du bloc des questions sont ceux des pages de
   * morphologie : c'est le même bloc. */
  const Q = t(langue).pages.morpho;
  const questions = questionsCoupe(s.ancre, langue);
  const nom = coupeNom(s, langue);
  const siennes = ROBES.filter((r) => r.categorie === s.nom);
  const pluriel = coupePluriel(s.nom, langue);

  /* Par maison, dans l'ordre du catalogue, puis celles dont on ignore le
   * créateur — jamais rangées sous un nom qui n'est pas le leur. */
  const maisons = CREATEURS.map((c) => ({
    titre: L.nos(pluriel, c.nom),
    lien: `/createurs/${c.slug}` as string | undefined,
    robes: siennes.filter((r) => r.createur === c.nom),
  })).filter((g) => g.robes.length > 0);

  const orphelines = siennes.filter((r) => !r.createur);
  const groupes = [
    ...maisons,
    /* « Autres » n'a de sens qu'après quelque chose : quand aucun créateur
     * n'est renseigné pour cette coupe, ce groupe est le seul, et le mot
     * ne renverrait à rien. */
    ...(orphelines.length > 0
      ? [
          {
            titre: maisons.length > 0 ? L.nosAutres(pluriel) : L.lesNotres(pluriel),
            lien: undefined,
            robes: orphelines,
          },
        ]
      : []),
  ];

  const morphologies = MORPHOLOGIES.filter((m) => m.premieres.includes(s.nom));
  const ouverture = s.ouverture ?? { robe: s.robe, vue: s.vue };
  const intro = coupeIntro(s, langue);

  /* Les données structurées suivent la langue de la page : c'est celle
   * que le moteur affichera dans ses résultats. */
  const donnees = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    inLanguage: langue === "fr" ? "fr-FR" : "en-GB",
    name: langue === "fr" ? `Robes de mariée ${nom.toLowerCase()}` : `${nom} wedding dresses`,
    description: familleTexte(s.nom, langue, FAMILLES[s.nom]),
    url: `${SITE_URL}${versLangue(`/coupes/${s.ancre}`, langue)}/`,
    isPartOf: { "@type": "WebSite", name: MAISON.nom, url: SITE_URL },
    hasPart: siennes.map((r) => ({
      "@type": "Product",
      name: langue === "fr" ? `Robe de mariée ${r.nom}` : `${r.nom} wedding dress`,
      description: robeLigne(r, langue),
      url: `${SITE_URL}${versLangue(`/robes/${r.slug}`, langue)}/`,
      ...(r.createur && { brand: { "@type": "Brand", name: r.createur } }),
    })),
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
          { nom: t(langue).barre.coupes, adresse: "/coupes" },
          { nom, adresse: `/coupes/${s.ancre}` },
        ]}
      />

      <HeroPage
        surtitre={coupeNote(s, langue)}
        /* Seulement sur les coupes qui ont leur paragraphe : celles dont
         * l'expression a été mesurée. */
        prefixe={intro ? L.prefixe : undefined}
        titre={nom}
        ligne={familleTexte(s.nom, langue, FAMILLES[s.nom])}
        robe={ouverture.robe}
        vue={ouverture.vue}
        alt={altCoupe(s.nom, langue)}
        action={t(langue).hero.trouverMaRobe}
        langue={langue}
        /* « le catalogue sirène », « le catalogue princesse » : la coupe
         * s'emploie en apposition, donc invariable après « catalogue ». */
        catalogue={{ intitule: coupeApposition(s.nom, langue), contexte: `coupe:${s.ancre}` }}
      />

      {/* ————————————————————————————— l'introduction —————
        * Le paragraphe qui nomme la coupe en toutes lettres, entre
        * l'ouverture et les robes. */}
      {intro && (
        <section className="gouttiere pt-[clamp(2.5rem,5vw,4.5rem)]">
          <p className="phrase est-moyenne mesure-l">{intro.texte}</p>
          {intro.lien && (
            <Link href={intro.lien.href} className="lien-nav souligne mt-6 inline-block text-action">
              {intro.lien.label} →
            </Link>
          )}
        </section>
      )}

      {/* ————————————————————————————— par maison ————— */}
      {groupes.map((g, i) => (
        <section key={g.titre} aria-label={g.titre}>
          <TitreSection
            titre={g.titre}
            {...(g.lien ? { lien: { href: g.lien, label: L.laMaison } } : {})}
          />
          <div className="gouttiere">
            <div className="trame-tuiles grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {g.robes.map((robe, j) => {
                const media = couverture(robe);
                if (!media) return null;
                return (
                  <Tuile
                    key={robe.slug}
                    retard={(j % 3) * 70}
                    href={`/robes/${robe.slug}`}
                    coupDeCoeur={robe.slug}
                    media={media}
                    dossier="robes"
                    alt={altRobe(robe, langue)}
                    nom={robe.nom}
                    sizes="(max-width: 768px) 50vw, 31vw"
                    priorite={i === 0 && j < 3}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* ————————————————————————————— à qui elle va ————— */}
      {morphologies.length > 0 && (
        <section aria-labelledby="pour-qui">
          <TitreSection
            id="pour-qui"
            titre={L.aQuiElleVa}
            lien={{ href: "/morphologies", label: L.toutesLesMorphologies }}
          />
          <div className="gouttiere pb-[clamp(3rem,5vw,5rem)]">
            <p className="texte mesure pb-8">{L.pistes(bas(nom, langue))}</p>
            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {morphologies.map((m) => (
                <div key={m.lettre}>
                  <dt className="flex items-baseline gap-3">
                    <span className="affiche text-[2rem] leading-none text-action">{m.lettre}</span>
                    <span className="legende">{morphoNom(m, langue)}</span>
                  </dt>
                  <dd className="texte mt-3">{morphoSilhouette(m, langue)}</dd>
                  <dd className="note-image mt-2 text-plomb">{morphoConseil(m, langue)}</dd>
                </div>
              ))}
            </dl>
            <AppelElise className="bouton-trait mt-8">{t(langue).hero.trouverMaRobe}</AppelElise>
          </div>
        </section>
      )}

      {/* Sans la section des morphologies, la dernière trame touchait la
        * photographie du showroom. L'air qu'elle aurait laissé. */}
      {morphologies.length === 0 && <div className="py-[clamp(1.5rem,2.75vw,2.5rem)]" />}

      {/* ————————————————————————————— les questions —————
       * Les questions de la maison sur cette coupe : une rangée par
       * question, et sa page dédiée sous l'adresse de la coupe. Le même
       * bloc que sur les pages de morphologie. */}
      {questions && questions.length > 0 && (
        <section aria-labelledby="questions" className="pb-[clamp(3rem,6vw,5rem)]">
          <TitreSection
            id="questions"
            titre={Q.lesQuestions}
            lien={{ href: "/rendez-vous", label: Q.poserLaVotre }}
          />
          <div className="gouttiere">
            <RangeesQuestions
              base={`/coupes/${s.ancre}`}
              questions={questions}
              savoirPlus={Q.savoirPlus}
            />
          </div>
        </section>
      )}

      <Showroom langue={langue} />
    </>
  );
}
