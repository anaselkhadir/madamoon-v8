import Tuile from "@/components/Tuile";
import TitreSection from "@/components/TitreSection";
import { COUPES } from "@/lib/coupes";
import { vues } from "@/lib/medias";
import { altCoupe, altRobe } from "@/lib/alt";
import { coupeNom, coupeNote } from "@/lib/contenu";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import FilDAriane from "@/components/FilDAriane";

/*
 * Les six coupes.
 *
 * Une page de passage, pas une destination : elle existe pour que
 * « Coupes » dans la barre mène quelque part, et pour que les six
 * coupes soient atteignables autrement qu'en devinant leur adresse.
 *
 * Une tuile par coupe, sa note sous le nom. Rien de plus : ce qu'il y a
 * à dire est dit sur la page de chacune.
 */

export default function PageCoupes({ langue }: { langue: Langue }) {
  const L = t(langue).pages.coupes;
  return (
    <div className="pt-[var(--entete)]">
      <FilDAriane langue={langue} rangs={[{ nom: t(langue).barre.coupes, adresse: "/coupes" }]} />
      <TitreSection niveau={1} titre={L.titre} />
      <div className="gouttiere">
        <p className="texte mesure-l pb-8">{L.intro}</p>
        <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
          {COUPES.map((s, i) => {
            const media = vues(s.robe)[s.vue - 1];
            if (!media) return null;
            return (
              <Tuile
                key={s.ancre}
                retard={(i % 3) * 70}
                href={`/coupes/${s.ancre}`}
                media={media}
                dossier="robes"
                /* La description nomme la coupe, jamais la robe qui
                   * l'illustre : celle-ci peut appartenir à une autre
                   * famille : la coupe qu'elle illustre, pas la robe. */
                alt={altCoupe(s.nom, langue)}
                nom={coupeNom(s, langue)}
                note={coupeNote(s, langue)}
                sizes="(max-width: 768px) 50vw, 31vw"
                priorite={i < 3}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
