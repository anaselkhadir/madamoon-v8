import Link from "@/components/Lien";
import Photo from "@/components/media/Photo";
import RailFleches from "@/components/accueil/RailFleches";
import RailSouris from "@/components/accueil/RailSouris";
import { AUTRES_CREATEURS, CREATEURS, MAISON, ROBES, estEnVedette } from "@/lib/madamoon";
import { SCENES, VIGNETTES_CREATEURS, vues } from "@/lib/medias";
import { altRobe } from "@/lib/alt";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { createurNote, createurOrigine } from "@/lib/contenu";
import { FILMS } from "@/lib/films";
import CarteMaisons, { type MaisonCarte } from "@/components/accueil/CarteMaisons";

/*
 * Les créateurs.
 *
 * Le texte à gauche, la carte rouge des maisons à droite : une pastille
 * par maison, qui s'ouvre sur sa fiche et passe l'image à son film
 * (CarteMaisons.tsx).
 *
 * Sur ordinateur seulement, à la demande de la maison (3 novembre
 * 2026) : la carte y remplace la bande de photographies des maisons, et
 * ses liens « Voir la maison » mènent aux mêmes pages. Au doigt et sur
 * tablette, rien ne change : pas de carte, et la bande d'avant, un rail
 * que l'on pousse et qui s'arrête sur chaque maison.
 *
 * Pas de respiration en bas, et c'est voulu : la section des avis, qui
 * suit, ouvre sur la sienne, et les deux ensemble doubleraient le blanc
 * de toutes les autres jonctions de l'accueil.
 */

