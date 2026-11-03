"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "@/components/Lien";
import Photo from "@/components/media/Photo";
import type { Media } from "@/lib/medias";
import { media as chemin } from "@/lib/chemin";
import { mouvementReduit } from "@/lib/mouvement";

/*
 * La carte des maisons, à côté du texte des créateurs.
 *
 * Une carte rouge, aux couleurs de la maison, en deux moitiés. À gauche,
 * une pile de pastilles, une par maison. Un clic ouvre la pastille en
 * place : elle s'élargit, s'allonge, et dit d'où vient la maison et ce
 * qu'elle fait — les mots de sa fiche, rien d'autre. À droite, l'image
 * passe en fondu au film de la maison ; refermer la pastille ramène le
 * film d'ouverture. D'après le motif « expanding feature pills » envoyé
 * par Anas le 3 novembre 2026.
 *
 * Les films sont ceux que la maison possède : Meredith pour Casablanca
 * Bridal, Seraphina pour Olya Mak. Watters Designs et Monica Loretti
 * n'en ont pas encore : leur pastille montre la photographie
 * d'ouverture de leur page, qui se rapproche lentement.
 *
 * Un film n'est demandé qu'à l'ouverture de sa pastille (ou à son
 * survol, pour gagner un instant), jamais si le mouvement est refusé ou
 * la connexion comptée : l'affiche tient alors la place. Un seul film
 * joue à la fois.
 *
 * L'élargissement passe par « max-width » entre deux longueurs mesurées
 * — la largeur de la pastille fermée et celle de la colonne —, la
 * hauteur par une grille de zéro à une fraction : les deux s'animent
 * partout, Safari compris. Mouvement réduit : tout change sans glisser.
 */

export type Plan =
  | { type: "film"; src: string; affiche: Media }
  | { type: "photo"; media: Media; position?: string };

export type MaisonCarte = {
  slug: string;
  nom: string;
  origine: string;
  note: string;
  plan: Plan;
  alt: string;
};

type Props = {
  maisons: MaisonCarte[];
  ouverture: { src: string; affiche: Media; alt: string };
  textes: { legende: string; voir: string; liste: string };
};

