import Link from "@/components/Lien";
import RailFleches from "@/components/accueil/RailFleches";
import Photo from "@/components/media/Photo";
import { ROBES } from "@/lib/madamoon";
import { couverture } from "@/lib/couverture";
import { altRobe } from "@/lib/alt";
import { robeLigne } from "@/lib/contenu";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * La rangée de robes de l'accueil.
 *
 * Six modèles entre la présentation de la maison et les morphologies :
 * on voit des robes avant d'entendre parler de silhouettes.
 *
 * Les six sont choisis par la maison, et dans son ordre. Le choix
 * précédent était fait sur les fonds — teinte et clarté mesurées, du
 * plus sourd au plus clair, pour que la rangée fasse une seule image.
 * Celui-ci est fait sur les robes, ce qui est le bon critère : on ne
 * vend pas un fond. Les six fonds ne s'enchaînent donc plus, et il
 * faudrait six photographies prises le même jour pour qu'ils le
 * fassent de nouveau.
 *
 * Deux Clover y figurent, de deux maisons : « clover-perles » est celle
 * de Watters Designs, « clover » celle de Casablanca Bridal. Les noms
 * se ressemblent, les robes non.
 *
 * Toutes sont vues de face, à la demande de la maison. Ce n'est pas
 * réglé ici mais sur la robe, par sa couverture : la vue de face vaut
 * pour le catalogue et pour sa fiche autant que pour cette rangée.
 */

/* Les six, dans l'ordre donné par la maison. */
const SELECTION = ["clover-perles", "amaryllis", "hayes", "clover", "charlize", "sheridan"];

export default function Robes({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue).robesAccueil;
  const choisies = SELECTION.map((slug) => ROBES.find((r) => r.slug === slug)).filter(
    (r): r is (typeof ROBES)[number] => Boolean(r),
  );

  return (
    <section
      aria-labelledby="robes-accueil"
      className="relative z-10 bg-blanc pt-[clamp(3rem,8vw,7rem)]"
    >
      <div className="gouttiere flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
        <div>
          <p className="legende">{L.legende}</p>
          <span data-ligne className="mt-4 block">
            <h2 id="robes-accueil" className="phrase">
              {L.titre}
            </h2>
          </span>
        </div>
        {/* Le bouton de la rubrique. Il portait l'angle rond, seul de
          * tout le site ; il prend celui des boutons, et le rouge de la
          * maison au survol — la maison l'a demandé.
          *
          * Ses couleurs sont dans la feuille de style, sous
          * « .bouton-rubrique » : « .legende » porte la sienne hors
          * calque, et un utilitaire ne la déloge pas. */}
        <Link
          href="/robes"
          className="legende bouton-rubrique inline-flex shrink-0 items-center rounded-[4px] border px-[clamp(1rem,1.6vw,1.375rem)] py-[0.7rem]"
        >
          {L.voirTout}
        </Link>
      </div>

      {/* La rangée. Six colonnes au large, d'un bord à l'autre de la
        * fenêtre : la gouttière est rendue aux photographies, comme le
        * fait déjà le premier écran. Sous le seuil elle défile au doigt,
        * les photographies gardant leur taille plutôt que de se réduire
        * à six vignettes illisibles.
        *
        * Les deux flèches n'y sont que sous le seuil, à la demande de la
        * maison : au-delà, la rangée n'est plus un rail mais une grille
        * de six colonnes, et il n'y a plus rien à pousser. C'est
        * l'inverse du rail des maisons, qui défile à toutes les
        * largeurs et garde donc ses flèches partout. */}
      <div className="relative">
        <RailFleches
          cible="rail-robes"
          quoi="robes"
          cotes
          enPlus="fleche-rail-robes lg:hidden"
        />
      <ul
        id="rail-robes"
        aria-label={L.rangee}
        /* La gouttière est écrite en utilitaire et non par « .gouttiere » :
          * cette classe n'est pas calquée et l'emporterait sur le
          * « lg:px-0 » qui rend le bord aux photographies. */
        /* « scroll-pl » aligne les crans d'accrochage sur le bord de la
          * gouttière, et non sur le bord du rail. Sans lui, le premier
          * cran tombait à dix-huit pixels : le rail ne revenait jamais à
          * zéro, et la flèche gauche ne s'éteignait donc jamais au
          * début. Le rail des maisons le posait déjà. */
        className="mt-[clamp(2rem,4vw,3.5rem)] flex snap-x snap-mandatory scroll-pl-[var(--gouttiere)] gap-[clamp(0.375rem,0.6vw,0.5rem)] overflow-x-auto px-[var(--gouttiere)] pb-1 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0"
        data-suite
      >
        {choisies.map((robe, i) => {
          const media = couverture(robe);
          if (!media) return null;
          return (
            <li key={robe.slug} className="w-[58vw] shrink-0 snap-start sm:w-[38vw] lg:w-auto">
              <Link href={`/robes/${robe.slug}`} className="group block">
                {/* Trois cinquièmes : plus haut que le rapport de la
                  * source, donc la robe se donne en pied et la rangée
                  * gagne un cinquième de hauteur sans prendre un pixel de
                  * large. Le recadrage part du centre. */}
                <div className="relative aspect-[3/5] overflow-hidden bg-craie">
                  <Photo
                    media={media}
                    dossier="robes"
                    alt={altRobe(robe, langue)}
                    sizes="(max-width: 640px) 58vw, (max-width: 1024px) 38vw, 17vw"
                    priorite={i < 3}
                    className="h-full w-full object-cover"
                  />
                  {/* Le bouton au cœur de la photographie. Il ne paraît
                    * qu'au survol, et seulement là où il y a un survol :
                    * sous le pouce, la photographie entière est le lien. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 hidden place-items-center opacity-0 transition-opacity duration-500 lg:grid lg:group-focus-visible:opacity-100 lg:group-hover:opacity-100"
                  >
                    <span
                      className="legende inline-flex items-center gap-2 rounded-full bg-encre px-4 py-2.5"
                      style={{ color: "var(--color-blanc)" }}
                    >
                      <span className="block h-1.5 w-1.5 rounded-full bg-current" />
                      {L.voirPlus}
                    </span>
                  </span>
                </div>

                {/* La fiche, sous la photographie. Elle est gardée dans sa
                  * place : la rangée ne bouge pas quand elle paraît. Sous
                  * le seuil elle se lit toujours — il n'y a pas de survol
                  * sous le pouce. */}
                <span className="mt-3 block px-[clamp(0.375rem,0.6vw,0.5rem)] lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-focus-visible:opacity-100 lg:group-hover:opacity-100">
                  <span className="nom-carte block">{robe.nom}</span>
                  <span className="texte mt-1 block text-[0.75rem] leading-[1.35]">
                    {robeLigne(robe, langue)}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      </div>
    </section>
  );
}
