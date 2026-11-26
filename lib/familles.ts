import type { NomScene } from "@/lib/medias";
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
  /* Le film du premier écran, sur ordinateur, quand la page a le sien.
   * Sans lui, c'est la première robe de la page qui l'ouvre. « alt » dit
   * ce que montre l'image, sans nommer de robe : ce film n'est pas celui
   * d'un modèle du catalogue. */
  film?: { src: string; affiche: NomScene; alt: string };
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
      "Robe de mariée bohème à Paris : mousseline, dentelle florale, manches légères. Hélène, Murielle, Calla, Mathilda et Mitra, au showroom MADAMOON, Paris 10e.",
    note: "Souple, légère, champêtre",
    chapo:
      "Une robe de mariée bohème ne se pose pas : elle respire. Une mousseline qui suit vos pas, une dentelle florale, des manches si légères qu'on les devine à peine. Chez MADAMOON, cet esprit bohème chic s'essaie en toute intimité, dans notre showroom du 10ᵉ, à Paris.",
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
              "Un corset de dentelle semé de petites perles et de fleurs en relief, puis une jupe en mousseline, délicate et légère. Le bohème chic, dans ce qu'il a de plus lumineux.",
          },
          {
            slug: "murielle",
            texte:
              "Dentelle florale et mousseline, décolleté en V, manches illusion, une fente qui libère le pas : la robe de mariée bohème en dentelle, signée Monica Loretti.",
          },
          {
            slug: "calla",
            texte:
              "Un tulle très souple et la délicate dentelle Highclare, un décolleté arrondi, un corsage structuré façon corset : une allure douce et aérienne, légère et naturelle.",
          },
          {
            slug: "mathilda",
            texte:
              "Fluide et romantique, pensée pour la femme enceinte : des manches courtes, une silhouette douce, élégante et intemporelle, chez Monica Loretti.",
          },
          {
            slug: "mitra",
            texte:
              "Une trapèze à taille basse, une dentelle Cassie appliquée à la main et de délicats rubans de velours : un look à la fois féerique et élégant.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Ce qui fait le bohème",
          texte:
            "Tout ce qui bouge, tout ce qui respire : une dentelle florale, des manches légères ou transparentes, une traîne courte — ou pas de traîne du tout —, une coiffure souple. Votre robe doit pouvoir marcher dans l'herbe, et danser pieds nus.",
        },
        {
          titre: "Bohème chic ou champêtre ?",
          texte:
            "Un même esprit, deux décors. Une robe de mariée champêtre accompagne un mariage à la campagne, dans un jardin ou une grange : de la mousseline, de la dentelle, rien qui pèse. Le bohème chic y ajoute la tenue d'un corsage travaillé, comme celui d'Hélène, et se prête aussi bien à une cérémonie en ville.",
        },
        {
          titre: "En dentelle, dos nu, manches légères",
          texte:
            "Vous l'imaginez en dentelle ? Murielle est une robe de mariée bohème en dentelle, florale, transparente aux manches. Vous pensez au dos ? Hélène et Murielle se découvrent aussi de dos, sur leurs pages. Aux manches ? Mathilda les porte courtes. Quant à l'allure hippie chic avec une robe bohème, cela repose surtout sur le choix des accessoires, et le style de votre mise en beauté.",
        },
        {
          titre: "Bohème, mais pas négligé",
          texte:
            "Fluide et bohème, votre robe reste une robe de mariée : c'est son corsage travaillé qui lui donne sa tenue et son éclat. Le bohème est un style, jamais une absence de finition — et comme chacune de nos robes, la vôtre est confectionnée à vos mesures, retouches comprises.",
        },
      ],
      echo: {
        titre: "Une touche vintage",
        texte:
          "Envie d'un bohème aux accents vintage ? Calla, de Watters Designs, est notre bohème vintage : un tulle très souple, la délicate dentelle Highclare, un décolleté arrondi et un corsage structuré façon corset.",
        robe: "calla",
        voir: "Voir Calla",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "La coupe fluide est notre premier conseil pour les morphologies en O, en V, en H, en 8 et en X, et mérite l'essai pour une morphologie en A. Hélène, Murielle, Calla, Mathilda et Mitra vont à toutes les morphologies. Et parce que chaque robe est réalisée à vos mesures, la robe bohème grande taille n'est pas un rayon à part : c'est la vôtre.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Une robe fluide convient-elle à un mariage bohème ?",
            r: "C'est la plus naturelle. Une jupe en mousseline, une dentelle florale, des manches légères : tout y est. Hélène a d'ailleurs été imaginée pour la mariée « qui préfère dire OUI dans un look bohème chic ».",
          },
          {
            q: "Quelle robe de mariée pour un mariage champêtre ?",
            r: "Une robe qui bouge et qui ne pèse rien : mousseline, dentelle florale, pas de longue traîne. Hélène et Murielle ont cet esprit ; pour un mariage champêtre chic, le corsage perlé d'Hélène fait toute la différence.",
          },
          {
            q: "Une robe bohème convient-elle à un mariage civil ?",
            r: "Oui, et d'autant mieux qu'elle est légère. Pour la mairie, pensez aussi à une robe courte en crêpe comme Elin, imaginée pour une cérémonie civile ; la robe bohème, elle, sera celle de la fête.",
          },
          {
            q: "Quelle robe pour un mariage champêtre, et à quel prix ?",
            r: "Une robe pour mariage champêtre est d'abord une robe légère, comme Hélène ou Murielle. Son prix dépend du modèle choisi : chaque robe est confectionnée à vos mesures, à partir de 1 500 €, retouches comprises. Une robe bohème pas chère, au sens du prêt-à-porter, n'est donc pas ce que nous proposons ; une robe faite pour vous, oui.",
          },
          {
            q: "Quelle robe bohème pour un mariage en hiver, ou sur le thème nature ?",
            r: "Pour un mariage hivernal, privilégiez une robe de mariée bohème à manches longues, en dentelle de Chantilly ou en crêpe, éventuellement accompagnée d'une cape, d'un boléro ou d'une étole pour apporter une touche de chaleur et d'élégance.",
          },
          {
            q: "Existe-t-il une robe bohème rose, fleurie ou mi-longue ?",
            r: "Nos robes bohèmes sont aujourd'hui longues, et blanches ou ivoire : pas de rose ni de vert sauge dans nos collections actuelles, la couleur se confie au bouquet. Fleurie, en revanche, oui, par la dentelle florale et les fleurs en relief. Bustier ou col en V : cela se décide à l'essayage.",
          },
          {
            q: "Enceinte ou ronde, puis-je porter une robe de mariée bohème ?",
            r: "Bien sûr. Mathilda, chez Monica Loretti, est pensée pour la grossesse. Et pour une femme ronde comme pour toute mariée, la règle est la même : la robe est réalisée à vos mesures, avec les éventuelles personnalisations nécessaires pour sublimer votre morphologie.",
          },
          {
            q: "Où essayer une robe de mariée bohème à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps d'essayer plusieurs robes fluides, et de comparer les matières du bout des doigts.`,
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
      "Une robe de mariée simple ne cache rien, et c'est toute sa beauté : une matière unie — crêpe, charmeuse, satin mat —, une coupe nette, un dos qui se boutonne. Signées Casablanca Bridal, Watters Designs et Monica Loretti, nos robes minimalistes s'essaient au showroom du 10ᵉ, à Paris, où une robe simple et chic se juge au premier regard dans le miroir.",
    morphos: { premieres: ["H", "8", "X"], secondes: ["O", "A", "V"] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée simples et minimalistes",
        liste: [
          {
            slug: "enid",
            texte:
              "Une sirène en néoprène au décolleté droit, épaules dénudées, et une infinité de boutons qui courent dans le dos jusqu'au bout de la traîne. En bustier ou en col bardot, elle est moderne et minimaliste.",
          },
          {
            slug: "bondi",
            texte:
              "Une sirène minimaliste en crêpe, épaules dégagées, une fente : une création pensée pour la mariée moderne.",
          },
          {
            slug: "milan",
            texte:
              "Un crêpe léger, un drapé au buste, une fente sur le côté. Raffinée et minimaliste à la fois, chez Monica Loretti.",
          },
          {
            slug: "maribel",
            texte:
              "Une fluide minimaliste en mousseline stretch, dont le corsage est brodé et perlé à la main : la robe simple qui garde un détail précieux.",
          },
          {
            slug: "dove",
            texte:
              "Un satin mat au tombé fluide, un décolleté drapé, les épaules dénudées et une ligne infinie de boutons jusqu'à la traîne. L'élégance intemporelle, le confort en plus.",
          },
          {
            slug: "adularia",
            texte:
              "Une fluide en charmeuse, d'une élégance minimaliste et d'une allure résolument moderne.",
          },
          {
            slug: "fortune",
            texte:
              "Un bustier trapèze en crêpe stretch et organza satin : une robe de mariée simple et élégante, dans une coupe qui va à toutes.",
          },
          {
            slug: "amaryllis",
            texte:
              "Droite ou sirène, en charmeuse, avec une file de boutons sur le côté et des bretelles à porter sur les épaules ou tombantes. Moderne, et originale.",
          },
          {
            slug: "addison",
            texte:
              "Un satin de soie, une jupe épurée — avec des poches —, des bretelles tombantes amovibles et des motifs floraux appliqués à la main. La princesse, version simple.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Ce qui fait une robe simple",
          texte:
            "Une matière unie qui se suffit à elle-même : le crêpe de Bondi et de Milan, la charmeuse d'Adularia et d'Amaryllis, le satin mat de Dove, le néoprène d'Enid. Une coupe qui dessine sans rien ajouter. Et un dos boutonné, qui tient lieu de parure.",
        },
        {
          titre: "Simple et chic, pas simple et nue",
          texte:
            "La robe de mariée chic et simple garde toujours un geste : les boutons sur le côté d'Amaryllis, le drapé de Milan, le corsage brodé de Maribel, les poches d'Addison. C'est ce détail, unique, qui fait d'une robe sobre une robe que l'on n'oublie pas.",
        },
        {
          titre: "Moderne, originale, contemporaine",
          texte:
            "Dans la dernière collection reçue, celle de Casablanca Bridal, la robe de mariée moderne se porte en col bardot comme Enid, épaules dégagées comme Bondi, ou sans bretelles comme Dove. Ici, l'originalité naît de la coupe, jamais de l'ajout.",
        },
        {
          titre: "Une robe simple se confectionne à vos mesures",
          texte:
            "Sur une matière unie, tout se voit — et c'est précisément pour cela que votre robe est réalisée à l'atelier selon vos mensurations, retouches comprises, à partir de 1 500 €. Comme toutes les robes de la boutique.",
        },
      ],
      echo: {
        titre: "Pour un mariage civil",
        texte:
          "Elin, d'Olya Mak, est une robe courte en crêpe pensée pour la cérémonie civile : légère, épurée, elle marque joliment le contraste entre la mairie et la fête. C'est la robe de mariée simple des mariages en deux temps.",
        robe: "elin",
        voir: "Voir Elin",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Une robe minimaliste ne cache rien : elle se choisit avec la coupe qui vous va, puis s'ajuste à vos mesures. Les sirènes en crêpe, Milan et Amaryllis, vont aux morphologies en H, en 8 et en X ; Maribel, Dove, Fortune, Addison et Adularia, à toutes les morphologies.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Qu'est-ce qu'une robe de mariée minimaliste ?",
            r: "Une robe sans ornement rapporté, où la matière, la coupe et le dos font tout. Chez MADAMOON : Enid, Bondi et Milan, en crêpe ou en néoprène ; Adularia et Amaryllis, en charmeuse ; Dove, en satin mat.",
          },
          {
            q: "Une robe de mariée simple est-elle moins chère ?",
            r: "Pas nécessairement : le prix tient à la matière, à la maison qui la signe et au travail de confection, non au nombre d'ornements. Toutes nos robes sont confectionnées à vos mesures, à partir de 1 500 €, retouches comprises. Notre guide des prix l'explique en détail.",
          },
          {
            q: "Robe de mariée simple et quiet luxury : la même chose ?",
            r: "Presque. Le quiet luxury — ce luxe discret annoncé parmi les tendances 2027 — est une robe simple dont la matière fait tout : un crêpe lourd, un satin de soie, une charmeuse qui tombe, aucun ornement qui fasse signe. Bondi et Milan en crêpe, Dove en satin mat, Addison en satin de soie, Adularia en charmeuse en ont l'esprit. Le style quiet luxury se reconnaît à la justesse d'une confection à vos mesures, pas au décor.",
          },
          {
            q: "Quelle robe de mariée simple pour un mariage civil ?",
            r: "Une robe courte en crêpe comme Elin, pensée pour la cérémonie civile ; ou une fluide épurée comme Adularia, pour une mairie suivie d'un déjeuner.",
          },
          {
            q: "Robe simple en dentelle, en satin ou en crêpe ?",
            r: "Le crêpe (Bondi, Milan) et la charmeuse (Adularia) offrent la ligne la plus pure ; le satin mat de Dove apporte la lumière. Et pour une touche de dentelle, Shiloh marie une jupe en crêpe à un corsage en Chantilly : la simplicité, une matière en plus.",
          },
          {
            q: "Une robe de mariée simple peut-elle être originale ?",
            r: "Oui : originale ne veut pas dire chargée. Une robe de mariée originale et simple se joue sur un seul détail — la fente de Bondi, l'infinité de boutons d'Enid, le décolleté carré de River — plutôt que sur la dentelle. C'est la robe élégante et épurée que l'on regarde encore en photo, dix ans après.",
          },
          {
            q: "Une robe simple suit-elle la mode ?",
            r: "Elle la traverse. Simple, chic, tendance sans appartenir à une saison ; rock ou classique, très simple ou plus atypique : elle a de la classe parce qu'elle ne cherche pas à en avoir. Longue ou courte, avec ou sans manches, dos nu, sans dentelle ou avec une simple touche de dentelle — y compris pour une tenue de mariée simple en hiver —, tout cela se décide à l'essayage.",
          },
          {
            q: "Existe-t-il des robes de mariée simples en couleur ?",
            r: "Nos robes simples sont blanches ou ivoire. Une seule robe ose la couleur : Clover, pour ses fleurs brodées. Les modèles simples — Bondi, Milan, Adularia, Dove — ne sont jamais colorés, et restent élégants par leur seule coupe.",
          },
          {
            q: "Grande taille, femme ronde : la robe simple est-elle pour moi ?",
            r: "Oui. Grande taille ou non, chaque robe est réalisée aux mesures de la femme qui la porte : c'est même sur une matière unie que le sur-mesure fait la plus belle différence.",
          },
          {
            q: "Peut-on louer une robe de mariée simple ?",
            r: "Non : nos robes sont proposées à l'achat seulement, pas en location, puisqu'elles sont confectionnées pour vous. Et simple ne veut pas dire pas chère : moins de dentelle, mais le même travail de coupe, à partir de 1 500 €.",
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
      "De la plus fine Chantilly à la dentelle brodée à la main, aucune matière n'habille autant de nos robes. Votre robe de mariée en dentelle peut être une sirène comme Oksana ou Summer, une trapèze comme Charlotte, une princesse comme Seraphina : toutes s'essaient au showroom du 10ᵉ, à Paris, et se confectionnent à vos mesures.",
    morphos: { premieres: ["O", "A", "V", "H", "8", "X"], secondes: [] },
    /* Pas de film : celui du 18 novembre 2026, généré, a été retiré à la
     * demande de Mouna (25 nov.) — la dentelle y paraissait retouchée.
     * La page s'ouvre sur la photographie d'Oksana. */
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée en dentelle",
        liste: [
          { slug: "oksana", texte: "Une sirène en dentelle de Chantilly, au corset basque en pointe. La dentelle dans ce qu'elle a de plus français." },
          { slug: "summer", texte: "Une sirène en dentelle d'Alençon, décolleté en V et longue traîne : toute la beauté de la dentelle française, sur une silhouette féminine." },
          { slug: "uma", texte: "Une sirène en dentelle au dos illusion, signée Watters Designs. Ici, la dentelle habille le dos autant que le devant." },
          { slug: "pendant", texte: "Une trapèze en dentelle, col bateau et manches longues : la robe de mariée en dentelle à manches longues par excellence." },
          { slug: "montana", texte: "Une sirène en satin mat, des manches longues en dentelle, un dos illusion. La dentelle en touche précieuse, sur une matière unie." },
          { slug: "seraphina", texte: "Une princesse en dentelle brodée, dos nu et manches longues, chez Olya Mak." },
          { slug: "murielle", texte: "Dentelle florale, décolleté plongeant, manches illusion et fente : la dentelle version bohème, chez Monica Loretti." },
          { slug: "charlotte", texte: "Une robe bustier en dentelle Caterina, décolleté en cœur et corset en taille basque : le rêve de la mariée romantique. Elle existe aussi dans une version plus couvrante." },
          { slug: "aster", texte: "Dentelle de Chantilly, satin et manches amovibles, sur une silhouette trapèze à la taille naturelle." },
        ],
      },
      colonnes: [
        {
          titre: "Les dentelles du catalogue",
          texte:
            "Robe, mariée, dentelle : l'accord est si ancien qu'on en oublie combien les dentelles diffèrent. La Chantilly d'Oksana, de Charlize, de Shiloh et d'Aster ; l'Alençon de Summer ; la Caterina de Charlotte et de Clover ; la Highclare de Calla ; la Cassie de Mitra ; la dentelle florale d'Hélène et de Murielle ; la dentelle brodée de Seraphina. Chaque robe porte la sienne, et sa page vous la nomme.",
        },
        {
          titre: "Dentelle et manches longues",
          texte:
            "La robe de mariée en dentelle à manches longues, qui habille les bras sans les cacher, se décline en trapèze avec Pendant, en sirène avec Montana, en princesse avec Seraphina, en col montant avec Chastity. Aster, elle, porte des manches amovibles en dentelle : avec pour la cérémonie, sans pour la fête.",
        },
        {
          titre: "Dentelle et bustier",
          texte:
            "Le bustier en dentelle, c'est Charlotte, décolleté en cœur et corset en taille basque ; ou Oksana, au corset basque en pointe. Vous préférez une robe de mariée bustier en dentelle plus couvrante ? Charlotte existe aussi sans son décolleté plongeant.",
        },
        {
          titre: "Dentelle, satin et crêpe",
          texte:
            "La robe de mariée satin et dentelle unit deux matières : Charlize et Sheridan en satin mat et Chantilly, Montana en satin mat et manches de dentelle, Shiloh en Chantilly sur une jupe en crêpe. La dentelle n'y est plus toute la robe : elle en devient le détail.",
        },
      ],
      echo: {
        titre: "Avec une cape en dentelle",
        texte:
          "Sheridan, de Casablanca Bridal, est une sirène en satin mat et dentelle qui arrive avec sa cape assortie. En tulle souple et avec une petite touche de dentelle, elle est drapée sur l'épaule et tombe jusqu'au sol avec la traîne. La cape de mariée en dentelle se porte pour la cérémonie, et se retire pour la fête. Une très belle alternative au voile de mariée.",
        robe: "sheridan",
        voir: "Voir Sheridan",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "La dentelle ne choisit pas de morphologie : c'est la coupe qui décide. Pendant, Aster, Charlotte, Murielle et Seraphina vont à toutes les morphologies ; les sirènes en dentelle — Uma, Summer et Montana — d'abord aux morphologies en V, en H, en 8 et en X.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Quelle dentelle pour une robe de mariée ?",
            r: "La Chantilly est fine et légère, l'Alençon plus dessinée, la dentelle brodée ou florale plus présente. Le mieux est encore de les toucher : au showroom, vous les comparez du bout des doigts.",
          },
          {
            q: "Une robe de mariée en dentelle convient-elle à un mariage en hiver ?",
            r: "Oui, surtout avec des manches longues : Pendant, Montana, Seraphina et Chastity en portent, et Aster a des manches amovibles. Une dentelle doublée tient chaud sans peser.",
          },
          {
            q: "Dentelle ou satin ?",
            r: "La dentelle habille et dessine ; le satin tient et éclaire. Beaucoup de robes refusent de choisir : Charlize, Sheridan et Montana associent satin mat et dentelle. C'est l'essayage qui tranche, jamais la règle.",
          },
          {
            q: "Robe de mariée en dentelle blanche ou ivoire ?",
            r: "Les deux existent, et la dentelle change de caractère avec la couleur : plus graphique en blanc, plus douce en ivoire. Les coloris de chaque modèle se découvrent au showroom, à la lumière du jour — c'est là, et non sur un écran, que l'on décide de se marier en blanc ou en ivoire.",
          },
          {
            q: "Où essayer une robe de mariée en dentelle à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, Paris 10ᵉ, sur rendez-vous, pendant une heure privatisée pour vous. La robe choisie est ensuite confectionnée à vos mesures.`,
          },
          {
            q: "Dentelle brodée, broderie anglaise, dentelle sur tulle ou sur soie : quelle différence ?",
            r: "La broderie est un fil posé sur un tulle ou un tissu : on la voit sur Seraphina, brodée à la main, et sur le haut de Maribel. La broderie anglaise, ajourée, ne fait pas partie de notre sélection. La dentelle, elle, se pose sur un tulle couleur chair pour l'effet illusion, sur un satin ou une soie pour la tenue.",
          },
          {
            q: "Une dentelle scintillante, à paillettes ou à strass, cela existe ?",
            r: "Oui : Fancy, toute de « dentelle florale scintillante », est notre dentelle brillante, sublimée par de petites perles délicates.",
          },
          {
            q: "Quel est le prix d'une robe de mariée en dentelle ?",
            r: "À partir de 1 500 €, tous types de dentelle confondus, et à partir de 1 900 € pour les dentelles françaises, confection sur mesure comprise. Une fleur brodée à la main ne sera jamais « pas cher » ; elle est, en revanche, faite pour vous. Pour un mariage civil, pensez à une dentelle légère, à bretelles fines.",
          },
          {
            q: "Dentelle de Calais, crochet : les trouve-t-on chez MADAMOON ?",
            r: "Le crochet, non. Quant aux dentelles, nos robes nomment la Chantilly, l'Alençon, la Caterina et la Highclare — pas la dentelle de Calais-Caudry.",
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
      "Une robe de mariée à manches longues habille le bras sans jamais alourdir la silhouette : des manches en dentelle sur une trapèze comme Pendant, sur une sirène en satin mat comme Montana, sur une princesse comme Seraphina, ou en satin perlé comme Bella. Chez MADAMOON, la robe de mariée avec manches s'essaie au showroom du 10ᵉ, à Paris, et se confectionne à vos mesures.",
    morphos: { premieres: ["O", "A", "V", "H", "8", "X"], secondes: [] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée à manches longues",
        liste: [
          { slug: "pendant", texte: "Une trapèze signée Watters Designs. Robe de mariée, manches longues, dentelle : tout y est, et elle va à toutes." },
          { slug: "montana", texte: "Une sirène en satin mat, des manches longues en dentelle, un dos illusion : la délicatesse des manches en dentelle, sur une robe unie." },
          { slug: "chastity", texte: "Dentelle, col montant, longue traîne : la dentelle recouvre le corsage et les longues manches, pour un charme traditionnel." },
          { slug: "seraphina", texte: "Une princesse en dentelle brodée, manches longues et dos nu. Les manches habillent, le dos respire." },
          { slug: "bella", texte: "Sirène ou fourreau, dans un satin haut de gamme orné de perles, dos nu et manches longues : la robe à manches longues en satin, chic et très couture." },
          { slug: "aster", texte: "Dentelle de Chantilly, satin et manches amovibles : des manches pour la cérémonie, les bras nus pour la fête." },
        ],
      },
      colonnes: [
        {
          titre: "Manches longues en dentelle",
          texte:
            "Ce sont les plus nombreuses. Pendant, Montana, Chastity et Seraphina portent des manches en dentelle, transparentes ou doublées, qui dessinent le bras sans tout à fait le couvrir. Pour l'hiver, le col montant de Chastity vient compléter les manches.",
        },
        {
          titre: "Manches longues en satin",
          texte:
            "Bella porte ses manches dans le satin de la robe, orné de perles : une ligne couvrante et graphique, pour la mariée qui veut une robe de mariée chic, sans dentelle.",
        },
        {
          titre: "Amovibles, ballon, illusion",
          texte:
            "Aster a des manches amovibles. Ryle, des manches ballon : la robe de mariage à manches bouffantes. Murielle, des manches illusion, en dentelle transparente. Autant de façons de porter la manche avec légèreté.",
        },
        {
          titre: "Avec des manches, ou avec des bretelles",
          texte:
            "Si les manches longues vous pèsent, la robe de mariée à bretelles garde l'épaule habillée : Addison et Héra ont des bretelles tombantes, Amaryllis des bretelles à porter sur les épaules ou sur les bras.",
        },
      ],
      echo: {
        titre: "Des manches ballon",
        texte:
          "Ryle, de Watters Designs, est une fluide aux manches ballon et au décolleté en V profond, dans une charmeuse légère. La manche bouffante donne du volume à l'épaule, sans couvrir le bras.",
        robe: "ryle",
        voir: "Voir Ryle",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Les manches ne changent pas la coupe : elles s'ajoutent à celle qui vous va. Pendant, Chastity, Seraphina et Aster conviennent à toutes les morphologies ; Montana, aux morphologies en A, en H, en 8 et en X.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Quelle robe de mariée à manches longues pour un mariage en hiver ?",
            r: "Une robe aux manches doublées et au col montant, comme Chastity ; ou une sirène en satin mat aux manches de dentelle, comme Montana. Les manches en satin de Bella couvrent davantage qu'une dentelle transparente.",
          },
          {
            q: "Peut-on retirer les manches pour la soirée ?",
            r: "Sur Aster, oui : ses manches sont amovibles. Pour les autres robes, parlons-en à l'essayage, modèle par modèle.",
          },
          {
            q: "Une robe à manches longues pour un mariage civil ?",
            r: "Chastity, en dentelle à col montant, est une deux-en-un : elle change d'allure entre la mairie et la fête. Pour une mairie seule, une robe courte comme Elin reste une jolie option.",
          },
          {
            q: "Où essayer une robe de mariée à manches longues à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, Paris 10ᵉ, sur rendez-vous. L'essayage est privé, pendant une heure ; votre robe est ensuite confectionnée à vos mesures, manches comprises.`,
          },
          {
            q: "Manches longues avec bustier, col bateau, grande taille ou petite : quelles robes ?",
            r: "Un bustier à manches n'existe pas : les manches tiennent au corsage, comme chez Montana, Pendant ou Seraphina, et Chastity monte jusqu'au col. Le col bateau à manches longues, épaules dénudées, c'est Pendant ; Enid, Bondi et Zina en portent un aussi. Le col carré à manches, lui, ne fait pas partie de notre sélection. Grande taille ou petite taille, femme ronde ou mince : chaque robe est faite à vos mesures.",
          },
          {
            q: "Peut-on raccourcir ou élargir les manches ?",
            r: "Oui : des manches mi-longues, courtes ou plus amples se décident aux retouches, qui sont comprises. Simples ou classiques, fines ou pailletées, vos manches longues se portent aussi très bien avec un voile. Les épaulettes, en revanche, non.",
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
      "Le satin est la matière des robes qui ont de la tenue : un tombé lourd, une surface qui prend la lumière sans briller, des lignes nettes. Satin mat, satin de soie ou mikado, il se porte en sirène, en princesse, en trapèze ou en robe fluide. Votre robe de mariée en satin s'essaie au showroom MADAMOON, dans le 10ᵉ, à Paris.",
    morphos: { premieres: ["H", "8", "X"], secondes: ["O", "A", "V"] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée en satin",
        liste: [
          {
            slug: "sheridan",
            texte:
              "Une sirène en satin mat souple, illuminée d'applications de dentelle florale, avec sa cape assortie en tulle plissé : la robe de mariée en satin et dentelle.",
          },
          {
            slug: "venus",
            texte:
              "Une sirène en satin mat à la traîne majestueuse : corsage structuré par de discrètes baleines, dos en tulle illusion et dentelle.",
          },
          {
            slug: "montana",
            texte:
              "Satin mat, manches longues en dentelle, dos illusion : une sirène minimaliste et élégante, à la sophistication intemporelle.",
          },
          {
            slug: "dove",
            texte:
              "Le satin mat en version fluide : un décolleté drapé, les épaules dénudées, un dos ouvert et une ligne de boutons jusqu'à la traîne.",
          },
          {
            slug: "addison",
            texte:
              "Une princesse en satin de soie, aux bretelles tombantes amovibles, avec des motifs floraux en mousseline appliqués à la main — et des poches.",
          },
          {
            slug: "bella",
            texte:
              "Un satin haut de gamme orné de perles, dos nu et manches longues : la robe de mariée en satin chic, à l'esprit couture, sirène ou fourreau.",
          },
          {
            slug: "hera",
            texte:
              "Une trapèze en satin, un décolleté Bardot aux bretelles tombantes, une fente : romantique, moderne et intemporelle.",
          },
          {
            slug: "finell",
            texte:
              "Un bustier cœur en satin, sculpté, sur une jupe trapèze : la robe de mariée en satin simple, où tout repose sur la coupe.",
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
            "Le satin est un tissage, non une fibre : il peut être de soie ou de polyester, brillant ou mat. Le satin mat, le plus présent dans notre sélection, garde la densité du satin sans son éclat. Le satin de soie, celui d'Addison, est plus souple et plus léger. Le satin duchesse, plus lourd, se réserve aux grandes jupes structurées.",
        },
        {
          titre: "Satin, mikado ou crêpe ?",
          texte:
            "Trois matières unies, trois caractères. Le mikado, le plus structuré, fait les princesses : Kensington, Livia, Fern. Le crêpe, le plus souple, épouse le corps sur Bondi, Milan ou Mira. Le satin se tient entre les deux : il a de la tenue, et il tombe.",
        },
        {
          titre: "Une robe de mariée en satin, pour quel mariage ?",
          texte:
            "Une cérémonie habillée, un mariage en ville ou en hiver : le satin a du poids et de l'allure. Il se porte avec des manches longues, comme Montana et Bella, ou sous une cape, comme Sheridan. Pour un mariage d'été à la campagne, vous regarderez plutôt nos fluides en mousseline.",
        },
        {
          titre: "Ce que le satin pardonne, et ce qu'il révèle",
          texte:
            "Une matière unie montre la coupe : rien ne se cache derrière une dentelle. Voilà pourquoi une robe en satin se fait sur mesure. Chacune de nos robes est confectionnée à vos mensurations, retouches comprises, et le dernier essayage valide le tombé.",
        },
      ],
      echo: {
        titre: "Le mikado, le satin qui tient debout",
        texte:
          "Pour une princesse en satin, tournez-vous vers le mikado, ce satin épais et structuré. Kensington, de Casablanca Bridal, en est entièrement confectionnée : épaules dénudées, jupe spectaculaire, traîne de deux mètres. Une princesse, à essayer aux côtés de nos robes en satin.",
        robe: "kensington",
        voir: "Voir Kensington",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Le satin dessine la silhouette telle qu'elle est ; l'essayage, puis la confection à vos mesures, font le reste. Dove, Addison, Hera et Finell conviennent à toutes les morphologies ; Venus, aux morphologies en H, en 8 et en X ; Montana, à celles en A, en H, en 8 et en X ; Charlize, à celles en V, en H, en 8 et en X.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Une robe de mariée en satin est-elle chaude ?",
            r: "Plus qu'une mousseline, moins qu'on ne le croit. Notre satin mat est doublé, et la robe respire par ses ouvertures : un dos nu, un décolleté. Pour un mariage en plein été, les fluides en mousseline ou en charmeuse, comme Adularia, seront plus légères.",
          },
          {
            q: "Le satin se froisse-t-il ?",
            r: "Le satin de soie marque davantage que le satin mat ; le mikado, presque pas. Dans tous les cas, votre robe vous est remise après l'essayage final, prête à être portée ; gardez-la sur un cintre large, dans sa housse, jusqu'au jour du mariage.",
          },
          {
            q: "Satin brillant ou satin mat pour une robe de mariée ?",
            r: "Le satin mat est celui de nos robes : il prend la lumière sans la renvoyer, ce qui le rend plus juste en plein jour et plus facile à photographier. Le satin brillant appartient davantage aux robes de soirée.",
          },
          {
            q: "Où essayer une robe de mariée en satin à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps de comparer un satin mat, un satin de soie et un mikado, sur plusieurs coupes.`,
          },
          {
            q: "Satin pour un mariage civil, col bateau, blanc ou ivoire : quel tissu exactement ?",
            r: "Le satin est un tissu lisse et lumineux. Le satin mat, celui de Dove et de Montana, l'est un peu moins ; le satin de soie d'Addison, davantage ; la charmeuse d'Adularia est un satin léger, idéal pour un mariage civil. Pour un col bateau en satin, regardez Zina, en georgette stretch et satin mat ; Hera, elle, se porte épaules dénudées.",
          },
          {
            q: "Robe en satin blanche, ivoire, champagne ou verte : quelles couleurs, et quel prix ?",
            r: "Nos robes sont blanches ou ivoire. Pour toute autre nuance — champagne, vert —, posez-nous la question au showroom, où les coloris de chaque modèle se voient à la lumière du jour. Le prix dépend du tissu, à partir de 1 500 € : un satin de soie n'est jamais « pas cher », mais votre robe est faite à vos mesures, dans toutes les tailles.",
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
      "Une robe de mariée bustier tient sans bretelles : tout repose sur le corsage, baleiné ou structuré, qui dessine le buste et marque la taille. Décolleté cœur, droit ou en V, sur une sirène, une princesse ou une trapèze — parfois avec de fines bretelles amovibles, pour changer d'allure au fil de la journée. Toutes s'essaient au showroom MADAMOON, dans le 10ᵉ, à Paris.",
    morphos: { premieres: ["V", "H", "8", "X"], secondes: ["O", "A"] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée bustier",
        liste: [
          {
            slug: "sheridan",
            texte:
              "Une sirène sans bretelles au décolleté cœur pointu, en satin mat et dentelle florale, avec sa cape assortie pour la cérémonie.",
          },
          {
            slug: "finell",
            texte:
              "Un bustier cœur en satin, sculpté, sur une jupe trapèze : « un décolleté inoubliable ».",
          },
          {
            slug: "fortune",
            texte:
              "Notre robe de mariée bustier trapèze, en crêpe stretch et organza satin : élégante, intemporelle.",
          },
          {
            slug: "charlotte",
            texte:
              "Une robe bustier au décolleté en cœur, corset en taille basque et dentelle Caterina. Le rêve de la mariée romantique, en princesse ou en trapèze.",
          },
          {
            slug: "guinevere",
            texte:
              "Une princesse bustier en jacquard floral : un corset au décolleté cœur plongeant et pointu, une taille basque, une longue traîne — et des poches.",
          },
          {
            slug: "hayes",
            texte:
              "Un bustier à l'encolure cœur revisitée, aux lignes épurées, en satin mat et dentelle, sur une jupe princesse ou trapèze.",
          },
          {
            slug: "oksana",
            texte:
              "Une sirène en dentelle de Chantilly, corset basque en pointe et décolleté cœur pointu. Ses bretelles perlées sont amovibles : elle se porte aussi en bustier.",
          },
          {
            slug: "sienna",
            texte:
              "Un bustier au décolleté en cœur subtilement revisité et une jupe ample en dentelle, en princesse ou en trapèze.",
          },
          {
            slug: "meredith",
            texte:
              "Décolleté en cœur et dentelle en relief : une sirène féminine et romantique, qui sublime le buste.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Bustier, corset, décolleté cœur : les mots",
          texte:
            "Le bustier, c'est la robe sans bretelles. Le corset, le corsage structuré qui la tient : baleiné, lacé, ou à taille basque en pointe, comme sur Oksana et Guinevere. Le décolleté cœur dessine deux arrondis sur le buste ; le décolleté droit, celui d'Enid ou de Nirali, coupe net.",
        },
        {
          titre: "Comment tient une robe de mariée bustier ?",
          texte:
            "Par le corsage, jamais par les épaules : des baleines, une doublure ajustée, parfois un laçage dans le dos. C'est pourquoi la confection à vos mesures compte plus encore sur un bustier que sur une robe à manches — et pourquoi, au dernier essayage, nous vous demandons de lever les bras, et de danser.",
        },
        {
          titre: "Bretelles amovibles : deux robes en une",
          texte:
            "Plusieurs de nos robes se portent avec ou sans bretelles : Oksana, Addison et Tessa ont des bretelles amovibles. De fines bretelles pour la cérémonie, un bustier pour la soirée — sans changer de robe.",
        },
        {
          titre: "Col carré, col bateau, épaules dénudées",
          texte:
            "Le bustier ne vous tente pas ? Regardez nos autres encolures : le col carré de Dolores, de Clover et de River ; les épaules dénudées, ou décolleté Bardot, de Hera, Dove, Kensington et Trinity ; le col montant de Chastity. Quant au col bateau, qui court d'une épaule à l'autre, c'est celui d'Enid, de Bondi, de Pendant et de Zina.",
        },
      ],
      echo: {
        titre: "Le col carré, l'autre géométrie",
        texte:
          "Pour un décolleté net sans bustier, Dolores — tulle, dentelle et perles — porte une encolure carrée qui flatte le buste, et un dos transparent en dentelle, orné de boutons. Trapèze ou princesse, elle s'essaie volontiers aux côtés de nos robes bustier.",
        robe: "dolores",
        voir: "Voir Dolores",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Le bustier met le buste et les épaules en lumière : il va d'abord aux morphologies en V, en H, en 8 et en X, et s'essaie pour celles en O et en A avec une jupe trapèze ou princesse, qui équilibre. Finell, Fortune, Charlotte et Sienna conviennent à toutes les morphologies ; Meredith, à celles en V, en H, en 8 et en X. Pour une forte poitrine, nous regardons ensemble le maintien du corsage à l'essayage — et des bretelles amovibles rassurent.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Une robe de mariée bustier tient-elle toute la journée ?",
            r: "Oui, dès lors qu'elle est faite à vos mesures : c'est le corsage qui la tient. Chaque robe est confectionnée selon vos mensurations, puis ajustée aux retouches, et l'essayage final vérifie l'aisance — lever les bras, s'asseoir, danser.",
          },
          {
            q: "Quelle lingerie sous une robe de mariée bustier ?",
            r: "Un corsage structuré se porte souvent sans soutien-gorge, ou avec un bustier sans bretelles, couleur chair et sans coutures. Apportez-le dès le deuxième essayage : la robe s'ajustera avec.",
          },
          {
            q: "Une robe bustier a-t-elle toujours un corset ?",
            r: "Un corsage qui tient, toujours — baleiné, doublé, parfois lacé. On parle de corset quand il est structuré au point de se voir, comme sur Guinevere ou Oksana. Les robes dont le corset fait tout le style — lacé, transparent, perlé, avec ou sans bretelles — ont leur propre page.",
          },
          {
            q: "Quelle robe bustier pour un mariage, et quel décolleté ?",
            r: "Pour un mariage, la robe bustier se choisit par son décolleté : en cœur chez Sheridan et Charlotte, en pointe chez Guinevere, carré chez Dolores. Le col bateau, c'est celui d'Enid, de Bondi, de Pendant ou de Zina ; le décolleté américain, lui, ne fait pas partie de notre sélection. Blanche ou ivoire ? Les coloris de chaque modèle se découvrent au showroom.",
          },
          {
            q: "Où essayer une robe de mariée bustier à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps de comparer un décolleté cœur, un décolleté droit et un col carré.`,
          },
          {
            q: "Bustier pour un mariage civil, en cœur, rond ou asymétrique ?",
            r: "Pour un mariage civil, un bustier simple : Enid, à porter en bustier ou en col bardot. Ou une robe courte à larges bretelles, comme River. Le décolleté en cœur est le plus fréquent — Sheridan, Charlotte ; le décolleté rond, c'est Calla. Le bénitier et l'asymétrique, eux, ne font pas partie de notre sélection.",
          },
          {
            q: "Bustier à strass, en dentelle, drapé ou brodé : lequel choisir ?",
            r: "Strass et paillettes : Carrie. Haut en dentelle : Fancy. Bustier drapé : Milan, drapée au buste. Brodé : Maribel. Brillant ou fleuri, porté avec un voile, blanc ou ivoire : tout cela s'essaie au showroom.",
          },
          {
            q: "Une robe bustier convient-elle à toutes les silhouettes ?",
            r: "Grande taille ou petite, femme ronde ou mince : un bustier tient par sa coupe, et la vôtre est faite à vos mesures.",
          },
          {
            q: "Existe-t-il un bustier à col montant, mao ou cache-cœur ?",
            r: "Un bustier, par définition, n'a pas de col. Encolure américaine, col mao, col roulé, col officier, cache-cœur croisé : aucun ne figure dans notre sélection.",
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

  /* ————————————————————————————————————————————— corset —————
   * Vague H (3 nov. 2026). Mot-clé transmis par la maison, parmi les
   * tendances 2027 (Regencycore). Une robe n'est ici que si sa fiche dit
   * « corset » ; le bustier reste la robe sans bretelles, et sa page. */
  {
    famille: "details",
    slug: "corset",
    titre: "Robe de mariée corset à Paris",
    description:
      "Robe de mariée corset à Paris : corset lacé, transparent ou perlé, taille basque en pointe. Guinevere, Oksana, Zina, Rowan… au showroom MADAMOON, Paris 10e.",
    note: "Le corsage qui tient, et qui se voit",
    chapo:
      "Tout commence par le corsage. Structuré, parfois baleiné ou lacé, le corset marque la taille et dessine le buste, avec ou sans bretelles. Taille basque en pointe, laçage dans le dos, transparence, perles posées à la main : votre robe de mariée corset se porte en sirène, en princesse ou en trapèze, et s'essaie au showroom MADAMOON, dans le 10ᵉ, à Paris.",
    morphos: { premieres: ["V", "H", "8", "X"], secondes: ["O", "A"] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée corset",
        liste: [
          {
            slug: "guinevere",
            texte:
              "Une princesse bustier en jacquard floral : un corset au décolleté cœur plongeant et pointu, sublimé par une taille basque, sur une jupe volumineuse à longue traîne.",
          },
          {
            slug: "oksana",
            texte:
              "Une sirène en dentelle de Chantilly, au corset basque en pointe : la taille basque, structurée, sculpte le corps avant de laisser place à la traîne.",
          },
          {
            slug: "aleida",
            texte:
              "De fines bretelles spaghetti, un décolleté plongeant prolongé par un corset à taille basque en pointe : le maintien, et la sensualité.",
          },
          {
            slug: "zina",
            texte:
              "Une sirène en georgette stretch et satin mat, des fleurs 3D faites main, une fente — et un corset à laçage.",
          },
          {
            slug: "charlize",
            texte:
              "Un corset transparent — ou doublé, si la transparence n'est pas pour vous — et une fente ouverte sur une jupe en dentelle de Chantilly.",
          },
          {
            slug: "rowan",
            texte:
              "Un fourreau en charmeuse, au corset transparent orné de perles, sur la dentelle Mori. Le corset existe aussi doublé, pour une version plus couvrante.",
          },
          {
            slug: "ember",
            texte:
              "Une princesse en Dupioni, dont le corset structure la silhouette : « allure élégante et contemporaine ».",
          },
          {
            slug: "riviera",
            texte:
              "Une sirène en charmeuse, corset structuré et manches amovibles, le corsage souligné de perles regroupées.",
          },
          {
            slug: "carrie",
            texte:
              "Une trapèze pailletée, de fines bretelles et un corset perlé à la main : « un rêve de conte de fées ».",
          },
          {
            slug: "lovia",
            texte:
              "Trapèze ou volume princesse, en dentelle : un corset à encolure en V qui marque joliment la taille, de fines bretelles perlées, une fente.",
          },
          {
            slug: "helene",
            texte:
              "Un corset lumineux, en dentelle ornée de petites perles et de fleurs en relief, sur une jupe fluide en mousseline.",
          },
          {
            slug: "calla",
            texte:
              "Un corsage structuré façon corset, un décolleté arrondi, un tulle souple et la dentelle Highclare : romantique, et confortable.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Corset, bustier, corsage : les mots",
          texte:
            "Le corsage est le haut de la robe. Le corset, un corsage structuré — baleiné, doublé, parfois lacé — qui tient et qui dessine. Le bustier, la robe sans bretelles. Une robe corset peut donc avoir des bretelles, comme Lovia ou Carrie, ou s'en passer, comme Guinevere ou Charlotte. Quant à la taille basque en pointe, qui descend sous la taille, c'est celle de Guinevere, d'Oksana, d'Aleida et de Charlotte.",
        },
        {
          titre: "Lacé, transparent, perlé, apparent",
          texte:
            "Le corset à laçage : Zina, lacée dans le dos. Le corset transparent : Charlize et Rowan, l'une et l'autre proposées aussi doublées. Le corset perlé : Carrie, Rowan, Hélène et Agnessa, perlées à la main. Ariel porte son corset apparent dans le dos, sous des pétales de mousseline ; Dolores le boutonne jusqu'en bas, sous un dos transparent en dentelle.",
        },
        {
          titre: "Le corset marque la taille",
          texte:
            "De Fancy — « marque et affine la taille » — à Finell, Angel et Lovia, le corset dessine une courbe entre la taille et les hanches. Il ne serre pas : il tient. Et comme toutes les robes de la boutique, il est confectionné à vos mesures, retouches comprises, à partir de 1 500 €.",
        },
        {
          titre: "Du Regencycore au quotidien",
          texte:
            "Le corset est le premier code de la tendance Bridgerton, ou Regencycore, annoncée pour 2027. Notre guide vous dit ce que nos collections en retiennent — corset, col carré, manches ballon, perles — et ce qu'elles laissent de côté. Sur une robe de mariée corset moderne, il se porte aussi bien sur une sirène en charmeuse, comme Riviera ou Rowan, que sur une princesse comme Ember.",
        },
      ],
      echo: {
        titre: "Le corset structuré d'une deux-en-un",
        texte:
          "Tessa, de Casablanca Bridal, est une sirène au charme vintage-chic : un corset structuré, des bretelles amovibles pour un autre look, une surjupe détachable. Une deux-en-un, à essayer aux côtés de nos robes corset.",
        robe: "tessa",
        voir: "Voir Tessa",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Le corset dessine la taille : il va d'abord aux morphologies en V, en H, en 8 et en X, et s'essaie pour celles en O et en A avec une jupe trapèze ou princesse. Charlotte, Finell, Carrie, Lovia, Ember, Calla, Hélène et Agnessa conviennent à toutes les morphologies ; Charlize, Riviera et Rowan, à celles en V, en H, en 8 et en X. Le maintien du corsage se vérifie à l'essayage, bras levés.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Qu'est-ce qu'une robe de mariée corset ?",
            r: "Une robe dont le corsage est structuré — baleiné, doublé, parfois lacé — au point de se voir : il tient la robe et dessine la taille. Chez MADAMOON, c'est le corset basque en pointe d'Oksana et de Guinevere, le corset à laçage de Zina, le corset transparent de Charlize et de Rowan, le corset perlé de Carrie et d'Hélène.",
          },
          {
            q: "Robe de mariée corset ou bustier : quelle différence ?",
            r: "Le bustier décrit la robe : sans bretelles. Le corset décrit le corsage : structuré, parfois lacé. Une robe corset peut avoir des bretelles, comme Lovia ou Carrie ; une robe bustier a toujours un corsage qui tient, qu'on l'appelle corset ou non. Guinevere et Charlotte sont les deux à la fois.",
          },
          {
            q: "Un corset de robe de mariée serre-t-il ?",
            r: "Il tient, il ne serre pas. Il est fait à vos mesures, puis ajusté aux retouches, qui sont comprises, et l'essayage final vérifie l'aisance : lever les bras, s'asseoir, danser. Un corset lacé comme celui de Zina se règle le jour même.",
          },
          {
            q: "Corset en dentelle, en satin, en charmeuse ou transparent ?",
            r: "En dentelle de Chantilly : Oksana. En dentelle Caterina : Charlotte. En charmeuse : Riviera et Rowan. En Dupioni : Ember. En satin mat : Sheridan, dont la dentelle florale illumine le corset. Transparents : Charlize et Rowan, proposés aussi doublés, pour celles qui n'aiment pas la transparence.",
          },
          {
            q: "Où essayer une robe de mariée corset à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps de comparer un corset lacé, un corset transparent et une taille basque en pointe, robe sur vous.`,
          },
          {
            q: "Corset de mariage à lacer, corset apparent, bustier corset : ce que l'on cherche",
            r: "Le corset lacé dans le dos, c'est Zina. Le corset apparent, Ariel, dans le dos, sous ses pétales. Le bustier corset, Guinevere et Charlotte, sans bretelles. Un corset seul — un haut, un top, une pièce de lingerie à porter sous ou avec une jupe — ne fait pas partie de notre sélection : la boutique propose des robes entières, que l'on essaie au showroom.",
          },
        ],
        toutes: "Tous les guides",
      },
      fin: {
        titre: "Essayer une robe de mariée corset en showroom",
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
      "C'est votre dos que les invités regardent pendant toute la cérémonie. Nu, ouvert en V, voilé d'un tulle illusion, en dentelle, ou fermé d'une ligne de boutons jusqu'à la traîne : la robe de mariée dos nu se porte en sirène, en fluide, en trapèze ou en princesse, et s'essaie au showroom MADAMOON, dans le 10ᵉ, à Paris.",
    morphos: { premieres: ["V", "H", "8", "X"], secondes: ["O", "A"] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée dos nu",
        liste: [
          {
            slug: "bella",
            texte:
              "Dos nu, manches longues, satin et perles : la robe de mariée dos nu chic, à l'esprit couture, sirène ou fourreau.",
          },
          {
            slug: "seraphina",
            texte:
              "Dentelle brodée, dos nu et manches longues sur une silhouette princesse : une élégance intemporelle, relevée d'une touche contemporaine.",
          },
          {
            slug: "agnessa",
            texte:
              "Un décolleté et un dos spectaculaires, en V, un corset perlé à la main, une jupe de tulle fluide. Naturellement glamour.",
          },
          {
            slug: "murielle",
            texte:
              "Dentelle florale et mousseline, dos en V, manches illusion et fente haute : la robe de mariée dos nu bohème.",
          },
          {
            slug: "venus",
            texte:
              "Un dos en tulle illusion et dentelle, d'une transparence subtile, sur une sirène en satin mat à la traîne majestueuse.",
          },
          {
            slug: "uma",
            texte:
              "Une dentelle fine et un dos transparent, fermé par une ligne de jolis boutons couleur ivoire : le dos illusion selon Watters Designs.",
          },
          {
            slug: "montana",
            texte:
              "Dos illusion et manches longues en dentelle sur un satin mat : le dos nu, couvert, pour un mariage en hiver.",
          },
          {
            slug: "dove",
            texte:
              "Un dos ouvert, une ligne infinie de boutons jusqu'à la traîne, un satin mat fluide. Une allure poétique et pure.",
          },
          {
            slug: "emerald",
            texte:
              "Un dos en V qui prolonge le décolleté, un corsage perlé, une jupe de tulle ou de satin : la sensualité subtile d'une trapèze.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Dos nu, dos illusion, dos en V",
          texte:
            "Le dos nu laisse la peau libre : Bella, Seraphina. Le dos illusion la voile d'un tulle couleur chair, sur lequel la dentelle semble posée : Uma, Montana, Venus. Le dos en V descend en pointe, plus ou moins bas : Agnessa, Murielle, Emerald, Angel.",
        },
        {
          titre: "Une robe dos nu peut-elle avoir des manches ?",
          texte:
            "Oui, et c'est l'un de nos plus beaux contrastes : Bella, Seraphina et Montana couvrent les bras de manches longues et dévoilent le dos. La robe de mariée dos nu rêvée pour un mariage en hiver.",
        },
        {
          titre: "Sexy, mais mariée",
          texte:
            "Une robe de mariée sexy ne tient pas à la quantité de peau, mais à l'endroit : un dos, une fente, une transparence. Le dos nu dit tout en restant couverte de face — voilà pourquoi il est aussi juste à l'église qu'à la fête.",
        },
        {
          titre: "La ligne de boutons",
          texte:
            "Sur Uma, Dove, Enid et Bondi, le dos se ferme d'une rangée de boutons qui descend jusqu'à la traîne. Ce n'est pas un dos nu, mais c'est le même regard : un dos dessiné, que l'on suit des yeux quand la mariée avance.",
        },
      ],
      echo: {
        titre: "Le dos boutonné",
        texte:
          "Pour un dos habillé, sans transparence, Enid, de Casablanca Bridal, en néoprène, porte « une infinité de boutons » du corsage jusqu'à la traîne. Sirène minimaliste, elle s'essaie volontiers aux côtés de nos robes dos nu.",
        robe: "enid",
        voir: "Voir Enid",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Le dos nu allonge le dos et dégage la nuque : il va d'abord aux morphologies en V, en H, en 8 et en X, et s'essaie pour celles en O et en A — en particulier un dos en V sur une jupe fluide ou trapèze. Seraphina, Agnessa, Murielle, Dove et Emerald conviennent à toutes les morphologies ; Uma, à celles en V, en H, en 8 et en X ; Venus, à celles en H, en 8 et en X ; Montana, à celles en A, en H, en 8 et en X.",
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
            r: "Le plus souvent, oui, avec une cape, une étole ou une veste pour la cérémonie, que l'on retire pour la fête. Sheridan a sa cape assortie, Solana sa veste asymétrique amovible ; pour une autre robe, parlons-en à l'essayage.",
          },
          {
            q: "Dos nu ou dos illusion : que choisir ?",
            r: "Le dos nu, si vous aimez la peau libre et une robe qui tient par son corsage. Le dos illusion, si vous voulez l'effet d'un dos découvert avec plus de maintien, et une dentelle comme posée sur le tulle. Bella et Seraphina pour le premier ; Uma et Montana pour le second.",
          },
          {
            q: "Dos nu et décolleté plongeant vont-ils ensemble ?",
            r: "Souvent, pas toujours. Murielle associe décolleté plongeant et dos ouvert ; Bella, Venus et Montana gardent le devant plus couvert et dévoilent le dos — nu, en dentelle ou en illusion. Pour une robe de mariée dos nu sans décolleté plongeant, commencez par elles.",
          },
          {
            q: "Où essayer une robe de mariée dos nu à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure, avec un miroir pour vous voir de dos.`,
          },
          {
            q: "Robe de mariée fendue, transparente, dos nu : et le soutien-gorge ?",
            r: "La fente et le dos nu vont souvent de pair : Murielle a l'une et l'autre ; Bondi et Milan, fendues, gardent le dos boutonné ou couvert. La transparence, c'est celle du tulle illusion de Venus, d'Uma et de Montana. Quant au soutien-gorge, la question se règle à l'essayage : nos corsages sont souvent assez structurés pour s'en passer, et les retouches, comprises, ajoutent du maintien là où il le faut.",
          },
          {
            q: "Collier de dos, coiffure, gaine : comment porter un dos nu ?",
            r: "Un collier dans le dos, une coiffure relevée, un body ou une gaine invisible : ce sont des accessoires et des réglages d'essayage, que nous voyons ensemble. Pour une robe dos nu cintrée, pensez à Bella.",
          },
          {
            q: "Existe-t-il une robe dos nu de couleur, en soie, à col montant ?",
            r: "Nos robes dos nu restent blanches ou ivoire : ni rose, ni orange. Col montant, col carré ou bustier, en soie ou en satin : c'est le corsage qui décide, et cela se voit robe par robe, au showroom.",
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
      "Chez MADAMOON, il n'y a pas de rayon grande taille — parce qu'il n'y a pas de rayon du tout. Chaque robe est confectionnée à l'atelier selon vos mensurations, prises au showroom après l'essayage, retouches comprises. Nous avons réuni ici celles qui vont à toutes les morphologies et dont le corsage structuré assure le maintien ; les tailles proposées par chaque maison se confirment au showroom, modèle par modèle, dans le 10ᵉ, à Paris.",
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
              "Une trapèze en dentelle, manches longues et épaules dénudées, indiquée pour toutes les morphologies.",
          },
          {
            slug: "charlotte",
            texte:
              "Une robe bustier au corset en taille basque et dentelle Caterina, princesse ou trapèze : le corset marque la taille, la jupe fait le reste.",
          },
          {
            slug: "calla",
            texte:
              "Un corsage structuré façon corset, un tulle très souple, la dentelle Highclare : « confort, féminité et raffinement ».",
          },
          {
            slug: "clover-perles",
            texte:
              "Un corsage structuré, pour un bon maintien, un décolleté carré et une jupe ample au volume généreux — sans rien céder au confort.",
          },
          {
            slug: "fortune",
            texte:
              "Un bustier trapèze en crêpe stretch et organza satin : une matière qui vous suit, une coupe qui tient.",
          },
          {
            slug: "ember",
            texte:
              "Un corset structuré et une silhouette couture, en Dupioni : la princesse qui tient par son corsage.",
          },
          {
            slug: "dove",
            texte:
              "Un satin mat au tombé fluide, un décolleté drapé, les épaules dénudées : « l'élégance intemporelle et le confort absolu ».",
          },
          {
            slug: "maribel",
            texte:
              "Une fluide minimaliste en mousseline stretch, corsage brodé et perlé à la main, décolleté en V et fente.",
          },
          {
            slug: "aster",
            texte:
              "Une trapèze en dentelle de Chantilly et satin, taille naturelle et corsage drapé, avec des manches amovibles.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Sur mesure plutôt que grande taille",
          texte:
            "En magasin, une robe de mariée grande taille existe en tailles standard, puis se retouche. Chez MADAMOON, votre robe est confectionnée à vos mensurations à l'atelier — en semi-mesure pour Watters Designs — puis ajustée par nos couturières, retouches comprises. La taille n'est pas un rayon : c'est une mesure, la vôtre.",
        },
        {
          titre: "Ce qui tient : le corsage",
          texte:
            "Un corsage structuré — corset, baleines, doublure ajustée — porte la robe et dessine la taille. C'est lui que nous regardons d'abord à l'essayage : Charlotte, Calla, Clover, Ember et Fortune en ont un. Des bretelles, amovibles ou non, ajoutent encore du maintien.",
        },
        {
          titre: "Forte poitrine : ce qui aide",
          texte:
            "Un décolleté en V ou en cœur plutôt qu'un bustier droit, un corsage qui soutient, des bretelles plus larges ou des manches : Maribel, Pendant et Aster vont dans ce sens. Mais la seule vraie règle, c'est l'essayage — rien ne remplace une heure de showroom.",
        },
        {
          titre: "Grande taille et petit budget",
          texte:
            "Une robe de mariée grande taille pas chère se trouve en prêt-à-porter. Chez MADAMOON, les prix commencent à partir de 1 500 € pour une confection sur mesure, retouches comprises : la robe est faite pour vous, et vous ne payez aucune retouche en plus.",
        },
      ],
      echo: {
        titre: "Princesse ou trapèze, selon le jour",
        texte:
          "Sienna, de Casablanca Bridal, se porte princesse ou trapèze : un bustier au décolleté en cœur subtilement revisité, une jupe ample en dentelle au volume généreux. Indiquée pour toutes les morphologies, elle s'essaie volontiers aux côtés des robes réunies ici.",
        robe: "sienna",
        voir: "Voir Sienna",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Toutes les robes de cette page sont indiquées pour toutes les morphologies — en O, en A, en V, en H, en 8 et en X. Mais la grande taille n'est pas une morphologie : une silhouette en O et une silhouette en 8 ne cherchent pas la même coupe. Partez de la vôtre, puis venez essayer.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Jusqu'à quelle taille peut-on confectionner une robe de mariée chez MADAMOON ?",
            r: "Votre robe est confectionnée à vos mensurations, prises au showroom. Les tailles proposées varient d'une maison à l'autre et se confirment sur place, modèle par modèle : prenez rendez-vous, et dites-nous les robes qui vous plaisent.",
          },
          {
            q: "Y a-t-il des robes grande taille à essayer au showroom ?",
            r: "Les robes d'essayage sont celles du showroom, en taille d'échantillon : l'essayage sert à choisir la coupe et la matière, puis votre robe est confectionnée à vos mesures. Une robe vous attire ? Demandez-nous, avant le rendez-vous, ce qui s'essaie dans votre taille.",
          },
          {
            q: "Quelle coupe de robe de mariée pour une grande taille ?",
            r: "Il n'y a pas une coupe : il y a votre silhouette. Les trapèzes et les princesses équilibrent une morphologie en A ; les fluides allongent une morphologie en O ; une sirène légère dessine des courbes sur une morphologie en H. Le corsage structuré, lui, aide dans tous les cas.",
          },
          {
            q: "Robe de mariée ronde ou grande taille : quelle différence à l'essayage ?",
            r: "Aucune. Une mariée ronde, comme toute mariée, essaie la robe de son choix et la fait confectionner à ses mesures, pour un mariage civil ou religieux. Ni rayon « pas cher », ni surcoût : le prix dépend de la robe, à partir de 1 500 €, retouches comprises.",
          },
          {
            q: "Où essayer une robe de mariée grande taille à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure, et vous pouvez venir accompagnée.`,
          },
          {
            q: "Femme ronde, petite, curvy, taille 46 ou XXL : quand prendre rendez-vous, et quelle robe ?",
            r: "Quand ? Huit à neuf mois avant le mariage, comme toute mariée, été comme hiver. Quelle robe ? Celle que vous aimez, puisque tout est confectionné aux mesures de la femme qui la porte. Petite ou grande, ronde ou curvy, taille 46, XL ou XXL : ces mots ne servent qu'à chercher sur un écran. Au showroom, il n'y a plus que vos mesures, et votre style.",
          },
          {
            q: "Où trouver une tenue de mariage pour femme forte près de chez moi ?",
            r: "Si vous cherchez « à proximité » ou « autour de moi » en Île-de-France, notre showroom se trouve à Paris, en France, dans le 10ᵉ arrondissement. Le soutien-gorge se règle à l'essayage, l'achat se décide après, à 50 ans comme à 25. Nos robes sont blanches ou ivoire, jamais colorées.",
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
      "Dentelle florale, tulle aérien, corsage brodé de fleurs ou de perles, décolleté en cœur : une robe de mariée romantique tient à ses matières bien plus qu'à sa coupe. Signées Casablanca Bridal, Watters Designs, Olya Mak et Monica Loretti, les nôtres s'essaient côte à côte — princesse, trapèze ou sirène — au showroom du 10ᵉ, à Paris.",
    morphos: { premieres: ["O", "A", "V", "H", "8", "X"], secondes: [] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée romantiques",
        liste: [
          {
            slug: "santana",
            texte:
              "Une princesse « inspirée des contes de fées » : corsage transparent en dentelle florale, jupe volumineuse en tulle et organza à motifs floraux, ourlet festonné. Romantique, aérienne, féerique.",
          },
          {
            slug: "seraphina",
            texte:
              "Une princesse en dentelle richement brodée, manches longues et dos nu. Chaque application florale est posée à la main : c'est elle qui donne à la robe son âme romantique.",
          },
          {
            slug: "charlotte",
            texte:
              "Un bustier au décolleté en cœur, un corset en taille basque, la dentelle Caterina : « le rêve de la mariée romantique et élégante ». Elle existe aussi en version plus couvrante.",
          },
          {
            slug: "calla",
            texte:
              "Un tulle très souple, la dentelle Highclare, un décolleté arrondi, un corsage façon corset : une allure douce et aérienne, légère et naturelle.",
          },
          {
            slug: "carrie",
            texte:
              "« Un rêve de conte de fées » : un corsage brodé de perles en feuilles et en lianes, de fines doubles bretelles, plusieurs couches de tulle pailleté. Le romantique qui scintille.",
          },
          {
            slug: "summer",
            texte:
              "Une sirène évasée en dentelle d'Alençon, décolleté en V et longue traîne : la dentelle française, pour une allure « à la fois romantique et glamour ».",
          },
          {
            slug: "helene",
            texte:
              "Un corset de dentelle ornée de petites perles et de fleurs en relief, une jupe fluide en mousseline : le romantique qui danse, à la lisière du bohème.",
          },
          {
            slug: "alicia",
            texte:
              "Dentelle et tulle, épaules dégagées et fente, en trapèze ou en volume princesse : « un look féerique et mémorable ».",
          },
          {
            slug: "hera",
            texte:
              "Une trapèze en satin au décolleté Bardot, et une fente sur le devant qui répond au « volume romantique de la jupe » : romantique, moderne, intemporelle.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Ce qui fait le romantique",
          texte:
            "La dentelle florale, d'abord : brodée à la main chez Seraphina, Caterina chez Charlotte, d'Alençon chez Summer, Highclare chez Calla. Puis le tulle, qui donne du volume sans peser. Les fleurs, en relief sur le corset d'Hélène, en perles sur celui de Carrie. Et un décolleté en cœur, que Charlotte et Santana portent chacune à sa façon.",
        },
        {
          titre: "Romantique ou féerique ?",
          texte:
            "Le féerique, c'est le romantique en plus grand : du volume, du tulle en couches, un peu d'éclat. Santana, Carrie et Alicia se décrivent ainsi — contes de fées, tulle pailleté, « look féerique ». Mais le romantique sait aussi rester près du corps : Summer et Seraphina le prouvent, chacune dans sa coupe.",
        },
        {
          titre: "Princesse, trapèze ou sirène",
          texte:
            "Le romantique traverse toutes les coupes. En princesse, Santana et Seraphina déploient leur jupe ; en trapèze, Charlotte, Calla, Carrie et Hera gardent une ligne plus simple ; en sirène, Summer dessine le corps. Au showroom, essayez-les dans cet ordre, ou dans l'autre : la coupe se choisit sur vous, le style est déjà là.",
        },
        {
          titre: "Romantique, pas chargé",
          texte:
            "Une robe romantique réussie tient à un détail dominant, rarement à trois : la dentelle, ou les fleurs, ou l'éclat. C'est ce qui distingue Calla, toute en douceur, de Carrie, toute en lumière. Votre robe est ensuite confectionnée à vos mesures, retouches comprises — et un corsage qui tombe juste fait plus pour le romantique qu'un volant de plus.",
        },
      ],
      echo: {
        titre: "Le romantisme couvert",
        texte:
          "Pour un romantique plus traditionnel, Chastity, d'Olya Mak, recouvre entièrement le corsage et les manches longues d'une dentelle fine, avec un col montant et une longue traîne : « élégance, romantisme et charme traditionnel ». Une deux-en-un, à essayer aux côtés de nos robes romantiques.",
        robe: "chastity",
        voir: "Voir Chastity",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Seraphina, Charlotte, Calla, Carrie, Hélène, Alicia et Hera conviennent à toutes les morphologies ; Summer, aux morphologies en V, en 8 et en X. Santana, elle, se découvre à l'essayage. Et parce que chaque robe est réalisée à vos mesures, la robe romantique grande taille n'est pas un rayon à part.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Quelle coupe pour une robe de mariée romantique ?",
            r: "Toutes, pourvu que les matières du romantique soient là. La princesse en est l'image la plus attendue — Santana, Seraphina ; la trapèze l'allège — Charlotte, Calla, Carrie ; la sirène la rapproche du corps — Summer. Le style est dans la dentelle et le tulle, pas dans la coupe.",
          },
          {
            q: "Qu'est-ce qu'une robe de mariée féerique ?",
            r: "Une robe romantique qui prend de l'ampleur et de l'éclat : plusieurs couches de tulle, un corsage perlé ou brodé, parfois quelques paillettes. Santana est « inspirée des contes de fées », Carrie est « un rêve de conte de fées », Alicia promet « un look féerique » : ce sont les mots mêmes de leurs fiches.",
          },
          {
            q: "Romantique ou bohème, quelle différence ?",
            r: "Le bohème cherche la légèreté et le naturel : mousseline, manches transparentes, pas de longue traîne. Le romantique, lui, accueille le volume, la traîne, le corsage travaillé. Hélène se tient à la lisière : son corset perlé à fleurs est romantique, sa jupe en mousseline est bohème. Les deux pages se lisent ensemble.",
          },
          {
            q: "Où essayer une robe de mariée romantique à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps de comparer une princesse en tulle, une trapèze en dentelle et une sirène, côte à côte.`,
          },
          {
            q: "Robe de mariée romantique à paillettes, fleurie, pour un mariage civil ?",
            r: "À paillettes ou à strass : Carrie, en tulle pailleté ; Fancy, en dentelle scintillante ; Aleida, en tulle scintillant. Fleurie : Santana et ses motifs floraux, Zina et ses fleurs 3D, Clover et ses fleurs de couleur — la seule robe colorée de notre sélection, toutes les autres étant blanches ou ivoire. Pour un mariage civil romantique, pensez à Clover, courte et fleurie, ou à Calla, douce et légère ; pour un esprit féerie ou vintage, à Carrie ou à Bella.",
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
      "Une cérémonie courte, souvent en ville, parfois quelques semaines avant la grande fête : une robe de mariage civil se veut facile à porter, et belle sur les marches de la mairie. Courte, comme Elin, River, Clover et Gabriel ; ou longue et simple, comme Milan, Bondi, Adularia et Maribel. Toutes s'essaient au showroom du 10ᵉ, à Paris.",
    morphos: { premieres: ["O", "A", "V", "H", "8", "X"], secondes: [] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes pour un mariage civil",
        liste: [
          {
            slug: "elin",
            texte:
              "Courte, en crêpe, épurée : « une robe de mariée parfaite pour une cérémonie civile », pensée pour marquer le contraste entre vos différentes cérémonies.",
          },
          {
            slug: "river",
            texte:
              "Une robe courte au décolleté carré et aux larges bretelles, silhouette épurée et sculpturale, finitions à la main. La mairie, version couture.",
          },
          {
            slug: "clover",
            texte:
              "Une robe courte brodée de fleurs de couleur, et une surjupe longue à volonté : courte pour le civil, longue pour la suite.",
          },
          {
            slug: "gabriel",
            texte:
              "Une robe courte délicatement perlée, sous une jupe transparente amovible : deux tenues en une.",
          },
          {
            slug: "milan",
            texte:
              "Une sirène en crêpe léger, drapée au buste, fendue sur le côté : raffinée et minimaliste — longue, mais sans rien qui gêne à la mairie.",
          },
          {
            slug: "bondi",
            texte:
              "Une sirène minimaliste en crêpe, épaules dégagées, fente haute et rangée de boutons dans le dos : la robe simple d'une mairie en ville.",
          },
          {
            slug: "adularia",
            texte:
              "Une fluide en charmeuse, « l'élégance minimaliste avec une allure résolument moderne » : rien à retenir, rien à porter.",
          },
          {
            slug: "maribel",
            texte:
              "Une fluide en mousseline stretch, corsage brodé à la main, fente et traîne légère : simple, sans être nue.",
          },
          {
            slug: "marie",
            texte:
              "Une fluide à la ligne intemporelle, chez Monica Loretti : la robe longue et sereine d'une cérémonie civile qui sera la seule.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Ce qui fait la robe de mariage civil",
          texte:
            "Une cérémonie civile dure peu, se vit debout et se photographie dehors. Votre robe doit donc se porter sans aide, s'asseoir avec vous et descendre l'escalier de la mairie. D'où le crêpe et la charmeuse, les longueurs courtes, les fentes qui libèrent le pas, et pas de longue traîne : Elin, River et Milan en sont l'exemple.",
        },
        {
          titre: "Courte ou longue ?",
          texte:
            "Courte, si le civil précède une autre cérémonie : le contraste fait partie du plaisir, et Elin a été pensée pour cela. Longue, si la mairie est votre seule cérémonie : une robe simple comme Bondi, Adularia ou Marie fait alors toute la journée. Au showroom, vous essayez les deux longueurs le même jour.",
        },
        {
          titre: "Et la combinaison de mariée ?",
          texte:
            "Vous rêviez d'une combinaison ? Mariée en pantalon, l'idée est belle — mais MADAMOON ne propose ni combinaison ni tailleur. Ce que l'on cherche dans une combinaison de mariée, la ligne nette, l'aisance, l'esprit tailleur, se retrouve dans River, décolleté carré et larges bretelles, ou dans Bondi et Milan, en crêpe près du corps. À essayer avant de trancher.",
        },
        {
          titre: "Une robe pour deux cérémonies",
          texte:
            "Les deux-en-un font la mairie et la fête avec une seule robe : Clover et Gabriel se portent courtes, puis gagnent une surjupe ou une jupe transparente ; Tessa change de look en retirant ses bretelles. Chaque robe est confectionnée à vos mesures, retouches comprises — surjupe comprise.",
        },
      ],
      echo: {
        titre: "Une robe, deux looks",
        texte:
          "Tessa, de Casablanca Bridal, est une sirène au corset structuré, avec une surjupe détachable et des bretelles amovibles « pour un autre look ». Longue, ce n'est pas une robe de mairie à proprement parler ; mais si vous voulez une seule robe, du civil à la soirée, c'est la deux-en-un à essayer en premier.",
        robe: "tessa",
        voir: "Voir Tessa",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Elin, River, Clover, Gabriel, Maribel et Marie conviennent à toutes les morphologies ; Milan, aux morphologies en H, en 8 et en X. Bondi et Adularia, elles, se découvrent à l'essayage. Et parce que chaque robe est réalisée à vos mesures, la robe de mariage civil grande taille n'est pas un rayon à part.",
        toutes: "Toutes les morphologies",
      },
      questions: {
        titre: "Les questions",
        liste: [
          {
            q: "Quelle robe pour un mariage civil à Paris ?",
            r: "Robe, mariage civil, Paris : trois mots, une adresse — notre showroom du 10ᵉ. Vous y essayez une robe courte en crêpe comme Elin, pensée pour la cérémonie civile, ou une courte plus habillée comme River. Si la mairie est votre seule cérémonie, une longue simple — Bondi, Milan, Adularia, Marie — vous accompagnera toute la journée.",
          },
          {
            q: "Une robe de mariée courte convient-elle à la mairie ?",
            r: "C'est là qu'elle est le plus à sa place : une cérémonie courte, debout, en ville. Elin, River, Clover et Gabriel sont nos robes courtes ; Clover et Gabriel se rallongent ensuite d'une surjupe ou d'une jupe transparente, pour la suite de la journée.",
          },
          {
            q: "Peut-on porter la même robe au civil et à la fête ?",
            r: "Oui, avec une deux-en-un : Clover, Gabriel et Tessa changent de silhouette en une minute — courte puis longue, avec puis sans bretelles. Sinon, deux robes : une courte pour la mairie, et la robe de la fête. Le contraste est souvent recherché.",
          },
          {
            q: "Où essayer une robe de mariage civil à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps d'essayer une courte, une longue simple et une deux-en-un, et de décider.`,
          },
          {
            q: "Robe de mariage civil en hiver ou en été, blanche, de marque, pas chère ?",
            r: "En hiver, une longue simple à manches, comme Montana, ou une courte portée avec une veste ; en été, Elin ou River. Blanche ou ivoire, selon votre carnation. De marque, oui : Olya Mak pour Elin et River, Casablanca Bridal pour Clover, Watters Designs pour Gabriel — des maisons, pas des enseignes en ligne. Pas chère, au sens d'un site de prêt-à-porter, non : même courte, chaque robe est faite à vos mesures, à partir de 1 500 €, retouches comprises.",
          },
          {
            q: "Où acheter sa robe de mariage civil, et dans quelle longueur ?",
            r: "Au showroom, notre seul magasin, pour une femme qui se marie en octobre comme en juin. Courte ou longue : la mi-longue ne fait pas partie de notre sélection. Pour un style tailleur ou un jacquard, regardez Monica, une trapèze en jacquard floral. Et si vous cherchez un petit prix, sachez qu'ici tout est fait sur mesure.",
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
      "Une robe de mariée courte n'est pas une robe de moins : c'est une robe que l'on voit en entier, jambes comprises, et qui bouge avec vous. Elin, River, Clover et Gabriel sont confectionnées à vos mesures et s'essaient au showroom du 10ᵉ, à Paris — à côté des longues, pour mieux comparer.",
    morphos: { premieres: ["O", "A", "V", "H", "8", "X"], secondes: [] },
    style: {
      voirLaCoupe: "Toutes les robes",
      robes: {
        titre: "Nos robes de mariée courtes",
        liste: [
          {
            slug: "elin",
            texte:
              "Courte, en crêpe, épurée : « une robe de mariée parfaite pour une cérémonie civile ». La robe courte de mariée dans sa plus belle simplicité, chez Olya Mak.",
          },
          {
            slug: "river",
            texte:
              "Une robe courte au décolleté carré et aux larges bretelles, silhouette sculpturale, finitions à la main : la robe de mariée courte chic, « pour celles qui souhaitent sortir des codes traditionnels ».",
          },
          {
            slug: "clover",
            texte:
              "Une robe courte brodée de fleurs de couleur, avec une surjupe longue à volonté : la robe de mariée courte originale, qui devient longue quand vous le décidez.",
          },
          {
            slug: "gabriel",
            texte:
              "Une robe courte délicatement perlée, sous une jupe transparente amovible : courte à la mairie, longue à la fête, chez Watters Designs.",
          },
        ],
      },
      colonnes: [
        {
          titre: "Ce qui fait une robe courte",
          texte:
            "La longueur, d'abord : au genou ou juste au-dessus, pour libérer le pas et montrer les chaussures. La matière, ensuite, qui doit tenir sans traîne pour l'alourdir : le crêpe d'Elin, le tissu sculptural de River. Une robe courte se juge debout et en mouvement : au showroom, vous faites quelques pas avec elle avant de tourner devant le miroir.",
        },
        {
          titre: "Courte chic ou courte originale ?",
          texte:
            "Chic : River, au décolleté carré, « un véritable travail de coupe » sous une simplicité apparente. Originale : Clover, brodée de fleurs de couleur — la seule de nos robes qui ne soit pas tout en blanc ou ivoire —, et Gabriel, perlée sous sa jupe transparente. Elin, en crêpe, reste la plus sobre de toutes.",
        },
        {
          titre: "Pour quelle cérémonie ?",
          texte:
            "Le mariage civil, d'abord : Elin a été pensée pour lui. La réception, ou le deuxième look de la soirée : River est « parfaite pour un deuxième look de mariée, une réception ou une cérémonie moins conventionnelle ». Et le mariage tout entier, si vous voulez une robe dans laquelle on danse.",
        },
        {
          titre: "Courte, puis longue",
          texte:
            "Clover et Gabriel sont des deux-en-un : courtes le matin, longues le soir, grâce à une surjupe ou à une jupe transparente qui s'attache et se retire. Une robe pour deux cérémonies, confectionnée à vos mesures, retouches comprises — la surjupe aussi.",
        },
      ],
      echo: {
        titre: "Si c'est finalement la longue",
        texte:
          "Beaucoup de mariées venues pour une robe courte repartent avec une longue simple — et inversement. Milan, de Monica Loretti, est la longue qui joue le rôle d'une courte : crêpe léger, drapé au buste, fente sur le côté, « pour la mariée qui recherche un style raffiné et minimaliste ». Elle s'essaie à côté des courtes.",
        robe: "milan",
        voir: "Voir Milan",
      },
      pourQui: {
        titre: "À qui elle va",
        texte:
          "Elin, River, Clover et Gabriel conviennent à toutes les morphologies : une robe courte dessine la jambe et laisse le buste libre, ce qui va à toutes. Et parce que chaque robe est réalisée à vos mesures, la robe de mariée courte grande taille n'est pas un rayon à part.",
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
            r: "Elin, « parfaite pour une cérémonie civile », pour la sobriété ; River, pour une mairie plus habillée. Si une autre cérémonie suit, Clover et Gabriel font les deux, grâce à leur surjupe. Notre page consacrée au mariage civil présente aussi les robes longues et simples qui conviennent.",
          },
          {
            q: "Une robe de mariée courte coûte-t-elle moins cher ?",
            r: "Pas nécessairement : le prix tient à la maison, à la matière et au travail du corsage, non à la longueur. Comme toutes nos robes, les courtes sont confectionnées à vos mesures, retouches comprises, à partir de 1 500 € ; le prix de chacune se confirme au showroom.",
          },
          {
            q: "Où essayer une robe de mariée courte à Paris ?",
            r: `Au showroom MADAMOON, ${ADRESSE}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps d'essayer les courtes, et une longue pour comparer.`,
          },
          {
            q: "Robe de mariée courte en dentelle, à manches, ou courte devant et longue derrière ?",
            r: "Nos robes courtes s'arrêtent au genou : pas de robe courte devant et longue derrière, ni de robe midi. En dentelle, en tulle ou perlée, avec ou sans manches, bustier ou à bretelles ? Gabriel est perlée sous sa jupe transparente, Clover brodée de fleurs, River à larges bretelles, Elin en crêpe, sans manche.",
          },
          {
            q: "Une robe courte pour l'hiver, ou dans un esprit bohème ?",
            r: "Une courte bohème, une courte blanche pour l'hiver, portée avec une veste : c'est l'essayage qui vous le dira, et la robe est ensuite faite aux mesures de chaque femme.",
          },
          {
            q: "Moderne, vintage années 50, à paillettes : quel style pour une robe courte ?",
            r: "Moderne ou vintage années 50, élégante sous un voile court, dos nu ou corset, en satin, à paillettes, jupe bouffante ou droite — pour une femme ronde comme pour une mariée senior : toutes ces envies se discutent à l'essayage, robe sur vous. Un nœud, une ceinture ? Ce sont des accessoires, que l'on ajoute ensuite.",
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
