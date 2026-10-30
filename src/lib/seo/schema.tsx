import { MAISON, SITE_URL, CREATEURS, type Robe } from "@/content/madamoon";
import type { Media } from "@/content/medias";

/*
 * Données structurées. Tout ce qui est déclaré ici est vérifiable sur la
 * page : adresse, horaires, créateurs, prix de départ. Rien d'autre.
 */
export const ID_MAISON = `${SITE_URL}/#maison`;
export const PRIX_PLANCHER = Number(MAISON.prixDepart.replace(/[^\d]/g, ""));

const HORAIRES = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "12:00", closes: "21:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" },
];

export function maisonSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ClothingStore", "LocalBusiness"],
        "@id": ID_MAISON,
        name: MAISON.nom,
        description: `Boutique de robes de mariée à ${MAISON.ville} 10e : collections de plusieurs créateurs, essayage privé sur rendez-vous, confection sur mesure à partir de ${MAISON.prixDepart}.`,
        url: SITE_URL,
        telephone: MAISON.telephone,
        email: MAISON.email,
        image: `${SITE_URL}/partage/madamoon-showroom-paris-10e.jpg`,
        logo: `${SITE_URL}/marque/logo-encre.png`,
        priceRange: `à partir de ${MAISON.prixDepart}`,
        currenciesAccepted: "EUR",
        address: { "@type": "PostalAddress", streetAddress: MAISON.adresse, postalCode: MAISON.codePostal, addressLocality: MAISON.ville, addressCountry: "FR" },
        areaServed: { "@type": "City", name: MAISON.ville },
        openingHoursSpecification: HORAIRES,
        sameAs: MAISON.reseaux.map((r) => r.href),
        brand: CREATEURS.filter((c) => c.slug !== "autres-createurs").map((c) => ({ "@type": "Brand", name: c.nom })),
        potentialAction: { "@type": "ReserveAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/rendez-vous/`, inLanguage: "fr" }, result: { "@type": "Reservation", name: "Essayage privé" } },
      },
      { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: SITE_URL, name: MAISON.nom, inLanguage: "fr-FR", publisher: { "@id": ID_MAISON } },
    ],
  };
}

export function filDArianeSchema(rangs: { nom: string; adresse: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ nom: "Accueil", adresse: "/" }, ...rangs].map((r, i) => ({
      "@type": "ListItem", position: i + 1, name: r.nom, item: `${SITE_URL}${r.adresse}`,
    })),
  };
}

export function robeSchema(robe: Robe, coupe: string, media: Media | undefined) {
  const url = `${SITE_URL}/robes/${robe.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#robe`,
    name: `Robe de mariée ${robe.nom}`,
    description: robe.ligne,
    category: `Robe de mariée ${coupe}`,
    image: media ? media.widths.map((w) => `${SITE_URL}/robes/${media.name}-${w}.webp`) : undefined,
    brand: robe.createur && robe.createur !== "Autres créateurs" ? { "@type": "Brand", name: robe.createur } : undefined,
    url,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStoreOnly",
      priceCurrency: "EUR",
      priceSpecification: { "@type": "PriceSpecification", minPrice: PRIX_PLANCHER, priceCurrency: "EUR", description: "Confection sur mesure, retouches comprises" },
      seller: { "@id": ID_MAISON },
      url: `${SITE_URL}/rendez-vous/`,
    },
    additionalProperty: [{ "@type": "PropertyValue", name: "Essayage", value: "Sur rendez-vous, showroom Paris 10e" }],
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
