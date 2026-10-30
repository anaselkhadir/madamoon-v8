import type { Media } from "@/content/medias";

/*
 * Une photographie de la maison. Trois formats pré-générés (AVIF, WebP,
 * JPEG) en quatre à cinq largeurs ; le navigateur choisit. L'aperçu flouté
 * tient la place : la mise en page ne bouge pas.
 */
type Props = {
  media: Media;
  dossier: "robes" | "scenes";
  alt: string;
  sizes: string;
  priorite?: boolean;
  className?: string;
  position?: string;
};

export default function Photo({ media, dossier, alt, sizes, priorite = false, className = "", position }: Props) {
  const jeu = (ext: string, largeurs: readonly number[]) =>
    largeurs.map((w) => `/${dossier}/${media.name}-${w}.${ext} ${w}w`).join(", ");
  const repli = media.jpgw[media.jpgw.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={jeu("avif", media.widths)} sizes={sizes} />
      <source type="image/webp" srcSet={jeu("webp", media.widths)} sizes={sizes} />
      <img
        src={`/${dossier}/${media.name}-${repli}.jpg`}
        srcSet={jeu("jpg", media.jpgw)}
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
