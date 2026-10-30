# Maillage interne, navigation et priorisation — MADAMOON V8

Source des pages : `src/content/arborescence.json` (sitemap prévisionnel :
`seo-research/sitemap-previsionnel.csv`, redirections : `docs/REDIRECTIONS.csv`).
120 URL françaises dont 67 fiches robes, 93 anglaises, ≈ 213 URL au total.

## 1. Modèle : trois portes qui se croisent

```
                      ┌──────────── Accueil ────────────┐
                      │                                  │
         Coupes ──────┼── Morphologies ─────── Créateurs │
      (5 + courte)    │   (6 + grande taille)   (4 + 1)  │
            │         │          │                │      │
            └─────────┴── Fiches robes (67) ──────┘      │
                                 │                       │
            Styles · Matières · Détails · Guides ────────┘
                                 │
                       Showroom ── Rendez-vous
```

- **Descendant (hub → feuilles) :** chaque hub liste toutes ses feuilles avec
  un texte d'ancre descriptif (« robe de mariée sirène », jamais « voir »).
- **Latéral (feuille ↔ feuille) :** une page coupe lie les matières et
  détails présents dans ses robes (« nos sirènes en dentelle » → page
  dentelle) ; une page matière lie les coupes où elle se trouve ; une page
  morphologie lie 2 à 3 coupes recommandées ; une page style lie coupes et
  matières qui la composent.
- **Montant (fiche → hubs) :** chaque fiche robe porte un fil d'Ariane
  (Accueil › Robes › Coupe › Robe), un lien maison, un lien matière
  principale, un lien style quand il est évident, et un bloc « dans la même
  coupe » (3 robes) + « de la même maison » (3 robes).
- **Guides → commerce, jamais l'inverse en masse :** un guide pointe vers 2 à
  4 pages commerciales ; une page commerciale ne cite qu'un guide, en bas.
- **Tout mène au showroom :** chaque page éditoriale se termine par le même
  bandeau rendez-vous (une seule occurrence par page).

## 2. Navigation

**En-tête (desktop) :** Robes · Coupes · Morphologies · Créateurs · Showroom ·
[Rendez-vous]. Le menu « Robes » ouvre un panneau éditorial : coupes à gauche,
styles / matières / détails au centre, une robe mise en avant à droite. Pas
de méga-menu en colonnes identiques : trois zones de largeur différente.

**Mobile :** plein écran, liste typographique révélée ligne par ligne, numéro
de téléphone et rendez-vous en bas, toujours visibles.

**Pied :** quatre colonnes inégales — adresse et horaires (LocalBusiness
visible), coupes, styles et matières, maisons ; puis guides et légal en
ligne. Pas de nuage de liens : au plus 24 liens.

**Fil d'Ariane :** sur toutes les pages sauf l'accueil, balisé BreadcrumbList.

## 3. Règles anti-cannibalisation (issues de `keyword-to-page-mapping.xlsx`)

| Zone de frottement | Arbitrage |
|---|---|
| Bohème ↔ courte ↔ minimaliste (dentelle, bustier, prix en commun) | Chaque page style n'a qu'un angle : bohème = esprit et matières (dentelle, manches, fluidité) ; minimaliste = lignes et tissus unis (crêpe, satin, mikado) ; courte = longueur et occasions. Les mots-clés croisés vont à la page la plus spécifique ; le reste est un lien. |
| Accueil ↔ guide prix | L'accueil mentionne « à partir de 1 500 € » en un paragraphe et lie le guide ; seul le guide porte les requêtes prix. |
| Accueil ↔ showroom (Boutique Paris) | L'accueil porte « robe de mariée paris », « boutique robe de mariée paris » ; le showroom porte « showroom », « essayage », « rendez-vous », l'adresse et les quartiers. |
| Sirène ↔ fourreau/droite | Fourreau et droite sont des sections de la page sirène tant que le volume extrait ne justifie pas une page. |
| Morphologies ↔ grande taille | Grande taille est une page sœur dans le hub morphologies, pas une lettre. |
| Créateurs ↔ sur mesure | Le hub créateurs porte « créateur robe de mariée paris » ; la page Watters Designs porte la semi-mesure ; MADAMOON ne se présente jamais comme créateur. |

## 4. Priorisation et ordre de production

| Vague | Pages | Pourquoi d'abord |
|---|---|---|
| **P0 — phase 4** | Accueil, fiche robe type (Santana), puis Showroom, Rendez-vous, `/robes/`, sirène, princesse, **bohème** | Valident le design ; portent 70 % du volume ciblé ; bohème est la plus grosse page manquante à faible difficulté |
| **P1 — phase 5a** | Fluide, trapèze, deux-en-un, hub coupes, hub morphologies + 6 lettres, hub créateurs + 4 maisons, dentelle, minimaliste, manches longues, guides prix / délais / essayage, FAQ, à propos, contact, légal, 67 fiches | Compléter les trois portes et les pages à créer les plus fortes |
| **P2 — phase 5b** | Bustier, dos nu, satin, tissus, enceinte, vintage, ivoire ou blanc, choisir sa robe, autres créateurs, trouver ma robe | Pages justifiées mais secondaires |
| **P2/P3 — sous réserve** | Courte, mariage civil, grande taille, couleur, acheter ou louer, romantique, tendances 2026 | Attendent la réponse de la maison ou le complément Semrush |

## 5. Cibles par page (titres de travail)

Les titres définitifs, H1, descriptions et textes sont écrits en phase 6 à
partir des clusters. Format des Title : `[Sujet précis] à Paris — MADAMOON`
pour les pages commerciales ; `[Question ou sujet] — MADAMOON` pour les
guides ; `Robe de mariée [Prénom] — [coupe] [matière] — [maison] | MADAMOON`
pour les fiches. 55 à 60 caractères visés, jamais deux Title identiques
(contrôle automatique en phase 7).
