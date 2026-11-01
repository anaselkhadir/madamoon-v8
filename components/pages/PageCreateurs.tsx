import Link from "@/components/Lien";
import Tuile from "@/components/Tuile";
import TitreSection from "@/components/TitreSection";
import FilDAriane from "@/components/FilDAriane";
import { CREATEURS, ROBES } from "@/lib/madamoon";
import { VIGNETTES_CREATEURS, vues } from "@/lib/medias";
import { altRobe } from "@/lib/alt";
import { createurNom, createurNote, createurOrigine } from "@/lib/contenu";
import { versLangue, type Langue } from "@/lib/langue";
import { collection } from "@/lib/schema";
import { t } from "@/lib/textes";
import { CREATEURS_EDITO } from "@/lib/maisons-edito";

/*
 * Les créateurs.
 *
 * L'adresse /createurs/ n'avait pas de page : le serveur la refusait,
 * et le fil d'Ariane des maisons renvoyait aux robes faute de mieux.
 *
 * La boutique n'est pas un créateur et la page ne le laisse pas croire :
 * elle dit, dès la première phrase, que MADAMOON choisit chez d'autres.
 * Puis elle présente ces maisons comme le site les connaît — leur nom,
 * leur ville, leur note —, chacune vers sa page.
 */

/* La photographie d'une maison : celle de sa vignette sur l'accueil,
 * sinon celle qui ouvre sa page. */
function image(c: (typeof CREATEURS)[number]) {
  const choix = c.vignette ?? c.ouverture;
  const robe = ROBES.find((r) => r.slug === choix.robe);
  const media = !robe
    ? undefined
    : c.vignette && !c.vignette.vue
      ? VIGNETTES_CREATEURS[c.slug]
      : vues(robe.slug)[(choix.vue ?? 1) - 1];
  return robe && media ? { robe, media } : null;
}

export default function PageCreateurs({ langue }: { langue: Langue }) {
  const T = t(langue);
  const L = T.pages.createurs;
  /* La liste des maisons, pour le moteur : la page est un ensemble, pas
   * une suite de liens. */
  const liste = collection({
    adresse: versLangue("/createurs", langue),
    nom: L.titre,
    description: L.intro,
    langue,
    elements: CREATEURS.map((c) => ({
      nom: createurNom(c, langue),
      adresse: versLangue(`/createurs/${c.slug}`, langue),
    })),
  });
  return (
    <div className="pt-[var(--entete)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(liste) }}
      />
      <FilDAriane langue={langue} rangs={[{ nom: T.ariane.createurs, adresse: "/createurs" }]} />
      <TitreSection niveau={1} titre={L.titre} />
      <div className="gouttiere">
        <p className="texte mesure-l pb-8">{L.intro}</p>
        <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
          {CREATEURS.map((c, i) => {
            const vue = image(c);
            if (!vue) return null;
            return (
              <Tuile
                key={c.slug}
                retard={(i % 3) * 70}
                href={`/createurs/${c.slug}`}
                media={vue.media}
                dossier="robes"
                alt={altRobe(vue.robe, langue)}
                nom={createurNom(c, langue)}
                note={createurOrigine(c, langue)}
                sizes="(max-width: 768px) 50vw, 31vw"
                priorite={i < 3}
              />
            );
          })}
        </div>
      </div>

      {/* ————————————————————————————————————— les maisons —————
        * Ce que le site dit de chacune, en clair : un moteur lit ici ce
        * que les vignettes ne disent qu'en image. */}
      <section aria-labelledby="maisons" className="pb-[clamp(3rem,6vw,5rem)]">
        <TitreSection id="maisons" titre={L.lesMaisons} />
        <dl className="gouttiere grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {CREATEURS.map((c) => (
            <div key={c.slug} className="border-t border-fil pt-5">
              <dt className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <Link href={`/createurs/${c.slug}`} className="phrase souligne">
                  {createurNom(c, langue)}
                </Link>
                <span className="legende">{createurOrigine(c, langue)}</span>
              </dt>
              <dd className="texte mt-3">{createurNote(c, langue)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ———————————————————————————————————— créateur, à Paris —————
        * Ce que l'expression veut dire ici : une boutique qui choisit chez
        * des maisons, puis fait confectionner à vos mesures. En français
        * seulement, comme les guides. */}
      {langue === "fr" && (
        <section aria-labelledby="createur-paris" className="pb-[clamp(3rem,6vw,5rem)]">
          <TitreSection id="createur-paris" titre={CREATEURS_EDITO.titre} />
          <div className="gouttiere">
            {CREATEURS_EDITO.paragraphes.map((p) => (
              <p key={p} className="texte mesure-l pb-5">
                {p}
              </p>
            ))}
            <ul className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
              {CREATEURS_EDITO.liens.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="lien-nav souligne text-action">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
