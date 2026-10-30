import type { Lettre } from "@/lib/madamoon";
import { MAISON } from "@/lib/madamoon";
import type { Style } from "@/lib/questions";

/*
 * Les pages transversales du catalogue : un style, une matière, un détail.
 *
 * Elles ne sont pas des coupes : la dentelle traverse les sirènes comme
 * les trapèzes. Chacune a donc sa propre adresse — /styles/boheme,
 * /matieres/dentelle, /details/manches-longues — et la mise en page de la
 * page de style (« PageFamille », héritée de « PageStyle »).
 *
 * Rien n'y est inventé : une robe n'est rangée dans une page que si sa
 * fiche le dit (sa ligne, son regard, ses morphologies). Les expressions
 * visées viennent de seo-research/keyword-clusters.xlsx ; elles sont
 * écrites une fois, à leur place, jamais répétées.
 */

export type Famille = "styles" | "matieres" | "details";

export type PageFamille = {
  famille: Famille;
  slug: string;
  /* Le titre affiché, celui de l'onglet et celui du balisage. */
  titre: string;
  /* La balise de description, 158 signes au plus. */
  description: string;
  /* La légende rouge posée au-dessus du titre. */
  note: string;
  /* La phrase d'ouverture : l'expression, et la réponse directe. */
  chapo: string;
  /* La coupe qui porte le mieux ce style, pour le second bouton. */
  coupe?: { ancre: string; label: string };
  /* Les morphologies, d'après les fiches des robes montrées : en premier,
   * puis à essayer. */
  morphos: { premieres: Lettre[]; secondes: Lettre[] };
  style: Style;
};

export const FAMILLES: Record<Famille, { segment: string; label: string }> = {
  styles: { segment: "styles", label: "Styles" },
  matieres: { segment: "matieres", label: "Matières" },
  details: { segment: "details", label: "Détails" },
};

const ADRESSE = MAISON.adresse;

