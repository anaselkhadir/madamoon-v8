# Pourquoi la première proposition ressemblait au site existant

Relecture honnête de ce qui a été produit en phase 3 et 4 (30 octobre 2026),
avant de repartir de zéro.

## Ce qui a été reproduit, point par point

| Élément | Site actuel (v7) | Proposition v1 | Verdict |
|---|---|---|---|
| Fond | ivoire `#fdfbf8`, craie `#f6f2ec` | porcelaine `#fbf9f5`, ivoire `#f3eee5` | la même chose, à deux points près |
| Typographie | serif de titrage + sans de texte (Instrument Serif / Quattrocento) | serif de titrage + sans de texte (Bodoni Moda / Instrument Sans) | le même schéma, et même « continuité » revendiquée avec le dessinateur de la v7 |
| Rouge | réservé à l'action, bandeau final rouge unique | réservé à l'action, bandeau final rouge unique | copié, jusqu'à la règle « une surface rouge par page » |
| Mouvement | « rideau », « ligne », « suite » | « rideau », « ligne », « dérive », « passage » | les noms mêmes du DESIGN.md de la v7 |
| Accueil | film du showroom → manifeste → robes → morphologie → maisons → avis → bandeau | film du showroom → manifeste → trois portes → robes → lettres → maisons → showroom → avis → édito → bandeau | la même séquence, le même film en ouverture, les mêmes titres de section (« Quelques robes, pour commencer », « Avant la robe, la morphologie », « Plusieurs maisons. Aucune par hasard. », « Poussez la porte ») |
| Tuiles | photo 3:4, nom dessous, maison en petites capitales | photo 3:4, nom dessous en italique, maison en petites capitales | identique |
| Fiche robe | photo + texte, galerie, mêmes robes | photo + texte collant, galerie, mêmes robes | identique dans sa logique |

## Pourquoi c'est arrivé

1. **J'ai pris la v7 comme socle au lieu de la prendre comme point de départ
   à quitter.** L'analyse du site existant a listé ses qualités (URL, données
   structurées, anti-références de la cliente) et j'en ai déduit qu'il
   fallait « reprendre le socle et pousser plus loin ». Le cahier des charges
   demandait une nouvelle identité ; j'ai livré une révision.
2. **J'ai confondu prudence SEO et prudence visuelle.** Garder les URL, les
   données et la matière vérifiée était juste. Garder la palette, le rythme
   des sections, les titres et la grammaire du mouvement ne l'était pas :
   rien de tout cela ne sert le référencement.
3. **J'ai écarté les codes « next-gen » par principe** (pas de pilule, pas
   de curseur, pas de compteur, pas de texte en contour, pas de mono) au nom
   d'un minimalisme qui était en fait celui du site actuel.
4. **J'ai réutilisé les textes de la v7** (« On n'essaie pas tout. On essaie
   ce qu'il faut. », « Poussez la porte. ») : la voix, donc l'identité, est
   restée la même.
5. **J'ai jugé sur une planche**, pas sur une expérience : la planche était
   jolie et conforme à la v7, ce qui était précisément le problème.

## Ce qui est conservé malgré tout (et pourquoi)

- Les **URL** et l'architecture SEO de la phase 3 : elles ne portent aucune
  identité visuelle et protègent les positions acquises.
- Les **données vérifiées** (robes, maisons, horaires, avis réels) et les
  **photographies** de la maison : la matière, pas la mise en scène.
- Le **socle technique** (Next 16, Tailwind 4, GSAP, Lenis, import par
  script, sitemap, JSON-LD) : il ne préjuge d'aucun design.

Tout le reste — palette, typographie, compositions, mouvement, voix,
composants — est abandonné. La nouvelle direction est dans
`DIRECTION-ARTISTIQUE.md` ; l'ancienne est archivée dans `archive-da-v1/`.
