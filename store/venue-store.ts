"use client";

import { useSearchParams } from "next/navigation";
import { create } from "zustand";
import {
  venueListings,
  venueListingCategories,
  type VenueListing,
  type VenueListingCategoryId,
  type VenueSortId,
} from "@/lib/data/useVenueListingData";
import { guestRangeFromId, parseVenueSearchParams } from "@/lib/venue-search";

export type { VenueListing, VenueListingCategoryId, VenueSortId };

export type VenueFilters = {
  venueTypes: string[];
  occasions: string[];
  amenities: string[];
  capacityMin: number;
  capacityMax: number;
  priceMin: number;
  priceMax: number;
  verifiedOnly: boolean;
  minSize: number | null;
};

export const defaultVenueFilters: VenueFilters = {
  venueTypes: [],
  occasions: [],
  amenities: ["Parking", "Kitchen"],
  capacityMin: 10,
  capacityMax: 1500,
  priceMin: 10,
  priceMax: 30000,
  verifiedOnly: true,
  minSize: 2000,
};

export const emptyVenueFilters: VenueFilters = {
  venueTypes: [],
  occasions: [],
  amenities: [],
  capacityMin: 10,
  capacityMax: 1500,
  priceMin: 10,
  priceMax: 30000,
  verifiedOnly: false,
  minSize: null,
};

type VenueListingState = {
  keywordDraft: string;
  keywords: string[];
  categoryId: VenueListingCategoryId;
  categoryOffset: number;
  sortId: VenueSortId;
  filterOpen: boolean;
  draftFilters: VenueFilters;
  appliedFilters: VenueFilters;
  selectedVenueId: string | null;
  setKeywordDraft: (value: string) => void;
  addKeyword: () => void;
  removeKeyword: (keyword: string) => void;
  setCategoryId: (id: VenueListingCategoryId) => void;
  setCategoryOffset: (offset: number) => void;
  setSortId: (id: VenueSortId) => void;
  openFilters: () => void;
  closeFilters: () => void;
  setDraftFilters: (filters: Partial<VenueFilters>) => void;
  toggleDraftType: (type: string) => void;
  toggleDraftOccasion: (occasion: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  removeAppliedChip: (
    kind: "type" | "occasion" | "amenity" | "verified" | "size",
    value?: string
  ) => void;
  setSelectedVenueId: (id: string | null) => void;
};

function toggleValue(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export const useVenueListingStore = create<VenueListingState>((set, get) => ({
  keywordDraft: "",
  keywords: [],
  categoryId: "photo-studio",
  categoryOffset: 0,
  sortId: "recommended",
  filterOpen: false,
  draftFilters: defaultVenueFilters,
  appliedFilters: defaultVenueFilters,
  selectedVenueId: "ps-3",
  setKeywordDraft: (keywordDraft) => set({ keywordDraft }),
  addKeyword: () => {
    const next = get().keywordDraft.trim();
    if (!next) return;
    const keywords = get().keywords;
    if (keywords.some((item) => item.toLowerCase() === next.toLowerCase())) {
      set({ keywordDraft: "" });
      return;
    }
    set({ keywords: [...keywords, next], keywordDraft: "" });
  },
  removeKeyword: (keyword) =>
    set({
      keywords: get().keywords.filter(
        (item) => item.toLowerCase() !== keyword.toLowerCase()
      ),
    }),
  setCategoryId: (categoryId) => set({ categoryId, selectedVenueId: null }),
  setCategoryOffset: (categoryOffset) => set({ categoryOffset }),
  setSortId: (sortId) => set({ sortId }),
  openFilters: () => set({ filterOpen: true, draftFilters: get().appliedFilters }),
  closeFilters: () => set({ filterOpen: false }),
  setDraftFilters: (filters) =>
    set({ draftFilters: { ...get().draftFilters, ...filters } }),
  toggleDraftType: (type) =>
    set({
      draftFilters: {
        ...get().draftFilters,
        venueTypes: toggleValue(get().draftFilters.venueTypes, type),
      },
    }),
  toggleDraftOccasion: (occasion) =>
    set({
      draftFilters: {
        ...get().draftFilters,
        occasions: toggleValue(get().draftFilters.occasions, occasion),
      },
    }),
  applyFilters: () =>
    set({ appliedFilters: get().draftFilters, filterOpen: false }),
  clearFilters: () =>
    set({
      draftFilters: emptyVenueFilters,
      appliedFilters: emptyVenueFilters,
      keywords: [],
      keywordDraft: "",
    }),
  removeAppliedChip: (kind, value) => {
    const appliedFilters = { ...get().appliedFilters };
    if (kind === "verified") appliedFilters.verifiedOnly = false;
    if (kind === "size") appliedFilters.minSize = null;
    if (kind === "amenity" && value) {
      appliedFilters.amenities = appliedFilters.amenities.filter(
        (item) => item !== value
      );
    }
    if (kind === "type" && value) {
      appliedFilters.venueTypes = appliedFilters.venueTypes.filter(
        (item) => item !== value
      );
    }
    if (kind === "occasion" && value) {
      appliedFilters.occasions = appliedFilters.occasions.filter(
        (item) => item !== value
      );
    }
    set({ appliedFilters, draftFilters: appliedFilters });
  },
  setSelectedVenueId: (selectedVenueId) => set({ selectedVenueId }),
}));

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

export function useFilteredVenueListings() {
  const searchParams = useSearchParams();
  const query = parseVenueSearchParams(searchParams);
  const keywords = useVenueListingStore((state) => state.keywords);
  const keywordDraft = useVenueListingStore((state) => state.keywordDraft);
  const categoryId = useVenueListingStore((state) => state.categoryId);
  const sortId = useVenueListingStore((state) => state.sortId);
  const appliedFilters = useVenueListingStore((state) => state.appliedFilters);
  const locationId = query.locationId;
  const guestsId = query.guestsId;
  const listingTab = query.listingTab;

  const liveKeywords = [...keywords];
  const draft = keywordDraft.trim();
  if (draft) liveKeywords.push(draft);

  const category = venueListingCategories.find((item) => item.id === categoryId);

  const results =
    listingTab === "vendors"
      ? []
      : venueListings
          .filter((venue) =>
            matchesVenueFilters(
              venue,
              appliedFilters,
              liveKeywords,
              categoryId,
              locationId,
              guestsId
            )
          )
          .slice()
          .sort((a, b) => {
            if (sortId === "price-asc") return a.price - b.price;
            if (sortId === "price-desc") return b.price - a.price;
            return 0;
          });

  const tightened =
    liveKeywords.length > 0 ||
    appliedFilters.venueTypes.length > 0 ||
    appliedFilters.occasions.length > 0 ||
    appliedFilters.amenities.length !== defaultVenueFilters.amenities.length ||
    appliedFilters.verifiedOnly !== defaultVenueFilters.verifiedOnly ||
    appliedFilters.capacityMin !== defaultVenueFilters.capacityMin ||
    appliedFilters.capacityMax !== defaultVenueFilters.capacityMax ||
    appliedFilters.priceMin !== defaultVenueFilters.priceMin ||
    appliedFilters.priceMax !== defaultVenueFilters.priceMax ||
    appliedFilters.minSize !== defaultVenueFilters.minSize;

  const displayCount =
    results.length === 0
      ? 0
      : tightened
        ? results.length
        : (category?.totalCount ?? results.length);

  return { results, displayCount, category };
}
