import { MAISON } from "@/lib/madamoon";
import { SLUGS_QUESTIONS, type Article } from "@/lib/questions";

/*
 * The question pages, in English.
 *
 * Same order, same commitments as the French table. We translate, we do
 * not embellish: if a delay, a payment step or a price changes in French,
 * it changes here.
 */

const ADDRESS = `${MAISON.adresse}, ${MAISON.codePostal} ${MAISON.ville}`;

export const ARTICLES_EN: Article[] = [
  /* ————————————————————————————————————————— timing ————— */
  {
    slug: SLUGS_QUESTIONS[0],
    description:
      "Wedding dress: book your fitting eight to nine months before the wedding. Why it takes that long, and what to do if you have less time.",
    chapo:
      "Eight to nine months before the date: that is when the boutique recommends a first fitting. Here is what that time covers, and what to do if your wedding is sooner.",
    sections: [
      {
        titre: "Why eight to nine months",
        texte: [
          "At MADAMOON, a dress is not taken off a rail. Once chosen, it is made in the atelier to your measurements, then tried on and fitted on site by the boutique's seamstresses.",
          "Each of these stages needs its own time: the choice, the making, the second fitting, the alterations, the final fitting. Starting early gives each one the room it needs — and lets you reach the last weeks without rushing.",
        ],
      },
      {
        titre: "What that time covers",
        texte: ["Between your first appointment and the day you leave with your dress:"],
        ordonnee: true,
        liste: [
          "the first fitting, in a showroom reserved for you;",
          "your measurements, taken the very day you choose;",
          "the making of your dress in the atelier;",
          "a second fitting once it is ready;",
          "the alterations, done on site by our seamstresses;",
          "the final fitting, then collection.",
        ],
      },
      {
        titre: "If you have less time",
        texte: [
          "No need to worry. Tell us when you book, giving your wedding date: the boutique almost always finds a way.",
          "One piece of advice in that case: come with an idea of the silhouettes you are drawn to. The catalogue and the pages on silhouettes and body shapes are there for that — your fitting will be all the more productive.",
        ],
      },
      {
        titre: "Preparing that first appointment",
        texte: [
          "Browse the dresses online and keep the ones that stop you in your favourites. If you are unsure about the silhouette, Élise, the site's advisor, starts from your body shape and points you in a direction in a few questions.",
        ],
      },
    ],
    aRetenir: [
      "First fitting: ideally eight to nine months before the wedding.",
      "That time covers the choice, the making and the alterations.",
      "Less time? Say so when you book: there is almost always a way.",
    ],
    liens: [
      { href: "/robes", label: "See all the dresses" },
      { href: "/trouver-ma-robe", label: "Find my dress with Élise" },
      { href: "/morphologies", label: "Body shapes" },
    ],
  },

  /* ——————————————————————————————————————— the fitting ————— */
  {
    slug: SLUGS_QUESTIONS[1],
    description:
      "A wedding dress fitting at MADAMOON: the showroom reserved for you for an hour, your loved ones with you, no make-up. Free, by appointment, Paris 10e.",
    chapo:
      "An hour, a showroom that is yours alone, your loved ones around you: a fitting at MADAMOON is a private appointment. Here is how it goes.",
    sections: [
      {
        titre: "A showroom reserved for you",
        texte: [
          "As soon as you have booked, the showroom is yours alone for an hour. No other client, no waiting between fitting rooms: the hour belongs to you, and you only.",
          "The place is part of the moment — a nineteenth-century setting on rue du Faubourg Saint-Martin, designed so that a fitting is an experience to share, not a race.",
        ],
      },
      {
        titre: "How the hour goes",
        texte: [
          "The appointment starts with a conversation. Before you try anything on, the boutique wants to understand who you are, what you love and what you want your wedding day to say.",
          "Then come the recommendations — silhouette, shape, fabric — and the fittings. The aim is not to go through as many dresses as possible, but to lead you to the one in which you recognise yourself.",
        ],
      },
      {
        titre: "Coming without make-up",
        texte: [
          "To keep the dresses at their best, the boutique asks you to come without make-up: foundation and lipstick mark lace and satin, and these dresses are tried on by other brides after you. We are quite certain you are beautiful as you are.",
          "A practical tip: simple, skin-tone underwear will help you judge how each dress falls.",
        ],
      },
      {
        titre: "Preparing your visit",
        texte: [
          "If some models caught your eye on the site, mention them when you book: they will be ready for your visit. Your favourites are saved online, with one click on the heart of each dress.",
          "The fitting is free, and it is by appointment only.",
        ],
      },
    ],
    aRetenir: [
      "One hour, the showroom reserved for you.",
      "Your loved ones are welcome.",
      "Come without make-up, to protect the dresses.",
      "Free, by appointment only.",
    ],
    liens: [
      { href: "/showroom", label: "Discover the showroom" },
      { href: "/coups-de-coeur", label: "My favourites" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },

  /* ———————————————————————————————————————— the stages ————— */
  {
    slug: SLUGS_QUESTIONS[2],
    description:
      "A made-to-measure wedding dress: fitting, measurements, making in the atelier, fittings, alterations included, collection. The stages at MADAMOON, Paris.",
    chapo:
      "From the first fitting to collection, a made-to-measure dress goes through eight stages. Here they are in order, with what happens at each.",
    sections: [
      {
        titre: "The eight stages of your dress",
        texte: [],
        ordonnee: true,
        liste: [
          "The appointment — you book your first fitting, ideally eight to nine months before the wedding.",
          "The private fitting — an hour at the showroom, reserved for you and your loved ones.",
          "The measurements — once your choice is made, they are taken the same day, so the making can begin.",
          "The making — your dress is made in the atelier, to your measurements: fine fabrics, hand finishing.",
          "The second fitting — when your dress is ready, you come and try it on in the boutique.",
          "The alterations — if anything needs adjusting, our seamstresses take care of it, on site.",
          "The final fitting — it confirms the fall, the length, the ease.",
          "Collection — you leave with your dress, perfectly fitted.",
        ],
      },
      {
        titre: "Made-to-measure or semi-custom",
        texte: [
          "Most of the boutique's dresses are made to measure, from your measurements.",
          "Watters Designs dresses are semi-custom: the dress is made on the house's own pattern, then fitted to your figure. Each page on the site says how the dress is made. Either way, alterations are included.",
        ],
      },
      {
        titre: "Alterations, included",
        texte: [
          "Alterations are part of the making: they are not added to the price. They are done on site by the boutique's seamstresses, who adjust your dress right up to the last fitting.",
        ],
      },
      {
        titre: "When to pay",
        texte: [
          "Payment follows the stages: a deposit on the day of your measurements, the balance on the day of the alterations.",
        ],
      },
    ],
    aRetenir: [
      "Measurements taken the same day you choose.",
      "Made in the atelier, to your measurements — semi-custom for Watters Designs.",
      "Alterations included, done on site.",
      "A final fitting before you leave with your dress.",
    ],
    liens: [
      { href: "/robes", label: "See all the dresses" },
      { href: "/createurs/watters-designs", label: "Watters Designs" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },

  /* ——————————————————————————————————————— payment ————— */
  {
    slug: SLUGS_QUESTIONS[3],
    description:
      "Paying for a wedding dress at MADAMOON: a deposit on the day of your measurements, the balance on the day of the alterations. Alterations are included.",
    chapo:
      "Two payments, at two precise points in the journey: a deposit when the making begins, the balance once your dress is fitted.",
    sections: [
      {
        titre: "The deposit, on the day of your measurements",
        texte: [
          "Once your dress is chosen, the boutique takes your measurements the same day. The deposit is paid that day: it sets the making of your dress in motion in the atelier, to your measurements.",
        ],
      },
      {
        titre: "The balance, on the day of the alterations",
        texte: [
          "When your dress is ready, you come and try it on in the boutique. If it needs adjusting, an alterations appointment is arranged with one of the seamstresses, on site. The balance is paid that day.",
        ],
      },
      {
        titre: "What the price includes",
        texte: [
          "The price of a made-to-measure dress includes its making and its alterations: the adjustments made by our seamstresses are not added to the bill. Accessories sold separately — a veil, gloves — are paid for on their own.",
        ],
      },
      {
        titre: "The details, with the boutique",
        texte: [
          "The amount of the deposit and the payment methods are settled with the boutique when you choose your dress. Do ask during your appointment, or call the showroom beforehand.",
        ],
      },
    ],
    aRetenir: [
      "A deposit, on the day of your measurements.",
      "The balance, on the day of the alterations.",
      "Alterations are included in the price.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Book an appointment" },
      { href: "/robes", label: "See all the dresses" },
    ],
  },

  /* ————————————————————————————————————————— price ————— */
  {
    slug: SLUGS_QUESTIONS[4],
    description:
      "The price of a made-to-measure wedding dress at MADAMOON: from €1,500, alterations included. What makes the price vary, and how to find it out.",
    chapo:
      "A made-to-measure wedding dress at MADAMOON starts at €1,500, alterations included. Here is what that price covers, and why it varies from one dress to another.",
    sections: [
      {
        titre: "From €1,500",
        texte: [
          "That is the starting price of a dress made to measure by the boutique. It includes the making in the atelier, to your measurements, and the alterations done on site by our seamstresses up to the last fitting.",
        ],
      },
      {
        titre: "What makes the price vary",
        texte: [
          "From one dress to another, the price depends first on the model and the house that designed it, then on what it is made of: the fabric — satin, crêpe, tulle, Chantilly lace —, how dense the embroidery is, the fullness of the skirt, the length of the train.",
          "Some dresses come with pieces sold separately, such as a veil or gloves. They are chosen on their own, and are not included in the price of the dress.",
        ],
      },
      {
        titre: "A made-to-measure dress has no price tag",
        texte: [
          "Its price is worked out with you, according to the model and what you make of it. The boutique prefers to discuss it in person, dress by dress, rather than quote a figure that would not match yours.",
        ],
      },
      {
        titre: "Finding out the price of a model",
        texte: [
          "Contact the boutique directly with the models you are interested in, or ask during your fitting. You can keep those models in your favourites on the site, to find them again easily.",
        ],
      },
    ],
    aRetenir: [
      "From €1,500 for a made-to-measure dress.",
      "Making and alterations included.",
      "The price varies with the model, the house and the fabrics.",
      "For a specific model: contact the boutique.",
    ],
    liens: [
      { href: "/robes", label: "See all the dresses" },
      { href: "/coups-de-coeur", label: "My favourites" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },

  /* ——————————————————————————————————— coming with others ————— */
  {
    slug: SLUGS_QUESTIONS[5],
    description:
      "Bringing someone to your wedding dress fitting: yes, and we recommend it. The MADAMOON showroom is reserved for you and your loved ones. Paris 10e.",
    chapo:
      "Yes — and we recommend it. The showroom is reserved for you: your family and your friends are welcome for the whole of the fitting.",
    sections: [
      {
        titre: "A moment to share",
        texte: [
          "Choosing a wedding dress is rarely done alone. Because the showroom is reserved for you for an hour, your loved ones are not onlookers standing in an aisle: they are your guests, for the length of the fitting.",
          "The boutique wanted it that way — a setting designed to make the fitting an experience to share with the people who matter.",
        ],
      },
      {
        titre: "Who to bring",
        texte: [
          "A piece of advice: come with the people whose opinion really matters to you, and who help you see clearly. A mother, a sister, a friend who knows you well.",
          "If you are coming as a group, say so when you book: the boutique can prepare for your visit.",
        ],
      },
      {
        titre: "Your own eye first",
        texte: [
          "Your loved ones' opinions are precious, but you are the one who will wear the dress. The advisor is there to help you weigh them — and to recognise the dress in which you feel like yourself.",
        ],
      },
    ],
    aRetenir: [
      "Yes, and we recommend it.",
      "The showroom is reserved for you and your loved ones.",
      "Coming as a group? Say so when you book.",
    ],
    liens: [
      { href: "/showroom", label: "Discover the showroom" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },

  /* ————————————————————————————————————— the showroom ————— */
  {
    slug: SLUGS_QUESTIONS[6],
    description: `The MADAMOON showroom: ${ADDRESS}. Fittings by appointment, Monday 12pm to 9pm, Tuesday to Saturday 10am to 7pm.`,
    chapo: `The MADAMOON showroom is at ${ADDRESS}. Fittings there are by appointment only.`,
    sections: [
      {
        titre: "The address",
        texte: [
          `${ADDRESS}, in the 10th arrondissement. The showroom sits in an elegant nineteenth-century setting: a timeless place, designed for trying on a wedding dress.`,
        ],
      },
      {
        titre: "Opening hours",
        texte: ["Fittings are by appointment only:"],
        liste: ["Monday, 12pm to 9pm;", "Tuesday to Saturday, 10am to 7pm."],
      },
      {
        titre: "Why by appointment",
        texte: [
          "Because the showroom is reserved for each bride, for an hour. An appointment guarantees you the place, the dresses and the boutique's full attention — no waiting, and no other client in the fitting room.",
        ],
      },
      {
        titre: "Getting in touch",
        texte: [
          `By phone on ${MAISON.telephone}, or by email at ${MAISON.email}. For directions, the boutique's Google Maps listing will guide you to the door.`,
        ],
      },
    ],
    aRetenir: [ADDRESS, "Monday: 12pm – 9pm. Tuesday to Saturday: 10am – 7pm.", "By appointment only."],
    liens: [
      { href: "/showroom", label: "Discover the showroom" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },

  /* ——————————————————————————————————— body shape ————— */
  {
    slug: SLUGS_QUESTIONS[7],
    description:
      "Wedding dress and body shape: which silhouettes for an O, A, V, H, 8 or X figure. Advice from the MADAMOON boutique, Paris 10e.",
    chapo:
      "No dress is off-limits: some silhouettes simply serve certain figures better. Here are the pointers the boutique gives, body shape by body shape.",
    sections: [
      {
        titre: "Six figures, six starting points",
        texte: ["The silhouettes to try first, according to your body shape:"],
        liste: [
          "O — generous curves: sheath and A-line dresses lengthen the line; a V or sweetheart neckline flatters the bust.",
          "A — hips wider than shoulders: ball gowns and A-lines balance the figure; a bateau neckline widens the shoulders.",
          "V — broad shoulders: sheath and ball-gown silhouettes soften the top and add volume below.",
          "H — a straight line: sheath dresses and light mermaids draw curves without forcing them.",
          "8 — balanced shoulders and hips, a defined waist: every silhouette works.",
          "X — soft curves and a slim waist: every silhouette suits you; let the style of your wedding guide the choice.",
        ],
      },
      {
        titre: "Pointers, not rules",
        texte: [
          "A body shape never rules a dress out: it opens up options. Nothing is \"to avoid\" — it is style advice, not a rule. Brides often find themselves in a silhouette they would not have chosen on paper.",
          "That is why the fitting matters: the boutique suggests what will serve you, and the mirror does the rest.",
        ],
      },
      {
        titre: "Finding your body shape",
        texte: [
          "Each body shape has its own page on the site, with the boutique's dresses that suit it best. If you are unsure of yours, Élise, the site's advisor, points you in a direction in three questions.",
        ],
      },
    ],
    aRetenir: [
      "O: sheath, A-line. A: ball gown, A-line.",
      "V: sheath, ball gown. H: sheath, mermaid.",
      "8 and X: every silhouette.",
      "These are pointers: the fitting decides.",
    ],
    liens: [
      { href: "/morphologies", label: "The six body shapes" },
      { href: "/trouver-ma-robe", label: "Find my dress with Élise" },
      { href: "/coupes", label: "Silhouettes" },
    ],
  },

  /* ——————————————————————————————————— when to try it on ————— */
  {
    slug: SLUGS_QUESTIONS[8],
    description:
      "When to try on your wedding dress: a first fitting eight to nine months before, a second when the dress is ready, a final fitting after the alterations.",
    chapo:
      "You do not try your dress on once, but three times. Here is where each of those fittings falls in the calendar.",
    sections: [
      {
        titre: "The three fittings over time",
        texte: [],
        ordonnee: true,
        liste: [
          "The first fitting — ideally eight to nine months before the wedding. You choose your dress, and your measurements are taken the same day.",
          "The second fitting — when your dress comes out of the atelier. You try it on in the boutique to see what needs adjusting.",
          "The final fitting — after the alterations. It confirms the fall, the length, the ease, and you leave with your dress.",
        ],
      },
      {
        titre: "Why start so early",
        texte: [
          "Between the first and second fittings comes the making: your dress is made in the atelier, to your measurements. That is what takes the longest, and it is why the boutique recommends eight to nine months.",
        ],
      },
      {
        titre: "If the wedding is close",
        texte: [
          "Give your wedding date when you book: the boutique almost always finds a way. The schedule of the following fittings is then set with it.",
        ],
      },
    ],
    aRetenir: [
      "First fitting: eight to nine months before.",
      "Second fitting: when the dress is ready.",
      "Final fitting: after the alterations.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Book an appointment" },
      { href: `/faq/${SLUGS_QUESTIONS[2]}`, label: "The stages of made-to-measure" },
    ],
  },

  /* ——————————————————————————————————— alterations ————— */
  {
    slug: SLUGS_QUESTIONS[9],
    description:
      "Wedding dress alterations at MADAMOON: after the second fitting, done on site by our seamstresses, included in the made-to-measure dress.",
    chapo:
      "Alterations come late in the journey, once the dress is made. Here is when they happen, who does them, and how their schedule is set.",
    sections: [
      {
        titre: "When they happen",
        texte: [
          "When your dress is ready, you come and try it on in the boutique. That second fitting shows whether anything needs adjusting. If so, an alterations appointment is arranged with one of our seamstresses, on site.",
        ],
      },
      {
        titre: "How long",
        texte: [
          "There is no single answer: it depends on the dress — its fabric, its construction, its length — and on what needs adjusting. The alterations schedule is set with the boutique after the second fitting, with your wedding date in mind.",
        ],
      },
      {
        titre: "What the alterations include",
        texte: [
          "Alterations are included in the made-to-measure dress: they are not added to the price. Our seamstresses adjust your dress up to the last fitting, which confirms the fall, the length and the ease. The balance is paid on the day of the alterations.",
        ],
      },
    ],
    aRetenir: [
      "After the second fitting, on site.",
      "Duration depends on the dress and the adjustments.",
      "Included in the made-to-measure dress.",
    ],
    liens: [
      { href: `/faq/${SLUGS_QUESTIONS[2]}`, label: "The stages of made-to-measure" },
      { href: `/faq/${SLUGS_QUESTIONS[3]}`, label: "Payment" },
    ],
  },

  /* ——————————————————————————————————— number of fittings ————— */
  {
    slug: SLUGS_QUESTIONS[10],
    description:
      "How many fittings for a wedding dress: three at MADAMOON — the choice, the second fitting, the final fitting — plus alterations if needed.",
    chapo:
      "Three fittings, and sometimes an alterations appointment between the last two. Here is what happens at each.",
    sections: [
      {
        titre: "The three fittings",
        texte: [],
        ordonnee: true,
        liste: [
          "The first — an hour in the showroom reserved for you: you choose your dress, and your measurements are taken the same day.",
          "The second — your dress is out of the atelier: you try it on to see what needs adjusting.",
          "The final — after the alterations: it confirms the fall, the length, the ease.",
        ],
      },
      {
        titre: "And the alterations",
        texte: [
          "If your dress needs adjusting after the second fitting, an alterations appointment is arranged with one of our seamstresses, on site. They are included in the made-to-measure dress.",
        ],
      },
      {
        titre: "Coming prepared",
        texte: [
          "A tip: from the second fitting on, bring the underwear and, if possible, the shoes you will wear on the day. The length and fall of the dress are adjusted over them.",
        ],
      },
    ],
    aRetenir: [
      "Three fittings: the choice, the second, the final.",
      "An alterations appointment if needed.",
      "Bring underwear and shoes from the second.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Book an appointment" },
      { href: `/faq/${SLUGS_QUESTIONS[1]}`, label: "How a fitting works" },
    ],
  },

  /* ——————————————————————————————————— appointment ————— */
  {
    slug: SLUGS_QUESTIONS[11],
    description:
      "Trying on a wedding dress at MADAMOON is by appointment only: the showroom is reserved for you for an hour. Book online, Paris 10e.",
    chapo:
      "Yes: the MADAMOON showroom receives brides by appointment only. Here is why, and how to book.",
    sections: [
      {
        titre: "Why by appointment",
        texte: [
          "Because the showroom is reserved for each bride, for an hour. An appointment guarantees you the place, the dresses and the boutique's full attention — no waiting, and no other client in the fitting room.",
        ],
      },
      {
        titre: "How to book",
        texte: [
          "You can book online by choosing a time slot, or by phone. If some dresses caught your eye on the site, mention them when you book: they will be ready for your visit.",
        ],
      },
      {
        titre: "Opening hours",
        texte: ["The showroom receives brides:"],
        liste: ["Monday, 12pm to 9pm;", "Tuesday to Saturday, 10am to 7pm."],
      },
    ],
    aRetenir: [
      "By appointment only.",
      "One hour, the showroom reserved for you.",
      "Book online or by phone.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Book an appointment" },
      { href: "/showroom", label: "Discover the showroom" },
    ],
  },

  /* ——————————————————————————————————— winter wedding ————— */
  {
    slug: SLUGS_QUESTIONS[12],
    description:
      "A winter wedding dress: long sleeves, a high neck, mikado, satin, crêpe or a cape. MADAMOON dresses for a cold-season wedding, Paris 10e.",
    chapo:
      "A winter wedding suits dresses that cover up and have body. Here is what to look for, and the boutique's dresses that lend themselves to it.",
    sections: [
      {
        titre: "What makes a winter dress",
        texte: ["A few markers, for a dress that will not leave you shivering in the photos:"],
        liste: [
          "long sleeves, in lace or tulle, or detachable sleeves you remove for the evening;",
          "a high neck or a more covered back;",
          "fabrics with body: mikado, satin, crêpe;",
          "a cape or a stole over the shoulders, for leaving the town hall or the church.",
        ],
      },
      {
        titre: "The boutique's dresses",
        texte: [
          "Several dresses in the catalogue have long sleeves: Seraphina by Olya Mak, in embroidered lace; Montana and Bella by Casablanca Bridal; Pendant by Watters Designs. Others have detachable sleeves, like Aster or Riviera. Sheridan comes with a matching cape.",
          "The mikado dresses — Trinity, Fern, Livia, Kensington — have the body of a winter fabric.",
        ],
      },
      {
        titre: "Winter light",
        texte: [
          "A tip: in winter, the light is lower and colder. Satin and mikado catch it well, and lace reads better on a more structured dress.",
        ],
      },
    ],
    aRetenir: [
      "Long or detachable sleeves, a high neck.",
      "Mikado, satin, crêpe: fabrics that hold.",
      "A cape for going outside.",
    ],
    liens: [
      { href: "/robes/seraphina", label: "Seraphina" },
      { href: "/robes/montana", label: "Montana" },
      { href: "/robes/pendant", label: "Pendant" },
      { href: "/robes", label: "See all the dresses" },
    ],
  },

  /* ——————————————————————————————————— who to bring ————— */
  {
    slug: SLUGS_QUESTIONS[13],
    description:
      "Who to bring to your wedding dress fitting: the people whose opinion matters and who help you see clearly. The MADAMOON showroom is reserved for you.",
    chapo:
      "A fitting is shared, but it is also prepared: choosing who comes with you matters almost as much as choosing the dresses.",
    sections: [
      {
        titre: "Those whose opinion matters",
        texte: [
          "A piece of advice: come with the people whose eye helps you see clearly — a mother, a sister, a friend who knows you well. Those who know what you like, and will tell you honestly.",
        ],
      },
      {
        titre: "Not too many",
        texte: [
          "The more opinions, the more they contradict each other. A small circle leaves more room for your own eye, and for the conversation with the advisor. If you are coming as a group, say so when you book: the boutique can prepare for your visit.",
        ],
      },
      {
        titre: "A place made to welcome them",
        texte: [
          "The showroom is reserved for you for an hour: your loved ones are not standing in an aisle, they are your guests, for the length of the fitting.",
        ],
      },
    ],
    aRetenir: [
      "The people whose opinion really matters.",
      "A small circle, to keep your own eye.",
      "Coming as a group? Say so when you book.",
    ],
    liens: [
      { href: `/faq/${SLUGS_QUESTIONS[5]}`, label: "Bringing someone with you" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },

  /* ——————————————————————————————————— when to start looking ————— */
  {
    slug: SLUGS_QUESTIONS[14],
    description:
      "When to start looking for your wedding dress: as soon as the date is set for ideas, and a fitting eight to nine months before. How to prepare your search.",
    chapo:
      "The search starts well before the fitting. Here is how to organise it, from setting the date to your first appointment in the boutique.",
    sections: [
      {
        titre: "As soon as the date is set",
        texte: [
          "That is the right time to look, without pressure: the silhouettes you are drawn to, the fabrics, the details — a back, sleeves, a train. On the site, keep the dresses that stop you in your favourites.",
        ],
      },
      {
        titre: "Understanding what suits you",
        texte: [
          "The pages on silhouettes and body shapes help you know where to start. Élise, the site's advisor, starts from your figure and points you in a direction in three questions.",
        ],
      },
      {
        titre: "Then the fitting, eight to nine months before",
        texte: [
          "The first fitting in the boutique is ideally planned eight to nine months before the wedding: that is the time needed for the making and the alterations. Arriving with a few favourites, and an idea of the silhouettes you like, makes that appointment more productive.",
        ],
      },
    ],
    aRetenir: [
      "Once the date is set: gather ideas, keep favourites.",
      "Understand the silhouettes and your body shape.",
      "Fitting in the boutique: eight to nine months before.",
    ],
    liens: [
      { href: "/robes", label: "See all the dresses" },
      { href: "/coupes", label: "Silhouettes" },
      { href: "/trouver-ma-robe", label: "Find my dress with Élise" },
    ],
  },

  /* ——————————————————————————————————— how many dresses ————— */
  {
    slug: SLUGS_QUESTIONS[15],
    description:
      "How many wedding dresses to try: there is no right number, but a few well-chosen dresses in different silhouettes. Advice from MADAMOON, Paris 10e.",
    chapo: "There is no right number. There is a method: try fewer, but better.",
    sections: [
      {
        titre: "A few well-chosen dresses",
        texte: [
          "A long series blurs the eye: after a few dresses, you no longer remember the first. Better a small number of dresses chosen with the advisor, according to your figure and what you love.",
        ],
      },
      {
        titre: "Different silhouettes",
        texte: [
          "A tip: try at least one dress in a silhouette you would not have chosen. Many brides discover themselves in a mermaid or a ball gown they had ruled out on paper.",
        ],
      },
      {
        titre: "Recognising the one",
        texte: [
          "The fitting hour is not for going through dresses, but for leading you to the one in which you fully recognise yourself. When it is the one, you no longer want to try another.",
        ],
      },
    ],
    aRetenir: [
      "There is no right number.",
      "A few dresses, in different silhouettes.",
      "One unexpected silhouette, at least once.",
    ],
    liens: [
      { href: "/coupes", label: "Silhouettes" },
      { href: `/faq/${SLUGS_QUESTIONS[1]}`, label: "How a fitting works" },
    ],
  },

  /* ——————————————————————————————————— made-to-measure or ready-to-wear ————— */
  {
    slug: SLUGS_QUESTIONS[16],
    description:
      "Made-to-measure or ready-to-wear wedding dress: standard sizes, or made to your measurements. At MADAMOON: to measure or semi-custom, alterations included.",
    chapo: "Two ways of making a wedding dress. Here is what sets them apart, and what the boutique offers.",
    sections: [
      {
        titre: "Ready-to-wear",
        texte: [
          "A ready-to-wear dress comes in standard sizes. You choose the size closest to yours, then the dress is altered to fit.",
        ],
      },
      {
        titre: "Made-to-measure",
        texte: [
          "A made-to-measure dress is made to your measurements, taken on the day you choose it. It is then tried on, and adjusted by seamstresses up to the last fitting.",
        ],
      },
      {
        titre: "At MADAMOON",
        texte: [
          "The boutique's dresses are made in the atelier, to measure. Watters Designs dresses are semi-custom: they are made on the house's own pattern, then fitted to your figure. Each page on the site says how the dress is made.",
          "Either way, alterations are included. A made-to-measure dress starts at €1,500.",
        ],
      },
    ],
    aRetenir: [
      "Ready-to-wear: standard sizes, then alterations.",
      "Made-to-measure: made to your measurements.",
      "MADAMOON: made to measure, semi-custom for Watters.",
    ],
    liens: [
      { href: `/faq/${SLUGS_QUESTIONS[2]}`, label: "The stages of made-to-measure" },
      { href: `/faq/${SLUGS_QUESTIONS[4]}`, label: "The price of a made-to-measure dress" },
    ],
  },

  /* ——————————————————————————————————— caring for lace ————— */
  {
    slug: SLUGS_QUESTIONS[17],
    description:
      "Caring for a lace wedding dress: a breathable bag, a wide hanger, away from light, then a specialist dry cleaner after the wedding.",
    chapo:
      "Lace is the most delicate fabric on a dress. A few simple habits keep it beautiful, before and after the wedding.",
    sections: [
      {
        titre: "Before the wedding",
        texte: ["Once you have collected your dress:"],
        liste: [
          "keep it in a breathable fabric bag rather than plastic;",
          "on a wide hanger that will not mark the shoulders — or flat if it is heavy;",
          "away from light and damp;",
          "handle it with clean hands, without cream or perfume.",
        ],
      },
      {
        titre: "After the wedding",
        texte: [
          "Take it to a dry cleaner who specialises in wedding dresses rather than washing it yourself: lace loses its shape, snags and marks easily. The sooner it is cleaned, the better stains come out.",
        ],
      },
      {
        titre: "To keep it for years",
        texte: [
          "After cleaning, store it flat in a box, between sheets of acid-free tissue paper, somewhere dry. A tip: take it out from time to time and fold it differently, so the creases do not always mark the same place.",
        ],
      },
    ],
    aRetenir: [
      "Fabric bag, wide hanger, away from light.",
      "A specialist dry cleaner after the wedding.",
      "Stored flat, in tissue paper.",
    ],
    liens: [{ href: "/robes", label: "See all the dresses" }],
  },

  /* ——————————————————————————————————— under a mermaid dress ————— */
  {
    slug: SLUGS_QUESTIONS[18],
    description:
      "What to wear under a mermaid wedding dress: seamless, skin-tone underwear, chosen for the neckline and back. Worn from the second fitting.",
    chapo:
      "A mermaid dress follows the figure down to the knees: underneath, everything shows. Here is how to choose what you wear beneath it.",
    sections: [
      {
        titre: "Seamless and skin-tone",
        texte: [
          "Smooth underwear, without seams or raised lace, that leaves no lines under the fabric. Skin tone, close to your own, disappears under pale fabrics — pure white shows through.",
        ],
      },
      {
        titre: "According to the neckline and back",
        texte: [
          "A sweetheart neckline or bare shoulders call for a strapless bra; an open or very low back, a solution suited to the back. Some dresses have a structured corset that already supports the bust: ask the boutique.",
        ],
      },
      {
        titre: "From the second fitting",
        texte: [
          "A tip: wear this underwear from the second fitting on. The dress is fitted over what you will wear on the day — a change after the alterations can throw everything off.",
        ],
      },
    ],
    aRetenir: [
      "Seamless, skin-tone.",
      "Chosen for the neckline and the back.",
      "Worn from the second fitting.",
    ],
    liens: [
      { href: "/coupes/sirene", label: "Mermaid dresses" },
      { href: `/faq/${SLUGS_QUESTIONS[10]}`, label: "How many fittings" },
    ],
  },

  /* ——————————————————————————————————— bought online ————— */
  {
    slug: SLUGS_QUESTIONS[19],
    description:
      "Altering a wedding dress bought online: often possible, depending on the cut, the fabric and the gap with your measurements. What to know first.",
    chapo:
      "A dress bought online rarely arrives at your exact measurements. It can often be altered — but not always, and not at any price.",
    sections: [
      {
        titre: "What can be altered",
        texte: [
          "Most often, a seamstress used to wedding dresses can take in the waist, the sides, the straps and the hem. It all depends on the cut, the fabric and how far it is from your measurements.",
        ],
      },
      {
        titre: "What alters badly",
        texte: [
          "A dress that is too small is hard to rescue: letting it out needs fabric in the seams. Lace appliquéd motif by motif, embroidery and beading take long, painstaking work. And a hem on a train or a multi-layered skirt is redone layer by layer.",
        ],
      },
      {
        titre: "At MADAMOON",
        texte: [
          "Alterations are included for the dresses the boutique makes, to measure or semi-custom. For a dress bought elsewhere, ask the boutique directly.",
        ],
      },
    ],
    aRetenir: [
      "Often possible, with a specialist seamstress.",
      "A dress that is too small alters badly.",
      "MADAMOON: alterations included for its dresses.",
    ],
    liens: [
      { href: `/faq/${SLUGS_QUESTIONS[16]}`, label: "Made-to-measure or ready-to-wear" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },

  /* ——————————————————————————————————— where to try in Paris ————— */
  {
    slug: SLUGS_QUESTIONS[20],
    description: `Where to try on a wedding dress in Paris? At the MADAMOON showroom, ${MAISON.adresse}, Paris 10th: by appointment, reserved for you for an hour.`,
    chapo:
      "To try on a wedding dress in Paris, you need a place, time and dresses. Here is what the MADAMOON showroom keeps for you.",
    sections: [
      {
        titre: "The showroom",
        texte: [
          `${ADDRESS}, in the 10th arrondissement. The showroom occupies an elegant 19th-century setting, designed for trying on a wedding dress.`,
        ],
      },
      {
        titre: "A place for you alone",
        texte: [
          "Fittings are by appointment only: the showroom is reserved for each bride for an hour. Your loved ones are welcome throughout the fitting.",
        ],
        liste: ["Monday, 12pm to 9pm;", "Tuesday to Saturday, 10am to 7pm."],
      },
      {
        titre: "The dresses",
        texte: [
          "Those of four houses — Casablanca Bridal, Watters Designs, Monica Loretti and Olya Mak — in five silhouettes: mermaid, ball gown, sheath, A-line and two-in-one. The dresses are then made in the atelier, to your measurements, alterations included.",
        ],
      },
    ],
    aRetenir: [
      ADDRESS,
      "By appointment, the showroom reserved for an hour.",
      "Four houses, five silhouettes.",
    ],
    liens: [
      { href: "/showroom", label: "Discover the showroom" },
      { href: `/faq/${SLUGS_QUESTIONS[6]}`, label: "Address and opening hours" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },

  /* ——————————————————————————————————— what to bring ————— */
  {
    slug: SLUGS_QUESTIONS[21],
    description:
      "What to bring to your first wedding dress fitting: come without make-up, with loved ones, shoes, suitable underwear and a few pictures.",
    chapo:
      "The first fitting takes a little preparation. Here is what to bring — and what is better left at home.",
    sections: [
      {
        titre: "What the boutique asks",
        texte: [
          "Come without make-up: it protects the dresses, which other brides will try after you. And come with others if you wish — the showroom is reserved for you, your loved ones are welcome.",
        ],
      },
      {
        titre: "What is useful to bring",
        texte: [],
        liste: [
          "Shoes — at the heel height you have in mind: a dress does not fall the same way flat or on a heel.",
          "Seamless, skin-tone underwear — it leaves no lines under light fabrics.",
          "A few pictures — dresses saved online in your favourites, or photographs of the wedding venue.",
          "The wedding date — it sets the making calendar.",
        ],
      },
      {
        titre: "What is better left behind",
        texte: [
          "A tip: too many opinions. Two or three people who know you well help more than a large gathering.",
        ],
      },
    ],
    aRetenir: [
      "No make-up.",
      "Shoes and suitable underwear.",
      "A few pictures, and the wedding date.",
    ],
    liens: [
      { href: `/faq/${SLUGS_QUESTIONS[1]}`, label: "How the fitting works" },
      { href: `/faq/${SLUGS_QUESTIONS[13]}`, label: "Who to bring to a fitting" },
      { href: "/coups-de-coeur", label: "Your favourites" },
    ],
  },

  /* ——————————————————————————————————— several silhouettes ————— */
  {
    slug: SLUGS_QUESTIONS[22],
    description:
      "Can you try several wedding dress silhouettes in one appointment? Yes: mermaid, ball gown, sheath, A-line, compared in a private showroom.",
    chapo:
      "Many brides arrive sure of one silhouette and leave in love with another. Trying several gives you that chance.",
    sections: [
      {
        titre: "Yes, and it is recommended",
        texte: [
          "A silhouette is judged on you, not in a photograph. A few well-chosen dresses, in different silhouettes, quickly show you what suits you — and what does not.",
        ],
      },
      {
        titre: "The five silhouettes",
        texte: [],
        liste: [
          "Mermaid — fitted to the thighs, then flared.",
          "Ball gown — a crafted corset, an assumed volume.",
          "Sheath — a soft drape that follows movement.",
          "A-line — a fitted bodice, an A-shaped skirt.",
          "Two-in-one — one dress, two looks.",
        ],
      },
      {
        titre: "A tip",
        texte: [
          "Start with the silhouette you dream of, then try its opposite: a mermaid after a ball gown, a sheath after an A-line. The contrast often tells you more than a long series. As the showroom is reserved for you for an hour, you have time to compare.",
        ],
      },
    ],
    aRetenir: [
      "Yes: it is even recommended.",
      "A silhouette is judged on you.",
      "Try your dream silhouette, then its opposite.",
    ],
    liens: [
      { href: "/coupes", label: "The five silhouettes" },
      { href: `/faq/${SLUGS_QUESTIONS[15]}`, label: "How many dresses to try" },
      { href: "/morphologies", label: "Body shapes" },
    ],
  },

  /* ——————————————————————————————————— preparing the appointment ————— */
  {
    slug: SLUGS_QUESTIONS[23],
    description:
      "Preparing your appointment to choose a wedding dress in Paris: book eight to nine months ahead, pick out silhouettes, choose who comes with you.",
    chapo:
      "A well-prepared appointment makes every minute of the fitting count. Here is how to arrive ready.",
    sections: [
      {
        titre: "The steps",
        ordonnee: true,
        texte: [],
        liste: [
          "Book — ideally eight to nine months before the wedding, online or by phone.",
          "Pick out — a few silhouettes and dresses you like, in the catalogue or on the silhouette pages.",
          "Think about your body shape — the page for each, or Élise, the site's adviser, guide you in a few questions.",
          "Think about the wedding — the venue, the season, the ceremony: a town hall, a church and an estate do not call for the same dress.",
          "Choose who comes with you — two or three people whose opinion matters.",
          "On the day — come without make-up, in shoes at the right heel height.",
        ],
      },
      {
        titre: "If you have less time",
        texte: [
          "Say so when you book, giving the wedding date: the boutique almost always finds a solution.",
        ],
      },
    ],
    aRetenir: [
      "Book eight to nine months ahead.",
      "Arrive with a few favourites.",
      "Come without make-up, well accompanied.",
    ],
    liens: [
      { href: "/rendez-vous", label: "Book an appointment" },
      { href: "/trouver-ma-robe", label: "Find my dress with Élise" },
      { href: `/faq/${SLUGS_QUESTIONS[21]}`, label: "What to bring" },
    ],
  },

  /* ——————————————————————————————————— torn between dresses ————— */
  {
    slug: SLUGS_QUESTIONS[24],
    description:
      "Torn between several wedding dresses after the fitting: compare, set aside, try your finalists again, while keeping the calendar in mind. MADAMOON advice.",
    chapo:
      "Hesitating is normal: it often means several dresses suit you. Here is how to decide calmly.",
    sections: [
      {
        titre: "Compare",
        texte: [
          "A tip: right after the fitting, note what you liked in each dress — the silhouette, the fabric, the neckline, how you felt. Often two dresses share the same quality, and that is what you are looking for.",
        ],
      },
      {
        titre: "Set aside",
        texte: [
          "First remove the one that convinces you least, then ask yourself which one you can see yourself walking in, dancing in, being photographed in. And listen to yourself before your loved ones: you are the one who will wear it.",
        ],
      },
      {
        titre: "Try again",
        texte: [
          "A new appointment lets you try your two or three finalists again, with a rested mind; it is booked like the first, online or by phone. Just keep an eye on the calendar: making begins once your choice is made, and your measurements are taken the same day.",
        ],
      },
    ],
    aRetenir: [
      "Note what you like in each.",
      "Set aside, then listen to yourself.",
      "Try your finalists again, without waiting too long.",
    ],
    liens: [
      { href: `/faq/${SLUGS_QUESTIONS[15]}`, label: "How many dresses to try" },
      { href: `/faq/${SLUGS_QUESTIONS[2]}`, label: "The made-to-measure steps" },
      { href: "/rendez-vous", label: "Book an appointment" },
    ],
  },
];
