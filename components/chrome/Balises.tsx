"use client";

import { useEffect } from "react";
import { APERCU } from "@/lib/chemin";
import { consenti, surConsentement, type Choix } from "@/lib/consentement";

/*
 * Google Tag Manager, derrière le consentement.
 *
 * Le conteneur ne mesure rien par lui-même : c'est un porte-outils. Ce
 * qu'il déclenche — une conversion Google Ads, une mesure d'audience —
 * est décidé dans son interface, sans toucher au site. C'est tout son
 * intérêt, et c'est aussi pourquoi il demande de la prudence : une
 * balise ajoutée là-bas s'exécute ici, sans passer par nous.
 *
 * D'où le garde. Le conteneur ne part que si la visiteuse a accepté
 * l'analytique ou la publicité — les deux seules catégories qu'une
 * balise de mesure puisse servir. Avant son choix, rien. C'est la même
 * règle que pour Clarity, et la règle que le site s'est donnée : rien de
 * non nécessaire ne se charge sans accord.
 *
 * Le « consent mode » de Google double cette protection à l'intérieur du
 * conteneur. Les permissions sont refusées par défaut, et mises à jour
 * au choix de la visiteuse : une balise mal réglée dans l'interface ne
 * peut donc pas déposer un cookie publicitaire sur quelqu'un qui a
 * refusé la publicité. Deux verrous valent mieux qu'un, parce que celui
 * de l'interface ne nous appartient pas.
 *
 * Il ne part pas depuis l'aperçu : nos essais ne doivent pas se mêler
 * aux visites des mariées, ni aux conversions que la maison paie.
 */

const CONTENEUR = "GTM-T5FMK7CX";

type AvecCouche = Window & { dataLayer?: unknown[] };

function couche(): unknown[] {
  const w = window as AvecCouche;
  w.dataLayer = w.dataLayer || [];
  return w.dataLayer;
}

/*
 * « gtag » n'écrit pas, elle empile — et ce qu'elle empile doit être
 * l'objet « arguments », jamais un tableau.
 *
 * La distinction paraît byzantine ; elle ne l'est pas. Essayé avec un
 * tableau, le conteneur se chargeait, les balises partaient, tout avait
 * l'air juste — et la requête de Google Ads portait « gcs=G100 »,
 * c'est-à-dire « consentement refusé », sur une visiteuse qui venait
 * d'accepter. Le réglage était lu comme absent, donc refusé par défaut,
 * et les conversions de la maison ne lui seraient jamais revenues.
 *
 * C'est pourquoi la fonction n'est pas une flèche : une flèche n'a pas
 * d'« arguments ».
 */
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  couche().push(arguments);
}

/*
 * Les catégories du bandeau, dites dans la langue de Google.
 *
 * « security_storage » reste toujours accordé : il couvre ce qui protège
 * la visiteuse — détection de fraude, limitation d'abus —, que la CNIL
 * range dans le nécessaire et ne soumet pas au choix.
 */
function permissions(choix: Choix) {
  const oui = (v: boolean) => (v ? "granted" : "denied");
  return {
    ad_storage: oui(choix.publicite),
    ad_user_data: oui(choix.publicite),
    ad_personalization: oui(choix.publicite),
    analytics_storage: oui(choix.analytique),
    functionality_storage: oui(choix.fonctionnelle),
    personalization_storage: oui(choix.performance),
    security_storage: "granted",
  };
}

/* Vrai si une balise de mesure a de quoi servir. Le conteneur n'a aucune
 * raison de se charger pour une visiteuse qui a tout refusé. */
const utile = (c: Choix) => c.analytique || c.publicite;

