# Phases de réalisation

| # | Phase | Livrables | État |
|---|---|---|---|
| 1 | Audit et environnement | Projet `madamoon-v8`, dépôt Git, stack, inventaire des outils, domaines concurrents vérifiés | Fait le 30/10/2026 (`docs/PHASE-1-AUDIT.md`) ; dépôt GitHub à créer par Anas |
| 2 | Recherche concurrentielle | `seo-research/*.xlsx`, `seo-opportunities.md`, `seo-strategy.md`, base ~5 000 mots-clés | Livrée le 30/10/2026 sur extraction partielle (39,5 % des lignes concurrentes, unités API Semrush épuisées) ; complément à relancer (`seo-research/README.md`) |
| 3 | Stratégie | Arborescence, sitemap prévisionnel, maillage, priorisation, direction artistique, design system | Fait le 30/10/2026 : `docs/ANALYSE-MADAMOON-FR.md`, `src/content/arborescence.json`, `seo-research/sitemap-previsionnel.csv`, `docs/REDIRECTIONS.csv`, `docs/MAILLAGE-ET-PRIORITES.md`, `docs/DIRECTION-ARTISTIQUE.md`, `docs/DESIGN-SYSTEM.md`, `src/styles/tokens.css`, planche `docs/da/planche.html` |
| 4 | Conception | Homepage et fiche robe fonctionnelles pour validation | **Refusée par Anas le 30/10/2026 (trop proche du site existant).** DA v2 « Le Numéro » refusée à son tour (polices classiques trop grandes) ; **DA v3 Zara × Cartier** : vidéo du hero conservée, Cormorant Garamond + Hanken Grotesk en petits corps, grille bord à bord, prototype `docs/da/accueil-v3.html` (localhost:5901/accueil-v3). Documents : `docs/ANALYSE-CRITIQUE-DA-V1.md`, `docs/DIRECTION-ARTISTIQUE.md`, `docs/DESIGN-SYSTEM.md`, prototype animé `docs/da/accueil-v2.html` (localhost:5901/accueil-v2). En attente de validation avant réécriture des pages. Première version (code dans src/) : accueil (10 sections), fiche robe (67 générées, Santana comme référence), catalogue `/robes/`, 404, sitemap, robots, JSON-LD ; `npm run build` : 73 pages statiques. À valider par Anas avant la phase 5 |
| 5 | Développement complet | Toutes les pages | À faire |
| 6 | Copywriting SEO/GEO | Textes, métadonnées, données structurées | À faire |
| 7 | Contrôle qualité | Responsive, accessibilité, performance, SEO technique | À faire |
| 8 | Documentation et livraison | Guide technique, déploiement, rapports | À faire |
