import { buildCatalog } from "@/lib/api/catalog";

export async function GET() {
  return Response.json(buildCatalog());
}
