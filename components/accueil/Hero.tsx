"use client";

import { useEffect, useRef, useState } from "react";
import { SCENES } from "@/lib/medias";
import { mouvementReduit } from "@/lib/mouvement";
import { media as chemin } from "@/lib/chemin";
import Link from "@/components/Lien";
import Bandeau from "@/components/accueil/Bandeau";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import AppelElise from "@/components/AppelElise";
import { altScene } from "@/lib/alt";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Le hero, relevé sur la référence.
 *
 * La vidéo occupe la hauteur de la fenêtre moins le bandeau ; la barre de
 * navigation est posée dessus. Le texte est calé sur la gouttière, centré
 * en hauteur, dans une colonne de 53 % : un titre, une ligne, un bouton.
 * Rien d'autre — pas de paragraphe, pas de second bloc.
 *
 * L'affiche est chargée en priorité : c'est elle qui s'affiche d'abord, et
 * c'est elle qui reste si la connexion est comptée ou si le mouvement est
 * refusé. La vidéo vient ensuite, en fondu, muette et en boucle.
 */

const DESKTOP = SCENES["hero-affiche"];
const MOBILE = SCENES["hero-affiche-mobile"];


const jeu = (media: { name: string }, ext: string, largeurs: readonly number[]) =>
  largeurs.map((w) => `${chemin(`/scenes/${media.name}-${w}.${ext}`)} ${w}w`).join(", ");

