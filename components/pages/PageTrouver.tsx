import Link from "@/components/Lien";
import AppelElise from "@/components/AppelElise";
import TitreSection from "@/components/TitreSection";
import { maison } from "@/lib/contenu";
import { t } from "@/lib/textes";
import type { Langue } from "@/lib/langue";
import FilDAriane from "@/components/FilDAriane";

/*
 * Trouver ma robe — le carrefour.
 *
 * Cette page montrait les six coupes en tuiles. Depuis que /coupes
 * existe, c'était deux fois la même page à deux adresses : mauvais pour
 * la lecture, et deux pages qui se disputent le même mot chez les
 * moteurs.
 *
 * Elle garde son adresse — des liens pointent dessus — mais change de
 * métier : elle dit les trois portes d'entrée du catalogue, et laisse
 * chacune à sa page.
 */

export default function PageTrouver({ langue }: { langue: Langue }) {
  const L = t(langue).pages.trouver;
  const M = maison(langue);

  const portes = [
    { href: "/coupes", titre: L.parLaCoupe, texte: L.parLaCoupeTexte },
    { href: "/morphologies", titre: L.parLaMorphologie, texte: L.parLaMorphologieTexte },
    {
      href: "/createurs/watters-designs",
      titre: L.parLaMaison,
      texte: L.parLaMaisonTexte,
    },
  ];

  return (
    <div className="pt-[var(--entete)]">
      <FilDAriane
        langue={langue}
        rangs={[{ nom: t(langue).raccourcis.trouverMaRobe, adresse: "/trouver-ma-robe" }]}
      />
      <TitreSection
        niveau={1}
        titre={L.titre}
        lien={{ href: "/robes", label: L.voirToutesLesRobes }}
      />
      <div className="gouttiere">
        <p className="texte mesure-l pb-10">{L.intro}</p>

        <ul className="border-t border-fil">
          {portes.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="group grid gap-x-10 gap-y-2 border-b border-fil py-6 md:grid-cols-[16rem_1fr] md:items-baseline"
              >
                <span className="phrase text-encre transition-colors duration-500 group-hover:text-action">
                  {p.titre}
                </span>
                <span className="texte mesure-l">{p.texte}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="pb-[clamp(3rem,5vw,5rem)] pt-10">
          <p className="texte mesure pb-6">{L.elise(M.adresse)}</p>
          <AppelElise className="bouton">{t(langue).hero.trouverMaRobe}</AppelElise>
        </div>
      </div>
    </div>
  );
}
