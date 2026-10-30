"use client";

import { useState } from "react";
import Link from "next/link";
import { MORPHOLOGIES } from "@/content/madamoon";

/* 05 — La morphologie, composée en lettres : chaque lettre dit la coupe qu'elle appelle. */
export default function Lettres() {
  const [actif, setActif] = useState(0);
  const m = MORPHOLOGIES[actif];
  return (
    <section aria-labelledby="lettres" className="bg-ivoire">
      <div className="cadre section">
        <p className="numero mb-3">04</p>
        <h2 id="lettres" className="titre-2 max-w-[22ch]">Avant la robe, <em>la morphologie</em></h2>
        <ul className="mt-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 bodoni" aria-label="Les six morphologies">
          {MORPHOLOGIES.map((mo, i) => (
            <li key={mo.lettre}>
              <Link
                href={`/morphologies/${mo.lettre.toLowerCase()}/`}
                onMouseEnter={() => setActif(i)} onFocus={() => setActif(i)}
                aria-label={mo.nom}
                className={`block text-[clamp(4rem,13vw,15rem)] leading-none transition-colors duration-500 ease-sortie ${actif === i ? "italic text-encre" : "text-sable hover:text-graphite"}`}
              >
                {mo.lettre}
              </Link>
            </li>
          ))}
        </ul>
        <div className="grille mt-12" aria-live="polite">
          <p className="phrase md:col-span-6">{m.nom} — {m.silhouette}</p>
          <div className="md:col-span-4 md:col-start-9">
            <p className="mention mb-2">Les coupes qui lui vont d'abord</p>
            <p className="texte">{m.premieres.join(", ")} — puis {m.secondes.join(", ").toLowerCase()}.</p>
            <Link href={`/morphologies/${m.lettre.toLowerCase()}/`} className="lien mt-4 inline-block text-[0.875rem]">Quelle robe pour une {m.nom.toLowerCase()}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
