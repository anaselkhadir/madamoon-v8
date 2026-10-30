import { notFound } from "next/navigation";
import HeroPage from "@/components/HeroPage";
import Tuile from "@/components/Tuile";
import TitreSection from "@/components/TitreSection";
import Showroom from "@/components/accueil/Showroom";
import {
  AUTRES_CREATEURS,
  MAISON,
  SITE_URL,
  createurParSlug,
  robesDe,
  coupesDe,
} from "@/lib/madamoon";
import { altCoupe, altRobe } from "@/lib/alt";
import {
  createurNom,
  createurNote,
  createurOrigine,
  robeLigne,
} from "@/lib/contenu";
import { versLangue, type Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { couverture } from "@/lib/couverture";
import FilDAriane from "@/components/FilDAriane";

/*
 * La page d'une maison.
 *
 * Le rythme de l'accueil, au nom d'un créateur : une image plein cadre,
 * puis ses robes. La différence tient en un mot — la page est un filtre :
 * on n'y montre que ses robes.
 *
 * Les sections « Ses coupes » et « À qui ces coupes vont » ont été
 * retirées : la page ne dépend plus que de la liste des robes, et
 * l'arrivée de nouveaux modèles ne demande rien d'autre.
 *
 * Rien n'est complété par le reste du catalogue : une maison qui n'a que
 * deux robes en a deux sur sa page. C'est la seule façon que le filtre
 * veuille dire quelque chose.
 */

export default async function PageMaison({
  params,
  langue,
}: {
  params: Promise<{ maison: string }>;
  langue: Langue;
}) {
  const { maison } = await params;
  const createur = createurParSlug(maison);
  if (!createur) notFound();

  const L = t(langue).pages.maison;
  /* Le nom se traduit désormais : « Autres créateurs » n'est pas un nom
   * propre. Les recherches dans le catalogue gardent le nom d'origine,
   * qui est la clé ; tout ce qui s'affiche prend celui de la langue. */
  const nomMaison = createurNom(createur, langue);
  /* « Trouver ma robe Olya Mak » se dit ; « Trouver ma robe Autres
   * créateurs » non. Le collectif prend l'intitulé nu. */
  const collective = createur.nom === AUTRES_CREATEURS;
  const trouver = collective ? t(langue).raccourcis.trouverMaRobe : L.trouverMaRobeDe(nomMaison);
  const robes = robesDe(createur.nom);
  const coupes = coupesDe(createur.nom);

  const donnees = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    inLanguage: langue === "fr" ? "fr-FR" : "en-GB",
    name: langue === "fr" ? `Robes de mariée ${nomMaison}` : `${nomMaison} wedding dresses`,
    description: createurNote(createur, langue),
    url: `${SITE_URL}${versLangue(`/createurs/${createur.slug}`, langue)}/`,
    about: { "@type": "Brand", name: nomMaison },
    isPartOf: { "@type": "WebSite", name: MAISON.nom, url: SITE_URL },
    hasPart: robes.map((r) => ({
      "@type": "Product",
      name: langue === "fr" ? `Robe de mariée ${r.nom}` : `${r.nom} wedding dress`,
      description: robeLigne(r, langue),
      url: `${SITE_URL}${versLangue(`/robes/${r.slug}`, langue)}/`,
      brand: { "@type": "Brand", name: nomMaison },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <FilDAriane
        langue={langue}
        rangs={[
          { nom: t(langue).ariane.createurs, adresse: "/createurs" },
          { nom: nomMaison, adresse: `/createurs/${createur.slug}` },
        ]}
      />

      <HeroPage
        surtitre={createurOrigine(createur, langue)}
        titre={nomMaison}
        ligne={createurNote(createur, langue)}
        robe={createur.ouverture.robe}
        vue={createur.ouverture.vue}
        alt={altCoupe(coupes[0] ?? "de mariée", langue, { maison: nomMaison })}
        action={trouver}
        maison={createur.nom}
        langue={langue}
        catalogue={{ intitule: nomMaison, contexte: `maison:${createur.slug}` }}
      />

      {/* ————————————————————————————— ses robes ————— */}
      <section aria-labelledby="ses-robes">
        <TitreSection
          id="ses-robes"
          titre={L.lesRobesDe(nomMaison)}
          lien={{ href: "/robes", label: L.voirToutesLesRobes }}
        />
        <div className="gouttiere">
          <div className="trame-tuiles grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {robes.map((robe, i) => {
              const media = couverture(robe);
              if (!media) return null;
              return (
                <Tuile
                  key={robe.slug}
                  retard={(i % 3) * 70}
                  href={`/robes/${robe.slug}`}
                  coupDeCoeur={robe.slug}
                  media={media}
                  dossier="robes"
                  alt={altRobe(robe, langue)}
                  nom={robe.nom}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priorite={i < 3}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* La dernière rangée de tuiles touchait la photographie du
        * showroom : les noms des robes se retrouvaient collés au bord,
        * et la trame semblait coupée. Juste l'air qu'il faut pour que la
        * trame se termine — moins qu'en bas d'une page de coupe, où la
        * page s'arrête vraiment. */}
      <div className="py-[clamp(1rem,1.9vw,1.75rem)]" />

      <Showroom langue={langue} />
    </>
  );
}
