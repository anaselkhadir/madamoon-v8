import Link from "next/link";
import Fondu from "@/components/motion/Fondu";
import Rideau from "@/components/motion/Rideau";
import Photo from "@/components/media/Photo";
import { SCENES } from "@/content/medias";
import { MAISON, ROBES, CREATEURS } from "@/content/madamoon";
import { altScene } from "@/lib/alt";

/* 09 — L'édito : le texte de la page d'accueil, composé comme une page de magazine. */
export default function Edito() {
  const maisons = CREATEURS.filter((c) => c.slug !== "autres-createurs");
  return (
    <section aria-labelledby="edito" className="bg-ivoire">
      <div className="cadre section grille">
        <div className="md:col-span-7">
          <p className="numero mb-3">08</p>
          <h2 id="edito" className="titre-2 max-w-[18ch]">Choisir sa robe de mariée à Paris</h2>
          <Fondu className="texte mt-10 md:columns-2 md:gap-gouttiere [&>p]:break-inside-avoid">
            <p>Chercher une robe de mariée à Paris commence rarement par une robe. Cela commence par une heure : celle où le showroom du {MAISON.adresse}, dans le 10ᵉ, est fermé pour vous. On n'y essaie pas tout. On y essaie ce qu'il faut, en commençant par la coupe qui vous ressemble, puis par la maison qui la fait le mieux.</p>
            <p>MADAMOON est une boutique de robes de mariée, pas une maison de couture : les {ROBES.length} modèles viennent de {maisons.length} créateurs choisis un à un, {maisons.map((m) => m.nom).join(", ")}, et de quelques ateliers indépendants. Chaque robe choisie est ensuite confectionnée à vos mesures, à partir de {MAISON.prixDepart}, retouches comprises.</p>
            <p>Une <Link href="/coupes/sirene/" className="lien">robe sirène</Link> dessine la taille et les hanches ; une <Link href="/coupes/princesse/" className="lien">princesse</Link> assume le volume ; une <Link href="/coupes/fluide/" className="lien">robe fluide</Link> suit le mouvement ; un <Link href="/coupes/trapeze/" className="lien">trapèze</Link> s'ouvre en A, la coupe la plus universelle ; une <Link href="/coupes/deux-en-un/" className="lien">deux-en-un</Link> change d'allure entre la cérémonie et la soirée. Avant le goût, la <Link href="/morphologies/" className="lien">morphologie</Link> décide souvent : c'est par elle que l'on vous conseille.</p>
            <p>Le premier rendez-vous se prend idéalement huit à neuf mois avant le mariage. Avec moins de temps, dites-le : on trouve presque toujours une solution. Les délais, le déroulé d'un essayage et les prix sont expliqués sans détour dans nos <Link href="/faq/" className="lien">questions fréquentes</Link>.</p>
          </Fondu>
          <p className="phrase mt-12 max-w-[26ch] italic">« On n'essaie pas tout. On essaie ce qu'il faut. »</p>
        </div>
        <div className="md:col-span-4 md:col-start-9 md:pt-24">
          <Rideau className="aspect-detail">
            <Photo media={SCENES["dos-uma"]} dossier="scenes" alt={altScene("Le dos en dentelle de la robe Uma, Watters Designs")} sizes="(min-width: 768px) 30vw, 90vw" className="h-full w-full object-cover" />
          </Rideau>
          <p className="mention mt-3">Uma — Watters Designs</p>
        </div>
      </div>
    </section>
  );
}
