"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import Link from "@/components/Lien";
import Photo from "@/components/media/Photo";
import { altScene } from "@/lib/alt";
import { typographie } from "@/lib/francais";
import { SCENES } from "@/lib/medias";
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
 * Centrée au doigt, comme avant : c'est une adresse à la visiteuse et
 * non une rubrique du site. Elle garde la mesure du reste — quarante-huit
 * caractères — sans quoi un texte centré devient une bannière.
 *
 * À côté du texte, la photographie du salon, à la demande de la maison,
 * traitée en photographie ancienne — ce sont les détails du salon qui
 * la dessinent :
 *
 * - un cadre en arche, celle du miroir doré et des vitraux de la photo ;
 * - un filet fin autour, à quelques millimètres, le bord d'un vieux
 *   cadre ;
 * - des couleurs adoucies vers le sépia, et un léger vignettage. La
 *   maison trouvait déjà le velours bleu trop vif (point 132) ;
 * - une légende à l'anglaise, l'écriture du nom de la maison.
 *
 * Sur ordinateur, elle est à gauche et le texte à droite, calé à gauche.
 * Au doigt, elle passe au-dessus du texte.
 *
 * Sa traversée, d'après la référence Osmo « highlight text on scroll » :
 * la section s'arrête, et le défilement allume le texte, de « Chez
 * MADAMOON » jusqu'au point final, lettre après lettre, d'un gris pâle à
 * sa couleur. Pendant cette lecture, la photographie se développe, d'un
 * sépia ancien à ses couleurs adoucies : les deux avancent ensemble.
 *
 * L'arc qui la faisait monter sur le hero, puis pendre sur la suite, a
 * été retiré à la demande de la maison (voir Hero.tsx).
 *
 * Elle porte le gris doux de la maison, sur lequel se détache le filet.
 * L'arrêt et la lecture se font sur ordinateur seulement, au delà de
 * mille vingt-quatre pixels ; au doigt, les paragraphes montent à l'écran
 * comme le reste du site. Mouvement réduit : ni arrêt, texte entier,
 * photographie développée.
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
    /* La section porte « --avance » (de 0 à 1) : la photographie se
     * développe avec la lecture. Sans elle, elle est développée. */
    const section = p.closest("section");
    if (mouvementReduit()) {
      bloc.style.setProperty("--p", String(total + FONDU));
      return;
    }
    const large = window.matchMedia("(min-width: 1024px)");

    let demande = 0;
    const poser = () => {
      demande = 0;
      /* Au doigt, la copie lettre par lettre n'est pas affichée. */
      if (!large.matches) return;
      const h = window.innerHeight;
      /* Arrêtée : la piste défile sous la scène collée. Le texte est
       * entièrement allumé aux quatre cinquièmes de la course, pour
       * qu'on le lise en entier avant qu'elle reparte. */
      const b = p.getBoundingClientRect();
      const course = b.height - h;
      let avance = course > 0 ? -b.top / (course * 0.8) : 1;
      avance = Math.min(Math.max(avance, 0), 1);
      bloc.style.setProperty("--p", (avance * (total + FONDU)).toFixed(1));
      section?.style.setProperty("--avance", avance.toFixed(3));
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
      section?.style.removeProperty("--avance");
    };
  }, [total]);

  const salon = SCENES["showroom"];

  return (
    <section
      aria-labelledby="la-maison"
      className="relative bg-blanc py-[clamp(3rem,8vw,7rem)] lg:bg-gris lg:py-0"
    >
      {/* La piste : un écran pour l'arrêt, plus la course de la lecture.
        * Au doigt, ni piste ni arrêt. */}
      <div ref={piste} className="motion-safe:lg:h-[220svh]">
        <div className="flex items-center lg:py-[clamp(4rem,10vw,7rem)] motion-safe:lg:sticky motion-safe:lg:top-0 motion-safe:lg:h-[100svh] motion-safe:lg:pb-[clamp(1.5rem,3vh,2.5rem)] motion-safe:lg:pt-[calc(var(--barre)+var(--entete)+clamp(1.5rem,3vh,2.5rem))]">
          <div className="gouttiere w-full">
            <div className="mx-auto grid items-center gap-[clamp(2.75rem,6vw,6.5rem)] lg:grid-cols-[auto_minmax(0,34rem)] lg:justify-center">
            {/* La photographie du salon, en photographie ancienne. Deux
              * états superposés : développée dessous, sépia dessus, qui
              * s'efface à mesure que le texte s'allume. Seule l'opacité
              * bouge ; les filtres, eux, ne changent jamais. */}
            <figure data-lever className="salon mx-auto w-full max-w-[19rem] lg:mx-0 lg:w-auto lg:max-w-none">
              <div className="salon-cadre">
                <div className="salon-image">
                  <Photo
                    media={salon}
                    dossier="scenes"
                    alt={altScene(L.altSalon, langue)}
                    sizes="(min-width: 1024px) 30rem, 19rem"
                    position="50% 62%"
                    className="salon-developpee h-full w-full object-cover"
                  />
                  <span aria-hidden="true" className="salon-ancienne">
                    <Photo
                      media={salon}
                      dossier="scenes"
                      alt=""
                      sizes="(min-width: 1024px) 30rem, 19rem"
                      position="50% 62%"
                      className="h-full w-full object-cover"
                    />
                  </span>
                </div>
              </div>
              <figcaption className="salon-legende">{L.salon}</figcaption>
            </figure>

            <div className="mesure-l mx-auto text-center lg:mx-0 lg:text-left">
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

              {/* Le texte, deux fois dans le code.
                *
                * En paragraphes : ce que lisent le téléphone, comme avant
                * (ils montent à l'écran l'un après l'autre), les lecteurs
                * d'écran et les moteurs. Sur ordinateur, ils ne restent que
                * pour ces deux derniers.
                *
                * Lettre par lettre : la copie de l'œil, sur ordinateur
                * seulement, cachée aux lecteurs d'écran. */}
              <div className="lg:sr-only">
                {paragraphes.map((morceaux, i) => (
                  <p
                    key={i}
                    className={i === 0 ? "texte mt-5" : "texte mt-4"}
                    data-lever
                    data-retard={120 + i * 80}
                  >
                    {morceaux.map((m, j) => {
                      const contenu = (
                        <>
                          {typographie(m.texte)}
                          {m.exposant && <sup>{m.exposant}</sup>}
                          {m.apres && typographie(m.apres)}
                        </>
                      );
                      return m.fort ? (
                        <em key={j} className="exergue">
                          {contenu}
                        </em>
                      ) : (
                        <Fragment key={j}>{contenu}</Fragment>
                      );
                    })}
                  </p>
                ))}
              </div>
              <div ref={lecture} aria-hidden="true" className="lecture-defilement max-lg:hidden">
                {visibles}
              </div>

              <div
                className="pt-[clamp(1.5rem,2.5vw,2.25rem)]"
                data-lever
                data-retard={120 + paragraphes.length * 80}
              >
                <Link href="/a-propos" className="lien-nav souligne inline-block text-action">
                  {L.lien}
                </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
