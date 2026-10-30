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
          "Si votre budget est une contrainte, dites-le au premier rendez-vous : le choix du modèle et de la matière se fait avec vous, et c'est la façon la plus sûre d'arriver à une robe de mariée au bon prix. Pour une location, posez la question au showroom.",
        ],
      },
      {
        titre: "Quand réserver, pour tenir le budget et les délais",
        texte: [
          "Prévoyez votre premier essayage idéalement huit à neuf mois avant la date du mariage : c'est le temps de la confection à vos mesures, des essayages et des retouches. Avec moins de temps, dites-le nous : nous trouvons presque toujours une solution.",
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
];

export const guideParSlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
