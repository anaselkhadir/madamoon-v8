"use client";

import Link from "@/components/Lien";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MAISON, CREATEURS, MORPHOLOGIES, ROBES, CATEGORIES, robesDe } from "@/lib/madamoon";
import { COUPES, coupe as familleDeCoupe } from "@/lib/coupes";
import { media as ressource } from "@/lib/chemin";
import AppelElise from "@/components/AppelElise";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import Panier from "@/components/chrome/Panier";
import Commutateur from "@/components/chrome/Langue";
import Theme from "@/components/chrome/Theme";
import Reseaux from "@/components/chrome/Reseaux";
import Logo from "@/components/chrome/Logo";
import { langueDe, versFrancais, type Langue } from "@/lib/langue";
import { coupeNom, coupeNote, createurNom, createurOrigine, morphoNom, morphoObjectif } from "@/lib/contenu";
import { t } from "@/lib/textes";

/*
 * L'en-tête, relevée sur la référence.
 *
 * Deux étages. Un bandeau de 38 px, toujours blanc, qui porte les maisons
 * présentées et les coordonnées. Puis une barre de 70 px : le logo à
 * gauche, la navigation en capitales de 12 px, le rendez-vous à droite.
 *
 * Sur l'accueil, la barre est posée sur la vidéo, sans fond, en blanc.
 * Dès que la page défile — et sur toutes les pages claires — elle devient
 * blanche et la typographie passe à l'encre. Elle ne change jamais de
 * hauteur.
 *
 * Trois entrées ouvrent un panneau : les robes par maison, les six
 * coupes, les six morphologies. Il est blanc plein, sans effet — le reste
 * du site n'en a aucun, et un texte se lit mieux sur du blanc que sur
 * n'importe quel verre.
 *
 * Tant qu'il est ouvert, la barre reprend son fond plein elle aussi : sur
 * l'accueil elle est blanche sur la vidéo, et son texte blanc
 * disparaîtrait au-dessus d'un panneau blanc.
 */

/*
 * Ce que chaque entrée déplie. Les listes sont construites depuis les
 * données du site : une coupe ajoutée au catalogue paraît ici sans qu'on
 * y touche.
 */
type Groupes = Record<
  string,
  { intitule: string; colonnes: number; liens: { href: string; nom: string; note?: string }[] }
>;

/* Les tables sont des fonctions de la langue : elles portent des mots,
 * et des mots ne peuvent plus être des constantes de module. */
const tableGroupes = (l: Langue): Groupes => {
  const L = t(l);
  return {
    "/robes": {
      intitule: L.barre.parMaison,
      colonnes: 3,
      liens: [
        { href: "/robes", nom: L.barre.toutesRobes, note: L.barre.catalogueEntier },
        ...CREATEURS.map((c) => ({
          href: `/createurs/${c.slug}`,
          nom: createurNom(c, l),
          note: createurOrigine(c, l),
        })),
      ],
    },
    "/coupes": {
      intitule: L.barre.sixCoupes,
      colonnes: 3,
      liens: COUPES.map((c) => ({
        href: `/coupes/${c.ancre}`,
        nom: coupeNom(c, l),
        note: coupeNote(c, l),
      })),
    },
    "/morphologies": {
      intitule: L.barre.sixMorphologies,
      colonnes: 3,
      liens: MORPHOLOGIES.map((m) => ({
        href: `/morphologies/${m.lettre.toLowerCase()}`,
        nom: morphoNom(m, l),
        note: morphoObjectif(m, l),
      })),
    },
  };
};

/*
 * Les entrées se répartissent de part et d'autre du logo.
 *
 * À gauche ce qui sert à chercher une robe — les robes, les coupes, les
 * morphologies : c'est le même chemin que raconte l'accueil. À droite ce
 * qui parle du lieu et de la maison.
 *
 * Les morphologies restent à gauche avec les deux autres. Elles ne
 * figuraient pas dans la répartition demandée, mais les retirer de la
 * barre irait contre la demande précédente de les y mettre, et elles ont
 * plus à voir avec les coupes qu'avec le showroom.
 */
