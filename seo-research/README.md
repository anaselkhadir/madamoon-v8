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
| Vue d'ensemble, répartition des positions et des intentions | `domain_rank` | 5 domaines, colonnes positions et intentions | ✔ fait |
| Historique mensuel | `resource_rank_history` | 5 domaines, 36 mois | ✔ fait |
| Tous les mots-clés organiques (position, volume, KD, CPC, intention, URL, trafic, tendance) | `resource_organic` | par domaine, `display_limit` 1000 (maximum), tri `position_asc`, filtres `position` par tranche | ◐ partiel (39,5 %), voir ci-dessous |
| Pages qui génèrent le trafic | `resource_organic_unique` (pages) | par domaine, tri trafic, 100 pages | ✔ fait |
| Keyword Gap : missing / weak / untapped / shared | `domain_domains` | madamoon.fr vs chaque concurrent, puis les 5 ensemble | ✗ bloqué (unités) — gap calculé localement |
| Backlinks comparés | `backlinks_comparison` | 5 domaines | ✔ fait |
| Volumes, KD, intention des expressions cibles | `phrase_these`, `phrase_kdi` | lots de 100 | ~50 appels pour 5 000 expressions |
| Extension sémantique (variantes, questions) | `phrase_fullsearch`, `phrase_related`, `phrase_questions` | par cluster | 1-2 pages/cluster |
| Concurrents additionnels à surveiller | `domain_organic_organic` | ✔ fait pour madamoon.fr et oscarlett.com | — |

## Concurrents additionnels repérés (non demandés, à garder sous la main)

cymbelineparis15.com (20 718), espace-mariages.fr (64 857, généraliste),
elsamode.fr (11 802), 1robepour1soir.com (12 505), promissa.fr (6 214),
mabonneamie.com (5 808), dreamdressparis.com et thebrideparis.com
(les plus proches de madamoon.fr par mots-clés communs).

## État au 30 octobre 2026 — extraction partielle

Le solde d'unités API Semrush est tombé à zéro après la 21ᵉ requête
(`ERROR 132 :: API UNITS BALANCE IS ZERO`). Extrait : madamoon.fr (109/110),
oscarlett.com positions 1-3, marieeparisienne.com 11-20 et 51-100,
plumeparis.fr 1-20, white-boutik.com 1-50, soit 3 728 des 9 434 lignes
concurrentes (39,5 %). Détail et conséquences : `seo-opportunities.md` § 1.

### Appels à relancer (paramètres identiques, `display_limit` 1000)

`execute_report` / `resource_organic`, `database: fr`, `display_sort: position_asc`,
`export_columns: keyword, position, previous_position, volume, cpc, url, traffic,
traffic_share, keyword_difficulty, intent, competitive_density, trend` :

| # | target | display_filter (position) | Lignes attendues | Pages |
|---|---|---|---:|---|
| 1 | oscarlett.com | > 3 et < 21 | ≈ 405 | 1 |
| 2 | oscarlett.com | > 20 et < 51 | ≈ 600 | 1 |
| 3 | oscarlett.com | > 50 | ≈ 620 | 1 |
| 4 | marieeparisienne.com | < 11 | 692 | 1 |
| 5 | marieeparisienne.com | > 20 et < 51 | ≈ 1 738 | 2 (`display_offset` 1000) |
| 6 | plumeparis.fr | > 20 | ≈ 1 119 | 2 |
| 7 | white-boutik.com | > 50 | ≈ 533 | 1 |

Puis : `domain_domains` (madamoon.fr vs chaque concurrent, signes `*`, `-`, `/`),
`phrase_related` / `phrase_questions` sur les 30 têtes de cluster, `phrase_these`
et `phrase_kdi` par lots de 100 sur `build/expansion.json`.

Les résultats volumineux sont enregistrés automatiquement par l'outil dans un
fichier ; les copier dans `raw/semrush/organic_<domaine>_pos<a>-<b>_<date>.csv`
(colonne `data` du JSON) puis relancer `python3 scripts/seo/base_mots_cles.py`
et `python3 scripts/seo/livrables_xlsx.py`.

Alternative sans unités API : exports CSV depuis l'interface web Semrush
(Organic Research → Positions ; Keyword Gap) déposés dans `raw/semrush-ui/`.

## Limites connues

- L'API Semrush renvoie au plus 100 positions par mot-clé et ne liste pas
  les requêtes sous un certain volume : la couverture « totale » d'un
  domaine est celle de la base Semrush, pas celle de Google.
- La KD (`keyword_difficulty`) et l'intention ne sont pas incluses par
  défaut dans `resource_organic` : elles sont demandées en colonnes
  supplémentaires, ce qui augmente le coût par ligne.
- Toute limite rencontrée (quota, lignes manquantes) sera notée dans
  `seo-opportunities.md`, section « Limites de l'extraction ».

## Livrables (produits le 30 octobre 2026)

| Fichier | Contenu |
|---|---|
| `competitors-overview.xlsx` | capture vs aujourd'hui, positions et intentions, historique 36 mois, backlinks, concurrents organiques, couverture de l'extraction |
| `competitors-keywords.xlsx` | 3 837 lignes brutes (5 domaines), un onglet par domaine, tranches, couverture |
| `keyword-gap.xlsx` | 1 474 mots-clés pertinents avec positions des 5 domaines ; onglets missing / untapped / weak / shared / strong ; non ciblés |
| `keyword-clusters.xlsx` | base pertinente, 35 clusters, 565 groupes de variantes, non ciblés, 482 requêtes d'expansion non vérifiées |
| `keyword-to-page-mapping.xlsx` | 35 pages cibles, mot-clé → page, expansion → page, 44 risques de cannibalisation |
| `competitor-top-pages.xlsx` | pages à trafic des 5 domaines, type de page déduit, synthèse |
| `seo-opportunities.md` | lecture des données, opportunités, limites |
| `seo-strategy.md` | principes, architecture priorisée, maillage, plan vers 5 000, GEO, questions à la maison |

Scripts : `scripts/seo/base_mots_cles.py` (base, clusters, gap, expansion) et
`scripts/seo/livrables_xlsx.py` (classeurs). Intermédiaires dans `build/`.
Les classeurs ne contiennent pas de formules (LibreOffice absent du poste pour
la vérification) : les agrégats sont calculés par le script et datés.
