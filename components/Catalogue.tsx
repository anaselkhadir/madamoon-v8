import { media as chemin } from "@/lib/chemin";
import { CATALOGUES_DISPONIBLES, fichierCatalogue } from "@/lib/catalogue";
import { t } from "@/lib/textes";
import type { Langue } from "@/lib/langue";

/*
 * Le catalogue.
 *
 * Un bouton blanc posé sur la photographie d'ouverture. On clique, le
 * PDF descend. Rien entre les deux.
 *
 * Il a porté un formulaire — prénom, nom, courriel, date du mariage —
 * en échange du fichier. La maison préfère donner : une mariée qui
 * repart avec le catalogue sous le bras revient ; une mariée arrêtée par
 * quatre champs ferme l'onglet. La collecte n'était d'ailleurs reliée à
 * rien, faute de point de dépôt, et l'on demandait donc des adresses que
 * personne ne lisait.
 *
 * C'est une ancre, pas un bouton commandé par un script : le
 * téléchargement fonctionne sans JavaScript, s'ouvre dans un autre
 * onglet au clic du milieu, et s'enregistre au clic droit. Trois choses
 * qu'un bouton perdait.
 *
 * L'intitulé se met au contexte : « le catalogue sirène » sur une coupe,
 * « le catalogue Olya Mak » sur une maison. C'est le même geste partout,
 * mais ce n'est jamais le même catalogue, et il faut que cela se voie
 * avant le clic.
 */

type Props = {
  /* Ce que l'on écrit après « Télécharger le catalogue ». Déjà accordé,
   * déjà en minuscules s'il le faut : « sirène », « Olya Mak ». */
  intitule: string;
  /* « coupe:sirene », « maison:olya-mak », « morphologie:x », « robe:uma ». */
  contexte: string;
  className?: string;
  langue: Langue;
  /* Sur la fiche d'une robe : l'icône seule sur petit écran, le bouton
   * entier au-delà. Ailleurs, le catalogue est la seule action
   * secondaire — son intitulé y sert encore. */
  pastille?: boolean;
};

export default function Catalogue({
  intitule,
  contexte,
  className = "bouton-clair",
  langue,
  pastille = false,
}: Props) {
  const L = t(langue).catalogue;
  if (!CATALOGUES_DISPONIBLES) return null;

  const nom = L.telecharger(intitule);

  return (
    <a
      href={chemin(fichierCatalogue(contexte))}
      /* Un nom lisible dans le dossier des téléchargements : c'est là
       * qu'il sera retrouvé dans trois semaines, entre deux devis. */
      download={L.fichier(intitule)}
      aria-label={nom}
      className={pastille ? `${className} pastille gap-2` : className}
    >
      {pastille && (
        /* Une flèche qui descend dans une corbeille : le geste, pas
         * l'objet. Un pictogramme de document aurait dit « PDF », ce qui
         * n'est pas ce que l'on promet. */
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="trace h-[1.05rem] w-[1.05rem] md:hidden"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v11m0 0 4-4m-4 4-4-4" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        </svg>
      )}
      <span className="intitule">{nom}</span>
    </a>
  );
}
