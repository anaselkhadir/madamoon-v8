import { media as chemin } from "@/lib/chemin";

/*
 * Le croquis d'une morphologie.
 *
 * Un dessin plutôt qu'une photographie, et c'est tout le propos : une
 * robe posée au-dessus d'un type de corps se lisait comme une
 * recommandation. Elle n'en était pas une — la robe qui ouvrait le O
 * n'est pas celle qu'on conseille à une cliente en O.
 *
 * L'image sert de masque, pas de contenu. La forme vient de son canal
 * de transparence, la couleur vient du texte : le trait devient donc
 * encre sur fond clair, ivoire sur fond sombre, et rouge au survol,
 * sans qu'il faille six fichiers de plus. Une image posée telle quelle
 * aurait figé le trait en noir.
 */

const CLES: Record<string, string> = {
  O: "o", A: "a", V: "v", H: "h", "8": "8", X: "x",
};

export default function Croquis({
  lettre,
  className = "",
}: {
  lettre: string;
  className?: string;
}) {
  const cle = CLES[lettre];
  if (!cle) return null;
  const source = `url(${chemin(`/croquis/morphologie-${cle}.webp`)})`;

  return (
    <span
      aria-hidden="true"
      className={`block bg-current ${className}`}
      style={{
        aspectRatio: "500 / 1201",
        WebkitMaskImage: source,
        maskImage: source,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
