"use client";

import Link from "@/components/Lien";
import { usePathname } from "next/navigation";
import { useCoupsDeCoeur } from "@/lib/coupsDeCoeur";
import { langueDe } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Le panier des coups de cœur, en haut à droite.
 *
 * Un cœur plutôt qu'un cabas : la maison ne vend rien en ligne. Un
 * panier d'achat promettrait un paiement qui n'existe pas, et la
 * fonction s'appelle « coups de cœur » — autant que le dessin le dise.
 *
 * Le compteur paraît seulement quand il y a quelque chose dedans : une
 * barre de navigation qui affiche « 0 » en permanence ne dit rien à
 * personne. Le cœur, lui, reste : c'est lui qui apprend que la liste
 * existe.
 *
 * Le trait suit la couleur de la barre — blanche sur la vidéo de
 * l'accueil, encre partout ailleurs — sans avoir à connaître laquelle.
 */

export default function Panier() {
  const liste = useCoupsDeCoeur();
  const n = liste.length;
  const L = t(langueDe(usePathname() ?? "/"));

  return (
    <Link
      href="/coups-de-coeur"
      aria-label={
        n === 0 ? L.panier.vide : n === 1 ? L.panier.pleinUn : L.panier.plein(n)
      }
      /* Le trait fait dix-sept pixels de haut : la zone touchée, elle,
       * doit rester visable au pouce. Le rembourrage part vers la
       * gauche et vers le bas, pour ne pas déplacer le cœur du bord. */
      className="lien-nav flex shrink-0 items-center gap-1.5 py-3 pl-3 transition-opacity duration-500 hover:opacity-70"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[1.05rem] w-[1.05rem]"
        fill={n > 0 ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      >
        <path d="M12 20.7 4.6 13.3a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l.9.9.9-.9a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5Z" />
      </svg>
      {/* Le nombre, en chiffres tabulaires : il ne fait pas sautiller la
       * barre en passant de 9 à 10. */}
      {n > 0 && <span className="tabular-nums">{n}</span>}
    </Link>
  );
}
