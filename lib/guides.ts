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
  /* Un chiffre à poser en grand dans le cercle du premier chapitre, sur
   * ordinateur : le prix de départ, pour le guide des prix. Décoratif —
   * il redit ce que le texte écrit déjà. Sans lui, une photographie. */
  chiffre?: { avant: string; valeur: string; apres: string };
};

export const GUIDES: Guide[] = [
  {
    slug: "prix-robe-de-mariee-paris",
    chiffre: { avant: "À partir de", valeur: MAISON.prixDepart.replace(/\s*€$/, ""), apres: "euros" },
    titre: "Prix d'une robe de mariée à Paris",
    q: "Combien coûte une robe de mariée à Paris ?",
    r: `Chez MADAMOON, les prix commencent à partir de ${MAISON.prixDepart} pour une confection sur mesure, retouches comprises. Le prix d'une robe de mariée dépend de la maison, de la matière et du travail de confection ; nous vous le donnons au showroom, modèle par modèle.`,
    description:
      "Prix d'une robe de mariée à Paris : à partir de 1 500 € sur mesure, retouches comprises, chez MADAMOON. Ce que le prix comprend, et ce qui le fait varier.",
    chapo:
      "« Combien coûte une robe de mariée ? » C'est la première question que l'on nous pose, et elle mérite une réponse claire plutôt qu'une promesse de robe de mariée pas chère. Ce que le prix comprend chez MADAMOON, ce qui le fait varier d'un modèle à l'autre, la façon dont se passe le paiement : tout est dit ici, simplement.",
    sections: [
      {
        titre: "Ce que le prix comprend",
        texte: [
          `La robe que vous choisissez au showroom est réalisée à l'atelier, selon vos mensurations, à partir de ${MAISON.prixDepart}. Les retouches sont comprises : nos couturières ajustent votre robe jusqu'au dernier essayage.`,
          "L'essayage, lui, ne se paie pas : sur rendez-vous, le showroom est privatisé pour vous pendant une heure, et vous y venez accompagnée de qui vous voulez.",
        ],
      },
      {
        titre: "Ce qui fait varier le prix d'une robe de mariée",
        texte: [
          "Trois choses, pour l'essentiel. La matière, d'abord : une dentelle de Chantilly ou d'Alençon, un satin de soie, un crêpe, un tulle brodé n'appellent pas le même travail. La maison, ensuite : Watters Designs, Casablanca Bridal, Olya Mak et Monica Loretti ont chacune leur gamme. Le modèle, enfin : un corset perlé à la main, une très grande traîne, des manches amovibles ou une surjupe détachable se retrouvent dans le prix de la confection.",
        ],
      },
      {
        titre: "Comment se passe le paiement",
        texte: [
          "Vous versez un acompte le jour de la prise de vos mensurations, au moment où la confection est lancée. Le solde se règle au moment du retrait de la robe de mariée, après retouches. Le montant de l'acompte et les moyens de paiement vous sont précisés au showroom.",
        ],
      },
      {
        titre: "Quand réserver, pour tenir le budget et les délais",
        texte: [
          "Prévoyez idéalement votre premier essayage neuf mois à un an avant la date du mariage : c'est le temps que demandent la confection à vos mesures, les essayages et les retouches. Si le temps vous manque, dites-le nous : nous trouvons presque toujours une solution.",
        ],
      },
      {
        titre: "Pas cher, location, outlet : les mots que l'on tape",
        texte: [
          "« Robe de mariée pas cher Paris », « location robe de mariée Paris », « outlet », « déstockage », « abordable », « petit prix » : ces recherches mènent souvent jusqu'ici. Nous proposons une robe sur mesure, à partir de 1 500 €, retouches comprises. Quel prix pour quelle robe ? Celui qui vous est donné au showroom, modèle par modèle. Un prix moyen ? Autour de 2 500 €.",
        ],
      },
    ],
    aRetenir: [
      `À partir de ${MAISON.prixDepart}, confection sur mesure, retouches comprises.`,
      "Le prix dépend de la matière, de la maison et du modèle ; il vous est donné au showroom.",
      "Acompte à la prise des mensurations, solde au retrait de la robe, après retouches.",
      "Aucune vente en ligne : tout commence par l'essayage privé.",
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
    r: "Idéalement huit à neuf mois avant le mariage, pour le premier essayage : c'est le temps que demandent la confection à vos mesures, le deuxième essayage, les retouches et l'essayage final. Si le temps vous manque, dites-le nous : nous trouvons presque toujours une solution.",
    description:
      "Quand acheter sa robe de mariée ? Huit à neuf mois avant, idéalement : le calendrier d'une robe sur mesure chez MADAMOON, et que faire avec moins de temps.",
    chapo:
      "La date à peine fixée, la question se pose : à quel moment acheter sa robe de mariée pour qu'elle soit prête, ajustée, sans avoir à courir ? Nous vous donnons ici le calendrier d'une robe confectionnée sur mesure chez MADAMOON, ce qu'il faut prévoir à chaque étape, et ce qui reste possible quand le mariage est dans quelques mois.",
    sections: [
      {
        titre: "Le calendrier d'une robe de mariée sur mesure",
        texte: [
          "Du premier rendez-vous au jour où vous repartez avec votre robe, il y a huit étapes. Toutes ne se raccourcissent pas : à l'atelier, la confection prend le temps qu'il lui faut.",
        ],
        liste: [
          "Le rendez-vous : vous réservez votre premier essayage privé, idéalement huit à neuf mois avant le mariage.",
          "L'essayage privé : pendant une heure, le showroom est privatisé pour vous, accompagnée si vous le souhaitez.",
          "Les mensurations : votre choix arrêté, nous les prenons le jour même pour lancer la confection ; vous versez un acompte.",
          "La confection : à l'atelier, votre robe est réalisée à vos mesures.",
          "Le deuxième essayage : la robe prête, vous revenez la passer et voir si des ajustements s'imposent.",
          "Les retouches : nos couturières ajustent chaque détail sur place ; elles sont incluses, et vous réglez le solde ce jour-là.",
          "L'essayage final : il confirme le tombé, la longueur, l'aisance.",
          "Le retrait : vous repartez avec votre robe, parfaitement ajustée.",
        ],
        ordonnee: true,
      },
      {
        titre: "Pourquoi huit à neuf mois",
        texte: [
          "Parce qu'une robe sur mesure n'attend pas en rayon : elle est confectionnée une fois votre choix fait, selon vos mensurations, puis ajustée. Il faut le temps de l'atelier, celui de revenir l'essayer, celui des retouches, et une marge pour que rien ne se décide dans l'urgence. Neuf mois, c'est aussi le délai qui vous laisse hésiter entre deux robes sans bousculer le calendrier.",
        ],
      },
      {
        titre: "Il reste moins de six mois : que faire ?",
        texte: [
          "Prenez rendez-vous malgré tout, et donnez-nous la date. Selon la robe, la maison et la saison, des solutions existent, et c'est au showroom qu'elles se trouvent, pas en attendant. Plus la date approche, plus il est précieux d'arriver au premier essayage avec quelques coups de cœur repérés parmi nos robes.",
        ],
      },
      {
        titre: "Quand commencer à chercher",
        texte: [
          "Dès que la date est fixée : regardez les coupes et les robes qui vous plaisent, votre morphologie, le style du mariage. L'essayage en boutique, lui, se prévoit huit à neuf mois avant ; arriver avec des idées déjà en tête rend ce premier rendez-vous plus efficace.",
        ],
      },
      {
        titre: "Et les retouches, combien de temps ?",
        texte: [
          "Elles viennent après le deuxième essayage, une fois la robe confectionnée. Nos couturières les réalisent sur place, et elles sont incluses dans la confection. Leur durée dépend de la robe et des ajustements : nous fixons le calendrier ensemble, et l'essayage final se prévoit assez tôt pour que vous retiriez votre robe sereinement avant le mariage.",
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
    r: "Chez MADAMOON, sur rendez-vous : le showroom est privatisé pour vous pendant une heure. Vous venez sans maquillage, accompagnée de deux personnes (ou plus), vous essayez les robes qui correspondent à votre goût, à votre morphologie et à l'esprit de votre mariage. Et quand votre choix est fait, nous prenons vos mensurations pour lancer la confection de votre robe de mariée.",
    description:
      "Comment se passe un essayage de robe de mariée : rendez-vous, showroom privatisé une heure, quoi apporter, qui emmener. MADAMOON, Paris 10e.",
    chapo:
      "Tout commence au premier essayage, et c'est souvent le moment que l'on redoute un peu : combien de robes, avec qui, dans quelle tenue ? Au showroom MADAMOON, il se déroule ainsi, de la prise de rendez-vous à l'instant où nous prenons vos mesures.",
    sections: [
      {
        titre: "Avant : prendre rendez-vous",
        texte: [
          "Notre showroom reçoit uniquement sur rendez-vous, parce qu'il est privatisé pour chaque mariée. Le rendez-vous se prend en ligne, en quelques clics, ou par téléphone, idéalement huit mois à un an avant le mariage. D'ici là, repérez quelques coupes et quelques-unes de nos robes qui vous plaisent : le rendez-vous n'en sera que plus efficace.",
        ],
      },
      {
        titre: "Le jour : une heure, le showroom pour vous",
        texte: [
          "Dès votre arrivée, le showroom est à vous pendant une heure, aux côtés de quelqu'un qui connaît chaque robe. Vous essayez, vous comparez, vous prenez votre temps. Pour préserver les robes, nous vous demandons de venir sans maquillage — nous sommes certaines que vous êtes belle au naturel.",
        ],
      },
      {
        titre: "Quoi apporter à son premier essayage",
        texte: [
          "Trois choses aident vraiment, sans rien avoir d'obligatoire :",
        ],
        liste: [
          "Des chaussures à la hauteur de talon que vous envisagez, pour juger la longueur et le tombé.",
          "Une lingerie couleur chair et sans coutures, qui ne marque pas sous une sirène ou un satin.",
          "Quelques images des robes qui vous plaisent, les nôtres ou celles d'ailleurs.",
        ],
      },
      {
        titre: "Qui emmener",
        texte: [
          "Celles dont l'avis compte vraiment pour vous, et qui vous aident à y voir clair : une mère, une sœur, une amie qui vous connaît bien. Le showroom étant privatisé, vos proches sont les bienvenus tout au long de l'essayage. Trop d'avis finissent par brouiller le vôtre : quelques personnes suffisent.",
        ],
      },
      {
        titre: "Combien de robes essayer",
        texte: [
          "Il n'y a pas de bon nombre. Quelques robes bien choisies, dans des coupes différentes — une sirène, une princesse, une fluide —, valent mieux qu'une longue série : en une heure, on comprend vite ce qui vous va, et l'essayage est là pour vous mener jusqu'à celle dans laquelle vous vous reconnaissez.",
        ],
      },
      {
        titre: "Après : les mensurations, puis deux autres essayages",
        texte: [
          "Si votre choix est fait, nous prenons vos mensurations le jour même pour lancer la confection à l'atelier, et vous versez un acompte. Vous reviendrez essayer la robe lorsqu'elle sera prête, puis une dernière fois après les retouches, faites sur place. Si vous hésitez entre plusieurs robes, un nouveau rendez-vous vous permet de réessayer vos finalistes — en gardant un œil sur le calendrier.",
        ],
      },
    ],
    aRetenir: [
      "Sur rendez-vous, showroom privatisé une heure, accompagnée si vous le souhaitez.",
      "Venez sans maquillage ; apportez talons, lingerie chair et quelques images.",
      "Quelques robes dans des coupes différentes, plutôt qu'une longue série.",
      "Votre choix fait : mensurations le jour même, puis deux essayages.",
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
    r: "En partant de votre silhouette plutôt que des tendances : votre morphologie ouvre des pistes de coupes, la coupe appelle une matière, la matière un style. Puis l'essayage tranche : quelques robes dans des coupes différentes et, parmi elles, celle dans laquelle vous vous reconnaissez.",
    description:
      "Comment choisir sa robe de mariée : morphologie, coupe, matière, style, saison, budget. La méthode du showroom MADAMOON, Paris 10e, étape par étape.",
    chapo:
      "Il existe des milliers de robes de mariée, et une seule sera la vôtre. Pour la trouver sans vous y perdre, avancez dans l'ordre : la silhouette, la coupe, la matière, le style, le lieu et la saison, le budget — puis l'essayage, qui a toujours le dernier mot. Chaque étape a sa page sur ce site ; ce guide les relie.",
    sections: [
      {
        titre: "Partir de sa morphologie",
        texte: [
          "Les coupes fluides et trapèze allongent une morphologie en O ; les princesses et les trapèzes équilibrent une morphologie en A ; les sirènes légères dessinent des courbes sur une morphologie en H. À une silhouette en 8 ou en X, presque tout va. Une morphologie n'exclut jamais une robe : elle ouvre des pistes, et au showroom, vous essayez aussi ce que vous n'aviez pas prévu.",
        ],
      },
      {
        titre: "Choisir la coupe",
        texte: [
          "Nos coupes : la sirène, qui épouse le corps jusqu'aux genoux ; la princesse, au corsage ajusté et à la jupe ample ; la trapèze, qui s'évase doucement depuis la taille ; la fluide, qui tombe et bouge ; et les deux-en-un, dont la surjupe détachable change l'allure entre la cérémonie et la fête. Quelques robes courtes — Elin, River, Clover — reprennent ces coupes, pour la mairie.",
        ],
      },
      {
        titre: "Choisir la matière",
        texte: [
          "La matière décide de la tenue, et de la saison. La dentelle — Chantilly, Alençon, Caterina — habille et donne le ton romantique ; le satin, le mikado et le crêpe tiennent, et signent le minimaliste ; la mousseline, la charmeuse et le tulle souple bougent, et font le bohème. Une matière unie montre la coupe ; une dentelle la pardonne.",
        ],
      },
      {
        titre: "Choisir le style",
        texte: [
          "Bohème, minimaliste, romantique, vintage : le style est ce que la robe raconte, et il doit s'accorder à celui du mariage. Une fluide en mousseline pour une grange, un satin à manches longues pour une église en hiver, une robe courte en crêpe pour la mairie. Ce site consacre une page à chaque style, avec celles de nos robes qui le portent.",
        ],
      },
      {
        titre: "Le lieu et la saison",
        texte: [
          "Pour un mariage en hiver : des manches longues, un col montant, des matières qui ont de la tenue — mikado, satin, crêpe —, ou une cape posée sur les épaules. Pour un été à la campagne : de la mousseline, de la dentelle légère, et pas de longue traîne. Pour une cérémonie religieuse, une cape ou une veste amovible vous couvre le temps de la cérémonie.",
        ],
      },
      {
        titre: "Le budget",
        texte: [
          `Chez MADAMOON, les prix commencent à partir de ${MAISON.prixDepart} pour une confection sur mesure, retouches comprises ; le prix de chaque modèle vous est donné au showroom. Si le budget est une contrainte, dites-le dès le premier rendez-vous : le modèle et la matière se choisissent avec vous.`,
        ],
      },
      {
        titre: "Puis l'essayage tranche",
        texte: [
          "Quelques robes bien choisies, dans des coupes différentes, et une heure de showroom privatisé. Si vous hésitez entre plusieurs robes, notez ce qui vous plaît dans chacune, écartez celle qui vous convainc le moins, puis demandez-vous dans laquelle vous vous reconnaissez. Un nouveau rendez-vous vous permet de réessayer vos finalistes.",
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
    r: "Le tulle et l'organza pour le volume et la transparence, la mousseline et la georgette pour le mouvement, la dentelle pour le décor, le satin, le mikado et le crêpe pour la tenue. Tous se retrouvent dans les robes MADAMOON, souvent à plusieurs sur une même robe.",
    description:
      "Tulle, organza, dentelles de Chantilly et d'Alençon, satin, mikado, crêpe : les tissus d'une robe de mariée, et les robes MADAMOON qui les portent.",
    chapo:
      "Tulle pailleté, organza, dentelle de Chantilly, mikado, charmeuse : ces mots reviennent d'une robe à l'autre. Ils disent la tenue, le poids et la lumière d'une robe de mariée, mais on ne les connaît pas toujours. Ce guide en donne le sens, et nomme celles de nos robes qui les portent.",
    sections: [
      {
        titre: "Le tulle : le volume et l'illusion",
        texte: [
          "Un filet très fin, très léger, que l'on superpose pour donner du volume : la jupe de Carrie se compose de plusieurs couches de tulle pailleté ; celles de Dolores et d'Alicia sont en tulle et dentelle. Très souple, il fait aussi des fluides, comme Calla ou Agnessa. Couleur chair, il devient le tulle illusion des dos transparents de Venus, d'Uma ou de Montana. Une robe de mariage en tulle se choisit donc selon ce que vous lui demandez : du volume, de la douceur ou de la transparence.",
        ],
      },
      {
        titre: "L'organza : la transparence qui tient",
        texte: [
          "Plus raide que le tulle, plus brillant aussi, l'organza garde le volume sans en avoir le poids. Santana marie organza et tulle sur sa taille basque ; Fortune associe le crêpe stretch à l'organza satin, un organza plus lustré.",
        ],
      },
      {
        titre: "La mousseline et la georgette : le mouvement",
        texte: [
          "Deux voiles légers, qui tombent et bougent : ceux des robes bohèmes. Hélène et Murielle ont une jupe en mousseline ; Maribel, une mousseline stretch ; Addison, des fleurs en mousseline appliquées à la main. La georgette, un peu plus mate, un peu plus crêpée, habille Zina dans sa version stretch.",
        ],
      },
      {
        titre: "Les dentelles : Chantilly, Alençon, Caterina, Highclare",
        texte: [
          "Fine et légère, à motifs floraux, la dentelle de Chantilly est celle d'Oksana, de Charlize, de Shiloh et d'Aster. La dentelle d'Alençon, plus en relief, cernée d'un cordonnet, est celle de Summer. Les dentelles Caterina de Charlotte et de Clover, Highclare de Calla, Cassie de Mitra viennent de la maison Watters Designs. S'y ajoutent la dentelle brodée de Seraphina et la dentelle florale d'Hélène ou de Santana.",
        ],
      },
      {
        titre: "Satin, mikado, crêpe, charmeuse : la tenue",
        texte: [
          "Ce sont les matières unies. Le satin mat, le satin de soie et le mikado — un satin épais et structuré — font les robes qui tiennent : Sheridan, Venus, Montana, Dove, Addison, Kensington. Le crêpe, souple, épouse le corps : Bondi, Milan, Mira, Elin. La charmeuse est un satin très léger et fluide, celui d'Adularia, d'Amaryllis, de Ryle et de Riviera.",
        ],
      },
      {
        titre: "Jacquard, néoprène, Dupioni : les textures",
        texte: [
          "Le jacquard se tisse à motifs, souvent floraux : c'est celui de Guinevere, de Monica, de Trinity. Le néoprène, lisse et ferme, sculpte la sirène minimaliste d'Enid. Le Dupioni est une soie texturée, irrégulière : celle du corset structuré d'Ember.",
        ],
      },
      {
        titre: "Quel tissu pour quelle saison ?",
        texte: [
          "L'hiver aime ce qui tient et ce qui couvre : mikado, satin, crêpe, manches longues en dentelle. L'été aime ce qui respire : mousseline, georgette, tulle souple, dentelle légère. Et quelle que soit sa matière, chacune de nos robes est confectionnée à vos mesures.",
        ],
      },
      {
        titre: "Quel tissu pour l'automne, le printemps, la plage",
        texte: [
          "Pour l'automne et l'hiver : satin, mikado, crêpe, dentelle sur satin, manches. Pour le printemps et l'été : tulle, mousseline, organza, dentelle sur tulle, bustier ou bretelles fines ; le plumetis, ce tulle à pois, n'est pas dans notre sélection. Plage et jardin : mousseline et charmeuse, qui bougent. Une dentelle brodée coûte plus qu'un crêpe : le tissu fait le prix, et le prix vous est donné au showroom. Ni tissu au rouleau ni tissu pas cher ici : des robes finies, à vos mesures, blanches ou ivoire.",
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
    r: "Une robe qui vous suit : fluide, en mousseline, en charmeuse ou en satin mat souple, sans corsage qui comprime. Chez nous, Mathilda, de Monica Loretti, est pensée pour la femme enceinte ; et puisque chaque robe est confectionnée à vos mesures, nous fixons ensemble le calendrier des essayages et des retouches, en fonction du terme.",
    description:
      "Robe de mariée enceinte : Mathilda, pensée pour la femme enceinte, les fluides qui suivent la grossesse, mensurations et retouches chez MADAMOON, Paris 10e.",
    chapo:
      "Se marier enceinte, c'est choisir une robe pour une silhouette qui changera encore après le premier essayage, jusqu'au jour du mariage. Rassurez-vous : une robe de mariée de grossesse ne cède rien sur la beauté, et une robe sur mesure est faite pour s'ajuster. Nous vous présentons ici les robes qui s'y prêtent, et la façon dont nous nous organisons avec vous.",
    sections: [
      {
        titre: "Mathilda, pensée pour la femme enceinte",
        texte: [
          "Mathilda, de Monica Loretti, est une robe de mariée fluide et romantique, spécialement pensée pour la femme enceinte : elle vous permet de célébrer votre mariage avec confort et style, dans une silhouette douce, élégante et intemporelle. C'est une fluide, et elle va à toutes les morphologies.",
        ],
      },
      {
        titre: "Les coupes qui suivent",
        texte: [
          "La fluide, d'abord : une taille placée haut ou laissée libre, une jupe qui tombe depuis la poitrine ou la taille, sans jamais comprimer. Dove, en satin mat, promet « l'élégance intemporelle et le confort absolu » ; Maribel est en mousseline stretch ; Adularia et Ryle, en charmeuse légère. Les trapèzes amples, comme Calla et son tulle très souple, méritent aussi l'essai. La sirène, qui épouse les hanches, reste la coupe la moins adaptée.",
        ],
      },
      {
        titre: "Les matières qui suivent",
        texte: [
          "Les matières souples et légères, avant tout : mousseline, georgette, charmeuse, tulle fluide, satin mat souple, crêpe stretch. Maribel, Zina, Fortune et Sheridan ont une matière stretch ou une doublure extensible — un détail qui compte quand la silhouette évolue.",
        ],
      },
      {
        titre: "Mensurations et retouches : comment ça se passe",
        texte: [
          "Chez MADAMOON, nous prenons vos mensurations le jour du choix ; la robe est confectionnée à vos mesures, puis ajustée aux retouches, faites sur place et comprises. Pour une mariée enceinte, le calendrier des essayages et des retouches se fixe avec nous, en fonction du terme et de la date du mariage : dites-les nous dès la prise de rendez-vous, c'est ce qui nous permet de prévoir les ajustements au plus près du jour.",
        ],
      },
      {
        titre: "Pour un mariage civil",
        texte: [
          "Pour la mairie, une robe courte et souple est une option à considérer : Elin, en crêpe, est pensée pour un mariage civil, et River, courte au décolleté carré, offre une sensation de légèreté. Pour la cérémonie et la fête, revenez aux fluides.",
        ],
      },
      {
        titre: "Enceinte en hiver, et « autour de moi »",
        texte: [
          "En hiver, Mathilda se porte avec l'étole ou la veste que vous apportez ; au showroom, vous l'essayez assise et debout, et nous prenons vos mensurations le plus tard possible. Si vous cherchez une robe de maternité pour le mariage, c'est elle. « Robe de mariée enceinte autour de moi » : à Paris, notre showroom se trouve au 234 rue du Faubourg Saint-Martin, dans le 10ᵉ. Pas chère au sens du prêt-à-porter, non ; faite à vos mesures du moment, oui.",
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
    r: "MADAMOON ne vend pas de robes anciennes : toutes nos robes sont neuves et confectionnées à vos mesures. Mais plusieurs ont l'esprit rétro que l'on cherche sous le mot vintage — Tessa a un « charme vintage-chic » —, et chaque décennie a ses codes, que vous retrouverez dans notre sélection.",
    description:
      "Robe de mariée vintage à Paris : pas de robes anciennes chez MADAMOON, mais l'esprit des années 20, 50 et 90 dans des robes neuves, sur mesure.",
    chapo:
      "« Vintage » dit deux choses : une robe ancienne, de seconde main, ou une robe neuve à l'esprit d'une autre époque. MADAMOON ne propose que la seconde — des robes confectionnées à vos mesures, dont certaines portent les codes des années 20, des années 50 ou des années 90. Nous vous les présentons décennie par décennie, sans leur prêter plus que ce qu'elles sont.",
    sections: [
      {
        titre: "Vintage : robe ancienne ou esprit rétro ?",
        texte: [
          "Au sens strict, une robe de mariée vintage a déjà été portée ; elle se trouve dans des dépôts-ventes spécialisés, pas chez nous. Ce que nous proposons, c'est l'esprit : des coupes, des matières et des détails qui évoquent une décennie, sur une robe neuve, confectionnée pour vous, retouches comprises. Il en va de même pour la robe victorienne à col montant, dont Chastity garde l'esprit, et pour les années 70 bohèmes, qui ont leur page.",
        ],
      },
      {
        titre: "Années 20 et 30 : perles, coupe droite, charleston",
        texte: [
          "Les années folles aiment la coupe droite, les perles et les matières qui glissent. Pour retrouver cet esprit, regardez Bella — satin orné de perles, manches longues, dos nu, « chic, intemporelle et à l'esprit couture » —, Amaryllis, coupe droite ou sirène en charmeuse à boutons, Adularia, fluide en charmeuse, ou Agnessa et son corset perlé à la main sur une jupe de tulle. Aucune n'est une robe charleston à franges : c'est l'allure qui s'en approche.",
        ],
      },
      {
        titre: "Années 50 et 60 : taille marquée, jupe ample, col net",
        texte: [
          "Le New Look et les sixties aiment la taille marquée, la jupe qui tourne, les cols carrés ou bateau et les robes courtes. Cet esprit, vous le retrouverez chez Dolores et son col carré, chez Clover, robe courte florale à surjupe, chez River, courte au décolleté carré, ou chez Elin, courte en crêpe pour un mariage civil. Les princesses à corsage ajusté, comme Charlotte ou Sienna, portent elles aussi cette taille dessinée.",
        ],
      },
      {
        titre: "Années 90 : minimalisme, satin, fourreau",
        texte: [
          "La robe de mariée vintage des années 90 est aujourd'hui la plus cherchée : un fourreau, un satin ou un crêpe uni, un décolleté droit, pas de dentelle. Chez nous, c'est le territoire des minimalistes : Bondi, en crêpe, aux épaules dégagées ; Enid, en néoprène, au dos boutonné ; Milan, en crêpe léger ; Dove, en satin mat ; Bella, dans sa version fourreau.",
        ],
      },
      {
        titre: "Tessa, le vintage-chic du catalogue",
        texte: [
          "Une seule de nos robes porte le mot : Tessa, de Casablanca Bridal, « au charme vintage-chic ». Une sirène au corset structuré, avec une surjupe détachable et des bretelles amovibles pour un autre look. C'est l'une de nos deux-en-un.",
        ],
      },
      {
        titre: "Style Gatsby, dentelle rétro, mariage civil vintage",
        texte: [
          "Le style Gatsby — années 20, perles, coupe droite — se retrouve chez Bella et Amaryllis ; la dentelle rétro, chez Chastity, avec son col montant et ses manches longues ; pour un mariage civil vintage, pensez à une courte années 50 comme Clover ou Elin. Les années 40 et 80, elles, n'ont pas chez nous de robe qui en porte l'esprit : la tenue se joue alors sur la coiffure et les accessoires.",
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
    r: "L'ivoire, légèrement chaud, flatte la plupart des carnations et se photographie avec plus de douceur ; le blanc pur, plus franc, va aux peaux très claires ou très foncées et aux matières mates. Vous trancherez à l'essayage, en lumière du jour, robe sur vous — et les coloris proposés pour chaque modèle se voient au showroom.",
    description:
      "Robe de mariée ivoire ou blanche : la différence, quelle teinte selon sa carnation et sa matière, et comment la vérifier à l'essayage. MADAMOON, Paris 10e.",
    chapo:
      "Sur une photo, toutes les robes de mariée sont blanches. Dans un showroom, aucune ne l'est tout à fait : blanc, blanc cassé, ivoire, champagne — quelques tons d'écart seulement, et le visage change. Ce guide précise ce que ces mots désignent, comment choisir entre ivoire et blanc, et pourquoi la décision se prend robe sur soi.",
    sections: [
      {
        titre: "Blanc, blanc cassé, ivoire, champagne : les mots",
        texte: [
          "Le blanc pur est sans nuance, froid : c'est le plus lumineux. Le blanc cassé est à peine adouci. L'ivoire, chaud, tire vers le crème ; c'est la teinte la plus répandue des robes de mariée. Le champagne va plus loin, vers le beige doré ; le blush, vers le rosé. Cloud Dancer, le blanc doux que Pantone a désigné couleur de l'année 2026, appartient à cette famille : un blanc à peine voilé, ni froid ni crème — ce que l'on nomme blanc cassé. D'une maison à l'autre, un même mot ne désigne pas tout à fait la même teinte : seul l'échantillon fait foi.",
        ],
      },
      {
        titre: "Choisir selon sa carnation",
        texte: [
          "Le blanc pur se détache sur une peau très claire au sous-ton froid, ou sur une peau très foncée ; sur une peau claire au sous-ton chaud, il peut durcir le teint. L'ivoire réchauffe et flatte la plupart des carnations, en particulier les peaux dorées, mates ou qui bronzent. Le champagne va aux peaux dorées et aux cheveux foncés. Si vous hésitez, l'ivoire reste le choix le plus sûr.",
        ],
      },
      {
        titre: "Selon la matière",
        texte: [
          "Une même teinte ne donne pas la même couleur sur un satin mat, une dentelle ou un tulle : le satin la rend plus dense, la dentelle sur tulle couleur chair la mêle à la peau, la mousseline la rend plus légère. Les robes qui marient deux matières — un satin et une dentelle, comme Sheridan ou Charlize — jouent souvent sur deux tons très proches.",
        ],
      },
      {
        titre: "Et les robes de couleur ?",
        texte: [
          "Pour une robe de mariée de couleur, un mariage civil en couleur ou un détail coloré — Clover est brodée de fleurs de couleur —, posez-nous la question au showroom : les coloris proposés dépendent du modèle et de la maison, et se confirment pièce par pièce.",
        ],
      },
      {
        titre: "Comment vérifier : à l'essayage, en lumière du jour",
        texte: [
          "Une teinte se juge robe sur soi, sans maquillage — nous vous le demandons aussi pour préserver les robes —, près d'une fenêtre, et à côté d'une autre teinte pour comparer. L'heure d'essayage privé est faite pour cela : voir l'ivoire et le blanc l'un après l'autre, sur vous.",
        ],
      },
      {
        titre: "Rouge, rose, bleu, noir, vert, pastel : les robes de couleur que l'on cherche",
        texte: [
          "Robe de mariée rouge, rose poudré, bleu ciel, noire, verte, pastel, colorée : ces recherches sont nombreuses, et notre réponse tient en peu de mots. Nos robes sont blanches ou ivoire ; la seule touche de couleur est brodée sur Clover, et les coloris proposés par chaque maison se voient au showroom. Grande taille, manches ou bustier, la question de la couleur se pose de la même façon : à l'essayage, en lumière du jour. Que vous la cherchiez bleu marine ou bleu pâle, jaune, lilas, argentée ou pailletée, pour l'hiver ou pour l'été, la broderie de couleur de Clover reste l'exception, et le blanc cassé, la réponse la plus fréquente.",
        ],
      },
    ],
    aRetenir: [
      "L'ivoire, chaud, flatte la plupart des carnations ; le blanc pur, les peaux très claires ou très foncées.",
      "La matière change la teinte : satin dense, dentelle mêlée à la peau, mousseline légère.",
      "Les coloris de chaque modèle se voient au showroom, pièce par pièce.",
      "Vous tranchez à l'essayage, sans maquillage, en lumière du jour.",
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
    r: "Celle que le lieu et la journée permettent : une longue traîne pour une cérémonie à l'église ou dans un grand lieu, une traîne légère ou aucune pour la mairie, le jardin et la danse. Chez nous, Santana, Venus, Chastity, Summer et Guinevere portent une longue traîne ; Maribel et Mira, une traîne légère ; les robes bohèmes et les courtes s'en passent. La longueur exacte se voit au showroom, robe sur vous.",
    description:
      "Traîne de robe de mariée : longueurs, robes du catalogue à longue traîne ou sans, comment la relever pour la soirée. À voir au showroom MADAMOON, Paris 10e.",
    chapo:
      "La traîne est ce que la robe laisse derrière elle : quelques centimètres qui balayent le sol, ou plusieurs mètres qui remplissent une allée. Elle change l'allure, le poids, la façon de marcher. Ce guide vous donne les mots pour en parler, celles de nos robes qui en ont une — ou non —, et ce que l'on en fait une fois la cérémonie passée.",
    sections: [
      {
        titre: "Les longueurs de traîne : les mots",
        texte: [
          "On parle de traîne balayette lorsqu'elle effleure le sol de quelques centimètres ; de traîne chapelle lorsqu'elle s'étire d'un mètre environ ; de traîne cathédrale au-delà. Les maisons, elles, ne donnent pas de chiffres : elles disent « longue traîne », « traîne majestueuse », « traîne légère ». Au showroom, nous la mesurons sur vous, et vous marchez avec elle.",
        ],
      },
      {
        titre: "Les robes à longue traîne du catalogue",
        texte: [
          "Santana se prolonge « jusqu'à une spectaculaire traîne et un ourlet festonné ». Venus, en satin mat, associe une traîne majestueuse à un dos en dentelle. Chastity, en dentelle à manches longues, s'achève sur une longue traîne « majestueuse et luxueuse ». Summer, sirène en dentelle d'Alençon, et Guinevere, princesse en jacquard, portent elles aussi une longue traîne. Fancy s'évase « en une spectaculaire traîne transparente en dentelle ». Chez Enid comme chez Bondi, enfin, une rangée de boutons descend du corsage jusqu'au bout de la traîne.",
        ],
      },
      {
        titre: "Traîne légère, ou pas de traîne",
        texte: [
          "Maribel s'achève sur une traîne légère ; Mira « s'ouvre délicatement sur une douce traîne ». Les robes bohèmes — Hélène, Murielle — préfèrent une traîne courte, ou aucune : une robe faite pour marcher dans l'herbe ne s'encombre pas. Les robes courtes, Elin, River, Clover et Gabriel, n'en ont pas, par définition.",
        ],
      },
      {
        titre: "Relever la traîne pour la soirée",
        texte: [
          "Une longue traîne se relève après la cérémonie, grâce à une attache cousue sous la jupe, pour danser sans la piétiner. Cela se prévoit aux retouches, qui sont comprises : dites-nous dès le premier rendez-vous ce que vous ferez de la robe le soir, et la traîne sera pensée pour les deux moments. Les deux-en-un vont plus loin : toute la surjupe se retire. Comment attacher ou remonter la traîne ? Par une boucle au poignet, ou par une attache sous la jupe, cousue aux retouches. Un nœud dans le dos, une ceinture ou une broche sont des accessoires, et ne font pas partie de notre sélection ; le voile se choisit après la traîne ; et la traîne royale n'est autre que la cathédrale.",
        ],
      },
      {
        titre: "Traîne et lieu de la cérémonie",
        texte: [
          "Dans une église, un grand escalier, une longue allée, la traîne a de la place et se voit. À la mairie, au jardin, à la plage, au restaurant, elle gêne plus qu'elle ne sert : une traîne légère ou une robe sans traîne sert mieux la journée. Entre les deux, le bon réglage se décide au showroom, debout, en marchant, puis assise.",
        ],
      },
      {
        titre: "Traîne pour un mariage civil, cape, jupe drapée, nœud : les variantes",
        texte: [
          "Pour un mariage civil, pas de traîne, ou une traîne légère : Maribel, Mira, ou une courte. La cape, le nœud dans le dos, la jupe drapée ou asymétrique ne figurent pas tels quels parmi nos robes — la jupe amovible de Gabriel et la surjupe de Clover en tiennent lieu ; le haut reste celui de la robe, et la traîne s'attache d'un geste pour la soirée. Si vous souhaitez un top ou une tenue différente pour le soir, c'est le deux-en-un qui le permet, sans changer de robe.",
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
    r: "Celle qui vous ressemble, pas celle d'un âge : aucune de nos robes n'est faite « pour » les 40, 50 ou 60 ans. Ce qui aide, c'est une matière qui tient — crêpe, satin mat, mikado —, une coupe qui va à toutes — trapèze, fluide —, et des manches ou un dos couvert si vous le souhaitez : Montana, Pendant, Chastity. Pour un second mariage ou une mairie, une courte comme Elin, ou une longue simple comme Marie. L'essayage tranche.",
    description:
      "Robe de mariée après 40, 50 ou 60 ans : matières, coupes, manches et cols qui aident, second mariage, mariage civil. Conseils du showroom MADAMOON, Paris 10e.",
    chapo:
      "On nous demande souvent quelle robe de mariée porter à 40 ans, à 50 ans, à 60 ans, pour un premier ou un second mariage. En un mot : après 40 ans, la même qu'à trente, choisie avec le même soin. Le reste tient en quelques repères — la matière, la coupe, ce que l'on souhaite couvrir — et en une heure d'essayage.",
    sections: [
      {
        titre: "Il n'y a pas de robe « pour son âge »",
        texte: [
          "Aucune de nos robes n'est associée à un âge, et c'est bien normal : une robe se choisit pour une silhouette, un lieu, une envie. Une mariée de 50 ans peut porter une sirène en dentelle comme une mariée de 28, si cette robe est la sienne. Ce qui change avec les années, c'est souvent ce que l'on veut montrer, et ce que l'on préfère couvrir — et là, notre sélection a de quoi répondre.",
        ],
      },
      {
        titre: "Couvrir sans alourdir : manches, cols, dos",
        texte: [
          "Les manches longues en dentelle couvrent le bras tout en le laissant deviner : Montana, sirène en satin mat aux manches en dentelle et au dos illusion ; Pendant, trapèze en dentelle à manches longues ; Seraphina, princesse à manches longues brodées. Le col montant de Chastity, en dentelle, couvre le décolleté avec un charme traditionnel. Bella, elle, couvre le buste et montre le dos. Vous retrouverez toutes ces robes sur leurs pages : les manches longues et le dos nu.",
        ],
      },
      {
        titre: "Les coupes qui vont à toutes : trapèze et fluide",
        texte: [
          "La trapèze s'ouvre en A depuis la taille et va à toutes les morphologies : Charlotte en dentelle, Hera en satin, Calla en tulle souple. La fluide suit le mouvement sans jamais contraindre : Marie, « ligne intemporelle » chez Monica Loretti, ou Adularia, en charmeuse. Une sirène en crêpe, comme Bondi ou Milan, dessine le corps sans le serrer. Ce que l'on évite, au fond, ce n'est pas une coupe : c'est le volume dont on ne veut pas.",
        ],
      },
      {
        titre: "Les matières qui tiennent",
        texte: [
          "Le crêpe, le satin mat et le mikado tombent net et ne marquent pas : Dove en satin mat, Kensington en mikado, Fern en mikado brodé de fleurs de perles, Bondi et Milan en crêpe. Les dentelles fines — Chantilly, Alençon — habillent sans charger. Le tulle en couches et les paillettes restent permis, si vous les aimez ; ils ne sont simplement pas le premier réflexe.",
        ],
      },
      {
        titre: "Second mariage, mariage civil",
        texte: [
          "Un second mariage se fête souvent à la mairie, avec moins de monde et plus de liberté. Une robe courte comme Elin, « parfaite pour une cérémonie civile », ou River, courte au décolleté carré, y trouve sa place ; une longue simple comme Marie ou Adularia, tout autant. Ivoire plutôt que blanc pur ? C'est affaire de carnation, non d'âge : notre guide ivoire ou blanc en parle, et tout se décide au showroom, en lumière du jour.",
        ],
      },
      {
        titre: "L'essayage tranche",
        texte: [
          "Une heure, le showroom pour vous seule, accompagnée de qui vous voulez. Vous essayez ce que vous aviez prévu, puis ce que vous n'aviez pas prévu : c'est souvent là que la robe se trouve. Chaque robe est ensuite confectionnée à vos mesures, retouches comprises — la seule règle qui vaille à tout âge.",
        ],
      },
    ],
    aRetenir: [
      "Aucune robe « pour son âge » chez nous : vous choisissez pour vous.",
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

  /* ————————————————————————————————————————————— Bridgerton —————
   * Vague H (3 nov. 2026). Mots-clés transmis par la maison, lus dans
   * les tendances 2027 des professionnels du mariage : « robe
   * bridgerton », « robe style bridgerton », « thème bridgerton »,
   * « regencycore ». Le style est décrit pour ce qu'il est ; les robes
   * citées le sont pour ce que leurs fiches disent — corset, col carré,
   * manches ballon, perles, gants — et le guide dit ce que le catalogue
   * n'a pas : la taille empire, les pastels. */
  {
    slug: "robe-de-mariee-bridgerton",
    titre: "Robe de mariée style Bridgerton : le Regencycore",
    q: "Quelle robe de mariée pour un mariage style Bridgerton ?",
    r: "Une robe qui en reprend les codes : un corset qui dessine le buste, une encolure carrée ou un décolleté net, des manches ballon ou de longs gants, de la dentelle, des perles et du tulle. Chez nous, le corset est partout — Guinevere, Oksana, Zina, Rowan —, le col carré chez Dolores et Clover, les manches ballon chez Ryle, les gants avec Santana. La taille empire et les pastels, eux, ne font pas partie de notre sélection.",
    description:
      "Robe de mariée style Bridgerton : les codes du Regencycore (corset, col carré, manches ballon, perles) et les robes qui les portent. MADAMOON, Paris 10e.",
    chapo:
      "La série a remis la Régence anglaise au goût du jour : corsets, encolures carrées, manches ballon, gants longs, broderies et bals. Les professionnels du mariage l'annoncent parmi les tendances 2027 sous le nom de Regencycore — une version moderne, plus audacieuse, « une âme profondément cinématographique ». Ce guide dit d'où vient ce style, quels en sont les codes, et ce que nos robes en portent, une à une, sans rien leur prêter.",
    sections: [
      {
        titre: "Bridgerton, Regencycore : d'où vient le style",
        texte: [
          "La Régence anglaise, c'est la décennie 1811-1820, celle de Jane Austen : des robes à taille haute, nouée sous la poitrine, en mousseline claire, des encolures carrées, de petites manches bouffantes, de longs gants, des cheveux relevés. Depuis 2020, la série Bridgerton en a fait un décor de bal — pastels, broderies, perles, corsets — et une esthétique que les mariées reprennent à leur compte : le Regencycore. Sa version 2027 se veut moins costume, plus moderne : des ornements travaillés, des silhouettes fluides et un romantisme assumé, sans cérémonie d'époque.",
        ],
      },
      {
        titre: "Les codes d'une robe de mariée style Bridgerton",
        texte: [
          "Un corset, visible ou structurant, qui dessine le buste et la taille. Une encolure carrée, ou un décolleté net. Des manches courtes et bouffantes — les manches ballon —, ou des bras nus qu'habillent de longs gants. De la dentelle, des broderies de perles, du tulle. Une jupe qui tombe droit depuis une taille haute, dans la version historique ; une jupe de princesse ou de trapèze, dans la version mariage. Et des teintes pâles — ivoire, blanc cassé, poudré — de préférence au blanc optique.",
        ],
      },
      {
        titre: "Au catalogue : les robes qui en portent les codes",
        texte: [
          "Le corset, d'abord. Guinevere, princesse en jacquard floral, porte un corset bustier à taille basque en pointe et une longue traîne : la plus « bal » de nos robes, avec son allure couture. Oksana, sirène en dentelle de Chantilly, a le même corset basque en pointe ; Charlotte, en dentelle Caterina, un corset en taille basque sous un décolleté en cœur. Zina a un corset à laçage ; Rowan et Charlize, un corset transparent, qui existe doublé ; Carrie, Hélène et Agnessa, un corset perlé à la main.",
          "L'encolure carrée, ensuite. Dolores, trapèze ou princesse en tulle, dentelle et perles, porte un col carré « qui flatte le buste » et un dos transparent en dentelle, orné de boutons. Clover, avec ou sans perles, en dentelle Caterina, associe un décolleté carré à une taille basse sculptée. River, courte, a un décolleté carré à larges bretelles : c'est la version mairie.",
          "Les manches ballon sont celles de Ryle, fluide en charmeuse, au décolleté en V profond. Pour les gants : Santana, princesse à taille basque en organza, tulle et dentelle florale, « peut être accessoirisée avec les gants transparents en tulle de soie, ornés de dentelle florale », disponibles séparément. Pour les broderies et les perles : Fern, en mikado brodé de fleurs de perles ; Maribel, au corsage brodé et perlé à la main ; Emerald, corsage perlé sur une jupe de tulle.",
        ],
      },
      {
        titre: "Ce que le catalogue n'a pas",
        texte: [
          "La taille empire, nouée sous la poitrine : aucune de nos robes n'est décrite ainsi. Nos robes fluides ont la taille à sa place, et notre guide des coupes le précise. Les pastels — bleu poudré, lilas, rose — non plus : nos robes sont blanches ou ivoire, et la seule touche de couleur est brodée sur Clover ; les coloris proposés par chaque maison se voient au showroom. Les manches bouffantes courtes, enfin, n'existent chez nous que sous la forme des manches ballon de Ryle. Une robe Bridgerton se compose donc ici avec le corset, l'encolure, les perles et les gants, non avec la silhouette historique.",
        ],
      },
      {
        titre: "Un mariage à thème Bridgerton : la robe dans le décor",
        texte: [
          "Le thème se joue dans le lieu — un salon, un escalier, un jardin à la française —, la décoration, la papeterie, la musique, les tenues des invités. Nous n'y intervenons pas : nous proposons des robes, que vous essayez au showroom. Mais la robe en est la pièce centrale, et c'est à l'essayage qu'elle se juge dans l'esprit du thème : un corset qui tient, une encolure qui porte un collier, des gants qui s'accordent aux manches. Apportez vos images d'inspiration au premier rendez-vous ; l'heure est privatisée.",
        ],
      },
      {
        titre: "Pour quelle morphologie ?",
        texte: [
          "Le corset dessine la taille : les sirènes à corset — Riviera, Rowan, Charlize — sont conseillées pour les morphologies en V, en H, en 8 et en X ; les trapèzes et princesses à corset — Charlotte, Lovia, Carrie, Dolores, Ember, Calla — vont à toutes. Le col carré flatte le buste, comme celui de Dolores. Le reste se décide robe sur vous.",
        ],
      },
    ],
    aRetenir: [
      "Les codes : corset, encolure carrée, manches ballon ou gants, dentelle, perles, tulle.",
      "Chez nous : le corset de Guinevere, Oksana, Zina, Rowan ; le col carré de Dolores et Clover ; les manches ballon de Ryle ; les gants avec Santana.",
      "Pas de taille empire ni de pastels : nos robes sont blanches ou ivoire.",
      "Le thème est affaire de lieu et de décor ; la robe se juge à l'essayage, au showroom.",
    ],
    liens: [
      { href: "/details/corset", label: "Les robes de mariée corset" },
      { href: "/robes/dolores", label: "Dolores, le col carré en tulle et dentelle" },
      { href: "/robes/ryle", label: "Ryle, les manches ballon" },
      { href: "/robes/santana", label: "Santana, et ses gants en tulle de soie" },
      { href: "/styles/romantique", label: "Les robes de mariée romantiques" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },
];

export const guideParSlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
