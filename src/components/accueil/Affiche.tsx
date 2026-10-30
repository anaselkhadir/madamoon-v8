import Link from "next/link";
import Film from "@/components/media/Film";
import Ligne from "@/components/motion/Ligne";
import Rideau from "@/components/motion/Rideau";
import { SCENES } from "@/content/medias";
import { MAISON } from "@/content/madamoon";
import { altScene } from "@/lib/alt";

/* 01 — L'affiche : plein écran, le film du showroom, le titre qui monte ligne à ligne. */
export default function Affiche() {
  return (
    <section className="relative min-h-[100dvh] text-blanc" aria-label="Ouverture">
      <Rideau immediat depuis="haut" className="absolute inset-0">
        <div className="absolute inset-0">
          <Film src="/film/hero-desktop.mp4" affiche={SCENES["hero-affiche"]} alt={altScene("Une mariée en robe sirène dans le showroom")} sizes="100vw" className="hidden h-full w-full md:block" position="center 30%" />
          <Film src="/film/hero-mobile.mp4" affiche={SCENES["hero-affiche-mobile"]} alt={altScene("Une mariée en robe sirène dans le showroom")} sizes="100vw" className="h-full w-full md:hidden" position="center 30%" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,23,20,0.08)_0%,rgba(26,23,20,0)_35%,rgba(26,23,20,0.55)_100%)]" aria-hidden="true" />
        </div>
      </Rideau>
      <div className="cadre relative flex min-h-[100dvh] flex-col justify-end pb-[calc(var(--spacing-gouttiere)*1.2)] pt-32">
        <p className="mention mb-6 text-blanc/80">{MAISON.adresse} — {MAISON.ville} 10ᵉ</p>
        <Ligne as="h1" immediat delai={0.6} className="affiche max-w-[13ch]">
          Robes de mariée à Paris, en essayage <em>privé</em>.
        </Ligne>
        <div className="mt-10 flex flex-wrap items-center gap-7">
          <Link href="/rendez-vous/" className="bouton bouton-blanc">Prendre rendez-vous</Link>
          <Link href="/robes/" className="lien text-[0.875rem] tracking-[0.02em]">Voir les robes</Link>
        </div>
      </div>
    </section>
  );
}
