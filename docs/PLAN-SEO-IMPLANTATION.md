# Plan d'implantation des mots-clés — MADAMOON V8

*Design conservé à l'identique (site actuel). Ce plan dit où chaque groupe
de mots-clés vit, dans quel gabarit existant, et comment il y est écrit.*

Sources : `seo-research/keyword-clusters.xlsx` (base pertinente, 1 474
expressions vérifiées, 565 groupes de variantes), `keyword-to-page-mapping.xlsx`
(mapping et cannibalisation), `seo-research/build/expansion.json` (482
requêtes d'architecture, non vérifiées). Le complément Semrush (≈ 5 700 lignes,
unités épuisées) viendra enrichir les mêmes pages sans en créer d'autres.

## 1. Principe : une expression = une place, pas une répétition

Chaque page cible un **groupe de variantes** (toutes les façons d'écrire la
même recherche). Dans la page, les expressions se répartissent ainsi :

| Emplacement | Ce qu'on y met | Exemple (page bohème) |
|---|---|---|
| `<title>` | la tête de groupe + Paris + la maison | « Robe de mariée bohème à Paris — MADAMOON » |
| H1 | la tête de groupe, en deux niveaux comme sur les pages de coupe (« Robe de mariée » en petit, « Bohème » en affiche) | Robe de mariée *bohème* |
| Description | la tête, une variante naturelle, le showroom | « … bohème chic, dentelle et tombés fluides… à essayer sur rendez-vous à Paris 10e » |
| Intro (2-3 phrases) | 2 à 3 variantes proches, et seulement des robes du catalogue | « robe de mariée bohème chic », « robe bohème mariage » |
| H2 des sections | une variante longue traîne par H2 | « Robe bohème en dentelle », « Robe de mariée bohème manches longues » |
| Rangées de questions (FAQ) | les expressions interrogatives et informationnelles du cluster, une par rangée ; chaque rangée a sa page sous l'adresse de la page mère | « Quelle robe de mariée bohème pour une morphologie en A ? » |
| Légendes et `alt` | nom de la robe + coupe + matière + showroom | « Robe de mariée bohème Tessa, dentelle, showroom MADAMOON Paris 10e » |
| Ancres des liens internes | la tête de groupe de la page visée, jamais « voir plus » | « les robes de mariée en dentelle » → /matieres/dentelle/ |
| Données structurées | CollectionPage / ItemList / FAQPage / BreadcrumbList | — |

Les 5 000 expressions se **couvrent** par ces emplacements et par les pages
de question (chacune porte 5 à 15 expressions interrogatives), jamais par des
listes de mots.

## 2. Les familles de pages et leur gabarit existant

