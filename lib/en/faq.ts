import { MAISON } from "@/lib/madamoon";

/*
 * La FAQ en anglais, rangée dans l'ordre de la table française.
 *
 * Les réponses portent des engagements de la maison — délais, acompte,
 * prix de départ. On traduit, on n'arrange pas : si un chiffre change en
 * français, il change ici.
 */

export const FAQ_EN: { q: string; r: string; horsElise?: boolean }[] = [
  {
    q: "How long before the wedding should I come?",
    r: "Ideally, book your fitting eight to nine months before the wedding date. There is no need to worry if you have less time than that: we will always find a way. Simply book an appointment, and we take care of the rest.",
  },
  {
    q: "How does a fitting at the showroom work?",
    r: "As soon as you have booked, the showroom is yours alone for an hour. You are welcome to come with your family or your friends. So that we may keep our dresses at their best, please come without make-up: we are quite certain you are beautiful as you are.",
  },
  {
    q: "What are the stages of a made-to-measure dress?",
    r: "The first stage is your first fitting appointment. Once the fitting is over and your choice is made, we take your measurements the same day so the atelier can begin. When your dress is ready, you come and try it on in the boutique to see whether anything needs adjusting. If so, an alterations appointment is arranged with one of our seamstresses on site. Finally, you collect your dress after the last fitting.",
  },
  {
    q: "How does payment work?",
    r: "A deposit is paid on the day your measurements are taken. The balance is paid on the day of the alterations.",
  },
  {
    q: "What is the price range for a made-to-measure dress?",
    r: "For a made-to-measure dress, prices start from €1,500. Do contact us directly for more detail on the models you have in mind.",
    horsElise: true,
  },
  {
    q: "May I bring someone with me?",
    r: "Yes, and we recommend it. The showroom is private: your family and your friends are welcome for the whole of the fitting.",
  },
  {
    q: "Where is the MADAMOON showroom?",
    r: `At ${MAISON.adresse}, ${MAISON.codePostal} ${MAISON.ville}. Fittings take place by appointment only: Monday 12pm to 9pm, Tuesday to Saturday 10am to 7pm.`,
  },
  /* The questions added in October 2026, in the order of the French table. */
  {
    q: "How do I choose a wedding dress for my body shape?",
    r: "Start from your figure: sheath and A-line dresses lengthen an O shape, ball gowns and A-lines balance an A shape, light mermaid dresses draw curves on an H shape. For an 8 or X figure, every silhouette works. These are pointers, not rules: the fitting decides.",
  },
  {
    q: "How long before the wedding should I try on my dress?",
    r: "The first fitting ideally takes place eight to nine months before the wedding. You then try your dress on a second time when it is ready, and a last time after the alterations, before collecting it.",
  },
  {
    q: "How long do wedding dress alterations take?",
    r: "Alterations come after the second fitting, once your dress has been made. They are done on site by our seamstresses, and included in the made-to-measure dress. How long they take depends on the dress and the adjustments: the schedule is set with the boutique.",
  },
  {
    q: "How many fittings should I plan for a wedding dress?",
    r: "Plan on three fittings: the first to choose your dress, a second when it is ready, and a final fitting that confirms the fall, the length and the ease. If anything needs adjusting, an alterations appointment comes between the last two.",
  },
  {
    q: "Do I need an appointment to try on a wedding dress?",
    r: "Yes. The MADAMOON showroom receives brides by appointment only, because it is reserved for each of them for an hour. You can book online in a few clicks, or by phone.",
  },
  {
    q: "Which wedding dress for a winter wedding?",
    r: "Think long sleeves, a high neck and fabrics with body — mikado, satin, crêpe — or a cape over the shoulders. Several of the boutique's dresses have long or detachable sleeves: Seraphina, Montana, Bella, Pendant or Aster.",
  },
  {
    q: "Who should I bring to my wedding dress fitting?",
    r: "The people whose opinion really matters to you and who help you see clearly: a mother, a sister, a friend who knows you well. As the showroom is reserved for you, your loved ones are welcome for the whole fitting.",
  },
  {
    q: "When should I start looking for my wedding dress?",
    r: "As soon as the date is set, start spotting the silhouettes and dresses you like. The fitting in the boutique is ideally planned eight to nine months before the wedding: arriving with a few favourites makes that first appointment more productive.",
  },
  {
    q: "How many dresses should I try before deciding?",
    r: "There is no right number. A few well-chosen dresses, in different silhouettes, are worth more than a long series: the fitting hour is there to lead you to the one in which you recognise yourself.",
  },
  {
    q: "Made-to-measure or ready-to-wear: what is the difference?",
    r: "A ready-to-wear dress comes in standard sizes, then is altered. A made-to-measure dress is made to your measurements. At MADAMOON, dresses are made in the atelier to measure — semi-custom for Watters Designs —, alterations included.",
  },
  {
    q: "How do I care for a lace wedding dress?",
    r: "Before the wedding, keep it in a breathable fabric bag, on a wide hanger, away from light. Afterwards, take it to a dry cleaner who specialises in wedding dresses rather than washing it yourself: lace loses its shape and marks easily.",
  },
  {
    q: "What should I wear under a mermaid wedding dress?",
    r: "Seamless, skin-tone underwear that leaves no lines: a mermaid dress follows the figure down to the knees. Choose it according to the neckline and back of the dress, and wear it from the second fitting, so the dress is fitted over it.",
  },
  {
    q: "Can a wedding dress bought online be altered?",
    r: "Usually yes, by a seamstress used to wedding dresses — it depends on the cut, the fabric and how far it is from your measurements. At MADAMOON, alterations are included for dresses made by the boutique; for a dress bought elsewhere, ask the boutique directly.",
  },
  {
    q: "Where can I try on a wedding dress in Paris?",
    r: `At the MADAMOON showroom, ${MAISON.adresse}, in the 10th arrondissement. Fittings are by appointment, in a showroom reserved for you alone for an hour, among dresses by Casablanca Bridal, Watters Designs, Monica Loretti and Olya Mak.`,
  },
  {
    q: "What should I bring to my first wedding dress fitting?",
    r: "Come without make-up, to protect the dresses, and with the people whose opinion matters to you. A tip: also bring shoes at the heel height you have in mind, seamless skin-tone underwear, and a few pictures of dresses you love.",
  },
  {
    q: "Can I try several wedding dress silhouettes in the same appointment?",
    r: "Yes, and it is even recommended: a few well-chosen dresses, in different silhouettes, quickly show you what suits you. As the showroom is reserved for you for an hour, you can compare a mermaid, a ball gown or a sheath without rushing.",
  },
  {
    q: "How do I prepare my appointment to choose a wedding dress in Paris?",
    r: "Book ideally eight to nine months before the wedding, online or by phone. Pick out a few silhouettes and dresses you like, think about your body shape and the style of the wedding, choose who comes with you, and come without make-up.",
  },
  {
    q: "What if I am torn between several wedding dresses after the fitting?",
    r: "Take time to compare: note what you like in each, set aside the one that convinces you least, and ask yourself which one feels like you. A new appointment lets you try your finalists again. Keep an eye on the calendar: making begins once your choice is made.",
  },
];
