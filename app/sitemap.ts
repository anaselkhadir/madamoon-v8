import type { MetadataRoute } from "next";

/* Ces deux fichiers sont écrits une fois, à la compilation : ils doivent
 * l'être aussi quand le site est exporté en fichiers statiques. */
export const dynamic = "force-static";
import { CREATEURS, MORPHOLOGIES, ROBES, SITE_URL } from "@/lib/madamoon";
import { COUPES } from "@/lib/coupes";
import { SLUGS_QUESTIONS } from "@/lib/questions";
import { QUESTIONS_MORPHO } from "@/lib/morphologies-questions";
import { QUESTIONS_COUPES } from "@/lib/coupes-questions";
import { versLangue } from "@/lib/langue";
import { execFileSync } from "node:child_process";

/*
 * Le plan du site, dans les deux langues.
 *
 * Chaque page est déclarée dans les deux langues, et chacune des deux
 * entrées porte la liste complète des langues. C'est la forme que Google
 * demande : une entrée par adresse, et non une seule pour le français
 * avec l'anglais en annexe — une page qui ne figure nulle part en
 * « loc » n'est pas soumise, elle n'est au mieux que découverte par les
 * liens du site.
 *
 * « x-default » désigne le français : c'est la version servie à qui ne
 * demande ni l'une ni l'autre.
 *
 * Les coups de cœur n'y figurent pas. Cette page n'existe que dans le
 * navigateur de la visiteuse, et elle porte « noindex » : l'annoncer
 * serait se contredire.
 */

const PAGES = [
  "",
  "/robes",
  "/coupes",
  "/morphologies",
  "/trouver-ma-robe",
  "/showroom",
  "/a-propos",
  "/rendez-vous",
  "/faq",
  "/guides",
  "/createurs",
];

/*
 * La date de dernière modification, prise dans l'historique.
 *
 * Google se sert de « lastmod » quand il le trouve fiable, et l'ignore
 * sinon. La date du jour sur les cent quatre-vingt-quatre adresses
 * aurait été le contraire d'une information : un site ne change pas
 * entièrement à chaque publication.
 *
 * On date donc chaque section d'après le dernier commit qui a touché le
 * fichier où son contenu est écrit. C'est vrai, c'est vérifiable, et
 * cela donne des dates différentes — le catalogue n'a pas bougé le jour
 * où les morphologies ont été réécrites.
 *
 * Si git n'est pas là, ou si le clone est superficiel, on ne date rien :
 * une date fausse vaut moins que pas de date.
 */
const DATES = new Map<string, string | undefined>();

function derniereTouche(fichier: string): string | undefined {
  if (!DATES.has(fichier)) {
    try {
      const sortie = execFileSync("git", ["log", "-1", "--format=%cI", "--", fichier], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      DATES.set(fichier, sortie || undefined);
    } catch {
      DATES.set(fichier, undefined);
    }
  }
  return DATES.get(fichier);
}

/* Où le contenu de chaque rubrique est écrit. Le premier motif qui
 * correspond gagne ; la racine et les pages de la maison retombent sur
 * la table des textes. */
const SOURCES: [string, string][] = [
  ["/robes", "lib/madamoon.ts"],
  ["/createurs", "lib/madamoon.ts"],
  /* Les pages des questions avant la FAQ : leur texte est ailleurs. */
  ["/faq/", "lib/questions.ts"],
  ["/faq", "lib/madamoon.ts"],
  ["/coupes", "lib/coupes.ts"],
  ["/morphologies", "lib/morphologies.ts"],
  /* Le sommaire des guides change quand une question s'ajoute. */
  ["/guides", "lib/coupes-questions.ts"],
];

function dateDe(adresseFr: string): Date | undefined {
  const source =
    SOURCES.find(([prefixe]) => adresseFr.startsWith(prefixe))?.[1] ?? "lib/textes.ts";
  const quand = derniereTouche(source);
  return quand ? new Date(quand) : undefined;
}

/* Les deux entrées d'une page : la française et l'anglaise. */
function entree(adresseFr: string, priority: number) {
  /* La barre oblique finale, parce que c'est ainsi que le site est
   * servi : l'export statique écrit des dossiers, et « /robes » renvoie
   * une redirection vers « /robes/ ». Un plan de site qui n'annonce que
   * des redirections fait perdre un aller-retour à chaque adresse, et la
   * Search Console le signale. */
  const barre = (a: string) => `${SITE_URL}${a === "/" || a === "" ? "" : a}/`;
  const fr = barre(adresseFr);
  const en = barre(versLangue(adresseFr || "/", "en"));
  const langues = { fr, en, "x-default": fr };
  const lastModified = dateDe(adresseFr || "/");
  return [
    {
      url: fr,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: langues },
    },
    {
      url: en,
      lastModified,
      changeFrequency: "monthly" as const,
      /* L'anglais vient après : la maison est parisienne, et ses mariées
       * cherchent en français. */
      priority: Math.round((priority - 0.1) * 10) / 10,
      alternates: { languages: langues },
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.flatMap((p) => entree(p, p === "" ? 1 : 0.8)),
    ...CREATEURS.flatMap((c) => entree(`/createurs/${c.slug}`, 0.7)),
    ...COUPES.flatMap((s) => entree(`/coupes/${s.ancre}`, 0.7)),
    ...COUPES.flatMap((s) =>
      (QUESTIONS_COUPES[s.ancre] ?? []).flatMap((x) => entree(`/coupes/${s.ancre}/${x.slug}`, 0.6)),
    ),
    ...MORPHOLOGIES.flatMap((m) => entree(`/morphologies/${m.lettre.toLowerCase()}`, 0.7)),
    ...ROBES.flatMap((r) => entree(`/robes/${r.slug}`, 0.6)),
    ...SLUGS_QUESTIONS.flatMap((s) => entree(`/faq/${s}`, 0.6)),
    ...MORPHOLOGIES.flatMap((m) =>
      (QUESTIONS_MORPHO[m.lettre] ?? []).flatMap((x) =>
        entree(`/morphologies/${m.lettre.toLowerCase()}/${x.slug}`, 0.6),
      ),
    ),
  ];
}
