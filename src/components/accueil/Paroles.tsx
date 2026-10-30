import { AVIS } from "@/content/avis";
import Fondu from "@/components/motion/Fondu";

/* 08 — Paroles : des avis réels, mot pour mot, signés d'un prénom. Pas d'étoiles, pas de carrousel. */
export default function Paroles() {
  const trois = AVIS.slice(0, 3);
  return (
    <section aria-labelledby="paroles" className="cadre section">
      <p className="numero mb-3">07</p>
      <h2 id="paroles" className="titre-2">Elles l'ont <em>vécu</em></h2>
      <p className="legende mt-3">Avis publiés sur la fiche Google de la maison — note affichée 5,0 sur 200 avis, relevée en septembre 2026.</p>
      <div className="grille mt-14">
        {trois.map((a, i) => (
          <Fondu key={a.auteur} delai={i * 0.12} className={`md:col-span-4 ${i === 1 ? "md:pt-16" : ""}`}>
            <blockquote>
              <p className="phrase">« {a.extrait ?? a.texte} »</p>
              <footer className="mention mt-6">{a.auteur} — {a.date}</footer>
            </blockquote>
          </Fondu>
        ))}
      </div>
    </section>
  );
}
