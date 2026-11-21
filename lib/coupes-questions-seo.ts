import { MAISON } from "@/lib/madamoon";
import type { QuestionCoupe } from "@/lib/coupes-questions";

/*
 * Les questions ajoutées aux pages de coupe pour le référencement.
 *
 * Chacune vise un groupe d'expressions que les futures mariées tapent
 * (seo-research/keyword-clusters.xlsx : « robe de mariée sirène dentelle »,
 * « robe de mariée fourreau », « robe mariée mousseline »…) et y répond
 * avec ce que le catalogue sait : la ligne et le regard de chaque robe,
 * les morphologies de leurs fiches. Ce qui n'y est pas n'est pas écrit.
 *
 * Elles viennent après les questions de la maison, à la fin de chaque
 * liste : les pages anglaises se repèrent par le rang, et ne les ont pas.
 */
const LIEU = `${MAISON.adresse}, Paris 10ᵉ`;

export const QUESTIONS_COUPES_SEO: Record<string, QuestionCoupe[]> = {
  sirene: [
    {
      slug: "robe-de-mariee-sirene-dos-nu-ou-bustier",
      titre: "Robe de mariée sirène dos nu",
      q: "Quelles sirènes du catalogue sont dos nu, ou bustier ?",
      r: "Dos nu : Bella, en satin perlé, avec ses manches longues. Dos illusion : Uma et Montana. Dos en dentelle : Venus, et sa traîne majestueuse. Bustier : Sheridan, sans bretelles, au décolleté cœur ; Enid, qui se porte en bustier ou en col bardot ; Oksana, au corset basque en pointe.",
      description:
        "Robe de mariée sirène dos nu ou bustier : Bella, Uma, Montana, Venus pour le dos ; Sheridan, Enid, Oksana pour le bustier. Showroom MADAMOON, Paris 10e.",
      chapo:
        "Sur une sirène, le dos et le décolleté sont ce que l'on regarde en premier. Nous avons réuni nos modèles selon ce qu'ils dévoilent.",
      sections: [
        {
          titre: "Le dos",
          texte: [
            "Bella est dos nu, en satin orné de perles, avec des manches longues : la robe de mariée sirène dos nu la plus couture de notre sélection. Uma et Montana ont un dos illusion, où la dentelle laisse deviner la peau. Venus, en satin mat, a un dos en dentelle et une traîne majestueuse. Enid, elle, aligne une infinité de boutons jusqu'au bout de la traîne.",
          ],
        },
        {
          titre: "Le bustier",
          texte: [
            "Sheridan est une sirène sans bretelles au décolleté cœur pointu, en satin mat et dentelle. Enid, en néoprène, se porte en bustier ou en col bardot. Oksana tient par un corset basque en pointe, en dentelle de Chantilly. Pour une robe de mariée bustier sirène, ce sont elles qu'il faut essayer d'abord.",
          ],
        },
      ],
      aRetenir: [
        "Dos nu : Bella. Dos illusion : Uma, Montana. Dos en dentelle : Venus.",
        "Bustier : Sheridan, Enid, Oksana.",
      ],
      liens: [
        { href: "/robes/bella", label: "Bella" },
        { href: "/robes/sheridan", label: "Sheridan" },
        { href: "/details/manches-longues", label: "Les robes de mariée à manches longues" },
      ],
    },
  ],
  princesse: [
    {
      slug: "robe-de-mariee-princesse-volumineuse-longue-traine",
      titre: "Robe de mariée princesse volumineuse, à longue traîne",
      q: "Quelle princesse pour une robe de mariée volumineuse, de luxe, avec une longue traîne ?",
      r: "Santana : une jupe volumineuse en tulle et organza, ornée de motifs floraux, qui se prolonge jusqu'à une spectaculaire traîne et un ourlet festonné. C'est notre robe de mariée princesse la plus ample. Pour une robe moins meringue, Hayes et Addison gardent le volume, en satin.",
      description:
        "Robe de mariée princesse volumineuse à longue traîne : Santana en tulle et organza, Hayes et Addison en satin. À essayer au showroom MADAMOON, Paris 10e.",
      chapo:
        "La robe de mariée princesse de luxe, c'est d'abord une affaire de volume et de traîne. De la plus ample à la plus tenue, elle se porte de plus d'une façon.",
      sections: [
        {
          titre: "Le volume",
          texte: [
            "Santana est notre princesse la plus volumineuse : tulle et organza, motifs floraux, taille basque, et une traîne spectaculaire. Hayes, en satin mat et dentelle, se porte en princesse ou en trapèze, selon le volume souhaité. Addison, en satin de soie, garde une jupe épurée, avec des poches et une infinité de boutons jusqu'au bout de la traîne.",
          ],
        },
        {
          titre: "Meringue ou pas",
          texte: [
            "Une robe de mariée « meringue » est une princesse dont la jupe est faite de volants de tulle. Aucune de nos robes ne se décrit ainsi : nos princesses tiennent leur volume par la coupe et le jupon, non par les volants. Santana est celle qui s'en approche le plus.",
          ],
        },
        {
          titre: "Avec des paillettes ou des strass",
          texte: [
            "Pour l'éclat, Fancy et Aleida sont des sirènes aux détails scintillants ; Solana, un trapèze aux appliqués de dentelle et sequins mats ; Angel, un trapèze de perles et de paillettes. Aucune de nos princesses, en revanche, n'est décrite avec des strass : autant vous le dire simplement.",
          ],
        },
      ],
      aRetenir: [
        "Santana : la plus volumineuse, longue traîne.",
        "Hayes, Addison : le volume en satin, plus tenu.",
        "Pas de robe « meringue » ni de princesse à strass dans notre sélection.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/coupes/princesse", label: "Les robes princesse" },
      ],
    },
  ],
  fluide: [
    {
      slug: "robe-de-mariee-mousseline",
      titre: "Robe de mariée en mousseline",
      q: "Quelles robes de mariée en mousseline propose le showroom ?",
      r: "Hélène, au corset perlé à fleurs en relief et à la jupe fluide en mousseline ; Maribel, fluide minimaliste en mousseline stretch, au corsage brodé à la main ; Murielle, toute de dentelle florale et de mousseline. La mousseline est la matière des robes fluides bohèmes : légère, elle bouge et laisse respirer.",
      description:
        "Robe de mariée en mousseline : Hélène, Maribel, Murielle, des fluides légères à essayer au showroom MADAMOON, Paris 10e. La matière des mariages d'été.",
      chapo:
        "Robe, mariée, mousseline : la plus légère des rencontres. Elle habille nos robes fluides, et elle a ses raisons.",
      sections: [
        {
          titre: "Les robes en mousseline",
          texte: [
            "Hélène : un corset lumineux en dentelle ornée de petites perles et de fleurs en relief, une jupe en mousseline délicate et légère — « un maximum de confort ». Maribel : une fluide minimaliste en mousseline stretch, décolleté en V, corsage brodé et perlé à la main, fente et traîne légère. Murielle : dentelle florale et mousseline, décolleté plongeant, manches illusion et fente.",
          ],
        },
        {
          titre: "Pourquoi la mousseline",
          texte: [
            "Elle ne pèse presque rien, bouge au moindre pas et ne tient pas chaud : c'est la matière d'un mariage bohème, champêtre ou d'été. Elle demande, en retour, un corsage qui tient — d'où les corsets perlés ou brodés d'Hélène et de Maribel.",
          ],
        },
        {
          titre: "Et pour une fluide en satin, ou simple",
          texte: [
            "Dove est une fluide en satin mat, au décolleté drapé ; Adularia, une fluide en charmeuse, à l'élégance minimaliste. Pour une robe de mariée simple et fluide, ce sont elles. Aucune de nos robes n'est une coupe « empire » : la fluide est ce qui s'en approche le plus, avec une taille marquée plus bas.",
          ],
        },
      ],
      aRetenir: [
        "Mousseline : Hélène, Maribel, Murielle.",
        "Satin fluide : Dove. Charmeuse : Adularia.",
        "Pas de coupe empire dans notre sélection.",
      ],
      liens: [
        { href: "/styles/boheme", label: "Les robes de mariée bohèmes" },
        { href: "/robes/helene", label: "Hélène" },
        { href: "/styles/minimaliste", label: "Les robes de mariée simples" },
      ],
    },
  ],
  trapeze: [],
  /* Vague H (3 nov. 2026) : « robe de mariée 2 en 1 », « modulable 2 en 1 »,
   * « transformable », « transformer sa robe de mariée en robe de
   * cocktail » — expressions transmises par la maison. */
  "deux-en-un": [
    {
      slug: "robe-de-mariee-2-en-1-modulable-robe-de-cocktail",
      titre: "Robe de mariée 2 en 1 : modulable, cocktail",
      q: "Robe de mariée 2 en 1 ou modulable : comment la transformer en robe de cocktail ?",
      r: "En retirant la pièce longue. Clover est une robe courte brodée de fleurs, sous une surjupe longue « à volonté » ; Gabriel, une robe courte perlée sous une jupe transparente amovible : sans la surjupe, vous portez la robe de cocktail de la soirée. Tessa, sirène à surjupe détachable, et Mira, sirène à jupe amovible en tulle, restent longues mais changent d'allure. La transformation se prévoit aux retouches, comprises, et se répète à l'essayage.",
      description:
        "Robe de mariée 2 en 1, modulable ou transformable : Clover, Gabriel, Tessa, Mira, et comment elle devient robe de cocktail le soir. MADAMOON, Paris 10e.",
      chapo:
        "Robe de mariée 2 en 1, modulable, transformable, convertible : quatre mots pour une même idée, une robe qui change d'allure sans que vous ayez à vous changer. Et la cérémonie devient la soirée.",
      sections: [
        {
          titre: "Les mots : 2 en 1, modulable, transformable",
          texte: [
            "La robe de mariée 2 en 1 se porte de deux façons. Elle est modulable quand une pièce s'ajoute ou se retire — surjupe, jupe, manches, bretelles ; transformable, ou convertible, quand l'allure change vraiment, de la longue à la courte. Nous appelons « deux-en-un » les robes qui ont une pièce détachable.",
          ],
        },
        {
          titre: "De la cérémonie à la robe de cocktail",
          texte: [
            "Clover : une robe courte brodée de fleurs de couleur, et une surjupe longue « à volonté ». Longue pour la cérémonie, courte pour danser : c'est la transformation la plus nette de toutes. Gabriel, de Watters Designs, fait de même, avec une robe courte délicatement perlée sous une jupe transparente amovible. Dans les deux cas, la robe de cocktail est déjà là, sous la robe de mariée.",
          ],
        },
        {
          titre: "Modulable sans devenir courte",
          texte: [
            "Tessa est une sirène au corset structuré, avec une surjupe détachable et des bretelles amovibles « pour un autre look ». Mira, de Monica Loretti, est une sirène en crêpe et dentelle, dont la jupe amovible en tulle se retire pour la soirée. D'autres robes ont des pièces amovibles sans être des deux-en-un : les manches d'Aster et de Riviera, les bretelles d'Addison et d'Oksana.",
          ],
        },
        {
          titre: "Ce qui se prévoit à l'essayage",
          texte: [
            "Les deux versions doivent vous plaire autant l'une que l'autre, et la transformation doit se faire en un geste. C'est ce que nous vérifions ensemble au showroom, robe sur vous, et ce que les retouches, comprises, règlent : l'attache de la surjupe, la longueur de la robe courte. Dès le premier rendez-vous, dites-nous ce que vous ferez de votre robe le soir.",
          ],
        },
      ],
      aRetenir: [
        "Longue puis courte : Clover (surjupe) et Gabriel (jupe transparente amovible).",
        "Modulable sans devenir courte : Tessa (surjupe détachable), Mira (jupe amovible en tulle).",
        "La transformation se prévoit aux retouches, comprises.",
      ],
      liens: [
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/gabriel", label: "Gabriel" },
        { href: "/coupes/deux-en-un/avantages-robe-de-mariee-transformable", label: "Les avantages d'une robe transformable" },
        { href: "/details/courte", label: "Les robes de mariée courtes" },
      ],
    },
  ],
};
