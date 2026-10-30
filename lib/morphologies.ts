import type { Categorie, Lettre } from "@/lib/madamoon";

/*
 * Ce que l'on écrit sur une morphologie.
 *
 * MORPHOLOGIES, dans lib/madamoon.ts, tient les données du conseil : les
 * coupes recommandées, l'objectif, la phrase courte. Ce fichier-ci tient
 * la matière rédigée — celle qui remplit la page et que les moteurs
 * lisent.
 *
 * Deux règles de ton, tenues partout :
 *
 * Aucune robe n'est déconseillée. Une morphologie ouvre des pistes, elle
 * n'en ferme aucune ; les coupes moins évidentes sont présentées pour ce
 * qu'elles apportent, jamais pour ce qu'elles rateraient.
 *
 * Aucun corps n'est un problème à corriger. On écrit ce qu'une coupe
 * fait, pas ce qu'elle « cache » ou « camoufle » — ces mots-là ne
 * figurent nulle part, et c'est délibéré.
 */

export type Repere = { titre: string; texte: string };

export type Edito = {
  /* Le titre de la page : la question que la mariée pose. */
  question: string;
  /* La ligne du premier écran. Une phrase, pas deux. */
  promesse: string;
  /* Trois façons de se reconnaître, dont une qui se vérifie devant un
   * miroir : la lecture seule ne suffit jamais à se situer. */
  reperes: Repere[];
  proportions: string;
  /* Pourquoi chaque coupe fonctionne. Rédigé pour les recommandées comme
   * pour celles qui valent l'essai — la seconde liste mérite autant
   * d'explication que la première, sans quoi elle sonne comme un lot de
   * consolation. */
  pourquoi: Partial<Record<Categorie, string>>;
  /* Le détail qui fait souvent basculer un essayage. */
  detail: string;
};

