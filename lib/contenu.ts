import type { Langue } from "@/lib/langue";
import type { Categorie, Createur, Morphologie, Robe } from "@/lib/madamoon";
import { FAQ, MAISON, SIGNATURES } from "@/lib/madamoon";
import { APPOSITION, PLURIEL, type Coupe } from "@/lib/coupes";
import {
  COUPE_APPOSITION,
  COUPE_INTRO,
  COUPE_NOM,
  COUPE_NOTE,
  COUPE_PLURIEL,
  CREATEUR_NOM,
  CREATEUR_NOTE,
  CREATEUR_ORIGINE,
  FAMILLE,
  MAISON_EN,
  SIGNATURES_EN,
} from "@/lib/en/taxonomie";
import { ROBE_EN } from "@/lib/en/robes";
import { FAQ_EN } from "@/lib/en/faq";
import { ARTICLES } from "@/lib/questions";
import { ARTICLES_EN } from "@/lib/en/questions";
import { QUESTIONS_MORPHO } from "@/lib/morphologies-questions";
import { QUESTIONS_MORPHO_EN } from "@/lib/en/morphologies-questions";
import { QUESTIONS_COUPES } from "@/lib/coupes-questions";
import { QUESTIONS_COUPES_EN } from "@/lib/en/coupes-questions";
import { AU_DELA_EN, EDITO_EN, QUESTIONS_EN } from "@/lib/en/morphologies-edito";
import { AU_DELA, EDITO, QUESTIONS } from "@/lib/morphologies";
import type { Lettre } from "@/lib/madamoon";
import {
  MORPHO_NOM,
  MORPHO_OBJECTIF,
  MORPHO_CONSEIL,
  MORPHO_COUPES,
  MORPHO_SILHOUETTE,
} from "@/lib/en/morphologies";

/*
 * Le contenu, dans la langue demandée.
 *
 * Les données du site restent françaises et font autorité : ce sont
 * elles que la cliente relit, elles qui portent les identifiants, elles
 * qui décident de ce qui existe. L'anglais est une table à côté, rangée
 * par les mêmes clés.
 *
 * Tout passe par ici plutôt que par des « si anglais » disséminés dans
 * les composants : le jour où une coupe est ajoutée, il n'y a qu'un
 * endroit où le manque apparaît.
 */

export const coupeNom = (c: Coupe | Categorie, l: Langue) => {
  const nom = typeof c === "string" ? c : c.nom;
  return l === "fr" ? nom : COUPE_NOM[nom as Categorie] ?? nom;
};

/* Le paragraphe d'une coupe et le lien qui le suit, dans la langue. */
export const coupeIntro = (c: Coupe, l: Langue) => {
  if (!c.intro) return undefined;
  if (l === "fr") return { texte: c.intro, lien: c.introLien };
  const en = COUPE_INTRO[c.ancre];
  return {
    texte: en?.texte ?? c.intro,
    lien: c.introLien && { href: c.introLien.href, label: en?.lien ?? c.introLien.label },
  };
};

export const coupeNote = (c: Coupe, l: Langue) =>
  l === "fr" ? c.note : COUPE_NOTE[c.nom as Categorie] ?? c.note;

export const coupePluriel = (cat: Categorie, l: Langue) =>
  l === "fr" ? PLURIEL[cat] : COUPE_PLURIEL[cat];

export const coupeApposition = (cat: Categorie, l: Langue) =>
  l === "fr" ? APPOSITION[cat] : COUPE_APPOSITION[cat];

export const familleTexte = (cat: Categorie, l: Langue, fr: string) =>
  l === "fr" ? fr : FAMILLE[cat] ?? fr;

export const createurNom = (c: Createur, l: Langue) =>
  l === "fr" ? c.nom : CREATEUR_NOM[c.slug] ?? c.nom;

export const createurNote = (c: Createur, l: Langue) =>
  l === "fr" ? c.note : CREATEUR_NOTE[c.slug] ?? c.note;

export const createurOrigine = (c: Createur, l: Langue) =>
  l === "fr" ? c.origine : CREATEUR_ORIGINE[c.slug] ?? c.origine;

export const morphoNom = (m: Morphologie, l: Langue) =>
  l === "fr" ? m.nom : MORPHO_NOM[m.lettre] ?? m.nom;

export const morphoSilhouette = (m: Morphologie, l: Langue) =>
  l === "fr" ? m.silhouette : MORPHO_SILHOUETTE[m.lettre] ?? m.silhouette;

export const morphoObjectif = (m: Morphologie, l: Langue) =>
  l === "fr" ? m.objectif : MORPHO_OBJECTIF[m.lettre] ?? m.objectif;

export const morphoCoupes = (m: Morphologie, l: Langue) =>
  l === "fr" ? m.coupes : MORPHO_COUPES[m.lettre] ?? m.coupes;

