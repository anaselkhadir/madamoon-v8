import Link from "next/link";
import Photo from "@/components/media/Photo";
import { couverture } from "@/content/couverture";
import { altRobe } from "@/lib/alt";
import type { Robe } from "@/content/madamoon";

/* Une robe en liste : photographie 3:4 sans cadre, nom en Bodoni italique, maison en mention. */
export default function Tuile({ robe, sizes = "(min-width: 1024px) 28vw, 70vw", priorite = false }: { robe: Robe; sizes?: string; priorite?: boolean }) {
  const media = couverture(robe);
  return (
    <Link href={`/robes/${robe.slug}/`} className="group block">
      <div className="aspect-robe overflow-hidden bg-ivoire">
        {media && (
          <Photo media={media} dossier="robes" alt={altRobe(robe)} sizes={sizes} priorite={priorite}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-sortie group-hover:scale-[1.03]" />
        )}
      </div>
      <p className="titre-3 mt-4 italic">{robe.nom}</p>
      <p className="mention mt-1">{robe.categorie}{robe.createur && robe.createur !== "Autres créateurs" ? ` — ${robe.createur}` : ""}</p>
    </Link>
  );
}