export const EDITO: Record<Lettre, Edito> = {
  O: {
    question: "Quelle robe pour une morphologie en O ?",
    promesse:
      "Un tombé qui glisse, un décolleté qui ouvre le buste : la ligne s'allonge d'elle-même.",
    reperes: [
      {
        titre: "Le repère",
        texte:
          "Vos épaules et vos hanches sont d'une largeur proche, et c'est la taille qui prend le plus de place.",
      },
      {
        titre: "La poitrine",
        texte:
          "Elle est généreuse et se remarque en premier. Beaucoup de robes s'écrivent à partir de là.",
      },
      {
        titre: "Devant le miroir",
        texte:
          "La main descend des épaules aux hanches sans rencontrer de creux net à la taille.",
      },
    ],
    proportions: "Buste et hanches proches, taille peu creusée, poitrine marquée.",
    pourquoi: {
      Fluide:
        "Elle ne serre nulle part. Le tissu descend d'un seul tenant, du buste à l'ourlet, et la ligne paraît plus longue qu'elle ne l'est.",
      Trapèze:
        "Le buste est tenu, la jupe part en A dès la taille. Le regard s'arrête sur le décolleté, et la robe laisse tout le reste libre.",
      Princesse:
        "Un bustier travaillé porte le regard vers le haut, et l'ampleur de la jupe répond au buste sans le concurrencer.",
    },
    detail:
      "Le décolleté en V ou en cœur ouvre le buste et allonge le cou. C'est souvent lui, plus que la coupe, qui fait basculer un essayage.",
  },

  A: {
    question: "Quelle robe pour une morphologie en A ?",
    promesse: "Un haut de robe travaillé, une jupe qui s'ouvre : l'équilibre se fait seul.",
    reperes: [
      {
        titre: "Le repère",
        texte: "Vos hanches sont plus larges que vos épaules, et votre taille se dessine nettement.",
      },
      {
        titre: "Le haut",
        texte: "Les épaules sont fines.",
      },
      {
        titre: "Devant le miroir",
        texte: "Une veste cintrée vous va sans retouche, alors que les jupes droites tirent.",
      },
    ],
    proportions: "Épaules plus étroites que les hanches, taille marquée.",
    pourquoi: {
      Princesse:
        "Tout se joue sur le bustier : broderie, drapé, encolure. L'ampleur de la jupe, elle, ne demande rien — elle répond aux hanches sans y toucher.",
      Trapèze:
        "La jupe s'ouvre dès la taille et suit les hanches au lieu de les épouser. C'est la coupe la plus facile à porter une journée entière.",
      Fluide:
        "Elle ne cherche pas l'équilibre, elle passe à côté — et c'est parfois exactement ce qu'on veut quand on refuse une robe qui construit.",
      "Deux en un":
        "Une surjupe qui se retire au dîner : deux volumes dans la même soirée, et l'occasion de vivre les deux avant de trancher.",
    },
    detail:
      "Une encolure bateau ou un bustier droit élargit visuellement les épaules.",
  },

  V: {
    question: "Quelle robe pour une morphologie en V ?",
    promesse: "Adoucir les épaules, donner de l'ampleur au bas : la robe rééquilibre sans effort.",
    reperes: [
      {
        titre: "Le repère",
        texte: "Vos épaules sont larges, vos hanches plus étroites, et la taille se devine peu.",
      },
      {
        titre: "Le haut",
        texte:
          "Les bretelles ne glissent jamais. C'est plutôt le bas des robes qui vous paraît étroit.",
      },
      {
        titre: "Devant le miroir",
        texte: "Les décolletés profonds vous vont : ils cassent la ligne horizontale des épaules.",
      },
    ],
    proportions: "Épaules larges, hanches étroites, ligne sportive.",
    pourquoi: {
      Fluide:
        "Rien n'est construit aux épaules. Le tissu tombe depuis le buste, et le haut du corps cesse d'être le point d'appui de la robe.",
      Princesse:
        "L'ampleur de la jupe donne au bas la place qu'il n'a pas naturellement. Les épaules n'imposent plus la ligne.",
      Trapèze:
        "Le même effet, en plus discret : la jupe s'ouvre, la ligne s'équilibre, et la robe reste simple à vivre.",
      "Deux en un":
        "La surjupe ajoute du volume au bas quand vous le voulez, et le retire quand vient le moment de danser.",
    },
    detail:
      "Le décolleté en V, croisé ou asymétrique, brise la largeur d'un trait vertical. C'est le détail qui compte le plus ici.",
  },

  H: {
    question: "Quelle robe pour une morphologie en H ?",
    promesse: "Créer la courbe plutôt que la chercher : c'est la coupe qui la dessine.",
    reperes: [
      {
        titre: "Le repère",
        texte: "Épaules, taille et hanches sont sur une même ligne droite et verticale.",
      },
      {
        titre: "La taille",
        texte: "Peu marquée.",
      },
      {
        titre: "Devant le miroir",
        texte:
          "Une simple ceinture change toute votre ligne — plus nettement que sur d'autres morphologies.",
      },
    ],
    proportions: "Ligne droite, taille peu marquée, allure longiligne.",
    pourquoi: {
      Sirène:
        "Elle dessine ce qui ne se voit pas encore. Ajustée jusqu'aux cuisses puis évasée, elle crée la courbe au lieu de la souligner.",
      Fluide:
        "Cintrée à la taille ou portée avec une ceinture, elle marque là où vous le décidez, et nulle part ailleurs.",
      Trapèze:
        "La jupe s'ouvre à partir d'une taille haute et donne du mouvement là où la ligne est droite.",
    },
    detail:
      "La coupe empire remonte la taille sous la poitrine et allonge tout ce qui suit. Elle mérite un essayage même si l'idée ne vous attirait pas sur photo.",
  },

  "8": {
    question: "Quelle robe pour une morphologie en 8 ?",
    promesse: "L'équilibre est déjà là. La robe n'a qu'à le suivre.",
    reperes: [
      {
        titre: "Le repère",
        texte: "Épaules et hanches se répondent, et la taille se creuse nettement entre les deux.",
      },
      { titre: "Les courbes", texte: "Elles sont marquées, et régulières du haut jusqu'au bas." },
      {
        titre: "Devant le miroir",
        /* Le jeu de mots est de la maison, et la virgule aussi : le
          * point-virgule écartait les deux verbes, la virgule les tient
          * assez près pour qu'on entende la rime. */
        texte: "Les vêtements cintrés vous flattent, ce sont les coupes droites qui flottent.",
      },
    ],
    proportions: "Épaules et hanches alignées, taille creusée, courbes marquées.",
    pourquoi: {
      Sirène:
        "Elle épouse une ligne déjà proportionnée. Ajustée jusqu'aux cuisses, elle ne corrige rien : elle suit.",
      Princesse:
        "Le bustier se cintre à la taille et l'ampleur part de là. Le contraste est net, et c'est tout l'effet recherché.",
      Fluide:
        "Portée avec une ceinture ou coupée à la taille, elle garde la ligne tout en laissant respirer.",
      Trapèze:
        "Elle part de la taille, qui est déjà le point le plus étroit, et s'ouvre de là. Il n'y a rien à dessiner : la robe suit un tracé qui existe.",
      "Deux en un":
        "Une ligne ajustée pour la cérémonie, une surjupe que l'on retire pour la soirée. L'équilibre tient dans les deux — ce n'est pas vrai de toutes les silhouettes.",
    },
    detail:
      "Un bustier cœur ou une encolure en V prolonge la taille vers le haut. Ici, tout ce qui se cintre fonctionne.",
  },

  X: {
    question: "Quelle robe pour une morphologie en X ?",
    promesse: "Toutes les coupes vous vont. C'est le style du mariage qui tranchera.",
    reperes: [
      {
        titre: "Le repère",
        texte: "Épaules et hanches sont équilibrées, et la taille est fine, bien dessinée.",
      },
      {
        titre: "Les courbes",
        texte: "Elles sont douces plutôt que prononcées, et la ligne reste harmonieuse.",
      },
      {
        titre: "Devant le miroir",
        texte: "Vous hésitez entre plusieurs styles en cabine — le plus souvent parce qu'ils vous vont tous.",
      },
    ],
    proportions: "Proportions équilibrées, taille fine, courbes douces.",
    pourquoi: {
      Sirène:
        "Ajustée puis évasée, elle suit la taille sans avoir à la créer. C'est la coupe qui en dit le plus avec le moins.",
      Princesse:
        "L'ampleur part d'une taille déjà fine : le contraste se fait tout seul, sans que la robe ait à forcer.",
      Fluide:
        "Elle ne construit rien et n'en a pas besoin. La ligne se suffit ; le tissu ne fait que l'accompagner.",
      Trapèze:
        "La plus simple à vivre, et la plus discrète. Elle convient quand la robe ne doit pas être le sujet de la journée.",
      "Deux en un":
        "La surjupe se pose sur une ligne qui tient déjà debout, puis s'enlève sans que rien ne s'effondre. Deux robes, une seule silhouette.",
    },
    detail:
      "Ici, la question n'est plus « qu'est-ce qui me va ? » mais « qu'est-ce qui me ressemble ? ». C'est une meilleure question.",
  },
};

