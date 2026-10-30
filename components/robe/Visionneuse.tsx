"use client";

import { useCallback, useEffect, useRef } from "react";
import Photo, { precharger } from "@/components/media/Photo";
import type { Media } from "@/lib/medias";
import { degelerDefilement, gelerDefilement } from "@/lib/mouvement";

/*
 * La visionneuse des photographies d'une robe.
 *
 * On clique une vue de la galerie, elle s'ouvre en grand sur un fond
 * sombre ; une croix la ferme, deux flèches passent à la suivante.
 *
 * Elle ne s'ouvre jamais sur le premier écran : celui-là est un
 * bandeau, pas une photographie que l'on regarde — et c'est la demande
 * de la maison.
 *
 * Trois choses qu'une boîte à images doit faire et que l'on oublie :
 *
 * Le clavier. Échap ferme, les flèches passent d'une vue à l'autre, et
 * la tabulation reste enfermée dans la fenêtre — sans quoi elle
 * continue dans la page derrière, qu'on ne voit plus.
 *
 * Le retour du regard. À l'ouverture, le focus va sur la croix ; à la
 * fermeture, il revient sur la vignette d'où l'on est parti, et non en
 * haut de la page.
 *
 * La page derrière. Elle est gelée : sans cela, la molette la fait
 * défiler sous la photographie, et l'on ressort ailleurs.
 */

/* Les rangs sont une liste de textes déjà écrits, et non une fonction
 * qui les écrit : une fonction ne traverse pas la frontière du serveur
 * vers le client — React la refuse, et la page tombe en cinq cents. */
export type Libelles = {
  fermer: string;
  precedente: string;
  suivante: string;
  rangs: string[];
  titre: string;
};

type Props = {
  photos: Media[];
  alts: string[];
  libelles: Libelles;
  /* L'index affiché, ou null quand la visionneuse est fermée. */
  index: number | null;
  surChangement: (i: number) => void;
  surFermeture: () => void;
};

/*
 * La mesure de la photographie ouverte.
 *
 * Elle était écrite « 80vw », et c'était faux : l'image n'est pas
 * tenue par sa largeur mais par sa hauteur — quatre-vingts pour cent
 * de l'écran —, et une verticale de deux tiers y occupe à peu près la
 * moitié de cette hauteur en largeur. Le navigateur, croyant devoir
 * remplir quatre-vingts pour cent de la fenêtre, prenait le fichier de
 * mille sept cents pixels : cent quarante-deux kilo-octets, quand la
 * vignette avait déjà celui de huit cents en mémoire.
 *
 * À cinquante pour cent de la hauteur, il retient le même fichier que
 * la vignette sur un écran d'ordinateur : la photographie est là au
 * clic, sans un octet de plus. Au doigt, la vignette fait la moitié de
 * la fenêtre et la photographie toute la largeur : celle-là monte d'un
 * cran, et c'est justifié.
 */
export const MESURE = "(max-width: 900px) 92vw, 50vh";

/* La croix et les chevrons sont dessinés : un « × » et un « ‹ » pris
 * dans la police n'ont ni la même graisse ni le même centre d'une
 * machine à l'autre. */
function Croix() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function Chevron({ vers }: { vers: "gauche" | "droite" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={vers === "gauche" ? "M15 4l-8 8 8 8" : "M9 4l8 8-8 8"} />
    </svg>
  );
}

