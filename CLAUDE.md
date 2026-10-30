# MADAMOON V8 — règles du projet

Site premium, SEO et GEO de MADAMOON, boutique de robes de mariée à Paris 10e
(234, rue du Faubourg Saint-Martin). Projet **indépendant** : il ne modifie,
n'écrase et ne remplace jamais `~/Desktop/madamoon-v7`, le dépôt
`anaselkhadir/madamoon-v7` ni le site en production https://madamoon.fr.

## Règles non négociables
1. Aucune information commerciale inventée : robes, matières, prix, créateurs,
   horaires et coordonnées viennent de la maison (source vérifiée : données
   `lib/madamoon.ts` du projet v7, elles-mêmes issues du site madamoon.fr).
   Une information manquante reste absente.
2. MADAMOON est une **boutique**, pas une maison de couture ni un fabricant.
3. Aucune page SEO sans intention de recherche distincte, justifiée par les
   données Semrush de `seo-research/`.
4. Aucun bourrage de mots-clés ; aucune description de robe dupliquée.
5. Jamais de Lorem Ipsum, jamais de page vide.
6. Ne jamais prétendre qu'une extraction Semrush est complète si elle ne
   l'est pas : documenter les limites dans `seo-research/seo-opportunities.md`.
7. Rien n'est publié sur le domaine de production sans autorisation.
8. Commits réguliers et documentés, en français.
9. `prefers-reduced-motion` respecté partout ; performance avant effet.

## Stack
Next.js 16 (App Router, Cache Components, rendu statique par défaut),
React 19, TypeScript strict, Tailwind CSS 4, GSAP 3 (ScrollTrigger, SplitText)
et Lenis pour le défilement. Lire `docs/ARCHITECTURE.md` avant de coder.

**Attention :** Next.js 16 diffère des versions connues. Consulter
`node_modules/next/dist/docs/` (notamment `01-app/01-getting-started` et les
conventions de fichiers) avant d'écrire une route, un `metadata`, un
`sitemap.ts` ou un `proxy.ts`.

## Commandes
- `npm run dev` — http://localhost:5900
- `npm run build` / `npm run typecheck` / `npm run lint`

## Organisation
- `src/content/` — la matière (robes, créateurs, coupes, morphologies,
  éditoriaux) : données typées, jamais de texte en dur dans les composants.
- `src/lib/seo/` — métadonnées, JSON-LD, sitemap, canonical.
- `src/lib/motion/` — enregistrement GSAP, Lenis, hooks de révélation.
- `src/components/motion/` — primitives d'animation (révélation de texte,
  masques d'image, parallaxe).
- `src/components/sections/` — sections éditoriales de pages.
- `seo-research/` — extractions Semrush, clusters, mapping mots-clés/pages.
- `docs/` — architecture, stratégie, phases, livraison.
