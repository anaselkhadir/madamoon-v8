"use client";

import type Lenis from "lenis";

/*
 * Le registre du défilement.
 *
 * Lenis est instancié une seule fois, dans <Mouvement />. Les scènes qui
 * ont besoin de GSAP s'y abonnent ensuite — c'est ce qui permet de ne
 * charger GSAP que sur les pages qui l'utilisent réellement.
 */

let instance: Lenis | null = null;
const abonnes = new Set<() => void>();

export function enregistrerLenis(l: Lenis | null) {
  instance = l;
  if (l) abonnes.forEach((fn) => l.on("scroll", fn));
}

/* S'abonner au défilement lissé. Rend la fonction de désabonnement. */
export function surDefilement(fn: () => void) {
  abonnes.add(fn);
  instance?.on("scroll", fn);
  return () => {
    abonnes.delete(fn);
    instance?.off("scroll", fn);
  };
}

/*
 * Resynchroniser Lenis sur la position réelle de la page.
 *
 * Lenis tient sa propre position et la rejoint à chaque image. Le
 * routeur, lui, remonte la fenêtre en haut au changement de page — mais
 * sans le dire à Lenis, qui à l'image suivante ramène la page là où elle
 * était sur la page précédente. On arrivait donc en bas d'une fiche de
 * robe quand on l'avait ouverte depuis le bas du catalogue.
 *
 * On ne force pas le zéro : on prend la position que le routeur vient de
 * poser. Un retour en arrière, où il restaure la place d'avant, la garde
 * donc lui aussi.
 */
export function accorderDefilement(forcerLeHaut = false, maxImages = 24) {
  if (typeof window === "undefined" || !instance) return () => {};

  /*
   * Une image ne suffisait pas, et c'est ce qui faisait le « parfois ».
   *
   * Au changement de page, deux choses se produisent sans ordre garanti :
   * le routeur remonte la fenêtre en haut, et notre accord lit la
   * position pour la donner à Lenis. Quand l'accord passait le premier,
   * il lisait la position de la page précédente — cinq mille pixels, par
   * exemple —, la donnait à Lenis, et Lenis y ramenait la page à l'image
   * suivante. La fiche s'ouvrait alors en bas.
   *
   * On ne parie donc plus sur l'ordre : on accorde à chaque image
   * jusqu'à ce que la position cesse de bouger. La dernière lecture est
   * la bonne, quel que soit celui des deux qui a parlé en premier.
   *
   * Trois images identiques suffisent à dire que c'est posé — soit
   * cinquante millisecondes dans le cas courant. La borne haute n'est là
   * que pour un routeur lent, et pour ne jamais tourner sans fin.
   */
  let image = 0;
  let reste = maxImages;
  let stables = 0;
  let precedente = NaN;

  const pas = () => {
    /*
     * Deux régimes.
     *
     * « forcerLeHaut » : la maison veut que toute page s'ouvre en haut,
     * sans exception. On ne lit donc plus la position, on l'impose — à
     * la fenêtre et à Lenis — jusqu'à ce qu'elle tienne. Imposer une
     * seule fois ne suffirait pas : le routeur peut encore écrire
     * après nous, et c'est exactement ce qui causait le défaut.
     *
     * Sinon : on accorde Lenis sur ce que le routeur a posé, sans rien
     * décider. C'est le régime du retour en arrière, où la position
     * restaurée est la bonne.
     */
    if (forcerLeHaut) {
      window.scrollTo(0, 0);
      instance?.scrollTo(0, { immediate: true, force: true });
    } else {
      instance?.scrollTo(window.scrollY, { immediate: true, force: true });
    }
    const y = window.scrollY;
    stables = y === precedente ? stables + 1 : 0;
    precedente = y;
    if (stables < 3 && --reste > 0) image = requestAnimationFrame(pas);
  };

  /*
   * Le premier pas est immédiat, les suivants attendent une image.
   *
   * Attendre la première image aurait laissé la page affichée une
   * fraction de seconde à la hauteur de la précédente — et, dans un
   * onglet d'arrière-plan ou sous une préférence de mouvement réduit,
   * où les images se font rares ou nulles, le haut n'aurait jamais été
   * imposé du tout. On pose donc tout de suite, puis l'on tient.
   */
  pas();
  return () => cancelAnimationFrame(image);
}

/*
 * Geler la page, le temps d'une visionneuse.
 *
 * Deux verrous, parce qu'il y a deux cas. Lenis s'arrête quand il
 * existe ; il n'existe pas quand la visiteuse a demandé moins de
 * mouvement, et c'est alors le style qui retient la page.
 *
 * Le verrou va sur l'élément racine et non sur le corps : c'est lui qui
 * défile, et un « overflow » posé sur le corps seul ne retient rien. La
 * largeur de la barre de défilement est rendue en marge, sinon la page
 * saute de quinze pixels à l'ouverture et les reprend à la fermeture.
 */
let margeAvantGel = "";

export function gelerDefilement() {
  if (typeof document === "undefined") return;
  instance?.stop();
  const barre = window.innerWidth - document.documentElement.clientWidth;
  margeAvantGel = document.body.style.paddingRight;
  document.documentElement.style.overflow = "hidden";
  if (barre > 0) document.body.style.paddingRight = `${barre}px`;
}

export function degelerDefilement() {
  if (typeof document === "undefined") return;
  document.documentElement.style.overflow = "";
  document.body.style.paddingRight = margeAvantGel;
  instance?.start();
}

/* Le mouvement se coupe entièrement si l'utilisatrice le demande. */
export function mouvementReduit() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
