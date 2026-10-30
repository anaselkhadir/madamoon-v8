import Link from "next/link";
import Film from "@/components/media/Film";
import Rideau from "@/components/motion/Rideau";
import Ligne from "@/components/motion/Ligne";
import { SCENES } from "@/content/medias";
import { MAISON } from "@/content/madamoon";
import { altScene } from "@/lib/alt";

/* 07 — Le showroom : un film 21:9 en rideau, l'adresse, les horaires. */
export default function Showroom() {
  const plan = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${MAISON.nom}, ${MAISON.adresse}, ${MAISON.codePostal} ${MAISON.ville}`)}`;
  return (
    <section aria-labelledby="showroom" className="bg-ivoire">
      <Rideau className="aspect-[4/5] md:aspect-film">
        <Film src="/film/escalier.mp4" affiche={SCENES["escalier-affiche"]} alt={altScene("L'escalier et le vitrail du showroom")} sizes="100vw" className="h-full w-full" />
      </Rideau>
      <div className="cadre section grille">
        <div className="md:col-span-6">
          <p className="numero mb-3">06</p>
          <Ligne as="h2" className="titre-2"><span id="showroom">Le showroom, <em>Paris 10ᵉ</em></span></Ligne>
          <p className="texte mt-8 text-graphite">Le showroom est privatisé pour vous pendant une heure, sur rendez-vous. Venez accompagnée : votre mère, vos amies, qui vous voulez. Les robes sont ensuite confectionnées à vos mesures, retouches comprises.</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link href="/showroom/" className="bouton bouton-filet">Découvrir le showroom</Link>
            <a href={plan} className="lien text-[0.875rem]" rel="noopener">Itinéraire</a>
          </div>
        </div>
        <address className="legende not-italic md:col-span-4 md:col-start-9 md:pt-3">
          <p className="mention mb-3">Adresse</p>
          <p>{MAISON.adresse}<br />{MAISON.codePostal} {MAISON.ville}</p>
          <p className="mention mb-3 mt-8">Horaires</p>
          {MAISON.horaires.map((h) => (<p key={h.jour}>{h.jour} — {h.heures}</p>))}
          <p className="mt-1">{MAISON.mentionHoraires}</p>
          <p className="mt-8"><a href={MAISON.telephoneHref} className="lien">{MAISON.telephone}</a></p>
        </address>
      </div>
    </section>
  );
}
