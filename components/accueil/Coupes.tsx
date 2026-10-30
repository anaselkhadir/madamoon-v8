"use client";

import Link from "@/components/Lien";
import { useEffect, useRef, useState } from "react";
import Photo from "@/components/media/Photo";
import Tuile from "@/components/Tuile";
import { COUPES, PLURIEL } from "@/lib/coupes";
import { ROBES } from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { altCoupe } from "@/lib/alt";
import { mouvementReduit, surDefilement } from "@/lib/mouvement";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { coupeNom, coupeNote, coupePluriel } from "@/lib/contenu";

/*
 * Les coupes.
 *
 * Après les six silhouettes, les six coupes. La scène est collée le temps
 * qu'on les traverse : le défilement fait passer d'une coupe à la
 * suivante, et rend la main à la sixième. On voit ainsi les six lignes se
 * succéder sur la même place, ce qu'une liste ne montre pas.
 *
 * Elle suit le défilement, elle ne le capture jamais : on peut s'arrêter
 * n'importe où, revenir en arrière, ou passer la section d'un geste.
 *
 * La composition est renversée par rapport à la scène précédente : la
 * photographie sort du cadre par la gauche, les noms se lisent en colonne
 * à droite. Le geste est le même, le cadrage non — c'est ce qui empêche
 * les deux scènes de se confondre.
 *
 * Au survol d'un nom, la main reprend la scène et le défilement cesse
 * d'imposer. On relâche, il reprend.
 *
 * Un nom n'est pas un lien : c'est un bouton qui change l'image. Le lien
 * vers la page de la coupe est donné séparément, sous le nom actif. Un
 * élément qui navigue au clic et prévisualise au survol est ambigu au
 * doigt, où les deux gestes n'en font qu'un.
 *
 * La photographie change en fondu et par une échelle qui se referme — un
 * plan qui se pose, pas une diapositive qui glisse.
 */

/* La part de la course laissée aux deux extrémités : la première et la
 * dernière coupe tiennent un peu plus longtemps, sinon elles ne font que
 * passer en entrant et en sortant. */
const MARGE = 0.08;

