"use client";

import Link from "@/components/Lien";
import { useCallback, useEffect, useRef, useState } from "react";
import Photo from "@/components/media/Photo";
import { COUPES } from "@/lib/coupes";
import { ROBES } from "@/lib/madamoon";
import { vues } from "@/lib/medias";
import { altCoupe } from "@/lib/alt";
import { mouvementReduit } from "@/lib/mouvement";
import type { Langue } from "@/lib/langue";
import { t } from "@/lib/textes";
import { coupeNom, coupeNote, coupePluriel } from "@/lib/contenu";

/*
 * Les coupes, en accordéon.
 *
 * Cinq panneaux côte à côte, une photographie par coupe. Celui qu'on
 * survole s'ouvre, les autres se resserrent en bandes ; le nom de la
 * coupe paraît en bas du panneau ouvert, et un clic mène à sa page.
 *
 * Pendant le mouvement, les bords se courbent. Chaque frontière entre
 * deux panneaux se creuse d'autant plus qu'elle va vite, dans le sens où
 * elle va, puis se redresse en arrivant : une étoffe qu'on tire, pas un
 * volet qui coulisse. Les deux bords d'une même frontière prennent la
 * même courbe, si bien que l'écart entre deux panneaux reste égal.
 *
 * La courbe est une découpe (« clip-path ») recalculée à chaque image
 * tant que quelque chose bouge, et posée droite au repos. La photographie
 * déborde son panneau de chaque côté, de quoi remplir la courbe quand
 * elle sort du cadre.
 *
 * Au doigt, l'accordéon se dresse : les panneaux s'empilent, les bandes
 * portent le nom de leur coupe, un premier toucher ouvre, le second mène
 * à la page. Le survol n'existe pas au doigt ; rien n'en dépend.
 *
 * Mouvement réduit : les panneaux changent de taille sans courbe ni
 * glissement.
 */

/* Le débord de la photographie, de chaque côté, et la courbe maximale. */
const DEBORD = 72;
const COURBE_MAX = 64;
/* L'angle de la maison : celui des boutons. */
const ANGLE = 4;

type Famille = { c: (typeof COUPES)[number]; media: ReturnType<typeof vues>[number] };

/* La découpe d'un panneau : un rectangle aux angles adoucis, dont les
 * deux bords mobiles se courbent. « debut » et « fin » sont les courbes
 * des bords d'entrée et de sortie, comptées dans le sens de l'axe. */
function decoupe(longueur: number, epaisseur: number, debut: number, fin: number, vertical: boolean) {
  const w = longueur;
  const h = epaisseur;
  const r = Math.min(ANGLE, w / 2, h / 2);
  const m = h / 2;
  /* En horizontal, x suit l'axe ; en vertical, on échange les coordonnées. */
  const p = (a: number, b: number) => (vertical ? `${b.toFixed(1)} ${a.toFixed(1)}` : `${a.toFixed(1)} ${b.toFixed(1)}`);
  return `path("M ${p(r, 0)} L ${p(w - r, 0)} Q ${p(w, 0)} ${p(w, r)} Q ${p(w + 2 * fin, m)} ${p(w, h - r)} Q ${p(w, h)} ${p(w - r, h)} L ${p(r, h)} Q ${p(0, h)} ${p(0, h - r)} Q ${p(2 * debut, m)} ${p(0, r)} Q ${p(0, 0)} ${p(r, 0)} Z")`;
}

