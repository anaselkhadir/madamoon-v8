"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { surDefilement } from "@/lib/mouvement";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  /* Le défilement lissé de Lenis pilote les mesures de ScrollTrigger. */
  surDefilement(() => ScrollTrigger.update());
}

export { gsap, ScrollTrigger };
