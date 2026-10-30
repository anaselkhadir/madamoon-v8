import Link from "@/components/Lien";
import { t } from "@/lib/textes";
import type { Langue } from "@/lib/langue";

export default function PageIntrouvable({ langue }: { langue: Langue }) {
  const L = t(langue).pages.introuvable;
  return (
    <section className="gouttiere flex min-h-svh flex-col justify-center">
      <p className="legende">{L.erreur}</p>
      <h1 className="affiche mt-4 text-encre">{L.titre}</h1>
      <p className="texte mesure-l mt-6">{L.texte}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/robes" className="bouton">
          {L.voirLesRobes}
        </Link>
        <Link href="/" className="bouton-trait">
          {L.accueil}
        </Link>
      </div>
    </section>
  );
}
