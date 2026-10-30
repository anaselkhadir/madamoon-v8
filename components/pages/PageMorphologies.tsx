import Link from "@/components/Lien";
import AppelElise from "@/components/AppelElise";
import TitreSection from "@/components/TitreSection";
import { MORPHOLOGIES } from "@/lib/madamoon";
import { coupeNom, morphoNom, morphoSilhouette } from "@/lib/contenu";
import { t } from "@/lib/textes";
import type { Langue } from "@/lib/langue";
import FilDAriane from "@/components/FilDAriane";

/*
 * Les six morphologies.
 *
 * Pas de photographies ici, et c'est délibéré : illustrer une morphologie
 * revient à désigner un corps comme le bon exemple d'une catégorie. On
 * s'en tient donc aux mots — la lettre, ce qu'elle décrit, ce que l'on
 * conseille — et les robes attendent sur la page de chacune.
 */

export default function PageMorphologies({ langue }: { langue: Langue }) {
  const L = t(langue).pages.morphologies;
  return (
    <div className="pt-[var(--entete)]">
      <FilDAriane
        langue={langue}
        rangs={[{ nom: t(langue).barre.morphologies, adresse: "/morphologies" }]}
      />
      <TitreSection
        niveau={1}
        titre={L.titre}
        lien={{ href: "/coupes", label: L.toutesLesCoupes }}
      />
      <div className="gouttiere">
        <p className="texte mesure-l pb-10">{L.intro}</p>

        <ul className="border-t border-fil">
          {MORPHOLOGIES.map((m) => (
            <li key={m.lettre}>
              <Link
                href={`/morphologies/${m.lettre.toLowerCase()}`}
                className="group grid gap-x-8 gap-y-2 border-b border-fil py-6 md:grid-cols-[5rem_1fr_auto] md:items-baseline"
              >
                <span className="affiche text-[2.5rem] leading-none text-action">{m.lettre}</span>
                <span>
                  <span className="phrase block text-encre transition-colors duration-500 group-hover:text-action">
                    {morphoNom(m, langue)}
                  </span>
                  <span className="texte mt-1 block">{morphoSilhouette(m, langue)}</span>
                </span>
                <span className="legende">
                  {m.premieres.map((c) => coupeNom(c, langue)).join(", ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="pb-[clamp(3rem,5vw,5rem)] pt-10">
          <p className="texte mesure pb-6">{L.guide}</p>
          <AppelElise className="bouton">{t(langue).hero.trouverMaRobe}</AppelElise>
        </div>
      </div>
    </div>
  );
}
