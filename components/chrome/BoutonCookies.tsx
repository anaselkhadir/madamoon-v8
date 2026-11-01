"use client";

import { ouvrirPreferences } from "@/lib/consentement";

/*
 * Le bouton qui rouvre le choix des cookies, depuis une page.
 *
 * Le pied de page en a un ; celui-ci est le même geste, posé dans le
 * corps de la page sur les cookies, là où la lectrice vient de lire ce
 * qu'elle accepte ou refuse. Un composant client pour une seule raison :
 * le clic. Le gabarit des pages légales reste rendu sur le serveur.
 */
export default function BoutonCookies({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" onClick={ouvrirPreferences} className="bouton">
      {children}
    </button>
  );
}
