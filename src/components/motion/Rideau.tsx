"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, mouvementReduit } from "@/lib/motion/gsap";

/*
 * Le rideau : une photographie arrive en s'ouvrant par le bas, pendant que
 * l'image se pose en contre-échelle. Une seule image en mouvement par écran.
 * « immediat » : au chargement, sans attendre le défilement (l'affiche).
 */
type Props = { children: ReactNode; className?: string; immediat?: boolean; delai?: number; depuis?: "bas" | "haut" | "gauche" };

export default function Rideau({ children, className = "", immediat = false, delai = 0, depuis = "bas" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || mouvementReduit()) return;
    const enfant = el.firstElementChild as HTMLElement | null;
    const ferme = depuis === "bas" ? "inset(0 0 100% 0)" : depuis === "haut" ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)";
    const ctx = gsap.context(() => {
      gsap.set(el, { clipPath: ferme });
      if (enfant) gsap.set(enfant, { scale: 1.08, transformOrigin: "center" });
      const tl = gsap.timeline({
        delay: delai,
        scrollTrigger: immediat ? undefined : { trigger: el, start: "top 85%", once: true },
      });
      tl.to(el, { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.out" }, 0);
      if (enfant) tl.to(enfant, { scale: 1, duration: 1.4, ease: "expo.out" }, 0);
    }, el);
    return () => ctx.revert();
  }, [immediat, delai, depuis]);
  return (
    <div ref={ref} data-rideau className={className}>
      {children}
    </div>
  );
}
