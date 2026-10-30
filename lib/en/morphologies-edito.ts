import type { Edito, Question, Repere } from "@/lib/morphologies";
import type { Lettre } from "@/lib/madamoon";

/*
 * La matière rédigée des morphologies, en anglais.
 *
 * Les deux règles de ton du français tiennent ici mot pour mot : aucune
 * robe n'est déconseillée, aucun corps n'est un problème à corriger. Les
 * verbes « hide », « conceal », « flatter away » ne figurent nulle part,
 * et c'est délibéré — traduire le ton demandait plus d'attention que
 * traduire les phrases.
 *
 * Les lettres ne changent pas : une silhouette en A reste « the A shape »
 * en anglais. Ce sont des repères, pas des mots.
 */

export const EDITO_EN: Record<Lettre, Edito> = {
  O: {
    question: "Which dress for an O shape?",
    promesse:
      "A fall that glides, a neckline that opens the bust: the line lengthens on its own.",
    reperes: [
      {
        titre: "The marker",
        texte:
          "Your shoulders and your hips are close in width, and it is the waist that takes up the most room.",
      },
      {
        titre: "The bust",
        texte:
          "It is generous and is noticed first. A great many dresses are written from there.",
      },
      {
        titre: "In front of the mirror",
        texte:
          "The hand runs from the shoulders to the hips without meeting a clear hollow at the waist.",
      },
    ],
    proportions: "Bust and hips close, waist barely hollowed, a marked bust.",
    pourquoi: {
      Fluide:
        "It grips nowhere. The fabric falls in one piece, from the bust to the hem, and the line looks longer than it is.",
      Trapèze:
        "The bust is held, the skirt opens into an A from the waist. The eye stops at the neckline, and the dress leaves all the rest free.",
      Princesse:
        "A worked bodice carries the eye upward, and the fullness of the skirt answers the bust without competing with it.",
    },
    detail:
      "A V or sweetheart neckline opens the bust and lengthens the neck. More often than the cut, it is what tips a fitting one way or the other.",
  },

  A: {
    question: "Which dress for an A shape?",
    promesse: "A worked upper half, a skirt that opens: the balance comes by itself.",
    reperes: [
      {
        titre: "The marker",
        texte: "Your hips are broader than your shoulders, and your waist draws itself clearly.",
      },
      {
        titre: "The top",
        texte: "The shoulders are fine.",
      },
      {
        titre: "In front of the mirror",
        texte: "A fitted jacket suits you without alteration, while straight skirts pull.",
      },
    ],
    proportions: "Shoulders narrower than the hips, a marked waist.",
    pourquoi: {
      Princesse:
        "Everything happens on the bodice: embroidery, draping, neckline. The fullness of the skirt asks for nothing — it answers the hips without touching them.",
      Trapèze:
        "The skirt opens from the waist and follows the hips instead of tracing them. It is the easiest cut to wear for a whole day.",
      Fluide:
        "It does not look for balance, it passes it by — and that is sometimes exactly what one wants from a dress that refuses to build.",
      "Deux en un":
        "An overskirt that comes off at dinner: two volumes in the same evening, and the chance to live both before deciding.",
    },
    detail:
      "A boat neckline or a straight bodice widens the shoulders to the eye.",
  },

  V: {
    question: "Which dress for a V shape?",
    promesse:
      "Soften the shoulders, give fullness below: the dress rebalances without effort.",
    reperes: [
      {
        titre: "The marker",
        texte:
          "Your shoulders are broad, your hips narrower, and the waist is barely guessed at.",
      },
      {
        titre: "The top",
        texte: "Straps never slip. It is rather the lower half of dresses that feels narrow.",
      },
      {
        titre: "In front of the mirror",
        texte:
          "Deep necklines suit you: they break the horizontal line of the shoulders.",
      },
    ],
    proportions: "Broad shoulders, narrow hips, an athletic figure.",
    pourquoi: {
      Fluide:
        "Nothing is built at the shoulders. The fabric falls from the bust, and the upper body stops being what the dress rests on.",
      Princesse:
        "The fullness of the skirt gives the lower half the room it does not naturally have. The shoulders no longer set the line.",
      Trapèze:
        "The same effect, more quietly: the skirt opens, the line balances, and the dress stays easy to live in.",
      "Deux en un":
        "The overskirt adds volume below when you want it, and takes it away when the dancing begins.",
    },
    detail:
      "A V, crossed or asymmetric neckline breaks the width with a single vertical stroke. It is the detail that counts most here.",
  },

  H: {
    question: "Which dress for an H shape?",
    promesse: "Create the curve rather than look for it: the cut is what draws it.",
    reperes: [
      {
        titre: "The marker",
        texte:
          "Shoulders, waist and hips sit on one straight, vertical line.",
      },
      {
        titre: "The waist",
        texte: "Barely defined.",
      },
      {
        titre: "In front of the mirror",
        texte:
          "A simple belt changes your whole figure — more clearly than on other body shapes.",
      },
    ],
    proportions: "A straight line, a waist barely marked, a long figure.",
    pourquoi: {
      Sirène:
        "It draws what is not yet visible. Fitted through the thigh then flared, it creates the curve instead of underlining it.",
      Fluide:
        "Fitted at the waist or worn with a belt, it marks where you decide, and nowhere else.",
      Trapèze:
        "The skirt opens from a high waist and brings movement where the line is straight.",
    },
    detail:
      "The empire cut raises the waist under the bust and lengthens everything that follows. It deserves a fitting even if the idea did not appeal in a photograph.",
  },

  "8": {
    question: "Which dress for an 8 shape?",
    promesse: "The balance is already there. The dress has only to follow it.",
    reperes: [
      {
        titre: "The marker",
        texte:
          "Shoulders and hips answer each other, and the waist hollows clearly between the two.",
      },
      { titre: "The curves", texte: "They are marked, and even from top to bottom." },
      {
        titre: "In front of the mirror",
        /* Le français rime — « flattent », « flottent ». L'anglais n'a pas
          * la rime et garde l'allitération : « flatter », « float ». */
        texte: "Fitted clothes flatter you, it is the straight cuts that float.",
      },
    ],
    proportions: "Shoulders and hips in line, a hollowed waist, marked curves.",
    pourquoi: {
      Sirène:
        "It follows a line that is already proportioned. Fitted through the thigh, it corrects nothing: it follows.",
      Princesse:
        "The bodice nips in at the waist and the fullness starts from there. The contrast is clear, and that is the whole effect.",
      Fluide:
        "Worn with a belt or cut at the waist, it keeps the line while letting you breathe.",
      Trapèze:
        "It starts at the waist — already the narrowest point — and opens from there. There is nothing to draw: the dress follows a line that exists.",
      "Deux en un":
        "A fitted line for the ceremony, an overskirt you take off for the evening. The balance holds in both, which is not true of every silhouette.",
    },
    detail:
      "A sweetheart bodice or a V neckline carries the waist upward. Here, anything that nips in works.",
  },

  X: {
    question: "Which dress for an X shape?",
    promesse: "Every cut suits you. The style of the wedding will decide.",
    reperes: [
      {
        titre: "The marker",
        texte: "Shoulders and hips are balanced, and the waist is fine, clearly drawn.",
      },
      {
        titre: "The curves",
        texte: "They are soft rather than pronounced, and the line stays harmonious.",
      },
      {
        titre: "In front of the mirror",
        texte:
          "You hesitate between several styles in the fitting room — most often because they all suit you.",
      },
    ],
    proportions: "Balanced proportions, a fine waist, soft curves.",
    pourquoi: {
      Sirène:
        "Fitted then flared, it follows the waist without having to create it. It is the cut that says the most with the least.",
      Princesse:
        "The fullness starts from a waist that is already fine: the contrast happens by itself, with nothing forced.",
      Fluide:
        "It builds nothing, and has no need to. The line is enough; the fabric only goes along with it.",
      Trapèze:
        "The easiest to live in, and the quietest. It suits when the dress must not be the subject of the day.",
      "Deux en un":
        "The overskirt sits over a line that already stands on its own, then comes off without anything collapsing. Two dresses, one silhouette.",
    },
    detail:
      "Here the question is no longer “what suits me?” but “what looks like me?”. It is a better question.",
  },
};

