# Pages de coupe, bohème et créateurs : mots-clés visés

Source des volumes : **Semrush Keyword Gap, base France, 25/10/2026** (madamoon.fr face à marieeparisienne.com, oscarlett.com et plumeparis.fr). Les volumes sont des recherches mensuelles. Aucun volume n'est estimé : une expression sans mesure est notée « non mesurée ».

Toutes ces modifications sont sur `main` (aperçu GitHub Pages). **Rien n'est publié sur madamoon.fr.**

---

## Constat de départ

- Les pages de coupe avaient le bon titre d'onglet (« Robe de mariée sirène à Paris ») mais un H1 réduit au nom de la coupe (« Sirène ») et une seule ligne de texte.
- Liens contextuels entrants (hors menu), mesurés sur le site en production : sirène 28 pages, princesse 18, fluide 16, trapèze 25.
- Les 147 pages de questions et la page Guides n'étaient pas encore sur madamoon.fr au moment de l'audit : `/coupes/fluide/robe-fluide-mariage-boheme/` et `/guides/` y répondaient 404.
- `/createurs/` répondait 403 : l'adresse n'avait pas de page.

---

## Sirène — `/coupes/sirene/`

| Mot-clé | Volume | KD |
|---|---|---|
| robe de mariée sirène | 3 600 | 20 % |
| robe mariée sirène | 2 900 | 14 % |
| robe sirène | 1 900 | 12 % |
| robes sirènes | 1 600 | 17 % |
| robe sirène mariage | 1 300 | 12 % |
| robe de mariée sirène paris | 140 | 15 % (déjà en position 7) |

- **Titre d'onglet** : inchangé (« Robe de mariée sirène à Paris »).
- **Description** : inchangée.
- **H1** : « Sirène » devient « Robe de mariée » (en petit) suivi de « Sirène » (en affiche), dans le même H1.
- **Intro ajoutée** sous l'ouverture : nomme « robe de mariée sirène » et « robe sirène », et seulement des robes du catalogue (Mira et Bondi en crêpe, Uma en dentelle, Ariel en satin mat).

## Princesse — `/coupes/princesse/`

| Mot-clé | Volume | KD |
|---|---|---|
| robe princesse mariage | 2 900 | 18 % |
| robe mariee princesse | 1 600 | 20 % |
| mariage robe princesse | 1 000 | 24 % |
| princesse robe de mariée | 880 | 15 % |
| robe de mariée princesse paillette | 590 | n/d |
| robe de mariée princesse paris | 170 | n/d |

- **Titre d'onglet, description** : inchangés.
- **H1** : « Robe de mariée » + « Princesse ».
- **Intro ajoutée** : « robe de mariée princesse », « robe princesse », Addison (la robe qui illustre la coupe sur le site).
- Non traité : « paillette » (590). Aucune robe rangée en princesse n'est décrite comme pailletée. Pistes à faire valider par la maison avant d'écrire quoi que ce soit :
  - Solana, rangée en trapèze, se décrit « princesse ou trapèze » avec des sequins mats ;
  - Carrie et Angel, pailletées, sont des trapèzes.

## Fluide — `/coupes/fluide/`

| Mot-clé | Volume | KD |
|---|---|---|
| robe de mariée bohème fluide | 320 | 8 % |
| robe de mariée satin fluide | 210 | 8 % |
| robe de mariée fluide de… | 140 | 8 % (expression tronquée dans l'export : à compléter) |

- **Titre d'onglet, description** : inchangés.
- **H1** : « Robe de mariée » + « Fluide ».
- **Intro ajoutée** : « robe de mariée fluide », « bohème », « satin » ; Adularia, Hélène, Dove. Lien vers la page bohème.

## Trapèze — `/coupes/trapeze/`

Aucun volume mesuré dans le Keyword Gap. **Aucune modification**, ni texte ni H1.

---

## Bohème — `/coupes/fluide/robe-de-mariee-boheme-paris/`

Ancienne adresse : `/coupes/fluide/robe-fluide-mariage-boheme/`. Elle n'a jamais été publiée sur madamoon.fr : aucune redirection n'est nécessaire.

| Mot-clé | Volume |
|---|---|
| robe de mariée bohème vintage | 320 |
| robe de mariée bohème paris | 210 |
| robes mariée bohème | 50 |
| couronne de fleurs mariée bohème | 70 (accessoire, non visé) |

À vérifier : « robe de mariée bohème vintage » et « robe de mariée bohème fluide » ont tous deux 320 dans le fichier reçu. Doublon possible.

- **URL** : `robe-de-mariee-boheme-paris`, l'expression entière.
- **Titre d'onglet** : « Robe de mariée bohème à Paris — MADAMOON » (40 caractères).
- **Description** (158 caractères) : « Robe de mariée bohème à Paris : mousseline, dentelle florale, manches légères. Hélène, Murielle, Ryle, et Tessa pour une touche vintage, au showroom MADAMOON. »
- **H1** : « Robe de mariée bohème à Paris ». La question « Une robe fluide convient-elle à un mariage bohème ? » reste celle de la rangée sur la page fluide, et coiffe la réponse courte.
- **Paragraphe sous le H1** (réponse directe, environ 55 mots) : repris de la maquette, sans la mention « empois de satin ».
- **Mise en page** : celle de la maquette (gabarit `PageStyle`) : ouverture en texte avec deux boutons, les trois robes en photo, deux colonnes, Tessa en écho, morphologies sur fond gris, questions, bandeau sombre de rendez-vous.
- **Ajouts**, tous tirés des fiches :
  - photographies d'Hélène, Murielle et Ryle ;
  - « Une touche vintage » : Tessa, « charme vintage-chic » d'après sa fiche, rangée avec les deux-en-un ;
  - « À qui elle va » : fluide en premier pour O, V, H, 8, X ; Hélène et Murielle pour les six morphologies, Ryle pour toutes sauf O ;
  - « Où essayer une robe de mariée bohème à Paris ? » : adresse, sur rendez-vous, showroom privatisé une heure.
- **Corrigé par rapport à la maquette** : « Pour une morphologie en A, elle structure le haut ». Faux : la fluide ne structure pas et vient en second pour le A.
- **Maillage entrant** :
  - l'intro de la page fluide ;
  - la ligne « Le style » des fiches Hélène, Murielle, Ryle et Tessa (table `lib/styles.ts`) ;
  - la page Guides ;
  - les autres questions de la fluide.

---

## Créateurs — `/createurs/` (nouvelle page)

| Mot-clé | Volume |
|---|---|
| créateur robe de mariée paris | 260 |
| robe de mariée paris créateur | 210 |

- **Contrainte** : MADAMOON n'est pas un créateur. Le site le dit lui-même : « MADAMOON n'édite pas ses propres collections ». La page vise donc « robes de mariée de créateurs à Paris », pas « créateur parisien ».
- **Titre d'onglet et H1** : « Robes de mariée de créateurs à Paris ».
- **Description** (160 caractères) : « Watters Designs, Casablanca Bridal, Olya Mak, Monica Loretti : les robes de mariée de créateurs à essayer à Paris, au showroom MADAMOON du 10e, sur rendez-vous. »
- **Contenu** : une vignette par maison, avec sa ville réelle (Dallas, Newport Beach, Lviv, Rome, petits ateliers indépendants) et sa note.
- **Maillage** : le fil d'Ariane des pages de maison mène désormais à `/createurs/` au lieu de `/robes/`.
