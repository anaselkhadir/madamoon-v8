"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ScrollTrigger, mouvementReduit } from "@/lib/motion/gsap";

/*
 * Le défilement lissé du site. Une seule instance, créée ici ; les scènes
 * GSAP lisent ScrollTrigger, qui est resynchronisé à chaque image de Lenis.
 * Rien n'est lissé si la personne demande moins de mouvement.
 */
export default function Mouvement() {
  const chemin = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js-anime");
    if (mouvementReduit()) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    let image = 0;
    const boucle = (t: number) => { lenis.raf(t); image = requestAnimationFrame(boucle); };
    image = requestAnimationFrame(boucle);
    return () => { cancelAnimationFrame(image); lenis.destroy(); };
  }, []);

  /* Toute page s'ouvre en haut ; ScrollTrigger remesure après le changement. */
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, [chemin]);

  return null;
}
