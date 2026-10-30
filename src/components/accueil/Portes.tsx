"use client";

import { useState } from "react";
import Link from "next/link";
import Photo from "@/components/media/Photo";
import { SCENES, type Media } from "@/content/medias";
import { altScene } from "@/lib/alt";

/* 03 — Trois portes, pas trois cartes : une liste typographique, une seule image qui change. */
const PORTES: { n: string; titre: string; mot: string; sous: string; href: string; media: Media; alt: string }[] = [
  { n: "01", titre: "Par la", mot: "coupe", sous: "Sirène, princesse, fluide, trapèze, deux-en-un", href: "/coupes/", media: SCENES["choix-libre"], alt: altScene("Des robes de mariée sur leurs portants") },
  { n: "02", titre: "Par la", mot: "morphologie", sous: "O, A, V, H, 8, X : la coupe qui vous va", href: "/morphologies/", media: SCENES["choix-guidee"], alt: altScene("Un essayage de robe de mariée") },
  { n: "03", titre: "Par la", mot: "maison", sous: "Watters Designs, Casablanca Bridal, Olya Mak, Monica Loretti", href: "/createurs/", media: SCENES["createurs"], alt: altScene("Les collections des créateurs") },
];

export default function Portes() {
  const [actif, setActif] = useState(0);
  return (
    <section aria-labelledby="portes" className="cadre section">
      <div className="grille">
        <div className="md:col-span-3"><p className="numero mb-3">02</p><h2 id="portes" className="titre-3">Trois façons de commencer</h2></div>
        <ul className="md:col-span-5 md:col-start-5">
          {PORTES.map((p, i) => (
            <li key={p.href} className="filet last:border-b last:border-b-lin">
              <Link href={p.href} onMouseEnter={() => setActif(i)} onFocus={() => setActif(i)} className="grid grid-cols-[3rem_1fr] items-baseline gap-6 py-6 md:py-8">
                <span className="numero">{p.n}</span>
                <span>
                  <span className="titre-2 block">{p.titre} <em className={`transition-colors duration-500 ${actif === i ? "text-grenat" : ""}`}>{p.mot}</em></span>
                  <span className="mention mt-2 block">{p.sous}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative aspect-detail md:col-span-3 md:col-start-10 md:mt-12">
          {PORTES.map((p, i) => (
            <div key={p.href} className={`absolute inset-0 transition-opacity duration-700 ease-sortie ${actif === i ? "opacity-100" : "opacity-0"}`} aria-hidden={actif !== i}>
              <Photo media={p.media} dossier="scenes" alt={p.alt} sizes="(min-width: 768px) 24vw, 90vw" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
