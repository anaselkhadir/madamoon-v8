import Link from "@/components/Lien";

/*
 * L'intitulé d'une section.
 *
 * Sur la référence : capitales de 32 px, calées sur la gouttière, à 80 px
 * de la section précédente, puis 12 px avant les images. Un lien peut
 * l'accompagner à droite — jamais un bouton.
 *
 * Le titre monte de derrière un masque, le lien se contente de paraître.
 * Le masque est porté par une enveloppe autour du seul titre : posé sur
 * la rangée entière, il découperait aussi le lien, qui n'a aucune raison
 * de monter.
 */

type Props = {
  titre: string;
  /* L'intitulé devient cliquable. Le lien est posé dans le titre et non
   * autour : le niveau de titre reste celui du document, et seul le texte
   * prend le clic. */
  href?: string;
  id?: string;
  niveau?: 1 | 2;
  lien?: { href: string; label: string };
  /* Sans gouttière ni retrait haut : l'intitulé est alors posé dans une
   * colonne qui porte déjà ses propres marges, et non en tête de section. */
  nu?: boolean;
  className?: string;
};

export default function TitreSection({
  titre,
  id,
  href,
  niveau = 2,
  lien,
  nu = false,
  className = "",
}: Props) {
  const H = niveau === 1 ? "h1" : "h2";
  return (
    <div
      className={`flex items-baseline justify-between gap-6 pb-3 ${
        nu ? "" : "gouttiere pt-[clamp(3rem,5.5vw,5rem)]"
      } ${className}`}
    >
      <span data-ligne className="block">
        <H id={id} className="titre-section">
          {href ? (
            <Link
              href={href}
              className="souligne transition-colors duration-500 hover:text-action"
            >
              {titre}
            </Link>
          ) : (
            titre
          )}
        </H>
      </span>
      {lien && (
        <Link
          href={lien.href}
          className="lien-nav souligne shrink-0 text-encre"
          data-lever
          data-retard="180"
        >
          {lien.label}
        </Link>
      )}
    </div>
  );
}
