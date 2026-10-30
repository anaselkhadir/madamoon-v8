"use client";

import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import { usePathname } from "next/navigation";
import { langueDe, versFrancais } from "@/lib/langue";
import { t } from "@/lib/textes";
import { useEffect, useState } from "react";

/*
 * La carte flottante, comme sur la référence.
 *
 * 271 px de large, calée à 48 px du bas et 60 px de la droite. Une ligne
 * de texte, un bouton. Elle ne bouge pas, ne s'anime pas, ne demande
 * rien : elle attend. Elle s'efface au-dessus du pied de page, et sur la
 * page de rendez-vous elle n'a plus de raison d'être.
 */

export default function CarteRendezvous() {
  const L = t(langueDe(usePathname() ?? "/"));
  const chemin = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* Elle paraît une fois le premier écran passé, jamais avant. */
    const pied = document.querySelector("footer");
    const surScroll = () => {
      const passe = window.scrollY > window.innerHeight * 0.35;
      const basAtteint = pied
        ? pied.getBoundingClientRect().top < window.innerHeight - 40
        : false;
      setVisible(passe && !basAtteint);
    };
    surScroll();
    window.addEventListener("scroll", surScroll, { passive: true });
    window.addEventListener("resize", surScroll);
    return () => {
      window.removeEventListener("scroll", surScroll);
      window.removeEventListener("resize", surScroll);
    };
  }, [chemin]);

  /* La carte ne se montre pas sur la page qu'elle appelle — dans
   * l'une ou l'autre langue. */
  if (versFrancais(chemin ?? "/") === "/rendez-vous") return null;

  return (
    <aside
      aria-label={L.carte.bouton}
      className={`carte-rdv fixed bottom-4 right-4 z-40 w-[17rem] max-w-[calc(100vw-2rem)] bg-craie px-5 py-4 text-center transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease-doux)] md:bottom-12 md:right-[3.75rem] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <p className="mention mb-3 text-encre">{L.carte.legende}</p>
      <AppelRendezvous className="bouton w-full">
        {L.carte.bouton}
      </AppelRendezvous>
    </aside>
  );
}