/*
 * Ce qui compte autant que la morphologie.
 *
 * Ce bloc est le même sur les six pages, et c'est voulu : c'est un
 * principe de la maison, pas une variation de conseil.
 */
export const AU_DELA: Repere[] = [
  {
    titre: "Le style",
    texte:
      "Une robe se choisit aussi contre son type. Une morphologie en 8 peut vouloir du fluide, et avoir raison.",
  },
  {
    titre: "Le lieu",
    texte:
      "Une traîne de deux mètres sur une plage, un satin lourd en août : la robe doit tenir la journée, pas seulement la photographie.",
  },
  {
    titre: "Le confort",
    texte:
      "Vous la porterez douze heures. Si vous ne pouvez ni vous asseoir ni lever les bras, aucune coupe ne rattrapera cela.",
  },
  {
    titre: "L'émotion",
    texte:
      "C'est le seul critère qui décide vraiment. En cabine, les mariées savent en trente secondes — bien avant d'avoir regardé la coupe.",
  },
];

/*
 * Les questions que l'on pose vraiment.
 *
 * Trois par morphologie, écrites à la main. Une quatrième est composée
 * sur la page à partir des repères — elle dit comment se reconnaître, et
 * la réponse est déjà écrite plus haut.
 *
 * Deux d'entre elles commencent par « faut-il éviter » ou « peut-on
 * porter ». C'est délibéré : ce sont les mots que les mariées tapent, et
 * y répondre est l'occasion de dire non, qu'aucune robe n'est interdite.
 * Une page qui refuse la question laisse la réponse à quelqu'un d'autre.
 *
 * Le balisage FAQPage les reprend telles quelles. Google demande que la
 * réponse figure visiblement sur la page : elle y est, c'est la même.
 */

export type Question = { q: string; r: string };

