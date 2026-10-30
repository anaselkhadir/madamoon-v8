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

export const mouvementReduit = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText };
