"use client";

import Link from "@/components/Lien";
import { useCallback, useRef } from "react";
import { CALENDLY, urlCalendly } from "@/lib/calendly";
import { media as chemin } from "@/lib/chemin";
import { evenement } from "@/components/chrome/Balises";

/*
 * Le bouton qui ouvre le rendez-vous.
 *
 * Le formulaire paraît par-dessus la page au lieu de la quitter : une
 * mariée qui regardait une robe n'a pas à la perdre pour réserver.
 *
 * C'est un vrai lien vers /rendez-vous, et le clic n'est intercepté que
 * si l'ouverture réussit. Sans script, sous un bloqueur, ou si Calendly
 * tarde, le lien s'ouvre comme n'importe quel lien et la page de
 * rendez-vous fait le travail. Un bouton d'appel qui ne mène nulle part
 * quand un script manque n'est pas une option ici.
 *
 * Le script pèse une centaine de kilooctets. Il n'est demandé qu'au
 * survol ou à la prise de focus — le temps d'amener la souris, il est
 * là — et au pire au clic, avec deux secondes et demie de patience avant
 * de laisser le lien faire son office.
 *
 * Un clic du milieu, un ctrl-clic ou un clic droit ne sont pas
 * interceptés : qui veut ouvrir dans un autre onglet doit pouvoir.
 */

let chargement: Promise<boolean> | null = null;

function scriptCalendly(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if ((window as unknown as { Calendly?: unknown }).Calendly) return Promise.resolve(true);
  if (chargement) return chargement;

  chargement = new Promise<boolean>((resoudre) => {
    const deja = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY.script}"]`
    );
    const fini = () =>
      resoudre(Boolean((window as unknown as { Calendly?: unknown }).Calendly));
    if (deja) {
      deja.addEventListener("load", fini, { once: true });
      deja.addEventListener("error", () => resoudre(false), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = CALENDLY.script;
    s.async = true;
    s.addEventListener("load", fini, { once: true });
    s.addEventListener("error", () => resoudre(false), { once: true });
    document.head.appendChild(s);
  });
  return chargement;
}

/* La feuille de style du widget : sans elle, la fenêtre s'ouvre nue. */
function styleCalendly() {
  if (typeof document === "undefined") return;
  const href = "https://assets.calendly.com/assets/external/widget.css";
  if (document.querySelector(`link[href="${href}"]`)) return;
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = href;
  document.head.appendChild(l);
}

export default function AppelRendezvous({
  robe,
  className = "bouton",
  children,
}: {
  /* La robe repérée, jointe en marqueur de campagne. */
  robe?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const attente = useRef(false);
  /* Le repli emporte la robe : si la fenêtre ne s'ouvre pas, la page de
   * rendez-vous doit savoir laquelle préparer. */
  const adresse = robe ? `/rendez-vous?robe=${robe}` : "/rendez-vous";

  const preparer = useCallback(() => {
    styleCalendly();
    void scriptCalendly();
  }, []);

  const ouvrir = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      /* On laisse passer tout ce qui n'est pas un clic gauche simple. */
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      if (attente.current) return;

      e.preventDefault();
      attente.current = true;
      styleCalendly();

      /* L'intention de rendez-vous, dite au conteneur.
       *
       * C'est l'événement qui compte pour la maison : tout le reste du
       * site mène ici. Il est poussé au clic, et non à la réservation —
       * celle-ci se termine chez Calendly, sur un autre domaine, et ne
       * nous revient pas. On mesure donc une intention, pas une venue,
       * et il faut le savoir en lisant les chiffres.
       *
       * La robe est jointe quand le bouton en nomme une : la maison
       * saura laquelle appelle le plus de rendez-vous. */
      evenement("rendezvous_clic", robe ? { robe } : undefined);

      const limite = new Promise<boolean>((r) => window.setTimeout(() => r(false), 2500));
      const pret = await Promise.race([scriptCalendly(), limite]);
      attente.current = false;

      const w = (window as unknown as { Calendly?: { initPopupWidget: (o: unknown) => void } })
        .Calendly;
      if (pret && w) {
        w.initPopupWidget({ url: urlCalendly(robe) });
        return;
      }
      /* Le script n'est pas venu : on suit le lien, comme si de rien.
       * Le chemin passe par l'assistant — servi depuis un sous-dossier,
       * une adresse écrite à la main tomberait à côté. */
      window.location.href = chemin(adresse);
    },
    [adresse, robe]
  );

  /* Un lien de Next, et non une ancre écrite à la main : c'est lui qui
   * préfixe l'adresse quand le site est servi depuis un sous-dossier. */
  return (
    <Link
      href={adresse}
      onClick={ouvrir}
      onPointerEnter={preparer}
      onFocus={preparer}
      className={className}
    >
      {children}
    </Link>
  );
}
