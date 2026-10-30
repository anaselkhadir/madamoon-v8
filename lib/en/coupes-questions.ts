import { MAISON } from "@/lib/madamoon";
import { QUESTIONS_COUPES, type QuestionCoupe } from "@/lib/coupes-questions";

/*
 * The silhouette questions, in English.
 *
 * Same order, same addresses, same facts as the French table: what the
 * dresses' own pages say, nothing more. We translate, we do not embellish.
 */

const fr = (ancre: string, i: number) => QUESTIONS_COUPES[ancre][i].slug;

export const QUESTIONS_COUPES_EN: Record<string, QuestionCoupe[]> = {
  sirene: [
    {
      slug: fr("sirene", 0),
      q: "What is a mermaid wedding dress?",
      r: "A dress fitted to the thighs, then flared to the floor. It hugs the bust, waist and hips, shaping the figure before opening into a skirt that often ends in a train. It is the most feminine and sensual silhouette in the catalogue.",
      description:
        "What is a mermaid wedding dress? Fitted to the thighs then flared, it shapes the waist and hips. Definition, and the mermaid dresses at MADAMOON, Paris.",
      chapo:
        "Feminine and sensual: the mermaid is the silhouette that shapes the figure the most. Here is what defines it.",
      sections: [
        {
          titre: "A line in two movements",
          texte: [
            "A mermaid is fitted to the thighs, then flared. In its upper part, it follows the bust, waist and hips; below the thighs, the skirt opens and falls to the floor, often extended by a train.",
          ],
        },
        {
          titre: "What it does to the figure",
          texte: [
            "It shapes the waist and hips. On an already curvy figure, it follows; on a straighter figure, it creates the curve as it flares.",
          ],
        },
        {
          titre: "The boutique's mermaid dresses",
          texte: [
            "It is the most represented silhouette in the catalogue, from Casablanca Bridal, Watters Designs, Monica Loretti and Olya Mak: in matte satin like Sheridan or Venus, in lace like Oksana or Summer, in crêpe like Mira or Bondi, in charmeuse like Riviera.",
          ],
        },
      ],
      aRetenir: [
        "Fitted to the thighs, then flared.",
        "It shapes the waist and hips.",
        "Feminine and sensual.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/robes/sheridan", label: "Sheridan" },
        { href: "/robes/oksana", label: "Oksana" },
      ],
    },
    {
      slug: fr("sirene", 1),
      q: "Which body shape does a mermaid wedding dress suit?",
      r: "It is among the first silhouettes to try for H, 8 and X body shapes, and worth trying for an O body shape with a fabric that holds. For an A body shape, it is worn very well with a top that balances. No body shape rules it out.",
      description:
        "Mermaid wedding dress: which body shapes does it suit? First for H, 8 and X, worth trying for O and A. Advice from the MADAMOON boutique.",
      chapo:
        "The mermaid is said to be reserved for hourglass figures. That is not true: here is who it suits, and on what condition.",
      sections: [
        {
          titre: "The body shapes for which it comes first",
          texte: [],
          liste: [
            "H — it creates the curve instead of looking for it; chosen light, it lengthens the line.",
            "8 — it hugs an already proportioned line, without correcting anything.",
            "X — it follows the waist without having to create it: the silhouette that says the most with the least.",
          ],
        },
        {
          titre: "Those for which it is worth trying",
          texte: [
            "For an O, it needs a fabric that holds — crêpe rather than a light satin — and is judged far better in the fitting room than in a photograph. For an A, it is worn very well if the top has something to balance with: a sleeve, a wide strap, a worked neckline.",
          ],
        },
        {
          titre: "None rules it out",
          texte: [
            "A body shape never rules a dress out: it only tells you where to start. Many brides leave with a mermaid they had not planned to try.",
          ],
        },
      ],
      aRetenir: [
        "First: H, 8 and X body shapes.",
        "Worth trying: O and A, on certain conditions.",
        "No body shape rules it out.",
      ],
      liens: [
        { href: "/morphologies/h/robe-sirene-morphologie-h", label: "The mermaid and the H body shape" },
        { href: "/morphologies/o/robe-sirene-morphologie-o", label: "The mermaid and the O body shape" },
        { href: "/morphologies", label: "The six body shapes" },
      ],
    },
    {
      slug: fr("sirene", 2),
      q: "What is the difference between a mermaid dress and a column dress?",
      r: "Both are fitted and follow the body. The mermaid flares below the thighs, into a skirt that opens to the floor; the column falls straight, or nearly so, without flaring. In the catalogue, column dresses are filed with the mermaids.",
      description:
        "Mermaid or column dress: both fitted, the mermaid flares below the thighs, the column falls straight. The difference, and the MADAMOON models.",
      chapo:
        "They are cousins: the same start, two different endings. Here is what sets them apart.",
      sections: [
        {
          titre: "What they share",
          texte: [
            "Both are fitted: they follow the bust, waist and hips, without fullness. They need a fabric that falls well and a precise fit.",
          ],
        },
        {
          titre: "What sets them apart",
          texte: [],
          liste: [
            "The mermaid — it flares below the thighs, into a skirt that opens to the floor.",
            "The column — it falls straight or nearly so, without flaring, keeping the line of the body to the bottom.",
          ],
        },
        {
          titre: "In the catalogue",
          texte: [
            "The boutique files its column dresses with the mermaids. Siddalee and Rowan, by Watters Designs, are column dresses; Bella, by Casablanca Bridal, can be worn as a mermaid or a column; Amaryllis, as a straight cut or a mermaid.",
          ],
        },
      ],
      aRetenir: [
        "Both are fitted.",
        "The mermaid flares below the thighs.",
        "The column falls straight.",
      ],
      liens: [
        { href: "/robes/siddalee", label: "Siddalee" },
        { href: "/robes/bella", label: "Bella" },
        { href: "/morphologies/8/robe-fourreau-silhouette-8", label: "The column and the 8 body shape" },
      ],
    },
    {
      slug: fr("sirene", 3),
      q: "What is the difference between a mermaid dress and a trumpet dress?",
      r: "Both are fitted then flared. The difference lies in where the skirt opens: lower for the mermaid, around the knee; higher for the trumpet, around mid-thigh, which makes it easier to wear. The boutique files both lines under mermaid.",
      description:
        "Mermaid or trumpet dress: the skirt opens around the knee for the mermaid, higher for the trumpet, easier to wear. The difference explained.",
      chapo:
        "Mermaid, trumpet, fit-and-flare: three names for one family. What changes is where the skirt opens.",
      sections: [
        {
          titre: "The flare point",
          texte: [
            "The mermaid stays fitted longer and flares lower, around the knee: the effect is spectacular, and the stride more contained. The trumpet opens higher, around mid-thigh: the skirt takes its fullness earlier, and the dress lets you move more.",
          ],
        },
        {
          titre: "Which to choose",
          texte: [
            "If you love the most sculpted line, the mermaid. If you want to dance all night without thinking about it, a skirt that opens higher. Both are judged at the fitting, while walking.",
          ],
        },
        {
          titre: "In the catalogue",
          texte: [
            "The boutique has no \"trumpet\" category: these lines are filed with the mermaids. Several pages speak of a fit-and-flare cut, like Sheridan's or Enid's. The exact point where each skirt opens shows in the fitting room.",
          ],
        },
      ],
      aRetenir: [
        "Mermaid: the skirt opens around the knee.",
        "Trumpet: higher, around mid-thigh.",
        "Both are filed as mermaid in the catalogue.",
      ],
      liens: [
        { href: "/coupes/sirene", label: "Mermaid dresses" },
        { href: "/robes/enid", label: "Enid" },
        { href: "/robes/sheridan", label: "Sheridan" },
      ],
    },
    {
      slug: fr("sirene", 4),
      q: "Is a mermaid dress comfortable for walking and dancing?",
      r: "Yes, if it is well chosen and well fitted. A slit, a stretch fabric or a skirt that opens a little higher let you walk and dance freely. The surest way is to check at the fitting, by really moving.",
      description:
        "Mermaid wedding dress and comfort: a slit, a stretch fabric, a good fit for walking and dancing. Advice and mermaid dresses from MADAMOON, Paris.",
      chapo:
        "The mermaid is said to restrict movement. Well chosen and well fitted, it can be danced in all night.",
      sections: [
        {
          titre: "What lets you move",
          texte: [],
          liste: [
            "A slit — Bondi's, high on the thigh, \"makes movement easier\", says its page; Mira, Milan, Charlize, Shiloh and Zina have one too.",
            "A stretch fabric — Sheridan has a stretch lining, Zina is in stretch georgette.",
            "A skirt that opens a little higher — the stride is freer.",
          ],
        },
        {
          titre: "The fit",
          texte: [
            "A mermaid that is too tight restricts; well fitted, it follows. At MADAMOON, the dress is fitted on you by the seamstresses up to the last fitting, alterations included.",
          ],
        },
        {
          titre: "Check it in the fitting room",
          texte: [
            "A tip: walk, climb a step, sit down, take a few dance steps. A dress that bothers you in the fitting room will bother you all day.",
          ],
        },
      ],
      aRetenir: [
        "Yes, well chosen and well fitted.",
        "A slit or a stretch fabric helps.",
        "Really move at the fitting.",
      ],
      liens: [
        { href: "/robes/bondi", label: "Bondi" },
        { href: "/robes/zina", label: "Zina" },
        { href: "/robes/sheridan", label: "Sheridan" },
      ],
    },
    {
      slug: fr("sirene", 5),
      q: "How do I sit down and move in a mermaid wedding dress?",
      r: "Sit on the edge of the seat, lifting the skirt slightly; walk with slightly shorter steps; on stairs, lift the front of the skirt. If the dress has a train, ask the boutique how to wear it in the evening.",
      description:
        "Sitting and moving in a mermaid wedding dress: on the edge of the seat, with small steps, the skirt lifted on stairs. Practical advice from MADAMOON.",
      chapo:
        "A few simple gestures, and a mermaid is lived in all day without a thought. Here they are.",
      sections: [
        {
          titre: "Sitting down",
          texte: [
            "A tip: sit on the edge of the seat rather than at the back, with a straight back, lifting the skirt slightly at the knees. The fabric does not pull, and the dress does not crease.",
          ],
        },
        {
          titre: "Walking and climbing stairs",
          texte: [
            "Walk with slightly shorter steps than usual: a mermaid is fitted to the thighs. On stairs, lift the front of the skirt with one hand, so as not to step on it.",
          ],
        },
        {
          titre: "The train",
          texte: [
            "Many mermaids extend into a train — those of Venus, Summer and Siddalee are long. For the evening, ask the boutique how to lift or carry it, at the time of the alterations.",
          ],
        },
      ],
      aRetenir: [
        "On the edge of the seat, the skirt slightly lifted.",
        "Slightly shorter steps.",
        "The train: to discuss with the boutique.",
      ],
      liens: [
        { href: "/coupes/sirene/robe-sirene-confortable-marcher-danser", label: "Comfort in a mermaid dress" },
        { href: "/robes/venus", label: "Venus" },
        { href: "/robes/summer", label: "Summer" },
      ],
    },
    {
      slug: fr("sirene", 6),
      q: "Which neckline should I choose with a mermaid dress?",
      r: "The one that answers your figure and the style of the dress: a sweetheart to soften, a V or plunging neckline to lengthen, a straight neckline or bare shoulders to widen the shoulders, a drape for softness. A mermaid goes with all of them.",
      description:
        "Which neckline for a mermaid dress: sweetheart, V, plunging, straight, off the shoulder, draped. How to choose, with the mermaid dresses at MADAMOON.",
      chapo:
        "A mermaid shapes the lower figure; the neckline decides the top. Here is how to match them.",
      sections: [
        {
          titre: "The catalogue's necklines",
          texte: [],
          liste: [
            "Sweetheart — Meredith, Ariel; as a pointed sweetheart, more graphic, Sheridan and Oksana.",
            "V and plunging — Summer, Bondi; Aleida, plunging, between fine straps; Mira, deep.",
            "Straight and off the shoulder — Enid, worn strapless or with a Bardot neckline.",
            "Draped — Rowan; Milan, draped at the bust.",
          ],
        },
        {
          titre: "By your figure",
          texte: [
            "A V or a sweetheart opens the bust and lengthens the neck, for a generous bust. Bare shoulders or a straight neckline widen the shoulders, for an A body shape. With balanced proportions, nothing needs compensating.",
          ],
        },
        {
          titre: "By style",
          texte: [
            "A plunging neckline for a sensual mermaid, a Bardot neckline for a more classic look, detachable straps — as on Ariel or Siddalee — to change look between the ceremony and the evening.",
          ],
        },
      ],
      aRetenir: [
        "A mermaid goes with every neckline.",
        "V and sweetheart open the bust.",
        "Bare shoulders and straight necklines widen the shoulders.",
      ],
      liens: [
        { href: "/robes/meredith", label: "Meredith" },
        { href: "/robes/enid", label: "Enid" },
        { href: "/robes/aleida", label: "Aleida" },
      ],
    },
    {
      slug: fr("sirene", 7),
      q: "Which fabric should I choose for a mermaid dress?",
      r: "A fabric that holds and smooths the figure: crêpe and matte satin first, charmeuse for a softer fall, lace for decoration. A stretch version adds comfort.",
      description:
        "Which fabric for a mermaid wedding dress: crêpe, matte satin, charmeuse, lace, stretch versions. How to choose, with the mermaid dresses at MADAMOON.",
      chapo:
        "A mermaid hugs the body: its fabric shows more than in any other silhouette. Here is how to choose it.",
      sections: [
        {
          titre: "Fabrics that hold",
          texte: [
            "Crêpe smooths the figure and falls straight — Mira, Milan, Bondi, Elin. Matte satin gives hold and a soft light — Sheridan, Venus, Montana, Ariel. Neoprene, more structured still, sculpts the line — Enid.",
          ],
        },
        {
          titre: "Softer fabrics",
          texte: [
            "Charmeuse, fluid and luminous, follows the body closely — Riviera, Rowan, Amaryllis. Zina's stretch georgette combines suppleness and comfort.",
          ],
        },
        {
          titre: "Lace",
          texte: [
            "Laid on a mermaid, it adds decoration without changing the line: Chantilly lace for Oksana and Shiloh, Alençon lace for Summer, raised lace for Meredith.",
          ],
        },
      ],
      aRetenir: [
        "Crêpe and matte satin: hold.",
        "Charmeuse: a softer fall.",
        "Lace: decoration.",
      ],
      liens: [
        { href: "/robes/mira", label: "Mira" },
        { href: "/robes/venus", label: "Venus" },
        { href: "/robes/riviera", label: "Riviera" },
      ],
    },
    {
      slug: fr("sirene", 8),
      q: "Is a mermaid dress suitable for a civil wedding?",
      r: "Yes. A minimalist mermaid in crêpe or satin, without a long train, has every place at the town hall. Some are even designed for it, like Elin, by Olya Mak, short and in crêpe.",
      description:
        "Mermaid wedding dress for a civil wedding: minimalist, in crêpe or satin, without a long train. The MADAMOON mermaid dresses for the town hall, Paris.",
      chapo:
        "The town hall does not call for a less beautiful dress, but for a simpler one to live in. A mermaid can be that.",
      sections: [
        {
          titre: "A mermaid designed for the town hall",
          texte: [
            "Elin, by Olya Mak, is a short crêpe dress designed for a civil wedding: a pared-back line that goes to the essential.",
          ],
        },
        {
          titre: "Minimalist mermaids",
          texte: [
            "Milan, by Monica Loretti, in light crêpe; Bondi and Enid, by Casablanca Bridal, minimalist. Without a long train or volume, they are easy to wear in a town hall, then in town.",
          ],
        },
        {
          titre: "Two ceremonies, two looks",
          texte: [
            "If the town hall precedes a religious ceremony or a reception, a dress that changes look can serve both: Mira can come with a detachable tulle skirt, Tessa with a detachable overskirt.",
          ],
        },
      ],
      aRetenir: [
        "Yes: a minimalist mermaid belongs at the town hall.",
        "Elin is designed for a civil wedding.",
        "A detachable skirt for two ceremonies.",
      ],
      liens: [
        { href: "/robes/elin", label: "Elin" },
        { href: "/robes/milan", label: "Milan" },
        { href: "/robes/mira", label: "Mira" },
      ],
    },
    {
      slug: fr("sirene", 9),
      q: "How do I choose a mermaid dress with lace?",
      r: "Look at three things: the lace itself — Chantilly, Alençon, raised —, where it is placed — the whole dress, the bodice, the back or the train —, and how it ends, often scalloped at the bottom of the skirt.",
      description:
        "Choosing a lace mermaid dress: Chantilly, Alençon or raised, all over or on the back, scalloped at the hem. The lace mermaid dresses at MADAMOON.",
      chapo:
        "Not all lace tells the same story. On a mermaid, which hugs the body, it shows all the more.",
      sections: [
        {
          titre: "The lace itself",
          texte: [
            "Chantilly lace is fine and supple — Oksana, Shiloh, Charlize. Alençon lace, more defined, has a delicate relief — Summer. Raised lace, more marked, sculpts the dress — Meredith. Fancy and Aleida play sparkling laces.",
          ],
        },
        {
          titre: "Where it is placed",
          texte: [
            "All over, it dresses the whole figure, as on Uma or Fancy. On the back, it creates a surprise — Venus has a lace back, Montana an illusion back. On the train, it extends the dress — Aleida's is in scalloped lace.",
          ],
        },
        {
          titre: "After the wedding",
          texte: [
            "Lace is the most delicate fabric on a dress. A specialist dry cleaner and storing it flat keep it beautiful for a long time.",
          ],
        },
      ],
      aRetenir: [
        "Chantilly, Alençon or raised.",
        "All over, on the back or on the train.",
        "A delicate fabric, to look after.",
      ],
      liens: [
        { href: "/robes/summer", label: "Summer" },
        { href: "/robes/meredith", label: "Meredith" },
        { href: "/faq/entretenir-robe-de-mariee-dentelle", label: "Caring for a lace dress" },
      ],
    },
    {
      slug: fr("sirene", 10),
      q: "Is a mermaid dress with sleeves possible?",
      r: "Yes. Long sleeves in lace or satin, or detachable sleeves you remove for the evening: several mermaids in the catalogue have them. They balance the upper body and can be worn in any season.",
      description:
        "Mermaid wedding dress with sleeves: long in lace or satin, or detachable. The MADAMOON mermaids with sleeves — Montana, Bella, Riviera — in Paris.",
      chapo:
        "A mermaid with sleeves combines the most sculpted line with a more covered look. The catalogue has several.",
      sections: [
        {
          titre: "Long sleeves",
          texte: [
            "Montana, by Casablanca Bridal, in matte satin, has long lace sleeves and an illusion back. Bella, in satin with pearls, pairs long sleeves with an open back.",
          ],
        },
        {
          titre: "Detachable sleeves",
          texte: [
            "Riviera, by Watters Designs, in charmeuse, has detachable sleeves, and both its bodice and sleeves are adorned with pearls: with sleeves for the ceremony, without for the evening.",
          ],
        },
        {
          titre: "What they bring",
          texte: [
            "They balance the upper body — useful for an A body shape — and dress a winter wedding or a religious ceremony.",
          ],
        },
      ],
      aRetenir: [
        "Yes: several mermaids have them.",
        "Long or detachable.",
        "They balance the upper body.",
      ],
      liens: [
        { href: "/robes/montana", label: "Montana" },
        { href: "/robes/riviera", label: "Riviera" },
        { href: "/faq/robe-de-mariee-hiver", label: "A dress for a winter wedding" },
      ],
    },
    {
      slug: fr("sirene", 11),
      q: "How do I accessorise a mermaid wedding dress?",
      r: "With restraint: a mermaid already shapes the figure. A veil, a cape or jewellery, but rarely all at once. Some mermaids have their own pieces — Sheridan's matching cape, Oksana's detachable pearl chains, Zina's optional 3D flowers.",
      description:
        "Accessorising a mermaid wedding dress: veil, cape, jewellery, with restraint. The pieces of the MADAMOON mermaids — Sheridan's cape, Oksana's pearls.",
      chapo:
        "A mermaid is already a statement. The accessory extends it — as long as it does not compete with it.",
      sections: [
        {
          titre: "The dresses' own pieces",
          texte: [],
          liste: [
            "Sheridan — an asymmetric pleated tulle cape, adorned with the same lace as the dress.",
            "Oksana — detachable pearl and sequin chains on the neckline, and detachable beaded straps.",
            "Zina — handmade 3D flowers, optional.",
            "Ariel, Siddalee — detachable straps.",
          ],
        },
        {
          titre: "The veil",
          texte: [
            "A tip: match its length to the train. A long veil extends a mermaid with a train; a short veil lets the back show, often worked on a mermaid.",
          ],
        },
        {
          titre: "Jewellery",
          texte: [
            "With a neckline loaded with pearls or lace, earrings are enough. With a minimalist mermaid, a bolder piece can carry the whole look.",
          ],
        },
      ],
      aRetenir: [
        "With restraint: a mermaid is enough on its own.",
        "Some dresses have their own pieces.",
        "A veil matched to the train.",
      ],
      liens: [
        { href: "/robes/sheridan", label: "Sheridan" },
        { href: "/robes/oksana", label: "Oksana" },
        { href: "/robes/zina", label: "Zina" },
      ],
    },
  ],
  princesse: [
    {
      slug: fr("princesse", 0),
      q: "What is a ball gown wedding dress?",
      r: "A dress with a fitted bodice, often built as a corset, from which a full skirt falls to the floor. It is the silhouette of the ball gown: a defined waist and an assumed volume. The boutique calls it refined and stately.",
      description:
        "What is a ball gown wedding dress? A crafted corset, a defined waist, a full skirt to the floor. Definition, and the ball gowns at MADAMOON, Paris.",
      chapo:
        "Refined and stately: the ball gown is the bride's evening gown. Here is what defines it.",
      sections: [
        {
          titre: "A bodice, then the volume",
          texte: [
            "The top is fitted: a strapless bodice or a corset that follows the bust and defines the waist. From the waist — or from a basque or dropped waist, which sits a little lower — falls a full skirt that widens to the floor and often ends in a train.",
          ],
        },
        {
          titre: "What it does to the figure",
          texte: [
            "It slims the waist by contrast with the fullness of the skirt, and it entirely covers the hips and legs. It is the silhouette of formal ceremonies and grand venues.",
          ],
        },
        {
          titre: "The boutique's ball gowns",
          texte: [
            "From Casablanca Bridal, Guinevere in jacquard, Kensington in mikado, Addison in silk satin, Santana in tulle and organza; from Watters Designs, Clover in Caterina lace, Ember in Dupioni, Fern and Trinity in mikado; from Olya Mak, Seraphina in hand-embroidered lace.",
          ],
        },
      ],
      aRetenir: [
        "A fitted bodice, a full skirt.",
        "The waist defined by contrast.",
        "Refined and stately.",
      ],
      liens: [
        { href: "/coupes/princesse", label: "Ball gown dresses" },
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/kensington", label: "Kensington" },
      ],
    },
    {
      slug: fr("princesse", 1),
      q: "Which body shape does a ball gown suit?",
      r: "It is one of the first silhouettes to try for the A, V, 8 and X body shapes. For an O or H body shape, it comes second, and is worth trying. No body shape rules it out: it all comes down to the bodice and the volume of the skirt.",
      description:
        "Ball gown wedding dress: which body shapes does it suit? First for A, V, 8 and X, worth trying for O and H. Advice from the MADAMOON boutique.",
      chapo:
        "The ball gown suits more figures than people think. Here is who it comes first for, and why.",
      sections: [
        {
          titre: "The body shapes it comes first for",
          texte: [],
          liste: [
            "A — its crafted bodice draws the eye upwards, and the skirt answers the hips without marking them.",
            "V — the full skirt adds volume below and balances broader shoulders.",
            "8 — the bodice cinches at the waist and the fullness starts there: the contrast is clear.",
            "X — the fullness starts from an already slim waist, without the dress having to force it.",
          ],
        },
        {
          titre: "The ones it is worth trying for",
          texte: [
            "For an O, choose a lighter skirt and a V or sweetheart neckline, which flatters the bust. For an H, a corset and a basque waist draw the waist the figure does not mark.",
          ],
        },
        {
          titre: "In the catalogue",
          texte: [
            "Several of the boutique's ball gowns — Addison, Clover, Ember, Kensington, Livia, Seraphina — are listed, on their pages, for all six body shapes. The fitting decides.",
          ],
        },
      ],
      aRetenir: [
        "First for A, V, 8 and X.",
        "Worth trying for O and H.",
        "The bodice and the volume make the difference.",
      ],
      liens: [
        { href: "/morphologies/a/robe-princesse-morphologie-a", label: "The ball gown and the A body shape" },
        { href: "/morphologies/8/robe-princesse-morphologie-8", label: "The ball gown and the 8 body shape" },
        { href: "/morphologies", label: "The six body shapes" },
      ],
    },
    {
      slug: fr("princesse", 2),
      q: "What is the difference between a ball gown and an A-line dress?",
      r: "Both have a fitted bodice and a skirt that widens. The A-line opens in an A, evenly, without excessive fullness; the ball gown defines the waist with a corset and carries a real volume of skirt. Several dresses in the catalogue sit between the two.",
      description:
        "Ball gown or A-line: the A-line opens in an A, the ball gown defines the waist and carries volume. The difference, and the MADAMOON dresses in Paris.",
      chapo:
        "They share the same start, a fitted bodice. What sets them apart is the skirt.",
      sections: [
        {
          titre: "What they share",
          texte: [
            "A fitted top and a skirt that widens towards the floor: neither follows the hips and thighs, unlike a mermaid.",
          ],
        },
        {
          titre: "What sets them apart",
          texte: [],
          liste: [
            "The A-line — the skirt opens in an A, in a straight line from the waist. The boutique considers it the most universal silhouette.",
            "The ball gown — a crafted corset, a defined waist and a full skirt with assumed volume: the silhouette of an evening gown.",
          ],
        },
        {
          titre: "Between the two",
          texte: [
            "Hayes, Sienna and Charlotte are described in the catalogue as \"ball gown or A-line\" dresses: the volume of their skirt puts them on the border. The fitting room shows which way they lean on you.",
          ],
        },
      ],
      aRetenir: [
        "A-line: a skirt that opens in an A.",
        "Ball gown: real volume, a defined waist.",
        "Some dresses sit between the two.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "A-line dresses" },
        { href: "/robes/hayes", label: "Hayes" },
        { href: "/robes/charlotte", label: "Charlotte" },
      ],
    },
    {
      slug: fr("princesse", 3),
      q: "Is a ball gown suitable for petite brides?",
      r: "Yes, provided the volume is in proportion. A less wide skirt, a light fabric such as tulle or organza, a V neckline or a pointed basque waist lengthen the figure. And the length is set to you, at the alterations.",
      description:
        "Ball gown wedding dress for petite brides: proportioned volume, light fabrics, a V neckline to lengthen. Advice from MADAMOON, Paris.",
      chapo:
        "A ball gown is not reserved for tall figures. It simply asks for volume on your scale.",
      sections: [
        {
          titre: "Proportion the volume",
          texte: [
            "This is the main advice: a skirt whose fullness stays in proportion to your height. A very wide, very structured skirt can overwhelm a petite figure; a more measured fullness lets it breathe.",
          ],
        },
        {
          titre: "What lengthens",
          texte: [],
          liste: [
            "A V neckline — Livia, Amandine, Santana: it elongates the bust.",
            "A pointed basque waist — Guinevere, Santana: it extends the line downwards.",
            "Airy fabrics — tulle and organza give volume without weight.",
          ],
        },
        {
          titre: "The length",
          texte: [
            "After the fitting, the boutique takes your measurements to begin making the dress, and its seamstresses adjust it on site. A tip: come to your fittings in your wedding-day shoes, as the length is set to them.",
          ],
        },
      ],
      aRetenir: [
        "Yes, with volume on your scale.",
        "The V and the basque waist lengthen.",
        "The length is set to you.",
      ],
      liens: [
        { href: "/robes/livia", label: "Livia" },
        { href: "/robes/santana", label: "Santana" },
        { href: "/faq/duree-retouches-robe-de-mariee", label: "How long alterations take" },
      ],
    },
    {
      slug: fr("princesse", 4),
      q: "How do you choose the skirt volume of a ball gown?",
      r: "Based on three things: your figure, the venue and the day you want to live. The fabric decides too: mikado or jacquard hold a structured volume, tulle and organza an airy one. The surest way is to try two different fullnesses.",
      description:
        "Choosing the skirt volume of a ball gown wedding dress: figure, venue, fabric. Structured mikado or airy tulle, advice from MADAMOON in Paris.",
      chapo:
        "Volume makes the ball gown. It is chosen like a silhouette: to your figure, your venue, your day.",
      sections: [
        {
          titre: "The fabric makes the volume",
          texte: [],
          liste: [
            "Structured — Livia's mikado, \"a skirt that stands on its own\", or Kensington's, which brings structure and volume.",
            "Textured — Guinevere's floral jacquard, for an evening-gown skirt.",
            "Airy — Santana's tulle and organza, a voluminous yet light skirt.",
            "Full and light — Ember's skirt, in Dupioni, or Seraphina's, voluminous while keeping \"an airy lightness\".",
          ],
        },
        {
          titre: "The venue and the day",
          texte: [
            "A tip: a large volume unfolds in a reception hall, a château, a church; it needs more room in a town hall, a car or on a busy dance floor. Think of the whole day, not just the entrance.",
          ],
        },
        {
          titre: "To your figure",
          texte: [
            "For a petite figure, a measured fullness; for broad shoulders, a generous skirt that rebalances. In the fitting room, compare two volumes: the difference shows at once.",
          ],
        },
      ],
      aRetenir: [
        "The fabric makes the volume.",
        "Think of the venue and the whole day.",
        "Try two fullnesses.",
      ],
      liens: [
        { href: "/robes/livia", label: "Livia" },
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/kensington", label: "Kensington" },
      ],
    },
    {
      slug: fr("princesse", 5),
      q: "Is a ball gown comfortable to dance in?",
      r: "Yes, if it fits well and its volume lets you move. A light skirt is easier to wear than a very structured one, and a train is easier bustled. The bodice must hold without hindering: check it at the fitting, by really moving.",
      description:
        "Ball gown wedding dress and dancing: a bodice that holds without squeezing, a light skirt, a bustled train. Advice from the MADAMOON boutique, Paris.",
      chapo:
        "A ball gown does not stop you dancing. It asks you to choose the dress for the evening as much as for the ceremony.",
      sections: [
        {
          titre: "The bodice",
          texte: [
            "A structured bodice holds the dress: it carries the weight of the skirt. Clover's, according to its page, \"provides good support\". It must also let you raise your arms and breathe: at the fitting, make the gestures of the evening.",
          ],
        },
        {
          titre: "The skirt",
          texte: [
            "The lighter it is, the better it follows movement. Ember's skirt is described as \"full and light\"; Seraphina's keeps \"an airy lightness\". A very structured skirt, in mikado, wears beautifully but weighs more.",
          ],
        },
        {
          titre: "The train",
          texte: [
            "A tip: ask in the fitting room how the train is bustled or hooked up for the evening. A long train, like Kensington's two metres, is worn for the entrance, not for the dance floor.",
          ],
        },
      ],
      aRetenir: [
        "A bodice that holds without squeezing.",
        "A light skirt follows movement.",
        "The train is bustled for dancing.",
      ],
      liens: [
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/robes/ember", label: "Ember" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },
    {
      slug: fr("princesse", 6),
      q: "Which bodice goes with a ball gown skirt?",
      r: "The one that flatters your bust and balances the volume of the skirt. A sweetheart bodice, a V neckline, a square neckline, off-the-shoulder or long sleeves: the catalogue has each. A basque or dropped waist extends the bodice and slims the line.",
      description:
        "Which bodice for a ball gown wedding dress? Sweetheart, V, square, off-the-shoulder, long sleeves, basque waist. The MADAMOON ball gowns, Paris.",
      chapo:
        "The skirt makes the volume; the bodice makes the character. Here are the options, dress by dress.",
      sections: [
        {
          titre: "The necklines",
          texte: [],
          liste: [
            "Sweetheart — Guinevere, plunging and pointed; Hayes, reinterpreted; Ember, accented with a V cut-out.",
            "V — Livia, a clean V; Amandine, plunging; Santana, on fine straps.",
            "Square — Clover, in Caterina lace.",
            "Off-the-shoulder — Kensington, beaded down to the sleeves; Trinity.",
          ],
        },
        {
          titre: "Sleeves and straps",
          texte: [
            "Seraphina, by Olya Mak, pairs a sheer bodice with long sleeves and an open back. Addison has removable off-the-shoulder straps: worn or not.",
          ],
        },
        {
          titre: "The waistline",
          texte: [
            "The basque waist, which dips to a point below the waist, extends the bodice: Guinevere, Santana. So does the dropped waist: Ember, Clover. They slim the line and start the volume a little lower. A tip: an ornate bodice calls for a plain skirt, and vice versa.",
          ],
        },
      ],
      aRetenir: [
        "The bodice makes the character.",
        "Sweetheart, V, square or off-the-shoulder.",
        "The basque waist slims the line.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },
    {
      slug: fr("princesse", 7),
      q: "What is the difference between a strapless bodice and a corset on a ball gown?",
      r: "Strapless describes a shape: a top with no straps or sleeves, ending above the bust. Corset describes a construction: a structured bodice, often boned, that shapes the waist. A dress can be both, like Guinevere and its strapless corset.",
      description:
        "Strapless bodice or corset on a ball gown wedding dress: one is a shape without straps, the other a structure that shapes the waist. The difference explained.",
      chapo:
        "Two words often confused. One says what you see, the other what holds the dress.",
      sections: [
        {
          titre: "Strapless, a shape",
          texte: [
            "A top with no straps or sleeves, leaving the shoulders and arms bare. It holds through its structure and its fit. Hayes, Sienna and Charlotte are strapless with a sweetheart neckline.",
          ],
        },
        {
          titre: "The corset, a construction",
          texte: [
            "A structured bodice, often boned, that shapes the waist and carries the weight of the skirt. It can have straps or sleeves. Ember has a corset \"that structures the figure\"; Clover, a structured bodice that \"provides good support\".",
          ],
        },
        {
          titre: "Both at once",
          texte: [
            "Guinevere combines the two: a strapless corset with a plunging sweetheart neckline, extended by a basque waist. So does Charlotte, with its basque-waist corset. At the fitting, check that the top holds on its own when you raise your arms.",
          ],
        },
      ],
      aRetenir: [
        "Strapless is a shape: no straps.",
        "A corset is a structure: it shapes the waist.",
        "A dress can be both.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/ember", label: "Ember" },
        { href: "/coupes/princesse/corsage-robe-princesse", label: "Which bodice to choose" },
      ],
    },
    {
      slug: fr("princesse", 8),
      q: "How do you keep a ball gown from looking too imposing?",
      r: "By playing on three things: a skirt of measured fullness, a light fabric such as tulle or organza, and a bodice that balances the skirt. A moderate train also lightens the figure. And some dresses, between ball gown and A-line, are worth comparing in the fitting room.",
      description:
        "A ball gown wedding dress without excess: measured volume, light tulle, a balancing bodice, a moderate train. Advice and dresses from MADAMOON in Paris.",
      chapo:
        "You can love the ball gown without wanting to disappear into it. Here is how to keep the look and lighten the rest.",
      sections: [
        {
          titre: "Lighten the skirt",
          texte: [
            "A measured fullness rather than the maximum, and an airy fabric: tulle and organza give volume without mass. A plain skirt, like Addison's in silk satin, keeps the line clean.",
          ],
        },
        {
          titre: "Balance the top",
          texte: [
            "A tip: when the skirt is generous, a simpler bodice lets it breathe, and a V neckline or bare shoulders open up the figure. A moderate train, rather than a cathedral train, lightens the whole further.",
          ],
        },
        {
          titre: "Between two silhouettes",
          texte: [
            "Hayes, Sienna and Charlotte, described as \"ball gown or A-line\", sit on the border between the two. Try them next to a fuller ball gown, to compare.",
          ],
        },
      ],
      aRetenir: [
        "Measured fullness, a light fabric.",
        "A bodice that balances the skirt.",
        "Compare with a ball gown A-line.",
      ],
      liens: [
        { href: "/robes/hayes", label: "Hayes" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/coupes/princesse/choisir-volume-jupe-robe-princesse", label: "Choosing the skirt volume" },
      ],
    },
    {
      slug: fr("princesse", 9),
      q: "Does a ball gown suit an outdoor wedding?",
      r: "Yes, with a few precautions. A light skirt in tulle or organza wears better than a very heavy one, and a short or bustled train avoids grass and gravel. Think of the ground, the season and the distance to cover.",
      description:
        "Ball gown wedding dress outdoors: a light skirt, a short or bustled train, a fabric suited to the ground. Advice from MADAMOON, Paris.",
      chapo:
        "A garden, a courtyard, an estate: the ball gown belongs there. It simply asks you to think about the ground.",
      sections: [
        {
          titre: "The ground and the train",
          texte: [
            "A tip: on grass or gravel, a long train picks up everything it touches. A shorter train, or one bustled after the ceremony, lets you move around without thinking about it.",
          ],
        },
        {
          titre: "The fabric",
          texte: [
            "Tulle and organza, as on Santana, are airy and move with the breeze; mikado and jacquard hold their shape. In hot weather, a light skirt is the most pleasant to wear all day.",
          ],
        },
        {
          titre: "The season",
          texte: [
            "For a summer wedding, bare shoulders or fine straps; for the end of the season, long sleeves like Seraphina's. And for the evening, a stole or a cape.",
          ],
        },
      ],
      aRetenir: [
        "Yes, with a light skirt.",
        "A short or bustled train.",
        "Think of the ground and the season.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/seraphina", label: "Seraphina" },
        { href: "/faq/robe-de-mariee-hiver", label: "A dress for a winter wedding" },
      ],
    },
    {
      slug: fr("princesse", 10),
      q: "Which veil goes with a ball gown wedding dress?",
      r: "A veil that matches the volume and the train. A long veil, extending the train, underlines the formality; a shorter veil lets the back and skirt show. Santana even has its matching fingertip veil, sold separately.",
      description:
        "Which veil with a ball gown wedding dress? Long to extend the train, short to show the back. Santana's matching veil, at MADAMOON.",
      chapo:
        "With a ball gown, the veil completes the silhouette. Here is how to match it to the dress.",
      sections: [
        {
          titre: "Long or short",
          texte: [],
          liste: [
            "A long veil — it extends the train and suits a formal ceremony; it goes with a dress with a train, like Kensington or Guinevere.",
            "A fingertip veil — it stops at the fingertips, arms by your sides, and lets the whole skirt show.",
            "A short veil — it reveals the back and the bodice.",
          ],
        },
        {
          titre: "The back of the dress",
          texte: [
            "When the back is worked, let it show: Addison's row of buttons, running to the end of the train, or Seraphina's open back. A light, sheer tulle veil lets them through.",
          ],
        },
        {
          titre: "Santana's veil",
          texte: [
            "According to its page, Santana, by Casablanca Bridal, can be paired with a matching fingertip veil and sheer silk tulle gloves adorned with floral lace, sold separately.",
          ],
        },
      ],
      aRetenir: [
        "Matched to the volume and the train.",
        "Long for formality, short for the back.",
        "Santana has its matching veil.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/robes/seraphina", label: "Seraphina" },
      ],
    },
    {
      slug: fr("princesse", 11),
      q: "How do you accessorise a ball gown without overloading the figure?",
      r: "By choosing one focal point and keeping the rest discreet. A ball gown already carries volume: an embroidered bodice calls for little jewellery, a plain bodice can take a necklace or gloves. Veil, jewellery and hairstyle are chosen together.",
      description:
        "Accessorising a ball gown wedding dress without overload: one focal point, measured jewellery, a matched veil. Advice and dresses from MADAMOON, Paris.",
      chapo:
        "The ball gown is already a statement. The accessory extends it, as long as it does not compete with it.",
      sections: [
        {
          titre: "One focal point",
          texte: [
            "A tip: decide what should draw the eye — the bodice, the veil, a piece of jewellery — and keep the rest in the background. With a beaded dress, like Kensington or Fern, earrings are enough.",
          ],
        },
        {
          titre: "The dresses' own pieces",
          texte: [],
          liste: [
            "Santana — sheer silk tulle gloves adorned with floral lace, and a matching veil, sold separately.",
            "Addison — removable off-the-shoulder straps.",
            "Clover — with or without the pearls that accent the neckline and the edges of the corset.",
          ],
        },
        {
          titre: "Jewellery and neckline",
          texte: [
            "A V neckline, like Livia's, welcomes a pendant; a square neckline or bare shoulders show off a short necklace or bolder earrings; a sweetheart bodice is often enough on its own.",
          ],
        },
      ],
      aRetenir: [
        "One focal point.",
        "Some dresses have their own pieces.",
        "The jewellery follows the neckline.",
      ],
      liens: [
        { href: "/robes/santana", label: "Santana" },
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/coupes/princesse/voile-robe-de-mariee-princesse", label: "Which veil to choose" },
      ],
    },
    {
      slug: fr("princesse", 12),
      q: "Can you choose a ball gown in satin or in lace?",
      r: "Yes, both. Satin makes a smooth, luminous ball gown, like Addison in silk satin; lace a romantic one, like Clover in Caterina lace or Seraphina, embroidered by hand. The catalogue also has mikado, jacquard and Dupioni.",
      description:
        "Ball gown wedding dress in satin or lace: Addison in silk satin, Clover and Seraphina in lace, and mikado too. The MADAMOON ball gowns, Paris.",
      chapo:
        "The ball gown comes in every noble fabric. Each gives it a different character.",
      sections: [
        {
          titre: "In satin",
          texte: [
            "Smooth and luminous, it gives a clean line. Addison, by Casablanca Bridal, is in silk satin, with hand-appliquéd chiffon floral motifs; Hayes pairs matte satin with lace.",
          ],
        },
        {
          titre: "In lace",
          texte: [
            "Romantic, it dresses the bodice or the whole gown. Clover is in Caterina lace; Seraphina, by Olya Mak, in hand-embroidered lace; Amandine features regal motifs; Santana lays floral lace over a sheer bodice.",
          ],
        },
        {
          titre: "The other fabrics",
          texte: [],
          liste: [
            "Mikado — Livia, Kensington, Fern, Trinity: a fabric that holds volume.",
            "Jacquard — Guinevere, in textured floral jacquard.",
            "Dupioni — Ember.",
            "Tulle and organza — Santana's skirt.",
          ],
        },
      ],
      aRetenir: [
        "Yes, in satin as in lace.",
        "Satin for a clean line, lace for romance.",
        "Mikado for volume that holds.",
      ],
      liens: [
        { href: "/robes/addison", label: "Addison" },
        { href: "/robes/clover-perles", label: "Clover" },
        { href: "/faq/entretenir-robe-de-mariee-dentelle", label: "Caring for a lace wedding dress" },
      ],
    },
    {
      slug: fr("princesse", 13),
      q: "How do you move easily in a voluminous wedding dress?",
      r: "By practising before the big day, in your shoes. A slightly shorter step, the skirt nudged forward with the tip of your foot, the front lifted on the stairs, the train bustled for the evening. And someone you trust to help you manage it.",
      description:
        "Moving in a voluminous wedding dress: walking, climbing stairs, sitting down, handling the train. Practical advice from the MADAMOON boutique, Paris.",
      chapo:
        "A ball gown is worn all day. A few simple gestures make it easy.",
      sections: [
        {
          titre: "Walking",
          texte: [
            "A tip: a slightly shorter step, and the skirt nudged forward with the tip of your foot at each step, so you never tread on it. Practise at your fittings, in your wedding-day shoes.",
          ],
        },
        {
          titre: "Stairs, the car, a chair",
          texte: [],
          liste: [
            "Stairs — lift the front of the skirt with both hands to see the steps; the train follows behind.",
            "The car — sit down first, then bring in your legs and the skirt; someone can help tuck it in.",
            "A chair — sit on the edge, let the skirt spread and bring the train to the side.",
          ],
        },
        {
          titre: "The train and the pockets",
          texte: [
            "Ask in the fitting room how the train is bustled for the evening. Some ball gowns have pockets: Guinevere, discreet pockets; Addison, \"very handy\" pockets — enough to keep a handkerchief within reach.",
          ],
        },
      ],
      aRetenir: [
        "Practise in your shoes.",
        "Lift the front on the stairs.",
        "The train is bustled for the evening.",
      ],
      liens: [
        { href: "/robes/guinevere", label: "Guinevere" },
        { href: "/robes/addison", label: "Addison" },
        { href: "/coupes/princesse/robe-princesse-confortable-danser", label: "Dancing in a ball gown" },
      ],
    },
  ],
  fluide: [
    {
      slug: fr("fluide", 0),
      q: "What is a sheath wedding dress?",
      r: "A dress with a soft, flowing drape that naturally follows movement. It does not build the figure through volume: it glides over the body, in a light fabric such as chiffon, charmeuse or matte satin. It is the softest, lightest silhouette in the catalogue.",
      description:
        "What is a sheath wedding dress? A soft drape that follows movement, in chiffon, charmeuse or matte satin. Definition, and the sheath dresses at MADAMOON, Paris.",
      chapo:
        "Soft and light: the sheath is the dress that moves with you. Here is what defines it.",
      sections: [
        {
          titre: "A drape, rather than a construction",
          texte: [
            "The sheath does not seek volume. Its fabric falls on its own and follows the body without squeezing; the skirt goes with every step. It can be fitted at the waist, held by a corset or left free.",
          ],
        },
        {
          titre: "What it does to the figure",
          texte: [
            "It lengthens the line. With no fullness to widen and no fit to mark, it leaves the figure as it is, and the fabric goes with it.",
          ],
        },
        {
          titre: "The boutique's sheath dresses",
          texte: [
            "From Watters Designs, Adularia and Ryle in charmeuse; from Casablanca Bridal, Dove in matte satin and Maribel in stretch chiffon; from Monica Loretti, Marie, Murielle in floral lace and chiffon, and Mathilda, designed for expectant brides; and Agnessa and Hélène, with their beaded corsets.",
          ],
        },
      ],
      aRetenir: [
        "A soft drape that follows movement.",
        "It lengthens the line.",
        "Soft and light.",
      ],
      liens: [
        { href: "/coupes/fluide", label: "Sheath dresses" },
        { href: "/robes/adularia", label: "Adularia" },
        { href: "/robes/dove", label: "Dove" },
      ],
    },
    {
      slug: fr("fluide", 1),
      q: "Which body shape does a sheath dress suit?",
      r: "It is the silhouette most often recommended first: it is for the O, V, H, 8 and X body shapes. For an A body shape, it comes second, and is worth trying. No body shape rules it out.",
      description:
        "Sheath wedding dress: which body shapes does it suit? First for O, V, H, 8 and X, worth trying for A. Advice from the MADAMOON boutique, Paris.",
      chapo:
        "Of the five silhouettes, it is the one the boutique recommends first to the most figures. Here is why.",
      sections: [
        {
          titre: "The body shapes it comes first for",
          texte: [],
          liste: [
            "O — it glides without marking and lengthens the line.",
            "V — its softness eases broader shoulders, especially with a V neckline.",
            "H — fitted at the waist or worn with a belt, it marks where you decide.",
            "8 and X — it goes with an already balanced line, with nothing to build.",
          ],
        },
        {
          titre: "The one it is worth trying for",
          texte: [
            "For an A, choose a sheath with a crafted bodice — Agnessa's or Hélène's beaded corset, Dove's draped neckline — which draws the eye upwards, and a skirt that falls without clinging to the hips.",
          ],
        },
        {
          titre: "In the catalogue",
          texte: [
            "On their pages, almost all the boutique's sheath dresses are listed for all six body shapes; Ryle is listed for all but the O. The fitting decides.",
          ],
        },
      ],
      aRetenir: [
        "First for O, V, H, 8 and X.",
        "Worth trying for A, with a crafted top.",
        "The silhouette most often recommended first.",
      ],
      liens: [
        { href: "/morphologies/h/robe-fluide-morphologie-h", label: "The sheath and the H body shape" },
        { href: "/morphologies/8/robe-fluide-morphologie-8", label: "The sheath and the 8 body shape" },
        { href: "/coupes/fluide/choisir-robe-fluide-selon-morphologie", label: "Choosing a sheath for your body shape" },
      ],
    },
    {
      slug: fr("fluide", 2),
      q: "What is the difference between a sheath dress and an empire dress?",
      r: "A sheath is defined by its fabric and drape; an empire, by its cut: a seam placed just below the bust, from which the skirt falls freely. An empire dress is often flowing, but a sheath is not necessarily empire. The boutique does not file its dresses as \"empire\": its sheath dresses are the closest.",
      description:
        "Sheath or empire: one is defined by its drape, the other by a seam below the bust. The difference explained, and the MADAMOON sheath dresses in Paris.",
      chapo:
        "The two words often overlap. One speaks of the fabric, the other of where the dress draws in.",
      sections: [
        {
          titre: "The sheath, a matter of drape",
          texte: [
            "A soft fabric that follows movement. The waist can sit wherever you like: marked by a corset, as on Agnessa or Hélène, or left free.",
          ],
        },
        {
          titre: "The empire, a matter of cut",
          texte: [
            "The dress draws in just below the bust, then falls without marking the waist or hips. It flatters the bust and lengthens everything below.",
          ],
        },
        {
          titre: "In the catalogue",
          texte: [
            "The boutique has no \"empire\" category: its sheath dresses come closest. Mathilda, by Monica Loretti, designed for expectant brides, is filed with them. The exact line of each dress shows in the fitting room.",
          ],
        },
      ],
      aRetenir: [
        "Sheath: a fabric, a drape.",
        "Empire: a seam below the bust.",
        "In the catalogue, the sheath dresses come closest.",
      ],
      liens: [
        { href: "/robes/mathilda", label: "Mathilda" },
        { href: "/morphologies/o/robe-empire-morphologie-o", label: "The empire and the O body shape" },
        { href: "/morphologies/h/robe-empire-morphologie-h", label: "The empire and the H body shape" },
      ],
    },
    {
      slug: fr("fluide", 3),
      q: "Which fabric should you choose for a sheath wedding dress?",
      r: "The one that gives the drape you want. Chiffon is the lightest and airiest; charmeuse, luminous, follows the body closely; matte satin has more hold. A stretch version adds ease.",
      description:
        "Fabric for a sheath wedding dress: light chiffon, luminous charmeuse, matte satin that holds, tulle. The MADAMOON sheath dresses — Maribel, Adularia, Dove — in Paris.",
      chapo:
        "In a sheath, the fabric makes the dress. Each one falls in its own way.",
      sections: [
        {
          titre: "The catalogue's fabrics",
          texte: [],
          liste: [
            "Chiffon — light and airy: Hélène's skirt, Murielle's; Maribel in stretch chiffon.",
            "Charmeuse — luminous, it hugs the figure: Adularia, Ryle.",
            "Matte satin — more hold, a soft light: Dove.",
            "Tulle — a flowing skirt under a beaded corset: Agnessa.",
          ],
        },
        {
          titre: "Choosing for the day",
          texte: [
            "A tip: for a summer wedding or a long day, chiffon and stretch versions; for a more formal ceremony, matte satin, which keeps its line. Charmeuse, which follows the body closely, needs a precise fit.",
          ],
        },
        {
          titre: "Lace",
          texte: [
            "It sits on a sheath without weighing it down: floral lace on Murielle, adorned with beads and raised flowers on Hélène's corset.",
          ],
        },
      ],
      aRetenir: [
        "Chiffon: the lightest.",
        "Charmeuse: luminous, close to the body.",
        "Matte satin: more hold.",
      ],
      liens: [
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/adularia", label: "Adularia" },
        { href: "/morphologies/o/matiere-robe-de-mariee-fluide-confortable", label: "A flowing, comfortable fabric" },
      ],
    },
    {
      slug: fr("fluide", 4),
      titre: "Boho wedding dress in Paris",
      q: "Does a sheath dress suit a boho wedding?",
      r: "Yes, it is even the most natural silhouette for a boho wedding. A chiffon skirt, floral lace, light sleeves: according to its page, Hélène is designed for the bride \"who prefers to say YES in a boho-chic look\".",
      description:
        "Boho wedding dress in Paris: chiffon, floral lace, light sleeves. Hélène, Murielle, Ryle, and Tessa for a vintage touch, at the MADAMOON showroom.",
      chapo:
        "A boho wedding dress is recognised by what it lets breathe: a chiffon skirt that moves, floral lace, light or sheer sleeves. The sheath is the silhouette that carries this spirit best, and at MADAMOON you try it on in our showroom in Paris's 10th arrondissement.",
      style: {
        voirLaCoupe: "See the sheath dresses",
        robes: {
          titre: "Our boho dresses",
          liste: [
            {
              slug: "helene",
              texte:
                "A lace corset adorned with tiny beads and raised flowers, a delicate and light chiffon skirt: a boho-chic look.",
            },
            { slug: "murielle", texte: "Floral lace and chiffon, a V neckline, illusion sleeves and a high slit." },
            { slug: "ryle", texte: "Balloon sleeves and a deep V neckline, in charmeuse." },
          ],
        },
        colonnes: [
          {
            titre: "What makes it boho",
            texte:
              "Boho loves what moves and what breathes: floral lace, light or sheer sleeves, a short train or none, a soft hairstyle. The dress should be able to walk on grass and dance barefoot.",
          },
          {
            titre: "Boho, but not casual",
            texte:
              "A boho sheath is still a wedding dress: a crafted bodice, like Hélène's, gives it its hold and its radiance. Boho is a style, not an absence of finish.",
          },
        ],
        echo: {
          titre: "A vintage touch",
          texte:
            "For boho with a vintage accent, Tessa, by Casablanca Bridal, has according to its page a \"vintage-chic charm\": a mermaid with a structured corset, a detachable overskirt and removable straps. It is filed with the two-in-one dresses, and is well worth trying next to the boho dresses.",
          robe: "tessa",
          voir: "See Tessa",
        },
        pourQui: {
          titre: "Who it suits",
          texte:
            "The sheath is recommended first for the O, V, H, 8 and X body shapes, and is worth trying for an A. Hélène and Murielle are listed, on their pages, for all six body shapes; Ryle for all but the O.",
          toutes: "All body shapes",
        },
        questions: {
          titre: "Questions",
          liste: [
            {
              q: "Does a sheath dress suit a boho wedding?",
              r: "Yes, it is even the most natural silhouette for a boho wedding. A chiffon skirt, floral lace, light sleeves: according to its page, Hélène is designed for the bride \"who prefers to say YES in a boho-chic look\".",
            },
            {
              q: "Where to try on a boho wedding dress in Paris?",
              r: `At the MADAMOON showroom, ${MAISON.adresse}, in the 10th arrondissement, by appointment. The showroom is reserved for you for an hour: time to try several sheath dresses and compare the fabrics.`,
            },
          ],
          toutes: "All questions on the sheath",
        },
        fin: {
          titre: "Try on a boho dress in the showroom",
          texte: `${MAISON.adresse}, Paris 10th, by appointment.`,
        },
      },
      sections: [],
      aRetenir: [],
      liens: [],
    },
    {
      slug: fr("fluide", 5),
      q: "Is a sheath dress suitable for a summer wedding?",
      r: "Yes, it is one of the most pleasant to wear in the heat. A light fabric such as chiffon lets you breathe, and bare shoulders, an open back or a slit lighten the dress further. Simply plan to cover your shoulders for the ceremony if the venue asks for it.",
      description:
        "Sheath wedding dress for a summer wedding: light chiffon, bare shoulders, open back, slit. The MADAMOON sheath dresses — Dove, Maribel, Murielle — in Paris.",
      chapo:
        "When it is hot, lightness is no longer a style: it is comfort. The sheath has it by nature.",
      sections: [
        {
          titre: "A fabric that breathes",
          texte: [
            "Chiffon is the lightest in the catalogue: Hélène's skirt, Murielle's, Maribel in stretch chiffon. Charmeuse and matte satin stay flowing, with a little more body.",
          ],
        },
        {
          titre: "What lightens",
          texte: [],
          liste: [
            "Bare shoulders — Dove, with its draped neckline.",
            "An open back — Dove again, and Murielle's V back.",
            "A slit — Maribel, Murielle: it lets air through and makes walking easier.",
            "Illusion sleeves — Murielle: covered without being hot.",
          ],
        },
        {
          titre: "The ceremony and the evening",
          texte: [
            "A tip: for a religious ceremony, a light veil or a stole covers the shoulders as long as needed. According to its page, Murielle also comes without the slit, for a more covered version.",
          ],
        },
      ],
      aRetenir: [
        "Yes: one of the most pleasant in the heat.",
        "Chiffon, bare shoulders, an open back.",
        "A light veil to cover up for the ceremony.",
      ],
      liens: [
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/murielle", label: "Murielle" },
      ],
    },
    {
      slug: fr("fluide", 6),
      q: "How do you choose a sheath dress that holds its shape beautifully?",
      r: "By looking at three things: a fabric with weight, such as matte satin or charmeuse; a bodice that holds, sometimes built as a corset; and a precise fit. A well-chosen sheath falls straight, without floating or clinging.",
      description:
        "A sheath wedding dress that holds its shape: a fabric with weight, a structured bodice, a precise fit. Advice and sheath dresses from MADAMOON in Paris.",
      chapo:
        "Flowing does not mean floating. A beautiful sheath falls just right — and that can be chosen.",
      sections: [
        {
          titre: "A fabric with weight",
          texte: [
            "Dove's matte satin and Adularia's or Ryle's charmeuse fall on their own: their weight draws the dress down and traces a clean line. Chiffon, lighter, floats more; a structured bodice anchors it.",
          ],
        },
        {
          titre: "A bodice that holds",
          texte: [
            "A beaded corset, like Agnessa's or Hélène's, holds the top and leaves the skirt free. Maribel's hand-embroidered, hand-beaded bodice structures the bust above a chiffon skirt.",
          ],
        },
        {
          titre: "A precise fit",
          texte: [
            "A sheath forgives little in an approximate fit. After the fitting, the boutique takes your measurements to begin making the dress, and its seamstresses adjust it on site. A tip: look at yourself in profile and walking, not just from the front.",
          ],
        },
      ],
      aRetenir: [
        "A fabric with weight.",
        "A bodice that holds the top.",
        "A precise fit.",
      ],
      liens: [
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/agnessa", label: "Agnessa" },
        { href: "/faq/duree-retouches-robe-de-mariee", label: "How long alterations take" },
      ],
    },
    {
      slug: fr("fluide", 7),
      q: "Can a sheath dress be elegant for a formal wedding?",
      r: "Yes. In matte satin or charmeuse, with a train and a clean line, the sheath has all the formality of a grand ceremony. Dove, with its open back and buttons running to the end of the train, is the example.",
      description:
        "Sheath wedding dress for a formal wedding: matte satin, charmeuse, clean line, train. Dove, Adularia and Marie, the elegant sheath dresses at MADAMOON, Paris.",
      chapo:
        "The sheath is associated with country weddings. It can also be the most elegant dress at a ceremony.",
      sections: [
        {
          titre: "The most formal sheath dresses",
          texte: [],
          liste: [
            "Dove — matte satin, a draped neckline, bare shoulders, and a line of buttons running to the train.",
            "Adularia — in charmeuse, of a \"minimalist elegance\" with a modern allure.",
            "Marie — by Monica Loretti, a timeless line.",
          ],
        },
        {
          titre: "What makes it formal",
          texte: [
            "A tip: a fabric with hold rather than a very light chiffon, a train, a clean neckline, and a long veil. The simplicity of the line does the rest.",
          ],
        },
        {
          titre: "For a religious ceremony",
          texte: [
            "Covered shoulders, or a veil that covers them. Murielle has illusion sleeves and, according to its page, also comes without the slit, for a more covered version.",
          ],
        },
      ],
      aRetenir: [
        "Yes, in matte satin or charmeuse.",
        "A train and a clean line.",
        "Dove is the example.",
      ],
      liens: [
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/adularia", label: "Adularia" },
        { href: "/robes/marie", label: "Marie" },
      ],
    },
    {
      slug: fr("fluide", 8),
      q: "What shoes should you wear with a sheath dress?",
      r: "Shoes you can stand in all day, chosen before the alterations: the length of the dress is set to them. With a slit, they show and deserve careful choice; for an outdoor wedding, prefer a block heel or flat sandals.",
      description:
        "Which shoes with a sheath wedding dress? Chosen before alterations, comfortable, carefully chosen if the dress has a slit. Advice from MADAMOON, Paris.",
      chapo:
        "With a sheath, the shoe shows more than you think: with every step, the skirt moves.",
      sections: [
        {
          titre: "Before the alterations",
          texte: [
            "A tip: buy your shoes before the alterations and bring them to your fittings. A sheath that skims the floor is set to the centimetre, and the heel height changes everything.",
          ],
        },
        {
          titre: "With a slit",
          texte: [
            "Maribel and Murielle have a slit: the shoe shows with every step. A fine sandal or a clean court shoe lengthens the leg.",
          ],
        },
        {
          titre: "Depending on the venue",
          texte: [],
          liste: [
            "On grass or gravel — a block heel, or flat sandals.",
            "For a boho wedding — flat sandals, or even barefoot for the evening.",
            "For a long day — a moderate heel, and a second pair for dancing.",
          ],
        },
      ],
      aRetenir: [
        "Chosen before the alterations.",
        "Chosen with care if the dress has a slit.",
        "Suited to the ground and the day.",
      ],
      liens: [
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/murielle", label: "Murielle" },
        { href: "/faq/duree-retouches-robe-de-mariee", label: "How long alterations take" },
      ],
    },
    {
      slug: fr("fluide", 9),
      q: "Which veil or accessory goes with a sheath dress?",
      r: "A light veil, in soft tulle, that moves with the dress; a jewelled belt to mark the waist; a hair piece or earrings. A sheath is pared back: one well-chosen accessory is enough to sign it.",
      description:
        "Veil and accessories for a sheath wedding dress: soft tulle veil, jewelled belt, hair piece. Advice and sheath dresses from MADAMOON in Paris.",
      chapo:
        "A sheath leaves room for the accessory. That is an opportunity, as long as you choose only one or two.",
      sections: [
        {
          titre: "The veil",
          texte: [
            "A tip: a soft tulle veil, which follows the movement of the dress, rather than a stiff one. When the back is worked — Dove's line of buttons, Murielle's or Agnessa's V back — a sheer veil lets it show.",
          ],
        },
        {
          titre: "The belt",
          texte: [
            "On a sheath with no defined waist, a jewelled belt draws the waist where you want it. It is also what the boutique recommends for the H and 8 body shapes.",
          ],
        },
        {
          titre: "Jewellery",
          texte: [
            "With a beaded bodice — Agnessa, Hélène, Maribel — earrings are enough. With a minimalist sheath, like Adularia, a bolder piece can carry the whole look. With Ryle's balloon sleeves, keep the neck clear.",
          ],
        },
      ],
      aRetenir: [
        "A soft veil that moves with the dress.",
        "A jewelled belt to mark the waist.",
        "One or two accessories, no more.",
      ],
      liens: [
        { href: "/robes/dove", label: "Dove" },
        { href: "/robes/adularia", label: "Adularia" },
        { href: "/robes/ryle", label: "Ryle" },
      ],
    },
    {
      slug: fr("fluide", 10),
      q: "Does a sheath dress suit petite brides?",
      r: "Yes, very well: with no volume to widen it, the sheath lengthens the line. A V neckline, a slightly high waist and a length set to your shoes heighten the effect. Just avoid excess fabric, which can overwhelm.",
      description:
        "Sheath wedding dress for a petite bride: a lengthening line, a V neckline, a length set to the centimetre. Advice from MADAMOON, Paris.",
      chapo:
        "The sheath is one of the most flattering silhouettes for a petite figure. Here is how to make the most of it.",
      sections: [
        {
          titre: "A line that lengthens",
          texte: [
            "The sheath falls without widening: the eye follows an unbroken line, from the bust to the floor. That is what lengthens.",
          ],
        },
        {
          titre: "What heightens the effect",
          texte: [],
          liste: [
            "A V neckline — Ryle, Maribel, Murielle, Agnessa: it elongates the bust.",
            "A slightly high waist — it lengthens the legs.",
            "A slit — Maribel, Murielle: it reveals the leg as you walk.",
          ],
        },
        {
          titre: "The length",
          texte: [
            "A tip: avoid very voluminous sleeves and excess fabric, and set the length to your shoes. After the fitting, the boutique takes your measurements and its seamstresses adjust the dress on site.",
          ],
        },
      ],
      aRetenir: [
        "Yes: the sheath lengthens the line.",
        "A V and a slightly high waist.",
        "A length set to your shoes.",
      ],
      liens: [
        { href: "/robes/maribel", label: "Maribel" },
        { href: "/robes/murielle", label: "Murielle" },
        { href: "/coupes/fluide/chaussures-robe-fluide", label: "Shoes with a sheath dress" },
      ],
    },
    {
      slug: fr("fluide", 11),
      q: "How do you choose a sheath dress for your body shape?",
      r: "By choosing the details rather than the silhouette: the neckline, the waist and the sleeves. A V for an O or V body shape, a defined waist for an H or 8, a crafted bodice for an A. The sheath does the rest.",
      description:
        "Choosing a sheath wedding dress for your body shape: neckline, waist, sleeves, fabric. Advice for O, A, V, H, 8 and X, and the MADAMOON sheath dresses.",
      chapo:
        "The sheath suits almost every figure. It is its details that tune it to yours.",
      sections: [
        {
          titre: "Body shape by body shape",
          texte: [],
          liste: [
            "O — a drape that glides without marking, and a V or sweetheart neckline that flatters the bust.",
            "A — a crafted bodice that draws the eye upwards: Agnessa's or Hélène's beaded corset, Dove's draped neckline.",
            "V — a V neckline, a light structure at the shoulders; voluminous sleeves, like Ryle's, are worth trying with care.",
            "H — a defined waist, through a fitted cut or a belt.",
            "8 and X — a nip at the waist, so the sheath does not float where the waist curves in.",
          ],
        },
        {
          titre: "The fabric",
          texte: [
            "A tip: chiffon glides without marking, matte satin structures more, charmeuse follows the body closely and needs a precise fit.",
          ],
        },
        {
          titre: "In the catalogue",
          texte: [
            "Almost all the boutique's sheath dresses are listed, on their pages, for all six body shapes. The fitting shows which one is yours.",
          ],
        },
      ],
      aRetenir: [
        "The details tune the sheath to the figure.",
        "The neckline, the waist, the sleeves.",
        "The fitting decides.",
      ],
      liens: [
        { href: "/morphologies", label: "The six body shapes" },
        { href: "/morphologies/x/robe-fluide-silhouette-equilibree", label: "The sheath and a balanced figure" },
        { href: "/robes/agnessa", label: "Agnessa" },
      ],
    },
  ],
  trapeze: [
    {
      slug: fr("trapeze", 0),
      q: "What is an A-line wedding dress?",
      r: "A dress with a fitted bodice whose skirt opens in an A from the waist to the floor, like the letter. \"Trapèze\" in French, \"A-line\" in English: it is the same silhouette. The boutique considers it the most universal, precise and timeless.",
      description:
        "What is an A-line wedding dress? A fitted bodice, a skirt that opens in an A. Definition of the most universal silhouette, and the MADAMOON A-line dresses.",
      chapo:
        "Precise and timeless: the A-line is the silhouette the boutique calls the most universal. Here is what defines it.",
      sections: [
        {
          titre: "An A, from the waist to the floor",
          texte: [
            "The bodice is fitted and the waist defined; from there, the skirt widens gradually, with no sudden fullness, to the floor. It skims the hips rather than hugging them. It is the line of the letter A, hence its name.",
          ],
        },
        {
          titre: "What it does to the figure",
          texte: [
            "It structures the bust and frees the rest. With no excessive volume and no tight fit, it balances the figure and is easy to wear all day.",
          ],
        },
        {
          titre: "The boutique's A-line dresses",
          texte: [
            "From Watters Designs, Pendant and Aster in lace, Finell in satin, Fortune in crêpe, Mitra and Nirali with a dropped waist; from Casablanca Bridal, Solana, Carrie and Emerald; from Monica Loretti, Monica in jacquard; from Olya Mak, River, a short A-line.",
          ],
        },
      ],
      aRetenir: [
        "A fitted bodice, a skirt that opens in an A.",
        "Trapèze and A-line: the same silhouette.",
        "The most universal in the catalogue.",
      ],
      liens: [
        { href: "/coupes/trapeze", label: "A-line dresses" },
        { href: "/robes/aster", label: "Aster" },
        { href: "/robes/finell", label: "Finell" },
      ],
    },
    {
      slug: fr("trapeze", 1),
      q: "What is the difference between an A-line dress and a ball gown?",
      r: "It all comes down to the volume of the skirt. The A-line opens in an A, evenly, and stays easy to wear; the ball gown carries a full, evening-gown skirt. Choose the A-line for freedom of movement and simplicity, the ball gown for formality.",
      description:
        "A-line or ball gown: which to choose? The A-line opens in an A and is easy to wear, the ball gown carries volume. Advice from MADAMOON, Paris.",
      chapo:
        "The same fitted bodice, two different skirts. Here is how to tell which one is you.",
      sections: [
        {
          titre: "When to choose the A-line",
          texte: [],
          liste: [
            "To move freely — the skirt opens without weighing, from the ceremony to the dance floor.",
            "For a more intimate venue — a town hall, a restaurant, a car: the A-line fits without getting in the way.",
            "For a simple look — it shows off the bodice without the skirt stealing the show.",
          ],
        },
        {
          titre: "When to prefer the ball gown",
          texte: [
            "For a grand ceremony, a large venue and an evening-gown silhouette: the ball gown has a crafted corset and an assumed volume the A-line does not.",
          ],
        },
        {
          titre: "Between the two",
          texte: [
            "Several dresses in the catalogue can be worn either way: Sienna, Charlotte, Solana, Dolores, and Alicia and Lovia, described as \"A-line or ball-gown volume\". The fitting room shows which way they lean on you.",
          ],
        },
      ],
      aRetenir: [
        "A-line: freedom and simplicity.",
        "Ball gown: volume and formality.",
        "Several dresses can be worn both ways.",
      ],
      liens: [
        { href: "/coupes/princesse/difference-robe-princesse-robe-trapeze", label: "The same question, from the ball gown side" },
        { href: "/robes/alicia", label: "Alicia" },
        { href: "/robes/solana", label: "Solana" },
      ],
    },
    {
      slug: fr("trapeze", 2),
      q: "Which body shape does an A-line dress suit?",
      r: "It is one of the first silhouettes to try for the O, A, 8 and X body shapes. For a V or H body shape, it comes second, and is worth trying. Every A-line dress in the catalogue is listed, on its page, for all six body shapes.",
      description:
        "A-line wedding dress: which body shapes does it suit? First for O, A, 8 and X, worth trying for V and H. Advice from the MADAMOON boutique.",
      chapo:
        "The most universal silhouette lives up to its name. Here is who it comes first for.",
      sections: [
        {
          titre: "The body shapes it comes first for",
          texte: [],
          liste: [
            "O — the bust is held and the skirt opens in an A from the waist: the eye stops at the neckline.",
            "A — the skirt skims the hips rather than hugging them.",
            "8 and X — the defined waist and the A-line skirt go with an already balanced figure.",
          ],
        },
        {
          titre: "The ones it is worth trying for",
          texte: [
            "For a V, choose a slightly fuller skirt and a V neckline or bare shoulders, which soften the line of the shoulders. For an H, a corset that defines the waist, like Finell's or Lovia's, creates the curve.",
          ],
        },
        {
          titre: "In the catalogue",
          texte: [
            "All nineteen of the boutique's A-line dresses are listed, on their pages, for all six body shapes: it is the easiest silhouette to wear. The fitting chooses between them.",
          ],
        },
      ],
      aRetenir: [
        "First for O, A, 8 and X.",
        "Worth trying for V and H.",
        "Every A-line suits all six body shapes.",
      ],
      liens: [
        { href: "/morphologies/a/robe-trapeze-morphologie-a", label: "The A-line and the A body shape" },
        { href: "/morphologies/o/robe-trapeze-morphologie-o", label: "The A-line and the O body shape" },
        { href: "/morphologies", label: "The six body shapes" },
      ],
    },
    {
      slug: fr("trapeze", 3),
      q: "Does an A-line dress suit a petite bride?",
      r: "Yes, it is one of the easiest silhouettes for a petite figure: the A-line lengthens without widening. Choose a measured volume, a V neckline or a slit, and a length set to your shoes. A short A-line, like River, is also an option.",
      description:
        "A-line wedding dress for a petite bride: a lengthening A-line, measured volume, a V or a slit. Advice and A-line dresses from MADAMOON, Paris.",
      chapo:
        "The A-line does not ask you to be tall. It asks for volume on your scale.",
      sections: [
        {
          titre: "A line that lengthens",
          texte: [
            "The skirt opens gradually from the waist: the eye follows an unbroken line to the floor, with no sudden fullness to shorten the figure.",
          ],
        },
        {
          titre: "What heightens the effect",
          texte: [],
          liste: [
            "A V neckline — Emerald, Lovia, Angel, Monica: it elongates the bust.",
            "A slit — Héra, Monica, Alicia, Lovia: it reveals the leg as you walk.",
            "A measured volume — a crêpe or satin skirt, like Fortune or Héra, rather than layers of tulle.",
          ],
        },
        {
          titre: "The length",
          texte: [
            "After the fitting, the boutique takes your measurements to begin making the dress, and its seamstresses adjust it on site. A tip: come in your wedding-day shoes. And River, by Olya Mak, is a short A-line.",
          ],
        },
      ],
      aRetenir: [
        "Yes: the A-line lengthens.",
        "A V, a slit, a measured volume.",
        "A length set to your shoes.",
      ],
      liens: [
        { href: "/robes/hera", label: "Héra" },
        { href: "/robes/river", label: "River" },
        { href: "/faq/duree-retouches-robe-de-mariee", label: "How long alterations take" },
      ],
    },
    {
      slug: fr("trapeze", 4),
      q: "Is an A-line dress suitable for a civil ceremony?",
      r: "Yes, it is one of the most natural silhouettes at the town hall: simple, easy to wear, with no cumbersome volume. A pared-back A-line, a short one like River, or a dress with a removable piece — Solana's jacket, Aster's sleeves — to change looks between the town hall and the evening.",
      description:
        "A-line wedding dress for a civil ceremony: simple, easy to wear, short or with a removable piece. River, Solana, Aster, the MADAMOON A-line dresses in Paris.",
      chapo:
        "The town hall calls for a dress that fits in the room, in the car and on the steps. The A-line can do all that.",
      sections: [
        {
          titre: "A-line dresses for the town hall",
          texte: [],
          liste: [
            "River — by Olya Mak, short, with a square neckline; its page calls it perfect for a second look, a reception or a less conventional ceremony.",
            "Fortune — a strapless bodice in stretch crêpe and satin organza, elegant and timeless.",
            "Monica — by Monica Loretti, in floral jacquard, with a wide belt and a slit.",
          ],
        },
        {
          titre: "Two looks in one",
          texte: [
            "Solana, by Casablanca Bridal, has a removable asymmetric jacket; Aster, by Watters Designs, removable sleeves. Covered for the town hall, more open for the evening.",
          ],
        },
        {
          titre: "A tip",
          texte: [
            "For a civil ceremony followed by a large reception, one A-line can be enough; for two separate days, a short dress for the town hall and a long one for the party mark the contrast beautifully.",
          ],
        },
      ],
      aRetenir: [
        "Yes: simple and easy to wear.",
        "River, a short A-line.",
        "A removable piece for two looks.",
      ],
      liens: [
        { href: "/robes/river", label: "River" },
        { href: "/robes/solana", label: "Solana" },
        { href: "/coupes/sirene/robe-sirene-mariage-civil", label: "A mermaid dress for a civil wedding" },
      ],
    },
    {
      slug: fr("trapeze", 5),
      q: "How do you choose the volume of an A-line dress?",
      r: "Based on your figure, the venue and the look you want. The catalogue ranges from a close-fitting A-line in crêpe or satin to a skirt of several tulle layers that is almost a ball gown. The fabric does most of it: crêpe falls, tulle billows. Try two volumes to compare.",
      description:
        "Choosing the volume of an A-line wedding dress: from close-fitting crêpe to almost-ball-gown tulle. Advice and A-line dresses from MADAMOON in Paris.",
      chapo:
        "The A-line does not have one volume, it has several. Here is how to find yours.",
      sections: [
        {
          titre: "From the simplest to the fullest",
          texte: [],
          liste: [
            "Simple — Fortune, in stretch crêpe; Héra and Finell, in satin.",
            "In between — Aster, Pendant, Emerald: a clear A-line skirt, in lace, satin or tulle.",
            "Full — Carrie and its layers of sequinned tulle; Sienna, with its \"generous volume\"; Alicia and Lovia, \"A-line or ball-gown volume\".",
          ],
        },
        {
          titre: "Depending on the venue",
          texte: [
            "A tip: a measured volume for a town hall, a restaurant or a busy day; more fullness for a large hall or a church. Think of the whole day, not just the entrance.",
          ],
        },
        {
          titre: "Depending on the figure",
          texte: [
            "For a petite figure, a measured volume; for broad shoulders, a slightly fuller skirt that rebalances; for pronounced hips, a skirt that opens from the waist, without stacked layers.",
          ],
        },
      ],
      aRetenir: [
        "From close-fitting crêpe to almost-ball-gown tulle.",
        "The fabric makes the volume.",
        "Think of the venue and the whole day.",
      ],
      liens: [
        { href: "/robes/fortune", label: "Fortune" },
        { href: "/robes/carrie", label: "Carrie" },
        { href: "/robes/sienna", label: "Sienna" },
      ],
    },
    {
      slug: fr("trapeze", 6),
      q: "Can an A-line dress be minimalist and modern?",
      r: "Yes. In a clean fabric — crêpe, satin — with little ornament and a clear line, the A-line becomes one of the most modern dresses in the catalogue. Fortune, Héra, Monica and River are the examples.",
      description:
        "Minimalist, modern A-line wedding dress: crêpe, satin, a clear line, little ornament. Fortune, Héra, Monica and River, at MADAMOON in Paris.",
      chapo:
        "The A-line is associated with lace and fairy tales. It can also be pared back.",
      sections: [
        {
          titre: "The pared-back A-line dresses",
          texte: [],
          liste: [
            "Fortune — a strapless bodice in stretch crêpe and satin organza.",
            "Héra — in satin, with a Bardot neckline and a front slit that gives it a \"resolutely contemporary\" look.",
            "Monica — floral jacquard, a wide belt and a slit: its page speaks of \"simplicity enhanced by beautiful details\".",
            "River — by Olya Mak, short, with a \"pared-back, sculptural\" silhouette.",
          ],
        },
        {
          titre: "What makes it modern",
          texte: [
            "A tip: a smooth fabric rather than layers of tulle, a graphic neckline — straight strapless, square, Bardot — a slit, and a single strong detail. Nirali, \"resolutely modern\" according to its page, plays on a straight neckline edged with handmade flowers.",
          ],
        },
        {
          titre: "Modern, not cold",
          texte: [
            "A minimalist A-line relies on cut and fit: that is where the difference shows. At the fitting, look at it in profile and walking.",
          ],
        },
      ],
      aRetenir: [
        "Yes: a clean fabric, a clear line.",
        "Little ornament, one strong detail.",
        "Fortune, Héra, Monica, River.",
      ],
      liens: [
        { href: "/robes/fortune", label: "Fortune" },
        { href: "/robes/hera", label: "Héra" },
        { href: "/robes/monica", label: "Monica" },
      ],
    },
    {
      slug: fr("trapeze", 7),
      q: "Which neckline goes with an A-line dress?",
      r: "The one that flatters your bust and your style. The A-line welcomes them all: sweetheart, V, square, straight, rounded, off-the-shoulder. A V lengthens, a sweetheart shapes the bust, a square or straight strapless adds a graphic touch.",
      description:
        "Which neckline for an A-line wedding dress? Sweetheart, V, square, straight, rounded, off-the-shoulder. Advice and A-line dresses from MADAMOON, Paris.",
      chapo:
        "The A-line skirt leaves all the room to the bust. The neckline gives the dress its character.",
      sections: [
        {
          titre: "The catalogue's necklines",
          texte: [],
          liste: [
            "Sweetheart — Finell, with its sculpted neckline; Sienna, Charlotte, Solana.",
            "V — Emerald, Lovia, Angel, Monica.",
            "Square — Dolores, River.",
            "Straight — Nirali, edged with handmade flowers.",
            "Rounded — Calla.",
            "Off-the-shoulder — Pendant, Héra in Bardot; Alicia, with open shoulders.",
          ],
        },
        {
          titre: "Depending on the figure",
          texte: [
            "A tip: the V elongates the bust and softens broad shoulders; the sweetheart flatters the bust; bare shoulders or a square neckline beautifully widen narrow shoulders.",
          ],
        },
        {
          titre: "More covered",
          texte: [
            "Pendant has long lace sleeves, Aster removable sleeves and a draped bodice. According to its page, Charlotte also comes without the plunging neckline, for a more covered version.",
          ],
        },
      ],
      aRetenir: [
        "The A-line welcomes every neckline.",
        "The V lengthens, the sweetheart shapes.",
        "More covered versions exist.",
      ],
      liens: [
        { href: "/robes/finell", label: "Finell" },
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/pendant", label: "Pendant" },
      ],
    },
    {
      slug: fr("trapeze", 8),
      q: "Which fabric is best for an A-line dress?",
      r: "The one that gives the look you want. Lace for a romantic A-line, satin for a clean line, tulle for light volume, crêpe for a pared-back A-line that falls. Emerald even comes with a tulle or satin skirt, as you choose.",
      description:
        "Which fabric for an A-line wedding dress? Lace, satin, tulle, crêpe or jacquard. The MADAMOON A-line dresses — Aster, Finell, Carrie, Fortune — in Paris.",
      chapo:
        "The silhouette stays the same; the fabric changes everything. Here is what each gives an A-line.",
      sections: [
        {
          titre: "The catalogue's fabrics",
          texte: [],
          liste: [
            "Lace — Pendant; Aster, in Chantilly lace; Charlotte, in Caterina lace; Mitra, in Cassie lace; Calla, in Highclare lace.",
            "Satin — Finell, Héra; Aster pairs satin with lace.",
            "Tulle — Carrie, in sequinned tulle; Calla, in very soft tulle; Dolores.",
            "Crêpe — Fortune, in stretch crêpe and satin organza.",
            "Jacquard — Monica, with floral motifs.",
          ],
        },
        {
          titre: "Your choice",
          texte: [
            "Emerald, by Casablanca Bridal, comes with a tulle or satin skirt under the same beaded bodice: one dress, two looks.",
          ],
        },
        {
          titre: "A tip",
          texte: [
            "For a summer wedding or a long day, light tulle or a stretch crêpe; for a formal ceremony, satin, which keeps its line; for a romantic look, lace.",
          ],
        },
      ],
      aRetenir: [
        "Lace: romantic.",
        "Satin: a clean line.",
        "Tulle: light volume; crêpe: pared back.",
      ],
      liens: [
        { href: "/robes/emerald", label: "Emerald" },
        { href: "/robes/aster", label: "Aster" },
        { href: "/robes/calla", label: "Calla" },
      ],
    },
    {
      slug: fr("trapeze", 9),
      q: "Does an A-line dress suit an O body shape?",
      r: "Yes, it is one of the two silhouettes to try first. To make the most of it, choose a V or sweetheart neckline, a bodice that holds the bust, and a skirt that starts at the waist in a fabric that falls, rather than layers of tulle.",
      description:
        "A-line wedding dress and the O body shape: a V or sweetheart neckline, a bodice that holds, a fabric that falls. Advice from MADAMOON, Paris.",
      chapo:
        "The A-line is one of the silhouettes the boutique recommends first for O figures. Here is which A-line dresses to look at.",
      sections: [
        {
          titre: "The neckline",
          texte: [
            "A V or a sweetheart flatters the bust and draws the eye upwards. V: Emerald, Lovia, Angel, Monica; sweetheart: Finell, Sienna, Charlotte.",
          ],
        },
        {
          titre: "The bodice and the skirt",
          texte: [
            "A structured bodice holds the bust; the skirt opens in an A from the waist and leaves the rest free. A tip: a fabric that falls — satin, crêpe — glides better than a skirt made of several layers of tulle.",
          ],
        },
        {
          titre: "The sleeves",
          texte: [
            "To cover the arms, Pendant has long lace sleeves, and Aster removable sleeves, to keep on for the ceremony.",
          ],
        },
      ],
      aRetenir: [
        "Yes: one of the two silhouettes to try first.",
        "A V or sweetheart neckline.",
        "A fabric that falls.",
      ],
      liens: [
        { href: "/morphologies/o/robe-trapeze-morphologie-o", label: "The A-line, from the O body shape" },
        { href: "/morphologies/o", label: "The O body shape" },
        { href: "/robes/emerald", label: "Emerald" },
      ],
    },
    {
      slug: fr("trapeze", 10),
      q: "How do you accessorise an A-line wedding dress?",
      r: "By following the neckline and the style of the dress. A simple A-line welcomes a long veil, a belt or a bold piece of jewellery; a beaded or sequinned A-line needs almost nothing. Some have their own pieces: Solana's jacket, Aster's sleeves, Monica's belt.",
      description:
        "Accessorising an A-line wedding dress: veil, belt, jewellery by neckline. The pieces of the MADAMOON A-line dresses — Solana, Aster, Monica — in Paris.",
      chapo:
        "The A-line is a precise base. The accessory gives it its signature.",
      sections: [
        {
          titre: "The dresses' own pieces",
          texte: [],
          liste: [
            "Solana — a removable asymmetric jacket.",
            "Aster — removable sleeves.",
            "Monica — a wide belt that accents the waist.",
            "Mitra — delicate velvet ribbons.",
          ],
        },
        {
          titre: "The veil",
          texte: [
            "A tip: match its length to the train. A long veil extends a chapel train, like Finell's, or Solana's long train; a short veil reveals a worked back, like Dolores's sheer buttoned back.",
          ],
        },
        {
          titre: "Jewellery",
          texte: [
            "With a beaded or sequinned bodice — Carrie, Emerald, Angel — earrings are enough. With a simple A-line, like Fortune, a necklace or bolder earrings carry the look. The jewellery follows the neckline: a pendant for a V, nothing for a sweetheart strapless.",
          ],
        },
      ],
      aRetenir: [
        "The accessory follows the neckline.",
        "Some dresses have their own pieces.",
        "A veil matched to the train.",
      ],
      liens: [
        { href: "/robes/solana", label: "Solana" },
        { href: "/robes/monica", label: "Monica" },
        { href: "/robes/dolores", label: "Dolores" },
      ],
    },
    {
      slug: fr("trapeze", 11),
      q: "What is the difference between an A-line cut and a classic flared cut?",
      r: "\"Flared\" describes any skirt that widens towards the hem; the A-line is a precise form of it. It opens from the waist, in a straight, even line. Other flared cuts open lower — the mermaid, below the thighs — or with more fullness — the ball gown.",
      description:
        "A-line or classic flared cut: flared is a family, the A-line opens from the waist in a straight line. The difference explained by MADAMOON, Paris.",
      chapo:
        "\"Flared\" is a family name; \"A-line\" is a precise one. Here is how they fit together.",
      sections: [
        {
          titre: "Flared, a family",
          texte: [
            "A flared skirt widens towards the hem. The word does not say where it starts to open, or with how much fullness: it covers several silhouettes.",
          ],
        },
        {
          titre: "The catalogue's flared silhouettes",
          texte: [],
          liste: [
            "The A-line — it opens from the waist, evenly, in an A.",
            "The mermaid — fitted to the thighs, it flares below.",
            "The ball gown — it opens at the waist, with the real volume of an evening gown.",
          ],
        },
        {
          titre: "In the catalogue",
          texte: [
            "Aster's page speaks of an \"A-line silhouette\" with a natural waist; Mitra's, of an \"A-line\" dress with a dropped waist: the dropped waist starts the flare a little lower, without changing the A-line.",
          ],
        },
      ],
      aRetenir: [
        "Flared: any skirt that widens.",
        "A-line: it opens from the waist, in an A.",
        "The mermaid and the ball gown are other flared cuts.",
      ],
      liens: [
        { href: "/robes/aster", label: "Aster" },
        { href: "/robes/mitra", label: "Mitra" },
        { href: "/coupes/sirene/qu-est-ce-qu-une-robe-de-mariee-sirene", label: "What is a mermaid dress" },
      ],
    },
  ],
  "deux-en-un": [
    {
      slug: fr("deux-en-un", 0),
      q: "What is a two-in-one wedding dress?",
      r: "One dress, two looks: a base dress, and an overskirt, a skirt or a train that is added or detached. You move from one silhouette to another — from a long ceremony gown to a short or fitted evening dress — without changing dresses.",
      description:
        "What is a two-in-one wedding dress? A base dress and a detachable overskirt or train: two looks, one dress. The two-in-one dresses at MADAMOON, Paris.",
      chapo:
        "Two looks, one dress: the two-in-one changes silhouette during the day. Here is what defines it.",
      sections: [
        {
          titre: "A dress, and a piece that detaches",
          texte: [
            "The base dress is worn on its own: short, mermaid, fitted. An overskirt, a skirt or a train goes over it for the ceremony, and comes off when you wish. The two looks are designed together.",
          ],
        },
        {
          titre: "The boutique's two-in-one dresses",
          texte: [],
          liste: [
            "Tessa — by Casablanca Bridal, a mermaid with vintage-chic charm, a detachable overskirt and removable straps.",
            "Clover — by Casablanca Bridal, a short dress embroidered with coloured flowers, and a long overskirt \"at will\".",
            "Gabriel — by Watters Designs, a delicately beaded short dress, with a removable sheer skirt.",
            "Chastity — by Olya Mak, in lace, with long sleeves, a high neck and a long train.",
          ],
        },
        {
          titre: "Elsewhere in the catalogue",
          texte: [
            "Mira, by Monica Loretti, is filed with the mermaid dresses, but its page calls it a 2-in-1: it can be paired with a voluminous removable tulle skirt, taking it from a mermaid to a silhouette inspired by the ball gown.",
          ],
        },
      ],
      aRetenir: [
        "One dress, two looks.",
        "An overskirt, a skirt or a train that detaches.",
        "Tessa, Clover, Gabriel, Chastity — and Mira.",
      ],
      liens: [
        { href: "/coupes/deux-en-un", label: "Two-in-one dresses" },
        { href: "/robes/tessa", label: "Tessa" },
        { href: "/robes/mira", label: "Mira" },
      ],
    },
    {
      slug: fr("deux-en-un", 1),
      q: "How does a two-in-one wedding dress work?",
      r: "It is made of a base dress, worn on its own, and a piece added to it: an overskirt, a skirt or a train, attached at the waist. You wear it for the ceremony and take it off for the evening. The fastening depends on the dress and is shown at the fitting.",
      description:
        "How does a two-in-one wedding dress work? A base dress and an overskirt or skirt attached at the waist, removed for the evening. Explained by MADAMOON.",
      chapo:
        "A two-in-one is nothing complicated. It rests on two pieces designed to go together.",
      sections: [
        {
          titre: "Two pieces",
          texte: [],
          liste: [
            "The base dress — worn on its own: short like Clover or Gabriel, mermaid like Tessa or Mira.",
            "The added piece — a long overskirt (Tessa, Clover), a sheer skirt (Gabriel), a voluminous tulle skirt (Mira).",
          ],
        },
        {
          titre: "The moment of change",
          texte: [
            "Most often, the long piece is worn for the ceremony and the photographs, and removed before dinner or the first dance. A tip: plan a room to change in, and someone to help you.",
          ],
        },
        {
          titre: "The fastening",
          texte: [
            "The piece attaches at the waist; the system varies with the dress. At the fitting, have it shown how it attaches and comes off, and try doing it yourself.",
          ],
        },
      ],
      aRetenir: [
        "A base dress, an added piece.",
        "The long piece for the ceremony.",
        "The fastening is shown at the fitting.",
      ],
      liens: [
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/gabriel", label: "Gabriel" },
        { href: "/coupes/deux-en-un/transformation-robe-deux-en-un-facile", label: "An easy transformation" },
      ],
    },
    {
      slug: fr("deux-en-un", 2),
      q: "What is the difference between a two-in-one dress and a dress with an overskirt?",
      r: "The overskirt is one way of making a two-in-one: a skirt worn over the dress, which you take off. But a two-in-one can also rely on a removable skirt or a detachable train. And an overskirt that does not come off offers only one look.",
      description:
        "Two-in-one or overskirt dress: the overskirt is one way of making a two-in-one, not the only one. The difference explained by MADAMOON, Paris.",
      chapo:
        "The two words often overlap. One names a piece, the other what it makes possible.",
      sections: [
        {
          titre: "The overskirt, a piece",
          texte: [
            "A skirt worn over the dress. Detachable, it lets you change looks: this is the case with Tessa and Clover, whose long overskirt comes off.",
          ],
        },
        {
          titre: "The two-in-one, a promise",
          texte: [
            "One dress, two looks. The overskirt is the most common way, but not the only one: Gabriel has a removable sheer skirt, Mira a voluminous tulle skirt, and the boutique also speaks of trains that detach.",
          ],
        },
        {
          titre: "A tip",
          texte: [
            "If you really want two looks, check that the overskirt comes off and that the base dress stands on its own. The fitting room shows it, as you try both versions.",
          ],
        },
      ],
      aRetenir: [
        "The overskirt is a piece.",
        "The two-in-one is a dress with two looks.",
        "A fixed overskirt offers one look.",
      ],
      liens: [
        { href: "/robes/tessa", label: "Tessa" },
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/gabriel", label: "Gabriel" },
      ],
    },
    {
      slug: fr("deux-en-un", 3),
      q: "Does a two-in-one dress let you change looks during the day?",
      r: "Yes, that is its purpose. Long and formal for the ceremony, short or fitted for the evening: Clover goes from a long dress to a short floral one, Tessa from an overskirt dress to a mermaid, Mira from a ball-gown-inspired silhouette to a mermaid.",
      description:
        "Changing looks with a two-in-one wedding dress: long for the ceremony, short or mermaid for the evening. Clover, Tessa, Mira, at MADAMOON in Paris.",
      chapo:
        "A wedding day has several moments. The two-in-one has the looks for them.",
      sections: [
        {
          titre: "The catalogue's transformations",
          texte: [],
          liste: [
            "Clover — a long overskirt over a short dress embroidered with coloured flowers.",
            "Gabriel — a sheer skirt over a beaded short dress.",
            "Tessa — a detachable overskirt over a mermaid, and removable straps \"for another look\".",
            "Mira — a crêpe mermaid that, with its tulle skirt, takes on a more spectacular silhouette inspired by the ball gown.",
          ],
        },
        {
          titre: "More subtly",
          texte: [
            "Other dresses change look through a detail: Riviera's removable sleeves, which its page says let you \"vary the styles\", or Solana's removable jacket.",
          ],
        },
        {
          titre: "A tip",
          texte: [
            "Choose the moment of change in advance — after the ceremony, before dinner, at the first dance — and tell your photographer: both looks deserve their photographs.",
          ],
        },
      ],
      aRetenir: [
        "Yes: that is its purpose.",
        "Long for the ceremony, short or mermaid in the evening.",
        "Plan the moment of change.",
      ],
      liens: [
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/tessa", label: "Tessa" },
        { href: "/robes/riviera", label: "Riviera" },
      ],
    },
    {
      slug: fr("deux-en-un", 4),
      q: "How do you choose a two-in-one dress for the ceremony and the evening?",
      r: "By starting from both moments. The long version must suit the ceremony — formality, venue, covered shoulders if needed; the base dress, the evening — dancing, moving around, feeling free. Always try both versions, and the transformation itself.",
      description:
        "Choosing a two-in-one wedding dress for the ceremony and the evening: a long version for one, a free base dress for the other. Advice from MADAMOON.",
      chapo:
        "A two-in-one is chosen twice: for the ceremony, and for the evening.",
      sections: [
        {
          titre: "For the ceremony",
          texte: [
            "A tip: look at the long version as a dress in its own right. For a religious ceremony, covering sleeves and neckline, like Chastity's, in lace, with long sleeves and a high neck; for a town hall, a lighter version is enough.",
          ],
        },
        {
          titre: "For the evening",
          texte: [
            "The base dress must please you on its own: short and floral like Clover, short and beaded like Gabriel, mermaid like Tessa or Mira, whose high slit adds movement.",
          ],
        },
        {
          titre: "At the fitting",
          texte: [
            "Try both versions, walk and sit in each, and do the transformation in the fitting room. A successful two-in-one is two dresses you love equally.",
          ],
        },
      ],
      aRetenir: [
        "The long version for the ceremony.",
        "The base dress for the evening.",
        "Try both, and the change.",
      ],
      liens: [
        { href: "/robes/chastity", label: "Chastity" },
        { href: "/robes/gabriel", label: "Gabriel" },
        { href: "/robes/mira", label: "Mira" },
      ],
    },
    {
      slug: fr("deux-en-un", 5),
      q: "Is a two-in-one dress comfortable to dance in?",
      r: "Yes, it is often the most comfortable for the evening: you remove the overskirt or skirt, leaving a short or fitted dress that is much freer. The base dress must still be comfortable itself: check it at the fitting, by moving.",
      description:
        "Two-in-one wedding dress and dancing: the overskirt comes off, leaving a freer short or fitted dress. Advice and two-in-one dresses from MADAMOON, Paris.",
      chapo:
        "The evening is when the two-in-one makes the most sense.",
      sections: [
        {
          titre: "A lighter dress",
          texte: [
            "Without its long piece, the dress no longer weighs or trails. Clover and Gabriel become short dresses; Tessa and Mira, mermaids, Mira with a high slit that, according to its page, adds movement.",
          ],
        },
        {
          titre: "The base dress",
          texte: [
            "A tip: it is the one you will wear longest. Check that it lets you raise your arms, sit down and walk quickly. Tessa, for example, has a structured corset.",
          ],
        },
        {
          titre: "The shoes",
          texte: [
            "A short dress shows them: choose them for the short version as much as the long one, and consider a second pair for dancing.",
          ],
        },
      ],
      aRetenir: [
        "Yes: without the overskirt, the dress is freer.",
        "The base dress must be comfortable.",
        "A short dress shows the shoes.",
      ],
      liens: [
        { href: "/robes/gabriel", label: "Gabriel" },
        { href: "/robes/mira", label: "Mira" },
        { href: "/robes/tessa", label: "Tessa" },
      ],
    },
    {
      slug: fr("deux-en-un", 6),
      q: "Which parts of a wedding dress can be removable?",
      r: "The overskirt, the skirt or the train, to change silhouette; but also the sleeves, the straps, a jacket, a cape, and some ornaments. In the catalogue, Riviera has removable sleeves, Solana a jacket, Oksana pearl chains, Tessa and Ariel straps.",
      description:
        "Which removable parts on a wedding dress? Overskirt, skirt, train, sleeves, straps, jacket, ornaments. The removable pieces of the MADAMOON dresses in Paris.",
      chapo:
        "A dress can change through a large piece or through a detail. Here is what comes off, dress by dress.",
      sections: [
        {
          titre: "What changes the silhouette",
          texte: [],
          liste: [
            "An overskirt — Tessa, Clover.",
            "A skirt — Gabriel's sheer skirt, Mira's tulle skirt.",
          ],
        },
        {
          titre: "What changes the look",
          texte: [],
          liste: [
            "Sleeves — Riviera, Aster.",
            "Straps — Tessa, Ariel, Siddalee; Addison's off-the-shoulder straps; Oksana's beaded straps.",
            "A jacket — Solana's asymmetric jacket.",
            "Ornaments — Oksana's pearl and sequin chains; Zina's optional 3D flowers.",
          ],
        },
        {
          titre: "A tip",
          texte: [
            "A removable piece is only worthwhile if the dress is beautiful with and without it. Try both versions in the fitting room.",
          ],
        },
      ],
      aRetenir: [
        "Overskirt, skirt: the silhouette changes.",
        "Sleeves, straps, jacket: the look changes.",
        "The dress must be beautiful with and without.",
      ],
      liens: [
        { href: "/robes/riviera", label: "Riviera" },
        { href: "/robes/solana", label: "Solana" },
        { href: "/robes/oksana", label: "Oksana" },
      ],
    },
    {
      slug: fr("deux-en-un", 7),
      q: "How do you make sure the dress transforms easily?",
      r: "By doing it in the fitting room, before choosing. Have the fastening shown, take the piece off and put it back yourself, time yourself, and come with the person who will help you on the day. Also plan a garment bag for the removed piece.",
      description:
        "An easy transformation for a two-in-one wedding dress: try it in the fitting room, time it, plan who helps and where to store the overskirt. MADAMOON advice.",
      chapo:
        "Changing should take a few minutes, not half an hour. That can be checked before the big day.",
      sections: [
        {
          titre: "At the fitting",
          texte: [],
          liste: [
            "Have it shown how the piece attaches and comes off.",
            "Do it yourself, without help, then with help.",
            "Look at the base dress right after: it must fall perfectly, without marks.",
          ],
        },
        {
          titre: "On the day",
          texte: [
            "A tip: choose the person who will help you and bring them to a fitting. Plan a quiet place to change, and a garment bag or hanger for the removed piece.",
          ],
        },
        {
          titre: "At the alterations",
          texte: [
            "The dress and its piece are fitted together. The boutique's seamstresses adjust the dress on site: it is the moment to check one last time that the transformation is effortless.",
          ],
        },
      ],
      aRetenir: [
        "Try the transformation in the fitting room.",
        "Bring the person who will help.",
        "Plan where to store the removed piece.",
      ],
      liens: [
        { href: "/coupes/deux-en-un/comment-fonctionne-robe-deux-en-un", label: "How a two-in-one works" },
        { href: "/faq/duree-retouches-robe-de-mariee", label: "How long alterations take" },
        { href: "/faq/qui-emmener-essayage-robe-de-mariee", label: "Who to bring to a fitting" },
      ],
    },
    {
      slug: fr("deux-en-un", 8),
      q: "Which body shape can wear a two-in-one dress?",
      r: "All of them, provided you look at both versions: a two-in-one has the line of its base dress. The boutique recommends it first for the 8 and X body shapes, second for the A and V. Clover, Gabriel and Chastity are listed, on their pages, for all six body shapes.",
      description:
        "Two-in-one wedding dress: which body shapes? First for 8 and X, worth trying for A and V; Clover, Gabriel and Chastity for all. Advice from MADAMOON.",
      chapo:
        "A two-in-one is two silhouettes. The body shape is considered for each.",
      sections: [
        {
          titre: "What the boutique says",
          texte: [],
          liste: [
            "First — for the 8 and X body shapes, which every silhouette suits.",
            "Second — for the A and V body shapes, which benefit from trying it.",
          ],
        },
        {
          titre: "Dress by dress",
          texte: [
            "Clover, Gabriel and Chastity are listed, on their pages, for all six body shapes. Tessa, a mermaid, is listed for the V, H, 8 and X body shapes — as is Mira.",
          ],
        },
        {
          titre: "A tip",
          texte: [
            "Look at the base dress as a silhouette of its own: a mermaid, a short dress. It must suit you on its own, since it is the one you will wear all evening.",
          ],
        },
      ],
      aRetenir: [
        "First for 8 and X.",
        "Worth trying for A and V.",
        "The base dress decides.",
      ],
      liens: [
        { href: "/morphologies", label: "The six body shapes" },
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/chastity", label: "Chastity" },
      ],
    },
    {
      slug: fr("deux-en-un", 9),
      q: "How do you accessorise both versions of a two-in-one dress?",
      r: "By keeping what works for both and changing the rest. The jewellery stays; the veil goes with the long version and comes off with it; the shoes are chosen for the short version, which shows them. An evening accessory — bolder earrings, a belt — signs the second look.",
      description:
        "Accessorising a two-in-one wedding dress: jewellery for both versions, a veil for the ceremony, shoes for the short version. Advice from MADAMOON, Paris.",
      chapo:
        "Two looks, but one bride. The accessories link the two.",
      sections: [
        {
          titre: "What stays",
          texte: [
            "A tip: jewellery that suits both versions — earrings, a bracelet — so the bride stays the same from one look to the other.",
          ],
        },
        {
          titre: "What goes",
          texte: [
            "The veil goes with the long version and the ceremony; it comes off at the same time as the overskirt. A long veil extends the overskirt, a short veil already suits the short version.",
          ],
        },
        {
          titre: "What arrives",
          texte: [
            "For the evening, a new touch: a looser hairstyle, bolder earrings, a second pair of shoes. On Clover or Gabriel, short dresses, the shoes show: choose them for that version.",
          ],
        },
      ],
      aRetenir: [
        "The jewellery stays.",
        "The veil goes with the overskirt.",
        "The shoes are chosen for the short version.",
      ],
      liens: [
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/gabriel", label: "Gabriel" },
        { href: "/robes/tessa", label: "Tessa" },
      ],
    },
    {
      slug: fr("deux-en-un", 10),
      q: "Does a short dress with an overskirt suit a civil wedding?",
      r: "Yes, it is even one of the most practical. Short, it belongs at the town hall; with its overskirt, it becomes long for a religious ceremony or a reception. Clover and Gabriel are short dresses of this kind.",
      description:
        "Short wedding dress with overskirt for a civil wedding: short at the town hall, long for the reception. Clover and Gabriel, the MADAMOON two-in-one dresses in Paris.",
      chapo:
        "The town hall calls for a light dress, the party for a long one. The short dress with overskirt does both.",
      sections: [
        {
          titre: "The catalogue's dresses",
          texte: [],
          liste: [
            "Clover — a short dress embroidered with coloured flowers, and a long overskirt \"at will\".",
            "Gabriel — a delicately beaded short dress, and a removable sheer skirt.",
          ],
        },
        {
          titre: "Two ways to wear it",
          texte: [
            "A tip: short for the town hall and long for the reception, or the reverse — long for the ceremony, short for dancing. If the two take place on different days, it serves for both.",
          ],
        },
        {
          titre: "Other short dresses",
          texte: [
            "For a short dress on its own, without an overskirt: Elin, by Olya Mak, designed for a civil wedding, and River, a short A-line from the same house.",
          ],
        },
      ],
      aRetenir: [
        "Yes: short at the town hall, long afterwards.",
        "Clover and Gabriel.",
        "It can serve for two days.",
      ],
      liens: [
        { href: "/robes/clover", label: "Clover" },
        { href: "/robes/elin", label: "Elin" },
        { href: "/coupes/trapeze/robe-trapeze-ceremonie-civile", label: "An A-line for a civil ceremony" },
      ],
    },
    {
      slug: fr("deux-en-un", 11),
      q: "What are the advantages of a convertible wedding dress?",
      r: "Two looks without changing dresses; a freer evening, without the long piece; a single dress to choose, fit and carry; and photographs in two silhouettes. It also adapts to several ceremonies, from the town hall to the reception.",
      description:
        "The advantages of a convertible wedding dress: two looks, a freer evening, a single dress to fit, two silhouettes in photos. MADAMOON, Paris.",
      chapo:
        "The convertible dress answers a question many brides ask: do I need a second dress?",
      sections: [
        {
          titre: "What it brings",
          texte: [],
          liste: [
            "Two looks — a ceremony gown, an evening dress.",
            "More freedom — without the long piece, you dance, move around, sit down.",
            "A single dress — to choose, fit at the alterations, carry.",
            "Two silhouettes in photographs — without leaving the party for a long change.",
          ],
        },
        {
          titre: "Several ceremonies",
          texte: [
            "When the town hall and the reception take place on the same day or a few days apart, one dress serves for both: short at the town hall, long afterwards, like Clover or Gabriel.",
          ],
        },
        {
          titre: "What to think about",
          texte: [
            "A tip: you must love both versions equally, and the transformation must be simple. That is what the fitting shows.",
          ],
        },
      ],
      aRetenir: [
        "Two looks, one dress.",
        "A freer evening.",
        "A single dress to fit.",
      ],
      liens: [
        { href: "/coupes/deux-en-un", label: "Two-in-one dresses" },
        { href: "/robes/gabriel", label: "Gabriel" },
        { href: "/coupes/deux-en-un/elements-amovibles-robe-de-mariee", label: "Removable parts" },
      ],
    },
  ],
};
