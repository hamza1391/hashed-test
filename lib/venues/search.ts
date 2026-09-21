import {
  venueListingCategories,
  venueListings,
} from "@/lib/data/useVenueListingData";
import { guestRangeFromId } from "@/lib/search/venue-params";
import type { ListingTab } from "@/store/ui-store";
import {
  defaultVenueFilters,
  type VenueFilters,
} from "@/lib/venues/filters";
import type {
  VenueListing,
  VenueListingCategoryId,
  VenueSortId,
} from "@/lib/venues/types";

export type VenueListingsQuery = {
  locationId: string;
  dateId: string;
  guestsId: string;
  listingTab: ListingTab;
  categoryId: VenueListingCategoryId;
  sortId: VenueSortId;
  keywords: string[];
  filters: VenueFilters;
};

export type VenueListingsResponse = {
  results: VenueListing[];
  displayCount: number;
  category: (typeof venueListingCategories)[number] | undefined;
};

export function matchesVenueFilters(
  venue: VenueListing,
  filters: VenueFilters,
  keywords: string[],
  categoryId: VenueListingCategoryId,
  locationId: string,
  guestsId: string
) {
  if (venue.locationId !== locationId) return false;
  if (venue.capacity < guestRangeFromId(guestsId).min) return false;
  if (categoryId !== "all" && venue.categoryId !== categoryId) return false;
  if (filters.verifiedOnly && !venue.verified) return false;
  if (filters.minSize && venue.sizeValue < filters.minSize) return false;
  if (venue.capacity < filters.capacityMin || venue.capacity > filters.capacityMax) {
    return false;
  }
  if (venue.price < filters.priceMin || venue.price > filters.priceMax) {
    return false;
  }
  if (
    filters.venueTypes.length > 0 &&
    !filters.venueTypes.some((type) => venue.venueTypes.includes(type))
  ) {
    return false;
  }
  if (
    filters.occasions.length > 0 &&
    !filters.occasions.some((occasion) => venue.occasions.includes(occasion))
  ) {
    return false;
  }
  if (
    filters.amenities.length > 0 &&
    !filters.amenities.every((amenity) => venue.amenities.includes(amenity))
  ) {
    return false;
  }

  const haystack = [
    venue.title,
    venue.location,
    venue.city,
    ...venue.venueTypes,
    ...venue.occasions,
    ...venue.amenities,
  ]
    .join(" ")
    .toLowerCase();

  return keywords.every((keyword) => haystack.includes(keyword.toLowerCase()));
}

export function searchVenueListings(
  query: VenueListingsQuery
): VenueListingsResponse {
  const category = venueListingCategories.find(
    (item) => item.id === query.categoryId
  );

  const results =
    query.listingTab === "vendors"
      ? []
      : venueListings
          .filter((venue) =>
            matchesVenueFilters(
              venue,
              query.filters,
              query.keywords,
              query.categoryId,
              query.locationId,
              query.guestsId
            )
          )
          .slice()
          .sort((a, b) => {
            if (query.sortId === "price-asc") return a.price - b.price;
            if (query.sortId === "price-desc") return b.price - a.price;
            return 0;
          });

  const tightened =
    query.keywords.length > 0 ||
    query.filters.venueTypes.length > 0 ||
    query.filters.occasions.length > 0 ||
    query.filters.amenities.length !== defaultVenueFilters.amenities.length ||
    query.filters.verifiedOnly !== defaultVenueFilters.verifiedOnly ||
    query.filters.capacityMin !== defaultVenueFilters.capacityMin ||
    query.filters.capacityMax !== defaultVenueFilters.capacityMax ||
    query.filters.priceMin !== defaultVenueFilters.priceMin ||
    query.filters.priceMax !== defaultVenueFilters.priceMax ||
    query.filters.minSize !== defaultVenueFilters.minSize;

  const displayCount =
    results.length === 0
      ? 0
      : tightened
        ? results.length
        : (category?.totalCount ?? results.length);

  return { results, displayCount, category };
}
