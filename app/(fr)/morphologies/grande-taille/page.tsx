import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageFamille from "@/components/pages/PageFamille";
import { adresseFamille, pageFamille } from "@/lib/familles";
import { partage } from "@/lib/meta";

/*
 * La grande taille vit sous /morphologies/, à côté des six silhouettes,
 * mais n'en est pas une : une route fixe, qui prend la mise en page des
 * pages de famille. Le segment fixe gagne sur « [lettre] » dans Next.
 * Page française seulement ; pas de « hreflang » vers un anglais qui
 * n'existe pas.
 */
const page = pageFamille("morphologies", "grande-taille");

export function generateMetadata(): Metadata {
  if (!page) return {};
  const adresse = `${adresseFamille(page)}/`;
  return {
    title: page.titre,
    description: page.description,
    alternates: { canonical: adresse },
    openGraph: partage(adresse),
  };
}

export default function GrandeTaille() {
  if (!page) notFound();
  return <PageFamille page={page} langue="fr" />;
}
