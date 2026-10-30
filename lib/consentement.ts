/*
 * Le consentement aux cookies.
 *
 * Quatre catégories soumises au choix de la visiteuse — les
 * « nécessaires » ne le sont pas : sans elles le site ne fonctionne pas.
 * Le choix est gardé dans le navigateur, avec sa date, et redemandé au
 * bout de six mois, la durée que recommande la CNIL.
 *
 * Tout ce qui dépose un traceur non nécessaire — Meta Pixel, Microsoft
 * Clarity, demain — doit passer par « consenti() » avant de se charger,
 * et écouter « surConsentement() » pour s'activer quand la visiteuse
 * accepte en cours de visite. Aujourd'hui le site n'en charge aucun.
 */

export const CATEGORIES_CONSENTEMENT = ["fonctionnelle", "analytique", "performance", "publicite"] as const;
export type Categorie = (typeof CATEGORIES_CONSENTEMENT)[number];
export type Choix = Record<Categorie, boolean>;

type Enregistrement = { version: 1; date: number; choix: Choix };

const CLE = "madamoon.consentement";
const EVENEMENT = "madamoon:consentement";
export const OUVRIR_PREFERENCES = "madamoon:cookies:ouvrir";
const SIX_MOIS = 1000 * 60 * 60 * 24 * 182;

export const TOUT: Choix = { fonctionnelle: true, analytique: true, performance: true, publicite: true };
export const RIEN: Choix = { fonctionnelle: false, analytique: false, performance: false, publicite: false };

/** Le choix enregistré, ou « null » s'il n'y en a pas — ou plus. */
export function lireConsentement(): Choix | null {
  try {
    const brut = window.localStorage.getItem(CLE);
    if (!brut) return null;
    const e = JSON.parse(brut) as Enregistrement;
    if (e.version !== 1 || Date.now() - e.date > SIX_MOIS) return null;
    return { ...RIEN, ...e.choix };
  } catch {
    return null;
  }
}

export function enregistrerConsentement(choix: Choix): void {
  const e: Enregistrement = { version: 1, date: Date.now(), choix };
  try {
    window.localStorage.setItem(CLE, JSON.stringify(e));
  } catch {
    /* Stockage refusé : le choix vaut pour la visite en cours. */
  }
  window.dispatchEvent(new CustomEvent<Choix>(EVENEMENT, { detail: choix }));
}

/** La visiteuse a-t-elle accepté cette catégorie ? Sans choix : non. */
export function consenti(categorie: Categorie): boolean {
  return lireConsentement()?.[categorie] ?? false;
}

/** Être prévenu d'un nouveau choix. Rend la fonction de désabonnement. */
export function surConsentement(rappel: (choix: Choix) => void): () => void {
  const ecouteur = (e: Event) => rappel((e as CustomEvent<Choix>).detail);
  window.addEventListener(EVENEMENT, ecouteur);
  return () => window.removeEventListener(EVENEMENT, ecouteur);
}

/** Rouvrir les préférences, depuis le pied de page. */
export function ouvrirPreferences(): void {
  window.dispatchEvent(new Event(OUVRIR_PREFERENCES));
}
