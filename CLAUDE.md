# MADAMOON V8 — règles du projet

Site de MADAMOON, boutique de robes de mariée à Paris 10e (234, rue du
Faubourg Saint-Martin). Projet **indépendant** du dépôt `madamoon-v7` et du
site en production https://madamoon.fr, qu'il ne modifie jamais.

## Décision du 30 octobre 2026 : le design du site actuel est conservé tel quel

Après trois propositions de direction artistique refusées, Anas a tranché :
**on garde exactement le design du site actuel** (code de la v7, recopié ici
à l'identique). Le travail de V8 porte sur :

1. **L'implantation intelligente de la base de ~5 000 mots-clés** issue de
   `seo-research/` (clusters, groupes de variantes, mapping mots-clés → pages).
2. **La refonte de la structure des pages** : nouvelles familles de pages
   (styles, matières, détails, guides, grande taille, contact, légal), pages
   existantes densifiées, maillage interne, données structurées.
3. Le copywriting SEO/GEO, le SEO technique, la qualité, la documentation.

Toute page nouvelle est composée **avec les composants existants**
(`components/`) et le système visuel de `docs/design-actuel/DESIGN.md` :
mêmes polices (Instrument Serif, Inter), mêmes couleurs (ivoire, craie,
encre, rouge d'action), mêmes gabarits (HeroPage, TitreSection, Tuile,
RangeesQuestions, PageStyle, ArticleQuestion, AppelRendezvous). Aucune
nouvelle direction artistique. Les trois DA refusées sont archivées dans
`docs/archive-da/` et ne doivent pas être reprises.

## Règles non négociables
1. Aucune information commerciale inventée : robes, matières, prix, créateurs,
   horaires viennent de la maison (`lib/madamoon.ts`). Une information
   manquante reste absente.
2. MADAMOON est une **boutique**, pas une maison de couture ni un fabricant.
3. Aucune page SEO sans intention de recherche distincte, justifiée par
   `seo-research/keyword-to-page-mapping.xlsx`.
4. Aucun bourrage de mots-clés ; aucune description de robe dupliquée ; les
   textes s'adressent à une future mariée.
5. Jamais de Lorem Ipsum, jamais de page vide.
6. Ne jamais prétendre qu'une extraction Semrush est complète si elle ne l'est pas.
7. Rien n'est publié sur le domaine de production sans autorisation.
8. Commits réguliers et documentés, en français.

## Stack (celle du site actuel)
Next.js 15.5 (App Router, export statique possible), React 19, TypeScript,
Tailwind CSS 4, GSAP, Lenis. Données dans `lib/`, pages dans `app/(fr)` et
`app/(en)`, gabarits dans `components/pages/`.

## Commandes
- `npm run dev` — http://localhost:5900
- `npm run build` ; `npm run build:hostinger` (export statique pour la mise en ligne)
- `npm run typecheck`
- `python3 scripts/seo/base_mots_cles.py && python3 scripts/seo/livrables_xlsx.py` — régénère la base et les classeurs

## Documents de référence
- `docs/PLAN-SEO-IMPLANTATION.md` — où chaque cluster vit et comment.
- `seo-research/seo-strategy.md`, `seo-research/seo-opportunities.md`.
- `docs/MAILLAGE-ET-PRIORITES.md`, `docs/ANALYSE-MADAMOON-FR.md`.
- `docs/design-actuel/` — DESIGN.md, PRODUCT.md, points à vérifier avec la cliente.
- `docs/seo-v7/` — le travail SEO déjà commencé dans la v7 (pages de coupe).
