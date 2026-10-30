import { MAISON } from "@/lib/madamoon";
import type { QuestionMorpho } from "@/lib/morphologies-questions";

/*
 * Les questions des pages de coupe, et leurs pages.
 *
 * Même principe que les morphologies : en bas de la page d'une coupe,
 * une rangée par question et un bouton « Savoir plus » qui mène à sa
 * page, sous l'adresse de la coupe — /coupes/sirene/….
 *
 * Les questions viennent de la maison. Les réponses s'en tiennent à ce
 * que le site sait : la définition de chaque coupe, les morphologies qui
 * la conseillent, et ce que disent les fiches des robes — une fente « qui
 * facilite les mouvements », une doublure extensible, une robe « pensée
 * pour un mariage civil ». Ce qui relève du conseil général — s'asseoir,
 * monter un escalier — est écrit comme un conseil. Ce que le catalogue
 * n'a pas — aucune robe n'y est classée « trompette » — est dit tel quel.
 *
 * Une coupe absente de cette table n'affiche pas de questions.
 */

export type QuestionCoupe = QuestionMorpho;

export const QUESTIONS_COUPES: Record<string, QuestionCoupe[]> = {
  sirene: [
    /* ——————————————————————————————————————— la définition ————— */
    {
      slug: "qu-est-ce-qu-une-robe-de-mariee-sirene",
      q: "Qu'est-ce qu'une robe de mariée sirène ?",
      r: "Une robe ajustée jusqu'aux cuisses, puis évasée jusqu'au sol. Elle épouse la poitrine, la taille et les hanches, et dessine la silhouette avant de s'ouvrir en une jupe qui se termine souvent en traîne. C'est la coupe la plus féminine et la plus sensuelle du catalogue.",
      description:
        "Qu'est-ce qu'une robe de mariée sirène ? Ajustée jusqu'aux cuisses puis évasée, elle dessine la taille et les hanches. Définition et sirènes MADAMOON, Paris.",
      chapo:
        "Féminine et sensuelle : la sirène est la coupe qui dessine le plus la silhouette. Voici ce qui la définit.",
      sections: [
        {
          titre: "Une ligne en deux temps",
          texte: [
            "La sirène est ajustée jusqu'aux cuisses, puis évasée. Dans sa partie haute, elle suit la poitrine, la taille et les hanches ; sous les cuisses, la jupe s'ouvre et descend jusqu'au sol, souvent prolongée d'une traîne.",
          ],
        },
        {
          titre: "Ce qu'elle fait à la silhouette",
          texte: [
            "Elle dessine la taille et les hanches. Sur une silhouette déjà courbée, elle suit ; sur une silhouette plus droite, elle crée la courbe en s'évasant.",
          ],
        },
        {
          titre: "Les sirènes de la boutique",
          texte: [
            "C'est la coupe la plus représentée du catalogue, chez Casablanca Bridal, Watters Designs, Monica Loretti et Olya Mak : en satin mat comme Sheridan ou Venus, en dentelle comme Oksana ou Summer, en crêpe comme Mira ou Bondi, en charmeuse comme Riviera.",
          ],
        },
      ],
      aRetenir: [
        "Ajustée jusqu'aux cuisses, puis évasée.",
        "Elle dessine la taille et les hanches.",
        "Féminine et sensuelle.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Les robes sirène" },
        { href: "/robes/sheridan", label: "Sheridan" },
        { href: "/robes/oksana", label: "Oksana" },
      ],
    },

    /* ——————————————————————————————————————— les morphologies ————— */
    {
      slug: "robe-sirene-quelle-morphologie",
      q: "À quelle morphologie la robe de mariée sirène convient-elle ?",
      r: "Elle fait partie des premières coupes à essayer pour les morphologies en H, en 8 et en X, et vaut l'essai pour une morphologie en O avec une matière qui tient. Pour une morphologie en A, elle se porte très bien avec un haut qui équilibre. Aucune morphologie ne l'interdit.",
      description:
        "Robe de mariée sirène : à quelles morphologies convient-elle ? En premier pour H, 8 et X, à essayer pour O et A. Les conseils de la boutique MADAMOON.",
      chapo:
        "La sirène a la réputation d'être réservée aux silhouettes en sablier. C'est faux : voici à qui elle va, et à quelle condition.",
      sections: [
        {
          titre: "Les morphologies pour qui elle vient en premier",
          texte: [],
          liste: [
            "En H — elle crée la courbe au lieu de la chercher ; choisie légère, elle allonge la ligne.",
            "En 8 — elle épouse une ligne déjà proportionnée, sans rien corriger.",
            "En X — elle suit la taille sans avoir à la créer : la coupe qui en dit le plus avec le moins.",
          ],
        },
        {
          titre: "Celles pour qui elle vaut l'essai",
          texte: [
            "En O, elle demande une matière qui tient — un crêpe plutôt qu'un satin léger — et se juge en cabine bien mieux que sur photographie. En A, elle se porte très bien si le haut a de quoi équilibrer : une manche, une bretelle large, un décolleté travaillé.",
          ],
        },
        {
          titre: "Aucune ne l'interdit",
          texte: [
            "Une morphologie n'exclut jamais une robe : elle indique seulement par quoi commencer. Beaucoup de mariées repartent avec une sirène qu'elles n'avaient pas prévu d'essayer.",
          ],
        },
      ],
      aRetenir: [
        "En premier : morphologies en H, en 8 et en X.",
        "À essayer : en O et en A, à certaines conditions.",
        "Aucune morphologie ne l'interdit.",
      ],
      liens: [
        { href: "/morphologies/h/robe-sirene-morphologie-h", label: "La sirène et la morphologie en H" },
        { href: "/morphologies/o/robe-sirene-morphologie-o", label: "La sirène et la morphologie en O" },
        { href: "/morphologies", label: "Les six morphologies" },
      ],
    },

    /* ——————————————————————————————————————— le fourreau ————— */
    {
      slug: "difference-robe-sirene-robe-fourreau",
      q: "Quelle différence entre une robe sirène et une robe fourreau ?",
      r: "Les deux sont ajustées et suivent le corps. La sirène s'évase sous les cuisses, en une jupe qui s'ouvre jusqu'au sol ; le fourreau descend droit, ou presque, sans s'évaser. Au catalogue, les fourreaux sont rangés avec les sirènes.",
      description:
        "Robe sirène ou robe fourreau : toutes deux ajustées, la sirène s'évase sous les cuisses, le fourreau descend droit. La différence, et les modèles MADAMOON.",
      chapo:
        "Ce sont deux cousines : même départ, deux arrivées. Voici ce qui les distingue.",
      sections: [
        {
          titre: "Ce qu'elles partagent",
          texte: [
            "Toutes deux sont ajustées : elles suivent la poitrine, la taille et les hanches, sans ampleur. Elles demandent une matière qui tombe bien et un ajustement précis.",
          ],
        },
        {
          titre: "Ce qui les distingue",
          texte: [],
          liste: [
            "La sirène — elle s'évase sous les cuisses, en une jupe qui s'ouvre jusqu'au sol.",
            "Le fourreau — il descend droit ou presque, sans s'évaser, en gardant la ligne du corps jusqu'en bas.",
          ],
        },
        {
          titre: "Au catalogue",
          texte: [
            "La boutique range ses fourreaux avec les sirènes. Siddalee et Rowan, de Watters Designs, sont des fourreaux ; Bella, de Casablanca Bridal, se porte en sirène ou en fourreau ; Amaryllis, en coupe droite ou sirène.",
          ],
        },
      ],
      aRetenir: [
        "Les deux sont ajustées.",
        "La sirène s'évase sous les cuisses.",
        "Le fourreau descend droit.",
      ],
      liens: [
        { href: "/robes/siddalee", label: "Siddalee" },
        { href: "/robes/bella", label: "Bella" },
        { href: "/morphologies/8/robe-fourreau-silhouette-8", label: "Le fourreau et la morphologie en 8" },
      ],
    },

    /* ——————————————————————————————————————— la trompette ————— */
    {
      slug: "difference-robe-sirene-robe-trompette",
      q: "Quelle différence entre une robe sirène et une robe trompette ?",
      r: "Toutes deux sont ajustées puis évasées. La différence tient au point où s'ouvre la jupe : plus bas pour la sirène, vers le genou ; plus haut pour la trompette, vers le milieu de la cuisse, ce qui la rend plus facile à porter. La boutique range ces deux lignes sous le nom de sirène.",
      description:
        "Robe sirène ou robe trompette : la jupe s'ouvre vers le genou pour la sirène, plus haut pour la trompette, plus facile à porter. La différence expliquée.",
      chapo:
        "Sirène, trompette, « fit-and-flare » : trois noms pour une même famille. Ce qui change, c'est l'endroit où la jupe s'ouvre.",
      sections: [
        {
          titre: "Le point d'évasement",
          texte: [
            "La sirène reste ajustée plus longtemps et s'évase plus bas, vers le genou : l'effet est spectaculaire, et la démarche plus contenue. La trompette s'ouvre plus haut, vers le milieu de la cuisse : la jupe prend plus tôt son ampleur, et la robe laisse davantage bouger.",
          ],
        },
        {
          titre: "Laquelle choisir",
          texte: [
            "Si vous aimez la ligne la plus sculptée, la sirène. Si vous voulez danser toute la nuit sans y penser, une jupe qui s'ouvre plus haut. Les deux se jugent à l'essayage, en marchant.",
          ],
        },
        {
          titre: "Au catalogue",
          texte: [
            "La boutique n'a pas de catégorie « trompette » : ces lignes sont rangées avec les sirènes. Plusieurs fiches parlent d'une coupe « fit-and-flare », comme celles de Sheridan ou d'Enid. Le point exact où s'ouvre chaque jupe se voit en cabine.",
          ],
        },
      ],
      aRetenir: [
        "Sirène : la jupe s'ouvre vers le genou.",
        "Trompette : plus haut, vers la mi-cuisse.",
        "Les deux sont rangées en sirène au catalogue.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Les robes sirène" },
        { href: "/robes/enid", label: "Enid" },
        { href: "/robes/sheridan", label: "Sheridan" },
      ],
    },

    /* ——————————————————————————————————————— le confort ————— */
    {
      slug: "robe-sirene-confortable-marcher-danser",
      q: "Une robe sirène est-elle confortable pour marcher et danser ?",
      r: "Oui, si elle est bien choisie et bien ajustée. Une fente, une matière extensible ou une jupe qui s'ouvre un peu plus haut laissent marcher et danser librement. Le plus sûr est de le vérifier à l'essayage, en bougeant vraiment.",
      description:
        "Robe de mariée sirène et confort : une fente, une matière extensible, un bon ajustement pour marcher et danser. Les conseils et sirènes de MADAMOON, Paris.",
      chapo:
        "La sirène a la réputation d'entraver. Bien choisie et bien ajustée, elle se danse pourtant toute la nuit.",
      sections: [
        {
          titre: "Ce qui laisse bouger",
          texte: [],
          liste: [
            "Une fente — celle de Bondi, haute sur la cuisse, « facilite les mouvements », dit sa fiche ; Mira, Milan, Charlize, Shiloh et Zina en ont une aussi.",
            "Une matière extensible — Sheridan a une doublure extensible, Zina est en georgette stretch.",
            "Une jupe qui s'ouvre un peu plus haut — la démarche est plus libre.",
          ],
        },
        {
          titre: "L'ajustement",
          texte: [
            "Une sirène trop serrée entrave ; bien ajustée, elle suit. Chez MADAMOON, la robe est ajustée sur vous par les couturières jusqu'au dernier essayage, retouches incluses.",
          ],
        },
        {
          titre: "Le vérifier en cabine",
          texte: [
            "Un conseil : marchez, montez une marche, asseyez-vous, faites quelques pas de danse. Une robe qui gêne en cabine gênera toute la journée.",
          ],
        },
      ],
      aRetenir: [
        "Oui, bien choisie et bien ajustée.",
        "Une fente ou une matière extensible aident.",
        "Bougez vraiment à l'essayage.",
      ],
      liens: [
        { href: "/robes/bondi", label: "Bondi" },
        { href: "/robes/zina", label: "Zina" },
        { href: "/robes/sheridan", label: "Sheridan" },
      ],
    },

    /* ——————————————————————————————————— s'asseoir, se déplacer ————— */
    {
      slug: "s-asseoir-se-deplacer-robe-sirene",
      q: "Comment s'asseoir et se déplacer avec une robe de mariée sirène ?",
      r: "Asseyez-vous sur le bord du siège, en remontant légèrement la jupe ; marchez à pas un peu plus courts ; pour un escalier, soulevez le devant de la jupe. Si la robe a une traîne, demandez à la boutique comment la porter le soir.",
      description:
        "S'asseoir et se déplacer en robe de mariée sirène : sur le bord du siège, à petits pas, la jupe soulevée dans l'escalier. Les conseils pratiques de MADAMOON.",
      chapo:
        "Quelques gestes simples, et la sirène se vit toute la journée sans y penser. Voici lesquels.",
      sections: [
        {
          titre: "S'asseoir",
          texte: [
            "Un conseil : asseyez-vous sur le bord du siège plutôt qu'au fond, le dos droit, en remontant légèrement la jupe au niveau des genoux. Le tissu ne tire pas, et la robe ne se froisse pas.",
          ],
        },
        {
          titre: "Marcher et monter un escalier",
          texte: [
            "Marchez à pas un peu plus courts qu'à l'habitude : la sirène est ajustée jusqu'aux cuisses. Dans un escalier, soulevez le devant de la jupe d'une main, pour ne pas marcher dessus.",
          ],
        },
        {
          titre: "La traîne",
          texte: [
            "Beaucoup de sirènes se prolongent en traîne — celles de Venus, de Summer ou de Siddalee sont longues. Pour la soirée, demandez à la boutique comment la relever ou la porter, au moment des retouches.",
          ],
        },
      ],
      aRetenir: [
        "Sur le bord du siège, la jupe un peu remontée.",
        "Des pas un peu plus courts.",
        "La traîne : à voir avec la boutique.",
      ],
      liens: [
        { href: "/coupes/sirene/robe-sirene-confortable-marcher-danser", label: "Le confort d'une sirène" },
        { href: "/robes/venus", label: "Venus" },
        { href: "/robes/summer", label: "Summer" },
      ],
    },

    /* ——————————————————————————————————————— le décolleté ————— */
    {
      slug: "decollete-robe-sirene",
      q: "Quel type de décolleté choisir avec une robe sirène ?",
      r: "Celui qui répond à votre silhouette et au style de la robe : un cœur pour adoucir, un V ou un décolleté plongeant pour allonger, un décolleté droit ou des épaules dénudées pour élargir les épaules, un drapé pour la douceur. La sirène se marie avec tous.",
      description:
        "Quel décolleté pour une robe sirène : cœur, V, plongeant, droit, épaules dénudées, drapé. Comment choisir, avec les sirènes de la boutique MADAMOON.",
      chapo:
        "La sirène dessine le bas de la silhouette ; le décolleté décide du haut. Voici comment les accorder.",
      sections: [
        {
          titre: "Les décolletés du catalogue",
          texte: [],
          liste: [
            "Le cœur — Meredith, Ariel ; en cœur pointu, plus graphique, Sheridan et Oksana.",
            "Le V et le plongeant — Summer, Bondi ; Aleida, plongeant, entre de fines bretelles ; Mira, profond.",
            "Le droit et les épaules dénudées — Enid, qui se porte en bustier ou en col bardot.",
            "Le drapé — Rowan ; Milan, drapé au niveau du buste.",
          ],
        },
        {
          titre: "Selon votre silhouette",
          texte: [
            "Un V ou un cœur ouvrent le buste et allongent le cou, pour une poitrine généreuse. Des épaules dénudées ou un décolleté droit élargissent les épaules, pour une morphologie en A. Avec des proportions équilibrées, rien n'est à compenser.",
          ],
        },
        {
          titre: "Selon le style",
          texte: [
            "Un décolleté plongeant pour une sirène sensuelle, un col bardot pour une allure plus classique, des bretelles amovibles — comme sur Ariel ou Siddalee — pour changer d'allure entre la cérémonie et la soirée.",
          ],
        },
      ],
      aRetenir: [
        "La sirène se marie avec tous les décolletés.",
        "V et cœur ouvrent le buste.",
        "Épaules dénudées et droit élargissent les épaules.",
      ],
      liens: [
        { href: "/robes/meredith", label: "Meredith" },
        { href: "/robes/enid", label: "Enid" },
        { href: "/robes/aleida", label: "Aleida" },
      ],
    },

    /* ——————————————————————————————————————— la matière ————— */
    {
      slug: "matiere-robe-sirene",
      q: "Quelle matière choisir pour une robe sirène ?",
      r: "Une matière qui tient et qui lisse la silhouette : le crêpe et le satin mat en premier, la charmeuse pour un tombé plus souple, la dentelle pour le décor. Une version extensible ajoute du confort.",
      description:
        "Quelle matière pour une robe de mariée sirène : crêpe, satin mat, charmeuse, dentelle, versions stretch. Comment choisir, avec les sirènes MADAMOON.",
      chapo:
        "La sirène épouse le corps : sa matière se voit plus que dans toute autre coupe. Voici comment la choisir.",
      sections: [
        {
          titre: "Les matières qui tiennent",
          texte: [
            "Le crêpe lisse la silhouette et tombe droit — Mira, Milan, Bondi, Elin. Le satin mat donne de la tenue et une lumière douce — Sheridan, Venus, Montana, Ariel. Le néoprène, plus structuré encore, sculpte la ligne — Enid.",
          ],
        },
        {
          titre: "Les matières plus souples",
          texte: [
            "La charmeuse, fluide et lumineuse, suit le corps de près — Riviera, Rowan, Amaryllis. La georgette stretch de Zina associe souplesse et confort.",
          ],
        },
        {
          titre: "La dentelle",
          texte: [
            "Posée sur une sirène, elle ajoute le décor sans changer la ligne : dentelle de Chantilly pour Oksana et Shiloh, dentelle d'Alençon pour Summer, dentelle en relief pour Meredith.",
          ],
        },
      ],
      aRetenir: [
        "Crêpe et satin mat : de la tenue.",
        "Charmeuse : un tombé plus souple.",
        "Dentelle : le décor.",
      ],
      liens: [
        { href: "/robes/mira", label: "Mira" },
        { href: "/robes/venus", label: "Venus" },
        { href: "/robes/riviera", label: "Riviera" },
      ],
    },

    /* ——————————————————————————————————————— le mariage civil ————— */
    {
      slug: "robe-sirene-mariage-civil",
      q: "Une robe sirène convient-elle à un mariage civil ?",
      r: "Oui. Une sirène minimaliste en crêpe ou en satin, sans longue traîne, a toute sa place à la mairie. Certaines sont même pensées pour cela, comme Elin, d'Olya Mak, courte et en crêpe.",
      description:
        "Robe de mariée sirène pour un mariage civil : minimaliste, en crêpe ou en satin, sans longue traîne. Les sirènes MADAMOON pour la mairie, Paris 10e.",
      chapo:
        "La mairie n'appelle pas une robe moins belle, mais une robe plus simple à vivre. La sirène sait l'être.",
      sections: [
        {
          titre: "Une sirène pensée pour la mairie",
          texte: [
            "Elin, d'Olya Mak, est une robe courte en crêpe, pensée pour un mariage civil : une ligne épurée, qui va à l'essentiel.",
          ],
        },
        {
          titre: "Des sirènes minimalistes",
          texte: [
            "Milan, de Monica Loretti, en crêpe léger ; Bondi et Enid, de Casablanca Bridal, minimalistes. Sans longue traîne ni volume, elles se portent facilement dans une salle de mairie, puis en ville.",
          ],
        },
        {
          titre: "Deux cérémonies, deux allures",
          texte: [
            "Si la mairie précède une cérémonie religieuse ou une réception, une robe qui change d'allure peut servir aux deux : Mira peut s'accompagner d'une jupe amovible en tulle, Tessa d'une surjupe détachable.",
          ],
        },
      ],
      aRetenir: [
        "Oui : une sirène minimaliste a sa place à la mairie.",
        "Elin est pensée pour un mariage civil.",
        "Une jupe amovible pour deux cérémonies.",
      ],
      liens: [
        { href: "/robes/elin", label: "Elin" },
        { href: "/robes/milan", label: "Milan" },
        { href: "/robes/mira", label: "Mira" },
      ],
    },

    /* ——————————————————————————————————————— la dentelle ————— */
    {
      slug: "robe-sirene-dentelle",
      q: "Comment choisir une robe sirène avec de la dentelle ?",
      r: "Regardez trois choses : la dentelle elle-même — Chantilly, Alençon, en relief —, l'endroit où elle est posée — toute la robe, le corsage, le dos ou la traîne —, et la façon dont elle s'arrête, souvent en feston au bas de la jupe.",
      description:
        "Choisir une robe sirène en dentelle : Chantilly, Alençon ou relief, posée partout ou sur le dos, festonnée en bas. Les sirènes en dentelle de MADAMOON.",
      chapo:
        "Toutes les dentelles ne racontent pas la même histoire. Sur une sirène, qui épouse le corps, elles se voient d'autant plus.",
      sections: [
        {
          titre: "La dentelle elle-même",
          texte: [
            "La dentelle de Chantilly est fine et souple — Oksana, Shiloh, Charlize. La dentelle d'Alençon, plus dessinée, a un relief délicat — Summer. La dentelle en relief, plus marquée, sculpte la robe — Meredith. Fancy et Aleida jouent les dentelles scintillantes.",
          ],
        },
        {
          titre: "L'endroit où elle est posée",
          texte: [
            "Sur toute la robe, elle habille la silhouette entière, comme sur Uma ou Fancy. Sur le dos, elle crée une surprise — Venus a un dos en dentelle, Montana un dos illusion. Sur la traîne, elle prolonge la robe — celle d'Aleida est en dentelle festonnée.",
          ],
        },
        {
          titre: "Après le mariage",
          texte: [
            "La dentelle est la matière la plus fragile d'une robe. Un pressing spécialisé et un rangement à plat la gardent belle longtemps.",
          ],
        },
      ],
      aRetenir: [
        "Chantilly, Alençon ou relief.",
        "Partout, au dos ou sur la traîne.",
        "Une matière fragile, à entretenir.",
      ],
      liens: [
        { href: "/robes/summer", label: "Summer" },
        { href: "/robes/meredith", label: "Meredith" },
        { href: "/faq/entretenir-robe-de-mariee-dentelle", label: "Entretenir une robe en dentelle" },
      ],
    },

    /* ——————————————————————————————————————— les manches ————— */
    {
      slug: "robe-sirene-avec-manches",
      q: "Une robe sirène avec manches est-elle possible ?",
      r: "Oui. Des manches longues en dentelle ou en satin, ou des manches amovibles qu'on retire pour la soirée : plusieurs sirènes du catalogue en ont. Elles équilibrent le haut du corps et se portent en toute saison.",
      description:
        "Robe de mariée sirène avec manches : longues en dentelle ou en satin, ou amovibles. Les sirènes à manches de MADAMOON — Montana, Bella, Riviera — à Paris.",
      chapo:
        "Une sirène à manches allie la ligne la plus sculptée à une allure plus couverte. Le catalogue en a plusieurs.",
      sections: [
        {
          titre: "Des manches longues",
          texte: [
            "Montana, de Casablanca Bridal, en satin mat, a des manches longues en dentelle et un dos illusion. Bella, en satin orné de perles, associe des manches longues à un dos nu.",
          ],
        },
        {
          titre: "Des manches amovibles",
          texte: [
            "Riviera, de Watters Designs, en charmeuse, a des manches amovibles, et son corsage comme ses manches sont sublimés de perles : avec manches pour la cérémonie, sans pour la soirée.",
          ],
        },
        {
          titre: "Ce qu'elles apportent",
          texte: [
            "Elles équilibrent le haut du corps — utile pour une morphologie en A — et habillent un mariage d'hiver ou une cérémonie religieuse.",
          ],
        },
      ],
      aRetenir: [
        "Oui : plusieurs sirènes en ont.",
        "Longues ou amovibles.",
        "Elles équilibrent le haut du corps.",
      ],
      liens: [
        { href: "/robes/montana", label: "Montana" },
        { href: "/robes/riviera", label: "Riviera" },
        { href: "/faq/robe-de-mariee-hiver", label: "Une robe pour un mariage en hiver" },
      ],
    },

    /* ——————————————————————————————————————— les accessoires ————— */
    {
      slug: "accessoiriser-robe-sirene",
      q: "Comment accessoiriser une robe de mariée sirène ?",
      r: "Avec retenue : la sirène dessine déjà la silhouette. Un voile, une cape ou des bijoux, mais rarement tous à la fois. Certaines sirènes ont leurs propres pièces — la cape assortie de Sheridan, les chaînes de perles amovibles d'Oksana, les fleurs 3D optionnelles de Zina.",
      description:
        "Accessoiriser une robe de mariée sirène : voile, cape, bijoux, avec retenue. Les pièces des sirènes MADAMOON — cape de Sheridan, perles d'Oksana — à Paris.",
      chapo:
        "La sirène est déjà une déclaration. L'accessoire la prolonge — à condition de ne pas lui faire concurrence.",
      sections: [
        {
          titre: "Les pièces des robes",
          texte: [],
          liste: [
            "Sheridan — une cape en tulle plissé asymétrique, ornée de la même dentelle que la robe.",
            "Oksana — des chaînes de perles et de sequins amovibles sur le décolleté, et des bretelles perlées amovibles.",
            "Zina — des fleurs 3D faites main, optionnelles.",
            "Ariel, Siddalee — des bretelles amovibles.",
          ],
        },
        {
          titre: "Le voile",
          texte: [
            "Un conseil : accordez sa longueur à la traîne. Un voile long prolonge une sirène à traîne ; un voile court laisse voir le dos, souvent travaillé sur une sirène.",
          ],
        },
        {
          titre: "Les bijoux",
          texte: [
            "Avec un décolleté chargé de perles ou de dentelle, des boucles d'oreilles suffisent. Avec une sirène minimaliste, un bijou plus marqué peut porter toute la tenue.",
          ],
        },
      ],
      aRetenir: [
        "Avec retenue : la sirène se suffit.",
        "Certaines robes ont leurs propres pièces.",
        "Un voile accordé à la traîne.",
      ],
      liens: [
        { href: "/robes/sheridan", label: "Sheridan" },
        { href: "/robes/oksana", label: "Oksana" },
        { href: "/robes/zina", label: "Zina" },
      ],
    },
  ],
  princesse: [
    /* ——————————————————————————————————————— la définition ————— */
    {
      slug: "qu-est-ce-qu-une-robe-de-mariee-princesse",
      q: "Qu'est-ce qu'une robe de mariée princesse ?",
      r: "Une robe au corsage ajusté, souvent structuré en corset, d'où part une jupe ample qui descend jusqu'au sol. C'est la silhouette des robes de bal : la taille est marquée, le volume assumé. La boutique la dit raffinée et solennelle.",
      description:
        "Qu'est-ce qu'une robe de mariée princesse ? Un corset travaillé, une taille marquée, une jupe ample jusqu'au sol. Définition et princesses MADAMOON, Paris.",
      chapo:
        "Raffinée et solennelle : la princesse est la robe de bal de la mariée. Voici ce qui la définit.",
      sections: [
        {
          titre: "Un corsage, puis le volume",
          texte: [
            "Le haut est ajusté : un bustier ou un corset qui suit la poitrine et marque la taille. De la taille — ou d'une taille basque ou basse, qui descend un peu plus bas — part une jupe ample, qui s'élargit jusqu'au sol et se prolonge souvent d'une traîne.",
          ],
        },
        {
          titre: "Ce qu'elle fait à la silhouette",
          texte: [
            "Elle affine la taille par contraste avec l'ampleur de la jupe, et elle couvre entièrement les hanches et les jambes. C'est la coupe des cérémonies solennelles et des grands lieux.",
          ],
        },
        {
          titre: "Les princesses de la boutique",
          texte: [
            "Chez Casablanca Bridal, Guinevere en jacquard, Kensington en mikado, Addison en satin de soie, Santana en tulle et organza ; chez Watters Designs, Clover en dentelle Caterina, Ember en Dupioni, Fern et Trinity en mikado ; chez Olya Mak, Seraphina en dentelle brodée à la main.",
          ],
        },
      ],
      aRetenir: [
        "Un corsage ajusté, une jupe ample.",
        "La taille marquée par contraste.",
        "Raffinée et solennelle.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Les robes princesse" },
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/kensington", label: "Kensington" },
      ],
    },

    /* ——————————————————————————————————————— les morphologies ————— */
    {
      slug: "robe-princesse-quelle-morphologie",
      q: "À quelle morphologie la robe princesse convient-elle ?",
      r: "Elle fait partie des premières coupes à essayer pour les morphologies en A, en V, en 8 et en X. Pour une morphologie en O ou en H, elle vient en second, et vaut l'essai. Aucune morphologie ne l'interdit : tout se joue sur le corsage et le volume de la jupe.",
      description:
        "Robe de mariée princesse : à quelles morphologies convient-elle ? En premier pour A, V, 8 et X, à essayer pour O et H. Les conseils de la boutique MADAMOON.",
      chapo:
        "La princesse va à plus de silhouettes qu'on ne le croit. Voici pour qui elle vient en premier, et pourquoi.",
      sections: [
        {
          titre: "Les morphologies pour qui elle vient en premier",
          texte: [],
          liste: [
            "En A — son corsage travaillé ramène le regard vers le haut, et la jupe répond aux hanches sans les marquer.",
            "En V — la jupe ample donne du volume au bas et équilibre des épaules plus larges.",
            "En 8 — le corsage se cintre à la taille et l'ampleur part de là : le contraste est net.",
            "En X — l'ampleur part d'une taille déjà fine, sans que la robe ait à forcer.",
          ],
        },
        {
          titre: "Celles pour qui elle vaut l'essai",
          texte: [
            "En O, préférez une jupe plus légère et un décolleté en V ou en cœur, qui met la poitrine en valeur. En H, un corset et une taille basque dessinent la taille que la silhouette ne marque pas.",
          ],
        },
        {
          titre: "Au catalogue",
          texte: [
            "Plusieurs princesses de la boutique — Addison, Clover, Ember, Kensington, Livia, Seraphina — sont indiquées, sur leurs fiches, pour les six morphologies. C'est l'essayage qui tranche.",
          ],
        },
      ],
      aRetenir: [
        "En premier pour A, V, 8 et X.",
        "À essayer pour O et H.",
        "Le corsage et le volume font la différence.",
      ],
      liens: [
        { href: "/morphologies/a/robe-princesse-morphologie-a", label: "La princesse et la morphologie en A" },
        { href: "/morphologies/8/robe-princesse-morphologie-8", label: "La princesse et la morphologie en 8" },
        { href: "/morphologies", label: "Les six morphologies" },
      ],
    },

    /* ——————————————————————————————————————— la trapèze ————— */
    {
      slug: "difference-robe-princesse-robe-trapeze",
      q: "Quelle différence entre une robe princesse et une robe trapèze ?",
      r: "Les deux ont un buste ajusté et une jupe qui s'élargit. La trapèze s'ouvre en A, régulièrement, sans ampleur excessive ; la princesse marque la taille par un corset et assume un vrai volume de jupe. Plusieurs robes du catalogue se situent entre les deux.",
      description:
        "Robe princesse ou robe trapèze : la trapèze s'ouvre en A, la princesse marque la taille et assume le volume. La différence, et les modèles MADAMOON à Paris.",
      chapo:
        "Elles partagent un même départ, un buste ajusté. Ce qui les sépare, c'est la jupe.",
      sections: [
        {
          titre: "Ce qu'elles partagent",
          texte: [
            "Un haut ajusté et une jupe qui s'élargit vers le sol : ni l'une ni l'autre ne suit les hanches et les cuisses, à la différence d'une sirène.",
          ],
        },
        {
          titre: "Ce qui les distingue",
          texte: [],
          liste: [
            "La trapèze — la jupe s'ouvre en A, en ligne droite depuis la taille. La boutique la tient pour la coupe la plus universelle.",
            "La princesse — un corset travaillé, une taille marquée et une jupe ample, au volume assumé : la silhouette d'une robe de bal.",
          ],
        },
        {
          titre: "Entre les deux",
          texte: [
            "Hayes, Sienna et Charlotte sont décrites au catalogue comme des robes « princesse ou trapèze » : le volume de leur jupe les place à la frontière. C'est en cabine que l'on voit de quel côté elles penchent sur vous.",
          ],
        },
      ],
      aRetenir: [
        "Trapèze : une jupe qui s'ouvre en A.",
        "Princesse : un vrai volume, une taille marquée.",
        "Certaines robes sont entre les deux.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "Les robes trapèze" },
        { href: "/robes/hayes", label: "Hayes" },
        { href: "/robes/charlotte", label: "Charlotte" },
      ],
    },

    /* ——————————————————————————————————————— les petites tailles ————— */
    {
      slug: "robe-princesse-petite-taille",
      q: "Une robe princesse est-elle adaptée aux petites tailles ?",
      r: "Oui, à condition de proportionner le volume. Une jupe moins large, une matière légère comme le tulle ou l'organza, un décolleté en V ou une taille basque en pointe allongent la silhouette. Et la longueur se règle sur vous, aux retouches.",
      description:
        "Robe de mariée princesse et petite taille : un volume proportionné, des matières légères, un décolleté en V pour allonger. Les conseils de MADAMOON, Paris.",
      chapo:
        "Une princesse n'est pas réservée aux grandes silhouettes. Elle demande seulement que le volume soit à votre échelle.",
      sections: [
        {
          titre: "Proportionner le volume",
          texte: [
            "C'est le conseil principal : une jupe dont l'ampleur reste en rapport avec votre taille. Une jupe très large et très structurée peut prendre le dessus sur une petite silhouette ; une ampleur plus mesurée la laisse respirer.",
          ],
        },
        {
          titre: "Ce qui allonge",
          texte: [],
          liste: [
            "Un décolleté en V — Livia, Amandine, Santana : il étire le buste.",
            "Une taille basque en pointe — Guinevere, Santana : elle prolonge la ligne vers le bas.",
            "Des matières aériennes — le tulle et l'organza donnent du volume sans poids.",
          ],
        },
        {
          titre: "La longueur",
          texte: [
            "Après l'essayage, la boutique prend vos mensurations pour lancer la confection, et ses couturières ajustent la robe sur place. Un conseil : venez aux essayages avec les chaussures du jour J, la longueur se règle sur elles.",
          ],
        },
      ],
      aRetenir: [
        "Oui, avec un volume à votre échelle.",
        "Le V et la taille basque allongent.",
        "La longueur se règle sur vous.",
      ],
      liens: [
        { href: "/robes/livia", label: "Livia" },
        { href: "/robes/santana", label: "Santana" },
        { href: "/faq/duree-retouches-robe-de-mariee", label: "La durée des retouches" },
      ],
    },

    /* ——————————————————————————————————————— le volume ————— */
    {
      slug: "choisir-volume-jupe-robe-princesse",
      q: "Comment choisir le volume de jupe d'une robe princesse ?",
      r: "Selon trois choses : votre silhouette, le lieu et la journée que vous voulez vivre. La matière décide aussi : le mikado ou le jacquard tiennent un volume structuré, le tulle et l'organza un volume aérien. Le plus sûr est d'essayer deux ampleurs différentes.",
      description:
        "Choisir le volume de jupe d'une robe de mariée princesse : silhouette, lieu, matière. Mikado structuré ou tulle aérien, les conseils de MADAMOON à Paris.",
      chapo:
        "Le volume fait la princesse. Il se choisit comme une coupe : à votre silhouette, à votre lieu, à votre journée.",
      sections: [
        {
          titre: "La matière fait le volume",
          texte: [],
          liste: [
            "Structuré — le mikado de Livia, « une jupe qui tient toute seule », ou celui de Kensington, qui apporte structure et volume.",
            "Texturé — le jacquard floral de Guinevere, pour une jupe de robe de bal.",
            "Aérien — le tulle et l'organza de Santana, une jupe volumineuse mais légère.",
            "Ample et léger — la jupe d'Ember, en Dupioni, ou celle de Seraphina, volumineuse tout en gardant « une légèreté aérienne ».",
          ],
        },
        {
          titre: "Le lieu et la journée",
          texte: [
            "Un conseil : un grand volume se déploie dans une salle de réception, un château, une église ; il demande plus de place dans une mairie, une voiture ou sur une piste de danse animée. Pensez à toute la journée, pas seulement à l'entrée.",
          ],
        },
        {
          titre: "À votre silhouette",
          texte: [
            "Pour une petite silhouette, une ampleur mesurée ; pour des épaules larges, une jupe généreuse qui rééquilibre. En cabine, comparez deux volumes : la différence se voit tout de suite.",
          ],
        },
      ],
      aRetenir: [
        "La matière fait le volume.",
        "Pensez au lieu et à toute la journée.",
        "Essayez deux ampleurs.",
      ],
      liens: [
        { href: "/robes/livia", label: "Livia" },
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/kensington", label: "Kensington" },
      ],
    },

    /* ——————————————————————————————————————— la danse ————— */
    {
      slug: "robe-princesse-confortable-danser",
      q: "Une robe princesse est-elle confortable pour danser ?",
      r: "Oui, si elle est bien ajustée et que son volume vous laisse bouger. Une jupe légère se porte plus facilement qu'une jupe très structurée, et une traîne se gère mieux relevée. Le corsage doit tenir sans gêner : c'est à vérifier à l'essayage, en bougeant vraiment.",
      description:
        "Robe de mariée princesse et danse : un corsage qui tient sans serrer, une jupe légère, une traîne qu'on relève. Les conseils de la boutique MADAMOON, Paris.",
      chapo:
        "Une princesse n'empêche pas de danser. Elle demande de choisir la robe pour la soirée autant que pour la cérémonie.",
      sections: [
        {
          titre: "Le corsage",
          texte: [
            "Un corsage structuré tient la robe : c'est lui qui porte le poids de la jupe. Celui de Clover, d'après sa fiche, « assure un bon maintien ». Il doit aussi vous laisser lever les bras et respirer : à l'essayage, faites les gestes de la soirée.",
          ],
        },
        {
          titre: "La jupe",
          texte: [
            "Plus elle est légère, plus elle suit le mouvement. La jupe d'Ember est décrite comme « ample et légère » ; celle de Seraphina garde « une légèreté aérienne ». Une jupe très structurée, en mikado, se porte magnifiquement mais pèse davantage.",
          ],
        },
        {
          titre: "La traîne",
          texte: [
            "Un conseil : demandez en cabine comment la traîne se relève ou s'accroche pour la soirée. Une traîne longue, comme celle de deux mètres de Kensington, se porte pour l'entrée, pas pour la piste.",
          ],
        },
      ],
      aRetenir: [
        "Un corsage qui tient sans serrer.",
        "Une jupe légère suit le mouvement.",
        "La traîne se relève pour danser.",
      ],
      liens: [
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/robes/ember", label: "Ember" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },

    /* ——————————————————————————————————————— le corsage ————— */
    {
      slug: "corsage-robe-princesse",
      q: "Quel corsage choisir avec une jupe princesse ?",
      r: "Celui qui met en valeur votre buste et équilibre le volume de la jupe. Un bustier cœur, un décolleté en V, une encolure carrée, des épaules dénudées ou des manches longues : le catalogue a chacun. Une taille basque ou basse prolonge le corsage et affine la ligne.",
      description:
        "Quel corsage pour une robe de mariée princesse ? Bustier cœur, V, carré, épaules dénudées, manches longues, taille basque. Les princesses MADAMOON, Paris.",
      chapo:
        "La jupe fait le volume ; le corsage fait le caractère. Voici les possibilités, robe par robe.",
      sections: [
        {
          titre: "Les décolletés",
          texte: [],
          liste: [
            "Cœur — Guinevere, plongeant et pointu ; Hayes, revisité ; Ember, souligné d'une découpe en V.",
            "En V — Livia, un V franc ; Amandine, plongeant ; Santana, sur de fines bretelles.",
            "Carré — Clover, en dentelle Caterina.",
            "Épaules dénudées — Kensington, brodée de perles jusqu'aux manches ; Trinity.",
          ],
        },
        {
          titre: "Les manches et les bretelles",
          texte: [
            "Seraphina, d'Olya Mak, associe un corsage transparent à des manches longues et à un dos nu. Addison a des bretelles tombantes amovibles : on les porte ou non.",
          ],
        },
        {
          titre: "La ligne de taille",
          texte: [
            "La taille basque, qui descend en pointe sous la taille, prolonge le corsage : Guinevere, Santana. La taille basse aussi : Ember, Clover. Elles affinent la ligne et font partir le volume un peu plus bas. Un conseil : un corsage chargé appelle une jupe épurée, et l'inverse.",
          ],
        },
      ],
      aRetenir: [
        "Le corsage fait le caractère.",
        "Cœur, V, carré ou épaules dénudées.",
        "La taille basque affine la ligne.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },

    /* ——————————————————————————————————————— bustier ou corset ————— */
    {
      slug: "difference-bustier-corset-robe-princesse",
      q: "Quelle différence entre un bustier et un corset sur une robe princesse ?",
      r: "Le bustier désigne une forme : un haut sans bretelles ni manches, qui s'arrête au-dessus de la poitrine. Le corset désigne une construction : un corsage structuré, souvent baleiné, qui modèle la taille. Une robe peut être les deux à la fois, comme Guinevere et son corset bustier.",
      description:
        "Bustier ou corset sur une robe de mariée princesse : l'un est une forme sans bretelles, l'autre une structure qui modèle la taille. La différence expliquée.",
      chapo:
        "Deux mots souvent confondus. L'un dit ce que l'on voit, l'autre ce qui tient la robe.",
      sections: [
        {
          titre: "Le bustier, une forme",
          texte: [
            "Un haut sans bretelles ni manches, qui laisse les épaules et les bras nus. Il tient par sa structure et par l'ajustement. Hayes, Sienna et Charlotte sont des bustiers à décolleté cœur.",
          ],
        },
        {
          titre: "Le corset, une construction",
          texte: [
            "Un corsage structuré, souvent baleiné, qui modèle la taille et porte le poids de la jupe. Il peut avoir des bretelles ou des manches. Ember a un corset « qui structure la silhouette » ; Clover, un corsage structuré qui « assure un bon maintien ».",
          ],
        },
        {
          titre: "Les deux à la fois",
          texte: [
            "Guinevere réunit les deux : un corset bustier, à décolleté cœur plongeant, prolongé d'une taille basque. Charlotte aussi, avec son corset en taille basque. À l'essayage, vérifiez que le haut tient seul quand vous levez les bras.",
          ],
        },
      ],
      aRetenir: [
        "Le bustier est une forme : sans bretelles.",
        "Le corset est une structure : il modèle la taille.",
        "Une robe peut être les deux.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/ember", label: "Ember" },
        { href: "/coupes/princesse/corsage-robe-princesse", label: "Quel corsage choisir" },
      ],
    },

    /* ——————————————————————————————————————— sans excès ————— */
    {
      slug: "robe-princesse-pas-trop-imposante",
      q: "Comment éviter qu'une robe princesse soit trop imposante ?",
      r: "En jouant sur trois choses : une jupe d'ampleur mesurée, une matière légère comme le tulle ou l'organza, et un corsage qui équilibre la jupe. Une traîne modérée allège aussi la silhouette. Et certaines robes, entre princesse et trapèze, sont à comparer en cabine.",
      description:
        "Une robe de mariée princesse sans excès : volume mesuré, tulle léger, corsage qui équilibre, traîne modérée. Les conseils et modèles de MADAMOON à Paris.",
      chapo:
        "On peut aimer la princesse sans vouloir disparaître dedans. Voici comment garder l'allure et alléger le reste.",
      sections: [
        {
          titre: "Alléger la jupe",
          texte: [
            "Une ampleur mesurée plutôt que maximale, et une matière aérienne : le tulle et l'organza donnent du volume sans masse. Une jupe épurée, comme celle d'Addison, en satin de soie, garde la ligne nette.",
          ],
        },
        {
          titre: "Équilibrer le haut",
          texte: [
            "Un conseil : quand la jupe est généreuse, un corsage plus simple la laisse respirer, et un décolleté en V ou des épaules dégagées ouvrent la silhouette. Une traîne modérée, plutôt qu'une traîne cathédrale, allège encore l'ensemble.",
          ],
        },
        {
          titre: "Entre deux coupes",
          texte: [
            "Hayes, Sienna et Charlotte, décrites comme « princesse ou trapèze », sont à la frontière des deux. À essayer à côté d'une princesse plus ample, pour comparer.",
          ],
        },
      ],
      aRetenir: [
        "Une ampleur mesurée, une matière légère.",
        "Un corsage qui équilibre la jupe.",
        "Comparer avec une princesse-trapèze.",
      ],
      liens: [
        { href: "/robes/hayes", label: "Hayes" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/coupes/princesse/choisir-volume-jupe-robe-princesse", label: "Choisir le volume de jupe" },
      ],
    },

    /* ——————————————————————————————————————— en extérieur ————— */
    {
      slug: "robe-princesse-mariage-exterieur",
      q: "Une robe princesse convient-elle à un mariage en extérieur ?",
      r: "Oui, avec quelques précautions. Une jupe légère en tulle ou en organza se porte mieux qu'une jupe très lourde, et une traîne courte ou qui se relève évite l'herbe et le gravier. Pensez au terrain, à la saison et à la distance à parcourir.",
      description:
        "Robe de mariée princesse en extérieur : une jupe légère, une traîne courte ou qu'on relève, une matière adaptée au terrain. Les conseils de MADAMOON, Paris.",
      chapo:
        "Un jardin, une cour, un domaine : la princesse y a toute sa place. Elle demande simplement de penser au sol.",
      sections: [
        {
          titre: "Le sol et la traîne",
          texte: [
            "Un conseil : sur l'herbe ou le gravier, une traîne longue ramasse tout ce qu'elle touche. Une traîne plus courte, ou qui se relève après la cérémonie, vous laisse circuler sans y penser.",
          ],
        },
        {
          titre: "La matière",
          texte: [
            "Le tulle et l'organza, comme sur Santana, sont aériens et bougent avec l'air ; le mikado et le jacquard tiennent leur forme. Par temps chaud, une jupe légère est la plus agréable à porter toute la journée.",
          ],
        },
        {
          titre: "La saison",
          texte: [
            "Pour un mariage d'été, des épaules dégagées ou de fines bretelles ; pour une fin de saison, des manches longues comme celles de Seraphina. Et pour le soir, une étole ou une cape.",
          ],
        },
      ],
      aRetenir: [
        "Oui, avec une jupe légère.",
        "Une traîne courte ou qui se relève.",
        "Pensez au terrain et à la saison.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/seraphina", label: "Seraphina" },
        { href: "/faq/robe-de-mariee-hiver", label: "Une robe pour un mariage en hiver" },
      ],
    },

    /* ——————————————————————————————————————— le voile ————— */
    {
      slug: "voile-robe-de-mariee-princesse",
      q: "Quel voile porter avec une robe de mariée princesse ?",
      r: "Un voile qui s'accorde au volume et à la traîne. Un voile long, qui prolonge la traîne, souligne la solennité ; un voile plus court laisse voir le dos et la jupe. Santana a même son voile assorti, longueur « doigts », disponible séparément.",
      description:
        "Quel voile avec une robe de mariée princesse ? Long pour prolonger la traîne, court pour laisser voir le dos. Le voile assorti de Santana, chez MADAMOON.",
      chapo:
        "Avec une princesse, le voile complète la silhouette. Voici comment l'accorder à la robe.",
      sections: [
        {
          titre: "Long ou court",
          texte: [],
          liste: [
            "Un voile long — il prolonge la traîne et accompagne une cérémonie solennelle ; il va à une robe à traîne, comme Kensington ou Guinevere.",
            "Un voile longueur « doigts » — il s'arrête au bout des doigts, bras le long du corps, et laisse voir toute la jupe.",
            "Un voile court — il dégage le dos et le corsage.",
          ],
        },
        {
          titre: "Le dos de la robe",
          texte: [
            "Quand le dos est travaillé, laissez-le voir : la rangée de boutons d'Addison, qui court jusqu'au bout de la traîne, ou le dos nu de Seraphina. Un voile en tulle léger et transparent les laisse paraître.",
          ],
        },
        {
          titre: "Le voile de Santana",
          texte: [
            "D'après sa fiche, Santana, de Casablanca Bridal, peut être accompagnée d'un voile assorti, longueur « doigts », et de gants en tulle de soie ornés de dentelle florale, disponibles séparément.",
          ],
        },
      ],
      aRetenir: [
        "Accordé au volume et à la traîne.",
        "Long pour la solennité, court pour le dos.",
        "Santana a son voile assorti.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },

    /* ——————————————————————————————————————— les accessoires ————— */
    {
      slug: "accessoiriser-robe-princesse",
      q: "Comment accessoiriser une robe princesse sans surcharger la silhouette ?",
      r: "En choisissant un point fort et en laissant le reste discret. Une princesse porte déjà du volume : un corsage brodé appelle peu de bijoux, un corsage épuré peut accueillir un collier ou des gants. Voile, bijoux et coiffure se choisissent ensemble.",
      description:
        "Accessoiriser une robe de mariée princesse sans surcharge : un seul point fort, des bijoux mesurés, un voile accordé. Les conseils et modèles de MADAMOON, Paris.",
      chapo:
        "La princesse est déjà une déclaration. L'accessoire la prolonge, à condition de ne pas lui faire concurrence.",
      sections: [
        {
          titre: "Un seul point fort",
          texte: [
            "Un conseil : décidez de ce qui doit attirer le regard — le corsage, le voile, un bijou — et laissez le reste en retrait. Avec une robe brodée de perles, comme Kensington ou Fern, des boucles d'oreilles suffisent.",
          ],
        },
        {
          titre: "Les pièces des robes",
          texte: [],
          liste: [
            "Santana — des gants transparents en tulle de soie, ornés de dentelle florale, et un voile assorti, disponibles séparément.",
            "Addison — des bretelles tombantes amovibles.",
            "Clover — avec ou sans les perles qui soulignent le décolleté et les contours du corset.",
          ],
        },
        {
          titre: "Les bijoux et le décolleté",
          texte: [
            "Un décolleté en V, comme celui de Livia, accueille un pendentif ; une encolure carrée ou des épaules dénudées mettent en valeur un collier court ou des boucles plus marquées ; un bustier cœur se suffit souvent à lui-même.",
          ],
        },
      ],
      aRetenir: [
        "Un seul point fort.",
        "Certaines robes ont leurs propres pièces.",
        "Le bijou suit le décolleté.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/coupes/princesse/voile-robe-de-mariee-princesse", label: "Quel voile choisir" },
      ],
    },

    /* ——————————————————————————————————————— les matières ————— */
    {
      slug: "robe-princesse-satin-ou-dentelle",
      q: "Peut-on choisir une robe princesse en satin ou en dentelle ?",
      r: "Oui, les deux. Le satin donne une princesse lisse et lumineuse, comme Addison en satin de soie ; la dentelle, une princesse romantique, comme Clover en dentelle Caterina ou Seraphina, brodée à la main. Le catalogue a aussi du mikado, du jacquard et du Dupioni.",
      description:
        "Robe de mariée princesse en satin ou en dentelle : Addison en satin de soie, Clover et Seraphina en dentelle, et aussi le mikado. Les princesses MADAMOON, Paris.",
      chapo:
        "La princesse se décline dans toutes les matières nobles. Chacune lui donne un caractère différent.",
      sections: [
        {
          titre: "En satin",
          texte: [
            "Lisse et lumineux, il donne une ligne nette. Addison, de Casablanca Bridal, est en satin de soie, avec des motifs floraux en mousseline appliqués à la main ; Hayes associe le satin mat à la dentelle.",
          ],
        },
        {
          titre: "En dentelle",
          texte: [
            "Romantique, elle habille le corsage ou toute la robe. Clover est en dentelle Caterina ; Seraphina, d'Olya Mak, en dentelle brodée à la main ; Amandine arbore des motifs d'un style royal ; Santana pose une dentelle florale sur un corsage transparent.",
          ],
        },
        {
          titre: "Les autres matières",
          texte: [],
          liste: [
            "Le mikado — Livia, Kensington, Fern, Trinity : une matière qui tient le volume.",
            "Le jacquard — Guinevere, en jacquard floral texturé.",
            "Le Dupioni — Ember.",
            "Le tulle et l'organza — la jupe de Santana.",
          ],
        },
      ],
      aRetenir: [
        "Oui, en satin comme en dentelle.",
        "Le satin pour une ligne nette, la dentelle pour le romantisme.",
        "Le mikado pour un volume qui tient.",
      ],
      liens: [
        { href: "/robes/addison", label: "Addison" },
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/faq/entretenir-robe-de-mariee-dentelle", label: "Entretenir une robe en dentelle" },
      ],
    },

    /* ——————————————————————————————————————— se déplacer ————— */
    {
      slug: "se-deplacer-robe-de-mariee-volumineuse",
      q: "Comment se déplacer facilement avec une robe de mariée volumineuse ?",
      r: "En vous entraînant avant le jour J, avec vos chaussures. Un pas un peu plus court, la jupe avancée du bout du pied, le devant relevé dans les escaliers, la traîne relevée pour la soirée. Et une personne de confiance pour vous aider à la manœuvrer.",
      description:
        "Se déplacer avec une robe de mariée volumineuse : marcher, monter un escalier, s'asseoir, gérer la traîne. Les conseils pratiques de la boutique MADAMOON, Paris.",
      chapo:
        "Une princesse se porte toute la journée. Quelques gestes simples la rendent facile.",
      sections: [
        {
          titre: "Marcher",
          texte: [
            "Un conseil : un pas un peu plus court, et la jupe qu'on avance légèrement du bout du pied à chaque pas, pour ne pas marcher dessus. Entraînez-vous aux essayages, avec les chaussures du jour J.",
          ],
        },
        {
          titre: "L'escalier, la voiture, la chaise",
          texte: [],
          liste: [
            "L'escalier — relevez le devant de la jupe des deux mains pour voir les marches ; la traîne suit derrière.",
            "La voiture — asseyez-vous d'abord, puis rentrez les jambes et la jupe ; quelqu'un peut aider à la ranger.",
            "La chaise — asseyez-vous au bord, laissez la jupe s'étaler et ramenez la traîne sur le côté.",
          ],
        },
        {
          titre: "La traîne et les poches",
          texte: [
            "Demandez en cabine comment la traîne se relève pour la soirée. Certaines princesses ont des poches : Guinevere, des poches discrètes ; Addison, des poches « bien pratiques » — de quoi garder un mouchoir à portée de main.",
          ],
        },
      ],
      aRetenir: [
        "Entraînez-vous avec vos chaussures.",
        "Relevez le devant dans les escaliers.",
        "La traîne se relève pour la soirée.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/coupes/princesse/robe-princesse-confortable-danser", label: "Danser en robe princesse" },
      ],
    },
  ],
  fluide: [
    /* ——————————————————————————————————————— la définition ————— */
    {
      slug: "qu-est-ce-qu-une-robe-de-mariee-fluide",
      q: "Qu'est-ce qu'une robe de mariée fluide ?",
      r: "Une robe au tombé souple, qui suit naturellement le mouvement. Elle ne construit pas la silhouette par le volume : elle glisse sur le corps, dans une matière légère comme la mousseline, la charmeuse ou le satin mat. C'est la coupe la plus souple et la plus légère du catalogue.",
      description:
        "Qu'est-ce qu'une robe de mariée fluide ? Un tombé souple qui suit le mouvement, en mousseline, charmeuse ou satin mat. Définition et fluides MADAMOON, Paris.",
      chapo:
        "Souple et légère : la fluide est la robe qui bouge avec vous. Voici ce qui la définit.",
      sections: [
        {
          titre: "Un tombé, plutôt qu'une construction",
          texte: [
            "La fluide ne cherche pas le volume. Sa matière tombe d'elle-même et suit le corps sans le serrer ; la jupe accompagne chaque pas. Elle peut être cintrée à la taille, reprise par un corset ou laissée libre.",
          ],
        },
        {
          titre: "Ce qu'elle fait à la silhouette",
          texte: [
            "Elle allonge la ligne. Sans ampleur pour élargir ni ajustement pour marquer, elle laisse la silhouette telle qu'elle est, et le tissu l'accompagne.",
          ],
        },
        {
          titre: "Les fluides de la boutique",
          texte: [
            "Chez Watters Designs, Adularia et Ryle en charmeuse ; chez Casablanca Bridal, Dove en satin mat et Maribel en mousseline stretch ; chez Monica Loretti, Marie, Murielle en dentelle florale et mousseline, et Mathilda, pensée pour la femme enceinte ; et Agnessa et Hélène, au corset perlé.",
          ],
        },
      ],
      aRetenir: [
        "Un tombé souple qui suit le mouvement.",
        "Elle allonge la ligne.",
        "Souple et légère.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Les robes fluides" },
        { href: "/robes/adularia", label: "Adularia" },
        { href: "/robes/dove", label: "Dove" },
      ],
    },

    /* ——————————————————————————————————————— les morphologies ————— */
    {
      slug: "robe-fluide-quelle-morphologie",
      q: "À quelle morphologie la robe fluide convient-elle ?",
      r: "C'est la coupe la plus souvent conseillée en premier : elle l'est pour les morphologies en O, en V, en H, en 8 et en X. Pour une morphologie en A, elle vient en second, et vaut l'essai. Aucune morphologie ne l'interdit.",
      description:
        "Robe de mariée fluide : à quelles morphologies convient-elle ? En premier pour O, V, H, 8 et X, à essayer pour A. Les conseils de la boutique MADAMOON, Paris.",
      chapo:
        "Parmi les cinq coupes, c'est celle que la boutique conseille en premier au plus grand nombre de silhouettes. Voici pourquoi.",
      sections: [
        {
          titre: "Les morphologies pour qui elle vient en premier",
          texte: [],
          liste: [
            "En O — elle glisse sans marquer et allonge la ligne.",
            "En V — sa souplesse adoucit des épaules plus larges, surtout avec un décolleté en V.",
            "En H — cintrée à la taille ou portée avec une ceinture, elle marque là où vous le décidez.",
            "En 8 et en X — elle accompagne une ligne déjà équilibrée, sans rien avoir à construire.",
          ],
        },
        {
          titre: "Celle pour qui elle vaut l'essai",
          texte: [
            "En A, préférez une fluide au corsage travaillé — le corset perlé d'Agnessa ou d'Hélène, le décolleté drapé de Dove — qui ramène le regard vers le haut, et une jupe qui tombe sans coller aux hanches.",
          ],
        },
        {
          titre: "Au catalogue",
          texte: [
            "Sur leurs fiches, presque toutes les fluides de la boutique sont indiquées pour les six morphologies ; Ryle l'est pour toutes, sauf la morphologie en O. C'est l'essayage qui tranche.",
          ],
        },
      ],
      aRetenir: [
        "En premier pour O, V, H, 8 et X.",
        "À essayer pour A, avec un haut travaillé.",
        "La coupe la plus souvent conseillée en premier.",
      ],
      liens: [
        { href: "/morphologies/h/robe-fluide-morphologie-h", label: "La fluide et la morphologie en H" },
        { href: "/morphologies/8/robe-fluide-morphologie-8", label: "La fluide et la morphologie en 8" },
        { href: "/coupes/fluide/choisir-robe-fluide-selon-morphologie", label: "Choisir sa fluide selon sa morphologie" },
      ],
    },

    /* ——————————————————————————————————————— l'empire ————— */
    {
      slug: "difference-robe-fluide-robe-empire",
      q: "Quelle différence entre une robe fluide et une robe empire ?",
      r: "La fluide se définit par sa matière et son tombé ; l'empire, par sa coupe : une couture placée juste sous la poitrine, d'où la jupe tombe librement. Une robe empire est souvent fluide, mais une fluide n'est pas forcément empire. La boutique ne classe pas ses robes en « empire » : ses fluides en sont les plus proches.",
      description:
        "Robe fluide ou robe empire : l'une se définit par son tombé, l'autre par une couture sous la poitrine. La différence expliquée, et les fluides MADAMOON à Paris.",
      chapo:
        "Les deux mots se croisent souvent. L'un parle de la matière, l'autre de l'endroit où la robe se resserre.",
      sections: [
        {
          titre: "La fluide, une affaire de tombé",
          texte: [
            "Une matière souple qui suit le mouvement. La taille peut être où l'on veut : marquée par un corset, comme chez Agnessa ou Hélène, ou laissée libre.",
          ],
        },
        {
          titre: "L'empire, une affaire de coupe",
          texte: [
            "La robe se resserre juste sous la poitrine, puis tombe sans marquer la taille ni les hanches. Elle met le buste en valeur et allonge tout ce qui suit.",
          ],
        },
        {
          titre: "Au catalogue",
          texte: [
            "La boutique n'a pas de catégorie « empire » : ce sont ses fluides qui s'en rapprochent le plus. Mathilda, de Monica Loretti, pensée pour la femme enceinte, est rangée avec elles. La ligne exacte de chaque robe se voit en cabine.",
          ],
        },
      ],
      aRetenir: [
        "Fluide : une matière, un tombé.",
        "Empire : une couture sous la poitrine.",
        "Au catalogue, les fluides en sont les plus proches.",
      ],
      liens: [
        { href: "/robes/mathilda", label: "Mathilda" },
        { href: "/morphologies/o/robe-empire-morphologie-o", label: "L'empire et la morphologie en O" },
        { href: "/morphologies/h/robe-empire-morphologie-h", label: "L'empire et la morphologie en H" },
      ],
    },

    /* ——————————————————————————————————————— la matière ————— */
    {
      slug: "matiere-robe-de-mariee-fluide",
      q: "Quelle matière choisir pour une robe de mariée fluide ?",
      r: "Celle qui donne le tombé que vous cherchez. La mousseline est la plus légère et la plus aérienne ; la charmeuse, lumineuse, suit le corps de près ; le satin mat a plus de tenue. Une version stretch ajoute de l'aisance.",
      description:
        "Matière d'une robe de mariée fluide : mousseline légère, charmeuse lumineuse, satin mat qui tient, tulle. Les fluides MADAMOON — Maribel, Adularia, Dove — à Paris.",
      chapo:
        "Dans une fluide, la matière fait la robe. Chacune tombe à sa manière.",
      sections: [
        {
          titre: "Les matières du catalogue",
          texte: [],
          liste: [
            "La mousseline — légère et aérienne : la jupe d'Hélène, celle de Murielle ; Maribel en mousseline stretch.",
            "La charmeuse — lumineuse, elle épouse la silhouette : Adularia, Ryle.",
            "Le satin mat — plus de tenue, une lumière douce : Dove.",
            "Le tulle — une jupe fluide sous un corset perlé : Agnessa.",
          ],
        },
        {
          titre: "Choisir selon la journée",
          texte: [
            "Un conseil : pour un mariage d'été ou une longue journée, la mousseline et les versions stretch ; pour une cérémonie plus solennelle, le satin mat, qui garde sa ligne. La charmeuse, qui suit le corps de près, demande un ajustement précis.",
          ],
        },
        {
          titre: "La dentelle",
          texte: [
            "Elle se pose sur une fluide sans l'alourdir : en dentelle florale sur Murielle, ornée de perles et de fleurs en relief sur le corset d'Hélène.",
          ],
        },
      ],
      aRetenir: [
        "Mousseline : la plus légère.",
        "Charmeuse : lumineuse, près du corps.",
        "Satin mat : plus de tenue.",
      ],
      liens: [
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/adularia", label: "Adularia" },
        { href: "/morphologies/o/matiere-robe-de-mariee-fluide-confortable", label: "Une matière fluide et confortable" },
      ],
    },

    /* ——————————————————————————————————————— la bohème ————— */
    {
      /* La page de la fluide qui vise « robe de mariée bohème » : son
       * adresse et son titre portent l'expression, la question reste
       * celle de la rangée. Mise en page de style (PageStyle).
       * Mots-clés et volumes : docs/seo/. */
      slug: "robe-de-mariee-boheme-paris",
      titre: "Robe de mariée bohème à Paris",
      q: "Une robe fluide convient-elle à un mariage bohème ?",
      r: "Oui, c'est même la coupe la plus naturelle pour un mariage bohème. Une jupe en mousseline, de la dentelle florale, des manches légères : Hélène est pensée, d'après sa fiche, pour la mariée « qui préfère dire OUI dans un look bohème chic ».",
      description:
        "Robe de mariée bohème à Paris : mousseline, dentelle florale, manches légères. Hélène, Murielle, Ryle, et Tessa pour une touche vintage, au showroom MADAMOON.",
      chapo:
        "Une robe de mariée bohème se reconnaît à ce qu'elle laisse respirer : une jupe en mousseline qui bouge, de la dentelle florale, des manches légères ou transparentes. C'est la coupe fluide qui porte le mieux cet esprit, et chez MADAMOON, elle s'essaie dans notre showroom du 10ᵉ, à Paris.",
      style: {
        voirLaCoupe: "Voir les robes fluides",
        robes: {
          titre: "Nos robes bohèmes",
          liste: [
            {
              slug: "helene",
              texte:
                "Un corset en dentelle ornée de petites perles et de fleurs en relief, une jupe en mousseline délicate et légère : un look bohème chic.",
            },
            {
              slug: "murielle",
              texte: "Dentelle florale et mousseline, décolleté en V, manches illusion et fente haute.",
            },
            { slug: "ryle", texte: "Des manches ballon et un décolleté en V profond, en charmeuse." },
          ],
        },
        colonnes: [
          {
            titre: "Ce qui fait le bohème",
            texte:
              "Le bohème aime ce qui bouge et ce qui respire : la dentelle florale, les manches légères ou transparentes, une traîne courte ou absente, une coiffure souple. La robe doit pouvoir marcher dans l'herbe et danser pieds nus.",
          },
          {
            titre: "Bohème, mais pas négligé",
            texte:
              "Une fluide bohème reste une robe de mariée : un corsage travaillé, comme celui d'Hélène, lui donne sa tenue et son éclat. Le bohème est un style, pas une absence de finition.",
          },
        ],
        echo: {
          titre: "Une touche vintage",
          texte:
            "Pour un bohème aux accents vintage, Tessa, de Casablanca Bridal, a d'après sa fiche un « charme vintage-chic » : une sirène au corset structuré, avec une surjupe détachable et des bretelles amovibles. Elle est rangée avec les deux-en-un, et s'essaie volontiers à côté des robes bohèmes.",
          robe: "tessa",
          voir: "Voir Tessa",
        },
        pourQui: {
          titre: "À qui elle va",
          texte:
            "La fluide est conseillée en premier aux morphologies en O, en V, en H, en 8 et en X, et vaut l'essai pour une morphologie en A. Hélène et Murielle sont indiquées, sur leurs fiches, pour les six morphologies ; Ryle pour toutes, sauf la morphologie en O.",
          toutes: "Toutes les morphologies",
        },
        questions: {
          titre: "Les questions",
          liste: [
            {
              q: "Une robe fluide convient-elle à un mariage bohème ?",
              r: "Oui, c'est même la coupe la plus naturelle pour un mariage bohème. Une jupe en mousseline, de la dentelle florale, des manches légères : Hélène est pensée, d'après sa fiche, pour la mariée « qui préfère dire OUI dans un look bohème chic ».",
            },
            {
              q: "Où essayer une robe de mariée bohème à Paris ?",
              r: `Au showroom MADAMOON, ${MAISON.adresse}, dans le 10ᵉ arrondissement, sur rendez-vous. Le showroom est privatisé pour vous pendant une heure : le temps d'essayer plusieurs fluides et de comparer les matières.`,
            },
          ],
          toutes: "Toutes les questions sur la fluide",
        },
        fin: {
          titre: "Essayer une robe bohème en showroom",
          texte: `${MAISON.adresse}, Paris 10ᵉ, sur rendez-vous.`,
        },
      },
      sections: [],
      aRetenir: [],
      liens: [],
    },

    /* ——————————————————————————————————————— l'été ————— */
    {
      slug: "robe-fluide-mariage-ete",
      q: "Une robe fluide est-elle adaptée à un mariage en été ?",
      r: "Oui, c'est l'une des plus agréables à porter par la chaleur. Une matière légère comme la mousseline laisse respirer, et des épaules dégagées, un dos ouvert ou une fente allègent encore la robe. Prévoyez simplement une épaule couverte pour la cérémonie si le lieu le demande.",
      description:
        "Robe de mariée fluide pour un mariage en été : mousseline légère, épaules dégagées, dos ouvert, fente. Les fluides MADAMOON — Dove, Maribel, Murielle — à Paris.",
      chapo:
        "Quand il fait chaud, la légèreté n'est plus un style : c'est un confort. La fluide l'a par nature.",
      sections: [
        {
          titre: "Une matière qui respire",
          texte: [
            "La mousseline est la plus légère du catalogue : la jupe d'Hélène, celle de Murielle, Maribel en mousseline stretch. La charmeuse et le satin mat restent fluides, avec un peu plus de corps.",
          ],
        },
        {
          titre: "Ce qui allège",
          texte: [],
          liste: [
            "Des épaules dénudées — Dove, avec son décolleté drapé.",
            "Un dos ouvert — Dove encore, et le dos en V de Murielle.",
            "Une fente — Maribel, Murielle : elle laisse passer l'air et facilite la marche.",
            "Des manches illusion — Murielle : couvrir sans avoir chaud.",
          ],
        },
        {
          titre: "La cérémonie et la soirée",
          texte: [
            "Un conseil : pour une cérémonie religieuse, un voile léger ou une étole couvrent les épaules le temps qu'il faut. Murielle existe aussi sans fente, d'après sa fiche, pour une version plus couvrante.",
          ],
        },
      ],
      aRetenir: [
        "Oui : l'une des plus agréables par la chaleur.",
        "Mousseline, épaules dégagées, dos ouvert.",
        "Un voile léger pour couvrir à la cérémonie.",
      ],
      liens: [
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/murielle", label: "Murielle" },
      ],
    },

    /* ——————————————————————————————————————— la tenue ————— */
    {
      slug: "robe-fluide-belle-tenue",
      q: "Comment choisir une robe fluide qui garde une belle tenue ?",
      r: "En regardant trois choses : une matière qui a du poids, comme le satin mat ou la charmeuse ; un corsage qui tient, parfois structuré en corset ; et un ajustement précis. Une fluide bien choisie tombe droit, sans flotter ni coller.",
      description:
        "Une robe de mariée fluide qui garde sa tenue : matière qui a du poids, corsage structuré, ajustement précis. Les conseils et fluides de MADAMOON à Paris.",
      chapo:
        "Fluide ne veut pas dire flottante. Une belle fluide tombe juste — et cela se choisit.",
      sections: [
        {
          titre: "Une matière qui a du poids",
          texte: [
            "Le satin mat de Dove et la charmeuse d'Adularia ou de Ryle tombent d'eux-mêmes : leur poids tire la robe vers le bas et dessine une ligne nette. La mousseline, plus légère, s'envole davantage ; un corsage structuré lui donne son ancrage.",
          ],
        },
        {
          titre: "Un corsage qui tient",
          texte: [
            "Un corset perlé, comme celui d'Agnessa ou d'Hélène, tient le haut et laisse la jupe libre. Le corsage brodé et perlé à la main de Maribel structure le buste au-dessus d'une jupe en mousseline.",
          ],
        },
        {
          titre: "Un ajustement précis",
          texte: [
            "Une fluide pardonne peu un ajustement approximatif. Après l'essayage, la boutique prend vos mensurations pour lancer la confection, et ses couturières ajustent la robe sur place. Un conseil : regardez-vous de profil et en marchant, pas seulement de face.",
          ],
        },
      ],
      aRetenir: [
        "Une matière qui a du poids.",
        "Un corsage qui tient le haut.",
        "Un ajustement précis.",
      ],
      liens: [
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/agnessa", label: "Agnessa" },
        { href: "/faq/duree-retouches-robe-de-mariee", label: "La durée des retouches" },
      ],
    },

    /* ——————————————————————————————————————— le formel ————— */
    {
      slug: "robe-fluide-mariage-formel",
      q: "Une robe fluide peut-elle être élégante pour un mariage formel ?",
      r: "Oui. Dans un satin mat ou une charmeuse, avec une traîne et une ligne épurée, la fluide a toute la solennité d'une grande cérémonie. Dove, avec son dos ouvert et ses boutons jusqu'au bout de la traîne, en est l'exemple.",
      description:
        "Robe de mariée fluide pour un mariage formel : satin mat, charmeuse, ligne épurée, traîne. Dove, Adularia et Marie, les fluides élégantes de MADAMOON, Paris.",
      chapo:
        "On associe la fluide aux mariages champêtres. Elle sait aussi être la robe la plus élégante d'une cérémonie.",
      sections: [
        {
          titre: "Les fluides les plus habillées",
          texte: [],
          liste: [
            "Dove — satin mat, décolleté drapé, épaules dénudées, et une ligne de boutons qui court jusqu'à la traîne.",
            "Adularia — en charmeuse, d'une « élégance minimaliste » à l'allure moderne.",
            "Marie — de Monica Loretti, une ligne intemporelle.",
          ],
        },
        {
          titre: "Ce qui la rend formelle",
          texte: [
            "Un conseil : une matière qui a de la tenue plutôt qu'une mousseline très légère, une traîne, un décolleté net, et un voile long. La sobriété de la ligne fait le reste.",
          ],
        },
        {
          titre: "Pour une cérémonie religieuse",
          texte: [
            "Des épaules couvertes ou un voile qui les couvre. Murielle a des manches illusion et existe aussi sans fente, d'après sa fiche, pour une version plus couvrante.",
          ],
        },
      ],
      aRetenir: [
        "Oui, en satin mat ou en charmeuse.",
        "Une traîne et une ligne épurée.",
        "Dove en est l'exemple.",
      ],
      liens: [
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/adularia", label: "Adularia" },
        { href: "/robes/marie", label: "Marie" },
      ],
    },

    /* ——————————————————————————————————————— les chaussures ————— */
    {
      slug: "chaussures-robe-fluide",
      q: "Quel type de chaussures porter avec une robe fluide ?",
      r: "Des chaussures dans lesquelles vous tiendrez toute la journée, choisies avant les retouches : la longueur de la robe se règle sur elles. Avec une fente, elles se voient et méritent d'être choisies avec soin ; pour un mariage en plein air, préférez un talon large ou des sandales plates.",
      description:
        "Quelles chaussures avec une robe de mariée fluide ? Choisies avant les retouches, confortables, soignées si la robe a une fente. Les conseils de MADAMOON, Paris.",
      chapo:
        "Avec une fluide, la chaussure se voit plus qu'on ne le croit : à chaque pas, la jupe bouge.",
      sections: [
        {
          titre: "Avant les retouches",
          texte: [
            "Un conseil : achetez vos chaussures avant les retouches et apportez-les aux essayages. Une fluide qui frôle le sol se règle au centimètre, et la hauteur du talon change tout.",
          ],
        },
        {
          titre: "Avec une fente",
          texte: [
            "Maribel et Murielle ont une fente : la chaussure se voit à chaque pas. Une sandale fine ou un escarpin épuré prolongent la jambe.",
          ],
        },
        {
          titre: "Selon le lieu",
          texte: [],
          liste: [
            "Dans l'herbe ou le gravier — un talon large, ou des sandales plates.",
            "Pour un mariage bohème — des sandales plates, voire pieds nus pour la soirée.",
            "Pour une longue journée — un talon modéré, et une seconde paire pour danser.",
          ],
        },
      ],
      aRetenir: [
        "Choisies avant les retouches.",
        "Soignées si la robe a une fente.",
        "Adaptées au sol et à la journée.",
      ],
      liens: [
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/murielle", label: "Murielle" },
        { href: "/faq/duree-retouches-robe-de-mariee", label: "La durée des retouches" },
      ],
    },

    /* ——————————————————————————————————————— le voile, les accessoires ————— */
    {
      slug: "voile-accessoires-robe-fluide",
      q: "Quel voile ou accessoire associer à une robe fluide ?",
      r: "Un voile léger, en tulle souple, qui bouge avec la robe ; une ceinture bijou pour marquer la taille ; un bijou de cheveux ou des boucles d'oreilles. Une fluide est épurée : un accessoire bien choisi suffit à la signer.",
      description:
        "Voile et accessoires pour une robe de mariée fluide : voile en tulle souple, ceinture bijou, bijou de cheveux. Les conseils et fluides de MADAMOON à Paris.",
      chapo:
        "Une fluide laisse de la place à l'accessoire. C'est une chance, à condition de n'en choisir qu'un ou deux.",
      sections: [
        {
          titre: "Le voile",
          texte: [
            "Un conseil : un voile en tulle souple, qui suit le mouvement de la robe plutôt qu'un voile raide. Quand le dos est travaillé — la ligne de boutons de Dove, le dos en V de Murielle ou d'Agnessa —, un voile transparent le laisse voir.",
          ],
        },
        {
          titre: "La ceinture",
          texte: [
            "Sur une fluide sans taille marquée, une ceinture bijou dessine la taille là où vous le voulez. C'est aussi ce que la boutique conseille aux morphologies en H et en 8.",
          ],
        },
        {
          titre: "Les bijoux",
          texte: [
            "Avec un corsage perlé — Agnessa, Hélène, Maribel —, des boucles d'oreilles suffisent. Avec une fluide minimaliste, comme Adularia, un bijou plus marqué peut porter toute la tenue. Avec les manches ballon de Ryle, gardez le cou dégagé.",
          ],
        },
      ],
      aRetenir: [
        "Un voile souple, qui bouge avec la robe.",
        "Une ceinture bijou pour marquer la taille.",
        "Un ou deux accessoires, pas plus.",
      ],
      liens: [
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/adularia", label: "Adularia" },
        { href: "/robes/ryle", label: "Ryle" },
      ],
    },

    /* ——————————————————————————————————————— les petites mariées ————— */
    {
      slug: "robe-fluide-petite-mariee",
      q: "Une robe fluide convient-elle aux petites mariées ?",
      r: "Oui, très bien : sans volume pour l'élargir, la fluide allonge la ligne. Un décolleté en V, une taille marquée un peu haut et une longueur réglée sur vos chaussures accentuent l'effet. Évitez seulement l'excès de tissu, qui peut prendre le dessus.",
      description:
        "Robe de mariée fluide pour une petite mariée : une ligne qui allonge, un décolleté en V, une longueur réglée au centimètre. Les conseils de MADAMOON, Paris.",
      chapo:
        "La fluide est l'une des coupes les plus flatteuses pour une petite silhouette. Voici comment en tirer le meilleur.",
      sections: [
        {
          titre: "Une ligne qui allonge",
          texte: [
            "La fluide descend sans s'élargir : l'œil suit une ligne continue, du buste au sol. C'est ce qui allonge.",
          ],
        },
        {
          titre: "Ce qui accentue l'effet",
          texte: [],
          liste: [
            "Un décolleté en V — Ryle, Maribel, Murielle, Agnessa : il étire le buste.",
            "Une taille marquée un peu haut — elle allonge les jambes.",
            "Une fente — Maribel, Murielle : elle dévoile la jambe en marchant.",
          ],
        },
        {
          titre: "La longueur",
          texte: [
            "Un conseil : évitez les manches trop volumineuses et l'excès de tissu, et réglez la longueur sur vos chaussures. Après l'essayage, la boutique prend vos mensurations et ses couturières ajustent la robe sur place.",
          ],
        },
      ],
      aRetenir: [
        "Oui : la fluide allonge la ligne.",
        "Un V et une taille un peu haute.",
        "Une longueur réglée sur vos chaussures.",
      ],
      liens: [
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/murielle", label: "Murielle" },
        { href: "/coupes/fluide/chaussures-robe-fluide", label: "Les chaussures avec une fluide" },
      ],
    },

    /* ——————————————————————————————————————— selon la morphologie ————— */
    {
      slug: "choisir-robe-fluide-selon-morphologie",
      q: "Comment choisir une robe fluide selon sa morphologie ?",
      r: "En choisissant les détails plutôt que la coupe : le décolleté, la taille et les manches. Un V pour une morphologie en O ou en V, une taille marquée pour une morphologie en H ou en 8, un corsage travaillé pour une morphologie en A. La fluide fait le reste.",
      description:
        "Choisir une robe de mariée fluide selon sa morphologie : décolleté, taille, manches, matière. Les conseils pour O, A, V, H, 8 et X, et les fluides MADAMOON.",
      chapo:
        "La fluide convient à presque toutes les silhouettes. Ce sont ses détails qui l'accordent à la vôtre.",
      sections: [
        {
          titre: "Morphologie par morphologie",
          texte: [],
          liste: [
            "En O — un tombé qui glisse sans marquer, et un décolleté en V ou en cœur qui met la poitrine en valeur.",
            "En A — un corsage travaillé qui ramène le regard vers le haut : le corset perlé d'Agnessa ou d'Hélène, le décolleté drapé de Dove.",
            "En V — un décolleté en V, une structure légère aux épaules ; des manches volumineuses, comme celles de Ryle, sont à essayer avec prudence.",
            "En H — une taille marquée, par une coupe cintrée ou une ceinture.",
            "En 8 et en X — une reprise à la taille, pour que la fluide ne flotte pas là où la taille se creuse.",
          ],
        },
        {
          titre: "La matière",
          texte: [
            "Un conseil : la mousseline glisse sans marquer, le satin mat structure davantage, la charmeuse suit le corps de près et demande un ajustement précis.",
          ],
        },
        {
          titre: "Au catalogue",
          texte: [
            "Presque toutes les fluides de la boutique sont indiquées, sur leurs fiches, pour les six morphologies. L'essayage montre laquelle est la vôtre.",
          ],
        },
      ],
      aRetenir: [
        "Les détails accordent la fluide à la silhouette.",
        "Le décolleté, la taille, les manches.",
        "L'essayage tranche.",
      ],
      liens: [
        { href: "/morphologies", label: "Les six morphologies" },
        { href: "/morphologies/x/robe-fluide-silhouette-equilibree", label: "La fluide et une silhouette équilibrée" },
        { href: "/robes/agnessa", label: "Agnessa" },
      ],
    },
  ],
  trapeze: [
    /* ——————————————————————————————————————— la définition ————— */
    {
      slug: "qu-est-ce-qu-une-robe-de-mariee-trapeze",
      q: "Qu'est-ce qu'une robe de mariée trapèze ou A-line ?",
      r: "Une robe au buste ajusté, dont la jupe s'ouvre en A depuis la taille jusqu'au sol, comme la lettre. « Trapèze » en français, « A-line » en anglais : c'est la même coupe. La boutique la tient pour la plus universelle, juste et intemporelle.",
      description:
        "Qu'est-ce qu'une robe de mariée trapèze ou A-line ? Un buste ajusté, une jupe qui s'ouvre en A. Définition de la coupe la plus universelle, et trapèzes MADAMOON.",
      chapo:
        "Juste et intemporelle : la trapèze est la coupe que la boutique dit la plus universelle. Voici ce qui la définit.",
      sections: [
        {
          titre: "Un A, de la taille au sol",
          texte: [
            "Le buste est ajusté et la taille marquée ; de là, la jupe s'élargit progressivement, sans ampleur soudaine, jusqu'au sol. Elle suit les hanches au lieu de les épouser. C'est la ligne de la lettre A, d'où son nom anglais.",
          ],
        },
        {
          titre: "Ce qu'elle fait à la silhouette",
          texte: [
            "Elle structure le buste et libère le reste. Sans volume excessif ni ajustement serré, elle équilibre la silhouette et se porte facilement une journée entière.",
          ],
        },
        {
          titre: "Les trapèzes de la boutique",
          texte: [
            "Chez Watters Designs, Pendant et Aster en dentelle, Finell en satin, Fortune en crêpe, Mitra et Nirali à taille basse ; chez Casablanca Bridal, Solana, Carrie et Emerald ; chez Monica Loretti, Monica en jacquard ; chez Olya Mak, River, une trapèze courte.",
          ],
        },
      ],
      aRetenir: [
        "Un buste ajusté, une jupe qui s'ouvre en A.",
        "Trapèze et A-line : la même coupe.",
        "La plus universelle du catalogue.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "Les robes trapèze" },
        { href: "/robes/aster", label: "Aster" },
        { href: "/robes/finell", label: "Finell" },
      ],
    },

    /* ——————————————————————————————————————— la princesse ————— */
    {
      slug: "difference-robe-trapeze-robe-princesse",
      q: "Quelle différence entre une robe trapèze et une robe princesse ?",
      r: "Tout tient au volume de la jupe. La trapèze s'ouvre en A, régulièrement, et reste facile à porter ; la princesse assume une jupe ample, de robe de bal. Choisissez la trapèze pour la liberté de mouvement et la sobriété, la princesse pour la solennité.",
      description:
        "Robe trapèze ou princesse : laquelle choisir ? La trapèze s'ouvre en A et se porte facilement, la princesse assume le volume. Les conseils de MADAMOON, Paris.",
      chapo:
        "Même buste ajusté, deux jupes différentes. Voici comment savoir laquelle vous ressemble.",
      sections: [
        {
          titre: "Quand choisir la trapèze",
          texte: [],
          liste: [
            "Pour bouger librement — la jupe s'ouvre sans peser, de la cérémonie à la piste.",
            "Pour un lieu plus intime — une mairie, un restaurant, une voiture : la trapèze y tient sans encombrer.",
            "Pour une allure sobre — elle met le corsage en valeur sans que la jupe lui vole la vedette.",
          ],
        },
        {
          titre: "Quand lui préférer la princesse",
          texte: [
            "Pour une grande cérémonie, un lieu vaste et une silhouette de robe de bal : la princesse a un corset travaillé et un volume assumé que la trapèze n'a pas.",
          ],
        },
        {
          titre: "Entre les deux",
          texte: [
            "Plusieurs robes du catalogue se portent dans l'une ou l'autre : Sienna, Charlotte, Solana, Dolores, et Alicia et Lovia, décrites comme « trapèze ou volume princesse ». En cabine, on voit de quel côté elles penchent sur vous.",
          ],
        },
      ],
      aRetenir: [
        "Trapèze : liberté et sobriété.",
        "Princesse : volume et solennité.",
        "Plusieurs robes se portent dans les deux.",
      ],
      liens: [
        { href: "/coupes/princesse/difference-robe-princesse-robe-trapeze", label: "La même question, côté princesse" },
        { href: "/robes/alicia", label: "Alicia" },
        { href: "/robes/solana", label: "Solana" },
      ],
    },

    /* ——————————————————————————————————————— les morphologies ————— */
    {
      slug: "robe-trapeze-quelle-morphologie",
      q: "À quelle morphologie la robe trapèze convient-elle ?",
      r: "Elle fait partie des premières coupes à essayer pour les morphologies en O, en A, en 8 et en X. Pour une morphologie en V ou en H, elle vient en second, et vaut l'essai. Toutes les trapèzes du catalogue sont indiquées, sur leurs fiches, pour les six morphologies.",
      description:
        "Robe de mariée trapèze : à quelles morphologies convient-elle ? En premier pour O, A, 8 et X, à essayer pour V et H. Les conseils de la boutique MADAMOON.",
      chapo:
        "La coupe la plus universelle porte bien son nom. Voici pour qui elle vient en premier.",
      sections: [
        {
          titre: "Les morphologies pour qui elle vient en premier",
          texte: [],
          liste: [
            "En O — le buste est tenu et la jupe part en A dès la taille : le regard s'arrête sur le décolleté.",
            "En A — la jupe suit les hanches au lieu de les épouser.",
            "En 8 et en X — la taille marquée et la jupe en A accompagnent une silhouette déjà équilibrée.",
          ],
        },
        {
          titre: "Celles pour qui elle vaut l'essai",
          texte: [
            "En V, choisissez une jupe un peu plus ample et un décolleté en V ou des épaules dénudées, qui adoucissent la ligne des épaules. En H, un corset qui marque la taille, comme celui de Finell ou de Lovia, crée la courbe.",
          ],
        },
        {
          titre: "Au catalogue",
          texte: [
            "Les dix-neuf trapèzes de la boutique sont indiquées, sur leurs fiches, pour les six morphologies : c'est la coupe la plus facile à porter. L'essayage choisit entre elles.",
          ],
        },
      ],
      aRetenir: [
        "En premier pour O, A, 8 et X.",
        "À essayer pour V et H.",
        "Toutes les trapèzes vont aux six morphologies.",
      ],
      liens: [
        { href: "/morphologies/a/robe-trapeze-morphologie-a", label: "La trapèze et la morphologie en A" },
        { href: "/morphologies/o/robe-trapeze-morphologie-o", label: "La trapèze et la morphologie en O" },
        { href: "/morphologies", label: "Les six morphologies" },
      ],
    },

    /* ——————————————————————————————————————— les petites tailles ————— */
    {
      slug: "robe-trapeze-petite-taille",
      q: "La robe trapèze convient-elle à une petite taille ?",
      r: "Oui, c'est l'une des coupes les plus faciles pour une petite silhouette : la ligne en A allonge sans élargir. Choisissez un volume mesuré, un décolleté en V ou une fente, et une longueur réglée sur vos chaussures. Une trapèze courte, comme River, est aussi une option.",
      description:
        "Robe de mariée trapèze pour une petite taille : une ligne en A qui allonge, un volume mesuré, un V ou une fente. Les conseils et trapèzes de MADAMOON, Paris.",
      chapo:
        "La trapèze ne demande pas d'être grande. Elle demande un volume à votre échelle.",
      sections: [
        {
          titre: "Une ligne qui allonge",
          texte: [
            "La jupe s'ouvre progressivement depuis la taille : l'œil suit une ligne continue jusqu'au sol, sans ampleur soudaine qui tasserait la silhouette.",
          ],
        },
        {
          titre: "Ce qui accentue l'effet",
          texte: [],
          liste: [
            "Un décolleté en V — Emerald, Lovia, Angel, Monica : il étire le buste.",
            "Une fente — Héra, Monica, Alicia, Lovia : elle dévoile la jambe en marchant.",
            "Un volume mesuré — une jupe en crêpe ou en satin, comme Fortune ou Héra, plutôt que plusieurs couches de tulle.",
          ],
        },
        {
          titre: "La longueur",
          texte: [
            "Après l'essayage, la boutique prend vos mensurations pour lancer la confection, et ses couturières ajustent la robe sur place. Un conseil : venez avec les chaussures du jour J. Et River, d'Olya Mak, est une trapèze courte.",
          ],
        },
      ],
      aRetenir: [
        "Oui : la ligne en A allonge.",
        "Un V, une fente, un volume mesuré.",
        "Une longueur réglée sur vos chaussures.",
      ],
      liens: [
        { href: "/robes/hera", label: "Héra" },
        { href: "/robes/river", label: "River" },
        { href: "/faq/duree-retouches-robe-de-mariee", label: "La durée des retouches" },
      ],
    },

    /* ——————————————————————————————————————— la cérémonie civile ————— */
    {
      slug: "robe-trapeze-ceremonie-civile",
      q: "Une robe trapèze est-elle adaptée à une cérémonie civile ?",
      r: "Oui, c'est l'une des coupes les plus naturelles à la mairie : sobre, facile à porter, sans volume encombrant. Une trapèze épurée, une courte comme River, ou une robe à pièce amovible — la veste de Solana, les manches d'Aster — pour changer d'allure entre la mairie et la soirée.",
      description:
        "Robe de mariée trapèze pour une cérémonie civile : sobre, facile à porter, courte ou à pièce amovible. River, Solana, Aster, les trapèzes MADAMOON à Paris.",
      chapo:
        "La mairie demande une robe qui tienne dans la salle, dans la voiture et sur les marches. La trapèze sait tout cela.",
      sections: [
        {
          titre: "Les trapèzes de la mairie",
          texte: [],
          liste: [
            "River — d'Olya Mak, courte, au décolleté carré ; sa fiche la dit parfaite pour un deuxième look, une réception ou une cérémonie moins conventionnelle.",
            "Fortune — un bustier en crêpe stretch et organza satin, à l'allure élégante et intemporelle.",
            "Monica — de Monica Loretti, en jacquard floral, avec une large ceinture et une fente.",
          ],
        },
        {
          titre: "Deux allures en une",
          texte: [
            "Solana, de Casablanca Bridal, a une veste asymétrique amovible ; Aster, de Watters Designs, des manches amovibles. Couvertes pour la mairie, plus dégagées pour la soirée.",
          ],
        },
        {
          titre: "Un conseil",
          texte: [
            "Pour une cérémonie civile suivie d'une grande réception, une seule trapèze peut suffire ; pour deux journées distinctes, une courte pour la mairie et une longue pour la fête marquent joliment le contraste.",
          ],
        },
      ],
      aRetenir: [
        "Oui : sobre et facile à porter.",
        "River, une trapèze courte.",
        "Une pièce amovible pour deux allures.",
      ],
      liens: [
        { href: "/robes/river", label: "River" },
        { href: "/robes/solana", label: "Solana" },
        { href: "/coupes/sirene/robe-sirene-mariage-civil", label: "Une sirène pour un mariage civil" },
      ],
    },

    /* ——————————————————————————————————————— le volume ————— */
    {
      slug: "choisir-volume-robe-trapeze",
      q: "Comment choisir le volume d'une robe trapèze ?",
      r: "Selon votre silhouette, le lieu et l'allure voulue. Le catalogue va d'une trapèze près du corps, en crêpe ou en satin, à une jupe de plusieurs couches de tulle presque princesse. La matière fait l'essentiel : le crêpe tombe, le tulle gonfle. Essayez deux volumes pour comparer.",
      description:
        "Choisir le volume d'une robe de mariée trapèze : du crêpe près du corps au tulle presque princesse. Les conseils et trapèzes de MADAMOON à Paris.",
      chapo:
        "La trapèze n'a pas un volume, elle en a plusieurs. Voici comment trouver le vôtre.",
      sections: [
        {
          titre: "Du plus sobre au plus ample",
          texte: [],
          liste: [
            "Sobre — Fortune, en crêpe stretch ; Héra et Finell, en satin.",
            "Intermédiaire — Aster, Pendant, Emerald : une jupe en A franche, en dentelle, en satin ou en tulle.",
            "Ample — Carrie et ses couches de tulle pailleté ; Sienna, au « volume généreux » ; Alicia et Lovia, en « trapèze ou volume princesse ».",
          ],
        },
        {
          titre: "Selon le lieu",
          texte: [
            "Un conseil : un volume mesuré pour une mairie, un restaurant ou une journée chargée ; plus d'ampleur pour une grande salle ou une église. Pensez à toute la journée, pas seulement à l'entrée.",
          ],
        },
        {
          titre: "Selon la silhouette",
          texte: [
            "Pour une petite silhouette, un volume mesuré ; pour des épaules larges, une jupe un peu plus ample qui rééquilibre ; pour des hanches marquées, une jupe qui s'ouvre dès la taille, sans couches superposées.",
          ],
        },
      ],
      aRetenir: [
        "Du crêpe près du corps au tulle presque princesse.",
        "La matière fait le volume.",
        "Pensez au lieu et à toute la journée.",
      ],
      liens: [
        { href: "/robes/fortune", label: "Fortune" },
        { href: "/robes/carrie", label: "Carrie" },
        { href: "/robes/sienna", label: "Sienna" },
      ],
    },

    /* ——————————————————————————————————————— le minimalisme ————— */
    {
      slug: "robe-trapeze-minimaliste-moderne",
      q: "Une robe trapèze peut-elle être minimaliste et moderne ?",
      r: "Oui. Dans une matière nette — crêpe, satin —, avec peu d'ornements et une ligne franche, la trapèze devient l'une des robes les plus modernes du catalogue. Fortune, Héra, Monica et River en sont les exemples.",
      description:
        "Robe de mariée trapèze minimaliste et moderne : crêpe, satin, ligne franche, peu d'ornements. Fortune, Héra, Monica et River, chez MADAMOON à Paris.",
      chapo:
        "On associe la trapèze à la dentelle et aux contes de fées. Elle sait aussi être épurée.",
      sections: [
        {
          titre: "Les trapèzes épurées",
          texte: [],
          liste: [
            "Fortune — un bustier en crêpe stretch et organza satin.",
            "Héra — en satin, au décolleté Bardot, avec une fente sur le devant qui lui donne une allure « résolument contemporaine ».",
            "Monica — un jacquard floral, une large ceinture et une fente : la fiche parle d'une « la simplicité est sublimée par de beaux détails ».",
            "River — d'Olya Mak, courte, à la silhouette « épurée et sculpturale ».",
          ],
        },
        {
          titre: "Ce qui la rend moderne",
          texte: [
            "Un conseil : une matière lisse plutôt que des couches de tulle, un décolleté graphique — bustier droit, carré, Bardot —, une fente, et un seul détail fort. Nirali, « résolument moderne » d'après sa fiche, joue sur un décolleté droit bordé de fleurs faites main.",
          ],
        },
        {
          titre: "Moderne, pas froide",
          texte: [
            "Une trapèze minimaliste repose sur la coupe et l'ajustement : c'est là que se voit la différence. À l'essayage, regardez-la de profil et en marchant.",
          ],
        },
      ],
      aRetenir: [
        "Oui : une matière nette, une ligne franche.",
        "Peu d'ornements, un détail fort.",
        "Fortune, Héra, Monica, River.",
      ],
      liens: [
        { href: "/robes/fortune", label: "Fortune" },
        { href: "/robes/hera", label: "Héra" },
        { href: "/robes/monica", label: "Monica" },
      ],
    },

    /* ——————————————————————————————————————— le décolleté ————— */
    {
      slug: "decollete-robe-trapeze",
      q: "Quel décolleté choisir avec une robe trapèze ?",
      r: "Celui qui met en valeur votre buste et votre style. La trapèze les accueille tous : cœur, V, carré, droit, arrondi, épaules dénudées. Un V allonge, un cœur dessine la poitrine, un carré ou un bustier droit apporte une touche graphique.",
      description:
        "Quel décolleté pour une robe de mariée trapèze ? Cœur, V, carré, droit, arrondi, épaules dénudées. Les conseils et trapèzes de MADAMOON, Paris.",
      chapo:
        "La jupe en A laisse toute la place au buste. Le décolleté fait le caractère de la robe.",
      sections: [
        {
          titre: "Les décolletés du catalogue",
          texte: [],
          liste: [
            "Cœur — Finell, à l'encolure sculptée ; Sienna, Charlotte, Solana.",
            "En V — Emerald, Lovia, Angel, Monica.",
            "Carré — Dolores, River.",
            "Droit — Nirali, bordé de fleurs faites main.",
            "Arrondi — Calla.",
            "Épaules dénudées — Pendant, Héra en Bardot ; Alicia, épaules dégagées.",
          ],
        },
        {
          titre: "Selon la silhouette",
          texte: [
            "Un conseil : le V allonge le buste et adoucit des épaules larges ; le cœur met la poitrine en valeur ; les épaules dénudées ou une encolure carrée élargissent joliment des épaules étroites.",
          ],
        },
        {
          titre: "Plus couvrant",
          texte: [
            "Pendant a des manches longues en dentelle, Aster des manches amovibles et un corsage drapé. Charlotte existe aussi sans le décolleté plongeant, d'après sa fiche, pour une version plus couvrante.",
          ],
        },
      ],
      aRetenir: [
        "La trapèze accueille tous les décolletés.",
        "Le V allonge, le cœur dessine.",
        "Des versions plus couvrantes existent.",
      ],
      liens: [
        { href: "/robes/finell", label: "Finell" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/pendant", label: "Pendant" },
      ],
    },

    /* ——————————————————————————————————————— la matière ————— */
    {
      slug: "matiere-robe-trapeze",
      q: "Quelle matière privilégier pour une robe trapèze ?",
      r: "Celle qui donne l'allure voulue. La dentelle pour une trapèze romantique, le satin pour une ligne nette, le tulle pour du volume léger, le crêpe pour une trapèze épurée qui tombe. Emerald existe même avec une jupe de tulle ou de satin, au choix.",
      description:
        "Quelle matière pour une robe de mariée trapèze ? Dentelle, satin, tulle, crêpe ou jacquard. Les trapèzes MADAMOON — Aster, Finell, Carrie, Fortune — à Paris.",
      chapo:
        "La coupe reste la même ; la matière change tout. Voici ce que chacune donne à une trapèze.",
      sections: [
        {
          titre: "Les matières du catalogue",
          texte: [],
          liste: [
            "La dentelle — Pendant ; Aster, en dentelle de Chantilly ; Charlotte, en dentelle Caterina ; Mitra, en dentelle Cassie ; Calla, en dentelle Highclare.",
            "Le satin — Finell, Héra ; Aster associe le satin à la dentelle.",
            "Le tulle — Carrie, en tulle pailleté ; Calla, en tulle très souple ; Dolores.",
            "Le crêpe — Fortune, en crêpe stretch et organza satin.",
            "Le jacquard — Monica, aux motifs floraux.",
          ],
        },
        {
          titre: "Au choix",
          texte: [
            "Emerald, de Casablanca Bridal, se décline avec une jupe de tulle ou de satin, sous un même corsage perlé : la même robe, deux allures.",
          ],
        },
        {
          titre: "Un conseil",
          texte: [
            "Pour un mariage d'été ou une longue journée, le tulle léger ou un crêpe stretch ; pour une cérémonie solennelle, le satin, qui garde sa ligne ; pour une allure romantique, la dentelle.",
          ],
        },
      ],
      aRetenir: [
        "Dentelle : romantique.",
        "Satin : une ligne nette.",
        "Tulle : du volume léger ; crêpe : épuré.",
      ],
      liens: [
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/aster", label: "Aster" },
        { href: "/robes/calla", label: "Calla" },
      ],
    },

    /* ——————————————————————————————————————— la morphologie en O ————— */
    {
      slug: "robe-trapeze-convient-morphologie-o",
      q: "Une robe trapèze convient-elle à une morphologie en O ?",
      r: "Oui, c'est l'une des deux coupes à essayer en premier. Pour en tirer le meilleur, choisissez un décolleté en V ou en cœur, un corsage qui tient le buste, et une jupe qui part de la taille dans une matière qui tombe, plutôt que des couches de tulle.",
      description:
        "Robe de mariée trapèze et morphologie en O : un décolleté en V ou en cœur, un corsage qui tient, une matière qui tombe. Les conseils de MADAMOON, Paris.",
      chapo:
        "La trapèze fait partie des coupes que la boutique conseille d'abord aux silhouettes en O. Voici quelles trapèzes regarder.",
      sections: [
        {
          titre: "Le décolleté",
          texte: [
            "Un V ou un cœur met la poitrine en valeur et attire le regard vers le haut. En V : Emerald, Lovia, Angel, Monica ; en cœur : Finell, Sienna, Charlotte.",
          ],
        },
        {
          titre: "Le corsage et la jupe",
          texte: [
            "Un corsage structuré tient le buste ; la jupe part en A dès la taille et laisse le reste libre. Un conseil : une matière qui tombe — satin, crêpe — glisse mieux qu'une jupe faite de plusieurs couches de tulle.",
          ],
        },
        {
          titre: "Les manches",
          texte: [
            "Pour couvrir les bras, Pendant a des manches longues en dentelle, et Aster des manches amovibles, à garder pour la cérémonie.",
          ],
        },
      ],
      aRetenir: [
        "Oui : l'une des deux coupes à essayer en premier.",
        "Un décolleté en V ou en cœur.",
        "Une matière qui tombe.",
      ],
      liens: [
        { href: "/morphologies/o/robe-trapeze-morphologie-o", label: "La trapèze, vue de la morphologie en O" },
        { href: "/morphologies/o", label: "La morphologie en O" },
        { href: "/robes/emerald", label: "Emerald" },
      ],
    },

    /* ——————————————————————————————————————— les accessoires ————— */
    {
      slug: "accessoiriser-robe-trapeze",
      q: "Comment accessoiriser une robe de mariée trapèze ?",
      r: "En suivant le décolleté et le style de la robe. Une trapèze sobre accueille un voile long, une ceinture ou un bijou marqué ; une trapèze perlée ou pailletée se suffit presque. Certaines ont leurs propres pièces : la veste de Solana, les manches d'Aster, la ceinture de Monica.",
      description:
        "Accessoiriser une robe de mariée trapèze : voile, ceinture, bijoux selon le décolleté. Les pièces des trapèzes MADAMOON — Solana, Aster, Monica — à Paris.",
      chapo:
        "La trapèze est une base juste. L'accessoire lui donne sa signature.",
      sections: [
        {
          titre: "Les pièces des robes",
          texte: [],
          liste: [
            "Solana — une veste asymétrique amovible.",
            "Aster — des manches amovibles.",
            "Monica — une large ceinture qui souligne la taille.",
            "Mitra — de délicats rubans de velours.",
          ],
        },
        {
          titre: "Le voile",
          texte: [
            "Un conseil : accordez sa longueur à la traîne. Un voile long prolonge une traîne chapelle, comme celle de Finell, ou la longue traîne de Solana ; un voile court laisse voir un dos travaillé, comme le dos transparent à boutons de Dolores.",
          ],
        },
        {
          titre: "Les bijoux",
          texte: [
            "Avec un corsage perlé ou pailleté — Carrie, Emerald, Angel —, des boucles d'oreilles suffisent. Avec une trapèze sobre, comme Fortune, un collier ou des boucles plus marquées portent la tenue. Le bijou suit le décolleté : un pendentif pour un V, rien pour un bustier cœur.",
          ],
        },
      ],
      aRetenir: [
        "L'accessoire suit le décolleté.",
        "Certaines robes ont leurs propres pièces.",
        "Un voile accordé à la traîne.",
      ],
      liens: [
        { href: "/robes/solana", label: "Solana" },
        { href: "/robes/monica", label: "Monica" },
        { href: "/robes/dolores", label: "Dolores" },
      ],
    },

    /* ——————————————————————————————————————— l'A-line et l'évasée ————— */
    {
      slug: "difference-coupe-a-line-coupe-evasee",
      q: "Quelle différence entre une coupe A-line et une coupe évasée classique ?",
      r: "« Évasée » désigne toute jupe qui s'élargit vers le bas ; l'A-line en est une forme précise. Elle s'ouvre dès la taille, en ligne droite et régulière. D'autres évasées s'ouvrent plus bas — la sirène, sous les cuisses — ou avec plus d'ampleur — la princesse.",
      description:
        "Coupe A-line ou évasée classique : l'évasée est une famille, l'A-line s'ouvre dès la taille en ligne droite. La différence expliquée par MADAMOON, Paris.",
      chapo:
        "« Évasée » est un mot de famille ; « A-line » est un nom précis. Voici comment les situer.",
      sections: [
        {
          titre: "L'évasée, une famille",
          texte: [
            "Une jupe évasée s'élargit vers le bas. Le mot ne dit pas où elle commence à s'ouvrir, ni avec quelle ampleur : il réunit plusieurs coupes.",
          ],
        },
        {
          titre: "Les évasées du catalogue",
          texte: [],
          liste: [
            "L'A-line, ou trapèze — elle s'ouvre dès la taille, régulièrement, en A.",
            "La sirène — ajustée jusqu'aux cuisses, elle s'évase en dessous.",
            "La princesse — elle s'ouvre à la taille, avec un vrai volume de robe de bal.",
          ],
        },
        {
          titre: "Au catalogue",
          texte: [
            "La fiche d'Aster parle d'une « silhouette A-line » à taille naturelle ; celle de Mitra, d'une robe « trapèze ou A-line » à taille basse : la taille basse fait partir l'évasement un peu plus bas, sans changer la ligne en A.",
          ],
        },
      ],
      aRetenir: [
        "Évasée : toute jupe qui s'élargit.",
        "A-line : elle s'ouvre dès la taille, en A.",
        "La sirène et la princesse sont d'autres évasées.",
      ],
      liens: [
        { href: "/robes/aster", label: "Aster" },
        { href: "/robes/mitra", label: "Mitra" },
        { href: "/coupes/sirene/qu-est-ce-qu-une-robe-de-mariee-sirene", label: "Qu'est-ce qu'une sirène" },
      ],
    },
  ],
  "deux-en-un": [
    /* ——————————————————————————————————————— la définition ————— */
    {
      slug: "qu-est-ce-qu-une-robe-de-mariee-deux-en-un",
      q: "Qu'est-ce qu'une robe de mariée deux-en-un ?",
      r: "Une robe, deux allures : une robe de base, et une surjupe, une jupe ou une traîne qui s'ajoute ou se détache. On passe ainsi d'une silhouette à une autre — d'une robe longue de cérémonie à une robe courte ou ajustée pour la soirée — sans changer de robe.",
      description:
        "Qu'est-ce qu'une robe de mariée deux-en-un ? Une robe de base et une surjupe ou une traîne qui se détache : deux allures, une robe. Les deux-en-un MADAMOON, Paris.",
      chapo:
        "Deux allures, une robe : la deux-en-un change de silhouette en cours de journée. Voici ce qui la définit.",
      sections: [
        {
          titre: "Une robe, et une pièce qui se détache",
          texte: [
            "La robe de base se porte seule : courte, sirène, ajustée. Une surjupe, une jupe ou une traîne vient par-dessus pour la cérémonie, et se retire quand on le souhaite. Les deux allures sont pensées ensemble.",
          ],
        },
        {
          titre: "Les deux-en-un de la boutique",
          texte: [],
          liste: [
            "Tessa — de Casablanca Bridal, une sirène au charme vintage-chic, avec une surjupe détachable et des bretelles amovibles.",
            "Clover — de Casablanca Bridal, une robe courte brodée de fleurs de couleur, et une surjupe longue « à volonté ».",
            "Gabriel — de Watters Designs, une robe courte délicatement perlée, avec une jupe transparente amovible.",
            "Chastity — d'Olya Mak, en dentelle, à manches longues, col montant et longue traîne.",
          ],
        },
        {
          titre: "Et ailleurs au catalogue",
          texte: [
            "Mira, de Monica Loretti, est rangée avec les sirènes, mais sa fiche la dit 2-en-1 : elle peut s'accompagner d'une jupe amovible volumineuse en tulle, qui la fait passer d'une sirène à une silhouette inspirée de la princesse.",
          ],
        },
      ],
      aRetenir: [
        "Une robe, deux allures.",
        "Une surjupe, une jupe ou une traîne qui se détache.",
        "Tessa, Clover, Gabriel, Chastity — et Mira.",
      ],
      liens: [
        { href: "/coupes/deux-en-un", label: "Les robes deux-en-un" },
        { href: "/robes/tessa", label: "Tessa" },
        { href: "/robes/mira", label: "Mira" },
      ],
    },

    /* ——————————————————————————————————————— le fonctionnement ————— */
    {
      slug: "comment-fonctionne-robe-deux-en-un",
      q: "Comment fonctionne une robe de mariée deux-en-un ?",
      r: "Elle se compose d'une robe de base, qui se porte seule, et d'une pièce qui s'y ajoute : une surjupe, une jupe ou une traîne, attachée à la taille. On la porte pour la cérémonie, on la retire pour la soirée. Le système d'attache dépend de la robe et se montre à l'essayage.",
      description:
        "Comment fonctionne une robe de mariée deux-en-un ? Une robe de base et une surjupe ou une jupe qui s'attache à la taille, à retirer pour la soirée. Explications MADAMOON.",
      chapo:
        "Une deux-en-un n'a rien de compliqué. Elle repose sur deux pièces pensées pour aller ensemble.",
      sections: [
        {
          titre: "Deux pièces",
          texte: [],
          liste: [
            "La robe de base — elle se porte seule : courte comme Clover ou Gabriel, sirène comme Tessa ou Mira.",
            "La pièce qui s'ajoute — une surjupe longue (Tessa, Clover), une jupe transparente (Gabriel), une jupe volumineuse en tulle (Mira).",
          ],
        },
        {
          titre: "Le moment du changement",
          texte: [
            "Le plus souvent, la pièce longue se porte pour la cérémonie et les photographies, et se retire avant le dîner ou l'ouverture du bal. Un conseil : prévoyez une pièce où vous changer, et quelqu'un pour vous aider.",
          ],
        },
        {
          titre: "L'attache",
          texte: [
            "La pièce se fixe à la taille ; le système varie selon la robe. À l'essayage, faites-vous montrer comment elle s'attache et se retire, et essayez de le faire vous-même.",
          ],
        },
      ],
      aRetenir: [
        "Une robe de base, une pièce qui s'ajoute.",
        "La pièce longue pour la cérémonie.",
        "L'attache se montre à l'essayage.",
      ],
      liens: [
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/gabriel", label: "Gabriel" },
        { href: "/coupes/deux-en-un/transformation-robe-deux-en-un-facile", label: "Une transformation facile" },
      ],
    },

    /* ——————————————————————————————————————— la surjupe ————— */
    {
      slug: "difference-robe-deux-en-un-robe-surjupe",
      q: "Quelle différence entre une robe deux-en-un et une robe avec surjupe ?",
      r: "La surjupe est l'une des façons de faire une deux-en-un : une jupe portée par-dessus la robe, qu'on retire. Mais une deux-en-un peut aussi reposer sur une jupe amovible ou une traîne qui se détache. Et une surjupe qui ne se retire pas n'offre qu'une seule allure.",
      description:
        "Robe deux-en-un ou robe avec surjupe : la surjupe est l'une des façons de faire une deux-en-un, pas la seule. La différence expliquée par MADAMOON, Paris.",
      chapo:
        "Les deux mots se croisent souvent. L'un désigne une pièce, l'autre ce qu'elle permet.",
      sections: [
        {
          titre: "La surjupe, une pièce",
          texte: [
            "Une jupe portée par-dessus la robe. Détachable, elle permet de changer d'allure : c'est le cas de Tessa et de Clover, dont la surjupe longue se retire.",
          ],
        },
        {
          titre: "La deux-en-un, une promesse",
          texte: [
            "Une robe, deux allures. La surjupe en est le moyen le plus courant, mais pas le seul : Gabriel a une jupe transparente amovible, Mira une jupe volumineuse en tulle, et la boutique parle aussi de traînes qui se détachent.",
          ],
        },
        {
          titre: "Un conseil",
          texte: [
            "Si vous voulez vraiment deux allures, vérifiez que la surjupe se retire et que la robe de base se suffit à elle-même. C'est en cabine qu'on le voit, en essayant les deux versions.",
          ],
        },
      ],
      aRetenir: [
        "La surjupe est une pièce.",
        "La deux-en-un est une robe à deux allures.",
        "Une surjupe fixe n'offre qu'une allure.",
      ],
      liens: [
        { href: "/robes/tessa", label: "Tessa" },
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/gabriel", label: "Gabriel" },
      ],
    },

    /* ——————————————————————————————————————— changer de look ————— */
    {
      slug: "robe-deux-en-un-changer-de-look",
      q: "Une robe deux-en-un permet-elle de changer de look pendant la journée ?",
      r: "Oui, c'est sa raison d'être. Longue et solennelle pour la cérémonie, courte ou ajustée pour la soirée : Clover passe d'une robe longue à une robe courte florale, Tessa d'une robe à surjupe à une sirène, Mira d'une silhouette inspirée de la princesse à une sirène.",
      description:
        "Changer de look avec une robe de mariée deux-en-un : longue pour la cérémonie, courte ou sirène pour la soirée. Clover, Tessa, Mira, chez MADAMOON à Paris.",
      chapo:
        "Le jour du mariage a plusieurs moments. La deux-en-un en a les allures.",
      sections: [
        {
          titre: "Les métamorphoses du catalogue",
          texte: [],
          liste: [
            "Clover — une surjupe longue sur une robe courte brodée de fleurs de couleur.",
            "Gabriel — une jupe transparente sur une robe courte perlée.",
            "Tessa — une surjupe détachable sur une sirène, et des bretelles amovibles « pour un autre look ».",
            "Mira — une sirène en crêpe qui, avec sa jupe en tulle, prend une silhouette plus spectaculaire, inspirée de la princesse.",
          ],
        },
        {
          titre: "Plus discrètement",
          texte: [
            "D'autres robes changent d'allure par un détail : les manches amovibles de Riviera, que sa fiche dit faites pour « varier les styles », ou la veste amovible de Solana.",
          ],
        },
        {
          titre: "Un conseil",
          texte: [
            "Choisissez le moment du changement à l'avance — après la cérémonie, avant le dîner, à l'ouverture du bal — et prévenez votre photographe : les deux allures méritent leurs photographies.",
          ],
        },
      ],
      aRetenir: [
        "Oui : c'est sa raison d'être.",
        "Longue pour la cérémonie, courte ou sirène le soir.",
        "Prévoyez le moment du changement.",
      ],
      liens: [
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/tessa", label: "Tessa" },
        { href: "/robes/riviera", label: "Riviera" },
      ],
    },

    /* ——————————————————————————————————————— cérémonie et soirée ————— */
    {
      slug: "choisir-robe-deux-en-un-ceremonie-soiree",
      q: "Comment choisir une robe deux-en-un pour la cérémonie et la soirée ?",
      r: "En partant des deux moments. La version longue doit répondre à la cérémonie — solennité, lieu, épaules couvertes si besoin ; la robe de base, à la soirée — danser, circuler, se sentir libre. Essayez toujours les deux versions, et la transformation elle-même.",
      description:
        "Choisir une robe de mariée deux-en-un pour la cérémonie et la soirée : une version longue pour l'une, une robe de base libre pour l'autre. Les conseils de MADAMOON.",
      chapo:
        "Une deux-en-un se choisit deux fois : pour la cérémonie, et pour la soirée.",
      sections: [
        {
          titre: "Pour la cérémonie",
          texte: [
            "Un conseil : regardez la version longue comme une robe à part entière. Pour une cérémonie religieuse, des manches et un col couvrants, comme ceux de Chastity, en dentelle, à manches longues et col montant ; pour une mairie, une version plus légère suffit.",
          ],
        },
        {
          titre: "Pour la soirée",
          texte: [
            "La robe de base doit vous plaire seule : courte et florale comme Clover, courte et perlée comme Gabriel, sirène comme Tessa ou Mira, dont la fente haute apporte du mouvement.",
          ],
        },
        {
          titre: "À l'essayage",
          texte: [
            "Essayez les deux versions, marchez et asseyez-vous dans chacune, et faites la transformation en cabine. Une deux-en-un réussie, c'est deux robes que vous aimez autant.",
          ],
        },
      ],
      aRetenir: [
        "La version longue pour la cérémonie.",
        "La robe de base pour la soirée.",
        "Essayez les deux, et le changement.",
      ],
      liens: [
        { href: "/robes/chastity", label: "Chastity" },
        { href: "/robes/gabriel", label: "Gabriel" },
        { href: "/robes/mira", label: "Mira" },
      ],
    },

    /* ——————————————————————————————————————— la danse ————— */
    {
      slug: "robe-deux-en-un-confortable-danser",
      q: "Une robe deux-en-un est-elle confortable pour danser ?",
      r: "Oui, c'est souvent la plus confortable pour la soirée : on retire la surjupe ou la jupe, et il reste une robe courte ou ajustée, bien plus libre. Encore faut-il que la robe de base soit elle-même confortable : c'est à vérifier à l'essayage, en bougeant.",
      description:
        "Robe de mariée deux-en-un et danse : la surjupe se retire, il reste une robe courte ou ajustée, plus libre. Les conseils et deux-en-un de MADAMOON, Paris.",
      chapo:
        "La soirée est le moment où la deux-en-un donne tout son sens.",
      sections: [
        {
          titre: "Une robe allégée",
          texte: [
            "Sans sa pièce longue, la robe ne pèse plus et ne traîne plus. Clover et Gabriel deviennent des robes courtes ; Tessa et Mira, des sirènes, Mira avec une fente haute qui, d'après sa fiche, apporte du mouvement.",
          ],
        },
        {
          titre: "La robe de base",
          texte: [
            "Un conseil : c'est elle que vous porterez le plus longtemps. Vérifiez qu'elle vous laisse lever les bras, vous asseoir et marcher vite. Tessa, par exemple, a un corset structuré.",
          ],
        },
        {
          titre: "Les chaussures",
          texte: [
            "Une robe courte les montre : choisissez-les pour la version courte autant que pour la longue, et pensez à une seconde paire pour danser.",
          ],
        },
      ],
      aRetenir: [
        "Oui : sans surjupe, la robe est plus libre.",
        "La robe de base doit être confortable.",
        "Une robe courte montre les chaussures.",
      ],
      liens: [
        { href: "/robes/gabriel", label: "Gabriel" },
        { href: "/robes/mira", label: "Mira" },
        { href: "/robes/tessa", label: "Tessa" },
      ],
    },

    /* ——————————————————————————————————————— les pièces amovibles ————— */
    {
      slug: "elements-amovibles-robe-de-mariee",
      q: "Quels éléments peuvent être amovibles sur une robe de mariée ?",
      r: "La surjupe, la jupe ou la traîne, pour changer de silhouette ; mais aussi les manches, les bretelles, une veste, une cape, et certains ornements. Au catalogue, Riviera a des manches amovibles, Solana une veste, Oksana des chaînes de perles, Tessa et Ariel des bretelles.",
      description:
        "Quels éléments amovibles sur une robe de mariée ? Surjupe, jupe, traîne, manches, bretelles, veste, ornements. Les pièces amovibles des robes MADAMOON à Paris.",
      chapo:
        "Une robe peut changer par une grande pièce ou par un détail. Voici ce qui se retire, robe par robe.",
      sections: [
        {
          titre: "Ce qui change la silhouette",
          texte: [],
          liste: [
            "Une surjupe — Tessa, Clover.",
            "Une jupe — la jupe transparente de Gabriel, la jupe en tulle de Mira.",
          ],
        },
        {
          titre: "Ce qui change l'allure",
          texte: [],
          liste: [
            "Des manches — Riviera, Aster.",
            "Des bretelles — Tessa, Ariel, Siddalee ; les bretelles tombantes d'Addison ; les bretelles perlées d'Oksana.",
            "Une veste — la veste asymétrique de Solana.",
            "Des ornements — les chaînes de perles et de sequins d'Oksana ; les fleurs 3D optionnelles de Zina.",
          ],
        },
        {
          titre: "Un conseil",
          texte: [
            "Une pièce amovible n'a d'intérêt que si la robe est belle avec et sans. Essayez les deux versions en cabine.",
          ],
        },
      ],
      aRetenir: [
        "Surjupe, jupe : la silhouette change.",
        "Manches, bretelles, veste : l'allure change.",
        "La robe doit être belle avec et sans.",
      ],
      liens: [
        { href: "/robes/riviera", label: "Riviera" },
        { href: "/robes/solana", label: "Solana" },
        { href: "/robes/oksana", label: "Oksana" },
      ],
    },

    /* ——————————————————————————————————————— la transformation ————— */
    {
      slug: "transformation-robe-deux-en-un-facile",
      q: "Comment s'assurer que la transformation de la robe est facile ?",
      r: "En la faisant en cabine, avant de choisir. Faites-vous montrer l'attache, retirez puis remettez la pièce vous-même, chronométrez-vous, et venez avec la personne qui vous aidera le jour J. Prévoyez aussi une housse pour ranger la pièce retirée.",
      description:
        "Une transformation facile pour une robe de mariée deux-en-un : l'essayer en cabine, la chronométrer, préparer qui aidera et où ranger la surjupe. Conseils MADAMOON.",
      chapo:
        "Le changement de robe doit prendre quelques minutes, pas une demi-heure. Cela se vérifie avant le jour J.",
      sections: [
        {
          titre: "À l'essayage",
          texte: [],
          liste: [
            "Faites-vous montrer comment la pièce s'attache et se retire.",
            "Faites-le vous-même, sans aide, puis avec aide.",
            "Regardez la robe de base juste après : elle doit tomber parfaitement, sans marque.",
          ],
        },
        {
          titre: "Le jour J",
          texte: [
            "Un conseil : choisissez la personne qui vous aidera et faites-la venir à un essayage. Prévoyez un endroit calme pour vous changer, et une housse ou un cintre pour la pièce retirée.",
          ],
        },
        {
          titre: "Aux retouches",
          texte: [
            "La robe et sa pièce s'ajustent ensemble. Les couturières de la boutique ajustent la robe sur place : c'est le moment de vérifier une dernière fois que la transformation se fait sans effort.",
          ],
        },
      ],
      aRetenir: [
        "Essayez la transformation en cabine.",
        "Faites venir la personne qui aidera.",
        "Prévoyez où ranger la pièce retirée.",
      ],
      liens: [
        { href: "/coupes/deux-en-un/comment-fonctionne-robe-deux-en-un", label: "Comment fonctionne une deux-en-un" },
        { href: "/faq/duree-retouches-robe-de-mariee", label: "La durée des retouches" },
        { href: "/faq/qui-emmener-essayage-robe-de-mariee", label: "Qui emmener à l'essayage" },
      ],
    },

    /* ——————————————————————————————————————— les morphologies ————— */
    {
      slug: "robe-deux-en-un-quelle-morphologie",
      q: "Quelle morphologie peut porter une robe deux-en-un ?",
      r: "Toutes, à condition de regarder les deux versions : une deux-en-un a la ligne de sa robe de base. La boutique la conseille en premier aux morphologies en 8 et en X, en second aux morphologies en A et en V. Clover, Gabriel et Chastity sont indiquées, sur leurs fiches, pour les six morphologies.",
      description:
        "Robe de mariée deux-en-un : quelles morphologies ? En premier pour 8 et X, à essayer pour A et V ; Clover, Gabriel et Chastity pour toutes. Les conseils MADAMOON.",
      chapo:
        "Une deux-en-un, ce sont deux silhouettes. La morphologie se pense pour chacune.",
      sections: [
        {
          titre: "Ce que dit la boutique",
          texte: [],
          liste: [
            "En premier — pour les morphologies en 8 et en X, à qui toutes les coupes vont.",
            "En second — pour les morphologies en A et en V, qui gagnent à l'essayer.",
          ],
        },
        {
          titre: "Robe par robe",
          texte: [
            "Clover, Gabriel et Chastity sont indiquées, sur leurs fiches, pour les six morphologies. Tessa, qui est une sirène, l'est pour les morphologies en V, en H, en 8 et en X — comme Mira.",
          ],
        },
        {
          titre: "Un conseil",
          texte: [
            "Regardez la robe de base comme une coupe à part : une sirène, une robe courte. Elle doit vous aller seule, puisque c'est elle que vous porterez toute la soirée.",
          ],
        },
      ],
      aRetenir: [
        "En premier pour 8 et X.",
        "À essayer pour A et V.",
        "La robe de base décide.",
      ],
      liens: [
        { href: "/morphologies", label: "Les six morphologies" },
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/chastity", label: "Chastity" },
      ],
    },

    /* ——————————————————————————————————————— les accessoires ————— */
    {
      slug: "accessoiriser-robe-deux-en-un",
      q: "Comment accessoiriser les deux versions d'une robe deux-en-un ?",
      r: "En gardant ce qui sert aux deux et en changeant le reste. Les bijoux restent ; le voile accompagne la version longue et se retire avec elle ; les chaussures se choisissent pour la version courte, qui les montre. Un accessoire de soirée — une boucle plus marquée, une ceinture — signe le second look.",
      description:
        "Accessoiriser une robe de mariée deux-en-un : bijoux pour les deux versions, voile pour la cérémonie, chaussures pour la version courte. Conseils MADAMOON, Paris.",
      chapo:
        "Deux allures, mais une seule mariée. Les accessoires font le lien entre les deux.",
      sections: [
        {
          titre: "Ce qui reste",
          texte: [
            "Un conseil : des bijoux qui vont aux deux versions — des boucles d'oreilles, un bracelet — pour que la mariée reste la même d'un look à l'autre.",
          ],
        },
        {
          titre: "Ce qui part",
          texte: [
            "Le voile accompagne la version longue et la cérémonie ; il se retire en même temps que la surjupe. Un voile long prolonge la surjupe, un voile court s'accorde déjà à la version courte.",
          ],
        },
        {
          titre: "Ce qui arrive",
          texte: [
            "Pour la soirée, une touche nouvelle : une coiffure relâchée, une boucle plus marquée, une seconde paire de chaussures. Sur Clover ou Gabriel, robes courtes, les chaussures se voient : choisissez-les pour cette version-là.",
          ],
        },
      ],
      aRetenir: [
        "Les bijoux restent.",
        "Le voile part avec la surjupe.",
        "Les chaussures se choisissent pour la version courte.",
      ],
      liens: [
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/gabriel", label: "Gabriel" },
        { href: "/robes/tessa", label: "Tessa" },
      ],
    },

    /* ——————————————————————————————————————— la mairie ————— */
    {
      slug: "robe-courte-surjupe-mariage-civil",
      q: "Une robe courte avec surjupe convient-elle à un mariage civil ?",
      r: "Oui, c'est même l'une des plus pratiques. Courte, elle a toute sa place à la mairie ; avec sa surjupe, elle devient longue pour une cérémonie religieuse ou une réception. Clover et Gabriel sont des robes courtes de ce genre.",
      description:
        "Robe de mariée courte avec surjupe pour un mariage civil : courte à la mairie, longue pour la réception. Clover et Gabriel, les deux-en-un MADAMOON à Paris.",
      chapo:
        "La mairie appelle une robe légère, la fête une robe longue. La courte à surjupe fait les deux.",
      sections: [
        {
          titre: "Les robes du catalogue",
          texte: [],
          liste: [
            "Clover — une robe courte brodée de fleurs de couleur, et une surjupe longue « à volonté ».",
            "Gabriel — une robe courte délicatement perlée, et une jupe transparente amovible.",
          ],
        },
        {
          titre: "Deux façons de la porter",
          texte: [
            "Un conseil : courte pour la mairie et longue pour la réception, ou l'inverse — longue pour la cérémonie, courte pour danser. Si les deux ont lieu à des jours différents, elle sert aux deux.",
          ],
        },
        {
          titre: "D'autres robes courtes",
          texte: [
            "Pour une robe courte seule, sans surjupe : Elin, d'Olya Mak, pensée pour un mariage civil, et River, une trapèze courte de la même maison.",
          ],
        },
      ],
      aRetenir: [
        "Oui : courte à la mairie, longue ensuite.",
        "Clover et Gabriel.",
        "Elle peut servir à deux journées.",
      ],
      liens: [
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/elin", label: "Elin" },
        { href: "/coupes/trapeze/robe-trapeze-ceremonie-civile", label: "Une trapèze pour la cérémonie civile" },
      ],
    },

    /* ——————————————————————————————————————— les avantages ————— */
    {
      slug: "avantages-robe-de-mariee-transformable",
      q: "Quels sont les avantages d'une robe de mariée transformable ?",
      r: "Deux allures sans changer de robe ; une soirée plus libre, sans la pièce longue ; une seule robe à choisir, à ajuster et à transporter ; et des photographies dans deux silhouettes. Elle s'adapte aussi à plusieurs cérémonies, de la mairie à la réception.",
      description:
        "Les avantages d'une robe de mariée transformable : deux allures, une soirée plus libre, une seule robe à ajuster, deux silhouettes en photo. MADAMOON, Paris.",
      chapo:
        "La robe transformable répond à une question que se posent beaucoup de mariées : faut-il une seconde robe ?",
      sections: [
        {
          titre: "Ce qu'elle apporte",
          texte: [],
          liste: [
            "Deux allures — une robe de cérémonie, une robe de soirée.",
            "Plus de liberté — sans la pièce longue, on danse, on circule, on s'assoit.",
            "Une seule robe — à choisir, à ajuster aux retouches, à transporter.",
            "Deux silhouettes en photographie — sans quitter la fête pour se changer longuement.",
          ],
        },
        {
          titre: "Plusieurs cérémonies",
          texte: [
            "Quand la mairie et la réception ont lieu le même jour ou à quelques jours d'écart, une même robe sert aux deux : courte à la mairie, longue ensuite, comme Clover ou Gabriel.",
          ],
        },
        {
          titre: "À quoi penser",
          texte: [
            "Un conseil : les deux versions doivent vous plaire autant, et la transformation doit être simple. C'est ce que montre l'essayage.",
          ],
        },
      ],
      aRetenir: [
        "Deux allures, une robe.",
        "Une soirée plus libre.",
        "Une seule robe à ajuster.",
      ],
      liens: [
        { href: "/coupes/deux-en-un", label: "Les robes deux-en-un" },
        { href: "/robes/gabriel", label: "Gabriel" },
        { href: "/coupes/deux-en-un/elements-amovibles-robe-de-mariee", label: "Les éléments amovibles" },
      ],
    },
  ],
};
