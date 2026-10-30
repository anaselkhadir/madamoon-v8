/*
 * MADAMOON — la matière du site.
 *
 * Tout ce qui suit vient de la maison : coordonnées, créateurs, catalogue,
 * parcours sur mesure, morphologies, FAQ. Rien n'est inventé. Quand une
 * information manque, elle est absente — jamais remplacée par un
 * approximatif.
 */

export const MAISON = {
  nom: "MADAMOON",
  baseline: "Boutique de robes de mariée à Paris",
  adresse: "234, rue du Faubourg Saint-Martin",
  codePostal: "75010",
  ville: "Paris",
  pays: "France",
  telephone: "+33 6 41 24 38 47",
  telephoneHref: "tel:+33641243847",
  email: "contact@madamoon.fr",
  emailHref: "mailto:contact@madamoon.fr",
  horaires: [
    { jour: "Lundi", heures: "12h — 21h" },
    { jour: "Mardi — samedi", heures: "10h — 19h" },
  ],
  mentionHoraires: "Sur rendez-vous uniquement",
  prixDepart: "1 500 €",
  reservation: "https://madamoon.fr/prise-de-rendez-vous/",
  reseaux: [
    { label: "Instagram", href: "https://www.instagram.com/madamoon.paris/" },
    { label: "TikTok", href: "https://www.tiktok.com/@madamoon.paris" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100094615813297" },
  ],
} as const;

export const SITE_URL = "https://madamoon.fr";


/* Les maisons dont MADAMOON présente les collections. */
export type Createur = {
  nom: string;
  /* L'adresse de sa page. Écrite, jamais dérivée : une URL ne doit pas
   * changer parce qu'on a corrigé une majuscule dans un nom. */
  slug: string;
  origine: string;
  note: string;
  /* La robe qui ouvre sa page : son film s'il en existe un, sa
   * photographie sinon. */
  ouverture: { robe: string; vue: number };
  /* La photographie de sa vignette sur l'accueil, choisie par la maison.
   * Sans « vue », elle vient de VIGNETTES_CREATEURS ; sans vignette, c'est
   * celle de l'ouverture. */
  vignette?: { robe: string; vue?: number };
};

export const CREATEURS: Createur[] = [
  {
    nom: "Watters Designs",
    slug: "watters-designs",
    origine: "Dallas",
    note: "Dentelles travaillées, dos illusion, tombés légers. La maison d'Uma et de Pendant.",
    ouverture: { robe: "uma", vue: 2 },
    vignette: { robe: "pendant" },
  },
  {
    nom: "Casablanca Bridal",
    slug: "casablanca-bridal",
    origine: "Newport Beach",
    note: "Satin de soie, dentelle française… des robes faites pour la lumière.",
    /* Meredith plutôt que Tessa : Tessa est le seul film « deux en un »
     * du catalogue, et la page de cette coupe en a plus besoin. */
    ouverture: { robe: "meredith", vue: 1 },
    vignette: { robe: "ariel" },
  },
  {
    nom: "Olya Mak",
    slug: "olya-mak",
    origine: "Lviv",
    note: "Le drapé, la transparence, la sensualité retenue. Des robes qui bougent avec celle qui les porte.",
    /* Le film de Seraphina, envoyé par la maison pour sa page. */
    ouverture: { robe: "seraphina", vue: 1 },
    vignette: { robe: "seraphina", vue: 3 },
  },
  {
    nom: "Monica Loretti",
    slug: "monica-loretti",
    origine: "Rome",
    note: "L'école italienne : proportions justes, broderies denses, matières nobles.",
    /* Monica porte le nom de la maison sur une place romaine : son
     * origine, dans l'image. */
    ouverture: { robe: "monica", vue: 1 },
  },
  /*
   * Les petits ateliers, réunis sous un seul nom.
   *
   * Ce n'est pas une maison : c'est le reste du catalogue, celui que la
   * boutique trouve un par un et ne veut pas désigner à la concurrence.
   * Il lui fallait pourtant une page — sans elle, un tiers des robes
   * n'appartenait à rien et n'apparaissait dans aucun classement par
   * créateur.
   *
   * Elle vient en dernier : la barre du haut ne montre que les quatre
   * premières, et ce sont des maisons nommées.
   */
  {
    nom: "Autres créateurs",
    slug: "autres-createurs",
    origine: "Petits ateliers indépendants",
    note: "Des ateliers européens indépendants, avec des modèles exclusifs.",
    ouverture: { robe: "hera", vue: 1 },
  },
];

export function createurParSlug(slug: string): Createur | undefined {
  return CREATEURS.find((c) => c.slug === slug);
}

/* Une robe ne connaît sa maison que par son nom : c'est de lui qu'on
 * remonte à sa page. */
export function createurParNom(nom: string | undefined): Createur | undefined {
  return nom ? CREATEURS.find((c) => c.nom === nom) : undefined;
}

/* Le filtre de la maison : sur sa page, on ne montre que ses robes. */
/* Le nom sous lequel se rangent les robes sans maison. */
export const AUTRES_CREATEURS = "Autres créateurs";

/* La maison qui travaille en demi-mesure : la robe part d'un patron
 * maison et s'ajuste, là où les autres taillent pour une seule mariée.
 * La fiche le dit, plutôt que de laisser croire au sur-mesure. */
export const SEMI_MESURE = "Watters Designs";

export function robesDe(nom: string): Robe[] {
  if (nom === AUTRES_CREATEURS) return ROBES.filter((r) => !r.createur);
  return ROBES.filter((r) => r.createur === nom);
}

/* Les coupes que la maison travaille, dans l'ordre du catalogue. */
export function coupesDe(nom: string): Categorie[] {
  const siennes = new Set(robesDe(nom).map((r) => r.categorie));
  return CATEGORIES.filter((c) => siennes.has(c));
}

/*
 * Les morphologies auxquelles ses coupes répondent en premier.
 *
 * On ne retient qu'une morphologie dont l'une des deux recommandations
 * principales figure au catalogue de la maison : le conseil doit pouvoir
 * s'essayer sur place, sinon il ne vaut rien.
 */
export function morphologiesDe(nom: string): Morphologie[] {
  const siennes = coupesDe(nom);
  return MORPHOLOGIES.filter((m) => m.premieres.some((c) => siennes.includes(c)));
}

/* Les engagements de la maison. */
export const SIGNATURES = [
  {
    titre: "Essayage privé",
    texte: "Le showroom est privatisé pour vous pendant une heure. Venez accompagnée.",
  },
  {
    titre: "Confection sur mesure",
    texte: "Chaque robe est réalisée à l'atelier, selon vos mensurations.",
  },
  {
    titre: "Retouches incluses",
    texte: "Nos couturières ajustent votre robe jusqu'au dernier essayage.",
  },
  {
    titre: `À partir de ${MAISON.prixDepart}`,
    texte: "Pour une confection sur mesure, retouches comprises.",
  },
] as const;

/* ————————————————————————————————————— Le catalogue ————— */

export type Categorie =
  | "Sirène"
  | "Fluide"
  | "Trapèze"
  | "Princesse"
  | "Deux en un";

export const CATEGORIES: Categorie[] = [
  "Sirène",
  "Fluide",
  "Trapèze",
  "Princesse",
  "Deux en un",
];

/* Ce que chaque famille de coupe veut dire, en boutique. */
export const FAMILLES: Record<Categorie, string> = {
  Sirène: "Ajustée jusqu'aux cuisses, puis évasée. Elle dessine la taille et les hanches.",
  Fluide: "Un tombé souple qui suit naturellement le mouvement.",
  Trapèze: "Un buste ajusté, une jupe qui s'ouvre en A. La coupe la plus universelle.",
  Princesse: "Un corset travaillé et un volume de jupe assumé.",
  "Deux en un": "Une robe, deux allures : une surjupe ou une traîne qui se détache.",
};

export type Robe = {
  slug: string;
  nom: string;
  /* La ligne du catalogue MADAMOON. */
  ligne: string;
  categorie: Categorie;
  /* Ce que l'on remarque en premier — décrit d'après la photographie. */
  regard: string;
  /* Nombre de vues disponibles dans /public/robes. */
  vues: number;
  /* La vue qui représente la robe quand une seule image la montre —
   * tuile, partage, catalogue. La première par défaut. Tessa est une
   * deux-en-un : sa vue avec surjupe dit mieux ce qu'elle est. */
  couverture?: number;
  createur?: string;
  /* Les morphologies que cette robe sert en premier. Relevé sur les
   * fiches produit de la cliente, jamais déduit d'une photographie :
   * c'est elle qui fait essayer les robes, pas nous. */
  morphos?: Lettre[];
};

export const ROBES: Robe[] = [
  /* ————— La collection que la maison a reçue en dernier —————
   *
   * Dix modèles Casablanca Bridal, avec leurs mots et leurs
   * photographies. Ils ouvrent le catalogue, à la demande de la
   * maison : une nouveauté se montre d'abord, et l'ordre de ce tableau
   * est celui du catalogue — comme celui de la page du créateur, des
   * pages de coupe et de morphologie, et du plan du site.
   *
   * Aucune n'a de morphologies : elles se relèvent sur les fiches
   * produit de la cliente, jamais sur une photographie — c'est elle qui
   * fait essayer les robes. Elles viendront. */
  {
    slug: "santana",
    nom: "Santana",
    ligne: "Princesse avec taille basque en organza et tulle, dentelle florale",
    categorie: "Princesse",
    regard:
      "Santana est une robe de mariée princesse inspirée des contes de fées, réinterprétée dans un esprit moderne et élégant. Son décolleté V et ses fines bretelles spaghetti mettent en valeur la silhouette, tandis que son corsage transparent est sublimé par une délicate dentelle florale. Sa jupe volumineuse en tulle et organza, ornée de motifs floraux, se prolonge jusqu'à une spectaculaire traîne et un ourlet festonné. Santana séduit par son allure romantique, aérienne et intemporelle, idéale pour une mariée à la recherche d'une robe de mariée élégante et féerique. Pour une touche couture, elle peut être accessoirisée avec les gants transparents en tulle de soie, ornés de dentelle florale, ainsi qu'un voile assorti longueur « doigts », disponibles séparément.",
    vues: 7,
    createur: "Casablanca Bridal",
  },
  {
    slug: "sheridan",
    nom: "Sheridan",
    ligne: "Sirène en satin mat et dentelle, avec cape assortie",
    categorie: "Sirène",
    /* De face et avec la cape, demandée par la maison.
     *
     * La cape est la vue 5 : une mousseline drapée sur l'épaule, qui
     * tombe jusqu'au sol avec la traîne. La 6 avait d'abord été prise
     * pour elle — c'est un voile, posé sur la tête et arrêté à la
     * hanche. Deux tulles, deux pièces différentes. */
    couverture: 5,
    regard:
      "Sheridan est une robe de mariée sirène à la silhouette moderne et élégante. Sa coupe fit-and-flare sans bretelles épouse délicatement les courbes, tandis que son décolleté cœur pointu apporte une touche graphique et sophistiquée. Confectionnée en satin mat souple avec une doublure extensible, elle est sublimée par des applications de dentelle florale qui illuminent le corset et se prolongent délicatement sur la jupe. Une création qui associe lignes architecturales, féminité et élégance intemporelle. Pour une allure spectaculaire lors de la cérémonie, la cape en tulle plissé asymétrique et ornée de la même dentelle transforme la silhouette en une véritable pièce couture.",
    vues: 8,
    createur: "Casablanca Bridal",
  },
  {
    slug: "guinevere",
    nom: "Guinevere",
    ligne: "Princesse bustier en jacquard, corset taille basque en pointe",
    categorie: "Princesse",
    regard:
      "Guinevere est une robe de mariée princesse à l'allure couture, mêlant lignes architecturales et élégance lumineuse. Son corset bustier présente un décolleté cœur plongeant et pointu, sublimé par une taille basque qui souligne harmonieusement la silhouette. Confectionnée en jacquard floral texturé, Guinevere dévoile une somptueuse jupe volumineuse de robe de bal avec poches discrètes et une longue traîne. Une création majestueuse et raffinée, idéale pour une mariée à la recherche d'une robe de mariée élégante et couture.",
    vues: 11,
    createur: "Casablanca Bridal",
  },
  {
    slug: "aleida",
    nom: "Aleida",
    ligne: "Sirène en dentelle et tulle scintillant",
    categorie: "Sirène",
    regard:
      "Aleida est une robe de mariée sirène lumineuse et raffinée, conçue pour sublimer la silhouette sous tous les angles. Ses fines bretelles spaghetti encadrent un décolleté plongeant, prolongé par un corset à taille basque en pointe, offrant à la fois maintien et sensualité. De délicates applications de dentelle florale parcourent la robe, tandis que la jupe associe du tulle doux à une dentelle froncée pour créer profondeur et mouvement. Une couche de tulle intégrée apporte un élégant effet transparent jusqu'à la traîne en dentelle festonnée.",
    vues: 6,
    createur: "Casablanca Bridal",
  },
  {
    slug: "oksana",
    nom: "Oksana",
    ligne: "Sirène en dentelle de Chantilly, corset basque en pointe",
    categorie: "Sirène",
    regard:
      "Oksana incarne une robe de mariée sirène à la sensualité moderne et sophistiquée. Entièrement confectionnée en dentelle de Chantilly, elle épouse élégamment la silhouette. Son décolleté cœur pointu, orné de délicates chaînes de perles et de sequins amovibles, est accompagné de fines bretelles spaghetti perlées amovibles, permettant de personnaliser la tenue. Sa taille basque structurée sculpte le corps avant de s'épanouir en une majestueuse traîne.",
    vues: 8,
    createur: "Casablanca Bridal",
  },
  {
    slug: "hayes",
    nom: "Hayes",
    ligne: "Princesse ou trapèze en satin mat et dentelle",
    categorie: "Princesse",
    regard:
      "Le contraste entre les lignes épurées du bustier à encolure cœur revisitée et le mouvement aérien de la jupe crée une silhouette à la fois contemporaine, féminine et raffinée. Hayes est idéale pour la mariée qui recherche une touche d'originalité dans sa robe de mariée.",
    vues: 4,
    createur: "Casablanca Bridal",
  },
  {
    slug: "enid",
    nom: "Enid",
    ligne: "Sirène, moderne et minimaliste",
    categorie: "Sirène",
    regard:
      "Une robe de mariée fit-and-flare en néoprène, avec décolleté droit, épaules dénudées, et une infinité de boutons qui parcourent le dos de la robe jusqu'à la fin de la traîne. Enid se porte en bustier ou en col bardot.",
    vues: 7,
    createur: "Casablanca Bridal",
  },
  {
    slug: "bondi",
    nom: "Bondi",
    ligne: "Sirène minimaliste en crêpe, épaules dégagées, fente",
    categorie: "Sirène",
    regard:
      "Cette création minimaliste, pensée pour la mariée moderne, apporte une touche contemporaine et unique au jour du mariage. Confectionnée en crêpe, la robe épouse parfaitement les courbes grâce à sa silhouette fit-and-flare, sublimant naturellement le corps. Une fente haute sur la cuisse apporte une touche de caractère et facilite les mouvements. Son décolleté V épaules dénudées encadre joliment les épaules et souligne le haut du buste. Au dos, une élégante rangée de boutons descend du corsage jusqu'à la traîne.",
    vues: 2,
    createur: "Casablanca Bridal",
  },
  {
    slug: "bella",
    nom: "Bella",
    ligne: "Sirène ou fourreau en satin, perles, dos nu et manches longues",
    categorie: "Sirène",
    regard:
      "La robe de mariée Bella est confectionnée en satin haut de gamme et est ornée de jolies perles pour un look glamour maîtrisé. Bella est idéale pour la mariée qui recherche une robe de mariée chic, intemporelle et à l'esprit couture.",
    vues: 3,
    createur: "Casablanca Bridal",
  },
  {
    slug: "fancy",
    nom: "Fancy",
    ligne: "Sirène en dentelle et détails scintillants",
    categorie: "Sirène",
    regard:
      "Entièrement travaillée avec une dentelle florale scintillante, la robe Fancy épouse élégamment le corps avant de s'évaser en une spectaculaire traîne transparente en dentelle. Son corset marque et affine la taille, créant ainsi une magnifique courbe féminine entre la taille et les hanches. Elle se porte également en bustier : les bretelles tombantes sont optionnelles.",
    vues: 4,
    createur: "Casablanca Bridal",
  },

  {
    slug: "uma",
    nom: "Uma",
    ligne: "Sirène en dentelle, dos illusion",
    categorie: "Sirène",
    regard: "Une dentelle fine et un dos transparent fermé par une ligne de jolis boutons couleur ivoire.",
    vues: 9,
    /* La photographie de face : la première est de dos. */
    couverture: 2,
    createur: "Watters Designs",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "pendant",
    nom: "Pendant",
    ligne: "Trapèze en dentelle, avec des manches longues",
    categorie: "Trapèze",
    regard:
      "Une robe de mariée où le romantisme rencontre la majesté. Son décolleté épaules dénudées dévoile délicatement le haut du buste, tandis que ses longues manches en dentelle apportent une touche de sophistication et de féminité.",
    vues: 47,
    /* La photographie de face : la première est de dos. */
    couverture: 2,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "adularia",
    nom: "Adularia",
    ligne: "Fluide en charmeuse",
    categorie: "Fluide",
    regard:
      "L'élégance minimaliste avec une allure résolument moderne. Confectionnée dans une délicate étoffe charmeuse, elle épouse harmonieusement la silhouette tout en offrant un tombé fluide et sophistiqué.",
    vues: 4,
    createur: "Watters Designs",
  },
  {
    slug: "trinity",
    nom: "Trinity",
    ligne: "En mikado ou en jacquard, épaules dénudées",
    categorie: "Princesse",
    regard:
      "Une coupe flatteuse avec une touche de glamour grâce à sa fente sur le côté.",
    vues: 11,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "amaryllis",
    nom: "Amaryllis",
    ligne: "Coupe droite ou sirène en charmeuse, boutons sur le côté",
    categorie: "Sirène",
    /* la seule vue de face en pied ; la 1 coupe à la hanche. */
    couverture: 3,
    regard:
      "Une création moderne et audacieuse avec une file de boutons sur le côté. Les bretelles d'Amaryllis se portent sur les épaules pour la version classique, ou sur les bras si vous préférez les bretelles tombantes.",
    vues: 5,
    createur: "Watters Designs",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "aster",
    nom: "Aster",
    ligne: "Dentelle de Chantilly, satin et manches amovibles",
    categorie: "Trapèze",
    regard:
      "Aster revisite les grands codes de la robe de mariée traditionnelle avec une élégance contemporaine. Sa silhouette A-line, sa taille naturelle et son corsage délicatement drapé évoquent une sophistication intemporelle, tandis que la dentelle de Chantilly habille le dos et les manches d’une touche Heritage.",
    vues: 6,
    /* La photographie de face : la première est de dos. */
    couverture: 2,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "fern",
    nom: "Fern",
    ligne: "Mikado brodé de fleurs de perles",
    categorie: "Princesse",
    regard: "Une robe de mariée raffinée, audacieuse et résolument unique.",
    vues: 3,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "charlize",
    nom: "Charlize",
    ligne: "Satin mat et dentelle de Chantilly",
    categorie: "Sirène",
    /* de face, la robe entière et la traîne ; la vue 1 la prend de très loin. */
    couverture: 10,
    regard:
      "Un corset transparent — ou doublé, si vous n'appréciez pas la transparence — et une jolie fente qui s'ouvre sur une jupe en dentelle de Chantilly.",
    vues: 10,
    createur: "Casablanca Bridal",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "tessa",
    nom: "Tessa",
    ligne: "Sirène, surjupe détachable",
    categorie: "Deux en un",
    regard:
      "Une robe de mariée au charme vintage-chic, un corset structuré et des bretelles amovibles pour un autre look.",
    vues: 13,
    couverture: 3,
    createur: "Casablanca Bridal",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "meredith",
    nom: "Meredith",
    ligne: "Sirène, dentelle en relief pour un look sophistiqué",
    categorie: "Sirène",
    regard:
      "Décolleté en cœur, une ligne féminine et romantique qui sublime le buste avec élégance.",
    vues: 8,
    createur: "Casablanca Bridal",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "clover",
    nom: "Clover",
    ligne: "Robe courte florale et surjupe",
    categorie: "Deux en un",
    /* de face, la robe longue ; la vue 1 la prend de loin, au bout d'une allée. */
    couverture: 3,
    regard: "Une robe courte brodée de fleurs de couleur, et une surjupe longue à volonté.",
    vues: 6,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "solana",
    nom: "Solana",
    ligne: "Trapèze, appliqués de dentelle et sequins mats",
    categorie: "Trapèze",
    regard:
      "Une somptueuse robe de mariée princesse ou trapèze, en tulle et dentelle florale, avec veste asymétrique amovible, décolleté en cœur et longue traîne.",
    vues: 8,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "venus",
    nom: "Venus",
    ligne: "Sirène en satin mat, traîne majestueuse et dos en dentelle",
    categorie: "Sirène",
    regard:
      "Son décolleté graphique, souligné par de fines bretelles ornées de perles, apporte une touche de modernité et de raffinement. Son corsage structuré par des baleines discrètes dessine harmonieusement la silhouette, tandis que son dos en tulle illusion dévoile une transparence subtile et sophistiquée.",
    vues: 8,
    createur: "Casablanca Bridal",
    morphos: ["H", "8", "X"],
  },
  {
    slug: "addison",
    nom: "Addison",
    ligne: "Satin de soie, bretelles tombantes amovibles",
    categorie: "Princesse",
    regard:
      "De romantiques motifs floraux appliqués à la main, en mousseline, apportent un relief poétique à la robe Addison. Sa jupe épurée est dotée de poches bien pratiques et d'une infinité de boutons qui court jusqu'au bout de la traîne.",
    vues: 7,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "montana",
    nom: "Montana",
    ligne: "Sirène en satin mat, manches longues en dentelle et dos illusion",
    categorie: "Sirène",
    regard:
      "Une robe de mariée minimaliste et élégante, qui sublime la silhouette avec une sophistication intemporelle.",
    vues: 4,
    createur: "Casablanca Bridal",
    morphos: ["A", "H", "8", "X"],
  },
  {
    /* Posée après Montana, et non plus contre Venus : les deux
     * partagent la même serre, le même bois sombre et la même
     * ligne de sirène. Côte à côte dans la trame, elles se lisaient
     * comme une seule robe photographiée deux fois. La maison l'a
     * vu. Addison et Montana, claires et d'une autre coupe, les
     * séparent. */
    slug: "ariel",
    nom: "Ariel",
    ligne: "Sirène en satin mat, pétales de mousseline posés à la main",
    categorie: "Sirène",
    regard:
      "Une robe de mariée sirène en satin mat : décolleté en cœur, pétales floraux en relief, corset apparent dans le dos et bretelles amovibles.",
    vues: 10,
    createur: "Casablanca Bridal",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "zina",
    nom: "Zina",
    ligne: "Sirène à fente, fleurs 3D optionnelles",
    categorie: "Sirène",
    regard:
      "Une robe de mariée sirène en georgette stretch et satin mat, ornée de fleurs 3D faites main, avec fente et corset à laçage. Une robe spectaculaire, qui célèbre la féminité avec audace et sophistication.",
    vues: 9,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "sienna",
    nom: "Sienna",
    ligne: "Princesse ou trapèze en dentelle",
    categorie: "Trapèze",
    regard:
      "Le bustier, avec son décolleté en cœur subtilement revisité, met en valeur le buste avec féminité, tandis que sa jupe ample apporte un volume généreux et une silhouette digne des plus beaux contes de fées.",
    vues: 4,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "amandine",
    nom: "Amandine",
    ligne: "Princesse en dentelle, décolleté plongeant",
    categorie: "Princesse",
    regard:
      "Une robe de mariée digne des plus beaux lieux de mariage. Sa dentelle arbore des motifs d'un style royal, tandis que son encolure en V lui donne une allure moderne.",
    vues: 3,
  },
  {
    slug: "charlotte",
    nom: "Charlotte",
    ligne: "Princesse ou trapèze en dentelle Caterina",
    categorie: "Trapèze",
    regard:
      "Robe bustier au décolleté en cœur, corset en taille basque et dentelle Caterina : le rêve de la mariée romantique et élégante. Elle existe aussi sans le décolleté plongeant, pour une version plus couvrante.",
    vues: 4,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "dove",
    nom: "Dove",
    ligne: "Tombé fluide en satin mat, décolleté drapé et épaules dénudées",
    categorie: "Fluide",
    regard:
      "La robe de mariée qui réunit l'élégance intemporelle et le confort absolu. Avec son dos ouvert et sa ligne infinie de boutons jusqu'à la traîne, Dove promet une allure poétique et pure.",
    vues: 6,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "finell",
    nom: "Finell",
    ligne: "Bustier cœur en satin, jupe trapèze",
    categorie: "Trapèze",
    regard:
      "Un décolleté inoubliable, grâce à cette encolure en cœur sculptée. Finell offre un corset qui marque la taille, des coutures structurées et une élégante jupe trapèze à traîne chapelle.",
    vues: 6,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "ryle",
    nom: "Ryle",
    ligne: "Fluide, manches ballon",
    categorie: "Fluide",
    regard:
      "Des manches ballon, un décolleté en V profond et un tombé à couper le souffle, dans une délicate étoffe de charmeuse.",
    vues: 6,
    createur: "Watters Designs",
    morphos: ["A", "V", "H", "8", "X"],
  },
  {
    slug: "shiloh",
    nom: "Shiloh",
    ligne: "Sirène en dentelle de Chantilly, jupe en crêpe et fente centrale",
    categorie: "Sirène",
    regard:
      "Une robe au caractère affirmé : Shiloh a été imaginée pour la mariée moderne, en quête d'une allure chic et singulière.",
    vues: 8,
    createur: "Casablanca Bridal",
    morphos: ["A", "8", "X"],
  },
  {
    slug: "carrie",
    nom: "Carrie",
    ligne: "Trapèze pailletée, fines bretelles et corset perlé à la main",
    categorie: "Trapèze",
    regard:
      "Un rêve de conte de fées. Carrie sublime toutes les silhouettes par son allure féerique et ses détails délicatement scintillants. Son corsage brodé de perles révèle de magnifiques motifs de feuilles et de lianes, portés par de fines doubles bretelles spaghetti. La jupe volumineuse se compose de plusieurs couches de tulle pailleté, léger et aérien, qui donnent à la silhouette une dimension spectaculaire.",
    vues: 8,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "maribel",
    nom: "Maribel",
    ligne: "Fluide minimaliste en mousseline stretch, corsage brodé à la main",
    categorie: "Fluide",
    regard:
      "Une robe de mariée moderne : décolleté en V, corsage brodé et perlé à la main, jupe fluide en mousseline, fente et traîne légère.",
    vues: 3,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "summer",
    nom: "Summer",
    ligne: "Sirène en dentelle d'Alençon, décolleté en V et longue traîne",
    categorie: "Sirène",
    regard:
      "La beauté de la dentelle française dans une silhouette féminine et raffinée. Sa coupe sirène évasée épouse délicatement les courbes avant de s'ouvrir avec élégance, pour une allure à la fois romantique et glamour.",
    vues: 5,
    /* La photographie de face : la première est de dos. */
    couverture: 3,
    createur: "Casablanca Bridal",
    morphos: ["V", "8", "X"],
  },
  {
    slug: "gabriel",
    nom: "Gabriel",
    ligne: "Courte, jupe transparente amovible",
    categorie: "Deux en un",
    regard: "Une robe courte délicatement perlée, une jupe transparente en dessous.",
    vues: 7,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "emerald",
    nom: "Emerald",
    ligne: "Trapèze, corsage perlé, décolleté en V et jupe de tulle ou de satin",
    categorie: "Trapèze",
    regard:
      "Sa silhouette trapèze met harmonieusement en valeur les courbes, tandis que son corsage illusion dévoile de somptueux détails de broderies et de perles aux motifs délicatement entrelacés. Ses fines bretelles spaghetti et son décolleté en V classique soulignent le buste avec féminité. À l'arrière, le dos en V prolonge cette ligne élégante et apporte une touche de sensualité subtile.",
    vues: 1,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "alicia",
    nom: "Alicia",
    ligne: "Trapèze ou volume princesse, épaules dégagées et fente",
    categorie: "Trapèze",
    regard:
      "Alicia est une magnifique robe de mariée en dentelle et tulle : une légèreté appréciable, et un look féerique et mémorable.",
    vues: 3,
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "lovia",
    nom: "Lovia",
    ligne: "Trapèze ou volume princesse, dentelle délicate, corset à encolure en V et fente",
    categorie: "Trapèze",
    regard:
      "Avec ses bretelles fines ornées de toutes petites perles, son corset qui marque bien la taille et son décolleté en V, Lovia est parfaite pour un look sensuel, inspiré par la nature.",
    vues: 3,
    morphos: ["O", "A", "V", "H", "8", "X"],
    /* La photographie de face : la première est de dos. */
    couverture: 2,
  },
  {
    slug: "angel",
    nom: "Angel",
    ligne: "Trapèze, perles et paillettes",
    categorie: "Trapèze",
    regard:
      "Angel est idéale pour la mariée pétillante, qui aime les paillettes. Son décolleté et son dos en V créent un parfait équilibre sur ce corset qui souligne la taille. La jupe simple contraste avec le haut, perlé à la main.",
    vues: 2,
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "dolores",
    nom: "Dolores",
    ligne: "Trapèze ou princesse en tulle, col carré",
    categorie: "Trapèze",
    regard:
      "Confectionnée en tulle, dentelle et perles, elle se caractérise par son encolure carrée, qui flatte le buste. Son dos transparent en dentelle est joliment orné de boutons, jusqu'au bas du corset.",
    vues: 2,
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "livia",
    nom: "Livia",
    ligne: "Princesse en mikado, décolleté en V",
    categorie: "Princesse",
    regard: "Un V franc, une taille marquée, une jupe qui tient toute seule.",
    vues: 2,
    /* La photographie de face : la première est de dos. */
    couverture: 2,
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "riviera",
    nom: "Riviera",
    ligne: "Sirène en charmeuse, corset structuré et manches amovibles",
    categorie: "Sirène",
    regard:
      "Le corsage et les manches amovibles sont sublimés par des regroupements de perles délicatement travaillés, qui apportent une touche de lumière et de sophistication à la silhouette. Les manches détachables permettent de personnaliser le look et de varier les styles, selon les envies.",
    vues: 2,
    /* La photographie de face : la première est de dos. */
    couverture: 2,
    createur: "Watters Designs",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "kensington",
    nom: "Kensington",
    ligne: "Princesse en mikado, épaules dénudées",
    categorie: "Princesse",
    regard:
      "Cette robe de mariée princesse se distingue par son corsage entièrement orné de somptueuses broderies de perles argentées, qui se prolongent délicatement le long des manches tombant sur les épaules. Sa jupe spectaculaire, confectionnée entièrement en mikado, apporte structure et volume à la silhouette, tandis que sa traîne de deux mètres crée une allure grandiose.",
    vues: 4,
    createur: "Casablanca Bridal",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "nirali",
    nom: "Nirali",
    ligne: "Trapèze, taille basse et décolleté droit",
    categorie: "Trapèze",
    regard:
      "Résolument moderne et délicatement romantique, Nirali séduit par sa silhouette élégante et par ses fleurs faites main, disposées le long du décolleté.",
    vues: 3,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "calla",
    nom: "Calla",
    ligne: "Tulle fluide et dentelle Highclare, décolleté arrondi",
    categorie: "Trapèze",
    regard:
      "La robe de mariée Calla séduit par son allure douce et aérienne. Confectionnée en tulle très souple et en délicate dentelle Highclare, elle associe confort, féminité et raffinement. Son corsage structuré façon corset sublime la silhouette, tandis que son décolleté arrondi apporte une touche élégante et intemporelle. La dentelle, délicatement travaillée et minutieusement positionnée sur le corsage, vient enrichir la robe de détails raffinés tout en conservant une allure légère et naturelle. Une création idéale pour la mariée à la recherche d'une robe de mariée romantique, élégante et confortable, sublimée par un travail de dentelle délicat.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "fortune",
    nom: "Fortune",
    ligne: "Bustier trapèze en crêpe stretch et organza satin",
    categorie: "Trapèze",
    regard:
      "Découvrez Fortune, une robe de mariée bustier à la silhouette trapèze, confectionnée en crêpe et organza satin pour une allure élégante et intemporelle.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "siddalee",
    nom: "Siddalee",
    /* « Fourreau ou sirène » chez la maison : la coupe est déjà dite
     * au-dessus du nom, la ligne garde donc l'autre mot. */
    ligne: "Fourreau à motifs floraux, tulle pailleté et longue traîne",
    categorie: "Sirène",
    regard:
      "Découvrez Siddalee, une robe de mariée fourreau ornée de motifs floraux, avec des bretelles amovibles, tulle pailleté et une longue traîne spectaculaire.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "mitra",
    nom: "Mitra",
    ligne: "Trapèze à taille basse, dentelle Cassie et rubans de velours",
    categorie: "Trapèze",
    regard:
      "Découvrez cette robe de mariée trapèze ou A-line à taille basse, sublimée par une dentelle Cassie appliquée à la main et de délicats rubans de velours pour un look à la fois féérique et élégant.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "ember",
    nom: "Ember",
    ligne: "Corset structuré et silhouette couture",
    categorie: "Princesse",
    regard:
      "Ember séduit par son allure élégante et contemporaine. Confectionnée en Dupioni raffiné, cette robe de mariée se distingue par son corset qui structure la silhouette. Son décolleté cœur, sublimé par une élégante découpe en V, met joliment en valeur la poitrine. La taille basse spectaculaire se prolonge par une jupe ample et légère, créant une silhouette à la fois moderne, féminine et sophistiquée. Une création idéale pour la mariée à la recherche d'une robe de mariée couture, aux lignes affirmées et aux matières luxueuses.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "rowan",
    nom: "Rowan",
    /* « Fourreau ou sirène » chez la maison : la coupe est déjà dite
     * au-dessus du nom, la ligne garde donc l'autre mot. */
    ligne: "Fourreau en charmeuse, corset perlé et dentelle Mori",
    categorie: "Sirène",
    regard:
      "Rowan est une robe de mariée près du corps qui associe élégance contemporaine et détails délicats. Confectionnée en Charmeuse, elle épouse harmonieusement la silhouette pour une allure féminine et sophistiquée. Son corset transparent orné de perles apporte une touche de sensualité et de lumière, tandis que la nouvelle dentelle Mori sublime délicatement cette création. Son décolleté drapé apporte douceur et élégance à la silhouette. Pour une version plus couvrante, le corset peut également être proposé avec une doublure.",
    vues: 1,
    createur: "Watters Designs",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "clover-perles",
    nom: "Clover avec ou sans perles",
    ligne: "Dentelle Caterina, décolleté carré et taille basse",
    categorie: "Princesse",
    /* de face sous la pergola, la robe entière lisible ; la vue 1 est une source de 487 pixels. */
    couverture: 2,
    regard:
      "La robe de mariée Clover associe la délicatesse de la dentelle Française à des lignes modernes et sophistiquées. Confectionnée en dentelle Caterina, elle séduit par son charme romantique et ses détails raffinés. Son décolleté carré apporte une touche contemporaine, tandis que sa taille basse sculptée souligne élégamment la silhouette. Le corsage structuré assure un bon maintien et se prolonge par une jupe ample au volume généreux, offrant une allure majestueuse tout en préservant le confort. De délicates perles soulignent le décolleté et les contours du corset, apportant une subtile touche de lumière. Clover est idéale pour une mariée en quête d'une robe de mariée princesse à la fois moderne, romantique et élégante.",
    vues: 8,
    createur: "Watters Designs",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "marie",
    nom: "Marie",
    ligne: "Fluide, ligne intemporelle",
    categorie: "Fluide",
    regard:
      "Pensée pour la mariée qui croit en l'amour, la beauté et l'élégance intemporelle, cette robe fait de chaque rêve une réalité. Une création raffinée et romantique, imaginée pour sublimer la mariée et l'accompagner avec grâce lors de l'un des plus beaux jours de sa vie.",
    vues: 2,
    createur: "Monica Loretti",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "mathilda",
    nom: "Mathilda",
    ligne: "Robe de mariée femme enceinte — élégante, fluide et confortable",
    categorie: "Fluide",
    regard:
      "Découvrez une robe de mariée fluide et romantique spécialement pensée pour la femme enceinte. Elle permet de célébrer le mariage avec confort et style, sans renoncer à la beauté d'une robe de mariée classique. Une création idéale pour une mariée qui recherche une silhouette douce, élégante et intemporelle pour ce jour exceptionnel.",
    vues: 2,
    createur: "Monica Loretti",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "murielle",
    nom: "Murielle",
    ligne: "Dentelle florale, décolleté plongeant, manches illusion et fente",
    categorie: "Fluide",
    regard:
      "Découvrez cette robe de mariée romantique en dentelle florale et mousseline, avec décolleté plongeant en V, manches illusion, dos en V et fente haute. Murielle est disponible également sans fente.",
    vues: 3,
    createur: "Monica Loretti",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "agnessa",
    nom: "Agnessa",
    ligne: "Fluide, décolleté et dos spectaculaires en V",
    categorie: "Fluide",
    regard:
      "Un corset perlé à la main, combiné à une jupe de tulle fluide : Agnessa est idéale pour une allure naturellement glamour.",
    vues: 2,
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "mira",
    nom: "Mira",
    ligne: "Sirène en crêpe, dentelle, fente et jupe amovible en tulle",
    categorie: "Sirène",
    regard:
      "Cette robe de mariée coupe sirène en crêpe lisse séduit par son allure moderne et sophistiquée. Sa silhouette fit-and-flare épouse élégamment les courbes avant de s'ouvrir délicatement sur une douce traîne. Son corsage est sublimé par de délicates applications de dentelle florale et de fines perles, créant un subtil éclat. Les détails transparents et le décolleté profond renforcent son allure romantique et féminine, tandis qu'une fente haute sur la cuisse apporte une touche de sensualité et de mouvement. Pour transformer complètement la silhouette, cette création peut être accompagnée d'une jupe amovible volumineuse en tulle. Elle permet ainsi de passer d'une allure sirène moderne et sensuelle à une silhouette plus spectaculaire, inspirée de la robe princesse. Une robe de mariée 2-en-1, idéale pour la mariée qui souhaite conjuguer élégance, modernité et plusieurs styles le jour de son mariage.",
    vues: 6,
    createur: "Monica Loretti",
    morphos: ["V", "H", "8", "X"],
  },
  {
    slug: "monica",
    nom: "Monica",
    ligne: "Jacquard floral, décolleté V, ceinture et fente",
    categorie: "Trapèze",
    regard:
      "Cette élégante robe de mariée séduit par son allure chic. Son tissu jacquard aux motifs floraux apporte une texture raffinée et un caractère sophistiqué. Son décolleté en V classique sublime le buste, tandis qu'une large ceinture souligne la taille et structure harmonieusement la silhouette. La jupe se distingue par une fente travaillée, qui apporte une touche contemporaine et une belle liberté de mouvement. Une création idéale pour une mariée à la recherche d'une robe de mariée élégante, moderne et intemporelle, où la simplicité est sublimée par de beaux détails.",
    vues: 5,
    createur: "Monica Loretti",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "milan",
    nom: "Milan",
    ligne: "Crêpe léger, fente, minimaliste",
    categorie: "Sirène",
    regard:
      "Pour la mariée qui recherche un style raffiné et minimaliste à la fois. La robe est confectionnée en crêpe léger et présente un joli drapé au niveau du buste et une fente sur le côté pour une touche de sensualité.",
    vues: 4,
    createur: "Monica Loretti",
    morphos: ["H", "8", "X"],
  },
  {
    slug: "chastity",
    nom: "Chastity",
    ligne: "Dentelle, manches longues, col montant et longue traîne",
    categorie: "Deux en un",
    regard:
      "Cette magnifique robe de mariée en dentelle associe élégance, romantisme et charme traditionnel. Sa dentelle fine recouvre entièrement le corsage ainsi que les longues manches, créant un effet délicat et sophistiqué. Son décolleté montant apporte une touche classique et raffinée, tandis que la silhouette épouse le corps jusqu'aux hanches avant de s'évaser dans une jupe volumineuse en tulle. Une longue traîne vient compléter l'ensemble et apporte une dimension majestueuse et luxueuse à cette création. Une robe idéale pour la mariée qui recherche une robe de mariée deux-en-un.",
    vues: 4,
    createur: "Olya Mak",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "river",
    nom: "River",
    ligne: "Courte, décolleté carré et silhouette sculpturale",
    categorie: "Trapèze",
    regard:
      "Cette robe de mariée courte issue d'une collection premium revisite avec audace les codes de la couture nuptiale. Sa silhouette épurée et sculpturale souligne la taille et épouse délicatement les courbes pour créer une allure moderne, affirmée et sophistiquée. Son tissu à la texture raffinée, spécialement développé pour cette création, est sublimé par des finitions et des détails réalisés à la main. Les larges bretelles et le décolleté carré apportent une touche graphique et contemporaine, tandis que sa longueur courte offre une sensation de légèreté, de liberté et de modernité. Parfaite pour un deuxième look de mariée, une réception ou une cérémonie moins conventionnelle, cette création séduit par sa simplicité apparente, qui dissimule un véritable travail de coupe et une confection particulièrement précise. Une robe de mariée pour celles qui souhaitent sortir des codes traditionnels et affirmer leur personnalité avec élégance.",
    vues: 2,
    createur: "Olya Mak",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "seraphina",
    nom: "Seraphina",
    ligne: "Dentelle brodée, dos nu, manches longues et silhouette princesse",
    categorie: "Princesse",
    regard:
      "Cette magnifique robe de mariée incarne une élégance intemporelle revisitée avec une touche contemporaine. Sa dentelle d'exception, richement brodée à la main, séduit par sa texture délicate et la profondeur de ses motifs. Le corsage transparent, les manches longues et la silhouette princesse composent une allure raffinée et majestueuse. Chaque application florale est minutieusement réalisée à la main, apportant une dimension romantique et unique à cette création. Sa jupe généreusement volumineuse donne à la silhouette une présence royale tout en conservant une légèreté aérienne. Une robe pensée pour les mariées qui recherchent une création sophistiquée, où le savoir-faire artisanal rencontre l'esprit haute couture. Idéale pour une cérémonie élégante et classique, cette robe se distingue par ses finitions précieuses et son travail artisanal, véritable signature d'une création d'exception.",
    vues: 4,
    createur: "Olya Mak",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "elin",
    nom: "Elin",
    ligne: "Courte en crêpe pour un mariage civil",
    categorie: "Sirène",
    regard:
      "Une robe de mariée parfaite pour une cérémonie civile. Sa légèreté, son aspect épuré ainsi que sa matière en crêpe, lui permettent de marquer joliment le contraste entre vos différentes cérémonies.",
    vues: 2,
    createur: "Olya Mak",
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  /* Les deux robes que la maison a fournies en dernier. Le classeur ne
   * leur donne pas de créateur — « Autre » — et les annonce pour toutes
   * les morphologies. Héra y porte deux coupes, « Trapèze, princesse » ;
   * le site n'en range qu'une par robe, et c'est la première qui la
   * décrit le mieux : la jupe part de la taille sans structure. */
  {
    slug: "hera",
    nom: "Héra",
    ligne: "Trapèze en satin, bretelles tombantes, fente",
    categorie: "Trapèze",
    regard:
      "Cette robe de mariée élégante et féminine séduit par son allure à la fois romantique, moderne et intemporelle. Son décolleté Bardot, ou épaules dénudées, met délicatement en valeur les épaules et le haut du buste. Le corsage ajusté souligne naturellement la taille et crée une silhouette harmonieuse. La jupe se distingue par une fente sur le devant, dévoilant subtilement la jambe et apportant une touche de modernité et de sensualité à cette création. Ce détail contraste avec le volume romantique de la jupe et donne à la robe une allure résolument contemporaine.",
    vues: 3,
    morphos: ["O", "A", "V", "H", "8", "X"],
  },
  {
    slug: "helene",
    nom: "Hélène",
    ligne: "Corset perlé à fleurs en relief, jupe fluide en mousseline",
    categorie: "Fluide",
    regard:
      "La robe Hélène est dotée d'un corset lumineux grâce à sa jolie dentelle ornée de petites perles et de fleurs en relief. Sa jupe fluide est confectionnée en mousseline délicate et légère afin d'assurer un maximum de confort à la mariée qui préfère dire OUI dans un look bohème chic.",
    vues: 2,
    /* La photographie de face : la première est de dos. */
    couverture: 2,
    morphos: ["O", "A", "V", "H", "8", "X"],
  }
];

export function robeParSlug(slug: string): Robe | undefined {
  return ROBES.find((r) => r.slug === slug);
}

/* ————————————————————————————————— Le parcours sur mesure ————— */

export const PARCOURS = [
  {
    n: "01",
    titre: "Le rendez-vous",
    texte:
      "Tout commence par la réservation de votre premier essayage privé. Prévoyez idéalement huit à neuf mois avant la date du mariage. Si vous disposez de moins de temps, dites-le nous : nous trouvons presque toujours une solution.",
  },
  {
    n: "02",
    titre: "L'essayage privé",
    texte:
      "Le showroom est privatisé pour vous pendant une heure. Vous pouvez venir accompagnée de votre famille ou de vos amies. Afin de préserver nos robes, nous vous demandons de venir sans maquillage — nous sommes certaines que vous êtes belle au naturel.",
  },
  {
    n: "03",
    titre: "Les mensurations",
    texte:
      "Une fois votre choix fait, nous prenons vos mensurations le jour même pour lancer la confection à l'atelier. Un acompte est versé ce jour-là.",
  },
  {
    n: "04",
    titre: "La confection",
    texte:
      "Votre robe est réalisée à vos mesures. Matières nobles, finitions à la main : le temps de l'atelier est le temps qu'il faut.",
  },
  {
    n: "05",
    titre: "Le deuxième essayage",
    texte:
      "Quand votre robe est prête, vous venez l'essayer en boutique pour vérifier s'il y a besoin d'ajustements.",
  },
  {
    n: "06",
    titre: "Les retouches",
    texte:
      "Nos couturières ajustent chaque détail, sur place. Les retouches sont incluses dans la confection sur mesure. Le solde est réglé ce jour-là.",
  },
  {
    n: "07",
    titre: "L'essayage final",
    texte:
      "Un dernier essayage valide le tombé, la longueur, l'aisance. Votre robe est exactement celle que vous aviez imaginée.",
  },
  {
    n: "08",
    titre: "Le retrait",
    texte: "Vous repartez avec votre robe, parfaitement ajustée.",
  },
] as const;

/* ——————————————————————————————————— Les silhouettes ————— */

export type Lettre = "O" | "A" | "V" | "H" | "8" | "X";

export type Morphologie = {
  lettre: Lettre;
  /* La robe qui ouvre sa page : son film s'il en existe un. Chaque
   * morphologie en reçoit un différent — le catalogue en compte sept. */
  ouverture: { robe: string; vue: number };
  nom: string;
  silhouette: string;
  objectif: string;
  coupes: string[];
  /* Ce que l'on conseille en premier. */
  premieres: Categorie[];
  /* Ce qui vaut vraiment l'essai. */
  secondes: Categorie[];
  conseil: string;
};

/*
 * Une morphologie n'exclut jamais une robe : elle ouvre des pistes.
 * Rien n'est « à éviter » — c'est un conseil de style, pas une règle.
 */
export const MORPHOLOGIES: Morphologie[] = [
  {
    lettre: "O",
    /* Héra, choisie par la maison, et sa troisième vue.
     *
     * Elle est trapèze — l'une des deux coupes que cette page conseille
     * d'abord — et sert cette morphologie. Elle a remplacé Agnessa, qui
     * remplaçait elle-même le film de Montana : celui-ci était une
     * sirène, et le premier écran disait donc le contraire du conseil.
     *
     * La vue trois, et non la première. Héra est photographiée devant
     * la tour Eiffel, ce qui va bien à une maison parisienne, mais sur
     * la première vue le titre — calé à gauche, à mi-hauteur — tombe en
     * plein sur le visage de la mariée. Sur la troisième il se pose sur
     * le parapet et la Seine floue, et la robe reste entière à droite.
     *
     * Sa source ne fait que huit cent cinquante-deux pixels de large :
     * sur un grand écran, le bandeau sera un peu tendre. C'est le prix
     * de cette photographie-là, et le voile sombre du premier écran en
     * absorbe une partie. Une source plus large la rendrait nette.
     *
     * La page n'a pas de film : aucun des huit n'est d'une coupe que le
     * O recommande en premier, et le seul trapèze filmé, Solana, ouvre
     * déjà la page du A. */
    ouverture: { robe: "hera", vue: 3 },
    nom: "Morphologie en O",
    silhouette: "Des courbes généreuses, une poitrine et un ventre marqués.",
    objectif: "Allonger la ligne et mettre la poitrine en valeur.",
    coupes: [
      "Les tombés fluides, qui glissent sans marquer.",
      "Les trapèzes, qui structurent le buste et libèrent le reste.",
      "Les décolletés en V ou en cœur.",
    ],
    premieres: ["Fluide", "Trapèze"],
    secondes: ["Princesse", "Sirène"],
    conseil:
      "Les tombés fluides et les coupes trapèze allongent joliment la ligne. Un décolleté en V ou en cœur met la poitrine en valeur.",
  },
  {
    lettre: "A",
    ouverture: { robe: "solana", vue: 1 },
    nom: "Morphologie en A",
    silhouette: "Des épaules plus étroites que les hanches, une taille bien dessinée.",
    objectif: "Ramener le regard vers le haut du corps.",
    coupes: [
      "Un bustier travaillé, riche en détails.",
      "Une jupe évasée qui équilibre les hanches.",
      "Les encolures bateau ou les bustiers droits, qui élargissent les épaules.",
    ],
    premieres: ["Princesse", "Trapèze"],
    secondes: ["Fluide", "Deux en un"],
    conseil:
      "Un bustier travaillé et une jupe évasée équilibrent les hanches. Les encolures bateau élargissent joliment les épaules.",
  },
  {
    lettre: "V",
    /* Charlotte, choisie par la maison, et sa troisième vue.
     *
     * La troisième parce que c'est la seule des quatre où le bandeau ne
     * coupe pas tout : le voile et le menton restent dans le cadre. Les
     * autres ne laissent qu'un buste.
     *
     * Deux réserves, dites à la maison avant qu'elle tranche, et
     * tranchées par elle.
     *
     * Charlotte est un trapèze, quand cette page conseille d'abord les
     * fluides et les princesses. Le trapèze est en seconde liste ici.
     *
     * Et le cadrage du bandeau, qui prend la bande médiane d'une
     * verticale, laisse la mariée sans visage sur un mur nu — là où
     * Addison, qu'elle remplace, montrait un regard et un escalier.
     *
     * La photographie, elle, est ample : trois mille deux cents pixels,
     * le bandeau sera net. */
    ouverture: { robe: "charlotte", vue: 3 },
    nom: "Morphologie en V",
    silhouette: "Des épaules larges, des hanches plus étroites.",
    objectif: "Adoucir le haut et donner du volume au bas.",
    coupes: [
      "Les jupes amples, en A ou en princesse.",
      "Les structures légères, peu construites aux épaules.",
      "Les décolletés en V, croisés ou asymétriques.",
    ],
    premieres: ["Fluide", "Princesse"],
    secondes: ["Trapèze", "Deux en un"],
    conseil:
      "Les jupes volumineuses et les décolletés en V ou croisés adoucissent la ligne des épaules.",
  },
  {
    lettre: "H",
    ouverture: { robe: "ariel", vue: 1 },
    nom: "Morphologie en H",
    silhouette: "Une ligne droite, une taille peu marquée.",
    objectif: "Créer de la courbe, sans la forcer.",
    coupes: [
      "Les modèles cintrés à la taille, ou portés avec une ceinture.",
      "Les sirènes légères, qui dessinent sans serrer.",
      "Les coupes empire, qui allongent.",
    ],
    premieres: ["Fluide", "Sirène"],
    secondes: ["Trapèze", "Princesse"],
    conseil:
      "Les modèles cintrés à la taille et les sirènes légères dessinent des courbes tout en allongeant la ligne.",
  },
  {
    lettre: "8",
    /* Le film de Seraphina, envoyé par la maison pour sa page. */
    ouverture: { robe: "seraphina", vue: 1 },
    nom: "Morphologie en 8",
    silhouette: "Des épaules et des hanches équilibrées, une taille marquée.",
    objectif: "Sublimer une harmonie qui existe déjà.",
    coupes: [
      "Toutes les coupes, sans exception : c'est le style du mariage qui tranchera.",
      "Les sirènes et les fourreaux, qui épousent la ligne.",
      "Les bustiers cœur et les encolures en V.",
    ],
    /* Les cinq coupes, et aucune en second.
     *
     * La page n'en conseillait que deux, et rangeait les trois autres
     * sous « également intéressantes à essayer » — une réserve que cette
     * morphologie ne mérite pas. La maison l'a corrigé : au 8, tout va.
     *
     * « secondes » reste vide, et les deux niveaux du bas tombent
     * d'eux-mêmes — ils sont filtrés quand ils n'ont aucune robe. La
     * page ne garde qu'une liste, ce qui est le propos. */
    premieres: ["Sirène", "Fluide", "Trapèze", "Princesse", "Deux en un"],
    secondes: [],
    conseil:
      "Toutes les coupes conviennent : les sirènes et les fourreaux épousent les courbes, et tout ce qui se cintre à la taille accentue l'équilibre naturel.",
  },
  {
    lettre: "X",
    ouverture: { robe: "meredith", vue: 1 },
    nom: "Morphologie en X",
    silhouette: "Des proportions équilibrées, des courbes douces, une taille fine.",
    objectif: "Valoriser sans en faire trop.",
    coupes: [
      "Bonne nouvelle : toutes les coupes vous vont.",
      "Princesse, sirène, fluide, trapèze ou deux-en-un — laissez le style du mariage décider.",
    ],
    /* Les cinq coupes, comme au 8.
     *
     * La page se contredisait : son texte annonçait « presque toutes
     * les coupes vous vont » et n'en montrait que trois, les deux
     * autres rangées sous « également intéressantes à essayer ». La
     * maison a tranché : toutes, et le « presque » tombe avec. */
    premieres: ["Sirène", "Princesse", "Fluide", "Trapèze", "Deux en un"],
    secondes: [],
    conseil:
      "Bonne nouvelle : toutes les coupes vous vont. Laissez le style de votre mariage guider le choix.",
  },
];

/* L'adresse d'une morphologie : sa lettre, en minuscule. */
export function morphologieParSlug(slug: string): Morphologie | undefined {
  return MORPHOLOGIES.find((m) => m.lettre === slug.toUpperCase());
}

/*
 * Les maisons que l'accueil nomme.
 *
 * La boutique travaille aussi de petits ateliers qu'elle a mis des
 * années à trouver. Les nommer en vitrine, c'est les désigner à la
 * concurrence : leurs robes restent au catalogue, mais l'accueil les
 * réunit sous « Autres créateurs ».
 *
 * La liste est une donnée, pas une règle de tri : elle se change ici,
 * et nulle part ailleurs.
 */
export const MAISONS_EN_VEDETTE = [
  "casablanca-bridal",
  "watters-designs",
  "monica-loretti",
  "olya-mak",
];

export const estEnVedette = (slug: string) => MAISONS_EN_VEDETTE.includes(slug);

export function morphologie(lettre: string): Morphologie | undefined {
  return MORPHOLOGIES.find((m) => m.lettre === lettre);
}

export type Suggestion = { titre: string; intro: string; robes: Robe[] };

/* Trois familles, jamais un verdict. */
export function suggerer(lettre: string): Suggestion[] {
  const m = morphologie(lettre);
  if (!m) return [];

  const premieres = ROBES.filter((r) => m.premieres.includes(r.categorie));
  const secondes = ROBES.filter((r) => m.secondes.includes(r.categorie));
  const reste = ROBES.filter(
    (r) => !m.premieres.includes(r.categorie) && !m.secondes.includes(r.categorie)
  );

  return [
    {
      titre: "Nos recommandations",
      intro: "Les coupes qui peuvent particulièrement vous mettre en valeur.",
      robes: premieres.slice(0, 6),
    },
    {
      titre: "Vous pourriez aussi aimer",
      intro: "D'autres modèles à essayer, selon vos envies et le style du mariage.",
      robes: secondes.slice(0, 4),
    },
    {
      titre: "À découvrir",
      intro: "Le reste de la sélection. En boutique, tout se tente.",
      robes: reste.slice(0, 4),
    },
  ].filter((s) => s.robes.length > 0);
}

/*
 * Ce qu'une maison peut offrir à une morphologie.
 *
 * « premieres » : ses robes dans les coupes que l'on conseille d'abord.
 * « secondes » : celles qui valent l'essai. Une maison qui n'a ni l'une
 * ni l'autre n'est pas cachée — elle est simplement dernière au
 * classement, et on le dit.
 */
export type OffreMaison = {
  createur: Createur;
  premieres: Robe[];
  secondes: Robe[];
};

export function offreMaison(nom: string, lettre: string): OffreMaison | undefined {
  const createur = CREATEURS.find((c) => c.nom === nom);
  const m = morphologie(lettre);
  if (!createur || !m) return undefined;
  const siennes = robesDe(nom);
  return {
    createur,
    premieres: siennes.filter((r) => m.premieres.includes(r.categorie)),
    secondes: siennes.filter((r) => m.secondes.includes(r.categorie)),
  };
}

/*
 * Les maisons classées par ce qu'elles savent offrir à cette morphologie.
 *
 * D'abord le nombre de robes dans les coupes conseillées en premier,
 * ensuite celles qui valent l'essai. À égalité, l'ordre du catalogue —
 * jamais l'alphabet, qui avantagerait toujours les mêmes.
 */
export function maisonsPour(lettre: string): OffreMaison[] {
  return CREATEURS.map((c) => offreMaison(c.nom, lettre))
    .filter((o): o is OffreMaison => Boolean(o))
    .sort((x, y) => y.premieres.length - x.premieres.length || y.secondes.length - x.secondes.length);
}

/* ————————————————————————————————————————————— La FAQ ————— */

export const FAQ = [
  {
    q: "Combien de temps prévoir avant le mariage ?",
    r: "Prévoyez votre rendez-vous d'essayage idéalement huit à neuf mois avant la date du mariage. Pas de panique si vous disposez de moins de temps : nous pourrons toujours vous proposer des solutions. Prenez simplement rendez-vous, nous nous occupons du reste.",
  },
  {
    q: "Comment se passent les essayages au showroom ?",
    r: "Dès que vous avez pris rendez-vous, le showroom est privatisé pour vous pendant une heure. Vous pouvez venir accompagnée de votre famille ou de vos amies. Afin de mieux préserver nos robes de mariée, merci de vous présenter sans maquillage : nous sommes certaines que vous êtes belle au naturel.",
  },
  {
    q: "Quelles sont les étapes d'une confection sur mesure ?",
    r: "La première étape est la prise de votre premier rendez-vous d'essayage. Une fois l'essayage terminé et votre choix réalisé, nous prenons le jour même vos mensurations pour initier la confection à l'atelier. Quand votre robe est prête, vous venez l'essayer en boutique pour vérifier s'il y a besoin d'ajustement. Si oui, un rendez-vous retouches est prévu avec une de nos couturières sur place. Enfin, vous retirez votre robe après l'essayage final.",
  },
  {
    q: "Comment se passe le paiement ?",
    r: "Un acompte est payé le jour de la prise des mensurations. Le solde restant est payé le jour des retouches.",
  },
  {
    q: "Quelle est la fourchette de prix pour une robe sur mesure ?",
    r: "Pour une confection sur mesure, les prix commencent à partir de 1 500 €. Nous vous invitons à nous contacter directement pour avoir plus de précisions sur les modèles qui vous intéressent.",
    /* Sur le site, oui ; chez Élise, non. La maison ne veut pas
     * qu'une conseillère automatique parle d'argent. */
    horsElise: true,
  },
  {
    q: "Puis-je venir accompagnée ?",
    r: "Oui, et c'est même conseillé. Le showroom est privatisé : votre famille et vos amies sont les bienvenues pendant toute la durée de l'essayage.",
  },
  {
    q: "Où se trouve le showroom MADAMOON ?",
    r: `Au ${MAISON.adresse}, ${MAISON.codePostal} ${MAISON.ville}. Les essayages ont lieu sur rendez-vous uniquement : lundi de 12h à 21h, du mardi au samedi de 10h à 19h.`,
  },

  /*
   * Les questions ajoutées en octobre 2026, à la demande de la maison.
   *
   * Elles reprennent ce que les mariées tapent dans un moteur. Leurs
   * réponses s'en tiennent à ce que le site sait déjà — le parcours, les
   * coupes, les morphologies, le catalogue — et disent franchement ce qui
   * se règle avec la boutique : la durée des retouches, une robe achetée
   * ailleurs. Deux d'entre elles touchent au calendrier, comme la
   * première : chacune y répond sous un angle différent, pour ne pas
   * redire trois fois la même chose.
   */
  {
    q: "Comment choisir sa robe de mariée selon sa morphologie ?",
    r: "Partez de votre silhouette : les coupes fluides et trapèze allongent une morphologie en O, les princesses et les trapèzes équilibrent une morphologie en A, les sirènes légères dessinent des courbes sur une morphologie en H. Pour une silhouette en 8 ou en X, toutes les coupes conviennent. Ce sont des pistes, pas des règles : l'essayage tranche.",
  },
  {
    q: "Combien de temps avant le mariage essayer sa robe ?",
    r: "Le premier essayage se fait idéalement huit à neuf mois avant le mariage. Vous essayez ensuite votre robe une deuxième fois quand elle est prête, puis une dernière fois après les retouches, avant de la retirer.",
  },
  {
    q: "Combien de temps pour les retouches d'une robe de mariée ?",
    r: "Les retouches viennent après le deuxième essayage, une fois votre robe confectionnée. Elles sont faites sur place par nos couturières, et incluses dans la confection sur mesure. Leur durée dépend de la robe et des ajustements : le calendrier se fixe avec la boutique.",
  },
  {
    q: "Combien d'essayages prévoir pour une robe de mariée ?",
    r: "Comptez trois essayages : le premier pour choisir votre robe, un deuxième quand elle est prête, et un essayage final qui valide le tombé, la longueur et l'aisance. S'il faut ajuster, un rendez-vous de retouches s'ajoute entre les deux derniers.",
  },
  {
    q: "Faut-il un rendez-vous pour essayer une robe de mariée ?",
    r: "Oui. Le showroom MADAMOON reçoit sur rendez-vous uniquement, parce qu'il est privatisé pour chaque mariée pendant une heure. Le rendez-vous se prend en ligne, en quelques clics, ou par téléphone.",
  },
  {
    q: "Quelle robe de mariée pour un mariage en hiver ?",
    r: "Pensez aux manches longues, au col montant et aux matières qui ont de la tenue — mikado, satin, crêpe —, ou à une cape qui couvre les épaules. Plusieurs robes de la boutique ont des manches longues ou amovibles : Seraphina, Montana, Bella, Pendant ou Aster.",
  },
  {
    q: "Qui emmener à l'essayage de sa robe de mariée ?",
    r: "Celles dont l'avis compte vraiment pour vous et qui vous aident à voir clair : une mère, une sœur, une amie qui vous connaît bien. Le showroom étant privatisé, vos proches sont les bienvenues pendant tout l'essayage.",
  },
  {
    q: "Quand commencer à chercher sa robe de mariée ?",
    r: "Dès que la date est fixée, commencez à repérer les coupes et les robes qui vous plaisent. L'essayage en boutique, lui, se prévoit idéalement huit à neuf mois avant le mariage : arriver avec quelques coups de cœur rend ce premier rendez-vous plus efficace.",
  },
  {
    q: "Combien de robes essayer avant de se décider ?",
    r: "Il n'y a pas de bon nombre. Quelques robes bien choisies, dans des coupes différentes, valent mieux qu'une longue série : l'heure d'essayage sert à vous mener jusqu'à celle dans laquelle vous vous reconnaissez.",
  },
  {
    q: "Robe sur mesure ou prêt-à-porter : quelle différence ?",
    r: "Une robe de prêt-à-porter existe en tailles standard, puis se retouche. Une robe sur mesure est confectionnée selon vos mensurations. Chez MADAMOON, les robes sont réalisées à l'atelier sur mesure — en semi-mesure pour Watters Designs —, retouches incluses.",
  },
  {
    q: "Comment entretenir une robe de mariée en dentelle ?",
    r: "Avant le mariage, gardez-la dans une housse en tissu respirant, sur un cintre large, à l'abri de la lumière. Après, confiez-la à un pressing spécialisé dans les robes de mariée plutôt que de la laver vous-même : la dentelle se déforme et se marque facilement.",
  },
  {
    q: "Que porter sous une robe de mariée sirène ?",
    r: "Une lingerie sans coutures, couleur chair, qui ne marque pas : la sirène épouse la silhouette jusqu'aux genoux. Choisissez-la selon le décolleté et le dos de la robe, et portez-la dès le deuxième essayage, pour que la robe s'ajuste avec.",
  },
  {
    q: "Peut-on retoucher une robe de mariée achetée en ligne ?",
    r: "Le plus souvent, oui, chez une couturière habituée aux robes de mariée — tout dépend de la coupe, de la matière et de l'écart avec vos mesures. Chez MADAMOON, les retouches sont comprises pour les robes confectionnées par la boutique ; pour une robe achetée ailleurs, renseignez-vous directement auprès d'elle.",
  },

  /*
   * Les questions de l'essayage, ajoutées ensuite.
   *
   * Elles croisent celles du déroulement, de l'accompagnement et du
   * nombre de robes : chacune répond à ce que la mariée tape, et renvoie
   * aux autres pour le reste. Ce que le site ne dit pas — ce qu'on peut
   * photographier en cabine, le nombre de robes par rendez-vous — n'y est
   * pas écrit.
   */
  {
    q: "Où essayer une robe de mariée à Paris ?",
    r: `Au showroom MADAMOON, ${MAISON.adresse}, dans le 10e arrondissement. Les essayages ont lieu sur rendez-vous, dans un showroom privatisé pour vous pendant une heure, parmi les robes de Casablanca Bridal, Watters Designs, Monica Loretti et Olya Mak.`,
  },
  {
    q: "Que faut-il apporter à son premier essayage de robe de mariée ?",
    r: "Venez sans maquillage, pour préserver les robes, et avec les personnes dont l'avis compte pour vous. Un conseil : apportez aussi des chaussures à la hauteur de talon envisagée, une lingerie couleur chair sans coutures, et quelques images des robes qui vous plaisent.",
  },
  {
    q: "Peut-on essayer plusieurs coupes de robes de mariée lors du même rendez-vous ?",
    r: "Oui, et c'est même conseillé : quelques robes bien choisies, dans des coupes différentes, vous apprennent vite ce qui vous va. Le showroom étant privatisé pendant une heure, vous pouvez comparer une sirène, une princesse ou une fluide sans vous presser.",
  },
  {
    q: "Comment préparer son rendez-vous pour choisir une robe de mariée à Paris ?",
    r: "Prenez rendez-vous idéalement huit à neuf mois avant le mariage, en ligne ou par téléphone. Repérez quelques coupes et robes qui vous plaisent, pensez à votre morphologie et au style du mariage, choisissez qui vous accompagne, et venez sans maquillage.",
  },
  {
    q: "Que faire si l'on hésite entre plusieurs robes de mariée après l'essayage ?",
    r: "Prenez le temps de comparer : notez ce qui vous plaît dans chacune, écartez celle qui vous convainc le moins, et demandez-vous dans laquelle vous vous reconnaissez. Un nouveau rendez-vous permet de réessayer vos finalistes. Gardez un œil sur le calendrier : la confection commence une fois votre choix fait.",
  },
] as const;

/* ————————————————————————————————— Élise, conseillère ————— */

export const AI_ENDPOINT =
  "https://pfbyviktmtjnexvodehg.supabase.co/functions/v1/conseillere-madamoon";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmYnl2aWt0bXRqbmV4dm9kZWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NzY4OTYsImV4cCI6MjA5ODI1Mjg5Nn0.IZ0bCe7DuOmCXt1e2CQQQUelsjE4NI3njRV9eN-OKtw";
