import { MAISON } from "@/lib/madamoon";

/*
 * Les pages des questions.
 *
 * La FAQ donne une réponse courte à chaque question ; chacune a aussi sa
 * page, où elle se développe. La réponse courte n'est pas recopiée ici :
 * elle vient de « faq(langue) », la table que servent la FAQ, Élise et le
 * balisage. Cette table-ci ne porte que ce que la page dédiée ajoute.
 *
 * Rien n'y est inventé. Les engagements — délais, acompte, retouches,
 * prix de départ, horaires — sont ceux que le site écrit déjà ailleurs :
 * dans la FAQ, dans le parcours de la mariée, dans les signatures de la
 * maison et sur les fiches. Ce qui relève du conseil est écrit comme un
 * conseil, jamais comme une règle de la boutique. Ce que le site ne dit
 * pas — le montant de l'acompte, les moyens de paiement, l'accès en
 * transports — n'est pas écrit : la page renvoie à la boutique.
 *
 * L'ordre est celui de la FAQ. L'adresse de chaque page porte les mots
 * qu'une mariée tape dans un moteur, et non le rang de la question : une
 * question qu'on déplace ne doit pas changer d'adresse.
 */

export type Article = {
  /* L'adresse, sous /faq/. La même dans les deux langues, comme « faq ». */
  slug: string;
  /* La balise de description, taillée pour Google : 158 signes au plus. */
  description: string;
  /* La phrase d'ouverture, sous le titre. */
  chapo: string;
  /* « ordonnee » numérote la liste : seulement quand l'ordre est vrai —
   * une suite d'étapes, pas une énumération. */
  sections: { titre: string; texte: string[]; liste?: string[]; ordonnee?: boolean }[];
  /* Trois ou quatre lignes, pour qui ne lit pas tout. */
  aRetenir: string[];
  /* Les pages du site qui prolongent la réponse. Adresses françaises :
   * le lien les traduit sur une page anglaise. */
  liens: { href: string; label: string }[];
  /* Le titre de la page, quand elle vise une expression plutôt que sa
   * question : « Robe de mariée bohème à Paris ». Il devient le titre
   * affiché, celui de l'onglet et celui du balisage ; la question reste
   * celle des rangées, et coiffe la réponse courte. */
  titre?: string;
  /* Une page de style — la bohème — plutôt qu'une page de question :
   * présente, elle prend la mise en page de « PageStyle ». Les robes
   * sont nommées par leur adresse, jamais une robe qui n'y est pas. */
  style?: Style;
};

export type Style = {
  robes: { titre: string; liste: { slug: string; texte: string }[] };
  /* Deux paragraphes côte à côte. */
  colonnes: { titre: string; texte: string }[];
  /* Une robe d'une autre coupe, en écho. */
  echo?: { titre: string; texte: string; robe: string; voir: string };
  pourQui: { titre: string; texte: string; toutes: string };
  questions: { titre: string; liste: { q: string; r: string }[]; toutes: string };
  fin: { titre: string; texte: string };
  voirLaCoupe: string;
};

/* Les adresses, dans l'ordre de la FAQ. Les deux langues les partagent. */
export const SLUGS_QUESTIONS = [
  "quand-choisir-sa-robe-de-mariee",
  "deroulement-essayage-robe-de-mariee",
  "etapes-robe-de-mariee-sur-mesure",
  "paiement-robe-de-mariee",
  "prix-robe-de-mariee-sur-mesure",
  "venir-accompagnee-essayage",
  "adresse-horaires-showroom",
  /* Ajoutées en octobre 2026. */
  "robe-de-mariee-selon-sa-morphologie",
  "quand-essayer-sa-robe-de-mariee",
  "duree-retouches-robe-de-mariee",
  "nombre-essayages-robe-de-mariee",
  "rendez-vous-essayage-robe-de-mariee",
  "robe-de-mariee-hiver",
  "qui-emmener-essayage-robe-de-mariee",
  "quand-commencer-chercher-robe-de-mariee",
  "combien-de-robes-essayer",
  "robe-sur-mesure-ou-pret-a-porter",
  "entretenir-robe-de-mariee-dentelle",
  "que-porter-sous-robe-sirene",
  "retoucher-robe-de-mariee-achetee-en-ligne",
  /* Ajoutées ensuite, autour de l'essayage. */
  "ou-essayer-robe-de-mariee-paris",
  "que-apporter-premier-essayage-robe-de-mariee",
  "essayer-plusieurs-coupes-meme-rendez-vous",
  "preparer-rendez-vous-robe-de-mariee-paris",
  "hesiter-entre-plusieurs-robes-de-mariee",
] as const;

const ADRESSE = `${MAISON.adresse}, ${MAISON.codePostal} ${MAISON.ville}`;

