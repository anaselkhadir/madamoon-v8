import Link from "@/components/Lien";
import AppelElise from "@/components/AppelElise";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import FilDAriane from "@/components/FilDAriane";
import { FICHE_GOOGLE, ID_MAISON } from "@/lib/schema";
import { SITE_URL } from "@/lib/madamoon";
import type { Article } from "@/lib/questions";
import { versLangue, type Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * La page d'une question.
 *
 * Une question posée ailleurs sur le site — dans la FAQ, en bas d'une
 * page de morphologie — et son bouton « En savoir plus » mènent ici. La
 * page reprend la réponse courte en tête — c'est elle qu'on est venu
 * chercher —, puis la développe : des intertitres, ce qu'il faut
 * retenir, les pages du site qui prolongent la réponse, et les autres
 * questions de la même série.
 *
 * Une seule mise en page pour toutes : ce sont des textes qu'on lit, et
 * une lectrice qui passe d'une question à l'autre doit retrouver les
 * choses à la même place. Ce composant ne sait pas d'où vient la
 * question ; la page qui le monte lui donne le fil d'Ariane, le retour
 * et la liste des autres.
 *
 * Le texte se lit dans une colonne de mesure confortable ; « À retenir »
 * se tient à côté sur grand écran. Sur téléphone, il vient après le
 * texte : en tête, il redirait la réponse courte qu'on vient de lire.
 */

export type ArticleQuestionProps = {
  langue: Langue;
  q: string;
  r: string;
  article: Article;
  /* L'adresse française de la page, sans barre finale : « /faq/prix… ». */
  adresse: string;
  /* Le fil d'Ariane, accueil exclu, adresses françaises. Le dernier
   * barreau est la page elle-même. */
  ariane: { nom: string; adresse: string }[];
  /* Le lien de retour, en tête et au-dessus des autres questions. */
  retour: { href: string; label: string };
  /* Les autres questions de la série, chacune vers sa page. */
  autres: { href: string; q: string; rang: number }[];
  /* Un lien d'itinéraire vers la fiche Google : pour la question de
   * l'adresse, que le site ne décrit pas en transports. */
  itineraire?: boolean;
};

export default function ArticleQuestion({
  langue,
  q,
  r,
  article,
  adresse,
  ariane,
  retour,
  autres,
  itineraire = false,
}: ArticleQuestionProps) {
  const L = t(langue).pages.question;
  /* Le titre de la page : celui qu'elle vise, sinon sa question. */
  const titre = article.titre ?? q;

  /*
   * Le balisage : un article de la maison, sur une question. Pas de
   * « FAQPage » ici — la page d'où l'on vient porte la question, et deux
   * pages qui se disent la page de réponse se concurrencent.
   */
  const donnees = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titre,
    description: article.description,
    inLanguage: langue,
    mainEntityOfPage: `${SITE_URL}${versLangue(adresse, langue)}/`,
    author: { "@id": ID_MAISON },
    publisher: { "@id": ID_MAISON },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <FilDAriane langue={langue} rangs={ariane} />

      {/* ————————————————————————————————————— l'ouverture ————— */}
      <header className="gouttiere pb-[clamp(2rem,4vw,3rem)] pt-[calc(var(--entete)+clamp(2rem,4.5vw,4rem))]">
        <Link
          href={retour.href}
          className="legende souligne transition-colors duration-300 hover:text-action"
        >
          ← {retour.label}
        </Link>
        {/* L'affiche du site, ramenée à la taille d'une question : à cent
          * pixels, « Quelles sont les étapes d'une confection sur mesure ? »
          * aurait pris quatre lignes et tout le premier écran. */}
        <h1
          className="affiche mt-6 max-w-[24ch]"
          style={{ fontSize: "clamp(2.125rem, 4.4vw, 4rem)", textWrap: "balance" }}
        >
          {titre}
        </h1>
        <p className="phrase est-moyenne mesure-l mt-6">{article.chapo}</p>
      </header>

      {/* ———————————————————————————————— la réponse courte —————
       * On arrive souvent ici depuis un moteur, et c'est elle qu'on
       * cherchait. */}
      <section className="gouttiere">
        <div
          className="rounded-[4px] p-[clamp(1.5rem,3.5vw,3rem)]"
          style={{ background: "var(--color-craie)" }}
        >
          {/* Quand la page porte un autre titre que sa question, la
            * question coiffe la réponse : c'est à elle que la réponse
            * courte répond. */}
          {article.titre ? (
            <h2 className="phrase" style={{ color: "var(--color-encre)" }}>
              {q}
            </h2>
          ) : (
            <h2 className="legende">{L.laReponseCourte}</h2>
          )}
          <p className="texte mesure-l mt-4" style={{ color: "var(--color-encre)" }}>
            {r}
          </p>
        </div>
      </section>

      {/* —————————————————————————————————————— le développement ————— */}
      <div className="gouttiere grid gap-x-[clamp(2rem,6vw,6rem)] gap-y-12 py-[clamp(3rem,6vw,5.5rem)] lg:grid-cols-12">
        <article className="lg:col-span-7">
          {article.sections.map((s, i) => {
            const Liste = s.ordonnee ? "ol" : "ul";
            return (
              <section key={s.titre} className={i === 0 ? "" : "mt-[clamp(2.5rem,4.5vw,3.5rem)]"}>
                <h2 className="phrase">{s.titre}</h2>
                {s.texte.map((p) => (
                  <p key={p} className="texte mesure-l mt-4">
                    {p}
                  </p>
                ))}
                {s.liste && (
                  <Liste className="mt-5 flex max-w-[48ch] flex-col">
                    {s.liste.map((item, j) => (
                      <li key={item} className="texte flex gap-4 border-t border-fil py-3">
                        {/* Le numéro dit le rang d'une étape ; le tiret,
                          * seulement qu'un élément commence. */}
                        <span
                          aria-hidden="true"
                          className="legende shrink-0 pt-[0.35em] tabular-nums"
                          style={{ color: s.ordonnee ? undefined : "var(--color-action)" }}
                        >
                          {s.ordonnee ? String(j + 1).padStart(2, "0") : "—"}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </Liste>
                )}
              </section>
            );
          })}
        </article>

        <aside className="lg:col-span-4 lg:col-start-9">
          {/* Pas de colonne fixée au défilement : la carte « Votre essayage
            * privé » du site occupe déjà le bas droit de l'écran, et elle
            * aurait couvert les liens en permanence. */}
          <div>
            <div className="border-t pt-5" style={{ borderColor: "var(--color-encre)" }}>
              <h2 className="legende">{L.aRetenir}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {article.aRetenir.map((x) => (
                  <li key={x} className="texte flex gap-3" style={{ color: "var(--color-encre)" }}>
                    <span aria-hidden="true" style={{ color: "var(--color-action)" }}>
                      —
                    </span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <AppelRendezvous className="bouton mt-7">{L.prendreRendezvous}</AppelRendezvous>
            </div>

            <div className="mt-10 border-t border-fil pt-5">
              <h2 className="legende">{L.pourAllerPlusLoin}</h2>
              <ul className="mt-4 flex flex-col gap-2">
                {article.liens.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="texte lien-texte">
                      {l.label}
                    </Link>
                  </li>
                ))}
                {itineraire && (
                  <li>
                    <a
                      href={FICHE_GOOGLE.lieu}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="texte lien-texte"
                    >
                      {L.itineraire}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* ———————————————————————————————— les autres questions ————— */}
      {autres.length > 0 && (
        <nav
          aria-labelledby="autres-questions"
          className="gouttiere border-t border-fil py-[clamp(3rem,6vw,5rem)]"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <h2 id="autres-questions" className="titre-section">
              {L.lesAutresQuestions}
            </h2>
            <Link href={retour.href} className="lien-nav souligne text-action">
              {retour.label}
            </Link>
          </div>
          <ol className="mt-6 grid gap-x-[clamp(1.5rem,4vw,4rem)] md:grid-cols-2">
            {autres.map((a) => (
              <li key={a.href} className="border-t border-fil">
                <Link
                  href={a.href}
                  className="texte flex items-baseline gap-4 py-3 transition-colors duration-300 hover:text-action"
                >
                  <span className="legende shrink-0 tabular-nums">
                    {String(a.rang + 1).padStart(2, "0")}
                  </span>
                  <span className="lien-texte">{a.q}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* ————————————————————————————————————— la sortie ————— */}
      <section className="gouttiere pb-[clamp(3rem,6vw,5.5rem)]">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="phrase">{L.uneAutreQuestion}</h2>
            <p className="texte mesure-l mt-4">{L.uneAutreQuestionTexte}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AppelElise className="bouton-trait">{L.demanderAElise}</AppelElise>
            <AppelRendezvous className="bouton">{L.prendreRendezvous}</AppelRendezvous>
          </div>
        </div>
      </section>
    </>
  );
}
