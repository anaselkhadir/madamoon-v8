"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { langueDe, versLangue } from "@/lib/langue";

/*
 * Le lien qui reste dans sa langue.
 *
 * Partout dans le site, un lien s'écrit en français : « /robes/uma ».
 * C'est la seule table à tenir. Celui-ci lit la langue de la page où il
 * se trouve et traduit l'adresse au passage — sur une page anglaise,
 * le même lien mène à « /en/dresses/uma ».
 *
 * Il remplace « next/link » par un import et rien d'autre : même
 * signature, même comportement, même préchargement. C'était la seule
 * façon de rendre bilingue une centaine de liens sans les réécrire un
 * par un, et sans qu'un futur lien oublie de l'être.
 */

type Props = React.ComponentProps<typeof NextLink>;

export default function Lien({ href, ...reste }: Props) {
  const chemin = usePathname();
  const langue = langueDe(chemin ?? "/");
  const adresse = typeof href === "string" ? versLangue(href, langue) : href;
  return <NextLink href={adresse} {...reste} />;
}
