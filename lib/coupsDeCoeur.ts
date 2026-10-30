"use client";

import { useSyncExternalStore } from "react";

/*
 * Les coups de cœur.
 *
 * Une mariée essaie une robe une fois, en cabine, sur rendez-vous. Entre
 * la première visite du site et ce rendez-vous, il se passe des jours :
 * elle revient, elle hésite, elle montre à sa mère. Ce qu'elle a aimé
 * doit l'attendre.
 *
 * La liste tient dans le navigateur, et nulle part ailleurs. Le site est
 * un export statique sans serveur : il n'y a pas de compte à créer, pas
 * de mot de passe, pas de donnée personnelle qui parte quelque part. Le
 * revers est honnête et doit être dit à la visiteuse : la liste vit sur
 * cet appareil et dans ce navigateur.
 *
 * On ne garde que des identifiants de robe. Le reste — nom, photographie,
 * coupe — se relit dans le catalogue : une liste qui recopierait les
 * fiches vieillirait mal le jour où une robe change de nom.
 */

const CLE = "madamoon.coups-de-coeur";
/* Le même onglet ne reçoit pas l'événement « storage » : il faut donc le
 * nôtre pour que le panier de l'en-tête suive un cœur cliqué à côté. */
const SIGNAL = "madamoon:coups-de-coeur";

/* Un tableau vide et unique : « useSyncExternalStore » compare les
 * instantanés par identité, et un nouveau tableau à chaque lecture le
 * ferait boucler sans fin. */
const VIDE: readonly string[] = [];

let cache: readonly string[] = VIDE;
let lu = false;

function lireDisque(): readonly string[] {
  try {
    const brut = window.localStorage.getItem(CLE);
    const v: unknown = brut ? JSON.parse(brut) : [];
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : VIDE;
  } catch {
    /* Navigation privée, stockage refusé, données illisibles : la liste
     * est vide, le site fonctionne, rien ne casse. */
    return VIDE;
  }
}

export function instantane(): readonly string[] {
  if (!lu) {
    cache = lireDisque();
    lu = true;
  }
  return cache;
}

/* Au rendu du serveur, personne n'a encore rien aimé. */
export function instantaneServeur(): readonly string[] {
  return VIDE;
}

function poser(liste: readonly string[]) {
  cache = liste;
  lu = true;
  try {
    window.localStorage.setItem(CLE, JSON.stringify(liste));
  } catch {
    /* Le stockage peut être plein ou refusé. La liste reste alors en
     * mémoire pour la visite en cours : c'est mieux que rien, et le
     * cœur ne doit pas rester sans réponse sous le doigt. */
  }
  window.dispatchEvent(new Event(SIGNAL));
}

/* La dernière aimée passe devant : c'est celle que l'on vient de voir. */
export function basculer(slug: string) {
  const liste = instantane();
  poser(liste.includes(slug) ? liste.filter((s) => s !== slug) : [slug, ...liste]);
}

export function retirer(slug: string) {
  poser(instantane().filter((s) => s !== slug));
}

export function vider() {
  poser(VIDE);
}

/* Adopter une sélection reçue : on ajoute sans écraser. Celle qui reçoit
 * le lien a peut-être déjà ses propres robes, et rien ne dit qu'elle veut
 * les échanger contre celles d'une autre. */
export function ajouter(slugs: readonly string[]) {
  const liste = instantane();
  const neufs = slugs.filter((s) => !liste.includes(s));
  if (neufs.length === 0) return;
  poser([...neufs, ...liste]);
}

export function abonner(prevenir: () => void) {
  const surSignal = () => prevenir();
  /* Un autre onglet a changé la liste : on la relit avant de prévenir. */
  const surStockage = (e: StorageEvent) => {
    if (e.key === CLE || e.key === null) {
      lu = false;
      prevenir();
    }
  };
  window.addEventListener(SIGNAL, surSignal);
  window.addEventListener("storage", surStockage);
  return () => {
    window.removeEventListener(SIGNAL, surSignal);
    window.removeEventListener("storage", surStockage);
  };
}

export function useCoupsDeCoeur(): readonly string[] {
  return useSyncExternalStore(abonner, instantane, instantaneServeur);
}

export function useEstAime(slug: string): boolean {
  return useCoupsDeCoeur().includes(slug);
}

/*
 * Le partage.
 *
 * Une sélection se montre : à une mère, à un témoin, à une amie qui
 * donnera son avis. Le site n'ayant pas de serveur, il n'y a pas de
 * sélection à enregistrer quelque part et pas d'identifiant à distribuer.
 * La liste voyage donc dans l'adresse elle-même.
 *
 * Ce sont les identifiants du catalogue qui sont écrits, pas des rangs :
 * un rang change dès qu'une robe entre ou sort, et le lien envoyé en
 * mars montrerait autre chose en juin. Un identifiant désigne la même
 * robe tant que la maison la présente.
 *
 * L'adresse est plus longue qu'un code court, et c'est le prix à payer
 * pour un lien qui ne meurt pas.
 */

export const PARAM = "robes";

export function encoder(slugs: readonly string[]): string {
  return slugs.join(",");
}

export function decoder(valeur: string | null): readonly string[] {
  if (!valeur) return VIDE;
  const vus = new Set<string>();
  const propres = valeur
    .split(",")
    .map((s) => s.trim())
    /* Rien d'autre que ce qu'un identifiant peut contenir : l'adresse
     * vient d'ailleurs, et l'on ne la recopie pas les yeux fermés. */
    .filter((s) => /^[a-z0-9-]{1,60}$/.test(s))
    .filter((s) => (vus.has(s) ? false : (vus.add(s), true)))
    .slice(0, 100);
  return propres.length ? propres : VIDE;
}

/* Le lien se construit depuis la page où l'on se trouve : le site est
 * servi tantôt depuis un sous-dossier, tantôt depuis la racine du
 * domaine, et l'adresse courante sait laquelle sans qu'on la lui dise. */
export function lienPartage(slugs: readonly string[]): string {
  const u = new URL(window.location.href);
  u.hash = "";
  /* La chaîne est écrite à la main plutôt que par « searchParams » :
   * celui-ci échappe les virgules en « %2C », et ce lien se colle dans
   * une conversation. Les identifiants ne contiennent que des lettres,
   * des chiffres et des traits d'union — il n'y a rien à échapper. */
  u.search = `?${PARAM}=${encoder(slugs)}`;
  return u.toString();
}
