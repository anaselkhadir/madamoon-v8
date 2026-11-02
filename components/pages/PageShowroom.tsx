import Link from "@/components/Lien";
import TitreSection from "@/components/TitreSection";
import Photo from "@/components/media/Photo";
import Avis from "@/components/accueil/Avis";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import { MAISON } from "@/lib/madamoon";
import { SCENES } from "@/lib/medias";
import { altScene } from "@/lib/alt";
import { FICHE_GOOGLE } from "@/lib/schema";
import { SLUGS_QUESTIONS } from "@/lib/questions";
import { faq, maison, parcours, signatures } from "@/lib/contenu";
import { t } from "@/lib/textes";
import type { Langue } from "@/lib/langue";
import FilDAriane from "@/components/FilDAriane";

/*
 * Le showroom.
 *
 * Une image plein cadre, puis ce qu'il faut savoir avant de venir, dans
 * l'ordre où une mariée se le demande : ce qu'est la visite, le lieu,
 * comment se passe l'essayage d'un bout à l'autre, les questions que
 * l'on pose avant de prendre rendez-vous, ce qu'en disent celles qui
 * sont venues, et comment venir. Le rendez-vous est l'unique action de
 * la page ; le plan, le téléphone et le contact l'accompagnent sans lui
 * faire concurrence.
 *
 * Rien n'est écrit pour cette page qui ne soit déjà écrit par la maison :
 * le lieu vient de la page « À propos », les étapes du parcours de la
 * mariée, les questions de la FAQ, les avis de Google. Même langage que
 * partout ailleurs.
 */

/*
 * Les trois vignettes de la visite.
 *
 * La maison a demandé que toutes les images présentées comme le
 * showroom soient la photographie qu'elle a envoyée. Les trois
 * montraient autre chose — un détail de dentelle, une robe en studio,
 * et une mariée sous des palmiers devant un mur en pierre sèche, sur
 * une page qui parle d'une boutique du dixième arrondissement.
 *
 * C'est donc la même photographie trois fois, mais pas le même cadrage.
 * La tuile est un portrait de 447 sur 621 et la photographie un paysage
 * de quatre tiers : chaque tranche n'en montre qu'un gros tiers. À
 * gauche le piano et les vitraux, au milieu les fauteuils, à droite le
 * portant. Trois cadrages identiques se seraient lus comme une panne
 * d'affichage.
 */
const CADRAGES = ["12% 50%", "50% 52%", "88% 50%"] as const;

/* Les questions de la FAQ que l'on se pose avant de venir, par leur rang
 * dans SLUGS_QUESTIONS : le déroulement, venir accompagnée, le
 * rendez-vous, quoi apporter. Le même rang vaut dans les deux langues. */
const AVANT_DE_VENIR = [1, 5, 11, 21] as const;

