import type { Categorie } from "@/lib/madamoon";

/*
 * Les six coupes MADAMOON.
 *
 * Chacune a son ancre, sa ligne courte — celle qui se pose dans l'image —
 * et la robe qui la représente le mieux en photographie. Rien n'est
 * inventé : les descriptions viennent de ce que la coupe fait réellement.
 */

export type Coupe = {
  nom: Categorie;
  /* Sert d'ancre dans le catalogue et d'adresse à sa page. */
  ancre: string;
  note: string;
  /* Le modèle qui sert d'image à la famille. */
  robe: string;
  vue: number;
  /* La robe qui ouvre la page de la silhouette : son film s'il en existe
   * un, sa photographie sinon. Distincte de `robe`, qui n'est qu'une
   * vignette : ici il faut un modèle filmé quand le catalogue en a un. */
  ouverture?: { robe: string; vue: number };
  /* Le paragraphe posé sous l'ouverture : il dit en toutes lettres ce
   * qu'une mariée tape dans un moteur — « robe de mariée sirène » —, et
   * ne nomme que des robes du catalogue. Les coupes sans données de
   * recherche n'en ont pas. Mots-clés et volumes : docs/seo/. */
  intro?: string;
  /* Une page de la coupe vers laquelle l'intro renvoie. */
  introLien?: { href: string; label: string };
};