export default function Visionneuse({
  photos,
  alts,
  libelles,
  index,
  surChangement,
  surFermeture,
}: Props) {
  const ouverte = index !== null;
  const fenetre = useRef<HTMLDivElement>(null);
  const croix = useRef<HTMLButtonElement>(null);

  const aller = useCallback(
    (pas: number) => {
      if (index === null || photos.length < 2) return;
      surChangement((index + pas + photos.length) % photos.length);
    },
    [index, photos.length, surChangement]
  );

  /* Le gel de la page, et sa levée. Le retour du focus est fait par la
   * galerie, qui sait de quelle vignette on est parti. */
  useEffect(() => {
    if (!ouverte) return;
    gelerDefilement();
    croix.current?.focus();
    return degelerDefilement;
  }, [ouverte]);

  /* Les deux voisines sont demandées dès qu'une vue s'ouvre : la
   * flèche, ensuite, ne fait plus attendre. */
  useEffect(() => {
    if (index === null || photos.length < 2) return;
    const suivante = photos[(index + 1) % photos.length];
    const precedente = photos[(index - 1 + photos.length) % photos.length];
    precharger(suivante, "robes", MESURE);
    precharger(precedente, "robes", MESURE);
  }, [index, photos]);

  useEffect(() => {
    if (!ouverte) return;
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        surFermeture();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        aller(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        aller(1);
        return;
      }
      /* La tabulation tourne en rond dans la fenêtre. */
      if (e.key === "Tab") {
        /* Les boutons cachés par la mise en page — les flèches des
          * côtés sous le seuil, celles du bas au-dessus — ne prennent
          * pas le focus : les enfermer avec les autres bloquait la
          * tabulation sur un élément invisible. */
        const cibles = [...(fenetre.current?.querySelectorAll<HTMLElement>("button") ?? [])].filter(
          (b) => b.offsetParent !== null
        );
        if (cibles.length === 0) return;
        const premier = cibles[0];
        const dernier = cibles[cibles.length - 1];
        if (e.shiftKey && document.activeElement === premier) {
          e.preventDefault();
          dernier.focus();
        } else if (!e.shiftKey && document.activeElement === dernier) {
          e.preventDefault();
          premier.focus();
        }
      }
    };
    window.addEventListener("keydown", auClavier);
    return () => window.removeEventListener("keydown", auClavier);
  }, [ouverte, aller, surFermeture]);

  /* Les deux façons de poser une flèche. La seconde ne paraît qu'au
   * doigt, la première qu'à partir du seuil. */
  const cote =
    "absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-sur-image transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-sur-image)_16%,transparent)] md:flex";
  const sousLaPhoto =
    "flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-sur-image)_16%,transparent)]";

  if (index === null) return null;
  const media = photos[index];
  if (!media) return null;

  return (
    <div
      ref={fenetre}
      role="dialog"
      aria-modal="true"
      aria-label={libelles.titre}
      /* Le fond ferme au clic. La photographie et les commandes
        * arrêtent le clic : on ne ferme pas une fenêtre en visant son
        * contenu. */
      onClick={surFermeture}
      className="fixed inset-0 z-[120] flex items-center justify-center p-[clamp(0.75rem,3vw,2.5rem)]"
      style={{ background: "color-mix(in srgb, var(--color-encre) 94%, transparent)" }}
    >
      <button
        ref={croix}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          surFermeture();
        }}
        aria-label={libelles.fermer}
        className="absolute right-[clamp(0.75rem,2vw,1.75rem)] top-[clamp(0.75rem,2vw,1.75rem)] z-10 flex h-11 w-11 items-center justify-center rounded-full text-sur-image transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-sur-image)_16%,transparent)]"
      >
        <Croix />
      </button>

      {/* Les flèches, deux fois, et une seule paire à l'écran.
        *
        * Aux côtés à partir du seuil : la place y est, et la main va
        * les chercher où elle les attend. Sous le seuil, non — sur
        * trois cent soixante-quinze pixels, la photographie fait toute
        * la largeur et les flèches tombaient dessus, sur la robe. Elles
        * descendent alors sous elle, de part et d'autre du rang. */}
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              aller(-1);
            }}
            aria-label={libelles.precedente}
            className={`${cote} left-[clamp(0.25rem,1.5vw,1.75rem)]`}
          >
            <Chevron vers="gauche" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              aller(1);
            }}
            aria-label={libelles.suivante}
            className={`${cote} right-[clamp(0.25rem,1.5vw,1.75rem)]`}
          >
            <Chevron vers="droite" />
          </button>
        </>
      )}

      {/* La photographie est contenue, jamais recadrée : c'est tout le
        * propos de l'avoir ouverte. Sa taille d'affichage ne dépasse
        * pas celle de sa source — au-delà, on agrandit du flou. */}
      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full max-w-full flex-col items-center gap-3"
      >
        <Photo
          key={media.name}
          media={media}
          dossier="robes"
          alt={alts[index] ?? ""}
          sizes={MESURE}
          priorite
          className="max-h-[80svh] w-auto max-w-full object-contain"
        />
        {photos.length > 1 && (
          <figcaption
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2"
            style={{ color: "var(--color-sur-image)" }}
          >
            <button
              type="button"
              onClick={() => aller(-1)}
              aria-label={libelles.precedente}
              className={`${sousLaPhoto} md:hidden`}
            >
              <Chevron vers="gauche" />
            </button>
            <span className="mention min-w-[4.5rem] text-center">{libelles.rangs[index]}</span>
            <button
              type="button"
              onClick={() => aller(1)}
              aria-label={libelles.suivante}
              className={`${sousLaPhoto} md:hidden`}
            >
              <Chevron vers="droite" />
            </button>
          </figcaption>
        )}
      </figure>
    </div>
  );
}
