# Fiches produit — points à faire trancher

Relevé le 5 septembre 2026, à partir de **fiches produit pour site internet.xlsx**
(48 fiches, une par robe). Rien de ce qui suit n'a été tranché sans vous.

## 1. Sept robes changent de maison

Le fichier attribue ces robes à une autre maison que le site. Les liens
fournisseurs du fichier corroborent le fichier dans les sept cas.

| Robe | Sur le site | Dans le fichier | Appliqué ? |
|---|---|---|---|
| Montana | Olya Mak | Casablanca Bridal | oui |
| Ariel | Olya Mak | Casablanca Bridal | oui |
| Solana | Olya Mak | Casablanca Bridal | oui |
| Venus | Olya Mak | Casablanca Bridal | oui |
| Clover | Watters Designs | Casablanca Bridal | oui |
| **Sienna** | Angeola Biarritz | Casablanca Bridal | **non — laissé en l'état** |
| **Zina** | Angeola Biarritz | Casablanca Bridal | **non — laissé en l'état** |

Sienna et Zina sont les deux seules robes rattachées à **Angeola Biarritz**.
Les déplacer viderait sa page. Elles n'ont donc pas été touchées : à
confirmer avec la cliente.

## 2. Dix robes du site absentent du fichier

Adularia, Agnessa, Alicia, Amandine, Angel, Camille, Dolores, Livia,
Lorette, Lovia.

Elles restent en ligne avec leurs photographies. Faute de fiche, elles
n'ont **ni morphologies ni maison** — sept d'entre elles n'ont toujours
aucun créateur. À compléter dans le fichier.

## 3. Deux robes s'appellent Clover

Le fichier en contient deux :

- **Clover 2 en 1** (Casablanca Bridal) — celle déjà en ligne, courte avec
  surjupe. Nom inchangé : « Clover ».
- **Clover avec ou sans perles** (Watters Designs) — nouvelle. Publiée sous
  ce nom entier, faute de mieux.

Un nom plus court pour la seconde serait préférable en catalogue.

## 4. Le vocabulaire des coupes diffère

Le fichier emploie « fourreau », « A-line », « droite », « courte » ; le
site classe en six familles : Sirène, Princesse, Fluide, Trapèze,
Minimaliste, Deux en un.

**Les coupes des robes déjà en ligne n'ont pas été modifiées** — les
changer déplacerait les robes entre les pages de coupe et fausserait les
recommandations d'Élise. Seules les 18 nouvelles ont été classées, d'après
la description du fichier.

## 5. Définition des photographies

Les images du fichier mesurent de 321 à 561 pixels de large. Le hero d'une
fiche robe les affiche sur 1440 pixels, soit un agrandissement d'environ
2,8× — 5,7× sur écran retina. Les 18 nouvelles fiches sont donc
sensiblement plus floues que les 40 autres.

Les quatre plus petites : Seraphina (321 px), River (356 px), Elin
(370 px), Siddalee (405 px).

Il faudrait les photographies d'origine des fournisseurs.

## 6. Mentions légales et confidentialité — à fournir avant la mise en ligne

Relevé le 1er novembre 2026. Les trois pages (`/mentions-legales/`,
`/confidentialite/`, `/cookies/`) sont écrites à partir de ce que le site
sait de lui-même ; `lib/legal.ts` reçoit ce qui manque. madamoon.fr n'a
aujourd'hui aucune de ces pages.

| À fournir | Pourquoi | Où l'écrire |
|---|---|---|
| Forme juridique, raison sociale, numéro SIREN/SIRET, numéro de TVA, capital le cas échéant | la loi pour la confiance dans l'économie numérique (art. 6-III) les impose à tout éditeur professionnel ; rien n'a été inventé | `EDITEUR` dans `lib/legal.ts` |
| Nom complet de la directrice de la publication | la page dit « Mouna, fondatrice de MADAMOON », comme la page À propos ; la loi demande le nom | `EDITEUR.publication` |
| Confirmation de l'entité Hostinger du contrat (Hostinger International Ltd, Larnaca, écrite d'après l'usage courant) | l'hébergeur doit être exact | `HEBERGEUR` |
| Durée réelle de conservation des dossiers clientes (rendez-vous, mesures, retouches) | la politique dit « le temps de l'accompagnement puis les obligations comptables » ; une durée chiffrée vaut mieux | `confidentialite`, bloc « Combien de temps » |
| Quel service d'IA la fonction d'Élise (Supabase) appelle, et s'il conserve les conversations | la politique nomme Supabase et « un modèle de langage », sans plus | `confidentialite`, bloc « Ce que le site collecte » |
| Le conteneur Google Tag Manager (GTM-T5FMK7CX) | relevé le 1er novembre 2026 en développement, consentement accepté : il charge Google Analytics 4 (G-TBKRRXMH9R), Google Ads (AW-16466463653) **et le script CookieYes de l'ancien site** (cdn-cookieyes.com, client da13ffe4…), qui lève une erreur « website URL has changed » sur toute adresse autre que l'ancienne. Sur le nouveau site, cette balise ferait doublon avec le bandeau du site (ou planterait) : **à retirer du conteneur** avant la mise en ligne. La page cookies nomme GA4 et Google Ads ; elle ne nomme pas CookieYes, qui ne doit pas rester | interface Tag Manager de la maison |
