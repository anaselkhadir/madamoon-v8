import { MAISON, SITE_URL } from "@/lib/madamoon";

/*
 * Les pages légales : mentions légales, confidentialité, cookies.
 *
 * Françaises seulement — le droit qui s'applique est le droit français,
 * et la maison est à Paris. Elles ne ciblent aucune expression : elles
 * existent parce que la loi les demande et parce qu'un site sans elles
 * est un site auquel on fait moins confiance, les moteurs compris.
 *
 * Tout ce qui est écrit ici est tiré du site lui-même : les coordonnées
 * de MAISON, les traceurs réellement posés (components/chrome/Clarity,
 * Balises, Cookies), ce que le navigateur garde (lib/consentement,
 * lib/coupsDeCoeur, components/chrome/Theme), les services tiers
 * appelés (Calendly, la fonction d'Élise chez Supabase).
 *
 * Ce qui manque n'est pas remplacé. La forme juridique, le numéro
 * d'immatriculation et le nom complet de la directrice de la
 * publication ne figurent nulle part dans les données de la maison :
 * ils sont demandés dans docs/design-actuel/A-VERIFIER-AVEC-LA-CLIENTE.md
 * et s'ajouteront ici, dans EDITEUR, le jour où la maison les donne.
 * madamoon.fr n'a aujourd'hui aucune de ces trois pages.
 */

/* La date de la dernière relecture, celle que les pages affichent. */
export const MISE_A_JOUR = "2026-11-01";

export const EDITEUR = {
  nom: MAISON.nom,
  activite: MAISON.baseline,
  adresse: `${MAISON.adresse}, ${MAISON.codePostal} ${MAISON.ville}, ${MAISON.pays}`,
  telephone: MAISON.telephone,
  email: MAISON.email,
  /* Telle que la page « À propos » la nomme. */
  publication: "Mouna, fondatrice de MADAMOON",
} as const;

/* L'hébergeur que la maison garde (docs/hebergement-hostinger.md). */
export const HEBERGEUR = {
  nom: "Hostinger International Ltd",
  adresse: "61 Lordou Vironos Street, 6023 Larnaca, Chypre",
  site: "https://www.hostinger.fr",
} as const;

/* L'atelier qui a fait le site, celui que signe le pied de page. */
export const CONCEPTION = {
  nom: "ANVSLAB",
  site: "https://anaselkhadir.github.io/anvslab/",
} as const;

export type Bloc = {
  titre: string;
  paragraphes?: string[];
  liste?: string[];
  /* Ce qui suit la liste, s'il y a quelque chose à ajouter. */
  suite?: string[];
};

export type PageLegale = {
  slug: string;
  /* Le H1, qui est aussi la balise <title> — ces pages n'ont pas
   * d'expression à placer, le titre dit ce qu'elles sont. */
  titre: string;
  description: string;
  chapo: string;
  blocs: Bloc[];
};

const CONTACT = `${EDITEUR.nom}, ${EDITEUR.adresse} — ${EDITEUR.email}`;