export default function PageShowroom({ langue }: { langue: Langue }) {
  const T = t(langue);
  const L = T.pages.showroom;
  const E = T.pages.maisonPage;
  const M = maison(langue);
  const questions = faq(langue);

  return (
    <>
      <FilDAriane
        langue={langue}
        rangs={[{ nom: T.barre.showroom, adresse: "/showroom" }]}
      />

      {/* ————————————————————————————————————— l'ouverture ————— */}
      <section className="relative h-[80svh] min-h-[28rem] overflow-hidden">
        <Photo
          media={SCENES["showroom"]}
          dossier="scenes"
          alt={altScene(L.altScene, langue)}
          sizes="100vw"
          priorite
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(95deg, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.16) 46%, rgba(0,0,0,0) 76%)",
          }}
        />
        <div className="gouttiere absolute inset-0 flex flex-col justify-center">
          <div className="max-w-[52vw] max-md:max-w-[92%]">
            <h1 className="affiche text-sur-image">{L.titre}</h1>
            <p className="accroche mt-6 text-sur-image">
              {L.accroche}
              <sup>e</sup>
              {L.surRendezVous}
            </p>
            <Link href="/rendez-vous" className="bouton-clair mt-6">
              {L.prendreRendezvous}
            </Link>
          </div>
        </div>
      </section>

      {/* ————————————————————————————————————— la visite ————— */}
      <TitreSection titre={L.laVisite} />
      <div className="gouttiere">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-[1fr_1fr]">
          <p className="phrase mesure-l">{L.uneHeure}</p>
          <ul className="flex flex-col gap-4 self-center">
            {signatures(langue).map((s) => (
              <li key={s.titre} className="flex gap-4">
                <span aria-hidden="true" className="mt-[0.6rem] h-px w-6 shrink-0 bg-fil" />
                <span>
                  <span className="legende block text-encre">{s.titre}</span>
                  <span className="texte">{s.texte}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ————————————————————————————————————— le lieu —————
        * Les mots de la maison sur son écrin, repris de la page « À
        * propos » : une phrase en grand, le reste en corps de texte. */}
      <section aria-labelledby="ecrin" className="gouttiere pt-[clamp(3rem,5.5vw,5rem)]">
        <h2 id="ecrin" className="titre-section">
          {E.ecrinTitre}
        </h2>
        <div className="mt-6 grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-5 md:grid-cols-2">
          <p className="phrase est-moyenne mesure-l">{E.ecrinTexte[1]}</p>
          <div className="texte mesure">
            <p>{E.ecrinTexte[3]}</p>
            <p className="mt-4">{E.ecrinTexte[2]}</p>
          </div>
        </div>
      </section>

      <div className="gouttiere pt-[clamp(2rem,3.5vw,3.5rem)]">
        <div className="trame-tuiles md:grid-cols-3">
          {CADRAGES.map((position, i) => (
            <div key={position} className="tuile" data-voile data-retard={i * 110}>
              <Photo
                media={SCENES["showroom"]}
                dossier="scenes"
                alt={altScene(L.altDetails[i], langue)}
                sizes="(max-width: 768px) 100vw, 31vw"
                position={position}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ————————————————————————————————————— l'essayage, étape par étape —————
        * Le parcours de la mariée, écrit par la maison, enfin sur la page
        * du lieu où il se déroule. Une liste ordonnée : les numéros disent
        * un ordre, pas un compte. */}
      <section aria-labelledby="etapes" className="gouttiere pt-[clamp(3.5rem,6.5vw,6rem)]">
        <h2 id="etapes" className="titre-section">
          {L.etapesTitre}
        </h2>
        <p className="texte mesure-l mt-4">{L.etapesTexte}</p>
        <ol className="mt-8 grid grid-cols-1 gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-8 border-t border-fil pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {parcours(langue).map((e) => (
            <li key={e.n}>
              <span className="legende block text-plomb">{e.n}</span>
              <h3 className="phrase mt-2 text-encre">{e.titre}</h3>
              <p className="texte mt-2">{e.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ————————————————————————————————————— avant de venir —————
        * Quatre questions de la FAQ, avec leur réponse courte, et la page
        * de chacune pour la suite. Le balisage FAQPage reste sur la page
        * de la FAQ : une même question ne se déclare pas deux fois. */}
      <section aria-labelledby="avant-de-venir" className="gouttiere pt-[clamp(3.5rem,6.5vw,6rem)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <h2 id="avant-de-venir" className="titre-section">
            {L.avantDeVenir}
          </h2>
          <Link href="/faq" className="lien-nav souligne text-action">
            {L.toutesLesQuestions}
          </Link>
        </div>
        <dl className="mt-7 max-w-[52rem] border-t border-fil">
          {AVANT_DE_VENIR.map((rang) => {
            const q = questions[rang];
            const slug = SLUGS_QUESTIONS[rang];
            if (!q || !slug) return null;
            return (
              <div key={slug} className="border-b border-fil py-6">
                <dt
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)",
                    lineHeight: 1.35,
                    color: "var(--color-encre)",
                  }}
                >
                  {q.q}
                </dt>
                <dd className="texte mesure-l mt-3">
                  {q.r}{" "}
                  <Link href={`/faq/${slug}`} className="lien-nav souligne whitespace-nowrap text-action">
                    {L.lireLaReponse}
                  </Link>
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      {/* ————————————————————————————————————— ce qu'elles en disent —————
        * Les avis Google, avant l'appel : on vient de lire comment cela
        * se passe, on lit comment cela s'est passé pour d'autres. */}
      <div className="pt-[clamp(2rem,4vw,3.5rem)]">
        <Avis langue={langue} />
      </div>

      {/* ————————————————————————————————————— venir —————
        * Un seul geste principal, le rendez-vous. Le plan, le téléphone et
        * le contact sont des liens, pas des boutons. */}
      <section
        aria-labelledby="venir"
        className="gouttiere mt-[clamp(3rem,5.5vw,5rem)] bg-craie py-[clamp(3.5rem,7vw,7rem)]"
      >
        <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-8 md:grid-cols-2 md:items-end">
          <div>
            <h2 id="venir" className="legende">
              {L.venir}
            </h2>
            <address className="phrase mt-4 not-italic">
              {M.adresse}
              <br />
              {M.codePostal} {M.ville}
            </address>
            <p className="texte mt-4">
              {M.horaires.map((h) => (
                <span key={h.jour} className="block">
                  {h.jour} — {h.heures}
                </span>
              ))}
              <span className="block text-plomb">{M.mentionHoraires}</span>
            </p>
          </div>
          <div className="flex flex-col items-start gap-5 md:items-end">
            <AppelRendezvous className="bouton">{L.prendreRendezvous}</AppelRendezvous>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a
                  href={FICHE_GOOGLE.lieu}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="lien-nav souligne text-encre"
                >
                  {L.voirPlan}
                </a>
              </li>
              <li>
                <a href={MAISON.telephoneHref} className="lien-nav souligne text-encre">
                  {L.appeler} {MAISON.telephone}
                </a>
              </li>
              <li>
                <Link href="/contact" className="lien-nav souligne text-encre">
                  {L.ecrire}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
