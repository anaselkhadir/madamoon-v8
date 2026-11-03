"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/Lien";

/*
 * Par style, matière ou détail — sous les robes de l'accueil.
 *
 * Sur ordinateur, l'intitulé au milieu et les pages en pastilles
 * éparpillées autour, qui flottent lentement : d'après la section
 * « Une équipe dédiée » du site ANVSLAB, à la demande d'Anas (3 novembre
 * 2026). Les couleurs restent celles de la maison — le rouge, l'encre,
 * la craie — et non les teintes vives de la référence.
 *
 * Au doigt et sur tablette, rien ne change : la liste en colonnes, avec
 * ses filets et ses flèches (le dessin ne change que sur ordinateur).
 *
 * Une seule liste de liens pour les deux : chaque élément porte sa place
 * (--x, --y) et son angle (--r) en variables, que la feuille de style
 * n'emploie qu'à partir de 1 024 px. Les liens ne sont pas doublés dans
 * la page, et leur texte est entier — « Robe de mariée bohème ».
 *
 * Les pastilles entrent en ressort quand le bloc paraît, une à une, puis
 * flottent ; jamais si le mouvement est réduit. Visibles d'emblée : seule
 * l'entrée est animée, et elle ne part que hors de l'écran.
 */

type Lien = { href: string; label: string };

/* Le centre de chaque pastille, en pour cent du bloc, son angle, et
 * l'amplitude de son flottement. Treize places autour de l'intitulé,
 * autant que de liens. */
const PLACES: { x: number; y: number; r: number; f: number }[] = [
  { x: 16, y: 8, r: -6, f: 9 },
  { x: 50, y: 6, r: 3, f: 8 },
  { x: 84, y: 10, r: 5, f: 10 },
  { x: 31, y: 24, r: 4, f: 11 },
  { x: 70, y: 25, r: -4, f: 9 },
  { x: 12, y: 41, r: 6, f: 10 },
  { x: 88, y: 43, r: -5, f: 9 },
  { x: 12, y: 62, r: -7, f: 11 },
  { x: 88, y: 64, r: 7, f: 9 },
  { x: 24, y: 81, r: 4, f: 8 },
  { x: 76, y: 82, r: -4, f: 10 },
  { x: 36, y: 95, r: -3, f: 12 },
  { x: 67, y: 95, r: 5, f: 9 },
];

/* Les teintes de la maison, en alternance. */
const TEINTES = ["rouge", "encre", "craie", "rouge", "craie", "encre"] as const;

export default function StylesFlottants({ titre, liens }: { titre: string; liens: Lien[] }) {
  const bloc = useRef<HTMLElement>(null);
  const [vu, setVu] = useState(false);
  /* Prêt : le script est là, l'entrée peut attendre l'écran. Sans lui,
   * les pastilles restent simplement visibles. */
  const [pret, setPret] = useState(false);

  useEffect(() => {
    const el = bloc.current;
    if (!el) return;
    setPret(true);
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVu(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      ref={bloc}
      aria-label={titre}
      data-pret={pret || undefined}
      data-vu={vu || undefined}
      className="styles-flottants gouttiere pt-[clamp(2rem,4vw,3.5rem)] lg:pt-[clamp(3rem,5vw,4.5rem)]"
    >
      {/* L'intitulé : la légende au doigt, la grande phrase au milieu sur
        * ordinateur. */}
      <p className="legende lg:hidden">{titre}</p>
      <div className="styles-flottants-scene">
        <p aria-hidden="true" className="styles-flottants-titre phrase max-lg:hidden">
          {titre}
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-x-[clamp(1.5rem,3vw,3rem)] border-t border-fil sm:grid-cols-2 lg:mt-0 lg:block lg:border-0">
          {liens.map((l, i) => {
            const p = PLACES[i % PLACES.length];
            return (
              <li
                key={l.href}
                className="styles-flottants-item border-b border-fil lg:border-0"
                data-teinte={TEINTES[i % TEINTES.length]}
                style={
                  {
                    "--x": `${p.x}%`,
                    "--y": `${p.y}%`,
                    "--r": `${p.r}deg`,
                    "--f": `${p.f}px`,
                    "--d": `${5 + (i % 6)}s`,
                    "--i": i,
                  } as React.CSSProperties
                }
              >
                <span className="styles-flottants-flotte">
                  <Link
                    href={l.href}
                    className="styles-flottants-lien texte flex min-h-11 items-baseline justify-between gap-4 py-3 transition-colors duration-300 hover:text-action"
                  >
                    <span>{l.label}</span>
                    <span aria-hidden="true" className="lg:hidden">
                      →
                    </span>
                  </Link>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
