import Link from "@/components/Lien";
import Film from "@/components/media/Film";
import { SCENES } from "@/lib/medias";
import { altScene } from "@/lib/alt";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

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
 * cent. Par-dessus, un dégradé tient le texte lisible dans son coin.
 */

export default function Showroom({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  return (
    <section
      aria-labelledby="showroom"
      className="relative h-[92svh] min-h-[32rem] overflow-hidden"
    >
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
        * le texte lisible dans son coin.
        */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(10deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.16) 42%, rgba(0,0,0,0) 76%)",
        }}
      />

      <div className="gouttiere absolute inset-x-0 bottom-0 pb-[clamp(3rem,7vw,6rem)]">
        <p className="legende text-sur-image/70">{L.showroom.legende}<sup>e</sup></p>
        <span data-ligne className="mt-4 block">
          <h2 id="showroom" className="affiche max-w-[18ch] text-sur-image">
            {L.showroom.titre}
          </h2>
        </span>
        <p className="accroche mesure-l mt-5 text-sur-image">{L.showroom.texte}</p>
        <Link href="/showroom" className="bouton-clair mt-7">
          {L.showroom.lien}
        </Link>
      </div>
    </section>
  );
}
