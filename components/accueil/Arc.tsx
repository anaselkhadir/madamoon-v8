"use client";

import { useEffect, useRef } from "react";
import { mouvementReduit, surDefilement } from "@/lib/mouvement";

/*
 * L'arc qui couvre le hero.
 *
 * D'après la référence Osmo « arc scroll transition » envoyée par la
 * maison. Le hero reste en place ; la section qui le suit monte
 * par-dessus, et son bord haut n'est pas une ligne franche mais un arc :
 * plat quand elle entre par le bas de l'écran, bombé à mi-course, de
 * nouveau plat quand elle a tout recouvert. Une étoffe qu'on tire sur une
 * image, pas un store qui descend.
 *
 * L'arc est une parabole dessinée dans un SVG étiré, posée juste au-dessus
 * de la section, à sa couleur. Le défilement ne fait varier qu'une
 * échelle verticale : rien n'est redessiné, rien ne bouge dans la mise en
 * page.
 *
 * Mouvement réduit : pas d'arc, et le hero défile avec la page
 * (« motion-safe » sur son collant).
 */

export default function Arc() {
  const arc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = arc.current;
    if (!el || mouvementReduit()) return;
    const section = el.parentElement;
    if (!section) return;

    let demande = 0;
    const poser = () => {
      demande = 0;
      const haut = section.getBoundingClientRect().top;
      const h = window.innerHeight;
      /* 0 quand la section entre par le bas, 1 quand elle touche le haut. */
      const p = Math.min(Math.max(1 - haut / h, 0), 1);
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
  }, []);

  return (
    <div
      ref={arc}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-full h-[clamp(5rem,20svh,12rem)] origin-bottom motion-reduce:hidden"
      style={{ transform: "scaleY(0)" }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="block h-full w-full">
        {/* Une parabole : douce aux bords, comme un grand cercle. Le
          * dernier pixel déborde vers le bas pour ne laisser aucun jour
          * entre l'arc et la section. */}
        <path d="M0 101 Q50 -100 100 101 Z" style={{ fill: "var(--color-blanc)" }} />
      </svg>
    </div>
  );
}