export default function Createurs({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  /* Les maisons nommées, puis les petits ateliers réunis sous une seule
   * vignette : la boutique ne veut pas les désigner à la concurrence.
   * La vignette mène à leur page, qui les rassemble sans les nommer. */
  const collective = CREATEURS.find((c) => c.nom === AUTRES_CREATEURS);
  const ouvertureDiscrete = (() => {
    if (!collective) return null;
    const robe = ROBES.find((r) => r.slug === collective.ouverture.robe);
    const media = robe ? vues(robe.slug)[collective.ouverture.vue - 1] : undefined;
    return robe && media ? { robe, media } : null;
  })();

  const maisons = CREATEURS.filter((c) => estEnVedette(c.slug)).map((c) => {
    /* La photographie choisie par la maison pour sa vignette, sinon celle
     * qui ouvre sa page. */
    const choix = c.vignette ?? c.ouverture;
    const robe = ROBES.find((r) => r.slug === choix.robe);
    const media = !robe
      ? undefined
      : c.vignette && !c.vignette.vue
        ? VIGNETTES_CREATEURS[c.slug]
        : vues(robe.slug)[(choix.vue ?? 1) - 1];
    return robe && media ? { c, robe, media } : null;
  }).filter(Boolean) as {
    c: (typeof CREATEURS)[number];
    robe: (typeof ROBES)[number];
    media: ReturnType<typeof vues>[number];
  }[];

  /* La carte rouge : une pastille par maison, son film quand la maison
   * en possède un, sinon la photographie d'ouverture de sa page. */
  const carte: MaisonCarte[] = CREATEURS.flatMap((c) => {
    const robe = ROBES.find((r) => r.slug === c.ouverture.robe);
    if (!robe) return [];
    const film = FILMS[robe.slug];
    const photo = vues(robe.slug)[c.ouverture.vue - 1];
    const plan: MaisonCarte["plan"] | null = film
      ? { type: "film", src: film.src, affiche: SCENES[film.affiche] }
      : photo
        ? { type: "photo", media: photo }
        : null;
    if (!plan) return [];
    return [
      {
        slug: c.slug,
        nom: c.nom === AUTRES_CREATEURS ? L.createurs.autres : c.nom,
        origine: createurOrigine(c, langue),
        note: createurNote(c, langue),
        plan,
        alt: altRobe(robe, langue),
      },
    ];
  });
  /* Le film d'ouverture, tout fermé : l'escalier, celui d'Addison. */
  const ouvertureCarte = (() => {
    const robe = ROBES.find((r) => r.slug === "addison");
    const film = FILMS.addison;
    return robe && film ? { src: film.src, affiche: SCENES[film.affiche], alt: altRobe(robe, langue) } : null;
  })();

  if (maisons.length === 0) return null;

  return (
    <section
      aria-labelledby="createurs"
      className="bg-blanc pt-[clamp(4rem,8vw,8rem)]"
    >
      <div className="gouttiere grid gap-x-[clamp(2rem,4vw,4rem)] gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
        <p className="legende">{L.createurs.legende}</p>
        <span data-ligne className="mt-4 block">
          <h2 id="createurs" className="phrase">
            {L.createurs.titre}
          </h2>
        </span>
        <p className="texte texte-a-cote mesure-l mt-4">{L.createurs.lieux}</p>
        {/* Le texte de la maison, envoyé le 3 novembre 2026 : d'où
          * viennent les robes, la confection à vos mesures, le prix de
          * départ. Français seulement. */}
        {langue === "fr" && (
          <div className="texte texte-a-cote mesure-l mt-4">
            <p>
              Chez MADAMOON, chaque robe est choisie avec une attention particulière, auprès de créateurs reconnus pour leur élégance et leur savoir-faire. Notre sélection réunit les univers de Watters Designs, Casablanca Bridal, Olya Mak et Monica Loretti, ainsi que quelques ateliers indépendants soigneusement sélectionnés.
            </p>
            <p className="mt-4">
              Parce que chaque future mariée mérite une robe qui lui ressemble, le modèle que vous aurez choisi est confectionné à vos mesures et délicatement ajusté pour épouser votre silhouette.
            </p>
            <p className="mt-4">
              Nos créations sont proposées à partir de <strong className="font-medium text-encre">{MAISON.prixDepart}</strong>, retouches comprises, pour vous offrir une expérience où chaque détail compte.
            </p>
          </div>
        )}
        </div>

        {ouvertureCarte && carte.length > 0 && (
        <div className="min-h-[clamp(26rem,38vw,34rem)] max-lg:hidden lg:col-span-7">
          <CarteMaisons
            maisons={carte}
            ouverture={ouvertureCarte}
            textes={{ legende: L.createurs.carteLegende, voir: L.createurs.carteVoir, liste: L.createurs.carteListe }}
          />
        </div>
        )}
      </div>

      {/* La bande. Elle déborde volontairement à droite : c'est ce débord
        * qui donne sa course à la dérive. */}
      {/* Les flèches encadrent le rail, à droite et à gauche : plus
        * claires pour les mariées que groupées au-dessus. */}
      <div className="relative mt-[clamp(2.5rem,5vw,4rem)] lg:hidden">
        <RailFleches cible="rail-createurs" quoi="createurs" cotes />
        <div
          id="rail-createurs"
          className="rail flex snap-x snap-mandatory scroll-pl-[var(--gouttiere)] gap-[clamp(1rem,2.2vw,2rem)] overflow-x-auto px-[var(--gouttiere)] pb-2"
        >
          {maisons.map(({ c, robe, media }, i) => (
            <figure
              key={c.slug}
              className="w-[min(68vw,20rem)] flex-none snap-start lg:w-[clamp(13rem,22vw,20rem)]"
            >
              <Link href={`/createurs/${c.slug}`} className="group block">
                <div className="aspect-[5/7] overflow-hidden">
                  <Photo
                    media={media}
                    dossier="robes"
                    alt={altRobe(robe, langue)}
                    sizes="(max-width: 768px) 68vw, 20vw"
                    priorite={i < 2}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-doux)] group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-4">
                  <span className="block font-serif text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-tight text-encre transition-colors duration-700 group-hover:text-action">
                    {c.nom}
                  </span>
                  <span className="legende mt-2 block text-brume">{createurOrigine(c, langue)}</span>
                </figcaption>
              </Link>
            </figure>
          ))}

          {/* Les ateliers discrets, sous un seul nom. La photographie
            * est celle de l'un d'eux : elle montre le travail sans le
            * signer. */}
          {ouvertureDiscrete && (
            <figure className="w-[min(68vw,20rem)] flex-none snap-start lg:w-[clamp(13rem,22vw,20rem)]">
              <Link href={`/createurs/${collective!.slug}`} className="group block">
                <div className="aspect-[5/7] overflow-hidden">
                  <Photo
                    media={ouvertureDiscrete.media}
                    dossier="robes"
                    alt={altRobe(ouvertureDiscrete.robe, langue)}
                    sizes="(max-width: 768px) 68vw, 20vw"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-doux)] group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-4">
                  <span className="block font-serif text-[clamp(1.0625rem,1.5vw,1.375rem)] leading-tight text-encre transition-colors duration-700 group-hover:text-action">
                    {L.createurs.autres}
                  </span>
                  <span className="legende mt-2 block text-brume">{L.createurs.autresNote}</span>
                </figcaption>
              </Link>
            </figure>
          )}
        </div>
      </div>
      {/* Au doigt et sur tablette seulement, comme la bande. */}
      <RailSouris cible="rail-createurs" />
    </section>
  );
}
