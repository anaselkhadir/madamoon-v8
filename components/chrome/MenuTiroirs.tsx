"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/Lien";
import Photo from "@/components/media/Photo";
import AppelElise from "@/components/AppelElise";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import Reseaux from "@/components/chrome/Reseaux";
import Logo from "@/components/chrome/Logo";
import {
  CREATEURS,
  MAISON,
  MORPHOLOGIES,
  ROBES,
  robesDe,
} from "@/lib/madamoon";
import { COUPES } from "@/lib/coupes";
import { SCENES } from "@/lib/medias";
import {
  coupeNom,
  coupeNote,
  coupePluriel,
  createurNom,
  createurOrigine,
  morphoNom,
} from "@/lib/contenu";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Le menu en tiroirs, sur ordinateur.
 *
 * D'après la référence Osmo « stacked drawer navigation » envoyée par
 * la maison, ouvert à gauche, du côté du bouton « Menu ». Un premier
 * tiroir donne les rubriques ; une rubrique qui a une suite en ouvre un
 * second par-dessus, qui glisse depuis la gauche, et ainsi de suite
 * jusqu'aux robes. Les tiroirs précédents ne disparaissent pas : chacun
 * dépasse d'une bande à droite du suivant, et un geste sur cette bande y
 * revient. On sait toujours d'où l'on vient.
 *
 * Trois niveaux au plus : les rubriques ; les maisons, les coupes, les
 * morphologies ; les robes d'une maison ou d'une coupe.
 *
 * Au doigt, le menu de toujours reste en place (Entete.tsx) : ce tiroir
 * n'existe qu'au delà de mille vingt-quatre pixels.
 */

type Noeud = {
  cle: string;
  titre: string;
  /* Une note sous le titre, dans la liste : la ville d'une maison, la
   * ligne d'une coupe. */
  note?: string;
  href?: string;
  enfants?: Noeud[];
  /* Le lien qui clôt le tiroir : la page entière de la rubrique. */
  toutVoir?: { href: string; label: string };
  /* Quelques liens voisins, en petit. */
  aussi?: { href?: string; label: string; elise?: boolean }[];
};

/* La largeur d'un tiroir, et la bande dont dépasse chacun des précédents. */
const LARGEUR = "clamp(22rem, 30vw, 27rem)";
const BANDE = 28;

function arbre(l: Langue): Noeud {
  const T = t(l);
  return {
    cle: "menu",
    titre: T.barre.menu,
    enfants: [
      {
        cle: "robes",
        titre: T.barre.robes,
        enfants: CREATEURS.map((c) => {
          const nom = createurNom(c, l);
          return {
            cle: c.slug,
            titre: nom,
            note: createurOrigine(c, l),
            enfants: robesDe(c.nom).map((r) => ({
              cle: r.slug,
              titre: r.nom,
              href: `/robes/${r.slug}`,
            })),
            toutVoir: {
              href: `/createurs/${c.slug}`,
              label: T.barre.voirLaMaison(nom),
            },
          };
        }),
        aussi: [{ href: "/createurs", label: T.tiroir.lesCreateurs }],
        toutVoir: { href: "/robes", label: T.barre.toutesRobes },
      },
      {
        cle: "coupes",
        titre: T.barre.coupes,
        enfants: COUPES.map((c) => ({
          cle: c.ancre,
          titre: coupeNom(c, l),
          note: coupeNote(c, l),
          enfants: ROBES.filter((r) => r.categorie === c.nom).map((r) => ({
            cle: r.slug,
            titre: r.nom,
            href: `/robes/${r.slug}`,
          })),
          aussi:
            c.ancre === "fluide"
              ? [
                  {
                    href: "/coupes/fluide/robe-de-mariee-boheme-paris",
                    label: T.tiroir.bohemeParis,
                  },
                ]
              : undefined,
          toutVoir: {
            href: `/coupes/${c.ancre}`,
            label: `${T.coupes.les} ${coupePluriel(c.nom, l)}`,
          },
        })),
        toutVoir: { href: "/coupes", label: T.raccourcis.lesCoupes },
      },
      {
        cle: "morphologies",
        titre: T.barre.morphologies,
        enfants: MORPHOLOGIES.map((m) => ({
          cle: m.lettre,
          titre: morphoNom(m, l),
          href: `/morphologies/${m.lettre.toLowerCase()}`,
        })),
        aussi: [{ label: T.raccourcis.trouverMaRobe, elise: true }],
        toutVoir: {
          href: "/morphologies",
          label: T.raccourcis.lesMorphologies,
        },
      },
      {
        cle: "guides",
        titre: T.raccourcis.lesGuides,
        enfants: [
          {
            cle: "guides-tous",
            titre: T.raccourcis.lesGuides,
            href: "/guides",
          },
          { cle: "faq", titre: T.raccourcis.lesQuestions, href: "/faq" },
        ],
      },
      { cle: "showroom", titre: T.barre.showroom, href: "/showroom" },
      { cle: "a-propos", titre: T.barre.maison, href: "/a-propos" },
    ],
  };
}

