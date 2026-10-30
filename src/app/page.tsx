import type { Metadata } from "next";
import Entete from "@/components/layout/Entete";
import Affiche from "@/components/accueil/Affiche";
import Manifeste from "@/components/accueil/Manifeste";
import Portes from "@/components/accueil/Portes";
import Defile from "@/components/accueil/Defile";
import Lettres from "@/components/accueil/Lettres";
import Maisons from "@/components/accueil/Maisons";
import Showroom from "@/components/accueil/Showroom";
import Paroles from "@/components/accueil/Paroles";
import Edito from "@/components/accueil/Edito";
import Rendezvous from "@/components/layout/Rendezvous";
import { MAISON, ROBES } from "@/content/madamoon";

export const metadata: Metadata = {
  title: { absolute: `${MAISON.nom} | Robes de mariée à Paris, essayage privé` },
  description: `Boutique de robes de mariée à Paris 10e : les collections de plusieurs créateurs, un essayage privé d'une heure sur rendez-vous, confection sur mesure à partir de ${MAISON.prixDepart}.`,
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Accueil() {
  return (
    <>
      <Entete surAffiche />
      <main>
        <Affiche />
        <Manifeste />
        <Portes />
        <Defile robes={ROBES.slice(0, 8)} />
        <Lettres />
        <Maisons />
        <Showroom />
        <Paroles />
        <Edito />
        <Rendezvous />
      </main>
    </>
  );
}
