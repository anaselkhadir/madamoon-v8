"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Le fondu monté : un bloc de texte apparaît de 24 px, une fois, au premier
 * passage. Sans JavaScript, tout est visible (classe js-anime posée au montage). */
type Props = { children: ReactNode; className?: string; delai?: number };

export default function Fondu({ children, className = "", delai = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => {
        if (e.isIntersecting) { setTimeout(() => el.classList.add("visible"), delai * 1000); obs.disconnect(); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delai]);
  return <div ref={ref} data-fondu className={className}>{children}</div>;
}
