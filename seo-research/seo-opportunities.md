# Opportunités SEO — MADAMOON V8

Données : MCP Semrush, base **France**, extraction du **30 octobre 2026**. Fichiers
bruts dans `raw/semrush/`, base construite par `scripts/seo/base_mots_cles.py`,
classeurs par `scripts/seo/livrables_xlsx.py`.

## 1. Ce qui a été extrait, et ce qui manque

| Domaine | Mots-clés Semrush | Lignes extraites | Couverture | Tranches extraites | Tranches manquantes |
|---|---:|---:|---:|---|---|
| madamoon.fr | 110 | 109 | 99 % | 1-100 | — |
| oscarlett.com | 1 954 | 330 | 17 % | 1-3 | 4-10 (190), 11-20 (215), 21-100 (≈ 1 219) |
| marieeparisienne.com | 3 621 | 1 191 | 33 % | 11-20, 51-100 | 1-3 (353), 4-10 (339), 21-50 (≈ 1 738) |
| plumeparis.fr | 1 733 | 614 | 35 % | 1-20 | 21-100 (≈ 1 119) |
| white-boutik.com | 2 126 | 1 593 | 75 % | 1-50 | 51-100 (≈ 533) |
| **Concurrents** | **9 434** | **3 728** | **39,5 %** | | **≈ 5 700 lignes** |

**Cause :** le solde d'unités API du compte Semrush est tombé à zéro pendant
l'extraction (`ERROR 132 :: API UNITS BALANCE IS ZERO`), après la 21ᵉ requête.
Les rapports non exécutés sont : les tranches ci-dessus, le **Keyword Gap
Semrush** (`domain_domains`), les extensions sémantiques (`phrase_related`,
`phrase_questions`, `phrase_fullsearch`) et la validation des volumes de
l'expansion (`phrase_these`, `phrase_kdi`).

**Ce que cela change :** la base est fiable sur ce qu'elle contient (chaque ligne
vient d'un export Semrush daté), mais elle est **incomplète** : un mot-clé classé
« untapped » ou « missing » l'est au regard des tranches extraites. Le top 3 de
marieeparisienne.com (353 mots-clés, le domaine le plus fort) manque en entier.
Les pages à créer « si volume suffisant » attendent ce complément.

**Deux façons de compléter** (au choix d'Anas) :

1. Recharger des unités API Semrush, puis relancer les 7 appels listés dans
   `README.md` (paramètres identiques, `display_limit` 1000, pagination par
   `display_offset`). Coût observé : de 7 à 52 unités par ligne selon les
   colonnes ; prévoir large.
2. Exporter depuis l'interface web Semrush (inclus dans l'abonnement, sans
   unités API) : *Organic Research → Positions → Export* pour chaque
   concurrent, et *Keyword Gap → Export*. Déposer les CSV dans
   `raw/semrush-ui/` ; le script de chargement sera adapté (une heure).

## 2. Situation de madamoon.fr

- **97 mots-clés positionnés**, dont **29 seulement sont pertinents** (robe de
  mariée, Paris, coupes). Les 68 autres sont des requêtes parasites attirées
  par les prénoms des robes (`/robes/chastity/`, `/robes/charlize/`,
  `/robes/solana/`, `/robes/amaryllis/`, `/robes/oksana/`) : contenu
  pornographique, actrices, cryptomonnaie, fleurs. Elles n'apportent rien et
  brouillent la thématique du domaine. **Action V8 :** fiches robes nommées
  « robe de mariée [Prénom] — [coupe] — [maison] » dans le Title et le H1,
  balisage Product, texte factuel sur la robe ; les prénoms ne doivent plus
  être seuls dans le `<title>`.
