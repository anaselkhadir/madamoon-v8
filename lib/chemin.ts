/*
 * Le chemin des médias.
 *
 * Next préfixe tout seul les liens et ses propres ressources quand le
 * site est servi depuis un sous-dossier. Les images et les vidéos que
 * nous écrivons à la main — <img srcset>, <video src> — échappent à ce
 * mécanisme : elles passent par ici.
 *
 * En développement et sur un domaine propre, la fonction ne fait rien.
 */

export const BASE = process.env.NEXT_PUBLIC_BASE ?? "";

/* Vrai uniquement sur la version de démonstration (GitHub Pages). */
export const APERCU = process.env.NEXT_PUBLIC_APERCU === "1";

export function media(chemin: string) {
  return `${BASE}${chemin}`;
}
