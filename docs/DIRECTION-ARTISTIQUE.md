# Direction artistique — MADAMOON V8

## Le concept : « Le blanc n'est pas une absence »

Une robe de mariée se regarde dans la lumière. Le site est une **pièce
blanche** : porcelaine, ivoire, lin, un grain de papier à peine perceptible,
et dedans, une seule chose qui compte : la robe. Le texte est posé comme un
titre de magazine de mode, grand, en Bodoni, avec un mot en italique qui
respire ; tout le reste est petit, précis, en sans-serif. Rien n'est encadré.
Les images arrivent comme un rideau qu'on ouvre, les titres montent comme une
ligne qu'on lit, et l'on peut s'arrêter n'importe où : le défilement n'est
jamais pris en otage.

Ce que cela donne en une phrase : **la rencontre d'un magazine de mode
imprimé sur beau papier et d'une cabine d'essayage très lumineuse.**

## Ce que le site refuse

Reprises des anti-références de la maison (v7) et du cahier des charges V8 :
pas de cartes ni de bordures, pas de sections empilées comme des blocs, pas de
grille de trois colonnes identiques, pas de catalogue à vignettes alignées,
pas de fond noir dominant, pas de mode sombre, pas d'animation gadget, pas de
boutons-pilules ni de verre dépoli, pas d'icônes de bibliothèque, pas de
carrousel d'avis à étoiles, pas de « Découvrez notre collection ».

Les archétypes « bento », « glass » et « double bezel » des skills de design
disponibles ont été examinés et **écartés** : ils signent le SaaS, pas la
mode. Nous en gardons seulement les principes de rythme (espaces doublés,
révélations au scroll avec masse, courbes personnalisées, mobile en colonne).

## Palette

| Rôle | Nom | Valeur | Emploi |
|---|---|---|---|
| Fond principal | Porcelaine | `#FBF9F5` | la page |
| Fond secondaire | Ivoire | `#F3EEE5` | changements de rythme, bandeaux éditoriaux |
| Fond appuyé | Lin | `#E8E0D3` | filets, surfaces de repos, légendes sur image claire |
| Matière | Sable | `#CBBBA3` | une seule présence par écran : filet, numéro de section, trait sous un mot |
| Texte | Encre | `#1A1714` | titres, corps |
| Texte secondaire | Graphite | `#554E47` | légendes, méta, navigation |
| Texte tertiaire | Brume | `#948B80` | mentions, numéros |
| Action (marque) | Grenat MADAMOON | `#910000` | boutons rendez-vous, liens actifs, soulignés : jamais une surface |
| Ponctuation (marque) | Rouge MADAMOON | `#CE0A2C` | une seule occurrence par page, en point final (le bandeau rendez-vous) |

Contrastes vérifiés : Encre sur Porcelaine 16,4:1 ; Graphite sur Porcelaine
8,3:1 ; Brume sur Porcelaine 3,5:1 (réservé aux textes ≥ 18 px ou décoratifs) ;
Grenat sur Porcelaine 9,6:1 ; blanc sur Grenat 9,3:1.

Un **grain** de papier (bruit SVG, opacité 3 %) est posé en calque fixe,
désactivé sous `prefers-reduced-motion` et sur les écrans à faible
performance (`navigator.deviceMemory < 4`).

## Typographie

- **Bodoni Moda** (variable, axe optique 6-96) pour l'affiche, les titres,
  les noms de robes et les phrases éditoriales. Haut contraste, empattements
  fins : le dessin des grands magazines de mode. L'**italique** marque le mot
  qui respire dans une ligne (« La robe, *avant tout*. »). Jamais en capitales
  au-delà de 24 px : les capitales Bodoni crient.
- **Instrument Sans** pour le corps, la navigation, les légendes et les
  petites capitales espacées. Même dessinateur que l'Instrument Serif du site
  actuel : la continuité est dans la main, pas dans la copie.
- Deux familles, pas trois. Pas d'anglaise, pas de manuscrite.

Échelle fluide (voir `DESIGN-SYSTEM.md`) : affiche jusqu'à 10,5 rem sur grand
écran, 3 rem sur mobile ; corps 1 à 1,125 rem, interligne 1,65 ; mesure de
lecture 58 à 64 caractères.

## Image

- Photographies de la maison uniquement, en AVIF/WebP, ratios 3:4 (robe en
  pied), 4:5 (détail), 16:9 et 21:9 (showroom, films). Toujours des
  dimensions explicites, jamais de recadrage automatique sur un visage.
- Les images **ne sont jamais encadrées** : elles touchent la gouttière ou
  débordent du cadre de texte d'une à deux colonnes (asymétrie).
- Une image arrive par **rideau** : masque qui s'ouvre (clip-path) pendant
  que l'image se pose en contre-échelle (1,08 → 1). Une seule image par
  écran en mouvement à la fois.
- Films muets, boucles de 6 à 12 s, affiche en AVIF, chargés à l'approche,
  jamais sous `prefers-reduced-motion` ni `Save-Data`.
- Légendes en petites capitales Brume, posées dans la marge, pas sous l'image.

## Mise en page

- Grille de 12 colonnes fluide, largeur maximale 1 680 px, gouttière
  `clamp(1.25rem, 4vw, 4.5rem)`.
- **Asymétrie réglée** : texte sur 5 colonnes, image sur 6 ou 7, décalage
  d'une colonne entre deux sections consécutives ; un élément par section
  sort du cadre.
