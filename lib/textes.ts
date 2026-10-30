import type { Langue } from "@/lib/langue";

/*
 * Les mots de l'interface, dans les deux langues.
 *
 * Les deux colonnes se lisent l'une en face de l'autre : c'est ainsi
 * qu'on voit qu'une phrase a dérivé. Le type est celui du français —
 * une clé ajoutée d'un côté manque de l'autre à la compilation, et non
 * en production.
 *
 * L'anglais garde le registre du français : des phrases courtes, du
 * concret, aucune promesse. « Le satin, la ligne, rien d'autre » ne
 * devient pas « Timeless elegance redefined ». Le vocabulaire du métier,
 * en revanche, est celui de la langue d'arrivée : une mariée
 * anglophone cherche une « mermaid », jamais une « sirène ».
 */

const FR = {
  barre: {
    menu: "Menu",
    fermer: "Fermer",
    principale: "Principale",
    accueil: "MADAMOON, accueil",
    rendezvous: "Rendez-vous",
    robes: "Robes de mariée",
    coupes: "Coupes",
    morphologies: "Morphologies",
    showroom: "Showroom",
    maison: "À propos",
    catalogue: "Le catalogue",
    sections: "Les sections",
    classer: "Classer les robes",
    parCreateur: "Par créateur",
    parCoupe: "Par coupe",
    parMaison: "Par maison",
    autresModeles: "Autres modèles",
    toutesRobes: "Toutes les robes",
    catalogueEntier: "Le catalogue entier",
    sixCoupes: "Les coupes",
    sixMorphologies: "Les morphologies",
    filtrerParCreateur: "Filtrer par créateur",
    voirLaMaison: (nom: string) => `Voir la page ${nom}`,
  },
  raccourcis: {
    toutesRobes: "Toutes les robes",
    lesCoupes: "Les coupes",
    lesMorphologies: "Les morphologies",
    trouverMaRobe: "Trouver ma robe",
    leShowroom: "Le showroom",
    laMaison: "À propos",
    lesQuestions: "FAQ",
    lesGuides: "Guides",
    prendreRendezvous: "Prendre rendez-vous",
  },
  /* Les barreaux du fil d'Ariane, celui que les moteurs lisent dans le
   * balisage et affichent au-dessus du titre du résultat, à la place de
   * l'adresse brute. Ils reprennent les mots de la barre — un résultat
   * de recherche ne doit pas nommer les rubriques autrement que le
   * site. */
  ariane: {
    accueil: "Accueil",
    createurs: "Créateurs",
  },
  hero: {
    titre: "Vous vous mariez bientôt ?",
    accroche: "Robes de mariée, essayage privé — Paris 10",
    trouverMaRobe: "Trouver ma robe",
    prendreRendezvous: "Prendre rendez-vous",
    alt: "Une mariée en robe de dentelle",
    pause: "Mettre la vidéo en pause",
    reprendre: "Reprendre la vidéo",
  },
  bandeau: {
    essayage: "Essayage privé",
    surMesure: "Confection sur mesure",
    retouches: "Retouches incluses",
    aPartirDe: "À partir de",
  },
  /* L'introduction de l'accueil, avant les morphologies : qui est la
   * maison, où elle se trouve, ce qu'on y vit. Demandée par la
   * boutique — on entrait dans la silhouette sans savoir où l'on
   * était. Le texte est celui de Mouna, mot pour mot.
   *
   * Il est découpé en morceaux parce que trois passages sont mis en
   * exergue et qu'un d'eux porte un exposant. Un morceau sans « fort »
   * est du texte courant ; « exposant » et « apres » servent à tenir un
   * exposant au milieu d'un passage en exergue, pour que le trait du
   * soulignement ne se coupe pas en deux. */
  introMaison: {
    /* Le nom se détache du titre : il est écrit à l'anglaise, et une
     * anglaise ne s'écrit pas en capitales — ses majuscules ouvrent un
     * mot, elles ne se suivent pas. D'où « Madamoon ». */
    titreAvant: "L’expérience ",
    nom: "Madamoon",
    /* Espace fine insécable avant le point d'interrogation : le morceau
     * commence par elle, et « typographie() » ne peut pas la poser
     * puisque ce qui précède est dans une autre balise. */
    titreApres: "\u202f?",
    paragraphes: [
      [
        { texte: "Chez MADAMOON, chaque essayage commence par un véritable " },
        { texte: "échange", fort: true },
        {
          texte:
            ". Nous prenons le temps de découvrir votre personnalité, vos envies, vos goûts, ainsi que l’univers de votre mariage : thème, ambiance, lieu et architecture. Ces précieux échanges nous permettent de vous conseiller des robes de mariée adaptées à ",
        },
        {
          texte: "votre morphologie, à votre personnalité et à l’esprit de votre mariage",
          fort: true,
        },
        { texte: "." },
      ],
      [
        /* Le rouge ne tient plus que l'écrin du XIXᵉ siècle : sur toute la
         * proposition, il chargeait le paragraphe. La maison l'a voulu
         * plus léger, et c'est le lieu qu'on retient. */
        { texte: "De plus, notre boutique, nichée dans " },
        {
          texte: "un élégant écrin du XIX",
          exposant: "e",
          apres: " siècle",
          fort: true,
        },
        {
          texte:
            ", vous offre un cadre véritablement hors du temps, pensé pour faire de votre essayage de robe de mariée une expérience unique et mémorable, à partager avec vos proches !",
        },
      ],
    ],
    lien: "Découvrir notre histoire",
  },
  /* La rangée de robes de l'accueil. La sélection elle-même est dans le
   * composant : ce sont des identifiants, pas des mots. */
  robesAccueil: {
    legende: "Les robes",
    titre: "Quelques robes, pour commencer.",
    voirTout: "Voir toutes les robes",
    voirPlus: "Voir plus",
    rangee: "Une sélection de robes",
    precedentes: "Voir les robes précédentes",
    suivantes: "Voir les robes suivantes",
  },
  silhouette: {
    legende: "Les morphologies",
    titre: "Avant la robe, la morphologie.",
    texte:
      "Plusieurs morphologies, et pour chacune les coupes de robes de mariée qui allongent, équilibrent ou révèlent la silhouette.",
    mention:
      "Une morphologie n’exclut jamais une robe : elle ouvre des pistes. Rien n’est « à éviter » — c’est un conseil de style, pas une règle, et au showroom on essaie aussi ce qui n’était pas prévu.",
    lien: "Toutes les morphologies",
    precedentes: "Voir les morphologies précédentes",
    suivantes: "Voir les morphologies suivantes",
  },
  coupes: {
    legende: "Les coupes",
    titre: "Trouvez la coupe qui vous va.",
    texte: "La coupe, c’est la forme de la robe.",
    lien: "Toutes les coupes",
    presentee: "Coupe présentée",
    les: "Les",
  },
  createurs: {
    legende: "Les créateurs",
    titre: "Plusieurs maisons. Aucune par hasard.",
    /* La phrase est écrite, non composée à partir des maisons montrées :
     * leur nombre change avec les collections, et la ligne n'a pas à
     * être reprise chaque fois. */
    lieux:
      "Biarritz, Newport Beach, Rome, Dallas, Lviv, Barcelone — les plus belles robes des collections nuptiales, choisies une par une pour vous.",
    autres: "Autres créateurs",
    /* Pas « trouvés un par un » : la phrase au-dessus dit déjà
     * « choisies une par une », et les deux se suivaient à l'écran. Ce
     * sont les mots de la page du collectif, qui disent la même chose
     * autrement. */
    autresNote: "De petits ateliers indépendants, avec des modèles exclusifs.",
    precedentes: "Voir les maisons précédentes",
    suivantes: "Voir les maisons suivantes",
  },
  avis: {
    legende: "Ce qu’elles en disent",
    /* Ni le nombre d'avis ni le rang dans l'arrondissement : la maison
     * ne veut pas d'un chiffre qu'il faut tenir à jour, ni d'une
     * comparaison. La note reste, le décompte passe dans les données
     * structurées — invisible à la lecture, lu par Google. */
    /* Le nom se détache du reste de la phrase, comme sur l'intro de
     * l'accueil : il est écrit à l'anglaise, et une anglaise ne s'écrit
     * pas en capitales — ses majuscules ouvrent un mot, elles ne se
     * suivent pas. D'où « Madamoon » et non « MADAMOON ». La suite
     * commence donc par une espace : elle continue le nom. */
    nom: "Madamoon",
    experience: " n’est pas une simple boutique à visiter, c’est une expérience à vivre.",
    lesAvis: "Voir les avis Google",
  },
  showroom: {
    legende: "Le showroom — Paris 10",
    titre: "Poussez la porte",
    texte: "Une heure, le showroom pour vous seule, et quelqu’un qui connaît chaque robe.",
    lien: "Découvrir le showroom",
    alt: "L’entrée du showroom MADAMOON, rue du Faubourg Saint-Martin",
  },
  panier: {
    vide: "Vos coups de cœur, vide pour l’instant",
    pleinUn: "Vos coups de cœur, 1 robe",
    plein: (n: number) => `Vos coups de cœur, ${n} robes`,
    ajouter: (nom: string) => `Ajouter ${nom} aux coups de cœur`,
    retirer: (nom: string) => `Retirer ${nom} des coups de cœur`,
    dedans: (nom: string) => `${nom} est dans vos coups de cœur`,
    coupDeCoeur: "Coup de cœur",
    dansLesVotres: "Dans vos coups de cœur",
  },
  carte: {
    legende: "Votre essayage privé",
    bouton: "Prendre rendez-vous",
  },
  gabarit: {
    allerAuContenu: "Aller au contenu",
  },
  theme: {
    versSombre: "Passer en mode sombre",
    versClair: "Revenir en mode clair",
    intitule: "Apparence",
    sombre: "Sombre",
    clair: "Clair",
  },
  fiche: {
    autresVues: (nom: string) => `Autres vues de ${nom}`,
    /* La visionneuse. Les commandes n'ont que des dessins : leur nom
     * n'existe que pour les lecteurs d'écran, et doit donc dire ce que
     * fait le bouton, pas ce qu'il montre. */
    agrandir: "Agrandir la photographie",
    fermerVue: "Fermer",
    vuePrecedente: "Photographie précédente",
    vueSuivante: "Photographie suivante",
    rangDeLaVue: (i: number, n: number) => `${i} sur ${n}`,
    vuesDe: (nom: string) => `Photographies de ${nom}`,
    laFiche: "La fiche",
    silhouettes: "Les morphologies qu’elle sublime",
    coupe: "La coupe",
    style: "Le style",
    maison: "La maison",
    confection: "La confection",
    surMesure: "Sur mesure, retouches incluses",
    /* Watters Designs travaille en demi-mesure : la robe se décline sur
     * un patron de la maison, puis s'ajuste. Le dire, plutôt que de
     * laisser croire au sur-mesure des autres. */
    semiMesure: "Semi-mesure, retouches incluses",
    aPartirDe: "À partir de",
    essayer: "L’essayer au showroom",
    memeFamille: "Dans la même famille",
    toutesLes: (pluriel: string) => `Toutes les ${pluriel}`,
    toutesSilhouettes:
      "Elle va à toutes les morphologies — c’est rare, et c’est ce qui en fait une valeur sûre à l’essayage.",
    silhouettesServies: (lettres: string) =>
      `Elle est d’abord conseillée aux morphologies ${lettres}. Rien n’empêche de l’essayer autrement : une morphologie ouvre des pistes, elle n’en ferme aucune.`,
  },
  elise: {
    dialogue: "Élise, conseillère MADAMOON",
    vous: "Vous",
    conseillere: "Conseillère — MADAMOON",
    ecrit: "Élise écrit",
    champ: "Écrivez à Élise…",
    champLabel: "Votre message pour Élise",
    envoyer: "Envoyer",
    /* La mention reste sous les yeux pendant toute la conversation, et
     * non au seul premier message : on la lirait une fois, au moment où
     * l'on n'a encore rien demandé. « Élise » est un prénom, et le mot
     * « conseillère » laisse croire à une personne — c'est précisément
     * pour cela qu'il faut le dire, et le dire en toutes lettres. */
    avertissement:
      "Élise est une intelligence artificielle. Elle peut se tromper : pour une réponse sûre, appelez la boutique.",

    trouverMaCoupe: "Trouver ma coupe",
    prendreRendezvous: "Prendre rendez-vous",
    questionsPratiques: "Questions pratiques",
    appeler: "Appeler la boutique",
    appelerCourt: "Appeler",
    ecrireCourt: "Écrire",
    voirShowroom: "Voir le showroom",
    voirCatalogue: "Voir le catalogue",
    lancerDiagnostic: "Lancer le diagnostic",
    voirRecommandations: "Voir mes recommandations",
    refaireDiagnostic: "Refaire le diagnostic",
    autresMaisons: "Voir les autres maisons",
    touteLaSelection: "Toute la sélection",
    autreQuestion: "Autre question",
    ouiJeLaConnais: "Oui, je la connais",
    guidezMoi: "Guidez-moi",
    plusEtroites: "Plus étroites",
    plusLarges: "Plus larges",
    alignees: "Alignées",
    courbesGenereuses: "Courbes généreuses",
    ouiBienMarquee: "Oui, bien marquée",
    peuMarquee: "Peu marquée",
    prononcees: "Prononcées",
    doucesFine: "Douces, ligne fine",

    bonjour:
      "Bonjour, je suis Élise, conseillère chez MADAMOON. Trouver la robe d’une vie, c’est mon métier — et ma plus grande joie.",
    invitation:
      "Parlez-moi de votre mariage, posez-moi vos questions, ou laissez-vous guider.",
    essentiel:
      "L’essentiel est de trouver la robe qui met en valeur votre morphologie tout en vous ressemblant.",
    connaissezMorpho: "Connaissez-vous déjà votre morphologie ?",
    laquelle: "Très bien. Laquelle est la vôtre ?",
    pasAPas: "Je vous guide pas à pas.",
    epaulesHanches: "Comment décririez-vous vos épaules par rapport à vos hanches ?",
    tailleMarquee: "Et votre taille, est-elle marquée ?",
    derniereQuestion: "Dernière question : vos courbes sont plutôt…",
    pistes:
      "Ce sont des pistes, jamais des règles : en boutique, on essaie aussi ce qui n’était pas prévu. Voulez-vous voir la sélection correspondante ?",
    rdvPrivatise:
      "Avec plaisir. Le showroom est entièrement privatisé pour vous pendant une heure — venez accompagnée de vos proches.",
    faqIntro: "Bien sûr. Que souhaitez-vous savoir ? Vous pouvez aussi m’écrire librement.",
    dansVosCoupes: "dans vos coupes",
    aEssayer: "à essayer",
    nosRecommandations: "Nos recommandations",
    /* Le deux-points de la version lue à voix haute : insécable en
     * français, collé en anglais. */
    recommandationsPlat: "Nos recommandations\u00a0:",
    lObjectif: "L’objectif :",
    dansLOrdre: "Dans l’ordre",
    lettreLabel: (lettre: string) => `En ${lettre}`,
    chezMaison: (nom: string) => `Chez ${nom}`,
    toutesLesRobes: (nom: string) => `Toutes les robes ${nom}`,
    voirMaison: (nom: string) => `Voir ${nom}`,
    vousRegardez: (nom: string) =>
      `Vous regardez ${nom}. Je pars de votre morphologie, et je vous dis franchement si la réponse est ailleurs.`,
    voiciCeQui: (nom: string, liste: string) =>
      `Chez ${nom}, voici ce qui vous correspond : ${liste}.`,
    pasLesCoupes: (nom: string, liste: string) =>
      `${nom} ne travaille pas les coupes que je vous conseillerais en premier. Les maisons qui les ont, dans l’ordre : ${liste}.`,
    franche: (nom: string) =>
      `Je préfère être franche : ${nom} ne travaille pas les coupes que je vous conseillerais en premier.`,
    saufQue: (combien: number): string =>
      combien === 0
        ? " Voici les maisons faites pour vous."
        : combien === 1
          ? " Son autre robe vaut l’essai, mais voici d’abord les maisons faites pour vous."
          : " Ses autres robes valent l’essai, mais voici d’abord les maisons faites pour vous.",
    lesMaisonsPour: (liste: string) => `Les maisons pour cette morphologie : ${liste}.`,

    localRdv: (adresse: string, cp: string) =>
      `Avec plaisir. Le showroom est privatisé pour vous pendant une heure, sur rendez-vous uniquement : lundi 12h–21h, du mardi au samedi 10h–19h, au ${adresse}, Paris ${cp}.`,
    /* Élise ne chiffre rien, et le dit sans détour. Une conseillère qui
     * donne un prix sans avoir vu la robe engage la maison sur une
     * somme qu'elle n'a pas décidée ; et un prix annoncé par une
     * machine se retient comme une promesse. Elle renvoie donc à ce
     * qu'elle sait faire, puis à la boutique. */
    localPrix: () =>
      `Je ne renseigne pas les prix — c’est la boutique qui en parle, et de vive voix. En revanche je peux vous aider sur votre morphologie, les coupes qui vous iront et le déroulé d’un essayage.`,
    localHoraires: (adresse: string, cp: string, ville: string) =>
      `Le showroom vous reçoit sur rendez-vous uniquement : lundi de 12h à 21h, du mardi au samedi de 10h à 19h — ${adresse}, ${cp} ${ville}.`,
    localCreateurs: (liste: string) =>
      `Nos robes sont choisies chez ${liste}, avec un service de confection sur mesure.`,
    localDiagnostic:
      "Chaque femme est unique. Le plus simple est un petit diagnostic ensemble, pour identifier les coupes qui vous mettront en valeur. On commence ?",
    localMerci:
      "Avec grand plaisir. Je reste à votre écoute, et au plaisir de vous accueillir au showroom.",
    /* Ce qu'elle propose quand elle n'a pas compris. Les prix en sont
     * sortis : les annoncer ici revenait à promettre ce qu'elle refuse
     * deux lignes plus haut. */
    localDefaut:
      "Je préfère vous répondre précisément plutôt que de m’avancer. Le mieux est d’en parler de vive voix avec la boutique — ou je peux vous guider ici sur votre morphologie, les coupes qui vous iront et la prise de rendez-vous.",
  },
  pages: {
    coupes: {
      titre: "Les coupes",
      intro:
        "La coupe n’est pas une règle : c’est le premier tri, celui qui fait gagner une heure d’essayage.",
    },
    /* La page des créateurs. La boutique n'est pas un créateur : elle le
     * dit, et la page présente ceux dont elle fait essayer les robes. */
    createurs: {
      titre: "Robes de mariée de créateurs à Paris",
      intro:
        "MADAMOON n'édite pas ses propres collections : la boutique choisit, robe par robe, chez plusieurs créateurs, puis fait confectionner et ajuster la vôtre à l'atelier. Toutes s'essaient à Paris, dans notre showroom du 10ᵉ, sur rendez-vous.",
      lesMaisons: "Les maisons",
    },
    morphologies: {
      titre: "Les morphologies",
      toutesLesCoupes: "Toutes les coupes",
      intro:
        "Une morphologie n’exclut jamais une robe : elle ouvre des pistes. Rien n’est « à éviter » — c’est un conseil de style, pas une règle, et au showroom on essaie aussi ce qui n’était pas prévu.",
      guide: "Vous ne savez pas laquelle est la vôtre ? Élise vous guide en trois questions.",
    },
    coupe: {
      nos: (pluriel: string, maison: string) => `Nos ${pluriel} ${maison}`,
      nosAutres: (pluriel: string) => `Nos autres ${pluriel}`,
      lesNotres: (pluriel: string) => `Nos ${pluriel}`,
      laMaison: "La maison",
      /* Devant le nom de la coupe, dans le titre. */
      prefixe: "Robe de mariée",
      aQuiElleVa: "À qui cette coupe va",
      toutesLesMorphologies: "Toutes les morphologies",
      pistes: (coupe: string) =>
        `Une morphologie n’exclut jamais une robe : elle ouvre des pistes. La ${coupe} est celle que l’on conseille d’abord à ces morphologies — les autres l’essaient tout aussi bien en boutique.`,
    },
    maison: {
      lesRobesDe: (nom: string) => `Les robes ${nom}`,
      voirToutesLesRobes: "Voir toutes les robes",
      sesCoupes: "Ses coupes",
      toutesLesCoupes: "Toutes les coupes",
      travaille:
        "Chaque image est prise sur l’une des robes de cette maison, jamais sur celle d’une autre.",
      aQuiCesCoupesVont: "À qui ces coupes vont",
      toutesLesMorphologies: "Toutes les morphologies",
      pistes: (dela: string) =>
        `Une morphologie n’exclut jamais une robe : elle ouvre des pistes. Voici celles que les coupes ${dela} servent en premier — les autres s’essaient tout aussi bien en boutique.`,
      trouverMaRobeDe: (nom: string) => `Trouver ma robe ${nom}`,
    },
    morpho: {
      reconnaitre: (lettre: string) => `Reconnaître une morphologie en ${lettre}`,
      lesProportions: "Les proportions",
      pasExacte:
        "Une morphologie ne se lit pas dans un miroir en trente secondes, et elle n’a pas à être exacte : c’est un point de départ pour savoir quoi essayer en premier. Si vous hésitez entre deux,",
      eliseVousGuide: "Élise vous guide",
      enTroisQuestions: " en trois questions.",
      lesCoupes: "Les coupes qui vous mettent en valeur",
      voir: "Voir",
      toutesNosRobes: (coupe: string) => `Toutes nos robes ${coupe}`,
      toutesLesCoupes: "Toutes les coupes",
      voiciPourquoi:
        "Voici pourquoi ces lignes fonctionnent, et ce qu’elles font réellement une fois la robe enfilée.",
      decouvrez: (apposition: string, lettre: string) =>
        `Découvrez nos robes de mariée ${apposition} adaptées à une morphologie en ${lettre}`,
      ouDirectement: " — ou allez directement à ",
      et: " et ",
      nosRobes: "Nos robes pour cette morphologie",
      voirToutLeCatalogue: "Voir tout le catalogue",
      particulierement: "Particulièrement adaptées",
      egalement: "Également intéressantes à essayer",
      selonVosEnvies: "À découvrir selon vos envies",
      lesQuestions: "Les questions que l’on nous pose",
      poserLaVotre: "Poser la vôtre",
      /* Le bouton de chaque question : il mène à sa page. */
      savoirPlus: "Savoir plus",
      commentSavoir: (lettre: string) => `Comment savoir si j’ai une morphologie en ${lettre} ?`,
      auDela: "Au-delà de la morphologie",
      auDelaPhrase:
        "Une morphologie dit par où commencer. Elle ne dit pas qui vous êtes le jour de votre mariage.",
      lesMaisons: "Les maisons qui vous vont",
      enCoupes: (liste: string) => ` — en ${liste}`,
    },
    showroom: {
      titre: "Le showroom",
      accroche: "Paris 10",
      surRendezVous: " — sur rendez-vous",
      prendreRendezvous: "Prendre rendez-vous",
      laVisite: "La visite",
      uneHeure: "Une heure, le showroom privatisé, et quelqu’un qui connaît chaque robe.",
      venir: "Venir",
      altScene: "Robes de mariée suspendues dans le showroom",
      /* Trois cadrages d'une même photographie : trois textes, et non
       * trois fois le même. Un lecteur d'écran qui entend « détail d'une
       * robe » trois fois de suite n'apprend rien la deuxième fois. */
      altDetails: [
        "Le piano, les vitraux et le miroir sur pied du showroom MADAMOON",
        "Les fauteuils de velours bleu et la robe de mariée posée sur le buste",
        "Le miroir doré, le portant de robes de mariée et les boiseries du showroom",
      ],
    },
    /*
     * L'histoire de la maison, telle que Mouna l'a écrite.
     *
     * Son texte, pas le nôtre : on a corrigé la typographie et rien
     * d'autre. C'est un récit à la première personne, et la première
     * personne ne se réécrit pas — une fondatrice qui raconte sa
     * reconversion n'a pas besoin qu'on lui prête une voix.
     *
     * Les paragraphes sont en tableaux plutôt qu'en un bloc : la mise
     * en page en isole certains, et une phrase courte posée seule ne
     * dit pas la même chose qu'une phrase noyée dans un paragraphe.
     */
    maisonPage: {
      titre: "L'histoire de MADAMOON",
      sousTitre: "Une autre façon de vivre l'essayage",
      citation:
        "Je n'ai pas créé MADAMOON uniquement pour vendre des robes de mariée. Je l'ai créée pour que chaque future mariée vive un essayage dont elle se souviendra.",
      altMouna: "Mouna, fondatrice de MADAMOON, et le gâteau d'anniversaire de la maison en forme de robe de mariée",

      nomTitre: "Je m'appelle Mouna, mes amis m'appellent Moon.",
      nomAvant: "Madame Moon",
      nomApres: "MADAMOON",
      nomTexte: [
        "C'est de là qu'est né le nom MADAMOON. À l'origine, Madame Moon… mais cela me semblait un peu trop sérieux. J'ai donc choisi de l'alléger pour créer MADAMOON : un nom qui me ressemble davantage, à la fois élégant, moderne et un peu espiègle.",
        "Mais derrière ce nom se cache surtout une histoire de reconversion, de passion et une conviction profonde : l'essayage d'une robe de mariée doit être une expérience à part entière.",
      ],

      avantTitre: "De l'ingénierie industrielle aux robes de mariée",
      avantLegende: "Dix ans dans le ferroviaire",
      avantTexte: [
        "Avant de créer MADAMOON, j'ai travaillé pendant 10 ans dans le secteur ferroviaire. Ingénieure industrielle de formation, j'ai progressivement évolué entre la technique et le management jusqu'à devenir directrice de site de maintenance des trains.",
        "Un parcours qui peut sembler bien éloigné de l'univers de la robe de mariée.",
        "Et pourtant, ma passion pour les belles matières, les tissus, les coupes et les robes de cérémonie a toujours occupé une place particulière dans ma vie.",
        "J'ai grandi dans une famille très attachée à la couture et au savoir-faire. J'ai toujours aimé observer la façon dont un vêtement peut transformer une silhouette.",
        "Et parmi toutes les créations, ce sont les robes de mariée qui m'ont toujours particulièrement fascinée.",
      ],
      altAvant:
        "Mouna en veste de chantier ferroviaire, du temps où elle dirigeait un site de maintenance des trains",

      declicTitre: "Le déclic",
      declicDate: "Avril 2022",
      declicTexte: [
        "C'est lors de mes propres essayages de robe de mariée que tout a changé.",
        "En vivant cette expérience de l'autre côté du miroir, j'ai réalisé à quel point le choix d'une robe représente bien plus qu'un simple achat.",
        "C'est se découvrir dans une silhouette que l'on n'a jamais portée, se projeter, douter, changer d'avis, être conseillée, rire, parfois avoir les larmes aux yeux… et partager un moment que l'on gardera longtemps en mémoire.",
        "J'ai alors compris que c'était précisément là que je voulais apporter quelque chose de différent.",
      ],
      altDeclic: "Mouna lors de son propre essayage de robe de mariée, en avril 2022",

      autrementTitre: "MADAMOON : penser l'essayage autrement",
      autrementTexte: [
        "Lorsque j'ai imaginé MADAMOON, je ne voulais pas simplement créer une boutique de robes de mariée à Paris.",
        "Je voulais créer un lieu où l'on prend le temps.",
        "Un lieu où l'on commence par apprendre à connaître la future mariée avant de lui présenter des robes.",
      ],
      autrementListe: [
        "Ses goûts.",
        "Sa personnalité.",
        "Sa morphologie.",
        "Les matières qu'elle aime — et celles qu'elle n'aime pas.",
        "Mais aussi l'univers de son mariage, son lieu, son architecture, son ambiance et l'histoire qu'elle souhaite raconter.",
      ],
      autrementCroyance:
        "Parce que je crois qu'une belle robe n'est pas nécessairement la bonne robe.",
      autrementVerite: "La bonne robe est celle qui vous ressemble.",

      experienceTitre: "L'expérience MADAMOON",
      experienceTexte: [
        "C'est pourquoi j'ai choisi de placer l'expérience de l'essayage au cœur de tout ce que nous faisons.",
        "Chez MADAMOON, chaque essayage est privé et personnalisé. Notre rôle est de vous écouter, de vous conseiller et de vous accompagner dans la découverte de la mode nuptiale dans sa globalité.",
        "Bien sûr, j'espère que vous trouverez votre robe chez MADAMOON.",
        "Mais j'ai toujours voulu aller plus loin.",
        "Je voulais qu'un essayage MADAMOON reste un beau souvenir, même si votre robe devait finalement être trouvée ailleurs.",
        "Parce que pour moi, la réussite d'un essayage ne se mesure pas uniquement à une vente.",
        "Elle se mesure aussi à ce que vous ressentez en quittant la boutique.",
      ],
      altExperience: "Mouna et une mariée, la housse MADAMOON à la main, dans le showroom",

      ecrinTitre: "Un écrin hors du temps",
      ecrinTexte: [
        "MADAMOON a également été pensée comme un lieu à part.",
        "Notre showroom parisien, installé dans un écrin du XIXᵉ siècle, offre un cadre intimiste et hors du temps, particulièrement propice à cette expérience. Le lieu s'inscrit lui-même dans l'histoire de la couture et du savoir-faire parisien.",
        "Ici, le temps ralentit.",
        "Pendant votre essayage, le showroom vous est entièrement dédié, pour vous permettre de vous concentrer sur l'essentiel : vous, votre robe et ce moment avec vos proches.",
      ],
      altEcrin:
        "Le vitrail Art nouveau en haut de l'escalier du showroom, et des robes de mariée suspendues à la rampe",

      visionTitre: "Ma vision de MADAMOON",
      visionTexte: [
        "Aujourd'hui, ce qui me passionne le plus dans mon métier n'est pas seulement de choisir de belles robes.",
        "C'est de styliser une mariée.",
        "Comprendre qui elle est, ce qu'elle aime, ce qu'elle veut transmettre à travers son mariage, puis l'accompagner jusqu'à cette silhouette dans laquelle elle se reconnaît pleinement.",
        "C'est cette approche qui guide MADAMOON depuis le premier rendez-vous jusqu'à la confection et aux dernières retouches de votre robe.",
      ],
      altVision: "Mouna dans la vitrine de MADAMOON, à côté d'une robe de mariée en dentelle",

      trois: [
        "Une robe choisie avec attention.",
        "Un accompagnement personnalisé.",
        "Et surtout, une expérience dont vous vous souviendrez.",
      ],
      bienvenue: "Bienvenue chez MADAMOON.",
      signature: "Mouna",
      fonction: "Fondatrice de MADAMOON",

      prendreRendezvous: "Prendre rendez-vous",
      lesCreateurs: "Les créateurs",
      lesCreateursNote:
        "MADAMOON n'édite pas ses propres collections : la maison choisit, robe par robe, chez plusieurs créateurs — puis fait confectionner et ajuster la vôtre à l'atelier.",
      voirLesRobes: "Voir les robes",
      altScene: "Robe de mariée présentée en boutique",
    },
    /*
     * La page des questions.
     *
     * Les questions et les réponses ne sont pas ici : elles viennent de
     * « faq(langue) », la table unique que servent aussi Élise et le
     * balisage. Ce bloc ne porte que ce que la mise en page ajoute —
     * les intitulés des repères, et les deux mots que la frise affiche.
     */
    faq: {
      titre: "Questions fréquentes",
      accroche:
        "Ce que les mariées nous demandent avant de pousser la porte : les délais, le déroulé d'un essayage, le sur-mesure, le prix.",
      sommaire: "Au sommaire",
      /* La frise du délai. Le chiffre redit ce que la réponse écrit en
       * toutes lettres : s'il change là-bas, il change ici. */
      delaiChiffre: "8–9",
      delaiUnite: "mois",
      delaiDebut: "Le premier essayage",
      delaiFin: "Le jour du mariage",
      altEssayage:
        "Le showroom MADAMOON : l'escalier à tapis rouge, les portants de robes de mariée et le parquet en point de Hongrie",
      lesEtapes: "Les quatre temps",
      acompte: "L'acompte",
      solde: "Le solde",
      aPartirDe: "À partir de",
      ladresse: "L'adresse",
      lesHoraires: "Les horaires",
      voirLaCarte: "Voir sur la carte",
      autreQuestion: "Une autre question ?",
      autreQuestionTexte:
        "Élise répond sur la coupe, la morphologie et le déroulé d'un essayage. Pour tout le reste, le showroom est au bout du fil.",
      demanderAElise: "Demander à Élise",
      prendreRendezvous: "Prendre rendez-vous",
      /* Le bouton posé à côté de chaque question : il mène à sa page. */
      enSavoirPlus: "En savoir plus",
      /* Les questions ajoutées en octobre 2026, rangées par thème sous
       * les sept premières. */
      dautresQuestions: "D'autres questions",
      groupes: {
        choisir: "Choisir sa robe",
        essayage: "L'essayage",
        calendrier: "Le calendrier",
        soin: "Entretien et retouches",
      },
    },
    /*
     * La page des guides : le sommaire de toutes les pages de question
     * — coupes, morphologies, FAQ. Les questions viennent de leurs
     * tables ; ce bloc ne porte que les intitulés.
     */
    guides: {
      titre: "Guides",
      accroche:
        "Tout ce que la boutique a écrit pour vous aider à choisir : la coupe, la silhouette, l'essayage. Une question, une page.",
      sommaire: "Au sommaire",
      coupes: "Les coupes",
      coupesTexte: "Ce qui définit chaque coupe, à qui elle va, comment la porter et l'accessoiriser.",
      morphologies: "Les morphologies",
      morphologiesTexte: "Pour chaque silhouette, les coupes et les détails qui la servent.",
      essayage: "L'essayage et le sur-mesure",
      essayageTexte: "Le calendrier, le déroulé d'un essayage, le sur-mesure, les retouches et l'entretien.",
      lessentiel: "L'essentiel",
    },
    /* La page dédiée à une question. Ses textes viennent de
     * « lib/questions.ts » ; ce bloc ne porte que les intitulés. */
    question: {
      faq: "FAQ",
      laReponseCourte: "La réponse courte",
      aRetenir: "À retenir",
      pourAllerPlusLoin: "Pour aller plus loin",
      itineraire: "L'itinéraire sur Google Maps",
      lesAutresQuestions: "Les autres questions",
      toutesLesQuestions: "Toutes les questions",
      uneAutreQuestion: "Une autre question ?",
      uneAutreQuestionTexte:
        "Élise répond sur la coupe, la morphologie et le déroulé d'un essayage. Pour tout le reste, le showroom est au bout du fil.",
      demanderAElise: "Demander à Élise",
      prendreRendezvous: "Prendre rendez-vous",
    },
    rendezvous: {
      surtitre: "Essayage privé, sur rendez-vous",
      titre: "Prendre rendez-vous",
      choisirUnCreneau: "Choisir un créneau",
      leShowroom: "Le showroom",
      horaires: "Horaires",
      uneHeure:
        "Une heure, au showroom. L’essayage est gratuit pour la mariée et deux accompagnants.",
      altScene: "L’entrée du showroom",
      robeAvant: "Le modèle ",
      robeApres: (ligne: string) => ` sera préparé pour votre venue — ${ligne}.`,
    },
    trouver: {
      titre: "Trouver ma robe",
      voirToutesLesRobes: "Voir toutes les robes",
      intro:
        "Trois portes, et aucune n’est la bonne. Ce sont des pistes, pas des règles : au showroom, beaucoup de mariées repartent avec une robe qu’elles n’auraient pas choisie sur photo.",
      parLaCoupe: "Par la coupe",
      parLaCoupeTexte:
        "Sirène, princesse, fluide, trapèze, deux-en-un. Le mot que les mariées emploient en boutique, et le tri qui fait gagner une heure d’essayage.",
      parLaMorphologie: "Par la morphologie",
      parLaMorphologieTexte:
        "En O, A, V, H, 8 ou X. Non pour exclure des robes — rien n’est « à éviter » — mais pour savoir lesquelles proposer en premier.",
      parLaMaison: "Par la maison",
      parLaMaisonTexte:
        "Plusieurs créateurs, chacun avec sa main : les dentelles de Watters, le mikado de Casablanca, le drapé d’Olya Mak.",
      elise: (adresse: string) =>
        `Ou laissez-vous guider : Élise part de votre morphologie, en trois questions, et vous dit franchement si la réponse est chez une autre maison. Elle donne aussi l’adresse et les horaires — ${adresse}, sur rendez-vous.`,
    },
    calendly: {
      souvre: "Le calendrier s’ouvre",
      echec: "Le calendrier n’a pas pu s’ouvrir",
      patience: "Encore un instant. Vous pouvez aussi réserver dans un nouvel onglet.",
      bloque:
        "Il est peut-être retenu par un bloqueur. Vous pouvez réserver directement sur la page de la maison, ou nous appeler.",
      choisirUnCreneau: "Choisir un créneau",
    },
    introuvable: {
      erreur: "Erreur 404",
      titre: "Cette page n’existe pas",
      texte: "Le lien a peut-être changé. Les robes, elles, sont toujours là.",
      voirLesRobes: "Voir les robes",
      accueil: "Retour à l’accueil",
    },
  },
  coeurs: {
    vosCoupsDeCoeur: "Vos coups de cœur",
    selectionPartagee: "Une sélection partagée",
    voirToutesLesRobes: "Voir toutes les robes",
    voirLesRobes: "Voir les robes",
    prendreRendezvous: "Prendre rendez-vous",
    lienPerime:
      "Ce lien ne désigne aucune robe que nous présentons encore. Le catalogue a peut-être changé depuis qu’il a été envoyé.",
    retenuePourVous: (n: number) =>
      n === 1 ? "Une robe a été retenue pour vous." : `${n} robes ont été retenues pour vous.`,
    essaientEnsemble: "Elles s’essaient ensemble, sur rendez-vous, au showroom.",
    dejaDedans: "Déjà dans vos coups de cœur",
    ajouterAuxMiens: "Ajouter à mes coups de cœur",
    voirLesMiens: "Voir mes coups de cœur",
    plusAuCatalogue: (n: number) =>
      n === 1
        ? "Une robe de ce lien n’est plus au catalogue."
        : `${n} robes de ce lien ne sont plus au catalogue.`,
    aucun:
      "Vous n’avez pas encore de coup de cœur. Parcourez le catalogue et touchez le cœur posé sur une robe : elle vous attendra ici.",
    partirDeMaSilhouette: "Partir de ma morphologie",
    retenues: (n: number) => (n === 1 ? "Une robe retenue." : `${n} robes retenues.`),
    apportez:
      "Apportez cette liste au showroom : l’essayage se prépare mieux quand on sait par où commencer.",
    viderLaListe: "Vider la liste",
    gardee:
      "Cette liste est gardée dans ce navigateur. Elle ne vous suit pas d’un appareil à l’autre et ne nous est pas transmise — le lien de partage, lui, porte la sélection avec lui.",
    partager: "Partager ma sélection",
    copie: "Lien copié",
    lienACopier: "Le lien de votre sélection, à copier",
    titrePartage: "Ma sélection MADAMOON",
    textePartage: (n: number) =>
      n === 1
        ? "La robe que j’ai retenue chez MADAMOON."
        : `Les ${n} robes que j’ai retenues chez MADAMOON.`,
  },
  catalogue: {
    nom: "Robes de mariée MADAMOON",
    titre: "Nos robes de mariée",
    robesDe: (pluriel: string) => `Robes ${pluriel}`,
    telecharger: (intitule: string) => `Télécharger le catalogue ${intitule}`,
    fichier: (intitule: string) => `MADAMOON — Catalogue ${intitule}.pdf`,
  },
  pied: {
    coupes: "Coupes",
    createurs: "Créateurs",
    showroom: "Le showroom",
    robeDeMariee: "Robe de mariée",
    rendezvous: "Prendre rendez-vous",
    droits: "Boutique de robes de mariée à Paris",
    gererCookies: "Gérer les cookies",
    signature: "Site créé et référencé par",
  },
  /* Le texte du bandeau de consentement de madamoon.fr, repris tel que la
   * maison l'a validé. */
  cookies: {
    titre: "Nous respectons votre vie privée",
    resume:
      "Nous utilisons des cookies pour vous aider à naviguer efficacement et à exécuter certaines fonctionnalités.",
    toutAccepter: "Tout accepter",
    toutRefuser: "Tout refuser",
    personnaliser: "Personnaliser",
    enregistrer: "Enregistrer mes préférences",
    titrePreferences: "Personnaliser les préférences de consentement",
    fermer: "Fermer",
    afficherPlus: "Afficher plus",
    afficherMoins: "Afficher moins",
    toujoursActif: "Toujours actif",
    paragraphes: [
      "Nous utilisons des cookies pour vous aider à naviguer efficacement et à exécuter certaines fonctionnalités. Vous trouverez des informations détaillées sur tous les cookies sous chaque catégorie de consentement ci-dessous.",
      "Les cookies qui sont catégorisés comme « nécessaires » sont stockés sur votre navigateur car ils sont essentiels pour permettre les fonctionnalités de base du site.",
      "Nous utilisons également des cookies tiers qui nous aident à analyser la façon dont vous utilisez ce site web, à enregistrer vos préférences et à vous fournir le contenu et les publicités qui vous sont pertinents. Ces cookies ne seront stockés dans votre navigateur qu'avec votre consentement préalable.",
      "Vous pouvez choisir d'activer ou de désactiver tout ou partie de ces cookies, mais la désactivation de certains d'entre eux peut affecter votre expérience de navigation.",
    ],
    categories: {
      necessaire: {
        nom: "Nécessaire",
        texte:
          "Les cookies nécessaires sont cruciaux pour les fonctions de base du site Web et celui-ci ne fonctionnera pas comme prévu sans eux. Ces cookies ne stockent aucune donnée personnellement identifiable.",
      },
      fonctionnelle: {
        nom: "Fonctionnelle",
        texte:
          "Les cookies fonctionnels permettent d'exécuter certaines fonctionnalités telles que le partage du contenu du site Web sur des plateformes de médias sociaux, la collecte de commentaires et d'autres fonctionnalités tierces.",
      },
      analytique: {
        nom: "Analytique",
        texte:
          "Les cookies analytiques sont utilisés pour comprendre comment les visiteurs interagissent avec le site Web. Ces cookies aident à fournir des informations sur le nombre de visiteurs, le taux de rebond, la source de trafic, etc.",
      },
      performance: {
        nom: "Performance",
        texte:
          "Les cookies de performance sont utilisés pour comprendre et analyser les indices de performance clés du site Web, ce qui permet de fournir une meilleure expérience utilisateur aux visiteurs.",
      },
      publicite: {
        nom: "Publicité",
        texte:
          "Les cookies de publicité sont utilisés pour fournir aux visiteurs des publicités personnalisées basées sur les pages visitées précédemment et analyser l'efficacité de la campagne publicitaire.",
      },
    },
  },
};

