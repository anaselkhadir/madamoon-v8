import Link from "@/components/Lien";

/*
 * Les rangées de questions, en bas des pages de morphologie et de coupe.
 *
 * Le dessin de la maison : des rangées dans un cadre gris, la question à
 * gauche, « Savoir plus » à droite, au rouge de la maison. La rangée
 * entière est le lien — un doigt sur téléphone n'a pas à viser le
 * bouton. La liste est centrée sur la page, et compacte : les douze
 * questions d'une page tiennent sur un écran d'ordinateur.
 *
 * Les couleurs et le survol sont dans la feuille de style
 * (« .rangee-question », « .bouton-question ») ; la taille et la police
 * de la question sont en style, pour qu'aucune classe de la maison ne
 * les reprenne.
 */

export default function RangeesQuestions({
  base,
  questions,
  savoirPlus,
}: {
  /* L'adresse française de la page, à laquelle s'ajoute celle de la
   * question : « /morphologies/o », « /coupes/sirene ». */
  base: string;
  questions: { slug: string; q: string }[];
  savoirPlus: string;
}) {
  return (
    <ul className="mx-auto flex max-w-[52rem] flex-col gap-2" data-suite>
      {questions.map((x) => (
        <li key={x.slug}>
          <Link
            href={`${base}/${x.slug}`}
            className="rangee-question group flex items-center justify-between gap-3 rounded-[4px] px-[clamp(0.875rem,1.6vw,1.25rem)] py-[clamp(0.625rem,1vw,0.8125rem)] sm:gap-5"
          >
            {/* En Inter, la police du texte courant, à la demande de la
              * maison : la question se lit comme une phrase, pas comme
              * un titre. */}
            <span
              className="min-w-0 text-encre transition-colors duration-500 group-hover:text-action"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.875rem, 1vw, 0.9375rem)",
                fontWeight: 500,
                lineHeight: 1.45,
              }}
            >
              {x.q}
            </span>
            {/* Plus serré sur téléphone, et sans flèche : à côté, le
              * bouton entier ne laissait que trois mots par ligne à la
              * question. */}
            <span
              aria-hidden="true"
              className="legende bouton-question inline-flex shrink-0 items-center gap-2 rounded-[4px] px-[0.55rem] py-[0.4rem] sm:px-[0.75rem] sm:py-[0.45rem]"
              style={{ fontSize: "0.625rem" }}
            >
              {savoirPlus}
              <span className="hidden sm:inline">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
