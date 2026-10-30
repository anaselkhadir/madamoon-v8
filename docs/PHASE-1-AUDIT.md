# Phase 1 — Audit de l'environnement (30 octobre 2026)

## Environnement
- macOS, Node 24.17, npm 11.13. Ni Homebrew ni `gh` (GitHub CLI) installés.
- Git configuré (Anas Elkhadir), identifiants GitHub dans le trousseau macOS
  via `osxkeychain` : `git push` fonctionne, la **création** d'un dépôt via
  l'API n'est pas possible depuis l'agent sans exposer le jeton.
- Projets voisins intacts : `~/Desktop/madamoon-v7` (site actuel, Next 15,
  port 5600, dépôt `anaselkhadir/madamoon-v7`), `~/Desktop/madamoon-portes`.
- Ce projet : `~/Desktop/madamoon-v8`, port **5900**.

## Outils réellement disponibles
| Famille | Outil | Usage prévu |
|---|---|---|
| SEO données | **MCP Semrush** (domain_overview, organic_research, competitors_research, keyword_research, backlinks_research, position_tracking, site_audit…) | Phase 2, extraction complète |
| SEO audit | skill `seo-geo-aeo` | Audit du site actuel (phase 3) et contrôle final (phase 7) |
| Design | skills `impeccable`, `high-end-visual-design`, `design-taste-frontend`, `emil-design-eng`, `ui-ux-pro-max` | Direction artistique, design system, polish |
| Analytics / GSC | MCP Adspirer (Google Search Console, GA4, GTM) | Rapport SEO si les comptes sont connectés |
| Rendez-vous | MCP Calendly | Intégration de la réservation |
| Médias génératifs | MCP Higgsfield (image/vidéo) | **Non utilisé pour les robes** : seules les photographies réelles de la maison sont admises |
| Fichiers | skills `xlsx`, `docx`, `pdf` | Livrables Excel de la phase 2 |
| Navigateur intégré | Claude Browser | Analyse de madamoon.fr et des concurrents, QA visuelle |
| Dépôt | Git local ; remote GitHub à créer | Commits réguliers |

Non disponibles : GitHub CLI / API (jeton non accessible), Figma, Notion,
Linear (non autorisés dans cette session).

## Source des informations commerciales
`~/Desktop/madamoon-v7/lib/madamoon.ts` : coordonnées, horaires, 4 maisons
nommées (Watters Designs, Casablanca Bridal, Olya Mak, Monica Loretti) plus
« Autres créateurs », **67 robes** avec photographies (AVIF/WebP, 323 Mo),
5 familles de coupe (Sirène, Fluide, Trapèze, Princesse, Deux en un),
6 morphologies (O, A, V, H, 8, X), FAQ, prix de départ 1 500 €, essayage
privé sur rendez-vous. Ces données seront recopiées par script, pas réécrites.

## Domaines concurrents vérifiés dans Semrush (fr)
Voir `seo-research/README.md`. Les deux noms tronqués sont
`marieeparisienne.com` et `white-boutik.com`.
