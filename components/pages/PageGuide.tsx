import type { CSSProperties } from "react";
import Link from "@/components/Lien";
import AppelElise from "@/components/AppelElise";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import FilDAriane from "@/components/FilDAriane";
import PhotoOrdi from "@/components/media/PhotoOrdi";
import { GUIDES, type Guide } from "@/lib/guides";
import { imagesGuide } from "@/lib/guides-images";
import { ID_MAISON } from "@/lib/schema";
import { MAISON, SITE_URL } from "@/lib/madamoon";
import { versLangue, type Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import s from "./guide.module.css";

/*
 * La page d'un guide.
 *
 * Sur ordinateur, depuis le 22 novembre 2026, le dessin de la page
 * « prix » qu'Anas a montée dans l'ancien projet
 * (madamoon-v7/app/(fr)/guides/prix-robe-de-mariee-paris) : une ouverture
 * en deux colonnes — le titre sur deux lignes, la seconde en italique,
 * face à une photographie cerclée d'orbites et à un sceau —, la réponse
 * courte en bandeau, puis les chapitres qui alternent trois mises en
 * page (un cercle, une photographie, une grande phrase), et « À retenir »
 * en liste numérotée.
 *
 * Au téléphone et à la tablette, rien ne change : la mise en page des
 * pages de question (« ArticleQuestion »), classe pour classe.
 *
 * Un seul balisage pour les deux, et c'est ce qui garde le référencement
 * intact : le même H1, la même réponse courte, les mêmes intertitres dans
 * le même ordre, les mêmes paragraphes, les mêmes liens, le même
 * balisage « Article ». Tout ce que le dessin ajoute — numéros, mentions,
 * photographies — est décoratif et caché aux lecteurs d'écran ; les
 * photographies ne sont pas téléchargées sous 1024 px (« PhotoOrdi »).
 * Les styles sont dans guide.module.css.
 */

/* Les mots sur lesquels une ligne de titre ne s'arrête pas. */
const PETITS = new Set([
  "de", "du", "des", "la", "le", "les", "à", "au", "aux", "pour", "une", "un", "sa", "son", "ses",
  "et", "ou", "en", "sur", "par", "se", "qui", "que", "est", "votre", "vos", "ce", "cette", ":",
]);

/* Un titre en deux lignes : coupé au deux-points s'il y en a un, sinon
 * au plus près du milieu. Les deux moitiés, rejointes par une espace,
 * redonnent le titre lettre pour lettre. */
function couper(titre: string): [string, string] {
  const deuxPoints = titre.indexOf(" : ");
  if (deuxPoints > 0) return [titre.slice(0, deuxPoints + 2), titre.slice(deuxPoints + 3)];
  const mots = titre.split(" ");
  if (mots.length < 3) return [titre, ""];
  let ici = 1;
  let ecart = Infinity;
  for (let i = 1; i < mots.length; i++) {
    const e = Math.abs(mots.slice(0, i).join(" ").length - mots.slice(i).join(" ").length);
    if (e < ecart) {
      ecart = e;
      ici = i;
    }
  }
  while (ici > 1 && PETITS.has(mots[ici - 1].toLowerCase())) ici--;
  return [mots.slice(0, ici).join(" "), mots.slice(ici).join(" ")];
}

/* La plus longue des deux lignes, en signes : la feuille de style en
 * tire le corps du titre, pour qu'un long titre ne déborde pas. */
const mesure = (a: string, b: string) => ({ "--n": Math.max(a.length, b.length, 12) }) as CSSProperties;

const deux = (n: number) => String(n).padStart(2, "0");

/* Les trois mises en page des chapitres, dans l'ordre de la référence. */
const MISES = ["cercle", "photo", "phrase", "photo"] as const;

export default function PageGuide({ guide, langue }: { guide: Guide; langue: Langue }) {
  const T = t(langue);
  const L = T.pages.question;
  const adresse = `/guides/${guide.slug}`;
  const retour = { href: "/guides", label: T.raccourcis.lesGuides };
  const autres = GUIDES.filter((g) => g.slug !== guide.slug);
  const images = imagesGuide(guide.slug);
  const [t1, t2] = couper(guide.titre);
  const total = guide.sections.length;
  /* Les photographies des chapitres : celles d'après l'ouverture. */
  let rang = 0;
  const suivante = () => images[1 + (rang++ % Math.max(images.length - 1, 1))] ?? images[0];

  const donnees = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.titre,
    description: guide.description,
    inLanguage: langue,
    mainEntityOfPage: `${SITE_URL}${versLangue(adresse, langue)}/`,
    author: { "@id": ID_MAISON },
    publisher: { "@id": ID_MAISON },
  };

  return (
    <div className={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }} />
      <FilDAriane
        langue={langue}
        rangs={[
          { nom: T.raccourcis.lesGuides, adresse: "/guides" },
          { nom: guide.titre, adresse },
        ]}
      />

      {/* ————————————————————————————————————— l'ouverture ————— */}
      <header
        className={`gouttiere pb-[clamp(2rem,4vw,3rem)] pt-[calc(var(--entete)+clamp(2rem,4.5vw,4rem))] ${s.ouverture}`}
      >
        <div className={s.ouvertureTexte}>
          <Link
            href={retour.href}
            className={`legende souligne transition-colors duration-300 hover:text-action ${s.retour}`}
          >
            ← {retour.label}
          </Link>
          <p className={s.surtitre} aria-hidden="true">
            Le guide de la mariée
          </p>
          <h1 className={`affiche mt-6 ${s.titre}`} style={mesure(t1, t2)}>
            <span className={s.ligne}>{t1}</span>
            {t2 && (
              <>
                {" "}
                <span className={`${s.ligne} ${s.italique}`}>{t2}</span>
              </>
            )}
          </h1>
          <p className={`phrase est-moyenne mesure-l mt-6 ${s.chapo}`}>{guide.chapo}</p>
          <a className={s.descendre} href="#lecture" aria-hidden="true" tabIndex={-1}>
            <span>01</span> Lire le guide <b>↓</b>
          </a>
        </div>

        <div className={s.ouvertureImage} aria-hidden="true">
          <div className={s.orbites}>
            <i />
            <i />
            <i />
          </div>
          <PhotoOrdi
            media={images[0].media}
            dossier={images[0].dossier}
            sizes="54vw"
            priorite
            className={s.ouverturePhoto}
            position={images[0].position}
          />
          <div className={s.sceau}>
            <span>Le sur-mesure</span>
            <strong>
              à partir
              <br />
              de {MAISON.prixDepart}
            </strong>
            <small>Retouches · incluses</small>
          </div>
          <span className={s.repere}>MADAMOON / GUIDE / 01</span>
        </div>

        <div className={s.ouverturePied} aria-hidden="true">
          <span>Une robe, votre histoire</span>
          <span>01 — {deux(total)}</span>
        </div>
      </header>

      {/* ———————————————————————————————— la réponse courte ————— */}
      <section className={`gouttiere ${s.reponseBord}`}>
        <div className={`rounded-[4px] p-[clamp(1.5rem,3.5vw,3rem)] ${s.reponse}`}>
          <h2 className={`phrase ${s.reponseQuestion}`}>{guide.q}</h2>
          <p className={`texte mesure-l mt-4 ${s.reponseTexte}`}>{guide.r}</p>
        </div>
      </section>

      {/* —————————————————————————————————————— les chapitres ————— */}
      <div id="lecture" className={`gouttiere py-[clamp(3rem,6vw,5.5rem)] ${s.corps}`}>
        <article>
          {guide.sections.map((sec, i) => {
            const mise = MISES[i % MISES.length];
            const dernier = i === total - 1;
            const Liste = sec.ordonnee ? "ol" : "ul";
            const [a, b] = mise === "cercle" ? [sec.titre, ""] : couper(sec.titre);
            const chiffre = i === 0 ? guide.chiffre : undefined;
            /* Une photographie n'est prise dans la liste que si elle sert. */
            const image = mise === "phrase" || chiffre ? undefined : suivante();
            return (
              <section
                key={sec.titre}
                className={`${i === 0 ? "" : "mt-[clamp(2.5rem,4.5vw,3.5rem)]"} ${s.chapitre} ${s[mise]}`}
              >
                {mise !== "phrase" && (
                  <div className={s.visuel} aria-hidden="true">
                    {chiffre ? (
                      <div className={s.chiffre}>
                        <span>{chiffre.avant}</span>
                        <strong>{chiffre.valeur}</strong>
                        <b>{chiffre.apres}</b>
                      </div>
                    ) : (
                      image && (
                        <PhotoOrdi
                          media={image.media}
                          dossier={image.dossier}
                          sizes={mise === "cercle" ? "24vw" : "50vw"}
                          className={s.visuelPhoto}
                          position={image.position}
                        />
                      )
                    )}
                    {mise === "cercle" && <div className={s.anneau} />}
                    {mise === "photo" && <span className={s.repere}>MADAMOON · {deux(i + 1)}</span>}
                  </div>
                )}
                <div className={s.copie}>
                  <div className={s.numero} aria-hidden="true">
                    <span>{deux(i + 1)}</span>
                    <span>sur {deux(total)}</span>
                  </div>
                  <h2 className={`phrase ${s.intertitre}`} style={mesure(a, b)}>
                    <span className={s.ligne}>{a}</span>
                    {b && (
                      <>
                        {" "}
                        <span className={`${s.ligne} ${s.italique}`}>{b}</span>
                      </>
                    )}
                  </h2>
                  <span className={s.filet} aria-hidden="true" />
                  <div className={s.texteBloc}>
                    {sec.texte.map((p) => (
                      <p key={p} className="texte mesure-l mt-4">
                        {p}
                      </p>
                    ))}
                    {sec.liste && (
                      <Liste className={`mt-5 flex max-w-[48ch] flex-col ${s.liste}`}>
                        {sec.liste.map((item, j) => (
                          <li key={item} className="texte flex gap-4 border-t border-fil py-3">
                            <span
                              aria-hidden="true"
                              className={`legende shrink-0 pt-[0.35em] tabular-nums ${sec.ordonnee ? "" : s.tiret}`}
                            >
                              {sec.ordonnee ? deux(j + 1) : "—"}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </Liste>
                    )}
                    {dernier && (
                      <div className={s.rendezvousOrdi}>
                        <AppelRendezvous className="bouton">{L.prendreRendezvous}</AppelRendezvous>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </article>

        {/* ————————————————————————————————————— à retenir ————— */}
        <aside className={`mt-12 ${s.retenir}`}>
          <div className={`border-t pt-5 ${s.retenirBloc}`}>
            <div className={s.numero} aria-hidden="true">
              <span>{deux(total + 1)}</span>
              <span>À garder en tête</span>
            </div>
            <h2 className={`legende ${s.retenirTitre}`}>{L.aRetenir}</h2>
            <ul className={`mt-4 flex flex-col gap-3 ${s.retenirListe}`}>
              {guide.aRetenir.map((x, i) => (
                <li key={x} className={`texte flex gap-3 ${s.retenirLigne}`}>
                  <span aria-hidden="true" className={s.tiret}>
                    —
                  </span>
                  <span aria-hidden="true" className={s.rang}>
                    {deux(i + 1)}
                  </span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <AppelRendezvous className={`bouton mt-7 ${s.rendezvousDoigt}`}>{L.prendreRendezvous}</AppelRendezvous>
          </div>

          <div className={`mt-10 border-t border-fil pt-5 ${s.plusLoin}`}>
            <h2 className="legende">{L.pourAllerPlusLoin}</h2>
            <ul className={`mt-4 flex flex-col gap-2 ${s.plusLoinListe}`}>
              {guide.liens.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="texte lien-texte">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* ———————————————————————————————— les autres guides ————— */}
      {autres.length > 0 && (
        <nav
          aria-labelledby="autres-questions"
          className={`gouttiere border-t border-fil py-[clamp(3rem,6vw,5rem)] ${s.autres}`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
            <h2 id="autres-questions" className={`titre-section ${s.autresTitre}`}>
              {L.lesAutresQuestions}
            </h2>
            <Link href={retour.href} className="lien-nav souligne text-action">
              {retour.label}
            </Link>
          </div>
          <ol className="mt-6 grid gap-x-[clamp(1.5rem,4vw,4rem)] md:grid-cols-2">
            {autres.map((g, i) => (
              <li key={g.slug} className="border-t border-fil">
                <Link
                  href={`/guides/${g.slug}`}
                  className="texte flex items-baseline gap-4 py-3 transition-colors duration-300 hover:text-action"
                >
                  <span className="legende shrink-0 tabular-nums">{deux(i + 1)}</span>
                  <span className="lien-texte">{g.titre}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* ————————————————————————————————————— la sortie ————— */}
      <section className={`gouttiere pb-[clamp(3rem,6vw,5.5rem)] ${s.sortie}`}>
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

      <div className={s.fin} aria-hidden="true">
        <span>Le moment vous appartient</span>
        <span>MADAMOON · Paris 10ᵉ</span>
      </div>
    </div>
  );
}
