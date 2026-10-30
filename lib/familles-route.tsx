import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageFamille from "@/components/pages/PageFamille";
import { adresseFamille, pageFamille, pagesDe, type Famille } from "@/lib/familles";
import { partage } from "@/lib/meta";

/*
 * Les trois rubriques (styles, matières, détails) partagent la même
 * route : chacune ne fait que nommer sa famille. Pages françaises
 * seulement pour l'instant ; pas de « hreflang » vers un anglais qui
 * n'existe pas.
 */
export function routeFamille(famille: Famille) {
  return {
    generateStaticParams: () => pagesDe(famille).map((p) => ({ slug: p.slug })),
    generateMetadata: async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
      const { slug } = await params;
      const p = pageFamille(famille, slug);
      if (!p) return {};
      const adresse = `${adresseFamille(p)}/`;
      return {
        title: p.titre,
        description: p.description,
        alternates: { canonical: adresse },
        openGraph: partage(adresse),
      };
    },
    Page: async ({ params }: { params: Promise<{ slug: string }> }) => {
      const { slug } = await params;
      const p = pageFamille(famille, slug);
      if (!p) notFound();
      return <PageFamille page={p} langue="fr" />;
    },
  };
}
