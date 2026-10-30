import Link from "@/components/Lien";
import Photo from "@/components/media/Photo";
import RailFleches from "@/components/accueil/RailFleches";
import RailSouris from "@/components/accueil/RailSouris";
import { AUTRES_CREATEURS, CREATEURS, ROBES, estEnVedette } from "@/lib/madamoon";
import { VIGNETTES_CREATEURS, vues } from "@/lib/medias";
import { altRobe } from "@/lib/alt";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { createurOrigine } from "@/lib/contenu";

/*
 * Les créateurs.
 *
 * Une bande de maisons que l'on pousse. Elle a dérivé un temps au
 * défilement de la page — la bande avançait toute seule à mesure qu'on
 * descendait. La maison l'a trouvée déstabilisante, et elle avait
 * raison : un mouvement qu'on ne commande pas se subit.
 *
 * C'est donc un rail, comme celui des morphologies et comme sous le
 * pouce : on le tire, on le pousse aux flèches, il s'arrête sur chaque
 * maison. Le même geste partout, et rien qui bouge sans qu'on l'ait
 * voulu.
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


  if (maisons.length === 0) return null;

  /* Pas de respiration en bas, et c'est voulu.
   *
   * Cette section et celle des avis en portaient une pleine de part et
   * d'autre : quatre-vingt-deux pixels chacune au seuil de l'ordinateur,
   * soit cent soixante-quatre de blanc à leur jonction — le double de ce
   * que la page met partout ailleurs. La maison l'a vu.
   *
   * Le chiffre n'est pas choisi au jugé : toutes les autres jonctions de
   * l'accueil font quatre-vingt-deux pixels, celle-ci les fait
   * maintenant aussi. La respiration de la section suivante suffit à
   * les séparer.
   *
   * C'est le bas de celle-ci qui cède et non le haut de l'autre : la
   * section des avis ouvre sur ses étoiles, et les serrer contre ce qui
   * précède leur ôterait leur silence. */
  return (
    <section
      aria-labelledby="createurs"
      className="bg-blanc pt-[clamp(4rem,8vw,8rem)]"
    >
      <div className="gouttiere">
        <p className="legende">{L.createurs.legende}</p>
        <span data-ligne className="mt-4 block">
          <h2 id="createurs" className="phrase">
            {L.createurs.titre}
          </h2>
        </span>
        <p className="texte mesure-l mt-4">{L.createurs.lieux}</p>
      </div>

      {/* La bande. Elle déborde volontairement à droite : c'est ce débord
        * qui donne sa course à la dérive. */}
      {/* Les flèches encadrent le rail, à droite et à gauche : plus
        * claires pour les mariées que groupées au-dessus. */}
      <div className="relative mt-[clamp(2.5rem,5vw,4rem)]">
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
      <RailSouris cible="rail-createurs" />
    </section>
  );
}