export default function Coupes({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  const piste = useRef<HTMLDivElement>(null);
  const [rang, setRang] = useState(0);
  /* La coupe choisie à la main. Tant qu'elle existe, le défilement
   * n'impose plus rien. */
  const [tenue, setTenue] = useState<number | null>(null);

  const familles = COUPES.map((c) => {
    const robe = ROBES.find((r) => r.slug === c.robe);
    const media = robe ? vues(robe.slug)[c.vue - 1] : undefined;
    return robe && media ? { c, media } : null;
  }).filter(Boolean) as {
    c: (typeof COUPES)[number];
    media: ReturnType<typeof vues>[number];
  }[];

  const n = familles.length;

  useEffect(() => {
    if (mouvementReduit() || n === 0) return;
    /* La scène collée n'existe qu'au delà de mille vingt-quatre pixels ;
     * en deçà, les six coupes se lisent empilées. La largeur est relue à
     * chaque image, pour qu'une fenêtre agrandie réveille la scène. */
    const large = window.matchMedia("(min-width: 1024px)");
    let demande = 0;
    let dernier = -1;

    const poser = () => {
      demande = 0;
      if (!large.matches) return;
      const p = piste.current;
      if (!p) return;
      const b = p.getBoundingClientRect();
      const course = b.height - window.innerHeight;
      if (course <= 0) return;
      const brut = Math.min(Math.max(-b.top / course, 0), 1);
      const avance = Math.min(Math.max((brut - MARGE) / (1 - 2 * MARGE), 0), 1);
      const i = Math.min(Math.floor(avance * n), n - 1);
      if (i !== dernier) {
        dernier = i;
        setRang(i);
      }
    };

    const surScroll = () => {
      if (!demande) demande = requestAnimationFrame(poser);
    };
    poser();
    const desabonner = surDefilement(surScroll);
    window.addEventListener("scroll", surScroll, { passive: true });
    window.addEventListener("resize", surScroll);
    return () => {
      cancelAnimationFrame(demande);
      desabonner();
      window.removeEventListener("scroll", surScroll);
      window.removeEventListener("resize", surScroll);
    };
  }, [n]);

  if (n === 0) return null;
  const actif = tenue ?? rang;
  const courante = familles[actif].c;

  return (
    <section aria-labelledby="coupes" className="relative bg-blanc">
      {/* La course. Six coupes à traverser, plus une hauteur d'écran pour
        * le collant.
        *
        * La scène se colle sous l'en-tête entier — le bandeau et la barre
        * — et non sous le seul bandeau. Le hero peut se permettre de
        * passer derrière la navigation, c'est une image ; un texte, non :
        * à 790 px de haut, seize pixels de l'intitulé disparaissaient
        * dessous.
        *
        * « overflow-hidden » ne peut pas être posé sur la section : sur un
        * ancêtre, il désactive le collant. */}
      <div ref={piste} className="relative hidden h-[210svh] lg:block">
        <div className="sticky top-[calc(var(--barre)+var(--entete))] flex h-[calc(100svh-var(--barre)-var(--entete))] min-h-[30rem] items-center overflow-hidden">
          <div className="grid w-full items-center gap-[clamp(1.25rem,5vw,5rem)] max-lg:content-center lg:grid-cols-[auto_1fr]">
            {/* ————————————————————————————— la photographie —————
              * Elle sort du cadre par la gauche : la page perd son bord de ce
              * côté, et la composition cesse d'être un bloc centré. */}
            {/* La photographie se mesure en hauteur d'écran, pas en
              * rapport de côtés : la scène est collée et ne défile pas,
              * donc tout doit tenir dans un écran. Au rapport 4/5,
              * l'image seule en prenait la moitié et le lien du bas
              * passait sous le pli.
              *
              * Sur grand écran elle prend quatre-vingt-douze pour cent de
              * la scène, plafonnée à cinquante-six rem pour qu'un très grand
              * écran ne la démesure pas. Elle tenait auparavant soixante
              * -quatre pour cent de la fenêtre, soit 480 x 576 px dans
              * une colonne de 717 : un tiers de la place restait vide. */}
            <div className="relative h-[34svh] overflow-hidden max-lg:mx-[var(--gouttiere)] lg:aspect-[5/6] lg:h-[min(calc((100svh-var(--barre)-var(--entete))*0.92),56rem)]">
              {familles.map(({ c, media }, i) => (
                <Photo
                  key={c.ancre}
                  media={media}
                  dossier="robes"
                  alt={altCoupe(c.nom, langue)}
                  sizes="(max-width: 1024px) 92vw, 44vw"
                  priorite={i === 0}
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] [transition-timing-function:var(--ease-doux)] ${
                    i === actif ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                  }`}
                />
              ))}
            </div>

            {/* ————————————————————————————— les noms ————— */}
            <div className="gouttiere lg:pl-0">
              <p className="legende">{L.coupes.legende}</p>
              <span data-ligne className="mt-4 block">
                <h2 id="coupes" className="phrase">
                  {L.coupes.titre}
                </h2>
              </span>
              <p className="texte mesure mt-4">
                {L.coupes.texte}
              </p>

              <ul className="mt-[clamp(0.75rem,3svh,2.75rem)] flex flex-col">
                {familles.map(({ c }, i) => (
                  <li key={c.ancre}>
                    <button
                      type="button"
                      onMouseEnter={() => setTenue(i)}
                      onMouseLeave={() => setTenue(null)}
                      onFocus={() => setTenue(i)}
                      onBlur={() => setTenue(null)}
                      onClick={() => setTenue(i)}
                      aria-pressed={i === actif}
                      /* La taille dépend aussi de la hauteur de l'écran, pas
                    * seulement de sa largeur : la scène est collée, les
                    * six noms doivent tenir dans un écran quel qu'il
                    * soit. Sur une fenêtre basse et large, une mesure en
                    * « vw » seule débordait le cadre. */
                  className={`block py-[0.3em] text-left font-serif text-[clamp(1.125rem,min(2.9vw,4.4svh),2.5rem)] leading-none transition-colors duration-700 [transition-timing-function:var(--ease-doux)] ${
                        i === actif ? "text-encre" : "text-fil hover:text-brume"
                      }`}
                    >
                      {coupeNom(c, langue)}
                    </button>
                  </li>
                ))}
              </ul>

              {/* La note et le lien de la coupe active, empilés dans la même
                * case : la hauteur ne bouge pas d'une coupe à l'autre. */}
              <div className="mt-[clamp(0.75rem,2.5svh,1.5rem)] grid" aria-live="polite">
                {familles.map(({ c }, i) => (
                  <div
                    key={c.ancre}
                    className={`col-start-1 row-start-1 transition-opacity duration-700 [transition-timing-function:var(--ease-doux)] ${
                      i === actif ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={i !== actif || undefined}
                  >
                    <p className="texte">{coupeNote(c, langue)}</p>
                    <Link
                      href={`/coupes/${c.ancre}`}
                      tabIndex={i === actif ? undefined : -1}
                      className="lien-nav souligne mt-3 inline-block text-action"
                    >
                      {L.coupes.les} {coupePluriel(c.nom, langue)}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {L.coupes.presentee} : {coupeNom(courante, langue)}
      </span>

      {/* —————————————————————————— au doigt ——————————————————————————
        *
        * Les six coupes se lisent empilées, chacune entière, sans rien à
        * commander. La scène de bureau demande un survol qui n'existe pas
        * au doigt, et une scène collée y donnerait le sentiment d'une
        * page bloquée.
        *
        * Une pile plutôt qu'un second rail : la section précédente en est
        * un, celle des maisons aussi. Trois de suite finiraient par se
        * confondre, et l'on veut ici voir chaque ligne en entier plutôt
        * que d'en balayer six.
        */}
      <div className="lg:hidden">
        <div className="gouttiere pt-[clamp(3rem,8vw,4rem)]">
          <p className="legende">{L.coupes.legende}</p>
          <span data-ligne className="mt-4 block">
            <p className="phrase">{L.coupes.titre}</p>
          </span>
          <p className="texte mt-4">
            {L.coupes.texte}
          </p>
        </div>

        {/* La trame à deux colonnes du site, celle des robes et des
          * maisons. Empilées en pleine largeur, les six coupes tenaient
          * quatre écrans et demi — plus long que tout le reste de la page
          * réuni. Elles en tiennent un. */}
        <div className="gouttiere mt-8">
          <div className="trame-tuiles grid-cols-2">
            {familles.map(({ c, media }, i) => (
              <Tuile
                key={c.ancre}
                retard={(i % 2) * 70}
                href={`/coupes/${c.ancre}`}
                media={media}
                dossier="robes"
                alt={altCoupe(c.nom, langue)}
                nom={coupeNom(c, langue)}
                note={coupeNote(c, langue)}
                sizes="46vw"
              />
            ))}
          </div>
          <Link href="/coupes" className="lien-nav souligne mt-8 inline-block text-action">
            {L.coupes.lien}
          </Link>
        </div>
      </div>
    </section>
  );
}
