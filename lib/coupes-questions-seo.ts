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
      slug: "robe-de-mariee-sirene-dentelle",
      titre: "Robe de mariée sirène en dentelle",
      q: "Quelles robes de mariée sirène en dentelle propose MADAMOON ?",
      r: "La sirène en dentelle est la robe la plus représentée du catalogue : Oksana en dentelle de Chantilly, Summer en dentelle d'Alençon, Uma au dos illusion, Fancy et Aleida avec des détails scintillants, Meredith en dentelle en relief, et Charlize, Sheridan ou Montana qui associent satin mat et dentelle.",
      description:
        "Robe de mariée sirène en dentelle : Chantilly, Alençon, dentelle en relief ou dos illusion. Oksana, Summer, Uma, Meredith… à essayer au showroom MADAMOON, Paris 10e.",
      chapo:
        "La robe sirène dentelle est l'expression que l'on nous tape le plus avec « sirène ». Voici comment la dentelle se porte sur une sirène, et les modèles du catalogue qui la montrent.",
      sections: [
        {
          titre: "Toute en dentelle",
          texte: [
            "Oksana est une sirène en dentelle de Chantilly, au corset basque en pointe. Summer est en dentelle d'Alençon, décolleté en V et longue traîne : « la beauté de la dentelle française dans une silhouette féminine », dit sa fiche. Uma, chez Watters Designs, porte sa dentelle jusque dans le dos illusion. Meredith la travaille en relief, Fancy et Aleida avec des détails scintillants.",
          ],
        },
        {
          titre: "Dentelle et satin mat",
          texte: [
            "Charlize associe satin mat et dentelle de Chantilly ; Sheridan, satin mat et dentelle, avec une cape assortie ; Montana, satin mat et manches longues en dentelle, dos illusion. Shiloh pose une dentelle de Chantilly sur une jupe en crêpe fendue. La dentelle y est un détail sur une matière unie : la robe de mariée sirène en dentelle sans en être couverte.",
          ],
        },
        {
          titre: "À quelle morphologie",
          texte: [
            "D'après leurs fiches, Uma, Charlize, Meredith et Summer conviennent d'abord aux morphologies en V, en H, en 8 et en X ; Montana et Shiloh à celles en A aussi. La dentelle ne change rien à la coupe : c'est la sirène qui décide.",
          ],
        },
      ],
      aRetenir: [
        "Chantilly (Oksana, Charlize), Alençon (Summer), dentelle en relief (Meredith), dos illusion (Uma).",
        "Satin mat et dentelle : Charlize, Sheridan, Montana.",
        "La coupe décide de la morphologie, pas la dentelle.",
      ],
      liens: [
        { href: "/matieres/dentelle", label: "Toutes les robes de mariée en dentelle" },
        { href: "/robes/oksana", label: "Oksana" },
        { href: "/robes/summer", label: "Summer" },
        { href: "/coupes/sirene", label: "Les robes sirène" },
      ],
    },
    {
      slug: "robe-de-mariee-fourreau-ou-sirene",
      titre: "Robe de mariée fourreau, droite ou sirène ?",
      q: "Quelle différence entre une robe de mariée fourreau, droite et sirène ?",
      r: "La sirène est ajustée jusqu'aux cuisses puis évasée ; le fourreau et la robe droite restent près du corps jusqu'au sol, sans s'évaser. Le catalogue range les deux sous la sirène : Bella est « sirène ou fourreau », Amaryllis « coupe droite ou sirène ». La robe moulante, près du corps, c'est la même famille.",
      description:
        "Robe de mariée fourreau, droite ou sirène : la différence, et les modèles du showroom MADAMOON qui se portent des deux façons, comme Bella et Amaryllis. Paris 10e.",
      chapo:
        "Fourreau, droite, moulante, près du corps : quatre mots pour une ligne qui suit la silhouette. Voici ce qui les distingue de la sirène, et pourquoi la boutique les range ensemble.",
      sections: [
        {
          titre: "Ce qui change sous les cuisses",
          texte: [
            "Une sirène épouse la poitrine, la taille et les hanches, puis s'ouvre en une jupe évasée, souvent prolongée d'une traîne. Un fourreau — ou une robe droite, ou une robe colonne — garde la ligne près du corps jusqu'en bas, sans évasement. De face, elles se ressemblent ; en marchant, la sirène bouge davantage.",
          ],
        },
        {
          titre: "Les robes qui se portent des deux façons",
          texte: [
            "Bella, en satin orné de perles, dos nu et manches longues, est décrite comme « sirène ou fourreau ». Amaryllis, en charmeuse avec une file de boutons sur le côté, comme « coupe droite ou sirène ». Enid, en néoprène, est une fit-and-flare au décolleté droit : la robe de mariée près du corps, moderne et minimaliste.",
          ],
        },
        {
          titre: "Laquelle essayer",
          texte: [
            "Une robe de mariée moulante demande une matière qui tient — le crêpe de Bondi et de Milan, la charmeuse d'Amaryllis, le néoprène d'Enid. D'après leurs fiches, Milan et Amaryllis vont d'abord aux morphologies en H, en 8 et en X. Le reste se juge en cabine, en marchant.",
          ],
        },
      ],
      aRetenir: [
        "Sirène : ajustée puis évasée. Fourreau, droite, colonne : près du corps jusqu'au sol.",
        "Bella et Amaryllis se portent des deux façons.",
        "Une matière qui tient : crêpe, charmeuse, néoprène.",
      ],
      liens: [
        { href: "/robes/bella", label: "Bella" },
        { href: "/robes/amaryllis", label: "Amaryllis" },
        { href: "/styles/minimaliste", label: "Les robes de mariée simples et minimalistes" },
      ],
    },
    {
      slug: "robe-de-mariee-sirene-dos-nu-ou-bustier",
      titre: "Robe de mariée sirène dos nu ou bustier",
      q: "Quelles sirènes du catalogue sont dos nu, ou bustier ?",
      r: "Dos nu : Bella, en satin perlé avec manches longues. Dos illusion : Uma et Montana. Dos en dentelle : Venus, avec sa traîne majestueuse. Bustier : Sheridan, sans bretelles au décolleté cœur, Enid qui se porte en bustier ou en col bardot, et Oksana au corset basque en pointe.",
      description:
        "Robe de mariée sirène dos nu ou bustier : Bella, Uma, Montana, Venus pour le dos ; Sheridan, Enid, Oksana pour le bustier. À essayer au showroom MADAMOON, Paris 10e.",
      chapo:
        "Sur une sirène, le dos et le décolleté sont ce qu'on regarde en premier. Voici les modèles du catalogue classés par ce qu'ils montrent, et ce que leurs fiches en disent.",
      sections: [
        {
          titre: "Le dos",
          texte: [
            "Bella est dos nu, en satin orné de perles, avec des manches longues : la robe de mariée sirène dos nu la plus couture du catalogue. Uma et Montana ont un dos illusion, la dentelle laissant voir la peau. Venus, en satin mat, a un dos en dentelle et une traîne majestueuse. Enid aligne une infinité de boutons jusqu'au bout de la traîne.",
          ],
        },
        {
          titre: "Le bustier",
          texte: [
            "Sheridan est une sirène sans bretelles au décolleté cœur pointu, en satin mat et dentelle. Enid, en néoprène, se porte en bustier ou en col bardot. Oksana tient par un corset basque en pointe, en dentelle de Chantilly. Pour une robe de mariée bustier sirène, ce sont les trois à essayer d'abord.",
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
      slug: "robe-de-mariee-princesse-dentelle",
      titre: "Robe de mariée princesse en dentelle",
      q: "Quelles robes de mariée princesse en dentelle propose le showroom ?",
      r: "Santana, en organza et tulle avec une dentelle florale ; Seraphina, en dentelle brodée, dos nu et manches longues ; Charlotte et Sienna, qui se portent en princesse ou en trapèze, en dentelle Caterina pour l'une ; Amandine, en dentelle au décolleté plongeant ; Clover, en dentelle Caterina, décolleté carré et taille basse.",
      description:
        "Robe de mariée princesse en dentelle : Santana, Seraphina, Charlotte, Clover, Amandine… dentelle florale, brodée ou Caterina sur une jupe volumineuse. Showroom MADAMOON, Paris 10e.",
      chapo:
        "Une princesse en dentelle, c'est un corset travaillé et une jupe qui prend l'espace. Voici les modèles du catalogue, et ce que leurs fiches disent de leur dentelle.",
      sections: [
        {
          titre: "Les princesses en dentelle du catalogue",
          texte: [
            "Santana, de Casablanca Bridal, est une princesse à taille basque en organza et tulle, au corsage transparent sublimé par une dentelle florale, et sa jupe volumineuse se prolonge jusqu'à une spectaculaire traîne. Seraphina, d'Olya Mak, est en dentelle brodée, dos nu et manches longues. Charlotte, en dentelle Caterina, a un décolleté en cœur et un corset en taille basque — et existe dans une version plus couvrante. Clover, en dentelle Caterina, a un décolleté carré et une taille basse. Amandine, un décolleté plongeant.",
          ],
        },
        {
          titre: "Princesse, ou trapèze",
          texte: [
            "Plusieurs robes en dentelle se portent « princesse ou trapèze » selon le volume que l'on donne à la jupe : Charlotte, Sienna, Hayes en satin mat et dentelle. Le corset reste le même ; c'est le jupon qui décide.",
          ],
        },
        {
          titre: "À quelle morphologie",
          texte: [
            "D'après leurs fiches, Charlotte, Sienna, Clover et Seraphina conviennent aux six morphologies. La princesse porte le regard vers le haut et laisse le reste libre : c'est la coupe la plus universelle avec le trapèze.",
          ],
        },
      ],
      aRetenir: [
        "Santana (dentelle florale), Seraphina (dentelle brodée), Charlotte et Clover (Caterina), Amandine.",
        "Charlotte, Sienna, Hayes se portent princesse ou trapèze.",
      ],
      liens: [
        { href: "/matieres/dentelle", label: "Toutes les robes de mariée en dentelle" },
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },
    {
      slug: "robe-de-mariee-princesse-volumineuse-longue-traine",
      titre: "Robe de mariée princesse volumineuse, à longue traîne",
      q: "Quelle princesse pour une robe de mariée volumineuse, de luxe, avec une longue traîne ?",
      r: "Santana : une jupe volumineuse en tulle et organza, ornée de motifs floraux, qui se prolonge jusqu'à une spectaculaire traîne et un ourlet festonné. C'est la robe de mariée princesse la plus ample du catalogue. Pour une robe moins meringue, Hayes et Addison gardent le volume en satin.",
      description:
        "Robe de mariée princesse volumineuse à longue traîne : Santana en tulle et organza, Hayes et Addison en satin. Le volume d'une princesse, à essayer au showroom MADAMOON, Paris 10e.",
      chapo:
        "La robe de mariée princesse de luxe, c'est d'abord une question de volume et de traîne. Voici ce que le catalogue propose, du plus ample au plus tenu.",
      sections: [
        {
          titre: "Le volume",
          texte: [
            "Santana est la princesse la plus volumineuse : tulle et organza, motifs floraux, taille basque, et une traîne spectaculaire. Hayes, en satin mat et dentelle, se porte en princesse ou en trapèze selon le volume. Addison, en satin de soie, garde une jupe épurée avec des poches et une infinité de boutons jusqu'au bout de la traîne.",
          ],
        },
        {
          titre: "Meringue ou pas",
          texte: [
            "Une robe de mariée « meringue » est une princesse dont la jupe est faite de volants de tulle. Le catalogue n'en classe aucune ainsi : les princesses de la boutique tiennent leur volume par la coupe et le jupon, pas par les volants. Santana s'en approche le plus.",
          ],
        },
        {
          titre: "Avec des paillettes ou des strass",
          texte: [
            "Pour l'éclat, Fancy et Aleida sont des sirènes à détails scintillants, Solana un trapèze aux appliqués de dentelle et sequins mats, Angel un trapèze perles et paillettes. Aucune princesse du catalogue n'est décrite avec des strass : c'est dit tel quel.",
          ],
        },
      ],
      aRetenir: [
        "Santana : la plus volumineuse, longue traîne.",
        "Hayes, Addison : le volume en satin, plus tenu.",
        "Pas de robe « meringue » ni de princesse à strass au catalogue.",
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
      r: "Hélène, au corset perlé à fleurs en relief et à la jupe fluide en mousseline ; Maribel, fluide minimaliste en mousseline stretch au corsage brodé à la main ; Murielle, dentelle florale et mousseline. La mousseline est la matière des robes fluides bohèmes : légère, elle bouge et laisse respirer.",
      description:
        "Robe de mariée en mousseline : Hélène, Maribel, Murielle, trois fluides légères à essayer au showroom MADAMOON, Paris 10e. La matière des mariages bohèmes et d'été.",
      chapo:
        "La robe mariée mousseline est la plus légère du catalogue. Voici les trois fluides qui en sont faites, et à quoi elle sert.",
      sections: [
        {
          titre: "Les trois robes en mousseline",
          texte: [
            "Hélène : un corset lumineux en dentelle ornée de petites perles et de fleurs en relief, une jupe en mousseline délicate et légère — « un maximum de confort », dit sa fiche. Maribel : une fluide minimaliste en mousseline stretch, décolleté en V, corsage brodé et perlé à la main, fente et traîne légère. Murielle : dentelle florale et mousseline, décolleté plongeant, manches illusion et fente.",
          ],
        },
        {
          titre: "Pourquoi la mousseline",
          texte: [
            "Elle pèse peu, bouge au moindre pas et ne tient pas chaud : c'est la matière d'un mariage bohème, champêtre ou d'été. Elle demande un corsage qui tient, d'où les corsets perlés ou brodés d'Hélène et de Maribel.",
          ],
        },
        {
          titre: "Et pour une fluide en satin, ou simple",
          texte: [
            "Dove est une fluide en satin mat au décolleté drapé ; Adularia, une fluide en charmeuse à l'élégance minimaliste. Pour une robe de mariée simple et fluide, ce sont elles. Aucune robe du catalogue n'est classée « empire » : la fluide est ce qui s'en approche, avec une taille marquée plus bas.",
          ],
        },
      ],
      aRetenir: [
        "Mousseline : Hélène, Maribel, Murielle.",
        "Satin fluide : Dove. Charmeuse : Adularia.",
        "Pas de coupe empire au catalogue.",
      ],
      liens: [
        { href: "/styles/boheme", label: "Les robes de mariée bohèmes" },
        { href: "/robes/helene", label: "Hélène" },
        { href: "/styles/minimaliste", label: "Les robes de mariée simples" },
      ],
    },
  ],
  trapeze: [
    {
      slug: "robe-de-mariee-trapeze-chic-evasee",
      titre: "Robe de mariée trapèze chic, évasée, A-line",
      q: "Qu'est-ce qu'une robe de mariée trapèze, et lesquelles sont les plus chic ?",
      r: "Un buste ajusté, une jupe qui s'ouvre en A : c'est la coupe la plus universelle du catalogue, celle que l'anglais appelle A-line et que l'on dit aussi « évasée ». Les plus chic : Aster, en dentelle de Chantilly, satin et manches amovibles ; Monica, en jacquard floral à ceinture ; Pendant, en dentelle à manches longues ; Fortune, bustier en crêpe et organza satin.",
      description:
        "Robe de mariée trapèze : buste ajusté, jupe évasée en A (A-line). Aster, Monica, Pendant, Fortune, Héra, à essayer au showroom MADAMOON, Paris 10e.",
      chapo:
        "Trapèze, évasée, A-line : trois noms pour la même ligne. Voici ce qu'elle fait, et les robes du catalogue qui la portent avec le plus de tenue.",
      sections: [
        {
          titre: "La ligne",
          texte: [
            "Le trapèze tient le buste et ouvre la jupe en A dès la taille, sans le volume d'une princesse ni la proximité d'une sirène. C'est pour cela qu'il va à toutes les morphologies : Pendant, Aster, Monica, Fortune, Héra, Nirali, Carrie et Solana sont indiquées, sur leurs fiches, pour les six.",
          ],
        },
        {
          titre: "Les plus chic",
          texte: [
            "Aster, chez Watters Designs, revisite les codes traditionnels avec une élégance contemporaine : dentelle de Chantilly, satin, taille naturelle, corsage drapé, manches amovibles. Monica, chez Monica Loretti, est en jacquard floral, décolleté en V, ceinture et fente. Fortune est un bustier trapèze en crêpe stretch et organza satin ; Héra, un trapèze en satin aux bretelles tombantes.",
          ],
        },
        {
          titre: "Trapèze et bohème",
          texte: [
            "Pour une robe de mariée trapèze bohème, Pendant, en dentelle à manches longues, et Mitra, en dentelle Cassie et rubans de velours, portent l'esprit sans la mousseline.",
          ],
        },
      ],
      aRetenir: [
        "Trapèze = évasée = A-line : buste ajusté, jupe en A.",
        "La coupe qui va aux six morphologies.",
        "Les plus chic : Aster, Monica, Fortune, Héra.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "Les robes trapèze" },
        { href: "/robes/aster", label: "Aster" },
        { href: "/robes/monica", label: "Monica" },
      ],
    },
  ],
  "deux-en-un": [
    {
      slug: "robe-de-mariee-surjupe-amovible",
      titre: "Robe de mariée à surjupe amovible",
      q: "Quelles robes de mariée ont une surjupe amovible ?",
      r: "Tessa, de Casablanca Bridal : une sirène au corset structuré, avec une surjupe détachable et des bretelles amovibles — une robe pour la cérémonie, une autre pour la soirée. Clover, courte avec surjupe : la mairie puis la fête. Mira, chez Monica Loretti, a une jupe amovible en tulle sur une sirène en crêpe.",
      description:
        "Robe de mariée à surjupe amovible : Tessa, Clover, Mira. Une robe, deux allures, à essayer au showroom MADAMOON, Paris 10e.",
      chapo:
        "La surjupe mariage est le secret des robes deux-en-un : une jupe qui s'attache pour la cérémonie et se retire pour danser. Voici les modèles du catalogue qui en ont une.",
      sections: [
        {
          titre: "Les robes à surjupe",
          texte: [
            "Tessa est une sirène au corset structuré, avec une surjupe détachable et des bretelles amovibles ; sa fiche parle d'un « charme vintage-chic ». Clover est une deux-en-un courte, avec surjupe : la robe courte pour la mairie, la surjupe pour la cérémonie. Mira, chez Monica Loretti, est une sirène en crêpe et dentelle avec une jupe amovible en tulle.",
          ],
        },
        {
          titre: "Comment on la porte",
          texte: [
            "La surjupe se pose à la taille, par-dessus la robe, et se retire sans aide une fois la cérémonie passée. Elle donne le volume d'une princesse à une sirène ou à une robe courte, le temps qu'il faut. À l'essayage, on essaie les deux allures l'une après l'autre.",
          ],
        },
      ],
      aRetenir: [
        "Tessa, Clover, Mira : une surjupe ou une jupe amovible.",
        "Le volume pour la cérémonie, la ligne pour la soirée.",
      ],
      liens: [
        { href: "/robes/tessa", label: "Tessa" },
        { href: "/robes/clover", label: "Clover" },
        { href: "/coupes/deux-en-un", label: "Les robes deux-en-un" },
      ],
    },
  ],
};
