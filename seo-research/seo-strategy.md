# Stratégie SEO et GEO — MADAMOON V8

Objectif : faire changer madamoon.fr d'échelle, de 110 mots-clés et 669 visites
mensuelles vers la zone des concurrents directs (1 700 à 3 600 mots-clés,
5 000 à 22 000 visites), en restant une **boutique de robes de mariée à
Paris 10ᵉ** qui vend un rendez-vous d'essayage, pas un catalogue en ligne.

## 1. Principes

1. **Une page = un cluster = une intention.** Les variantes d'un même groupe
   (accents, pluriels, ordre des mots) vivent sur une seule page. Les
   croisements (sirène × dentelle) sont des sections liées, pas des pages.
2. **Aucune page sans robes derrière.** Une page coupe, style ou matière
   n'existe que si le catalogue réel la remplit (au moins 4 robes). Les pages
   « à créer si volume suffisant » attendent le complément Semrush ; les pages
   « à vérifier avec la maison » (courte, grande taille, location, couleur)
   attendent la réponse de MADAMOON.
3. **Le local se concentre.** Pas de pages par arrondissement (aucune requête
   dans les données) : un accueil et un showroom très forts, un balisage
   LocalBusiness complet, des mentions de quartier naturelles.
4. **Le prix se dit franchement.** Un guide « prix d'une robe de mariée à
   Paris » répond aux 17 740 recherches mensuelles du cluster avec les vrais
   chiffres (à partir de 1 500 € sur mesure, retouches comprises). Jamais de
   page « pas cher ».
5. **Les robes se nomment.** Title et H1 de chaque fiche : « Robe de mariée
   [Prénom] — [coupe] [matière] — [maison] | MADAMOON Paris ». Fin des 68
   requêtes parasites.
6. **Migration sans perte.** Redirections 301 de toutes les URL actuelles vers
   leur équivalent V8 ; la page d'accueil garde son sujet (robe de mariée Paris).

## 2. Architecture cible et priorités

| Priorité | Page V8 | Cluster(s) | Volume ciblé | Statut | Justification |
|---|---|---|---|---:|---|
| P0 | `/` | Boutique Paris, marque | 56 730 | refonte | 36 requêtes communes aux 4 concurrents ; madamoon déjà 2ᵉ sur « robe de mariée paris » |
| P0 | `/showroom/` + `/rendez-vous/` | Boutique Paris (essayage, rendez-vous) | — | refonte | conversion ; LocalBusiness ; aucun concurrent ne traite l'essayage privé |
| P0 | `/robes-de-mariee/` | Générique, chic/élégant | 131 210 | refonte | hub du catalogue, 213 mots-clés |
| P0 | `/robes-de-mariee/sirene/` | Coupe sirène, droite/colonne | 20 310 | refonte | déjà 7ᵉ sur la variante Paris |
| P0 | `/robes-de-mariee/princesse/` | Coupe princesse | 21 970 | refonte | 1 168 visites/mois chez marieeparisienne |
| P0 | `/robes-de-mariee/boheme/` | Style bohème | 44 450 | **à créer** | 1ᵉʳ style recherché, KD 9-20, aucune page MADAMOON |
| P1 | `/robes-de-mariee/fluide/`, `/trapeze/`, `/deux-en-un/` | Coupes | 13 130 | refonte | pages existantes à densifier |
| P1 | `/robes-de-mariee/dentelle/` | Matière dentelle | 15 650 | à créer | « robe de mariée dentelle » 1 900, KD 16 |
| P1 | `/robes-de-mariee/minimaliste/` | Style minimaliste, moderne | 18 230 | à créer | « robe de mariée simple » 2 900, KD 16 |
| P1 | `/robes-de-mariee/manches-longues/` | Détails manches | 10 980 | à créer | 1 300 sur la tête de cluster |
| P1 | `/guides/prix-robe-de-mariee-paris/` | Prix / budget | 17 740 | à créer | priorité moyenne la plus haute (69,6) ; réponse factuelle |
| P1 | `/morphologies/` + 6 pages | Morphologie | 3 280 (+ expansion) | refonte | angle différenciant, seul white-boutik l'exploite |
| P1 | `/createurs/` + 4 pages maisons | Sur mesure / créateur, créateurs MADAMOON | 7 590 | refonte | « watters » 480 ; Casablanca, Olya Mak, Monica Loretti à vérifier en volume |
| P2 | `/robes-de-mariee/bustier/`, `/dos-nu/`, `/satin/` | Détails et matières | 19 140 | à créer | sous réserve de 4 robes minimum par page |
| P2 | `/robes-de-mariee/courte/`, `/civile/` | Robe courte, mariage civil | 28 310 | **à vérifier avec la maison** | gros volume, KD faible, mais stock inconnu |
| P2 | `/robes-de-mariee/grande-taille/` | Grande taille | 5 290 | à vérifier | tailles réellement proposées |
| P2 | `/guides/robe-de-mariee-enceinte/`, `/tissus-robe-de-mariee/`, `/robe-de-mariee-vintage/` | Guides | 13 790 | à créer | intention informationnelle distincte |
| P3 | `/guides/acheter-ou-louer-sa-robe-de-mariee/` | Location | 4 310 | à vérifier | madamoon déjà 10ᵉ-19ᵉ sur 14 requêtes ; réponse honnête seulement |
| P3 | `/robes-de-mariee/romantique/`, guides couleur, traîne, après 40 ans | Petits clusters | < 1 500 | si volume confirmé | attendre le complément d'extraction |
| — | Fiches robes (67) | Longue traîne par robe | — | refonte | Title/H1 reformulés, Product, liens coupe + maison + similaires |

