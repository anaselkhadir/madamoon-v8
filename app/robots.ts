import type { MetadataRoute } from "next";

/* Ces deux fichiers sont écrits une fois, à la compilation : ils doivent
 * l'être aussi quand le site est exporté en fichiers statiques. */
export const dynamic = "force-static";
import { SITE_URL } from "@/lib/madamoon";
import { APERCU } from "@/lib/chemin";

export default function robots(): MetadataRoute.Robots {
  /* Sur l'aperçu, tout est fermé : rien de cette copie ne doit être indexé. */
  if (APERCU) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
