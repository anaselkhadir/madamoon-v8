import { SCENES, vues, type Media, type NomScene } from "@/lib/medias";

/*
 * Les photographies des guides, sur ordinateur.
 *
 * La première ouvre la page ; les suivantes accompagnent les chapitres,
 * dans l'ordre, et reviennent au début quand le guide est plus long que
 * la liste. Ce sont des images d'ambiance, déjà présentes sur le site :
 * elles n'illustrent pas une robe précise, et la page ne les décrit pas.
 * Un guide absent de la table prend la liste par défaut.
 */

export type ImageGuide = { media: Media; dossier: "scenes" | "robes"; position?: string };

const sc = (cle: NomScene, position?: string): ImageGuide => ({ media: SCENES[cle], dossier: "scenes", position });

/* La photographie d'une robe, si elle existe : une robe sans image ne
 * laisse pas de trou, la liste se referme. */
const ro = (slug: string, vue = 1, position?: string): ImageGuide | undefined => {
  const media = vues(slug)[vue - 1];
  return media ? { media, dossier: "robes", position } : undefined;
};

const PAR_DEFAUT = [sc("hero-affiche", "center 30%"), sc("dentelle"), sc("sur-mesure"), sc("showroom-film"), sc("lumiere")];

const TABLE: Record<string, (ImageGuide | undefined)[]> = {
  "prix-robe-de-mariee-paris": [sc("hero-affiche", "center 30%"), sc("dentelle"), sc("showroom-film"), sc("sur-mesure"), sc("lumiere")],
  "quand-acheter-sa-robe-de-mariee": [sc("seuil", "center 25%"), sc("sur-mesure"), sc("salon-accueil"), sc("choix-libre", "center 20%"), sc("lumiere")],
  "essayage-robe-de-mariee": [sc("choix-guidee", "center 25%"), sc("salon-accueil"), sc("showroom-film"), sc("choix-libre", "center 20%"), sc("sur-mesure")],
  "choisir-sa-robe-de-mariee": [sc("choix-libre", "center 20%"), sc("silhouette-2"), sc("silhouette-4", "center 20%"), sc("lumiere"), sc("createurs")],
  "tissus-robe-de-mariee": [sc("dentelle"), sc("dos-uma", "center 30%"), sc("voile"), sc("film-montana"), sc("lumiere")],
  "robe-de-mariee-enceinte": [ro("mathilda", 1, "center 20%"), sc("plage", "center 25%"), sc("palmier-portrait"), sc("salon-accueil"), sc("lumiere")],
  "robe-de-mariee-vintage": [ro("tessa", 1, "center 20%"), sc("sur-mesure"), sc("vitrail"), sc("film-tessa"), ro("clover", 1, "center 20%")],
  "ivoire-ou-blanc": [sc("silhouette-3", "center 20%"), sc("lumiere"), sc("film-montana"), sc("plage", "center 25%"), sc("dentelle")],
  "traine-robe-de-mariee": [sc("voile"), sc("pierre"), sc("palmier"), sc("createurs"), ro("santana", 1, "center 20%")],
  "robe-de-mariee-apres-40-ans": [sc("silhouette-5", "center 20%"), sc("film-seraphina"), sc("choix-guidee", "center 25%"), sc("salon-accueil"), sc("silhouette-4", "center 20%")],
  "robe-de-mariee-bridgerton": [sc("silhouette-6"), sc("silhouette-1"), sc("escalier-affiche"), sc("vitrail"), ro("dolores", 1, "center 20%")],
};

export function imagesGuide(slug: string): ImageGuide[] {
  const liste = (TABLE[slug] ?? PAR_DEFAUT).filter((x): x is ImageGuide => Boolean(x));
  return liste.length > 0 ? liste : PAR_DEFAUT;
}
