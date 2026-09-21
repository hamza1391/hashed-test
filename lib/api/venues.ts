import {
  searchVenueListings,
  type VenueListingsQuery,
  type VenueListingsResponse,
} from "@/lib/venues/search";

export async function getVenueListings(
  query: VenueListingsQuery
): Promise<VenueListingsResponse> {
  return searchVenueListings(query);
}
