"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, mouvementReduit } from "@/lib/motion/gsap";

/* La dérive : une translation verticale de quelques pour cent au défilement,
 * pour la profondeur. Coupée sous 768 px et sous reduced-motion. */
type Props = { children: ReactNode; className?: string; amplitude?: number };

export default function Derive({ children, className = "", amplitude = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || mouvementReduit() || window.innerWidth < 768) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { yPercent: amplitude }, {
        yPercent: -amplitude, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, [amplitude]);
  return <div ref={ref} className={className}>{children}</div>;
}
