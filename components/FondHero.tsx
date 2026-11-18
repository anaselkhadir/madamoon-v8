"use client";

import { useEffect, useRef, useState } from "react";
import { SCENES, vues, type Media, type NomScene } from "@/lib/medias";
import { FILMS } from "@/lib/films";
import { mouvementReduit } from "@/lib/mouvement";
import { media as chemin } from "@/lib/chemin";

/*
 * Le fond d'un premier écran, sur ordinateur seulement.
 *
 * Les pages de style, de matière et de détail s'ouvrent, depuis le
 * 18 novembre 2026, comme une coupe ou une robe : la robe d'ouverture en
 * plein cadre — son film s'il existe, sa photographie sinon —, sous les
 * deux voiles du hero (voir HeroPage.tsx). Au téléphone et à la tablette,
 * la page garde son ouverture sur papier : ce fond n'y est pas affiché,
 * et rien n'y est téléchargé — une première source vide répond sous
 * 1024 px, et le film n'est demandé qu'au-delà.
 */

const jeu = (media: Media, ext: string, largeurs: readonly number[], dossier: string) =>
  largeurs.map((w) => `${chemin(`/${dossier}/${media.name}-${w}.${ext}`)} ${w}w`).join(", ");

const ORDI = "(min-width: 1024px)";
const VIDE = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

export default function FondHero({
  robe,
  vue = 1,
  alt,
  film: filmPropre,
}: {
  robe: string;
  vue?: number;
  alt: string;
  /* Le film de la page, quand elle a le sien : il passe avant celui de
   * la robe d'ouverture. */
  film?: { src: string; affiche: NomScene };
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [charge, setCharge] = useState(false);
  const [prete, setPrete] = useState(false);

  const film = filmPropre ?? FILMS[robe];
  const affiche: Media | undefined = film ? SCENES[film.affiche] : vues(robe)[vue - 1];
  const dossier = film ? "scenes" : "robes";

  useEffect(() => {
    if (!film) return;
    const co = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (mouvementReduit() || co?.saveData || !window.matchMedia(ORDI).matches) return;
    const t = window.setTimeout(() => setCharge(true), 400);
    return () => window.clearTimeout(t);
  }, [film]);

  useEffect(() => {
    const el = video.current;
    if (!el || !charge) return;
    const surLecture = () => setPrete(true);
    el.addEventListener("playing", surLecture);
    el.play().catch(() => {});
    return () => el.removeEventListener("playing", surLecture);
  }, [charge]);

  if (!affiche) return null;

  return (
    <div className="fond-hero absolute inset-0 max-lg:hidden">
      <picture>
        <source media="(max-width: 1023.98px)" srcSet={VIDE} />
        <source type="image/avif" srcSet={jeu(affiche, "avif", affiche.widths, dossier)} sizes="100vw" />
        <source type="image/webp" srcSet={jeu(affiche, "webp", affiche.widths, dossier)} sizes="100vw" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={chemin(`/${dossier}/${affiche.name}-${affiche.jpgw[affiche.jpgw.length - 1]}.jpg`)}
          srcSet={jeu(affiche, "jpg", affiche.jpgw, dossier)}
          sizes="100vw"
          width={affiche.w}
          height={affiche.h}
          alt={alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ backgroundImage: `url(${affiche.blur})`, backgroundSize: "cover" }}
        />
      </picture>

      {film && charge && (
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] [transition-timing-function:var(--ease-doux)] ${
            prete ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={chemin(film.src)} type="video/mp4" />
        </video>
      )}

      {/* Les deux voiles du hero : vers la gauche pour le titre, en haut
        * pour la navigation. Un peu plus appuyé à gauche qu'ailleurs : un
        * paragraphe entier se lit ici sur l'image. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(95deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.26) 42%, rgba(0,0,0,0) 74%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.14) 45%, rgba(0,0,0,0) 100%)",
        }}
      />
    </div>
  );
}
