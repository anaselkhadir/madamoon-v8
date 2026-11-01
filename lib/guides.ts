import { MAISON } from "@/lib/madamoon";
import type { Article } from "@/lib/questions";

/*
 * Les guides : des articles qui répondent à une question qu'une future
 * mariée tape dans un moteur, sous /guides/. Même gabarit que les pages
 * de la FAQ (« ArticleQuestion »), même règle : rien n'est inventé. Les
 * engagements — prix de départ, retouches, acompte, délais — sont ceux
 * que le site écrit déjà dans la FAQ, le parcours et les signatures.
 */

export type Guide = Article & {
  /* Le titre de la page (onglet, H1, balisage). */
  titre: string;
  /* La question telle qu'on la tape, et sa réponse courte, en tête. */
  q: string;
  r: string;
};

export const GUIDES: Guide[] = [
  {
    slug: "prix-robe-de-mariee-paris",
    titre: "Prix d'une robe de mariée à Paris",
    q: "Combien coûte une robe de mariée à Paris ?",
    r: `Chez MADAMOON, les prix commencent à partir de ${MAISON.prixDepart} pour une confection sur mesure, retouches comprises. Le prix d'une robe de mariée dépend de la maison, de la matière et du travail de confection ; il est donné en showroom, modèle par modèle.`,
    description:
      "Prix d'une robe de mariée à Paris : à partir de 1 500 € sur mesure, retouches comprises, chez MADAMOON. Ce que le prix comprend, ce qui le fait varier, comment on paie.",
    chapo:
      "« Combien coûte une robe de mariée ? » est la première question que l'on nous pose, et elle mérite une réponse claire plutôt qu'une promesse de robe pas chère. Voici ce que comprend le prix chez MADAMOON, ce qui le fait varier d'un modèle à l'autre, et comment se passe le paiement.",
    sections: [
      {
        titre: "Ce que le prix comprend",
        texte: [
          `Chaque robe choisie au showroom est réalisée à l'atelier selon vos mensurations, à partir de ${MAISON.prixDepart}. Les retouches sont comprises : nos couturières ajustent la robe jusqu'au dernier essayage.`,
          "L'essayage lui-même ne se paie pas : le showroom est privatisé pour vous pendant une heure, sur rendez-vous, et vous venez accompagnée de qui vous voulez.",
        ],
      },
      {
        titre: "Ce qui fait varier le prix d'une robe de mariée",
        texte: [
          "Trois choses, pour l'essentiel. La matière d'abord : une dentelle de Chantilly ou d'Alençon, un satin de soie, un crêpe, un tulle brodé ne demandent pas le même travail. La maison ensuite : Watters Designs, Casablanca Bridal, Olya Mak et Monica Loretti ont chacune leur gamme. Le modèle enfin : un corset perlé à la main, une traîne, des manches amovibles ou une surjupe détachable se paient dans la confection.",
          "Une robe simple n'est donc pas forcément moins chère qu'une robe en dentelle : sur une matière unie, l'ajustement se voit, et c'est précisément lui que l'on paie.",
        ],
      },
      {
        titre: "Comment se passe le paiement",
        texte: [
          "Un acompte est payé le jour de la prise des mensurations, quand la confection est lancée. Le solde est réglé le jour des retouches. Le montant de l'acompte et les moyens de paiement se précisent au showroom.",
        ],
      },
      {
        titre: "Robe de mariée pas chère, déstockage, soldes : ce que vous trouverez ici",
        texte: [
          "Pas de déstockage en ligne ni de robe soldée sur ce site : MADAMOON ne vend rien en ligne, et chaque robe est confectionnée pour vous, à vos mesures. Le prix n'est pas celui d'une robe en rayon, c'est celui d'une robe faite pour une seule personne.",
          "Si votre budget est une contrainte, dites-le au premier rendez-vous : le choix du modèle et de la matière se fait avec vous, et c'est la façon la plus sûre d'arriver à une robe de mariée au bon prix. Une robe de mariée pas cher, un outlet, un petit prix ou un tarif soldé : ce n'est pas ce que vous trouverez ici, et c'est dit avant le rendez-vous. Pour une location, posez la question au showroom.",
        ],
      },
      {
        titre: "Quand réserver, pour tenir le budget et les délais",
        texte: [
          "Prévoyez votre premier essayage idéalement huit à neuf mois avant la date du mariage : c'est le temps de la confection à vos mesures, des essayages et des retouches. Avec moins de temps, dites-le nous : nous trouvons presque toujours une solution.",
        ],
      },
      {
        titre: "Pas cher, location, outlet : les mots que l'on tape",
        texte: [
          "« Robe de mariée pas cher Paris », « location robe de mariée Paris », « outlet », « abordable », « petit prix » : ces recherches arrivent souvent ici. Ce que la boutique propose est une robe sur mesure, à Paris, en France, à partir de 1 500 €, retouches comprises — et rien d'autre : pas de location, pas d'outlet, pas de pressing. Quel prix pour quelle robe ? Celui que la maison vous donne au showroom, modèle par modèle. Prix moyen ? Il n'y a pas de moyenne utile : chaque maison, chaque marque, chaque tissu a le sien, et le catalogue en ligne n'affiche pas de prix — ourlet et jupon compris dans les retouches. Dégriffée, 500 euros, à proximité : non ; sur mesure et de qualité, oui.",
        ],
      },
    ],
    aRetenir: [
      `À partir de ${MAISON.prixDepart}, confection sur mesure, retouches comprises.`,
      "Le prix dépend de la matière, de la maison et du modèle ; il est donné en showroom.",
      "Acompte à la prise des mensurations, solde le jour des retouches.",
      "Rien n'est vendu en ligne : l'essayage privé est le point de départ.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Prendre rendez-vous pour un essayage" },
      { href: "/robes", label: "Toutes les robes de mariée" },
      { href: "/faq/prix-robe-de-mariee-sur-mesure", label: "La fourchette de prix, dans la FAQ" },
      { href: "/showroom", label: "Le showroom, Paris 10e" },
    ],
  },
  /* ————————————————————————————————————— quand acheter ————— */
  {
    slug: "quand-acheter-sa-robe-de-mariee",
    titre: "Quand acheter sa robe de mariée : délais et étapes",
    q: "Quand acheter sa robe de mariée ?",
    r: "Idéalement huit à neuf mois avant le mariage pour le premier essayage : c'est le temps de la confection à vos mesures, du deuxième essayage, des retouches et de l'essayage final. Avec moins de temps, dites-le nous : nous trouvons presque toujours une solution.",
    description:
      "Quand acheter sa robe de mariée ? Huit à neuf mois avant, idéalement : le calendrier d'une robe sur mesure chez MADAMOON, et que faire avec moins de temps.",
    chapo:
      "La question revient dès que la date est fixée : à quel moment acheter sa robe de mariée pour qu'elle soit prête, ajustée, sans courir ? Voici le calendrier d'une robe confectionnée sur mesure chez MADAMOON, ce qu'il faut prévoir à chaque étape, et ce qui se passe quand le mariage est dans quelques mois.",
    sections: [
      {
        titre: "Le calendrier d'une robe de mariée sur mesure",
        texte: [
          "Huit étapes séparent le premier rendez-vous du jour où vous repartez avec votre robe. Elles ne se compressent pas toutes : la confection à l'atelier prend le temps qu'il faut.",
        ],
        liste: [
          "Le rendez-vous : vous réservez votre premier essayage privé, idéalement huit à neuf mois avant le mariage.",
          "L'essayage privé : le showroom est privatisé pour vous pendant une heure, accompagnée si vous le souhaitez.",
          "Les mensurations : une fois votre choix fait, elles sont prises le jour même pour lancer la confection ; un acompte est versé.",
          "La confection : votre robe est réalisée à vos mesures à l'atelier.",
          "Le deuxième essayage : quand la robe est prête, vous venez vérifier s'il faut des ajustements.",
          "Les retouches : nos couturières ajustent chaque détail sur place ; elles sont incluses, et le solde est réglé ce jour-là.",
          "L'essayage final : il valide le tombé, la longueur, l'aisance.",
          "Le retrait : vous repartez avec votre robe, parfaitement ajustée.",
        ],
        ordonnee: true,
      },
      {
        titre: "Pourquoi huit à neuf mois",
        texte: [
          "Parce qu'une robe sur mesure n'est pas en rayon : elle est confectionnée après votre choix, selon vos mensurations, puis ajustée. Il faut le temps de l'atelier, celui de revenir essayer, celui des retouches, et une marge pour que rien ne se décide dans l'urgence. Neuf mois, c'est aussi le délai qui laisse le temps de réfléchir entre deux robes sans pénaliser le calendrier.",
        ],
      },
      {
        titre: "Il reste moins de six mois : que faire ?",
        texte: [
          "Prenez rendez-vous quand même, et dites-nous la date. Selon la robe, la maison et la saison, des solutions existent, et c'est au showroom qu'elles se trouvent — pas en attendant. Plus la date est proche, plus il compte d'arriver au premier essayage avec quelques coups de cœur repérés dans le catalogue.",
        ],
      },
      {
        titre: "Quand commencer à chercher",
        texte: [
          "Dès que la date est fixée : repérez les coupes et les robes qui vous plaisent, votre morphologie, le style du mariage. L'essayage en boutique, lui, se prévoit huit à neuf mois avant ; arriver avec des idées rend ce premier rendez-vous plus efficace.",
        ],
      },
      {
        titre: "Et les retouches, combien de temps ?",
        texte: [
          "Elles viennent après le deuxième essayage, une fois la robe confectionnée, et sont faites sur place par nos couturières, incluses dans la confection. Leur durée dépend de la robe et des ajustements : le calendrier se fixe avec la boutique, et l'essayage final se prévoit assez tôt pour que la robe soit retirée sereinement avant le mariage.",
        ],
      },
    ],
    aRetenir: [
      "Premier essayage idéalement huit à neuf mois avant le mariage.",
      "Trois essayages : pour choisir, quand la robe est prête, après les retouches.",
      "Acompte à la prise des mensurations, solde le jour des retouches.",
      "Moins de temps ? Prenez rendez-vous et dites-nous la date.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Prendre rendez-vous pour un essayage" },
      { href: "/guides/essayage-robe-de-mariee", label: "Comment se passe un essayage" },
      { href: "/guides/prix-robe-de-mariee-paris", label: "Le prix d'une robe de mariée à Paris" },
      { href: "/faq", label: "Toutes les questions pratiques" },
    ],
  },

  /* ———————————————————————————————————————— l'essayage ————— */
  {
    slug: "essayage-robe-de-mariee",
    titre: "Comment se passe un essayage de robe de mariée",
    q: "Comment se passe un essayage de robe de mariée ?",
    r: "Chez MADAMOON, sur rendez-vous : le showroom est privatisé pour vous pendant une heure, vous venez accompagnée de qui vous voulez et sans maquillage, vous essayez quelques robes dans des coupes différentes, et si vous choisissez, vos mensurations sont prises le jour même.",
    description:
      "Comment se passe un essayage de robe de mariée : rendez-vous, showroom privatisé une heure, quoi apporter, qui emmener. MADAMOON, Paris 10e.",
    chapo:
      "Le premier essayage est le moment où tout commence, et c'est souvent celui que l'on redoute un peu : combien de robes, avec qui, dans quelle tenue ? Voici comment il se déroule au showroom MADAMOON, de la prise de rendez-vous au moment où l'on prend vos mesures.",
    sections: [
      {
        titre: "Avant : prendre rendez-vous",
        texte: [
          "Le showroom reçoit sur rendez-vous uniquement, parce qu'il est privatisé pour chaque mariée. Le rendez-vous se prend en ligne, en quelques clics, ou par téléphone, idéalement huit à neuf mois avant le mariage. D'ici là, repérez quelques coupes et quelques robes du catalogue qui vous plaisent : le rendez-vous en sera plus efficace.",
        ],
      },
      {
        titre: "Le jour : une heure, le showroom pour vous",
        texte: [
          "Dès votre arrivée, le showroom est à vous pendant une heure, avec quelqu'un qui connaît chaque robe. Vous essayez, vous comparez, vous prenez le temps. Afin de préserver les robes, nous vous demandons de venir sans maquillage — nous sommes certaines que vous êtes belle au naturel.",
        ],
      },
      {
        titre: "Quoi apporter à son premier essayage",
        texte: [
          "Trois choses aident vraiment, et ne sont pas obligatoires :",
        ],
        liste: [
          "Des chaussures à la hauteur de talon envisagée, pour juger la longueur et le tombé.",
          "Une lingerie couleur chair, sans coutures, qui ne marque pas sous une sirène ou un satin.",
          "Quelques images des robes qui vous plaisent, du catalogue ou d'ailleurs.",
        ],
      },
      {
        titre: "Qui emmener",
        texte: [
          "Celles dont l'avis compte vraiment pour vous et qui vous aident à voir clair : une mère, une sœur, une amie qui vous connaît bien. Le showroom étant privatisé, vos proches sont les bienvenues pendant tout l'essayage. Trop d'avis brouillent le vôtre : quelques personnes suffisent.",
        ],
      },
      {
        titre: "Combien de robes essayer",
        texte: [
          "Il n'y a pas de bon nombre. Quelques robes bien choisies, dans des coupes différentes — une sirène, une princesse, une fluide —, valent mieux qu'une longue série : en une heure, on apprend vite ce qui vous va, et l'essayage sert à vous mener jusqu'à celle dans laquelle vous vous reconnaissez.",
        ],
      },
      {
        titre: "Après : les mensurations, puis deux autres essayages",
        texte: [
          "Si vous choisissez, vos mensurations sont prises le jour même pour lancer la confection à l'atelier, et un acompte est versé. Vous reviendrez essayer la robe quand elle sera prête, puis une dernière fois après les retouches, faites sur place et comprises. Si vous hésitez entre plusieurs robes, un nouveau rendez-vous permet de réessayer vos finalistes — en gardant un œil sur le calendrier.",
        ],
      },
    ],
    aRetenir: [
      "Sur rendez-vous, showroom privatisé une heure, accompagnée si vous le souhaitez.",
      "Venir sans maquillage ; apporter talons, lingerie chair et quelques images.",
      "Quelques robes dans des coupes différentes, plutôt qu'une longue série.",
      "Si vous choisissez : mensurations le jour même, puis deux essayages.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
      { href: "/showroom", label: "Le showroom, Paris 10e" },
      { href: "/guides/quand-acheter-sa-robe-de-mariee", label: "Quand acheter sa robe : les délais" },
      { href: "/coupes", label: "Les coupes à comparer" },
    ],
  },

  /* ————————————————————————————————————————— choisir ————— */
  {
    slug: "choisir-sa-robe-de-mariee",
    titre: "Comment choisir sa robe de mariée",
    q: "Comment choisir sa robe de mariée ?",
    r: "En partant de votre silhouette plutôt que des tendances : une morphologie ouvre des pistes de coupes, la coupe appelle une matière, la matière un style. Puis l'essayage tranche : quelques robes dans des coupes différentes, et celle dans laquelle vous vous reconnaissez.",
    description:
      "Comment choisir sa robe de mariée : morphologie, coupe, matière, style, saison, budget. La méthode du showroom MADAMOON, Paris 10e, étape par étape.",
    chapo:
      "Il y a des milliers de robes de mariée et une seule qui sera la vôtre. Pour la trouver sans s'y perdre, on avance dans l'ordre : la silhouette, la coupe, la matière, le style, le lieu et la saison, le budget — puis l'essayage, qui a toujours le dernier mot. Chaque étape a sa page sur ce site ; ce guide les relie.",
    sections: [
      {
        titre: "Partir de sa morphologie",
        texte: [
          "Les coupes fluides et trapèze allongent une morphologie en O, les princesses et les trapèzes équilibrent une morphologie en A, les sirènes légères dessinent des courbes sur une morphologie en H. Pour une silhouette en 8 ou en X, presque tout va. Une morphologie n'exclut jamais une robe : elle ouvre des pistes, et au showroom on essaie aussi ce qui n'était pas prévu.",
        ],
      },
      {
        titre: "Choisir la coupe",
        texte: [
          "Cinq coupes font le catalogue : la sirène, qui épouse le corps jusqu'aux genoux ; la princesse, au corsage ajusté et à la jupe ample ; le trapèze, qui s'évase doucement depuis la taille ; la fluide, qui tombe et bouge ; et les deux-en-un, à surjupe détachable, qui changent d'allure entre la cérémonie et la fête. Quelques robes courtes — Elin, River, Clover — se rangent dans ces coupes, pour la mairie.",
        ],
      },
      {
        titre: "Choisir la matière",
        texte: [
          "La matière fait la tenue et la saison. La dentelle — Chantilly, Alençon, Caterina — habille et fait le romantique ; le satin, le mikado et le crêpe tiennent et font le minimaliste ; la mousseline, la charmeuse et le tulle souple bougent et font le bohème. Une matière unie montre la coupe ; une dentelle la pardonne.",
        ],
      },
      {
        titre: "Choisir le style",
        texte: [
          "Bohème, minimaliste, romantique, vintage : le style est ce que la robe raconte, et il doit être le même que celui du mariage. Une fluide en mousseline pour une grange, un satin à manches longues pour une église en hiver, une robe courte en crêpe pour la mairie. Ce site a une page par style, chacune avec les robes du catalogue qui le portent.",
        ],
      },
      {
        titre: "Le lieu et la saison",
        texte: [
          "Pour un mariage en hiver : des manches longues, un col montant, des matières qui ont de la tenue — mikado, satin, crêpe — ou une cape sur les épaules. Pour un été à la campagne : de la mousseline, de la dentelle légère, pas de longue traîne. Pour une cérémonie religieuse, une cape ou une veste amovible couvre le temps de la cérémonie.",
        ],
      },
      {
        titre: "Le budget",
        texte: [
          `Chez MADAMOON, les prix commencent à partir de ${MAISON.prixDepart} pour une confection sur mesure, retouches comprises ; le prix de chaque modèle est donné en showroom. Si le budget est une contrainte, dites-le au premier rendez-vous : le choix du modèle et de la matière se fait avec vous.`,
        ],
      },
      {
        titre: "Puis l'essayage tranche",
        texte: [
          "Quelques robes bien choisies, dans des coupes différentes, en une heure de showroom privatisé. Si vous hésitez entre plusieurs robes, notez ce qui vous plaît dans chacune, écartez celle qui vous convainc le moins, et demandez-vous dans laquelle vous vous reconnaissez. Un nouveau rendez-vous permet de réessayer vos finalistes.",
        ],
      },
    ],
    aRetenir: [
      "Dans l'ordre : morphologie, coupe, matière, style, saison, budget.",
      "Une morphologie n'exclut jamais une robe : elle ouvre des pistes.",
      "Une matière unie montre la coupe ; une dentelle la pardonne.",
      "L'essayage a le dernier mot : quelques robes, des coupes différentes.",
    ],
    liens: [
      { href: "/morphologies", label: "Quelle robe pour ma morphologie" },
      { href: "/coupes", label: "Les coupes de robes de mariée" },
      { href: "/guides/tissus-robe-de-mariee", label: "Les tissus d'une robe de mariée" },
      { href: "/rendez-vous", label: "Prendre rendez-vous pour un essayage" },
    ],
  },

  /* ————————————————————————————————————————— tissus ————— */
  {
    slug: "tissus-robe-de-mariee",
    titre: "Les tissus d'une robe de mariée : tulle, dentelle, satin",
    q: "Quels sont les tissus d'une robe de mariée ?",
    r: "Le tulle et l'organza pour le volume et la transparence, la mousseline et la georgette pour le mouvement, la dentelle pour le décor, le satin, le mikado et le crêpe pour la tenue. Le catalogue MADAMOON les travaille tous, souvent plusieurs sur une même robe.",
    description:
      "Tulle, organza, dentelles de Chantilly et d'Alençon, satin, mikado, crêpe : les tissus d'une robe de mariée, et les robes MADAMOON qui les portent.",
    chapo:
      "Les fiches de robes parlent de tulle pailleté, d'organza, de dentelle de Chantilly, de mikado, de charmeuse — des mots qui disent la tenue, le poids et la lumière d'une robe de mariée, mais que l'on ne connaît pas toujours. Voici ce qu'ils signifient, et les robes du catalogue qui les portent.",
    sections: [
      {
        titre: "Le tulle : le volume et l'illusion",
        texte: [
          "Un filet très fin et léger, que l'on superpose pour faire du volume : la jupe de Carrie se compose de plusieurs couches de tulle pailleté ; celles de Dolores et d'Alicia sont en tulle et dentelle. Très souple, il fait aussi des fluides, comme Calla ou Agnessa. Couleur chair, il devient le tulle illusion des dos transparents de Venus, d'Uma ou de Montana. Une robe de mariage en tulle se choisit donc par ce qu'on lui demande : du volume, de la douceur ou de la transparence.",
        ],
      },
      {
        titre: "L'organza : la transparence qui tient",
        texte: [
          "Plus raide que le tulle et plus brillant, l'organza garde le volume sans le poids. Santana marie organza et tulle sur sa taille basque ; Fortune est en crêpe stretch et organza satin, un organza plus lustré.",
        ],
      },
      {
        titre: "La mousseline et la georgette : le mouvement",
        texte: [
          "Deux voiles légers qui tombent et bougent — ceux des robes bohèmes. Hélène et Murielle ont une jupe en mousseline ; Maribel une mousseline stretch ; Addison des fleurs en mousseline appliquées à la main. La georgette, un peu plus mate et crêpée, habille Zina en version stretch.",
        ],
      },
      {
        titre: "Les dentelles : Chantilly, Alençon, Caterina, Highclare",
        texte: [
          "La dentelle de Chantilly est fine et légère, à motifs floraux : Oksana, Charlize, Shiloh et Aster. La dentelle d'Alençon, plus en relief, cernée d'un cordonnet : Summer. Les dentelles Caterina de Charlotte et de Clover, Highclare de Calla, Cassie de Mitra sont des dentelles de la maison Watters Designs. La dentelle brodée de Seraphina et la dentelle florale d'Hélène ou de Santana complètent la liste.",
        ],
      },
      {
        titre: "Satin, mikado, crêpe, charmeuse : la tenue",
        texte: [
          "Les matières unies. Le satin mat, le satin de soie et le mikado — un satin épais et structuré — font les robes qui tiennent : Sheridan, Venus, Montana, Dove, Addison, Kensington. Le crêpe est souple et épouse le corps : Bondi, Milan, Mira, Elin. La charmeuse, un satin très léger et fluide : Adularia, Amaryllis, Ryle, Riviera.",
        ],
      },
      {
        titre: "Jacquard, néoprène, Dupioni : les textures",
        texte: [
          "Le jacquard est tissé à motifs, souvent floraux : Guinevere, Monica, Trinity. Le néoprène, lisse et ferme, sculpte la sirène minimaliste d'Enid. Le Dupioni est une soie texturée, irrégulière, celle du corset structuré d'Ember.",
        ],
      },
      {
        titre: "Quel tissu pour quelle saison ?",
        texte: [
          "L'hiver aime ce qui tient et couvre : mikado, satin, crêpe, manches longues en dentelle. L'été aime ce qui respire : mousseline, georgette, tulle souple, dentelle légère. Et chaque robe du catalogue est confectionnée à vos mesures, quelle que soit sa matière.",
        ],
      },
      {
        titre: "Quel tissu pour l'automne, le printemps, la plage",
        texte: [
          "Automne et hiver : satin, mikado, crêpe, dentelle sur satin, manches. Printemps et été : tulle, mousseline, organza, dentelle sur tulle, bustier ou bretelles fines — le plumetis, un tulle à pois, n'est pas au catalogue. Plage et jardin : mousseline et charmeuse, qui bougent. Une dentelle brodée coûte plus qu'un crêpe : le tissu fait le prix, et le prix se donne au showroom — pas de tissu au rouleau, pas de tissu pas cher, des robes finies à vos mesures, blanches ou ivoire.",
        ],
      },
    ],
    aRetenir: [
      "Tulle et organza : le volume et la transparence.",
      "Mousseline, georgette, charmeuse : le mouvement des fluides.",
      "Dentelles de Chantilly, d'Alençon, Caterina : le décor.",
      "Satin, mikado, crêpe : la tenue des robes unies.",
    ],
    liens: [
      { href: "/matieres/dentelle", label: "Les robes de mariée en dentelle" },
      { href: "/matieres/satin", label: "Les robes de mariée en satin" },
      { href: "/styles/boheme", label: "Les robes de mariée bohèmes, en mousseline" },
      { href: "/robes", label: "Toutes les robes de mariée" },
    ],
  },

  /* ————————————————————————————————————————— enceinte ————— */
  {
    slug: "robe-de-mariee-enceinte",
    titre: "Robe de mariée pour une femme enceinte",
    q: "Quelle robe de mariée quand on est enceinte ?",
    r: "Une robe qui suit : fluide, en mousseline, en charmeuse ou en satin mat souple, sans corsage qui comprime. Au catalogue, Mathilda, de Monica Loretti, est pensée pour la femme enceinte ; et chaque robe étant confectionnée à vos mesures, le calendrier des essayages et des retouches se fixe avec la boutique en fonction du terme.",
    description:
      "Robe de mariée enceinte : Mathilda, pensée pour la femme enceinte, les fluides qui suivent la grossesse, mensurations et retouches chez MADAMOON, Paris 10e.",
    chapo:
      "Se marier enceinte, c'est choisir une robe pour une silhouette qui change entre le premier essayage et le jour du mariage. La bonne nouvelle : une robe de mariée de grossesse n'a rien à céder sur la beauté, et une robe sur mesure est faite pour s'ajuster. Voici ce que propose le catalogue, et comment la boutique s'organise.",
    sections: [
      {
        titre: "Mathilda, pensée pour la femme enceinte",
        texte: [
          "Mathilda, de Monica Loretti, est d'après sa fiche une robe de mariée fluide et romantique spécialement pensée pour la femme enceinte : elle permet de célébrer le mariage avec confort et style, pour une silhouette douce, élégante et intemporelle. Elle est indiquée pour les six morphologies et rangée avec les fluides.",
        ],
      },
      {
        titre: "Les coupes qui suivent",
        texte: [
          "La fluide d'abord : une taille placée haut ou libre, une jupe qui tombe depuis la poitrine ou la taille, sans jamais comprimer. Dove, en satin mat, promet d'après sa fiche « l'élégance intemporelle et le confort absolu » ; Maribel est en mousseline stretch ; Adularia et Ryle en charmeuse légère. Les trapèzes amples, comme Calla en tulle très souple, s'essaient aussi. La sirène, qui épouse les hanches, est la coupe la moins adaptée.",
        ],
      },
      {
        titre: "Les matières qui suivent",
        texte: [
          "Les matières souples et légères : mousseline, georgette, charmeuse, tulle fluide, satin mat souple, crêpe stretch. Les fiches de Maribel, Zina, Fortune et Sheridan mentionnent une matière stretch ou une doublure extensible — un détail qui compte quand la silhouette évolue.",
        ],
      },
      {
        titre: "Mensurations et retouches : comment ça se passe",
        texte: [
          "Chez MADAMOON, les mensurations sont prises le jour du choix, la robe est confectionnée à vos mesures, puis ajustée aux retouches, faites sur place et comprises. Pour une mariée enceinte, le calendrier des essayages et des retouches se fixe avec la boutique en fonction du terme et de la date du mariage : dites-les nous dès la prise de rendez-vous, c'est ce qui permet de prévoir les ajustements au plus près du jour.",
        ],
      },
      {
        titre: "Pour un mariage civil",
        texte: [
          "Pour la mairie, une robe courte et souple est une option : Elin, en crêpe, est pensée d'après sa fiche pour un mariage civil, et River, courte au décolleté carré, offre une sensation de légèreté. Pour la cérémonie et la fête, on revient aux fluides.",
        ],
      },
      {
        titre: "Enceinte en hiver, et « autour de moi »",
        texte: [
          "En hiver, Mathilda se porte avec l'étole ou la veste que vous apportez ; au showroom, on l'essaie assise et debout, et l'on prend les mensurations le plus tard possible. Une robe de maternité pour le mariage, c'est elle. « Robe de mariée enceinte autour de moi » : à Paris, le showroom est au 234 rue du Faubourg Saint-Martin, dans le 10ᵉ — pas chère au sens du prêt-à-porter, non ; faite à vos mesures du moment, oui.",
        ],
      },
    ],
    aRetenir: [
      "Mathilda, de Monica Loretti, est pensée pour la femme enceinte.",
      "Fluides et trapèzes amples, en mousseline, charmeuse ou satin mat souple.",
      "Mensurations le jour du choix ; retouches comprises, sur place.",
      "Dites-nous le terme et la date dès le rendez-vous : le calendrier s'adapte.",
    ],
    liens: [
      { href: "/robes/mathilda", label: "Mathilda, la robe pensée pour la femme enceinte" },
      { href: "/coupes/fluide", label: "Les robes de mariée fluides" },
      { href: "/guides/quand-acheter-sa-robe-de-mariee", label: "Les délais d'une robe sur mesure" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ————————————————————————————————————————— vintage ————— */
  {
    slug: "robe-de-mariee-vintage",
    titre: "Robe de mariée vintage et rétro : années 20, 30, 50, 60, 90",
    q: "Où trouver une robe de mariée vintage à Paris ?",
    r: "MADAMOON ne vend pas de robes anciennes : toutes les robes du catalogue sont neuves et confectionnées à vos mesures. Mais plusieurs ont l'esprit rétro que l'on cherche sous le mot vintage — Tessa a d'après sa fiche un « charme vintage-chic » —, et chaque décennie a ses codes, que l'on retrouve dans le catalogue.",
    description:
      "Robe de mariée vintage à Paris : pas de robes anciennes chez MADAMOON, mais l'esprit des années 20, 50 et 90 dans des robes neuves, sur mesure.",
    chapo:
      "« Vintage » dit deux choses : une robe ancienne, de seconde main, ou une robe neuve à l'esprit d'une autre époque. MADAMOON ne vend que la seconde — des robes confectionnées à vos mesures, dont certaines portent les codes des années 20, des années 50 ou des années 90. Voici lesquelles, décennie par décennie, sans rien inventer sur les fiches.",
    sections: [
      {
        titre: "Vintage : robe ancienne ou esprit rétro ?",
        texte: [
          "Une robe de mariée vintage au sens strict a déjà été portée ; elle se trouve chez des dépôts-ventes spécialisés, pas ici. Ce que propose le catalogue, c'est l'esprit : des coupes, des matières et des détails qui évoquent une décennie, sur une robe neuve, confectionnée pour vous, retouches comprises. Cela vaut aussi pour la robe victorienne à col montant, dont Chastity garde l'esprit, et pour les années 70 bohèmes, qui ont leur page.",
        ],
      },
      {
        titre: "Années 20 et 30 : perles, coupe droite, charleston",
        texte: [
          "Les années folles aiment la coupe droite, les perles et les matières qui glissent. Pour cet esprit, regardez Bella — satin orné de perles, manches longues, dos nu, « chic, intemporelle et à l'esprit couture » d'après sa fiche —, Amaryllis, coupe droite ou sirène en charmeuse à boutons, Adularia, fluide en charmeuse, ou Agnessa et son corset perlé à la main sur une jupe de tulle. Rien de tout cela n'est une robe charleston à franges : c'est l'allure qui s'en approche.",
        ],
      },
      {
        titre: "Années 50 et 60 : taille marquée, jupe ample, col net",
        texte: [
          "Le New Look et les sixties aiment la taille marquée, la jupe qui tourne, les cols carrés ou bateau et les robes courtes. Pour cet esprit : Dolores et son col carré, Clover, robe courte florale à surjupe, River, courte au décolleté carré, Elin, courte en crêpe pour un mariage civil. Les princesses à corsage ajusté, comme Charlotte ou Sienna, portent aussi cette taille dessinée.",
        ],
      },
      {
        titre: "Années 90 : minimalisme, satin, fourreau",
        texte: [
          "La robe de mariée vintage des années 90 est la plus cherchée aujourd'hui : un fourreau, un satin ou un crêpe uni, un décolleté droit, pas de dentelle. Au catalogue, c'est le territoire des minimalistes : Bondi en crêpe aux épaules dégagées, Enid en néoprène au dos boutonné, Milan en crêpe léger, Dove en satin mat, Bella en version fourreau.",
        ],
      },
      {
        titre: "Tessa, le vintage-chic du catalogue",
        texte: [
          "Une seule fiche emploie le mot : Tessa, de Casablanca Bridal, « au charme vintage-chic », une sirène au corset structuré, avec une surjupe détachable et des bretelles amovibles pour un autre look. Elle est rangée avec les deux-en-un.",
        ],
      },
      {
        titre: "Style Gatsby, dentelle rétro, mariage civil vintage",
        texte: [
          "Le style Gatsby — années 20, perles, coupe droite — se retrouve chez Bella et Amaryllis ; une dentelle rétro, chez Chastity, col montant et manches longues ; pour un mariage civil vintage, une courte années 50 comme Clover ou Elin. Les années 40 et 80, elles, n'ont pas de robe au catalogue qui en porte l'esprit : la tenue se joue alors sur la coiffure et les accessoires.",
        ],
      },
    ],
    aRetenir: [
      "Pas de robes anciennes : des robes neuves, à l'esprit rétro, sur mesure.",
      "Années 20-30 : Bella, Amaryllis, Adularia, Agnessa.",
      "Années 50-60 : Dolores, Clover, River, Elin.",
      "Années 90 : Bondi, Enid, Milan, Dove — et Tessa pour le vintage-chic.",
    ],
    liens: [
      { href: "/robes/tessa", label: "Tessa, au charme vintage-chic" },
      { href: "/styles/minimaliste", label: "Les robes minimalistes, esprit années 90" },
      { href: "/robes/clover", label: "Clover, robe courte florale à surjupe" },
      { href: "/robes", label: "Toutes les robes de mariée" },
    ],
  },

  /* ——————————————————————————————————— ivoire ou blanc ————— */
  {
    slug: "ivoire-ou-blanc",
    titre: "Robe de mariée ivoire ou blanche : quelle couleur choisir",
    q: "Robe de mariée ivoire ou blanc : que choisir ?",
    r: "L'ivoire, légèrement chaud, flatte la plupart des carnations et photographie plus doux ; le blanc pur, plus franc, va aux peaux très claires ou très foncées et aux matières mates. On tranche à l'essayage, en lumière du jour, robe sur soi — et les coloris proposés pour chaque modèle se voient au showroom.",
    description:
      "Robe de mariée ivoire ou blanche : la différence, quelle teinte selon sa carnation et sa matière, et comment la vérifier à l'essayage. MADAMOON, Paris 10e.",
    chapo:
      "Sur une photo, toutes les robes de mariée sont blanches. Dans un showroom, aucune ne l'est tout à fait : blanc, blanc cassé, ivoire, champagne — des nuances à quelques tons d'écart qui changent le visage. Voici ce que ces mots désignent, comment choisir entre ivoire et blanc, et pourquoi la décision se prend robe sur soi.",
    sections: [
      {
        titre: "Blanc, blanc cassé, ivoire, champagne : les mots",
        texte: [
          "Le blanc pur est sans nuance, froid, le plus lumineux. Le blanc cassé est à peine adouci. L'ivoire tire vers le crème, chaud, et c'est la teinte la plus répandue des robes de mariée. Le champagne va plus loin vers le beige doré ; le blush, vers le rosé. D'une maison à l'autre, le même mot ne désigne pas exactement la même teinte : seul l'échantillon fait foi.",
        ],
      },
      {
        titre: "Choisir selon sa carnation",
        texte: [
          "Le blanc pur se détache sur une peau très claire au sous-ton froid, ou très foncée ; sur une peau claire au sous-ton chaud, il peut durcir le teint. L'ivoire réchauffe et flatte la plupart des carnations, en particulier les peaux dorées, mates ou qui bronzent. Le champagne va aux peaux dorées et aux cheveux foncés. En cas de doute, l'ivoire est le choix le plus sûr.",
        ],
      },
      {
        titre: "Selon la matière",
        texte: [
          "La même teinte n'a pas la même couleur sur un satin mat, une dentelle ou un tulle : le satin la rend plus dense, la dentelle sur tulle couleur chair la mélange à la peau, la mousseline la rend plus légère. Les robes qui marient deux matières — un satin et une dentelle, comme Sheridan ou Charlize — jouent souvent sur deux tons très proches.",
        ],
      },
      {
        titre: "Et les robes de couleur ?",
        texte: [
          "Pour une robe de mariée de couleur, un mariage civil en couleur ou un détail coloré — Clover est brodée de fleurs de couleur d'après sa fiche —, posez la question au showroom : les coloris proposés dépendent du modèle et de la maison, et se confirment pièce par pièce.",
        ],
      },
      {
        titre: "Comment vérifier : à l'essayage, en lumière du jour",
        texte: [
          "Une teinte se juge robe sur soi, sans maquillage — c'est aussi ce que demande le showroom pour préserver les robes —, près d'une fenêtre, et à côté d'une autre teinte pour comparer. C'est ce que permet l'heure d'essayage privé : voir l'ivoire et le blanc l'un après l'autre, sur vous.",
        ],
      },
      {
        titre: "Rouge, rose, bleu, noir, vert, pastel : les robes de couleur que l'on cherche",
        texte: [
          "Robe de mariée rouge, rose poudré, bleu ciel, noire, verte, pastel, colorée : les recherches sont nombreuses, le catalogue répond peu. Les robes y sont blanches ou ivoire ; la seule touche de couleur est brodée sur Clover, et les coloris proposés par chaque maison se voient au showroom. Grande taille, manches ou bustier, la question de la couleur se pose de la même façon : à l'essayage, en lumière du jour. Bleu marine ou bleu pâle, jaune, lilas, argentée ou pailletée, pour l'hiver ou l'été : la broderie de couleur de Clover reste l'exception, et le blanc cassé la réponse la plus fréquente.",
        ],
      },
    ],
    aRetenir: [
      "L'ivoire, chaud, flatte la plupart des carnations ; le blanc pur, les peaux très claires ou très foncées.",
      "La matière change la teinte : satin dense, dentelle mêlée à la peau, mousseline légère.",
      "Les coloris de chaque modèle se voient au showroom, pièce par pièce.",
      "On tranche à l'essayage, sans maquillage, en lumière du jour.",
    ],
    liens: [
      { href: "/guides/essayage-robe-de-mariee", label: "Comment se passe un essayage" },
      { href: "/matieres/satin", label: "Les robes de mariée en satin" },
      { href: "/matieres/dentelle", label: "Les robes de mariée en dentelle" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ————————————————————————————————————————————— la traîne —————
   * Vague F. Les traînes sont décrites sur les fiches — longue, majestueuse,
   * spectaculaire, légère, douce, ou absente — sans longueur chiffrée :
   * le guide reprend ces mots et renvoie au showroom pour la mesure. */
  {
    slug: "traine-robe-de-mariee",
    titre: "La traîne d'une robe de mariée : longue ou sans",
    q: "Quelle traîne pour sa robe de mariée ?",
    r: "Celle que le lieu et la journée supportent : une longue traîne pour une cérémonie à l'église ou dans un grand lieu, une traîne légère ou aucune pour la mairie, le jardin et la danse. Au catalogue, Santana, Venus, Chastity, Summer et Guinevere portent une longue traîne ; Maribel et Mira une traîne légère ; les robes bohèmes et les courtes s'en passent. La longueur exacte se voit au showroom, robe sur soi.",
    description:
      "Traîne de robe de mariée : longueurs, robes du catalogue à longue traîne ou sans, comment la relever pour la soirée. À voir au showroom MADAMOON, Paris 10e.",
    chapo:
      "La traîne est ce que la robe laisse derrière elle : quelques centimètres qui balayent le sol, ou plusieurs mètres qui remplissent une allée. Elle change l'allure, le poids et la façon de marcher. Voici les mots pour en parler, les robes du catalogue qui en ont une — ou pas —, et ce qu'on en fait une fois la cérémonie passée.",
    sections: [
      {
        titre: "Les longueurs de traîne : les mots",
        texte: [
          "On parle de traîne balayette quand elle effleure le sol de quelques centimètres ; de traîne chapelle quand elle s'étire d'un mètre environ ; de traîne cathédrale au-delà. Les fiches des maisons ne chiffrent pas : elles disent « longue traîne », « traîne majestueuse », « traîne légère ». Au showroom, on la mesure sur vous, et on la fait marcher.",
        ],
      },
      {
        titre: "Les robes à longue traîne du catalogue",
        texte: [
          "Santana se prolonge « jusqu'à une spectaculaire traîne et un ourlet festonné ». Venus, en satin mat, a une traîne majestueuse et un dos en dentelle. Chastity, en dentelle à manches longues, finit sur une longue traîne « majestueuse et luxueuse ». Summer, sirène en dentelle d'Alençon, et Guinevere, princesse en jacquard, portent elles aussi une longue traîne. Fancy s'évase « en une spectaculaire traîne transparente en dentelle ». Et chez Enid comme chez Bondi, une rangée de boutons descend du corsage jusqu'au bout de la traîne.",
        ],
      },
      {
        titre: "Traîne légère, ou pas de traîne",
        texte: [
          "Maribel finit sur une traîne légère, Mira « s'ouvre délicatement sur une douce traîne ». Les robes bohèmes — Hélène, Murielle, Ryle — préfèrent une traîne courte ou aucune : une robe qui doit marcher dans l'herbe ne s'encombre pas. Les robes courtes, Elin, River, Clover et Gabriel, n'en ont pas, par définition.",
        ],
      },
      {
        titre: "Relever la traîne pour la soirée",
        texte: [
          "Une longue traîne se relève après la cérémonie, par une attache cousue sous la jupe, pour danser sans la piétiner. Cela se prévoit aux retouches, qui sont comprises : dites au premier rendez-vous ce que vous ferez de la robe le soir, et la traîne sera pensée pour les deux moments. Les deux-en-un vont plus loin, en retirant toute la surjupe. Comment attacher ou remonter la traîne ? Par une boucle au poignet ou une attache sous la jupe, cousue aux retouches. Un nœud dans le dos, une ceinture ou une broche sont des accessoires, pas des pièces du catalogue ; le voile se choisit après la traîne ; et la traîne royale, c'est la cathédrale.",
        ],
      },
      {
        titre: "Traîne et lieu de la cérémonie",
        texte: [
          "Église, grand escalier, longue allée : la traîne a de la place et se voit. Mairie, jardin, plage, restaurant : elle gêne plus qu'elle ne sert, et une traîne légère ou une robe sans traîne fait mieux la journée. Entre les deux, le bon réglage se décide au showroom, debout, en marchant, puis assise.",
        ],
      },
      {
        titre: "Traîne pour un mariage civil, cape, jupe drapée, nœud : les variantes",
        texte: [
          "Pour un mariage civil, pas de traîne, ou une traîne légère : Maribel, Mira, ou une courte. La cape, le nœud dans le dos, la jupe drapée ou asymétrique ne sont pas au catalogue tels quels — la jupe amovible de Gabriel et la surjupe de Clover en tiennent lieu ; le haut reste celui de la robe, et la traîne s'attache en un geste pour la soirée. Un top ou une tenue différente pour le soir : c'est le deux-en-un qui le permet, sans changer de robe.",
        ],
      },
    ],
    aRetenir: [
      "Longue traîne : Santana, Venus, Chastity, Summer, Guinevere, Fancy.",
      "Traîne légère : Maribel, Mira. Sans traîne : les bohèmes et les courtes.",
      "Elle se relève pour la soirée, aux retouches, comprises.",
      "Sa longueur se mesure sur vous, au showroom.",
    ],
    liens: [
      { href: "/robes/santana", label: "Santana, princesse à la spectaculaire traîne" },
      { href: "/coupes/deux-en-un", label: "Les deux-en-un, qui retirent la surjupe" },
      { href: "/styles/boheme", label: "Les robes bohèmes, sans longue traîne" },
      { href: "/details/courte", label: "Les robes de mariée courtes" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ————————————————————————————————————————————— après 40 ans —————
   * Vague F. Un conseil, pas une gamme : le catalogue n'a pas de robe
   * « pour » un âge, et la page le dit. Les robes citées le sont pour
   * ce que leurs fiches décrivent — manches, cols, matières. */
  {
    slug: "robe-de-mariee-apres-40-ans",
    titre: "Robe de mariée à 40, 50 ou 60 ans",
    q: "Quelle robe de mariée à 40, 50 ou 60 ans ?",
    r: "Celle qui vous ressemble, pas celle d'un âge : le catalogue n'a aucune robe « pour » les 40, 50 ou 60 ans. Ce qui aide, c'est la matière qui tient — crêpe, satin mat, mikado —, une coupe qui va à toutes — trapèze, fluide —, et des manches ou un dos couvert si on le souhaite : Montana, Pendant, Chastity. Pour un second mariage ou une mairie, une courte comme Elin, ou une longue simple comme Marie. L'essayage tranche.",
    description:
      "Robe de mariée après 40, 50 ou 60 ans : matières, coupes, manches et cols qui aident, second mariage, mariage civil. Conseils du showroom MADAMOON, Paris 10e.",
    chapo:
      "On nous demande souvent quelle robe de mariée porter à 40 ans, à 50 ans, à 60 ans, pour un premier ou un second mariage. La réponse courte : la même qu'à trente, choisie avec le même soin. La réponse longue tient en quelques repères — matière, coupe, ce que l'on veut couvrir — et en une heure d'essayage.",
    sections: [
      {
        titre: "Il n'y a pas de robe « pour son âge »",
        texte: [
          "Aucune fiche du catalogue ne mentionne un âge, et c'est normal : une robe se choisit pour une silhouette, un lieu, une envie. Une mariée de 50 ans peut porter une sirène en dentelle comme une mariée de 28, si c'est elle. Ce qui change avec les années, c'est souvent ce que l'on veut montrer, et ce que l'on veut couvrir — et là, le catalogue a de quoi répondre.",
        ],
      },
      {
        titre: "Couvrir sans alourdir : manches, cols, dos",
        texte: [
          "Les manches longues en dentelle couvrent le bras en le laissant deviner : Montana, sirène en satin mat aux manches en dentelle et au dos illusion ; Pendant, trapèze en dentelle à manches longues ; Seraphina, princesse à manches longues brodées. Le col montant de Chastity, en dentelle, couvre le décolleté avec un charme traditionnel. Bella couvre le buste et montre le dos. Toutes ces robes ont leur page : les manches longues et le dos nu.",
        ],
      },
      {
        titre: "Les coupes qui vont à toutes : trapèze et fluide",
        texte: [
          "Le trapèze s'ouvre en A depuis la taille et va, d'après les fiches, à toutes les morphologies : Charlotte en dentelle, Hera en satin, Calla en tulle souple. La fluide suit le mouvement sans contraindre : Marie, « ligne intemporelle » chez Monica Loretti, Adularia en charmeuse. Une sirène en crêpe, comme Bondi ou Milan, dessine le corps sans le serrer. Ce que l'on évite plutôt, ce n'est pas une coupe : c'est le volume que l'on ne souhaite pas.",
        ],
      },
      {
        titre: "Les matières qui tiennent",
        texte: [
          "Le crêpe, le satin mat et le mikado tombent net et ne marquent pas : Dove en satin mat, Kensington en mikado, Fern en mikado brodé de fleurs de perles, Bondi et Milan en crêpe. Les dentelles fines — Chantilly, Alençon — habillent sans charger. Le tulle en couches et les paillettes restent possibles, pour qui les aime ; elles ne sont simplement pas le premier réflexe.",
        ],
      },
      {
        titre: "Second mariage, mariage civil",
        texte: [
          "Un second mariage se fête souvent à la mairie, avec moins de monde et plus de liberté. Une robe courte comme Elin, « parfaite pour une cérémonie civile », ou River, courte au décolleté carré, y est à sa place ; une longue simple comme Marie ou Adularia aussi. Ivoire plutôt que blanc pur ? C'est affaire de carnation, pas d'âge : le guide ivoire ou blanc en parle, et le showroom tranche en lumière du jour.",
        ],
      },
      {
        titre: "L'essayage tranche",
        texte: [
          "Une heure, le showroom pour vous seule, avec qui vous voulez. On essaie ce qu'on avait prévu, puis ce qu'on n'avait pas prévu : c'est souvent là que la robe se trouve. Chaque robe est ensuite confectionnée à vos mesures, retouches comprises — la seule règle qui vaille à tout âge.",
        ],
      },
    ],
    aRetenir: [
      "Aucune robe « pour son âge » au catalogue : on choisit pour soi.",
      "Pour couvrir : manches longues (Montana, Pendant, Seraphina), col montant (Chastity).",
      "Coupes qui vont à toutes : trapèze, fluide ; sirène en crêpe.",
      "Second mariage ou mairie : Elin, River, Marie, Adularia.",
    ],
    liens: [
      { href: "/details/manches-longues", label: "Les robes de mariée à manches longues" },
      { href: "/styles/mariage-civil", label: "Robe pour un mariage civil" },
      { href: "/details/courte", label: "Les robes de mariée courtes" },
      { href: "/guides/ivoire-ou-blanc", label: "Ivoire ou blanc" },
      { href: "/morphologies", label: "Les morphologies" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },
];

export const guideParSlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
