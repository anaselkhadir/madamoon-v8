import { filDAriane } from "@/lib/schema";
import { versLangue, type Langue } from "@/lib/langue";
import { t } from "@/lib/textes";

/*
 * Le fil d'Ariane d'une page, à l'usage des moteurs.
 *
 * Il ne se voit pas : le site a son propre retour en arrière, et une
 * seconde navigation en haut de page n'apporterait rien à la lecture.
 * Ce que le balisage apporte est ailleurs — dans le résultat de
 * recherche, où « Accueil › Robes de mariée › Uma » remplace l'adresse.
 *
 * Les barreaux s'écrivent en adresses françaises, comme partout dans le
 * code ; « versLangue » les traduit. L'accueil est posé ici une fois
 * pour toutes : aucune page n'a à le répéter.
 */
export default function FilDAriane({
  langue,
  rangs,
}: {
  langue: Langue;
  /* Du plus général au plus précis, l'accueil exclu. L'adresse est
   * française, sans barre oblique finale : « /robes », « /robes/uma ». */
  rangs: { nom: string; adresse: string }[];
}) {
  const L = t(langue);
  const complet = [
    { nom: L.ariane.accueil, adresse: "/" },
    ...rangs.map((r) => ({ nom: r.nom, adresse: versLangue(r.adresse, langue) })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(filDAriane(complet)) }}
    />
  );
}
