"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { autreLangue, estTraduite, langueDe, versFrancais, versLangue, type Langue as TLangue } from "@/lib/langue";

/*
 * Le choix de la langue.
 *
 * La barre n'affiche que la langue en cours et un chevron. Le reste se
 * déplie au clic : deux lignes, chacune écrite dans sa propre langue —
 * « Français » et « English ». Une mariée anglophone reconnaît le mot
 * qu'elle cherche sans avoir à comprendre celui d'à côté.
 *
 * Pas de drapeau. Un drapeau désigne un pays, pas une langue, et la
 * maison reçoit des anglophones qui ne sont pas anglaises.
 *
 * Le panneau est blanc plein, cerné d'un filet d'un pixel : c'est ce que
 * le reste du site emploie depuis que le verre a été retiré de la
 * méga-navigation. Aucune ombre — il n'y en a nulle part ailleurs.
 *
 * Chaque ligne est un vrai lien, et non un bouton qui navigue : elle
 * s'ouvre dans un autre onglet, se copie, et fonctionne sans script.
 */

const NOM: Record<TLangue, string> = { fr: "Français", en: "English" };

export default function Langue() {
  const chemin = usePathname() ?? "/";
  const courante = langueDe(chemin);
  const autre = autreLangue(chemin);
  const [ouvert, setOuvert] = useState(false);
  const boite = useRef<HTMLDivElement>(null);

  /* Le panneau se referme sur Échap et dès qu'on touche ailleurs — c'est
   * ce qu'on attend d'un menu, et cela évite de le laisser ouvert
   * derrière soi en naviguant. */
  useEffect(() => {
    if (!ouvert) return;
    const surTouche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    const surClic = (e: MouseEvent) => {
      if (!boite.current?.contains(e.target as Node)) setOuvert(false);
    };
    window.addEventListener("keydown", surTouche);
    window.addEventListener("pointerdown", surClic);
    return () => {
      window.removeEventListener("keydown", surTouche);
      window.removeEventListener("pointerdown", surClic);
    };
  }, [ouvert]);

  useEffect(() => setOuvert(false), [chemin]);

  if (!estTraduite(versFrancais(chemin))) return null;

  const adresse = (l: TLangue) =>
    l === courante ? chemin : l === "fr" ? versFrancais(chemin) : versLangue(versFrancais(chemin), "en");

  return (
    <div ref={boite} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-expanded={ouvert}
        aria-haspopup="true"
        aria-label={courante === "fr" ? "Changer de langue" : "Change language"}
        className="lien-nav flex items-center gap-1.5 py-3"
      >
        {courante.toUpperCase()}
        <svg
          viewBox="0 0 10 6"
          aria-hidden="true"
          className={`h-[0.3rem] w-[0.5rem] transition-transform duration-500 [transition-timing-function:var(--ease-doux)] ${
            ouvert ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      {ouvert && (
        <ul className="absolute right-0 top-full z-[70] min-w-[7.5rem] border border-fil bg-blanc py-1">
          {(["fr", "en"] as const).map((l) => (
            <li key={l}>
              <NextLink
                href={adresse(l)}
                hrefLang={l}
                lang={l}
                aria-current={l === courante ? "true" : undefined}
                onClick={() => setOuvert(false)}
                className={`block px-4 py-2.5 text-[0.8125rem] leading-none transition-colors duration-500 ${
                  l === courante ? "text-encre" : "text-plomb hover:text-action"
                }`}
              >
                {NOM[l]}
              </NextLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
