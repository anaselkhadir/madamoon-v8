import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageGuide from "@/components/pages/PageGuide";
import { GUIDES, guideParSlug } from "@/lib/guides";
import { partage } from "@/lib/meta";

/* Un guide par adresse, sous /guides/. Français seulement pour l'instant. */

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = guideParSlug(slug);
  if (!g) return {};
  const adresse = `/guides/${slug}/`;
  return { title: g.titre, description: g.description, alternates: { canonical: adresse }, openGraph: partage(adresse) };
}

export default async function Guide({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideParSlug(slug);
  if (!g) notFound();
  return <PageGuide guide={g} langue="fr" />;
}
