import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Entete from "@/components/layout/Entete";
import FilDAriane from "@/components/layout/FilDAriane";
import Rendezvous from "@/components/layout/Rendezvous";
import Photo from "@/components/media/Photo";
import Film from "@/components/media/Film";
import Rideau from "@/components/motion/Rideau";
import Ligne from "@/components/motion/Ligne";
import Fondu from "@/components/motion/Fondu";
import Tuile from "@/components/robe/Tuile";
import { ROBES, CREATEURS, FAMILLES, MAISON, SIGNATURES } from "@/content/madamoon";
import { vues, SCENES } from "@/content/medias";
import { couverture } from "@/content/couverture";
import { coupe } from "@/content/coupes";
import { FILMS } from "@/content/films";
import { altRobe } from "@/lib/alt";
import { JsonLd, robeSchema } from "@/lib/seo/schema";

/* Toutes les fiches sont générées à la compilation ; la navigation vers une
 * fiche attend son HTML plutôt qu'un squelette (pas de coquille vide). */
export const instant = false;

export function generateStaticParams() {
  return ROBES.map((r) => ({ slug: r.slug }));
}

function trouver(slug: string) {
  return ROBES.find((r) => r.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/robes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const robe = trouver(slug);
  if (!robe) return {};
  const maison = robe.createur && robe.createur !== "Autres créateurs" ? ` — ${robe.createur}` : "";
  const ligne = robe.ligne.charAt(0).toLowerCase() + robe.ligne.slice(1);
  const media = couverture(robe);
  return {
    title: `Robe de mariée ${robe.nom} — ${robe.categorie.toLowerCase()}${maison}`,
    description: `${robe.nom} : ${ligne}. À essayer sur rendez-vous au showroom MADAMOON, Paris 10e.`,
    alternates: { canonical: `/robes/${robe.slug}/` },
    openGraph: {
      url: `/robes/${robe.slug}/`,
      title: `Robe de mariée ${robe.nom}${maison}`,
      images: media ? [{ url: `/robes/${media.name}-1200.jpg`, width: 1200, height: Math.round((1200 * media.h) / media.w), alt: altRobe(robe) }] : undefined,
    },
  };
}

export default async function PageRobe({ params }: PageProps<"/robes/[slug]">) {
  const { slug } = await params;
  const robe = trouver(slug);
  if (!robe) notFound();

  const liste = vues(robe.slug);
  const principale = couverture(robe);
  const galerie = liste.filter((m) => m !== principale);
  const c = coupe(robe.categorie);
  const maison = CREATEURS.find((m) => m.nom === robe.createur);
  const film = FILMS[robe.slug];
  const memeCoupe = ROBES.filter((r) => r.slug !== robe.slug && r.categorie === robe.categorie).slice(0, 3);
  const memeMaison = robe.createur ? ROBES.filter((r) => r.slug !== robe.slug && r.createur === robe.createur && !memeCoupe.includes(r)).slice(0, 3) : [];
  const alt = altRobe(robe);

  const details: [string, string][] = [
    ["Coupe", `${robe.categorie} — ${FAMILLES[robe.categorie]}`],
    ...(maison ? [["Maison", `${maison.nom}, ${maison.origine}`] as [string, string]] : []),
    ["La ligne", robe.ligne],
    ...SIGNATURES.map((s) => [s.titre, s.texte] as [string, string]),
  ];

  return (
    <>
      <Entete />
      <main className="pt-entete">
        <div className="cadre pt-8"><FilDAriane rangs={[{ nom: "Robes", adresse: "/robes/" }, { nom: robe.categorie, adresse: `/coupes/${c.ancre}/` }, { nom: robe.nom, adresse: `/robes/${robe.slug}/` }]} /></div>

        {/* L'ouverture : la photographie en rideau, le texte collant à droite. */}
        <section className="cadre grille pt-10">
          <div className="md:col-span-7">
            {principale && (
              <Rideau immediat className="aspect-robe">
                <Photo media={principale} dossier="robes" alt={alt} sizes="(min-width: 768px) 56vw, 100vw" priorite className="h-full w-full object-cover" />
              </Rideau>
            )}
          </div>
          <div className="md:col-span-4 md:col-start-9 md:sticky md:top-[calc(var(--spacing-entete)+2rem)]">
            {maison && <p className="mention mb-4">{maison.nom} — {maison.origine}</p>}
            <Ligne as="h1" immediat delai={0.3} className="titre-1">Robe de mariée <em>{robe.nom}</em></Ligne>
            <p className="phrase mt-6 text-graphite">{robe.ligne}.</p>
            <dl className="legende mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              <dt className="text-brume">Coupe</dt><dd><Link href={`/coupes/${c.ancre}/`} className="lien">{robe.categorie}</Link></dd>
              {maison && (<><dt className="text-brume">Maison</dt><dd><Link href={`/createurs/${maison.slug}/`} className="lien">{maison.nom}</Link></dd></>)}
              <dt className="text-brume">Sur mesure</dt><dd>à partir de {MAISON.prixDepart}, retouches comprises</dd>
              <dt className="text-brume">Essayage</dt><dd>privé, sur rendez-vous, Paris 10ᵉ</dd>
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/rendez-vous/" className="bouton">Essayer cette robe</Link>
              <a href={MAISON.telephoneHref} className="lien text-[0.875rem]">{MAISON.telephone}</a>
            </div>
          </div>
        </section>

        {/* Le regard : ce que la maison dit de la robe. */}
        <section className="cadre section-courte grille">
          <p className="numero md:col-span-2">01</p>
          <Fondu className="md:col-span-8 md:col-start-3">
            <p className="phrase">{robe.regard}</p>
          </Fondu>
        </section>

        {/* Le film, quand la maison en possède un. */}
        {film && (
          <Rideau className="aspect-[4/5] md:aspect-film">
            <Film src={film.src} affiche={SCENES[film.affiche]} alt={alt} sizes="100vw" className="h-full w-full" />
          </Rideau>
        )}

        {/* La galerie : chaque vue en rideau, décalée, légende dans la marge. */}
        {galerie.length > 0 && (
          <section className="cadre section-courte" aria-label={`Photographies de ${robe.nom}`}>
            <div className="grille">
              {galerie.map((m, i) => {
                const large = i % 3 === 0;
                const debut = large ? "md:col-start-1" : i % 3 === 1 ? "md:col-start-7" : "md:col-start-3";
                return (
                  <figure key={m.name} className={`${large ? "md:col-span-7" : "md:col-span-5"} ${debut} ${i % 3 === 1 ? "md:-mt-32" : ""}`}>
                    <Rideau className="aspect-robe">
                      <Photo media={m} dossier="robes" alt={alt} sizes={large ? "(min-width: 768px) 56vw, 100vw" : "(min-width: 768px) 40vw, 100vw"} className="h-full w-full object-cover" />
                    </Rideau>
                    <figcaption className="mention mt-3">{robe.nom} — vue {i + 2}</figcaption>
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        {/* Les détails : une liste typographique. */}
        <section className="bg-ivoire">
          <div className="cadre section grille">
            <div className="md:col-span-4"><p className="numero mb-3">02</p><h2 className="titre-2">Les <em>détails</em></h2></div>
            <dl className="md:col-span-7 md:col-start-6">
              {details.map(([t, v], i) => (
                <Fondu key={t} delai={i * 0.06} className="filet grid grid-cols-1 gap-2 py-5 md:grid-cols-[12rem_1fr] md:gap-6">
                  <dt className="mention pt-1">{t}</dt><dd className="texte">{v}</dd>
                </Fondu>
              ))}
            </dl>
          </div>
        </section>

        {/* Dans la même coupe, de la même maison. */}
        {[{ titre: "Dans la même coupe", robes: memeCoupe, href: `/coupes/${c.ancre}/`, lien: `Toutes les robes ${c.nom.toLowerCase()}` },
          { titre: maison ? `De la même maison, ${maison.nom}` : "", robes: memeMaison, href: maison ? `/createurs/${maison.slug}/` : "", lien: maison ? `Toutes les robes ${maison.nom}` : "" }]
          .filter((b) => b.robes.length > 0)
          .map((b) => (
            <section key={b.titre} className="cadre section-courte" aria-labelledby={b.titre}>
              <div className="flex items-end justify-between gap-6">
                <h2 id={b.titre} className="titre-2">{b.titre}</h2>
                <Link href={b.href} className="lien hidden text-[0.875rem] md:inline">{b.lien}</Link>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-gouttiere sm:grid-cols-3">
                {b.robes.map((r) => (<Tuile key={r.slug} robe={r} sizes="(min-width: 640px) 30vw, 90vw" />))}
              </div>
            </section>
          ))}

        <Rendezvous titre={`Essayer ${robe.nom}.`} />
      </main>
      <JsonLd data={robeSchema(robe, robe.categorie.toLowerCase(), principale)} />
    </>
  );
}
