import TitreSection from "@/components/TitreSection";
import Tuile from "@/components/Tuile";
import { ROBES, SITE_URL } from "@/lib/madamoon";
import { altRobe } from "@/lib/alt";

import type { Langue } from "@/lib/langue";
import { versLangue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { robeLigne } from "@/lib/contenu";
import { couverture } from "@/lib/couverture";
import FilDAriane from "@/components/FilDAriane";

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

      {/* Toutes les robes, d'un seul tenant. Le classement par coupe a sa
        * rubrique propre — les pages de coupe et l'onglet du menu — : ici,
        * on parcourt le catalogue sans rien avoir à choisir. */}
      <div className="gouttiere">
        <div className="trame-tuiles grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        </div>
      </div>

      <div className="gouttiere py-[clamp(3rem,5.5vw,5rem)]" />
    </>
  );
}
