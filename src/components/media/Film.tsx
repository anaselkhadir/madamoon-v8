"use client";

import { useEffect, useRef } from "react";
import type { Media } from "@/content/medias";
import Photo from "@/components/media/Photo";

/*
 * Un film muet de la maison, en boucle. Demandé à l'approche seulement, et
 * jamais si la personne refuse le mouvement ou compte sa connexion : alors
 * l'affiche reste.
 */
type Props = { src: string; affiche: Media; alt: string; sizes: string; className?: string; position?: string };

export default function Film({ src, affiche, alt, sizes, className = "", position }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduit || conn?.saveData) return;
    const obs = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((e) => {
          if (e.isIntersecting) {
            if (!video.src) { video.src = src; video.load(); }
            video.play().then(() => video.classList.add("pret")).catch(() => {});
          } else video.pause();
        });
      },
      { rootMargin: "40% 0px" },
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, [src]);
  return (
    <div className={`relative ${className}`}>
      <Photo media={affiche} dossier="scenes" alt={alt} sizes={sizes} className="absolute inset-0 h-full w-full object-cover" position={position} />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 [&.pret]:opacity-100"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