function poser(choix: Choix) {
  if (document.getElementById("gtm-madamoon")) {
    gtag("consent", "update", permissions(choix));
    return;
  }

  /* Le refus par défaut est écrit avant le conteneur, et non après :
   * une balise qui se déclenche au chargement lirait sinon une file
   * vide et se croirait autorisée. */
  gtag("consent", "default", {
    ...permissions({
      fonctionnelle: false,
      analytique: false,
      performance: false,
      publicite: false,
    }),
    wait_for_update: 500,
  });
  gtag("consent", "update", permissions(choix));

  couche().push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "gtm-madamoon";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${CONTENEUR}`;
  document.head.appendChild(script);
}

export default function Balises() {
  useEffect(() => {
    /* Le garde est dans l'effet et non avant lui : un retour placé
     * devant un hook en saute un, et React compte les hooks. */
    if (APERCU) return;

    const choix = {
      fonctionnelle: consenti("fonctionnelle"),
      analytique: consenti("analytique"),
      performance: consenti("performance"),
      publicite: consenti("publicite"),
    };
    if (utile(choix)) poser(choix);

    /*
     * Les appels et les courriels, écoutés en un seul endroit.
     *
     * Ces liens sont partout — le pied de page, la barre, Élise, la
     * fiche d'une robe — et les instrumenter un par un aurait voulu dire
     * six fichiers à toucher, et un septième oublié le jour où l'on
     * ajoute un bouton. L'écoute se fait donc sur le document : tout
     * lien « tel: » ou « mailto: », où qu'il soit et quand qu'il
     * paraisse, remonte.
     *
     * En capture, parce qu'Élise arrête la propagation de certains
     * clics pour fermer sa fenêtre.
     */
    const auClic = (e: MouseEvent) => {
      const lien = (e.target as Element | null)?.closest?.("a[href^='tel:'], a[href^='mailto:']");
      if (!lien) return;
      const href = lien.getAttribute("href") ?? "";
      evenement(href.startsWith("tel:") ? "telephone_clic" : "email_clic");
    };
    document.addEventListener("click", auClic, { capture: true });

    /*
     * Le rendez-vous réellement pris.
     *
     * « rendezvous_clic » ne dit qu'une intention : la mariée a ouvert
     * le formulaire. La maison veut savoir qui va au bout, parce que
     * beaucoup n'y vont pas — c'est elle qui l'a demandé, et c'est la
     * seule mesure qui vaille pour une publicité payée.
     *
     * La réservation se termine chez Calendly, sur un autre domaine : on
     * ne peut donc pas la lire. Mais le widget prévient la page qui
     * l'héberge, par un message, et il le fait aussi bien depuis la
     * fenêtre surgissante que depuis la page de rendez-vous. Cela ne
     * dépend d'aucune offre payante.
     *
     * L'origine est vérifiée avant toute chose : sans ce contrôle,
     * n'importe quel site ouvert dans un autre onglet pourrait nous
     * faire compter une conversion qui n'existe pas.
     *
     * Rien du contenu du message n'est repoussé — il porte les adresses
     * d'interface de l'invitée, et une file de données n'a pas à
     * recevoir ce qui touche à une personne.
     *
     * Attention en réglant le conteneur : le script de Calendly pousse
     * déjà le sien, « calendly » avec « calendly_event: event_scheduled ».
     * Il ne faut pas déclencher la conversion sur les deux, elle
     * compterait double. Et c'est celui-ci qu'il faut garder : à
     * l'essai, le leur a accepté un message forgé depuis la page même,
     * quand celui-ci l'a écarté. Une conversion payée ne doit pas
     * pouvoir être inventée par un script tiers.
     */
    const auMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const d = e.data as { event?: string } | null;
      if (d && d.event === "calendly.event_scheduled") evenement("rendezvous_confirme");
    };
    window.addEventListener("message", auMessage);

    const arreter = surConsentement((c) => {
      if (utile(c)) poser(c);
      else if (document.getElementById("gtm-madamoon")) {
        /* Un script chargé ne se décharge pas. On retire les
         * permissions : les balises du conteneur cessent alors de
         * déposer quoi que ce soit, et au chargement suivant le
         * conteneur ne reviendra pas. */
        gtag("consent", "update", permissions(c));
      }
    });

    return () => {
      document.removeEventListener("click", auClic, { capture: true });
      window.removeEventListener("message", auMessage);
      arreter();
    };
  }, []);

  return null;
}

/*
 * Ce que le site raconte au conteneur.
 *
 * Les balises se règlent dans l'interface de Google, mais elles ne
 * peuvent écouter que ce qu'on leur donne. Ces événements sont le
 * contrat : le site les pousse, l'interface décide quoi en faire. Les
 * ajouter ici ne déclenche rien — tant qu'aucune balise ne les écoute,
 * ils ne partent nulle part.
 *
 * Nommés en français, comme le reste du code : c'est la maison qui les
 * lira dans son tableau de bord.
 */
export function evenement(nom: string, details?: Record<string, unknown>) {
  if (typeof window === "undefined" || APERCU) return;
  couche().push({ event: nom, ...details });
}
