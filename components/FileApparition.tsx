"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { mouvementReduit } from "@/lib/mouvement";

/*
 * L'apparition en file, pour une trame de tuiles.
 *
 * D'après la référence Osmo « queued scroll reveal » envoyée par la
 * maison, pour la page « Toutes les robes ». Les tuiles qui entrent à
 * l'écran ne paraissent pas toutes ensemble : elles prennent leur tour
 * dans une file, une toutes les quatre-vingt-dix millisecondes, et
 * chacune monte d'un rien en se dévoilant. Une rangée qui arrive se pose
 * de gauche à droite, une page qu'on fait défiler vite se remplit à son
 * rythme, sans jamais tout lâcher d'un coup.
 *
 * Sur ordinateur seulement. Au doigt, la trame garde son apparition
 * d'avant, le rideau de chaque tuile (Mouvement.tsx). Mouvement réduit :
 * tout est là d'emblée.
 *
 * Ce qui est déjà passé au-dessus de l'écran — un retour en arrière, une
 * ancre — paraît sans attendre : la file ne retient que ce qui arrive.
 */

/* L'écart entre deux tuiles de la file. */
const PAS = 90;

export default function FileApparition({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const trame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trame.current;
    if (!el) return;
    if (!window.matchMedia("(min-width: 1024px)").matches || mouvementReduit()) return;

    const tuiles = Array.from(el.children) as HTMLElement[];

    /* Le rideau des tuiles cède la place à la file : on le lève tout de
     * suite et on le marque levé, pour que le moteur commun l'ignore. */
    el.querySelectorAll<HTMLElement>("[data-rideau]").forEach((r) => {
      r.dataset.leve = "1";
      r.style.clipPath = "none";
      const img = r.querySelector("img");
      if (img) img.style.transform = "none";
    });

    const poser = (t: HTMLElement, avec: boolean) => {
      t.style.transition = avec
        ? "opacity 0.7s var(--ease-doux), transform 0.9s var(--ease-doux)"
        : "none";
      t.style.opacity = "1";
      t.style.transform = "none";
    };
    tuiles.forEach((t) => {
      t.style.opacity = "0";
      t.style.transform = "translate3d(0, 1.5rem, 0)";
    });

    /* La file : chaque tuile part au plus tôt maintenant, au plus tard
     * un pas après la précédente. */
    let prochain = 0;
    const minuteries: number[] = [];
    const enFile = (t: HTMLElement) => {
      const maintenant = performance.now();
      const depart = Math.max(maintenant, prochain);
      prochain = depart + PAS;
      minuteries.push(window.setTimeout(() => poser(t, true), depart - maintenant));
    };

    const obs = new IntersectionObserver(
      (entrees) => {
        entrees
          /* Dans l'ordre du document, pour que la file suive la lecture. */
          .sort((a, b) => tuiles.indexOf(a.target as HTMLElement) - tuiles.indexOf(b.target as HTMLElement))
          .forEach((e) => {
            const t = e.target as HTMLElement;
            if (e.isIntersecting) {
              enFile(t);
              obs.unobserve(t);
            } else if (e.boundingClientRect.bottom < 0) {
              poser(t, false);
              obs.unobserve(t);
            }
          });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );
    tuiles.forEach((t) => obs.observe(t));

    return () => {
      obs.disconnect();
      minuteries.forEach((m) => window.clearTimeout(m));
      tuiles.forEach((t) => {
        t.style.opacity = "";
        t.style.transform = "";
        t.style.transition = "";
      });
    };
  }, []);

  return (
    <div ref={trame} className={className}>
      {children}
    </div>
  );
}
