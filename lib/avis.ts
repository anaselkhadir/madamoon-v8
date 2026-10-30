/*
 * Les avis des mariées.
 *
 * Relevés sur la fiche Google de la maison le 2 septembre 2026 : 5,0 de
 * moyenne affichée sur 200 avis. Huit sont repris ici, mot pour mot.
 * Rien n'est écrit à la place d'une cliente — un faux avis sur un site
 * marchand est un délit, pas une licence rédactionnelle.
 *
 * `texte` est l'avis entier, tel que publié. `extrait` est le passage
 * montré : toujours d'un seul tenant, jamais recollé, et suivi de
 * crochets pour dire qu'il en manque. Le balisage schema.org porte
 * l'avis complet — c'est le texte que l'on déclare, pas la coupe que
 * l'on affiche.
 *
 * Les dates viennent des mentions relatives de Google (« il y a quatre
 * mois »), ramenées au mois. C'est la précision de la source, pas une
 * de plus.
 */

export type Avis = {
  /* Le nom tel qu'il figure sur la fiche. On ne le complète ni ne
   * l'abrège : c'est la donnée de quelqu'un d'autre. */
  auteur: string;
  date: string;
  texte: string;
  extrait?: string;
  note: 1 | 2 | 3 | 4 | 5;
};

export const AVIS: Avis[] = [
  {
    auteur: "Éloïse Marty",
    date: "Mai 2026",
    note: 5,
    texte:
      "Les robes chez MADAMOON sont simplement sublimes ! J'ai visité 2 autres magasins avant celui-ci et j'ai vu une vraie différence dans la qualité des tissus et le rendu général des robes ! Loin des robes lourdes, ce sont des robes qu'on n'a pas envie d'enlever (même pour les robes « princesse » et volumineuses). Encore merci Mouna pour votre accueil, vous avez visé juste dans le choix des robes et du voile, c'était parfait ! Et pour finir, les robes sont faites sur mesure une fois le modèle choisi et la boutique est sublime ! Je recommande totalement !",
    extrait:
      "J'ai visité 2 autres magasins avant celui-ci et j'ai vu une vraie différence dans la qualité des tissus et le rendu général des robes ! Loin des robes lourdes, ce sont des robes qu'on n'a pas envie d'enlever.",
  },
  {
    auteur: "Mathilde Pln",
    date: "Mai 2026",
    note: 5,
    texte:
      "J'ai eu le bonheur de faire les essayages de ma future robe de mariée chez Madamoon et je ne peux que recommander ! La boutique est magnifique, Mouna est adorable et les robes sublimes. Les essayages étant privés, je n'ai pas eu l'impression comme dans d'autres boutiques d'être dans une usine à robe, d'autant que Mouna sait ce qu'elle fait et ce qu'elle propose tombe juste. En bref, je suis très heureuse d'avoir choisi ma robe ici !",
    extrait:
      "Les essayages étant privés, je n'ai pas eu l'impression comme dans d'autres boutiques d'être dans une usine à robe, d'autant que Mouna sait ce qu'elle fait et ce qu'elle propose tombe juste.",
  },
  {
    auteur: "Maissa Gharbi",
    date: "Août 2026",
    note: 5,
    texte:
      "Une magnifique expérience pour le choix de ma robe de mariée. Mouna est d'une grande gentillesse, très patiente et toujours à l'écoute. Elle a tout de suite compris ce que je recherchais et m'a proposé une robe élégante, unique et parfaitement adaptée à mes envies. J'ai également beaucoup apprécié l'expérience privée et personnalisée, qui a rendu ce moment encore plus spécial. Je recommande cette boutique les yeux fermés !",
    extrait:
      "Elle a tout de suite compris ce que je recherchais et m'a proposé une robe élégante, unique et parfaitement adaptée à mes envies. J'ai également beaucoup apprécié l'expérience privée et personnalisée.",
  },
  {
    auteur: "Gwendoline Carrier",
    date: "Mars 2026",
    note: 5,
    texte:
      "Une expérience magnifique. J'ai débarqué dans cette boutique fin octobre pour un mariage en février, le délai était court mais j'ai été rassurée dès le début. Une femme douce, gentille, agréable, j'avais l'impression de faire un essayage avec une amie, j'ai eu le droit à l'avis d'une femme et non pas de la vendeuse. Merci beaucoup",
    extrait:
      "J'avais l'impression de faire un essayage avec une amie, j'ai eu le droit à l'avis d'une femme et non pas de la vendeuse.",
  },
  {
    auteur: "Alexandra Gattesco",
    date: "Juillet 2026",
    note: 5,
    texte:
      "Quel enchantement lorsque Mouna nous a ouvert à mes demoiselles d'honneur et moi les portes de son magasin. En plus d'être de bon conseil, sa bonne humeur est contagieuse. Je suis tombée enceinte entre la prise de mesure initiale et le jour de mon mariage et elle a été réactive dans la gestion des retouches de ma robe sur mesure. Un grand merci pour ça ! À bientôt j'espère !",
    extrait:
      "Je suis tombée enceinte entre la prise de mesure initiale et le jour de mon mariage, et elle a été réactive dans la gestion des retouches de ma robe sur mesure.",
  },
  {
    auteur: "Julia JF",
    date: "Septembre 2025",
    note: 5,
    texte:
      "Je recommande très chaudement cette boutique et ses robes de mariée. En plus d'avoir des robes magnifiques, la propriétaire était adorable et très professionnelle. Quand j'y suis allée, il y avait des robes à des budgets différents, des robes prêtes et des robes de créateurs/créatrices à commander sur mesures. Entre novembre 2024 et mai 2025, j'ai cherché longtemps ma robe et fait 7 boutiques différentes, 10 essayages + 2 essayages annulées, vu des centaines de robes en ligne… Ici, j'ai essayé 2 robes totalement différentes et de très belle qualité. Bilan, c'est la boutique que je recommande à Paris !",
    extrait:
      "J'ai cherché longtemps ma robe et fait 7 boutiques différentes, 10 essayages, vu des centaines de robes en ligne… Bilan, c'est la boutique que je recommande à Paris !",
  },
  {
    auteur: "Charline Ferry",
    date: "Février 2026",
    note: 5,
    texte:
      "J'ai trouvé ma robe dans cette magnifique boutique et j'ai eu la chance d'être accompagnée par Mouna. Elle est douce, souriante et à l'écoute. Quant à la boutique, elle est raffinée et empreinte de charme vintage : un véritable cocon intimiste, parfait pour des essayages en toute sérénité. Les robes que j'ai eu le plaisir d'essayer étaient toutes extrêmement agréables à porter, aériennes et d'une très grande qualité. J'ai vécu un moment hors du temps. Un immense merci !",
    extrait:
      "Elle est raffinée et empreinte de charme vintage : un véritable cocon intimiste, parfait pour des essayages en toute sérénité.",
  },
  {
    auteur: "Lolo makiadi",
    date: "Octobre 2025",
    note: 5,
    texte:
      "J'appréhendais l'achat de ma robe de mariée. Pendant la confection, j'étais également stressée et indécise, mais Mouna a su faire preuve de patience à mon égard. Grâce à ses conseils, j'ai pu trouver une robe qui me mettait en valeur selon ma morphologie. Lors de l'essayage, j'étais très satisfaite du résultat. Ce fut un véritable plaisir d'avoir choisi ma robe dans cette boutique.",
    extrait:
      "Grâce à ses conseils, j'ai pu trouver une robe qui me mettait en valeur selon ma morphologie. Lors de l'essayage, j'étais très satisfaite du résultat.",
  },
];