/* Ce qui compte autant que la morphologie. Le même bloc sur les six
 * pages : c'est un principe de la maison, pas une variation de conseil. */
export const AU_DELA_EN: Repere[] = [
  {
    titre: "The style",
    texte:
      "A dress is also chosen against one’s type. An 8 shape may want something fluid, and be quite right.",
  },
  {
    titre: "The place",
    texte:
      "A two-metre train on a beach, heavy satin in August: the dress has to last the day, not only the photograph.",
  },
  {
    titre: "Comfort",
    texte:
      "You will wear it for twelve hours. If you can neither sit down nor raise your arms, no cut will make up for that.",
  },
  {
    titre: "Feeling",
    texte:
      "It is the only criterion that really decides. In the fitting room, brides know within thirty seconds — long before they have looked at the cut.",
  },
];

/*
 * Les questions que l'on pose vraiment.
 *
 * Deux d'entre elles commencent par « should I avoid » ou « can I wear ».
 * C'est délibéré, comme en français : ce sont les mots que les mariées
 * tapent, et y répondre est l'occasion de dire non, qu'aucune robe n'est
 * interdite.
 */
export const QUESTIONS_EN: Record<Lettre, Question[]> = {
  O: [
    {
      q: "Which wedding dress cut should I choose for an O shape?",
      r: "Fluid falls and A-line cuts first: the fabric comes down in one piece and the line looks longer. The neckline counts as much as the cut — a V or a sweetheart opens the bust and lengthens the neck.",
    },
    {
      q: "Can I wear a mermaid dress with an O shape?",
      r: "Yes. A body shape forbids no dress, it only says where to begin. The mermaid asks for a fabric that holds — a crêpe rather than a light satin — and is judged far better in the fitting room than in a photograph.",
    },
    {
      q: "Should I avoid ball gowns with an O shape?",
      r: "No, and the word “avoid” has no currency here. A worked bodice carries the eye upward, and the fullness of the skirt answers the bust without loading it. The ball gown simply comes after the sheath and the A-line in the order of fittings.",
    },
  ],
  A: [
    {
      q: "Which wedding dress suits an A shape best?",
      r: "The ones that give the upper body something to hold the eye: an embroidered or draped bodice, or a neckline that widens the shoulders. The skirt has nothing to prove — flared, it answers the hips without underlining them.",
    },
    {
      q: "How do I balance hips that are broader than my shoulders?",
      r: "From above, never by covering below. A boat neckline or a straight bodice add a few centimetres of line at the shoulders, and that is enough to change the whole proportion.",
    },
    {
      q: "Does a mermaid dress suit an A shape?",
      r: "It wears very well, provided the top has something to balance it: a sleeve, a wide strap, a worked neckline. Many A-shape brides leave with a mermaid they had not planned to try on.",
    },
  ],
  V: [
    {
      q: "Which wedding dress for broad shoulders?",
      r: "The ones that build nothing above: a fluid fall starting at the bust, or a full skirt that gives the lower half the room it does not naturally have. The line balances by itself.",
    },
    {
      q: "Which neckline should I choose with a V shape?",
      r: "A V, a crossed or an asymmetric one. All three break the width with a vertical stroke, and here that is the detail that counts most — more than the cut of the skirt.",
    },
    {
      q: "Can I wear puff sleeves with a V shape?",
      r: "Yes, and it can work very well if the skirt has volume to answer it. Worn over a straight skirt, the puff sleeve does emphasise the width of the shoulders — it is a question of balance, not of prohibition.",
    },
  ],
  H: [
    {
      q: "How do I create curves with an H shape?",
      r: "By letting the cut draw them. A light mermaid, a model fitted at the waist or a simple belt mark where you want, without gripping anything.",
    },
    {
      q: "Does the empire cut suit an H shape?",
      r: "Very well. It raises the waist under the bust and lengthens everything that follows. It deserves a fitting even if the idea did not appeal in a photograph — it is a cut you understand once it is on.",
    },
    {
      q: "Do I have to mark the waist?",
      r: "No. A straight dress, in clean satin, on a long figure, is one of the finest choices there is. Marking the waist is an option, not a correction to be made.",
    },
  ],
  "8": [
    {
      q: "Which wedding dress for a marked waist and curves?",
      r: "Mermaids and sheaths, which follow a line already in proportion without having to create it. Unadorned satin works for the same reason: it tells only the cut.",
    },
    {
      q: "Does a ball gown suit an 8 shape?",
      r: "Yes. The bodice nips in at the waist and the fullness starts from there: the contrast is clear, and that is the whole effect. It simply asks for room — think of the place and of the day.",
    },
    {
      q: "Should I avoid straight cuts with an 8 shape?",
      r: "No. A straight cut sometimes floats where the waist hollows, but a belt or a seam taken in at the waist settles the question in one fitting. Nothing is ruled out in advance.",
    },
  ],
  X: [
    {
      q: "Which wedding dress should I choose for an X shape?",
      r: "Every cut suits you — that is the honest answer. Mermaid, ball gown, sheath, A-line or two-in-one: the question becomes one of the style of the wedding, not of the body shape.",
    },
    {
      q: "How do I choose when every cut works?",
      r: "By the place, the season, and what you want to be able to do with your day. A two-metre train on a beach, heavy satin in August: the dress has to last twelve hours, not only the photograph.",
    },
    {
      q: "Is the X shape the same as the 8 shape?",
      r: "They resemble each other and are often confused. Both have shoulders and hips in balance; the 8 has frankly marked curves, the X softer curves and a fine waist. The advice overlaps a great deal, and both pages are worth reading.",
    },
  ],
};
