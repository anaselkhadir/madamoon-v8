# Design system — MADAMOON V8

Tokens : `src/styles/tokens.css` (Tailwind 4 `@theme`). Direction artistique :
`docs/DIRECTION-ARTISTIQUE.md`. Ce document fixe les règles d'emploi.

## 1. Fondations

### Couleurs
Neuf couleurs, nommées en français, et c'est tout. Les surfaces : Porcelaine
(page), Ivoire (changement de rythme), Lin (filets, repos). La matière :
Sable, une fois par écran. Le texte : Encre, Graphite, Brume. La marque :
Grenat pour l'action (texte, filet, fond de bouton), Rouge pour le point final
(une surface par page). Aucune autre valeur n'est admise dans un composant ;
pas de gris neutre, pas de noir pur, pas de mode sombre.

### Typographie
| Style | Famille | Taille | Interligne | Emploi |
|---|---|---|---|---|
| `affiche` | Bodoni Moda 400 | clamp(3rem, 9.5vw, 10.5rem) | 0.92 | titre du premier écran, une ligne ou deux, un mot en italique |
| `titre-1` | Bodoni Moda 400 | clamp(2.5rem, 5.5vw, 5.5rem) | 0.98 | H1 des pages intérieures |
| `titre-2` | Bodoni Moda 400 | clamp(1.75rem, 3.2vw, 3rem) | 1.05 | H2 de section |
| `titre-3` | Bodoni Moda 400 | clamp(1.375rem, 2vw, 1.875rem) | 1.15 | H3, noms de robes en liste |
| `phrase` | Bodoni Moda 400 italique possible | clamp(1.25rem, 1.8vw, 1.75rem) | 1.35 | phrase éditoriale, citation tirée |
| `texte` | Instrument Sans 400 | clamp(1rem, 1.05vw, 1.125rem) | 1.65 | corps, mesure 62ch |
| `legende` | Instrument Sans 400 | 0.8125rem | 1.4 | légendes, méta, fil d'Ariane |
| `mention` | Instrument Sans 500, capitales | 0.6875rem | 1.3, approche 0.18em | numéros de section, étiquettes, lieu |

Chargement : `next/font/google` (auto-hébergé à la compilation), `display:
swap`, métriques de repli ajustées (`adjustFontFallback`) ; sous-ensemble
latin + latin-ext ; Bodoni Moda chargée en variable (axe `opsz`), Instrument
Sans en 400 et 500 seulement.

### Espace et grille
Grille 12 colonnes, `gap` égal à la gouttière, conteneur 1 680 px centré.
Sections espacées de `section` (6 à 11 rem) ; `section-courte` pour les
blocs de liaison. Échelle interne : 0.25 / 0.5 / 1 / 1.5 / 2 / 3 / 5 / 8 rem.
Asymétrie : texte 5 colonnes, image 6 ou 7, décalage d'une colonne entre
deux sections ; sur mobile tout passe en 1 colonne, gouttière 20 px.

