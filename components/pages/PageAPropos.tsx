import Photo from "@/components/media/Photo";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";
import FilDAriane from "@/components/FilDAriane";
import { MAISON, SITE_URL } from "@/lib/madamoon";
import { SCENES } from "@/lib/medias";
import { ID_MAISON } from "@/lib/schema";
import { maison } from "@/lib/contenu";
import { t } from "@/lib/textes";
import { versLangue, type Langue } from "@/lib/langue";

/*
 * L'histoire de MADAMOON.
 *
 * La page ne présentait la maison qu'en deux paragraphes. Mouna a écrit
 * son récit — la reconversion, le déclic, le lieu — et c'est lui qui
 * tient désormais la page, à la première personne.
 *
 * Un récit se lit d'un bout à l'autre, ce qui est le contraire d'une
 * fiche. Chaque chapitre prend donc une forme différente — photographie
 * pleine, bloc sombre, liste, phrase seule —, non pour varier mais pour
 * que l'œil sache où il en est : huit chapitres de même facture
 * s'effondrent en un mur de texte avant le troisième.
 *
 * Deux moments portent le reste, et ne portent que du texte : le nom,
 * qui se démonte sous les yeux de la lectrice, et la phrase « la bonne
 * robe est celle qui vous ressemble », qui est la thèse de la maison.
 * Aucune photographie ne les accompagne, et c'est délibéré.
 */

