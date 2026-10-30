import Link from "@/components/Lien";
import { AVIS, NOTE } from "@/lib/avis";
import { ID_MAISON } from "@/lib/schema";
import { typographie } from "@/lib/francais";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Ce qu'elles en disent.
 *
 * La note d'abord, très grande, puis trois voix sur trois cartes.
 *
 * La section a longtemps fait l'inverse : quatre paragraphes de trente-six
 * pixels sur un écran et demi, et les mesures — cinq sur cinq, deux cents
 * avis, seule boutique cinq étoiles du dixième — chuchotées en onze
 * pixels tout en bas. C'était enterrer ce que la maison a de plus rare.
 * Une note parfaite sur deux cents avis ne se glisse pas en note de bas
 * de page : elle s'affiche.
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

/* Les trois voix retenues. Nommées, jamais réécrites : le texte affiché
 * vient de `lib/avis.ts`, mot pour mot.
 *
 * Elles disent trois choses différentes — l'essayage privé, l'accueil,
 * la comparaison avec ce qu'on a vu ailleurs. Une quatrième ne dirait
 * rien de plus. */
const CHOIX = ["Mathilde Pln", "Gwendoline Carrier", "Julia JF"];

/* Les étoiles. Dessinées, et non écrites : le caractère « ★ » n'existe
 * pas dans toutes les polices et retombe sur celle du système.
 *
 * Deux emplois, un seul dessin : petites et rouges sur les cartes,
 * grandes et noires en tête de section, où elles ont remplacé le
 * chiffre. */
function Etoiles({
  note,
  className = "flex gap-[0.15em] text-action",
  etoile = "h-[0.8rem] w-[0.8rem]",
}: {
  note: number;
  className?: string;
  etoile?: string;
}) {
  return (
    <span aria-hidden="true" className={className}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={etoile}
          fill={i <= note ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        >
          <path d="M12 3.4l2.6 5.5 5.9.8-4.3 4.2 1 6-5.2-2.8-5.2 2.8 1-6-4.3-4.2 5.9-.8Z" />
        </svg>
      ))}
    </span>
  );
}

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

      {/* Trois voix, sur trois cartes.
        *
        * La section n'en portait aucune : le chiffre tenait tout, et le
        * reste était du texte nu. Elles portent maintenant le gris
        * doux et l'angle des morphologies, sans cadre : le gris se
        * détache seul du blanc de la section. */}
      <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-[clamp(0.875rem,1.6vw,1.25rem)] md:grid-cols-3" data-suite>
        {voix.map((a) => (
          <figure
            key={a.auteur}
            className="relative flex flex-col overflow-hidden rounded-[4px] bg-gris p-[clamp(1.125rem,1.8vw,1.5rem)]"
          >
            {/* Le guillemet, posé dans le coin, très grand et très pâli :
              * il ponctue, il ne parle pas. En bâton — la paire de
              * virgules pleines et rondes du modèle montré, que le serif
              * ne donne pas : il en fait deux apostrophes fines.
              *
              * Hors du flux : il déborde volontairement la marge de la
              * carte, et dans le flux il aurait poussé les étoiles. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-[0.6rem] top-[0.1rem] select-none font-sans text-[6rem] font-bold leading-[0.8]"
              style={{ color: "color-mix(in srgb, var(--color-action) 15%, transparent)" }}
            >
              &rdquo;
            </span>

            <div className="relative flex items-start">
              <Etoiles note={a.note} />
            </div>

            <blockquote className="texte mt-3 flex-1">
              {typographie(a.extrait ?? a.texte)}
              {/* Les crochets disent qu'il en manque : une coupe non
                * signalée est une citation faussée. */}
              {a.extrait && <span className="text-brume"> […]</span>}
            </blockquote>

            <figcaption className="mt-5 flex items-center gap-3 border-t border-fil pt-4">
              {/* Une initiale, pas un portrait : la maison n'a pas les
                * photographies de ses clientes, et on n'en invente pas.
                *
                * La pastille est d'un gris appuyé, et non de la craie :
                * la craie et le gris des cartes se ressemblent à un
                * point près en clair, et sont le même noir en sombre —
                * la pastille y disparaissait. */}
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gris-appuye font-serif text-[1rem] leading-none text-encre"
              >
                {a.auteur.charAt(0)}
              </span>
              <span className="min-w-0">
                <span className="nom-carte block truncate">{a.auteur}</span>
                <span className="legende block" style={{ color: "var(--color-brume)" }}>
                  {a.date}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-[clamp(2.5rem,5vw,4rem)] border-t border-fil pt-6">
        <Link href={NOTE.url} className="lien-nav souligne text-action">
          {L.avis.lesAvis}
        </Link>
      </p>
    </section>
  );
}
