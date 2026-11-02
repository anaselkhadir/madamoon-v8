import Link from "@/components/Lien";
import AvisCarte from "@/components/accueil/AvisCarte";
import Etoiles from "@/components/accueil/Etoiles";
import { AVIS, NOTE } from "@/lib/avis";
import { ID_MAISON } from "@/lib/schema";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Ce qu'elles en disent.
 *
 * La note d’abord, très grande, puis les voix, sur une carte.
 *
 * La section a longtemps fait l'inverse : quatre paragraphes de trente-six
 * pixels sur un écran et demi, et les mesures — cinq sur cinq, deux cents
 * avis, seule boutique cinq étoiles du dixième — chuchotées en onze
 * pixels tout en bas. C'était enterrer ce que la maison a de plus rare.
 * Une note parfaite sur deux cents avis ne se glisse pas en note de bas
 * de page : elle s'affiche.
 *
 * Depuis, à la demande de la maison (référence Osmo « logo card
 * testimonials »), les trois cartes n'en font plus qu'une, qui change
 * d'avis au survol de ses points — voir AvisCarte.tsx. Ce qui suit dit
 * d'où vient sa forme.
 *
 * Les cartes sont venues ensuite, à la demande de la maison, et ont
 * cherché leur forme en trois temps : un filet sur fond blanc, puis
 * rien du tout, puis le gris doux des morphologies et l'angle des
 * boutons. C'est cette dernière qui tient — la même carte que la
 * section des morphologies, pour que la page n'ait qu'une façon de
 * poser une carte.
 *
 * Le filet a disparu avec le fond : un gris plein se détache seul du
 * blanc de la section, et un cadre par-dessus ne ferait que l'épaissir.
 *
 * Pas de portraits. La maison n'a pas les photographies de ses
 * clientes : une initiale tient la place, et l'on n'invente pas un
 * visage.
 *
 * Le balisage schema.org porte les huit avis et l'avis entier de
 * chacune : c'est le texte publié que l'on déclare, jamais la coupe que
 * l'on affiche.
 */

/* Les cinq voix retenues. Nommées, jamais réécrites : le texte affiché
 * vient de `lib/avis.ts`, mot pour mot.
 *
 * Elles disent cinq choses différentes — l'essayage privé, l'accueil,
 * la comparaison avec ce qu'on a vu ailleurs, les retouches d'une robe
 * sur mesure, le conseil selon la morphologie. Trois tenaient sur trois
 * cartes ; une seule carte qui change d'avis en porte cinq sans
 * allonger la page. */
const CHOIX = [
  "Mathilde Pln",
  "Gwendoline Carrier",
  "Julia JF",
  "Alexandra Gattesco",
  "Lolo makiadi",
];

