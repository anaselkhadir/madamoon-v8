import Ligne from "@/components/motion/Ligne";
import Derive from "@/components/motion/Derive";
import Rideau from "@/components/motion/Rideau";
import Photo from "@/components/media/Photo";
import { SCENES } from "@/content/medias";
import { ROBES, CREATEURS } from "@/content/madamoon";
import { altScene } from "@/lib/alt";

/* 02 — Le manifeste : trois lignes très grandes, une photographie de détail qui dérive. */
export default function Manifeste() {
  const maisons = CREATEURS.filter((c) => c.slug !== "autres-createurs").length;
  return (
    <section className="bg-ivoire" aria-labelledby="manifeste">
      <div className="cadre section grille">
        <div className="md:col-span-8">
          <p className="numero mb-8">01</p>
          <Ligne as="h2" className="titre-1 max-w-[16ch]">
            <span id="manifeste">Une boutique, pas une maison de couture. {maisons} maisons, {ROBES.length} robes. Une heure, le showroom pour <em>vous seule</em>.</span>
          </Ligne>
          <p className="texte mt-10 text-graphite">
            MADAMOON réunit à Paris 10ᵉ les collections de créateurs choisis une à une. On n'essaie pas tout ; on essaie ce qu'il faut, dans un showroom fermé pour vous, le temps qu'il faut. La robe est ensuite confectionnée à vos mesures, retouches comprises.
          </p>
        </div>
        <div className="md:col-span-3 md:col-start-10 md:pt-24">
          <Derive amplitude={5}>
            <Rideau className="aspect-detail">
              <Photo media={SCENES["dentelle"]} dossier="scenes" alt={altScene("Détail d'une dentelle de robe de mariée")} sizes="(min-width: 768px) 24vw, 60vw" className="h-full w-full object-cover" />
            </Rideau>
          </Derive>
          <p className="mention mt-3">Dentelle — détail</p>
        </div>
      </div>
    </section>
  );
}
