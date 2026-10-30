import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { maison } from "@/lib/contenu";
/*
 * Le bandeau des mentions, au bas d'un premier écran.
 *
 * Le défilé est une translation, pas une boucle programmée : la piste
 * porte quatre copies de la liste et se décale d'un quart de sa largeur,
 * si bien que la copie suivante vient prendre exactement la place de la
 * première. Quatre copies plutôt que deux pour qu'un très grand écran ne
 * rattrape jamais la fin de la piste.
 *
 * Une seule copie porte le texte pour les lecteurs d'écran et les
 * moteurs ; les trois autres ne remplissent que la piste.
 */

/* Les mentions portent des mots : elles se lisent dans la langue de la
 * page, et le prix vient de la fiche de la maison plutôt que d'être
 * recopié ici. */
const mentions = (langue: Langue) => {
  const L = t(langue);
  return [
    L.bandeau.essayage,
    L.bandeau.surMesure,
    L.bandeau.retouches,
    `${L.bandeau.aPartirDe} ${maison(langue).prixDepart}`,
  ];
};

const COPIES = 4;

export default function Bandeau({
  className = "",
  langue = "fr",
}: {
  className?: string;
  langue?: Langue;
}) {
  const MENTIONS = mentions(langue);

  return (
    <div className={`bandeau absolute inset-x-0 bottom-[4.5rem] ${className}`}>
      <div className="bandeau-piste">
        {Array.from({ length: COPIES }, (_, copie) => (
          <div
            key={copie}
            className="flex"
            aria-hidden={copie > 0 || undefined}
          >
            {MENTIONS.map((mention) => (
              <p key={mention} className="legende bandeau-mention">
                {mention}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