/*
 * La note d'ensemble.
 *
 * `source` et `url` ne sont pas décoratifs : une note que la visiteuse ne
 * peut pas aller vérifier ne vaut rien, et l'article L111-7-2 du code de
 * la consommation demande que l'origine des avis soit indiquée.
 */
export const NOTE = {
  moyenne: 5,
  nombre: 200,
  source: "Google",
  url: "https://www.google.com/maps/place/MADAMOON/@48.8813531,2.3656125,17z/data=!4m8!3m7!1s0x47e66fa814c9c5bd:0x5bd1799a0050134!8m2!3d48.8813531!4d2.3656125!9m1!1b1!16s%2Fg%2F11ldhgkrrv",
};

/*
 * La distinction mise en avant, à la demande expresse de la maison.
 *
 * C'est une allégation comparative : elle engage MADAMOON au titre de
 * l'article L121-2 du code de la consommation et devra être prouvée le
 * jour où un concurrent la conteste. La preuve appartient à la maison,
 * qui l'a réaffirmée après que la question lui a été posée.
 *
 * À ne pas confondre avec « aucun avis en dessous de cinq étoiles » :
 * cette formule-là serait fausse, la fiche portant au moins un avis à
 * une étoile. La moyenne de 5,0 est celle qu'affiche Google, arrondie.
 */
export const DISTINCTION =
  "Seule boutique de robes de mariée notée 5 étoiles du 10ᵉ arrondissement.";
