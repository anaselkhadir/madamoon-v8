"use client";

import { useEffect, useRef, useState } from "react";
import Bandeau from "@/components/accueil/Bandeau";
import AppelElise from "@/components/AppelElise";
import Catalogue from "@/components/Catalogue";
import { SCENES, vues, type Media } from "@/lib/medias";
import { FILMS } from "@/lib/films";
import { mouvementReduit } from "@/lib/mouvement";
import { media as chemin } from "@/lib/chemin";
import type { Langue } from "@/lib/langue";

/*
 * Le premier écran d'une page de rubrique — une maison, une coupe, une
 * morphologie.
 *
 * Le même écran que l'accueil : une image plein cadre, le titre calé sur
 * la gouttière, une ligne, un bouton rouge qui ouvre Élise.
 *
 * Le film n'est là que si la robe d'ouverture en possède un. Toutes n'en
 * ont pas ; la page s'ouvre alors sur la photographie, et rien ne le
 * signale — une image fixe n'est pas un manque.
 *
 * L'affiche est chargée en priorité : c'est elle qui s'affiche d'abord,
 * et c'est elle qui reste si la connexion est comptée ou si le mouvement
 * est refusé.
 */

const jeu = (media: Media, ext: string, largeurs: readonly number[], dossier: string) =>
  largeurs.map((w) => `${chemin(`/${dossier}/${media.name}-${w}.${ext}`)} ${w}w`).join(", ");

/* Le seuil du film portrait, le même que celui du hero de l'accueil. */
const MOBILE = "(max-width: 700px)";

export default function HeroPage({
  surtitre,
  prefixe,
  titre,
  ligne,
  robe,
  vue = 1,
  alt,
  action,
  maison,
  catalogue,
  langue,
}: {
  surtitre?: string;
  /* Ce qui précède le titre dans le même H1, en petit : « Robe de
   * mariée » devant « Sirène ». Le titre garde sa taille d'affiche — le
   * nom de la coupe reste ce qu'on voit —, et le H1 dit enfin
   * l'expression entière. */
  prefixe?: string;
  titre: string;
  ligne: string;
  /* La robe qui ouvre la page : son film s'il existe, sa photo sinon. */
  robe: string;
  vue?: number;
  alt: string;
  action: string;
  /* Transmis à Élise : la maison dont il faut partir, s'il y en a une. */
  maison?: string;
  /* Le catalogue de la rubrique. Absent, le bouton blanc ne paraît pas —
   * toutes les rubriques n'en ont pas forcément un. */
  catalogue?: { intitule: string; contexte: string };
  langue: Langue;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [charge, setCharge] = useState(false);
  const [prete, setPrete] = useState(false);

  const film = FILMS[robe];
  /* L'affiche : celle du film quand il existe, sinon la photographie
   * elle-même — dans les deux cas, l'image sur laquelle on ouvre. */
  const affiche: Media | undefined = film ? SCENES[film.affiche] : vues(robe)[vue - 1];
  const dossier = film ? "scenes" : "robes";
  const afficheMobile: Media | undefined = film?.afficheMobile ? SCENES[film.afficheMobile] : undefined;

  useEffect(() => {
    if (!film) return;
    const co = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (mouvementReduit() || co?.saveData) return;
    /* Le film ne concurrence jamais l'affichage du premier écran. */
    const t = window.setTimeout(() => setCharge(true), 400);
    return () => window.clearTimeout(t);
  }, [film]);

  useEffect(() => {
    const el = video.current;
    if (!el || !charge) return;
    /* On demande la lecture tout de suite : c'est elle qui déclenche le
     * chargement. Attendre « canplay » avant de jouer ne mène nulle part,
     * puisque rien n'est chargé tant qu'on n'a pas joué. */
    const surLecture = () => setPrete(true);
    el.addEventListener("playing", surLecture);
    el.play().catch(() => {});
    return () => el.removeEventListener("playing", surLecture);
  }, [charge]);

  if (!affiche) return null;

  return (
    <section className="relative h-[calc(100svh-var(--barre))] min-h-[34rem] w-full overflow-hidden bg-craie">
      <picture>
        {afficheMobile && (
          <>
            <source
              type="image/avif"
              media={MOBILE}
              srcSet={jeu(afficheMobile, "avif", afficheMobile.widths, dossier)}
              sizes="100vw"
            />
            <source
              type="image/webp"
              media={MOBILE}
              srcSet={jeu(afficheMobile, "webp", afficheMobile.widths, dossier)}
              sizes="100vw"
            />
          </>
        )}
        <source
          type="image/avif"
          srcSet={jeu(affiche, "avif", affiche.widths, dossier)}
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet={jeu(affiche, "webp", affiche.widths, dossier)}
          sizes="100vw"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={chemin(`/${dossier}/${affiche.name}-${affiche.jpgw[affiche.jpgw.length - 1]}.jpg`)}
          srcSet={jeu(affiche, "jpg", affiche.jpgw, dossier)}
          sizes="100vw"
          width={affiche.w}
          height={affiche.h}
          alt={alt}
          fetchPriority="high"
          decoding="sync"
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
          {film.srcMobile && (
            <source src={chemin(film.srcMobile)} type="video/mp4" media={MOBILE} />
          )}
          <source src={chemin(film.src)} type="video/mp4" />
        </video>
      )}

      {/* Les deux voiles de l'accueil : l'un vers la gauche pour le titre,
        * l'autre en haut pour que la navigation reste lisible. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(95deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 72%)",
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

      <div className="gouttiere absolute inset-0 flex flex-col justify-center">
        <div className="w-full max-w-[53vw] min-w-[16rem] max-md:max-w-[92%]">
          {surtitre && <p className="legende sur-rouge">{surtitre}</p>}
          <h1 className={`affiche text-sur-image ${surtitre ? "mt-3" : ""}`}>
            {prefixe && (
              /* L'espace qui suit compte : sans elle, le texte du titre se
               * lit « Robe de mariéeSirène ». */
              <>
                {/* Dans la lettre du titre, au tiers de sa taille : une
                  * légende du site prendrait sa propre couleur, grise sur
                  * la photographie. */}
                <span className="block" style={{ fontSize: "0.34em", marginBottom: "0.4em" }}>
                  {prefixe}
                </span>{" "}
              </>
            )}
            {titre}
          </h1>
          <p className="accroche mt-6 text-sur-image">{ligne}</p>
          {/* Sous le pouce, le catalogue se réduit à son cercle et le
            * rang tient sur une ligne : deux boutons pleine largeur
            * l'un sous l'autre mangeaient la photographie. */}
          <div className="mt-6 flex flex-wrap items-center gap-3 max-md:flex-nowrap max-md:gap-2">
            <AppelElise maison={maison} className="bouton essentiel">
              {action}
            </AppelElise>
            {catalogue && (
              <Catalogue
                intitule={catalogue.intitule}
                contexte={catalogue.contexte}
                langue={langue}
                pastille
              />
            )}
          </div>
        </div>
      </div>

      <Bandeau langue={langue} />
    </section>
  );
}
