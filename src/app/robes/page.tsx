import type { Metadata } from "next";
import Link from "next/link";
import Entete from "@/components/layout/Entete";
import FilDAriane from "@/components/layout/FilDAriane";
import Rendezvous from "@/components/layout/Rendezvous";
import Ligne from "@/components/motion/Ligne";
import Tuile from "@/components/robe/Tuile";
import { ROBES, CATEGORIES, FAMILLES, MAISON } from "@/content/madamoon";
import { coupe } from "@/content/coupes";

/*
 * Toutes les robes, rangées par coupe. Le texte éditorial de cette page est
 * écrit en phase 6 ; la structure et le maillage sont déjà en place.
 */
export const metadata: Metadata = {
  title: "Toutes les robes de mariée à essayer à Paris",
  description: `Les ${ROBES.length} robes de mariée du showroom MADAMOON, Paris 10e, par coupe : sirène, princesse, fluide, trapèze, deux-en-un. Essayage privé sur rendez-vous.`,
  alternates: { canonical: "/robes/" },
  openGraph: { url: "/robes/" },
};

export default function Robes() {
  return (
    <>
      <Entete />
      <main className="pt-entete">
        <div className="cadre pt-8"><FilDAriane rangs={[{ nom: "Robes", adresse: "/robes/" }]} /></div>
        <section className="cadre grille pt-10 pb-section-courte">
          <div className="md:col-span-8">
            <Ligne as="h1" immediat className="titre-1">Toutes les robes de mariée, <em>par coupe</em></Ligne>
          </div>
          <p className="texte text-graphite md:col-span-4 md:col-start-9 md:pt-4">
            {ROBES.length} modèles de plusieurs maisons, à essayer au showroom du {MAISON.adresse}, Paris 10ᵉ. Chaque robe choisie est ensuite confectionnée à vos mesures, à partir de {MAISON.prixDepart}.
          </p>
          <nav aria-label="Aller à une coupe" className="legende md:col-span-12">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {CATEGORIES.map((c) => (<li key={c}><a href={`#${coupe(c).ancre}`} className="lien">{c}</a></li>))}
            </ul>
          </nav>
        </section>
        {CATEGORIES.map((c, i) => {
          const robes = ROBES.filter((r) => r.categorie === c);
          if (!robes.length) return null;
          const k = coupe(c);
          return (
            <section key={c} id={k.ancre} className={`${i % 2 ? "bg-ivoire" : ""}`} aria-labelledby={`coupe-${k.ancre}`}>
              <div className="cadre section-courte">
                <div className="grille items-end">
                  <div className="md:col-span-6">
                    <p className="numero mb-3">{String(i + 1).padStart(2, "0")}</p>
                    <h2 id={`coupe-${k.ancre}`} className="titre-2">{c}</h2>
                    <p className="phrase mt-3 text-graphite">{FAMILLES[c]}</p>
                  </div>
                  <p className="md:col-span-4 md:col-start-9 md:justify-self-end"><Link href={`/coupes/${k.ancre}/`} className="lien text-[0.875rem]">La coupe {c.toLowerCase()} en détail</Link></p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-x-gouttiere gap-y-10 md:grid-cols-4">
                  {robes.map((r, j) => (<div key={r.slug} className={j % 4 === 1 || j % 4 === 3 ? "md:pt-12" : ""}><Tuile robe={r} sizes="(min-width: 768px) 22vw, 45vw" /></div>))}
                </div>
              </div>
            </section>
          );
        })}
        <Rendezvous />
      </main>
    </>
  );
}
