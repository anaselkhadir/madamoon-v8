"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { langueDe } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Le clair et le sombre.
 *
 * Le site est clair. Le sombre est un choix, jamais une préférence
 * devinée : « prefers-color-scheme » n'est pas consulté. Une boutique de
 * robes de mariée se donne d'abord en clair, et un système réglé sur
 * sombre ne dit pas qu'on veut voir la dentelle sur du noir.
 *
 * Le choix tient dans le navigateur, et un script du gabarit le repose
 * avant la première peinture : sans lui, une visiteuse qui a choisi le
 * sombre verrait le site blanc le temps de l'hydratation.
 *
 * Deux traits plutôt que deux mots : un soleil et une lune, dessinés au
 * filet d'un pixel comme les flèches du rail. Le bouton dit ce vers quoi
 * il mène, pas où l'on est.
 */

const CLE = "madamoon.theme";

export default function Theme({ classe = "", cercle = false }: { classe?: string; cercle?: boolean }) {
  const L = t(langueDe(usePathname() ?? "/"));
  /* Rien au premier rendu : le serveur ne sait pas ce que la visiteuse a
   * choisi, et annoncer « sombre » à tout le monde ferait clignoter le
   * bouton chez ceux qui sont en clair. */
  const [sombre, setSombre] = useState<boolean | null>(null);

  useEffect(() => {
    setSombre(document.documentElement.getAttribute("data-theme") === "sombre");
  }, []);

  const basculer = () => {
    const neuf = !sombre;
    setSombre(neuf);
    const r = document.documentElement;
    if (neuf) r.setAttribute("data-theme", "sombre");
    else r.removeAttribute("data-theme");
    try {
      window.localStorage.setItem(CLE, neuf ? "sombre" : "clair");
    } catch {
      /* Stockage refusé : le choix vaut pour la visite en cours. */
    }
  };

  const vaVersSombre = sombre === false || sombre === null;

  return (
    <button
      type="button"
      onClick={basculer}
      aria-pressed={sombre ?? false}
      aria-label={vaVersSombre ? L.theme.versSombre : L.theme.versClair}
      title={vaVersSombre ? L.theme.versSombre : L.theme.versClair}
      className={
        cercle
          ? `flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-full bg-encre text-blanc transition-colors duration-500 hover:bg-action hover:text-sur-image ${classe}`
          : `lien-nav flex shrink-0 items-center py-3 transition-colors duration-500 hover:text-action ${classe}`
      }
    >
      {vaVersSombre ? (
        /* La lune : on va vers le sombre. */
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={cercle ? "h-[0.85rem] w-[0.85rem]" : "h-[0.95rem] w-[0.95rem]"}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
        </svg>
      ) : (
        /* Le soleil : on revient au clair. */
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={cercle ? "h-[0.85rem] w-[0.85rem]" : "h-[0.95rem] w-[0.95rem]"}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
        </svg>
      )}
    </button>
  );
}
