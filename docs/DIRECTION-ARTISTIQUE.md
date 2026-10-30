# Direction artistique v2 — MADAMOON

*Remplace entièrement la v1 (archivée dans `archive-da-v1/`). Rien de la
mise en scène du site actuel n'est conservé.*

## Le concept : « Le Numéro »

MADAMOON ne se présente plus comme une boutique qui montre ses robes, mais
comme **une publication** : un numéro de campagne, édité à Paris, dont chaque
page d'accueil est la couverture et chaque section un chapitre numéroté.
Le blanc du papier est le fond ; la typographie est le décor ; la photographie
est la seule couleur ; le rouge MADAMOON est l'encre du titre, de la
signature et de l'action.

Ce que cela produit : une expérience qui se lit comme un magazine de mode et
se manipule comme une interface contemporaine — grandes compositions
typographiques, images qui débordent des colonnes, chapitres qui défilent
horizontalement, chiffres et métadonnées en monospace, curseur qui réagit,
compteur à l'ouverture, texte en contour, superpositions titre/photo. Et
toujours : une robe, une mariée, une heure pour elle. La douceur est dans
les photographies, les italiques et les courbes de la Fraunces ; la précision
est dans la grille, le mono et le rouge.

## Trois registres, une seule voix

| Registre | Ce qu'il apporte | Où |
|---|---|---|
| **Éditorial mode** | titres immenses, italiques, lettrines, colonnes, numéros de chapitre, légendes dans la marge | titres, édito, fiches |
| **Luxe digital** | blanc absolu, espaces doubles, photographie plein cadre, transitions cinématiques, rien d'inutile | hero, showroom, transitions |
| **Web nouvelle génération** | monospace, compteur, curseur personnalisé, texte en contour, trait rouge qui se dessine, défilement horizontal épinglé, parallaxe en profondeur | métadonnées, navigation, interactions |

## Palette

| Rôle | Nom | Valeur | Emploi |
|---|---|---|---|
| Fond | Blanc | `#FFFFFF` | la page, dominant |
| Variation | Ivoire | `#F6F2EC` | un chapitre sur quatre, jamais deux de suite |
| Texte | Noir doux | `#161412` | titres, corps |
| Texte second | Gris | `#6B6661` | méta, légendes |
| Filet | Gris clair | `#D9D4CD` | traits de 1 px |
| **Accent** | **Rouge MADAMOON** | **`#CE0A2C`** | boutons, curseur, trait signature, numéros, un mot par titre, états de survol |
| Accent pressé | Grenat | `#910000` | bouton actif / survol |

Le rouge est partout en petites quantités (un trait, un point, un mot, un
bouton) et nulle part en grande surface. Contrastes : Noir sur Blanc 17:1,
Gris sur Blanc 5,4:1, Blanc sur Rouge 5,9:1 (AA sur tous les corps).

## Typographie : trois familles, trois rôles

| Famille | Rôle | Réglage | Pourquoi elle |
|---|---|---|---|
| **Fraunces** (variable : opsz, SOFT, WONK, italique) | affiche, titres, noms de robes, citations | `opsz` 144, `SOFT` 60, graisse 300-400, italique pour le mot qui compte | une serif à l'ancienne mais vivante : les empattements souples, le « a » italique, les courbes douces disent le mariage sans tomber dans le Bodoni de couverture que tout le monde utilise |
| **Jost** | corps, navigation, boutons | 300 pour le corps long, 400 courant, 500 boutons et capitales espacées | une géométrique parisienne des années 1920 : la mode, Vogue, les enseignes — nette, élégante, jamais technique |
| **DM Mono** | numéros de chapitre, index, horaires, adresse, métadonnées, compteur | 400, capitales, approche 0,08 em | la couche « nouvelle génération » : la précision d'une fiche technique, et le contrepoint de la Fraunces |

Échelle : affiche `clamp(3.5rem, 11vw, 13rem)` interligne 0,88 ; titre de
chapitre `clamp(2.5rem, 7vw, 8rem)` ; sous-titre `clamp(1.5rem, 3vw, 2.75rem)` ;
corps 17-19 px interligne 1,6 ; mono 11-12 px.

## Les signes graphiques (l'identité, au-delà des couleurs)

1. **Le trait rouge** : une ligne de 2 px qui se dessine de gauche à droite à
   l'ouverture de chaque chapitre, et qui sert de progression (défilé,
   paroles, chargement).
2. **Le numéro** : chaque chapitre porte son numéro en mono rouge
   (« N° 03 — Les coupes »), et chaque robe son index (« 02 / 07 »).
