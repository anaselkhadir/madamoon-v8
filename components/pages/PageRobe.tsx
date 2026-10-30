import Link from "@/components/Lien";
import { notFound } from "next/navigation";
import Photo from "@/components/media/Photo";
import Galerie from "@/components/robe/Galerie";
import Film from "@/components/media/Film";
import Tuile from "@/components/Tuile";
import Catalogue from "@/components/Catalogue";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import TitreSection from "@/components/TitreSection";
import {
  ROBES,
  FAMILLES,
  MAISON,
  MORPHOLOGIES,
  SITE_URL,
  createurParNom,
  SEMI_MESURE,
} from "@/lib/madamoon";
import { FILMS } from "@/lib/films";
import { SCENES, vues } from "@/lib/medias";
import { coupe, PLURIEL } from "@/lib/coupes";
import { stylesDe } from "@/lib/styles";
import { altRobe } from "@/lib/alt";
import { de } from "@/lib/francais";
import { CoeurFiche } from "@/components/parcours/Coeur";
import { epingleRobe, offreRobe } from "@/lib/schema";

import type { Langue } from "@/lib/langue";
import { versLangue } from "@/lib/langue";
import { t } from "@/lib/textes";
import {
  bas,
  coupeNom,
  familleTexte,
  initiale,
  coupePluriel,
  createurNote,
  maison,
  morphoNom,
  robeLigne,
  robeRegard,
} from "@/lib/contenu";
import { couverture } from "@/lib/couverture";
import FilDAriane from "@/components/FilDAriane";

/*
 * La fiche d'une robe, dans les deux langues.
 *
 * Une seule page pour le français et l'anglais : la route passe la
 * langue, tout le reste est commun. Une fiche recopiée aurait divergé
 * au premier ajout.
 */

