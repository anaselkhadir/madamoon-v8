import Link from "@/components/Lien";
import Photo from "@/components/media/Photo";
import Croquis from "@/components/morphologie/Croquis";
import { CREATEURS, MORPHOLOGIES, ROBES } from "@/lib/madamoon";
import { COUPES } from "@/lib/coupes";
import { VIGNETTES_CREATEURS, vues, type Media } from "@/lib/medias";
import { coupeNom, createurNom, morphoNom } from "@/lib/contenu";
import type { Langue } from "@/lib/langue";

/*
 * Le panneau de la barre, en cartes.
 *
 * D'après la référence Osmo « multilevel navigation » envoyée par la
 * maison. Au survol de « Robes de mariée » (les créateurs), « Coupes » ou
 * « Morphologies »,
 * un panneau blanc descend sous la barre et pose une rangée de cartes :
 * une photographie (ou, pour les morphologies, le croquis de la
 * silhouette sur le gris de la maison), le nom en bas à gauche, une
 * flèche dans un rond sombre en bas à droite. Les cartes montent l'une
 * après l'autre ; passer d'une entrée à l'autre les remplace.
 *
 * Rien n'est écrit ici à la main : les cartes viennent des données — une
 * coupe ajoutée au catalogue y paraît d'elle-même.
 *
 * Sur ordinateur seulement ; la barre n'a pas ces entrées au doigt.
 */

type Carte = {
  href: string;
  nom: string;
  media?: Media;
  croquis?: string;
};

function cartes(groupe: string, l: Langue): Carte[] {
  if (groupe === "/coupes") {
    return COUPES.map((c) => ({
      href: `/coupes/${c.ancre}`,
      nom: coupeNom(c, l),
      media: vues(c.robe)[c.vue - 1],
    }));
  }
  if (groupe === "/morphologies") {
    return MORPHOLOGIES.map((m) => ({
      href: `/morphologies/${m.lettre.toLowerCase()}`,
      nom: morphoNom(m, l),
      croquis: m.lettre,
    }));
  }
  /* « Robes de mariée » : les maisons, c'est-à-dire les créateurs. */
  if (groupe === "/robes") {
    return CREATEURS.map((c) => {
      /* La photographie de la maison : celle de sa vignette sur
       * l'accueil, sinon celle qui ouvre sa page. */
      const choix = c.vignette ?? c.ouverture;
      const robe = ROBES.find((r) => r.slug === choix.robe);
      const media = !robe
        ? undefined
        : c.vignette && !c.vignette.vue
          ? VIGNETTES_CREATEURS[c.slug]
          : vues(robe.slug)[(choix.vue ?? 1) - 1];
      return { href: `/createurs/${c.slug}`, nom: createurNom(c, l), media };
    });
  }
  return [];
}


export default function MegaCartes({ groupe, langue }: { groupe: string; langue: Langue }) {
  const liste = cartes(groupe, langue);
  if (liste.length === 0) return null;

  return (
    <div
      id="mega-navigation"
      className="mega-descend hidden rounded-b-[4px] bg-blanc text-encre shadow-[0_18px_40px_-24px_rgba(20,16,12,0.35)] lg:block"
    >
      {/* La clé suit l'entrée : passer de l'une à l'autre rejoue la
        * montée des cartes. */}
      <ul
        key={groupe}
        className="gouttiere grid gap-3 pb-[clamp(1.25rem,2vw,1.75rem)] pt-[clamp(0.75rem,1.2vw,1rem)]"
        style={{ gridTemplateColumns: `repeat(${liste.length}, minmax(0, 1fr))` }}
      >
        {liste.map((c, i) => (
          <li key={c.href} className="mega-carte" style={{ animationDelay: `${60 + i * 45}ms` }}>
            <Link
              href={c.href}
              className="group relative block h-[clamp(13rem,26vh,18rem)] overflow-hidden rounded-[4px]"
              style={{ background: "var(--color-gris)" }}
            >
              {c.media && (
                <>
                  <Photo
                    media={c.media}
                    dossier="robes"
                    alt=""
                    sizes="18vw"
                    position="center 30%"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] [transition-timing-function:var(--ease-doux)] group-hover:scale-[1.035]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(20,16,12,0.55) 0%, rgba(20,16,12,0.12) 32%, rgba(20,16,12,0) 50%)",
                    }}
                  />
                </>
              )}
              {c.croquis && (
                <span className="absolute inset-x-0 top-0 bottom-12 flex items-center justify-center pt-4">
                  <Croquis
                    lettre={c.croquis}
                    className="h-full w-auto text-plume transition-colors duration-500 group-hover:text-action"
                  />
                </span>
              )}

              {/* Le nom, et la flèche dans son rond. */}
              <span
                className={`absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 ${
                  c.media ? "text-sur-image" : "text-encre"
                }`}
              >
                {/* Sur deux lignes au besoin : à six cartes, « Morphologie en O »
                  * ne tenait pas sur une. */}
                <span className="min-w-0 text-[0.9375rem] leading-tight">{c.nom}</span>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-encre text-blanc transition-colors duration-300 group-hover:bg-action"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