export const PAGES_FAMILLES: PageFamille[] = [
  /* ————————————————————————————————————————————— bohème ————— */
  {
    famille: "styles",
    slug: "boheme",
    titre: "Robe de mariée bohème à Paris",
    description:
      "Robe de mariée bohème à Paris : mousseline, dentelle florale, manches légères. Hélène, Murielle, Ryle, et Tessa pour une touche vintage, au showroom MADAMOON.",
    note: "Souple, légère, champêtre",
    chapo:
      "Une robe de mariée bohème se reconnaît à ce qu'elle laisse respirer : une jupe en mousseline qui bouge, de la dentelle florale, des manches légères ou transparentes. C'est la coupe fluide qui porte le mieux cet esprit bohème chic, et chez MADAMOON, elle s'essaie dans notre showroom du 10ᵉ, à Paris.",
    coupe: { ancre: "fluide", label: "Voir les robes fluides" },
    morphos: { premieres: ["O", "V", "H", "8", "X"], secondes: ["A"] },
    style: {
      voirLaCoupe: "Voir les robes fluides",
      robes: {
        titre: "Nos robes de mariée bohèmes",
        liste: [
          {
            slug: "helene",
            texte:
              "Un corset en dentelle ornée de petites perles et de fleurs en relief, une jupe en mousseline délicate et légère : la robe bohème chic du catalogue.",
          },
          {
            slug: "murielle",
            texte:
              "Dentelle florale et mousseline, décolleté en V, manches illusion et fente : une robe de mariée bohème en dentelle, portée par Monica Loretti.",
          },
          {
            slug: "ryle",
            texte:
              "Des manches ballon et un décolleté en V profond, dans une charmeuse au tombé léger : le bohème qui danse.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Ce qui fait le bohème",
          texte:
            "Le bohème aime ce qui bouge et ce qui respire : la dentelle florale, les manches légères ou transparentes, une traîne courte ou absente, une coiffure souple. La robe doit pouvoir marcher dans l'herbe et danser pieds nus.",
        },
        {
          titre: "Bohème chic ou champêtre ?",
          texte:
            "C'est le même esprit, lu à deux distances. Une robe de mariée champêtre va à un mariage à la campagne, dans un jardin ou une grange : mousseline, dentelle, rien qui pèse. La bohème chic y ajoute la tenue d'un corsage travaillé, comme celui d'Hélène, pour une cérémonie en ville.",
        },
        {
          titre: "En dentelle, dos nu, manches légères",
          texte:
            "Une robe de mariée bohème en dentelle, c'est Murielle, florale et transparente aux manches. Pour le dos, Hélène et Murielle sont montrées de dos sur leurs fiches ; pour les manches, Ryle les porte ballon. Le hippie chic, lui, se joue sur la coiffure et les accessoires plus que sur la robe.",
        },
        {
          titre: "Bohème, mais pas négligé",
          texte:
            "Une fluide bohème reste une robe de mariée : un corsage travaillé lui donne sa tenue et son éclat. Le bohème est un style, pas une absence de finition — et chaque robe est confectionnée à vos mesures, retouches comprises.",
        },
      ],
      echo: {
        titre: "Une touche vintage",
        texte:
          "Pour un bohème aux accents vintage, Tessa, de Casablanca Bridal, a d'après sa fiche un « charme vintage-chic » : une sirène au corset structuré, avec une surjupe détachable et des bretelles amovibles. Elle est rangée avec les deux-en-un, et s'essaie volontiers à côté des robes bohèmes.",
        robe: "tessa",
        voir: "Voir Tessa",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "La fluide est conseillée en premier aux morphologies en O, en V, en H, en 8 et en X, et vaut l'essai pour une morphologie en A. Hélène et Murielle sont indiquées, sur leurs fiches, pour les six morphologies ; Ryle pour toutes, sauf la morphologie en O. Une robe bohème grande taille ne se cherche pas dans un rayon : chaque robe est réalisée à vos mesures.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Une robe fluide convient-elle à un mariage bohème ?",
            r: "Oui, c'est même la coupe la plus naturelle pour un mariage bohème. Une jupe en mousseline, de la dentelle florale, des manches légères : Hélène est pensée, d'après sa fiche, pour la mariée « qui préfère dire OUI dans un look bohème chic ».",
          },
          {
            q: "Quelle robe de mariée pour un mariage champêtre ?",
            r: "Une robe qui bouge et qui ne pèse pas : mousseline, dentelle florale, pas de longue traîne. Hélène, Murielle et Ryle répondent à cette idée ; pour un mariage champêtre chic, le corsage perlé d'Hélène fait la différence.",
          },
          {
            q: "Une robe bohème convient-elle à un mariage civil ?",
            r: "Oui, et d'autant mieux qu'elle est légère. Pour la mairie, on regarde aussi les robes courtes en crêpe comme Elin, pensée d'après sa fiche pour une cérémonie civile, puis la robe bohème pour la fête.",
          },
          {
            q: "Où essayer une robe de mariée bohème à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps d'essayer plusieurs fluides et de comparer les matières.`,
          },
        ],
        toutes: "Tous les guides",
      },
      fin: {
        titre: "Essayer une robe bohème en showroom",
        texte: `${ADRESSE}, Paris 10ᵉ, sur rendez-vous.`,
      },
    },
  },

  /* ————————————————————————————————————————————— minimaliste ————— */
  {
    famille: "styles",
    slug: "minimaliste",
    titre: "Robe de mariée simple et minimaliste à Paris",
    description:
      "Robe de mariée simple, minimaliste et moderne à Paris : crêpe, charmeuse, satin mat, dos boutonné. Enid, Bondi, Milan, Maribel, Dove… au showroom MADAMOON, Paris 10e.",
    note: "Épurée, moderne, chic",
    chapo:
      "Une robe de mariée simple ne cache rien : une matière unie — crêpe, charmeuse, satin mat —, une coupe nette, un dos qui se boutonne, et c'est tout. Chez MADAMOON, les robes minimalistes viennent de Casablanca Bridal, Watters Designs et Monica Loretti, et s'essaient au showroom du 10ᵉ, à Paris, où la robe simple et chic se juge en une minute : elle tient, ou pas.",
    morphos: { premieres: ["H", "8", "X"], secondes: ["O", "A", "V"] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée simples et minimalistes",
        liste: [
          {
            slug: "enid",
            texte:
              "Une sirène en néoprène, décolleté droit, épaules dénudées, et une infinité de boutons dans le dos jusqu'au bout de la traîne. Elle se porte en bustier ou en col bardot : moderne et minimaliste, d'après sa fiche.",
          },
          {
            slug: "bondi",
            texte:
              "Une sirène minimaliste en crêpe, épaules dégagées et fente : la création pensée, dit sa fiche, pour la mariée moderne.",
          },
          {
            slug: "milan",
            texte:
              "Un crêpe léger, un drapé au buste, une fente sur le côté : raffinée et minimaliste à la fois, chez Monica Loretti.",
          },
          {
            slug: "maribel",
            texte:
              "Une fluide minimaliste en mousseline stretch, au corsage brodé et perlé à la main : la robe simple qui garde un détail.",
          },
          {
            slug: "dove",
            texte:
              "Un tombé fluide en satin mat, un décolleté drapé, les épaules dénudées et une ligne infinie de boutons jusqu'à la traîne : élégance intemporelle et confort.",
          },
          {
            slug: "adularia",
            texte:
              "Une fluide en charmeuse, à l'élégance minimaliste et à l'allure résolument moderne.",
          },
          {
            slug: "fortune",
            texte:
              "Un bustier trapèze en crêpe stretch et organza satin : une robe de mariée simple et élégante, dans une coupe qui va à tout le monde.",
          },
          {
            slug: "amaryllis",
            texte:
              "Une coupe droite ou sirène en charmeuse, avec une file de boutons sur le côté et des bretelles qui se portent sur les épaules ou tombantes : moderne et originale.",
          },
          {
            slug: "addison",
            texte:
              "Un satin de soie, une jupe épurée avec des poches, des bretelles tombantes amovibles et des motifs floraux appliqués à la main : la princesse version simple.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Ce qui fait une robe simple",
          texte:
            "Une matière unie qui tient toute seule — le crêpe de Bondi et de Milan, la charmeuse d'Adularia et d'Amaryllis, le satin mat de Dove, le néoprène d'Enid —, une coupe qui dessine sans ornement, et un dos boutonné qui tient lieu de décor.",
        },
        {
          titre: "Simple et chic, pas simple et nue",
          texte:
            "La robe de mariée chic et simple garde un geste : les boutons sur le côté d'Amaryllis, le drapé de Milan, le corsage brodé de Maribel, les poches d'Addison. C'est ce détail unique qui sépare la robe sobre de la robe quelconque.",
        },
        {
          titre: "Moderne, originale, contemporaine",
          texte:
            "Dans la collection reçue en dernier, celle de Casablanca Bridal, la robe de mariée moderne se porte en col bardot comme Enid, les épaules dégagées comme Bondi, ou sans bretelles comme Dove. L'originalité tient à la coupe, pas à l'ajout.",
        },
        {
          titre: "Une robe simple se confectionne à vos mesures",
          texte:
            "Comme toutes les robes de la boutique, une robe simple est réalisée à l'atelier selon vos mensurations, retouches comprises, à partir de 1 500 €. Sur une matière unie, l'ajustement se voit : c'est précisément pour cela qu'on la fait à vos mesures.",
        },
      ],
      echo: {
        titre: "Pour un mariage civil",
        texte:
          "Elin, d'Olya Mak, est une robe courte en crêpe pensée, d'après sa fiche, pour une cérémonie civile : sa légèreté et son aspect épuré marquent le contraste entre la mairie et la fête. C'est la robe de mariée simple des mariages en deux temps.",
        robe: "elin",
        voir: "Voir Elin",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Les sirènes en crêpe, Milan et Amaryllis, sont indiquées sur leurs fiches pour les morphologies en H, en 8 et en X ; Maribel, Dove, Fortune, Addison et Adularia pour les six morphologies. Une robe minimaliste ne cache rien : elle se choisit avec la coupe qui vous va, et s'ajuste à vos mesures.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Qu'est-ce qu'une robe de mariée minimaliste ?",
            r: "Une robe sans ornement rapporté : la matière, la coupe et le dos font tout. Chez MADAMOON, ce sont Enid, Bondi et Milan en crêpe ou néoprène, Adularia et Amaryllis en charmeuse, Dove en satin mat.",
          },
          {
            q: "Une robe de mariée simple est-elle moins chère ?",
            r: "Pas nécessairement : le prix dépend de la matière, de la maison et du travail de confection, pas du nombre d'ornements. Toutes les robes sont confectionnées à vos mesures à partir de 1 500 €, retouches comprises. Le guide des prix l'explique en détail.",
          },
          {
            q: "Quelle robe de mariée simple pour un mariage civil ?",
            r: "Une robe courte en crêpe comme Elin, pensée pour la cérémonie civile, ou une fluide épurée comme Adularia pour une mairie suivie d'un déjeuner.",
          },
          {
            q: "Robe simple en dentelle, en satin ou en crêpe ?",
            r: "Le crêpe (Bondi, Milan) et la charmeuse (Adularia) donnent la ligne la plus pure ; le satin mat de Dove apporte de la lumière ; une touche de dentelle, comme la jupe en crêpe et le corsage en Chantilly de Shiloh, garde la simplicité en y ajoutant une matière.",
          },
        ],
        toutes: "Tous les guides",
      },
      fin: {
        titre: "Essayer une robe de mariée simple en showroom",
        texte: `${ADRESSE}, Paris 10ᵉ, sur rendez-vous.`,
      },
    },
  },

  /* ————————————————————————————————————————————— dentelle ————— */
  {
    famille: "matieres",
    slug: "dentelle",
    titre: "Robe de mariée en dentelle à Paris",
    description:
      "Robe de mariée en dentelle à Paris : Chantilly, Alençon, Caterina, dentelle florale ou brodée, à manches longues, bustier ou dos illusion. Oksana, Summer, Uma, Pendant… au showroom MADAMOON.",
    note: "Chantilly, Alençon, Caterina",
    chapo:
      "La dentelle est la matière la plus présente du catalogue MADAMOON : une robe de mariée en dentelle peut être une sirène en Chantilly comme Oksana, une sirène en dentelle d'Alençon comme Summer, un trapèze en dentelle Caterina comme Charlotte, ou une princesse en dentelle brodée comme Seraphina. Toutes s'essaient au showroom du 10ᵉ, à Paris, et se confectionnent à vos mesures.",
    morphos: { premieres: ["O", "A", "V", "H", "8", "X"], secondes: [] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée en dentelle",
        liste: [
          { slug: "oksana", texte: "Une sirène en dentelle de Chantilly, au corset basque en pointe : la robe mariée dentelle dans sa version la plus française." },
          { slug: "summer", texte: "Une sirène en dentelle d'Alençon, décolleté en V et longue traîne : la beauté de la dentelle française dans une silhouette féminine, dit sa fiche." },
          { slug: "uma", texte: "Une sirène en dentelle au dos illusion, chez Watters Designs : la dentelle qui habille le dos autant que le devant." },
          { slug: "pendant", texte: "Un trapèze en dentelle avec des manches longues : la robe de mariée en dentelle à manches longues du catalogue." },
          { slug: "montana", texte: "Une sirène en satin mat, manches longues en dentelle et dos illusion : la dentelle en détail, sur une matière unie." },
          { slug: "seraphina", texte: "Une princesse en dentelle brodée, dos nu et manches longues, chez Olya Mak." },
          { slug: "murielle", texte: "Dentelle florale, décolleté plongeant, manches illusion et fente : la dentelle bohème, chez Monica Loretti." },
          { slug: "charlotte", texte: "Une robe bustier en dentelle Caterina, décolleté en cœur et corset en taille basque : le rêve de la mariée romantique, selon sa fiche. Elle existe aussi dans une version plus couvrante." },
          { slug: "aster", texte: "Dentelle de Chantilly, satin et manches amovibles, dans une silhouette trapèze à la taille naturelle." },
        ],
      },
      colonnes: [
        {
          titre: "Les dentelles du catalogue",
          texte:
            "La Chantilly d'Oksana, de Charlize, de Shiloh et d'Aster ; l'Alençon de Summer ; la Caterina de Charlotte et de Clover ; la Highclare de Calla ; la Cassie de Mitra ; la dentelle florale d'Hélène et de Murielle ; la dentelle brodée de Seraphina. Chaque fiche nomme la sienne.",
        },
        {
          titre: "Dentelle et manches longues",
          texte:
            "La robe de mariée en dentelle à manches longues existe en trapèze avec Pendant, en sirène avec Montana, en princesse avec Seraphina, en col montant avec Chastity. Et Aster propose des manches amovibles en dentelle, pour la cérémonie puis sans.",
        },
        {
          titre: "Dentelle et bustier",
          texte:
            "Le bustier en dentelle, c'est Charlotte, au décolleté en cœur et au corset en taille basque, ou Oksana, au corset basque en pointe. Pour une robe de mariée bustier en dentelle plus couvrante, Charlotte existe sans le décolleté plongeant.",
        },
        {
          titre: "Dentelle, satin et crêpe",
          texte:
            "La robe de mariée satin et dentelle associe les deux : Charlize et Sheridan en satin mat et Chantilly, Montana en satin mat et manches de dentelle, Shiloh en Chantilly sur une jupe en crêpe. La dentelle y est un détail, pas toute la robe.",
        },
      ],
      echo: {
        titre: "Avec une cape en dentelle",
        texte:
          "Sheridan, de Casablanca Bridal, est une sirène en satin mat et dentelle, livrée avec une cape assortie : une mousseline drapée sur l'épaule, qui tombe jusqu'au sol avec la traîne. La cape de mariée en dentelle se porte pour la cérémonie, et se retire pour la fête.",
        robe: "sheridan",
        voir: "Voir Sheridan",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "La dentelle ne choisit pas de morphologie : c'est la coupe qui le fait. Pendant, Aster, Charlotte, Murielle et Seraphina sont indiquées sur leurs fiches pour les six morphologies ; les sirènes en dentelle, Uma, Summer et Montana, d'abord pour les morphologies en V, en H, en 8 et en X.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Quelle dentelle pour une robe de mariée ?",
            r: "La Chantilly est fine et légère, l'Alençon plus dessinée, la dentelle brodée ou florale plus présente. Le catalogue en montre plusieurs : la fiche de chaque robe nomme la sienne, et le showroom les fait toucher.",
          },
          {
            q: "Une robe de mariée en dentelle convient-elle à un mariage en hiver ?",
            r: "Oui, surtout avec des manches longues : Pendant, Montana, Seraphina et Chastity en ont, et Aster des manches amovibles. Une dentelle doublée tient chaud sans peser.",
          },
          {
            q: "Dentelle ou satin ?",
            r: "La dentelle habille et dessine ; le satin tient et éclaire. Beaucoup de robes font les deux : Charlize, Sheridan et Montana associent satin mat et dentelle. L'essayage tranche, pas la règle.",
          },
          {
            q: "Où essayer une robe de mariée en dentelle à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, Paris 10ᵉ, sur rendez-vous, pendant une heure privatisée. Chaque robe choisie est ensuite confectionnée à vos mesures.`,
          },
        ],
        toutes: "Tous les guides",
      },
      fin: {
        titre: "Essayer une robe en dentelle en showroom",
        texte: `${ADRESSE}, Paris 10ᵉ, sur rendez-vous.`,
      },
    },
  },

  /* ————————————————————————————————————————————— manches longues ————— */
  {
    famille: "details",
    slug: "manches-longues",
    titre: "Robe de mariée à manches longues à Paris",
    description:
      "Robe de mariée à manches longues à Paris : en dentelle, en satin, col montant, manches amovibles ou ballon. Pendant, Montana, Chastity, Seraphina, Bella, Aster, au showroom MADAMOON.",
    note: "Dentelle, satin, manches amovibles",
    chapo:
      "Une robe de mariée à manches longues habille les bras sans alourdir la robe : des manches en dentelle sur un trapèze comme Pendant, sur une sirène en satin mat comme Montana, sur une princesse comme Seraphina, ou des manches en satin perlé comme Bella. Chez MADAMOON, la robe de mariée avec manches s'essaie au showroom du 10ᵉ, à Paris, et se confectionne à vos mesures.",
    morphos: { premieres: ["O", "A", "V", "H", "8", "X"], secondes: [] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée à manches longues",
        liste: [
          { slug: "pendant", texte: "Un trapèze en dentelle avec des manches longues, chez Watters Designs : la robe de mariée manches longues en dentelle la plus universelle du catalogue." },
          { slug: "montana", texte: "Une sirène en satin mat, manches longues en dentelle et dos illusion : les manches en dentelle sur une robe unie." },
          { slug: "chastity", texte: "Dentelle, manches longues, col montant et longue traîne : la dentelle recouvre le corsage et les longues manches, dit sa fiche, pour un charme traditionnel." },
          { slug: "seraphina", texte: "Une princesse en dentelle brodée, dos nu et manches longues : les manches habillent, le dos respire." },
          { slug: "bella", texte: "Une sirène ou fourreau en satin haut de gamme, ornée de perles, dos nu et manches longues : la robe de mariée manches longues en satin, chic et couture." },
          { slug: "aster", texte: "Dentelle de Chantilly, satin et manches amovibles : des manches pour la cérémonie, les bras nus pour la fête." },
        ],
      },
      colonnes: [
        {
          titre: "Manches longues en dentelle",
          texte:
            "C'est le cas le plus fréquent : Pendant, Montana, Chastity et Seraphina portent des manches en dentelle, transparentes ou doublées, qui dessinent le bras sans le couvrir tout à fait. Pour l'hiver, le col montant de Chastity complète les manches.",
        },
        {
          titre: "Manches longues en satin",
          texte:
            "Bella porte ses manches dans le même satin que la robe, orné de perles : une ligne couvrante et graphique, qui va à la mariée qui veut une robe de mariée chic sans dentelle.",
        },
        {
          titre: "Amovibles, ballon, illusion",
          texte:
            "Aster a des manches amovibles ; Ryle des manches ballon, pour une robe de mariage à manches bouffantes ; Murielle des manches illusion, en dentelle transparente. Trois façons d'avoir des manches sans les garder toute la journée.",
        },
        {
          titre: "Avec des manches, ou avec des bretelles",
          texte:
            "Si les manches longues pèsent, la robe de mariée à bretelles garde l'épaule habillée : Addison et Héra ont des bretelles tombantes, Amaryllis des bretelles qui se portent sur les épaules ou sur les bras.",
        },
      ],
      echo: {
        titre: "Des manches ballon",
        texte:
          "Ryle, de Watters Designs, est une fluide aux manches ballon et au décolleté en V profond, dans une charmeuse légère. La manche bouffante donne du volume à l'épaule sans couvrir le bras : c'est la manche des mariages bohèmes.",
        robe: "ryle",
        voir: "Voir Ryle",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Pendant, Chastity, Seraphina et Aster sont indiquées sur leurs fiches pour les six morphologies ; Montana pour les morphologies en A, en H, en 8 et en X. Les manches ne changent pas la coupe : elles s'ajoutent à celle qui vous va.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Quelle robe de mariée à manches longues pour un mariage en hiver ?",
            r: "Une robe aux manches doublées et au col montant, comme Chastity, ou une sirène en satin mat et manches de dentelle comme Montana. Les manches en satin de Bella couvrent davantage que la dentelle transparente.",
          },
          {
            q: "Peut-on retirer les manches pour la soirée ?",
            r: "Sur Aster, oui : ses manches sont amovibles. Pour les autres modèles, la question se pose à l'essayage, robe par robe.",
          },
          {
            q: "Une robe à manches longues pour un mariage civil ?",
            r: "Chastity, en dentelle à col montant, est rangée avec les deux-en-un : une robe qui change d'allure entre la mairie et la fête. Pour une mairie seule, une robe courte comme Elin reste une option.",
          },
          {
            q: "Où essayer une robe de mariée à manches longues à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, Paris 10ᵉ, sur rendez-vous. L'essayage est privé, pendant une heure, et la robe est ensuite confectionnée à vos mesures, manches comprises.`,
          },
        ],
        toutes: "Tous les guides",
      },
      fin: {
        titre: "Essayer une robe à manches longues en showroom",
        texte: `${ADRESSE}, Paris 10ᵉ, sur rendez-vous.`,
      },
    },
  },
];

export const pagesDe = (famille: Famille) => PAGES_FAMILLES.filter((p) => p.famille === famille);

export const pageFamille = (famille: Famille, slug: string) =>
  PAGES_FAMILLES.find((p) => p.famille === famille && p.slug === slug);

export const adresseFamille = (p: PageFamille) => `/${FAMILLES[p.famille].segment}/${p.slug}`;

/* Les robes nommées par une page, pour le lien depuis leur fiche. */
export const robesDePage = (p: PageFamille) => [
  ...p.style.robes.liste.map((r) => r.slug),
  ...(p.style.echo ? [p.style.echo.robe] : []),
];
