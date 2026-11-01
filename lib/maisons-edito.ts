import { MAISON } from "@/lib/madamoon";

/*
 * Ce que la page d'une maison dit d'elle, en français, sous ses robes.
 *
 * La page ne montrait que des tuiles : un moteur n'y lisait que des
 * prénoms. Ces paragraphes disent ce que le catalogue dit déjà — les
 * matières, les détails, les coupes qui reviennent sur les fiches de la
 * maison —, et ce que la boutique fait de ses robes : les choisir, les
 * essayer, les confectionner à vos mesures. Rien d'autre : ni histoire
 * de la maison, ni chiffres, ni promesses qui ne soient pas celles du
 * site. Les expressions visées (« créateur robe de mariée paris », « robe
 * de mariée sur mesure paris », « watters & watters ») ont chacune leur
 * place, une fois.
 */

export type EditoMaison = {
  titre: string;
  paragraphes: string[];
};

export const MAISONS_EDITO: Record<string, EditoMaison> = {
  "watters-designs": {
    titre: "Watters Designs, de Dallas au showroom",
    paragraphes: [
      "Souvent cherchée sous son nom historique, « Watters & Watters », la maison de Dallas est celle des dentelles nommées : Caterina sur Charlotte et Clover, Highclare sur Calla, Cassie sur Mitra, Chantilly sur Oksana ou Aster. Ses fiches parlent de dos illusion, de manches amovibles, de charmeuse légère — Adularia, Amaryllis, Ryle, Riviera — et de tailles basses sculptées.",
      "Chez MADAMOON, les robes Watters Designs sont réalisées en semi-mesure, retouches comprises : la taille la plus proche de vos mensurations, puis l'ajustement par nos couturières jusqu'au dernier essayage. Elles s'essaient au showroom du 10ᵉ, à Paris, sur rendez-vous.",
    ],
  },
  "casablanca-bridal": {
    titre: "Casablanca Bridal, de Newport Beach au showroom",
    paragraphes: [
      "La maison californienne est la plus présente du catalogue : satin mat et dentelle de Chantilly sur Sheridan, Charlize ou Montana, néoprène sur Enid, crêpe sur Bondi, tulle pailleté sur Carrie, mikado sur Kensington, georgette stretch sur Zina. Ses fiches reviennent sur les corsets à taille basque en pointe, les bretelles amovibles, les dos illusion et les traînes longues.",
      "Chaque robe Casablanca Bridal choisie au showroom est confectionnée à vos mesures, puis ajustée sur place, retouches comprises. Elles s'essaient au showroom MADAMOON, dans le 10ᵉ, à Paris, sur rendez-vous.",
    ],
  },
  "olya-mak": {
    titre: "Olya Mak, de Lviv au showroom",
    paragraphes: [
      "Quatre robes, deux registres. Le court : Elin, en crêpe, pensée pour un mariage civil, et River, courte au décolleté carré et aux larges bretelles. Le long : Chastity, en dentelle à manches longues et col montant, rangée avec les deux-en-un, et Seraphina, princesse en dentelle brodée, dos nu et manches longues.",
      "Les robes Olya Mak sont confectionnées à vos mesures après l'essayage, retouches comprises. Elles s'essaient au showroom MADAMOON, dans le 10ᵉ, à Paris, sur rendez-vous.",
    ],
  },
  "monica-loretti": {
    titre: "Monica Loretti, de Rome au showroom",
    paragraphes: [
      "L'école italienne, disent ses fiches : le crêpe lisse de Mira et de Milan, le jacquard floral de Monica, la dentelle florale et la mousseline de Murielle, la ligne intemporelle de Marie. Mathilda, fluide et confortable, est la robe du catalogue pensée pour la femme enceinte.",
      "Les robes Monica Loretti sont confectionnées à vos mesures après l'essayage, retouches comprises. Elles s'essaient au showroom MADAMOON, dans le 10ᵉ, à Paris, sur rendez-vous.",
    ],
  },
  "autres-createurs": {
    titre: "Les petits ateliers, au showroom",
    paragraphes: [
      "Des ateliers européens indépendants, que la boutique trouve un par un et réunit ici : Hera en satin aux bretelles tombantes, Livia en mikado, Dolores au col carré, Angel aux perles et paillettes, Lovia et Alicia en trapèze ou volume princesse, Agnessa au dos spectaculaire en V, Amandine en dentelle au décolleté plongeant. Des modèles exclusifs, qui ne se voient pas ailleurs.",
      `Comme toutes les robes du catalogue, elles sont confectionnées à vos mesures après l'essayage, retouches comprises, à partir de ${MAISON.prixDepart}. Elles s'essaient au showroom MADAMOON, dans le 10ᵉ, à Paris, sur rendez-vous.`,
    ],
  },
};

/* Le texte du hub : ce que « créateur de robe de mariée à Paris » veut
 * dire chez MADAMOON — une boutique qui choisit, pas une maison qui
 * dessine. */
export const CREATEURS_EDITO = {
  titre: "Créateur de robe de mariée à Paris : ce que fait MADAMOON",
  paragraphes: [
    "On cherche un créateur ou une créatrice de robe de mariée à Paris pour une robe de mariage qui ne soit pas celle de tout le monde, et faite pour soi. MADAMOON répond autrement qu'une maison de couture : la boutique ne dessine pas, elle choisit — robe par robe, chez Watters Designs à Dallas, Casablanca Bridal à Newport Beach, Olya Mak à Lviv, Monica Loretti à Rome, et dans de petits ateliers européens indépendants.",
    `Puis elle fait ce qu'un créateur fait pour sa cliente : la robe de mariée choisie au showroom est confectionnée sur mesure à l'atelier, selon vos mensurations — en semi-mesure pour Watters Designs —, et ajustée par nos couturières, retouches comprises, à partir de ${MAISON.prixDepart}. Une robe de créateur, à Paris, à vos mesures : c'est la promesse, et elle tient en une heure d'essayage privé dans le 10ᵉ. Couturière, designer, créatrice : les mots diffèrent, la confection est la même — une création de maison, ajustée par nos couturières, en demi-mesure chez Watters, sur mesure ailleurs — et « autour de moi » veut dire ici le 10ᵉ arrondissement.`,
  ],
  liens: [
    { href: "/guides/prix-robe-de-mariee-paris", label: "Le prix d'une robe de mariée à Paris" },
    { href: "/guides/choisir-sa-robe-de-mariee", label: "Comment choisir sa robe de mariée" },
    { href: "/rendez-vous", label: "Prendre rendez-vous pour un essayage" },
  ],
};
