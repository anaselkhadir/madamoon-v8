/* Les étoiles. Dessinées, et non écrites : le caractère « ★ » n'existe
 * pas dans toutes les polices et retombe sur celle du système.
 *
 * Deux emplois, un seul dessin : petites et rouges sur les cartes,
 * grandes et noires en tête de section, où elles ont remplacé le
 * chiffre. */
export default function Etoiles({
  note,
  className = "flex gap-[0.15em] text-action",
  etoile = "h-[0.8rem] w-[0.8rem]",
}: {
  note: number;
  className?: string;
  etoile?: string;
}) {
  return (
    <span aria-hidden="true" className={className}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={etoile}
          fill={i <= note ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        >
          <path d="M12 3.4l2.6 5.5 5.9.8-4.3 4.2 1 6-5.2-2.8-5.2 2.8 1-6-4.3-4.2 5.9-.8Z" />
        </svg>
      ))}
    </span>
  );
}