- **Positions fortes :** « robe de mariée paris » (2 400/mois) en **2ᵉ**
  position, « paris robe de mariée » (1 600) en 6ᵉ, « robe de mariée sirène
  paris » en 7ᵉ, « madamoon » en 1ʳᵉ. C'est le socle à protéger lors de la
  migration (redirections 301 strictes, même sémantique de page d'accueil).
- **Positions faibles à transformer en quick wins (positions 10-19) :**
  « location robe de mariée paris » et ses 9 variantes (madamoon devant
  marieeparisienne et plumeparis), « magasin robe de mariée à paris » (12ᵉ),
  « robe de mariée sur mesure paris » (19ᵉ), « robe de mariée en location
  paris » (13ᵉ). **Point à vérifier avec la maison :** MADAMOON propose-t-elle
  la location ? Si non, aucune page ne doit le laisser croire ; un guide
  « acheter ou louer sa robe de mariée » peut répondre honnêtement à
  l'intention et garder ces positions.
- **Trajectoire :** 138 mots-clés en août 2025 → 57 en septembre 2026 ;
  trafic 349 (avril 2026) → 79 (juillet 2026) → 268 (septembre 2026). Le site
  actuel perd de la visibilité ; la refonte arrive au bon moment.
- **Autorité :** Authority Score 9, 204 backlinks, 131 domaines référents,
  contre 417 à 2 019 domaines référents chez les concurrents. Le SEO on-site
  ne suffira pas : un plan de netlinking (annuaires mariage, presse mariage,
  blogs de créateurs distribués, partenaires photographes et lieux) est à
  prévoir hors périmètre de ce chantier.

## 3. Les clusters qui comptent (base pertinente : 1 474 mots-clés, 565 groupes)

| Cluster | Mots-clés | Volume cumulé | Lecture |
|---|---:|---:|---|
| Robe de mariée (générique) | 213 | 131 210 | « robe de mariée » (49 500), ses orthographes et pluriels. Page catalogue + accueil. Difficile en tête, mais les variantes à KD < 20 sont nombreuses. |
| Boutique robe de mariée Paris | 212 | 56 730 | Le cœur commercial. 36 requêtes sont partagées par **les quatre concurrents** (« robe de mariee paris », « boutique robe de mariée paris », « magasin robe de mariée paris »…). madamoon est absent de la plupart. |
| Style bohème | 140 | 44 450 | Premier style recherché, KD 9-20. Aucune page MADAMOON aujourd'hui. |
| Robe courte | 70 | 27 750 | Fort volume, KD 8-18. **À vérifier :** la boutique propose-t-elle des robes courtes ou civiles ? Sinon, pas de page. |
| Coupe princesse | 63 | 21 970 | Page existante à renforcer (marieeparisienne tire 1 168 visites/mois de sa page princesse). |
| Coupe sirène | 60 | 19 550 | Page existante, madamoon déjà 7ᵉ sur « robe de mariée sirène paris ». |
| Prix / budget | 73 | 17 740 | « prix robe de mariée » (1 300, KD 9), « robe de mariée pas cher paris ». Répondre par un guide factuel (à partir de 1 500 €, retouches comprises), jamais par une promesse « pas cher ». |
| Matière dentelle | 54 | 15 650 | « robe de mariée dentelle » (1 900, KD 16). Page matière à créer. |
| Style minimaliste | 53 | 14 540 | « robe de mariée simple » (2 900, KD 16). Page style à créer. |
| Détails : manches | 47 | 10 980 | « robe de mariée manche longue » (1 300). Page détail à créer. |
| Coupe fluide | 35 | 8 540 | Page existante. |
| Style vintage / rétro | 61 | 8 320 | Années 20/30/50 : guide éditorial, pas de page produit. |
| Détails : bustier / décolleté | 47 | 8 250 | Page détail (bustier, col bateau, col carré) à créer. |
| Sur mesure / créateur | 40 | 6 790 | « créateur robe de mariée paris » : hub créateurs, madamoon 82ᵉ sur « créatrice robe de mariée » — attention au positionnement : MADAMOON distribue des créateurs, n'en est pas une. |
| Matière satin / soie, dos nu, grande taille, trapèze, morphologie, enceinte, tulle | 20-31 chacun | 3 000-5 700 | Pages matière/détail et guides ciblés. |
| Créateurs MADAMOON | 3 | 800 | « watters & watters » (390), « watters » (90). Casablanca Bridal, Olya Mak et Monica Loretti n'apparaissent pas dans les tranches extraites. |

## 4. Les opportunités, par type demandé

- **Mots-clés communs aux concurrents :** 499 mots-clés sont partagés par au
  moins deux concurrents, 135 par trois, 36 par les quatre. Les 36 sont tous
  des requêtes « robe de mariée + Paris » ou « boutique/magasin + Paris » :
  c'est le marché local, et madamoon n'y est présent que sur 6 d'entre eux.
- **Mots-clés où MADAMOON est absent :** 1 445 des 1 474 mots-clés pertinents
  (479 « missing », 966 « untapped », calcul local).
- **Forte intention commerciale :** 545 mots-clés (166 970 recherches/mois)
  à intention commerciale ou transactionnelle, dont la quasi-totalité du
  cluster Boutique Paris.
- **Locaux Paris :** 172 mots-clés (38 060/mois). **Aucune requête par
  arrondissement ou quartier** dans les données extraites : pas de pages par
  arrondissement ; une seule page showroom, enrichie (Paris 10ᵉ, gares du
  Nord et de l'Est, canal Saint-Martin) et un balisage LocalBusiness.
- **Informationnels pour futures mariées :** 961 mots-clés à composante
  informationnelle (dont beaucoup de « robe de mariée [style] » que Google
  traite comme de la découverte) : morphologie H/O (white-boutik y gagne),
  tissus, manches, tendances 2026, enceinte, années 20.
- **Faible concurrence :** 1 051 mots-clés à KD ≤ 20 avec au moins 50
  recherches/mois où madamoon est absent — bohème, courte, simple, dentelle,
  sirène, princesse, prix.
- **Longue traîne :** 578 expressions de 5 mots et plus (« robe de mariée
  bohème chic », « robe de mariée manche longue », « robe de mariée en
  dentelle », « robe champêtre pour un mariage »).
- **Sujets éditoriaux sous-exploités :** morphologies (seul white-boutik a
  des pages H, V, X), mariage civil, mariée enceinte, blanc ou ivoire, délais
  et déroulé d'un essayage, prix réel d'une robe à Paris, tissus. Les
  concurrents n'ont pas de contenu sur l'essayage privé ni sur les créateurs
  américains (Watters, Casablanca) : c'est un angle libre.

## 5. Ce que les pages concurrentes enseignent

- **marieeparisienne.com** (21 898 visites/mois) : accueil 39 %, version
  anglaise 24 %, puis **une URL par attribut** : gamme de prix
  (`/1600e-a-2100e/`, 1 622 visites), princesse (1 168), bohème, sirène,
  manches longues, décolleté bateau, dentelle, satin, col américain, manches
  bouffantes, grande taille, robe courte. Chaque page ne porte que son
  attribut, avec 7 à 165 mots-clés : c'est le modèle à battre en qualité.
- **oscarlett.com** (16 778) : accueil 32 %, catalogue 25 %, catégorie
  « Paris robe de mariée » 8,5 %, pages marques (Linea Raffaelli, Carla Ruiz,
  Rosa Clará, Pronovias) et outlet. Diversifié robes de soirée : une partie
  du trafic n'est pas comparable.
- **plumeparis.fr** (5 673) : accueil 59 %, une fiche produit à 704 visites,
  pages « style » (années 20, dentelle, grossesse, vintage, sobre, originale).
- **white-boutik.com** (4 600) : accueil 63 %, puis un **guide « meilleures
  boutiques robe de mariée Paris »** (132 mots-clés, 402 visites), trapèze,
  bustier, princesse, « tissus robes de mariée », pages morphologie H/V/X,
  pages par budget (« robes mariée 3 000 euros », « 1 000 à 1 800 euros »).

## 6. Limites méthodologiques à garder en tête

- Volumes, KD et intentions sont ceux de Semrush France ; ce ne sont pas des
  mesures Google, et les positions sont celles de la base Semrush au jour de
  l'extraction.
- Le keyword gap est **calculé localement** sur une extraction partielle ; il
  sera recalculé après complément (ou remplacé par le rapport `domain_domains`).
- La classification pertinent / marque tierce / adjacent / parasite est faite
  par règles lexicales, relue sur échantillons ; elle sera revue manuellement
  cluster par cluster en phase 3.
- Les 482 requêtes de l'onglet « Expansion (non vérifiée) » n'ont **aucun
  volume mesuré** : elles décrivent l'architecture, pas la demande.
- Google Search Console n'est pas connecté (seul Meta Ads l'est dans
  Adspirer) : les requêtes réelles de madamoon.fr n'ont pas pu être croisées.
