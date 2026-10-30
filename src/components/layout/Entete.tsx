"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAISON } from "@/content/madamoon";

const ENTREES = [
  { href: "/robes/", label: "Robes" },
  { href: "/coupes/", label: "Coupes" },
  { href: "/morphologies/", label: "Morphologies" },
  { href: "/createurs/", label: "Créateurs" },
  { href: "/showroom/", label: "Showroom" },
];

/*
 * L'en-tête : une barre fine, transparente sur l'affiche, Porcelaine voilée
 * au défilement. Le menu plein écran est une liste typographique.
 */
export default function Entete({ surAffiche = false }: { surAffiche?: boolean }) {
  const [defile, setDefile] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const chemin = usePathname();

  useEffect(() => {
    const lire = () => setDefile(window.scrollY > 24);
    lire();
    window.addEventListener("scroll", lire, { passive: true });
    return () => window.removeEventListener("scroll", lire);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", ouvert);
    const echap = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", echap);
    return () => window.removeEventListener("keydown", echap);
  }, [ouvert]);

  const clair = surAffiche && !defile && !ouvert;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[var(--z-entete)] h-entete transition-[background-color,backdrop-filter] duration-500 ${
          defile && !ouvert ? "bg-voile backdrop-blur-md" : ""
        }`}
        style={{ color: clair ? "var(--color-blanc)" : "var(--color-encre)" }}
      >
        <div className="cadre flex h-full items-center justify-between">
          <Link href="/" aria-label={`${MAISON.nom}, accueil`} className="block">
            <img
              src={clair ? "/marque/logo-blanc.png" : "/marque/logo-encre.png"}
              alt=""
              width={513}
              height={56}
              className="h-[14px] w-auto md:h-[16px]"
            />
          </Link>
          <nav aria-label="Navigation principale" className="hidden items-center gap-9 text-[0.8125rem] tracking-[0.04em] md:flex">
            {ENTREES.map((e) => (
              <Link key={e.href} href={e.href} className="lien" aria-current={chemin === e.href ? "page" : undefined}>
                {e.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/rendez-vous/" className={`bouton !h-10 ${clair ? "bouton-blanc" : ""}`}>
              Rendez-vous
            </Link>
            <button
              type="button"
              onClick={() => setOuvert((o) => !o)}
              aria-expanded={ouvert}
              aria-controls="menu"
              className="relative h-10 w-10 md:hidden"
              aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <span className={`absolute left-2 right-2 top-[15px] h-px bg-current transition-transform duration-500 ease-sortie ${ouvert ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`absolute left-2 right-2 top-[23px] h-px bg-current transition-transform duration-500 ease-sortie ${ouvert ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu"
        className={`fixed inset-0 z-[var(--z-menu)] bg-porcelaine transition-[clip-path] duration-700 ease-rideau ${ouvert ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`}
        aria-hidden={!ouvert}
      >
        <div className="cadre flex h-full flex-col justify-between pb-10 pt-28">
          <nav aria-label="Menu" className="flex flex-col">
            {ENTREES.map((e, i) => (
              <Link
                key={e.href}
                href={e.href}
                className="titre-1 filet py-4 transition-[opacity,transform] duration-700 ease-sortie"
                style={{ transitionDelay: ouvert ? `${120 + i * 70}ms` : "0ms", opacity: ouvert ? 1 : 0, transform: ouvert ? "none" : "translateY(1rem)" }}
                tabIndex={ouvert ? 0 : -1}
                onClick={() => setOuvert(false)}
              >
                {e.label}
              </Link>
            ))}
          </nav>
          <div className="legende flex flex-col gap-2">
            <a href={MAISON.telephoneHref} className="lien self-start">{MAISON.telephone}</a>
            <span>{MAISON.adresse}, {MAISON.codePostal} {MAISON.ville}</span>
            <Link href="/rendez-vous/" className="bouton mt-4 self-start" tabIndex={ouvert ? 0 : -1} onClick={() => setOuvert(false)}>Prendre rendez-vous</Link>
          </div>
        </div>
      </div>
    </>
  );
}
