"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { langueDe } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Les deux flèches d'un rail.
 *
 * Sous le pouce, un rail se pousse ; à la souris, il ne se pousse pas.
 * Ces flèches n'existent donc que sur grand écran, et seulement là où
 * l'on ne peut pas faire autrement. Elles s'effacent au bout du rail
 * plutôt que de rester allumées sans rien faire.
 */

export default function RailFleches({
  cible,
  quoi = "morphologies",
  cotes = false,
  enPlus = "",
}: {
  cible: string;
  /* De part et d'autre du rail, à mi-hauteur des photographies, sur
   * tous les écrans — plutôt que groupées au-dessus, sur ordinateur
   * seulement. Le parent doit être positionné. */
  cotes?: boolean;
  /* Ce que le rail contient : les flèches le disent aux lecteurs
   * d'écran, et un rail de maisons n'annonce pas des morphologies. */
  quoi?: "morphologies" | "createurs" | "robes";
  /* Ce que le rail ajoute aux flèches : leur hauteur dépend du format
   * de ses cartes, et tous les rails ne les montrent pas aux mêmes
   * largeurs. Le rail des robes devient une grille sur ordinateur et
   * n'a plus rien à pousser. */
  enPlus?: string;
}) {
  const T = t(langueDe(usePathname() ?? "/"));
  const L = quoi === "createurs" ? T.createurs : quoi === "robes" ? T.robesAccueil : T.silhouette;
  const [debut, poserDebut] = useState(true);
  const [fin, poserFin] = useState(false);
  const rail = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById(cible);
    if (!el) return;
    rail.current = el;

    let demande = 0;
    const jauger = () => {
      demande = 0;
      const reste = el.scrollWidth - el.clientWidth;
      poserDebut(el.scrollLeft <= 4);
      poserFin(el.scrollLeft >= reste - 4);
    };
    const auDefilement = () => {
      if (demande) return;
      demande = requestAnimationFrame(jauger);
    };

    jauger();
    el.addEventListener("scroll", auDefilement, { passive: true });
    window.addEventListener("resize", auDefilement, { passive: true });
    return () => {
      cancelAnimationFrame(demande);
      el.removeEventListener("scroll", auDefilement);
      window.removeEventListener("resize", auDefilement);
    };
  }, [cible]);

  /* Un pas = une carte, gouttière comprise : le rail retombe toujours
   * sur un cran, jamais entre deux. */
  const pousser = (sens: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const carte = el.firstElementChild as HTMLElement | null;
    const pas = carte
      ? carte.getBoundingClientRect().width +
        parseFloat(getComputedStyle(el).columnGap || "0")
      : el.clientWidth * 0.8;
    el.scrollBy({ left: sens * pas, behavior: "smooth" });
  };

  if (cotes) {
    return (
      <>
        {(
          [
            ["-1", L.precedentes, "M15 5 8 12l7 7", "fleche-rail-gauche"],
            ["1", L.suivantes, "M9 5l7 7-7 7", "fleche-rail-droite"],
          ] as const
        ).map(([sens, titre, trace, place]) => {
          const inactif = sens === "-1" ? debut : fin;
          return (
            <button
              key={sens}
              type="button"
              onClick={() => pousser(sens === "-1" ? -1 : 1)}
              disabled={inactif}
              aria-label={titre}
              className={`fleche-rail ${place} ${enPlus} grid place-items-center rounded-full bg-blanc text-encre shadow-[0_6px_20px_-8px_rgba(0,0,0,0.45)] transition-[opacity,background-color,color] duration-500 hover:bg-action hover:text-sur-image disabled:pointer-events-none disabled:opacity-0`}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={trace} />
              </svg>
            </button>
          );
        })}
      </>
    );
  }

  return (
    <div className="hidden items-center gap-2 lg:flex">
      {(
        [
          ["-1", L.precedentes, "M15 5 8 12l7 7"],
          ["1", L.suivantes, "M9 5l7 7-7 7"],
        ] as const
      ).map(([sens, titre, trace]) => {
        const inactif = sens === "-1" ? debut : fin;
        return (
          <button
            key={sens}
            type="button"
            onClick={() => pousser(sens === "-1" ? -1 : 1)}
            disabled={inactif}
            aria-label={titre}
            className="grid h-11 w-11 place-items-center rounded-full border border-fil text-encre transition-[opacity,border-color,color] duration-500 hover:border-encre disabled:pointer-events-none disabled:opacity-25"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={trace} />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
