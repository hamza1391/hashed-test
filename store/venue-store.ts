"use client";

import { create } from "zustand";
import {
  defaultVenueFilters,
  emptyVenueFilters,
  type VenueFilters,
} from "@/lib/venues/filters";
import type { VenueListingCategoryId, VenueSortId } from "@/lib/venues/types";

export type { VenueListing, VenueListingCategoryId, VenueSortId } from "@/lib/venues/types";
export type { VenueFilters };
export { defaultVenueFilters, emptyVenueFilters };

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
  tabletMapOpen: boolean;
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
  setTabletMapOpen: (open: boolean) => void;
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
  tabletMapOpen: false,
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
  setTabletMapOpen: (tabletMapOpen) => set({ tabletMapOpen }),
}));