export const QUESTIONS: Record<Lettre, Question[]> = {
  O: [
    {
      q: "Quelle coupe de robe de mariée choisir pour une morphologie en O ?",
      r: "Les tombés fluides et les coupes trapèze en premier : le tissu descend d'un seul tenant et la ligne paraît plus longue. Le décolleté compte autant que la coupe — un V ou un cœur ouvre le buste et allonge le cou.",
    },
    {
      q: "Peut-on porter une robe sirène avec une morphologie en O ?",
      r: "Oui. Une morphologie n'interdit aucune robe, elle indique seulement par quoi commencer. La sirène demande une matière qui tient — un crêpe plutôt qu'un satin léger — et se juge en cabine bien mieux que sur photographie.",
    },
    {
      q: "Faut-il éviter les robes princesse avec une morphologie en O ?",
      r: "Non, et le mot « éviter » n'a pas cours ici. Un bustier travaillé porte le regard vers le haut, et l'ampleur de la jupe répond au buste sans le charger. La princesse vient simplement après le fluide et le trapèze dans l'ordre des essayages.",
    },
  ],
  A: [
    {
      q: "Quelle robe de mariée met en valeur une morphologie en A ?",
      r: "Celles qui donnent au haut du corps de quoi retenir le regard : un bustier brodé, drapé, ou une encolure qui élargit les épaules. La jupe, elle, n'a rien à démontrer — évasée, elle répond aux hanches sans les souligner.",
    },
    {
      q: "Comment équilibrer des hanches plus larges que les épaules ?",
      r: "Par le haut, jamais en cachant le bas. Une encolure bateau ou un bustier droit ajoutent quelques centimètres de ligne aux épaules, et cela suffit à changer toute la proportion.",
    },
    {
      q: "Une robe sirène convient-elle à une morphologie en A ?",
      r: "Elle se porte très bien, à condition que le haut ait de quoi équilibrer : une manche, une bretelle large, un décolleté travaillé. Beaucoup de mariées en A repartent avec une sirène qu'elles n'avaient pas prévu d'essayer.",
    },
  ],
  V: [
    {
      q: "Quelle robe de mariée pour des épaules larges ?",
      r: "Celles qui ne construisent rien au-dessus : un tombé fluide qui part du buste, ou une jupe ample qui donne au bas la place qu'il n'a pas naturellement. La ligne s'équilibre d'elle-même.",
    },
    {
      q: "Quel décolleté choisir avec une morphologie en V ?",
      r: "Un V, un croisé ou un asymétrique. Tous les trois cassent la largeur d'un trait vertical, et c'est ici le détail qui compte le plus — davantage que la coupe de la jupe.",
    },
    {
      q: "Peut-on porter des manches bouffantes avec une morphologie en V ?",
      r: "Oui, et cela peut très bien fonctionner si la jupe a du volume pour répondre. Portée sur une jupe droite, la manche ballon accentue en revanche la largeur des épaules — c'est une question d'équilibre, pas d'interdit.",
    },
  ],
  H: [
    {
      q: "Comment créer des courbes avec une morphologie en H ?",
      r: "En laissant la coupe les dessiner. Une sirène légère, un modèle cintré à la taille ou une simple ceinture marquent là où l'on veut, sans rien serrer.",
    },
    {
      q: "La coupe empire convient-elle à une morphologie en H ?",
      r: "Très bien. Elle remonte la taille sous la poitrine et allonge tout ce qui suit. Elle mérite un essayage même si l'idée ne vous attirait pas sur photographie — c'est une coupe qui se comprend une fois portée.",
    },
    {
      q: "Faut-il forcément marquer la taille ?",
      r: "Non. Une robe droite, en satin net, sur une ligne longue, est l'un des plus beaux partis pris qui soient. Marquer la taille est une option, pas une correction à apporter.",
    },
  ],
  "8": [
    {
      q: "Quelle robe de mariée pour une taille marquée et des courbes ?",
      r: "Les sirènes et les fourreaux, qui suivent une ligne déjà proportionnée sans avoir à la créer. Le satin sans ornement fonctionne pour la même raison : il ne raconte que la coupe.",
    },
    {
      q: "La robe princesse convient-elle à une morphologie en 8 ?",
      r: "Oui. Le bustier se cintre à la taille et l'ampleur part de là : le contraste est net, et c'est tout l'effet recherché. Elle demande simplement de la place — pensez au lieu et à la journée.",
    },
    {
      q: "Faut-il éviter les coupes droites avec une morphologie en 8 ?",
      r: "Non. Une coupe droite flotte parfois là où la taille se creuse, mais une ceinture ou une reprise à la taille règle la question en un essayage. Rien n'est écarté d'avance.",
    },
  ],
  X: [
    {
      q: "Quelle robe de mariée choisir pour une morphologie en X ?",
      r: "Toutes les coupes vous vont — c'est la réponse honnête. Sirène, princesse, fluide, trapèze ou deux-en-un : la question devient celle du style du mariage, et non celle de la morphologie.",
    },
    {
      q: "Comment choisir quand toutes les coupes conviennent ?",
      r: "Par le lieu, la saison, et ce que vous voulez pouvoir faire de votre journée. Une traîne de deux mètres sur une plage, un satin lourd en août : la robe doit tenir douze heures, pas seulement la photographie.",
    },
    {
      q: "La morphologie en X est-elle la même que la morphologie en 8 ?",
      r: "Elles se ressemblent et se confondent souvent. Les deux ont des épaules et des hanches équilibrées ; le 8 a des courbes franchement marquées, le X des courbes plus douces et une taille fine. Les conseils se recoupent largement, et les deux pages valent la lecture.",
    },
  ],
};
