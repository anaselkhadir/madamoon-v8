# Architecture technique — MADAMOON V8

## Choix de la stack

Trois options ont été pesées pour un site premium à forte volumétrie SEO
(coupes, morphologies, créateurs, éditoriaux, fiches robes) et à animations
avancées :

| Option | Pour | Contre | Verdict |
|---|---|---|---|
| **Next.js 16 (App Router)** | Rendu statique de chaque URL, `metadata` / `sitemap` / `robots` natifs, images optimisées, React Server Components pour un HTML complet livré aux moteurs, continuité avec v7 (GSAP + Lenis déjà maîtrisés) | Courbe d'apprentissage des Cache Components | **Retenu** |
| Astro + îlots React | Excellent pour du contenu statique très léger | Animations riches et navigation fluide entre robes moins naturelles ; nouvelle chaîne d'outils | Écarté |
| Shopify / WordPress thème | Rapide à lancer | Exactement ce que le cahier des charges refuse (template, catalogue) ; SEO technique moins fin | Écarté |

Le site **ne vend pas en ligne** : aucun panier, aucun paiement. L'unique
conversion est la prise de rendez-vous. Cela libère l'architecture de tout
e-commerce lourd.

## Rendu

- Toutes les pages de contenu sont **statiques à la compilation**
  (`generateStaticParams`), servies en HTML complet : indexation immédiate,
  LCP minimal.
- Cache Components (`cacheComponents: true`) : les rares zones dynamiques
  (disponibilités de rendez-vous) sont isolées dans des limites `Suspense`.
- Les animations sont **des composants clients fins** posés sur un HTML
  déjà rendu : sans JavaScript, le contenu est entièrement lisible.

## Arborescence prévue

```
src/
  app/                    routes (App Router)
    (site)/               layout principal : en-tête, pied, Lenis
      robes/[slug]/       fiches robes
      coupes/[coupe]/     sirène, princesse, fluide, trapèze, deux-en-un, bohème
      morphologies/[lettre]/   O, A, V, H, 8, X
      createurs/[maison]/ Watters Designs, Casablanca Bridal, Olya Mak, Monica Loretti…
      guides/[slug]/      pages éditoriales issues des clusters Semrush
      showroom/  rendez-vous/  a-propos/  contact/  faq/
    sitemap.ts  robots.ts  not-found.tsx  opengraph-image.tsx
  components/
    layout/   en-tête, navigation, pied de page
    motion/   RevealText, MaskImage, Parallax, SceneTransition
    sections/ Hero, Manifeste, Portes du catalogue, Maisons, Showroom, Rendez-vous
    seo/      JsonLd, Breadcrumbs
    ui/       Bouton, Lien, Légende
  content/    la matière, typée (robes, créateurs, coupes, morphologies, éditoriaux)
  lib/
    seo/      metadata(), schema.org (Store, Product, BreadcrumbList, FAQPage)
    motion/   gsap.ts (enregistrement des plugins), lenis.ts, reduced-motion
    data/     accès et sélecteurs sur src/content
  styles/     tokens, typographie, utilitaires
seo-research/ extractions Semrush et livrables de la phase 2
docs/         architecture, stratégie, phases, livraison
scripts/      génération de médias (AVIF/WebP), manifestes, vérifications SEO
```

## SEO technique (prévu)

Sitemap dynamique, robots, canonical par page, Open Graph, JSON-LD
(Store/LocalBusiness, Product, BreadcrumbList, FAQPage où pertinent),
images dimensionnées avec `alt` descriptifs, pagination propre, 404 soignée,
redirections déclarées dans `next.config.ts`.

## Performance

Budget : LCP < 2,0 s, CLS < 0,05, INP < 150 ms sur mobile 4G. Polices
auto-hébergées avec `font-display: swap` et métriques de repli, vidéos
chargées à l'approche et jamais si `prefers-reduced-motion` ou
`Save-Data`, GSAP chargé par page uniquement quand la section est présente.

## Données

Source de vérité des informations commerciales : la maison, via les données
vérifiées du projet v7 (`lib/madamoon.ts`). Elles seront **recopiées** dans
`src/content/` par script, jamais réécrites à la main, et jamais complétées
par des caractéristiques inventées.
