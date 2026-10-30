import { routeFamille } from "@/lib/familles-route";

/* Les pages « matieres » : /matieres/[slug]/. Données dans lib/familles.ts. */
const route = routeFamille("matieres");
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