/* Pas de « as const » : c'est la forme qu'on veut contraindre, pas les
 * mots. Figés en types littéraux, le français aurait interdit à
 * l'anglais d'être autre chose que du français. */
type Textes = typeof FR;

const EN: Textes = {
  barre: {
    menu: "Menu",
    fermer: "Close",
    principale: "Main",
    accueil: "MADAMOON, home",
    rendezvous: "Appointment",
    robes: "Wedding dresses",
    coupes: "Silhouettes",
    morphologies: "Body shapes",
    showroom: "Showroom",
    maison: "About",
    catalogue: "The catalogue",
    sections: "Sections",
    classer: "Sort the dresses",
    parCreateur: "By designer",
    parCoupe: "By silhouette",
    parMaison: "By house",
    autresModeles: "Other dresses",
    toutesRobes: "All dresses",
    catalogueEntier: "The whole catalogue",
    sixCoupes: "The silhouettes",
    sixMorphologies: "Body shapes",
    filtrerParCreateur: "Filter by designer",
    voirLaMaison: (nom: string) => `View the ${nom} page`,
  },
  raccourcis: {
    toutesRobes: "All dresses",
    lesCoupes: "The silhouettes",
    lesMorphologies: "The body shapes",
    trouverMaRobe: "Find my dress",
    leShowroom: "The showroom",
    laMaison: "About",
    lesQuestions: "FAQ",
    lesGuides: "Guides",
    prendreRendezvous: "Book an appointment",
  },
  ariane: {
    accueil: "Home",
    createurs: "Designers",
  },
  hero: {
    titre: "Getting married soon?",
    accroche: "Wedding dresses, private fittings — Paris 10",
    trouverMaRobe: "Find my dress",
    prendreRendezvous: "Book an appointment",
    alt: "A bride in a lace dress",
    pause: "Pause the video",
    reprendre: "Resume the video",
  },
  bandeau: {
    essayage: "Private fitting",
    surMesure: "Made to measure",
    retouches: "Alterations included",
    aPartirDe: "From",
  },
  introMaison: {
    titreAvant: "The ",
    nom: "Madamoon",
    titreApres: " experience?",
    paragraphes: [
      [
        { texte: "At MADAMOON, every fitting begins with a real " },
        { texte: "conversation", fort: true },
        {
          texte:
            ". We take the time to learn your personality, your wishes, your taste, and the world of your wedding: its theme, its mood, its setting and its architecture. Those exchanges are what let us suggest wedding dresses suited to ",
        },
        {
          texte: "your figure, your personality and the spirit of your wedding",
          fort: true,
        },
        { texte: "." },
      ],
      [
        { texte: "And our boutique, nestled in " },
        { texte: "an elegant nineteenth-century setting", fort: true },
        {
          texte:
            ", offers you a place truly out of time, conceived to make trying on your wedding dress a unique and memorable experience, to share with those close to you!",
        },
      ],
    ],
    lien: "Discover our story",
  },
  robesAccueil: {
    legende: "The dresses",
    titre: "A few dresses, to begin with.",
    voirTout: "See all the dresses",
    voirPlus: "See more",
    rangee: "A selection of dresses",
    precedentes: "See the previous dresses",
    suivantes: "See the next dresses",
  },
  silhouette: {
    legende: "Body shapes",
    titre: "Before the dress, the body shape.",
    texte:
      "Several body shapes, and for each the wedding dress cuts that lengthen, balance or reveal the figure.",
    mention:
      "A body shape never rules a dress out: it opens paths. Nothing is “to be avoided” — it is advice on style, not a rule, and in the showroom we also try what was not planned.",
    lien: "All body shapes",
    precedentes: "See the previous body shapes",
    suivantes: "See the next body shapes",
  },
  coupes: {
    legende: "The silhouettes",
    titre: "Find the cut that suits you.",
    texte: "The cut is the shape of the dress.",
    lien: "All silhouettes",
    presentee: "Silhouette shown",
    les: "All",
  },
  createurs: {
    legende: "The designers",
    titre: "Several houses. None by chance.",
    lieux:
      "Biarritz, Newport Beach, Rome, Dallas, Lviv, Barcelona — the finest dresses of the bridal collections, chosen one by one for you.",
    autres: "Other designers",
    autresNote: "Small independent ateliers, with exclusive designs.",
    precedentes: "See the previous houses",
    suivantes: "See the next houses",
  },
  avis: {
    legende: "What they say",
    nom: "Madamoon",
    experience: " is not simply a boutique to visit — it is an experience to live.",
    lesAvis: "See the Google reviews",
  },
  showroom: {
    legende: "The showroom — Paris 10",
    texte: "An hour, the showroom to yourself, and someone who knows every dress.",
    titre: "Push the door open",
    lien: "See the showroom",
    alt: "The entrance to the MADAMOON showroom, rue du Faubourg Saint-Martin",
  },
  panier: {
    vide: "Your favourites, empty for now",
    pleinUn: "Your favourites, 1 dress",
    plein: (n: number) => `Your favourites, ${n} dresses`,
    ajouter: (nom: string) => `Add ${nom} to your favourites`,
    retirer: (nom: string) => `Remove ${nom} from your favourites`,
    dedans: (nom: string) => `${nom} is in your favourites`,
    coupDeCoeur: "Favourite",
    dansLesVotres: "In your favourites",
  },
  carte: {
    legende: "Your private fitting",
    bouton: "Book an appointment",
  },
  gabarit: {
    allerAuContenu: "Skip to content",
  },
  theme: {
    versSombre: "Switch to dark mode",
    versClair: "Back to light mode",
    intitule: "Appearance",
    sombre: "Dark",
    clair: "Light",
  },
  fiche: {
    autresVues: (nom: string) => `Other views of ${nom}`,
    agrandir: "Enlarge the photograph",
    fermerVue: "Close",
    vuePrecedente: "Previous photograph",
    vueSuivante: "Next photograph",
    rangDeLaVue: (i: number, n: number) => `${i} of ${n}`,
    vuesDe: (nom: string) => `Photographs of ${nom}`,
    laFiche: "About",
    silhouettes: "The body shapes it flatters",
    coupe: "Silhouette",
    style: "Style",
    maison: "House",
    confection: "Made to order",
    surMesure: "Made to measure, alterations included",
    semiMesure: "Semi-bespoke, alterations included",
    aPartirDe: "From",
    essayer: "Try it on at the showroom",
    memeFamille: "In the same family",
    toutesLes: (pluriel: string) => `All ${pluriel}`,
    toutesSilhouettes:
      "It suits every body shape — which is rare, and what makes it a safe bet at a fitting.",
    silhouettesServies: (lettres: string) =>
      `It is first recommended for the ${lettres} shapes. Nothing stops you trying it otherwise: a body shape opens paths, it closes none.`,
  },
  elise: {
    dialogue: "Élise, MADAMOON consultant",
    vous: "You",
    conseillere: "Consultant — MADAMOON",
    ecrit: "Élise is writing",
    champ: "Write to Élise…",
    champLabel: "Your message for Élise",
    envoyer: "Send",
    avertissement:
      "Élise is an artificial intelligence. She can be wrong — for a certain answer, please call the boutique.",

    trouverMaCoupe: "Find my silhouette",
    prendreRendezvous: "Book an appointment",
    questionsPratiques: "Practical questions",
    appeler: "Call the boutique",
    appelerCourt: "Call",
    ecrireCourt: "Email",
    voirShowroom: "See the showroom",
    voirCatalogue: "See the catalogue",
    lancerDiagnostic: "Start",
    voirRecommandations: "See my recommendations",
    refaireDiagnostic: "Start again",
    autresMaisons: "See the other houses",
    touteLaSelection: "The whole selection",
    autreQuestion: "Another question",
    ouiJeLaConnais: "Yes, I know it",
    guidezMoi: "Guide me",
    plusEtroites: "Narrower",
    plusLarges: "Broader",
    alignees: "In line",
    courbesGenereuses: "Generous curves",
    ouiBienMarquee: "Yes, clearly",
    peuMarquee: "Barely",
    prononcees: "Pronounced",
    doucesFine: "Soft, a fine figure",

    bonjour:
      "Hello, I am Élise, a consultant at MADAMOON. Finding the dress of a lifetime is my work — and my greatest joy.",
    invitation: "Tell me about your wedding, ask me anything, or let me guide you.",
    essentiel:
      "What matters is finding the dress that shows your figure at its best while still looking like you.",
    connaissezMorpho: "Do you already know your body shape?",
    laquelle: "Very good. Which one is yours?",
    pasAPas: "I will guide you step by step.",
    epaulesHanches: "How would you describe your shoulders compared with your hips?",
    tailleMarquee: "And your waist — is it marked?",
    derniereQuestion: "Last question: your curves are rather…",
    pistes:
      "These are paths, never rules: in the boutique we also try what was not planned. Would you like to see the matching selection?",
    rdvPrivatise:
      "With pleasure. The showroom is yours alone for an hour — come with the people close to you.",
    faqIntro: "Of course. What would you like to know? You can also simply write to me.",
    dansVosCoupes: "in your silhouettes",
    aEssayer: "to try on",
    nosRecommandations: "Our recommendations",
    recommandationsPlat: "Our recommendations:",
    lObjectif: "The aim:",
    dansLOrdre: "In order",
    lettreLabel: (lettre: string) => `Shape ${lettre}`,
    chezMaison: (nom: string) => `At ${nom}`,
    toutesLesRobes: (nom: string) => `All ${nom} dresses`,
    voirMaison: (nom: string) => `See ${nom}`,
    vousRegardez: (nom: string) =>
      `You are looking at ${nom}. I start from your figure, and I will tell you honestly if the answer lies elsewhere.`,
    voiciCeQui: (nom: string, liste: string) => `At ${nom}, here is what suits you: ${liste}.`,
    pasLesCoupes: (nom: string, liste: string) =>
      `${nom} does not work the cuts I would recommend to you first. The houses that do, in order: ${liste}.`,
    franche: (nom: string) =>
      `Let me be honest: ${nom} does not work the cuts I would recommend to you first.`,
    saufQue: (combien: number): string =>
      combien === 0
        ? " Here are the houses made for you."
        : combien === 1
          ? " Its other dress is worth trying, but here first are the houses made for you."
          : " Its other dresses are worth trying, but here first are the houses made for you.",
    lesMaisonsPour: (liste: string) => `The houses for this body shape: ${liste}.`,

    localRdv: (adresse: string, cp: string) =>
      `With pleasure. The showroom is yours alone for an hour, by appointment only: Monday 12pm–9pm, Tuesday to Saturday 10am–7pm, at ${adresse}, Paris ${cp}.`,
    localPrix: () =>
      `I don’t give prices — the boutique speaks about that, and in person. What I can help with is your body shape, the cuts that will suit you, and how a fitting goes.`,
    localHoraires: (adresse: string, cp: string, ville: string) =>
      `The showroom receives you by appointment only: Monday 12pm to 9pm, Tuesday to Saturday 10am to 7pm — ${adresse}, ${cp} ${ville}.`,
    localCreateurs: (liste: string) =>
      `Our dresses are chosen from ${liste}, with a made-to-measure service.`,
    localDiagnostic:
      "Every woman is different. The simplest way is a short diagnosis together, to find the cuts that will suit you. Shall we begin?",
    localMerci:
      "With great pleasure. I remain at your disposal, and I look forward to welcoming you at the showroom.",
    localDefaut:
      "I would rather answer you precisely than guess. The best is to speak with the boutique directly — or I can guide you here on your figure, the cuts that will suit you, and booking an appointment.",
  },
  pages: {
    coupes: {
      titre: "The silhouettes",
      intro:
        "The cut is not a rule: it is the first sorting, the one that saves an hour of fittings.",
    },
    createurs: {
      titre: "Designer wedding dresses in Paris",
      intro:
        "MADAMOON does not produce its own collections: the boutique chooses, dress by dress, from several designers, then has yours made and fitted in the atelier. All of them are tried on in Paris, in our 10th-arrondissement showroom, by appointment.",
      lesMaisons: "The houses",
    },
    morphologies: {
      titre: "Body shapes",
      toutesLesCoupes: "All silhouettes",
      intro:
        "A body shape never rules a dress out: it opens paths. Nothing is “to be avoided” — it is advice on style, not a rule, and in the showroom we also try what was not planned.",
      guide: "Not sure which one is yours? Élise will guide you in three questions.",
    },
    coupe: {
      nos: (pluriel: string, maison: string) => `Our ${maison} ${pluriel}`,
      nosAutres: (pluriel: string) => `Our other ${pluriel}`,
      lesNotres: (pluriel: string) => `Our ${pluriel}`,
      laMaison: "The house",
      prefixe: "Wedding dress",
      aQuiElleVa: "Who this cut suits",
      toutesLesMorphologies: "All body shapes",
      pistes: (coupe: string) =>
        `A body shape never rules a dress out: it opens paths. The ${coupe} is the one we recommend first to these body shapes — the others try it on just as happily in the boutique.`,
    },
    maison: {
      lesRobesDe: (nom: string) => `The ${nom} dresses`,
      voirToutesLesRobes: "See all the dresses",
      sesCoupes: "Its silhouettes",
      toutesLesCoupes: "All silhouettes",
      travaille:
        "Each image is taken from one of this house’s own dresses, never from another’s.",
      aQuiCesCoupesVont: "Who these cuts suit",
      toutesLesMorphologies: "All body shapes",
      pistes: (dela: string) =>
        `A body shape never rules a dress out: it opens paths. Here are the ones the ${dela} cuts serve first — the others are tried on just as happily in the boutique.`,
      trouverMaRobeDe: (nom: string) => `Find my ${nom} dress`,
    },
    morpho: {
      reconnaitre: (lettre: string) => `Recognising the ${lettre} shape`,
      lesProportions: "The proportions",
      pasExacte:
        "A body shape is not read in a mirror in thirty seconds, and it does not have to be exact: it is a starting point, to know what to try on first. If you hesitate between two,",
      eliseVousGuide: "Élise will guide you",
      enTroisQuestions: " in three questions.",
      lesCoupes: "The cuts that suit you",
      voir: "See",
      toutesNosRobes: (coupe: string) => `All our ${coupe} dresses`,
      toutesLesCoupes: "All silhouettes",
      voiciPourquoi:
        "Here is why these lines work, and what they actually do once the dress is on.",
      decouvrez: (apposition: string, lettre: string) =>
        `Discover our ${apposition} wedding dresses suited to the ${lettre} shape`,
      ouDirectement: " — or go straight to ",
      et: " and ",
      nosRobes: "Our dresses for this figure",
      voirToutLeCatalogue: "See the whole catalogue",
      particulierement: "Particularly suited",
      egalement: "Also worth trying",
      selonVosEnvies: "To discover as you please",
      lesQuestions: "The questions we are asked",
      poserLaVotre: "Ask yours",
      savoirPlus: "Read more",
      commentSavoir: (lettre: string) => `How do I know if I have the ${lettre} shape?`,
      auDela: "Beyond the body shape",
      auDelaPhrase:
        "A body shape says where to begin. It does not say who you are on the day of your wedding.",
      lesMaisons: "The houses that suit you",
      enCoupes: (liste: string) => ` — in ${liste}`,
    },
    showroom: {
      titre: "The showroom",
      accroche: "Paris 10",
      surRendezVous: " — by appointment",
      prendreRendezvous: "Book an appointment",
      laVisite: "The visit",
      uneHeure: "An hour, the showroom to yourself, and someone who knows every dress.",
      venir: "Coming to us",
      altScene: "Wedding dresses hanging in the showroom",
      altDetails: [
        "The piano, the stained glass and the cheval mirror of the MADAMOON showroom",
        "The blue velvet armchairs and the wedding dress on its stand",
        "The gilt mirror, the rail of wedding dresses and the showroom's woodwork",
      ],
    },
    maisonPage: {
      titre: "The MADAMOON story",
      sousTitre: "Another way to live a fitting",
      citation:
        "I did not create MADAMOON only to sell wedding dresses. I created it so that every bride-to-be would live a fitting she remembers.",
      altMouna: "Mouna, founder of MADAMOON, with the house anniversary cake shaped like a wedding dress",

      nomTitre: "My name is Mouna. My friends call me Moon.",
      nomAvant: "Madame Moon",
      nomApres: "MADAMOON",
      nomTexte: [
        "That is where the name MADAMOON came from. Madame Moon, at first — but that felt a little too solemn. So I lightened it into MADAMOON: a name that suits me better, elegant and modern, and a little mischievous.",
        "Behind the name, though, there is above all a story of changing careers, of passion, and of one deep conviction: trying on a wedding dress should be an experience in its own right.",
      ],

      avantTitre: "From industrial engineering to wedding dresses",
      avantLegende: "Ten years on the railways",
      avantTexte: [
        "Before MADAMOON, I spent 10 years in the railway industry. An industrial engineer by training, I moved gradually between the technical side and management, until I was running a train maintenance site.",
        "A path that may seem a long way from the world of wedding dresses.",
        "And yet my love of beautiful materials, of fabrics, of cuts and of occasion dresses has always had a particular place in my life.",
        "I grew up in a family deeply attached to sewing and to craft. I have always loved watching the way a garment can transform a silhouette.",
        "And of everything that is made, it is wedding dresses that have always fascinated me most.",
      ],
      altAvant:
        "Mouna in a railway worksite jacket, from the years when she ran a train maintenance site",

      declicTitre: "The moment it turned",
      declicDate: "April 2022",
      declicTexte: [
        "Everything changed during my own wedding dress fittings.",
        "Living that experience from the other side of the mirror, I understood how much choosing a dress is more than simply buying one.",
        "It is discovering yourself in a silhouette you have never worn, imagining the day, doubting, changing your mind, being advised, laughing, sometimes with tears in your eyes… and sharing a moment you will keep for a long time.",
        "That is when I understood that this was exactly where I wanted to do something different.",
      ],
      altDeclic: "Mouna at her own wedding dress fitting, in April 2022",

      autrementTitre: "MADAMOON: thinking the fitting differently",
      autrementTexte: [
        "When I imagined MADAMOON, I did not simply want to open a wedding dress boutique in Paris.",
        "I wanted to create a place where one takes one's time.",
        "A place where we begin by getting to know the bride-to-be before showing her any dress.",
      ],
      autrementListe: [
        "Her taste.",
        "Her character.",
        "Her body shape.",
        "The materials she loves — and the ones she does not.",
        "And the world of her wedding too: the place, its architecture, its mood, and the story she wishes to tell.",
      ],
      autrementCroyance:
        "Because I believe a beautiful dress is not necessarily the right dress.",
      autrementVerite: "The right dress is the one that looks like you.",

      experienceTitre: "The MADAMOON experience",
      experienceTexte: [
        "That is why I chose to put the experience of the fitting at the heart of everything we do.",
        "At MADAMOON, every fitting is private and personal. Our part is to listen to you, to advise you, and to guide you through bridal fashion as a whole.",
        "Of course, I hope you will find your dress at MADAMOON.",
        "But I have always wanted to go further.",
        "I wanted a MADAMOON fitting to remain a fine memory, even if your dress were finally found elsewhere.",
        "Because to my mind, a fitting is not judged on a sale alone.",
        "It is judged just as much on what you feel as you leave the boutique.",
      ],
      altExperience: "Mouna and a bride, the MADAMOON dress bag in hand, in the showroom",

      ecrinTitre: "A place out of time",
      ecrinTexte: [
        "MADAMOON was also conceived as a place apart.",
        "Our Paris showroom, set in a nineteenth-century interior, offers an intimate frame out of time, particularly suited to this experience. The place belongs itself to the history of Parisian couture and craft.",
        "Here, time slows down.",
        "During your fitting the showroom is yours alone, so that you can turn to what matters: you, your dress, and this moment with the people you love.",
      ],
      altEcrin:
        "The Art Nouveau stained-glass window at the top of the showroom staircase, with wedding dresses hanging from the rail",

      visionTitre: "What MADAMOON means to me",
      visionTexte: [
        "What I love most in my work today is not only choosing beautiful dresses.",
        "It is styling a bride.",
        "Understanding who she is, what she loves, what she wants her wedding to say — then walking with her to the silhouette in which she fully recognises herself.",
        "That approach guides MADAMOON from the first appointment through to the making of your dress and its final alterations.",
      ],
      altVision: "Mouna in the MADAMOON shop window, next to a lace wedding dress",

      trois: [
        "A dress chosen with care.",
        "Guidance that is yours alone.",
        "And above all, an experience you will remember.",
      ],
      bienvenue: "Welcome to MADAMOON.",
      signature: "Mouna",
      fonction: "Founder of MADAMOON",

      prendreRendezvous: "Book an appointment",
      lesCreateurs: "The designers",
      lesCreateursNote:
        "MADAMOON does not produce its own collections: the house chooses, dress by dress, from several designers — then has yours made and fitted in the atelier.",
      voirLesRobes: "See the dresses",
      altScene: "A wedding dress shown in the boutique",
    },
    faq: {
      titre: "Frequently asked questions",
      accroche:
        "What brides ask us before they push the door open: how long it takes, how a fitting works, made-to-measure, the price.",
      sommaire: "On this page",
      delaiChiffre: "8–9",
      delaiUnite: "months",
      delaiDebut: "The first fitting",
      delaiFin: "The wedding day",
      altEssayage:
        "The MADAMOON showroom: the red-carpeted staircase, the rails of wedding dresses and the herringbone parquet",
      lesEtapes: "The four stages",
      acompte: "The deposit",
      solde: "The balance",
      aPartirDe: "From",
      ladresse: "The address",
      lesHoraires: "Opening hours",
      voirLaCarte: "See it on the map",
      autreQuestion: "Another question?",
      autreQuestionTexte:
        "Élise answers on silhouette, body shape and how a fitting goes. For everything else, the showroom is at the end of the line.",
      demanderAElise: "Ask Élise",
      prendreRendezvous: "Book an appointment",
      enSavoirPlus: "Read more",
      dautresQuestions: "More questions",
      groupes: {
        choisir: "Choosing your dress",
        essayage: "The fitting",
        calendrier: "The calendar",
        soin: "Care and alterations",
      },
    },
    guides: {
      titre: "Guides",
      accroche:
        "Everything the boutique has written to help you choose: the silhouette, the body shape, the fitting. One question, one page.",
      sommaire: "Contents",
      coupes: "Silhouettes",
      coupesTexte: "What defines each silhouette, who it suits, how to wear and accessorise it.",
      morphologies: "Body shapes",
      morphologiesTexte: "For each figure, the silhouettes and details that flatter it.",
      essayage: "Fittings and made-to-measure",
      essayageTexte: "The calendar, how a fitting works, made-to-measure, alterations and care.",
      lessentiel: "The essentials",
    },
    question: {
      faq: "FAQ",
      laReponseCourte: "The short answer",
      aRetenir: "In short",
      pourAllerPlusLoin: "Going further",
      itineraire: "Directions on Google Maps",
      lesAutresQuestions: "Other questions",
      toutesLesQuestions: "All the questions",
      uneAutreQuestion: "Another question?",
      uneAutreQuestionTexte:
        "Élise answers on silhouette, body shape and how a fitting goes. For everything else, the showroom is at the end of the line.",
      demanderAElise: "Ask Élise",
      prendreRendezvous: "Book an appointment",
    },
    rendezvous: {
      surtitre: "Private fitting, by appointment",
      titre: "Book an appointment",
      choisirUnCreneau: "Choose a time",
      leShowroom: "The showroom",
      horaires: "Opening hours",
      uneHeure:
        "One hour, at the showroom. The fitting is free for the bride and two guests.",
      altScene: "The entrance to the showroom",
      robeAvant: "The ",
      robeApres: (ligne: string) => ` will be made ready for your visit — ${ligne}.`,
    },
    trouver: {
      titre: "Find my dress",
      voirToutesLesRobes: "See all the dresses",
      intro:
        "Three doors, and none of them is the right one. These are paths, not rules: at the showroom, many brides leave with a dress they would never have chosen from a photograph.",
      parLaCoupe: "By silhouette",
      parLaCoupeTexte:
        "Mermaid, ball gown, sheath, A-line, two-in-one. The word brides use in the boutique, and the sorting that saves an hour of fittings.",
      parLaMorphologie: "By body shape",
      parLaMorphologieTexte:
        "O, A, V, H, 8 or X. Not to rule dresses out — nothing is “to be avoided” — but to know which to offer first.",
      parLaMaison: "By house",
      parLaMaisonTexte:
        "Several designers, each with their own hand: the laces of Watters, the mikado of Casablanca, the draping of Olya Mak.",
      elise: (adresse: string) =>
        `Or let yourself be guided: Élise starts from your figure, in three questions, and tells you honestly if the answer lies with another house. She also gives the address and the hours — ${adresse}, by appointment.`,
    },
    calendly: {
      souvre: "The calendar is opening",
      echec: "The calendar could not open",
      patience: "One moment. You can also book in a new tab.",
      bloque:
        "It may be held back by a blocker. You can book directly on the house’s own page, or call us.",
      choisirUnCreneau: "Choose a time",
    },
    introuvable: {
      erreur: "Error 404",
      titre: "This page does not exist",
      texte: "The link may have changed. The dresses, though, are still here.",
      voirLesRobes: "See the dresses",
      accueil: "Back to the home page",
    },
  },
  coeurs: {
    vosCoupsDeCoeur: "Your favourites",
    selectionPartagee: "A shared selection",
    voirToutesLesRobes: "See all the dresses",
    voirLesRobes: "See the dresses",
    prendreRendezvous: "Book an appointment",
    lienPerime:
      "This link points to no dress we still show. The catalogue may have changed since it was sent.",
    retenuePourVous: (n: number) =>
      n === 1 ? "One dress has been chosen for you." : `${n} dresses have been chosen for you.`,
    essaientEnsemble: "They are tried on together, by appointment, at the showroom.",
    dejaDedans: "Already in your favourites",
    ajouterAuxMiens: "Add to my favourites",
    voirLesMiens: "See my favourites",
    plusAuCatalogue: (n: number) =>
      n === 1
        ? "One dress from this link is no longer in the catalogue."
        : `${n} dresses from this link are no longer in the catalogue.`,
    aucun:
      "You have no favourites yet. Browse the catalogue and touch the heart on a dress: it will be waiting for you here.",
    partirDeMaSilhouette: "Start from my figure",
    retenues: (n: number) => (n === 1 ? "One dress chosen." : `${n} dresses chosen.`),
    apportez:
      "Bring this list to the showroom: a fitting goes better when you know where to begin.",
    viderLaListe: "Empty the list",
    gardee:
      "This list is kept in this browser. It does not follow you from one device to another and is not sent to us — the sharing link, however, carries the selection with it.",
    partager: "Share my selection",
    copie: "Link copied",
    lienACopier: "The link to your selection, to copy",
    titrePartage: "My MADAMOON selection",
    textePartage: (n: number) =>
      n === 1
        ? "The dress I have chosen at MADAMOON."
        : `The ${n} dresses I have chosen at MADAMOON.`,
  },
  catalogue: {
    nom: "MADAMOON wedding dresses",
    titre: "Our wedding dresses",
    robesDe: (pluriel: string) => `The ${pluriel}`,
    telecharger: (intitule: string) => `Download the ${intitule} catalogue`,
    fichier: (intitule: string) => `MADAMOON — ${intitule} catalogue.pdf`,
  },
  pied: {
    coupes: "Silhouettes",
    createurs: "Designers",
    showroom: "The showroom",
    robeDeMariee: "Wedding dress",
    rendezvous: "Book an appointment",
    droits: "Bridal boutique in Paris",
    gererCookies: "Manage cookies",
    signature: "Site built and optimised by",
  },
  cookies: {
    titre: "We value your privacy",
    resume:
      "We use cookies to help you navigate efficiently and perform certain functions.",
    toutAccepter: "Accept all",
    toutRefuser: "Reject all",
    personnaliser: "Customise",
    enregistrer: "Save my preferences",
    titrePreferences: "Customise consent preferences",
    fermer: "Close",
    afficherPlus: "Show more",
    afficherMoins: "Show less",
    toujoursActif: "Always active",
    paragraphes: [
      "We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent category below.",
      "Cookies categorised as “necessary” are stored on your browser as they are essential for enabling the basic functionalities of the site.",
      "We also use third-party cookies that help us analyse how you use this website, store your preferences, and provide the content and advertisements that are relevant to you. These cookies will only be stored in your browser with your prior consent.",
      "You can choose to enable or disable some or all of these cookies, but disabling some of them may affect your browsing experience.",
    ],
    categories: {
      necessaire: {
        nom: "Necessary",
        texte:
          "Necessary cookies are required to enable the basic features of this site. The site will not work as intended without them. These cookies do not store any personally identifiable data.",
      },
      fonctionnelle: {
        nom: "Functional",
        texte:
          "Functional cookies help perform certain functions such as sharing the content of the website on social media platforms, collecting feedback, and other third-party features.",
      },
      analytique: {
        nom: "Analytics",
        texte:
          "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
      },
      performance: {
        nom: "Performance",
        texte:
          "Performance cookies are used to understand and analyse the key performance indexes of the website, which helps in delivering a better user experience for the visitors.",
      },
      publicite: {
        nom: "Advertisement",
        texte:
          "Advertisement cookies are used to provide visitors with customised advertisements based on the pages they visited previously and to analyse the effectiveness of the ad campaigns.",
      },
    },
  },
};

const TABLES: Record<Langue, Textes> = { fr: FR, en: EN };

/** Les mots d'une langue. */
export function t(langue: Langue): Textes {
  return TABLES[langue];
}
