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

export type Famille = "styles" | "matieres" | "details" | "morphologies";

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
  /* Le premier rang du fil d'Ariane, quand la page ne descend pas des
   * robes : la grande taille descend des morphologies. */
  ariane?: { nom: string; adresse: string };
  /* Les morphologies, d'après les fiches des robes montrées : en premier,
   * puis à essayer. */
  morphos: { premieres: Lettre[]; secondes: Lettre[] };
  style: Style;
};

export const FAMILLES: Record<Famille, { segment: string; label: string }> = {
  styles: { segment: "styles", label: "Styles" },
  matieres: { segment: "matieres", label: "Matières" },
  details: { segment: "details", label: "Détails" },
  /* Une seule page pour l'instant, la grande taille : elle vit sous
   * /morphologies/, à côté des six silhouettes, avec sa propre route. */
  morphologies: { segment: "morphologies", label: "Morphologies" },
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
          "La fluide est conseillée en premier aux morphologies en O, en V, en H, en 8 et en X, et vaut l'essai pour une morphologie en A. Hélène et Murielle sont indiquées, sur leurs fiches, pour toutes les morphologies ; Ryle pour toutes, sauf la morphologie en O. Une robe bohème grande taille ne se cherche pas dans un rayon : chaque robe est réalisée à vos mesures.",
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
            q: "Quelle robe pour un mariage champêtre, et à quel prix ?",
            r: "Une robe pour mariage champêtre est une robe légère : mousseline, dentelle, pas de traîne — Hélène, Murielle, Ryle. Le style bohème se marie au romantique, avec les fleurs en relief d'Hélène, ou au simple, avec Adularia en charmeuse pour une bohémienne qui veut du net. Une robe bohème pas chère n'existe pas ici au sens du prêt-à-porter : chaque robe est confectionnée à vos mesures, à partir de 1 500 €, retouches comprises. Pour un mariage sur le thème bohème ou nature, en hiver comme en été, la robe reste blanche ou ivoire — le vert sauge et les couleurs se jouent dans le bouquet, pas sur la robe —, dos nu ou manches selon la saison, et confectionnée sur mesure pour chaque femme. Bohème fleurie, bustier ou col en V, mi-longue — non, toutes longues —, rock ou romantique, pour une femme ronde ou enceinte — Mathilda, chez Monica Loretti, est pensée pour la grossesse — : une belle robe bohème originale, mais toujours blanche ou ivoire, jamais rose.",
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
      "Robe de mariée minimaliste et simple à Paris : crêpe, satin mat, lignes nettes. Enid, Bondi, Milan, Dove… à essayer au showroom MADAMOON, Paris 10e.",
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
          "Les sirènes en crêpe, Milan et Amaryllis, sont indiquées sur leurs fiches pour les morphologies en H, en 8 et en X ; Maribel, Dove, Fortune, Addison et Adularia pour toutes les morphologies. Une robe minimaliste ne cache rien : elle se choisit avec la coupe qui vous va, et s'ajuste à vos mesures.",
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
          {
            q: "Une robe de mariée simple peut-elle être originale ?",
            r: "Oui : l'originale n'est pas la chargée. Une robe de mariée originale et simple joue sur un détail — la fente de Bondi, l'infinité de boutons d'Enid, le décolleté carré de River — plutôt que sur la dentelle. Simple, chic et tendance sans être à la mode d'une saison, blanche ou ivoire : c'est la robe élégante et épurée que l'on regarde encore en photo dix ans après. Et une robe simple n'est pas une robe pas chère : moins de dentelle, mais le même travail de coupe, à partir de 1 500 €. Longue ou courte, avec ou sans manches, sans dentelle ou avec une touche de dentelle, rock ou classique, tendance ou classe : la robe simple reste blanche ou ivoire — pas de couleur au catalogue hors les fleurs de Clover — et élégante par sa coupe, pour chaque femme à ses mesures. Tenue de mariée simple pour l'hiver, très simple ou atypique, dos nu, grande taille ou femme ronde : les modèles existent — Bondi, Milan, Adularia, Dove —, en blanc ou ivoire, jamais colorés, à l'achat seulement, pas en location.",
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
      "Robe de mariée en dentelle à Paris : Chantilly, Alençon, Caterina. Oksana, Summer, Uma, Seraphina… à essayer au showroom MADAMOON, Paris 10e.",
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
          "La dentelle ne choisit pas de morphologie : c'est la coupe qui le fait. Pendant, Aster, Charlotte, Murielle et Seraphina sont indiquées sur leurs fiches pour toutes les morphologies ; les sirènes en dentelle, Uma, Summer et Montana, d'abord pour les morphologies en V, en H, en 8 et en X.",
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
            q: "Robe de mariée en dentelle blanche ou ivoire ?",
            r: "Les deux existent, et la dentelle change de caractère avec la couleur : plus graphique en blanc, plus douce en ivoire. Les coloris de chaque modèle se voient au showroom, en lumière du jour — c'est là qu'on décide de se marier en blanc ou en ivoire, pas sur un écran.",
          },
          {
            q: "Où essayer une robe de mariée en dentelle à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, Paris 10ᵉ, sur rendez-vous, pendant une heure privatisée. Chaque robe choisie est ensuite confectionnée à vos mesures.`,
          },
          {
            q: "Dentelle brodée, broderie anglaise, dentelle sur tulle ou sur soie : quelle différence ?",
            r: "La broderie — un fil posé sur un tulle ou un tissu — se voit sur Seraphina, brodée à la main, et sur le haut de Maribel ; la broderie anglaise, ajourée, n'est pas au catalogue. La dentelle se pose sur un tulle couleur chair pour l'illusion, sur un satin ou une soie pour la tenue ; avec des paillettes, c'est Fancy, « dentelle florale scintillante ». Pour un mariage civil, une dentelle légère à bretelles fines ; et le prix suit la dentelle, à partir de 1 500 € — pas cher n'existe pas pour une fleur brodée main, mais le sur-mesure est compris. Dentelle sur les bras — les manches longues de Pendant, Montana, Seraphina —, transparente, brillante ou à strass — Fancy —, classique ou classe ; le crochet et le col bateau ne sont pas au catalogue ; les fiches ne nomment pas Calais-Caudry mais Chantilly, Alençon, Caterina et Highclare.",
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
      "Robe de mariée à manches longues à Paris : dentelle, satin, manches amovibles. Pendant, Montana, Chastity, Bella… au showroom MADAMOON, Paris 10e.",
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
          "Pendant, Chastity, Seraphina et Aster sont indiquées sur leurs fiches pour toutes les morphologies ; Montana pour les morphologies en A, en H, en 8 et en X. Les manches ne changent pas la coupe : elles s'ajoutent à celle qui vous va.",
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
          {
            q: "Manches longues avec bustier, col bateau, grande taille ou petite : quelles robes ?",
            r: "Un bustier à manches n'existe pas : les manches tiennent au corsage, comme chez Montana, Pendant ou Seraphina, et Chastity monte jusqu'au col. Le col bateau et le col carré à manches ne sont pas au catalogue ; Hera et Enid se portent épaules dénudées, sans manche. Grande taille, petite taille, femme ronde ou mince : chaque robe est faite à vos mesures, et des manches mi-longues, courtes ou plus amples se discutent aux retouches, comprises. Manches longues simples ou classiques, pailletées ou fines, avec un voile : oui ; des épaulettes, non.",
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
  /* ————————————————————————————————————————————— satin ————— */
  {
    famille: "matieres",
    slug: "satin",
    titre: "Robe de mariée en satin à Paris",
    description:
      "Robe de mariée en satin à Paris : satin mat, satin de soie, mikado. Sheridan, Venus, Montana, Dove, Bella… au showroom MADAMOON, Paris 10e.",
    note: "Mat, lumineux, structuré",
    chapo:
      "Le satin est la matière des robes de mariée qui tiennent : un tombé lourd, une surface qui prend la lumière sans briller, des lignes nettes. Au catalogue, il se décline en satin mat, en satin de soie et en mikado, sur des sirènes, des princesses, des trapèzes et une fluide. Toutes s'essaient au showroom MADAMOON, dans le 10ᵉ, à Paris.",
    morphos: { premieres: ["H", "8", "X"], secondes: ["O", "A", "V"] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée en satin",
        liste: [
          {
            slug: "sheridan",
            texte:
              "Une sirène en satin mat souple, illuminée d'applications de dentelle florale, avec une cape assortie en tulle plissé : la robe de mariée en satin et dentelle du catalogue.",
          },
          {
            slug: "venus",
            texte:
              "Sirène en satin mat à la traîne majestueuse, corsage structuré par des baleines discrètes, dos en tulle illusion et dentelle.",
          },
          {
            slug: "montana",
            texte:
              "Satin mat, manches longues en dentelle et dos illusion : une sirène minimaliste et élégante, d'après sa fiche, à la sophistication intemporelle.",
          },
          {
            slug: "dove",
            texte:
              "Le satin mat en version fluide : un décolleté drapé, les épaules dénudées, un dos ouvert et une ligne de boutons jusqu'à la traîne.",
          },
          {
            slug: "addison",
            texte:
              "Une princesse en satin de soie, aux bretelles tombantes amovibles, avec des motifs floraux appliqués à la main en mousseline et des poches.",
          },
          {
            slug: "bella",
            texte:
              "Satin haut de gamme orné de perles, dos nu et manches longues : la robe de mariée en satin chic et à l'esprit couture, sirène ou fourreau.",
          },
          {
            slug: "hera",
            texte:
              "Un trapèze en satin, un décolleté Bardot aux bretelles tombantes et une fente : romantique, moderne et intemporelle, dit sa fiche.",
          },
          {
            slug: "finell",
            texte:
              "Un bustier cœur en satin, sculpté, et une jupe trapèze : la robe de mariée en satin simple, dont tout repose sur la coupe.",
          },
          {
            slug: "charlize",
            texte:
              "Satin mat et dentelle de Chantilly : un corset transparent — ou doublé — et une fente qui s'ouvre sur une jupe en dentelle.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Satin mat, satin de soie, satin duchesse",
          texte:
            "Le satin est un tissage, pas une fibre : il peut être de soie ou de polyester, brillant ou mat. Le satin mat, le plus présent au catalogue, garde la densité du satin sans l'éclat ; le satin de soie, celui d'Addison, est plus souple et plus léger ; le satin duchesse, plus lourd, se réserve aux grandes jupes structurées.",
        },
        {
          titre: "Satin, mikado ou crêpe ?",
          texte:
            "Trois matières unies, trois tenues. Le mikado est le plus structuré : il fait les princesses de Kensington, Livia et Fern. Le crêpe est le plus souple : il épouse le corps sur Bondi, Milan ou Mira. Le satin est entre les deux — il tient, mais il tombe.",
        },
        {
          titre: "Une robe de mariée en satin, pour quel mariage ?",
          texte:
            "Pour une cérémonie habillée, un mariage en ville ou en hiver : le satin a du poids et de la tenue, il se porte avec des manches longues comme sur Montana et Bella, ou sous une cape comme sur Sheridan. Pour un mariage d'été à la campagne, on regardera plutôt les fluides en mousseline.",
        },
        {
          titre: "Ce que le satin pardonne, et ce qu'il révèle",
          texte:
            "Une matière unie montre la coupe : rien ne se cache derrière une dentelle. C'est pourquoi une robe en satin se fait sur mesure. Chaque robe du catalogue est confectionnée à vos mensurations, retouches comprises, et le dernier essayage valide le tombé.",
        },
      ],
      echo: {
        titre: "Le mikado, le satin qui tient debout",
        texte:
          "Pour une princesse en satin, le catalogue va vers le mikado, un satin épais et structuré. Kensington, de Casablanca Bridal, en est confectionnée entièrement : épaules dénudées, jupe spectaculaire et traîne de deux mètres. Elle est rangée avec les princesses, et s'essaie volontiers à côté des robes en satin.",
        robe: "kensington",
        voir: "Voir Kensington",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "D'après leurs fiches, Dove, Addison, Hera et Finell sont indiquées pour toutes les morphologies ; Venus pour les morphologies en H, en 8 et en X, Montana pour celles en A, en H, en 8 et en X, Charlize pour celles en V, en H, en 8 et en X. Le satin dessine la silhouette telle qu'elle est : c'est l'essayage, et la confection à vos mesures, qui font le reste.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Une robe de mariée en satin est-elle chaude ?",
            r: "Plus qu'une mousseline, moins qu'on ne le croit : le satin mat du catalogue est doublé, et la robe respire par les ouvertures — un dos nu, un décolleté. Pour un mariage en plein été, les fluides en mousseline ou en charmeuse, comme Adularia, sont plus légères.",
          },
          {
            q: "Le satin se froisse-t-il ?",
            r: "Le satin de soie marque plus que le satin mat ; le mikado ne marque presque pas. Dans tous les cas, la robe vous est remise après l'essayage final, prête à être portée, et se garde sur un cintre large dans sa housse jusqu'au jour du mariage.",
          },
          {
            q: "Satin brillant ou satin mat pour une robe de mariée ?",
            r: "Le satin mat est celui des robes du catalogue : il prend la lumière sans la renvoyer, ce qui le rend plus facile à photographier et plus juste en journée. Le satin brillant appartient davantage aux robes de soirée.",
          },
          {
            q: "Où essayer une robe de mariée en satin à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps de comparer un satin mat, un satin de soie et un mikado, sur plusieurs coupes.`,
          },
          {
            q: "Satin pour un mariage civil, col bateau, blanc ou ivoire : quel tissu exactement ?",
            r: "Le satin est un tissu lisse et lumineux ; le satin mat — Dove, Montana — l'est moins ; le satin de soie — Addison — davantage ; la charmeuse — Adularia — est un satin léger. Pour un mariage civil, Adularia. Le col bateau n'existe pas au catalogue, Hera se porte épaules dénudées. Blanche ou ivoire, vert ou champagne ? Les coloris se voient au showroom ; le prix dépend du tissu, à partir de 1 500 € — un satin de soie n'est pas pas cher —, et chaque robe est faite à vos mesures, toutes tailles.",
          },
        ],
        toutes: "Tous les guides",
      },
      fin: {
        titre: "Essayer une robe de mariée en satin en showroom",
        texte: `${ADRESSE}, Paris 10ᵉ, sur rendez-vous.`,
      },
    },
  },

  /* ————————————————————————————————————————————— bustier ————— */
  {
    famille: "details",
    slug: "bustier",
    titre: "Robe de mariée bustier à Paris",
    description:
      "Robe de mariée bustier à Paris : décolleté cœur, corset, bretelles amovibles. Sheridan, Finell, Fortune, Charlotte… au showroom MADAMOON, Paris 10e.",
    note: "Le buste dessiné, les épaules libres",
    chapo:
      "Une robe de mariée bustier tient sans bretelles : tout repose sur le corsage, baleiné ou structuré, qui dessine le buste et marque la taille. Au catalogue, le bustier prend un décolleté cœur, droit ou en V, sur des sirènes, des princesses et des trapèzes, parfois avec des bretelles fines amovibles pour changer d'allure dans la journée. Toutes s'essaient au showroom MADAMOON, dans le 10ᵉ, à Paris.",
    morphos: { premieres: ["V", "H", "8", "X"], secondes: ["O", "A"] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée bustier",
        liste: [
          {
            slug: "sheridan",
            texte:
              "Une sirène sans bretelles au décolleté cœur pointu, en satin mat et dentelle florale, avec une cape assortie pour la cérémonie.",
          },
          {
            slug: "finell",
            texte:
              "Un bustier cœur en satin, sculpté, sur une jupe trapèze : « un décolleté inoubliable », dit sa fiche.",
          },
          {
            slug: "fortune",
            texte:
              "La robe de mariée bustier trapèze du catalogue, en crêpe stretch et organza satin, élégante et intemporelle.",
          },
          {
            slug: "charlotte",
            texte:
              "Robe bustier au décolleté en cœur, corset en taille basque et dentelle Caterina : le rêve de la mariée romantique, princesse ou trapèze.",
          },
          {
            slug: "guinevere",
            texte:
              "Princesse bustier en jacquard floral : un corset au décolleté cœur plongeant et pointu, une taille basque, des poches et une longue traîne.",
          },
          {
            slug: "hayes",
            texte:
              "Un bustier à encolure cœur revisitée, aux lignes épurées, en satin mat et dentelle, sur une jupe princesse ou trapèze.",
          },
          {
            slug: "oksana",
            texte:
              "Sirène en dentelle de Chantilly, corset basque en pointe, décolleté cœur pointu : les bretelles perlées sont amovibles, pour la porter en bustier.",
          },
          {
            slug: "sienna",
            texte:
              "Un bustier au décolleté en cœur subtilement revisité et une jupe ample en dentelle : princesse ou trapèze.",
          },
          {
            slug: "meredith",
            texte:
              "Décolleté en cœur et dentelle en relief : une sirène féminine et romantique qui sublime le buste.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Bustier, corset, décolleté cœur : les mots",
          texte:
            "Le bustier est la robe sans bretelles ; le corset est le corsage structuré qui la tient — il peut être baleiné, lacé, à taille basque en pointe comme sur Oksana ou Guinevere. Le décolleté cœur dessine deux arrondis sur le buste ; le décolleté droit, celui d'Enid ou de Nirali, coupe net.",
        },
        {
          titre: "Comment tient une robe de mariée bustier ?",
          texte:
            "Par le corsage, pas par les épaules : des baleines, une doublure ajustée, parfois un laçage dans le dos. C'est pourquoi la confection à vos mesures compte plus encore sur un bustier que sur une robe à manches — et pourquoi le dernier essayage vérifie que l'on peut lever les bras et danser.",
        },
        {
          titre: "Bretelles amovibles : deux robes en une",
          texte:
            "Plusieurs robes du catalogue se portent avec ou sans bretelles : Oksana et Addison ont des bretelles amovibles, Tessa aussi. On passe d'un bustier pour la soirée à des bretelles fines pour la cérémonie, sans changer de robe.",
        },
        {
          titre: "Col carré, col bateau, épaules dénudées",
          texte:
            "Si le bustier ne vous tente pas, les autres encolures du catalogue : le col carré de Dolores, de Clover et de River ; les épaules dénudées, ou décolleté Bardot, de Hera, Dove, Kensington et Trinity ; le col montant de Chastity. Le col bateau, qui court d'une épaule à l'autre, se cherche plutôt parmi ces épaules dénudées.",
        },
      ],
      echo: {
        titre: "Le col carré, l'autre géométrie",
        texte:
          "Pour un décolleté net sans bustier, Dolores, en tulle, dentelle et perles, porte une encolure carrée qui flatte le buste, et un dos transparent en dentelle orné de boutons. Elle est rangée avec les trapèzes et les princesses, et s'essaie volontiers à côté des robes bustier.",
        robe: "dolores",
        voir: "Voir Dolores",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Le bustier met le buste et les épaules en avant : il va d'abord aux morphologies en V, en H, en 8 et en X, et s'essaie pour celles en O et en A avec une jupe trapèze ou princesse qui équilibre. D'après leurs fiches, Finell, Fortune, Charlotte et Sienna sont indiquées pour toutes les morphologies, Meredith pour celles en V, en H, en 8 et en X. Pour une forte poitrine, on regarde le maintien du corsage à l'essayage, et des bretelles amovibles rassurent.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Une robe de mariée bustier tient-elle toute la journée ?",
            r: "Oui, si elle est faite à vos mesures : c'est le corsage qui la tient. Chaque robe du catalogue est confectionnée selon vos mensurations, puis ajustée aux retouches, et l'essayage final vérifie l'aisance — lever les bras, s'asseoir, danser.",
          },
          {
            q: "Quelle lingerie sous une robe de mariée bustier ?",
            r: "Un corsage structuré se porte souvent sans soutien-gorge, ou avec un bustier sans bretelles couleur chair, sans coutures. Apportez-le dès le deuxième essayage, pour que la robe s'ajuste avec.",
          },
          {
            q: "Robe de mariée corset ou bustier : quelle différence ?",
            r: "Le bustier décrit la robe — sans bretelles ; le corset décrit le corsage — structuré, baleiné, parfois lacé. Une robe corset peut avoir des bretelles, comme Lovia ou Carrie ; une robe bustier a toujours un corsage qui tient.",
          },
          {
            q: "Quelle robe bustier pour un mariage, et quel décolleté ?",
            r: "Pour un mariage, la robe bustier se choisit par son décolleté : en cœur chez Sheridan et Charlotte, en pointe chez Guinevere, carré chez Dolores. Le col bateau et le décolleté américain n'existent pas au catalogue ; Enid et Hera se portent en col bardot, épaules dénudées, ce qui en est l'esprit. Une robe bustier blanche ou ivoire : les coloris de chaque modèle se voient au showroom.",
          },
          {
            q: "Où essayer une robe de mariée bustier à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps de comparer un décolleté cœur, un décolleté droit et un col carré.`,
          },
          {
            q: "Bustier pour un mariage civil, en cœur, rond ou asymétrique ?",
            r: "Pour un mariage civil, un bustier simple — Enid, en bustier ou en col bardot — ou une courte à larges bretelles comme River. Le décolleté en cœur est le plus fréquent, Sheridan et Charlotte ; le décolleté rond, Calla ; le bénitier et l'asymétrique ne sont pas au catalogue. Grande taille ou petite, femme ronde ou mince, un bustier tient par sa coupe à vos mesures ; strass et paillettes, c'est Carrie ; le haut en dentelle, Fancy ; blanc ou ivoire, au showroom. Encolure américaine, col mao, col roulé, col officier, cache-cœur croisé : pas au catalogue — un bustier n'a pas de col. Bustier drapé — Milan, drapée au buste —, brodé — Maribel —, brillant ou fleuri, avec un voile : à essayer.",
          },
        ],
        toutes: "Tous les guides",
      },
      fin: {
        titre: "Essayer une robe de mariée bustier en showroom",
        texte: `${ADRESSE}, Paris 10ᵉ, sur rendez-vous.`,
      },
    },
  },

  /* ————————————————————————————————————————————— dos nu ————— */
  {
    famille: "details",
    slug: "dos-nu",
    titre: "Robe de mariée dos nu à Paris",
    description:
      "Robe de mariée dos nu à Paris : dos nu, dos illusion, dos en V. Bella, Seraphina, Agnessa, Murielle, Venus… au showroom MADAMOON, Paris 10e.",
    note: "Ce que l'on voit quand vous avancez",
    chapo:
      "Une robe de mariée dos nu se regarde pendant toute la cérémonie : c'est le dos que voient les invités. Au catalogue, il est nu, ouvert en V, transparent sous un tulle illusion, en dentelle, ou fermé d'une ligne de boutons jusqu'à la traîne — sur des sirènes, des fluides, des trapèzes et des princesses. Toutes s'essaient au showroom MADAMOON, dans le 10ᵉ, à Paris.",
    morphos: { premieres: ["V", "H", "8", "X"], secondes: ["O", "A"] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée dos nu",
        liste: [
          {
            slug: "bella",
            texte:
              "Dos nu, manches longues, satin et perles : la robe de mariée dos nu chic et à l'esprit couture, sirène ou fourreau.",
          },
          {
            slug: "seraphina",
            texte:
              "Dentelle brodée, dos nu et manches longues sur une silhouette princesse : une élégance intemporelle, revisitée d'une touche contemporaine.",
          },
          {
            slug: "agnessa",
            texte:
              "Un décolleté et un dos spectaculaires en V, un corset perlé à la main, une jupe de tulle fluide : naturellement glamour.",
          },
          {
            slug: "murielle",
            texte:
              "Dentelle florale et mousseline, dos en V, manches illusion et fente haute : la robe de mariée dos nu bohème du catalogue.",
          },
          {
            slug: "venus",
            texte:
              "Un dos en tulle illusion et dentelle, qui dévoile une transparence subtile, sur une sirène en satin mat à la traîne majestueuse.",
          },
          {
            slug: "uma",
            texte:
              "Une dentelle fine et un dos transparent fermé par une ligne de jolis boutons couleur ivoire : le dos illusion de Watters Designs.",
          },
          {
            slug: "montana",
            texte:
              "Dos illusion et manches longues en dentelle sur un satin mat : le dos nu couvert, pour un mariage en hiver.",
          },
          {
            slug: "dove",
            texte:
              "Un dos ouvert et une ligne infinie de boutons jusqu'à la traîne, sur un satin mat fluide : une allure poétique et pure.",
          },
          {
            slug: "emerald",
            texte:
              "Un dos en V qui prolonge le décolleté, un corsage perlé et une jupe de tulle ou de satin : la touche de sensualité subtile d'un trapèze.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Dos nu, dos illusion, dos en V",
          texte:
            "Le dos nu laisse la peau libre, comme sur Bella et Seraphina. Le dos illusion la couvre d'un tulle couleur chair sur lequel la dentelle semble posée : Uma, Montana, Venus. Le dos en V descend en pointe, plus ou moins bas : Agnessa, Murielle, Emerald, Angel.",
        },
        {
          titre: "Une robe dos nu peut-elle avoir des manches ?",
          texte:
            "Oui, et c'est l'un des plus beaux contrastes du catalogue : Bella, Seraphina et Montana ont des manches longues et le dos découvert. La robe couvre les bras et dévoile le dos — une robe de mariée dos nu pour un mariage en hiver.",
        },
        {
          titre: "Sexy, mais mariée",
          texte:
            "Une robe de mariée sexy ne se joue pas sur la quantité de peau mais sur l'endroit : un dos, une fente, une transparence. Le dos nu dit tout en restant couverte de face — c'est pourquoi il va aussi bien à l'église qu'à la fête.",
        },
        {
          titre: "La ligne de boutons",
          texte:
            "Sur Uma, Dove, Enid et Bondi, le dos se ferme d'une rangée de boutons qui descend jusqu'à la traîne. Ce n'est pas un dos nu, mais c'est le même regard : un dos dessiné, que l'on suit quand la mariée avance.",
        },
      ],
      echo: {
        titre: "Le dos boutonné",
        texte:
          "Pour un dos habillé sans transparence, Enid, de Casablanca Bridal, en néoprène, porte « une infinité de boutons » du corsage jusqu'à la traîne. Elle est rangée avec les sirènes et les robes minimalistes, et s'essaie volontiers à côté des robes dos nu.",
        robe: "enid",
        voir: "Voir Enid",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Le dos nu allonge le dos et dégage la nuque : il va d'abord aux morphologies en V, en H, en 8 et en X, et s'essaie pour celles en O et en A, en particulier avec un dos en V sur une jupe fluide ou trapèze. D'après leurs fiches, Seraphina, Agnessa, Murielle, Dove et Emerald sont indiquées pour toutes les morphologies ; Uma pour celles en V, en H, en 8 et en X ; Venus pour celles en H, en 8 et en X ; Montana pour celles en A, en H, en 8 et en X.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Quelle lingerie sous une robe de mariée dos nu ?",
            r: "Une lingerie sans coutures, couleur chair, choisie selon le dos de la robe : sans bretelles et à dos bas, ou intégrée au corsage. Portez-la dès le deuxième essayage, pour que la robe s'ajuste avec.",
          },
          {
            q: "Une robe dos nu convient-elle à une cérémonie religieuse ?",
            r: "Le plus souvent, oui, avec une cape, une étole ou une veste pour la cérémonie, retirée pour la fête. Sheridan a sa cape assortie, Solana sa veste asymétrique amovible ; pour une autre robe, on en parle à l'essayage.",
          },
          {
            q: "Dos nu ou dos illusion : que choisir ?",
            r: "Le dos nu si vous aimez la peau libre et une robe qui tient par le corsage ; le dos illusion si vous voulez l'effet du dos découvert avec plus de maintien et de la dentelle posée sur le tulle. Uma et Montana montrent le second, Bella et Seraphina le premier.",
          },
          {
            q: "Dos nu et décolleté plongeant vont-ils ensemble ?",
            r: "Souvent, pas toujours. Murielle associe un décolleté plongeant et un dos ouvert ; Bella, Venus et Montana gardent le devant plus couvert et montrent le dos — nu, en dentelle ou en illusion. Pour une robe de mariée dos nu sans décolleté plongeant, c'est vers ces trois-là qu'on regarde d'abord.",
          },
          {
            q: "Où essayer une robe de mariée dos nu à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure, avec un miroir pour se voir de dos.`,
          },
          {
            q: "Robe de mariée fendue, transparente, dos nu : et le soutien-gorge ?",
            r: "La fente et le dos nu vont souvent ensemble : Murielle a une fente et un dos ouvert ; Bondi et Milan, fendues, ont le dos boutonné ou couvert ; la transparence est celle du tulle illusion de Venus, d'Uma et de Montana. Pour le soutien-gorge, la question se règle à l'essayage : les corsages sont souvent assez structurés pour s'en passer, et les retouches, comprises, ajoutent un maintien quand il le faut. Col montant, col carré, bustier ; en soie ou en satin ; rose ou orange — non : au catalogue, le dos nu reste blanc ou ivoire, et c'est le corsage qui décide. Collier dans le dos, coiffure relevée, body ou gaine invisible : des accessoires et des réglages d'essayage, pas des robes ; la robe dos nu cintrée, c'est Bella.",
          },
        ],
        toutes: "Tous les guides",
      },
      fin: {
        titre: "Essayer une robe de mariée dos nu en showroom",
        texte: `${ADRESSE}, Paris 10ᵉ, sur rendez-vous.`,
      },
    },
  },

  /* ——————————————————————————————————————— grande taille ————— */
  {
    famille: "morphologies",
    slug: "grande-taille",
    titre: "Robe de mariée grande taille à Paris",
    description:
      "Robe de mariée grande taille à Paris : pas de rayon, chaque robe est confectionnée à vos mesures, retouches comprises. Showroom MADAMOON, Paris 10e.",
    note: "Faite à vos mesures, pas à une taille",
    chapo:
      "Il n'y a pas de rayon grande taille chez MADAMOON, parce qu'il n'y a pas de rayon : chaque robe du catalogue est confectionnée à l'atelier selon vos mensurations, prises au showroom après l'essayage, et les retouches sont comprises. Les robes montrées ici sont celles dont la fiche indique toutes les morphologies et dont le corsage structuré assure le maintien. Les tailles proposées par chaque maison se confirment au showroom, modèle par modèle, dans le 10ᵉ, à Paris.",
    coupe: { ancre: "trapeze", label: "Voir les robes trapèze" },
    ariane: { nom: "Morphologies", adresse: "/morphologies" },
    morphos: { premieres: ["O", "A", "V", "H", "8", "X"], secondes: [] },
    style: {
      voirLaCoupe: "Voir les robes trapèze",
      robes: {
        titre: "Des robes indiquées pour toutes les morphologies",
        liste: [
          {
            slug: "pendant",
            texte:
              "Un trapèze en dentelle aux manches longues et aux épaules dénudées, indiqué sur sa fiche pour toutes les morphologies.",
          },
          {
            slug: "charlotte",
            texte:
              "Robe bustier au corset en taille basque et dentelle Caterina, princesse ou trapèze : le corset marque la taille, la jupe fait le reste.",
          },
          {
            slug: "calla",
            texte:
              "Un corsage structuré façon corset, un tulle très souple et une dentelle Highclare : « confort, féminité et raffinement », dit sa fiche.",
          },
          {
            slug: "clover-perles",
            texte:
              "Un corsage structuré qui assure un bon maintien, un décolleté carré et une jupe ample au volume généreux, en préservant le confort.",
          },
          {
            slug: "fortune",
            texte:
              "Bustier trapèze en crêpe stretch et organza satin : une matière qui suit, une coupe qui tient.",
          },
          {
            slug: "ember",
            texte:
              "Un corset structuré et une silhouette couture en Dupioni : la princesse qui tient par son corsage.",
          },
          {
            slug: "dove",
            texte:
              "Un tombé fluide en satin mat, un décolleté drapé et les épaules dénudées : « l'élégance intemporelle et le confort absolu », d'après sa fiche.",
          },
          {
            slug: "maribel",
            texte:
              "Une fluide minimaliste en mousseline stretch, au corsage brodé et perlé à la main, avec un décolleté en V et une fente.",
          },
          {
            slug: "aster",
            texte:
              "Un trapèze en dentelle de Chantilly et satin, à la taille naturelle et au corsage drapé, avec des manches amovibles.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Sur mesure plutôt que grande taille",
          texte:
            "Une robe de mariée grande taille en magasin existe en tailles standard, puis se retouche. Chez MADAMOON, la robe est confectionnée à vos mensurations à l'atelier — en semi-mesure pour Watters Designs — et ajustée par nos couturières, retouches comprises. La taille n'est pas un rayon : c'est une mesure.",
        },
        {
          titre: "Ce qui tient : le corsage",
          texte:
            "Un corsage structuré — corset, baleines, doublure ajustée — porte la robe et dessine la taille. C'est lui que l'on regarde d'abord à l'essayage : Charlotte, Calla, Clover, Ember et Fortune en ont un, d'après leurs fiches. Des bretelles, amovibles ou non, ajoutent du maintien.",
        },
        {
          titre: "Forte poitrine : ce qui aide",
          texte:
            "Un décolleté en V ou cœur plutôt qu'un bustier droit, un corsage qui soutient, des bretelles plus larges ou des manches : Maribel, Pendant et Aster vont dans ce sens. Mais la règle, ici, c'est l'essayage — rien ne remplace une heure de showroom.",
        },
        {
          titre: "Grande taille et petit budget",
          texte:
            "Une robe de mariée grande taille pas chère se trouve en prêt-à-porter, pas ici : chez MADAMOON, les prix commencent à partir de 1 500 € pour une confection sur mesure, retouches comprises. En contrepartie, la robe est faite pour vous, et vous ne payez pas de retouches en plus.",
        },
      ],
      echo: {
        titre: "Princesse ou trapèze, selon le jour",
        texte:
          "Sienna, de Casablanca Bridal, se porte princesse ou trapèze : un bustier au décolleté en cœur subtilement revisité, et une jupe ample en dentelle qui apporte un volume généreux. Indiquée sur sa fiche pour toutes les morphologies, elle s'essaie volontiers à côté des robes montrées ici.",
        robe: "sienna",
        voir: "Voir Sienna",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Toutes les robes montrées sur cette page sont indiquées, sur leur fiche, pour toutes les morphologies — en O, en A, en V, en H, en 8 et en X. La grande taille n'est pas une morphologie : une silhouette en O et une silhouette en 8 ne cherchent pas la même coupe. Partez de la vôtre, puis venez essayer.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Jusqu'à quelle taille peut-on confectionner une robe de mariée chez MADAMOON ?",
            r: "La robe est confectionnée à vos mensurations, prises au showroom. Les tailles proposées varient d'une maison à l'autre et se confirment en showroom, modèle par modèle : prenez rendez-vous, et dites-nous les robes qui vous plaisent.",
          },
          {
            q: "Y a-t-il des robes grande taille à essayer au showroom ?",
            r: "Les robes d'essayage sont celles du showroom, en taille d'échantillon ; l'essayage sert à choisir la coupe et la matière, et la robe est ensuite confectionnée à vos mesures. Si une robe vous attire, demandez-nous avant le rendez-vous ce qui s'essaie dans votre taille.",
          },
          {
            q: "Quelle coupe de robe de mariée pour une grande taille ?",
            r: "Il n'y a pas une coupe, il y a votre silhouette. Les trapèzes et les princesses équilibrent une morphologie en A ; les fluides allongent une morphologie en O ; une sirène légère dessine des courbes sur une morphologie en H. Le corsage structuré, lui, aide dans tous les cas.",
          },
          {
            q: "Robe de mariée ronde ou grande taille : quelle différence à l'essayage ?",
            r: "Aucune : une mariée ronde, comme toute mariée, essaie la robe de son choix et la fait confectionner à ses mesures, pour un mariage civil ou religieux. Pas de rayon « pas cher » ni de surcoût : le prix dépend de la robe, à partir de 1 500 €, retouches comprises.",
          },
          {
            q: "Où essayer une robe de mariée grande taille à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure, et vous pouvez venir accompagnée.`,
          },
          {
            q: "Femme ronde, petite, curvy, taille 46 ou XXL : quand prendre rendez-vous, et quelle robe ?",
            r: "Quand : huit à neuf mois avant le mariage, comme toute mariée, été comme hiver. Quelle robe : celle qu'on aime, car tout est confectionné aux mesures de la femme qui la porte — petite ou grande, ronde ou curvy, taille 46, XL ou XXL, ces mots ne servent qu'à la recherche sur un écran. Au showroom, à Paris, en France, il n'y a que vos mesures et un style. Tenue de mariage pour femme forte « à proximité » ou « autour de moi » : en Île-de-France, c'est Paris 10ᵉ ; le soutien-gorge se règle à l'essayage, l'achat se décide après, à 50 ans comme à 25, blanche ou ivoire, pas colorée.",
          },
        ],
        toutes: "Tous les guides",
      },
      fin: {
        titre: "Essayer, puis faire confectionner à vos mesures",
        texte: `${ADRESSE}, Paris 10ᵉ, sur rendez-vous.`,
      },
    },
  },

  /* ————————————————————————————————————————————— romantique —————
   *
   * Vague E. Le romantique n'est pas une coupe : Santana est une
   * princesse, Charlotte un trapèze, Summer une sirène. Ce qui les
   * range ensemble, ce sont les mots de leurs fiches — « romantique »,
   * « féerique », « conte de fées », la dentelle florale, le tulle. */
  {
    famille: "styles",
    slug: "romantique",
    titre: "Robe de mariée romantique à Paris",
    description:
      "Robe de mariée romantique à Paris : dentelle florale, tulle, corsage perlé. Santana, Seraphina, Charlotte, Calla, Carrie… au showroom MADAMOON, Paris 10e.",
    note: "Dentelle, tulle, fleurs",
    chapo:
      "Une robe de mariée romantique se reconnaît à ses matières plus qu'à sa coupe : de la dentelle florale, du tulle qui respire, un corsage brodé de fleurs ou de perles, un décolleté en cœur. Chez MADAMOON, ces robes viennent de Casablanca Bridal, Watters Designs, Olya Mak et Monica Loretti, et s'essaient au showroom du 10ᵉ, à Paris, princesse, trapèze ou sirène côte à côte.",
    morphos: { premieres: ["O", "A", "V", "H", "8", "X"], secondes: [] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée romantiques",
        liste: [
          {
            slug: "santana",
            texte:
              "Une princesse « inspirée des contes de fées », d'après sa fiche : corsage transparent en dentelle florale, jupe volumineuse en tulle et organza à motifs floraux, ourlet festonné. Romantique, aérienne, féerique.",
          },
          {
            slug: "seraphina",
            texte:
              "Une princesse en dentelle richement brodée à la main, manches longues, dos nu : chaque application florale est posée à la main, et c'est elle qui donne à la robe sa dimension romantique.",
          },
          {
            slug: "charlotte",
            texte:
              "Un bustier au décolleté en cœur, un corset en taille basque et la dentelle Caterina : « le rêve de la mariée romantique et élégante », dit sa fiche. Elle existe aussi en version plus couvrante.",
          },
          {
            slug: "calla",
            texte:
              "Tulle très souple et dentelle Highclare, décolleté arrondi, corsage façon corset : une allure douce et aérienne, légère et naturelle.",
          },
          {
            slug: "carrie",
            texte:
              "« Un rêve de conte de fées » : un corsage brodé de perles en feuilles et lianes, de fines doubles bretelles, et plusieurs couches de tulle pailleté. Le romantique qui scintille.",
          },
          {
            slug: "summer",
            texte:
              "Une sirène évasée en dentelle d'Alençon, décolleté en V et longue traîne : la dentelle française pour une allure « à la fois romantique et glamour ».",
          },
          {
            slug: "helene",
            texte:
              "Un corset en dentelle ornée de petites perles et de fleurs en relief, une jupe fluide en mousseline : le romantique qui bouge, à la frontière du bohème.",
          },
          {
            slug: "alicia",
            texte:
              "Dentelle et tulle, épaules dégagées et fente, en trapèze ou en volume princesse : « un look féerique et mémorable », d'après sa fiche.",
          },
          {
            slug: "hera",
            texte:
              "Un trapèze en satin au décolleté Bardot, une fente sur le devant qui contraste avec « le volume romantique de la jupe » : romantique, moderne et intemporelle.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Ce qui fait le romantique",
          texte:
            "La dentelle florale, en premier : brodée à la main chez Seraphina, Caterina chez Charlotte, d'Alençon chez Summer, Highclare chez Calla. Puis le tulle, qui donne du volume sans peser, et les fleurs — en relief sur le corset d'Hélène, en perles sur celui de Carrie. Un décolleté en cœur, enfin, que Charlotte et Santana portent chacune à sa façon.",
        },
        {
          titre: "Romantique ou féerique ?",
          texte:
            "Le féerique est le romantique en plus grand : du volume, du tulle en couches, un peu d'éclat. Santana, Carrie et Alicia sont décrites ainsi sur leurs fiches — contes de fées, tulle pailleté, « look féerique ». Le romantique peut aussi rester près du corps : Summer et Seraphina le prouvent, chacune dans sa coupe.",
        },
        {
          titre: "Princesse, trapèze ou sirène",
          texte:
            "Le romantique traverse les coupes. En princesse, Santana et Seraphina déploient la jupe ; en trapèze, Charlotte, Calla, Carrie et Hera gardent une ligne plus simple ; en sirène, Summer dessine le corps. Au showroom, on les essaie dans cet ordre, ou dans l'autre : la coupe se choisit sur vous, le style est déjà là.",
        },
        {
          titre: "Romantique, pas chargé",
          texte:
            "Une robe romantique réussie tient à un détail dominant, rarement à trois : la dentelle, ou les fleurs, ou l'éclat. C'est ce qui sépare Calla, toute en douceur, de Carrie, toute en lumière. Chaque robe est ensuite confectionnée à vos mesures, retouches comprises — un corsage qui tombe juste fait plus pour le romantique qu'un volant de plus.",
        },
      ],
      echo: {
        titre: "Le romantisme couvert",
        texte:
          "Pour un romantique plus traditionnel, Chastity, d'Olya Mak, recouvre entièrement le corsage et les manches longues d'une dentelle fine, avec un col montant et une longue traîne : « élégance, romantisme et charme traditionnel », d'après sa fiche. Elle est rangée avec les deux-en-un, et s'essaie à côté des robes romantiques.",
        robe: "chastity",
        voir: "Voir Chastity",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Seraphina, Charlotte, Calla, Carrie, Hélène, Alicia et Hera sont indiquées, sur leurs fiches, pour toutes les morphologies ; Summer pour les morphologies en V, en 8 et en X. Santana n'a pas encore de morphologies relevées : elle s'essaie. Une robe romantique grande taille ne se cherche pas dans un rayon : chaque robe est réalisée à vos mesures.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Quelle coupe pour une robe de mariée romantique ?",
            r: "Toutes, à condition de garder les matières du romantique. La princesse en est l'image la plus attendue — Santana, Seraphina — ; le trapèze la rend plus légère — Charlotte, Calla, Carrie — ; la sirène la rend plus près du corps — Summer. Le style est dans la dentelle et le tulle, pas dans la coupe.",
          },
          {
            q: "Qu'est-ce qu'une robe de mariée féerique ?",
            r: "Une robe romantique qui prend de l'ampleur et de l'éclat : plusieurs couches de tulle, un corsage perlé ou brodé, parfois un peu de paillettes. Santana est « inspirée des contes de fées », Carrie est « un rêve de conte de fées », Alicia promet « un look féerique » : ce sont les mots de leurs fiches.",
          },
          {
            q: "Romantique ou bohème, quelle différence ?",
            r: "Le bohème cherche la légèreté et le naturel — mousseline, manches transparentes, pas de longue traîne. Le romantique accepte le volume, la traîne et le corsage travaillé. Hélène est à la frontière des deux : son corset perlé à fleurs est romantique, sa jupe en mousseline est bohème. Les deux pages se lisent ensemble.",
          },
          {
            q: "Où essayer une robe de mariée romantique à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps de comparer une princesse en tulle, un trapèze en dentelle et une sirène, côte à côte.`,
          },
          {
            q: "Robe de mariée romantique à paillettes, fleurie, pour un mariage civil ?",
            r: "Paillettes et strass : Carrie, en tulle pailleté ; Fancy, en dentelle scintillante ; Aleida, en tulle scintillant. Fleurie : Santana et ses motifs floraux, Zina et ses fleurs 3D, Clover et ses fleurs de couleur — la seule robe colorée du catalogue, les autres sont blanches ou ivoire. Pour un mariage civil romantique, une courte fleurie comme Clover, ou Calla, douce et légère ; pour un esprit féerie ou vintage, Carrie ou Bella.",
          },
        ],
        toutes: "Tous les guides",
      },
      fin: {
        titre: "Essayer une robe romantique en showroom",
        texte: `${ADRESSE}, Paris 10ᵉ, sur rendez-vous.`,
      },
    },
  },

  /* ————————————————————————————————————————————— mariage civil —————
   *
   * Vague E. Pas de rayon « mairie » au catalogue, et aucune
   * combinaison : la page le dit. Ce qu'elle montre, ce sont les robes
   * courtes — Elin, dont la fiche parle d'une cérémonie civile, River,
   * Clover, Gabriel — et les robes simples en crêpe ou en charmeuse,
   * qui jouent le même rôle. La page ne prétend pas que la maison
   * s'adresse d'abord aux mariages civils : elle dit ce qui, dans son
   * catalogue, convient à la mairie. */
  {
    famille: "styles",
    slug: "mariage-civil",
    titre: "Robe de mariée pour un mariage civil à Paris",
    description:
      "Robe pour un mariage civil à Paris : courtes en crêpe, deux-en-un à surjupe, robes simples. Elin, River, Clover, Gabriel, Milan… showroom MADAMOON, Paris 10e.",
    note: "Courte, simple, mairie",
    chapo:
      "Une robe de mariage civil se choisit pour une cérémonie courte, souvent en ville, parfois quelques semaines avant la grande fête : une robe courte, ou une robe simple en crêpe, facile à porter et à photographier sur les marches de la mairie. Chez MADAMOON, ce sont Elin, River, Clover et Gabriel pour le court, Milan, Bondi, Adularia et Maribel pour le simple — toutes à essayer au showroom du 10ᵉ, à Paris.",
    morphos: { premieres: ["O", "A", "V", "H", "8", "X"], secondes: [] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes pour un mariage civil",
        liste: [
          {
            slug: "elin",
            texte:
              "Courte, en crêpe, épurée : « une robe de mariée parfaite pour une cérémonie civile », d'après sa fiche, pensée pour marquer le contraste entre vos différentes cérémonies.",
          },
          {
            slug: "river",
            texte:
              "Une robe courte au décolleté carré et aux larges bretelles, silhouette épurée et sculpturale, finitions à la main : la mairie, version couture.",
          },
          {
            slug: "clover",
            texte:
              "Une robe courte brodée de fleurs de couleur, et une surjupe longue à volonté : courte pour le civil, longue pour la suite.",
          },
          {
            slug: "gabriel",
            texte:
              "Une robe courte délicatement perlée, avec une jupe transparente amovible par-dessus : deux tenues en une.",
          },
          {
            slug: "milan",
            texte:
              "Une sirène en crêpe léger, drapé au buste et fente sur le côté : raffinée et minimaliste, longue mais sans rien qui gêne à la mairie.",
          },
          {
            slug: "bondi",
            texte:
              "Une sirène minimaliste en crêpe, épaules dégagées, fente haute et rangée de boutons dans le dos : la robe simple pour une mairie en ville.",
          },
          {
            slug: "adularia",
            texte:
              "Une fluide en charmeuse, « l'élégance minimaliste avec une allure résolument moderne » : rien à retenir, rien à porter.",
          },
          {
            slug: "maribel",
            texte:
              "Une fluide en mousseline stretch, corsage brodé à la main, fente et traîne légère : simple sans être nue.",
          },
          {
            slug: "marie",
            texte:
              "Une fluide à la ligne intemporelle, chez Monica Loretti : la robe longue et calme pour une cérémonie civile qui sera la seule.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Ce qui fait la robe de mariage civil",
          texte:
            "Une cérémonie civile dure peu, se passe debout, et se photographie dehors : la robe doit se porter sans aide, se tenir assise et marcher dans l'escalier de la mairie. D'où le crêpe et la charmeuse, les longueurs courtes, les fentes qui libèrent le pas, et l'absence de longue traîne — Elin, River et Milan résument cela.",
        },
        {
          titre: "Courte ou longue ?",
          texte:
            "Courte, si le civil précède une autre cérémonie : le contraste fait partie du plaisir, et c'est exactement ce que la fiche d'Elin décrit. Longue, si la mairie est la seule cérémonie : une robe simple comme Bondi, Adularia ou Marie fait alors toute la journée. Au showroom, on essaie les deux longueurs le même jour.",
        },
        {
          titre: "Et la combinaison de mariée ?",
          texte:
            "Le catalogue MADAMOON ne propose pas de combinaison mariée, ni de tailleur. Ce que l'on cherche dans une combinaison de mariée — la ligne nette, l'aisance, l'esprit tailleur — se retrouve dans River, au décolleté carré et aux larges bretelles, ou dans Bondi et Milan, en crêpe près du corps. À essayer avant de trancher.",
        },
        {
          titre: "Une robe pour deux cérémonies",
          texte:
            "Les deux-en-un font la mairie et la fête avec une seule robe : Clover et Gabriel se portent courtes, puis gagnent une surjupe ou une jupe transparente ; Tessa change de look en retirant ses bretelles. Chaque robe est confectionnée à vos mesures, retouches comprises, surjupe comprise.",
        },
      ],
      echo: {
        titre: "Une robe, deux looks",
        texte:
          "Tessa, de Casablanca Bridal, est une sirène au corset structuré, avec une surjupe détachable et des bretelles amovibles « pour un autre look », d'après sa fiche. Longue, elle n'est pas une robe de mairie à proprement parler ; mais pour qui veut une seule robe du civil à la soirée, elle est la deux-en-un à essayer en premier.",
        robe: "tessa",
        voir: "Voir Tessa",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Elin, River, Clover, Gabriel, Maribel et Marie sont indiquées, sur leurs fiches, pour toutes les morphologies ; Milan pour les morphologies en H, en 8 et en X. Bondi et Adularia n'ont pas encore de morphologies relevées : elles s'essaient. Une robe de mariage civil grande taille ne se cherche pas dans un rayon : chaque robe est réalisée à vos mesures.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Quelle robe pour un mariage civil à Paris ?",
            r: "Pour une robe mariage civil Paris, le choix se fait au showroom du 10ᵉ : une robe courte en crêpe comme Elin, pensée pour une cérémonie civile d'après sa fiche, ou une robe courte plus habillée comme River. Si la mairie est votre seule cérémonie, une longue simple — Bondi, Milan, Adularia, Marie — fait la journée entière. Toutes s'essaient au showroom MADAMOON, Paris 10ᵉ.",
          },
          {
            q: "Une robe de mariée courte convient-elle à la mairie ?",
            r: "C'est même là qu'elle est le plus à sa place : une cérémonie courte, debout, en ville. Elin, River, Clover et Gabriel sont les robes courtes du catalogue ; Clover et Gabriel se rallongent ensuite d'une surjupe ou d'une jupe transparente pour la suite de la journée.",
          },
          {
            q: "Peut-on porter la même robe au civil et à la fête ?",
            r: "Oui, avec une deux-en-un : Clover, Gabriel et Tessa changent de silhouette en une minute, courte puis longue, ou avec et sans bretelles. Sinon, deux robes : une courte pour la mairie, et la robe de la fête — le contraste est souvent recherché.",
          },
          {
            q: "Où essayer une robe de mariage civil à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps d'essayer une courte, une longue simple et une deux-en-un, et de décider.`,
          },
          {
            q: "Robe de mariage civil en hiver ou en été, blanche, de marque, pas chère ?",
            r: "En hiver, une longue simple à manches — Montana — ou une courte avec une veste ; en été, Elin ou River. Blanche ou ivoire, selon la carnation. De marque : Olya Mak pour Elin et River, Casablanca Bridal pour Clover, Watters Designs pour Gabriel — des maisons, pas des enseignes en ligne. Pas chère au sens d'un site de prêt-à-porter, non : chaque robe est faite à vos mesures, à partir de 1 500 €, retouches comprises, même courte. Où acheter : au showroom, le seul magasin, pour une femme qui se marie en octobre comme en juin ; mi-longue, non — courte ou longue ; style tailleur ou jacquard — Monica, trapèze en jacquard floral, en tient lieu ; petit prix, non — sur mesure.",
          },
        ],
        toutes: "Tous les guides",
      },
      fin: {
        titre: "Essayer une robe de mariage civil en showroom",
        texte: `${ADRESSE}, Paris 10ᵉ, sur rendez-vous.`,
      },
    },
  },

  /* ————————————————————————————————————————————— courte —————
   *
   * « Robe de mariée courte » est la plus grosse famille de recherches
   * sans page (27 750 par mois, base Semrush). Le catalogue a quatre
   * robes courtes, et c'est ce que la page montre — sous /details/ et
   * non sous /coupes/ : la maison n'a pas tranché si « courte » devient
   * une coupe du site (A-VERIFIER § 4). Si elle le fait, /coupes/courte/
   * reprendra cette page, avec une redirection. */
  {
    famille: "details",
    slug: "courte",
    titre: "Robe de mariée courte à Paris",
    description:
      "Robe de mariée courte à Paris : Elin en crêpe, River au décolleté carré, Clover et Gabriel qui se rallongent d'une surjupe. Au showroom MADAMOON, Paris 10e.",
    note: "Au genou, légère, libre",
    chapo:
      "Une robe de mariée courte n'est pas une robe de moins : c'est une robe qui se voit en entier, jambes comprises, et qui bouge avec vous. Le catalogue MADAMOON en propose — Elin, River, Clover et Gabriel —, chacune confectionnée à vos mesures, et toutes s'essaient au showroom du 10ᵉ, à Paris, à côté des longues pour comparer.",
    morphos: { premieres: ["O", "A", "V", "H", "8", "X"], secondes: [] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée courtes",
        liste: [
          {
            slug: "elin",
            texte:
              "Courte, en crêpe, épurée : « une robe de mariée parfaite pour une cérémonie civile », d'après sa fiche. La robe courte de mariée la plus simple du catalogue, chez Olya Mak.",
          },
          {
            slug: "river",
            texte:
              "Une robe courte au décolleté carré et aux larges bretelles, silhouette sculpturale, finitions à la main : la robe de mariée courte chic, « pour celles qui souhaitent sortir des codes traditionnels ».",
          },
          {
            slug: "clover",
            texte:
              "Une robe courte brodée de fleurs de couleur, avec une surjupe longue à volonté : la robe de mariée courte originale, qui devient longue quand on le décide.",
          },
          {
            slug: "gabriel",
            texte:
              "Une robe courte délicatement perlée, et une jupe transparente amovible par-dessus : courte à la mairie, longue à la fête, chez Watters Designs.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Ce qui fait une robe courte",
          texte:
            "La longueur, d'abord : au genou ou juste au-dessus, ce qui libère le pas et montre les chaussures. Puis la matière, qui doit tenir sans traîne pour l'alourdir — le crêpe d'Elin, le tissu sculptural de River. Une robe courte se juge debout et en marchant : au showroom, on la fait marcher avant de la faire tourner.",
        },
        {
          titre: "Courte chic ou courte originale ?",
          texte:
            "Chic : River, au décolleté carré, dont la fiche parle d'« un véritable travail de coupe » sous une simplicité apparente. Originale : Clover, brodée de fleurs de couleur — la seule robe du catalogue qui ne soit pas tout en blanc ou ivoire —, et Gabriel, perlée sous sa jupe transparente. Elin, en crêpe, reste la plus sobre des quatre.",
        },
        {
          titre: "Pour quelle cérémonie ?",
          texte:
            "Le mariage civil, en premier : Elin est pensée pour lui. La réception ou le deuxième look de la soirée : River, d'après sa fiche, est « parfaite pour un deuxième look de mariée, une réception ou une cérémonie moins conventionnelle ». Et le mariage entier, quand on veut une robe dans laquelle on danse.",
        },
        {
          titre: "Courte, puis longue",
          texte:
            "Clover et Gabriel sont des deux-en-un : courtes le matin, longues le soir, par une surjupe ou une jupe transparente qui s'attache et se retire. Une robe pour deux cérémonies, confectionnée à vos mesures, retouches comprises — la surjupe aussi.",
        },
      ],
      echo: {
        titre: "Si c'est finalement la longue",
        texte:
          "Beaucoup de mariées venues pour une robe courte repartent avec une longue simple, et l'inverse. Milan, de Monica Loretti, est la longue qui joue le même rôle qu'une courte : crêpe léger, drapé au buste, fente sur le côté, « pour la mariée qui recherche un style raffiné et minimaliste ». Elle s'essaie à côté des courtes.",
        robe: "milan",
        voir: "Voir Milan",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Elin, River, Clover et Gabriel sont indiquées, sur leurs fiches, pour toutes les morphologies : une robe courte dessine la jambe et laisse le buste libre, ce qui convient à toutes. Une robe de mariée courte grande taille ne se cherche pas dans un rayon : chaque robe est réalisée à vos mesures.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Peut-on se marier en robe courte ?",
            r: "Oui, et de plus en plus de mariées le font, à la mairie comme à la fête. Une robe courte de mariée reste une robe de mariée : Elin, River, Clover et Gabriel sont confectionnées à vos mesures, comme les longues, et s'essaient au même showroom.",
          },
          {
            q: "Quelle robe de mariée courte pour un mariage civil ?",
            r: "Elin, dont la fiche dit « parfaite pour une cérémonie civile », pour la sobriété ; River pour une mairie plus habillée. Si une autre cérémonie suit, Clover et Gabriel font les deux avec leur surjupe. La page du mariage civil détaille les robes longues simples qui conviennent aussi.",
          },
          {
            q: "Une robe de mariée courte coûte-t-elle moins cher ?",
            r: "Pas nécessairement : le prix tient à la maison, à la matière et au travail du corsage, pas à la longueur. Comme toutes les robes du catalogue, les courtes sont confectionnées à vos mesures, retouches comprises, à partir de 1 500 € ; le prix de chacune se confirme au showroom.",
          },
          {
            q: "Où essayer une robe de mariée courte à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps d'essayer les courtes, et une longue pour comparer.`,
          },
          {
            q: "Robe de mariée courte en dentelle, à manches, ou courte devant et longue derrière ?",
            r: "Le catalogue n'a pas de robe courte devant et longue derrière, ni de robe midi : ses courtes s'arrêtent au genou. En dentelle, en tulle ou perlée, avec ou sans manches, bustier ou bretelles : Gabriel est perlée sous sa jupe transparente, Clover brodée de fleurs, River à larges bretelles, Elin en crêpe sans manche. Une courte bohème, une courte blanche pour l'hiver avec une veste : c'est l'essayage qui le dit, et la robe se fait aux mesures de chaque femme. Courte moderne ou vintage années 50, élégante avec un voile court, dos nu ou corset, en satin, à paillettes, jupe bouffante ou droite, pour une femme ronde ou une mariée senior : les courtes s'essaient avec tout cela ; un nœud ou une ceinture, c'est de l'accessoire, pas du catalogue.",
          },
        ],
        toutes: "Tous les guides",
      },
      fin: {
        titre: "Essayer une robe courte en showroom",
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