function Chevron({ vers }: { vers: "gauche" | "droite" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[0.85rem] w-[0.85rem] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={vers === "droite" ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
    </svg>
  );
}

export default function MenuTiroirs({
  ouvert,
  fermer,
  langue,
}: {
  ouvert: boolean;
  fermer: () => void;
  langue: Langue;
}) {
  const T = t(langue);
  const racine = arbre(langue);
  /* La pile des tiroirs ouverts, racine comprise. Les tiroirs au-delà de
   * la profondeur restent montés, hors champ : c'est ce qui leur laisse
   * le temps de repartir en glissant. */
  const [pile, setPile] = useState<Noeud[]>([racine]);
  const [profondeur, setProfondeur] = useState(0);
  const fermerBouton = useRef<HTMLButtonElement>(null);

  /* La langue change l'arbre : la racine suit. */
  useEffect(() => {
    setPile((p) => [racine, ...p.slice(1)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langue]);

  /* À l'ouverture, la main va au bouton de fermeture ; à la fermeture,
   * on revient à la racine une fois le tiroir sorti. */
  useEffect(() => {
    if (ouvert) {
      fermerBouton.current?.focus({ preventScroll: true });
      return;
    }
    const minuterie = window.setTimeout(() => {
      setPile([racine]);
      setProfondeur(0);
    }, 600);
    return () => window.clearTimeout(minuterie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ouvert]);

  const ouvrir = (niveau: number, n: Noeud) => {
    setPile((p) => [...p.slice(0, niveau + 1), n]);
    setProfondeur(niveau + 1);
  };
  const revenir = (niveau: number) => setProfondeur(niveau);

  const largeurTotale = `calc(${LARGEUR} + ${profondeur * BANDE}px)`;

  return (
    <div
      id="menu-tiroirs"
      className={`fixed inset-0 z-[60] max-lg:hidden ${ouvert ? "visible" : "invisible delay-500"}`}
      aria-hidden={!ouvert || undefined}
      inert={!ouvert || undefined}
    >
      {/* Le voile : la page s'assombrit, un clic dessus referme. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={fermer}
        className={`absolute inset-0 cursor-default transition-opacity duration-500 [transition-timing-function:var(--ease-doux)] ${
          ouvert ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "rgba(20,16,12,0.38)" }}
      />

      <nav
        aria-label={T.barre.principale}
        role="dialog"
        aria-modal="true"
        className={`absolute inset-y-0 left-0 overflow-hidden transition-[transform,width] duration-500 [transition-timing-function:var(--ease-doux)] ${
          ouvert ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: largeurTotale }}
      >
        {pile.map((n, k) => {
          const actif = k === profondeur;
          const dessous = k < profondeur;
          const parent = pile[k - 1];
          const decalage = dessous ? (profondeur - k) * BANDE : 0;
          return (
            <section
              key={`${k}-${n.cle}`}
              aria-label={n.titre}
              className="absolute inset-y-0 left-0 flex flex-col transition-transform duration-500 [transition-timing-function:var(--ease-doux)]"
              style={{
                width: LARGEUR,
                zIndex: k + 1,
                background: "var(--color-gris)",
                boxShadow: k > 0 ? "6px 0 24px rgba(20,16,12,0.08)" : undefined,
                transform:
                  k > profondeur
                    ? "translateX(-105%)"
                    : `translateX(${decalage}px)`,
              }}
            >
              {/* Le tiroir recouvert pâlit, et sa bande ramène à lui. */}
              {dessous && (
                <button
                  type="button"
                  onClick={() => revenir(k)}
                  aria-label={T.tiroir.retour(n.titre)}
                  className="absolute inset-y-0 right-0 z-20 flex justify-center pt-[calc(var(--barre)+var(--entete)/2-0.425rem)] text-plomb transition-colors hover:text-encre"
                  style={{ width: BANDE }}
                >
                  <Chevron vers="gauche" />
                </button>
              )}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  background: "rgba(243,242,241,0.55)",
                  opacity: dessous ? 1 : 0,
                }}
              />

              {/* Le contenu d'un tiroir recouvert est désactivé ; sa bande,
               * au-dessus, ne l'est pas. */}
              <div
                inert={!actif || undefined}
                className="flex min-h-0 flex-1 flex-col"
              >
                {/* L'en-tête du tiroir : le sigle ou le retour, et la croix. */}
                <div className="flex h-[calc(var(--barre)+var(--entete))] shrink-0 items-center justify-between gap-4 px-8">
                  {k === 0 ? (
                    <Logo className="h-[1.05rem] w-auto" />
                  ) : (
                    <button
                      type="button"
                      onClick={() => revenir(k - 1)}
                      className="lien-nav flex items-center gap-1.5 text-plomb transition-colors hover:text-encre"
                    >
                      <Chevron vers="gauche" />
                      {parent?.titre}
                    </button>
                  )}
                  <button
                    ref={k === 0 ? fermerBouton : undefined}
                    type="button"
                    onClick={fermer}
                    aria-label={T.barre.fermer}
                    title={T.barre.fermer}
                    className="flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-full bg-encre text-blanc transition-colors duration-500 hover:bg-action hover:text-sur-image"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-[0.8rem] w-[0.8rem]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <path d="M5 5l14 14M19 5L5 19" />
                    </svg>
                  </button>
                </div>

                {/* « data-lenis-prevent » : la molette fait défiler la liste,
                 * pas la page bloquée dessous. */}
                <div
                  data-lenis-prevent
                  className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-8 pb-8"
                >
                  {k > 0 && (
                    <h2
                      className="mb-5 mt-2"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(2rem, 2.6vw, 2.5rem)",
                        lineHeight: 1.05,
                        color: "var(--color-encre)",
                      }}
                    >
                      {n.titre}
                    </h2>
                  )}

                  {/* Les robes se lisent plus petit : une maison en compte
                   * jusqu'à vingt-huit. */}
                  <ul className={`flex flex-col ${k === 0 ? "mt-4" : ""}`}>
                    {n.enfants?.map((e) => {
                      const feuille = !e.enfants;
                      const grand = k < 2;
                      const habit = `flex w-full items-center justify-between gap-4 text-left text-encre transition-colors duration-300 hover:text-action ${
                        grand ? "py-[0.4rem]" : "py-[0.3rem] text-[1.0625rem]"
                      }`;
                      const corps = (
                        <>
                          <span className="min-w-0">
                            <span
                              className="block"
                              style={
                                grand
                                  ? {
                                      fontFamily: "var(--font-serif)",
                                      fontSize:
                                        k === 0
                                          ? "clamp(1.625rem, 2.1vw, 2rem)"
                                          : "clamp(1.375rem, 1.8vw, 1.625rem)",
                                      lineHeight: 1.15,
                                    }
                                  : {
                                      fontFamily: "var(--font-serif)",
                                      lineHeight: 1.3,
                                    }
                              }
                            >
                              {e.titre}
                            </span>
                            {e.note && (
                              <span className="legende mt-1 block">
                                {e.note}
                              </span>
                            )}
                          </span>
                          {!feuille && <Chevron vers="droite" />}
                        </>
                      );
                      return (
                        <li key={e.cle}>
                          {feuille && e.href ? (
                            <Link href={e.href} className={habit}>
                              {corps}
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => ouvrir(k, e)}
                              aria-expanded={
                                pile[k + 1]?.cle === e.cle && profondeur > k
                              }
                              className={habit}
                            >
                              {corps}
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  {n.aussi && (
                    <div className="mt-7">
                      <p className="legende">{T.tiroir.aussi}</p>
                      <ul className="mt-3 flex flex-col gap-2">
                        {n.aussi.map((a) => (
                          <li key={a.label}>
                            {a.elise ? (
                              <AppelElise className="texte text-encre transition-colors hover:text-action">
                                {a.label}
                              </AppelElise>
                            ) : (
                              <Link
                                href={a.href ?? "/"}
                                className="texte text-encre transition-colors hover:text-action"
                              >
                                {a.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {n.toutVoir && (
                    <Link
                      href={n.toutVoir.href}
                      className="lien-nav souligne mt-7 self-start text-action"
                    >
                      {n.toutVoir.label}
                    </Link>
                  )}

                  {/* La racine finit sur le rendez-vous, la seule action que
                   * vend la maison, puis les réseaux et le téléphone. */}
                  {k === 0 && (
                    <div className="mt-auto pt-8">
                      <div
                        className="flex items-center gap-4 rounded-[4px] p-3"
                        style={{ background: "var(--color-blanc)" }}
                      >
                        <div className="relative h-[5.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-[4px]">
                          <Photo
                            media={SCENES["showroom"]}
                            dossier="scenes"
                            alt=""
                            sizes="72px"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[0.9375rem] font-medium text-encre">
                            {T.tiroir.essayage}
                          </p>
                          <p className="mt-1 text-[0.8125rem] leading-snug text-plomb">
                            {T.tiroir.essayageTexte}
                          </p>
                          <AppelRendezvous className="lien-nav souligne mt-2 inline-block text-action">
                            {T.raccourcis.prendreRendezvous}
                          </AppelRendezvous>
                        </div>
                      </div>
                      <div className="mt-5 flex items-center justify-between gap-4 border-t border-fil pt-4">
                        <Reseaux classe="-ml-2.5" />
                        <a
                          href={MAISON.telephoneHref}
                          className="lien-nav text-plomb transition-colors hover:text-encre"
                        >
                          {MAISON.telephone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </nav>
    </div>
  );
}