Soit **environ 35 pages éditoriales + 67 fiches robes + 6 morphologies + 5
créateurs**, contre des concurrents à 60-200 URL : la densité se joue sur la
qualité par page et la longue traîne des fiches.

## 3. Maillage interne

- Trois portes (coupe, morphologie, maison) qui se croisent : morphologie →
  coupes recommandées → fiches → maison → showroom → rendez-vous.
- Chaque page coupe lie les pages matière/détail pertinentes (sections
  « sirène en dentelle », « sirène dos nu ») et inversement.
- Chaque fiche robe : fil d'Ariane (Accueil › Robes › Coupe › Robe), lien
  maison, 3 à 4 robes similaires (même coupe ou même maison), appel à
  l'essayage.
- Les guides pointent vers les pages commerciales correspondantes, jamais
  l'inverse en masse.
- Les 44 risques listés dans l'onglet « Cannibalisation » de
  `keyword-to-page-mapping.xlsx` sont arbitrés en phase 3 (notamment bohème ↔
  courte ↔ minimaliste, qui partagent dentelle, bustier et prix).

## 4. Vers 5 000 expressions

| Étape | Expressions | Source | État |
|---|---:|---|---|
| Base vérifiée pertinente | 1 474 | exports Semrush du 30/10/2026 | fait |
| Tranches manquantes des 4 concurrents | ≈ 1 500 à 2 500 pertinentes (sur ≈ 5 700 lignes) | `resource_organic`, 7 appels | **bloqué : unités API** |
| Keyword Gap Semrush | recoupe ce qui précède | `domain_domains` × 4 + global | bloqué |
| Extension par cluster | ≈ 1 000 | `phrase_related`, `phrase_questions`, `phrase_fullsearch` sur 30 têtes de cluster | bloqué |
| Expansion architecturale | 482 | générées depuis l'architecture, **à valider en volume** (`phrase_these`, `phrase_kdi`) | listées |
| Requêtes réelles | ? | Google Search Console (à connecter) | non connecté |

La cible de 5 000 est atteignable en volume de données ; elle reste un
objectif de couverture éditoriale (une expression = une place dans une page :
H2, FAQ, légende, fiche), jamais un objectif de pages ni de répétitions.

## 5. GEO — être compris et cité par les moteurs génératifs

- **Entité claire :** MADAMOON = boutique de robes de mariée, 234 rue du
  Faubourg Saint-Martin, Paris 10ᵉ, essayage privé sur rendez-vous, maisons
  distribuées nommées. Même formulation sur le site, le JSON-LD
  (`Store`/`LocalBusiness`, `Product`, `BreadcrumbList`, `FAQPage` quand il y
  a de vraies questions), la fiche Google, Instagram.
- **Réponses directes :** chaque page commerciale ouvre sur une définition
  en une phrase (ce qu'est une coupe sirène, à qui elle va) avant l'éditorial.
- **Faits vérifiables :** prix de départ, délais, horaires, créateurs,
  nombre de robes. Rien d'invérifiable, pas de superlatif.
- **Questions réelles :** FAQ sur l'essayage (durée, accompagnants, tenue),
  le délai de confection, les retouches, le budget. Extraites des clusters
  Guide et Prix, enrichies par `phrase_questions` quand les unités reviennent.
- **Nommage des entités :** créateurs écrits avec leur nom complet et leur
  origine ; robes nommées avec coupe et maison.

## 6. Points à trancher avec MADAMOON avant la phase 3

1. Robes courtes / tenues civiles : existent-elles en boutique ?
2. Location : proposée ou non ? (14 positions actuelles en jeu)
3. Grandes tailles : jusqu'à quelle taille ?
4. Robes colorées (ivoire, champagne, blush) : lesquelles ?
5. Gamme de prix exacte à afficher dans le guide prix.
6. Les trois maisons sans volume extrait (Casablanca Bridal, Olya Mak,
   Monica Loretti) : confirmer leur place dans la navigation.

## 7. Indicateurs de suivi

Position Tracking Semrush (à créer en phase 8) sur 150 mots-clés têtes de
groupe ; Search Console à connecter ; objectifs à 6 mois après mise en ligne :
top 3 sur « robe de mariée paris » et 10 variantes locales, top 10 sur 6 pages
coupe/style, 400 mots-clés positionnés, trafic organique × 4.
