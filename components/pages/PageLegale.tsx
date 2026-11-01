import Link from "@/components/Lien";
import TitreSection from "@/components/TitreSection";
import FilDAriane from "@/components/FilDAriane";
import BoutonCookies from "@/components/chrome/BoutonCookies";
import { SITE_URL } from "@/lib/madamoon";
import { ID_MAISON } from "@/lib/schema";
import { MISE_A_JOUR, PAGES_LEGALES, adresseLegale, type PageLegale as Page } from "@/lib/legal";
import { t } from "@/lib/textes";

/*
 * Une page légale : mentions, confidentialité, cookies.
 *
 * Un titre, un chapo, des sections de même facture. Rien de la mise en
 * scène des autres pages — pas de photographie, pas de bloc crème : on
 * vient ici lire, et repartir. La typographie reste celle du site, pour
 * que la page ne paraisse pas rapportée d'ailleurs.
 *
 * Françaises seulement : le gabarit ne prend pas de langue.
 */

/* « 1 novembre 2026 », depuis la date écrite dans lib/legal.ts. Calculée
 * à la compilation, comme tout le reste. */
const DATE = new Date(`${MISE_A_JOUR}T12:00:00Z`).toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function PageLegale({ page }: { page: Page }) {
  const T = t("fr");
  const adresse = adresseLegale(page);
  const autres = PAGES_LEGALES.filter((p) => p.slug !== page.slug);

  const donnees = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${adresse}/#page`,
    url: `${SITE_URL}${adresse}/`,
    name: page.titre,
    description: page.description,
    inLanguage: "fr-FR",
    dateModified: MISE_A_JOUR,
    isPartOf: { "@id": `${SITE_URL}/#site` },
    about: { "@id": ID_MAISON },
  };

  return (
    <div className="pt-[var(--entete)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <FilDAriane langue="fr" rangs={[{ nom: page.titre, adresse }]} />
      <TitreSection niveau={1} titre={page.titre} />

      <div className="gouttiere pb-[clamp(3rem,5.5vw,5rem)]">
        <p className="phrase est-moyenne mesure-l">{page.chapo}</p>
        <p className="mention mt-4 text-plomb">Dernière mise à jour : {DATE}</p>

        {page.blocs.map((b) => (
          <section key={b.titre} className="mt-[clamp(2.5rem,4.5vw,4rem)]">
            <h2 className="titre-section">{b.titre}</h2>
            {b.paragraphes?.map((p) => (
              <p key={p} className="texte mesure-l mt-4">
                {p}
              </p>
            ))}
            {b.liste && (
              <ul className="mesure-l mt-4 flex flex-col gap-3">
                {b.liste.map((x) => (
                  <li key={x} className="flex gap-4">
                    <span aria-hidden="true" className="mt-[0.7rem] h-px w-6 shrink-0 bg-fil" />
                    <span className="texte">{x}</span>
                  </li>
                ))}
              </ul>
            )}
            {b.suite?.map((p) => (
              <p key={p} className="texte mesure-l mt-4">
                {p}
              </p>
            ))}
          </section>
        ))}

        {page.slug === "cookies" && (
          <div className="mt-10">
            <BoutonCookies>{T.pied.gererCookies}</BoutonCookies>
          </div>
        )}

        <nav
          aria-label={T.pied.mentions}
          className="mt-[clamp(3rem,5.5vw,5rem)] flex flex-wrap gap-x-6 gap-y-3 border-t border-fil pt-8"
        >
          {autres.map((p) => (
            <Link key={p.slug} href={adresseLegale(p)} className="texte souligne text-encre">
              {p.titre}
            </Link>
          ))}
          <Link href="/contact" className="texte souligne text-encre">
            {T.pied.contact}
          </Link>
        </nav>
      </div>
    </div>
  );
}
