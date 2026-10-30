import { routeFamille } from "@/lib/familles-route";

/* Les pages « details » : /details/[slug]/. Données dans lib/familles.ts. */
const route = routeFamille("details");
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