export default function Avis({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  const voix = CHOIX.map((nom) => AVIS.find((a) => a.auteur === nom)).filter(
    (a): a is (typeof AVIS)[number] => Boolean(a)
  );
  if (voix.length === 0) return null;

  const moyenne = NOTE.moyenne.toLocaleString("fr-FR", { minimumFractionDigits: 1 });

  /* Le nom et sa suite sont rangés séparément pour que l'un puisse
   * s'écrire à l'anglaise ; recollés ici, ils redonnent la phrase
   * entière, celle que lit un lecteur d'écran. */
  const phrase = `${L.avis.nom}${L.avis.experience}`;

  /*
   * La note et les avis se raccrochent à l'entité du gabarit par son
   * « @id », au lieu de déclarer une seconde maison. Deux nœuds de même
   * identité se fondent en un ; deux nœuds sans identité commune font
   * deux commerces, et la note n'est alors rattachée à rien.
   */
  const donnees = {
    "@context": "https://schema.org",
    /* Le même type que le gabarit : deux nœuds de même « @id » ne se
     * fondent en un seul que s'ils s'accordent. */
    "@type": "ClothingStore",
    "@id": ID_MAISON,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: NOTE.moyenne,
      reviewCount: NOTE.nombre,
      bestRating: 5,
    },
    review: AVIS.map((a) => ({
      "@type": "Review",
      author: { "@type": "Person", name: a.auteur },
      reviewBody: a.texte,
      reviewRating: { "@type": "Rating", ratingValue: a.note, bestRating: 5 },
    })),
  };

  return (
    <section aria-labelledby="avis" className="gouttiere bg-blanc py-[clamp(4rem,8vw,8rem)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />

      {/* Tout le haut de la section sur un seul axe : la légende, les
        * étoiles, la phrase. La légende était à gauche, au bord de la
        * page, pendant que les deux autres se tenaient au milieu — elle
        * rejoint la colonne. */}
      <div className="text-center">
        <p className="legende">{L.avis.legende}</p>

        {/* Cinq étoiles noires, qui ont remplacé le « 5,0 ».
          *
          * Le titre porte sa phrase en texte, masqué à l'œil mais présent
          * dans la page. Un « aria-label » ne suffisait pas : il parle
          * aux lecteurs d'écran, et à eux seuls. Les moteurs, eux,
          * lisaient un titre vide — la section la plus flatteuse de
          * l'accueil n'avait donc, pour eux, pas d'intitulé.
          *
          * Le chiffre n'est pas répété à l'écran : il est dans les
          * données structurées, et les étoiles le disent à l'œil. */}
        <h2 id="avis" className="mt-[clamp(1.5rem,3vw,2.25rem)]">
          <span className="sr-only">{`${moyenne} / 5 — ${phrase}`}</span>
          <Etoiles
            note={5}
            className="flex justify-center gap-[0.2em] text-encre"
            etoile="h-[clamp(1.375rem,3vw,2.25rem)] w-[clamp(1.375rem,3vw,2.25rem)]"
          />
        </h2>

        {/* La phrase de la maison, en Inter et en noir — sauf son nom,
          * qui s'écrit à l'anglaise et en rouge, exactement comme sur
          * l'intro de l'accueil.
          *
          * La phrase entière avait essayé l'anglaise, qui n'a pas plu :
          * un nom seul s'y lit, une phrase entière non. C'est bien le
          * nom seul qui la garde.
          *
          * Le corps est plus bas que celui de l'anglaise : à taille
          * égale, Inter a l'œil bien plus grand et la même phrase
          * pèserait deux fois plus lourd sous les étoiles.
          *
          * Tout est écrit en propre : « .accroche » porte sa police et
          * sa casse hors calque et l'emporterait sur un utilitaire.
          *
          * « balance » répartit la phrase sur ses deux lignes au lieu de
          * remplir la première : sans lui, la fin restait seule en bas —
          * un mot d'orphelin sous une ligne pleine. */}
        <p
          className="mx-auto mt-[clamp(1.25rem,2.5vw,2rem)] max-w-[46rem]"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1.125rem, 2.2vw, 1.75rem)",
            lineHeight: 1.45,
            color: "var(--color-encre)",
            textWrap: "balance",
          }}
        >
          {/* L'anglaise a l'œil plus petit qu'un romain de même corps :
            * relevée d'un tiers, elle se tient sur la même ligne que la
            * suite. L'interligne revient à un, sinon ses déliés
            * écartent les lignes de la phrase. Les mêmes réglages qu'à
            * l'intro, au mot près. */}
          <span
            style={{
              fontFamily: "var(--font-anglaise)",
              fontSize: "1.35em",
              lineHeight: 1,
              color: "var(--color-action)",
            }}
          >
            {L.avis.nom}
          </span>
          {L.avis.experience}
        </p>
      </div>

      {/* Les voix, sur une seule carte qui change d'avis (AvisCarte.tsx). */}
      <div data-lever className="mt-[clamp(3rem,6vw,5rem)]">
        <AvisCarte voix={voix} langue={langue} />
      </div>

      <p className="mt-[clamp(2.5rem,5vw,4rem)] border-t border-fil pt-6">
        <Link href={NOTE.url} className="lien-nav souligne text-action">
          {L.avis.lesAvis}
        </Link>
      </p>
    </section>
  );
}
