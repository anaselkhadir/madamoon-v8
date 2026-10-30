# MADAMOON V8

Nouvelle expérience digitale de MADAMOON, boutique de robes de mariée à
Paris 10e — projet indépendant du site actuel [madamoon.fr](https://madamoon.fr),
qui reste strictement intact.

Objectifs : une direction artistique éditoriale et immersive, une
architecture SEO construite sur des données Semrush réelles (couverture
cible d'environ 5 000 expressions), une optimisation GEO (moteurs
génératifs), et une conversion douce vers l'essayage privé sur rendez-vous.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5900
```

## Stack

| Couche | Choix | Pourquoi |
|---|---|---|
| Framework | Next.js 16, App Router | HTML rendu côté serveur et pages statiques pour plusieurs centaines d'URL SEO ; `metadata`, `sitemap`, `robots` natifs |
| UI | React 19 + TypeScript strict | Composants typés, données de contenu typées |
| Styles | Tailwind CSS 4 | Design tokens en CSS natif (`@theme`), zéro runtime |
| Animation | GSAP 3 + ScrollTrigger + SplitText, Lenis | Révélations typographiques, masques, parallaxe pilotés par le scroll ; coût de runtime maîtrisé |
| Contenu | Modules TypeScript dans `src/content/` | Lisible, versionné, validé à la compilation ; évolutif vers un CMS headless sans changer les pages |
| Médias | AVIF / WebP multi-largeurs | Core Web Vitals |

Voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) et [docs/PHASES.md](docs/PHASES.md).

## Ce qui est construit (phase 4)

- `src/app/page.tsx` — l'accueil en dix sections (`src/components/accueil/`).
- `src/app/robes/[slug]/page.tsx` — les 67 fiches robes, générées à la compilation.
- `src/app/robes/page.tsx` — le catalogue par coupe.
- `src/components/motion/` — les quatre signatures : Rideau, Ligne, Dérive, Fondu.
- `src/lib/seo/schema.tsx` — ClothingStore, Product, BreadcrumbList ; `app/sitemap.ts`, `app/robots.ts`.
- `scripts/importer-v7.py` — recopie les données et médias vérifiés du site actuel.

Les liens vers les pages prévues mais non encore construites (coupes,
morphologies, créateurs, showroom, rendez-vous, guides) répondent 404 jusqu'à
la phase 5 : ce sont leurs adresses définitives.

## Phases

1. Audit et environnement — **en cours**
2. Recherche concurrentielle Semrush (`seo-research/`)
3. Stratégie : arborescence, maillage, direction artistique, design system
4. Conception : homepage et fiche robe de référence
5. Développement complet
6. Copywriting SEO et GEO
7. Contrôle qualité
8. Documentation et livraison
