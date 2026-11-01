"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/Lien";
import Photo from "@/components/media/Photo";
import AppelElise from "@/components/AppelElise";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import { CREATEURS, MAISON, MORPHOLOGIES, ROBES, robesDe } from "@/lib/madamoon";
import { COUPES } from "@/lib/coupes";
import { SCENES } from "@/lib/medias";
import { coupeNom, coupePluriel, createurNom, morphoNom } from "@/lib/contenu";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Le menu en tiroirs, sur ordinateur.
 *
 * Relevé sur la référence Osmo « stacked drawer navigation » envoyée par
 * la maison, et tenu au plus près — à une chose près, demandée par elle :
 * il s'ouvre à gauche, du côté du bouton « Menu ».
 *
 * Ce qui vient de la référence : un tiroir gris chaud sur toute la
 * hauteur, la page assombrie à côté ; le bouton « Menu » devenu une
 * pastille sombre « Fermer × » à la même place ; à la racine, cinq
 * rubriques en lettres droites avec un chevron quand elles ont une suite,
 * puis en bas une carte (photographie, titre, ligne, lien souligné) et
 * une ligne de petits liens. Dans un tiroir de suite : « ‹ Menu » en
 * petit, un grand titre, les entrées, « À la une » en petites capitales
 * et sa courte liste, et le lien « tout voir » souligné. Chaque tiroir
 * glisse par-dessus le précédent, qui dépasse d'une bande ; un geste sur
 * la bande y revient. Les entrées montent l'une après l'autre à
 * l'ouverture et pâlissent au survol.
 *
 * Au doigt (moins de mille vingt-quatre pixels), le menu de toujours
 * reste en place (Entete.tsx).
 */

type Lien = { href?: string; label: string; elise?: boolean };

type Noeud = {
  cle: string;
  titre: string;
  href?: string;
  enfants?: Noeud[];
  /* « À la une » : une courte liste, en petit. */
  aLaUne?: Lien[];
  /* Le lien souligné qui clôt le tiroir. */
  toutVoir?: { href: string; label: string };
};

/* La largeur d'un tiroir — un tiers de l'écran, comme la référence — et
 * la bande dont dépasse chacun des précédents. */
const LARGEUR = "clamp(24rem, 33vw, 30rem)";
const BANDE = 30;

function arbre(l: Langue): Noeud {
  const T = t(l);
  return {
    cle: "menu",
    titre: T.barre.menu,
    enfants: [
      { cle: "robes", titre: T.barre.toutesRobes, href: "/robes" },
      {
        cle: "coupes",
        titre: T.barre.coupes,
        enfants: COUPES.map((c) => ({
          cle: c.ancre,
          titre: coupeNom(c, l),
          enfants: ROBES.filter((r) => r.categorie === c.nom).map((r) => ({
            cle: r.slug,
            titre: r.nom,
            href: `/robes/${r.slug}`,
          })),
          toutVoir: { href: `/coupes/${c.ancre}`, label: `${T.coupes.les} ${coupePluriel(c.nom, l)}` },
        })),
        aLaUne: [{ href: "/coupes/fluide/robe-de-mariee-boheme-paris", label: T.tiroir.bohemeParis }],
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
        aLaUne: [{ label: T.raccourcis.trouverMaRobe, elise: true }],
        toutVoir: { href: "/morphologies", label: T.raccourcis.lesMorphologies },
      },
      {
        cle: "createurs",
        titre: T.tiroir.createurs,
        enfants: CREATEURS.map((c) => {
          const nom = createurNom(c, l);
          return {
            cle: c.slug,
            titre: nom,
            enfants: robesDe(c.nom).map((r) => ({ cle: r.slug, titre: r.nom, href: `/robes/${r.slug}` })),
            toutVoir: { href: `/createurs/${c.slug}`, label: T.barre.voirLaMaison(nom) },
          };
        }),
        aLaUne: [{ href: "/robes", label: T.barre.toutesRobes }],
        toutVoir: { href: "/createurs", label: T.tiroir.lesCreateurs },
      },
      { cle: "showroom", titre: T.barre.showroom, href: "/showroom" },
    ],
  };
}

