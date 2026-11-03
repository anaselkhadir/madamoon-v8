import Link from "@/components/Lien";
import Film from "@/components/media/Film";
import { SCENES } from "@/lib/medias";
import { altScene } from "@/lib/alt";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { MAISON } from "@/lib/madamoon";

/*
 * Le showroom.
 *
 * Le passage de l'écran au réel. Après les paroles des mariées, une
 * porte — celle du 234, rue du Faubourg Saint-Martin — sur toute la
 * largeur, et trois lignes.
 *
 * L'adresse et les horaires ne sont plus ici : ils sont dans le pied de
 * page, et sur la page du showroom. Les répéter en tête d'une image
 * pleine page en ferait un encadré de renseignements, ce qui est
 * exactement le contraire de l'effet recherché.
 *
 * À la demande de la maison, la photographie a laissé place au film du
 * showroom, en noir et blanc : dix secondes en boucle, sans son. Son
 * affiche — la première image — tient la place tant que le film n'est
 * pas là ; au doigt, une version 720p plus légère (Film.tsx).
 *
 * Les bandes noires du premier plan (le film est cadré en 2,35 pendant
 * ses deux premières secondes) ont été retirées à la source : ce plan a
 * été agrandi pour remplir l'image.
 *
 * Le film se rapproche très lentement, quarante secondes pour six pour
 * cent. Par-dessus, un voile tient le texte lisible.
 *
 * Il est présenté en carte, à la demande de la maison : posé dans la
 * gouttière, sur le blanc de la page, à l'angle de 4 px. Le texte et le
 * bouton sont au centre de la carte. Sur ordinateur, la carte tient en
 * deux tiers d'écran (la maison la trouvait trop haute) ; au doigt, elle
 * garde la hauteur d'un écran.
 */

export default function Showroom({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  return (
    <section
      aria-labelledby="showroom"
      className="gouttiere bg-blanc pb-[clamp(1.5rem,3vw,3rem)] pt-[clamp(1rem,1.9vw,1.75rem)]"
    >
      {/* « isolate » : sans lui, Safari laisse le film qui respire
       * déborder des coins arrondis. */}
      <div className="relative isolate h-[88svh] min-h-[32rem] lg:h-[67svh] lg:min-h-[26rem] overflow-hidden rounded-[4px]">
        <div className="absolute inset-0 respire">
          <Film
            src="/film/showroom.mp4"
            srcMobile="/film/showroom-mobile.mp4"
            affiche={SCENES["showroom-film"]}
            alt={altScene(L.showroom.alt, langue)}
            className="h-full w-full"
          />
        </div>

        {/*
         * Plus de verre sombre : il calmait les couleurs saturées de la
         * photographie (point 132). Le film est en noir et blanc, et déjà
         * sombre ; le verre l'aurait éteint. Le dégradé reste : il tient
         * le texte lisible — un peu plus soutenu qu'avec le verre : les
         * plans de dentelle du film sont très clairs. Le texte est au
         * centre : le voile s'appuie au centre aussi.
         */}
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 75% at 50% 52%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.16) 100%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-[clamp(1.25rem,4vw,4rem)] text-center">
          {/* La couleur en style : « .legende » l'emporte sur l'utilitaire,
            * et la légende restait brun-gris sur le film. */}
          <p
            className="legende"
            style={{ color: "color-mix(in srgb, var(--color-sur-image) 78%, transparent)" }}
          >
            {L.showroom.legende}
            <sup>e</sup>
          </p>
          <span data-ligne className="mt-4 block">
            <h2 id="showroom" className="affiche mx-auto max-w-[18ch] text-sur-image">
              {L.showroom.titre}
            </h2>
          </span>
          <p className="accroche mesure-l mx-auto mt-5 text-sur-image">
            {L.showroom.texte}
          </p>
          <Link href="/showroom" className="bouton-clair mt-7">
            {L.showroom.lien}
          </Link>
        </div>
      </div>

      {/* Sous la carte, en français seulement : ce que l'on cherche
        * quand on cherche une boutique à Paris, et ce que la maison y
        * répond. Le paragraphe vient de l'ancien édito de l'accueil,
        * réparti à la demande de la maison dans les sections qui en
        * parlent ; il est repris au mot près. */}
      {langue === "fr" && (
        <div className="grid gap-x-[clamp(2rem,6vw,6rem)] gap-y-4 pt-[clamp(2rem,4vw,3.5rem)] md:grid-cols-12">
          <h3 className="legende md:col-span-4">Choisir sa robe de mariée à Paris</h3>
          <p className="texte md:col-span-8">
            Chercher une boutique de robe de mariée à Paris — un magasin de robes de mariée, un showroom, les mots changent et le besoin reste — commence rarement par une robe. Cela commence par une heure : celle où le showroom MADAMOON, {MAISON.adresse}, dans le 10ᵉ arrondissement, est privatisé pour vous. On n'y essaie pas tout ; on y essaie ce qu'il faut, en partant de la coupe qui vous ressemble, puis de la maison qui la fait le mieux. Où acheter sa robe de mariée, où l'essayer « autour de moi » quand on cherche à Paris : ici, et nulle part ailleurs en France. Pas de liste de magasins, pas de robe pas cher : une adresse, et une heure pour vous. Meilleure boutique de robe de mariée à Paris, la mieux notée, dans quel quartier ? Lisez les avis de la maison et venez voir : en Île-de-France comme à Paris, un seul showroom, dans le 10ᵉ, sur rdv, et aucune location de robe.
          </p>
        </div>
      )}
    </section>
  );
}
