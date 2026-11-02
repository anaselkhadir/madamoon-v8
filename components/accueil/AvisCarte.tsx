"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";
import Etoiles from "@/components/accueil/Etoiles";
import type { Avis } from "@/lib/avis";
import { typographie } from "@/lib/francais";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Les avis, sur une seule carte.
 *
 * D'après la référence Osmo « logo card testimonials » envoyée par la
 * maison. Une carte, un avis à la fois, et une rangée de points en bas :
 * survoler un point — le toucher, au doigt — change d'avis.
 *
 * Le changement suit la référence. En haut, là où elle met le logo et le
 * nom d'une marque, l'initiale et le nom de la mariée : la ligne sort par
 * le haut d'un masque, la suivante monte d'en dessous. Le texte, lui,
 * s'efface vite, et le nouveau paraît ligne après ligne — la citation,
 * puis les étoiles, puis la date.
 *
 * Tous les avis sont posés dans la même case de la grille, l'un sur
 * l'autre : la carte prend la hauteur du plus long et ne bouge plus d'un
 * pixel quand on passe de l'un à l'autre.
 *
 * Mouvement réduit : l'avis change sans transition (globals.css).
 */

export default function AvisCarte({ voix, langue }: { voix: Avis[]; langue: Langue }) {
  const L = t(langue);
  const [actif, setActif] = useState(0);
  const [sortant, setSortant] = useState<number | null>(null);

  const montrer = (i: number) => {
    if (i === actif) return;
    setSortant(actif);
    setActif(i);
  };

  /* Le survol ne vaut qu'à la souris : au doigt, un toucher produit un
   * faux survol juste avant le clic. */
  const survol = (i: number) => (e: PointerEvent) => {
    if (e.pointerType === "mouse") montrer(i);
  };

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label={L.avis.carte}
      className="mx-auto flex max-w-[46rem] flex-col rounded-[4px] bg-gris p-[clamp(1.5rem,3.2vw,2.75rem)]"
    >
      <div className="grid">
        {voix.map((a, i) => {
          const etat = i === actif ? "actif" : i === sortant ? "sortant" : "repos";
          return (
            <figure
              key={a.auteur}
              data-etat={etat}
              aria-hidden={etat !== "actif"}
              inert={etat !== "actif"}
              className="avis-diapo flex flex-col"
            >
              {/* La ligne du haut, dans son masque : l'initiale, pas un
                * portrait — la maison n'a pas les photographies de ses
                * clientes, et on n'en invente pas. */}
              <span className="avis-masque block overflow-hidden">
                <span className="avis-marque flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-encre font-serif text-[0.875rem] leading-none text-blanc"
                  >
                    {a.auteur.charAt(0)}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--color-encre)",
                    }}
                  >
                    {a.auteur}
                  </span>
                </span>
              </span>

              {/* La citation, en grand : c'est elle que la carte montre.
                * Les crochets disent qu'il en manque — une coupe non
                * signalée est une citation faussée. */}
              <blockquote
                className="avis-fondu mt-[clamp(1.25rem,2.4vw,1.75rem)]"
                style={
                  {
                    "--n": 0,
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(1.1875rem, 2.1vw, 1.625rem)",
                    lineHeight: 1.32,
                    letterSpacing: "-0.01em",
                    color: "var(--color-encre)",
                    textWrap: "pretty",
                  } as CSSProperties
                }
              >
                {typographie(`«\u00a0${a.extrait ?? a.texte}`)}
                {a.extrait && <span style={{ color: "var(--color-brume)" }}> […]</span>}
                {"\u202f»"}
              </blockquote>

              <figcaption className="mt-[clamp(1.25rem,2.4vw,1.75rem)]">
                <span
                  className="avis-fondu flex items-center gap-2"
                  style={{ "--n": 1 } as CSSProperties}
                >
                  <Etoiles note={a.note} />
                  <span className="sr-only">{`${a.note} / 5`}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      color: "var(--color-encre)",
                    }}
                  >
                    {L.avis.source}
                  </span>
                </span>
                <span
                  className="avis-fondu mt-1 block"
                  style={
                    {
                      "--n": 2,
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.75rem",
                      color: "var(--color-brume)",
                    } as CSSProperties
                  }
                >
                  {a.date}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* Les points. L'avis montré s'allonge en pastille ; chaque point
        * a la hauteur d'un doigt, même si on n'en voit qu'un rond. */}
      <div className="-mx-1 mt-[clamp(2rem,4.5vw,3.5rem)] flex items-center">
        {voix.map((a, i) => (
          <button
            key={a.auteur}
            type="button"
            aria-label={L.avis.point(a.auteur)}
            aria-current={i === actif}
            onPointerEnter={survol(i)}
            onClick={() => montrer(i)}
            className="avis-point group flex h-6 items-center px-1"
          >
            <span
              aria-hidden="true"
              className="block h-[0.3125rem] rounded-full transition-[width,background-color] duration-500 [transition-timing-function:var(--ease-doux)]"
              style={{
                width: i === actif ? "1.5rem" : "0.3125rem",
                background:
                  i === actif
                    ? "var(--color-action)"
                    : "color-mix(in srgb, var(--color-encre) 22%, transparent)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
