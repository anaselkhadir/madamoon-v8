"use client";

import { useCallback, useRef, useState } from "react";
import Photo, { precharger } from "@/components/media/Photo";
import Visionneuse, { MESURE, type Libelles } from "@/components/robe/Visionneuse";
import type { Media } from "@/lib/medias";

/*
 * Les autres vues d'une robe.
 *
 * Trois mises en page, selon le nombre de photographies — elles étaient
 * déjà là, elles ne changent pas :
 *
 * Une seule, et elle vient souvent de l'ancien site : cinq cents pixels
 * de large, parfois moins. Elle est posée au centre, sans jamais
 * dépasser sa propre largeur — agrandie, elle serait floue.
 *
 * Deux à quatre, en quinconce : la colonne de droite descend d'un quart
 * de sa hauteur. Deux images alignées feraient planche contact ;
 * décalées, elles se lisent l'une après l'autre.
 *
 * Au-delà — la maison en envoie jusqu'à une cinquantaine —, une trame
 * régulière, deux colonnes au doigt, trois sur ordinateur. La
 * quinconce, faite pour trois images, aurait déroulé des dizaines
 * d'écrans.
 *
 * Ce qui est neuf : chaque vue s'ouvre en grand au clic. Le bouton est
 * posé dans l'enveloppe du rideau plutôt qu'à sa place — « data-rideau »
 * découvre l'élément par un « clip-path », et le bouton y serait
 * découpé avec. L'enveloppe garde donc son rôle, le bouton prend le
 * sien.
 */

type Props = {
  photos: Media[];
  alts: string[];
  etiquette: string;
  agrandir: string;
  libelles: Libelles;
};

/*
 * La vignette : un bouton qui remplit son enveloppe. Le curseur dit ce
 * qui va se passer — on agrandit, on ne navigue pas.
 *
 * Elle est déclarée ici, hors de la galerie, et ce n'est pas un détail
 * de rangement. Définie dans le corps du composant, elle devenait une
 * fonction neuve à chaque rendu : React y voyait un autre type, et
 * remontait les huit vignettes à chaque ouverture. Les photographies se
 * rechargeaient, et le bouton d'où l'on était parti n'existait plus —
 * le focus ne pouvait donc pas y revenir.
 */
function Vignette({
  media,
  alt,
  libelle,
  sizes,
  surOuverture,
}: {
  media: Media;
  alt: string;
  libelle: string;
  sizes: string;
  surOuverture: (bouton: HTMLButtonElement) => void;
}) {
  /* La grande vue est demandée quand la souris arrive sur la vignette,
   * ou quand le clavier s'y pose : le temps d'un geste suffit à la
   * charger, et le clic n'attend plus rien. Au doigt il n'y a pas de
   * survol — c'est la mesure juste qui tient le délai, pas ceci. */
  const demander = () => precharger(media, "robes", MESURE);

  return (
    <button
      type="button"
      onClick={(e) => surOuverture(e.currentTarget)}
      onPointerEnter={demander}
      onFocus={demander}
      aria-label={libelle}
      className="absolute inset-0 block h-full w-full cursor-zoom-in"
    >
      <Photo media={media} dossier="robes" alt={alt} sizes={sizes} className="h-full w-full object-cover" />
    </button>
  );
}

export default function Galerie({ photos, alts, etiquette, agrandir, libelles }: Props) {
  const [ouverte, setOuverte] = useState<number | null>(null);
  /* D'où l'on est parti, pour y rendre le focus à la fermeture. */
  const depart = useRef<HTMLButtonElement | null>(null);

  const ouvrir = useCallback((i: number, bouton: HTMLButtonElement) => {
    depart.current = bouton;
    setOuverte(i);
  }, []);

  const fermer = useCallback(() => {
    setOuverte(null);
    depart.current?.focus();
  }, []);

  const mesure =
    photos.length > 4 ? "(max-width: 768px) 46vw, 31vw" : "(max-width: 768px) 92vw, 46vw";

  if (photos.length === 0) return null;

  return (
    <section aria-label={etiquette} className="gouttiere">
      {photos.length === 1 ? (
        <div className="flex justify-center">
          <div
            data-rideau
            className="relative w-full overflow-hidden bg-craie"
            style={{
              maxWidth: `${photos[0].w}px`,
              aspectRatio: `${photos[0].w} / ${photos[0].h}`,
            }}
          >
            <button
              type="button"
              onClick={(e) => ouvrir(0, e.currentTarget)}
              aria-label={agrandir}
              className="absolute inset-0 block h-full w-full cursor-zoom-in"
            >
              <Photo
                media={photos[0]}
                dossier="robes"
                alt={alts[0] ?? ""}
                sizes={`(max-width: ${photos[0].w}px) 92vw, ${photos[0].w}px`}
                className="h-full w-full object-cover"
              />
            </button>
          </div>
        </div>
      ) : photos.length > 4 ? (
        <div className="grid grid-cols-2 gap-[clamp(0.5rem,1.2vw,1rem)] md:grid-cols-3">
          {photos.map((p, i) => (
            <div
              key={p.name}
              data-rideau
              data-retard={(i % 3) * 90}
              className="relative aspect-[2/3] overflow-hidden bg-craie"
            >
              <Vignette
                media={p}
                alt={alts[i] ?? ""}
                libelle={agrandir}
                sizes={mesure}
                surOuverture={(bouton) => ouvrir(i, bouton)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-[clamp(1rem,2.5vw,2.5rem)] md:grid-cols-[1.15fr_0.85fr]">
          {photos.map((p, i) => (
            <div
              key={p.name}
              data-rideau
              data-retard={(i % 2) * 120}
              className={`relative overflow-hidden ${i % 2 === 1 ? "md:mt-[8%]" : ""} ${
                i % 2 === 1 ? "aspect-[4/5]" : "aspect-[5/6]"
              }`}
            >
              <Vignette
                media={p}
                alt={alts[i] ?? ""}
                libelle={agrandir}
                sizes={mesure}
                surOuverture={(bouton) => ouvrir(i, bouton)}
              />
            </div>
          ))}
        </div>
      )}

      <Visionneuse
        photos={photos}
        alts={alts}
        libelles={libelles}
        index={ouverte}
        surChangement={setOuverte}
        surFermeture={fermer}
      />
    </section>
  );
}