export default function PageAPropos({ langue }: { langue: Langue }) {
  const L = t(langue).pages.maisonPage;
  const M = maison(langue);

  /*
   * La fondatrice, déclarée.
   *
   * Une page qui raconte qui dirige la maison est exactement ce que les
   * moteurs cherchent pour juger de sa fiabilité. Encore faut-il le leur
   * dire : « worksFor » rattache Mouna à l'entité de la boutique, et
   * « mainEntity » dit que cette page parle d'elle.
   */
  const donnees = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}${versLangue("/a-propos", langue)}/`,
    name: L.titre,
    mainEntity: {
      "@type": "Person",
      name: L.signature,
      jobTitle: L.fonction,
      worksFor: { "@id": ID_MAISON },
      image: `${SITE_URL}/scenes/${SCENES["mouna"].name}-1000.jpg`,
    },
    about: { "@id": ID_MAISON },
  };

  /* Un chapitre : son titre, et ses paragraphes. */
  const Chapitre = ({ titre, texte }: { titre: string; texte: readonly string[] }) => (
    <>
      <h2 className="titre-section">{titre}</h2>
      {texte.map((p) => (
        <p key={p} className="texte mesure-l mt-4">
          {p}
        </p>
      ))}
    </>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
      />
      <FilDAriane
        langue={langue}
        rangs={[{ nom: t(langue).barre.maison, adresse: "/a-propos" }]}
      />

      {/* ————————————————————————————————————— l'ouverture —————
       *
       * Une seule composition, et non trois blocs empilés.
       *
       * Le titre, le sous-titre et la citation occupaient chacun leur
       * bande, sans lien : le titre flottait seul dans un vide, le
       * sous-titre tombait à onze pixels — la promesse de la page écrite
       * en taille de légende —, et la citation arrivait ensuite sans
       * qu'on sache encore qui parle.
       *
       * Les trois se rangent maintenant dans une seule colonne, en trois
       * corps décroissants : le titre, le chapeau, la citation. La
       * hiérarchie se fait par la taille et par l'espace, jamais par la
       * couleur — une page qui n'a qu'un rouge ne peut pas s'en servir
       * pour ranger trois niveaux.
       *
       * La citation est enfin attribuée. On lit la page entière à la
       * première personne : il faut savoir dès la première ligne de qui
       * elle est.
       *
       * Le portrait file jusqu'au bord droit et tient toute la hauteur
       * du bloc. Posé dans une boîte avec une gouttière à sa droite, il
       * laissait une bande morte le long de l'écran et se lisait comme
       * une vignette ; au bord, il fait corps avec le texte. */}
      {/*
       * L'ouverture entière sur le rouge de la maison.
       *
       * Demandé par la boutique : le titre, le slogan, la citation et le
       * portrait sur le même fond. C'est le seul endroit du site où le
       * rouge occupe une pleine largeur — ailleurs il n'est qu'un bouton
       * ou un trait —, et il ne se représentera pas : une couleur
       * d'action qui couvre deux sections n'en est plus une.
       *
       * Le couple citation-photographie est resserré et centré dans le
       * bloc, plutôt que poussé aux deux bords. Écartés, ils se lisaient
       * comme deux éléments qui s'ignorent ; rapprochés, la photographie
       * illustre la phrase.
       *
       * Toutes les couleurs sont écrites en style : « .affiche »,
       * « .texte » et « .legende » posent chacune la leur et ne sont pas
       * calquées — elles l'emporteraient sur des utilitaires.
       */}
      <section className="pt-[var(--entete)]" style={{ background: "var(--color-action)" }}>
        <div className="gouttiere py-[clamp(3rem,6.5vw,6rem)]">
          {/* Centrés avec le reste du bloc : le titre calé à gauche
            * au-dessus d'une citation et d'une photographie centrées
            * tirait la composition d'un côté. */}
          <header className="text-center">
            <h1 className="affiche" style={{ color: "var(--color-sur-image)" }}>
              {L.titre}
            </h1>
            <p
              className="phrase est-moyenne mesure-l mx-auto mt-5"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              {L.sousTitre}
            </p>
          </header>

          <div className="mt-[clamp(2rem,4vw,3rem)] grid gap-x-[clamp(1.75rem,3.5vw,3.5rem)] gap-y-[clamp(1rem,2vw,1.75rem)] md:grid-cols-[minmax(0,30rem)_auto] md:items-center md:justify-center">
            {/*
              * La citation est centrée dans sa colonne : alignée à
              * gauche, elle laissait à droite un vide qui ressemblait à
              * un oubli. Les guillemets sont inline et non suspendus —
              * un signe suspendu n'a de sens que sur un texte aligné à
              * gauche, où il marque la marge ; sur un bloc centré il
              * déséquilibre la première ligne.
              *
              * L'espace fine insécable avant et après est celle que le
              * français demande à l'intérieur des guillemets.
              */}
            <blockquote data-lever className="m-0">
              <p
                className="mx-auto"
                style={{
                  /* La main de Mouna, comme sa signature sur le tirage.
                   * Le corps monte d'un tiers : l'œil de cette écriture
                   * est petit, et elle paraîtrait minuscule au corps de
                   * l'Inter. L'interligne s'ouvre pour la même raison —
                   * les hampes et les jambages d'une main se croisent si
                   * les lignes se serrent. L'approche retombe à zéro :
                   * on n'espace pas une écriture manuscrite. */
                  fontFamily: "var(--font-main)",
                  fontWeight: 500,
                  fontSize: "clamp(1.375rem,2.2vw,1.875rem)",
                  lineHeight: 1.5,
                  color: "var(--color-sur-image)",
                  maxWidth: "34ch",
                  textAlign: "center",
                  textWrap: "balance",
                }}
              >
                {/*
                  * Le grand guillemet anglais, au début de la première
                  * ligne. Demandé par la maison, et dessiné comme sur sa
                  * référence : deux virgules pleines et rondes. Le serif
                  * de la maison les dessine ainsi ; l'Inter du texte les
                  * taille en biseaux droits, et les chevrons français
                  * sont des traits qui ne grossissent pas.
                  *
                  * Sa taille est en « em » : il suit le corps de la
                  * citation à toutes les largeurs. L'interligne nul
                  * l'empêche de creuser la première ligne, et
                  * l'alignement vertical le pose dessus plutôt qu'au
                  * milieu.
                  *
                  * Le fermant lui répond, au même corps et dans la même
                  * lettre : la citation est tenue des deux bouts.
                  *
                  * Les deux sont cachés aux lecteurs d'écran —
                  * « blockquote » dit déjà que c'est une citation, et
                  * deux signes annoncés en plus ne feraient que doubler
                  * ce que la balise porte.
                  */}
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "3em",
                    lineHeight: 0,
                    verticalAlign: "-0.42em",
                    marginRight: "0.04em",
                    color: "var(--color-sur-image)",
                  }}
                >
                  &ldquo;
                </span>
                {L.citation}
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "3em",
                    lineHeight: 0,
                    verticalAlign: "-0.42em",
                    marginLeft: "0.04em",
                    color: "var(--color-sur-image)",
                  }}
                >
                  &rdquo;
                </span>
              </p>
            </blockquote>

            {/*
             * Le portrait, en tirage encadré.
             *
             * Demandé par la maison : cadre blanc, esprit ancien. Les
             * proportions sont celles d'un tirage instantané — une marge
             * égale sur trois côtés, et davantage en bas, où se pose la
             * signature. C'est cette marge basse, et elle seule, qui fait
             * reconnaître le format ; un liseré régulier ne serait qu'un
             * cadre.
             *
             * Le blanc est « sur-image » et non « blanc » : le jeton
             * blanc désigne la surface du site, qui noircit en thème
             * sombre, et le cadre serait devenu noir. Un tirage reste
             * blanc.
             *
             * L'inclinaison est d'un degré et demi : assez pour qu'on
             * voie une photographie posée plutôt que collée, trop peu
             * pour qu'on la croie de travers. Elle est portée par le
             * cadre, et la révélation par l'enveloppe — « data-lever »
             * écrit lui aussi une transformation, et les deux
             * s'écraseraient.
             */}
            <div data-lever className="flex flex-col items-center">
              <figure
                className="relative m-0 w-full max-w-[19rem] md:w-[clamp(14rem,22vw,19rem)]"
                style={{
                  background: "var(--color-sur-image)",
                  padding: "clamp(0.6875rem,1.3vw,1rem)",
                  paddingBottom: "clamp(3.25rem,5.2vw,4.25rem)",
                  boxShadow: "0 26px 56px -24px rgba(0,0,0,0.55), 0 4px 10px -4px rgba(0,0,0,0.3)",
                  transform: "rotate(-1.5deg)",
                }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3 / 4", boxShadow: "inset 0 0 0 1px rgba(20,16,12,0.07)" }}
                >
                  {/* La photographie du gâteau d'anniversaire, demandée par
                    * Mouna à la place de celle du showroom. Le tirage est en
                    * 3:4 et la photographie en paysage : le cadrage se
                    * décale un peu à gauche du centre pour garder à la fois
                    * son visage et la robe-gâteau. */}
                  <Photo
                    media={SCENES["anniversaire"]}
                    dossier="scenes"
                    alt={L.altMouna}
                    sizes="(max-width: 768px) 85vw, 22vw"
                    priorite
                    position="58% center"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                {/*
                  * La signature, dans la marge du tirage.
                  *
                  * Le nom est d'une main — Caveat en 600, l'épaisseur
                  * d'un feutre —, et la fonction est de la maison :
                  * l'Inter du site, en petites capitales espacées. Les
                  * deux ne se disent pas de la même voix, et c'est ce qui
                  * fait qu'une photographie paraît signée.
                  *
                  * Les deux couleurs sont « sous-image », fixes comme le
                  * blanc du cadre. En « encre », elles auraient blanchi
                  * en thème sombre, sur un cadre resté blanc.
                  */}
                {/* La signature seule dans la marge du tirage : c'est
                  * ce qu'on écrit sur une photographie. La fonction, elle,
                  * n'est pas de la main de Mouna — elle est de la maison,
                  * et elle se range sous le cadre, hors du tirage. La
                  * marge basse se resserre d'autant. */}
                <figcaption
                  className="absolute inset-x-0 text-center leading-none"
                  style={{
                    bottom: "clamp(0.625rem,1.1vw,0.9375rem)",
                    fontFamily: "var(--font-main)",
                    fontWeight: 600,
                    fontSize: "clamp(1.75rem,3vw,2.375rem)",
                    color: "var(--color-sous-image)",
                  }}
                >
                  {L.signature}
                </figcaption>
              </figure>

              {/* Droite sous un tirage penché : la fonction appartient à
                * la page, pas à la photographie, et son aplomb le dit. */}
              <p
                className="legende mt-[clamp(1rem,2vw,1.5rem)] text-center"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {L.fonction}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ————————————————————————————————————————— le nom —————
       *
       * Le meilleur moment du récit, et il était en petit.
       *
       * « Madame Moon » devenu MADAMOON tenait sur une ligne, au milieu
       * d'un bloc, entre un titre et deux paragraphes : l'idée la plus
       * singulière de la page passait pour une note. Elle devient le
       * sommet visuel de la section — l'anglaise au-dessus, la maison en
       * capitales au-dessous, et le trait vertical qui dit « devient ».
       *
       * Vertical, et non horizontal : un trait couché sépare deux noms
       * de même rang, un trait debout en fait descendre un du premier.
       *
       * La section est centrée, seule de la page à l'être. C'est une
       * respiration voulue entre deux chapitres alignés à gauche — mais
       * les deux paragraphes, eux, restent alignés à gauche dans leur
       * colonne : un texte courant centré se lit mal des deux côtés. */}
      <section className="gouttiere py-[clamp(3rem,6vw,6rem)]">
        <div className="mx-auto flex max-w-[34rem] flex-col items-center">
          <h2 className="phrase text-center" style={{ textWrap: "balance" }}>
            {L.nomTitre}
          </h2>

          <div
            data-lever
            className="mt-[clamp(2rem,4vw,3rem)] flex flex-col items-center gap-[clamp(0.75rem,1.6vw,1.25rem)]"
          >
            <span
              className="font-anglaise leading-[1.05]"
              style={{ fontSize: "clamp(2.25rem,5.5vw,4rem)", color: "var(--color-plomb)" }}
            >
              {L.nomAvant}
            </span>
            <span
              aria-hidden="true"
              className="block w-px bg-fil"
              style={{ height: "clamp(1.75rem,3.5vw,2.75rem)" }}
            />
            <span className="affiche" style={{ fontSize: "clamp(1.75rem,4vw,3rem)" }}>
              {L.nomApres}
            </span>
          </div>

          <div className="mt-[clamp(2rem,4vw,3rem)] self-stretch">
            {L.nomTexte.map((p) => (
              <p key={p} className="texte mt-5 first:mt-0">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ———————————————————————— l'ingénierie industrielle —————
       * La photographie est à gauche, le texte à droite : c'est le seul
       * chapitre qui se passe avant la maison, et il se lit à
       * contre-sens des autres. */}
      <section style={{ background: "var(--color-craie)" }}>
        <div className="grid md:grid-cols-[auto_1fr] md:items-center">
          <figure
            data-voile
            className="relative m-0 w-full overflow-hidden md:w-[clamp(18rem,34vw,30rem)]"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Photo
              media={SCENES["mouna-ferroviaire"]}
              dossier="scenes"
              alt={L.altAvant}
              sizes="(max-width: 768px) 100vw, 34vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <figcaption className="legende absolute bottom-4 left-4 right-4 text-sur-image">
              {L.avantLegende}
            </figcaption>
          </figure>
          <div data-lever className="gouttiere py-[clamp(2.5rem,5vw,4.5rem)]">
            <Chapitre titre={L.avantTitre} texte={L.avantTexte} />
          </div>
        </div>
      </section>

      {/* ———————————————————————————————————————— le déclic —————
       * Une date, parce qu'il y en a une : la photographie est de ce
       * jour-là, masque compris. */}
      <section className="gouttiere py-[clamp(2.5rem,5.5vw,5rem)]">
        <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-8 md:grid-cols-[1fr_auto] md:items-start">
          <div data-lever>
            <span className="legende block" style={{ color: "var(--color-action)" }}>
              {L.declicDate}
            </span>
            <div className="mt-3">
              <Chapitre titre={L.declicTitre} texte={L.declicTexte} />
            </div>
          </div>
          <div
            data-voile
            data-retard={120}
            className="tuile w-full md:w-[clamp(16rem,26vw,22rem)]"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Photo
              media={SCENES["mouna-essayage"]}
              dossier="scenes"
              alt={L.altDeclic}
              sizes="(max-width: 768px) 100vw, 26vw"
            />
          </div>
        </div>
      </section>

      {/* ——————————————————————— penser l'essayage autrement —————
       * Ce que la maison apprend d'une mariée avant de lui montrer quoi
       * que ce soit. Mouna l'a écrit en phrases courtes séparées par des
       * points : elles se posent donc en liste, et non recousues en
       * paragraphe. Puis la thèse, seule. */}
      <section className="gouttiere py-[clamp(2.5rem,5.5vw,5rem)]">
        <Chapitre titre={L.autrementTitre} texte={L.autrementTexte} />

        {/* Sans filets : les traits entre les lignes donnaient un rendu de
          * sommaire de livre (remarque de Mouna). Les phrases se suivent
          * comme elle les a écrites, chacune sur sa ligne, avec un simple
          * trait de couleur à gauche pour les tenir ensemble. */}
        <ul
          data-lever
          className="mesure-l mt-6 space-y-1.5 pl-5"
          style={{ borderLeft: "2px solid var(--color-action)" }}
        >
          {L.autrementListe.map((item) => (
            <li key={item} className="texte">
              {item}
            </li>
          ))}
        </ul>

        <div data-lever className="mt-10 max-w-[34ch]">
          <p className="texte">{L.autrementCroyance}</p>
          <p className="phrase mt-3">{L.autrementVerite}</p>
        </div>
      </section>

      {/* ———————————————————————————— l'expérience MADAMOON —————
       * Sept paragraphes, dont quatre d'une seule phrase : le texte
       * accélère ici. Le bandeau photo qui suivait (Mouna et une mariée)
       * a été retiré à la demande de Mouna. */}
      <section className="gouttiere py-[clamp(2.5rem,5.5vw,5rem)]">
        <Chapitre titre={L.experienceTitre} texte={L.experienceTexte} />
      </section>


      {/* ————————————————————————————— un écrin hors du temps —————
       * Le seul bloc sombre de la page, et la seule photographie qui le
       * mérite : le vitrail est lui-même une lumière dans du noir. Les
       * couleurs sont écrites en style — « .texte » et « .titre-section »
       * posent les leurs et ne sont pas calquées. Les jetons s'inversent
       * avec le thème, le bloc reste donc contrasté dans les deux. */}
      <section style={{ background: "var(--color-encre)" }}>
        <div className="grid md:grid-cols-[1fr_auto] md:items-center">
          <div data-lever className="gouttiere py-[clamp(3rem,6vw,6rem)]">
            <h2 className="titre-section" style={{ color: "var(--color-ivoire)" }}>
              {L.ecrinTitre}
            </h2>
            {L.ecrinTexte.map((p) => (
              <p
                key={p}
                className="texte mesure-l mt-4"
                style={{ color: "var(--color-sable)" }}
              >
                {p}
              </p>
            ))}
          </div>
          <div
            data-voile
            className="relative min-h-[18rem] w-full overflow-hidden md:min-h-[34rem] md:w-[clamp(16rem,30vw,26rem)]"
          >
            <Photo
              media={SCENES["vitrail"]}
              dossier="scenes"
              alt={L.altEcrin}
              sizes="(max-width: 768px) 100vw, 30vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ——————————————————————————————————————— ma vision —————
       * La fin du récit. Mouna dans la vitrine, au milieu des robes : la
       * maison vue de la rue, telle que les mariées la découvrent. La
       * photographie du gâteau est montée dans le tirage du haut.
       *
       * La source ne fait que 277 pixels de large (la maison n'a pas
       * l'original) : le cadre est donc en portrait et plafonné à
       * seize rem, pour ne pas étirer l'image au-delà de ce qu'elle
       * tient. À remplacer dès que l'original arrive. */}
      <section className="gouttiere py-[clamp(2.5rem,5.5vw,5rem)]">
        <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-10 md:grid-cols-2 md:items-center">
          <div>
            <div data-lever>
              <Chapitre titre={L.visionTitre} texte={L.visionTexte} />
            </div>

            {/* La conclusion reste dans la vision, sans changement de fond :
              * un bloc à part, sur fond crème, donnait l'impression que la
              * page était finie et qu'on passait à autre chose (remarque de
              * Mouna). Les trois promesses suivent le texte, sans filets,
              * comme la liste de « penser l'essayage autrement ». */}
            <ul
              data-lever
              className="mesure-l mt-8 space-y-2 pl-5"
              style={{ borderLeft: "2px solid var(--color-action)" }}
            >
              {L.trois.map((item) => (
                <li key={item} className="phrase est-moyenne">
                  {item}
                </li>
              ))}
            </ul>

            <p data-lever className="affiche mt-10">
              {L.bienvenue}
            </p>

            {/* La signature, de la main de Mouna — l'anglaise plutôt qu'une
              * image : elle se redimensionne, se lit aux lecteurs d'écran et
              * ne pèse rien de plus, la police étant déjà chargée. */}
            <p data-lever className="mt-8">
              <span
                className="font-anglaise block leading-[1.2]"
                style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "var(--color-action)" }}
              >
                {L.signature}
              </span>
              <span className="legende mt-2 block">{L.fonction}</span>
            </p>
          </div>
          <div
            data-voile
            data-retard={120}
            className="tuile w-full max-w-[16rem] justify-self-center"
            style={{ aspectRatio: "277 / 547" }}
          >
            <Photo
              media={SCENES["mouna-vitrine"]}
              dossier="scenes"
              alt={L.altVision}
              sizes="16rem"
            />
          </div>
        </div>
      </section>


      <section className="gouttiere mt-[clamp(3rem,5.5vw,5rem)] bg-craie py-[clamp(3.5rem,7vw,7rem)]">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <p className="phrase mesure-l">
            {M.adresse} — {M.codePostal} {M.ville}
          </p>
          <AppelRendezvous className="bouton">{L.prendreRendezvous}</AppelRendezvous>
        </div>
      </section>
    </>
  );
}
