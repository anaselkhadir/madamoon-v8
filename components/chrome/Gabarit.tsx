import localFont from "next/font/local";

import Entete from "@/components/chrome/Entete";
import Elise from "@/components/Elise";
import Pied from "@/components/chrome/Pied";
import CarteRendezvous from "@/components/chrome/CarteRendezvous";
import Cookies from "@/components/chrome/Cookies";
import Clarity from "@/components/chrome/Clarity";
import Balises from "@/components/chrome/Balises";
import Mouvement from "@/components/Mouvement";
import { MAISON_SCHEMA, siteSchema } from "@/lib/schema";
import { BASE } from "@/lib/chemin";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Le gabarit, commun aux deux langues.
 *
 * Il porte la balise <html> et son attribut « lang » — ce qui a imposé
 * deux gabarits racines et donc deux groupes de routes, (fr) et (en).
 * Un gabarit imbriqué ne peut pas redéclarer <html>, et poser « lang »
 * après coup en JavaScript ne servirait à rien : c'est le HTML servi que
 * les moteurs lisent, pas celui qu'un script rectifie.
 *
 * Les groupes ne changent aucune adresse : (fr)/robes reste /robes.
 */

/*
 * Les quatre polices, servies depuis le dépôt.
 *
 * Elles venaient de « next/font/google », qui les télécharge chez
 * Google à la compilation. Quatre mises en ligne ont échoué pour cette
 * seule raison : le serveur de Google ne répondait pas dans la seconde,
 * et le site entier ne se construisait plus. Un déploiement ne doit pas
 * dépendre d'un tiers.
 *
 * Les fichiers sont désormais dans « app/polices/ », tels que Google
 * les servait — ce sont les mêmes octets, le rendu ne bouge pas. Deux
 * cent trente-six kilo-octets dans le dépôt, et plus aucune requête
 * vers un domaine Google au chargement : une connexion de moins à
 * ouvrir pour la visiteuse, et un tiers de moins à déclarer.
 *
 * « display: swap » partout : le texte paraît tout de suite dans la
 * police de secours, et se recompose quand la vraie arrive. L'inverse —
 * attendre la police — laisse une page blanche.
 */

/* Le serif d'affichage : les titres, les phrases, les grands nombres.
 * Une seule graisse, et son italique, que les passages en exergue de
 * l'accueil demandent. Sans elle le navigateur en fabrique une : il
 * penche le romain d'une dizaine de degrés, ce qui n'est pas une
 * italique mais un romain de travers — les courbes ne sont pas
 * redessinées, et cela se voit sur un « a » ou un « e ». */
