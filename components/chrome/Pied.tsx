"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/Lien";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import { MAISON, CREATEURS } from "@/lib/madamoon";
import { COUPES } from "@/lib/coupes";
import { media as chemin } from "@/lib/chemin";
import Logo from "@/components/chrome/Logo";
import { langueDe } from "@/lib/langue";
import { ouvrirPreferences } from "@/lib/consentement";
import { t } from "@/lib/textes";
import { coupeNom, createurNom, maison } from "@/lib/contenu";

/*
 * Le pied de page.
 *
 * Il ne cherche pas à retenir : il range. Quatre colonnes de liens fins,
 * les coordonnées de la maison, et le maillage interne dont le
 * référencement a besoin — sans un paragraphe de plus.
 *
 * Il lit la langue sur l'adresse : posé par le gabarit, il ne reçoit
 * rien de la page. C'est ce qui l'a fait passer côté client — il n'était
 * que des liens, qui le sont déjà.
 */

/* L'atelier qui a fait le site. Une seule ligne à changer le jour où
 * anvslab.com prend la place de l'adresse d'aperçu. */
const ANVSLAB = "https://anaselkhadir.github.io/anvslab/";

export default function Pied() {
  const l = langueDe(usePathname() ?? "/");
  const L = t(l);
  const M = maison(l);
  return (
    <footer className="gouttiere border-t border-fil bg-blanc pb-10 pt-[clamp(3rem,5vw,4.5rem)]">
      {/* Deux colonnes avant mille vingt-quatre pixels, quatre au-delà.
       * À quatre dès sept cent soixante-huit, la colonne du rendez-vous
       * était plus étroite que son bouton — celui-ci ne se coupe pas, et
       * la page gagnait seize pixels de défilement latéral. */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="h-[1.05rem] w-auto" />
          <p className="texte mesure mt-5">{M.baseline}.</p>
          <ul className="mt-5 flex gap-5">
            {MAISON.reseaux.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mention souligne text-plomb hover:text-encre"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={L.pied.coupes}>
          <h2 className="legende">{L.pied.coupes}</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {COUPES.map((s) => (
              <li key={s.ancre}>
                <Link href={`/coupes/${s.ancre}`} className="texte souligne">
                  {L.pied.robeDeMariee} {coupeNom(s, l).toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={L.pied.createurs}>
          <h2 className="legende">{L.pied.createurs}</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {CREATEURS.map((c) => (
              <li key={c.slug}>
                <Link href={`/createurs/${c.slug}`} className="texte souligne">
                  {createurNom(c, l)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="legende">{L.pied.showroom}</h2>
          <address className="texte mt-4 not-italic">
            {MAISON.adresse}
            <br />
            {MAISON.codePostal} {MAISON.ville}
            <br />
            <a href={MAISON.telephoneHref} className="souligne">
              {MAISON.telephone}
            </a>
            <br />
            <a href={MAISON.emailHref} className="souligne">
              {MAISON.email}
            </a>
          </address>
          <AppelRendezvous className="bouton mt-6">
            {L.pied.rendezvous}
          </AppelRendezvous>
        </div>
      </div>

      <div className="filet mt-12" />
      {/* Trois colonnes égales à partir de sept cent soixante-huit pixels :
        * c'est la seule façon de poser la signature au milieu de la page
        * et non au milieu de ce qui reste.
        *
        * Sous ce seuil, les trois lignes s'empilent, et l'ordre change :
        * le copyright et les cookies vont ensemble — ce sont les mentions
        * de la maison —, la signature se détache dessous. Les « order »
        * font ce déplacement sans toucher à l'ordre du document, que les
        * colonnes suivent au-delà du seuil. */}
      <div className="mt-6 grid gap-x-6 gap-y-3 md:grid-cols-3 md:items-center">
        <p className="order-1 mention text-plomb">
          © {new Date().getFullYear()} {MAISON.nom} — {L.pied.droits}
        </p>

        {/*
          * La signature de l'atelier qui a fait le site.
          *
          * Deux fichiers, l'encre et le blanc, l'un masqué par la feuille
          * de style selon le thème — le même mécanisme que le sigle de la
          * maison, et pour la même raison : un logo qui sauterait d'une
          * image à l'autre au chargement se remarque plus que le logo
          * lui-même.
          */}
        <a
          href={ANVSLAB}
          target="_blank"
          rel="noreferrer noopener"
          /* Centrée aussi sur téléphone, où la ligne occupe toute la
            * largeur : le copyright et les cookies restent à gauche, la
            * signature se pose au milieu comme sur ordinateur. */
          className="order-3 mt-4 flex items-center justify-center gap-3 text-plomb transition-colors duration-500 hover:text-encre md:order-2 md:mt-0 md:justify-self-center"
        >
          <span className="mention">{L.pied.signature}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={chemin("/marque/anvslab-noir.png")}
            alt="ANVSLAB"
            width={360}
            height={111}
            className="logo-clair h-[1.6rem] w-auto"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={chemin("/marque/anvslab-blanc.png")}
            alt=""
            aria-hidden="true"
            width={360}
            height={111}
            className="logo-sombre h-[1.6rem] w-auto"
          />
        </a>

        {/* Le choix des cookies se rouvre ici, à tout moment : la CNIL
          * demande qu'on puisse le retirer aussi simplement qu'on l'a
          * donné. */}
        <button
          type="button"
          onClick={ouvrirPreferences}
          className="order-2 mention souligne justify-self-start text-plomb hover:text-encre md:order-3 md:justify-self-end"
        >
          {L.pied.gererCookies}
        </button>
      </div>
    </footer>
  );
}
