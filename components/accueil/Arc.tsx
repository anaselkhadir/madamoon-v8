"use client";

import { useEffect, useRef } from "react";
import { mouvementReduit, surDefilement } from "@/lib/mouvement";

/*
 * L'arc d'une section qui passe sur une autre.
 *
 * D'après la référence Osmo « arc scroll transition » envoyée par la
 * maison. Posé au bord d'une section, à sa couleur, il se bombe pendant
 * que ce bord traverse l'écran : plat en entrant, bombé à mi-course, de
 * nouveau plat en sortant. Une étoffe qu'on tire, pas un store.
 *
 * « haut » : l'arc coiffe la section qui monte par-dessus la précédente
 * (le hero) ; il se mesure au bord haut de la section.
 * « bas » : la sortie, inversée ; l'arc pend sous la section qui s'en
 * va et découvre la suivante ; il se mesure au bord bas.
 *
 * Une parabole dessinée dans un SVG étiré ; le défilement ne fait varier
 * qu'une échelle verticale. Mouvement réduit : pas d'arc.
 */

export default function Arc({
  sens = "haut",
  couleur = "var(--color-blanc)",
}: {
  sens?: "haut" | "bas";
  couleur?: string;
}) {
  const arc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = arc.current;
    if (!el || mouvementReduit()) return;
    const section = el.parentElement;
    if (!section) return;

    let demande = 0;
    const poser = () => {
      demande = 0;
      const b = section.getBoundingClientRect();
      const bord = sens === "haut" ? b.top : b.bottom;
      /* 0 quand le bord entre par le bas de l'écran, 1 quand il touche
       * le haut. */
      const p = Math.min(Math.max(1 - bord / window.innerHeight, 0), 1);
      el.style.transform = `scaleY(${Math.sin(Math.PI * p).toFixed(4)})`;
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
  }, [sens]);

  const haut = sens === "haut";
  return (
    <div
      ref={arc}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 h-[clamp(3rem,min(20svh,18vw),12rem)] motion-reduce:hidden ${
        haut ? "bottom-full origin-bottom" : "top-full origin-top"
      }`}
      style={{ transform: "scaleY(0)" }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="block h-full w-full">
        {/* Une parabole, douce aux bords. Elle déborde d'un pixel vers la
          * section pour ne laisser aucun jour entre elles. */}
        <path
          d={haut ? "M0 101 Q50 -100 100 101 Z" : "M0 -1 Q50 200 100 -1 Z"}
          style={{ fill: couleur }}
        />
      </svg>
    </div>
  );
}
