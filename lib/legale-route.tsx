import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLegale from "@/components/pages/PageLegale";
import { pageLegale, adresseLegale } from "@/lib/legal";
import { partage } from "@/lib/meta";

/*
 * Les trois pages légales partagent la même route : chacune ne fait que
 * nommer son identifiant. Françaises seulement, donc un canonique et pas
 * de « hreflang » — la version anglaise n'existe pas et ne doit pas être
 * promise.
 */
export function routeLegale(slug: string) {
  const page = pageLegale(slug);
  const adresse = page ? `${adresseLegale(page)}/` : "/";
  const metadata: Metadata = page
    ? {
        title: page.titre,
        description: page.description,
        alternates: { canonical: adresse },
        openGraph: partage(adresse),
      }
    : {};
  const Page = () => {
    if (!page) notFound();
    return <PageLegale page={page} />;
  };
  return { metadata, Page };
}
