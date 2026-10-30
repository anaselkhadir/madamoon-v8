import Link from "@/components/Lien";
import Croquis from "@/components/morphologie/Croquis";
import { MORPHOLOGIES } from "@/lib/madamoon";
import { morphoNom, morphoSilhouette } from "@/lib/contenu";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Les morphologies.
 *
 * La section a montré une robe par morphologie. C'était une erreur, et
 * la maison l'a vue avant nous : une photographie posée au-dessus d'un
 * type de corps se lit comme une recommandation, et la robe qui ouvrait
 * le O n'est pas celle qu'on conseille à une cliente en O.
 *
 * Des croquis au trait à la place. Ils ne promettent rien, ils
 * décrivent, et ils se comparent d'un coup d'œil — ce qu'une rangée de
 * photographies ne permettait pas.
 *
 * Chacun est posé sur une carte, et la carte ne porte que le nom. La
 * silhouette ne paraît qu'au survol, sous la carte, dans une place qui
 * lui est gardée : rien ne bouge quand le texte arrive. Six descriptions posées
 * à plat se lisaient comme un formulaire ; il fallait pouvoir comparer
 * les dessins avant de lire.
 *
 * Sur ordinateur, les cartes tiennent en deux rangs de trois et le
 * texte de la section passe à leur droite. Sous mille vingt-quatre
 * pixels il reprend sa place au-dessus, et les descriptions restent
 * visibles : il n'y a pas de survol sous le pouce.
 */

