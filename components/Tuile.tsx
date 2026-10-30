import Link from "@/components/Lien";
import AppelElise from "@/components/AppelElise";
import Photo from "@/components/media/Photo";
import { CoeurTuile } from "@/components/parcours/Coeur";
import type { Media } from "@/lib/medias";

/*
 * La tuile.
 *
 * C'est le composant central du site : une photographie au rapport
 * 447 / 621 — celui relevé sur la référence — et, posé dedans, un nom en
 * serif avec une ligne en dessous. Le texte est centré en hauteur et calé
 * à 24 px de la gauche. Pas de cadre, pas d'ombre, pas de bouton : la
 * tuile entière est le lien.
 *
 * « appelle » remplace l'adresse par une conversation : la tuile devient
 * alors un bouton, parce qu'il n'y a pas de page au bout. Le nom de la
 * maison, s'il est donné, dit à Élise de quel catalogue partir.
 */

type Props = {
  href: string;
  /* Ouvre Élise plutôt que de naviguer. La chaîne vide vaut « aucune
   * maison » : la conversation part alors de tout le catalogue. */
  appelle?: string | null;
  media: Media;
  dossier: "robes" | "scenes";
  alt: string;
  nom: string;
  note?: string;
  sizes: string;
  priorite?: boolean;
  position?: string;
  /* Un repère discret en haut à gauche (numéro, catégorie). */
  repere?: string;
  /* L'identifiant de la robe montrée. Donné, il pose un cœur dans le
   * coin haut droit : on aime depuis la liste, sans ouvrir la fiche.
   * Les tuiles qui montrent une coupe ou une maison n'en ont pas — on
   * n'a pas de coup de cœur pour une catégorie. */
  coupDeCoeur?: string;
  /* Le rapport de la tuile. Par défaut celui de la référence. */
  ratio?: string;
  /* Le décalage d'apparition, en millisecondes. Il se compte par colonne
   * et non par rang : une rangée cascade de gauche à droite, mais les
   * rangées ne s'additionnent pas. Sur quarante tuiles, un décalage par
   * rang aurait fait attendre près de trois secondes à la dernière. */
  retard?: number;
};

export default function Tuile({
  href,
  appelle,
  media,
  dossier,
  alt,
  nom,
  note,
  sizes,
  priorite = false,
  position,
  repere,
  coupDeCoeur,
  ratio,
  retard,
}: Props) {
  const dedans = (
    <>
      <Photo
        media={media}
        dossier={dossier}
        alt={alt}
        sizes={sizes}
        priorite={priorite}
        position={position}
      />
      <span className="voile-lecture" aria-hidden="true" />
      {repere && (
        <span className="mention absolute left-[clamp(1rem,1.7vw,1.5rem)] top-[clamp(1rem,1.7vw,1.5rem)] text-sur-image/80">
          {repere}
        </span>
      )}
      <span className="dans-image">
        <span className="nom-image">{nom}</span>
        {/* Les tuiles de robes ne portent que le nom : la description se lit
          * sur la fiche. Seules les tuiles de catégorie gardent leur ligne,
          * qui tient en trois mots. */}
        {note && <span className="note-image mt-2">{note}</span>}
      </span>
    </>
  );

  const habits = {
    className: "tuile group block",
    style: ratio ? { aspectRatio: ratio } : undefined,
    "data-rideau": true,
    ...(retard ? { "data-retard": retard } : {}),
  } as const;

  const tuile =
    appelle !== undefined ? (
      <AppelElise maison={appelle ?? undefined} {...habits}>
        {dedans}
      </AppelElise>
    ) : (
      <Link href={href} {...habits}>
        {dedans}
      </Link>
    );

  if (!coupDeCoeur) return tuile;

  /*
   * Le cœur ne peut pas vivre dans la tuile : celle-ci est un lien
   * entier, et un bouton dans un lien n'est pas un balisage valide — ni
   * pour un lecteur d'écran, ni pour le clavier. Il est donc posé à
   * côté, dans une enveloppe qui épouse la tuile, et superposé.
   *
   * L'enveloppe devient l'élément de la trame ; la tuile garde son
   * rapport de côtés et lui donne sa hauteur.
   */
  return (
    <div className="relative">
      {tuile}
      <CoeurTuile slug={coupDeCoeur} nom={nom} />
    </div>
  );
}
