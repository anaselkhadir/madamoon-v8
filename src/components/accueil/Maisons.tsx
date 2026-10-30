"use client";

import { useState } from "react";
import Link from "next/link";
import Photo from "@/components/media/Photo";
import { CREATEURS } from "@/content/madamoon";
import { SCENES, VIGNETTES_CREATEURS, vues, type Media } from "@/content/medias";
import { altScene } from "@/lib/alt";

/* 06 — Les maisons : une liste typographique, l'image change au survol. */
const MAISONS = CREATEURS.filter((c) => c.slug !== "autres-createurs").map((c) => {
  const media: Media | undefined = VIGNETTES_CREATEURS[c.slug] ?? vues(c.vignette?.robe ?? c.ouverture.robe)[(c.vignette?.vue ?? c.ouverture.vue) - 1];
  return { ...c, media, dossier: (VIGNETTES_CREATEURS[c.slug] ? "robes" : "robes") as "robes" | "scenes" };
});

export default function Maisons() {
  const [actif, setActif] = useState(0);
  return (
    <section aria-labelledby="maisons" className="cadre section">
      <div className="grille">
        <div className="order-2 md:order-1 md:col-span-5">
          <div className="relative aspect-robe">
            {MAISONS.map((m, i) => (
              <div key={m.slug} className={`absolute inset-0 transition-opacity duration-700 ease-sortie ${actif === i ? "opacity-100" : "opacity-0"}`} aria-hidden={actif !== i}>
                {m.media ? <Photo media={m.media} dossier={m.dossier} alt={altScene(`Une robe de mariée ${m.nom}`)} sizes="(min-width: 768px) 40vw, 90vw" className="h-full w-full object-cover" /> : <Photo media={SCENES["createurs"]} dossier="scenes" alt={altScene("Les collections")} sizes="40vw" className="h-full w-full object-cover" />}
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
          <p className="numero mb-3">05</p>
          <h2 id="maisons" className="titre-2">Plusieurs maisons. <em>Aucune par hasard.</em></h2>
          <ul className="mt-10">
            {MAISONS.map((m, i) => (
              <li key={m.slug} className="filet last:border-b last:border-b-lin">
                <Link href={`/createurs/${m.slug}/`} onMouseEnter={() => setActif(i)} onFocus={() => setActif(i)} className="flex items-baseline justify-between gap-6 py-5">
                  <span className={`titre-3 transition-colors duration-500 ${actif === i ? "italic" : ""}`}>{m.nom}</span>
                  <span className="mention shrink-0">{m.origine}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="texte mt-8 text-graphite">{MAISONS[actif].note}</p>
        </div>
      </div>
    </section>
  );
}
