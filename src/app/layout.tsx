import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { MAISON, SITE_URL } from "@/content/madamoon";
import Mouvement from "@/lib/motion/Mouvement";
import Pied from "@/components/layout/Pied";
import { JsonLd, maisonSchema } from "@/lib/seo/schema";

const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--police-bodoni",
  display: "swap",
});
const instrument = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--police-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${MAISON.nom} | Robes de mariée à Paris`, template: `%s — ${MAISON.nom}` },
  description: `Boutique de robes de mariée à Paris 10e. Les collections de plusieurs créateurs, essayage privé sur rendez-vous, confection sur mesure à partir de ${MAISON.prixDepart}.`,
  applicationName: MAISON.nom,
  openGraph: {
    type: "website",
    siteName: `${MAISON.nom} | Robes de mariée à Paris`,
    locale: "fr_FR",
    images: [{ url: "/partage/madamoon-showroom-paris-10e.jpg", width: 1200, height: 630, alt: "Le showroom MADAMOON à Paris 10e" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#fbf9f5", colorScheme: "light", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${bodoni.variable} ${instrument.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        <Mouvement />
        {children}
        <Pied />
        <JsonLd data={maisonSchema()} />
      </body>
    </html>
  );
}
