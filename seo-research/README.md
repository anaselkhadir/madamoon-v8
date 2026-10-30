# Recherche SEO concurrentielle — plan d'extraction Semrush

Base de données : **fr** (marché prioritaire). Outil : MCP Semrush
(`domain_overview`, `organic_research`, `competitors_research`,
`keyword_research`, `backlinks_research`). Chaque export brut est conservé
dans `raw/semrush/` avec sa date : les unités API ne se dépensent qu'une fois.

## Domaines vérifiés (30 oct. 2026)

Les deux domaines tronqués sur la capture ont été retrouvés dans le rapport
« concurrents organiques » d'oscarlett.com et de madamoon.fr :

| Capture | Domaine exact | Mots-clés | Trafic |
|---|---|---|---|
| madamoon.fr | madamoon.fr | 110 | 669 |
| oscarlett.com | oscarlett.com | 1 954 | 16 778 |
| marieeparisienne.com* | **marieeparisienne.com** | 3 621 | 21 898 |
| plumeparis.fr | plumeparis.fr | 1 733 | 5 673 |
| white-boutik…* | **white-boutik.com** | 2 126 | 4 600 |

Les chiffres de la capture (référence initiale) et ceux du jour sont
conservés côte à côte dans `competitors-overview.xlsx`.

## Rapports à exécuter en phase 2

| Objectif | Rapport Semrush | Paramètres | Pagination |
|---|---|---|---|
| Vue d'ensemble, répartition des positions et des intentions | `domain_rank` | 5 domaines, colonnes positions 1-3 … 91-100 et intentions | 1 appel/domaine ✔ fait |
| Historique mensuel | `resource_rank_history` | 5 domaines | 1 appel/domaine |
| Tous les mots-clés organiques (position, volume, KD, CPC, intention, URL, trafic, tendance) | `resource_organic` | par domaine, `display_limit` 500, tri `traffic_desc`, filtres `position` par tranche | jusqu'à ~3 600 lignes pour marieeparisienne.com → 8 pages |
| Pages qui génèrent le trafic | `resource_organic_unique` (pages) | par domaine, tri trafic | 1-3 pages |
| Keyword Gap : missing / weak / untapped / shared | `domain_domains` | madamoon.fr vs chaque concurrent, puis les 5 ensemble, signes `*`, `-`, `/` | 2-6 pages/paire |
| Backlinks comparés | `backlinks_comparison` | 5 domaines | 1 appel |
| Volumes, KD, intention des expressions cibles | `phrase_these`, `phrase_kdi` | lots de 100 | ~50 appels pour 5 000 expressions |
| Extension sémantique (variantes, questions) | `phrase_fullsearch`, `phrase_related`, `phrase_questions` | par cluster | 1-2 pages/cluster |
| Concurrents additionnels à surveiller | `domain_organic_organic` | ✔ fait pour madamoon.fr et oscarlett.com | — |

## Concurrents additionnels repérés (non demandés, à garder sous la main)

cymbelineparis15.com (20 718), espace-mariages.fr (64 857, généraliste),
elsamode.fr (11 802), 1robepour1soir.com (12 505), promissa.fr (6 214),
mabonneamie.com (5 808), dreamdressparis.com et thebrideparis.com
(les plus proches de madamoon.fr par mots-clés communs).

## Limites connues

- L'API Semrush renvoie au plus 100 positions par mot-clé et ne liste pas
  les requêtes sous un certain volume : la couverture « totale » d'un
  domaine est celle de la base Semrush, pas celle de Google.
- La KD (`keyword_difficulty`) et l'intention ne sont pas incluses par
  défaut dans `resource_organic` : elles sont demandées en colonnes
  supplémentaires, ce qui augmente le coût par ligne.
- Toute limite rencontrée (quota, lignes manquantes) sera notée dans
  `seo-opportunities.md`, section « Limites de l'extraction ».

## Livrables attendus

`competitors-overview.xlsx`, `competitors-keywords.xlsx`, `keyword-gap.xlsx`,
`keyword-clusters.xlsx`, `keyword-to-page-mapping.xlsx`,
`competitor-top-pages.xlsx`, `seo-opportunities.md`, `seo-strategy.md`.
