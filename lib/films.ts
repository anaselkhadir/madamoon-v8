import type { NomScene } from "@/lib/medias";

/*
 * Les robes dont la maison possède un film.
 *
 * Quelques modèles seulement : quand le film n'existe pas, la fiche n'en
 * invente pas. Chaque extrait est muet, court, en boucle.
 *
 * Zina y figurait par le film du hero. Celui-ci est devenu l'extrait
 * Meredith — une robe Casablanca : la fiche de Zina ne peut pas le
 * montrer. Faute de film propre, elle n'en a plus.
 */
export const FILMS: Record<
  string,
  {
    src: string;
    affiche: NomScene;
    /* Un film tourné en portrait : le téléphone le reçoit entier, avec
     * son affiche ; l'ordinateur garde la bande paysage de « src ». */
    srcMobile?: string;
    afficheMobile?: NomScene;
  }
> = {
  addison: { src: "/film/escalier.mp4", affiche: "escalier-affiche" },
  meredith: { src: "/film/meredith.mp4", affiche: "film-meredith" },
  tessa: { src: "/film/tessa.mp4", affiche: "film-tessa" },
  ariel: { src: "/film/ariel.mp4", affiche: "film-ariel" },
  venus: { src: "/film/venus.mp4", affiche: "film-venus" },
  solana: { src: "/film/solana.mp4", affiche: "film-solana" },
  montana: { src: "/film/montana.mp4", affiche: "film-montana" },
  seraphina: {
    src: "/film/seraphina.mp4",
    affiche: "film-seraphina",
    srcMobile: "/film/seraphina-mobile.mp4",
    afficheMobile: "film-seraphina-mobile",
  },
};
