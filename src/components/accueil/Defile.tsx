"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Tuile from "@/components/robe/Tuile";
import type { Robe } from "@/content/madamoon";
import { gsap, ScrollTrigger, mouvementReduit } from "@/lib/motion/gsap";

/*
 * 04 — Le défilé : huit robes en bande horizontale. Sur grand écran, la bande
 * est épinglée et avance avec le défilement ; sur mobile, c'est un
 * défilement horizontal natif avec accroche.
 */
export default function Defile({ robes }: { robes: Robe[] }) {
  const cadre = useRef<HTMLDivElement>(null);
  const bande = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const c = cadre.current, b = bande.current;
    if (!c || !b || mouvementReduit() || window.innerWidth < 1024) return;
    const ctx = gsap.context(() => {
      const course = () => b.scrollWidth - c.clientWidth;
      gsap.to(b, {
        x: () => -course(), ease: "none",
        scrollTrigger: { trigger: c, start: "top top", end: () => `+=${course()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
      });
    }, c);
    return () => ctx.revert();
  }, [robes.length]);
  return (
    <section aria-labelledby="defile" className="bg-porcelaine">
      <div className="cadre pt-section pb-8 flex items-end justify-between gap-6">
        <div><p className="numero mb-3">03</p><h2 id="defile" className="titre-2">Quelques robes, <em>pour commencer</em></h2></div>
        <Link href="/robes/" className="lien hidden text-[0.875rem] md:inline">Toutes les robes</Link>
      </div>
      <div ref={cadre} className="overflow-hidden pb-section">
        <div ref={bande} className="flex snap-x snap-mandatory gap-gouttiere overflow-x-auto px-gouttiere lg:snap-none lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {robes.map((r, i) => (
            <div key={r.slug} className={`w-[72vw] shrink-0 snap-start sm:w-[44vw] lg:w-[24vw] ${i % 2 ? "lg:pt-16" : ""}`}>
              <Tuile robe={r} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 44vw, 72vw" />
            </div>
          ))}
          <div className="flex w-[40vw] shrink-0 items-center lg:w-[20vw]">
            <Link href="/robes/" className="bouton bouton-filet">Toutes les robes</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
