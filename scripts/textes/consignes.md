# Réécriture des textes MADAMOON — consignes

MADAMOON est une **boutique** de robes de mariée à Paris 10ᵉ (showroom, essayage privé sur rendez-vous). Elle présente les collections de plusieurs créateurs (Casablanca Bridal, Watters Designs, Olya Mak, Monica Loretti). Ce n'est **pas** une maison de couture.

La gérante, Mouna, trouve les textes du site « trop génératifs » : on sent qu'ils ont été écrits pour les mots-clés. Il faut les **reformuler** dans un style **premium, luxueux et sobre, qui parle à de jeunes femmes futures mariées**, sans rien perdre du référencement et **sans rien inventer**.

Tu reçois un ou deux fichiers `.ts` : ce sont des **extraits** (des tranches de lignes) de fichiers de données. Chaque extrait est une suite d'articles (objets `{ slug, q, r, description, chapo, sections, aRetenir, liens, … }`). Tu réécris les textes **dans le fichier, sur place**, puis tu rends compte.

## Ce que tu as le droit de changer

Uniquement la **valeur** (le texte entre guillemets) de ces champs :

- `r` (la réponse courte)
- `chapo`
- chaque chaîne des tableaux `texte: [ … ]`
- chaque chaîne des tableaux `liste: [ … ]`
- chaque chaîne des tableaux `aRetenir: [ … ]`

## Ce qui ne doit PAS changer, au caractère près

