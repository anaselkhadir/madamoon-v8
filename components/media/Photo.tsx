import type { Media } from "@/lib/medias";
import { media as chemin } from "@/lib/chemin";

/*
 * Une photographie MADAMOON.
 *
 * Trois formats sont pré-générés à la compilation (AVIF, WebP, JPEG) en
 * quatre à cinq largeurs. Le navigateur choisit ; nous ne chargeons jamais
 * plus que nécessaire. L'aperçu flouté de vingt pixels tient la place
 * pendant le chargement — la mise en page ne bouge pas d'un pixel.
 */

type Props = {
  media: Media;
  dossier: "robes" | "scenes";
  alt: string;
  sizes: string;
  priorite?: boolean;
  className?: string;
  /* Recadrage. Par défaut la photo remplit son conteneur. */
  position?: string;
};

export default function Photo({
  media,
  dossier,
  alt,
  sizes,
  priorite = false,
  className = "",
  position,
}: Props) {
  const jeu = (ext: string, largeurs: readonly number[]) =>
    largeurs.map((w) => `${chemin(`/${dossier}/${media.name}-${w}.${ext}`)} ${w}w`).join(", ");
  const jpeg = media.jpgw;
  const replis = jpeg[jpeg.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={jeu("avif", media.widths)} sizes={sizes} />
      <source type="image/webp" srcSet={jeu("webp", media.widths)} sizes={sizes} />
      <img
        src={chemin(`/${dossier}/${media.name}-${replis}.jpg`)}
        srcSet={jeu("jpg", jpeg)}
        sizes={sizes}
        width={media.w}
        height={media.h}
        alt={alt}
        loading={priorite ? "eager" : "lazy"}
        decoding={priorite ? "sync" : "async"}
        fetchPriority={priorite ? "high" : "auto"}
        className={className}
        style={{
          backgroundImage: `url(${media.blur})`,
          backgroundSize: "cover",
          backgroundPosition: position ?? "center",
          objectPosition: position,
        }}
      />
    </picture>
  );
}

/*
 * Demander une photographie avant qu'on la regarde.
 *
 * Le navigateur choisit lui-même la largeur, exactement comme il le
 * ferait pour la balise : on lui donne le même jeu et la même mesure,
 * il retient le même fichier, et celui-ci est déjà là au moment de
 * l'afficher.
 *
 * L'AVIF seul est demandé. C'est le format que tout navigateur capable
 * de lire cette page retiendra de toute façon ; précharger les trois
 * reviendrait à télécharger deux fichiers pour rien.
 */
export function precharger(media: Media, dossier: "robes" | "scenes", sizes: string) {
  if (typeof window === "undefined") return;
  const image = new Image();
  image.sizes = sizes;
  image.srcset = media.widths
    .map((w) => `${chemin(`/${dossier}/${media.name}-${w}.avif`)} ${w}w`)
    .join(", ");
}
