"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { accorderDefilement, enregistrerLenis, mouvementReduit } from "@/lib/mouvement";

/*
 * Le mouvement du site.
 *
 * Un seul défilement, continu, sans accroche ni « slide suivante » : Lenis
 * lisse la molette, les scènes suivent le scroll — elles ne le pilotent
 * jamais. On peut s'arrêter n'importe où.
 *
 * Les apparitions passent par un simple IntersectionObserver, doublé
 * d'un filet de sécurité : si l'observateur ne se déclenche pas (onglet
 * en arrière-plan, environnement particulier), un contrôle au défilement
 * puis un délai révèlent quand même le contenu. Une décoration ne doit
 * jamais pouvoir cacher une page.
 *
 * Quatre matières, chacune avec sa courbe et sa durée. Le rideau est le
 * plus lent parce qu'il découvre une image ; la ligne est nette parce
 * qu'elle découvre un mot ; la suite est brève et décalée parce qu'elle
 * découvre des voisins.
 */

export default function Mouvement() {
  const chemin = usePathname();

  useEffect(() => {
    if (mouvementReduit()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3.2),
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      /* Sur mobile, le défilement natif reste le meilleur. */
      syncTouch: false,
    });
    enregistrerLenis(lenis);

    let image = requestAnimationFrame(function boucle(t: number) {
      lenis.raf(t);
      image = requestAnimationFrame(boucle);
    });

    return () => {
      cancelAnimationFrame(image);
      enregistrerLenis(null);
      lenis.destroy();
    };
  }, []);

  /*
   * Le défilement, remis d'accord à chaque page.
   *
   * Sans cela, Lenis ramenait la nouvelle page à la hauteur de la
   * précédente : on ouvrait une fiche de robe depuis le bas du catalogue
   * et l'on arrivait en bas de la fiche.
   *
   * Une seule image d'attente ne suffisait pas — c'était un pari sur
   * l'ordre du routeur, perdu une fois sur quelques-unes, d'où le
   * « parfois » que la maison décrivait. L'accord se répète maintenant
   * jusqu'à ce que la position se stabilise.
   *
   * Et il ne se contente plus d'accorder : la maison veut que toute
   * page s'ouvre en haut, sans exception. On impose donc le zéro, à
   * chaque image, jusqu'à ce qu'il tienne — le routeur peut encore
   * écrire après nous.
   *
   * Deux cas y échappent, et ce ne sont pas des oublis.
   *
   * Le retour en arrière. Une mariée qui a parcouru soixante-sept robes,
   * ouvert la dix-huitième et fait « précédent » doit retrouver sa
   * place, pas le haut du catalogue. Ce n'est pas ouvrir une page,
   * c'est y revenir.
   *
   * Une adresse à ancre. Elle demande un endroit précis de la page ;
   * la renvoyer en haut reviendrait à ignorer ce qu'elle demande.
   */
  const retourArriere = useRef(false);

  useEffect(() => {
    const marquer = () => {
      retourArriere.current = true;
    };
    window.addEventListener("popstate", marquer);
    return () => window.removeEventListener("popstate", marquer);
  }, []);

  useEffect(() => {
    const revenu = retourArriere.current;
    retourArriere.current = false;
    const ancre = typeof window !== "undefined" && window.location.hash.length > 1;
    return accorderDefilement(!revenu && !ancre);
  }, [chemin]);

  /*
   * Les apparitions, remontées à chaque page.
   *
   * Le balayage se répète au lieu de n'avoir lieu qu'au montage. Un
   * balayage unique suppose que tout le contenu de la route est déjà
   * là ; il ne l'est pas toujours — une reprise à chaud, une hydratation
   * lente, et l'effet ne trouve rien puis ne revient jamais. La page
   * reste alors masquée, ce qui est le pire défaut possible pour une
   * décoration.
   *
   * On observe donc aussi les ajouts au document, et l'on rebalaye.
   */
  useEffect(() => {
    const SELECTEUR = ["lever", "voile", "rideau", "ligne", "suite"]
      .map((n) => `[data-${n}]:not([data-leve])`)
      .join(", ");

    const reduit = mouvementReduit();

    const obs = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const retard = Number(el.dataset.retard ?? 0);
          window.setTimeout(() => reveler(el), retard);
          obs.unobserve(el);
        });
      },
      /* La marge est positive : l'image se découvre pendant qu'elle
       * monte, pas une fois arrivée. On ne voit jamais de trou blanc. */
      { rootMargin: "0px 0px 18% 0px", threshold: 0 }
    );

    const balayer = () => {
      const cibles = Array.from(document.querySelectorAll<HTMLElement>(SELECTEUR));
      if (reduit) {
        cibles.forEach(reveler);
        return;
      }
      cibles.forEach((el) => obs.observe(el));
    };

    balayer();

    /* Le document bouge encore après le premier rendu : on rebalaye, sans
     * s'exciter — une image d'animation suffit à regrouper les ajouts. */
    let prevu = 0;
    const mo = new MutationObserver(() => {
      if (prevu) return;
      prevu = requestAnimationFrame(() => {
        prevu = 0;
        balayer();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    /* Filet de sécurité : ce qui est à l'écran finit toujours par
     * paraître, même si l'observateur ne s'est pas déclenché. */
    const rattraper = () => {
      document.querySelectorAll<HTMLElement>(SELECTEUR).forEach((el) => {
        const b = el.getBoundingClientRect();
        if (b.top < window.innerHeight * 1.18 && b.bottom > 0) {
          obs.unobserve(el);
          reveler(el);
        }
      });
    };

    let attente = 0;
    const surScroll = () => {
      window.clearTimeout(attente);
      attente = window.setTimeout(rattraper, 180);
    };
    window.addEventListener("scroll", surScroll, { passive: true });
    const amorce = window.setTimeout(rattraper, 500);

    return () => {
      obs.disconnect();
      mo.disconnect();
      cancelAnimationFrame(prevu);
      window.removeEventListener("scroll", surScroll);
      window.clearTimeout(attente);
      window.clearTimeout(amorce);
    };
  }, [chemin]);

  return null;
}

/* Dix éléments à cinquante millisecondes : une demi-seconde en tout.
 * Au-delà on n'attend plus une liste, on attend une page. */
const PAS = 50;
const SUITE_MAX = 10;

function reveler(el: HTMLElement) {
  if (el.dataset.leve) return;

  if ("rideau" in el.dataset) {
    /* Le cadre s'ouvre, l'image revient de sa contre-échelle. Les deux
     * durées diffèrent : l'image finit après le cadre, ce qui donne
     * l'impression qu'elle se pose plutôt qu'elle n'arrive. */
    el.style.transition = "clip-path 1.05s var(--ease-rideau)";
    el.style.clipPath = "inset(0 0 0% 0)";
    /* L'image, pas l'enveloppe : <picture> est en ligne et ne se
     * transforme pas. */
    const image = el.querySelector("img");
    if (image) {
      image.style.transition = "transform 1.5s var(--ease-rideau)";
      image.style.transform = "none";
    }
  } else if ("ligne" in el.dataset) {
    el.style.transition = "clip-path 0.85s var(--ease-rideau)";
    el.style.clipPath = "inset(-0.3em 0 0% 0)";
    /* Tous les enfants, pas seulement le premier. La feuille de style
     * les translate tous ; n'en remettre qu'un en place laissait les
     * suivants poussés hors du cadre, donc invisibles. Le défaut s'est
     * vu sur le bandeau rouge, où la phrase avait disparu. */
    Array.from(el.children).forEach((enfant) => {
      const e = enfant as HTMLElement;
      e.style.transition = "transform 0.85s var(--ease-rideau)";
      e.style.transform = "none";
    });
  } else if ("suite" in el.dataset) {
    Array.from(el.children).forEach((enfant, i) => {
      const e = enfant as HTMLElement;
      const retard = Math.min(i, SUITE_MAX) * PAS;
      e.style.transition = `opacity 0.55s var(--ease-doux) ${retard}ms, transform 0.7s var(--ease-doux) ${retard}ms`;
      e.style.opacity = "1";
      e.style.transform = "none";
    });
  } else if ("voile" in el.dataset) {
    el.style.transition = "clip-path 0.75s var(--ease-rideau)";
    el.style.clipPath = "inset(0 0 0% 0)";
  } else {
    el.style.transition =
      "opacity 0.6s var(--ease-doux), transform 0.7s var(--ease-doux)";
    el.style.opacity = "1";
    el.style.transform = "none";
  }

  el.dataset.leve = "1";
  window.setTimeout(() => {
    el.style.willChange = "auto";
    el.querySelectorAll<HTMLElement>("img").forEach((c) => (c.style.willChange = "auto"));
    Array.from(el.children).forEach((c) => ((c as HTMLElement).style.willChange = "auto"));
  }, 1700);
}
