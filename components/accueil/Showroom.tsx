import Link from "@/components/Lien";
import Photo from "@/components/media/Photo";
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
 * L'image se rapproche très lentement, quarante secondes pour six pour
 * cent. On ne le voit pas ; on sent seulement que l'image n'est pas
 * morte. Par-dessus, un verre sombre la calme (voir plus bas), et un
 * dégradé tient le texte lisible dans son coin.
 */

export default function Showroom({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  return (
    <section
      aria-labelledby="showroom"
      className="relative h-[92svh] min-h-[32rem] overflow-hidden"
    >
      <div className="absolute inset-0 respire">
        <Photo
          media={SCENES["showroom"]}
          dossier="scenes"
          alt={altScene(L.showroom.alt, langue)}
          sizes="100vw"
          position="50% 42%"
          className="h-full w-full object-cover"
        />
      </div>

      {/*
        * Le verre sombre, posé sur toute la photographie.
        *
        * Point 132 de la maison : la photo du showroom, très saturée —
        * velours bleu électrique, vitraux, dorures —, criait plus fort que
        * le reste de la page. Le verre la calme sans l'effacer : des
        * couleurs adoucies — le bleu du velours surtout —, une luminosité
        * un peu baissée, une teinte d'encre légère.
        *
        * Aucun flou : la maison veut voir le showroom net, seulement plus
        * doux. Et ce verre ne vit que dans ce bloc « Poussez la porte » —
        * l'accueil, et le bas des pages coupe et morphologie qui le
        * reprennent. La page du showroom garde ses photos telles quelles.
        *
        * L'encre est « sous-image », la seule qui ne s'inverse pas : en
        * thème sombre, « encre » devient clair, et le verre deviendrait
        * un voile laiteux sur la photographie.
        *
        * Là où le navigateur ignore les filtres d'arrière-plan, la teinte
        * seule assombrit déjà : la photo reste adoucie.
        */}
      <span
        aria-hidden="true"
        className="absolute inset-0 backdrop-saturate-[.8] backdrop-brightness-[.8]"
        style={{ background: "color-mix(in srgb, var(--color-sous-image) 30%, transparent)" }}
      />
      {/* Le dégradé reste, plus léger : le verre assombrit déjà, il ne
        * fait plus que tenir le texte lisible dans son coin. */}
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