const tableGauche = (l: Langue) => [
  { href: "/robes", label: t(l).barre.robes },
  { href: "/coupes", label: t(l).barre.coupes },
  { href: "/morphologies", label: t(l).barre.morphologies },
];

const tableDroite = (l: Langue) => [
  { href: "/showroom", label: t(l).barre.showroom },
  { href: "/a-propos", label: t(l).barre.maison },
];

/*
 * Le menu montre le catalogue, pas la barre.
 *
 * Répéter les entrées de la navigation ne servait à rien : elles sont
 * déjà là, à trois centimètres. Le menu donne donc ce que la barre ne
 * peut pas donner — les robes elles-mêmes, par leur nom, rangées par
 * maison ou par coupe. C'est ce que font les maisons qui vendent
 * vraiment : on y entre par un modèle, pas par une rubrique.
 *
 * Les liens de rubrique restent en bas, en petit. Sous mille vingt-quatre
 * pixels la barre ne montre plus que le sigle et le rendez-vous : sans
 * eux, le showroom et la maison seraient hors d'atteinte au doigt.
 */
const tableRaccourcis = (l: Langue) => {
  const R = t(l).raccourcis;
  return [
    { href: "/robes", label: R.toutesRobes },
    { href: "/coupes", label: R.lesCoupes },
    { href: "/morphologies", label: R.lesMorphologies },
    { href: "", label: R.trouverMaRobe },
    { href: "/showroom", label: R.leShowroom },
    { href: "/a-propos", label: R.laMaison },
    { href: "/faq", label: R.lesQuestions },
    { href: "/guides", label: R.lesGuides },
    { href: "/rendez-vous", label: R.prendreRendezvous },
  ];
};

/*
 * Les trois onglets du téléphone.
 *
 * Un menu de grande maison ne pose pas cinq rubriques à plat : il
 * range le catalogue derrière deux ou trois entrées et déplie l'une
 * d'elles. On garde ici les trois axes par lesquels le site fait
 * chercher — la robe, la coupe, la silhouette — et le showroom et la
 * maison se lisent dessous, où l'on regarde quand on a fini de chercher.
 */
const tableOnglets = (l: Langue) => [
  {
    cle: "robes",
    label: t(l).barre.robes,
    liens: () => [
      { href: "/robes", label: t(l).barre.toutesRobes },
      ...CREATEURS.map((c) => ({ href: `/createurs/${c.slug}`, label: createurNom(c, l) })),
    ],
  },
  {
    cle: "coupes",
    label: t(l).barre.coupes,
    liens: () => [
      { href: "/coupes", label: t(l).barre.sixCoupes },
      ...COUPES.map((c) => ({ href: `/coupes/${c.ancre}`, label: coupeNom(c, l) })),
    ],
  },
  {
    cle: "morphologies",
    label: t(l).barre.morphologies,
    liens: () => [
      { href: "/morphologies", label: t(l).barre.sixMorphologies },
      ...MORPHOLOGIES.map((m) => ({
        href: `/morphologies/${m.lettre.toLowerCase()}`,
        label: morphoNom(m, l),
      })),
    ],
  },
] as const;

/* Le plan : l'adresse de la boutique, ouverte dans l'application de
 * cartes du téléphone ou dans Google Maps sur ordinateur. */