### Points de rupture
`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1680. Le design se pense à
390 (mobile), 1024 (tablette paysage) et 1440 (desktop), puis s'étire.

### Formes
Rayon zéro partout. Filets 1 px Lin, horizontaux uniquement (séparateurs de
liste), jamais autour d'un bloc. Pas d'ombre portée : la profondeur vient du
chevauchement et de la dérive, pas du flou.

## 2. Composants

| Composant | Règle |
|---|---|
| **Entête** | barre 64 px fixe ; transparente sur l'affiche, Voile (Porcelaine 86 % + flou 12 px, seul emploi du flou) au défilement ; logo, 5 entrées, bouton Rendez-vous Grenat |
| **Menu plein écran** | fond Porcelaine, entrées en `titre-1` révélées en Ligne, colonne droite image + adresse + téléphone |
| **Bouton** | rectangle Grenat texte blanc, ou texte Encre souligné d'un filet qui se dessine ; hauteur 48 px, padding 0 1.5rem, Instrument Sans 500 ; état focus : contour 2 px Encre décalé 3 px ; jamais d'icône dans le bouton |
| **Lien éditorial** | Encre, soulignement 1 px Sable au repos, Grenat au survol (dessiné de gauche à droite en 300 ms) |
| **Rideau** (`<Rideau>`) | enveloppe d'image : clip-path + contre-échelle ; attribut `data-rideau` ; ratio imposé par token |
| **Ligne** (`<Ligne>`) | enveloppe de titre : SplitText par ligne, masque `overflow: hidden`, montée 110 % |
| **Dérive** (`<Derive>`) | parallaxe ±6 % via ScrollTrigger scrub, désactivée sous 768 px et sous reduced-motion |
| **Passage** | voile Ivoire au changement de route, logo centré, 700 ms |
| **Fil d'Ariane** | `legende` Brume, séparateur « › », BreadcrumbList JSON-LD |
| **Numéro de section** | `mention` Sable « 01 », aligné sur la gouttière |
| **Liste typographique** | lignes séparées par un filet Lin, titre `titre-3`, méta `mention`, image d'accompagnement qui change au survol |
| **Bande de robes** | défilement horizontal épinglé (desktop) / natif avec `scroll-snap` (mobile), tuiles 3:4 sans cadre, nom Bodoni italique + maison en mention |
| **Édito** | deux colonnes `texte` avec une citation tirée `phrase` à cheval ; 350 à 1 400 mots selon la page |
| **Bandeau rendez-vous** | pleine largeur Rouge, texte blanc Bodoni, bouton blanc texte Encre, téléphone ; une occurrence par page, toujours en avant-dernier |
| **Formulaire** | champs sans bordure, filet bas Lin → Encre au focus, étiquette flottante en `mention` ; erreurs Grenat en `legende` ; jamais de placeholder seul |
| **Légende d'image** | `mention` Brume dans la marge gauche (desktop) ou sous l'image (mobile), alt complet distinct de la légende |
| **FAQ** | `<details>` natifs stylés, question en `titre-3`, ouverture animée en hauteur via grid-template-rows, FAQPage JSON-LD |
| **Pied** | Ivoire, quatre colonnes inégales (5/2/2/3), `legende` ; adresse en `address` |

## 3. États et accessibilité
- Contrastes AA minimum sur tout texte < 18 px (Brume interdite sous 18 px
  pour du texte informatif).
- Focus visible partout (contour 2 px Encre, décalé), ordre de tabulation
  naturel, menu plein écran piégeant le focus et fermant à Échap.
- Toutes les animations respectent `prefers-reduced-motion` via les tokens de
  durée à 0 ms ; aucun contenu n'est masqué sans JavaScript (les classes de
  révélation sont ajoutées par le script, l'état par défaut est visible).
- Cibles tactiles ≥ 44 px ; pas de survol porteur d'information seule (le
  changement d'image au survol a toujours son équivalent au focus et au tap).
- Langue déclarée, titres hiérarchisés (un seul H1), `alt` descriptifs
  rédigés pour chaque photographie à partir des faits de la robe.

## 4. Médias
Pipeline (`scripts/medias.py`, phase 5) : sources de la maison → AVIF et
WebP en 480, 768, 1200, 1700, 2400 px ; aperçu flouté 20 px inline ;
manifeste typé (`src/content/medias.ts`) avec dimensions intrinsèques.
Composant `<Photo>` : `sizes` explicites, `loading="lazy"` sauf l'affiche
(`fetchpriority="high"`), `decoding="async"`. Films : MP4 H.264 + WebM,
≤ 2,5 Mo pour 8 s, affiche AVIF, `preload="none"`, lecture à l'approche.

## 5. Performance (budget par page)
HTML ≤ 60 ko, CSS ≤ 40 ko, JavaScript initial ≤ 90 ko (GSAP chargé par
morceaux, uniquement sur les pages qui en ont besoin), LCP < 2 s, CLS < 0,05,
INP < 150 ms, Lighthouse ≥ 95 sur mobile hors « Best practices » liées aux
tiers.