| Famille | Adresse | Gabarit (composants existants) | Combien |
|---|---|---|---:|
| Accueil | `/` | `app/(fr)/page.tsx` + sections `components/accueil/` : H1 et intro réécrits, bloc édito enrichi, liens vers les nouvelles familles | 1 |
| Catalogue | `/robes/` | `PageRobes` : intro éditoriale par coupe, ancres | 1 |
| Fiches robes | `/robes/[slug]/` | `PageRobe` : H1 « Robe de mariée *Prénom* », ligne, regard, liens coupe + maison + style + matière, robes voisines | 67 |
| Coupes | `/coupes/[coupe]/` | `PageCoupe` (déjà densifiée dans la v7 pour sirène, princesse, fluide, trapèze) + questions `QUESTIONS_COUPES` | 5 (+ courte si la maison confirme) |
| **Styles** | `/styles/[slug]/` | **`PageStyle`** (le gabarit de la page bohème de la v7, sorti de dessous la coupe fluide) : titre, réponse directe, robes nommées, « ce qui fait le style », robe en écho, silhouettes, questions, rendez-vous | bohème, minimaliste, romantique, mariage civil |
| **Matières** | `/matieres/[slug]/` | `PageStyle` | dentelle, satin / crêpe / mikado (+ tulle en guide) |
| **Détails** | `/details/[slug]/` | `PageStyle` | manches longues, bustier et décolletés, dos nu |
| Morphologies | `/morphologies/[lettre]/` | `PageMorphologie` + `QUESTIONS_MORPHO` : enrichies des expressions « quelle robe pour… » | 6 + grande taille (`PageFamille`, famille `morphologies`, route fixe `app/(fr)/morphologies/grande-taille/`) |
| Créateurs | `/createurs/` (hub, dans la v7) + `/createurs/[maison]/` | `PageCreateurs`, `PageMaison` : requêtes de marque des maisons distribuées, semi-mesure | 1 + 5 |
| **Guides** | `/guides/[slug]/` | **`ArticleQuestion`** (le gabarit des articles de la FAQ : chapô, sections, « à retenir », liens) ; `/guides/` reste le sommaire | prix, délais, essayage, choisir, tissus, enceinte, vintage, ivoire ou blanc, tendances 2026 (+ location et couleur si la maison confirme) |
| Questions | `/coupes/[coupe]/[question]/`, `/morphologies/[lettre]/[question]/`, `/faq/[question]/` | `PageQuestionCoupe`, `PageQuestionMorpho`, `PageQuestion` : ~147 existent dans la v7 ; on en ajoute à partir des expressions informationnelles de chaque cluster | 147 → ~220 |
| Showroom, rendez-vous, à propos, FAQ, trouver ma robe | existantes | enrichies (local, essayage, délais) | 5 |
| Contact, mentions légales, confidentialité, cookies | `/contact/` (+ `/en/contact/`), `/mentions-legales/`, `/confidentialite/`, `/cookies/` | `PageContact` ; `PageLegale` nourri par `lib/legal.ts` — faits le 01/11/2026 | 4 |

**Décisions de structure soumises à Anas :**
1. Les styles, matières et détails ont **leur propre famille d'adresses**
   (`/styles/`, `/matieres/`, `/details/`) plutôt que de vivre sous une
   coupe comme la page bohème de la v7 : un style traverse toutes les coupes,
   et l'adresse doit le dire. La page bohème de la v7
   (`/coupes/fluide/robe-de-mariee-boheme-paris`, jamais mise en ligne) devient
   `/styles/boheme/`.
2. Les guides éditoriaux prennent l'adresse `/guides/[slug]/` avec le
   gabarit des articles de la FAQ ; `/faq/[question]/` reste pour les
   questions pratiques de la maison.
3. Les versions anglaises sont maintenues pour les pages existantes ; les
   nouvelles pages naissent en français, l'anglais suit quand le cluster
   anglais le justifie (« wedding dress Paris » : 36 expressions, 4 100/mois).

## 3. Allocation des mots-clés par page (base vérifiée)

