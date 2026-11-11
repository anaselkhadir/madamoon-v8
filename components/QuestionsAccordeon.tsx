"use client";

import { useEffect, useId, useState, type ReactNode } from "react";

/*
 * Les questions en bas des pages : styles, matières, détails, coupes,
 * fiches robes, morphologies, showroom (depuis le 11 novembre 2026).
 *
 * Sur ordinateur, un accordéon d'après le motif « CSS accordion » envoyé
 * par Anas le 11 novembre 2026 : des cartes posées les unes sous les
 * autres, la question à gauche, une pastille ronde à droite dont la
 * flèche se retourne. Une seule réponse ouverte à la fois : en ouvrir une
 * referme l'autre ; un second clic referme tout. La première est ouverte
 * à l'arrivée, pour qu'on voie tout de suite qu'une réponse se cache
 * sous chaque question. Toutes les questions sont en Inter.
 *
 * Sur téléphone et tablette, rien ne change : la liste ouverte, les
 * questions en serif, les réponses dessous. Un seul balisage pour les
 * deux, le CSS fait la différence (« .questions-acc » dans globals.css) :
 * chaque réponse n'est écrite qu'une fois dans la page, et toutes y sont,
 * fermées ou non, telles que les moteurs la lisent.
 *
 * Le bouton n'existe que là où il sert : sous 1024 px, la question
 * redevient un simple titre, sans « aria-expanded » qui mentirait.
 * Hauteur animée par une grille de zéro à une fraction ; mouvement
 * réduit : tout s'ouvre sans glisser.
 */

type Question = { q: string; r: ReactNode };

const ORDI = "(min-width: 1024px)";

export default function QuestionsAccordeon({
  questions,
  className = "mt-7 max-w-[52rem]",
  court = false,
  suite = false,
}: {
  questions: Question[];
  /* La place de la liste dans sa page (marge, largeur). */
  className?: string;
  /* Sur téléphone, des questions d'un cran plus petites : celles des
   * morphologies l'étaient déjà. */
  court?: boolean;
  /* Les rangées montent une à une au défilement (« data-suite »). */
  suite?: boolean;
}) {
  const id = useId();
  const [ouverte, setOuverte] = useState<number | null>(0);
  /* Vrai au rendu serveur : l'ordinateur reçoit d'emblée ses boutons,
   * sans saut ; le téléphone les retire à l'hydratation, et son CSS
   * montrait déjà la liste ouverte. */
  const [ordi, setOrdi] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(ORDI);
    const suivre = () => setOrdi(mq.matches);
    suivre();
    mq.addEventListener("change", suivre);
    return () => mq.removeEventListener("change", suivre);
  }, []);

  return (
    <div className={`questions-acc ${court ? "questions-acc--court" : ""} ${className}`} data-suite={suite || undefined}>
      {questions.map((item, i) => {
        const ok = ouverte === i;
        const tete = `${id}-${i}-q`;
        const corps = `${id}-${i}-r`;
        return (
          <div key={item.q} className="questions-acc-item" data-ouverte={ok || undefined}>
            <h3 className="questions-acc-titre">
              {ordi ? (
                <button
                  type="button"
                  id={tete}
                  aria-expanded={ok}
                  aria-controls={corps}
                  onClick={() => setOuverte(ok ? null : i)}
                  className="questions-acc-tete"
                >
                  <span>{item.q}</span>
                  <span aria-hidden="true" className="questions-acc-fleche">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>
              ) : (
                <span id={tete} className="questions-acc-tete">
                  {item.q}
                </span>
              )}
            </h3>
            <div
              id={corps}
              role={ordi ? "region" : undefined}
              aria-labelledby={ordi ? tete : undefined}
              className="questions-acc-corps"
              inert={ordi && !ok}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="texte questions-acc-reponse">{item.r}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
