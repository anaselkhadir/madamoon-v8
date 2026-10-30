import type { NextConfig } from "next";

/*
 * Deux cibles, un seul code.
 *
 * En développement et pour un hébergement Node, la configuration reste
 * nue : le site tourne tel quel.
 *
 * Avec PAGES=1, il est exporté en fichiers statiques pour GitHub Pages,
 * qui sert le site depuis un sous-dossier — d'où le chemin de base. Les
 * liens Next le prennent en compte tout seuls ; les images et les vidéos
 * écrites à la main passent par media() (voir lib/chemin.ts).
 *
 * Cette version est un aperçu, pas le site public : elle est interdite
 * d'indexation pour ne jamais concurrencer madamoon.fr.
 *
 * Le même export sert la mise en ligne chez Hostinger, à la racine du
 * domaine : « PAGES=1 BASE_PATH= APERCU=0 ». Le site est alors ouvert
 * aux moteurs et ses adresses n'ont plus de sous-dossier.
 */

const pages = process.env.PAGES === "1";
const base = process.env.BASE_PATH ?? "/madamoon-v7";
/* L'aperçu se ferme aux moteurs ; la mise en ligne chez Hostinger, non.
 * « APERCU=0 » distingue les deux exports statiques. */
const apercu = pages && process.env.APERCU !== "0";

const nextConfig: NextConfig = {
  ...(pages
    ? {
        output: "export" as const,
        basePath: base,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE: pages ? base : "",
    NEXT_PUBLIC_APERCU: apercu ? "1" : "",
  },
};

export default nextConfig;