function Media_({
  plan,
  alt,
  actif,
  charger,
  video,
}: {
  plan: Plan;
  alt: string;
  actif: boolean;
  charger: boolean;
  video?: (el: HTMLVideoElement | null) => void;
}) {
  return (
    <div
      aria-hidden={!actif}
      className={`absolute inset-0 transition-opacity duration-700 [transition-timing-function:var(--ease-doux)] motion-reduce:transition-none ${
        actif ? "opacity-100" : "opacity-0"
      }`}
    >
      {plan.type === "film" ? (
        <>
          <Photo media={plan.affiche} dossier="scenes" alt={alt} sizes="(max-width: 1024px) 100vw, 30vw" className="h-full w-full object-cover" />
          {charger && (
            <video
              ref={video}
              src={chemin(plan.src)}
              muted
              loop
              playsInline
              preload="auto"
              tabIndex={-1}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </>
      ) : (
        <div className={`h-full w-full ${actif ? "carte-maisons-approche" : ""}`}>
          <Photo
            media={plan.media}
            dossier="robes"
            alt={alt}
            sizes="(max-width: 1024px) 100vw, 30vw"
            position={plan.position}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default function CarteMaisons({ maisons, ouverture, textes }: Props) {
  const id = useId();
  const carte = useRef<HTMLDivElement>(null);
  const colonne = useRef<HTMLUListElement>(null);
  const tetes = useRef<(HTMLSpanElement | null)[]>([]);
  const videos = useRef<Record<string, HTMLVideoElement | null>>({});

  const [ouverte, setOuverte] = useState<string | null>(null);
  /* Les films demandés : celui d'ouverture quand la carte approche, les
   * autres à la première ouverture ou au premier survol de leur pastille. */
  const [demandes, setDemandes] = useState<Set<string>>(() => new Set());
  const [permis, setPermis] = useState(false);
  /* La largeur de chaque pastille fermée, et celle de la colonne. */
  const [fermees, setFermees] = useState<number[]>([]);
  const [large, setLarge] = useState(0);

  useEffect(() => {
    const co = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (mouvementReduit() || co?.saveData) return;
    setPermis(true);
    const el = carte.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDemandes((d) => new Set(d).add("__ouverture"));
          obs.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Mesures : au montage, au redimensionnement, et quand les polices
   * arrivent — une pastille mesurée en police de secours serait trop
   * courte d'un mot. */
  const mesurer = useCallback(() => {
    setFermees(tetes.current.map((t) => (t ? Math.ceil(t.getBoundingClientRect().width) : 0)));
    setLarge(colonne.current ? colonne.current.clientWidth : 0);
  }, []);
  useLayoutEffect(() => {
    mesurer();
    const ro = new ResizeObserver(mesurer);
    if (colonne.current) ro.observe(colonne.current);
    document.fonts?.ready.then(mesurer).catch(() => {});
    return () => ro.disconnect();
  }, [mesurer]);

  /* Un seul film joue : celui de la pastille ouverte, ou celui
   * d'ouverture quand tout est fermé. */
  const enCours = ouverte ?? "__ouverture";
  useEffect(() => {
    for (const [cle, v] of Object.entries(videos.current)) {
      if (!v) continue;
      if (cle === enCours) v.play().catch(() => {});
      else v.pause();
    }
  }, [enCours, demandes]);

  const demander = (slug: string) => {
    if (!permis) return;
    setDemandes((d) => (d.has(slug) ? d : new Set(d).add(slug)));
  };

  const basculer = (slug: string) => {
    demander(slug);
    setOuverte((o) => (o === slug ? null : slug));
  };

  return (
    <div
      ref={carte}
      className="carte-maisons grid h-full overflow-hidden rounded-[4px] bg-action text-[color:var(--color-blanc)] md:grid-cols-2"
    >
      {/* ——————————— les pastilles ——————————— */}
      <div className="order-2 flex flex-col justify-center gap-6 p-[clamp(1.25rem,2.6vw,2.25rem)] md:order-1">
        <p className="legende" style={{ color: "color-mix(in srgb, var(--color-blanc) 72%, transparent)" }}>
          {textes.legende}
        </p>
        <ul ref={colonne} aria-label={textes.liste} className="flex flex-col items-start gap-2">
          {maisons.map((m, i) => {
            const ok = ouverte === m.slug;
            const ferme = fermees[i];
            /* Avant la mesure, la pastille garde sa largeur naturelle. */
            const maxW = ferme && large ? (ok ? large : ferme) : undefined;
            return (
              <li
                key={m.slug}
                className="pastille-maison w-full"
                data-ouverte={ok || undefined}
                style={{ maxWidth: maxW }}
              >
                <button
                  type="button"
                  id={`${id}-${m.slug}-tete`}
                  aria-expanded={ok}
                  aria-controls={`${id}-${m.slug}`}
                  onClick={() => basculer(m.slug)}
                  onPointerEnter={() => demander(m.slug)}
                  onFocus={() => demander(m.slug)}
                  className="pastille-maison-tete flex w-full items-center justify-between gap-3 text-left"
                >
                  <span
                    ref={(el) => {
                      tetes.current[i] = el;
                    }}
                    className="inline-flex items-center gap-3 whitespace-nowrap py-[0.55rem] pl-4 pr-[0.55rem]"
                  >
                    <span className="text-[0.9375rem] leading-none">{m.nom}</span>
                    <span aria-hidden="true" className="pastille-maison-plus grid h-6 w-6 shrink-0 place-items-center rounded-full">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </span>
                </button>
                <div
                  id={`${id}-${m.slug}`}
                  role="region"
                  aria-labelledby={`${id}-${m.slug}-tete`}
                  className="pastille-maison-corps grid"
                  inert={!ok}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="pastille-maison-texte px-4 pb-4">
                      <p className="legende" style={{ color: "color-mix(in srgb, var(--color-blanc) 70%, transparent)" }}>
                        {m.origine}
                      </p>
                      <p className="mt-2 text-[0.9375rem] leading-[1.55]">{m.note}</p>
                      <Link
                        href={`/createurs/${m.slug}`}
                        className="lien-nav souligne mt-3 inline-block"
                        style={{ color: "var(--color-blanc)" }}
                      >
                        {textes.voir} →
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ——————————— l'image ——————————— */}
      <div className="relative order-1 aspect-[5/4] md:order-2 md:aspect-auto md:min-h-full">
        <Media_
          plan={{ type: "film", src: ouverture.src, affiche: ouverture.affiche }}
          alt={ouverture.alt}
          actif={ouverte === null}
          charger={permis && demandes.has("__ouverture")}
          video={(el) => {
            videos.current.__ouverture = el;
          }}
        />
        {maisons.map((m) => (
          <Media_
            key={m.slug}
            plan={m.plan}
            alt={m.alt}
            actif={ouverte === m.slug}
            charger={permis && demandes.has(m.slug)}
            video={(el) => {
              videos.current[m.slug] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