const PLAN = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `MADAMOON ${MAISON.adresse} ${MAISON.codePostal} ${MAISON.ville}`,
)}`;

/* Les adresses que les onglets du téléphone portent déjà. */
const SECTIONS = new Set([
  "/robes", "/coupes", "/morphologies",
  "/showroom", "/a-propos",
]);

type Groupe = { titre: string; href: string; robes: (typeof ROBES)[number][] };

/* Par maison. Les modèles dont la maison n'est pas renseignée ne font
 * plus groupe à part : « Autres créateurs » est une maison du catalogue
 * comme les autres, et « robesDe » les lui rend. */
function parCreateur(l: Langue): Groupe[] {
  return CREATEURS.map((c) => ({
    titre: createurNom(c, l),
    href: `/createurs/${c.slug}`,
    robes: robesDe(c.nom),
  })).filter((g) => g.robes.length > 0);
}

function parCoupe(): Groupe[] {
  return CATEGORIES.map((c) => ({
    titre: c,
    href: `/coupes/${familleDeCoupe(c).ancre}`,
    robes: ROBES.filter((r) => r.categorie === c),
  })).filter((g) => g.robes.length > 0);
}

export default function Entete() {
  const chemin = usePathname();
  const [onglet, setOnglet] = useState<"robes" | "coupes" | "morphologies">("robes");
  /* La maison dépliée dans l'onglet des robes. Une seule à la fois : la
   * liste reste courte, et l'on voit toujours où l'on en est. */
  const [maisonOuverte, setMaisonOuverte] = useState<string | null>(null);
  /* Le gabarit ne reçoit pas de propriété : il lit la langue sur
   * l'adresse, comme il lit déjà la page courante. */
  const l = langueDe(chemin ?? "/");
  /* Les comparaisons d'adresse se font dans l'espace français : les
   * tables de navigation portent des adresses françaises, et « /en/
   * dresses » ne s'est jamais égalé à « /robes ». Sans cela, la barre
   * de l'accueil anglais devenait blanche au lieu de rester sur la
   * vidéo, et aucune entrée ne se marquait comme active. */
  const cheminFr = versFrancais(chemin ?? "/");
  const L = t(l);
  const GRP = tableGroupes(l);
  const GCH = tableGauche(l);
  const DRT = tableDroite(l);
  const RCC = tableRaccourcis(l);
  const ONG = tableOnglets(l);
  const [pose, setPose] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  /* L'entrée dont le panneau est déplié. */
  const [mega, setMega] = useState<string | null>(null);
  /* Comment le menu range les robes. */
  const [classement, setClassement] = useState<"createur" | "coupe">("createur");
  /* Les groupes se recalculent au changement de classement, jamais à
   * chaque rendu : la liste ne bouge pas, elle vient des données. */
  const groupes = useMemo(
    () => (classement === "createur" ? parCreateur(l) : parCoupe()),
    [classement, l]
  );

  /*
   * Les pages qui s'ouvrent sur une image plein cadre.
   *
   * L'accueil, et les quatre familles qui portent un premier écran
   * photographique : la fiche d'une robe, une coupe, une morphologie,
   * une maison. La barre s'y pose dessus, et reprend son fond dès le
   * premier défilement — comme sur l'accueil.
   *
   * Les pages de liste — « /robes », « /coupes », « /morphologies » —
   * en sont exclues : elles commencent sur du papier, et une barre
   * transparente y poserait du blanc sur du blanc. La barre oblique
   * finale du préfixe suffit à les écarter, « versFrancais » ayant
   * retiré celle des adresses.
   */
  const OUVERTURES = ["/robes/", "/coupes/", "/morphologies/", "/createurs/"];
  /* Un seul segment après le préfixe : « /coupes/sirene » s'ouvre sur une
   * photographie, « /coupes/sirene/une-question » sur du papier. */
  const surPhoto =
    cheminFr === "/" ||
    OUVERTURES.some((p) => cheminFr.startsWith(p) && !cheminFr.slice(p.length).includes("/"));
  const surImage = surPhoto && !pose && !ouvert && !mega;

  useEffect(() => {
    const surScroll = () => setPose(window.scrollY > 24);
    surScroll();
    window.addEventListener("scroll", surScroll, { passive: true });
    return () => window.removeEventListener("scroll", surScroll);
  }, []);

  useEffect(() => {
    setOuvert(false);
    setMega(null);
  }, [chemin]);

  /* Échap referme le panneau, comme il referme le menu. */
  useEffect(() => {
    if (!mega) return;
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMega(null);
    };
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  }, [mega]);

  useEffect(() => {
    document.documentElement.style.overflow = ouvert ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [ouvert]);

  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  }, []);

  /* Ouvrir Élise depuis le menu ferme le menu : deux plein-écrans
   * superposés, c'est un de trop. */
  useEffect(() => {
    const fermer = () => setOuvert(false);
    window.addEventListener("elise:ouvrir", fermer);
    return () => window.removeEventListener("elise:ouvrir", fermer);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={() => setMega(null)}>
        {/* Le bandeau. Toujours blanc, toujours discret.
          * Rien n'y passe à la ligne : sur une tablette, les noms coupés en
          * deux débordaient de ses 38 px. Les intervalles se resserrent, et
          * l'adresse ne paraît qu'à partir de 1024 px, où elle a sa place.
          *
          * Il n'apparaît qu'au-dessus de 900 px, le seuil où « --barre »
          * lui donne sa hauteur. Entre 768 et 900 px il s'affichait avec
          * une hauteur nulle : ses textes glissaient sous la barre
          * principale et n'en dépassait que la moitié basse. */}
        <div className="hidden h-[var(--barre)] items-center justify-between gap-6 border-b border-fil bg-blanc text-encre min-[901px]:flex gouttiere">
          <ul className="flex min-w-0 items-center gap-5 lg:gap-7">
            {CREATEURS.slice(0, 4).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/createurs/${c.slug}`}
                  className="mention souligne whitespace-nowrap text-plomb hover:text-encre"
                >
                  {createurNom(c, l)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 items-center gap-5 lg:gap-7">
            <span className="mention hidden whitespace-nowrap text-plomb lg:inline">
              {MAISON.adresse}, {MAISON.ville} {MAISON.codePostal.slice(-2)}e
            </span>
            <a href={MAISON.telephoneHref} className="mention souligne whitespace-nowrap text-encre">
              {MAISON.telephone}
            </a>
          </div>
        </div>

        {/* La barre principale. */}
        <div
          className={`transition-[background-color,color,box-shadow] duration-700 [transition-timing-function:var(--ease-doux)] ${
            surImage
              ? "bg-transparent text-sur-image"
              : "bg-blanc text-encre shadow-[0_1px_0_var(--color-fil)]"
          }`}
        >
          {/*
            * La barre : le menu à gauche, le logo au centre, le
            * rendez-vous à droite. Les entrées se rangent de part et
            * d'autre du logo et le touchent presque — ce sont elles qui
            * l'encadrent, pas les extrémités de la page.
            *
            * Le logo est centré à la page, pas entre les deux groupes :
            * ceux-ci n'ont pas la même largeur — le bouton rouge pèse
            * plus que le mot « Menu » — et un centrage par colonnes
            * souples le décalait de vingt-cinq pixels sur téléphone. Il
            * est donc posé au milieu, en propre, et les deux groupes se
            * rangent de part et d'autre.
            */}
          <nav
            aria-label={L.barre.principale}
            className="gouttiere relative flex h-[var(--entete)] items-center justify-between gap-6"
          >
            {/* ————— à gauche : le menu, puis les entrées ————— */}
            <div className="flex min-w-0 items-center gap-6">
              <button
                type="button"
                onClick={() => setOuvert(true)}
                className="lien-nav flex items-center gap-2"
                aria-expanded={ouvert}
                aria-controls="menu-principal"
              >
                <span aria-hidden="true" className="flex flex-col gap-[3px]">
                  <span className="block h-px w-4 bg-current" />
                  <span className="block h-px w-4 bg-current" />
                </span>
                {L.barre.menu}
              </button>

              <ul className="ml-auto hidden items-center gap-8 lg:flex">
                {GCH.map((l) => {
                  const groupe = GRP[l.href];
                  /* La puce est une boîte flex centrée, et le lien
                   * reçoit en haut la gouttière que « .souligne » lui
                   * donne en bas.
                   *
                   * Sans cela, le lien restait une boîte en ligne posée
                   * sur la ligne de base de la rangée, et les trois
                   * pixels réservés sous lui au soulignement
                   * descendaient son texte d'un pixel et demi. MENU et
                   * FR, qui ne sont pas soulignés, se tenaient un pixel
                   * et demi plus haut : c'est le décalage que la maison
                   * a vu. Les deux gouttières égales remettent le texte
                   * au milieu de sa boîte, et la boîte au milieu de la
                   * rangée — sur l'axe du sigle, à soixante pixels. */
                  return (
                    <li
                      key={l.label}
                      onMouseEnter={() => setMega(groupe ? l.href : null)}
                      className="flex items-center"
                    >
                      <Link
                        href={l.href}
                        data-actif={cheminFr === l.href}
                        onFocus={() => setMega(groupe ? l.href : null)}
                        aria-expanded={groupe ? mega === l.href : undefined}
                        aria-controls={groupe ? "mega-navigation" : undefined}
                        className="lien-nav souligne pt-[3px]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ————— au centre : la marque ————— */}
            <Link
              href="/"
              aria-label={L.barre.accueil}
              /* Centré au milieu de la page, à toutes les largeurs. Le
                * seuil qui existait ici n'a plus lieu d'être : le bouton
                * rouge, seul à disputer la place au sigle, ne paraît plus
                * sur téléphone. */
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <Logo surImage={surImage} className="h-[0.75rem] w-auto sm:h-[0.9rem] md:h-[1.05rem]" />
            </Link>

            {/* ————— à droite : les entrées, puis le rendez-vous ————— */}
            <div className="flex min-w-0 items-center justify-end gap-6">
              <ul className="hidden items-center gap-8 lg:flex">
                {DRT.map((l) => {
                  const groupe = GRP[l.href];
                  /* La puce est une boîte flex centrée, et le lien
                   * reçoit en haut la gouttière que « .souligne » lui
                   * donne en bas.
                   *
                   * Sans cela, le lien restait une boîte en ligne posée
                   * sur la ligne de base de la rangée, et les trois
                   * pixels réservés sous lui au soulignement
                   * descendaient son texte d'un pixel et demi. MENU et
                   * FR, qui ne sont pas soulignés, se tenaient un pixel
                   * et demi plus haut : c'est le décalage que la maison
                   * a vu. Les deux gouttières égales remettent le texte
                   * au milieu de sa boîte, et la boîte au milieu de la
                   * rangée — sur l'axe du sigle, à soixante pixels. */
                  return (
                    <li
                      key={l.label}
                      onMouseEnter={() => setMega(groupe ? l.href : null)}
                      className="flex items-center"
                    >
                      <Link
                        href={l.href}
                        data-actif={cheminFr === l.href}
                        onFocus={() => setMega(groupe ? l.href : null)}
                        aria-expanded={groupe ? mega === l.href : undefined}
                        aria-controls={groupe ? "mega-navigation" : undefined}
                        className="lien-nav souligne pt-[3px]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Le même bouton rouge que dans le hero. Il ne paraît pas
                * sur téléphone : le menu et le pied de page y mènent
                * déjà, et il y prenait le tiers de la barre.
                *
                * C'est l'enveloppe que l'on masque, pas le bouton :
                * « .bouton » pose son « display » hors calque et
                * l'emporterait sur l'utilitaire. */}
              {/* Les coups de cœur, à droite, sur tous les écrans : c'est
                * le seul endroit où la visiteuse retrouve ce qu'elle a
                * aimé, et le seul que le téléphone garde en vue. */}
              <Panier />


              {/* La langue, juste après le cœur : deux lettres, pas un
                * drapeau — un drapeau désigne un pays, pas une langue. */}
              <Commutateur />

              {/* L'apparence, juste après la langue : deux réglages de la
                * visiteuse, rangés ensemble. Sur téléphone il rejoint le
                * bas du menu — la barre n'a pas la place. */}
              <span className="hidden lg:block">
                <Theme classe="px-1" />
              </span>

              <span className="hidden shrink-0 md:block">
                <AppelRendezvous className="bouton bouton-barre">
                  {L.barre.rendezvous}
                </AppelRendezvous>
              </span>
            </div>
          </nav>
        </div>

        {/* ————————————————————————————— le panneau ————— */}
        {mega && GRP[mega] && (
          <div
            id="mega-navigation"
            className="hidden border-b border-fil bg-blanc text-encre lg:block"
          >
            <div className="gouttiere py-[clamp(1.75rem,3vw,2.75rem)]">
              <p className="legende">{GRP[mega].intitule}</p>
              <ul className="mt-6 grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-5 md:grid-cols-3">
                {GRP[mega].liens.map((x) => (
                  <li key={x.href}>
                    <Link href={x.href} className="group block">
                      <span className="block font-serif text-[1.375rem] leading-tight text-encre transition-colors duration-500 group-hover:text-action">
                        {x.nom}
                      </span>
                      {x.note && <span className="texte mt-1 block text-plomb">{x.note}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      {/*
        * Le menu : une page blanche, quelques lignes, rien d'autre.
        *
        * Une colonne : la ligne du sigle en haut, qui ne se comprime
        * jamais, puis le reste qui prend ce qui demeure et défile s'il ne
        * tient pas. Le contenu était auparavant centré dans une hauteur
        * fixe : sur une fenêtre large et basse, les intitulés montent à
        * quarante-huit pixels et le bloc dépassait des deux côtés — le
        * premier lien passait sur le sigle, le dernier sortait de
        * l'écran, et rien ne défilait.
        */}
      <div
        id="menu-principal"
        hidden={!ouvert}
        className="fixed inset-0 z-[60] flex flex-col bg-blanc"
      >
        <div className="gouttiere flex h-[var(--entete)] shrink-0 items-center justify-between md:h-[calc(var(--barre)+var(--entete))]">
          <Logo className="h-[0.9rem] w-auto md:h-[1.05rem]" />
          {/* L'apparence et la fermeture, côte à côte, sur deux disques
            * pleins — encre en clair, ivoire en sombre : les jetons
            * s'inversent d'eux-mêmes. Les deux gestes qu'on cherche d'abord
            * en ouvrant le menu, au même endroit et à la même taille. */}
          <div className="flex items-center gap-2.5">
            <Theme cercle />
            <button
              type="button"
              onClick={() => setOuvert(false)}
              aria-label={L.barre.fermer}
              title={L.barre.fermer}
              className="flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-full bg-encre text-blanc transition-colors duration-500 hover:bg-action hover:text-sur-image"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.8rem] w-[0.8rem]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>
        </div>
        {/* « min-h-full » sur le bloc intérieur : il se centre tant qu'il
          * tient, et pousse la barre de défilement dès qu'il déborde. */}
        {/* « data-lenis-prevent » : sans lui, Lenis capte la molette pour
          * faire défiler la page — bloquée sous le menu — et la liste ne
          * bouge qu'à la barre de défilement. */}
        <div data-lenis-prevent className="gouttiere flex-1 overflow-y-auto overscroll-contain">
          {/* Le bloc ne se centre plus : un catalogue se lit du haut. */}
          <div className="flex min-h-full flex-col py-[clamp(1.5rem,3vw,2.5rem)]">
            {/*
              * ————— sur téléphone : trois onglets —————
              *
              * Le catalogue entier est une réponse de grand écran : six
              * colonnes de noms qu'on embrasse d'un coup d'œil. Sous le
              * pouce, il devenait une liste de soixante lignes à faire
              * défiler pour atteindre « Showroom ».
              *
              * Trois onglets, et l'un d'eux déplié : c'est la forme que
              * prennent les menus des grandes maisons, et elle tient
              * dans un écran sans jamais rien cacher.
              */}
            <div className="lg:hidden">
              <div
                role="tablist"
                aria-label={L.barre.catalogue}
                className="flex items-center justify-between gap-4 whitespace-nowrap border-b border-fil min-[400px]:justify-start min-[400px]:gap-7"
              >
                {ONG.map((o) => (
                  <button
                    key={o.cle}
                    type="button"
                    role="tab"
                    aria-selected={onglet === o.cle}
                    aria-controls={`onglet-${o.cle}`}
                    onClick={() => setOnglet(o.cle)}
                    /* Les trois onglets sont en gras : seuls la couleur et le
                      * trait distinguent l'onglet actif, sans saut de largeur. */
                    className={`-mb-px border-b py-3 text-[0.8125rem] font-bold uppercase leading-none tracking-[0.08em] transition-colors duration-500 ${
                      onglet === o.cle
                        ? "border-encre text-encre"
                        : "border-transparent text-brume"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              {ONG.map((o) => (
                <ul
                  key={o.cle}
                  id={`onglet-${o.cle}`}
                  role="tabpanel"
                  hidden={onglet !== o.cle}
                  className="pt-5"
                >
                  {o.cle === "robes" ? (
                    <>
                      {/* « Toutes les robes » ouvre le catalogue entier : il
                        * se détache des maisons qu'il rassemble. */}
                      <li>
                        <Link
                          href="/robes"
                          data-actif={cheminFr === "/robes"}
                          className="block py-[0.52em] text-[0.9375rem] font-bold uppercase leading-none tracking-[0.06em] text-encre transition-colors duration-500 hover:text-action"
                        >
                          {L.barre.toutesRobes}
                        </Link>
                      </li>
                      <li className="legende mb-1 mt-4 text-plomb">{L.barre.filtrerParCreateur}</li>
                      {/*
                        * Chaque maison se déplie sur place : un toucher sur son
                        * nom ouvre la liste de ses robes juste dessous, un
                        * second la referme. La page de la maison reste à un
                        * geste, en tête de la liste.
                        */}
                      {CREATEURS.map((c) => {
                        const nom = createurNom(c, l);
                        const ouverte = maisonOuverte === c.slug;
                        const robes = robesDe(c.nom);
                        return (
                          <li key={c.slug}>
                            <button
                              type="button"
                              aria-expanded={ouverte}
                              aria-controls={`robes-${c.slug}`}
                              onClick={() => setMaisonOuverte(ouverte ? null : c.slug)}
                              className={`flex w-full items-center gap-2.5 py-[0.52em] text-left text-[0.9375rem] uppercase leading-none tracking-[0.06em] transition-colors duration-500 hover:text-action ${
                                ouverte ? "text-action" : "text-encre"
                              }`}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className={`h-3 w-3 shrink-0 transition-transform duration-500 ${ouverte ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M6 9l6 6 6-6" />
                              </svg>
                              {nom}
                            </button>
                            {/* La hauteur se déplie en douceur : une grille qui
                              * passe d'un rang nul à un rang entier. */}
                            <div
                              id={`robes-${c.slug}`}
                              className={`grid transition-[grid-template-rows] duration-500 [transition-timing-function:var(--ease-doux)] ${
                                ouverte ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                              }`}
                            >
                              <ul className="overflow-hidden pl-[1.375rem]" inert={!ouverte || undefined}>
                                <li>
                                  <Link
                                    href={`/createurs/${c.slug}`}
                                    className="legende souligne mb-1 mt-1.5 inline-block"
                                    /* « .legende » porte sa couleur et n'est pas calquée :
                                      * le rouge du lien doit être redit ici. */
                                    style={{ color: "var(--color-action)" }}
                                  >
                                    {L.barre.voirLaMaison(nom)}
                                  </Link>
                                </li>
                                {robes.map((r) => (
                                  <li key={r.slug}>
                                    <Link
                                      href={`/robes/${r.slug}`}
                                      data-actif={cheminFr === `/robes/${r.slug}`}
                                      className="block py-[0.3em] font-serif text-[1.0625rem] leading-snug text-plume transition-colors duration-500 hover:text-action"
                                    >
                                      {r.nom}
                                    </Link>
                                  </li>
                                ))}
                                <li aria-hidden="true" className="h-2" />
                              </ul>
                            </div>
                          </li>
                        );
                      })}
                    </>
                  ) : (
                    o.liens().map((lien) => (
                      <li key={lien.href}>
                        <Link
                          href={lien.href}
                          data-actif={cheminFr === lien.href}
                          className="block py-[0.52em] text-[0.9375rem] uppercase leading-none tracking-[0.06em] text-encre transition-colors duration-500 hover:text-action"
                        >
                          {lien.label}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              ))}

              {/* Le showroom et la maison : on les regarde quand on a fini
                * de chercher une robe. */}
              <ul className="mt-6 border-t border-fil pt-5">
                {DRT.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      data-actif={cheminFr === l.href}
                      className="block py-[0.52em] text-[0.9375rem] uppercase leading-none tracking-[0.06em] text-encre transition-colors duration-500 hover:text-action"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ————— le classement ————— */}
            <div className="hidden items-baseline gap-6 lg:flex" role="group" aria-label={L.barre.classer}>
              {/* « Toutes les robes » en tête, en gras, comme sur téléphone :
                * le catalogue entier, sans classement par coupe ni par
                * créateur. */}
              <Link
                href="/robes"
                data-actif={cheminFr === "/robes"}
                className="lien-nav souligne text-encre transition-colors duration-500 hover:text-action"
                style={{ fontWeight: 700 }}
              >
                {L.barre.toutesRobes}
              </Link>
              <span aria-hidden="true" className="h-3 w-px self-center bg-fil" />
              {(["createur", "coupe"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClassement(c)}
                  aria-pressed={classement === c}
                  className={`lien-nav souligne transition-colors duration-500 ${
                    classement === c ? "text-encre" : "text-brume hover:text-plomb"
                  }`}
                  data-actif={classement === c}
                >
                  {c === "createur" ? L.barre.parCreateur : L.barre.parCoupe}
                </button>
              ))}
            </div>

            {/* ————— le catalogue ————— */}
            <nav aria-label="Le catalogue" className="mt-[clamp(1.5rem,3vw,2.5rem)] max-lg:hidden">
              <div /* Six colonnes au plus large : les deux classements comptent
                  * cinq groupes — quatre maisons et les autres créateurs —, et
                  * les six coupes. À cinq, le dernier retombait seul sur une
                  * ligne. */
                className="grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {groupes.map((g) => (
                  <div key={g.titre}>
                    <Link
                      href={g.href}
                      className="legende souligne block text-encre transition-colors duration-500 hover:text-action"
                    >
                      {g.titre}
                    </Link>
                    <ul className="mt-4 flex flex-col">
                      {g.robes.map((r) => (
                        <li key={r.slug}>
                          <Link
                            href={`/robes/${r.slug}`}
                            className="block py-[0.3rem] font-serif text-[1.0625rem] leading-tight text-plume transition-colors duration-500 hover:text-action"
                          >
                            {r.nom}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>

            {/* ————— les rubriques, en pied ————— */}
            <div className="mt-auto border-t border-fil pt-6">
              <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
                {RCC.map((l) => {
                  const habits =
                    "lien-nav souligne text-plomb transition-colors duration-500 hover:text-encre";
                  return (
                    <li
                      key={l.label}
                      /* Sur téléphone, la liste du haut porte déjà ces
                        * cinq-là : ne restent ici qu'Élise et le
                        * rendez-vous. */
                      className={SECTIONS.has(l.href) ? "hidden lg:block" : undefined}
                    >
                      {l.href ? (
                        <Link href={l.href} className={habits}>
                          {l.label}
                        </Link>
                      ) : (
                        <AppelElise className={habits}>{l.label}</AppelElise>
                      )}
                    </li>
                  );
                })}
              </ul>
              {/* Le bas du menu : les réseaux par leur logo, puis l'appel et
                * l'adresse en deux gestes — un bouton qui compose le numéro,
                * une épingle qui ouvre le plan. Le numéro et l'adresse
                * restent écrits pour les lecteurs d'écran. */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                <Reseaux classe="-ml-2.5" />
                <div className="flex items-center gap-3">
                  <a
                    href={MAISON.telephoneHref}
                    aria-label={`${L.elise.appeler} — ${MAISON.telephone}`}
                    className="bouton bouton-compact gap-1.5"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.8rem] w-[0.8rem]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 7 7l1.5-2 4 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 3.5 5.5a2 2 0 0 1 2-2Z" />
                    </svg>
                    {L.elise.appelerCourt}
                  </a>
                  <a
                    href={PLAN}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${MAISON.adresse} — ${MAISON.codePostal} ${MAISON.ville}`}
                    title={`${MAISON.adresse} — ${MAISON.codePostal} ${MAISON.ville}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-action text-action transition-colors duration-500 hover:bg-action hover:text-sur-image"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.05rem] w-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
                      <circle cx="12" cy="10" r="2.3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
