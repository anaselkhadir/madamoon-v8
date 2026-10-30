"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/* Un seul enregistrement des plugins pour tout le site. GSAP 3.13+ livre
 * SplitText et ScrollTrigger gratuitement. */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "expo.out", duration: 0.9 });
}

/* Pas de mouvement si la personne le demande, ni dans un onglet caché : un
 * onglet en arrière-plan ne rafraîchit pas l'écran et figerait les entrées
 * à leur état initial. Le contenu est alors simplement là. */
export const mouvementReduit = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.visibilityState === "hidden");

export { gsap, ScrollTrigger, SplitText };
