import { media as chemin } from "@/lib/chemin";

/*
 * Le sigle de la maison.
 *
 * Deux fichiers existent — l'encre et le blanc — et c'est le vrai blanc
 * qui sert en mode sombre, non une inversion du noir : une inversion
 * rend un blanc légèrement froid, et un sigle est ce qu'on retouche en
 * dernier.
 *
 * Les deux images sont posées, l'une masquée par la feuille de style
 * selon le thème. C'est ce qui évite le clignotement : un composant qui
 * lirait l'attribut du thème au rendu ne pourrait pas le faire sans
 * désaccord d'hydratation, et le sigle sauterait d'une image à l'autre
 * au chargement.
 *
 * Sur une photographie, le blanc s'impose quel que soit le thème : une
 * image reste une image.
 */

export default function Logo({
  className = "",
  surImage = false,
}: {
  className?: string;
  surImage?: boolean;
}) {
  if (surImage) {
    /* eslint-disable-next-line @next/next/no-img-element */
    return (
      <img
        src={chemin("/marque/logo-blanc.png")}
        alt="MADAMOON"
        width={513}
        height={56}
        className={className}
      />
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={chemin("/marque/logo-encre.png")}
        alt="MADAMOON"
        width={513}
        height={56}
        className={`logo-clair ${className}`}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={chemin("/marque/logo-blanc.png")}
        alt=""
        aria-hidden="true"
        width={513}
        height={56}
        className={`logo-sombre ${className}`}
      />
    </>
  );
}
