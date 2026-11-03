import { MAISON, MORPHOLOGIES, SEMI_MESURE, FAMILLES, createurParNom, type Robe } from "@/lib/madamoon";
import { coupe as coupeDe } from "@/lib/coupes";
import { stylesDe } from "@/lib/styles";
import { coupeNom, coupeNote, coupePluriel, createurNote, createurOrigine, familleTexte, morphoNom, robeLigne, robeRegard } from "@/lib/contenu";
import { de } from "@/lib/francais";
import type { Langue } from "@/lib/langue";

/*
 * Ce que la fiche d'une robe dit aux moteurs, composé depuis ses données.
 *
 * Les fiches tenaient en cent soixante mots, un titre sur un moule et
 * une description identique à soixante-sept exemplaires. Ce module
 * compose, pour chaque robe, un titre et une description qui lui sont
 * propres, quatre sections lisibles et quatre questions — à partir de
 * ce que la fiche contient déjà : sa ligne, le texte de sa maison, sa
 * coupe, son créateur, ses morphologies, les pages de famille qui la
 * citent, et les faits de la boutique.
 *
 * Rien n'est inventé : une robe dont la maison n'a écrit qu'une phrase
 * garde une page plus courte que Santana. Les matières et détails sont
 * lus dans la ligne et le regard, pas déduits d'une photographie ; une
 * page de famille n'est citée que si elle montre la robe.
 */

export type SectionFiche = {
  id: string;
  titre: string;
  paragraphes: string[];
  liens: { href: string; label: string }[];
};

export type FicheSeo = {
  titre: string;
  description: string;
  sections: SectionFiche[];
  questions: { q: string; r: string }[];
};

/* Les matières et détails que l'on sait lire dans une fiche, avec la
 * page qui en parle. Le motif est cherché sur le texte français, sans
 * accents ; le libellé suit la langue. */
const LECTURES: {
  motif: RegExp;
  fr: string;
  en: string;
  href?: string;
  matiere?: boolean;
}[] = [
  { motif: /dentelle/, fr: "dentelle", en: "lace", href: "/matieres/dentelle", matiere: true },
  { motif: /satin/, fr: "satin", en: "satin", href: "/matieres/satin", matiere: true },
  { motif: /crepe/, fr: "crêpe", en: "crêpe", href: "/guides/tissus-robe-de-mariee", matiere: true },
  { motif: /tulle/, fr: "tulle", en: "tulle", href: "/guides/tissus-robe-de-mariee", matiere: true },
  { motif: /mousseline/, fr: "mousseline", en: "chiffon", href: "/guides/tissus-robe-de-mariee", matiere: true },
  { motif: /mikado/, fr: "mikado", en: "mikado", href: "/guides/tissus-robe-de-mariee", matiere: true },
  { motif: /organza/, fr: "organza", en: "organza", href: "/guides/tissus-robe-de-mariee", matiere: true },
  { motif: /jacquard/, fr: "jacquard", en: "jacquard", href: "/guides/tissus-robe-de-mariee", matiere: true },
  { motif: /charmeuse/, fr: "charmeuse", en: "charmeuse", href: "/guides/tissus-robe-de-mariee", matiere: true },
  { motif: /neoprene/, fr: "néoprène", en: "neoprene", href: "/guides/tissus-robe-de-mariee", matiere: true },
  { motif: /georgette/, fr: "georgette", en: "georgette", href: "/guides/tissus-robe-de-mariee", matiere: true },
  { motif: /manches? longues?/, fr: "manches longues", en: "long sleeves", href: "/details/manches-longues" },
  { motif: /dos (nu|ouvert|illusion|transparent)|dos en dentelle/, fr: "dos nu ou dos illusion", en: "open or illusion back", href: "/details/dos-nu" },
  { motif: /bustier|sans bretelles/, fr: "bustier", en: "strapless bodice", href: "/details/bustier" },
  { motif: /corset/, fr: "corset", en: "corset", href: "/details/bustier" },
  { motif: /\bcourte?\b/, fr: "robe courte", en: "short dress", href: "/details/courte" },
  { motif: /surjupe|amovible|detachable/, fr: "élément amovible", en: "detachable element", href: "/coupes/deux-en-un" },
  { motif: /traine/, fr: "traîne", en: "train", href: "/guides/traine-robe-de-mariee" },
  { motif: /perle|paillet|scintill|brod/, fr: "perles, broderies ou paillettes", en: "beads, embroidery or sequins" },
  { motif: /fente|fendue/, fr: "fente", en: "slit" },
  { motif: /decollete en coeur|decollete coeur/, fr: "décolleté en cœur", en: "sweetheart neckline" },
  { motif: /decollete (en )?v\b/, fr: "décolleté en V", en: "V neckline" },
  { motif: /epaules (denudees|degagees)|bardot/, fr: "épaules dénudées", en: "off-the-shoulder neckline" },
  { motif: /col montant/, fr: "col montant", en: "high neck" },
  { motif: /fleurs? (3d|en relief|de couleur|brodees?)|floral/, fr: "fleurs", en: "flowers" },
];