export const PAGES_LEGALES: PageLegale[] = [
  {
    slug: "mentions-legales",
    titre: "Mentions légales",
    description:
      "Mentions légales de madamoon.fr : l'éditeur, MADAMOON, boutique de robes de mariée à Paris 10e, l'hébergeur et les droits sur les textes et les photos.",
    chapo:
      "Qui édite ce site, qui l'héberge, et ce que l'on peut faire de ce qu'il contient.",
    blocs: [
      {
        titre: "L'éditeur du site",
        paragraphes: [
          `Le site madamoon.fr est édité par ${EDITEUR.nom}, ${EDITEUR.activite.toLowerCase()}, dont le showroom est au ${EDITEUR.adresse}.`,
          `Téléphone : ${EDITEUR.telephone}. Courriel : ${EDITEUR.email}.`,
          `Directrice de la publication : ${EDITEUR.publication}.`,
        ],
      },
      {
        titre: "L'hébergeur",
        paragraphes: [
          `Le site est hébergé par ${HEBERGEUR.nom}, ${HEBERGEUR.adresse} (${HEBERGEUR.site}). Il s'agit de fichiers statiques : aucune base de données ne tourne sur le serveur.`,
        ],
      },
      {
        titre: "La conception",
        paragraphes: [
          `Le site a été conçu, développé et référencé par ${CONCEPTION.nom} (${CONCEPTION.site}).`,
        ],
      },
      {
        titre: "Les textes, les photographies, les robes",
        paragraphes: [
          "Les textes du site sont ceux de la maison. Les photographies du showroom sont les siennes ; celles des robes sont fournies par les créateurs qui les dessinent — Casablanca Bridal, Watters Designs, Olya Mak, Monica Loretti — et restent leur propriété. Les noms des robes sont ceux donnés par ces maisons.",
          "Aucune reproduction, même partielle, de ces textes ou de ces images n'est autorisée sans l'accord écrit de MADAMOON ou du créateur concerné. Partager un lien vers une page du site est, bien sûr, toujours possible.",
        ],
      },
      {
        titre: "Les prix et la disponibilité",
        paragraphes: [
          `Les prix indiqués sur le site — « à partir de ${MAISON.prixDepart} » — sont des planchers : une robe confectionnée à vos mesures n'a pas de prix fixe avant l'essayage. Le prix d'une robe se confirme au showroom, de vive voix, et rien de ce qu'écrit le site ou sa conseillère automatique Élise ne constitue une offre ferme.`,
          "Les robes présentées sont celles que la boutique propose à l'essayage ; une robe peut être retirée du catalogue d'une maison sans que le site l'ait encore enregistré.",
        ],
      },
      {
        titre: "Vos données et les cookies",
        paragraphes: [
          "La façon dont le site traite vos données est décrite dans la politique de confidentialité ; les traceurs qu'il peut poser, dans la page sur les cookies. Les deux se lisent en quelques minutes.",
        ],
      },
    ],
  },
  {
    slug: "confidentialite",
    titre: "Politique de confidentialité",
    description:
      "Ce que madamoon.fr fait de vos données : la prise de rendez-vous, vos messages, la conseillère Élise, la mesure d'audience soumise à votre accord, vos droits.",
    chapo:
      "Le site ne demande rien qu'il n'ait besoin de savoir. Voici ce qu'il traite, pourquoi, avec qui, et comment vous gardez la main.",
    blocs: [
      {
        titre: "Qui est responsable",
        paragraphes: [
          `${CONTACT}. C'est à cette adresse que s'exercent les droits décrits plus bas.`,
        ],
      },
      {
        titre: "Ce que le site collecte, et pourquoi",
        liste: [
          "La prise de rendez-vous. Le formulaire est celui de Calendly, posé dans la page de rendez-vous et dans la fenêtre qui s'ouvre depuis les boutons du site. Il recueille votre nom, votre adresse électronique, votre numéro de téléphone et vos réponses à ses questions — dont la date du mariage et votre taille. Ces informations servent à une chose : préparer votre essayage et vous recontacter à son sujet.",
          "Vos appels et vos courriels. Quand vous écrivez à la boutique ou l'appelez, elle garde ce que vous lui dites le temps de vous répondre et de vous accompagner.",
          "Élise, la conseillère. Ce que vous lui écrivez est envoyé à un service hébergé pour la maison chez Supabase, qui produit la réponse à l'aide d'un modèle de langage. Aucun compte n'est créé et rien ne vous est demandé ; n'y écrivez pas ce que vous ne diriez pas à une vendeuse. Les questions de prix ne lui sont jamais transmises : le site y répond lui-même.",
          "La mesure d'audience. Avec votre accord seulement — et jamais avant que vous l'ayez donné —, le site charge Microsoft Clarity et le conteneur Google Tag Manager de la maison. Ils servent à comprendre comment le site est parcouru et à mesurer l'effet des campagnes de la boutique. Sans votre accord, rien de tout cela ne se charge.",
          "Ce que votre navigateur garde pour vous. Vos coups de cœur, le thème clair ou sombre et votre choix de cookies sont enregistrés dans votre navigateur uniquement. Ils ne quittent pas votre appareil et la maison ne les voit pas.",
        ],
      },
      {
        titre: "Sur quelle base",
        paragraphes: [
          "La prise de rendez-vous et les échanges qui la préparent relèvent des mesures précontractuelles prises à votre demande. La mesure d'audience repose sur votre consentement, que vous donnez et retirez depuis le bandeau et le pied de page. Répondre à vos messages et faire fonctionner le site relèvent de l'intérêt légitime de la boutique à vous accueillir correctement.",
        ],
      },
      {
        titre: "Avec qui",
        paragraphes: [
          "Vos données ne sont ni vendues ni cédées. Elles passent par les prestataires dont le site a besoin pour fonctionner, chacun pour sa part :",
        ],
        liste: [
          "Calendly (États-Unis), pour le formulaire de rendez-vous.",
          "Supabase, pour l'hébergement du service d'Élise.",
          "Microsoft (Clarity) et Google (Tag Manager, Google Ads), pour la mesure d'audience et des campagnes — avec votre accord.",
          `${HEBERGEUR.nom}, pour l'hébergement des fichiers du site.`,
        ],
        suite: [
          "Certains de ces prestataires traitent les données hors de l'Union européenne. Ces transferts s'appuient sur les garanties prévues par le règlement général sur la protection des données, notamment les clauses contractuelles types de la Commission européenne.",
        ],
      },
      {
        titre: "Combien de temps",
        paragraphes: [
          "Les informations liées à un rendez-vous sont gardées le temps de l'accompagnement — de la première prise de contact aux dernières retouches — puis le temps que la loi impose pour les documents commerciaux. Le choix de cookies est redemandé au bout de six mois, la durée que recommande la CNIL. Les données de mesure d'audience sont conservées selon les durées propres à Microsoft Clarity et à Google, décrites dans la page sur les cookies.",
        ],
      },
      {
        titre: "Vos droits",
        paragraphes: [
          "Vous pouvez à tout moment accéder aux données qui vous concernent, les faire rectifier ou effacer, en limiter le traitement, vous y opposer, ou en demander la portabilité. Vous pouvez aussi retirer votre consentement à la mesure d'audience, aussi simplement que vous l'avez donné.",
          `Il suffit d'écrire à ${EDITEUR.email}. Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la Commission nationale de l'informatique et des libertés (CNIL), 3 place de Fontenoy, 75007 Paris, www.cnil.fr.`,
        ],
      },
      {
        titre: "Les cookies",
        paragraphes: [
          "Ce que le site peut poser dans votre navigateur, catégorie par catégorie, et comment changer d'avis : tout est dans la page sur les cookies.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    titre: "Gestion des cookies",
    description:
      "Les cookies de madamoon.fr : ce que le site garde dans votre navigateur, Clarity et Google Tag Manager soumis à votre accord, et comment changer d'avis.",
    chapo:
      "Rien de non nécessaire ne se charge sans votre accord. Voici ce que le site garde dans votre navigateur, ce qu'il peut poser si vous l'acceptez, et comment changer d'avis.",
    blocs: [
      {
        titre: "Votre choix",
        paragraphes: [
          "À la première visite, un bandeau vous propose de tout accepter, de tout refuser ou de choisir catégorie par catégorie. Refuser est aussi simple qu'accepter, rien n'est coché d'avance, et votre choix est gardé six mois dans votre navigateur avant d'être redemandé.",
          "Vous pouvez le rouvrir à tout moment : le lien « Gérer les cookies » est au pied de chaque page, et le bouton ci-dessous fait la même chose.",
        ],
      },
      {
        titre: "Ce qui est nécessaire",
        paragraphes: [
          "Ces éléments ne font l'objet d'aucun choix : sans eux, le site ne fonctionne pas comme prévu. Ils ne contiennent rien qui permette de vous identifier et ne sont pas des cookies au sens strict, mais des informations gardées dans la mémoire de votre navigateur.",
        ],
        liste: [
          "madamoon.consentement — votre choix de cookies et sa date, six mois.",
          "madamoon.theme — le thème clair ou sombre que vous avez choisi.",
          "madamoon.coups-de-coeur — les robes que vous avez mises de côté. Elles ne quittent jamais votre navigateur.",
          "madamoon.ouverture — le temps d'une session, pour ne pas rejouer l'ouverture de l'accueil à chaque retour.",
        ],
        suite: [
          "Sur la page de rendez-vous et dans la fenêtre de réservation, le formulaire de Calendly dépose ses propres cookies, nécessaires à son fonctionnement ; ils sont décrits dans la politique de Calendly.",
        ],
      },
      {
        titre: "Analytique : Microsoft Clarity",
        paragraphes: [
          "Si vous acceptez la catégorie « analytique », le site charge Microsoft Clarity, qui enregistre la façon dont les pages sont parcourues — cartes de chaleur, rejeux de session anonymisés. D'après la documentation de Microsoft, il dépose les cookies _clck et CLID (un an), _clsk (une journée), MUID (un an), MR (une semaine), ANONCHK (dix minutes) et SM (le temps de la session). Si vous retirez votre accord, Clarity cesse d'enregistrer et n'est plus chargé aux visites suivantes.",
        ],
      },
      {
        titre: "Analytique et publicité : Google Tag Manager",
        paragraphes: [
          "Le conteneur Google Tag Manager de la maison ne se charge que si vous avez accepté l'analytique ou la publicité. Il ne mesure rien par lui-même : il porte les balises de la boutique — aujourd'hui Google Analytics, pour la mesure d'audience, et Google Ads, pour la mesure des conversions de ses campagnes. Google Analytics dépose les cookies _ga et _ga_* (treize mois) ; Google Ads, ceux de la famille _gcl (trois mois). Le mode de consentement de Google y est réglé sur « refusé » par défaut et ne s'ouvre qu'à ce que vous avez accepté : une balise ne peut pas déposer un cookie publicitaire chez quelqu'un qui a refusé la publicité.",
        ],
      },
      {
        titre: "Fonctionnelle et performance",
        paragraphes: [
          "Ces deux catégories figurent dans le bandeau, mais le site ne charge aujourd'hui aucun traceur qui en relève. Elles ne servent qu'à transmettre votre choix au conteneur Google Tag Manager, pour le jour où une balise en aurait besoin.",
        ],
      },
      {
        titre: "Changer d'avis",
        paragraphes: [
          "Depuis le site : le lien « Gérer les cookies » au pied de chaque page, ou le bouton ci-dessous. Depuis votre navigateur : ses réglages permettent de voir, de supprimer et de bloquer les cookies, site par site. Supprimer les données du site madamoon.fr efface aussi vos coups de cœur et votre thème.",
        ],
      },
    ],
  },
];

export function pageLegale(slug: string): PageLegale | undefined {
  return PAGES_LEGALES.find((p) => p.slug === slug);
}

export const adresseLegale = (p: PageLegale) => `/${p.slug}`;

export const urlLegale = (p: PageLegale) => `${SITE_URL}${adresseLegale(p)}/`;
