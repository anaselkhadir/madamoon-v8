import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
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

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--police-serif",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--police-sans",
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
