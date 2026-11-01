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
import { PAGES_FAMILLES, adresseFamille } from "@/lib/familles";

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

      {/* L'introduction, en français : ce que le catalogue contient, dit
        * avec les mots qu'une mariée tape — robe de mariée, les coupes, les
        * styles et les matières — et les pages qui y mènent. Une seule
        * phrase de plus, à la mesure du site ; rien n'est caché pour les
        * moteurs. */}
      {langue === "fr" && (
        <div className="gouttiere pb-[clamp(2rem,4vw,3.5rem)]">
          <p className="phrase est-moyenne mesure-l">
            Des robes de mariée de plusieurs maisons — Watters Designs, Casablanca Bridal, Olya Mak, Monica Loretti et quelques ateliers indépendants —, à essayer en showroom à Paris 10ᵉ et confectionnées à vos mesures. Toutes les coupes y sont : sirène, princesse, fluide, trapèze, deux-en-un ; et toutes les matières, de la dentelle de Chantilly au crêpe le plus simple. Robe de mariée chic ou de luxe, esprit couture ou toute simple, élégante ou audacieuse : chaque fiche nomme la marque et le tissu, et chaque robe est ajustée sur place, à Paris, retouches comprises. Robe de mariée traditionnelle ou moderne, blanche ou ivoire, de style bohème, romantique ou minimaliste, en tissu simple ou de luxe : rien ne se vend en ligne, et ce n'est pas de la haute couture au sens des maisons parisiennes — c'est du sur-mesure, pour une femme et une seule, dans une boutique française, à Paris. Belle ou magnifique robe de mariée, classique, glamour ou moderne, d'une pièce ou deux pièces, pour la cérémonie et la fête : l'achat se décide au showroom, après l'essayage — pas de vente en ligne, pas de prêt-à-porter — et chaque création est celle d'une maison nommée sur sa fiche.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {[
              ...COUPES.map((c) => ({ href: `/coupes/${c.ancre}`, label: `Robes ${c.nom.toLowerCase()}` })),
              ...PAGES_FAMILLES.map((p) => ({ href: adresseFamille(p), label: p.titre.replace(" à Paris", "") })),
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="lien-nav souligne text-action">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

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

      <div className="gouttiere py-[clamp(3rem,5.5vw,5rem)]" />
    </>
  );
}
