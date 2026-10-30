"use client";

/*
 * Le bouton qui appelle Élise.
 *
 * « Trouver ma robe » n'est plus une page à atteindre mais une
 * conversation à ouvrir. Le bouton nomme la maison quand il en vient
 * une : Élise sait alors de quel catalogue partir, sans avoir à deviner.
 *
 * C'est un bouton, pas un lien : il n'y a pas d'adresse au bout. Le guide
 * écrit reste accessible par ailleurs — /trouver-ma-robe — pour qui
 * préfère lire, et pour les moteurs.
 */

type Props = React.ComponentPropsWithoutRef<"button"> & { maison?: string };

export default function AppelElise({ maison, className = "bouton", ...reste }: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("elise:ouvrir", { detail: { maison } }))}
      {...reste}
    />
  );
}