function Chevron({ vers }: { vers: "gauche" | "droite" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[0.9rem] w-[0.9rem] shrink-0"
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
  /* La pile des tiroirs, racine comprise. Ceux au-delà de la profondeur
   * restent montés, hors champ, le temps de repartir en glissant. */
  const [pile, setPile] = useState<Noeud[]>([racine]);
  const [profondeur, setProfondeur] = useState(0);
  const fermerBouton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setPile((p) => [racine, ...p.slice(1)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langue]);

  /* À l'ouverture, la main va à « Fermer » ; à la fermeture, retour à la
   * racine une fois le tiroir sorti. */
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

  /* Une entrée de liste, à la mesure de la référence : lettres droites,
   * un chevron à droite quand elle a une suite, pâlie au survol. */
  const habitEntree =
    "flex w-full items-center justify-between gap-4 py-[0.3rem] text-left text-encre transition-opacity duration-300 hover:opacity-45";

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
        style={{ background: "rgba(20,16,12,0.34)" }}
      />

      <nav
        aria-label={T.barre.principale}
        role="dialog"
        aria-modal="true"
        className={`absolute inset-y-0 left-0 overflow-hidden transition-[transform,width] duration-500 [transition-timing-function:var(--ease-doux)] ${
          ouvert ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: `calc(${LARGEUR} + ${profondeur * BANDE}px)` }}
      >
        {/* « Fermer » : en haut à droite du tiroir, comme « Close » dans
          * la référence, à la hauteur du bouton « Menu » et à la marge du
          * texte. Au-dessus des tiroirs, le même à tous les niveaux. */}
        <div
          className="pointer-events-none absolute left-0 top-[var(--barre)] z-50 flex h-[var(--entete)] items-center justify-end px-[clamp(1.5rem,2.2vw,2.25rem)]"
          style={{ width: LARGEUR }}
        >
          <button
            ref={fermerBouton}
            type="button"
            onClick={fermer}
            className="pointer-events-auto flex h-[2rem] items-center gap-2 rounded-full bg-encre px-4 text-[0.8125rem] text-blanc transition-colors duration-500 hover:bg-action hover:text-sur-image"
          >
            {T.barre.fermer}
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.7rem] w-[0.7rem]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        {pile.map((n, k) => {
          const actif = k === profondeur;
          const dessous = k < profondeur;
          const parent = pile[k - 1];
          const decalage = dessous ? (profondeur - k) * BANDE : 0;
          /* Les entrées montent l'une après l'autre quand le tiroir
           * s'ouvre : la clé change avec l'ouverture, l'animation rejoue. */
          const cleAnim = `${ouvert ? "o" : "f"}-${n.cle}`;
          let rang = 0;
          const monte = () => ({ animationDelay: `${120 + rang++ * 35}ms` });
          return (
            <section
              key={`${k}-${n.cle}`}
              aria-label={n.titre}
              className="absolute inset-y-0 left-0 flex flex-col transition-transform duration-500 [transition-timing-function:var(--ease-doux)]"
              style={{
                width: LARGEUR,
                zIndex: k + 1,
                background: "var(--color-gris-appuye)",
                boxShadow: k > 0 ? "8px 0 28px rgba(20,16,12,0.10)" : undefined,
                transform: k > profondeur ? "translateX(-105%)" : `translateX(${decalage}px)`,
              }}
            >
              {/* La bande d'un tiroir recouvert ramène à lui. */}
              {dessous && (
                <button
                  type="button"
                  onClick={() => revenir(k)}
                  aria-label={T.tiroir.retour(n.titre)}
                  className="absolute inset-y-0 right-0 z-20 flex justify-center pt-[calc(var(--barre)+var(--entete)+0.55rem)] text-plomb transition-colors hover:text-encre"
                  style={{ width: BANDE }}
                >
                  <Chevron vers="gauche" />
                </button>
              )}

              {/* Le contenu d'un tiroir recouvert est désactivé ; sa bande
                * ne l'est pas. */}
              <div
                key={cleAnim}
                inert={!actif || undefined}
                data-lenis-prevent
                className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-[clamp(1.5rem,2.2vw,2.25rem)] pb-6 pt-[calc(var(--barre)+var(--entete)+0.25rem)]"
              >
                {k > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => revenir(k - 1)}
                      className="tiroir-monte flex items-center gap-1 self-start text-[0.875rem] text-plomb transition-colors hover:text-encre"
                      style={monte()}
                    >
                      <Chevron vers="gauche" />
                      {parent?.titre}
                    </button>
                    <h2
                      className="tiroir-monte mt-2 font-sans text-encre"
                      style={{
                        ...monte(),
                        fontSize: "clamp(2.25rem, 2.9vw, 2.875rem)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {n.titre}
                    </h2>
                  </>
                )}

                <ul className={`flex flex-col ${k > 0 ? "mt-6" : "mt-3"}`}>
                  {n.enfants?.map((e) => {
                    const corps = (
                      <>
                        <span
                          className="font-sans"
                          style={{
                            fontSize: k === 0 ? "clamp(1.625rem, 2vw, 1.875rem)" : "clamp(1.375rem, 1.75vw, 1.625rem)",
                            lineHeight: 1.2,
                            letterSpacing: "-0.005em",
                          }}
                        >
                          {e.titre}
                        </span>
                        {e.enfants && <Chevron vers="droite" />}
                      </>
                    );
                    return (
                      <li key={e.cle} className="tiroir-monte" style={monte()}>
                        {e.enfants ? (
                          <button
                            type="button"
                            onClick={() => ouvrir(k, e)}
                            aria-expanded={profondeur > k && pile[k + 1]?.cle === e.cle}
                            className={habitEntree}
                          >
                            {corps}
                          </button>
                        ) : (
                          <Link href={e.href ?? "/"} className={habitEntree}>
                            {corps}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {n.aLaUne && (
                  <div className="tiroir-monte mt-8" style={monte()}>
                    <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-plomb">{T.tiroir.aLaUne}</p>
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {n.aLaUne.map((a) => {
                        const habit = "text-[0.9375rem] text-encre transition-opacity hover:opacity-45";
                        return (
                          <li key={a.label}>
                            {a.elise ? (
                              <AppelElise className={habit}>{a.label}</AppelElise>
                            ) : (
                              <Link href={a.href ?? "/"} className={habit}>
                                {a.label}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {n.toutVoir && (
                  <Link
                    href={n.toutVoir.href}
                    className="tiroir-monte mt-7 self-start text-[0.9375rem] text-encre underline decoration-1 underline-offset-[5px] transition-opacity hover:opacity-45"
                    style={monte()}
                  >
                    {n.toutVoir.label}
                  </Link>
                )}

                {/* La racine finit sur une carte — la photographie du
                  * showroom et le rendez-vous —, puis une ligne de petits
                  * liens. */}
                {k === 0 && (
                  <div className="mt-auto pt-8">
                    <div
                      className="tiroir-monte flex items-center gap-4 rounded-[4px] p-3"
                      style={{ ...monte(), background: "rgba(20,16,12,0.05)" }}
                    >
                      <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-[2px]">
                        <Photo
                          media={SCENES["showroom"]}
                          dossier="scenes"
                          alt=""
                          sizes="88px"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.9375rem] font-medium text-encre">{T.tiroir.essayage}</p>
                        <p className="mt-1 text-[0.8125rem] leading-snug text-plomb">{T.tiroir.essayageTexte}</p>
                        <AppelRendezvous className="mt-2 inline-block text-[0.8125rem] text-encre underline decoration-1 underline-offset-[4px] transition-opacity hover:opacity-45">
                          {T.raccourcis.prendreRendezvous}
                        </AppelRendezvous>
                      </div>
                    </div>
                    <ul className="tiroir-monte mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-fil pt-4" style={monte()}>
                      {[
                        { href: "/a-propos", label: T.barre.maison },
                        { href: "/guides", label: T.raccourcis.lesGuides },
                        { href: "/faq", label: T.raccourcis.lesQuestions },
                      ].map((a) => (
                        <li key={a.href}>
                          <Link href={a.href} className="text-[0.8125rem] text-plomb transition-colors hover:text-encre">
                            {a.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <a href={MAISON.telephoneHref} className="text-[0.8125rem] text-plomb transition-colors hover:text-encre">
                          {MAISON.telephone}
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </nav>
    </div>
  );
}
