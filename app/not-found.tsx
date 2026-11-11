import type { Metadata } from "next";
import localFont from "next/font/local";
import PageIntrouvable from "@/components/pages/PageIntrouvable";
import "./globals.css";

/*
 * La page introuvable du site entier.
 *
 * Elle porte son propre « html », et c'est la seule façon : le site a
 * deux racines — une française, une anglaise — et une adresse qui ne
 * correspond à rien n'appartient à aucune des deux. Next ne peut donc
 * appliquer ni l'un ni l'autre gabarit, et sans ce fichier il servait sa
 * propre page, en anglais, hors charte.
 *
 * Elle est en français, la langue par défaut du site. Une visiteuse
 * anglophone qui se perd tombe sur une page française — c'est le prix
 * d'un fichier unique, et il est plus juste que celui d'une page qui ne
 * ressemble à rien.
 */

export const metadata: Metadata = {
  title: "Cette page n’existe pas — MADAMOON",
  robots: { index: false, follow: true },
};

/* Les mêmes fichiers que le gabarit (components/chrome/Gabarit.tsx),
 * servis depuis le dépôt : plus rien n'est téléchargé chez Google à la
 * construction, qui échouait quand le service ne répondait pas. */
const serif = localFont({
  src: "./polices/instrument-serif-400.woff2",
  weight: "400",
  style: "normal",
  variable: "--police-serif",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});

const sans = localFont({
  src: "./polices/inter-variable.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--police-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export default function Introuvable() {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <PageIntrouvable langue="fr" />
      </body>
    </html>
  );
}