export default function Coupes({ langue = "fr" }: { langue?: Langue }) {
  const L = t(langue);

  const familles = COUPES.map((c) => {
    const robe = ROBES.find((r) => r.slug === c.robe);
    const media = robe ? vues(robe.slug)[c.vue - 1] : undefined;
    return robe && media ? { c, media } : null;
  }).filter(Boolean) as Famille[];
  const n = familles.length;
  /* La largeur sur la hauteur de chaque photographie : le panneau ouvert
   * la prend telle quelle, et la photographie s'y voit entière. */
  const rapports = familles.map((f) => f.media.w / f.media.h);
  const rapportsCourants = useRef(rapports);
  rapportsCourants.current = rapports;

  const [actif, setActif] = useState(0);
  /* Le geste en cours : la souris prévisualise au survol, le doigt
   * ouvre au premier toucher. Un toucher émet aussi un faux survol ; on
   * le reconnaît à son « pointerType », et l'on retient si le panneau
   * était déjà ouvert quand le doigt s'est posé. */
  const geste = useRef<{ type: string; etaitOuvert: boolean }>({ type: "mouse", etaitOuvert: false });
  const actifCourant = useRef(0);
  /* Le point où la souris a ouvert un panneau. Quand les panneaux
   * bougent sous un curseur immobile, le navigateur émet un nouveau
   * survol au même point : on l'ignore, sinon l'accordéon s'ouvrirait en
   * cascade d'un panneau à l'autre. */
  const pointOuverture = useRef<{ x: number; y: number } | null>(null);
  const cadre = useRef<HTMLUListElement>(null);
  const panneaux = useRef<(HTMLLIElement | null)[]>([]);
  /* Le moteur : poids courants, frontières, courbes. Hors de React, pour
   * ne rien rendre à chaque image. */
  const moteur = useRef({
    tailles: [] as number[],
    frontieres: [] as number[],
    courbes: [] as number[],
    cible: 0,
    demande: 0,
    dernier: 0,
    relancer: () => {},
  });

  const ouvrir = useCallback((i: number) => {
    actifCourant.current = i;
    setActif(i);
    moteur.current.cible = i;
    moteur.current.relancer();
  }, []);

  useEffect(() => {
    const ul = cadre.current;
    if (!ul || n === 0) return;
    const M = moteur.current;
    const etroit = window.matchMedia("(max-width: 1023px)");
    const reduit = mouvementReduit();
    M.tailles = [];
    M.courbes = Array(Math.max(n - 1, 0)).fill(0);
    M.frontieres = [];

    const image = (maintenant: number) => {
      M.demande = 0;
      const vertical = etroit.matches;
      const b = ul.getBoundingClientRect();
      const longueurTotale = vertical ? b.height : b.width;
      const epaisseur = vertical ? b.width : b.height;
      const ecart = parseFloat(getComputedStyle(ul).columnGap || getComputedStyle(ul).gap) || 0;
      const libre = longueurTotale - ecart * (n - 1);
      /* Le panneau ouvert prend les proportions de sa photographie ; les
       * bandes se partagent le reste. Le cadre est taillé (globals.css,
       * « .accordeon-coupes ») pour la plus large d'entre elles. */
      const cibles = (() => {
        const r = rapportsCourants.current[M.cible] ?? 0.667;
        const ouvert = Math.min(vertical ? epaisseur / r : epaisseur * r, libre - (n - 1) * 24);
        const bande = (libre - ouvert) / Math.max(n - 1, 1);
        return Array.from({ length: n }, (_, i) => (i === M.cible ? ouvert : bande));
      })();

      const dt = M.dernier ? Math.min(maintenant - M.dernier, 64) : 16.7;
      M.dernier = maintenant;
      const premiere = M.tailles.length !== n;
      const k = reduit || premiere ? 1 : 1 - Math.pow(1 - 0.11, dt / 16.7);

      let bouge = false;
      M.tailles = cibles.map((cible, i) => {
        const avant = premiere ? cible : M.tailles[i];
        const suivant = avant + (cible - avant) * k;
        if (Math.abs(cible - suivant) > 0.3) {
          bouge = true;
          return suivant;
        }
        return cible;
      });
      const tailles = M.tailles;

      /* Les frontières, et leur vitesse en pixels par image. */
      let x = 0;
      const frontieres = tailles.slice(0, -1).map((s) => (x += s + ecart) - ecart / 2);
      frontieres.forEach((f, j) => {
        const avant = M.frontieres[j] ?? f;
        const vitesse = ((f - avant) / dt) * 16.7;
        const voulue = reduit ? 0 : Math.max(Math.min(vitesse * 2.4, COURBE_MAX), -COURBE_MAX);
        M.courbes[j] += (voulue - M.courbes[j]) * (reduit ? 1 : 0.32);
        if (Math.abs(M.courbes[j]) < 0.15) M.courbes[j] = 0;
        else bouge = true;
      });
      M.frontieres = frontieres;

      panneaux.current.forEach((el, i) => {
        if (!el) return;
        el.style.flex = `0 0 ${tailles[i]}px`;
        const debut = i > 0 ? M.courbes[i - 1] : 0;
        const fin = i < n - 1 ? M.courbes[i] : 0;
        el.style.clipPath = decoupe(tailles[i], epaisseur, debut, fin, vertical);
      });

      if (bouge) M.demande = requestAnimationFrame(image);
      else M.dernier = 0;
    };

    M.relancer = () => {
      if (!M.demande) M.demande = requestAnimationFrame(image);
    };
    M.relancer();
    const surTaille = () => M.relancer();
    window.addEventListener("resize", surTaille);
    etroit.addEventListener("change", surTaille);
    return () => {
      cancelAnimationFrame(M.demande);
      M.demande = 0;
      window.removeEventListener("resize", surTaille);
      etroit.removeEventListener("change", surTaille);
    };
  }, [n]);

  if (n === 0) return null;

  return (
    <section aria-labelledby="coupes" className="bg-blanc py-[clamp(3.5rem,7vw,6rem)]">
      {/* Sur grand écran, le titre à gauche et l'accordéon à droite : les
        * photographies sont debout, l'accordéon ne prend pas toute la
        * largeur. En deçà, le titre passe au-dessus. */}
      <div className="gouttiere grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-[clamp(1.75rem,3.5vw,2.75rem)] xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
        <div>
          <p className="legende">{L.coupes.legende}</p>
          <span data-ligne className="mt-4 block">
            <h2 id="coupes" className="phrase">
              {L.coupes.titre}
            </h2>
          </span>
          <p className="texte mesure mt-3">{L.coupes.texte}</p>
          <Link href="/coupes" className="lien-nav souligne mt-5 inline-block text-action">
            {L.coupes.lien}
          </Link>
        </div>

        <ul
          ref={cadre}
          /* « overflow-hidden » : les photographies débordent leur panneau,
           * et celles des deux extrémités sortiraient de la page. Les bords
           * extérieurs ne bougent jamais, rien n'y est coupé. */
          className="accordeon-coupes max-xl:mx-auto"
          style={
            {
              "--rmax": Math.max(...rapports),
              "--rmin": Math.min(...rapports),
              "--n1": n - 1,
            } as React.CSSProperties
          }
        >
          {familles.map(({ c, media }, i) => {
            const ouvert = i === actif;
            const nom = coupeNom(c, langue);
            return (
              <li
                key={c.ancre}
                ref={(el) => {
                  panneaux.current[i] = el;
                }}
                className="relative min-h-0 min-w-0"
                style={{
                  /* Avant le moteur : l'ouvert s'étire, les bandes ont leur
                   * taille. Le moteur pose ensuite des tailles exactes. */
                  flex: i === actif ? "1 1 0" : "0 0 var(--b)",
                  clipPath: `inset(0 round ${ANGLE}px)`,
                }}
              >
                <Link
                  href={`/coupes/${c.ancre}`}
                  aria-label={`${nom}. ${coupeNote(c, langue)}`}
                  aria-current={ouvert ? "true" : undefined}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    const p = pointOuverture.current;
                    if (p && p.x === e.clientX && p.y === e.clientY) return;
                    pointOuverture.current = { x: e.clientX, y: e.clientY };
                    ouvrir(i);
                  }}
                  onPointerDown={(e) => {
                    geste.current = { type: e.pointerType, etaitOuvert: actifCourant.current === i };
                  }}
                  onFocus={() => ouvrir(i)}
                  onClick={(e) => {
                    /* Au doigt, le premier toucher ouvre, le second mène. */
                    if (geste.current.type !== "mouse" && !geste.current.etaitOuvert) {
                      e.preventDefault();
                      ouvrir(i);
                    }
                    geste.current = { type: "mouse", etaitOuvert: false };
                  }}
                  className="group absolute inset-0 block focus-visible:outline-none"
                >
                  {/* Le fond des courbes : la photographie floutée, qui
                    * déborde le panneau des deux côtés de l'axe. Elle ne
                    * se voit que dans la courbe, le temps du mouvement. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-[72px] -right-[72px] max-lg:inset-x-0 max-lg:-bottom-[72px] max-lg:-top-[72px]"
                    style={{ backgroundImage: `url(${media.blur})`, backgroundSize: "100% 100%" }}
                  />
                  {/* La photographie, au panneau exact : ouvert, il a ses
                    * proportions, et elle s'y voit entière. */}
                  <span aria-hidden="true" className="absolute inset-0">
                    <Photo
                      media={media}
                      dossier="robes"
                      alt=""
                      sizes="(max-width: 1024px) 96vw, 40vw"
                      priorite={i === 0}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </span>

                  {/* Le voile : les bandes s'assombrissent, l'ouverte garde
                    * un dégradé en bas pour lire son nom. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 transition-opacity duration-700 [transition-timing-function:var(--ease-doux)]"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(20,16,12,0.62) 0%, rgba(20,16,12,0.18) 38%, rgba(20,16,12,0) 60%)",
                      opacity: ouvert ? 1 : 0,
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 transition-opacity duration-700 [transition-timing-function:var(--ease-doux)]"
                    style={{ background: "rgba(20,16,12,0.32)", opacity: ouvert ? 0 : 1 }}
                  />

                  {/* Le nom de la bande, au doigt seulement : debout, une
                    * bande de soixante-quatre pixels tient un mot. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 flex h-16 items-center px-5 font-serif text-[1.375rem] text-sur-image transition-opacity duration-500 lg:hidden ${
                      ouvert ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {nom}
                  </span>

                  {/* Le nom, la note et l'invitation du panneau ouvert. */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 block p-[clamp(1.25rem,2.4vw,2rem)] text-sur-image transition-[opacity,transform] [transition-timing-function:var(--ease-doux)] motion-reduce:transform-none ${
                      ouvert
                        ? "translate-y-0 opacity-100 delay-200 duration-700"
                        : "pointer-events-none translate-y-2 opacity-0 duration-200"
                    }`}
                  >
                    <span
                      className="block whitespace-nowrap font-serif leading-none"
                      style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)" }}
                    >
                      {nom}
                    </span>
                    <span className="mt-2 block whitespace-nowrap text-[0.9375rem] opacity-90">
                      {coupeNote(c, langue)}
                    </span>
                    <span className="lien-nav mt-4 inline-block whitespace-nowrap border-b border-current pb-0.5">
                      {L.coupes.les} {coupePluriel(c.nom, langue)} →
                    </span>
                  </span>

                  {/* Le repère du clavier, dans le panneau. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2 rounded-[4px] opacity-0 ring-2 ring-sur-image transition-opacity group-focus-visible:opacity-100"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <span className="sr-only" aria-live="polite">
        {L.coupes.presentee} : {coupeNom(familles[actif].c, langue)}
      </span>
    </section>
  );
}
