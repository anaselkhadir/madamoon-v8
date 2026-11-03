"use client";

import { useEffect, useId, useState } from "react";
import AppelRendezvous from "@/components/parcours/AppelRendezvous";

/*
 * Les filtres du catalogue.
 *
 * Cinq listes déroulantes — la coupe, la maison, la matière, le style ou
 * le détail, la morphologie — qui se combinent. Le choix se lit et
 * s'écrit dans l'adresse (« ?coupe=sirene&matiere=dentelle ») : une
 * sélection se partage, et le retour en arrière la retrouve.
 *
 * Rien n'est rechargé : les tuiles sont toutes dans la page, telle que
 * les moteurs la lisent, et le filtre ne fait que les masquer. Chaque
 * tuile porte ses attributs (data-coupe, data-createur, data-matieres,
 * data-familles, data-morphos), posés au rendu par la page.
 *
 * Pas de compte de résultats : la maison ne veut pas de nombres. Quand
 * rien ne correspond, un état vide le dit, et propose d'élargir ou de
 * venir au showroom, qui montre plus que le site.
 *
 * Des listes natives, et non un menu dessiné : elles se lisent au
 * clavier, au lecteur d'écran et au doigt sans qu'on ait rien à
 * réinventer ; seule leur apparence suit le site (classe « champ »).
 */

export type ChampFiltre = {
  cle: "coupe" | "createur" | "matiere" | "famille" | "morpho";
  label: string;
  options: { valeur: string; label: string }[];
};

export type TextesFiltres = {
  titre: string;
  toutes: string;
  toutAfficher: string;
  aucune: string;
  elargir: string;
  rendezvous: string;
  misAJour: string;
};

type Choix = Partial<Record<ChampFiltre["cle"], string>>;

/* L'attribut de tuile que chaque champ interroge. */
const ATTRIBUT: Record<ChampFiltre["cle"], string> = {
  coupe: "coupe",
  createur: "createur",
  matiere: "matieres",
  famille: "familles",
  morpho: "morphos",
};

const CLES = Object.keys(ATTRIBUT) as ChampFiltre["cle"][];

function lireAdresse(): Choix {
  const q = new URLSearchParams(window.location.search);
  const c: Choix = {};
  CLES.forEach((k) => {
    const v = q.get(k);
    if (v) c[k] = v;
  });
  return c;
}

function ecrireAdresse(c: Choix) {
  const q = new URLSearchParams(window.location.search);
  CLES.forEach((k) => (c[k] ? q.set(k, c[k] as string) : q.delete(k)));
  const suite = q.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${suite ? `?${suite}` : ""}${window.location.hash}`);
}

/* Masque ou montre les tuiles d'après le choix. Rend vrai s'il en reste. */
function appliquer(c: Choix): boolean {
  const tuiles = document.querySelectorAll<HTMLElement>("[data-robe]");
  let visibles = 0;
  tuiles.forEach((t) => {
    const garde = CLES.every((k) => {
      const v = c[k];
      if (!v) return true;
      const a = (t.dataset[ATTRIBUT[k]] ?? "").split(" ").filter(Boolean);
      return a.includes(v);
    });
    t.hidden = !garde;
    if (garde) visibles += 1;
  });
  return visibles > 0;
}

export default function FiltresRobes({ champs, textes }: { champs: ChampFiltre[]; textes: TextesFiltres }) {
  const [choix, setChoix] = useState<Choix>({});
  const [vide, setVide] = useState(false);
  const [annonce, setAnnonce] = useState("");
  const id = useId();

  /* Au chargement, l'adresse fait foi. */
  useEffect(() => {
    const initial = lireAdresse();
    setChoix(initial);
    setVide(!appliquer(initial));
  }, []);

  const changer = (k: ChampFiltre["cle"], v: string) => {
    const suivant: Choix = { ...choix, [k]: v || undefined };
    setChoix(suivant);
    ecrireAdresse(suivant);
    setVide(!appliquer(suivant));
    setAnnonce(textes.misAJour);
  };

  const effacer = () => {
    setChoix({});
    ecrireAdresse({});
    setVide(!appliquer({}));
    setAnnonce(textes.misAJour);
  };

  const actif = CLES.some((k) => choix[k]);

  return (
    <>
      <form
        role="search"
        aria-label={textes.titre}
        onSubmit={(e) => e.preventDefault()}
        className="mt-2 border-b border-fil pb-6"
      >
        <div className="grid grid-cols-2 gap-x-[clamp(1rem,2.5vw,2.5rem)] gap-y-5 md:grid-cols-3 lg:grid-cols-5">
          {champs.map((ch) => (
            <div key={ch.cle}>
              <label htmlFor={`${id}-${ch.cle}`} className="legende block text-plomb">
                {ch.label}
              </label>
              <select
                id={`${id}-${ch.cle}`}
                name={ch.cle}
                className="champ mt-2"
                value={choix[ch.cle] ?? ""}
                onChange={(e) => changer(ch.cle, e.target.value)}
              >
                <option value="">{textes.toutes}</option>
                {ch.options.map((o) => (
                  <option key={o.valeur} value={o.valeur}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        {/* Le retour à tout, seulement quand un filtre est posé : un
          * bouton qui ne fait rien n'a pas sa place. L'état vide a le
          * sien, on ne le double pas. */}
        {actif && !vide && (
          <button type="button" onClick={effacer} className="lien-nav souligne mt-5 text-action">
            {textes.toutAfficher}
          </button>
        )}
        <p aria-live="polite" className="sr-only">
          {annonce}
        </p>
      </form>

      {vide && (
        <div className="border-b border-fil py-[clamp(3rem,6vw,5rem)]">
          <p className="phrase mesure-l">{textes.aucune}</p>
          <p className="texte mesure-l mt-4">{textes.elargir}</p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <button type="button" onClick={effacer} className="bouton">
              {textes.toutAfficher}
            </button>
            <AppelRendezvous className="lien-nav souligne text-encre">{textes.rendezvous}</AppelRendezvous>
          </div>
        </div>
      )}
    </>
  );
}
