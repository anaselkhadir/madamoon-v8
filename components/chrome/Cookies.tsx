"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { langueDe } from "@/lib/langue";
import { t } from "@/lib/textes";
import {
  CATEGORIES_CONSENTEMENT,
  OUVRIR_PREFERENCES,
  RIEN,
  TOUT,
  enregistrerConsentement,
  lireConsentement,
  type Categorie,
  type Choix,
} from "@/lib/consentement";

/*
 * Le bandeau de consentement aux cookies.
 *
 * Celui de madamoon.fr, avec son texte et ses cinq catégories, dans la
 * typographie du site. Deux temps : un bandeau discret au premier
 * passage, puis, sur « Personnaliser », le détail catégorie par catégorie.
 *
 * « Tout refuser » est aussi visible et aussi grand que « Tout accepter » :
 * la CNIL demande que refuser soit aussi simple qu'accepter. Rien n'est
 * coché d'avance, et le choix se rouvre à tout moment depuis le pied de
 * page.
 *
 * Rien n'est rendu côté serveur : on ne sait pas encore si la visiteuse a
 * déjà choisi, et le bandeau ne doit pas clignoter chez celles qui l'ont
 * fait.
 */

export default function Cookies() {
  const L = t(langueDe(usePathname() ?? "/")).cookies;
  const [bandeau, setBandeau] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [choix, setChoix] = useState<Choix>(RIEN);
  const [plus, setPlus] = useState(false);
  const [deplie, setDeplie] = useState<string | null>(null);
  const panneau = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const enregistre = lireConsentement();
    if (enregistre) setChoix(enregistre);
    else setBandeau(true);
    const ouvrir = () => {
      setChoix(lireConsentement() ?? RIEN);
      setPreferences(true);
    };
    window.addEventListener(OUVRIR_PREFERENCES, ouvrir);
    return () => window.removeEventListener(OUVRIR_PREFERENCES, ouvrir);
  }, []);

  /* La fenêtre ouverte prend le focus, et se ferme à Échap. */
  useEffect(() => {
    if (!preferences) return;
    panneau.current?.focus();
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setPreferences(false);
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [preferences]);

  const decider = (c: Choix) => {
    enregistrerConsentement(c);
    setChoix(c);
    setBandeau(false);
    setPreferences(false);
  };

  const CATS: { cle: "necessaire" | Categorie; fixe?: boolean }[] = [
    { cle: "necessaire", fixe: true },
    ...CATEGORIES_CONSENTEMENT.map((cle) => ({ cle })),
  ];

  return (
    <>
      {bandeau && !preferences && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={L.titre}
          className="verre-cookies fixed inset-x-3 bottom-3 z-[89] p-5 md:inset-x-auto md:bottom-12 md:right-[3.75rem] md:w-[27rem] md:p-6"
        >
          <p className="legende">{L.titre}</p>
          <p className="texte mt-3 text-[0.9375rem] leading-relaxed">
            {L.resume}
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <button type="button" className="bouton-trait cookies-inverse" onClick={() => decider(RIEN)}>
              {L.toutRefuser}
            </button>
            <button type="button" className="bouton-trait cookies-inverse" onClick={() => decider(TOUT)}>
              {L.toutAccepter}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setPreferences(true)}
            className="lien-nav souligne mt-4"
          >
            {L.personnaliser}
          </button>
        </div>
      )}

      {preferences && (
        <div
          className="voile-cookies fixed inset-0 z-[90] flex items-end justify-center md:items-center"
          onClick={(e) => e.target === e.currentTarget && setPreferences(false)}
        >
          <div
            ref={panneau}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookies-titre"
            className="verre-cookies feuille-cookies flex max-h-[88svh] w-full flex-col md:max-w-[44rem]"
            /* Le panneau prend le focus pour le clavier, sans le cadre rouge
              * de « :focus-visible », qui n'est pas calqué et l'emporterait
              * sur un utilitaire. */
            style={{ outline: "none" }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-fil px-5 py-4 md:px-7">
              <h2 id="cookies-titre" className="legende">
                {L.titrePreferences}
              </h2>
              <button
                type="button"
                onClick={() => setPreferences(false)}
                aria-label={L.fermer}
                className="croix-cookies flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-full transition-colors duration-500"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.8rem] w-[0.8rem]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>
            </div>

            <div data-lenis-prevent className="overflow-y-auto overscroll-contain px-5 py-5 md:px-7">
              <div className="texte space-y-3 text-[0.9375rem] leading-relaxed">
                {(plus ? L.paragraphes : L.paragraphes.slice(0, 1)).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPlus(!plus)}
                className="puce-rouge mt-3"
              >
                {plus ? L.afficherMoins : L.afficherPlus}
              </button>

              <ul className="mt-6 border-t border-fil">
                {CATS.map(({ cle, fixe }) => {
                  const cat = L.categories[cle];
                  const ouvert = deplie === cle;
                  const actif = fixe ? true : choix[cle as Categorie];
                  return (
                    <li key={cle} className="border-b border-fil py-3.5">
                      <div className="flex items-center justify-between gap-4">
                        <button
                          type="button"
                          aria-expanded={ouvert}
                          onClick={() => setDeplie(ouvert ? null : cle)}
                          className="flex flex-1 items-center gap-2.5 text-left text-[0.9375rem] font-bold uppercase tracking-[0.06em]"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className={`h-3 w-3 shrink-0 transition-transform duration-500 ${ouvert ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                          {cat.nom}
                        </button>
                        {fixe ? (
                          <span className="puce-rouge">{L.toujoursActif}</span>
                        ) : (
                          <button
                            type="button"
                            role="switch"
                            aria-checked={actif}
                            aria-label={cat.nom}
                            onClick={() => setChoix({ ...choix, [cle]: !actif })}
                            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${actif ? "bg-action" : "interrupteur-eteint"}`}
                          >
                            <span
                              aria-hidden="true"
                              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] duration-300 ${actif ? "left-[1.375rem]" : "left-0.5"}`}
                            />
                          </button>
                        )}
                      </div>
                      {ouvert && <p className="texte mt-2.5 pl-[1.375rem] text-[0.875rem] leading-relaxed text-plomb">{cat.texte}</p>}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-2.5 border-t border-fil px-5 py-4 sm:grid-cols-[1fr_1.5fr_1fr] md:px-7">
              <button type="button" className="bouton-trait cookies-inverse" style={{ paddingInline: "0.75rem" }} onClick={() => decider(RIEN)}>
                {L.toutRefuser}
              </button>
              <button type="button" className="bouton-trait cookies-inverse" style={{ paddingInline: "0.75rem" }} onClick={() => decider(choix)}>
                {L.enregistrer}
              </button>
              <button type="button" className="bouton-trait cookies-inverse" style={{ paddingInline: "0.75rem" }} onClick={() => decider(TOUT)}>
                {L.toutAccepter}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
