import Link from "@/components/Lien";
import TitreSection from "@/components/TitreSection";
import Photo from "@/components/media/Photo";
import { SCENES } from "@/lib/medias";
import { altScene } from "@/lib/alt";
import { maison, signatures } from "@/lib/contenu";
import { t } from "@/lib/textes";
import type { Langue } from "@/lib/langue";
import FilDAriane from "@/components/FilDAriane";

/*
 * Le showroom.
 *
 * Une image plein cadre, puis trois photographies de la maison et le peu
 * qu'il faut savoir avant de venir. Le même langage que partout ailleurs.
 */

/*
 * Les trois vignettes de la visite.
 *
 * La maison a demandé que toutes les images présentées comme le
 * showroom soient la photographie qu'elle a envoyée. Les trois
 * montraient autre chose — un détail de dentelle, une robe en studio,
 * et une mariée sous des palmiers devant un mur en pierre sèche, sur
 * une page qui parle d'une boutique du dixième arrondissement.
 *
 * C'est donc la même photographie trois fois, mais pas le même cadrage.
 * La tuile est un portrait de 447 sur 621 et la photographie un paysage
 * de quatre tiers : chaque tranche n'en montre qu'un gros tiers. À
 * gauche le piano et les vitraux, au milieu les fauteuils, à droite le
 * portant. Trois cadrages identiques se seraient lus comme une panne
 * d'affichage.
 */
const CADRAGES = ["12% 50%", "50% 52%", "88% 50%"] as const;

export default function PageShowroom({ langue }: { langue: Langue }) {
  const L = t(langue).pages.showroom;
  const M = maison(langue);

  return (
    <>
      <FilDAriane
        langue={langue}
        rangs={[{ nom: t(langue).barre.showroom, adresse: "/showroom" }]}
      />
      <section className="relative h-[80svh] min-h-[28rem] overflow-hidden">
        <Photo
          media={SCENES["showroom"]}
          dossier="scenes"
          alt={altScene(L.altScene, langue)}
          sizes="100vw"
          priorite
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(95deg, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.16) 46%, rgba(0,0,0,0) 76%)",
          }}
        />
        <div className="gouttiere absolute inset-0 flex flex-col justify-center">
          <div className="max-w-[52vw] max-md:max-w-[92%]">
            <h1 className="affiche text-sur-image">{L.titre}</h1>
            <p className="accroche mt-6 text-sur-image">
              {L.accroche}
              <sup>e</sup>
              {L.surRendezVous}
            </p>
            <Link href="/rendez-vous" className="bouton-clair mt-6">
              {L.prendreRendezvous}
            </Link>
          </div>
        </div>
      </section>

      <TitreSection titre={L.laVisite} />
      <div className="gouttiere">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-[1fr_1fr]">
          <p className="phrase mesure-l">{L.uneHeure}</p>
          <ul className="flex flex-col gap-4 self-center">
            {signatures(langue).map((s) => (
              <li key={s.titre} className="flex gap-4">
                <span aria-hidden="true" className="mt-[0.6rem] h-px w-6 shrink-0 bg-fil" />
                <span>
                  <span className="legende block text-encre">{s.titre}</span>
                  <span className="texte">{s.texte}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="gouttiere pt-[clamp(2rem,3.5vw,3.5rem)]">
        <div className="trame-tuiles md:grid-cols-3">
          {CADRAGES.map((position, i) => (
            <div key={position} className="tuile" data-voile data-retard={i * 110}>
              <Photo
                media={SCENES["showroom"]}
                dossier="scenes"
                alt={altScene(L.altDetails[i], langue)}
                sizes="(max-width: 768px) 100vw, 31vw"
                position={position}
              />
            </div>
          ))}
        </div>
      </div>

      <section className="gouttiere mt-[clamp(3rem,5.5vw,5rem)] bg-craie py-[clamp(3.5rem,7vw,7rem)]">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="legende">{L.venir}</h2>
            <p className="phrase mt-4">
              {M.adresse}
              <br />
              {M.codePostal} {M.ville}
            </p>
            <p className="texte mt-4">
              {M.horaires.map((h) => (
                <span key={h.jour} className="block">
                  {h.jour} — {h.heures}
                </span>
              ))}
              <span className="block text-plomb">{M.mentionHoraires}</span>
            </p>
          </div>
          <Link href="/rendez-vous" className="bouton">
            {L.prendreRendezvous}
          </Link>
        </div>
      </section>
    </>
  );
}