- **Rythme** : les sections alternent plein-écran image, pleine largeur
  typographique, composition éditoriale en deux colonnes, et respiration
  vide. Deux sections consécutives n'ont jamais la même disposition.
- Espacement vertical des sections `clamp(6rem, 12vw, 11rem)`.
- Aucun rayon de courbure : angles vifs partout (boutons, images, champs).
  Les filets font 1 px en Lin, jamais en gris neutre, jamais autour d'un bloc.
- En-tête : barre fine fixe (logo à gauche, menu au centre, rendez-vous à
  droite), transparente sur l'affiche puis Porcelaine au défilement, 64 px.
  Pas de pilule flottante.

## Grammaire du mouvement

Quatre signatures, chacune avec un rôle. Rien d'autre.

| Signature | Rôle | Mécanique | Durée |
|---|---|---|---|
| **Rideau** | arrivée d'une photographie | `clip-path: inset(0 0 100% 0)` → `inset(0)`, image en contre-échelle 1,08 → 1 | 1,2 s, `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Ligne** | arrivée d'un titre | SplitText par ligne, chaque ligne monte de 110 % derrière un masque, décalage 90 ms | 0,9 s |
| **Dérive** | profondeur au défilement | translation verticale ±6 % de la hauteur de l'image, ScrollTrigger scrub | continue |
| **Passage** | changement de page | voile Ivoire qui balaie de bas en haut, logo au centre 300 ms, View Transitions quand disponible | 0,7 s |

Au chargement de l'accueil : fond Porcelaine, logo qui apparaît en Ligne,
puis Rideau sur l'affiche, puis Ligne sur le titre (deux lignes) et la
mention de lieu. Total 2,2 s, interruptible par le défilement.

Le corps de texte ne s'anime pas. Les paragraphes éditoriaux longs se
révèlent par un simple fondu monté de 24 px au premier passage. Les
interactions (survol de lien) : soulignement qui se dessine de gauche à
droite, 300 ms ; images de liste qui s'échangent par fondu croisé.

Tout se coupe sous `prefers-reduced-motion : reduce` : les éléments sont
visibles immédiatement, les films remplacés par leur affiche.

## Storyboard de l'accueil

1. **L'affiche.** Plein écran, photographie ou film du showroom, en-tête
   transparent. Titre sur deux lignes : « Robes de mariée à Paris, / en
   essayage *privé*. » Mention : « 234 rue du Faubourg Saint-Martin — 10ᵉ ».
   Un seul lien : « Prendre rendez-vous ».
2. **Le manifeste.** Fond Ivoire, trois lignes Bodoni très grandes qui
   montent une à une : ce que MADAMOON est (une boutique, plusieurs maisons,
   une heure pour vous). Une petite photographie de détail décalée à droite,
   qui dérive.
3. **Trois portes.** Pas trois cartes : une séquence éditoriale numérotée
   01 / 02 / 03 (par la coupe, par la morphologie, par la maison), chaque
   porte occupe toute la largeur avec son image qui change au survol et un
   mot en italique.
4. **Le défilé.** Huit robes en bande horizontale épinglée au défilement
   (desktop) ; colonne verticale à rythme alterné sur mobile. Noms en Bodoni
   italique, maison en petites capitales, pas de prix.
5. **La morphologie.** Les six lettres O A V H 8 X composées très grandes en
   Bodoni, chacune révélant au survol la coupe qu'elle appelle : le texte
   SEO morphologie est ici, intégré à la composition.
6. **Les maisons.** Liste typographique des quatre maisons avec leur
   origine ; une image change à droite au survol de chaque nom.
7. **Le showroom.** Film 21:9 en rideau, adresse, horaires, « une heure, rien
   que pour vous ». Lien plan.
8. **Paroles.** Deux ou trois avis réels de la maison, en Bodoni, signés d'un
   prénom ; pas d'étoiles, pas de carrousel. (Les avis à publier sont fournis
   par MADAMOON ; aucun n'est inventé.)
9. **L'édito.** « Choisir sa robe de mariée à Paris » : 350 à 450 mots en
   deux colonnes, une citation tirée en Bodoni, liens vers coupes, styles,
   prix, morphologies. Le texte SEO est une page de magazine, pas un bloc.
10. **Le point final.** Bandeau Rouge MADAMOON, la seule grande surface de
    couleur du site : « Poussez la porte. » + rendez-vous + téléphone.
11. **Pied** minimal.

## Storyboard de la fiche robe

Hero en deux colonnes inégales : photographie 3:4 à gauche (7 colonnes),
texte collant à droite (4 colonnes) : nom en Bodoni, maison, coupe, matière,
dos, traîne, « à partir de » si la maison l'autorise, bouton rendez-vous.
Puis la galerie en colonne, chaque vue en rideau, légendes dans la marge.
« Les détails » : liste typographique révélée ligne par ligne. « Dans la même
coupe » et « De la même maison » : deux bandes de trois robes. Fil d'Ariane
en haut, bandeau rendez-vous en bas, Product + Offer + BreadcrumbList.

## Mobile

Une colonne, gouttière 20 px, titres ≥ 2,75 rem, images pleine largeur qui
gardent le rideau (plus court : 0,9 s), bande des robes en défilement
horizontal natif avec accroche, numéro de téléphone cliquable dans le menu et
dans le bandeau final, bouton rendez-vous fixe en bas d'écran sur les fiches
(apparaît après le premier écran, disparaît au pied).
