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
      "La robe de mariée sirène épouse la silhouette jusqu'aux cuisses, puis s'évase jusqu'au sol, souvent en traîne. Chez MADAMOON, elle se décline en crêpe comme Mira ou Bondi, en dentelle comme Uma, en satin mat comme Ariel. Dans notre showroom du 10ᵉ, à Paris, chaque robe sirène s'essaie avant de se choisir : sa tenue sur le corps ne se devine pas sur une photo.",
  },
  {
    nom: "Princesse",
    ancre: "princesse",
    note: "Raffinée et solennelle",
    robe: "addison",
    vue: 1,
    ouverture: { robe: "addison", vue: 1 },
    intro:
      "La robe de mariée princesse se reconnaît à son corset travaillé et à l'ampleur assumée de sa jupe : une coupe raffinée et solennelle, pensée pour un mariage qui ne craint pas le volume. Addison, en satin de soie, en est l'image sur notre site. À Paris, dans notre showroom du 10ᵉ, l'essayage d'une robe princesse se fait sur rendez-vous : le volume d'une jupe se juge debout, en mouvement, jamais sur un cintre.",
  },
  {
    nom: "Fluide",
    ancre: "fluide",
    note: "Souple et légère",
    robe: "adularia",
    vue: 1,
    intro:
      "La robe de mariée fluide suit le mouvement plutôt que de le contraindre : mousseline, charmeuse, satin mat. C'est la coupe la plus naturelle pour un mariage bohème, et elle se porte tout aussi bien en satin pour une cérémonie plus classique. De l'élégance minimaliste d'Adularia au look bohème chic d'Hélène, en passant par le satin mat de Dove, chaque modèle en montre une facette.",
    introLien: { href: "/coupes/fluide/robe-de-mariee-boheme-paris", label: "Robe de mariée bohème à Paris" },
  },
  {
    nom: "Trapèze",
    ancre: "trapeze",
    note: "Juste et intemporelle",
    robe: "solana",
    vue: 1,
    ouverture: { robe: "solana", vue: 1 },
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
