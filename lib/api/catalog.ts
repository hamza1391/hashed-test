import {
  currentUser,
  dates,
  guestOptions,
  languages,
  listingOptions,
  locations,
  profileOptions,
  heroSlides,
} from "@/lib/data/useherodata";
import {
  amenityOptions,
  occasionOptions,
  sortOptions,
  venueListingCategories,
  venueTypes,
} from "@/lib/data/useVenueListingData";
import { api } from "@/lib/api/client";

export function buildCatalog() {
  return {
    locations,
    dates,
    guestOptions,
    languages,
    listingOptions,
    currentUser,
    profileOptions,
    heroSlides,
    venueListingCategories,
    venueTypes,
    occasionOptions,
    amenityOptions,
    sortOptions,
  };
}

export type Catalog = ReturnType<typeof buildCatalog>;

export async function getCatalog(): Promise<Catalog> {
  const { data } = await api.get<Catalog>("/catalog");
  return data;
}
