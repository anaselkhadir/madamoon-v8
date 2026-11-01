"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import Link from "@/components/Lien";
import Arc from "@/components/accueil/Arc";
import { typographie } from "@/lib/francais";
import { mouvementReduit, surDefilement } from "@/lib/mouvement";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/* Un morceau de paragraphe. « fort » met le passage en exergue — gras
 * et rouge. « exposant » et « apres » tiennent un exposant au milieu
 * d'un même passage, pour qu'il ne se coupe pas en deux de part et
 * d'autre. */
type Morceau = {
  texte: string;
  fort?: boolean;
  exposant?: string;
  apres?: string;
};

/*
 * L'introduction de l'accueil.
 *
 * On entrait dans les morphologies sans savoir où l'on était : la
 * boutique a demandé qu'on se présente d'abord. Le titre et les deux
 * paragraphes sont ceux de Mouna, mot pour mot, et les trois passages
 * en exergue sont ceux qu'elle avait soulignés sur son document — mis
 * en italique et en rouge plutôt que soulignés, à sa demande.
 *
 * Centrée, contrairement aux sections qui suivent, toutes calées à
 * gauche : c'est une adresse à la visiteuse et non une rubrique du site.
 * Elle garde la mesure du reste — quarante-huit caractères — sans quoi
 * un texte centré devient une bannière.
 *
 * Sa traversée, d'après trois références Osmo envoyées par la maison :
 *
 * 1. Elle monte sur le hero, coiffée d'un arc (« Arc », sens haut).
 * 2. Centrée, elle s'arrête : le défilement allume alors le texte, de
 *    « Chez MADAMOON » jusqu'au point final, lettre après lettre, d'un
 *    gris pâle à sa couleur (« highlight text on scroll »).
 * 3. Le texte allumé, elle repart, et son bord bas pend en arc inversé
 *    sur la section suivante, qu'il découvre en s'aplatissant.
 *
 * Elle porte le gris doux de la maison : blanche sur des robes posées sur
 * du blanc, ses arcs ne se seraient pas vus.
 *
 * L'arrêt n'a lieu qu'au delà de mille vingt-quatre pixels, où le texte
 * tient dans un écran. Au doigt, il est trop long : il s'allume pendant
 * qu'on le fait défiler, sans arrêt. Mouvement réduit : ni arrêt, ni
 * arc, le texte est entier d'emblée.
 */

/* La largeur du dégradé, en lettres : entre la dernière lettre allumée et
 * la première éteinte. */
const FONDU = 14;

