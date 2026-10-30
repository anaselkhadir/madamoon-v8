import { CATEGORIES, MAISON, type Categorie, type Robe } from "@/lib/madamoon";
import { coupeNom, robeLigne } from "@/lib/contenu";
import type { Langue } from "@/lib/langue";

/*
 * Les descriptions d'images.
 *
 * Elles étaient écrites à la main, page par page. Une même robe recevait
 * donc trois descriptions différentes selon l'endroit où on la
 * rencontrait, et certaines ne la nommaient pas. Elles sont maintenant
 * calculées à partir de la donnée : une robe, une description, partout.
 *
 * Ce qu'une description doit dire, dans cet ordre : ce que c'est, ce
 * qu'on y voit, de qui c'est, et où on peut l'essayer. Le lieu compte —
 * une boutique de quartier se cherche autant par son adresse que par son
 * catalogue.
 *
 * Ce qu'elle ne doit pas faire : décrire un angle de prise de vue. On
 * n'écrit pas « vue de dos » sur une photographie qu'on n'a pas
 * regardée ; une description fausse est pire qu'une description vague,
 * pour une lectrice d'écran comme pour un moteur.
 *
 * La longueur se tient sous cent trente caractères. Au-delà, les
 * lecteurs d'écran fatiguent et les moteurs coupent.
 *
 * Elles suivent la langue de la page. Une lectrice d'écran anglophone
 * entendait « Robe de mariée sirène en dentelle » lue par une voix
 * anglaise, et Google Images indexait le site anglais avec des mots
 * français.
 */

const ARRONDISSEMENT = `${MAISON.codePostal.slice(-2)}e`;

const LIEU = (l: Langue) =>
  l === "fr"
    ? `showroom ${MAISON.nom} ${MAISON.ville} ${ARRONDISSEMENT}`
    : `${MAISON.nom} showroom, ${MAISON.ville} ${ARRONDISSEMENT}`;

/*
 * La description d'une robe.
 *
 * `vue` numérote les photographies d'un même modèle : c'est un fait
 * vérifiable, contrairement à l'angle. Sans elle, les quatre vues d'Uma
 * partageraient la même description, et un moteur n'en indexerait qu'une.
 */
export function altRobe(robe: Robe, langue: Langue, vue = 1): string {
  const brut = robeLigne(robe, langue);
  /* Seule la première lettre passe en bas de casse, et seulement en
   * français. Tout mettre en minuscules abîmait les sigles : « dentelle
   * 3D » devenait « 3d ». En anglais, « A-line » perdrait sa capitale. */
  const ligne = langue === "fr" ? brut.charAt(0).toLowerCase() + brut.slice(1) : brut;

  /* La ligne du catalogue nomme presque toujours une coupe. Quand elle
   * n'en nomme aucune — « satin col bénitier » —, on ajoute celle du
   * catalogue : c'est le mot que l'on cherche. On ne l'ajoute jamais si
   * une coupe est déjà citée, sous peine d'écrire « deux en un, sirène »
   * sur Tessa, qui est les deux à la fois. */
  const coupe = coupeNom(robe.categorie, langue);
  const nommee = CATEGORIES.some((c) =>
    ligne.toLowerCase().includes(coupeNom(c, langue).toLowerCase())
  );
  const debut = nommee ? ligne : `${langue === "fr" ? coupe.toLowerCase() : coupe}, ${ligne}`;

  if (langue === "fr") {
    const qui = robe.createur ? `${robe.nom} par ${robe.createur}` : `modèle ${robe.nom}`;
    const rang = vue > 1 ? `, vue ${vue}` : "";
    return `Robe de mariée ${debut} — ${qui}${rang}, ${LIEU(langue)}`;
  }
  const qui = robe.createur ? `${robe.nom} by ${robe.createur}` : `the ${robe.nom} model`;
  const rang = vue > 1 ? `, view ${vue}` : "";
  /* Le nom d'abord, comme en français. Accolé à la suite — « lace
   * mermaid wedding dress » — il se lisait comme une énumération dont
   * le dernier terme aurait avalé les autres. */
  return `Wedding dress, ${debut.charAt(0).toLowerCase() + debut.slice(1)} — ${qui}${rang}, ${LIEU(langue)}`;
}

/*
 * La description d'une famille de coupe, quand l'image illustre la coupe
 * et non un modèle précis.
 *
 * La précision est une donnée, pas une phrase toute faite : une maison,
 * ou une morphologie. Elle était écrite en clair sur les lieux d'appel,
 * ce qui la laissait en français sur les pages anglaises.
 */
export function altCoupe(
  coupe: string,
  langue: Langue,
  precision?: { maison: string } | { morphologie: string }
): string {
  /* « de mariée » passe ici quand aucune coupe n'est connue : ce n'est
   * pas une catégorie du catalogue, et la table la laisse telle quelle. */
  const nom = coupeNom(coupe as Categorie, langue);

  if (langue === "fr") {
    const fin = !precision
      ? ""
      : "maison" in precision
        ? ` ${precision.maison}`
        : ` conseillée pour une morphologie en ${precision.morphologie}`;
    return `Robe de mariée ${nom.toLowerCase()}${fin} — ${LIEU(langue)}`;
  }
  const fin = !precision
    ? ""
    : "maison" in precision
      ? ` by ${precision.maison}`
      : ` recommended for the ${precision.morphologie} shape`;
  return `Wedding dress, ${nom.toLowerCase()}${fin} — ${LIEU(langue)}`;
}

/* La description d'une photographie de lieu ou d'ambiance. Le sujet
 * vient du dictionnaire, déjà dans la bonne langue. */
export function altScene(quoi: string, langue: Langue): string {
  return `${quoi} — ${LIEU(langue)}`;
}