/* Les matières que la fiche nomme, pour le filtre du catalogue : la clé
 * est le mot français sans accent, le libellé suit la langue. */
export function matieresDe(robe: Robe): { cle: string; fr: string; en: string }[] {
  const texte = sansAccents(`${robe.ligne}. ${robe.regard}`);
  return LECTURES.filter((l) => l.matiere && l.motif.test(texte)).map((l) => ({
    cle: sansAccents(l.fr).replace(/\s+/g, "-"),
    fr: l.fr,
    en: l.en,
  }));
}

const sansAccents = (t: string) =>
  t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/* La première phrase d'un texte. */
const premiere = (t: string) => t.split(/(?<=[.!?])\s/)[0];

/* Les six lettres, dites. */
const lettresDites = (lettres: readonly string[], langue: Langue) =>
  lettres.map((l) => (langue === "fr" ? `en ${l}` : `${l}`)).join(", ");

export function ficheSeo(robe: Robe, langue: Langue): FicheSeo {
  const fr = langue === "fr";
  const nom = robe.nom;
  const deNom = fr ? de(nom) : nom;
  const ligne = robeLigne(robe, langue);
  const regard = robeRegard(robe, langue);
  const cat = robe.categorie;
  const laCoupe = coupeDe(cat);
  const coupeBas = coupeNom(cat, langue).toLowerCase();
  const maison = createurParNom(robe.createur);
  const styles = stylesDe(robe.slug);
  const texteFr = sansAccents(`${robe.ligne}. ${robe.regard}`);
  const lus = LECTURES.filter((l) => l.motif.test(texteFr));
  const matieres = lus.filter((l) => l.matiere);
  const details = lus.filter((l) => !l.matiere);
  const servies = robe.morphos ?? [];
  const lieu = `${MAISON.adresse}, Paris 10ᵉ`;
  const semi = robe.createur === SEMI_MESURE;

  /* ————————————————————————————————————————— titre ————— */
  const matiereTitre = matieres[0]?.[langue];
  const candidats = fr
    ? [
        robe.createur && matiereTitre && `Robe de mariée ${nom}, ${coupeBas} en ${matiereTitre} — ${robe.createur}`,
        robe.createur && `Robe de mariée ${nom}, ${coupeBas} — ${robe.createur}`,
        matiereTitre && `Robe de mariée ${nom}, ${coupeBas} en ${matiereTitre} — MADAMOON`,
        `Robe de mariée ${nom}, ${coupeBas} — MADAMOON`,
        `Robe de mariée ${nom} — MADAMOON`,
      ]
    : [
        robe.createur && matiereTitre && `${nom} wedding dress, ${matiereTitre} ${coupeBas} — ${robe.createur}`,
        robe.createur && `${nom} wedding dress, ${coupeBas} — ${robe.createur}`,
        matiereTitre && `${nom} wedding dress, ${matiereTitre} ${coupeBas} — MADAMOON`,
        `${nom} wedding dress, ${coupeBas} — MADAMOON`,
        `${nom} wedding dress — MADAMOON`,
      ];
  const titre = (candidats.filter(Boolean) as string[]).find((c) => c.length <= 60) ?? `${nom} — MADAMOON`;

  /* ——————————————————————————————————— description ————— */
  const ligneBasse = ligne.charAt(0).toLowerCase() + ligne.slice(1);
  /* En cascade : la ligne, la première phrase de la maison et l'appel ;
   * sinon la ligne et l'appel ; sinon la ligne et un appel plus court ;
   * sinon la ligne coupée à sa dernière virgule. Jamais plus de 158. */
  const tete = fr ? `${nom} : ${ligneBasse}.` : `${nom}: ${ligneBasse}.`;
  const queues = fr
    ? [
        `Sur mesure dès ${MAISON.prixDepart}, retouches comprises, à essayer au showroom MADAMOON, Paris 10e.`,
        `Sur mesure dès ${MAISON.prixDepart}, au showroom MADAMOON, Paris 10e.`,
        `Au showroom MADAMOON, Paris 10e.`,
      ]
    : [
        `Made to measure from €1,500, alterations included, at the MADAMOON showroom, Paris 10e.`,
        `Made to measure from €1,500, at the MADAMOON showroom, Paris 10e.`,
        `At the MADAMOON showroom, Paris 10e.`,
      ];
  const essais = [
    `${tete} ${premiere(regard)} ${queues[0]}`,
    `${tete} ${premiere(regard)} ${queues[1]}`,
    ...queues.map((q) => `${tete} ${q}`),
  ];
  let description = essais.find((e) => e.length <= 158);
  if (!description) {
    const coupee = tete.length > 100 && tete.includes(",") ? tete.slice(0, tete.lastIndexOf(",")) + "." : tete;
    description = `${coupee} ${queues[2]}`.slice(0, 158);
  }

  /* ———————————————————————————————————— sections ————— */
  const sections: SectionFiche[] = [];

  // 1. la coupe
  const familleTxt = familleTexte(cat, langue, FAMILLES[cat]);
  sections.push({
    id: "coupe",
    titre: fr ? `La coupe ${coupeBas} ${deNom}` : `The ${coupeBas} silhouette of ${nom}`,
    paragraphes: fr
      ? [
          `${nom} est une robe de mariée ${coupeBas} : ${familleTxt.charAt(0).toLowerCase()}${familleTxt.slice(1)} ${coupeNote(laCoupe, langue)}, c'est la note que le catalogue donne à cette coupe — et ${nom} la porte à sa façon : ${ligneBasse}.`,
          `Au showroom, une ${coupeBas} se juge debout, en marchant, puis assise : c'est ainsi que l'on compare ${nom} aux autres ${coupePluriel(cat, langue)} du catalogue.`,
        ]
      : [
          `${nom} is a ${coupeBas} wedding dress: ${familleTxt.charAt(0).toLowerCase()}${familleTxt.slice(1)} ${coupeNote(laCoupe, langue)}, as the catalogue sums up this silhouette — and ${nom} wears it its own way: ${ligneBasse}.`,
          `In the showroom, a ${coupeBas} is judged standing, walking, then seated: that is how ${nom} is compared with the other ${coupePluriel(cat, langue)} in the catalogue.`,
        ],
    liens: [{ href: `/coupes/${laCoupe.ancre}`, label: fr ? `Toutes les ${coupePluriel(cat, langue)}` : `All ${coupePluriel(cat, langue)}` }],
  });

  // 2. matières, détails, maison
  const dire = (l: (typeof LECTURES)[number]) => l[langue];
  const p2: string[] = [];
  if (matieres.length || details.length) {
    const listeM = matieres.map(dire);
    const listeD = details.map(dire);
    p2.push(
      fr
        ? `Ce qui se lit sur la fiche ${deNom}${listeM.length ? ` : ${listeM.join(", ")}` : ""}${listeD.length ? `${listeM.length ? " ;" : " :"} ${listeD.join(", ")}` : ""}. Ce sont les mots de la maison, pas une lecture de photographie : ce que la fiche ne dit pas n'est pas écrit ici.`
        : `What the sheet of ${nom} says${listeM.length ? `: ${listeM.join(", ")}` : ""}${listeD.length ? `${listeM.length ? ";" : ":"} ${listeD.join(", ")}` : ""}. These are the house's words, not a reading of a photograph: what the sheet does not say is not written here.`,
    );
  }
  if (styles.length) {
    const pages = styles.map((s) => s.label[langue].replace(/ à Paris$| in Paris$/, "").toLowerCase());
    p2.push(
      fr
        ? `${nom} figure dans ${styles.length > 1 ? "nos pages" : "notre page"} ${pages.join(", ")} : chacune réunit les robes du catalogue qui partagent ce style, cette matière ou ce détail, pour les essayer ensemble.`
        : `${nom} appears on ${styles.length > 1 ? "our pages" : "our page"} ${pages.join(", ")}: each gathers the catalogue dresses that share this style, fabric or detail, to try them together.`,
    );
  }
  if (maison) {
    p2.push(
      fr
        ? `${nom} est signée ${robe.createur}, maison ${createurOrigine(maison, langue) ? `de ${createurOrigine(maison, langue)}` : ""} : ${createurNote(maison, langue)} MADAMOON ne dessine pas ses robes, elle les choisit une à une chez ses créateurs, puis fait confectionner la vôtre.`
        : `${nom} is by ${robe.createur}${createurOrigine(maison, langue) ? `, from ${createurOrigine(maison, langue)}` : ""}: ${createurNote(maison, langue)} MADAMOON does not design its dresses; it selects them one by one from its designers, then has yours made.`,
    );
  } else if (robe.createur) {
    p2.push(fr ? `${nom} est signée ${robe.createur}.` : `${nom} is by ${robe.createur}.`);
  }
  if (p2.length) {
    sections.push({
      id: "details",
      titre: fr ? `Matières, détails et maison ${deNom}` : `Fabrics, details and house of ${nom}`,
      paragraphes: p2,
      liens: [
        ...styles.map((s) => ({ href: s.href, label: s.label[langue] })),
        ...(matieres.some((m) => m.href === "/guides/tissus-robe-de-mariee")
          ? [{ href: "/guides/tissus-robe-de-mariee", label: fr ? "Les tissus d'une robe de mariée" : "Wedding dress fabrics (in French)" }]
          : []),
        ...details.filter((d) => d.href && !styles.some((s) => s.href === d.href)).map((d) => ({ href: d.href as string, label: d[langue] })),
        ...(maison ? [{ href: `/createurs/${maison.slug}`, label: fr ? `Les robes ${robe.createur}` : `${robe.createur} dresses` }] : []),
      ].filter((l, i, a) => a.findIndex((x) => x.href === l.href) === i),
    });
  }

  // 3. à qui elle va
  const toutes = servies.length === MORPHOLOGIES.length;
  const p3 = servies.length
    ? fr
      ? toutes
        ? `D'après sa fiche, ${nom} va à toutes les morphologies — ${lettresDites(servies, langue)}. C'est rare, et c'est ce qui en fait une valeur sûre à l'essayage : elle ouvre des pistes sans en fermer aucune.`
        : `D'après sa fiche, ${nom} est d'abord conseillée aux morphologies ${lettresDites(servies, langue)}. Une morphologie ouvre des pistes, elle n'en ferme aucune : rien n'empêche de l'essayer autrement.`
      : toutes
        ? `According to its sheet, ${nom} suits every body shape — ${lettresDites(servies, langue)}. That is rare, and what makes it a safe bet at a fitting.`
        : `According to its sheet, ${nom} is first recommended for the ${lettresDites(servies, langue)} shapes. A body shape opens paths, it closes none: nothing stops you trying it otherwise.`
    : fr
      ? `Sa fiche ne précise pas encore les morphologies ${/^[aeiouyhàâäéèêëîïôöùûüAEIOUYHÀÂÄÉÈÊËÎÏÔÖÙÛÜ]/.test(nom) ? `qu’${nom}` : `que ${nom}`} sert en premier : elle s'essaie, et Élise, notre conseillère, vous guide en trois questions depuis votre silhouette.`
      : `Its sheet does not yet state which body shapes ${nom} serves first: it is tried on, and Élise, our adviser, guides you in three questions from your figure.`;
  sections.push({
    id: "morphologies",
    titre: fr ? `À qui va ${nom}` : `Who ${nom} suits`,
    paragraphes: [
      p3,
      fr
        ? `Chaque robe est ${semi ? "déclinée en semi-mesure" : "confectionnée sur mesure"} : une robe de mariée grande taille, comme une petite taille, ne se cherche pas dans un rayon. ${nom} se fait à vos mesures, retouches comprises.`
        : `Every dress is ${semi ? "made semi-bespoke" : "made to measure"}: a plus-size wedding dress, like a petite one, is not looked for on a rail. ${nom} is made to your measurements, alterations included.`,
    ],
    liens: [
      ...servies.map((l) => {
        const m = MORPHOLOGIES.find((x) => x.lettre === l);
        return { href: `/morphologies/${l.toLowerCase()}`, label: m ? morphoNom(m, langue) : l };
      }),
      { href: "/morphologies/grande-taille", label: fr ? "Robe de mariée grande taille" : "Plus-size wedding dress (in French)" },
    ],
  });

  // 4. l'essayer à Paris
  sections.push({
    id: "essayer",
    titre: fr ? `Essayer ${nom} à Paris` : `Trying on ${nom} in Paris`,
    paragraphes: fr
      ? [
          `${nom} s'essaie au showroom MADAMOON, ${lieu}, sur rendez-vous uniquement : le showroom est privatisé pour vous pendant une heure, et vous pouvez venir accompagnée. Le premier essayage se prévoit idéalement huit à neuf mois avant le mariage ; comptez trois essayages en tout.`,
          `Le site n'affiche pas de prix par modèle : les robes ${semi ? "en semi-mesure" : "sur mesure"} commencent à ${MAISON.prixDepart}, retouches comprises, et le prix ${deNom} vous est donné au showroom, pour le modèle et la matière choisis.`,
        ]
      : [
          `${nom} is tried on at the MADAMOON showroom, ${lieu}, by appointment only: the showroom is yours alone for an hour, and you are welcome to bring company. The first fitting is ideally planned eight to nine months before the wedding; count three fittings in all.`,
          `The site shows no price per model: ${semi ? "semi-bespoke" : "made-to-measure"} dresses start at €1,500, alterations included, and the price of ${nom} is given in the showroom, for the model and fabric chosen.`,
        ],
    liens: [
      { href: "/rendez-vous", label: fr ? "Prendre rendez-vous" : "Book an appointment" },
      { href: "/guides/essayage-robe-de-mariee", label: fr ? "Comment se passe un essayage" : "How a fitting goes (in French)" },
      { href: "/guides/prix-robe-de-mariee-paris", label: fr ? "Le prix d'une robe de mariée à Paris" : "Wedding dress prices in Paris (in French)" },
    ],
  });

  /* ————————————————————————————————————— questions ————— */
  const questions = fr
    ? [
        { q: `Quelle est la coupe de la robe ${nom} ?`, r: `${nom} est une robe de mariée ${coupeBas} — ${familleTxt} Sa ligne, telle que la maison l'écrit : ${ligneBasse}.` },
        servies.length
          ? { q: `À quelles morphologies va ${nom} ?`, r: toutes ? `D'après sa fiche, à toutes les morphologies, en O, en A, en V, en H, en 8 et en X. Elle est confectionnée à vos mesures, quelle que soit votre taille.` : `D'après sa fiche, d'abord aux morphologies ${lettresDites(servies, langue)} ; elle s'essaie aussi autrement, et se fait à vos mesures, quelle que soit votre taille.` }
          : { q: `Comment savoir si ${nom} me va ?`, r: `En l'essayant : le showroom est privatisé pour vous pendant une heure, et Élise, notre conseillère, vous oriente depuis votre morphologie en trois questions.` },
        { q: `Quel est le prix de la robe ${nom} ?`, r: `Le site n'affiche pas de prix par modèle. Les robes ${semi ? "en semi-mesure" : "sur mesure"} commencent à ${MAISON.prixDepart}, retouches comprises ; le prix ${deNom} vous est donné au showroom selon le modèle et la matière.` },
        { q: `Où essayer ${nom} à Paris ?`, r: `Au showroom MADAMOON, ${lieu}, sur rendez-vous. Le rendez-vous se prend en ligne ou par téléphone, et l'essayage est gratuit pour la mariée et deux accompagnants.` },
      ]
    : [
        { q: `What silhouette is the ${nom} dress?`, r: `${nom} is a ${coupeBas} wedding dress — ${familleTxt} Its line, as the house writes it: ${ligneBasse}.` },
        servies.length
          ? { q: `Which body shapes does ${nom} suit?`, r: toutes ? `According to its sheet, every body shape — O, A, V, H, 8 and X. It is made to your measurements, whatever your size.` : `According to its sheet, first the ${lettresDites(servies, langue)} shapes; it can be tried otherwise, and is made to your measurements, whatever your size.` }
          : { q: `How do I know if ${nom} suits me?`, r: `By trying it on: the showroom is yours alone for an hour, and Élise, our adviser, guides you from your body shape in three questions.` },
        { q: `How much does the ${nom} dress cost?`, r: `The site shows no price per model. ${semi ? "Semi-bespoke" : "Made-to-measure"} dresses start at €1,500, alterations included; the price of ${nom} is given in the showroom, for the model and fabric chosen.` },
        { q: `Where can I try on ${nom} in Paris?`, r: `At the MADAMOON showroom, ${lieu}, by appointment. Appointments are booked online or by phone, and the fitting is free for the bride and two guests.` },
      ];

  return { titre, description, sections, questions };
}
