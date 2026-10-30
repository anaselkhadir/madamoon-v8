"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, SplitText, mouvementReduit } from "@/lib/motion/gsap";

/*
 * La ligne : un titre monte ligne par ligne derrière un masque, avec un
 * décalage de 90 ms. Le HTML reste intact pour les moteurs : SplitText ne
 * découpe qu'au moment de l'animation et se replie ensuite.
 */
type Props = { children: ReactNode; as?: "h1" | "h2" | "h3" | "p" | "span" | "div"; className?: string; immediat?: boolean; delai?: number };

export default function Ligne({ children, as = "div", className = "", immediat = false, delai = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || mouvementReduit()) return;
    /* Le découpage attend les polices : des lignes coupées sur la police de
     * repli se recomposeraient au chargement de Bodoni. autoSplit refait le
     * découpage si la largeur change. */
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "ligne-split",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.09,
            delay: delai,
            scrollTrigger: immediat ? undefined : { trigger: el, start: "top 88%", once: true },
          }),
      });
    }, el);
    return () => { ctx.revert(); split?.revert(); };
  }, [immediat, delai]);
  const Balise = as;
  return <Balise ref={ref as never} className={className}>{children}</Balise>;
}