export const morphoConseil = (m: Morphologie, l: Langue) =>
  l === "fr" ? m.conseil : MORPHO_CONSEIL[m.lettre] ?? m.conseil;

/* La maison : seules les mentions se traduisent, jamais l'adresse ni le
 * numéro. */
export const maison = (l: Langue) =>
  l === "fr"
    ? MAISON
    : { ...MAISON, ...MAISON_EN };

/* Les robes : la ligne et le regard viennent des fiches. Le repli sur le
 * français vaut pour une robe ajoutée dont l'anglais n'est pas encore
 * écrit — une fiche vide serait pire qu'une fiche à traduire. */
export const robeLigne = (r: Robe, l: Langue) =>
  l === "fr" ? r.ligne : ROBE_EN[r.slug]?.ligne ?? r.ligne;

export const robeRegard = (r: Robe, l: Langue) =>
  l === "fr" ? r.regard : ROBE_EN[r.slug]?.regard ?? r.regard;

/* Les signatures de la maison, dans l'ordre. */
export const signatures = (l: Langue): { titre: string; texte: string }[] =>
  l === "fr" ? SIGNATURES.map((s) => ({ titre: s.titre, texte: s.texte })) : SIGNATURES_EN;

/* La FAQ : même ordre, mêmes engagements, deux langues. */
export const faq = (l: Langue): { q: string; r: string; horsElise?: boolean }[] =>
  l === "fr" ? FAQ.map((f) => ({ q: f.q, r: f.r, horsElise: "horsElise" in f })) : FAQ_EN;

/*
 * La FAQ telle qu'Élise la sert : celle du site, moins ce dont elle ne
 * parle pas.
 *
 * Une seule question en sort aujourd'hui, celle des prix. La maison ne
 * veut pas qu'une conseillère automatique chiffre quoi que ce soit —
 * un prix donné par une machine se retient comme une promesse, et
 * c'est la boutique qui engage la maison, de vive voix.
 *
 * La question reste sur la page du site, où elle est à sa place : le
 * tri est celui d'Élise, pas celui de la maison.
 */
export const faqElise = (l: Langue) => faq(l).filter((f) => !f.horsElise);

/* Les pages dédiées aux questions, dans l'ordre de la FAQ. La réponse
 * courte n'y est pas : elle reste celle de « faq(langue) ». */
export const articles = (l: Langue) => (l === "fr" ? ARTICLES : ARTICLES_EN);

/* Les questions d'une page de morphologie, avec leurs pages. Absentes,
 * la page garde ses anciennes questions. L'anglais retombe sur le
 * français s'il manque, comme les autres tables. */
export const questionsMorpho = (lettre: Lettre, l: Langue) =>
  l === "fr" ? QUESTIONS_MORPHO[lettre] : QUESTIONS_MORPHO_EN[lettre] ?? QUESTIONS_MORPHO[lettre];

/* Les questions d'une page de coupe, par son ancre française. */
export const questionsCoupe = (ancre: string, l: Langue) =>
  l === "fr" ? QUESTIONS_COUPES[ancre] : QUESTIONS_COUPES_EN[ancre] ?? QUESTIONS_COUPES[ancre];

/* La matière rédigée des morphologies : l'édito, le bloc « au-delà » et
 * les questions. Trois tables jumelles, une seule porte. */
export const edito = (lettre: Lettre, l: Langue) =>
  l === "fr" ? EDITO[lettre] : EDITO_EN[lettre] ?? EDITO[lettre];

export const auDela = (l: Langue) => (l === "fr" ? AU_DELA : AU_DELA_EN);

export const questions = (lettre: Lettre, l: Langue) =>
  l === "fr" ? QUESTIONS[lettre] : QUESTIONS_EN[lettre] ?? QUESTIONS[lettre];

/*
 * La minuscule d'attaque, quand la langue la permet.
 *
 * Le français met en bas de casse ce qui suit un tiret ou un article :
 * « Uma — sirène en dentelle ». L'anglais, non — « A-line », « V-neck »
 * portent une capitale qui fait partie du mot, et « a-line » se lit
 * comme une faute.
 */
export const bas = (texte: string, l: Langue) => (l === "fr" ? texte.toLowerCase() : texte);

/*
 * La seule initiale en bas de casse.
 *
 * « bas » met toute la chaîne en minuscules : c'est ce qu'il faut pour
 * une étiquette — « sirène en dentelle » —, jamais pour une phrase.
 * Appliquée à « Ajustée jusqu'aux cuisses, puis évasée. Elle dessine la
 * taille », elle avalait la capitale de la seconde phrase.
 */
export const initiale = (texte: string, l: Langue) =>
  l === "fr" && texte ? texte.charAt(0).toLowerCase() + texte.slice(1) : texte;
