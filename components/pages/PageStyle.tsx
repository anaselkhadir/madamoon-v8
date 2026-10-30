import Link from "@/components/Lien";
import Tuile from "@/components/Tuile";
import FilDAriane from "@/components/FilDAriane";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import { ID_MAISON } from "@/lib/schema";
import { MORPHOLOGIES, ROBES, SITE_URL } from "@/lib/madamoon";
import { altRobe } from "@/lib/alt";
import { couverture } from "@/lib/couverture";
import { coupeNom, coupeNote, morphoNom } from "@/lib/contenu";
import type { Coupe } from "@/lib/coupes";
import type { QuestionCoupe } from "@/lib/coupes-questions";
import { versLangue, type Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Une page de style : la bohème.
 *
 * Elle vit sous l'adresse d'une coupe, comme ses questions, mais elle
 * ne se lit pas comme une question. C'est une petite page de collection
 * : un titre qui dit l'expression cherchée, une réponse directe dessous,
 * puis les robes, ce qui fait le style, la robe d'à côté, les
 * silhouettes, les questions, et le rendez-vous.
 *
 * La composition est celle de la maquette validée par la maison, dans
 * le système du site : l'ivoire, l'encre, le rouge MADAMOON, le serif
 * des titres et le sans du texte, l'angle de quatre pixels. Pas de
 * photographie d'ouverture : les robes arrivent juste sous le titre, et
 * ce sont elles l'image de la page.
 */

const robe = (slug: string) => ROBES.find((r) => r.slug === slug);

export default function PageStyle({
  coupe,
  x,
  langue,
}: {
  coupe: Coupe;
  x: QuestionCoupe & { style: NonNullable<QuestionCoupe["style"]> };
  langue: Langue;
}) {
  const T = t(langue);
  const S = x.style;
  const titre = x.titre ?? x.q;
  const base = `/coupes/${coupe.ancre}`;
  const adresse = `${base}/${x.slug}`;
  const nomCoupe =
    langue === "fr"
      ? `Robes de mariée ${coupeNom(coupe, langue).toLowerCase()}`
      : `${coupeNom(coupe, langue)} wedding dresses`;

  /* Les silhouettes, telles que la boutique les range : en premier, puis
   * à essayer. Rien n'est écrit à la main. */
  const premieres = MORPHOLOGIES.filter((m) => m.premieres.includes(coupe.nom));
  const secondes = MORPHOLOGIES.filter((m) => m.secondes.includes(coupe.nom));
  const echo = S.echo ? robe(S.echo.robe) : undefined;
  const mediaEcho = echo ? couverture(echo) : undefined;

  const donnees = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titre,
    description: x.description,
    inLanguage: langue,
    mainEntityOfPage: `${SITE_URL}${versLangue(adresse, langue)}/`,
    author: { "@id": ID_MAISON },
    publisher: { "@id": ID_MAISON },
  };

  return (
    <div style={{ background: "var(--color-blanc)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <FilDAriane
        langue={langue}
        rangs={[
          { nom: T.barre.coupes, adresse: "/coupes" },
          { nom: nomCoupe, adresse: base },
          { nom: titre, adresse },
        ]}
      />

      {/* ————————————————————————————————————— l'ouverture —————
        * Le titre dit l'expression, le paragraphe y répond. Deux boutons :
        * l'essayage, et la coupe dont le style dépend. */}
      <header className="gouttiere pb-[clamp(2.5rem,5vw,4.5rem)] pt-[calc(var(--entete)+clamp(2rem,4.5vw,4rem))]">
        <div className="max-w-[56rem]">
          <p className="legende" style={{ color: "var(--color-action)" }}>
            {coupeNote(coupe, langue)}
          </p>
          <h1
            className="mt-5"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 5.4vw, 4.5rem)",
              lineHeight: 1.04,
              color: "var(--color-encre)",
              textWrap: "balance",
            }}
          >
            {titre}
          </h1>
          <p className="texte mesure-l mt-6" style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)" }}>
            {x.chapo}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <AppelRendezvous className="bouton">{T.pages.question.prendreRendezvous}</AppelRendezvous>
            <Link href={base} className="bouton-trait">
              {S.voirLaCoupe}
            </Link>
          </div>
        </div>
      </header>

      {/* ————————————————————————————————————— les robes —————
        * Leurs photographies, et ce que leur fiche en dit. */}
      <section aria-labelledby="robes" className="gouttiere pb-[clamp(3.5rem,7vw,6rem)]">
        <h2 id="robes" className="phrase" data-lever>
          {S.robes.titre}
        </h2>
        <ul className="mt-7 grid gap-x-[clamp(1rem,2.2vw,1.75rem)] gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {S.robes.liste.map((item, j) => {
            const r = robe(item.slug);
            const media = r ? couverture(r) : undefined;
            if (!r || !media) return null;
            return (
              <li key={item.slug} className="flex flex-col">
                <Tuile
                  retard={(j % 3) * 70}
                  href={`/robes/${r.slug}`}
                  coupDeCoeur={r.slug}
                  media={media}
                  dossier="robes"
                  alt={altRobe(r, langue)}
                  nom={r.nom}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 31vw"
                  priorite={j < 3}
                />
                <p className="texte mt-4 max-w-[38ch]">{item.texte}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ————————————————————————————————————— le style —————
        * Deux cartes au gris doux, centrées, à l'angle de la maison. */}
      <section className="gouttiere pb-[clamp(3.5rem,7vw,6rem)]">
        <div className="mx-auto grid max-w-[62rem] gap-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2">
          {S.colonnes.map((c, i) => (
            <div
              key={c.titre}
              data-lever
              data-retard={i * 100}
              className="rounded-[4px] p-[clamp(1.75rem,3.5vw,2.75rem)] text-center"
              style={{ background: "var(--color-gris)" }}
            >
              <h2 className="phrase">{c.titre}</h2>
              <p className="texte mx-auto mt-4 max-w-[40ch]">{c.texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ————————————————————————————————————— la robe d'à côté —————
        * Une robe d'une autre coupe, qui partage l'esprit : la photographie
        * d'un côté, ce que sa fiche en dit de l'autre. */}
      {S.echo && echo && mediaEcho && (
        <section className="gouttiere pb-[clamp(3.5rem,7vw,6rem)]">
          <div className="grid items-center gap-x-[clamp(2rem,6vw,6rem)] gap-y-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <Tuile
                href={`/robes/${echo.slug}`}
                coupDeCoeur={echo.slug}
                media={mediaEcho}
                dossier="robes"
                alt={altRobe(echo, langue)}
                nom={echo.nom}
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="md:col-span-6 md:col-start-7" data-lever>
              <h2 className="phrase">{S.echo.titre}</h2>
              <p className="texte mesure mt-4">{S.echo.texte}</p>
              <Link href={`/robes/${echo.slug}`} className="lien-nav souligne mt-6 inline-block text-action">
                {S.echo.voir}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ————————————————————————————————————— à qui elle va ————— */}
      <section
        aria-labelledby="pour-qui"
        className="gouttiere py-[clamp(3rem,6vw,5rem)]"
        style={{ background: "var(--color-gris)" }}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <h2 id="pour-qui" className="phrase">
            {S.pourQui.titre}
          </h2>
          <Link href="/morphologies" className="lien-nav souligne text-action">
            {S.pourQui.toutes}
          </Link>
        </div>
        <p className="texte mesure-l mt-4">{S.pourQui.texte}</p>
        {/* Les lettres, chacune vers sa page : pleines pour les premières,
          * au trait pour celles à essayer. */}
        <ul className="mt-7 flex flex-wrap gap-3">
          {[...premieres.map((m) => ({ m, plein: true })), ...secondes.map((m) => ({ m, plein: false }))].map(
            ({ m, plein }) => (
              <li key={m.lettre}>
                <Link
                  href={`/morphologies/${m.lettre.toLowerCase()}`}
                  aria-label={morphoNom(m, langue)}
                  className={`${plein ? "bouton" : "bouton-trait"} min-w-[2.75rem] !px-4`}
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", fontWeight: 400 }}
                >
                  {m.lettre}
                </Link>
              </li>
            ),
          )}
        </ul>
      </section>

      {/* ————————————————————————————————————— les questions ————— */}
      <section aria-labelledby="questions-style" className="gouttiere py-[clamp(3.5rem,7vw,6rem)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <h2 id="questions-style" className="phrase">
            {S.questions.titre}
          </h2>
          <Link href={`${base}#questions`} className="lien-nav souligne text-action">
            {S.questions.toutes}
          </Link>
        </div>
        <dl className="mt-7 max-w-[52rem] border-t border-fil">
          {S.questions.liste.map((item) => (
            <div key={item.q} className="border-b border-fil py-6">
              <dt
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)",
                  lineHeight: 1.35,
                  color: "var(--color-encre)",
                }}
              >
                {item.q}
              </dt>
              <dd className="texte mesure-l mt-3">{item.r}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ————————————————————————————————————— le rendez-vous —————
        * Le seul aplat sombre de la page, pour la seule action qui compte. */}
      <section
        className="gouttiere flex flex-col items-center gap-5 py-[clamp(3rem,6vw,4.5rem)] text-center"
        style={{ background: "var(--color-encre)" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.625rem, 2.6vw, 2.25rem)",
            lineHeight: 1.2,
            color: "var(--color-ivoire)",
          }}
        >
          {S.fin.titre}
        </h2>
        <p className="texte" style={{ color: "var(--color-sable)" }}>
          {S.fin.texte}
        </p>
        <AppelRendezvous className="bouton mt-2">{T.pages.question.prendreRendezvous}</AppelRendezvous>
      </section>
    </div>
  );
}
