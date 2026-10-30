"use client";

import Link from "@/components/Lien";
import { useEffect, useRef, useState } from "react";
import Photo from "@/components/media/Photo";
import { mouvementReduit, surDefilement } from "@/lib/mouvement";
import type { Media } from "@/lib/medias";
import type { Categorie } from "@/lib/madamoon";
import { bas } from "@/lib/contenu";
import { t } from "@/lib/textes";
import type { Langue } from "@/lib/langue";

/*
 * La robe qui reste.
 *
 * L'animation signature de la page. Une robe tient la moitié gauche de
 * l'écran et ne bouge plus ; à droite, les coupes défilent une par une, et
 * la robe change avec elles — en fondu, jamais par saut.
 *
 * Le principe est celui du reste du site : la scène suit le défilement,
 * elle ne le pilote jamais. Pas de scroll capturé, pas de section qui
 * retient — on peut s'arrêter n'importe où, et repartir.
 *
 * Ce qui bouge est toujours une opacité ou une translation, jamais une
 * mise en page : le navigateur n'a rien à recalculer, seulement à
 * composer. La parallaxe est plafonnée à trois pour cent de la hauteur —
 * assez pour donner de la profondeur, trop peu pour se remarquer.
 *
 * Sur petit écran, la robe fixe disparaît et chaque coupe reçoit sa
 * propre image, au-dessus de son texte. Le collant ne tiendrait pas : en
 * une seule colonne, la boîte de l'image n'a que sa propre hauteur, et
 * rien à parcourir. Plutôt qu'un demi-effet, une mise en page franche —
 * c'est aussi la plus fluide au doigt.
 *
 * Les deux jeux d'images ne se chargent jamais ensemble : celui qui est
 * masqué reste en chargement différé, donc jamais demandé.
 *
 * Le mouvement refusé arrête tout : les fondus tombent à zéro par la
 * feuille de style, la parallaxe ne s'installe pas, et le collant reste —
 * ce n'est pas du mouvement, c'est de la mise en page.
 */

export type Station = {
  /* Le nom affiché, déjà dans la langue de la page. */
  nom: string;
  /* La catégorie française, celle des données : le nom ne sert plus de
   * clef dès lors qu'il se traduit. */
  categorie: Categorie;
  ancre: string;
  pourquoi: string;
  media: Media;
  alt: string;
  /* Deux modèles, pas plus : c'est une invitation, pas un catalogue. */
  robes: { slug: string; nom: string; ligne: string }[];
};

