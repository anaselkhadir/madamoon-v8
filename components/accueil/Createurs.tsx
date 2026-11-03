import { AUTRES_CREATEURS, CREATEURS, MAISON, ROBES } from "@/lib/madamoon";
import { SCENES, vues } from "@/lib/medias";
import { altRobe } from "@/lib/alt";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { createurNote, createurOrigine } from "@/lib/contenu";
import { FILMS } from "@/lib/films";
import CarteMaisons, { type MaisonCarte } from "@/components/accueil/CarteMaisons";

/*
 * Les créateurs.
 *
 * Le texte à gauche, la carte rouge des maisons à droite : une pastille
 * par maison, qui s'ouvre sur sa fiche et passe l'image à son film
 * (CarteMaisons.tsx).
 *
 * La bande de photographies des maisons qui suivait a été retirée à la
 * demande de la maison le 3 novembre 2026 : la carte la remplace, et ses
 * liens « Voir la maison » mènent aux mêmes pages.
 *
 * Pas de respiration en bas, et c'est voulu : la section des avis, qui
 * suit, ouvre sur la sienne, et les deux ensemble doubleraient le blanc
 * de toutes les autres jonctions de l'accueil.
 */

export default function Createurs({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  /* La carte rouge : une pastille par maison, son film quand la maison
   * en possède un, sinon la photographie d'ouverture de sa page. */
  const carte: MaisonCarte[] = CREATEURS.flatMap((c) => {
    const robe = ROBES.find((r) => r.slug === c.ouverture.robe);
    if (!robe) return [];
    const film = FILMS[robe.slug];
    const photo = vues(robe.slug)[c.ouverture.vue - 1];
    const plan: MaisonCarte["plan"] | null = film
      ? { type: "film", src: film.src, affiche: SCENES[film.affiche] }
      : photo
        ? { type: "photo", media: photo }
        : null;
    if (!plan) return [];
    return [
      {
        slug: c.slug,
        nom: c.nom === AUTRES_CREATEURS ? L.createurs.autres : c.nom,
        origine: createurOrigine(c, langue),
        note: createurNote(c, langue),
        plan,
        alt: altRobe(robe, langue),
      },
    ];
  });
  /* Le film d'ouverture, tout fermé : l'escalier, celui d'Addison. */
  const ouvertureCarte = (() => {
    const robe = ROBES.find((r) => r.slug === "addison");
    const film = FILMS.addison;
    return robe && film ? { src: film.src, affiche: SCENES[film.affiche], alt: altRobe(robe, langue) } : null;
  })();

  if (!ouvertureCarte || carte.length === 0) return null;

  return (
    <section
      aria-labelledby="createurs"
      className="bg-blanc pt-[clamp(4rem,8vw,8rem)]"
    >
      <div className="gouttiere grid gap-x-[clamp(2rem,4vw,4rem)] gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
        <p className="legende">{L.createurs.legende}</p>
        <span data-ligne className="mt-4 block">
          <h2 id="createurs" className="phrase">
            {L.createurs.titre}
          </h2>
        </span>
        <p className="texte mesure-l mt-4">{L.createurs.lieux}</p>
        {/* Le texte de la maison, envoyé le 3 novembre 2026 : d'où
          * viennent les robes, la confection à vos mesures, le prix de
          * départ. Français seulement. */}
        {langue === "fr" && (
          <div className="texte mesure-l mt-4">
            <p>
              Chez MADAMOON, chaque robe est choisie avec une attention particulière, auprès de créateurs reconnus pour leur élégance et leur savoir-faire. Notre sélection réunit les univers de Watters Designs, Casablanca Bridal, Olya Mak et Monica Loretti, ainsi que quelques ateliers indépendants soigneusement sélectionnés.
            </p>
            <p className="mt-4">
              Parce que chaque future mariée mérite une robe qui lui ressemble, le modèle que vous aurez choisi est confectionné à vos mesures et délicatement ajusté pour épouser votre silhouette.
            </p>
            <p className="mt-4">
              Nos créations sont proposées à partir de <strong className="font-medium text-encre">{MAISON.prixDepart}</strong>, retouches comprises, pour vous offrir une expérience où chaque détail compte.
            </p>
          </div>
        )}
        </div>

        <div className="min-h-[clamp(26rem,38vw,34rem)] lg:col-span-7">
          <CarteMaisons
            maisons={carte}
            ouverture={ouvertureCarte}
            textes={{ legende: L.createurs.carteLegende, voir: L.createurs.carteVoir, liste: L.createurs.carteListe }}
          />
        </div>
      </div>
    </section>
  );
}