| Page cible | Type | Mots-clés | Groupes | Volume | Têtes de groupe |
|---|---|---:|---:|---:|---|
| `/robes/` | Page catalogue | 239 | 107 | 136 910 | robe mariée (6600) · robes de mariée (3600) · robe mariée cocktail (720) · robe de marié (2900) |
| `/` | Accueil + /showroom/ | 255 | 118 | 62 190 | paris robe de mariée (1600) · robe de mariee paris (1600) · robe de mariée de paris (720) · robe de mariée sur paris (1000) |
| `/styles/boheme/` | Page style | 140 | 42 | 44 450 | robe de mariée bohème paris (210) · robe mariee boheme (1600) · robe de mariee boheme (1000) · robe de mariée bohème chic (1000) |
| `/coupes/courte/` | Page éditoriale | 70 | 21 | 27 750 | robe de mariée courte paris (110) · robes courtes mariage (1300) · robe mariée courte chic (390) · mariage robe courte (1600) |
| `/coupes/princesse/` | Page coupe | 63 | 25 | 21 970 | robe de mariée princesse paris (170) · robe pour mariage princesse (3600) · robe de princesse mariage (880) · robe de mariée princesse volumineuse (320) |
| `/coupes/sirene/` | Page coupe | 64 | 20 | 20 310 | robe de mariée sirène paris (140) · robe de mariage sirene (1600) · robe mariee sirene (1600) · robe sirène mariage (1300) |
| `/styles/minimaliste/` | Page style | 77 | 31 | 18 230 | robe de mariee simple (1300) · robe mariee simple (1000) · robe de mariée originale (880) · robes mariées simples (480) |
| `/guides/prix-robe-de-mariee-paris/` | Guide | 73 | 28 | 17 740 | robe de mariée sur paris pas cher (260) · robe de mariée paris pas cher (260) · paris robe de mariée pas cher (260) · robes de mariées pas cher paris (260) |
| `/matieres/dentelle/` | Page matière | 54 | 13 | 15 650 | robe en dentelle pour mariage (590) · robe mariée dentelle (1000) · robe mariee dentelle (1000) · robe de mariée dentelle (1900) |
| `/details/manches-longues/` | Page détail | 47 | 7 | 10 980 | robe de mariée manche longue (1300) · robe de mariée longue manche (880) · robe mariée manche longue (480) · robe de mariée avec des manches (260) |
| `/coupes/fluide/` | Page coupe | 37 | 11 | 8 890 | robe de mariée fluide boheme (140) · robe de mariée fluide (720) · robe fluide mariee (480) · robe mariee mousseline (320) |
| `/guides/robe-de-mariee-vintage/` | Guide | 61 | 24 | 8 320 | robes de mariées vintage (260) · vintage wedding shop (210) · robe de mariée vintage des années 90 (390) · robe de mariee vintage (260) |
| `/details/bustier/` | Page détail | 47 | 22 | 8 250 | robe de mariée décolleté bateau paris (140) · robe de mariée col bateau paris (140) · robe bustier mariage (880) · robe de mariée col bateau (480) |
| `/createurs/` | Hub créateurs + pages maisons | 40 | 8 | 6 790 | robe de mariée sur mesure paris (140) · créatrice robe de mariée paris (260) · robe de mariée paris créateur (210) · creatrice robe mariee paris (170) |
| `/matieres/satin/` | Page matière | 20 | 8 | 5 680 | robe de mariee satin (880) · robe de mariée en satin (880) · robe de mariée satin (880) · robe mariée satin (480) |
| `/morphologies/grande-taille/` | Page éditoriale | 23 | 9 | 5 290 | robe de mariée grande taille (1900) · robe de mariée grande taille paris (90) · robe mariee grande taille (590) · robe de mariée grande taille pas cher (320) |
| `/details/dos-nu/` | Page détail | 31 | 9 | 5 210 | robe de mariee dos nu (320) · robe de mariée dos nu (720) · dos-nu robe de mariée (210) · robe de mariage dos nu (320) |
| `/guides/acheter-ou-louer-sa-robe-de-mariee/` | Guide | 17 | 4 | 4 310 | location de robe de mariée paris (320) · robe de mariee location paris (210) · location robe de mariee paris (320) · robe de mariée location paris (320) |
| `/coupes/trapeze/` | Page coupe | 17 | 8 | 4 240 | robe de mariée trapèze (720) · robe trapeze mariage (590) · robe trapèze mariage (590) · robe de mariee trapeze (480) |
| `/morphologies/` | Hub morphologies + 6 pages | 22 | 7 | 3 280 | morphologie h robe (390) · robe morphologie h (390) · robe pour morphologie h (320) · robe de mariée morphologie (140) |
| `/guides/robe-de-mariee-enceinte/` | Guide | 17 | 4 | 2 920 | robe de mariée enceinte (260) · robe de mariage grossesse (90) · robe mariée pour femme enceinte (260) · robe de mariée femme enceinte (320) |
| `/guides/tissus-robe-de-mariee/` | Guide | 14 | 4 | 2 550 | organza mariage (170) · robe de mariée en tulle (210) · robe tulle mariee (210) · robe de mariee en tulle (210) |
| `/guides/` | Hub guides | 19 | 12 | 2 010 | robe mariée 2026 (170) · robe mariee 2026 (140) · robe de mariée modele (210) · robe de mariée modèle (170) |
| `/guides/robe-de-mariee-couleur/` | Guide | 8 | 8 | 1 360 | robe mariee ivoire (210) · robe mariage civil couleur (170) · robe de mariée champagne (210) · robe mariee blanche et noir (170) |
| `/guides/traine-robe-de-mariee/` | Guide | 7 | 5 | 1 040 | cape mariee (320) · robe cape mariage (210) · robes de mariée drapée (70) · traine de mariée (170) |
| `/createurs/[maison]/` | Pages créateurs | 3 | 2 | 800 | watters and watters (320) · watters & watters (390) · watters (90) |
| `/styles/romantique/` — faite | Page style | 3 | 2 | 730 | robe de mariée romantique (480) · robe de mariée feerique (140) · robe de mariée féerique (110) |
| `/styles/mariage-civil/` — faite | Page style | 3 | 3 | 560 | robe mariage civil paris (170) · combinaison mariee (320) · robe mariage civil 2026 (70) |
| `/coupes/deux-en-un/` | Page coupe | 3 | 3 | 250 | surjupe mariage (110) · surjupe mariée (70) · surjupe robe de mariée (70) |

