import {
  venueListingCategories,
  venueListings,
} from "@/lib/data/useVenueListingData";
import {
  matchesGuestCapacity,
  matchesVenueDate,
} from "@/lib/search/venue-params";
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
  listingTab: "venue" | "vendors";
  categoryId: VenueListingCategoryId;
  sortId: VenueSortId;
  keywords: string[];
  filters: VenueFilters;
  guestsSpecified?: boolean;
  dateSpecified?: boolean;
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
  guestsId: string,
  dateId = "anytime",
  guestsSpecified = false,
  dateSpecified = false
) {
  if (venue.locationId !== locationId) return false;
  if (!matchesGuestCapacity(venue.capacity, guestsId, guestsSpecified)) {
    return false;
  }
  if (!matchesVenueDate(venue.availableDateIds, dateId, dateSpecified)) {
    return false;
  }
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
              query.guestsId,
              query.dateId,
              query.guestsSpecified,
              query.dateSpecified
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
    query.filters.minSize !== defaultVenueFilters.minSize ||
    Boolean(query.guestsSpecified) ||
    Boolean(query.dateSpecified);

  const displayCount =
    results.length === 0
      ? 0
      : tightened
        ? results.length
        : (category?.totalCount ?? results.length);

  return { results, displayCount, category };
}

export function searchVenueListingsFromParams(
  params: URLSearchParams
): VenueListingsResponse {
  let filters = defaultVenueFilters;
  const rawFilters = params.get("filters");
  if (rawFilters) {
    try {
      filters = { ...defaultVenueFilters, ...JSON.parse(rawFilters) };
    } catch {
      filters = defaultVenueFilters;
    }
  }

  return searchVenueListings({
    locationId: params.get("where") ?? "london",
    dateId: params.get("when") ?? "anytime",
    guestsId: params.get("guests") ?? "10-20",
    listingTab: params.get("tab") === "vendors" ? "vendors" : "venue",
    categoryId:
      (params.get("category") as VenueListingCategoryId) ?? "photo-studio",
    sortId: (params.get("sort") as VenueSortId) ?? "recommended",
    keywords: (params.get("keywords") ?? "").split(",").filter(Boolean),
    filters,
    guestsSpecified: params.has("guests"),
    dateSpecified: params.has("when") && params.get("when") !== "anytime",
  });
}