export const COUPES: Coupe[] = [
  {
    nom: "Sirène",
    ancre: "sirene",
    note: "Féminine et sensuelle",
    robe: "uma",
    vue: 1,
    ouverture: { robe: "ariel", vue: 1 },
    intro:
      "La robe de mariée sirène épouse la silhouette jusqu'aux cuisses, puis s'évase jusqu'au sol, souvent en traîne. Chez MADAMOON, elle se décline en crêpe comme Mira ou Bondi, en dentelle comme Uma, en satin mat comme Ariel. Dans notre showroom du 10ᵉ, à Paris, chaque robe sirène s'essaie avant de se choisir : sa tenue sur le corps ne se devine pas sur une photo. Robe sirène pour un mariage, fourreau, trompette ou robe moulante près du corps : les mots varient, la ligne est la même — et une robe de mariée droite en crêpe, comme Milan, s'y range aussi. Sirène longue à traîne — Venus, Summer —, sirène simple en crêpe — Bondi, Milan —, dos nu — Bella —, col montant — Chastity, rangée avec les deux-en-un —, sirène bohème en dentelle — Uma —, grande taille comme petite puisque tout est à vos mesures : il n'y a pas de sirène courte au catalogue, et le luxe d'une sirène tient à sa coupe, pas à son prix. Sirène chic et élégante, pas cher ? À vos mesures, à partir de 1 500 €. Sirène à jupe amovible — Mira, avec sa jupe en tulle —, à surjupe — Tessa, chez les deux-en-un —, fendue — Bondi, Milan, Mira —, au corset — Oksana —, blanche ou ivoire, jamais beige ni rouge ; col bateau, non ; épaules dénudées, oui — Enid. Pour une femme ronde ou enceinte, la forme sirène se juge au showroom : rien n'est exclu avant l'essayage.",
  },
  {
    nom: "Princesse",
    ancre: "princesse",
    note: "Raffinée et solennelle",
    robe: "addison",
    vue: 1,
    ouverture: { robe: "addison", vue: 1 },
    intro:
      "La robe de mariée princesse se reconnaît à son corset travaillé et à l'ampleur assumée de sa jupe : une coupe raffinée et solennelle, pensée pour un mariage qui ne craint pas le volume. Addison, en satin de soie, en est l'image sur notre site. À Paris, dans notre showroom du 10ᵉ, l'essayage d'une robe princesse se fait sur rendez-vous : le volume d'une jupe se juge debout, en mouvement, jamais sur un cintre. Robe de princesse pour un mariage, robe « meringue » ou robe de bal : l'ampleur se dose, du tulle de Santana au jacquard de Guinevere, et une robe princesse de luxe se reconnaît à son corset et à ses finitions, pas à son prix. Princesse à manches longues — Seraphina —, à bretelles fines — Santana —, strass et paillettes — Carrie —, col montant ou bustier, bohème et légère — Alicia —, grande taille comme petite puisque tout est à vos mesures : pas de princesse courte ni rose au catalogue, blanc ou ivoire seulement, à partir de 1 500 €. Princesse pas cher ? Non : à vos mesures, et combien coûte une princesse se dit au showroom. Dos nu ou bustier, jupe bouffante ou plus simple, pour une femme ronde ou enceinte comme pour une mince, blanche ou ivoire — ni rouge ni champagne — : le magasin, c'est le showroom du 10ᵉ, et une princesse chic y est magnifique sur vous, ou ne l'est pas.",
  },
  {
    nom: "Fluide",
    ancre: "fluide",
    note: "Souple et légère",
    robe: "adularia",
    vue: 1,
    intro:
      "La robe de mariée fluide suit le mouvement plutôt que de le contraindre : mousseline, charmeuse, satin mat. C'est la coupe la plus naturelle pour un mariage bohème, et elle se porte tout aussi bien en satin pour une cérémonie plus classique. De l'élégance minimaliste d'Adularia au look bohème chic d'Hélène, en passant par le satin mat de Dove, chaque modèle en montre une facette : robe fluide pour un mariage en dentelle comme Murielle, à manches illusion ; robe fluide simple comme Adularia ou Marie ; robe fluide perlée comme Maribel. Fluide longue ou courte ? Toutes les fluides du catalogue sont longues, les courtes sont ailleurs ; dos nu ou bustier, en mousseline ou en charmeuse, soie ou non selon la maison, pour une femme ronde ou mince, grande taille ou petite : la forme suit le corps, blanche ou ivoire, à vos mesures et sans surcoût. Fluide champêtre ou hippie chic, habillée pour un mariage civil ou une plage, drapée et vaporeuse, avec ou sans traîne, col en V ou haut en dentelle, sans jupon : pas chère au sens du prêt-à-porter, non ; à vos mesures, oui.",
    introLien: { href: "/styles/boheme", label: "Robe de mariée bohème à Paris" },
  },
  {
    nom: "Trapèze",
    ancre: "trapeze",
    note: "Juste et intemporelle",
    robe: "solana",
    vue: 1,
    ouverture: { robe: "solana", vue: 1 },
    intro:
      "La robe de mariée trapèze s'ouvre en A depuis la taille, sans le volume d'une princesse ni l'ajustement d'une sirène : juste et intemporelle, c'est la coupe que l'on essaie en premier pour se situer. Robe trapèze chic pour un mariage en ville — Charlotte en dentelle Caterina, Hera en satin —, robe trapèze bohème — Pendant, en dentelle à manches longues —, ou courte — River, au décolleté carré — : d'après leurs fiches, elle va à toutes les morphologies. Dans notre showroom du 10ᵉ, à Paris, chaque trapèze s'essaie sur rendez-vous. Robe trapèze pour un mariage civil — River, courte — ou pour une femme ronde comme mince, en forme de A avec ou sans jupon, col en V ou décolleté droit, mi-longue ou longue, ivoire ou blanche, asymétrique ou non : élégante, et à vos mesures, toutes tailles.",
    introLien: { href: "/details/courte", label: "Robe de mariée courte à Paris" },
  },
  {
    nom: "Deux en un",
    ancre: "deux-en-un",
    note: "Deux allures, une robe",
    /* La troisième vue, celle où la surjupe se voit : sur la première,
     * Tessa est un fourreau et la promesse ne se lit pas. */
    robe: "tessa",
    vue: 3,
    ouverture: { robe: "tessa", vue: 1 },
    intro:
      "La robe de mariée deux-en-un change d'allure en une minute : une surjupe de mariée pour la cérémonie, retirée pour la soirée ; des bretelles amovibles ; une jupe transparente par-dessus une robe courte. Surjupe pour un mariage, jupe transparente, bretelles ou veste amovibles : Tessa, Clover, Gabriel et Solana en montrent chacune une version. Au showroom du 10ᵉ, à Paris, on essaie les deux allures l'une après l'autre, et l'on repart souvent avec la deux-en-un plutôt qu'avec deux robes. Jupe détachable, surjupe longue, bretelles ou veste amovibles, satin ou dentelle : le détachable est la règle du deux-en-un, et le jupon, s'il en faut un, se discute aux retouches.",
    introLien: { href: "/styles/mariage-civil", label: "Robe pour un mariage civil à Paris" },
  },
];

export function coupe(nom: Categorie): Coupe {
  return COUPES.find((c) => c.nom === nom) ?? COUPES[0];
}

/*
 * Le pluriel se dit sur les pages ; le catalogue n'en garde que le
 * singulier. « Deux en un » n'en prend pas, « fluide »
 * non plus sans le mot « robes ».
 */
export const PLURIEL: Record<Categorie, string> = {
  Sirène: "sirènes",
  Fluide: "robes fluides",
  Trapèze: "trapèzes",
  Princesse: "robes princesse",
  "Deux en un": "deux-en-un",
};

/*
 * La forme employée après « robes de mariée ».
 *
 * Certaines coupes s'accordent — « robes fluides », « robes
 * sirènes » — et d'autres restent invariables parce qu'elles sont
 * des noms en apposition : on écrit « robes de mariée sirène », jamais
 * « sirènes ». Une table est plus sûre qu'une règle.
 */
export const APPOSITION: Record<Categorie, string> = {
  Sirène: "sirène",
  Fluide: "fluides",
  Trapèze: "trapèze",
  Princesse: "princesse",
  "Deux en un": "deux-en-un",
};

export function coupeParAncre(ancre: string): Coupe | undefined {
  return COUPES.find((c) => c.ancre === ancre);
}
