import type { Media } from "@/lib/medias";
import { media as chemin } from "@/lib/chemin";

/*
 * Une photographie qui n'existe que sur ordinateur.
 *
 * Comme « Photo », avec une première source vide sous 1024 px : là où
 * l'image n'est pas affichée (les guides gardent leur mise en page sur
 * papier au téléphone), rien n'est téléchargé. Elle est décorative —
 * elle accompagne un texte qui se suffit — et son « alt » reste vide :
 * aucune description n'est ajoutée à la page.
 */

const VIDE = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

type Props = {
  media: Media;
  dossier: "robes" | "scenes";
  sizes: string;
  priorite?: boolean;
  className?: string;
  position?: string;
};

export default function PhotoOrdi({ media, dossier, sizes, priorite = false, className = "", position }: Props) {
  const jeu = (ext: string, largeurs: readonly number[]) =>
    largeurs.map((w) => `${chemin(`/${dossier}/${media.name}-${w}.${ext}`)} ${w}w`).join(", ");
  const jpeg = media.jpgw;

  return (
    <picture>
      <source media="(max-width: 1023.98px)" srcSet={VIDE} />
      <source type="image/avif" srcSet={jeu("avif", media.widths)} sizes={sizes} />
      <source type="image/webp" srcSet={jeu("webp", media.widths)} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={chemin(`/${dossier}/${media.name}-${jpeg[jpeg.length - 1]}.jpg`)}
        srcSet={jeu("jpg", jpeg)}
        sizes={sizes}
        width={media.w}
        height={media.h}
        alt=""
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
