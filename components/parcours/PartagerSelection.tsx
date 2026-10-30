"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { langueDe } from "@/lib/langue";
import { t } from "@/lib/textes";
import { lienPartage } from "@/lib/coupsDeCoeur";

/*
 * Partager sa sélection.
 *
 * Trois chemins, du plus direct au plus sûr, dans cet ordre :
 *
 * — la feuille de partage du téléphone, quand il en a une : c'est celle
 *   qui mène à WhatsApp et aux messages, là où ces liens circulent ;
 * — le presse-papiers, sur ordinateur ;
 * — l'adresse écrite en clair, si les deux sont refusés. Elle est alors
 *   sélectionnée : il ne reste qu'à copier.
 *
 * Aucun de ces chemins n'est acquis. Le partage natif n'existe pas
 * partout, le presse-papiers demande un contexte sécurisé et peut être
 * refusé, et l'un comme l'autre peuvent être annulés par la visiteuse.
 * On ne dit donc « copié » qu'après l'avoir été.
 */

export default function PartagerSelection({ slugs }: { slugs: readonly string[] }) {
  const [etat, setEtat] = useState<"repos" | "copie" | "manuel">("repos");
  const L = t(langueDe(usePathname() ?? "/")).coeurs;
  const [lien, setLien] = useState("");
  const champ = useRef<HTMLInputElement>(null);
  const minuterie = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(minuterie.current), []);

  const annoncer = (e: "copie" | "manuel") => {
    setEtat(e);
    window.clearTimeout(minuterie.current);
    if (e === "copie") minuterie.current = window.setTimeout(() => setEtat("repos"), 4000);
  };

  const partager = async () => {
    const url = lienPartage(slugs);
    setLien(url);

    const nav = navigator as Navigator & { share?: (d: ShareData) => Promise<void> };
    if (nav.share) {
      try {
        await nav.share({
          title: L.titrePartage,
          text: L.textePartage(slugs.length),
          url,
        });
        return;
      } catch {
        /* Annulé, ou refusé : on retombe sur le presse-papiers. */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      annoncer("copie");
      return;
    } catch {
      /* Pas de presse-papiers : on montre l'adresse. */
    }
    annoncer("manuel");
    window.setTimeout(() => champ.current?.select(), 0);
  };

  return (
    <>
      <button type="button" onClick={partager} className="bouton-trait">
        {etat === "copie" ? L.copie : L.partager}
      </button>

      {etat === "manuel" && (
        <input
          ref={champ}
          readOnly
          value={lien}
          aria-label={L.lienACopier}
          onFocus={(e) => e.currentTarget.select()}
          className="mt-3 w-full max-w-[34rem] border-0 border-b border-fil bg-transparent pb-1 font-sans text-[0.9375rem] text-plume outline-none"
        />
      )}
    </>
  );
}
