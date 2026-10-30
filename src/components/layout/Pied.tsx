import Link from "next/link";
import { MAISON } from "@/content/madamoon";
import { ANNEE } from "@/content/version";

const COUPES = [
  ["Sirène", "/coupes/sirene/"], ["Princesse", "/coupes/princesse/"], ["Fluide", "/coupes/fluide/"],
  ["Trapèze", "/coupes/trapeze/"], ["Deux-en-un", "/coupes/deux-en-un/"],
];
const STYLES = [
  ["Bohème", "/styles/boheme/"], ["Minimaliste", "/styles/minimaliste/"], ["Dentelle", "/matieres/dentelle/"],
  ["Manches longues", "/details/manches-longues/"], ["Morphologies", "/morphologies/"],
];
const MAISONS = [
  ["Watters Designs", "/createurs/watters-designs/"], ["Casablanca Bridal", "/createurs/casablanca-bridal/"],
  ["Olya Mak", "/createurs/olya-mak/"], ["Monica Loretti", "/createurs/monica-loretti/"],
];

export default function Pied() {
  return (
    <footer className="bg-ivoire">
      <div className="cadre section-courte">
        <div className="grid grid-cols-1 gap-x-gouttiere gap-y-10 md:grid-cols-12">
          <address className="legende not-italic md:col-span-5">
            <img src="/marque/logo-encre.png" alt={MAISON.nom} width={513} height={56} className="mb-6 h-[14px] w-auto" />
            <p>{MAISON.baseline}</p>
            <p className="mt-4">{MAISON.adresse}<br />{MAISON.codePostal} {MAISON.ville}</p>
            <p className="mt-4">
              {MAISON.horaires.map((h) => (<span key={h.jour} className="block">{h.jour} — {h.heures}</span>))}
              <span className="block">{MAISON.mentionHoraires}</span>
            </p>
            <p className="mt-4"><a href={MAISON.telephoneHref} className="lien">{MAISON.telephone}</a><br /><a href={MAISON.emailHref} className="lien">{MAISON.email}</a></p>
          </address>
          {[["Coupes", COUPES], ["Styles et matières", STYLES], ["Maisons", MAISONS]].map(([titre, liens]) => (
            <nav key={titre as string} aria-label={titre as string} className={`legende ${titre === "Maisons" ? "md:col-span-3" : "md:col-span-2"}`}>
              <p className="mention mb-4">{titre as string}</p>
              <ul className="flex flex-col gap-2">
                {(liens as string[][]).map(([l, h]) => (<li key={h}><Link href={h} className="lien">{l}</Link></li>))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="filet mt-14 flex flex-col gap-3 pt-6 text-[0.75rem] text-brume md:flex-row md:items-center md:justify-between">
          <p>© {ANNEE} {MAISON.nom} — boutique de robes de mariée à Paris 10ᵉ</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {MAISON.reseaux.map((r) => (<li key={r.href}><a href={r.href} className="lien" rel="noopener">{r.label}</a></li>))}
            <li><Link href="/guides/" className="lien">Guides</Link></li>
            <li><Link href="/faq/" className="lien">Questions fréquentes</Link></li>
            <li><Link href="/mentions-legales/" className="lien">Mentions légales</Link></li>
            <li><Link href="/confidentialite/" className="lien">Confidentialité</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
