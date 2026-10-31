import Link from "@/components/Lien";
import TitreSection from "@/components/TitreSection";
import { MAISON, ROBES } from "@/lib/madamoon";
import { PAGES_FAMILLES, adresseFamille } from "@/lib/familles";

/*
 * L'édito de l'accueil : « Choisir sa robe de mariée à Paris ».
 *
 * Trois paragraphes dans la voix de la maison, qui disent ce qu'une
 * mariée cherche — une boutique de robes de mariée à Paris, un essayage
 * privé, les coupes, les styles, les matières, le prix — et qui mènent
 * aux pages qui en parlent. Même intitulé, même mesure, mêmes liens que
 * le reste du site ; rien d'ajouté au dessin. Français seulement.
 */
export default function Edito() {
  return (
    <section aria-labelledby="edito" className="relative z-10 bg-blanc">
      <TitreSection id="edito" niveau={2} titre="Choisir sa robe de mariée à Paris" />
      <div className="gouttiere grid gap-x-[clamp(2rem,6vw,6rem)] gap-y-8 pb-[clamp(3rem,6vw,5.5rem)] md:grid-cols-12">
        <div className="texte md:col-span-7">
          <p>
            Chercher une boutique de robes de mariée à Paris commence rarement par une robe. Cela commence par une heure : celle où le showroom MADAMOON, {MAISON.adresse}, dans le 10ᵉ arrondissement, est privatisé pour vous. On n'y essaie pas tout ; on y essaie ce qu'il faut, en partant de la coupe qui vous ressemble, puis de la maison qui la fait le mieux.
          </p>
          <p className="mt-5">
            MADAMOON est une boutique, pas une maison de couture : ses {ROBES.length} robes de mariée viennent de plusieurs créateurs choisis un à un — Watters Designs, Casablanca Bridal, Olya Mak, Monica Loretti — et de quelques ateliers indépendants. Chaque robe choisie est ensuite confectionnée à vos mesures, à partir de {MAISON.prixDepart}, retouches comprises.
          </p>
          <p className="mt-5">
            Une <Link href="/coupes/sirene" className="souligne">robe de mariée sirène</Link> dessine la taille et les hanches ; une <Link href="/coupes/princesse" className="souligne">princesse</Link> assume le volume ; une <Link href="/coupes/fluide" className="souligne">robe fluide</Link> suit le mouvement ; un <Link href="/coupes/trapeze" className="souligne">trapèze</Link> s'ouvre en A ; une <Link href="/coupes/deux-en-un" className="souligne">deux-en-un</Link> change d'allure entre la cérémonie et la soirée. Avant le goût, la <Link href="/morphologies" className="souligne">morphologie</Link> décide souvent : c'est par elle que l'on vous conseille.
          </p>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p className="legende">Par style, matière ou détail</p>
          <ul className="mt-3 border-t border-fil">
            {PAGES_FAMILLES.map((p) => (
              <li key={p.slug} className="border-b border-fil">
                <Link href={adresseFamille(p)} className="texte flex items-baseline justify-between gap-4 py-3 transition-colors duration-300 hover:text-action">
                  <span>{p.titre.replace(" à Paris", "")}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
            <li className="border-b border-fil">
              <Link href="/guides/prix-robe-de-mariee-paris" className="texte flex items-baseline justify-between gap-4 py-3 transition-colors duration-300 hover:text-action">
                <span>Prix d'une robe de mariée à Paris</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
