import { buildHomeContent } from "@/lib/api/home";

export async function GET() {
  return Response.json(buildHomeContent());
}
