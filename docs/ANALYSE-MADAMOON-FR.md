# Analyse du site actuel madamoon.fr (30 octobre 2026)

Analyse en lecture seule : robots.txt, sitemap.xml, en-têtes HTTP, HTML de huit
pages représentatives, croisée avec les données Semrush de la phase 2 et le
code source de la version 7 (`~/Desktop/madamoon-v7`, qui est le site en ligne).

## Ce qu'est le site aujourd'hui

- **Next.js 15 exporté en statique, hébergé chez Hostinger**, cache 10 minutes,
  HTTP/2 et HTTP/3, en-têtes de sécurité de base (nosniff, referrer-policy).
- **184 URL dans le sitemap**, en deux langues (hreflang fr / en / x-default) :
  accueil, `/robes/` et **67 fiches robes**, `/coupes/` et 5 coupes
  (sirène, princesse, fluide, trapèze, deux-en-un), `/morphologies/` et 6
  lettres (O, A, V, H, 8, X), `/createurs/` × 5 (Watters Designs, Casablanca
  Bridal, Olya Mak, Monica Loretti, « autres créateurs »), `/trouver-ma-robe/`,
  `/showroom/`, `/a-propos/`, `/rendez-vous/`, `/faq/`.
- **Pas de section guides, pas de pages style, matière ou détail** : les
  intentions bohème, dentelle, manches longues, simple, prix, courte n'ont
  aucune page d'atterrissage.
- **Catalogue :** 67 robes (dix Casablanca Bridal récentes en tête), cinq
  familles de coupe, morphologies renseignées sur une partie seulement des
  robes (les Casablanca n'en ont pas encore). Photographies en AVIF/WebP
  multi-largeurs ; 18 fiches ont des visuels sources de 321 à 561 px, donc
  flous en grand format (voir `A-VERIFIER-AVEC-LA-CLIENTE.md` de la v7).
- **Informations commerciales fiables** (source `lib/madamoon.ts`) : 234 rue du
  Faubourg Saint-Martin, 75010 ; lundi 12 h-21 h, mardi-samedi 10 h-19 h, sur
  rendez-vous ; sur mesure à partir de 1 500 € ; essayage privé d'une heure ;
  retouches incluses ; Instagram, TikTok, Facebook.

## Ce qui est bien et doit être conservé

| Élément | Constat | Décision V8 |
|---|---|---|
| Structure d'URL | Propre, lisible, en français, sans paramètres | **Conservée à l'identique** : aucune redirection à risque, positions acquises préservées |
| Balises Title | Déjà construites (« Robe de mariée Santana — princesse — MADAMOON », « Robe de mariée sirène à Paris — MADAMOON ») | Conservées dans l'esprit, enrichies (matière, maison) |
| Meta descriptions | Uniques, factuelles, mention du showroom | Conservées, réécrites page par page |
| hreflang FR/EN | Correct, x-default sur le FR | Conservé pour les pages existantes ; les nouvelles pages démarrent en FR |
| JSON-LD | Très complet : ClothingStore, Product + Offer, BreadcrumbList, CollectionPage, FAQPage sur morphologies et FAQ, ReserveAction | Conservé, mis à jour (Store, dates, prix), étendu aux nouvelles pages |
| Pages morphologies | ~1 200 mots, FAQ, structure H2 claire | Modèle de référence pour les nouvelles pages éditoriales |
| Identité | Ivoire/craie, serif de titrage, rouge rare réservé à l'action, anti-références de la cliente (pas de cartes, pas de blocs, pas de fond noir) | Reprise comme socle, poussée plus loin (voir `DIRECTION-ARTISTIQUE.md`) |
| Médias | Pipeline AVIF/WebP, manifeste généré, vidéos chargées à l'approche | Recopié par script |

## Ce qui freine le référencement

1. **Les prénoms des robes attirent du bruit.** 68 des 97 mots-clés positionnés
   sont hors sujet (« chastity », « charlize theron », « solana »,
   « amaryllis », « oksana »). Le H1 des fiches est le prénom seul ; le Title
   est bon, mais le contenu de la page ne qualifie pas assez la robe. **V8 :**
   H1 « Robe de mariée Santana », sous-titre coupe + maison, texte factuel
   dense sur la robe, les prénoms jamais seuls dans un lien ou une légende.
2. **Pages de coupe trop minces** : ~700 mots dont la navigation ; une liste de
   robes par maison et un court paragraphe « à qui cette coupe va ».
   marieeparisienne.com tire 1 168 visites par mois de sa seule page princesse.
   **V8 :** 900 à 1 400 mots éditoriaux par coupe, sections matières et
   détails, FAQ réelle, maillage vers morphologies.
3. **Aucune page pour 10 des 15 premiers clusters** (bohème, courte, prix,
   dentelle, minimaliste, manches, bustier, satin, dos nu, vintage).
4. **H1 de l'accueil : « Vous vous mariez bientôt ? »** — élégant mais sans le
   sujet. **V8 :** un H1 qui dit « robe de mariée » et « Paris » sans slogan
   publicitaire (ex. « Robes de mariée à Paris, en essayage privé »).
5. **Balise `meta keywords`** présente : inutile, à retirer.
6. **Deux hôtes indexés** (`madamoon.fr` et `www.madamoon.fr` apparaissent
   séparément dans Semrush) et une **ancienne URL** `/catalogue-des-robes/`
   encore positionnée. **V8 :** 301 vers l'hôte canonique et vers `/robes/`.
7. **Autorité faible** (Authority Score 9, 131 domaines référents) et
   **visibilité en baisse** depuis avril 2026. Hors périmètre technique, mais
   la refonte doit livrer des pages « liables » (guides, prix, morphologies).
8. **Maillage interne pauvre vers le haut de la demande** : tout renvoie aux
   coupes et aux créateurs ; rien ne mène à des pages style/matière/prix,
   parce qu'elles n'existent pas.
9. **Search Console non connectée** aux outils disponibles : le pilotage par
   les requêtes réelles manque.

## Points à faire trancher par MADAMOON (repris de la v7 et de la phase 2)

- Sienna et Zina : Angeola Biarritz ou Casablanca Bridal ?
- Dix robes sans fiche fournisseur (Adularia, Agnessa, Alicia, Amandine,
  Angel, Camille, Dolores, Livia, Lorette, Lovia) : maison et morphologies.
- Photographies sources haute définition pour 18 robes.
- Robes courtes, tenues civiles, grandes tailles, couleurs, location :
  réponses nécessaires avant d'ouvrir les pages correspondantes.
- Nom court pour « Clover avec ou sans perles ».