Les pages absentes de ce tableau (contact, légal, questions) ne ciblent pas
de groupe commercial ; les questions reçoivent les expressions
informationnelles de leur cluster mère, listées dans
`keyword-clusters.xlsx`, onglet « Base pertinente », filtre intention.

## 4. Ordre de production

| Vague | Pages | Pourquoi |
|---|---|---|
| **A — faite le 31/10/2026** | `/styles/boheme/` (migration de la page v7 + enrichissement), `/styles/minimaliste/`, `/matieres/dentelle/`, `/details/manches-longues/`, `/guides/prix-robe-de-mariee-paris/` | les cinq plus gros clusters sans page, tous à faible difficulté |
| **B — faite le 31/10/2026** | accueil (H1 sémantique, édito « Choisir sa robe de mariée à Paris », liens), `/robes/` (introduction et liens), les 5 pages de coupe (3 questions ajoutées : sirène dos nu, princesse volumineuse, mousseline ; 5 questions existantes retitrées sur l'expression : sirène en dentelle, fourreau ou sirène, princesse dentelle ou satin, évasée/trapèze/A-line, surjupe), fiches robes (H1 « Robe de mariée Prénom », liens vers les pages de style) | protéger et renforcer les positions existantes |
| **C — faite le 31/10/2026** | `/matieres/satin/` (9 robes, écho Kensington), `/details/bustier/` (9 robes, écho Dolores), `/details/dos-nu/` (9 robes, écho Enid), `/morphologies/grande-taille/` (route fixe sous les morphologies, gabarit PageFamille : « faite à vos mesures, pas à une taille », tailles à confirmer en showroom), 7 guides (`quand-acheter-sa-robe-de-mariee`, `essayage-robe-de-mariee`, `choisir-sa-robe-de-mariee`, `tissus-robe-de-mariee`, `robe-de-mariee-enceinte`, `robe-de-mariee-vintage`, `ivoire-ou-blanc`), hub `/createurs/` (section « Créateur de robe de mariée à Paris : ce que fait MADAMOON ») et 5 pages maisons (section « La maison… », `lib/maisons-edito.ts`) | compléter la couverture |
| **D — faite le 01/11/2026** | `/contact/` + `/en/contact/` (gabarit `PageContact`, `ContactPage`), `/mentions-legales/`, `/confidentialite/`, `/cookies/` (FR seul, `lib/legal.ts` + `PageLegale`, `WebPage` daté, bouton « Gérer les cookies ») ; ligne de liens au pied de page ; `public/.htaccess` rapatrié de la v7 (HTTPS, sans www, trois 301 de l'ancien WordPress, 404, cache) ; sitemap complété (contact bilingue, légal à 0.1) ; JSON-LD `CollectionPage` + `ItemList` sur les hubs `/createurs/`, `/coupes/`, `/morphologies/`, `/guides/` (FR et EN). Anglais : seul le contact le justifie ; les pages légales restent françaises (droit français, pas de hreflang). Les familles, guides et pages maisons avaient déjà leur balisage (vagues A et C). | SEO technique et conformité |
| **E — part faite le 01/11/2026** | `/styles/romantique/` (9 robes dont les fiches disent « romantique », « féerique », « conte de fées » : Santana, Seraphina, Charlotte, Calla, Carrie, Summer, Hélène, Alicia, Hera ; écho Chastity) et `/styles/mariage-civil/` (robes courtes Elin, River, Clover, Gabriel + simples Milan, Bondi, Adularia, Maribel, Marie ; écho Tessa ; dit qu'il n'y a pas de combinaison au catalogue ; porte aussi les questions « robe de mariée courte » en attendant une page de coupe) | ce qui s'écrit depuis le catalogue, sans réponse de la maison |
| **F — faite le 01/11/2026** | objectif des 5 000 : base portée à 6 176 expressions pertinentes (1 399 Semrush vérifiées + 4 777 autocomplétion Google/Bing, volumes non vérifiés — `seo-research/README.md`) ; `/details/courte/` (quatre robes courtes, en attendant la décision « coupe courte »), `/guides/traine-robe-de-mariee/`, `/guides/robe-de-mariee-apres-40-ans/` ; intros des cinq coupes densifiées (FR + EN pour trapèze et deux-en-un), accueil, catalogue, hubs morphologies et guides, créateurs ; une à deux questions de plus sur chaque page de famille ; une section de plus sur six guides. Couverture mesurée (`scripts/seo/implantation.py`) : 67 % des expressions ont tout leur vocabulaire sur leur page cible, 94 % du volume vérifié | implanter la base élargie sans bourrage |
| **G — faite le 01/11/2026** | les 67 fiches robes (FR et EN) : titre et description propres à chaque robe (coupe, matière lue dans la ligne, maison ; `lib/fiche-seo.ts`), quatre sections composées depuis les données de la fiche — la coupe, matières/détails/maison, à qui elle va, l'essayer à Paris —, quatre questions avec FAQPage, liens vers coupe, familles, morphologies, maison, guides. De 83–278 mots à 524–903 par fiche, 17 liens internes, 67 titres et 67 descriptions distincts. Rien d'inventé : ce que la fiche ne dit pas n'est pas écrit | les fiches étaient la rubrique la plus pauvre du site |
| **E — reste, sous réserve de la maison** | `/coupes/courte/` (la maison doit confirmer « courte » comme coupe : A-VERIFIER §4), `/guides/acheter-ou-louer-sa-robe-de-mariee/` (la maison loue-t-elle ?), `/guides/robe-de-mariee-couleur/` (coloris disponibles), tendances 2026 (arrivées 2026) | attendent une réponse ou le complément Semrush |

Chaque page livrée passe la même liste : Title unique ≤ 60 signes,
description ≤ 158, un seul H1, intro qui nomme des robes réelles, H2 issus du
cluster, rangées de questions, fil d'Ariane, liens montants et latéraux, alt
calculés, JSON-LD, entrée au sitemap, version anglaise ou `hreflang` absent.

## 5. Vers les 5 000 expressions

| Source | Expressions | Où elles vivent |
|---|---:|---|
| Base vérifiée (phase 2, reclassée le 01/11) | 1 399 | pages du tableau ci-dessus |
| Autocomplétion Google et Bing (01/11, volumes non vérifiés) | 4 777 | mêmes pages, + courte, traîne, 40 ans ; implantées à 67 % en vocabulaire |
| Mots-clés transmis par la maison (mariages.net PRO, Tendances 2027, 03/11) | 15 (12 nouveaux) | /guides/robe-de-mariee-bridgerton/, /details/corset/, /styles/minimaliste/ (question), /guides/ivoire-ou-blanc/ (Cloud Dancer), /coupes/deux-en-un/ (question) |
| Expansion d'architecture (à valider en volume) | 482 | H2, questions, ancres, alt |
| Complément Semrush (tranches manquantes, questions, variantes) | ≈ 2 500 à 3 000 pertinentes | mêmes pages ; nouvelles questions |
| **Total visé** | **≈ 5 000** | **sans page supplémentaire au-delà de ce plan** |

## 6. Ce qui reste à trancher par la maison

Robes courtes et civiles ; location ; grandes tailles ; robes de couleur ;
Sienna et Zina (Angeola Biarritz ou Casablanca Bridal) ; dix robes sans
fiche fournisseur ; photographies HD de dix-huit robes ; nom court de
« Clover avec ou sans perles ». Les pages concernées sont en vague E.

## 7. Vague H — les mots-clés transmis par la maison (3 novembre 2026)

Mouna a transmis trois pages du document « Tendances 2027 » de mariages.net
PRO (captures d'écran : Regencycore, minimalisme, deux-en-un). Les volumes sont ceux du document, **non vérifiés
dans Semrush** (solde à zéro) ; ils entrent dans la base avec la mention
« non (transmis par la maison) » (`seo-research/raw/client/`). Règle
inchangée : une expression = une place, et rien n'est inventé sur les robes.

| Expression (volume du document) | Où elle vit | Ce qui a été fait |
|---|---|---|
| robe bridgerton (2 900), robe style bridgerton (880), thème bridgerton (260), robe regencycore, style regencycore | `/guides/robe-de-mariee-bridgerton/` | Guide créé : origine du style, ses codes, les robes du catalogue qui en portent un (corset, col carré, manches ballon, gants, perles — d'après leurs fiches), ce que le catalogue n'a pas (taille empire, pastels), le thème, la morphologie. |
| regencycore decor | aucune | Décoration : hors offre, classée « adjacent ». |
| robe de mariée corset (320, déjà vérifié Semrush : + robe mariée corset 210, robe de mariage corset 210, corset mariage 210, bustier corset 140…) | `/details/corset/` | Page de détail créée (douze robes dont la fiche dit « corset », quatre colonnes, six questions). Le cluster « Détails : corset » est détaché du bustier ; la question « corset ou bustier » passe du bustier au corset. Libellé anglais ajouté au filtre du catalogue. |
| robe de mariée simple (4 400 ; Semrush : 2 900) | `/styles/minimaliste/` | Déjà la cible de la page (titre, H1). Rien à ajouter. |
| quiet luxury style (70), luxe discret (50) | `/styles/minimaliste/` | Question ajoutée : « Robe de mariée simple et quiet luxury : la même chose ? ». |
| robe de mariée 2 en 1 (260, Semrush aussi), robe de mariée modulable 2 en 1 (140), robe de mariée transformable (110, +57 %), transformer sa robe de mariée en robe de cocktail (110, +22 %) | `/coupes/deux-en-un/robe-de-mariee-2-en-1-modulable-robe-de-cocktail/` | Question SEO ajoutée à la page deux-en-un (Clover, Gabriel, Tessa, Mira d'après leurs fiches) ; la règle du cluster deux-en-un reconnaît « modulable », « transformer », « cocktail ». |
| cloud dancer (480, +860 %) | `/guides/ivoire-ou-blanc/` | Une phrase dans « les mots » : le blanc doux de Pantone 2026, rangé avec le blanc cassé. Aucune robe n'est dite de cette teinte. |

À faire vérifier par la maison : les volumes (quand Semrush sera
réalimenté) ; la liste des robes citées comme portant un code Bridgerton
— elle vient des fiches, mais c'est elle qui sait lesquelles elle
montrerait pour ce thème.
