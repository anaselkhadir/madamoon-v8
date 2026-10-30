import { Fragment } from "react";
import Link from "@/components/Lien";
import { typographie } from "@/lib/francais";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/* Un morceau de paragraphe. « fort » met le passage en exergue — gras
 * et rouge. « exposant » et « apres » tiennent un exposant au milieu
 * d'un même passage, pour qu'il ne se coupe pas en deux de part et
 * d'autre. */
type Morceau = {
  texte: string;
  fort?: boolean;
  exposant?: string;
  apres?: string;
};

/*
 * L'introduction de l'accueil.
 *
 * On entrait dans les morphologies sans savoir où l'on était : la
 * boutique a demandé qu'on se présente d'abord. Le titre et les deux
 * paragraphes sont ceux de Mouna, mot pour mot, et les trois passages
 * en exergue sont ceux qu'elle avait soulignés sur son document — mis
 * en gras et en rouge plutôt que soulignés, à sa demande.
 *
 * Centrée, contrairement aux sections qui suivent, toutes calées à
 * gauche : c'est une adresse à la visiteuse et non une rubrique du site.
 * Elle garde la mesure du reste — quarante-huit caractères — sans quoi
 * un texte centré devient une bannière.
 *
 * Pas de repère en capitales au-dessus : le titre nomme déjà la maison,
 * et « La maison » posé dessus l'aurait dite deux fois.
 */

export default function Maison({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue).introMaison;

  return (
    <section
      aria-labelledby="la-maison"
      className="relative z-10 bg-blanc pt-[clamp(3rem,8vw,7rem)]"
    >
      <div className="gouttiere">
        <div className="mesure-l mx-auto text-center">
          <span data-ligne className="block">
            <h2 id="la-maison" className="phrase">
              {L.titreAvant}
              {/* L'anglaise a l'œil plus petit qu'un romain de même
                * corps : relevée d'un tiers, elle se tient sur la même
                * ligne que la suite. L'interligne revient à un, sinon
                * ses déliés écartent les deux lignes du titre.
                *
                * Le rouge est écrit en propre : « .phrase » porte sa
                * couleur hors calque et l'emporterait sur un utilitaire.
                * C'est le rouge des liens et des boutons, le même en
                * clair et en sombre — la maison l'a voulu ainsi. */}
              <span
                style={{
                  fontFamily: "var(--font-anglaise)",
                  fontSize: "1.35em",
                  lineHeight: 1,
                  color: "var(--color-action)",
                }}
              >
                {L.nom}
              </span>
              {L.titreApres}
            </h2>
          </span>
          {/* Les paragraphes montent après le titre, le lien après eux :
            * la section se découvre dans l'ordre où elle se lit. Les
            * retards sont courts — on ouvre une page, on n'assiste pas à
            * une démonstration. « Mouvement » révèle tout de suite ce qui
            * est déjà à l'écran, et la préférence de mouvement réduit
            * annule tout d'un coup. */}
          {(L.paragraphes as readonly (readonly Morceau[])[]).map((morceaux, i) => (
            <p
              key={i}
              className={i === 0 ? "texte mt-5" : "texte mt-4"}
              data-lever
              data-retard={120 + i * 80}
            >
              {morceaux.map((m, j) => {
                /* L'exposant est une convention française : « le XIXᵉ ».
                  * En anglais le siècle s'écrit en toutes lettres, et le
                  * morceau n'en porte pas. */
                const contenu = (
                  <>
                    {typographie(m.texte)}
                    {m.exposant && <sup>{m.exposant}</sup>}
                    {m.apres && typographie(m.apres)}
                  </>
                );
                /* « em » et non « strong » : depuis que ces passages
                  * sont en italique et non plus en gras, c'est de
                  * l'emphase qu'il s'agit, pas d'une importance accrue
                  * — et l'italique est le rendu naturel de « em ».
                  *
                  * « strong » portait son gras de naissance : la règle
                  * avait beau ne plus en demander, la balise l'imposait
                  * toujours. */
                return m.fort ? (
                  <em key={j} className="exergue">
                    {contenu}
                  </em>
                ) : (
                  <Fragment key={j}>{contenu}</Fragment>
                );
              })}
            </p>
          ))}
          <div
            className="pt-[clamp(1.5rem,2.5vw,2.25rem)]"
            data-lever
            data-retard={120 + L.paragraphes.length * 80}
          >
            <Link href="/a-propos" className="lien-nav souligne inline-block text-action">
              {L.lien}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