export default async function PageRobe({
  params,
  langue,
}: {
  params: Promise<{ slug: string }>;
  langue: Langue;
}) {
  const L = t(langue);
  const M = maison(langue);
  const { slug } = await params;
  const robe = ROBES.find((r) => r.slug === slug);
  if (!robe) notFound();

  const photos = vues(robe.slug);
  const film = FILMS[robe.slug];
  const maisonDeLaRobe = createurParNom(robe.createur);
  /* L'image de tête : sa couverture. */
  const tete = couverture(robe);
  /*
   * Les robes dont la photographie ne fait pas un premier écran.
   *
   * Le premier écran occupe toute la largeur : une photographie de moins
   * de mille deux cents pixels y est agrandie du double et devient molle.
   * Elle reste au fond — le voile sombre la tient, et la barre de
   * navigation a besoin d'une image sous elle pour rester blanche — mais
   * on en pose une seconde à droite, à sa taille vraie, nette.
   */
  const petiteTete = !film && !!tete && tete.w < 1200;
  /*
   * La galerie montre toutes les photographies, sans exception.
   *
   * La couverture en était retirée, au motif qu'on venait de la voir au
   * premier écran. Mais le premier écran ne la montre pas : il la
   * recadre en bandeau — une verticale de deux mille sur trois mille y
   * perd les deux tiers de sa hauteur, et il n'en reste qu'un corsage.
   * La retirer revenait donc à cacher une photographie pour de bon,
   * et sur une robe qui n'en a que deux, à n'en montrer qu'une.
   *
   * Une exception avait d'abord été gardée pour les petites têtes,
   * reprises entières dans le cadre de droite. Riviera l'a démentie :
   * deux photographies, et une seule dans sa galerie. Le cadre de
   * droite appartient au premier écran, pas à la galerie — on ne
   * demande pas à une cliente de remonter pour voir une photographie
   * qu'elle cherche en bas. Deux apparitions valent mieux qu'une
   * absence.
   */
  const galerie = photos;

  /* Le regard, et le corps qu'il demande : voir plus bas, au rendu. */
  const regard = robeRegard(robe, langue);
  const corpsDuRegard =
    regard.length > 520 ? "est-longue" : regard.length > 260 ? "est-moyenne" : "";
  const famille = coupe(robe.categorie);
  const servies = robe.morphos ?? [];
  const voisines = ROBES.filter(
    (r) => r.categorie === robe.categorie && r.slug !== robe.slug,
  ).slice(0, 3);

  const donnees = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${L.pied.robeDeMariee} ${robe.nom}`,
    description: `${robeLigne(robe, langue)}. ${robeRegard(robe, langue)}`,
    url: `${SITE_URL}${versLangue(`/robes/${robe.slug}`, langue)}/`,
    brand: { "@type": "Brand", name: robe.createur ?? MAISON.nom },
    category: `${L.pied.robeDeMariee} ${coupeNom(robe.categorie, langue).toLowerCase()}`,
    image: photos.map(
      (p) =>
        `${SITE_URL}/robes/${p.name}-${p.widths[p.widths.length - 1]}.webp`,
    ),
    /* La robe est vendue par la maison, et seulement par elle. Le vendeur
     * est désigné par l'identité déclarée dans le gabarit : c'est ce qui
     * relie chaque modèle au showroom du dixième. */
    offers: offreRobe(robe.slug, versLangue(`/robes/${robe.slug}`, langue)),
  };

  const epingle = epingleRobe({
    slug: robe.slug,
    nom: robe.nom,
    ligne: robeLigne(robe, langue),
    regard: robeRegard(robe, langue),
    createur: robe.createur,
    media: tete,
    alt: altRobe(robe, langue),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <FilDAriane
        langue={langue}
        rangs={[
          { nom: L.barre.robes, adresse: "/robes" },
          { nom: robe.nom, adresse: `/robes/${robe.slug}` },
        ]}
      />

      {/*
       * L'épingle Pinterest.
       *
       * Écrites ici plutôt que par l'API de Next : celle-ci ne sait pas
       * produire « og:type: product », et n'émet ses balises qu'avec
       * « name » là où le protocole demande « property ». React les
       * remonte dans l'en-tête depuis n'importe où dans l'arbre.
       *
       * Le prix est le plancher. La description dit « à partir de »,
       * parce qu'une épingle n'affiche qu'un nombre et qu'un nombre seul
       * se lirait comme un prix ferme.
       */}
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content={MAISON.nom} />
      {/* La langue et l'adresse sont celles de la page, et non celles du
        * français : la fiche anglaise annonçait « fr_FR » et l'adresse
        * française, en contradiction avec son propre canonique. Partagée,
        * elle ouvrait la version française. */}
      <meta property="og:locale" content={langue === "fr" ? "fr_FR" : "en_GB"} />
      <meta
        property="og:url"
        content={`${SITE_URL}${versLangue(`/robes/${robe.slug}`, langue)}/`}
      />
      <meta property="og:title" content={epingle.titre} />
      <meta property="og:description" content={epingle.description} />
      {epingle.image && (
        <>
          <meta property="og:image" content={epingle.image.url} />
          <meta property="og:image:secure_url" content={epingle.image.url} />
          <meta property="og:image:type" content="image/jpeg" />
          <meta
            property="og:image:width"
            content={String(epingle.image.largeur)}
          />
          <meta
            property="og:image:height"
            content={String(epingle.image.hauteur)}
          />
          <meta property="og:image:alt" content={epingle.image.alt} />
        </>
      )}
      <meta property="product:price:amount" content={String(epingle.prix)} />
      <meta property="product:price:currency" content="EUR" />
      <meta property="product:availability" content="in stock" />
      <meta property="product:condition" content="new" />
      <meta property="product:retailer_item_id" content={epingle.reference} />
      <meta
        property="product:category"
        content={`${L.pied.robeDeMariee} ${coupeNom(robe.categorie, langue).toLowerCase()}`}
      />
      {epingle.marque && (
        <meta property="product:brand" content={epingle.marque} />
      )}

      {/* ————————————————————————————— le premier écran —————
       * L'image plein cadre, et le nom posé dedans. Inchangé : c'est
       * l'entrée en matière du site, et elle fonctionne. */}
      <section className="relative h-[92svh] min-h-[32rem] overflow-hidden">
        {film ? (
          <Film
            src={film.src}
            srcMobile={film.srcMobile}
            affiche={SCENES[film.affiche]}
            alt={altRobe(robe, langue)}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          tete && (
            <Photo
              media={tete}
              dossier="robes"
              alt={altRobe(robe, langue)}
              sizes="100vw"
              priorite
              position="50% 30%"
              /* Sur les petites photographies, le fond est flouté à
                * dessein : agrandi du double il était mou de toute façon,
                * et un flou assumé se lit comme une matière quand une
                * image molle se lit comme un défaut. L'échelle évite la
                * frange claire que le flou creuse sur les bords.
                *
                * Seulement là où la photographie nette est posée à
                * droite, c'est-à-dire à partir de mille vingt-quatre
                * pixels. Sous le pouce elle n'y est pas : flouter le fond
                * n'aurait laissé que le flou. */
              className={`absolute inset-0 h-full w-full object-cover ${
                petiteTete ? "lg:scale-105 lg:blur-[7px]" : ""
              }`}
            />
          )
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(95deg, rgba(0,0,0,0.44) 0%, rgba(0,0,0,0.16) 46%, rgba(0,0,0,0) 76%)",
          }}
        />
        {/* Le voile du haut, celui des autres premiers écrans : la
          * barre de navigation s'y pose maintenant, et son sigle est
          * blanc. Sans lui, il tombait sur du tissu clair. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.14) 45%, rgba(0,0,0,0) 100%)",
          }}
        />
        {/* Le second voile, du bas vers le haut, et seulement sous le
          * pouce : le texte y descend, et il descend sur du gravier
          * clair. Le voile latéral, calculé pour une colonne de gauche,
          * n'y suffisait plus. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.66) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 56%)",
          }}
        />
        {/* La photographie à sa taille vraie, posée à droite. Elle ne
          * paraît que sur les robes dont l'image est trop petite pour un
          * plein écran, et seulement là où il y a la place : sous le
          * pouce, le fond suffit. Décorative — le fond porte déjà le
          * texte de remplacement. */}
        {petiteTete && tete && (
          <div className="absolute inset-y-0 right-[var(--gouttiere)] hidden items-center max-lg:hidden lg:flex">
            {/* Un liseré blanc autour, comme la marge d'un tirage. Le
              * blanc est celui des textes posés sur une image et non
              * celui des surfaces : une surface s'assombrit avec le
              * thème, le cadre d'une photographie non. */}
            <span aria-hidden="true" className="block bg-sur-image p-[clamp(0.5rem,0.7vw,0.75rem)]">
              <span className="block" style={{ height: `min(64svh, ${tete.h}px)` }}>
                <Photo
                  media={tete}
                  dossier="robes"
                  alt=""
                  sizes="28vw"
                  /* Sans priorité, donc chargée paresseusement : sous le
                    * pouce le cadre est masqué, et une image pressée y
                    * aurait été téléchargée pour rien. */
                  className="block h-full w-auto"
                />
              </span>
            </span>
          </div>
        )}

        {/*
          * Sur petit écran le bloc se range en bas plutôt qu'au milieu.
          * Centré, il tombait en travers de la robe — le buste, la
          * coupe, tout ce que la visiteuse est venue voir. En bas, il
          * laisse la photographie entière au-dessus de lui.
          */}
        <div className="gouttiere absolute inset-0 flex flex-col justify-center max-md:justify-end max-md:pb-[clamp(2rem,7vw,3rem)]">
          <div className={`max-md:max-w-full ${petiteTete ? "max-w-[46vw]" : "max-w-[52vw]"}`}>
            <p className="mention text-sur-image/85">
              {coupeNom(robe.categorie, langue)}
              {maisonDeLaRobe && (
                <>
                  {" — "}
                  <Link href={`/createurs/${maisonDeLaRobe.slug}`} className="souligne">
                    {robe.createur}
                  </Link>
                </>
              )}
            </p>
            <h1 className="affiche mt-3 text-sur-image">{robe.nom}</h1>
            <p className="accroche mt-5 text-sur-image">
              {robeLigne(robe, langue)}
            </p>
            {/* Les trois sur une seule ligne, toujours : l'essayage
              * garde son intitulé, les deux autres tiennent dans leur
              * cercle. Le retour à la ligne cassait le rang et poussait
              * le cœur sous la photographie. */}
            <div className="mt-6 flex flex-wrap items-center gap-3 max-md:flex-nowrap max-md:gap-2">
              <AppelRendezvous robe={robe.slug} className="bouton-clair essentiel">
                {L.fiche.essayer}
              </AppelRendezvous>
              <Catalogue intitule={robe.nom} contexte={`robe:${robe.slug}`} langue={langue} pastille />
              {/* Le coup de cœur, au même rang : c'est le geste que l'on
               * fait avant de savoir si l'on prendra rendez-vous. */}
              <CoeurFiche slug={robe.slug} nom={robe.nom} pastille />
            </div>
          </div>
        </div>
      </section>

      {/* ————————————————————————————— la fiche ————— */}
      <section
        aria-labelledby="fiche"
        className="gouttiere pb-[clamp(3rem,6vw,6rem)] pt-[clamp(3rem,5.5vw,5rem)]"
      >
        <h2 id="fiche" className="sr-only">
          {L.fiche.laFiche} {langue === "fr" ? de(robe.nom) : robe.nom}
        </h2>

        {/* La description, à la taille d'une phrase et posée au milieu.
          * Les fiches de la maison sont passées d'une ligne à un
          * paragraphe : calé à gauche dans une colonne étroite, un texte
          * de dix lignes penchait la page d'un côté. Centré, il tient
          * debout tout seul, comme la présentation de l'accueil.
          *
          * La mesure ne bouge pas — quarante-huit caractères : sans elle,
          * un texte centré s'étale et devient une bannière. */}
        {/* Le corps du regard suit sa longueur.
          *
          * « .phrase » est une voix de titre : à deux rems et quart, elle
          * porte les deux lignes de Fern. Les mots que la maison a
          * écrits pour ses dernières robes en font neuf cents — Santana,
          * River, Mira, Seraphina — et au même corps, cela fait un mur.
          *
          * Deux paliers, donc, sur deux seuils tirés de la mesure des
          * soixante-sept descriptions : quarante restent courtes, treize
          * passent au palier moyen, quatorze au petit. La longueur est
          * prise sur le texte de la langue affichée, l'anglais n'ayant
          * pas celle du français. */}
        <span data-ligne className="mb-[clamp(2.5rem,5vw,4rem)] block">
          <p className={`phrase ${corpsDuRegard} mesure-l mx-auto text-center`}>{regard}</p>
        </span>

        <dl className="grid gap-x-[clamp(2rem,5vw,5rem)] border-t border-fil md:grid-cols-2">
          {/* Les silhouettes. La seule ligne qui ne soit pas un
           * renseignement — et la seule qui réponde à la question que
           * l'on se pose devant une robe. */}
          {servies.length > 0 && (
            <div className="border-b border-fil py-6 md:col-span-2">
              <dt className="legende">{L.fiche.silhouettes}</dt>
              <dd className="mt-4">
                <ul className="flex flex-wrap items-baseline gap-x-[clamp(1rem,2.4vw,2rem)] gap-y-3">
                  {MORPHOLOGIES.map((m) => {
                    const servie = servies.includes(m.lettre);
                    return (
                      <li key={m.lettre}>
                        {servie ? (
                          <Link
                            href={`/morphologies/${m.lettre.toLowerCase()}`}
                            className="block font-serif text-[clamp(1.5rem,2.8vw,2.25rem)] leading-none text-encre transition-colors duration-500 hover:text-action"
                          >
                            {m.lettre}
                            <span className="sr-only">
                              {" "}
                              — {morphoNom(m, langue)}
                            </span>
                          </Link>
                        ) : (
                          <span
                            aria-hidden="true"
                            className="block font-serif text-[clamp(1.5rem,2.8vw,2.25rem)] leading-none text-fil"
                          >
                            {m.lettre}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p className="texte mt-4">
                  {servies.length === MORPHOLOGIES.length
                      ? L.fiche.toutesSilhouettes
                      : L.fiche.silhouettesServies(servies.join(", "))}
                </p>
              </dd>
            </div>
          )}

          <div className="border-b border-fil py-5">
            <dt className="legende">{L.fiche.coupe}</dt>
            <dd className="texte mt-2">
              <Link href={`/coupes/${famille.ancre}`} className="souligne">
                {coupeNom(robe.categorie, langue)}
              </Link>
              {" — "}
              {initiale(familleTexte(robe.categorie, langue, FAMILLES[robe.categorie]), langue)}
            </dd>
          </div>

          {/* Le style, quand une page de style montre cette robe. */}
          {stylesDe(robe.slug).length > 0 && (
            <div className="border-b border-fil py-5">
              <dt className="legende">{L.fiche.style}</dt>
              {stylesDe(robe.slug).map((s) => (
                <dd key={s.href} className="texte mt-2">
                  <Link href={s.href} className="souligne">
                    {s.label[langue]}
                  </Link>
                </dd>
              ))}
            </div>
          )}

          {robe.createur && (
            <div className="border-b border-fil py-5">
              <dt className="legende">{L.fiche.maison}</dt>
              <dd className="texte mt-2">
                {maisonDeLaRobe ? (
                  <Link href={`/createurs/${maisonDeLaRobe.slug}`} className="souligne">
                    {robe.createur}
                  </Link>
                ) : (
                  robe.createur
                )}
              </dd>
            </div>
          )}

          <div className="border-b border-fil py-5">
            <dt className="legende">{L.fiche.confection}</dt>
            <dd className="texte mt-2">
              {robe.createur === SEMI_MESURE ? L.fiche.semiMesure : L.fiche.surMesure}
            </dd>
          </div>

          {/* Pas de prix sur la fiche d'une robe. « À partir de 1 500 € »
            * est le plancher de la maison, pas celui du modèle montré —
            * posé sous une photographie, il se lisait comme le prix de
            * cette robe-là. Le plancher reste dit là où il parle de la
            * maison : le bandeau de l'accueil, Élise. */}
        </dl>
      </section>

      {/* ————————————————————————————— les autres vues —————
        * La galerie est passée côté client : chaque vue s'ouvre en grand
        * au clic, et une fenêtre a besoin d'un état, d'un clavier et
        * d'un focus. Les trois mises en page n'ont pas bougé d'un
        * pixel — elles ont suivi le composant, telles quelles.
        *
        * Le premier écran, lui, ne s'ouvre pas : c'est un bandeau, et
        * la maison l'a exclu. Sa photographie est de toute façon dans
        * la galerie, où elle s'ouvre comme les autres. */}
      <Galerie
        photos={galerie}
        alts={galerie.map((p) => altRobe(robe, langue, photos.indexOf(p) + 1))}
        etiquette={L.fiche.autresVues(robe.nom)}
        agrandir={L.fiche.agrandir}
        libelles={{
          titre: L.fiche.vuesDe(robe.nom),
          fermer: L.fiche.fermerVue,
          precedente: L.fiche.vuePrecedente,
          suivante: L.fiche.vueSuivante,
          rangs: galerie.map((_, i) => L.fiche.rangDeLaVue(i + 1, galerie.length)),
        }}
      />

      {/*
       * La bande « … vous attend au showroom » est retirée.
       *
       * Le rendez-vous est déjà proposé trois fois sur cette page : sur
       * la photographie d'ouverture, dans la barre de navigation, et
       * dans la carte qui suit le défilement. Une quatrième invitation
       * n'ajoutait rien, sinon un écran de craie entre les
       * photographies et les robes voisines. Le numéro se lit dans le
       * bandeau et au pied de page.
       */}

      {/* ————————————————————————————— les voisines ————— */}
      {voisines.length > 0 && (
        <section aria-labelledby="voisines">
          <TitreSection
            id="voisines"
            titre={L.fiche.memeFamille}
            lien={{
              href: `/coupes/${famille.ancre}`,
              label: L.fiche.toutesLes(coupePluriel(robe.categorie, langue)),
            }}
          />
          <div className="gouttiere pb-[clamp(3rem,5.5vw,5rem)]">
            <div className="trame-tuiles grid-cols-2 md:grid-cols-3">
              {voisines.map((v, i) => {
                const media = couverture(v);
                if (!media) return null;
                return (
                  <Tuile
                    key={v.slug}
                    retard={i * 70}
                    href={`/robes/${v.slug}`}
                    coupDeCoeur={v.slug}
                    media={media}
                    dossier="robes"
                    alt={altRobe(v, langue)}
                    nom={v.nom}
                    sizes="(max-width: 768px) 50vw, 31vw"
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
