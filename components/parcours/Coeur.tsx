"use client";

import { usePathname } from "next/navigation";
import { basculer, useEstAime } from "@/lib/coupsDeCoeur";
import { langueDe } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Le cœur.
 *
 * Un seul geste : on aime, la robe rejoint la liste ; on reclique, elle
 * en sort. Pas de fenêtre de confirmation, pas de message qui recouvre
 * la photographie — le cœur se remplit, le compteur de l'en-tête avance,
 * et cela suffit à dire que c'est fait.
 *
 * Deux tailles pour deux places. Sur une tuile il est posé dans l'image,
 * en blanc, discret jusqu'à ce qu'on le touche. Sur la fiche d'une robe
 * il porte son intitulé, à côté du rendez-vous.
 *
 * Le tracé change avec l'état plutôt que la seule couleur : un cœur
 * plein se distingue d'un cœur vide même sans voir les couleurs.
 */

const TRACE =
  "M12 20.7 4.6 13.3a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l.9.9.9-.9a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5Z";

function Dessin({ plein, classe }: { plein: boolean; classe: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={classe}
      fill={plein ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    >
      <path d={TRACE} />
    </svg>
  );
}

/* Sur une tuile : dans l'image, en haut à droite. Le repère occupe déjà
 * le coin gauche, et le nom le bas. */
export function CoeurTuile({ slug, nom }: { slug: string; nom: string }) {
  const L = t(langueDe(usePathname() ?? "/")).panier;
  const aime = useEstAime(slug);
  return (
    <button
      type="button"
      onClick={() => basculer(slug)}
      aria-pressed={aime}
      aria-label={aime ? L.retirer(nom) : L.ajouter(nom)}
      /* Posé au-dessus du lien de la tuile : un bouton dans un lien
        * n'est pas un balisage valide, celui-ci lui est superposé. */
      className="absolute right-[clamp(0.75rem,1.4vw,1.25rem)] top-[clamp(0.75rem,1.4vw,1.25rem)] z-10 grid h-11 w-11 place-items-center text-sur-image transition-[opacity,transform] duration-500 [transition-timing-function:var(--ease-doux)] hover:scale-110"
    >
      <Dessin plein={aime} classe="h-[1.15rem] w-[1.15rem] drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]" />
    </button>
  );
}

/* Sur la fiche d'une robe : un bouton nommé, au même rang que le
 * rendez-vous. Il est clair comme lui — il est posé sur la photographie
 * de couverture. */
export function CoeurFiche({
  slug,
  nom,
  pastille = false,
}: {
  slug: string;
  nom: string;
  /* Sur petit écran, le cœur se passe de son intitulé : la
   * photographie de la robe vaut mieux que trois bandes blanches. */
  pastille?: boolean;
}) {
  const L = t(langueDe(usePathname() ?? "/")).panier;
  const aime = useEstAime(slug);
  return (
    <button
      type="button"
      onClick={() => basculer(slug)}
      aria-pressed={aime}
      aria-label={aime ? L.retirer(nom) : L.ajouter(nom)}
      className={pastille ? "bouton-clair pastille gap-2" : "bouton-clair gap-2"}
      title={aime ? L.dedans(nom) : undefined}
    >
      <Dessin plein={aime} classe="trace h-[0.95rem] w-[0.95rem]" />
      <span className="intitule">{aime ? L.dansLesVotres : L.coupDeCoeur}</span>
    </button>
  );
}
