import Link from "@/components/Lien";
import Tuile from "@/components/Tuile";
import FilDAriane from "@/components/FilDAriane";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import QuestionsAccordeon from "@/components/QuestionsAccordeon";
import { ID_MAISON } from "@/lib/schema";
import { MORPHOLOGIES, ROBES, SITE_URL } from "@/lib/madamoon";
import { altRobe } from "@/lib/alt";
import { couverture } from "@/lib/couverture";
import { morphoNom } from "@/lib/contenu";
import { adresseFamille, type PageFamille as Page } from "@/lib/familles";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Une page transversale : un style, une matière, un détail.
 *
 * La mise en page est celle de la page de style de la maison
 * (« PageStyle ») : un titre qui dit l'expression cherchée, une réponse
 * directe dessous, puis les robes, ce qui fait le style, la robe d'à
 * côté, les silhouettes, les questions, et le rendez-vous. Rien de neuf
 * dans le dessin ; seule la source des données change : la page porte sa
 * propre adresse, ses propres morphologies et son propre fil d'Ariane.
 */

const robe = (slug: string) => ROBES.find((r) => r.slug === slug);

export default function PageFamille({ page, langue }: { page: Page; langue: Langue }) {
  const T = t(langue);
  const S = page.style;
  const adresse = adresseFamille(page);
  const premieres = MORPHOLOGIES.filter((m) => page.morphos.premieres.includes(m.lettre));
  const secondes = MORPHOLOGIES.filter((m) => page.morphos.secondes.includes(m.lettre));
  const echo = S.echo ? robe(S.echo.robe) : undefined;
  const mediaEcho = echo ? couverture(echo) : undefined;
  const retour = page.coupe ? `/coupes/${page.coupe.ancre}` : "/robes";

  const donnees = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.titre,
    description: page.description,
    inLanguage: langue,
    url: `${SITE_URL}${adresse}/`,
    isPartOf: { "@id": `${SITE_URL}/#site` },
    about: { "@id": ID_MAISON },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: S.robes.liste.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/robes/${item.slug}/`,
        name: robe(item.slug)?.nom,
      })),
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: S.questions.liste.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.r },
    })),
  };

  return (
    <div style={{ background: "var(--color-blanc)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <FilDAriane
        langue={langue}
        rangs={[
          page.ariane ?? { nom: T.barre.robes, adresse: "/robes" },
          { nom: page.titre, adresse },
        ]}
      />

      <header className="gouttiere pb-[clamp(2.5rem,5vw,4.5rem)] pt-[calc(var(--entete)+clamp(2rem,4.5vw,4rem))]">
        <div className="max-w-[56rem]">
          <p className="legende" style={{ color: "var(--color-action)" }}>
            {page.note}
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
            {page.titre}
          </h1>
          <p className="texte mesure-l mt-6" style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)" }}>
            {page.chapo}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <AppelRendezvous className="bouton">{T.pages.question.prendreRendezvous}</AppelRendezvous>
            <Link href={retour} className="bouton-trait">
              {S.voirLaCoupe}
            </Link>
          </div>
        </div>
      </header>

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

      <section aria-labelledby="questions-style" className="gouttiere py-[clamp(3.5rem,7vw,6rem)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 lg:mx-auto lg:max-w-[52rem]">
          <h2 id="questions-style" className="phrase">
            {S.questions.titre}
          </h2>
          <Link href="/guides" className="lien-nav souligne text-action">
            {S.questions.toutes}
          </Link>
        </div>
        <QuestionsAccordeon questions={S.questions.liste} />
      </section>

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