export default function CoupesFixes({
  stations,
  langue,
}: {
  stations: Station[];
  langue: Langue;
}) {
  const L = t(langue).pages.morpho;
  const [active, setActive] = useState(0);
  const scene = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const blocs = useRef<(HTMLDivElement | null)[]>([]);

  /*
   * Quelle coupe est devant les yeux, et de combien la robe se décale.
   *
   * Les deux se calculent dans la même image d'animation. L'observateur
   * d'intersection ne convient pas ici : deux blocs voisins occupent la
   * bande centrale en même temps pendant la transition, et comme on ne
   * traite que les entrées, l'index restait sur le bloc le plus loin
   * atteint au lieu de revenir sur celui qu'on lit. On mesure donc le
   * bloc dont le centre est le plus proche de celui de l'écran : c'est
   * vrai à chaque instant, quel que soit le sens du défilement.
   *
   * Trois rectangles par image, sur trois blocs au plus : le coût est
   * nul, et l'état ne change que lorsque la coupe change vraiment.
   */
  useEffect(() => {
    const bouge = !mouvementReduit() && window.matchMedia("(min-width: 768px)").matches;
    let demande = 0;
    let dernier = -1;

    const poser = () => {
      demande = 0;
      const milieu = window.innerHeight / 2;

      let proche = 0;
      let ecart = Infinity;
      blocs.current.forEach((el, i) => {
        if (!el) return;
        const b = el.getBoundingClientRect();
        const d = Math.abs(b.top + b.height / 2 - milieu);
        if (d < ecart) {
          ecart = d;
          proche = i;
        }
      });
      if (proche !== dernier) {
        dernier = proche;
        setActive(proche);
      }

      if (!bouge) return;
      const s = scene.current;
      const el = image.current;
      if (!s || !el) return;
      const b = s.getBoundingClientRect();
      const course = b.height - window.innerHeight;
      if (course <= 0) return;
      const avance = Math.min(Math.max(-b.top / course, 0), 1);
      /* Trois pour cent de la hauteur : assez pour la profondeur, trop
       * peu pour se remarquer. */
      el.style.transform = `translate3d(0, ${(avance - 0.5) * 3}%, 0)`;
    };

    const surScroll = () => {
      if (!demande) demande = requestAnimationFrame(poser);
    };
    poser();
    const desabonner = surDefilement(surScroll);
    window.addEventListener("scroll", surScroll, { passive: true });
    window.addEventListener("resize", surScroll);
    return () => {
      cancelAnimationFrame(demande);
      desabonner();
      window.removeEventListener("scroll", surScroll);
      window.removeEventListener("resize", surScroll);
    };
  }, []);

  return (
    <div
      ref={scene}
      className="gouttiere grid gap-x-[clamp(2rem,5vw,5rem)] md:grid-cols-2"
    >
      {/* La robe. Collée sous l'en-tête, elle traverse toute la scène. */}
      <div className="hidden md:col-start-1 md:row-start-1 md:block">
        <div className="sticky top-[calc(var(--barre)+var(--entete))]">
          <div
            ref={image}
            className="relative overflow-hidden will-change-transform md:h-[min(78svh,44rem)]"
          >
            {stations.map((s, i) => (
              <Photo
                key={s.ancre}
                media={s.media}
                dossier="robes"
                alt={s.alt}
                sizes="(max-width: 768px) 100vw, 46vw"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] [transition-timing-function:var(--ease-doux)] ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          {/* Le nom de la coupe, sous l'image, change avec elle. */}
          <p className="legende mt-3" aria-live="polite">
            {stations[active]?.nom}
          </p>
        </div>
      </div>

      {/* Les coupes, une par une. */}
      <div className="md:col-start-2 md:row-start-1">
        {stations.map((s, i) => (
          <div
            key={s.ancre}
            ref={(el) => {
              blocs.current[i] = el;
            }}
            data-rang={i}
            className="flex flex-col justify-center py-12 md:min-h-[78svh]"
          >
            {/* L'image de la coupe, sur petit écran seulement. */}
            <div className="tuile -mx-[var(--gouttiere)] mb-8 md:hidden" data-rideau>
              <Photo
                media={s.media}
                dossier="robes"
                alt={s.alt}
                sizes="100vw"
              />
            </div>

            <p className="legende">{String(i + 1).padStart(2, "0")}</p>
            <span data-ligne className="mt-2 block">
              <h3 className="titre-section">{s.nom}</h3>
            </span>
            <p className="texte mesure-l mt-4">{s.pourquoi}</p>

            <ul className="mt-8 border-t border-fil" data-suite>
              {s.robes.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/robes/${r.slug}`}
                    className="group flex items-baseline justify-between gap-6 border-b border-fil py-3"
                  >
                    <span>
                      <span className="phrase text-[1.125rem] text-encre transition-colors duration-500 group-hover:text-action">
                        {r.nom}
                      </span>
                      <span className="texte"> — {bas(r.ligne, langue)}</span>
                    </span>
                    <span aria-hidden="true" className="legende shrink-0 text-brume">
                      {L.voir}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={`/coupes/${s.ancre}`}
              className="lien-nav souligne mt-6 self-start text-action"
            >
              {L.toutesNosRobes(bas(s.nom, langue))}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