3. **Le mot rouge** : un seul mot par titre, en Fraunces italique rouge.
4. **Le contour** : les mots-objets (lettres de morphologie, mot-clé en fond)
   sont dessinés au trait ; l'actif se remplit de rouge.
5. **Le curseur** : un point rouge qui devient un cercle « Voir » sur les
   photographies, un trait sur les liens (souris seulement).
6. **Le compteur** : 00 → 100 en mono à l'ouverture, 1,2 s, une fois par
   visite.
7. **La superposition** : le titre traverse la photographie, en inversion
   (différence) là où il la recouvre.

## Mise en page

- Grille 12 colonnes, gouttière `clamp(1.25rem, 3.4vw, 4rem)`, largeur
  maximale 1 760 px ; les photographies débordent toujours d'une colonne ou
  touchent le bord de l'écran ; les titres chevauchent les images.
- Chaque chapitre a **une disposition qui n'existe nulle part ailleurs sur la
  page** : masthead, bande horizontale, index typographique avec image
  flottante, lettres en contour, plein cadre vidéo, pile d'images collante,
  citation géante, double page de magazine, dernier mot.
- Angles vifs. Aucun cadre, aucune ombre, aucun fond de carte. La profondeur
  vient des superpositions et des vitesses de parallaxe différentes.
- Espacement vertical des chapitres `clamp(7rem, 14vw, 14rem)`.

## Mouvement

| Moment | Ce qui se passe |
|---|---|
| Ouverture | blanc, compteur mono, trait rouge qui traverse l'écran, voile qui remonte ; le titre monte ligne par ligne, la photographie se dévoile par un masque horizontal, le curseur apparaît |
| Hero → chapitre 01 | au défilement, la photographie s'élargit jusqu'au bord de l'écran et passe sous le texte (épinglage court, vitesse scrub) |
| Titres | révélation mot à mot (SplitText), 60 ms de décalage, courbe expo |
| Images | masque qui s'ouvre (clip-path) + contre-échelle 1,06 → 1 ; dérive verticale de 4-8 % selon le plan (profondeur) |
| Défilé | chapitre épinglé, bande horizontale pilotée par le défilement, trait rouge de progression, légendes qui glissent |
| Index des coupes | l'image flottante suit légèrement le curseur et change selon la ligne survolée |
| Lettres | le contour se remplit de rouge ; cycle automatique lent quand personne ne touche |
| Bandeau défilant | Fraunces italique, vitesse et sens liés au défilement |
| Boutons | fond rouge, au survol une vague grenat monte du bas, la flèche avance de 4 px ; pressé : échelle 0,98 |
| Liens | trait rouge dessiné de gauche à droite |
| Changement de page | voile blanc + trait rouge, 600 ms |

Tout est coupé sous `prefers-reduced-motion` et dans un onglet caché ; le
contenu est alors posé, visible, sans états intermédiaires. Mobile : pas de
curseur, pas d'épinglage horizontal (bande en défilement natif), masques et
mots conservés, durées raccourcies de 30 %.

## La page d'accueil : neuf chapitres

| N° | Chapitre | Disposition | Rôle |
|---|---|---|---|
| — | Ouverture | compteur, trait rouge, voile | première impression |
| 01 | Couverture | masthead : eyebrow mono, titre immense « Celle qui vous *attendait*. », photographie portrait à droite traversée par le titre, bouton rouge, horaires mono, repère de défilement | campagne |
| 02 | Manifeste | trois lignes géantes, mot à mot ; bandeau défilant des coupes | qui est MADAMOON |
| 03 | Le défilé | bande horizontale épinglée, sept robes de hauteurs différentes, noms italiques à cheval sur l'image, index mono, trait de progression | les robes |
| 04 | Les coupes | index typographique (cinq coupes en 7vw), image flottante qui change, numéros rouges | entrer par la coupe |
| 05 | Les morphologies | six lettres en contour, la lettre active en rouge, conseil en une phrase | entrer par la morphologie |
| 06 | Le showroom | vidéo plein cadre, titre blanc qui déborde, adresse mono, bouton | conversion |
| 07 | Les maisons | liste à gauche, pile d'images collante à droite | entrer par la maison |
| 08 | Paroles | une citation géante à la fois, guillemet rouge, rotation lente | réassurance réelle |
| 09 | L'édito | double page : lettrine rouge, deux colonnes, citation tirée, petite image | texte SEO comme une page de magazine |
| — | Le dernier mot | « Réserver un *essayage* » immense, bouton, logo en masthead de fin, pied mono | conversion |

La proposition visuelle animée est `docs/da/accueil-v2.html` (servie sur
http://localhost:5901/accueil-v2).