export default function Morphologies({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  return (
    <section
      aria-labelledby="morphologies"
      className="relative z-10 bg-blanc pb-[clamp(3rem,6vw,6rem)] pt-[clamp(3rem,8vw,7rem)]"
    >
      <div className="gouttiere">
        {/* La colonne du texte est mesurée, celle des cartes prend tout
          * ce qui reste : les cartes remplissent leur zone d'un bord à
          * l'autre. C'est leur hauteur, non leur largeur, qui les avait
          * fait paraître énormes — d'où un cadre presque carré. */}
        {/*
          * Quatre blocs, dans deux ordres.
          *
          * Sur ordinateur, la colonne de gauche les empile — l'amorce, le
          * rappel, le lien — et les cartes tiennent la colonne de droite
          * sur toute la hauteur. Sous le seuil, tout se met en une
          * colonne et le rappel passe après les cartes : c'est une note
          * sur ce qu'on vient de voir, elle se lit mieux après qu'avant.
          *
          * Les « order » font ce déplacement, et le placement explicite
          * en lignes le défait au-delà du seuil : le texte n'est écrit
          * qu'une fois.
          */}
        <div className="grid gap-y-[clamp(1.5rem,3vw,2rem)] lg:grid-cols-[clamp(14rem,29vw,30rem)_minmax(0,1fr)] lg:items-start lg:gap-x-[clamp(2rem,3vw,3rem)] lg:gap-y-0">
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <p className="legende">{L.silhouette.legende}</p>
            <span data-ligne className="mt-4 block">
              <h2 id="morphologies" className="phrase">
                {L.silhouette.titre}
              </h2>
            </span>
            <p className="texte mesure-l mt-4">{L.silhouette.texte}</p>
          </div>

          {/* Le rappel des pages de morphologie : une piste, jamais une
            * règle. */}
          <p
            className="texte mesure-l order-3 text-[0.875rem] italic lg:order-none lg:col-start-1 lg:row-start-2 lg:mt-3"
            style={{ color: "var(--color-plomb)" }}
          >
            {L.silhouette.mention}
          </p>

          <div className="order-4 lg:order-none lg:col-start-1 lg:row-start-3 lg:pt-[clamp(1.5rem,2.5vw,2.25rem)]">
            <Link href="/morphologies" className="lien-nav souligne inline-block text-action">
              {L.silhouette.lien}
            </Link>
          </div>

          {/* ————— les cartes : deux rangs de trois ————— */}
          <ul
            /* Trois parts égales de la place disponible : les cartes la
              * remplissent d'un bord à l'autre. Sous le seuil, deux de
              * front — un téléphone n'a pas de place à perdre. */
            /* La largeur de la trame est écrite, et elle se cale à
              * droite : les cartes gardent une taille de vignette au lieu
              * de grandir avec l'écran, et le blanc qui reste passe entre
              * le texte et elles — non entre les cartes.
              *
              * « w » et non « max-w » : posée sur un élément de grille,
              * « ml-auto » lui retire son étirement, il se réduit alors à
              * son contenu et une largeur maximale ne le rattrape pas.
              *
              * Une seule valeur à bouger si elles doivent encore maigrir. */
            className="order-2 mt-[clamp(1rem,2vw,1.5rem)] grid min-w-0 grid-cols-2 gap-x-[clamp(0.625rem,1.1vw,1rem)] gap-y-[clamp(0.75rem,1.2vw,1rem)] sm:grid-cols-3 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:ml-auto lg:mt-0 lg:w-[clamp(28rem,50vw,52rem)] lg:max-w-full"
            data-suite
          >
            {MORPHOLOGIES.map((m) => (
              <li key={m.lettre}>
                <Link href={`/morphologies/${m.lettre.toLowerCase()}`} className="group block">
                  {/* L'enveloppe : sur ordinateur, elle a la taille de la
                    * carte, et c'est elle qui tient la description au bas
                    * du dessin. Sous le seuil, la description reprend sa
                    * place dessous et l'enveloppe grandit avec elle. */}
                  <div className="relative lg:overflow-hidden lg:rounded-[4px]">
                  {/* La carte. L'intitulé en tête — la lettre et le nom à
                    * gauche, le plus à droite, qui dit qu'il y a une page
                    * derrière —, et le dessin dessous. */}
                  {/* Quatre pixels d'angle : celui des boutons du site.
                    * Un arrondi plus ample faisait une vignette
                    * d'application au milieu d'une page qui n'en a
                    * aucune. */}
                  <div className="flex aspect-[8/9] flex-col rounded-[4px] bg-gris p-[clamp(0.75rem,1vw,1rem)] transition-colors duration-500 group-hover:bg-gris-appuye">
                    <span className="flex shrink-0 items-start justify-between gap-2">
                      {/* Le nom seul : la lettre le précédait, et « O
                        * Morphologie en O » la disait deux fois. */}
                      <span className="legende leading-tight transition-colors duration-500 group-hover:text-encre">
                        {morphoNom(m, langue)}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-fil text-plomb transition-colors duration-500 group-hover:border-action group-hover:text-action"
                      >
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </span>

                    {/* Le croquis se mesure en hauteur : la planche est
                      * haute et étroite — cinq cents sur douze cent un —,
                      * et une largeur imposée l'aurait fait déborder de
                      * la carte. */}
                    <span className="flex min-h-0 flex-1 items-center justify-center pt-2">
                      <Croquis
                        lettre={m.lettre}
                        className="h-full w-auto text-plume transition-colors duration-700 group-hover:text-action"
                      />
                    </span>
                  </div>

                  {/* La description. Sur ordinateur elle monte du bas de
                    * la carte, sur le dessin : plus rien n'est gardé
                    * dessous, et les deux rangs se touchent presque. Le
                    * dégradé la détache du trait sans poser un bandeau.
                    *
                    * Sous mille vingt-quatre pixels elle reprend sa place
                    * sous la carte et s'y lit toujours : il n'y a pas de
                    * survol sous le pouce. */}
                  <span
                    className="mt-2 block lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:bg-gradient-to-t lg:from-gris-appuye lg:from-55% lg:to-transparent lg:px-[clamp(0.75rem,1vw,1rem)] lg:pb-[clamp(0.75rem,1vw,1rem)] lg:pt-10 lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-focus-visible:opacity-100 lg:group-hover:opacity-100"
                  >
                    {/* La silhouette, et elle seule.
                      *
                      * La liste des coupes — « fluide, trapèze » — tenait
                      * sous chaque carte ; la maison l'a fait retirer. Et
                      * elle avait raison : six cartes qui répètent les
                      * mêmes quatre mots finissent par ne plus rien dire,
                      * et deux morphologies voisines se ressemblaient
                      * alors qu'elles se distinguent. La page de chaque
                      * morphologie les détaille, à sa place. */}
                    <span className="texte block text-[0.75rem] leading-[1.35]">
                      {morphoSilhouette(m, langue)}
                    </span>
                  </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
