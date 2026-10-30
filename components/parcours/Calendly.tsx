"use client";

import { useEffect, useRef, useState } from "react";
import { CALENDLY, urlCalendly } from "@/lib/calendly";
import { t } from "@/lib/textes";
import type { Langue } from "@/lib/langue";

/*
 * Le formulaire de rendez-vous, posé dans la page.
 *
 * Le script de Calendly n'est demandé qu'à l'approche du cadre. Il pèse
 * une centaine de kilooctets et ouvre une connexion à un tiers : le
 * charger au premier octet de la page ferait payer à toutes celles qui
 * lisent seulement les horaires ce dont une seule a besoin.
 *
 * Un lien vers le même formulaire est écrit dans le cadre avant que le
 * script n'arrive. Il reste seul si le script échoue, si la visiteuse a
 * coupé les scripts, ou si un bloqueur retient Calendly — une page de
 * réservation qui ne réserve rien est le pire défaut possible ici. Le
 * numéro de la boutique l'accompagne pour la même raison.
 *
 * Aucune donnée n'est envoyée d'ici : c'est Calendly qui reçoit, comme
 * sur madamoon.fr.
 */

export default function Calendly({ robe, langue }: { robe?: string; langue: Langue }) {
  const L = t(langue).pages.calendly;
  const cadre = useRef<HTMLDivElement>(null);
  const [pret, setPret] = useState(false);
  const [echec, setEchec] = useState(false);

  useEffect(() => {
    const el = cadre.current;
    if (!el) return;

    let annule = false;
    const charger = () => {
      /* Le script peut déjà être là : on ne le redemande pas. */
      const deja = document.querySelector<HTMLScriptElement>(
        `script[src="${CALENDLY.script}"]`
      );
      const poser = () => {
        if (annule || !cadre.current) return;
        const w = (window as unknown as { Calendly?: { initInlineWidget: (o: unknown) => void } })
          .Calendly;
        if (!w) return setEchec(true);
        cadre.current.replaceChildren();
        w.initInlineWidget({ url: urlCalendly(robe, langue), parentElement: cadre.current });
        setPret(true);
      };

      if (deja) {
        if ((window as unknown as { Calendly?: unknown }).Calendly) poser();
        else deja.addEventListener("load", poser, { once: true });
        return;
      }
      const s = document.createElement("script");
      s.src = CALENDLY.script;
      s.async = true;
      s.addEventListener("load", poser, { once: true });
      s.addEventListener("error", () => !annule && setEchec(true), { once: true });
      document.head.appendChild(s);
    };

    /* Deux écrans d'avance : le temps que le cadre arrive, le formulaire
     * est prêt. */
    const obs = new IntersectionObserver(
      (entrees) => {
        if (entrees.some((e) => e.isIntersecting)) {
          obs.disconnect();
          charger();
        }
      },
      { rootMargin: "200% 0px" }
    );
    obs.observe(el);
    return () => {
      annule = true;
      obs.disconnect();
    };
  }, [robe]);

  return (
    <div className="relative">
      <div
        ref={cadre}
        /* La hauteur est posée d'avance : le widget arrive dans un cadre
         * déjà à sa taille, et la page ne saute pas quand il s'installe. */
        className="min-w-[20rem] h-[clamp(46rem,88svh,58rem)] w-full"
        data-pret={pret || undefined}
      >
        {/* Ce qui tient la place avant le script — et à jamais s'il ne
          * vient pas. */}
        <div className="flex h-full flex-col items-start justify-center gap-5 border border-fil px-[clamp(1.5rem,4vw,3rem)]">
          <p className="legende">{echec ? L.echec : L.souvre}</p>
          <p className="texte mesure-l">
            {echec ? L.bloque : L.patience}
          </p>
          <a
            href={urlCalendly(robe, langue)}
            target="_blank"
            rel="noreferrer noopener"
            className="bouton"
          >
            {L.choisirUnCreneau}
          </a>
        </div>
      </div>
    </div>
  );
}