export default function Maison({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue).introMaison;
  const paragraphes = L.paragraphes as readonly (readonly Morceau[])[];

  const piste = useRef<HTMLDivElement>(null);
  const lecture = useRef<HTMLDivElement>(null);

  /*
   * Les lettres, numérotées dans l'ordre de lecture.
   *
   * Chacune porte son rang (« --i ») ; le défilement ne pose qu'une
   * variable sur le bloc (« --p », le rang atteint), et la feuille de
   * style calcule l'opacité de chaque lettre. Rien n'est redessiné par
   * le script, quelle que soit la longueur du texte.
   *
   * Les lettres d'un mot sont tenues ensemble, pour qu'un mot ne se coupe
   * jamais en fin de ligne.
   */
  let rang = 0;
  const lettres = (texte: string): ReactNode =>
    texte.split(/(\s+)/).map((mot, k) =>
      /^\s+$/.test(mot) ? (
        <Fragment key={k}>{mot.replace(/\s+/g, " ")}</Fragment>
      ) : (
        <span key={k} className="whitespace-nowrap">
          {Array.from(mot).map((c, n) => (
            <span key={n} className="lettre-lue" style={{ "--i": rang++ } as React.CSSProperties}>
              {c}
            </span>
          ))}
        </span>
      ),
    );
  const visibles = paragraphes.map((morceaux, i) => (
    <p key={i} className={i === 0 ? "texte mt-5" : "texte mt-4"}>
      {morceaux.map((m, j) => {
        const contenu = (
          <>
            {lettres(typographie(m.texte))}
            {m.exposant && <sup>{lettres(m.exposant)}</sup>}
            {m.apres && lettres(typographie(m.apres))}
          </>
        );
        /* « em » : de l'emphase, en italique, pas une importance accrue. */
        return m.fort ? (
          <em key={j} className="exergue">
            {contenu}
          </em>
        ) : (
          <Fragment key={j}>{contenu}</Fragment>
        );
      })}
    </p>
  ));
  const total = rang;

  useEffect(() => {
    const bloc = lecture.current;
    const p = piste.current;
    if (!bloc || !p) return;
    if (mouvementReduit()) {
      bloc.style.setProperty("--p", String(total + FONDU));
      return;
    }
    const large = window.matchMedia("(min-width: 1024px)");

    let demande = 0;
    const poser = () => {
      demande = 0;
      const h = window.innerHeight;
      let avance: number;
      if (large.matches) {
        /* Arrêtée : la piste défile sous la scène collée. Le texte est
         * entièrement allumé aux quatre cinquièmes de la course, pour
         * qu'on le lise en entier avant qu'elle reparte. */
        const b = p.getBoundingClientRect();
        const course = b.height - h;
        avance = course > 0 ? -b.top / (course * 0.8) : 1;
      } else {
        /* Au doigt : le texte s'allume entre son entrée au bas de l'écran
         * et le moment où sa fin passe au milieu. */
        const b = bloc.getBoundingClientRect();
        avance = (h * 0.85 - b.top) / (b.height + h * 0.35);
      }
      avance = Math.min(Math.max(avance, 0), 1);
      bloc.style.setProperty("--p", (avance * (total + FONDU)).toFixed(1));
    };
    const surScroll = () => {
      if (!demande) demande = requestAnimationFrame(poser);
    };
    poser();
    const desabonner = surDefilement(surScroll);
    window.addEventListener("scroll", surScroll, { passive: true });
    window.addEventListener("resize", surScroll);
    large.addEventListener("change", surScroll);
    return () => {
      cancelAnimationFrame(demande);
      desabonner();
      window.removeEventListener("scroll", surScroll);
      window.removeEventListener("resize", surScroll);
      large.removeEventListener("change", surScroll);
    };
  }, [total]);

  return (
    <section
      aria-labelledby="la-maison"
      className="relative"
      style={{ background: "var(--color-gris)" }}
    >
      <Arc sens="haut" couleur="var(--color-gris)" />

      {/* La piste : un écran pour l'arrêt, plus la course de la lecture.
        * Au doigt, ni piste ni arrêt — la section a la hauteur de son
        * texte, et au moins celle d'un écran, pour couvrir le hero. */}
      <div ref={piste} className="max-lg:min-h-[100svh] motion-safe:lg:h-[220svh]">
        <div className="flex items-center py-[clamp(4rem,10vw,7rem)] max-lg:min-h-[100svh] motion-safe:lg:sticky motion-safe:lg:top-0 motion-safe:lg:h-[100svh] motion-safe:lg:pb-0 motion-safe:lg:pt-[calc(var(--barre)+var(--entete))]">
          <div className="gouttiere w-full">
            <div className="mesure-l mx-auto text-center">
              <span data-ligne className="block">
                <h2 id="la-maison" className="phrase">
                  {L.titreAvant}
                  {/* L'anglaise a l'œil plus petit qu'un romain de même
                    * corps : relevée d'un tiers, elle se tient sur la même
                    * ligne que la suite. L'interligne revient à un, sinon
                    * ses déliés écartent les deux lignes du titre.
                    *
                    * Le rouge est écrit en propre : « .phrase » porte sa
                    * couleur hors calque et l'emporterait sur un utilitaire.
                    * C'est le rouge des liens et des boutons, le même en
                    * clair et en sombre — la maison l'a voulu ainsi. */}
                  <span
                    style={{
                      fontFamily: "var(--font-anglaise)",
                      fontSize: "1.35em",
                      lineHeight: 1,
                      color: "var(--color-action)",
                    }}
                  >
                    {L.nom}
                  </span>
                  {L.titreApres}
                </h2>
              </span>

              {/* Le texte se lit deux fois dans le code : en entier pour
                * les lecteurs d'écran et les moteurs, lettre par lettre
                * pour l'œil. La copie visible est cachée aux premiers, la
                * copie entière aux seconds. */}
              <div className="sr-only">
                {paragraphes.map((morceaux, i) => (
                  <p key={i}>
                    {morceaux
                      .map((m) => `${typographie(m.texte)}${m.exposant ?? ""}${m.apres ? typographie(m.apres) : ""}`)
                      .join("")}
                  </p>
                ))}
              </div>
              <div ref={lecture} aria-hidden="true" className="lecture-defilement">
                {visibles}
              </div>

              <div className="pt-[clamp(1.5rem,2.5vw,2.25rem)]">
                <Link href="/a-propos" className="lien-nav souligne inline-block text-action">
                  {L.lien}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Arc sens="bas" couleur="var(--color-gris)" />
    </section>
  );
}
