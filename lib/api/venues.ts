import { api } from "@/lib/api/client";
import type {
  VenueListingsQuery,
  VenueListingsResponse,
} from "@/lib/venues/search";

export async function getVenueListings(
  query: VenueListingsQuery
): Promise<VenueListingsResponse> {
  const { data } = await api.get<VenueListingsResponse>("/venues", {
    params: {
      where: query.locationId,
      when: query.dateId,
      guests: query.guestsId,
      tab: query.listingTab,
      category: query.categoryId,
      sort: query.sortId,
      keywords: query.keywords.join(","),
      filters: JSON.stringify(query.filters),
    },
  });

  return data;
}
