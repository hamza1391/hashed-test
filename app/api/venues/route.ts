import { NextRequest } from "next/server";
import { searchVenueListings } from "@/lib/venues/search";
import { defaultVenueFilters, type VenueFilters } from "@/lib/venues/filters";
import type { VenueListingCategoryId, VenueSortId } from "@/lib/venues/types";
import type { ListingTab } from "@/store/ui-store";

export const dynamic = "force-dynamic";

function parseFilters(value: string | null): VenueFilters {
  if (!value) return defaultVenueFilters;
  try {
    return { ...defaultVenueFilters, ...JSON.parse(value) };
  } catch {
    return defaultVenueFilters;
  }
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const data = searchVenueListings({
    locationId: params.get("where") ?? "london",
    dateId: params.get("when") ?? "anytime",
    guestsId: params.get("guests") ?? "10-20",
    listingTab: (params.get("tab") as ListingTab) === "vendors" ? "vendors" : "venue",
    categoryId: (params.get("category") as VenueListingCategoryId) ?? "photo-studio",
    sortId: (params.get("sort") as VenueSortId) ?? "recommended",
    keywords: (params.get("keywords") ?? "").split(",").filter(Boolean),
    filters: parseFilters(params.get("filters")),
  });

  return Response.json(data);
}
