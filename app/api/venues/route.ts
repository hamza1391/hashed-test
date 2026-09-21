import { NextRequest } from "next/server";
import { searchVenueListingsFromParams } from "@/lib/venues/search";

export async function GET(request: NextRequest) {
  const data = searchVenueListingsFromParams(request.nextUrl.searchParams);
  return Response.json(data);
}
