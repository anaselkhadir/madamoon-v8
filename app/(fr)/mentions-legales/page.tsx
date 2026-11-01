import { routeLegale } from "@/lib/legale-route";

const route = routeLegale("mentions-legales");
export const metadata = route.metadata;
export default route.Page;