export const ARTICLES: Article[] = [
  /* ————————————————————————————————————————— le délai ————— */
  {
    slug: SLUGS_QUESTIONS[0],
    description:
      "Robe de mariée : prévoyez votre essayage huit à neuf mois avant le mariage. Pourquoi ce délai, et que faire s'il vous reste moins de temps.",
    chapo:
      "Huit à neuf mois avant la date : c'est le moment que la boutique conseille pour un premier essayage. Voici ce que ce délai recouvre, et comment faire si votre mariage est plus proche.",
    sections: [
      {
        titre: "Pourquoi huit à neuf mois",
        texte: [
          "Chez MADAMOON, une robe ne se décroche pas d'un portant. Une fois choisie, elle est confectionnée à l'atelier selon vos mensurations, puis essayée et ajustée sur place par les couturières de la boutique.",
          "Chacune de ces étapes a besoin de son temps : le choix, la confection, le deuxième essayage, les retouches, l'essayage final. Commencer tôt, c'est laisser à chacune la place qu'elle demande — et arriver aux dernières semaines sans courir.",
        ],
      },
      {
        titre: "Ce que couvre ce délai",
        texte: ["Entre le premier rendez-vous et le jour où vous repartez avec votre robe :"],
        ordonnee: true,
        liste: [
          "le premier essayage, au showroom privatisé pour vous ;",
          "la prise de mensurations, le jour même où vous choisissez ;",
          "la confection de votre robe à l'atelier ;",
          "un deuxième essayage quand elle est prête ;",
          "les retouches, faites sur place par nos couturières ;",
          "l'essayage final, puis le retrait.",
        ],
      },
      {
        titre: "S'il vous reste moins de temps",
        texte: [
          "Pas de panique. Dites-le dès la prise de rendez-vous, en précisant la date du mariage : la boutique trouve presque toujours une solution.",
          "Un conseil, dans ce cas : arrivez avec une idée des coupes qui vous attirent. Le catalogue et les pages consacrées aux coupes et aux morphologies sont faits pour cela — l'essayage n'en sera que plus efficace.",
        ],
      },
      {
        titre: "Préparer ce premier rendez-vous",
        texte: [
          "Parcourez les robes en ligne et gardez celles qui vous arrêtent dans vos coups de cœur. Si vous hésitez sur la coupe, Élise, la conseillère du site, part de votre morphologie et vous oriente en quelques questions.",
        ],
      },
    ],
    aRetenir: [
      "Premier essayage : idéalement huit à neuf mois avant le mariage.",
      "Ce délai couvre le choix, la confection et les retouches.",
      "Moins de temps ? Dites-le en réservant : une solution se trouve presque toujours.",
    ],
    liens: [
      { href: "/robes", label: "Voir toutes les robes" },
      { href: "/trouver-ma-robe", label: "Trouver ma robe avec Élise" },
      { href: "/morphologies", label: "Les morphologies" },
    ],
  },

  /* ——————————————————————————————————————— l'essayage ————— */
  {
    slug: SLUGS_QUESTIONS[1],
    description:
      "Essayage de robe de mariée chez MADAMOON : le showroom privatisé une heure, vos proches avec vous, sans maquillage. Gratuit, sur rendez-vous, Paris 10e.",
    chapo:
      "Une heure, un showroom rien que pour vous, vos proches autour de vous : l'essayage chez MADAMOON est un rendez-vous privé. Voici comment il se déroule.",
    sections: [
      {
        titre: "Un showroom privatisé pour vous",
        texte: [
          "Dès que vous avez réservé, le showroom est privatisé pour vous pendant une heure. Pas d'autre cliente, pas d'attente entre deux cabines : l'heure est à vous, et à vous seule.",
          "Le lieu fait partie du moment — un écrin du XIXᵉ siècle, rue du Faubourg Saint-Martin, pensé pour que l'essayage soit une expérience à partager, et non une course.",
        ],
      },
      {
        titre: "Comment se passe l'heure",
        texte: [
          "Le rendez-vous commence par une conversation. Avant de vous faire essayer quoi que ce soit, la boutique cherche à comprendre qui vous êtes, ce que vous aimez et ce que vous voulez transmettre le jour de votre mariage.",
          "Viennent ensuite les conseils — la coupe, la silhouette, la matière — puis les essayages. L'idée n'est pas d'enchaîner les robes, mais de vous mener jusqu'à celle dans laquelle vous vous reconnaissez.",
        ],
      },
      {
        titre: "Venir sans maquillage",
        texte: [
          "Pour préserver les robes, la boutique vous demande de venir sans maquillage : le fond de teint et le rouge à lèvres marquent la dentelle et le satin, et ces robes sont essayées par d'autres mariées après vous. Nous sommes certaines que vous êtes belle au naturel.",
          "Un conseil pratique : une lingerie simple, de couleur chair, vous aidera à juger le tombé de chaque robe.",
        ],
      },
      {
        titre: "Préparer votre visite",
        texte: [
          "Si des modèles vous ont plu sur le site, dites-le au moment de réserver : ils seront préparés pour votre venue. Vos coups de cœur se gardent en ligne, d'un clic sur le cœur de chaque robe.",
          "L'essayage est gratuit, et il a lieu sur rendez-vous uniquement.",
        ],
      },
    ],
    aRetenir: [
      "Une heure, le showroom privatisé pour vous.",
      "Vos proches sont les bienvenus.",
      "Venez sans maquillage, pour préserver les robes.",
      "Gratuit, sur rendez-vous uniquement.",
    ],
    liens: [
      { href: "/showroom", label: "Découvrir le showroom" },
      { href: "/coups-de-coeur", label: "Mes coups de cœur" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ———————————————————————————————————————— les étapes ————— */
  {
    slug: SLUGS_QUESTIONS[2],
    description:
      "Robe de mariée sur mesure : essayage, mensurations, confection à l'atelier, essayages, retouches incluses, retrait. Les étapes chez MADAMOON, Paris 10e.",
    chapo:
      "Du premier essayage au retrait, une robe sur mesure passe par huit temps. Les voici dans l'ordre, avec ce qui se passe à chacun.",
    sections: [
      {
        titre: "Les huit temps de votre robe",
        texte: [],
        ordonnee: true,
        liste: [
          "Le rendez-vous — vous réservez votre premier essayage, idéalement huit à neuf mois avant le mariage.",
          "L'essayage privé — une heure au showroom, privatisé pour vous et vos proches.",
          "Les mensurations — une fois votre choix fait, elles sont prises le jour même, pour lancer la confection.",
          "La confection — votre robe est réalisée à l'atelier, à vos mesures : matières nobles, finitions à la main.",
          "Le deuxième essayage — quand votre robe est prête, vous venez l'essayer en boutique.",
          "Les retouches — s'il faut ajuster, nos couturières s'en chargent, sur place.",
          "L'essayage final — il valide le tombé, la longueur, l'aisance.",
          "Le retrait — vous repartez avec votre robe, parfaitement ajustée.",
        ],
      },
      {
        titre: "Sur mesure ou semi-mesure",
        texte: [
          "La plupart des robes de la boutique sont confectionnées sur mesure, à partir de vos mensurations.",
          "Les robes Watters Designs sont en semi-mesure : la robe est réalisée sur un patron de la maison, puis ajustée à votre silhouette. Chaque fiche du site indique de quelle façon la robe est confectionnée. Dans les deux cas, les retouches sont incluses.",
        ],
      },
      {
        titre: "Les retouches, comprises",
        texte: [
          "Les retouches font partie de la confection : elles ne s'ajoutent pas au prix. Elles sont faites sur place, par les couturières de la boutique, qui ajustent votre robe jusqu'au dernier essayage.",
        ],
      },
      {
        titre: "Quand régler",
        texte: [
          "Le paiement suit les étapes : un acompte le jour des mensurations, le solde le jour des retouches.",
        ],
      },
    ],
    aRetenir: [
      "Mensurations prises le jour même du choix.",
      "Confection à l'atelier, à vos mesures — semi-mesure chez Watters Designs.",
      "Retouches incluses, faites sur place.",
      "Un essayage final avant de repartir avec votre robe.",
    ],
    liens: [
      { href: "/robes", label: "Voir toutes les robes" },
      { href: "/createurs/watters-designs", label: "Watters Designs" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ——————————————————————————————————————— le paiement ————— */
  {
    slug: SLUGS_QUESTIONS[3],
    description:
      "Paiement d'une robe de mariée chez MADAMOON : un acompte le jour des mensurations, le solde le jour des retouches. Les retouches sont incluses.",
    chapo:
      "Deux versements, à deux moments précis du parcours : un acompte quand la confection commence, le solde quand votre robe est ajustée.",
    sections: [
      {
        titre: "L'acompte, le jour des mensurations",
        texte: [
          "Une fois votre robe choisie, la boutique prend vos mensurations le jour même. C'est ce jour-là que l'acompte est versé : il lance la confection de votre robe à l'atelier, à vos mesures.",
        ],
      },
      {
        titre: "Le solde, le jour des retouches",
        texte: [
          "Quand votre robe est prête, vous venez l'essayer en boutique. S'il faut l'ajuster, un rendez-vous de retouches est prévu avec l'une des couturières, sur place. Le solde est réglé ce jour-là.",
        ],
      },
      {
        titre: "Ce que comprend le prix",
        texte: [
          "Le prix d'une robe sur mesure comprend sa confection et ses retouches : les ajustements faits par nos couturières ne s'ajoutent pas à la facture. Les accessoires vendus séparément — un voile, des gants — se règlent à part.",
        ],
      },
      {
        titre: "Les détails, avec la boutique",
        texte: [
          "Le montant de l'acompte et les moyens de paiement se précisent avec la boutique, au moment où vous choisissez votre robe. N'hésitez pas à poser la question lors de votre rendez-vous, ou à appeler le showroom avant.",
        ],
      },
    ],
    aRetenir: [
      "Un acompte, le jour des mensurations.",
      "Le solde, le jour des retouches.",
      "Les retouches sont comprises dans le prix.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
      { href: "/robes", label: "Voir toutes les robes" },
    ],
  },

  /* ————————————————————————————————————————— le prix ————— */
  {
    slug: SLUGS_QUESTIONS[4],
    description:
      "Prix d'une robe de mariée sur mesure chez MADAMOON : à partir de 1 500 €, retouches comprises. Ce qui fait varier le prix, et comment le connaître.",
    chapo:
      "Une robe de mariée sur mesure chez MADAMOON commence à 1 500 €, retouches comprises. Voici ce que recouvre ce prix, et pourquoi il varie d'une robe à l'autre.",
    sections: [
      {
        titre: "À partir de 1 500 €",
        texte: [
          "C'est le prix de départ d'une robe confectionnée sur mesure à la boutique. Il comprend la confection à l'atelier, selon vos mensurations, et les retouches faites sur place par nos couturières jusqu'au dernier essayage.",
        ],
      },
      {
        titre: "Ce qui fait varier le prix",
        texte: [
          "D'une robe à l'autre, le prix dépend d'abord du modèle et de la maison qui l'a dessiné, puis de ce qui le compose : la matière — satin, crêpe, tulle, dentelle de Chantilly —, la densité des broderies, l'ampleur de la jupe, la longueur de la traîne.",
          "Certaines robes s'accompagnent de pièces vendues séparément, comme un voile ou des gants. Elles se choisissent à part, et ne sont pas comprises dans le prix de la robe.",
        ],
      },
      {
        titre: "Une robe sur mesure n'a pas d'étiquette",
        texte: [
          "Son prix se précise avec vous, selon le modèle et ce que vous en faites. La boutique préfère en parler de vive voix, robe par robe, plutôt que d'annoncer un chiffre qui ne correspondrait pas à la vôtre.",
        ],
      },
      {
        titre: "Connaître le prix d'un modèle",
        texte: [
          "Contactez directement la boutique en lui indiquant les modèles qui vous intéressent, ou demandez-le pendant votre essayage. Vous pouvez garder ces modèles dans vos coups de cœur, sur le site, pour les retrouver facilement.",
        ],
      },
    ],
    aRetenir: [
      "À partir de 1 500 € pour une robe sur mesure.",
      "Confection et retouches comprises.",
      "Le prix varie selon le modèle, la maison et les matières.",
      "Pour un modèle précis : contactez la boutique.",
    ],
    liens: [
      { href: "/robes", label: "Voir toutes les robes" },
      { href: "/coups-de-coeur", label: "Mes coups de cœur" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ————————————————————————————————— venir accompagnée ————— */
  {
    slug: SLUGS_QUESTIONS[5],
    description:
      "Venir accompagnée à son essayage de robe de mariée : oui, et c'est conseillé. Le showroom MADAMOON est privatisé pour vous et vos proches. Paris 10e.",
    chapo:
      "Oui — et c'est même conseillé. Le showroom est privatisé pour vous : votre famille et vos amies sont les bienvenues pendant toute la durée de l'essayage.",
    sections: [
      {
        titre: "Un moment à partager",
        texte: [
          "Choisir sa robe de mariée se vit rarement seule. Parce que le showroom est privatisé pour vous pendant une heure, vos proches ne sont pas des spectatrices debout dans une allée : elles sont chez vous, le temps de l'essayage.",
          "La boutique l'a voulu ainsi — un cadre pensé pour faire de l'essayage une expérience à partager avec les personnes qui comptent.",
        ],
      },
      {
        titre: "Qui emmener",
        texte: [
          "Un conseil : venez avec celles dont l'avis compte vraiment pour vous, et dont le regard vous aide à voir clair. Une mère, une sœur, une amie qui vous connaît bien.",
          "Si vous venez à plusieurs, précisez-le au moment de réserver : la boutique pourra préparer votre venue.",
        ],
      },
      {
        titre: "Votre regard d'abord",
        texte: [
          "Les avis de vos proches sont précieux, mais c'est vous qui porterez la robe. La conseillère est là pour vous aider à faire la part des choses — et à reconnaître la robe dans laquelle vous vous sentez vous-même.",
        ],
      },
    ],
    aRetenir: [
      "Oui, et c'est conseillé.",
      "Le showroom est privatisé pour vous et vos proches.",
      "Si vous venez à plusieurs, dites-le en réservant.",
    ],
    liens: [
      { href: "/showroom", label: "Découvrir le showroom" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ————————————————————————————————————— le showroom ————— */
  {
    slug: SLUGS_QUESTIONS[6],
    description: `Le showroom MADAMOON : ${ADRESSE}. Essayages sur rendez-vous, le lundi de 12h à 21h, du mardi au samedi de 10h à 19h.`,
    chapo: `Le showroom MADAMOON est au ${ADRESSE}. Les essayages y ont lieu sur rendez-vous uniquement.`,
    sections: [
      {
        titre: "L'adresse",
        texte: [
          `${ADRESSE}, dans le 10ᵉ arrondissement. Le showroom occupe un élégant écrin du XIXᵉ siècle : un cadre hors du temps, pensé pour l'essayage d'une robe de mariée.`,
        ],
      },
      {
        titre: "Les horaires",
        texte: ["Les essayages ont lieu sur rendez-vous uniquement :"],
        liste: ["le lundi, de 12h à 21h ;", "du mardi au samedi, de 10h à 19h."],
      },
      {
        titre: "Pourquoi sur rendez-vous",
        texte: [
          "Parce que le showroom est privatisé pour chaque mariée, pendant une heure. Un rendez-vous, c'est la garantie d'avoir le lieu, les robes et l'attention de la boutique pour vous seule — sans attente, et sans croiser une autre cliente en cabine.",
        ],
      },
      {
        titre: "Nous joindre",
        texte: [
          `Par téléphone au ${MAISON.telephone}, ou par courriel à ${MAISON.email}. Pour l'itinéraire, la fiche de la boutique sur Google Maps vous guide jusqu'à la porte.`,
        ],
      },
    ],
    aRetenir: [
      ADRESSE,
      "Lundi : 12h – 21h. Mardi au samedi : 10h – 19h.",
      "Sur rendez-vous uniquement.",
    ],
    liens: [
      { href: "/showroom", label: "Découvrir le showroom" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ——————————————————————————————————— selon sa morphologie ————— */
  {
    slug: SLUGS_QUESTIONS[7],
    description:
      "Robe de mariée et morphologie : quelles coupes pour une silhouette en O, A, V, H, 8 ou X. Les conseils de la boutique MADAMOON, Paris 10e.",
    chapo:
      "Il n'y a pas de robe interdite : il y a des coupes qui servent mieux certaines silhouettes. Voici les pistes que la boutique donne, morphologie par morphologie.",
    sections: [
      {
        titre: "Six silhouettes, six points de départ",
        texte: ["Les coupes à essayer en premier, selon votre morphologie :"],
        liste: [
          "En O — des courbes généreuses : les coupes fluides et trapèze allongent la ligne ; un décolleté en V ou en cœur met la poitrine en valeur.",
          "En A — des hanches plus marquées que les épaules : la princesse et la trapèze équilibrent ; une encolure bateau élargit les épaules.",
          "En V — des épaules larges : les coupes fluides et princesse adoucissent le haut et donnent du volume au bas.",
          "En H — une ligne droite : les coupes fluides et les sirènes légères dessinent des courbes sans les forcer.",
          "En 8 — épaules et hanches équilibrées, taille marquée : toutes les coupes conviennent.",
          "En X — des courbes douces et une taille fine : toutes les coupes vous vont ; laissez le style de votre mariage guider le choix.",
        ],
      },
      {
        titre: "Des pistes, pas des règles",
        texte: [
          "Une morphologie n'exclut jamais une robe : elle ouvre des pistes. Rien n'est « à éviter » — c'est un conseil de style, pas une règle. Il arrive souvent qu'une mariée se trouve dans une coupe qu'elle n'aurait pas choisie sur le papier.",
          "C'est pour cela que l'essayage compte : la boutique vous propose ce qui vous servira, et le miroir fait le reste.",
        ],
      },
      {
        titre: "Trouver votre morphologie",
        texte: [
          "Chaque morphologie a sa page sur le site, avec les robes de la boutique qui la servent le mieux. Si vous hésitez sur la vôtre, Élise, la conseillère du site, vous oriente en trois questions.",
        ],
      },
    ],
    aRetenir: [
      "O : fluide, trapèze. A : princesse, trapèze.",
      "V : fluide, princesse. H : fluide, sirène.",
      "8 et X : toutes les coupes.",
      "Ce sont des pistes : l'essayage tranche.",
    ],
    liens: [
      { href: "/morphologies", label: "Les six morphologies" },
      { href: "/trouver-ma-robe", label: "Trouver ma robe avec Élise" },
      { href: "/coupes", label: "Les coupes" },
    ],
  },

  /* ——————————————————————————————————— quand essayer sa robe ————— */
  {
    slug: SLUGS_QUESTIONS[8],
    description:
      "Quand essayer sa robe de mariée : un premier essayage huit à neuf mois avant, un deuxième quand la robe est prête, un essayage final après les retouches.",
    chapo:
      "On n'essaie pas sa robe une fois, mais trois. Voici à quel moment du calendrier se place chacun de ces essayages.",
    sections: [
      {
        titre: "Les trois essayages dans le temps",
        texte: [],
        ordonnee: true,
        liste: [
          "Le premier essayage — idéalement huit à neuf mois avant le mariage. Vous choisissez votre robe, et vos mensurations sont prises le jour même.",
          "Le deuxième essayage — quand votre robe sort de l'atelier. Vous l'essayez en boutique pour voir ce qui doit être ajusté.",
          "L'essayage final — après les retouches. Il valide le tombé, la longueur, l'aisance, et vous repartez avec votre robe.",
        ],
      },
      {
        titre: "Pourquoi commencer si tôt",
        texte: [
          "Entre le premier et le deuxième essayage, il y a la confection : votre robe est réalisée à l'atelier, à vos mesures. C'est elle qui demande le plus de temps, et c'est pour elle que la boutique conseille huit à neuf mois.",
        ],
      },
      {
        titre: "Si le mariage approche",
        texte: [
          "Dites la date du mariage en prenant rendez-vous : la boutique trouve presque toujours une solution. Le calendrier des essayages suivants se fixe alors avec elle.",
        ],
      },
    ],
    aRetenir: [
      "Premier essayage : huit à neuf mois avant.",
      "Deuxième essayage : quand la robe est prête.",
      "Essayage final : après les retouches.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
      { href: `/faq/${SLUGS_QUESTIONS[2]}`, label: "Les étapes du sur-mesure" },
    ],
  },

  /* ——————————————————————————————————— la durée des retouches ————— */
  {
    slug: SLUGS_QUESTIONS[9],
    description:
      "Retouches d'une robe de mariée chez MADAMOON : après le deuxième essayage, faites sur place par nos couturières, incluses dans la confection sur mesure.",
    chapo:
      "Les retouches arrivent tard dans le parcours, quand la robe est confectionnée. Voici quand elles ont lieu, qui les fait, et comment se fixe leur calendrier.",
    sections: [
      {
        titre: "Quand ont-elles lieu",
        texte: [
          "Quand votre robe est prête, vous venez l'essayer en boutique. C'est ce deuxième essayage qui dit s'il faut ajuster quelque chose. Si oui, un rendez-vous de retouches est prévu avec l'une de nos couturières, sur place.",
        ],
      },
      {
        titre: "Combien de temps",
        texte: [
          "Il n'y a pas de durée unique : elle dépend de la robe — sa matière, sa construction, sa longueur — et de ce qu'il faut ajuster. Le calendrier des retouches se fixe avec la boutique, une fois le deuxième essayage passé, en tenant compte de la date de votre mariage.",
        ],
      },
      {
        titre: "Ce que comprennent les retouches",
        texte: [
          "Les retouches sont incluses dans la confection sur mesure : elles ne s'ajoutent pas au prix. Nos couturières ajustent votre robe jusqu'au dernier essayage, qui valide le tombé, la longueur et l'aisance. Le solde est réglé le jour des retouches.",
        ],
      },
    ],
    aRetenir: [
      "Après le deuxième essayage, sur place.",
      "Durée selon la robe et les ajustements.",
      "Incluses dans la confection sur mesure.",
    ],
    liens: [
      { href: `/faq/${SLUGS_QUESTIONS[2]}`, label: "Les étapes du sur-mesure" },
      { href: `/faq/${SLUGS_QUESTIONS[3]}`, label: "Le paiement" },
    ],
  },

  /* ——————————————————————————————————— le nombre d'essayages ————— */
  {
    slug: SLUGS_QUESTIONS[10],
    description:
      "Combien d'essayages pour une robe de mariée : trois chez MADAMOON — le choix, le deuxième essayage, l'essayage final —, plus les retouches si besoin.",
    chapo:
      "Trois essayages, et parfois un rendez-vous de retouches entre les deux derniers. Voici ce qui se passe à chacun.",
    sections: [
      {
        titre: "Les trois essayages",
        texte: [],
        ordonnee: true,
        liste: [
          "Le premier — une heure au showroom privatisé pour vous : vous choisissez votre robe, et vos mensurations sont prises le jour même.",
          "Le deuxième — votre robe est sortie de l'atelier : vous l'essayez pour voir ce qui doit être ajusté.",
          "Le final — après les retouches : il valide le tombé, la longueur, l'aisance.",
        ],
      },
      {
        titre: "Et les retouches",
        texte: [
          "S'il faut ajuster votre robe après le deuxième essayage, un rendez-vous de retouches est prévu avec l'une de nos couturières, sur place. Elles sont incluses dans la confection sur mesure.",
        ],
      },
      {
        titre: "Venir préparée",
        texte: [
          "Un conseil : à partir du deuxième essayage, venez avec la lingerie et, si possible, les chaussures que vous porterez le jour du mariage. La longueur de la robe et son tombé s'ajustent sur elles.",
        ],
      },
    ],
    aRetenir: [
      "Trois essayages : le choix, le deuxième, le final.",
      "Un rendez-vous de retouches si besoin.",
      "Apportez lingerie et chaussures dès le deuxième.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
      { href: `/faq/${SLUGS_QUESTIONS[1]}`, label: "Le déroulé d'un essayage" },
    ],
  },

  /* ——————————————————————————————————— faut-il un rendez-vous ————— */
  {
    slug: SLUGS_QUESTIONS[11],
    description:
      "Essayer une robe de mariée chez MADAMOON se fait sur rendez-vous uniquement : le showroom est privatisé une heure pour vous. Réservation en ligne, Paris 10e.",
    chapo:
      "Oui : le showroom MADAMOON reçoit sur rendez-vous uniquement. Voici pourquoi, et comment réserver.",
    sections: [
      {
        titre: "Pourquoi sur rendez-vous",
        texte: [
          "Parce que le showroom est privatisé pour chaque mariée, pendant une heure. Un rendez-vous, c'est l'assurance d'avoir le lieu, les robes et l'attention de la boutique pour vous seule — sans attente, et sans croiser une autre cliente en cabine.",
        ],
      },
      {
        titre: "Comment réserver",
        texte: [
          "Le rendez-vous se prend en ligne, en choisissant un créneau, ou par téléphone. Si des robes vous ont plu sur le site, dites-le en réservant : elles seront préparées pour votre venue.",
        ],
      },
      {
        titre: "Les horaires",
        texte: ["Le showroom reçoit :"],
        liste: ["le lundi, de 12h à 21h ;", "du mardi au samedi, de 10h à 19h."],
      },
    ],
    aRetenir: [
      "Sur rendez-vous uniquement.",
      "Une heure, le showroom privatisé pour vous.",
      "Réservation en ligne ou par téléphone.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
      { href: "/showroom", label: "Découvrir le showroom" },
    ],
  },

  /* ——————————————————————————————————— un mariage en hiver ————— */
  {
    slug: SLUGS_QUESTIONS[12],
    description:
      "Robe de mariée d'hiver : manches longues, col montant, mikado, satin, crêpe ou cape. Les robes MADAMOON pour un mariage en saison froide, Paris 10e.",
    chapo:
      "Un mariage en hiver se prête aux robes qui couvrent et qui ont de la tenue. Voici ce qu'il faut regarder, et les robes de la boutique qui s'y prêtent.",
    sections: [
      {
        titre: "Ce qui fait une robe d'hiver",
        texte: ["Quelques repères, pour une robe qui ne vous laisse pas grelotter sur les photos :"],
        liste: [
          "des manches longues, en dentelle ou en tulle, ou des manches amovibles qu'on retire pour la soirée ;",
          "un col montant ou un dos plus couvert ;",
          "des matières qui ont de la tenue : le mikado, le satin, le crêpe ;",
          "une cape ou une étole sur les épaules, pour la sortie de la mairie ou de l'église.",
        ],
      },
      {
        titre: "Les robes de la boutique",
        texte: [
          "Plusieurs robes du catalogue ont des manches longues : Seraphina d'Olya Mak, en dentelle brodée ; Montana et Bella de Casablanca Bridal ; Pendant de Watters Designs. D'autres ont des manches amovibles, comme Aster ou Riviera. Sheridan s'accompagne d'une cape assortie.",
          "Les robes en mikado — Trinity, Fern, Livia, Kensington — ont la tenue d'une matière d'hiver.",
        ],
      },
      {
        titre: "La lumière d'hiver",
        texte: [
          "Un conseil : en hiver, la lumière est plus basse et plus froide. Les satins et les mikados la captent bien, et les dentelles se lisent mieux sur une robe plus structurée.",
        ],
      },
    ],
    aRetenir: [
      "Manches longues ou amovibles, col montant.",
      "Mikado, satin, crêpe : des matières qui tiennent.",
      "Une cape pour les sorties.",
    ],
    liens: [
      { href: "/robes/seraphina", label: "Seraphina" },
      { href: "/robes/montana", label: "Montana" },
      { href: "/robes/pendant", label: "Pendant" },
      { href: "/robes", label: "Voir toutes les robes" },
    ],
  },

  /* ——————————————————————————————————— qui emmener ————— */
  {
    slug: SLUGS_QUESTIONS[13],
    description:
      "Qui emmener à l'essayage de sa robe de mariée : celles dont l'avis compte et qui vous aident à voir clair. Le showroom MADAMOON est privatisé pour vous.",
    chapo:
      "L'essayage se partage, mais il se prépare aussi : le choix de celles qui vous accompagnent compte presque autant que celui des robes.",
    sections: [
      {
        titre: "Celles dont l'avis compte",
        texte: [
          "Un conseil : venez avec les personnes dont le regard vous aide à voir clair — une mère, une sœur, une amie qui vous connaît bien. Celles qui savent ce que vous aimez, et qui vous le diront franchement.",
        ],
      },
      {
        titre: "Pas trop nombreuses",
        texte: [
          "Plus les avis sont nombreux, plus ils se contredisent. Un petit cercle laisse davantage de place à votre propre regard, et à la conversation avec la conseillère. Si vous venez à plusieurs, précisez-le au moment de réserver : la boutique pourra préparer votre venue.",
        ],
      },
      {
        titre: "Un lieu fait pour les recevoir",
        texte: [
          "Le showroom est privatisé pour vous pendant une heure : vos proches ne sont pas debout dans une allée, elles sont chez vous, le temps de l'essayage.",
        ],
      },
    ],
    aRetenir: [
      "Celles dont l'avis compte vraiment.",
      "Un petit cercle, pour garder votre regard.",
      "Venir à plusieurs ? Dites-le en réservant.",
    ],
    liens: [
      { href: `/faq/${SLUGS_QUESTIONS[5]}`, label: "Venir accompagnée" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ——————————————————————————————————— quand commencer à chercher ————— */
  {
    slug: SLUGS_QUESTIONS[14],
    description:
      "Quand commencer à chercher sa robe de mariée : dès la date fixée pour s'inspirer, et un essayage huit à neuf mois avant. Comment préparer sa recherche.",
    chapo:
      "La recherche commence bien avant l'essayage. Voici comment l'organiser, de la date fixée au premier rendez-vous en boutique.",
    sections: [
      {
        titre: "Dès que la date est fixée",
        texte: [
          "C'est le bon moment pour regarder, sans pression : les coupes qui vous attirent, les matières, les détails — un dos, des manches, une traîne. Sur le site, gardez les robes qui vous arrêtent dans vos coups de cœur.",
        ],
      },
      {
        titre: "Comprendre ce qui vous va",
        texte: [
          "Les pages consacrées aux coupes et aux morphologies vous aident à savoir par où commencer. Élise, la conseillère du site, part de votre silhouette et vous oriente en trois questions.",
        ],
      },
      {
        titre: "Puis l'essayage, huit à neuf mois avant",
        texte: [
          "Le premier essayage en boutique se prévoit idéalement huit à neuf mois avant le mariage : c'est le temps qu'il faut pour la confection et les retouches. Arriver avec quelques coups de cœur, et une idée des coupes qui vous plaisent, rend ce rendez-vous plus efficace.",
        ],
      },
    ],
    aRetenir: [
      "Dès la date fixée : s'inspirer, garder ses coups de cœur.",
      "Comprendre les coupes et sa morphologie.",
      "Essayage en boutique : huit à neuf mois avant.",
    ],
    liens: [
      { href: "/robes", label: "Voir toutes les robes" },
      { href: "/coupes", label: "Les coupes" },
      { href: "/trouver-ma-robe", label: "Trouver ma robe avec Élise" },
    ],
  },

  /* ——————————————————————————————————— combien de robes essayer ————— */
  {
    slug: SLUGS_QUESTIONS[15],
    description:
      "Combien de robes de mariée essayer : pas de bon nombre, mais quelques robes bien choisies, dans des coupes différentes. Les conseils MADAMOON, Paris 10e.",
    chapo:
      "Il n'y a pas de nombre juste. Il y a une méthode : essayer moins, mais mieux.",
    sections: [
      {
        titre: "Quelques robes bien choisies",
        texte: [
          "Une longue série brouille le regard : au bout de quelques robes, on ne se souvient plus de la première. Mieux vaut un petit nombre de robes choisies avec la conseillère, en fonction de votre silhouette et de ce que vous aimez.",
        ],
      },
      {
        titre: "Des coupes différentes",
        texte: [
          "Un conseil : essayez au moins une robe dans une coupe que vous n'auriez pas choisie. Beaucoup de mariées se découvrent dans une sirène ou une princesse qu'elles avaient écartée sur le papier.",
        ],
      },
      {
        titre: "Reconnaître la bonne",
        texte: [
          "L'heure d'essayage n'est pas faite pour enchaîner les robes, mais pour vous mener jusqu'à celle dans laquelle vous vous reconnaissez pleinement. Quand c'est elle, on n'a plus envie d'en essayer une autre.",
        ],
      },
    ],
    aRetenir: [
      "Pas de bon nombre.",
      "Quelques robes, dans des coupes différentes.",
      "Une coupe inattendue, au moins une fois.",
    ],
    liens: [
      { href: "/coupes", label: "Les coupes" },
      { href: `/faq/${SLUGS_QUESTIONS[1]}`, label: "Le déroulé d'un essayage" },
    ],
  },

  /* ——————————————————————————————————— sur mesure ou prêt-à-porter ————— */
  {
    slug: SLUGS_QUESTIONS[16],
    description:
      "Robe de mariée sur mesure ou prêt-à-porter : tailles standard ou confection à vos mensurations. Chez MADAMOON, sur mesure ou semi-mesure, retouches incluses.",
    chapo:
      "Deux façons de faire une robe de mariée. Voici ce qui les distingue, et ce que propose la boutique.",
    sections: [
      {
        titre: "Le prêt-à-porter",
        texte: [
          "Une robe de prêt-à-porter existe en tailles standard. On choisit la taille la plus proche de la sienne, puis la robe se retouche pour s'ajuster.",
        ],
      },
      {
        titre: "Le sur-mesure",
        texte: [
          "Une robe sur mesure est confectionnée selon vos mensurations, prises le jour où vous la choisissez. Elle est ensuite essayée, puis ajustée par des couturières jusqu'au dernier essayage.",
        ],
      },
      {
        titre: "Chez MADAMOON",
        texte: [
          "Les robes de la boutique sont réalisées à l'atelier, sur mesure. Les robes Watters Designs sont en semi-mesure : elles sont réalisées sur un patron de la maison, puis ajustées à votre silhouette. Chaque fiche du site indique de quelle façon la robe est confectionnée.",
          "Dans les deux cas, les retouches sont incluses. Une robe sur mesure commence à 1 500 €.",
        ],
      },
    ],
    aRetenir: [
      "Prêt-à-porter : tailles standard, puis retouches.",
      "Sur mesure : confectionnée à vos mensurations.",
      "MADAMOON : sur mesure, semi-mesure chez Watters.",
    ],
    liens: [
      { href: `/faq/${SLUGS_QUESTIONS[2]}`, label: "Les étapes du sur-mesure" },
      { href: `/faq/${SLUGS_QUESTIONS[4]}`, label: "Le prix d'une robe sur mesure" },
    ],
  },

  /* ——————————————————————————————————— entretenir la dentelle ————— */
  {
    slug: SLUGS_QUESTIONS[17],
    description:
      "Entretenir une robe de mariée en dentelle : housse respirante, cintre large, à l'abri de la lumière, puis un pressing spécialisé après le mariage.",
    chapo:
      "La dentelle est la matière la plus fragile d'une robe. Quelques gestes simples la gardent belle, avant et après le mariage.",
    sections: [
      {
        titre: "Avant le mariage",
        texte: ["Une fois votre robe retirée :"],
        liste: [
          "gardez-la dans une housse en tissu respirant, plutôt qu'en plastique ;",
          "sur un cintre large, qui ne marque pas les épaules — ou à plat si elle est lourde ;",
          "à l'abri de la lumière et de l'humidité ;",
          "manipulez-la les mains propres, sans crème ni parfum.",
        ],
      },
      {
        titre: "Après le mariage",
        texte: [
          "Confiez-la à un pressing spécialisé dans les robes de mariée plutôt que de la laver vous-même : la dentelle se déforme, s'accroche et se marque facilement. Plus tôt elle est nettoyée, mieux les taches partent.",
        ],
      },
      {
        titre: "Pour la garder longtemps",
        texte: [
          "Après le nettoyage, rangez-la à plat dans une boîte, entre des feuilles de papier de soie non acide, dans un endroit sec. Un conseil : sortez-la de temps en temps pour la replier autrement, afin que les plis ne marquent pas toujours au même endroit.",
        ],
      },
    ],
    aRetenir: [
      "Housse en tissu, cintre large, à l'abri de la lumière.",
      "Un pressing spécialisé après le mariage.",
      "Rangée à plat, dans du papier de soie.",
    ],
    liens: [{ href: "/robes", label: "Voir toutes les robes" }],
  },

  /* ——————————————————————————————————— sous une robe sirène ————— */
  {
    slug: SLUGS_QUESTIONS[18],
    description:
      "Que porter sous une robe de mariée sirène : une lingerie sans coutures, couleur chair, choisie selon le décolleté et le dos. Portée dès le deuxième essayage.",
    chapo:
      "La sirène épouse la silhouette jusqu'aux genoux : sous elle, tout se voit. Voici comment choisir ce que vous porterez dessous.",
    sections: [
      {
        titre: "Sans coutures, couleur chair",
        texte: [
          "Une lingerie lisse, sans coutures ni dentelle en relief, qui ne marque pas sous le tissu. La couleur chair, proche de votre peau, disparaît sous les matières claires — le blanc pur, lui, se devine.",
        ],
      },
      {
        titre: "Selon le décolleté et le dos",
        texte: [
          "Un décolleté cœur ou des épaules dénudées appellent un soutien-gorge sans bretelles ; un dos nu ou très échancré, une solution adaptée au dos. Certaines robes ont un corset structuré, qui soutient déjà la poitrine : posez la question à la boutique.",
        ],
      },
      {
        titre: "Dès le deuxième essayage",
        texte: [
          "Un conseil : portez cette lingerie dès le deuxième essayage. La robe s'ajuste sur ce que vous aurez dessous le jour du mariage — un changement après les retouches peut tout décaler.",
        ],
      },
    ],
    aRetenir: [
      "Sans coutures, couleur chair.",
      "Choisie selon le décolleté et le dos.",
      "Portée dès le deuxième essayage.",
    ],
    liens: [
      { href: "/coupes/sirene", label: "Les robes sirène" },
      { href: `/faq/${SLUGS_QUESTIONS[10]}`, label: "Le nombre d'essayages" },
    ],
  },

  /* ——————————————————————————————————— une robe achetée en ligne ————— */
  {
    slug: SLUGS_QUESTIONS[19],
    description:
      "Retoucher une robe de mariée achetée en ligne : souvent possible, selon la coupe, la matière et l'écart avec vos mesures. Ce qu'il faut savoir avant.",
    chapo:
      "Une robe achetée en ligne arrive rarement à vos mesures exactes. Elle se retouche souvent — mais pas toujours, et pas à n'importe quel prix.",
    sections: [
      {
        titre: "Ce qui se retouche",
        texte: [
          "Le plus souvent, une couturière habituée aux robes de mariée peut reprendre la taille, les côtés, les bretelles et l'ourlet. Tout dépend de la coupe, de la matière et de l'écart avec vos mesures.",
        ],
      },
      {
        titre: "Ce qui se retouche mal",
        texte: [
          "Une robe trop petite se rattrape difficilement : il faut du tissu dans les coutures pour l'élargir. Les dentelles posées motif par motif, les broderies et les perles demandent un travail long et minutieux. Et un ourlet sur une traîne ou une jupe en plusieurs couches se reprend couche par couche.",
        ],
      },
      {
        titre: "Chez MADAMOON",
        texte: [
          "Les retouches sont comprises pour les robes que la boutique confectionne, sur mesure ou en semi-mesure. Pour une robe achetée ailleurs, renseignez-vous directement auprès de la boutique.",
        ],
      },
    ],
    aRetenir: [
      "Souvent possible, chez une couturière spécialisée.",
      "Une robe trop petite se rattrape mal.",
      "MADAMOON : retouches comprises pour ses robes.",
    ],
    liens: [
      { href: `/faq/${SLUGS_QUESTIONS[16]}`, label: "Sur mesure ou prêt-à-porter" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ——————————————————————————————————— où essayer à Paris ————— */
  {
    slug: SLUGS_QUESTIONS[20],
    description: `Où essayer une robe de mariée à Paris ? Au showroom MADAMOON, ${MAISON.adresse}, Paris 10e : sur rendez-vous, privatisé pour vous pendant une heure.`,
    chapo:
      "Pour essayer une robe de mariée à Paris, il faut un lieu, du temps et des robes. Voici ce que le showroom MADAMOON vous réserve.",
    sections: [
      {
        titre: "Le showroom",
        texte: [
          `${ADRESSE}, dans le 10ᵉ arrondissement. Le showroom occupe un élégant écrin du XIXᵉ siècle, pensé pour l'essayage d'une robe de mariée.`,
        ],
      },
      {
        titre: "Un lieu pour vous seule",
        texte: [
          "Les essayages ont lieu sur rendez-vous uniquement : le showroom est privatisé pour chaque mariée pendant une heure. Vos proches sont les bienvenues pendant tout l'essayage.",
        ],
        liste: ["le lundi, de 12h à 21h ;", "du mardi au samedi, de 10h à 19h."],
      },
      {
        titre: "Les robes",
        texte: [
          "Celles de quatre maisons — Casablanca Bridal, Watters Designs, Monica Loretti et Olya Mak —, dans cinq coupes : sirène, princesse, fluide, trapèze et deux-en-un. Les robes sont ensuite confectionnées à l'atelier, à vos mesures, retouches incluses.",
        ],
      },
    ],
    aRetenir: [
      ADRESSE,
      "Sur rendez-vous, showroom privatisé pendant une heure.",
      "Quatre maisons, cinq coupes.",
    ],
    liens: [
      { href: "/showroom", label: "Découvrir le showroom" },
      { href: `/faq/${SLUGS_QUESTIONS[6]}`, label: "Adresse et horaires" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },

  /* ——————————————————————————————————— que faut-il apporter ————— */
  {
    slug: SLUGS_QUESTIONS[21],
    description:
      "Que faut-il apporter à son premier essayage de robe de mariée ? Venir sans maquillage, avec ses proches, des chaussures, une lingerie adaptée et quelques images.",
    chapo:
      "Le premier essayage se prépare un peu. Voici ce qu'il faut avoir avec soi — et ce qu'il vaut mieux laisser à la maison.",
    sections: [
      {
        titre: "Ce que demande la boutique",
        texte: [
          "Venez sans maquillage : c'est ce qui préserve les robes, que d'autres mariées essaieront après vous. Et venez accompagnée si vous le souhaitez — le showroom est privatisé, vos proches sont les bienvenues.",
        ],
      },
      {
        titre: "Ce qu'il est utile d'apporter",
        texte: [],
        liste: [
          "Des chaussures — à la hauteur de talon que vous envisagez : la robe ne tombe pas de la même façon à plat ou sur un talon.",
          "Une lingerie couleur chair, sans coutures — elle ne marque pas sous les matières claires.",
          "Quelques images — les robes repérées en ligne, gardées dans vos coups de cœur, ou des photographies du lieu du mariage.",
          "La date du mariage — elle fixe le calendrier de la confection.",
        ],
      },
      {
        titre: "Ce qu'il vaut mieux laisser",
        texte: [
          "Un conseil : trop d'avis. Deux ou trois personnes qui vous connaissent bien vous aident davantage qu'une grande assemblée.",
        ],
      },
    ],
    aRetenir: [
      "Sans maquillage.",
      "Des chaussures et une lingerie adaptée.",
      "Quelques images, et la date du mariage.",
    ],
    liens: [
      { href: `/faq/${SLUGS_QUESTIONS[1]}`, label: "Le déroulement de l'essayage" },
      { href: `/faq/${SLUGS_QUESTIONS[13]}`, label: "Qui emmener à l'essayage" },
      { href: "/coups-de-coeur", label: "Vos coups de cœur" },
    ],
  },

  /* ——————————————————————————————————— plusieurs coupes ————— */
  {
    slug: SLUGS_QUESTIONS[22],
    description:
      "Peut-on essayer plusieurs coupes de robes de mariée au même rendez-vous ? Oui : sirène, princesse, fluide, trapèze, comparées dans un showroom privatisé.",
    chapo:
      "Beaucoup de mariées arrivent sûres d'une coupe et repartent amoureuses d'une autre. Essayer plusieurs coupes, c'est se laisser cette chance.",
    sections: [
      {
        titre: "Oui, et c'est conseillé",
        texte: [
          "Une coupe se juge sur soi, pas sur une photographie. Quelques robes bien choisies, dans des coupes différentes, vous apprennent vite ce qui vous va — et ce qui ne vous va pas.",
        ],
      },
      {
        titre: "Les cinq coupes",
        texte: [],
        liste: [
          "La sirène — ajustée jusqu'aux cuisses, puis évasée.",
          "La princesse — un corset travaillé, un volume assumé.",
          "La fluide — un tombé souple qui suit le mouvement.",
          "La trapèze — un buste ajusté, une jupe en A.",
          "La deux-en-un — une robe, deux allures.",
        ],
      },
      {
        titre: "Un conseil",
        texte: [
          "Commencez par la coupe dont vous rêvez, puis essayez-en une à l'opposé : une sirène après une princesse, une fluide après une trapèze. Le contraste dit souvent plus qu'une longue série. Le showroom étant privatisé pendant une heure, vous avez le temps de comparer.",
        ],
      },
    ],
    aRetenir: [
      "Oui : c'est même conseillé.",
      "Une coupe se juge sur soi.",
      "Essayez la coupe rêvée, puis son contraire.",
    ],
    liens: [
      { href: "/coupes", label: "Les cinq coupes" },
      { href: `/faq/${SLUGS_QUESTIONS[15]}`, label: "Combien de robes essayer" },
      { href: "/morphologies", label: "Les morphologies" },
    ],
  },

  /* ——————————————————————————————————— préparer son rendez-vous ————— */
  {
    slug: SLUGS_QUESTIONS[23],
    description:
      "Préparer son rendez-vous pour choisir sa robe de mariée à Paris : réserver huit à neuf mois avant, repérer des coupes, choisir qui vous accompagne.",
    chapo:
      "Un rendez-vous bien préparé, c'est une heure d'essayage qui compte. Voici comment arriver prête.",
    sections: [
      {
        titre: "Les étapes",
        ordonnee: true,
        texte: [],
        liste: [
          "Réservez — idéalement huit à neuf mois avant le mariage, en ligne ou par téléphone.",
          "Repérez — quelques coupes et robes qui vous plaisent, dans le catalogue ou les pages des coupes.",
          "Pensez à votre morphologie — les pages consacrées à chacune, ou Élise, la conseillère du site, vous orientent en quelques questions.",
          "Pensez au mariage — le lieu, la saison, la cérémonie : une mairie, une église, un domaine n'appellent pas la même robe.",
          "Choisissez qui vous accompagne — deux ou trois personnes dont l'avis compte.",
          "Le jour même — venez sans maquillage, avec des chaussures à la bonne hauteur de talon.",
        ],
      },
      {
        titre: "S'il vous reste moins de temps",
        texte: [
          "Dites-le dès la prise de rendez-vous, en précisant la date du mariage : la boutique trouve presque toujours une solution.",
        ],
      },
    ],
    aRetenir: [
      "Réservez huit à neuf mois avant.",
      "Arrivez avec quelques coups de cœur.",
      "Venez sans maquillage, bien accompagnée.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
      { href: "/trouver-ma-robe", label: "Trouver ma robe avec Élise" },
      { href: `/faq/${SLUGS_QUESTIONS[21]}`, label: "Que faut-il apporter" },
    ],
  },

  /* ——————————————————————————————————— hésiter entre plusieurs robes ————— */
  {
    slug: SLUGS_QUESTIONS[24],
    description:
      "Hésiter entre plusieurs robes de mariée après l'essayage : comparer, écarter, réessayer ses finalistes, sans perdre de vue le calendrier. Les conseils MADAMOON.",
    chapo:
      "Hésiter est normal : c'est souvent le signe que plusieurs robes vous vont. Voici comment trancher sereinement.",
    sections: [
      {
        titre: "Comparer",
        texte: [
          "Un conseil : notez, juste après l'essayage, ce qui vous a plu dans chaque robe — la coupe, la matière, le décolleté, ce que vous avez ressenti. Souvent, deux robes partagent la même qualité, et c'est elle que vous cherchez.",
        ],
      },
      {
        titre: "Écarter",
        texte: [
          "Retirez d'abord celle qui vous convainc le moins, puis demandez-vous dans laquelle vous vous voyez entrer, danser, être photographiée. Et écoutez-vous avant vos proches : c'est vous qui la porterez.",
        ],
      },
      {
        titre: "Réessayer",
        texte: [
          "Un nouveau rendez-vous permet de réessayer vos deux ou trois finalistes, l'esprit reposé ; il se prend comme le premier, en ligne ou par téléphone. Gardez simplement un œil sur le calendrier : la confection commence une fois votre choix fait, et vos mensurations sont prises le jour même.",
        ],
      },
    ],
    aRetenir: [
      "Notez ce qui vous plaît dans chacune.",
      "Écartez, puis écoutez-vous.",
      "Réessayez vos finalistes, sans trop attendre.",
    ],
    liens: [
      { href: `/faq/${SLUGS_QUESTIONS[15]}`, label: "Combien de robes essayer" },
      { href: `/faq/${SLUGS_QUESTIONS[2]}`, label: "Les étapes du sur-mesure" },
      { href: "/rendez-vous", label: "Prendre rendez-vous" },
    ],
  },
];

/** L'article d'une adresse, et son rang dans la FAQ. */
export function questionParSlug(slug: string) {
  const i = ARTICLES.findIndex((q) => q.slug === slug);
  return i < 0 ? undefined : { article: ARTICLES[i], rang: i };
}