- `slug`, `q`, `titre` (ceux des articles **et** ceux des sections), `description`, `href`, `label`, `ordonnee`, et tout autre champ non listé ci-dessus (`style`, `robes`, `image`, etc. : n'y touche pas).
- Les commentaires `/* … */`, l'ordre des articles, l'indentation, la première et la dernière ligne du fichier.
- **La structure** : même nombre d'articles, de sections, de paragraphes dans chaque `texte`, d'éléments dans chaque `liste` et chaque `aRetenir`. Un paragraphe reste un paragraphe : ne fusionne pas, ne découpe pas, n'ajoute pas, ne supprime pas.
- Les expressions de code dans les chaînes : `${MAISON.adresse}`, `${MAISON.prixDepart}`, etc. Une chaîne entre accents graves (`` ` ``) reste entre accents graves.
- Dans une `liste`, quand un élément commence par une étiquette suivie d'un tiret long (« Le repère — … », « La poitrine — … »), garde l'étiquette et le tiret tels quels ; ne réécris que la suite.

Le fichier doit rester du TypeScript valide : chaînes entre guillemets doubles, **aucun guillemet double à l'intérieur** (utilise « » pour citer), pas de retour à la ligne dans une chaîne.

## Les faits : rien d'inventé, rien de perdu

- Chaque fait de l'original reste dans le même paragraphe : noms de robes, de créateurs, matières (satin mat, crêpe, mikado, dentelle de Chantilly…), coupes, détails (fente, traîne, bretelles amovibles…), morphologies (en O, en A, en V, en H, en 8, en X), prix, durées, adresses, chiffres.
- **N'ajoute aucun fait** : pas de nouvelle robe citée, pas de matière ou de détail que l'original n'attribue pas à cette robe, pas de chiffre, pas de promesse commerciale (« les plus demandées », « nos clientes adorent », « on vient de toute la France »…), pas de superlatif nouveau.
- Les citations entre « » sont les mots des fiches des robes : garde-les **mot pour mot**.
- Quand l'original dit que quelque chose n'existe pas à la boutique (pas de combinaison, pas de location, pas de col bateau…), garde l'information, dite avec tact.
- Ne dis jamais « nos créations », « notre maison de couture », « nos créateurs maison ». « L'atelier » et « nos couturières » ne s'emploient que si l'original les emploie à cet endroit.

## Le référencement : ce qu'il faut garder

- L'expression de recherche de la page (celle du `q` ou du `titre` : « robe de mariée sirène », « morphologie en A », « robe de mariée enceinte »…) : si un paragraphe la contient mot pour mot, **garde-la mot pour mot** dans ce paragraphe.
- Garde les **mots porteurs de sens** de chaque paragraphe (matières, coupes, détails, morphologies, occasions : mairie, hiver, église, champêtre…). Tu changes la tournure, pas le vocabulaire utile.
- Longueur : entre 85 % et 115 % de l'original, paragraphe par paragraphe.
- La réponse courte `r` doit rester une **réponse directe** à la question, dès la première phrase.

## La voix

- On parle **à la mariée** : « vous », « votre robe », « votre silhouette ». La boutique dit « nous », « nos robes », « notre showroom ».
- Sobre, précis, chaleureux. Des phrases nettes, un rythme. Le luxe est dans la justesse, pas dans l'emphase.
- Sensible quand c'est utile (le tombé d'une matière, un geste, la lumière, le moment de l'essayage), jamais décoratif.

À supprimer, parce que ce sont les tics qui font « texte généré » :

- les tournures de catalogue : « au catalogue », « du catalogue », « d'après sa fiche », « dit sa fiche », « sur sa fiche », « est rangée avec », « la boutique conseille » → « notre sélection », « chez nous », « nous vous conseillons », ou rien ;
- les annonces : « Voici ce qui… », « Voici comment… », « C'est faux : voici… », « Décryptage », « Tour d'horizon » ;
- les formules creuses : « le plus beau jour de votre vie », « écrin », « incontournable », « véritable », « sublimer » à répétition, « à couper le souffle », « rêve éveillé » ;
- les énumérations de mots-clés entre tirets ou en cascade ;
- les points d'exclamation, les émojis, les questions rhétoriques en série.

Si une phrase est déjà juste, simple et dans cette voix, **laisse-la** : ne change pas pour changer. Mais la plupart des paragraphes gagnent à être repris.

### Exemples (avant → après)

1. « Une robe de mariée bohème se reconnaît à ce qu'elle laisse respirer : une jupe en mousseline qui bouge, de la dentelle florale, des manches légères ou transparentes. »
   → « Une robe de mariée bohème ne se pose pas : elle respire. Une mousseline qui suit vos pas, une dentelle florale, des manches si légères qu'on les devine à peine. »

2. « La fluide est conseillée en premier aux morphologies en O, en V, en H, en 8 et en X, et vaut l'essai pour une morphologie en A. Hélène et Murielle sont indiquées, sur leurs fiches, pour toutes les morphologies. »
   → « La coupe fluide est notre premier conseil pour les morphologies en O, en V, en H, en 8 et en X, et mérite l'essai pour une morphologie en A. Hélène et Murielle vont à toutes les morphologies. »

3. « Pour une princesse en satin, le catalogue va vers le mikado, un satin épais et structuré. Kensington, de Casablanca Bridal, en est confectionnée entièrement. Elle est rangée avec les princesses, et s'essaie volontiers à côté des robes en satin. »
   → « Pour une princesse en satin, tournez-vous vers le mikado, ce satin épais et structuré. Kensington, de Casablanca Bridal, en est entièrement confectionnée. Une princesse, à essayer aux côtés de nos robes en satin. »

4. « Oui, si elle est faite à vos mesures : c'est le corsage qui la tient. Chaque robe du catalogue est confectionnée selon vos mensurations, puis ajustée aux retouches. »
   → « Oui, dès lors qu'elle est faite à vos mesures : c'est le corsage qui la tient. Chaque robe est confectionnée selon vos mensurations, puis ajustée aux retouches. »

5. « La sirène a la réputation d'être réservée aux silhouettes en sablier. C'est faux : voici à qui elle va, et à quelle condition. »
   → « On dit la sirène réservée aux silhouettes en sablier. Elle va pourtant à bien d'autres, à une condition. »

Typographie française : « guillemets » avec espaces, tiret long — avec espaces, 10ᵉ, 1 500 €. Garde les caractères tels qu'ils sont dans l'original (apostrophes droites `'`).

## Méthode

1. Lis le fichier en entier (outil Read).
2. Réécris-le en entier avec l'outil Write, au même chemin : tout ce qui ne doit pas changer est recopié **à l'identique**, seules les valeurs autorisées changent. Ne résume pas, ne tronque pas, n'écris jamais « … (suite inchangée) ».
3. Relis ton fichier : même première ligne, même dernière ligne, mêmes `slug`, `q`, `titre`, `description`, `liens` ; guillemets équilibrés.
4. Si tu as un second fichier, fais de même.

N'ouvre et ne modifie **aucun autre fichier**. Ne lance ni build, ni git, ni serveur.

## Compte rendu attendu

Trois à six lignes : les fichiers traités ; les passages que tu as laissés tels quels et pourquoi ; tout doute sur un fait (une phrase de l'original ambiguë que tu as gardée prudente) ; toute chaîne que tu n'as pas su réécrire sans casser une règle.
