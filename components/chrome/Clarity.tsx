"use client";

import { useEffect } from "react";
import { APERCU } from "@/lib/chemin";
import { consenti, surConsentement } from "@/lib/consentement";

/*
 * Microsoft Clarity, derrière le consentement.
 *
 * Clarity enregistre le parcours des visiteuses — cartes de chaleur,
 * rejeux de session : un traceur analytique, que la CNIL n'exempte pas.
 * Le script ne part donc que si la catégorie « analytique » a été
 * acceptée, jamais avant le choix, et il se pose en cours de visite si
 * la visiteuse accepte depuis le bandeau.
 *
 * Une fois chargé, un script ne se décharge pas : si le consentement est
 * retiré plus tard, on le dit à Clarity — « consent », faux — et rien
 * n'est plus envoyé ; au chargement suivant il ne reviendra pas.
 *
 * Le marqueur est celui du compte MADAMOON.
 *
 * Il ne part pas depuis l'aperçu. Le site de démonstration porte le même
 * marqueur que le site public : sans ce garde, nos propres essais —
 * cinquante pages ouvertes dans l'après-midi pour vérifier un bouton —
 * se mêlaient aux visites des mariées dans les mêmes cartes de chaleur
 * et les mêmes rejeux. Une statistique qui compte celui qui la regarde
 * ne mesure plus rien.
 */

const MARQUEUR = "yj46ivwiuf";

type AvecClarity = Window & {
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
};

function poser() {
  const w = window as AvecClarity;
  if (document.getElementById("clarity-madamoon")) {
    w.clarity?.("consent");
    return;
  }
  /* La file d'attente de Clarity, telle que la donne Microsoft : les
   * appels faits avant l'arrivée du script y sont gardés. */
  w.clarity =
    w.clarity ||
    function (...args: unknown[]) {
      (w.clarity!.q = w.clarity!.q || []).push(args);
    };
  const script = document.createElement("script");
  script.id = "clarity-madamoon";
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${MARQUEUR}`;
  document.head.appendChild(script);
}

export default function Clarity() {
  useEffect(() => {
    /* Rien sur l'aperçu : voir l'en-tête. Le garde est dans l'effet et
     * non avant lui — un retour placé devant un hook en saute un, et
     * React compte les hooks. */
    if (APERCU) return;
    if (consenti("analytique")) poser();
    return surConsentement((choix) => {
      if (choix.analytique) poser();
      else (window as AvecClarity).clarity?.("consent", false);
    });
  }, []);

  return null;
}
