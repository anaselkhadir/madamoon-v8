import { routeFamille } from "@/lib/familles-route";

/* Les pages « styles » : /styles/[slug]/. Données dans lib/familles.ts. */
const route = routeFamille("styles");
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
