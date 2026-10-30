import Link from "next/link";
import { JsonLd, filDArianeSchema } from "@/lib/seo/schema";

export default function FilDAriane({ rangs }: { rangs: { nom: string; adresse: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="legende">
      <ol className="flex flex-wrap items-center gap-x-2">
        <li><Link href="/" className="lien">Accueil</Link><span aria-hidden="true" className="ml-2 text-brume">›</span></li>
        {rangs.map((r, i) => (
          <li key={r.adresse} aria-current={i === rangs.length - 1 ? "page" : undefined}>
            {i === rangs.length - 1 ? <span className="text-brume">{r.nom}</span> : (<><Link href={r.adresse} className="lien">{r.nom}</Link><span aria-hidden="true" className="ml-2 text-brume">›</span></>)}
          </li>
        ))}
      </ol>
      <JsonLd data={filDArianeSchema(rangs)} />
    </nav>
  );
}
