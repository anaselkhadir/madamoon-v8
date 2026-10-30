import Link from "next/link";
import Entete from "@/components/layout/Entete";

export default function Introuvable() {
  return (
    <>
      <Entete />
      <main className="cadre flex min-h-[70dvh] flex-col justify-center pt-entete">
        <p className="numero mb-4">404</p>
        <h1 className="titre-1 max-w-[14ch]">Cette page n'existe <em>pas</em>.</h1>
        <p className="texte mt-8 text-graphite">La robe que vous cherchez est peut-être ailleurs dans le catalogue, ou la page a changé d'adresse.</p>
        <div className="mt-8 flex gap-6"><Link href="/robes/" className="bouton">Toutes les robes</Link><Link href="/" className="lien self-center text-[0.875rem]">Retour à l'accueil</Link></div>
      </main>
    </>
  );
}
