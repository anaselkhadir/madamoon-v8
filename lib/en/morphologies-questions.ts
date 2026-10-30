import type { Lettre } from "@/lib/madamoon";
import { QUESTIONS_MORPHO, type QuestionMorpho } from "@/lib/morphologies-questions";

/*
 * The body-shape questions, in English.
 *
 * Same order, same addresses, same facts as the French table: the
 * dresses named are the ones the boutique itself associates with each
 * body shape. We translate, we do not embellish.
 */

const fr = (l: Lettre, i: number) => QUESTIONS_MORPHO[l]![i].slug;

export const QUESTIONS_MORPHO_EN: Partial<Record<Lettre, QuestionMorpho[]>> = {
  O: [
    {
      slug: fr("O", 0),
      q: "Which wedding dress should I choose for an O body shape?",
      r: "Start with sheath and A-line dresses: the fabric falls in one piece, without squeezing, and the line looks longer. Choose a V or sweetheart neckline, which opens the bust. Ball gowns and mermaids are worth trying too: no dress is off-limits.",
      description:
        "Wedding dress for an O body shape: sheath and A-line first, a V or sweetheart neckline. Advice from the MADAMOON boutique, Paris 10e.",
      chapo:
        "A fall that glides, a neckline that opens the bust: with an O body shape, the line lengthens by itself. Here is where to start, and why.",
      sections: [
        {
          titre: "The two silhouettes to try first",
          texte: [
            "A sheath dress squeezes nowhere. The fabric falls in one piece, from bust to hem, and the line looks longer than it is.",
            "An A-line holds the bust and opens the skirt from the waist. The eye stops at the neckline, and the dress leaves everything else free.",
          ],
        },
        {
          titre: "Those worth trying",
          texte: [
            "A ball gown draws the eye upwards with its worked bodice, and the fullness of its skirt answers the bust without competing with it. A mermaid needs a fabric with hold — crêpe rather than a light satin.",
            "A body shape never rules a dress out: it only tells you where to start.",
          ],
        },
        {
          titre: "The detail that tips it",
          texte: [
            "A V or sweetheart neckline opens the bust and lengthens the neck. It is often that, more than the silhouette, that tips a fitting.",
            "Among the dresses the boutique recommends for an O body shape: Dove, a matte-satin sheath with a draped neckline; Marie, a sheath by Monica Loretti; Emerald, an A-line with a V neckline; Monica, a jacquard A-line with a belt.",
          ],
        },
      ],
      aRetenir: [
        "Sheath and A-line first.",
        "A V or sweetheart neckline.",
        "Ball gowns and mermaids are worth trying.",
      ],
      liens: [
        { href: "/morphologies/o", label: "The O body shape" },
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/coupes/fluide", label: "Sheath dresses" },
      ],
    },
    {
      slug: fr("O", 1),
      q: "How do I recognise an O body shape?",
      r: "Your shoulders and hips are of similar width, and the waist takes up the most room; the bust is generous and is noticed first. In front of the mirror, your hand runs from shoulders to hips without meeting a clear dip at the waist.",
      description:
        "Recognising an O body shape: shoulders and hips of similar width, a soft waist, a generous bust. Three simple markers, one of them in front of the mirror.",
      chapo:
        "Three markers are enough, and one of them is checked in front of a mirror: reading alone is never enough to place yourself.",
      sections: [
        {
          titre: "The three markers",
          texte: [],
          liste: [
            "The marker — your shoulders and hips are of similar width, and the waist takes up the most room.",
            "The bust — it is generous and noticed first. Many dresses are written from there.",
            "In front of the mirror — your hand runs from shoulders to hips without meeting a clear dip at the waist.",
          ],
        },
        {
          titre: "Not to be confused with",
          texte: [
            "The H body shape also has a soft waist, but on a straight line, without the bust and curves of the O. The 8 body shape has balanced shoulders and hips like the O, but a clearly defined waist.",
          ],
        },
        {
          titre: "A figure, not a label",
          texte: [
            "Many brides find themselves between two body shapes. That is not a problem: the recommended silhouettes overlap, and the fitting decides. If you are unsure, Élise, the site's advisor, points you in a direction in three questions.",
          ],
        },
      ],
      aRetenir: [
        "Shoulders and hips of similar width.",
        "A soft waist, a generous bust.",
        "No clear dip at the waist in the mirror.",
      ],
      liens: [
        { href: "/morphologies/o", label: "The O body shape" },
        { href: "/morphologies", label: "The six body shapes" },
        { href: "/trouver-ma-robe", label: "Find my dress with Élise" },
      ],
    },
    {
      slug: fr("O", 2),
      q: "Which wedding dress silhouette suits a figure with generous curves?",
      r: "A silhouette that follows the curves without squeezing them: the sheath, which glides along the body, and the A-line, which opens from the waist. If your waist is defined, mermaids and ball gowns highlight curves very well too.",
      description:
        "Wedding dress for generous curves: sheath and A-line, or mermaid and ball gown if the waist is defined. Advice from the MADAMOON boutique, Paris.",
      chapo:
        "Generous curves do not call for a single silhouette: it all depends on where they are. Here is how to find your way.",
      sections: [
        {
          titre: "If the curves are at the bust and waist",
          texte: [
            "That is the O body shape. Sheath and A-line dresses come first: they do not squeeze the waist, let the fabric fall in one piece and lengthen the line. A V or sweetheart neckline flatters the bust.",
          ],
        },
        {
          titre: "If the waist is clearly defined",
          texte: [
            "That is more of an 8 body shape: balanced shoulders and hips, a defined waist. Every silhouette works then. Mermaids follow the curves, and anything fitted at the waist highlights the natural balance.",
          ],
        },
        {
          titre: "What matters as much as the silhouette",
          texte: [
            "Fabric and support. Crêpe or matte satin hold better than a fabric that is too light; a corset or a structured bodice supports the bust. Several of the boutique's dresses have a worked corset, like Carrie, with its hand-beaded corset, or Ember.",
          ],
        },
      ],
      aRetenir: [
        "Curves at bust and waist: sheath, A-line.",
        "Defined waist: every silhouette, mermaid first.",
        "A fabric with hold, a well-supported bust.",
      ],
      liens: [
        { href: "/morphologies/o", label: "The O body shape" },
        { href: "/morphologies/8", label: "The 8 body shape" },
        { href: "/coupes", label: "Silhouettes" },
      ],
    },
    {
      slug: fr("O", 3),
      q: "Does an A-line wedding dress suit an O body shape?",
      r: "Yes, it is one of the two silhouettes to try first. The bust is held, the skirt opens in an A from the waist: the eye stops at the neckline, and the dress leaves everything else free.",
      description:
        "A-line wedding dress and O body shape: one of the two silhouettes to try first. Why it works, and the A-line dresses at MADAMOON, Paris.",
      chapo:
        "The A-line is the most universal silhouette in the catalogue, and one of the two the boutique recommends first for an O body shape.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "The bust is held, then the skirt opens in an A from the waist, without squeezing or marking it. The eye stops at the neckline, and the dress leaves everything else free.",
          ],
        },
        {
          titre: "What to look at",
          texte: [
            "The neckline first: a V or a sweetheart opens the bust. Then the fabric: tulle or light lace give an airy skirt, satin a cleaner line.",
          ],
        },
        {
          titre: "The boutique's A-line dresses",
          texte: ["Among those the boutique recommends for an O body shape:"],
          liste: [
            "Emerald — beaded bodice, V neckline, tulle or satin skirt;",
            "Monica — floral jacquard, V neckline, belt;",
            "Solana — lace appliqués and matte sequins;",
            "Finell — satin sweetheart bodice;",
            "Pendant — lace and long sleeves.",
          ],
        },
      ],
      aRetenir: [
        "Yes: one of the two silhouettes to try first.",
        "The skirt opens from the waist, without squeezing it.",
        "With a V or sweetheart neckline.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "A-line dresses" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/monica", label: "Monica" },
        { href: "/morphologies/o", label: "The O body shape" },
      ],
    },
    {
      slug: fr("O", 4),
      q: "Is an empire wedding dress suited to an O body shape?",
      r: "Yes, it is a natural option: the seam placed under the bust flatters it, then the skirt falls freely, without marking the waist. The boutique does not class its dresses as \"empire\": its sheath dresses are the closest to that line.",
      description:
        "Empire wedding dress and O body shape: a high waist under the bust, a free-falling skirt. Why it suits, and the dresses that come closest to it.",
      chapo:
        "The empire line places the waist just under the bust. For an O body shape, it is an idea that lands right — here is why.",
      sections: [
        {
          titre: "What an empire dress is",
          texte: [
            "An empire dress has its waist placed high, just under the bust, and a skirt that then falls straight or slightly flared.",
          ],
        },
        {
          titre: "Why it serves an O body shape",
          texte: [
            "It does exactly what the body shape asks for: flatter the bust and lengthen the line. The eye stops at the bust, and the skirt passes over the waist without marking it.",
          ],
        },
        {
          titre: "At MADAMOON",
          texte: [
            "The boutique's catalogue is arranged in five silhouettes — mermaid, ball gown, sheath, A-line, two-in-one — and no dress is classed as \"empire\". Sheath dresses come closest: a fall in one piece that squeezes nowhere.",
            "If that is the line you are looking for, say so when you book: the boutique will suggest the models that come closest.",
          ],
        },
      ],
      aRetenir: [
        "Yes: the high waist flatters the bust.",
        "The skirt falls without marking the waist.",
        "At the boutique: sheath dresses come closest.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Sheath dresses" },
        { href: "/morphologies/o", label: "The O body shape" },
        { href: "/rendez-vous", label: "Book an appointment" },
      ],
    },
    {
      slug: fr("O", 5),
      q: "Can I wear a mermaid wedding dress with an O body shape?",
      r: "Yes. A body shape never rules a dress out, it only tells you where to start. A mermaid needs a fabric with hold — crêpe rather than a light satin — and is judged far better in the fitting room than in a photograph.",
      description:
        "Mermaid wedding dress and O body shape: yes, with a fabric that holds, such as crêpe. What to look at, and the mermaid dresses at MADAMOON, Paris.",
      chapo:
        "The mermaid is not the first silhouette recommended for an O body shape, but it is worth trying. Here is how to choose one.",
      sections: [
        {
          titre: "Yes, with the right fabric",
          texte: [
            "A mermaid dress follows the figure down to the knees before flaring. It therefore needs a fabric that holds and smooths: crêpe rather than a light satin, which would show everything.",
          ],
        },
        {
          titre: "It is judged when worn",
          texte: [
            "In a photograph, a mermaid looks demanding. In the fitting room, it is often another story. Try it after the sheath and A-line dresses, to compare: the fitting decides.",
          ],
        },
        {
          titre: "The boutique's mermaid dresses",
          texte: [
            "Zina, a mermaid with a slit by Casablanca Bridal, is among the dresses the boutique recommends for an O body shape. Several mermaids in the catalogue are in crêpe: Mira and Milan by Monica Loretti, Bondi, or Shiloh, whose skirt is crêpe.",
          ],
        },
      ],
      aRetenir: [
        "Yes: no dress is off-limits.",
        "A fabric that holds, like crêpe.",
        "Try it after the sheath and A-line dresses.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/robes/zina", label: "Zina" },
        { href: "/robes/mira", label: "Mira" },
      ],
    },
    {
      slug: fr("O", 6),
      q: "Which neckline should I choose for a wedding dress with a generous bust?",
      r: "V and sweetheart first: they open the bust, lengthen the neck and shape the chest without enclosing it. A draped neckline works too. In every case, inner support — a corset, a structured bodice — makes the difference.",
      description:
        "Wedding dress and a generous bust: a V or sweetheart neckline, a drape, and good support. Advice and dresses from the MADAMOON boutique, Paris.",
      chapo:
        "With a generous bust, the neckline often matters more than the silhouette. Here are the ones that serve it best.",
      sections: [
        {
          titre: "V and sweetheart",
          texte: [
            "They open the bust and lengthen the neck, without enclosing the chest. It is often that detail, more than the silhouette, that tips a fitting.",
            "In the catalogue: Emerald, Monica and Livia have a V neckline; Finell, a sweetheart bodice.",
          ],
        },
        {
          titre: "Other options",
          texte: [
            "A draped neckline, like Dove's, softens the bust. Off-the-shoulder straps, like Addison's, frame the shoulders. A square neck, more graphic, is judged at the fitting.",
          ],
        },
        {
          titre: "Support",
          texte: [
            "A corset or a structured bodice supports the bust, and it is what lets you wear the neckline you love. The boutique's seamstresses adjust that support over the fittings.",
          ],
        },
      ],
      aRetenir: [
        "V and sweetheart first.",
        "A drape softens the bust.",
        "A corset or structured bodice for support.",
      ],
      liens: [
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/finell", label: "Finell" },
        { href: "/robes/dove", label: "Dove" },
        { href: "/morphologies/o", label: "The O body shape" },
      ],
    },
    {
      slug: fr("O", 7),
      q: "Which fabric should I favour for a fluid, comfortable wedding dress?",
      r: "Chiffon and crêpe, soft and light, follow movement without marking; matte satin gives more hold while staying fluid. A stretch version adds ease for a long day.",
      description:
        "A fluid, comfortable wedding dress: chiffon, crêpe, matte satin, stretch versions. How to choose your fabric, with dresses from the MADAMOON boutique.",
      chapo:
        "A fluid dress depends first on its fabric. Here are those that move well, and what they change over the day.",
      sections: [
        {
          titre: "Chiffon",
          texte: [
            "Light and airy, it floats around the body. Maribel, by Casablanca Bridal, is in stretch chiffon; Hélène pairs a fluid chiffon skirt with a beaded corset.",
          ],
        },
        {
          titre: "Crêpe",
          texte: [
            "Denser, it smooths the figure and falls straight. It holds its shape without marking — it is also the fabric to prefer for a mermaid.",
          ],
        },
        {
          titre: "Matte satin",
          texte: [
            "It gives hold and a soft light, without the sheen of a glossy satin. Dove, a sheath dress by Casablanca Bridal, is in matte satin.",
          ],
        },
        {
          titre: "Comfort for a whole day",
          texte: [
            "A stretch fabric follows the body and lets you move freely. A tip: at the fitting, sit down, raise your arms, take a few dance steps. Mathilda, by Monica Loretti, was designed for comfort, right down to brides who are expecting.",
          ],
        },
      ],
      aRetenir: [
        "Chiffon: light and airy.",
        "Crêpe: smooth, falls straight.",
        "Matte satin: hold, a soft light.",
        "Stretch: ease for a long day.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Sheath dresses" },
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/mathilda", label: "Mathilda" },
      ],
    },
    {
      slug: fr("O", 8),
      q: "How do I choose a wedding dress that defines the waist without squeezing it?",
      r: "Rather than a tight waist, look for a drawn one: a belt, a seam, a drape or a play of fabrics that creates the line without constraining. A corset well fitted by the seamstresses supports without squeezing.",
      description:
        "Defining the waist without squeezing it: a belt, a basque waist, a drape, a fitted corset. Advice from MADAMOON for a comfortable wedding dress.",
      chapo:
        "Marking the waist does not mean squeezing it. Here are the details that draw it, and why fitting matters more than anything.",
      sections: [
        {
          titre: "Draw rather than tighten",
          texte: [
            "A waist is read through a line, not through pressure. A well-placed seam, a change of fabric or a drape are enough to bring it out, without constraining anything.",
          ],
        },
        {
          titre: "The details that mark the waist",
          texte: ["In the boutique's catalogue:"],
          liste: [
            "a belt, as on Monica, in floral jacquard;",
            "a basque waist, as on Santana, dipping to a point;",
            "a draped neckline, as on Dove, which guides the eye;",
            "a contrast between a worked bodice and a simpler skirt.",
          ],
        },
        {
          titre: "Fitting is everything",
          texte: [
            "A dress that is too tight squeezes; a well-fitted dress holds. At MADAMOON, the dress is made to your measurements, then fitted by the seamstresses up to the last fitting, alterations included.",
          ],
        },
      ],
      aRetenir: [
        "A drawn waist, not a tight one.",
        "Belt, basque waist, drape.",
        "Fitted on you, alterations included.",
      ],
      liens: [
        { href: "/robes/monica", label: "Monica" },
        { href: "/robes/santana", label: "Santana" },
        { href: "/faq/etapes-robe-de-mariee-sur-mesure", label: "The stages of made-to-measure" },
      ],
    },
    {
      slug: fr("O", 9),
      q: "Which wedding dress should I choose to show off my curves?",
      r: "A dress that follows your curves instead of hiding them: a sheath in a soft fabric, an A-line that highlights the bust, or a crêpe mermaid if you like a line closer to the body. The neckline and the fabric matter as much as the silhouette.",
      description:
        "A wedding dress to show off your curves: follow the figure rather than hide it, a neckline that opens the bust, a fabric that holds.",
      chapo:
        "Showing off your curves starts with no longer wanting to hide them. Here is how to choose a dress that goes with them.",
      sections: [
        {
          titre: "Follow rather than hide",
          texte: [
            "A dress that is too full adds volume where you do not want it. Better a dress that follows the figure: a sheath that glides along the body, an A-line that holds the bust, or a mermaid if you like a line closer to the body.",
          ],
        },
        {
          titre: "The bust first",
          texte: [
            "A V or sweetheart neckline opens the bust and lengthens the neck. It is often the detail that changes everything in a dress.",
          ],
        },
        {
          titre: "Fabrics that sculpt",
          texte: [
            "Crêpe and matte satin smooth and hold their shape; mikado, more structured, builds a ball gown. Lace laid over a corset draws the curves without adding anything.",
          ],
        },
      ],
      aRetenir: [
        "A dress that follows the figure.",
        "A neckline that opens the bust.",
        "Crêpe, matte satin, mikado: fabrics that hold.",
      ],
      liens: [
        { href: "/morphologies/o", label: "The O body shape" },
        { href: "/coupes", label: "Silhouettes" },
        { href: "/robes", label: "See all the dresses" },
      ],
    },
    {
      slug: fr("O", 10),
      q: "Are sleeves a good option for a wedding dress with an O body shape?",
      r: "Yes. Long lace sleeves for a slender line, sheer sleeves for a light touch, or detachable sleeves to change look in the evening: sleeves balance the upper body and can be worn in any season.",
      description:
        "Wedding dress with sleeves and an O body shape: long, sheer or detachable. What they bring, and the MADAMOON dresses that have them. Paris 10e.",
      chapo:
        "Sleeves come in several forms, and each changes the silhouette in its own way. Here is what they bring to an O body shape.",
      sections: [
        {
          titre: "Long lace sleeves",
          texte: [
            "They extend the line and give a slender look. Pendant, by Watters Designs, which the boutique recommends for an O body shape, is a lace A-line with long sleeves.",
          ],
        },
        {
          titre: "Sheer sleeves",
          texte: [
            "A light transparency on the arms, which covers without weighing down. Murielle, by Monica Loretti, is an example, with its plunging neckline.",
          ],
        },
        {
          titre: "Detachable sleeves",
          texte: [
            "Two looks in the same day: with sleeves for the ceremony, without for the evening. Aster, by Watters Designs, has detachable sleeves.",
          ],
        },
        {
          titre: "With which neckline",
          texte: [
            "Keep the bust open: a V neckline with sleeves stays light and flatters the bust.",
          ],
        },
      ],
      aRetenir: [
        "Yes: they balance the upper body.",
        "Long, sheer or detachable.",
        "With an open neckline, such as a V.",
      ],
      liens: [
        { href: "/robes/pendant", label: "Pendant" },
        { href: "/robes/murielle", label: "Murielle" },
        { href: "/robes/aster", label: "Aster" },
      ],
    },
    {
      slug: fr("O", 11),
      q: "Which wedding dress should I try first with an O body shape?",
      r: "A sheath or A-line dress, with a V or sweetheart neckline: that is the combination that best serves an O body shape. Only then a ball gown and a mermaid, to compare.",
      description:
        "O body shape: which wedding dress to try first? A sheath or an A-line, then a ball gown and a mermaid to compare. Advice from MADAMOON, Paris.",
      chapo:
        "The order of fittings matters: it helps you understand what suits you, and why. Here is the one the boutique recommends for an O body shape.",
      sections: [
        {
          titre: "The order of fittings",
          texte: [],
          ordonnee: true,
          liste: [
            "A sheath dress — it squeezes nowhere and lengthens the line.",
            "An A-line — the bust held, the skirt free from the waist.",
            "A ball gown — to see the effect of a worked bodice and a full skirt.",
            "A mermaid — in crêpe, to compare with a line close to the body.",
          ],
        },
        {
          titre: "Dresses to start with",
          texte: [
            "Among those the boutique recommends for an O body shape: Dove and Marie, sheath dresses; Emerald and Monica, A-lines with a V neckline.",
          ],
        },
        {
          titre: "Coming prepared",
          texte: [
            "Keep your favourite dresses in your favourites and mention them when you book: they will be ready when you arrive.",
          ],
        },
      ],
      aRetenir: [
        "First a sheath or an A-line.",
        "A V or sweetheart neckline.",
        "Then a ball gown and a mermaid, to compare.",
      ],
      liens: [
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/marie", label: "Marie" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/rendez-vous", label: "Book an appointment" },
      ],
    },
  ],
  A: [
    {
      slug: fr("A", 0),
      q: "Which wedding dress should I choose for an A body shape?",
      r: "Start with ball gowns and A-lines: a worked bodice holds the eye, and a skirt that opens answers the hips without highlighting them. A bateau neckline or a straight bodice widens the shoulders. Sheath and two-in-one dresses are worth trying too.",
      description:
        "Wedding dress for an A body shape: ball gown and A-line first, a worked bodice, a skirt that opens. Advice from the MADAMOON boutique, Paris 10e.",
      chapo:
        "A worked bodice, a skirt that opens: with an A body shape, the balance comes by itself. Here is where to start.",
      sections: [
        {
          titre: "The two silhouettes to try first",
          texte: [
            "A ball gown plays everything on the bodice: embroidery, drape, neckline. The fullness of its skirt asks nothing — it answers the hips without touching them.",
            "An A-line opens its skirt from the waist and follows the hips instead of hugging them. It is the easiest silhouette to wear for a whole day.",
          ],
        },
        {
          titre: "Those worth trying",
          texte: [
            "A sheath does not seek balance, it sidesteps it — and that is sometimes exactly what you want when you refuse a dress that builds. A two-in-one, with its overskirt removed for dinner, gives two volumes in the same evening.",
          ],
        },
        {
          titre: "The detail that changes the proportion",
          texte: [
            "A bateau neckline or a straight bodice visually widens the shoulders. A few centimetres of line at the top are enough to change the whole silhouette.",
          ],
        },
      ],
      aRetenir: [
        "Ball gown and A-line first.",
        "A worked bodice.",
        "A neckline that widens the shoulders.",
      ],
      liens: [
        { href: "/morphologies/a", label: "The A body shape" },
        { href: "/coupes/princesse", label: "Ball gowns" },
        { href: "/coupes/trapeze", label: "A-line dresses" },
      ],
    },
    {
      slug: fr("A", 1),
      q: "How do I recognise an A or pear body shape?",
      r: "Your hips are wider than your shoulders, and your waist is clearly defined; the shoulders are narrow. In front of the mirror, a fitted jacket suits you without alteration, while straight skirts pull at the hips.",
      description:
        "Recognising an A body shape, also called pear: hips wider than shoulders, a defined waist, narrow shoulders. Three simple markers.",
      chapo:
        "It is also called \"pear\" or \"triangle\". Three markers are enough to recognise it, one of them in front of the mirror.",
      sections: [
        {
          titre: "The three markers",
          texte: [],
          liste: [
            "The marker — your hips are wider than your shoulders, and your waist is clearly defined.",
            "The top — the shoulders are narrow.",
            "In front of the mirror — a fitted jacket suits you without alteration, while straight skirts pull.",
          ],
        },
        {
          titre: "Not to be confused with",
          texte: [
            "The V body shape is its opposite: broad shoulders and narrower hips. The 8 body shape has a defined waist like the A, but balanced shoulders and hips.",
          ],
        },
        {
          titre: "A figure, not a label",
          texte: [
            "Many brides find themselves between two body shapes. The recommended silhouettes overlap, and the fitting decides. If you are unsure, Élise, the site's advisor, points you in a direction in three questions.",
          ],
        },
      ],
      aRetenir: [
        "Hips wider than shoulders.",
        "A well-defined waist.",
        "Straight skirts pull at the hips.",
      ],
      liens: [
        { href: "/morphologies/a", label: "The A body shape" },
        { href: "/morphologies", label: "The six body shapes" },
        { href: "/trouver-ma-robe", label: "Find my dress with Élise" },
      ],
    },
    {
      slug: fr("A", 2),
      q: "Which silhouette balances shoulders narrower than the hips?",
      r: "The ball gown and the A-line: their structured top widens the line of the shoulders, and their skirt opens from the waist to go with the hips. Balance comes from the top, never by hiding the bottom.",
      description:
        "Balancing shoulders narrower than the hips: a ball gown or an A-line, a structured top, a skirt that opens from the waist. Advice from MADAMOON.",
      chapo:
        "Balancing a figure is not hiding what you like less: it is giving the rest something to answer with. Here is how.",
      sections: [
        {
          titre: "From the top, never by hiding the bottom",
          texte: [
            "A bateau neckline or a straight bodice adds a few centimetres of line to the shoulders, and that is enough to change the whole proportion. The skirt has nothing to prove.",
          ],
        },
        {
          titre: "The two silhouettes that do it best",
          texte: [
            "The ball gown, with its worked bodice and the fullness of its skirt, which answers the hips without touching them. The A-line, whose skirt opens from the waist and follows the hips instead of hugging them.",
          ],
        },
        {
          titre: "Shoulders that take up room",
          texte: [
            "Off-the-shoulder necklines, as on Trinity or Kensington, dropped straps, as on Addison, or a square neck, as on Dolores, also widen the top line.",
          ],
        },
      ],
      aRetenir: [
        "Ball gown or A-line.",
        "A structured top that widens the shoulders.",
        "A skirt that opens from the waist.",
      ],
      liens: [
        { href: "/robes/trinity", label: "Trinity" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/morphologies/a", label: "The A body shape" },
      ],
    },
    {
      slug: fr("A", 3),
      q: "Does a ball-gown wedding dress suit an A body shape?",
      r: "Yes, it is one of the two silhouettes to try first. Everything is played on the bodice — embroidery, drape, neckline — and the fullness of the skirt answers the hips without touching them.",
      description:
        "Ball-gown wedding dress and A body shape: one of the two silhouettes to try first. Why it works, and the ball gowns at MADAMOON, Paris.",
      chapo:
        "The ball gown is made for an A body shape: it works the top and lets the skirt do the rest.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "The bodice holds the eye: embroidered, draped, structured. The full skirt answers the hips without highlighting them — it does not hug them, it goes with them.",
          ],
        },
        {
          titre: "What to look at",
          texte: [
            "The bodice first: it makes the dress. Then the neckline, which can widen the shoulders. Mikado, a structured fabric, gives the skirt a clean fullness; tulle, a lighter one.",
          ],
        },
        {
          titre: "The boutique's ball gowns",
          texte: ["Among them:"],
          liste: [
            "Trinity — mikado or jacquard, off the shoulder;",
            "Fern — mikado embroidered with beaded flowers;",
            "Kensington — mikado, off the shoulder;",
            "Addison — silk satin, detachable dropped straps;",
            "Ember — structured corset, couture silhouette.",
          ],
        },
      ],
      aRetenir: [
        "Yes: one of the two silhouettes to try first.",
        "Everything is played on the bodice.",
        "The skirt answers the hips without highlighting them.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Ball gowns" },
        { href: "/robes/fern", label: "Fern" },
        { href: "/robes/kensington", label: "Kensington" },
        { href: "/morphologies/a", label: "The A body shape" },
      ],
    },
    {
      slug: fr("A", 4),
      q: "Is an A-line dress suited to an A body shape?",
      r: "Yes, it is one of the two silhouettes to try first. Its skirt opens from the waist and follows the hips instead of hugging them: it is the easiest silhouette to wear for a whole day.",
      description:
        "A-line wedding dress and A body shape: one of the two silhouettes to try first, the easiest to wear. The A-line dresses at MADAMOON, Paris 10e.",
      chapo:
        "The A-line already has the shape of an A figure, and that is why it suits it so naturally.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "The skirt opens from the waist and follows the hips without moulding them. The waist, well defined in an A body shape, stays marked; the top is free to hold the eye.",
          ],
        },
        {
          titre: "What to look at",
          texte: [
            "The bodice: beaded, embroidered or in lace, it balances the hips. And the neckline: a straight neckline, as on Nirali, or a sweetheart bodice, as on Finell, structure the top.",
          ],
        },
        {
          titre: "The boutique's A-line dresses",
          texte: ["Among them:"],
          liste: [
            "Emerald — beaded bodice, V neckline;",
            "Carrie — sequinned, hand-beaded corset;",
            "Finell — satin sweetheart bodice;",
            "Solana — lace appliqués and matte sequins;",
            "Charlotte — Caterina lace.",
          ],
        },
      ],
      aRetenir: [
        "Yes: one of the two silhouettes to try first.",
        "The skirt follows the hips without moulding them.",
        "A worked bodice to balance.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "A-line dresses" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/carrie", label: "Carrie" },
        { href: "/morphologies/a", label: "The A body shape" },
      ],
    },
    {
      slug: fr("A", 5),
      q: "Can I wear a mermaid dress with an A body shape?",
      r: "Yes, provided the top has something to balance with: a sleeve, a wide strap, a worked neckline. Many A-shaped brides leave with a mermaid they had not planned to try.",
      description:
        "Mermaid wedding dress and A body shape: yes, with a top that balances — sleeves, straps, a worked neckline. The mermaid dresses at MADAMOON, Paris.",
      chapo:
        "A mermaid hugs the hips: people assume it is not for an A body shape. Yet it is worn very well — here is on what condition.",
      sections: [
        {
          titre: "Yes, with a top that balances",
          texte: [
            "A mermaid highlights the hips and waist. For it to balance the figure, the top needs weight: a sleeve, a wide strap, a worked neckline.",
          ],
        },
        {
          titre: "It is judged when worn",
          texte: [
            "Many A-shaped brides leave with a mermaid they had not planned to try. Try it after the ball gowns and A-lines, to compare.",
          ],
        },
        {
          titre: "The boutique's mermaid dresses",
          texte: [
            "Montana, in matte satin, has long lace sleeves and an illusion back: a top with something to balance with. Shiloh pairs Chantilly lace with a crêpe skirt; Zina has a slit and optional 3D flowers.",
          ],
        },
      ],
      aRetenir: [
        "Yes, with a top that balances.",
        "Sleeves, wide straps, a worked neckline.",
        "Try it after ball gowns and A-lines.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/robes/montana", label: "Montana" },
        { href: "/robes/shiloh", label: "Shiloh" },
      ],
    },
    {
      slug: fr("A", 6),
      q: "Which neckline visually widens the line of the shoulders?",
      r: "A bateau neckline or a straight bodice: they draw a horizontal line that widens the shoulders. Off-the-shoulder necklines, dropped straps or a square neck have the same effect.",
      description:
        "Visually widening the shoulders: bateau neckline, straight bodice, off the shoulder, dropped straps, square neck. Advice from the MADAMOON boutique.",
      chapo:
        "A few centimetres of line at the top are enough to change the whole proportion. Here are the necklines that give them.",
      sections: [
        {
          titre: "The bateau neckline and the straight bodice",
          texte: [
            "Both draw a horizontal line from one shoulder to the other, which widens the upper body. They are the necklines the boutique recommends first for an A body shape.",
            "No dress in the catalogue is described with a bateau neckline. Nirali, by Watters Designs, has a straight neckline; Fortune, a strapless bodice.",
          ],
        },
        {
          titre: "Off the shoulder and dropped straps",
          texte: [
            "They extend the line beyond the shoulders. Trinity, Kensington and Dove are off the shoulder; Addison has detachable dropped straps; Hera, dropped straps.",
          ],
        },
        {
          titre: "The square neck",
          texte: [
            "More graphic, it draws a clean line across the bust. Dolores, Clover Perles and River have a square neck or neckline.",
          ],
        },
      ],
      aRetenir: [
        "Bateau neckline or straight bodice.",
        "Off the shoulder, dropped straps.",
        "A square neck, more graphic.",
      ],
      liens: [
        { href: "/robes/nirali", label: "Nirali" },
        { href: "/robes/kensington", label: "Kensington" },
        { href: "/robes/dolores", label: "Dolores" },
        { href: "/morphologies/a", label: "The A body shape" },
      ],
    },
    {
      slug: fr("A", 7),
      q: "Is a strapless bodice suited to an A body shape?",
      r: "Yes, and it is one of the necklines the boutique recommends: a straight bodice draws a line that widens the shoulders, and a worked bodice holds the eye at the top. Paired with a flared skirt, it balances the hips.",
      description:
        "Strapless wedding dress and A body shape: a straight bodice widens the shoulders, a worked bodice holds the eye. The bodices at MADAMOON, Paris.",
      chapo:
        "A bodice and a flared skirt: that is the pairing the boutique recommends first for an A body shape.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "A straight bodice draws a horizontal line that widens the shoulders. A worked bodice — embroidered, beaded, draped — holds the eye at the top of the body. With a flared skirt, it balances the hips.",
          ],
        },
        {
          titre: "Straight, sweetheart or corseted",
          texte: [
            "A straight bodice widens the line the most. A sweetheart bodice, as on Finell, softens the bust. A structured corset, as on Ember or Guinevere, draws the waist, already well defined in an A body shape.",
          ],
        },
        {
          titre: "Support",
          texte: [
            "A strapless bodice must hold without straps: its fit is what counts. The boutique's seamstresses fit it on you up to the last fitting, alterations included.",
          ],
        },
      ],
      aRetenir: [
        "Yes: a straight bodice widens the shoulders.",
        "Worked, it holds the eye at the top.",
        "With a flared skirt.",
      ],
      liens: [
        { href: "/robes/finell", label: "Finell" },
        { href: "/robes/ember", label: "Ember" },
        { href: "/robes/fortune", label: "Fortune" },
      ],
    },
    {
      slug: fr("A", 8),
      q: "How do I choose a dress that draws the eye to the upper body?",
      r: "Concentrate the dress's work at the top: an embroidered, beaded or draped bodice, a neckline that widens the shoulders, sleeves or straps that count. The skirt, simpler, lets the eye rise.",
      description:
        "Drawing the eye to the upper body: an embroidered or beaded bodice, a widening neckline, sleeves. Advice from the MADAMOON boutique, Paris 10e.",
      chapo:
        "The eye goes where the dress works. For an A body shape, the whole point is to carry it upwards.",
      sections: [
        {
          titre: "Work at the top, simplicity below",
          texte: [
            "A dress with an embroidered, beaded or draped bodice and a simple skirt makes the eye rise by itself. That is the principle of the ball gown and the A-line.",
          ],
        },
        {
          titre: "The details that hold the eye",
          texte: ["In the boutique's catalogue:"],
          liste: [
            "a beaded bodice, as on Emerald or Carrie;",
            "embroidery, as on Fern, in mikado embroidered with beaded flowers;",
            "an off-the-shoulder neckline, as on Trinity;",
            "sleeves, long as on Pendant or balloon as on Ryle.",
          ],
        },
        {
          titre: "On the day",
          texte: [
            "A tip: hair and jewellery play the same role. An updo frees the shoulders, earrings carry the eye to the face.",
          ],
        },
      ],
      aRetenir: [
        "The dress's work at the top.",
        "Beaded bodice, embroidery, off the shoulder.",
        "A simpler skirt.",
      ],
      liens: [
        { href: "/robes/fern", label: "Fern" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/ryle", label: "Ryle" },
      ],
    },
    {
      slug: fr("A", 9),
      q: "Which type of bodice should I choose for an A figure?",
      r: "A worked bodice that gives weight to the upper body: embroidered, beaded, draped, or structured as a corset. Its line matters as much as its decoration — straight or square, it widens the shoulders.",
      description:
        "Which bodice for an A figure: embroidered, beaded, draped or corseted, with a straight or square line. The bodices of MADAMOON dresses, Paris 10e.",
      chapo:
        "The bodice is the part of the dress that works hardest for an A body shape. Here is how to choose it.",
      sections: [
        {
          titre: "Decoration that holds the eye",
          texte: [
            "Embroidered, beaded or draped, the bodice gives the upper body something to hold the eye. Emerald and Carrie have a beaded bodice, Maribel a hand-embroidered bodice, Dove a draped neckline.",
          ],
        },
        {
          titre: "A construction that shapes",
          texte: [
            "A structured corset marks the waist, already well defined in an A body shape, and holds the bust. Ember has a structured corset, Guinevere and Santana a basque waist dipping to a point.",
          ],
        },
        {
          titre: "A line that widens",
          texte: [
            "The top line of the bodice matters as much as its decoration: straight, as on Nirali, or square, as on Dolores, it widens the shoulders.",
          ],
        },
      ],
      aRetenir: [
        "Embroidered, beaded or draped.",
        "A corset that marks the waist.",
        "A straight or square line.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/nirali", label: "Nirali" },
      ],
    },
    {
      slug: fr("A", 10),
      q: "Which wedding dress should I choose when my hips are wider than my shoulders?",
      r: "A dress whose skirt opens from the waist and follows the hips without moulding them — a ball gown or an A-line — with a worked top that balances. Nothing to hide: the skirt goes with the hips, the top does the rest.",
      description:
        "Wedding dress for hips wider than shoulders: a skirt that opens from the waist, a worked top. Ball gown or A-line at MADAMOON.",
      chapo:
        "Hips wider than shoulders do not call for a dress that hides them, but for a dress that goes with them.",
      sections: [
        {
          titre: "A skirt that goes with them",
          texte: [
            "The skirt opens from the waist and follows the hips instead of hugging them. The ball gown does it with fullness, the A-line with a lighter A line.",
          ],
        },
        {
          titre: "A fabric that falls",
          texte: [
            "Light tulle or lace gives an airy skirt that does not mark; mikado, a structured skirt that keeps its shape. A very fine satin, which clings, is judged at the fitting.",
          ],
        },
        {
          titre: "A top that balances",
          texte: [
            "The top does the other half of the work: a worked bodice, a neckline that widens the shoulders, sleeves or straps that count.",
          ],
        },
      ],
      aRetenir: [
        "A skirt that opens from the waist.",
        "Ball gown or A-line.",
        "A worked top that balances.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Ball gowns" },
        { href: "/coupes/trapeze", label: "A-line dresses" },
        { href: "/morphologies/a", label: "The A body shape" },
      ],
    },
    {
      slug: fr("A", 11),
      q: "Which silhouettes should I try first with an A body shape?",
      r: "The ball gown and the A-line, with a worked top and a neckline that widens the shoulders. Then a sheath and a two-in-one, to compare — and a mermaid if you feel like it.",
      description:
        "A body shape: which silhouettes to try first? The ball gown and the A-line, then a sheath and a two-in-one to compare. Advice from MADAMOON.",
      chapo:
        "The order of fittings helps you understand what suits you, and why. Here is the one the boutique recommends for an A body shape.",
      sections: [
        {
          titre: "The order of fittings",
          texte: [],
          ordonnee: true,
          liste: [
            "A ball gown — to see the effect of a worked bodice and a full skirt.",
            "An A-line — the A skirt from the waist, the easiest to wear.",
            "A sheath — to compare with a dress that does not build.",
            "A two-in-one — two volumes in the same dress.",
          ],
        },
        {
          titre: "And the mermaid",
          texte: [
            "It is not on the starting list, but it is worth trying if it attracts you, with a top that balances. Many A-shaped brides leave with a mermaid they had not planned to try.",
          ],
        },
        {
          titre: "Coming prepared",
          texte: [
            "Keep your favourite dresses in your favourites and mention them when you book: they will be ready when you arrive.",
          ],
        },
      ],
      aRetenir: [
        "First a ball gown and an A-line.",
        "Then a sheath and a two-in-one.",
        "A mermaid if you feel like it.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Ball gowns" },
        { href: "/coupes/trapeze", label: "A-line dresses" },
        { href: "/rendez-vous", label: "Book an appointment" },
      ],
    },
  ],
  H: [
    {
      slug: fr("H", 0),
      q: "Which wedding dress should I choose for an H body shape?",
      r: "Start with sheath dresses and light mermaids: fitted at the waist or worn with a belt, a sheath marks where you decide; a mermaid creates the curve instead of looking for it. A-lines and ball gowns are worth trying too.",
      description:
        "Wedding dress for an H body shape: sheath and light mermaid first, a waist marked by the cut. Advice from the MADAMOON boutique, Paris 10e.",
      chapo:
        "Create the curve rather than look for it: with an H body shape, the cut draws it. Here is where to start.",
      sections: [
        {
          titre: "The two silhouettes to try first",
          texte: [
            "A sheath, fitted at the waist or worn with a belt, marks where you decide, and nowhere else.",
            "A mermaid draws what is not yet visible: fitted to the thighs then flared, it creates the curve instead of highlighting it.",
          ],
        },
        {
          titre: "Those worth trying",
          texte: [
            "An A-line opens its skirt from a high waist and gives movement where the line is straight. A ball gown, with its corset and fullness, builds a waist.",
          ],
        },
        {
          titre: "Mark the waist, or not",
          texte: [
            "Marking the waist is an option, not a correction. A straight dress in crisp satin, on a long line, is one of the most beautiful choices there is.",
          ],
        },
      ],
      aRetenir: [
        "Sheath and light mermaid first.",
        "A waist marked by the cut or a belt.",
        "A-line and ball gown are worth trying.",
      ],
      liens: [
        { href: "/morphologies/h", label: "The H body shape" },
        { href: "/coupes/fluide", label: "Sheath dresses" },
        { href: "/coupes/sirene", label: "Mermaid dresses" },
      ],
    },
    {
      slug: fr("H", 1),
      q: "How do I recognise an H body shape?",
      r: "Your shoulders, waist and hips sit on the same straight, vertical line, and the waist is soft. In front of the mirror, a simple belt changes your whole line — more clearly than on other body shapes.",
      description:
        "Recognising an H body shape: shoulders, waist and hips on one line, a soft waist, a long, slender look. Three simple markers.",
      chapo:
        "A straight line, a long, slender look: three markers are enough to recognise it, one of them in front of the mirror.",
      sections: [
        {
          titre: "The three markers",
          texte: [],
          liste: [
            "The marker — shoulders, waist and hips sit on the same straight, vertical line.",
            "The waist — soft.",
            "In front of the mirror — a simple belt changes your whole line, more clearly than on other body shapes.",
          ],
        },
        {
          titre: "Not to be confused with",
          texte: [
            "The O body shape also has a soft waist, but with a generous bust and curves. The X body shape has balanced proportions like the H, but a slim waist and soft curves.",
          ],
        },
        {
          titre: "A figure, not a label",
          texte: [
            "Many brides find themselves between two body shapes. The recommended silhouettes overlap, and the fitting decides. If you are unsure, Élise, the site's advisor, points you in a direction in three questions.",
          ],
        },
      ],
      aRetenir: [
        "Shoulders, waist and hips aligned.",
        "A soft waist.",
        "A belt changes the whole line.",
      ],
      liens: [
        { href: "/morphologies/h", label: "The H body shape" },
        { href: "/morphologies", label: "The six body shapes" },
        { href: "/trouver-ma-robe", label: "Find my dress with Élise" },
      ],
    },
    {
      slug: fr("H", 2),
      q: "Which dress should I choose when my waist is not very defined?",
      r: "A dress that creates the waist instead of looking for it: a fitted or belted sheath, a light mermaid, or a structured bodice that draws the line. Or, on the contrary, a straight dress that embraces the long line — an equally beautiful choice.",
      description:
        "Wedding dress for a soft waist: a fitted or belted sheath, a light mermaid, a structured bodice, or a straight dress worn with intent. Advice from MADAMOON.",
      chapo:
        "A soft waist leaves two paths: draw it, or make it a strength. Both are beautiful.",
      sections: [
        {
          titre: "Draw the waist",
          texte: [
            "A sheath fitted at the waist, or worn with a belt, marks the line exactly where you want it. A light mermaid creates the curve as it flares below the thighs. A structured bodice, with a pointed basque waist, draws a waist that was not there.",
          ],
        },
        {
          titre: "Embrace the line",
          texte: [
            "Marking the waist is not an obligation. A straight dress in crisp satin, on a long line, flatters a slender figure without asking anything of it.",
          ],
        },
        {
          titre: "The boutique's dresses",
          texte: [
            "Monica, in floral jacquard, has a belt; Guinevere and Oksana, a corset with a pointed basque waist; Dove, a matte-satin sheath with a draped neckline.",
          ],
        },
      ],
      aRetenir: [
        "Create the waist: fitted cut, belt, corset.",
        "Or embrace the long line.",
        "Both are beautiful choices.",
      ],
      liens: [
        { href: "/robes/monica", label: "Monica" },
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/morphologies/h", label: "The H body shape" },
      ],
    },
    {
      slug: fr("H", 3),
      q: "Does a sheath wedding dress suit an H body shape?",
      r: "Yes, it is one of the two silhouettes to try first. Fitted at the waist or worn with a belt, it marks where you decide, and its fall follows the long line of an H figure.",
      description:
        "Sheath wedding dress and H body shape: one of the two silhouettes to try first, fitted or belted. The sheath dresses at MADAMOON, Paris 10e.",
      chapo:
        "The sheath and the H figure share the same quality: a long line. Here is how to make the most of it.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "Its fall follows the long line of an H body shape without forcing anything. Fitted at the waist or worn with a belt, it marks the waist where you decide, and nowhere else.",
          ],
        },
        {
          titre: "What to look at",
          texte: [
            "The waist: fitted, belted or draped, it creates the curve. Then the fabric: matte satin or crêpe fall clean; chiffon floats more.",
          ],
        },
        {
          titre: "The boutique's sheath dresses",
          texte: ["Among them:"],
          liste: [
            "Dove — matte satin, draped neckline, off the shoulder;",
            "Hélène — beaded corset with raised flowers, chiffon skirt;",
            "Marie — a timeless line, by Monica Loretti;",
            "Murielle — floral lace, sheer sleeves;",
            "Ryle — balloon sleeves, by Watters Designs.",
          ],
        },
      ],
      aRetenir: [
        "Yes: one of the two silhouettes to try first.",
        "Fitted or belted, it creates the waist.",
        "A fall that follows the long line.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Sheath dresses" },
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/helene", label: "Hélène" },
        { href: "/morphologies/h", label: "The H body shape" },
      ],
    },
    {
      slug: fr("H", 4),
      q: "Can a belt structure a wedding dress on an H figure?",
      r: "Yes, and more clearly than on other body shapes: on an H figure, a simple belt changes the whole line. It marks the waist where you decide, on a sheath as on an A-line.",
      description:
        "Belt and wedding dress on an H figure: it marks the waist and changes the whole line. How to choose it, with the dresses at MADAMOON, Paris.",
      chapo:
        "It is the mirror marker for an H body shape: a belt changes everything. Here is how to use it.",
      sections: [
        {
          titre: "Why it changes everything",
          texte: [
            "On a straight line, a belt draws the missing horizontal: it creates a waist, and the figure divides at once into two. On an H body shape, the effect is clearer than on any other.",
          ],
        },
        {
          titre: "Where to place it",
          texte: [
            "At the natural waist, it draws a curve; slightly higher, it lengthens the legs. The fitting shows where it sits best.",
          ],
        },
        {
          titre: "The boutique's dresses",
          texte: [
            "Monica, by Monica Loretti, in floral jacquard, has a belt that marks the waist. For another dress, talk to the boutique at the fitting: it will tell you what is possible.",
          ],
        },
      ],
      aRetenir: [
        "Yes: on an H figure, it changes the whole line.",
        "At the natural waist for a curve.",
        "Slightly higher to lengthen.",
      ],
      liens: [
        { href: "/robes/monica", label: "Monica" },
        { href: "/coupes/fluide", label: "Sheath dresses" },
        { href: "/morphologies/h", label: "The H body shape" },
      ],
    },
    {
      slug: fr("H", 5),
      q: "Can a mermaid dress draw curves on an H body shape?",
      r: "Yes, it is even one of the two silhouettes to try first. Fitted to the thighs then flared, a mermaid creates the curve instead of highlighting it. Choose a light one, so it lengthens the line without constraining it.",
      description:
        "Mermaid wedding dress and H body shape: it creates the curve instead of looking for it. Why choose a light one, and the mermaids at MADAMOON, Paris.",
      chapo:
        "The mermaid is the silhouette that draws curves where there are none yet. For an H body shape, it is one of the first to try.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "It draws what is not yet visible. Fitted to the thighs, then flared, it creates a curve at the hips and brings out the waist by contrast.",
          ],
        },
        {
          titre: "A light mermaid",
          texte: [
            "The boutique recommends light mermaids for an H body shape: they draw curves while lengthening the line, without constraining it. A structured corset, when there is one, reinforces the waist.",
          ],
        },
        {
          titre: "The boutique's mermaid dresses",
          texte: [
            "Meredith, in raised lace; Riviera, in charmeuse, with a structured corset and detachable sleeves; Rowan, a charmeuse sheath with a beaded corset; Zina, with a slit and optional 3D flowers.",
          ],
        },
      ],
      aRetenir: [
        "Yes: one of the two silhouettes to try first.",
        "It creates the curve instead of looking for it.",
        "Light, to lengthen the line.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/robes/meredith", label: "Meredith" },
        { href: "/robes/riviera", label: "Riviera" },
      ],
    },
    {
      slug: fr("H", 6),
      q: "Is an empire dress suited to an H body shape?",
      r: "Very much so. It raises the waist under the bust and lengthens everything below. It deserves a fitting even if the idea did not appeal in a photograph. The boutique does not class its dresses as \"empire\": its sheath dresses come closest to that line.",
      description:
        "Empire wedding dress and H body shape: the waist rises under the bust and the line lengthens. Why try it, and the dresses that come closest.",
      chapo:
        "The empire line is one the boutique recommends trying for an H body shape — even when the idea does not appeal in a photo.",
      sections: [
        {
          titre: "What an empire dress is",
          texte: [
            "An empire dress has its waist placed high, just under the bust, and a skirt that then falls straight or slightly flared.",
          ],
        },
        {
          titre: "Why it serves an H body shape",
          texte: [
            "It creates a waist where the line did not mark one, by raising it under the bust, and it lengthens everything below. It is a silhouette you understand once you wear it.",
          ],
        },
        {
          titre: "At MADAMOON",
          texte: [
            "The catalogue is arranged in five silhouettes — mermaid, ball gown, sheath, A-line, two-in-one — and no dress is classed as \"empire\". Sheath dresses come closest. If that is the line you are looking for, say so when you book.",
          ],
        },
      ],
      aRetenir: [
        "Very much so: the waist rises under the bust.",
        "It lengthens everything below.",
        "At the boutique: sheath dresses come closest.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Sheath dresses" },
        { href: "/morphologies/h", label: "The H body shape" },
        { href: "/rendez-vous", label: "Book an appointment" },
      ],
    },
    {
      slug: fr("H", 7),
      q: "Which bodice creates the impression of a defined waist?",
      r: "A structured bodice that draws the waist: a corset, especially with a basque waist dipping to a point, a play of seams, or decoration that stops sharply at the waist. The contrast between a worked bodice and a freer skirt does the rest.",
      description:
        "Creating the impression of a defined waist: corset, pointed basque waist, seams, decoration that stops at the waist. The bodices of MADAMOON dresses, Paris.",
      chapo:
        "A waist can be built. Here are the bodices that draw it, even when the figure does not mark it.",
      sections: [
        {
          titre: "The corset",
          texte: [
            "A structured corset holds the bust and draws the waist. Ember and Riviera have a structured corset; Carrie, Rowan and Hélène, a beaded corset.",
          ],
        },
        {
          titre: "The pointed basque waist",
          texte: [
            "It dips in a V below the natural waist and lengthens the bust: the waist looks slimmer by contrast. Guinevere and Oksana have a corset with a pointed basque waist; Santana, a basque waist.",
          ],
        },
        {
          titre: "Contrast",
          texte: [
            "A worked bodice — beaded, embroidered, in lace — stopping sharply at the waist, above a simpler skirt, creates a horizontal line the eye reads as a waist.",
          ],
        },
      ],
      aRetenir: [
        "A structured corset.",
        "A pointed basque waist.",
        "A worked bodice, a freer skirt.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/oksana", label: "Oksana" },
        { href: "/robes/ember", label: "Ember" },
      ],
    },
    {
      slug: fr("H", 8),
      q: "How do I add volume or texture to an H figure?",
      r: "Through the silhouette — a ball-gown skirt or a flaring mermaid —, through the fabric — raised lace, 3D flowers, a drape — or through the details — balloon sleeves, ribbons. Texture creates the curve the straight line does not draw.",
      description:
        "Adding volume or texture to an H figure: a full skirt, raised lace, 3D flowers, a drape, sleeves. The MADAMOON dresses that bring them.",
      chapo:
        "An H figure benefits from a dress that brings what the line does not give. Here is where to find volume and texture.",
      sections: [
        {
          titre: "Through the silhouette",
          texte: [
            "A ball-gown skirt gives fullness under a built waist. A mermaid, flaring below the thighs, creates volume at the bottom of the dress and a curve at the hips. Alicia and Lovia can be worn as an A-line or with ball-gown volume.",
          ],
        },
        {
          titre: "Through the fabric",
          texte: [
            "Raised lace, as on Meredith; 3D flowers, as on Zina; a beaded corset with raised flowers, as on Hélène; a drape, like Dove's. Light catches the texture and gives the figure shape.",
          ],
        },
        {
          titre: "Through the details",
          texte: [
            "Balloon sleeves, as on Ryle, or velvet ribbons, as on Mitra, add texture without changing the silhouette.",
          ],
        },
      ],
      aRetenir: [
        "A full skirt or a flaring mermaid.",
        "Raised lace, 3D flowers, a drape.",
        "Balloon sleeves, ribbons.",
      ],
      liens: [
        { href: "/robes/meredith", label: "Meredith" },
        { href: "/robes/zina", label: "Zina" },
        { href: "/robes/ryle", label: "Ryle" },
      ],
    },
    {
      slug: fr("H", 9),
      q: "Which wedding dress should I choose for a long, slender figure?",
      r: "A dress that follows the line: a sheath with a clean fall, a light mermaid, or a straight, minimalist dress that makes length a statement. If you want curves, a fitted or belted waist draws them.",
      description:
        "Wedding dress for a long, slender figure: a clean sheath, a light mermaid, a straight minimalist dress, or a marked waist. Advice from MADAMOON, Paris.",
      chapo:
        "A long, slender figure has a rare advantage: length. The dress can celebrate it, or add curves to it.",
      sections: [
        {
          titre: "Celebrate the line",
          texte: [
            "A straight dress in crisp satin, on a long line, is one of the most beautiful choices there is. Minimalist crêpe dresses, like Milan by Monica Loretti or Bondi by Casablanca Bridal, play that card.",
          ],
        },
        {
          titre: "Add curves",
          texte: [
            "A sheath fitted at the waist, or worn with a belt, marks the waist. A light mermaid creates a curve at the hips while lengthening the line further.",
          ],
        },
        {
          titre: "Play on length",
          texte: [
            "A train, a slit or long sleeves extend the line. Siddalee has a long train; Monica and Murielle, a slit; Pendant, long sleeves.",
          ],
        },
      ],
      aRetenir: [
        "A straight, minimalist dress, worn with intent.",
        "Or a fitted waist for curves.",
        "Train, slit, long sleeves extend the line.",
      ],
      liens: [
        { href: "/robes/milan", label: "Milan" },
        { href: "/robes/bondi", label: "Bondi" },
        { href: "/morphologies/h", label: "The H body shape" },
      ],
    },
    {
      slug: fr("H", 10),
      q: "Do drop-waist dresses suit an H body shape?",
      r: "Yes, if you love the long line: a drop waist lengthens the bust and plays the straight figure instead of fighting it. It does not create a waist — for curves, prefer a fitted waist or a high waist.",
      description:
        "Drop-waist wedding dress and H body shape: it lengthens the bust and plays the straight line. When to choose it, and the drop waists at MADAMOON.",
      chapo:
        "A drop waist does not try to carve the waist: it moves it. On an H figure, it is a choice of style more than a correction.",
      sections: [
        {
          titre: "What it does",
          texte: [
            "The seam falls below the natural waist, towards the hips. The bust looks longer, and the skirt starts lower. On a straight line, the effect is slender and graphic.",
          ],
        },
        {
          titre: "When to choose it",
          texte: [
            "If you love your long line and want to play it rather than transform it. If you are looking for curves instead, a fitted waist, a belt or a high empire waist will draw them more.",
          ],
        },
        {
          titre: "The boutique's drop waists",
          texte: [
            "Nirali, an A-line with a straight neckline; Mitra, an A-line in Cassie lace with velvet ribbons; Clover Perles, a ball gown in Caterina lace with a square neckline — all three by Watters Designs.",
          ],
        },
      ],
      aRetenir: [
        "Yes, to play the long line.",
        "It lengthens the bust.",
        "For curves: a fitted or high waist.",
      ],
      liens: [
        { href: "/robes/nirali", label: "Nirali" },
        { href: "/robes/mitra", label: "Mitra" },
        { href: "/robes/clover-perles", label: "Clover Perles" },
      ],
    },
    {
      slug: fr("H", 11),
      q: "Which silhouettes should I try first for an H body shape?",
      r: "The sheath and the light mermaid, which draw curves while lengthening the line. Then an A-line and a ball gown, to compare — and an empire dress if the chance comes up.",
      description:
        "H body shape: which silhouettes to try first? The sheath and the light mermaid, then an A-line and a ball gown to compare. Advice from MADAMOON.",
      chapo:
        "The order of fittings helps you understand what suits you, and why. Here is the one the boutique recommends for an H body shape.",
      sections: [
        {
          titre: "The order of fittings",
          texte: [],
          ordonnee: true,
          liste: [
            "A sheath — fitted or belted, it marks the waist where you want it.",
            "A light mermaid — it creates the curve instead of looking for it.",
            "An A-line — the skirt opens from a high waist.",
            "A ball gown — to see the effect of a corset and a full skirt.",
          ],
        },
        {
          titre: "And the empire dress",
          texte: [
            "It deserves a fitting, even if the idea did not appeal in a photo. Ask the boutique for the models that come closest.",
          ],
        },
        {
          titre: "Coming prepared",
          texte: [
            "Keep your favourite dresses in your favourites and mention them when you book: they will be ready when you arrive.",
          ],
        },
      ],
      aRetenir: [
        "First a sheath and a light mermaid.",
        "Then an A-line and a ball gown.",
        "An empire dress, if the chance comes up.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Sheath dresses" },
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/rendez-vous", label: "Book an appointment" },
      ],
    },
  ],
  "8": [
    {
      slug: fr("8", 0),
      q: "Which wedding dress should I choose for an 8 body shape?",
      r: "Every silhouette works: the balance is already there, the dress only has to follow it. Mermaid and column dresses hug the curves, and anything fitted at the waist highlights the natural balance.",
      description:
        "Wedding dress for an 8 body shape: every silhouette works, mermaid and column dresses first, anything fitted at the waist. Advice from MADAMOON, Paris.",
      chapo:
        "The balance is already there. The dress only has to follow it — and almost all of them know how.",
      sections: [
        {
          titre: "Every silhouette works",
          texte: [
            "With shoulders and hips that answer each other and a clearly defined waist, there is nothing to correct. Mermaid, sheath, A-line, ball gown and two-in-one all work.",
          ],
        },
        {
          titre: "Those that follow the curves",
          texte: [
            "Mermaid and column dresses hug an already proportioned line: fitted to the thighs, they correct nothing, they follow. Unadorned satin works for the same reason: it tells only the cut.",
          ],
        },
        {
          titre: "The detail that extends the waist",
          texte: [
            "A sweetheart bodice or a V neckline extends the waist upwards. Here, anything fitted works.",
          ],
        },
      ],
      aRetenir: [
        "Every silhouette works.",
        "Mermaid and column dresses hug the curves.",
        "Anything fitted at the waist works.",
      ],
      liens: [
        { href: "/morphologies/8", label: "The 8 body shape" },
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/coupes", label: "Silhouettes" },
      ],
    },
    {
      slug: fr("8", 1),
      q: "How do I recognise an 8 or hourglass body shape?",
      r: "Your shoulders and hips answer each other, and the waist dips clearly between them; the curves are marked and even, from top to bottom. In front of the mirror, fitted clothes flatter you, and it is straight cuts that hang loose.",
      description:
        "Recognising an 8 body shape, also called hourglass: balanced shoulders and hips, a clearly defined waist, marked curves. Three simple markers.",
      chapo:
        "It is also called \"hourglass\". Three markers are enough to recognise it, one of them in front of the mirror.",
      sections: [
        {
          titre: "The three markers",
          texte: [],
          liste: [
            "The marker — shoulders and hips answer each other, and the waist dips clearly between them.",
            "The curves — they are marked, and even from top to bottom.",
            "In front of the mirror — fitted clothes flatter you, and it is straight cuts that hang loose.",
          ],
        },
        {
          titre: "Not to be confused with",
          texte: [
            "The X body shape is very similar: balanced shoulders and hips, a slim waist. The difference lies in the curves, clearly marked for the 8, softer for the X. The A body shape also has a defined waist, but hips wider than the shoulders.",
          ],
        },
        {
          titre: "A figure, not a label",
          texte: [
            "Many brides find themselves between two body shapes. For the 8 and the X, the advice largely overlaps. If you are unsure, Élise, the site's advisor, points you in a direction in three questions.",
          ],
        },
      ],
      aRetenir: [
        "Balanced shoulders and hips.",
        "A clearly defined waist.",
        "Straight cuts hang loose.",
      ],
      liens: [
        { href: "/morphologies/8", label: "The 8 body shape" },
        { href: "/morphologies/x", label: "The X body shape" },
        { href: "/trouver-ma-robe", label: "Find my dress with Élise" },
      ],
    },
    {
      slug: fr("8", 2),
      q: "Which silhouette shows off a defined waist?",
      r: "Any that is fitted at the waist: mermaid and column dresses follow it, ball gowns and A-lines start from it to open out, and a belted sheath highlights it. A sweetheart bodice or a V neckline extends the line upwards.",
      description:
        "Showing off a defined waist: mermaid, column, ball gown, A-line or belted sheath, a sweetheart bodice or a V. Advice from the MADAMOON boutique.",
      chapo:
        "A defined waist is an asset almost every silhouette knows how to show off. Here is how each one goes about it.",
      sections: [
        {
          titre: "Those that follow it",
          texte: [
            "Mermaid and column dresses hug the waist and hips: they follow a line already drawn, without adding anything.",
          ],
        },
        {
          titre: "Those that start from it",
          texte: [
            "A ball gown fits its bodice at the waist and launches its fullness from there: the contrast is sharp. An A-line starts from the waist, already the narrowest point, and opens in an A.",
          ],
        },
        {
          titre: "Those that highlight it",
          texte: [
            "A sheath worn with a belt or cut at the waist keeps the line while letting you breathe. Monica, in floral jacquard, has a belt; Guinevere, a corset with a pointed basque waist.",
          ],
        },
      ],
      aRetenir: [
        "Mermaid and column dresses follow it.",
        "Ball gowns and A-lines start from it.",
        "A belted sheath highlights it.",
      ],
      liens: [
        { href: "/robes/monica", label: "Monica" },
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/morphologies/8", label: "The 8 body shape" },
      ],
    },
    {
      slug: fr("8", 3),
      q: "Is a mermaid dress suited to an 8 body shape?",
      r: "Yes, it is one of the silhouettes that suits it best. Fitted to the thighs, it hugs an already proportioned line: it corrects nothing, it follows.",
      description:
        "Mermaid wedding dress and 8 body shape: it hugs an already proportioned line, without correcting anything. The mermaids at MADAMOON, Paris 10e.",
      chapo:
        "The mermaid and the 8 figure are made for each other: the dress only has to follow what is already there.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "It hugs the bust, waist and hips, then flares below the thighs. On an 8 figure, it has nothing to create: it follows an already proportioned line.",
          ],
        },
        {
          titre: "What to look at",
          texte: [
            "The fabric: unadorned satin tells only the cut; lace adds decoration without changing the line. And the point where the skirt flares, which is judged at the fitting.",
          ],
        },
        {
          titre: "The boutique's mermaid dresses",
          texte: [
            "Riviera, in charmeuse, with a structured corset and detachable sleeves; Meredith, in raised lace; Montana, in matte satin with long lace sleeves; Bella, in satin with long sleeves and an open back.",
          ],
        },
      ],
      aRetenir: [
        "Yes: one of the silhouettes that suits it best.",
        "It follows the line, without correcting anything.",
        "Unadorned satin tells only the cut.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/robes/riviera", label: "Riviera" },
        { href: "/robes/montana", label: "Montana" },
      ],
    },
    {
      slug: fr("8", 4),
      q: "Does a column dress suit an 8 figure?",
      r: "Yes, very well. Like a mermaid, a column (fourreau) dress hugs the curves of an already proportioned line; it then falls straighter, without flaring. In the catalogue, column dresses are filed with the mermaids.",
      description:
        "Column wedding dress and 8 figure: it hugs the curves and falls straight. What to know, and the column dresses at MADAMOON, Paris 10e.",
      chapo:
        "The column is the silhouette closest to the body. For an 8 figure, it is an obvious choice — here is what to look at.",
      sections: [
        {
          titre: "What a column dress is",
          texte: [
            "A fitted dress that follows the body from bust to hips, then falls straight or nearly so to the floor. Where a mermaid flares below the thighs, a column keeps its line.",
          ],
        },
        {
          titre: "Why it works",
          texte: [
            "It hugs the curves without adding or correcting anything. On an 8 figure, with marked and even curves, it shows everything off at once.",
          ],
        },
        {
          titre: "The boutique's column dresses",
          texte: [
            "The catalogue files them with the mermaids. Siddalee, by Watters Designs, is a column with floral motifs in sequinned tulle and a long train; Rowan, a charmeuse column with a beaded corset; Bella, by Casablanca Bridal, can be worn as a mermaid or a column.",
          ],
        },
      ],
      aRetenir: [
        "Yes: it hugs the curves.",
        "Straighter than a mermaid, without flaring.",
        "Filed with the mermaids in the catalogue.",
      ],
      liens: [
        { href: "/robes/siddalee", label: "Siddalee" },
        { href: "/robes/rowan", label: "Rowan" },
        { href: "/robes/bella", label: "Bella" },
      ],
    },
    {
      slug: fr("8", 5),
      q: "Can a ball gown show off an 8 body shape?",
      r: "Yes. The bodice is fitted at the waist and the fullness starts from there: the contrast is sharp, and that is the whole effect. It simply needs room — think about the venue and the day.",
      description:
        "Ball-gown wedding dress and 8 body shape: a fitted bodice, fullness from the waist, a sharp contrast. The ball gowns at MADAMOON, Paris.",
      chapo:
        "A ball gown plays the contrast between a slim waist and a full skirt. On an 8 figure, it is striking.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "The bodice is fitted at the waist and the fullness starts from there. The contrast between the already defined waist and the volume of the skirt is sharp: that is the whole effect.",
          ],
        },
        {
          titre: "What it needs",
          texte: [
            "Room. A ball-gown skirt takes up space: think about the ceremony venue, the stairs, the car, the whole day. A two-in-one, whose overskirt comes off, can be a good compromise.",
          ],
        },
        {
          titre: "The boutique's ball gowns",
          texte: [
            "Guinevere, in jacquard, with a pointed basque corset; Santana, with a basque waist, in organza and tulle; Ember, with a structured corset; Seraphina, by Olya Mak, in embroidered lace with long sleeves.",
          ],
        },
      ],
      aRetenir: [
        "Yes: a sharp contrast between waist and skirt.",
        "It needs room.",
        "A two-in-one, a good compromise.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Ball gowns" },
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },
    {
      slug: fr("8", 6),
      q: "Which neckline suits a figure with balanced shoulders and hips?",
      r: "A sweetheart bodice or a V neckline: they extend the waist upwards and shape the bust. With balanced shoulders and hips, there is nothing to compensate — the neckline is chosen mainly for style and season.",
      description:
        "Neckline for a figure with balanced shoulders and hips: sweetheart or V first, then according to style. Advice from the MADAMOON boutique.",
      chapo:
        "When the proportions are balanced, the neckline has nothing to correct. It can therefore be chosen for what it says.",
      sections: [
        {
          titre: "Sweetheart and V",
          texte: [
            "They extend the line of the waist upwards and shape the bust. It is the detail the boutique recommends first for an 8 body shape. Finell has a sweetheart bodice; Emerald, Monica and Livia, a V neckline.",
          ],
        },
        {
          titre: "Other options",
          texte: [
            "Off-the-shoulder necklines, as on Trinity or Kensington, uncover the shoulders; a square neck, as on Dolores, is more graphic; a high neck, as on Chastity, more covered. Nothing is to be avoided: it all depends on style.",
          ],
        },
        {
          titre: "Choose by style",
          texte: [
            "The season, the venue and the mood of the wedding matter more than the body shape. A high neck and sleeves for winter, bare shoulders for summer.",
          ],
        },
      ],
      aRetenir: [
        "A sweetheart bodice or a V first.",
        "Nothing to compensate.",
        "Style and season decide.",
      ],
      liens: [
        { href: "/robes/finell", label: "Finell" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/chastity", label: "Chastity" },
      ],
    },
    {
      slug: fr("8", 7),
      q: "How do I choose a fitted dress without losing comfort?",
      r: "A comfortable fitted dress comes down to three things: a fabric that moves with the body, such as crêpe or stretch chiffon; a corset fitted on you rather than tightened; and a fitting where you move. At MADAMOON, fitting continues up to the last fitting, alterations included.",
      description:
        "A fitted, comfortable wedding dress: a stretch fabric, a corset fitted on you, a fitting where you move. Advice from the MADAMOON boutique.",
      chapo:
        "A fitted dress is worn for twelve hours, not just for a photo. Here is how not to choose between allure and comfort.",
      sections: [
        {
          titre: "A fabric that moves with you",
          texte: [
            "A stretch fabric follows the body instead of constraining it. Maribel is in stretch chiffon; Fortune pairs stretch crêpe with satin organza.",
          ],
        },
        {
          titre: "A corset fitted, not tightened",
          texte: [
            "A well-fitted corset holds without squeezing. At MADAMOON, the dress is made to your measurements, then fitted by the seamstresses up to the last fitting, alterations included.",
          ],
        },
        {
          titre: "A fitting where you move",
          texte: [
            "A tip: in the fitting room, sit down, raise your arms, walk, take a few dance steps. A dress that bothers you at the fitting will bother you all day.",
          ],
        },
      ],
      aRetenir: [
        "A stretch fabric.",
        "A corset fitted on you, not tightened.",
        "Move at the fitting.",
      ],
      liens: [
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/fortune", label: "Fortune" },
        { href: "/faq/etapes-robe-de-mariee-sur-mesure", label: "The stages of made-to-measure" },
      ],
    },
    {
      slug: fr("8", 8),
      q: "What is the difference between an 8 and an X body shape?",
      r: "They look alike and are often confused: both have balanced shoulders and hips and a defined waist. The 8 has clearly marked curves, the X softer curves and a slim waist. The advice largely overlaps.",
      description:
        "8 or X body shape: balanced shoulders and hips for both, marked curves for the 8, softer ones for the X. How to tell them apart.",
      chapo:
        "They are the two closest body shapes. Here is what sets them apart — and why the difference matters little when choosing a dress.",
      sections: [
        {
          titre: "What they have in common",
          texte: [
            "Balanced shoulders and hips, a well-defined waist between them. For both, every silhouette works.",
          ],
        },
        {
          titre: "What sets them apart",
          texte: [],
          liste: [
            "The 8 — marked curves, even from top to bottom; straight cuts hang loose.",
            "The X — soft rather than pronounced curves, a slim waist; you hesitate between several styles in the fitting room, because they all suit you.",
          ],
        },
        {
          titre: "What it changes",
          texte: [
            "Little. For the 8, mermaid and column dresses hug assertive curves; for the X, the question becomes mainly one of wedding style. Both pages are worth reading.",
          ],
        },
      ],
      aRetenir: [
        "Both: balanced shoulders and hips.",
        "The 8: marked curves.",
        "The X: soft curves, a slim waist.",
      ],
      liens: [
        { href: "/morphologies/8", label: "The 8 body shape" },
        { href: "/morphologies/x", label: "The X body shape" },
        { href: "/morphologies", label: "The six body shapes" },
      ],
    },
    {
      slug: fr("8", 9),
      q: "Can a sheath dress suit an 8 body shape?",
      r: "Yes. Worn with a belt or cut at the waist, it keeps the line while letting you breathe. A completely straight sheath can hang loose where the waist dips, but taking it in at the waist settles the matter in one fitting.",
      description:
        "Sheath wedding dress and 8 body shape: yes, belted or cut at the waist. How to choose it, and the sheath dresses at MADAMOON, Paris 10e.",
      chapo:
        "A sheath is not the first silhouette that comes to mind for an 8 figure. Yet it suits it very well, on one condition.",
      sections: [
        {
          titre: "Yes, with a marked waist",
          texte: [
            "Worn with a belt or cut at the waist, a sheath keeps the line of an 8 figure while letting you breathe. It is often the most comfortable to wear for a whole day.",
          ],
        },
        {
          titre: "If it hangs loose",
          texte: [
            "A straight cut sometimes hangs loose where the waist dips. A belt or taking it in at the waist settles the matter in one fitting: nothing is ruled out in advance.",
          ],
        },
        {
          titre: "The boutique's sheath dresses",
          texte: [
            "Dove, in matte satin with a draped neckline; Hélène, with a beaded corset and a chiffon skirt; Murielle, in floral lace with sheer sleeves; Marie, with a timeless line.",
          ],
        },
      ],
      aRetenir: [
        "Yes, belted or cut at the waist.",
        "If it hangs loose, taking it in at the waist is enough.",
        "Often the most comfortable.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Sheath dresses" },
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/helene", label: "Hélène" },
      ],
    },
    {
      slug: fr("8", 10),
      q: "Which dress details naturally emphasise the waist?",
      r: "A belt, a pointed basque waist, a structured corset, a seam or a change of fabric at the waist, and a sweetheart or V neckline that extends the line upwards. On an already defined waist, one is enough.",
      description:
        "Details that emphasise the waist: belt, basque waist, corset, seam, sweetheart or V neckline. With the dresses of the MADAMOON boutique, Paris.",
      chapo:
        "A defined waist needs very little to show. Here are the details that emphasise it, without overdoing it.",
      sections: [
        {
          titre: "The dress's details",
          texte: ["In the boutique's catalogue:"],
          liste: [
            "a belt, as on Monica;",
            "a pointed basque waist, as on Guinevere, Oksana or Santana;",
            "a structured or beaded corset, as on Ember, Riviera or Carrie;",
            "a contrast between a worked bodice and a simpler skirt.",
          ],
        },
        {
          titre: "The neckline",
          texte: [
            "A sweetheart bodice or a V neckline extends the waist upwards: the line of the bust and that of the waist answer each other.",
          ],
        },
        {
          titre: "One is enough",
          texte: [
            "On an 8 body shape, the waist already shows. One detail emphasises it; three overload it. Better to choose the one you like most.",
          ],
        },
      ],
      aRetenir: [
        "Belt, basque waist, corset.",
        "A sweetheart or V neckline.",
        "On a defined waist, one is enough.",
      ],
      liens: [
        { href: "/robes/oksana", label: "Oksana" },
        { href: "/robes/riviera", label: "Riviera" },
        { href: "/robes/monica", label: "Monica" },
      ],
    },
    {
      slug: fr("8", 11),
      q: "Which silhouettes should I try first for an 8 body shape?",
      r: "A mermaid or a column, which hug the curves, then a ball gown for contrast. Every silhouette suits you: the rest of the fitting is about the style of the wedding more than the body shape.",
      description:
        "8 body shape: which silhouettes to try first? A mermaid or a column, then a ball gown for contrast, then according to style.",
      chapo:
        "When every silhouette suits you, the order of fittings is mainly for comparing. Here is the one the boutique recommends for an 8 body shape.",
      sections: [
        {
          titre: "The order of fittings",
          texte: [],
          ordonnee: true,
          liste: [
            "A mermaid or a column — they hug the curves without correcting anything.",
            "A ball gown — for the contrast between waist and skirt.",
            "An A-line — it starts from the waist and opens from there.",
            "A belted sheath — often the most comfortable.",
          ],
        },
        {
          titre: "Then style decides",
          texte: [
            "A two-in-one keeps the balance in both versions, with and without the overskirt. Beyond that, the venue, the season and what you want to live that day decide.",
          ],
        },
        {
          titre: "Coming prepared",
          texte: [
            "Keep your favourite dresses in your favourites and mention them when you book: they will be ready when you arrive.",
          ],
        },
      ],
      aRetenir: [
        "First a mermaid or a column.",
        "Then a ball gown for contrast.",
        "After that, style decides.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/coupes/princesse", label: "Ball gowns" },
        { href: "/rendez-vous", label: "Book an appointment" },
      ],
    },
  ],
  X: [
    {
      slug: fr("X", 0),
      q: "Which wedding dress should I choose for an X body shape?",
      r: "Every silhouette suits you — that is the honest answer. Mermaid, ball gown, sheath, A-line or two-in-one: the question becomes one of wedding style, not of body shape.",
      description:
        "Wedding dress for an X body shape: every silhouette suits you, the style of the wedding decides. Advice from the MADAMOON boutique, Paris 10e.",
      chapo:
        "Every silhouette suits you. The style of the wedding will decide — and that is good news.",
      sections: [
        {
          titre: "Every silhouette suits you",
          texte: [
            "Balanced proportions, a slim waist, soft curves: there is nothing to correct or build. A mermaid follows the waist, a ball gown starts from it, a sheath goes with it, an A-line lets it breathe, a two-in-one keeps the balance in both versions.",
          ],
        },
        {
          titre: "The better question",
          texte: [
            "Here, the question is no longer \"what suits me?\" but \"what is like me?\". It is a better question.",
          ],
        },
        {
          titre: "Enhance without overdoing it",
          texte: [
            "With a harmonious figure, the dress does not need to add anything. A clean cut, a beautiful fabric and one strong detail are often enough.",
          ],
        },
      ],
      aRetenir: [
        "Every silhouette suits you.",
        "The style of the wedding decides.",
        "Enhance without overdoing it.",
      ],
      liens: [
        { href: "/morphologies/x", label: "The X body shape" },
        { href: "/coupes", label: "Silhouettes" },
        { href: "/robes", label: "See all the dresses" },
      ],
    },
    {
      slug: fr("X", 1),
      q: "How do I recognise an X body shape?",
      r: "Your shoulders and hips are balanced, and your waist is slim and well defined; the curves are soft rather than pronounced. In the fitting room, you hesitate between several styles — most often because they all suit you.",
      description:
        "Recognising an X body shape: balanced shoulders and hips, a slim waist, soft curves. Three simple markers, one of them in the fitting room.",
      chapo:
        "Three markers are enough to recognise it — and the third is checked in the fitting room more than in front of a mirror.",
      sections: [
        {
          titre: "The three markers",
          texte: [],
          liste: [
            "The marker — shoulders and hips are balanced, and the waist is slim and well defined.",
            "The curves — soft rather than pronounced, and the line stays harmonious.",
            "In front of the mirror — you hesitate between several styles in the fitting room, most often because they all suit you.",
          ],
        },
        {
          titre: "Not to be confused with",
          texte: [
            "The 8 body shape is very similar, with more clearly marked curves. The H body shape also has balanced proportions, but a soft waist.",
          ],
        },
        {
          titre: "A figure, not a label",
          texte: [
            "Many brides find themselves between two body shapes. If you are unsure, Élise, the site's advisor, points you in a direction in three questions.",
          ],
        },
      ],
      aRetenir: [
        "Balanced shoulders and hips.",
        "A slim waist, soft curves.",
        "Several styles suit you in the fitting room.",
      ],
      liens: [
        { href: "/morphologies/x", label: "The X body shape" },
        { href: "/morphologies", label: "The six body shapes" },
        { href: "/trouver-ma-robe", label: "Find my dress with Élise" },
      ],
    },
    {
      slug: fr("X", 2),
      q: "What is the difference between an X and an 8 body shape?",
      r: "The X has soft curves and a slim waist; the 8, clearly marked curves. Both have balanced shoulders and hips, and the advice largely overlaps: every silhouette suits them.",
      description:
        "X or 8 body shape: a slim waist and soft curves for the X, marked curves for the 8. How to tell whether you are an X, in the fitting room.",
      chapo:
        "Seen from the X, the difference with the 8 comes down to one word: the softness of the curves. Here is how to be sure.",
      sections: [
        {
          titre: "What makes an X",
          texte: [
            "A slim, well-defined waist between balanced shoulders and hips, and soft rather than pronounced curves. The line stays harmonious, with nothing emphatic.",
          ],
        },
        {
          titre: "What makes an 8",
          texte: [
            "The same proportions, but marked curves, even from top to bottom, and a clearly defined waist. Fitted clothes flatter, straight cuts hang loose.",
          ],
        },
        {
          titre: "Check it in the fitting room",
          texte: [
            "A mermaid or a column shows it quickly: on an 8, they hug assertive curves; on an X, they follow a softer line. Either way, every silhouette works — the difference matters little when choosing.",
          ],
        },
      ],
      aRetenir: [
        "X: slim waist, soft curves.",
        "8: clearly marked curves.",
        "Every silhouette suits both.",
      ],
      liens: [
        { href: "/morphologies/8/difference-morphologie-8-morphologie-x", label: "The 8 and the X, seen from the 8" },
        { href: "/morphologies/8", label: "The 8 body shape" },
        { href: "/morphologies/x", label: "The X body shape" },
      ],
    },
    {
      slug: fr("X", 3),
      q: "Can an X body shape wear every wedding dress silhouette?",
      r: "Yes. Mermaid, ball gown, sheath, A-line and two-in-one: each finds its purpose on an X figure. It is not a polite formula — it is what the boutique sees in the fitting room.",
      description:
        "X body shape: yes, every wedding dress silhouette suits you. What each one brings, and how to choose when everything works. Advice from MADAMOON.",
      chapo:
        "Every silhouette suits you. Still, you need to know what each one brings, to choose the one that is like you.",
      sections: [
        {
          titre: "What each silhouette brings",
          texte: [],
          liste: [
            "The mermaid — fitted then flared, it follows the waist without having to create it: the silhouette that says the most with the least.",
            "The ball gown — the fullness starts from an already slim waist, and the contrast happens by itself.",
            "The sheath — it builds nothing and does not need to: the fabric only goes with the line.",
            "The A-line — the easiest to live in, and the most discreet, when the dress is not meant to be the subject of the day.",
            "The two-in-one — two dresses, one silhouette: the overskirt goes on, then comes off without anything collapsing.",
          ],
        },
        {
          titre: "Choosing when everything works",
          texte: [
            "By the venue, the season, and what you want to be able to do with your day. A two-metre train on a beach, heavy satin in August: the dress must last twelve hours, not just the photograph.",
          ],
        },
      ],
      aRetenir: [
        "Yes: every silhouette suits you.",
        "Each one brings something different.",
        "The venue, the season and the day decide.",
      ],
      liens: [
        { href: "/coupes", label: "Silhouettes" },
        { href: "/morphologies/x", label: "The X body shape" },
        { href: "/robes", label: "See all the dresses" },
      ],
    },
    {
      slug: fr("X", 4),
      q: "Does a mermaid dress show off an X body shape?",
      r: "Yes. Fitted then flared, it follows the waist without having to create it. It is the silhouette that says the most with the least.",
      description:
        "Mermaid wedding dress and X body shape: it follows the waist without having to create it. What to look at, and the mermaids at MADAMOON, Paris.",
      chapo:
        "On an X figure, a mermaid has nothing to prove: it follows a line that already holds. Here is how to choose one.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "Fitted to the thighs, then flared, it hugs a slim waist and soft curves without forcing anything. It says a lot with very little.",
          ],
        },
        {
          titre: "What to look at",
          texte: [
            "With soft curves, a supple fabric — crêpe, charmeuse — follows the line without hardening it; lace adds decoration. The point where the skirt flares is judged at the fitting.",
          ],
        },
        {
          titre: "The boutique's mermaid dresses",
          texte: [
            "Riviera and Rowan, in charmeuse; Mira and Milan by Monica Loretti, in crêpe; Meredith, in raised lace; Montana, in matte satin with long lace sleeves.",
          ],
        },
      ],
      aRetenir: [
        "Yes: it follows the waist without creating it.",
        "A supple fabric follows soft curves.",
        "The silhouette that says the most with the least.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/robes/riviera", label: "Riviera" },
        { href: "/robes/mira", label: "Mira" },
      ],
    },
    {
      slug: fr("X", 5),
      q: "Does a ball gown suit an X figure?",
      r: "Yes. The fullness starts from an already slim waist: the contrast happens by itself, without the dress having to force it. It simply needs room, and a venue that suits it.",
      description:
        "Ball-gown wedding dress and X figure: the fullness starts from an already slim waist, the contrast happens by itself. The ball gowns at MADAMOON.",
      chapo:
        "A ball gown needs a waist to exist. An X figure gives it one straight away.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "The bodice is fitted on an already slim waist, and the fullness starts from there. The contrast between waist and skirt happens by itself, with no heavy corset or construction.",
          ],
        },
        {
          titre: "What it needs",
          texte: [
            "Room, and a venue on its scale. A ball-gown skirt takes up space: think about the ceremony, the stairs, the whole day. A two-in-one lets you live both looks.",
          ],
        },
        {
          titre: "The boutique's ball gowns",
          texte: [
            "Kensington and Trinity, in off-the-shoulder mikado; Fern, in mikado embroidered with beaded flowers; Guinevere, in jacquard; Seraphina, by Olya Mak, in embroidered lace.",
          ],
        },
      ],
      aRetenir: [
        "Yes: the contrast happens by itself.",
        "It needs room.",
        "A venue on its scale.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Ball gowns" },
        { href: "/robes/kensington", label: "Kensington" },
        { href: "/robes/fern", label: "Fern" },
      ],
    },
    {
      slug: fr("X", 6),
      q: "How do I choose between a fitted dress and a full dress?",
      r: "By the venue, the day and what you want to feel. A fitted dress — mermaid, column — moves more freely and looks more modern; a full dress — ball gown — is more ceremonial and needs room. A two-in-one lets you live both.",
      description:
        "Fitted or full wedding dress: mermaid and column, or ball gown? The venue, the day and your style decide. Advice from the MADAMOON boutique.",
      chapo:
        "When the figure allows everything, the choice between fitted and full becomes a matter of the day, the venue and desire.",
      sections: [
        {
          titre: "The fitted dress",
          texte: [
            "Mermaid or column, it follows the body and lets you move freely. It goes anywhere, is easy to wear all day, and gives a more modern look.",
          ],
        },
        {
          titre: "The full dress",
          texte: [
            "A ball gown takes up space and marks the ceremony. It needs room — stairs, car, dance floor — and a venue that answers it.",
          ],
        },
        {
          titre: "Both at once",
          texte: [
            "A two-in-one brings both together: an overskirt for the ceremony, a fitted line for the evening. Tessa, Clover and Chastity are worn this way. A tip: try one dress from each family, one after the other; the comparison often decides by itself.",
          ],
        },
      ],
      aRetenir: [
        "Fitted: free and modern.",
        "Full: ceremonial, needs room.",
        "A two-in-one, for both.",
      ],
      liens: [
        { href: "/coupes/deux-en-un", label: "Two-in-one dresses" },
        { href: "/robes/tessa", label: "Tessa" },
        { href: "/coupes/princesse", label: "Ball gowns" },
      ],
    },
    {
      slug: fr("X", 7),
      q: "Which neckline should I choose for an X body shape?",
      r: "The one that is like you: with balanced proportions, no neckline needs to compensate. A V or a sweetheart extends the waist upwards; off-the-shoulder, square or high necklines are chosen by style and season.",
      description:
        "Neckline and X body shape: none needs to compensate. V, sweetheart, off the shoulder, square or high neck, by style and season. Advice from MADAMOON.",
      chapo:
        "On an X figure, the neckline has nothing to correct. It can be chosen for what it says about you.",
      sections: [
        {
          titre: "V and sweetheart",
          texte: [
            "They extend the slim waist upwards and shape the bust. Emerald, Monica and Livia have a V neckline; Finell, a sweetheart bodice.",
          ],
        },
        {
          titre: "Other options",
          texte: [
            "Off the shoulder, as on Kensington or Trinity; a square neck, as on Dolores or River; a high neck, as on Chastity; a draped neckline, as on Dove. None is to be avoided.",
          ],
        },
        {
          titre: "By style and season",
          texte: [
            "A high neck and sleeves for a winter wedding or a religious ceremony, bare shoulders for summer, a plunging V for an evening. The wedding decides.",
          ],
        },
      ],
      aRetenir: [
        "No neckline needs to compensate.",
        "V and sweetheart extend the waist.",
        "Style and season decide.",
      ],
      liens: [
        { href: "/robes/finell", label: "Finell" },
        { href: "/robes/dolores", label: "Dolores" },
        { href: "/robes/chastity", label: "Chastity" },
      ],
    },
    {
      slug: fr("X", 8),
      q: "How do I choose a wedding dress to suit the wedding's theme with an X body shape?",
      r: "Start from the venue, the season and the mood: as every silhouette suits you, they decide. A ball gown for a château, a sheath for a country ceremony, a minimalist dress for the town hall, and no long train on a beach.",
      description:
        "Choosing a wedding dress to suit the theme with an X body shape: château, countryside, town hall, beach, winter. Advice from MADAMOON.",
      chapo:
        "When every silhouette suits you, the wedding itself chooses the dress. Here is how to let it.",
      sections: [
        {
          titre: "The venue",
          texte: [],
          liste: [
            "A château or a grand hall — a mikado ball gown, like Kensington or Fern, or a mermaid with a long train, like Siddalee.",
            "A country ceremony — a sheath in lace or chiffon, like Murielle, Marie or Maribel.",
            "The town hall — a minimalist crêpe dress, like Milan, or a short dress, like Elin, designed for a civil wedding.",
            "A beach — a light fabric, and no two-metre train.",
          ],
        },
        {
          titre: "The season",
          texte: [
            "Heavy satin in August is hard to wear; sleeves and a high neck keep you warm in winter. The dress must last twelve hours, not just the photograph.",
          ],
        },
        {
          titre: "The day",
          texte: [
            "Think about what you want to be able to do: dance, walk, sit at the table. A two-in-one lets you change look between the ceremony and the evening.",
          ],
        },
      ],
      aRetenir: [
        "The venue, the season and the mood decide.",
        "A dress that lasts twelve hours.",
        "A two-in-one to change look.",
      ],
      liens: [
        { href: "/faq/robe-de-mariee-hiver", label: "A dress for a winter wedding" },
        { href: "/robes/elin", label: "Elin" },
        { href: "/robes/murielle", label: "Murielle" },
      ],
    },
    {
      slug: fr("X", 9),
      q: "Does a sheath dress suit a balanced figure?",
      r: "Yes. It builds nothing and does not need to: on a balanced figure, the line is enough, and the fabric only goes with it. It is often the most natural dress to wear.",
      description:
        "Sheath wedding dress and a balanced figure: it builds nothing and does not need to. How to choose it, and the sheath dresses at MADAMOON, Paris.",
      chapo:
        "The sheath is the dress that asks the least of the figure. On a balanced figure, it only has to follow.",
      sections: [
        {
          titre: "Why it works",
          texte: [
            "It builds nothing, and on a balanced figure it does not need to. The line is enough; the fabric only goes with it, from shoulder to hem.",
          ],
        },
        {
          titre: "What to look at",
          texte: [
            "The fabric, which makes the whole dress: matte satin falls clean, chiffon floats, lace adds decoration. A belt marks the slim waist if you wish.",
          ],
        },
        {
          titre: "The boutique's sheath dresses",
          texte: [
            "Dove, in matte satin with a draped neckline; Marie, with a timeless line; Murielle, in floral lace; Agnessa, with a V neckline and V back; Maribel, in stretch chiffon with a hand-embroidered bodice.",
          ],
        },
      ],
      aRetenir: [
        "Yes: the line is enough.",
        "The fabric makes the whole dress.",
        "A belt, if you want to mark the waist.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Sheath dresses" },
        { href: "/robes/agnessa", label: "Agnessa" },
        { href: "/robes/dove", label: "Dove" },
      ],
    },
    {
      slug: fr("X", 10),
      q: "Which details should I favour to show off a slim waist?",
      r: "A single well-placed detail: a belt, a pointed basque waist, a bodice that stops sharply at the waist, or a V neckline that extends the line. On a slim waist, restraint has more effect than accumulation.",
      description:
        "Showing off a slim waist: a belt, a basque waist, a clean bodice, a V neckline — one detail is enough. Advice and dresses from MADAMOON.",
      chapo:
        "A slim waist shows by itself. The right detail emphasises it; too many details drown it.",
      sections: [
        {
          titre: "The details that emphasise it",
          texte: ["In the boutique's catalogue:"],
          liste: [
            "a belt, as on Monica;",
            "a pointed basque waist, as on Guinevere or Santana;",
            "a worked bodice stopping sharply at the waist, as on Emerald;",
            "a V neckline that extends the line, as on Livia.",
          ],
        },
        {
          titre: "Restraint",
          texte: [
            "The X body shape calls for enhancing without overdoing it. One strong detail, on a dress with a clean cut, has more effect than three competing for attention.",
          ],
        },
        {
          titre: "The cut first",
          texte: [
            "A mermaid follows the waist, a ball gown starts from it: the cut itself already shows off a slim waist. The detail comes in addition, not instead.",
          ],
        },
      ],
      aRetenir: [
        "A single well-placed detail.",
        "Belt, basque waist, clean bodice, V.",
        "Restraint has more effect.",
      ],
      liens: [
        { href: "/robes/monica", label: "Monica" },
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/livia", label: "Livia" },
      ],
    },
    {
      slug: fr("X", 11),
      q: "Which silhouettes should I try first for an X body shape?",
      r: "One dress from each family, to compare: a mermaid, a ball gown and a sheath. All suit you; the fitting is mainly about discovering which one is like you, and which suits the venue and the season.",
      description:
        "X body shape: which silhouettes to try first? A mermaid, a ball gown and a sheath to compare, then style decides. Advice from MADAMOON.",
      chapo:
        "When every silhouette suits you, the fitting changes in nature: it is no longer about eliminating, but comparing.",
      sections: [
        {
          titre: "The order of fittings",
          texte: [],
          ordonnee: true,
          liste: [
            "A mermaid — the silhouette that says the most with the least.",
            "A ball gown — the contrast of a slim waist and a full skirt.",
            "A sheath — the line alone, accompanied by the fabric.",
            "Then an A-line or a two-in-one, depending on what the first three revealed.",
          ],
        },
        {
          titre: "Let style decide",
          texte: [
            "Here, the question is no longer \"what suits me?\" but \"what is like me?\". The venue, the season and what you want to live that day do the rest.",
          ],
        },
        {
          titre: "Coming prepared",
          texte: [
            "Keep your favourite dresses in your favourites and mention them when you book: they will be ready when you arrive.",
          ],
        },
      ],
      aRetenir: [
        "One dress from each family.",
        "Compare rather than eliminate.",
        "Style decides.",
      ],
      liens: [
        { href: "/coupes", label: "Silhouettes" },
        { href: "/morphologies/x", label: "The X body shape" },
        { href: "/rendez-vous", label: "Book an appointment" },
      ],
    },
  ],
};
