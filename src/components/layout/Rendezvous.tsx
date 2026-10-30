import Link from "next/link";
import { MAISON } from "@/content/madamoon";
import Ligne from "@/components/motion/Ligne";

/* Le point final : la seule grande surface de couleur du site, une fois par page. */
export default function Rendezvous({ titre = "Poussez la porte." }: { titre?: string }) {
  return (
    <section className="bg-rouge text-blanc" aria-labelledby="rdv-titre">
      <div className="cadre section grid grid-cols-1 items-end gap-gouttiere md:grid-cols-12">
        <Ligne as="h2" className="titre-1 max-w-[12ch] md:col-span-7"><span id="rdv-titre">{titre}</span></Ligne>
        <div className="md:col-span-5 md:justify-self-end">
          <p className="phrase mb-6 max-w-[26ch] opacity-90">Essayage privé d'une heure, sur rendez-vous, accompagnée de qui vous voulez.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/rendez-vous/" className="bouton bouton-blanc">Prendre rendez-vous</Link>
            <a href={MAISON.telephoneHref} className="lien">{MAISON.telephone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
