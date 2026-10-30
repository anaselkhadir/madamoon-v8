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

## Ce que V8 est

**Le design du site actuel, conservé à l'identique** (décision du 30 octobre
2026), et par-dessus : l'implantation d'une base de ~5 000 mots-clés, une
structure de pages refondue (styles, matières, détails, guides, grande
taille, contact, légal), un maillage interne et des données structurées
complets, un copywriting SEO/GEO page par page.

| Dossier | Contenu |
|---|---|
| `app/`, `components/`, `lib/`, `public/` | le code du site actuel, recopié depuis madamoon-v7, et ses extensions SEO |
| `seo-research/` | extraction Semrush, base de mots-clés, clusters, mapping vers les pages |
| `docs/` | plan d'implantation SEO, maillage, analyse du site, design actuel, phases |
| `scripts/` | import des données v7, pipeline mots-clés, sitemap prévisionnel |

## Phases

1. Audit et environnement — **en cours**
2. Recherche concurrentielle Semrush (`seo-research/`)
3. Stratégie : arborescence, maillage, direction artistique, design system
4. Conception : homepage et fiche robe de référence
5. Développement complet
6. Copywriting SEO et GEO
7. Contrôle qualité
8. Documentation et livraison
