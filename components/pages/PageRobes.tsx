import TitreSection from "@/components/TitreSection";
import Tuile from "@/components/Tuile";
import FileApparition from "@/components/FileApparition";
import { ROBES, SITE_URL } from "@/lib/madamoon";
import { altRobe } from "@/lib/alt";

import type { Langue } from "@/lib/langue";
import { versLangue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { robeLigne } from "@/lib/contenu";
import { couverture } from "@/lib/couverture";
import FilDAriane from "@/components/FilDAriane";
import Link from "@/components/Lien";
import { COUPES } from "@/lib/coupes";
import { adresseFamille, pagesDe, type PageFamille } from "@/lib/familles";

/*
 * Le catalogue.
 *
 * La page de la seconde capture : un intitulé en capitales, puis toutes
 * les robes, en photographies jointives portant leur nom. Sans
 * séparation par coupe : la cliente veut les voir d'un seul regard.
 * Aucune carte, aucun cadre, aucun bouton sous les images.
 *
 * Une seule page pour les deux langues : le français et l'anglais
 * montent le même composant avec une propriété différente. Le jour où
 * la trame change, elle change des deux côtés.
 */

const liste = (langue: Langue) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: t(langue).catalogue.nom,
  url: `${SITE_URL}${versLangue("/robes", langue)}/`,
  hasPart: ROBES.map((r) => ({
    "@type": "Product",
    name: `${t(langue).pied.robeDeMariee} ${r.nom}`,
    description: robeLigne(r, langue),
    url: `${SITE_URL}${versLangue(`/robes/${r.slug}`, langue)}/`,
    brand: r.createur ?? "MADAMOON",
  })),
});

/* Le libellé court d'une page de famille dans une colonne : « Robe de
 * mariée bohème à Paris » y devient « Bohème » — la colonne dit déjà de
 * quoi il s'agit, et le titre entier est sur la page d'arrivée. */
const lienFamille = (p: PageFamille) => {
  const court = p.titre.replace(/^Robe de mariée /, "").replace(/ à Paris$/, "").replace(/^pour un /, "");
  return { href: adresseFamille(p), label: court.charAt(0).toUpperCase() + court.slice(1) };
};

export default function PageRobes({ langue }: { langue: Langue }) {
  const L = t(langue);
  const LISTE = liste(langue);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LISTE) }}
      />
      <FilDAriane langue={langue} rangs={[{ nom: t(langue).barre.robes, adresse: "/robes" }]} />

      {/* L'en-tête de page : sous la barre, à la gouttière, rien d'autre. */}
      <div className="pt-[var(--entete)]">
        <TitreSection
          niveau={1}
          titre={L.catalogue.titre}
          lien={{ href: "/rendez-vous", label: L.raccourcis.prendreRendezvous }}
        />
      </div>

      {/* Toutes les robes, d'un seul tenant. Le classement par coupe a sa
        * rubrique propre — les pages de coupe et l'onglet du menu — : ici,
        * on parcourt le catalogue sans rien avoir à choisir. */}
      <div className="gouttiere">
        {/* Sur ordinateur, les tuiles paraissent en file et prennent
          * l'angle de la maison (FileApparition, « .grille-file »). */}
        <FileApparition className="trame-tuiles grille-file grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {ROBES.map((r, i) => {
            const media = couverture(r);
            if (!media) return null;
            return (
              <Tuile
                key={r.slug}
                retard={(i % 3) * 70}
                href={`/robes/${r.slug}`}
                coupDeCoeur={r.slug}
                media={media}
                dossier="robes"
                alt={altRobe(r, langue)}
                nom={r.nom}
                repere={r.createur ?? L.createurs.autres}
                priorite={i < 3}
                sizes="(max-width: 768px) 50vw, 31vw"
              />
            );
          })}
        </FileApparition>
      </div>

      {/* Le texte du catalogue, sous les robes.
        *
        * La maison veut les robes d'abord : le texte et l'index viennent
        * après la grille. Pour les moteurs rien ne change — le même HTML,
        * le H1 en tête, les mêmes liens —, seule la lecture à l'écran
        * commence par les photographies.
        *
        * Une phrase à la voix des titres, puis le détail en corps de texte,
        * sur deux colonnes : un texte de cinq phrases au corps d'un titre
        * faisait un mur. Les pages du catalogue viennent ensuite, rangées
        * par ce qu'elles classent — la coupe, le style, la matière, le
        * détail —, en quatre colonnes de liens fins, comme au pied de page.
        * Une rangée de seize liens soulignés était une liste sans forme.
        * Rien n'est caché pour les moteurs : les mêmes mots, mieux rangés. */}
      {langue === "fr" && (
        <div className="gouttiere pb-[clamp(2.5rem,5vw,4.5rem)] pt-[clamp(3rem,6vw,5.5rem)]">
          <p className="phrase est-moyenne mesure-l">
            Des robes de mariée de plusieurs maisons — Watters Designs, Casablanca Bridal, Olya Mak, Monica Loretti et quelques ateliers indépendants —, à essayer en showroom à Paris 10ᵉ et confectionnées à vos mesures.
          </p>
          <div className="mt-6 grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-4 md:grid-cols-2">
            <p className="texte mesure">
              Toutes les coupes y sont, sirène, princesse, fluide, trapèze, deux-en-un, et toutes les matières, de la dentelle de Chantilly au crêpe le plus simple. Chic ou de luxe, esprit couture ou toute simple, élégante ou audacieuse, classique ou glamour : chaque fiche nomme la marque et le tissu, et chaque robe est ajustée sur place, retouches comprises.
            </p>
            <p className="texte mesure">
              Traditionnelle ou moderne, blanche ou ivoire, bohème, romantique ou minimaliste, d'une pièce ou deux pièces : pas de vente en ligne ni de prêt-à-porter. Ce n'est pas de la haute couture au sens des maisons parisiennes, c'est du sur-mesure, pour une femme et une seule, dans une boutique française. L'achat se décide au showroom, après l'essayage, et chaque création est celle d'une maison nommée sur sa fiche.
            </p>
          </div>

          <nav
            aria-label="Parcourir les robes par coupe, style, matière ou détail"
            className="mt-10 grid grid-cols-2 gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-8 border-t border-fil pt-8 md:grid-cols-4"
          >
            {[
              { titre: "Par coupe", liens: COUPES.map((c) => ({ href: `/coupes/${c.ancre}`, label: c.nom })) },
              { titre: "Par style", liens: pagesDe("styles").map(lienFamille) },
              { titre: "Par matière", liens: pagesDe("matieres").map(lienFamille) },
              {
                titre: "Par détail",
                liens: [...pagesDe("details"), ...pagesDe("morphologies")].map(lienFamille),
              },
            ].map((g) => (
              <div key={g.titre}>
                <h2 className="legende">{g.titre}</h2>
                <ul className="mt-4 flex flex-col gap-2">
                  {g.liens.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="texte souligne">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      )}

      <div className="gouttiere py-[clamp(2rem,4vw,3.5rem)]" />
    </>
  );
}