export default function Hero({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  const video = useRef<HTMLVideoElement>(null);
  const [charge, setCharge] = useState(false);
  const [prete, setPrete] = useState(false);
  const [joue, setJoue] = useState(true);
  /* La lecture voulue par la visiteuse, lisible depuis le défilement sans
   * refaire l'écouteur à chaque bascule. */
  const joueRef = useRef(true);
  joueRef.current = joue;

  useEffect(() => {
    const co = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (mouvementReduit() || co?.saveData) return;
    /* La vidéo ne concurrence jamais l'affichage du premier écran. */
    const t = window.setTimeout(() => setCharge(true), 400);
    return () => window.clearTimeout(t);
  }, []);

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

  /* Le film s'arrête quand la section suivante l'a entièrement recouvert.
   * Il est alors invisible : le laisser tourner ne coûterait que de la
   * batterie. Il repart en remontant, sauf si elle l'a mis en pause
   * elle-même. */
  useEffect(() => {
    if (mouvementReduit()) return;
    const el = video.current;
    if (!el || !charge) return;

    let demande = 0;
    const poser = () => {
      demande = 0;
      if (!joueRef.current) return;
      const couvert = window.scrollY > window.innerHeight;
      if (couvert && !el.paused) el.pause();
      else if (!couvert && el.paused) el.play().catch(() => {});
    };
    const surScroll = () => {
      if (!demande) demande = requestAnimationFrame(poser);
    };
    /* Une première évaluation à l'ouverture. Sans elle, l'état ne se
     * corrigeait qu'au premier défilement : revenir en haut par une ancre,
     * ou rouvrir la page depuis le cache, laissait le film en pause devant
     * une visiteuse qui n'avait rien demandé. */
    poser();
    window.addEventListener("scroll", surScroll, { passive: true });
    return () => {
      cancelAnimationFrame(demande);
      window.removeEventListener("scroll", surScroll);
    };
  }, [charge]);

  const basculer = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setJoue(true);
    } else {
      el.pause();
      setJoue(false);
    }
  };

  /*
   * Le hero défile avec la page.
   *
   * Il est resté un temps collé sous le bandeau, la section suivante
   * remontant par-dessus. L'effet a été retiré : le hero ne bougeait pas
   * d'un pixel pendant huit cent soixante pixels de défilement, et le
   * bloc blanc le coupait à l'horizontale d'une ligne franche, sans
   * fondu — un store qui descend sur une image, plutôt qu'une page qui
   * avance.
   *
   * Une image qui s'en va vers le haut n'a besoin d'aucun effet. C'est
   * aussi le seul comportement que personne n'a à comprendre.
   */
  return (
    <section className="relative z-0 h-[calc(100svh-var(--barre))] min-h-[34rem] w-full overflow-hidden bg-craie">
      <picture>
        <source
          type="image/avif"
          media="(max-width: 700px)"
          srcSet={jeu(MOBILE, "avif", MOBILE.widths)}
          sizes="100vw"
        />
        <source
          type="image/webp"
          media="(max-width: 700px)"
          srcSet={jeu(MOBILE, "webp", MOBILE.widths)}
          sizes="100vw"
        />
        <source type="image/avif" srcSet={jeu(DESKTOP, "avif", DESKTOP.widths)} sizes="100vw" />
        <source type="image/webp" srcSet={jeu(DESKTOP, "webp", DESKTOP.widths)} sizes="100vw" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={chemin(`/scenes/${DESKTOP.name}-1000.jpg`)}
          srcSet={jeu(DESKTOP, "jpg", DESKTOP.jpgw)}
          sizes="100vw"
          width={DESKTOP.w}
          height={DESKTOP.h}
          alt={altScene(L.hero.alt, langue)}
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ backgroundImage: `url(${DESKTOP.blur})`, backgroundSize: "cover" }}
        />
      </picture>

      {charge && (
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
          <source
            src={chemin("/film/hero-mobile.mp4")}
            type="video/mp4"
            media="(max-width: 700px)"
          />
          <source src={chemin("/film/hero-desktop.mp4")} type="video/mp4" />
        </video>
      )}

      {/* Deux voiles très légers : l'un vers la gauche pour le titre, l'autre
       * en haut pour que la navigation blanche reste lisible quelle que soit
       * l'image de la vidéo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 max-md:hidden"
        style={{
          background:
            "linear-gradient(95deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 72%)",
        }}
      />
      {/* Sur téléphone le texte est centré : un voile venu de la gauche ne
        * couvrirait que sa moitié. Celui-ci descend, et retient le bas de
        * l'image où se posent le bouton et le lien. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.26) 0%, rgba(0,0,0,0.38) 48%, rgba(0,0,0,0.56) 100%)",
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

      {/*
        * Le bloc de texte, centré en hauteur.
        *
        * Un seul titre, une seule accroche : la page n'a droit qu'à un
        * h1, et deux copies masquées l'une l'autre en feraient deux aux
        * yeux des moteurs. Seule la rangée des deux gestes existe en
        * double — sur téléphone leur ordre s'inverse et « Trouver ma
        * robe » cesse d'être un bouton, ce qu'aucune bascule au point
        * d'arrêt ne pouvait obtenir : les classes de bouton ne sont pas
        * calquées et l'emportent sur les utilitaires.
        */}
      <div className="gouttiere absolute inset-0 flex flex-col justify-center">
        <div className="w-full max-md:text-center md:max-w-[53vw] md:min-w-[16rem]">
          <h1 className="affiche text-sur-image">{L.hero.titre}</h1>
          <p className="accroche mt-6 text-sur-image">
            {L.hero.accroche}<sup>e</sup>
          </p>

          {/* Grand écran : côte à côte, calés sur la gouttière.
            *
            * Rouge plein sur la photographie : la cliente veut l'action
            * franche plutôt que le bouton blanc de la référence. Il
            * n'emmène nulle part — il ouvre Élise, qui part de la
            * silhouette. Sans maison ici : l'accueil ne filtre rien.
            *
            * Le second geste, en blanc : celle qui sait déjà ce qu'elle
            * vient chercher n'a pas à passer par Élise. Même adresse que
            * la navigation et que le bas de page — le site n'a qu'une
            * porte pour le rendez-vous. */}
          <div className="mt-6 hidden flex-wrap items-center gap-3 md:flex">
            <AppelElise className="bouton">{L.hero.trouverMaRobe}</AppelElise>
            <AppelRendezvous className="bouton-clair">{L.hero.prendreRendezvous}</AppelRendezvous>
          </div>

          {/* Téléphone : l'un sous l'autre, au centre, et l'ordre inversé.
            * Sous le pouce le rendez-vous passe devant — c'est ce que la
            * cliente vend. Élise reste juste dessous, en toutes lettres
            * soulignées : un second bouton ferait deux actions de même
            * poids. Le souligné est en dur, pas au survol — il n'y a pas
            * de survol sous le pouce. */}
          <div className="mt-8 flex flex-col items-center gap-5 md:hidden">
            <AppelRendezvous className="bouton">{L.hero.prendreRendezvous}</AppelRendezvous>
            <AppelElise className="accroche text-sur-image underline decoration-1 underline-offset-[6px]">
              {L.hero.trouverMaRobe}
            </AppelElise>
          </div>
        </div>
      </div>

      {/* La commande de lecture, en bas à gauche, comme sur la référence. */}
      {charge && prete && (
        <button
          type="button"
          onClick={basculer}
          aria-label={joue ? L.hero.pause : L.hero.reprendre}
          className="absolute bottom-6 left-[var(--gouttiere)] flex h-8 w-8 items-center justify-center text-sur-image/80 transition-colors duration-500 hover:text-sur-image"
        >
          <span aria-hidden="true">
            {joue ? (
              <span className="flex gap-[3px]">
                <span className="block h-3 w-px bg-current" />
                <span className="block h-3 w-px bg-current" />
              </span>
            ) : (
              <span className="block h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current" />
            )}
          </span>
        </button>
      )}

      <Bandeau langue={langue} />
    </section>
  );
}