const serif = localFont({
  src: [
    { path: "../../app/polices/instrument-serif-400.woff2", weight: "400", style: "normal" },
    { path: "../../app/polices/instrument-serif-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--police-serif",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});

/* L'anglaise du nom de la maison, sur l'accueil. Une copperplate
 * gravée, dans l'esprit de la référence choisie par la boutique — et
 * sous licence ouverte, contrairement à celle-là. Elle ne sert qu'à un
 * mot : une graisse, l'alphabet latin, rien de plus. */
const anglaise = localFont({
  src: "../../app/polices/pinyon-script-400.woff2",
  weight: "400",
  style: "normal",
  variable: "--police-anglaise",
  display: "swap",
  fallback: ["Snell Roundhand", "cursive"],
});

/*
 * La main de Mouna.
 *
 * Elle signe sa photographie, et une signature ne se compose pas : la
 * Pinyon Script est une anglaise gravée, une plume de faire-part, et la
 * maison voulait un marqueur. Caveat est une écriture relevée à la
 * main, et sa graisse 600 a l'épaisseur d'un feutre — la Permanent
 * Marker, l'autre candidate, écrit sur une affiche, pas sur un tirage.
 *
 * C'est une police variable : un seul fichier porte toutes les graisses
 * de l'axe. On déclare donc l'intervalle plutôt que deux poids, et le
 * navigateur interpole — la 600 pour la signature, qui est un trait de
 * feutre, et la 500 pour la citation, parce que cent quarante signes en
 * gras se lisent mal et qu'une main qui écrit longtemps appuie moins.
 */
const main = localFont({
  src: "../../app/polices/caveat-variable.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--police-main",
  display: "swap",
  fallback: ["Bradley Hand", "cursive"],
});

/* Le texte courant du site. Inter a remplacé le Quattrocento Sans à la
 * demande de la boutique : son œil est plus grand et son dessin plus
 * neutre — les paragraphes se lisent mieux à petite taille, sur
 * téléphone surtout.
 *
 * Variable elle aussi, et en deux fichiers : le romain et l'italique.
 * L'intervalle couvre les deux graisses que le site emploie, la 400 et
 * la 700. */
const sans = localFont({
  src: [
    { path: "../../app/polices/inter-variable.woff2", weight: "100 900", style: "normal" },
    { path: "../../app/polices/inter-variable-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--police-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export default function Gabarit({
  langue,
  children,
}: {
  langue: Langue;
  children: React.ReactNode;
}) {
  const L = t(langue);
  return (

    /* Lenis pose ses propres classes sur <html> : React ne doit pas s'en
     * inquiéter au moment de l'hydratation. */
    <html lang={langue} suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${anglaise.variable} ${main.variable}`}>
      <head>
        {/*
          * Le thème, reposé avant la première peinture.
          *
          * Sans lui, une visiteuse qui a choisi le sombre verrait le site
          * blanc le temps de l'hydratation — un éclair blanc dans une
          * pièce sombre, ce qui est exactement ce qu'elle voulait éviter.
          *
          * Le système n'est pas consulté : le site est clair par défaut,
          * et « prefers-color-scheme: dark » ne dit pas qu'on veut voir
          * de la dentelle sur du noir.
          */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `try{if(localStorage.getItem("madamoon.theme")==="sombre")` +
              `document.documentElement.setAttribute("data-theme","sombre")}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(MAISON_SCHEMA) }}
        />
        {/* Le site comme entité, raccroché à la maison par « publisher ».
          * C'est ce nœud qui autorise Google à écrire « MADAMOON » au-dessus
          * d'un résultat, à la place de « madamoon.fr ». */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema(langue)) }}
        />
        {/*
          * Le garde de l'ouverture.
          *
          * Il s'exécute avant la première peinture — c'est tout son
          * intérêt. Le site est un export statique : le hero est déjà
          * dans le HTML, et attendre l'hydratation pour le couvrir le
          * laisserait clignoter.
          *
          * Il ne décide que d'une chose : poser ou non « data-ouverture »
          * sur la racine. Le reste — le noir, la séquence — est du CSS.
          * Trois refus : ailleurs que sur l'accueil, à la deuxième visite
          * de la session, et si le mouvement est refusé. Dans ce dernier
          * cas on va droit au hero : une ouverture « plus sobre » reste
          * une ouverture, et la préférence demande qu'il n'y en ait pas.
          *
          * Le drapeau de session est posé tout de suite, avant même que
          * la séquence commence : rechargée au milieu, elle ne recommence
          * pas.
          *
          * Le filet de sécurité rend le défilement au bout de six
          * secondes, quoi qu'il arrive au script de la page.
          */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
var b=${JSON.stringify(BASE)},p=location.pathname;
if(b&&p.indexOf(b)===0)p=p.slice(b.length);
p=p.replace(/index\\.html$/,"").replace(/\\/+$/,"");
if(p!=="")return;
if(sessionStorage.getItem("madamoon.ouverture"))return;
if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
sessionStorage.setItem("madamoon.ouverture","1");
var d=document.documentElement;d.setAttribute("data-ouverture","");
setTimeout(function(){d.removeAttribute("data-ouverture")},6000);
}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:bg-blanc focus:px-4 focus:py-2 focus:text-encre"
        >
          {L.gabarit.allerAuContenu}
        </a>
        <Entete />
        <main id="contenu">{children}</main>
        <Pied />
        {/* Élise vit au gabarit : le bouton « Trouver ma robe » l'ouvre
          * depuis n'importe quelle page, et elle lit l'adresse courante
          * pour savoir de quelle maison partir. */}
        <Elise />
        <CarteRendezvous />
        <Cookies />
        {/* Clarity ne part qu'avec le consentement analytique. */}
        <Clarity />
        {/* Le conteneur Tag Manager, lui, attend l'analytique ou la
          * publicité — les deux seules catégories qu'une balise de
          * mesure puisse servir. */}
        <Balises />
        <Mouvement />
      </body>
    </html>
    );
}
