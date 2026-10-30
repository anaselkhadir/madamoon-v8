"use client";

import { useEffect } from "react";

/*
 * Pousser un rail à la souris.
 *
 * Sous le pouce, un rail se pousse tout seul. À la souris, non : il n'y
 * a ni glissement ni molette horizontale sur la plupart des appareils,
 * et la maison nous l'a signalé — « le rail sur ordi ne défile pas ».
 *
 * On attrape donc la bande et on la tire, comme une penderie. Trois
 * précautions :
 *
 * Le doigt est ignoré : il a déjà son défilement, et s'en mêler le
 * rendrait saccadé.
 *
 * L'aimantation est coupée le temps du geste. « snap-mandatory » ramène
 * la bande sur le cran à chaque image, et le glissement devient un
 * combat ; elle revient à la fin, pour que le rail se range.
 *
 * Un clic qui a traîné n'ouvre pas la robe. Sans cela, tirer la bande
 * depuis une carte finissait sur sa fiche.
 */

export default function RailSouris({ cible }: { cible: string }) {
  useEffect(() => {
    const el = document.getElementById(cible);
    if (!el) return;

    let tire = false;
    let bouge = false;
    let departX = 0;
    let departScroll = 0;
    let aimant = "";

    const poussable = () => el.scrollWidth - el.clientWidth > 4;

    const curseur = () => {
      el.style.cursor = poussable() ? "grab" : "";
    };

    const bas = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0 || !poussable()) return;
      tire = true;
      bouge = false;
      departX = e.clientX;
      departScroll = el.scrollLeft;
      aimant = el.style.scrollSnapType;
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
      el.setPointerCapture(e.pointerId);
    };

    const deplace = (e: PointerEvent) => {
      if (!tire) return;
      const d = e.clientX - departX;
      if (!bouge && Math.abs(d) > 3) bouge = true;
      if (bouge) {
        e.preventDefault();
        el.scrollLeft = departScroll - d;
      }
    };

    const haut = (e: PointerEvent) => {
      if (!tire) return;
      tire = false;
      el.style.scrollSnapType = aimant;
      curseur();
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* Le pointeur a déjà été rendu : rien à faire. */
      }
      /* Le drapeau survit au clic qui suit, puis s'efface. */
      if (bouge) setTimeout(() => (bouge = false), 0);
    };

    const clic = (e: MouseEvent) => {
      if (bouge) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    curseur();
    el.addEventListener("pointerdown", bas);
    window.addEventListener("pointermove", deplace, { passive: false });
    window.addEventListener("pointerup", haut);
    window.addEventListener("resize", curseur);
    el.addEventListener("click", clic, true);
    return () => {
      el.removeEventListener("pointerdown", bas);
      window.removeEventListener("pointermove", deplace);
      window.removeEventListener("pointerup", haut);
      window.removeEventListener("resize", curseur);
      el.removeEventListener("click", clic, true);
      el.style.cursor = "";
    };
  }, [cible]);

  return null;
}
