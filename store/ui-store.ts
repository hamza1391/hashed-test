"use client";

import { create } from "zustand";

export type ListingTab = "venue" | "vendors";
export type VenueCarouselDirection = "left" | "right";

export type DropdownId =
  | "listing"
  | "language"
  | "profile"
  | "mobileMenu"
  | "where"
  | "when"
  | "guests";

type UIState = {
  listingTab: ListingTab;
  openDropdown: DropdownId | null;
  locationId: string;
  dateId: string;
  guestsId: string;
  languageId: string;
  currentSlide: number;
  venueCarouselIndex: number;
  venueCarouselMaxIndex: number;
  setListingTab: (tab: ListingTab) => void;
  toggleDropdown: (id: DropdownId) => void;
  closeDropdowns: () => void;
  setLocationId: (id: string) => void;
  setDateId: (id: string) => void;
  setGuestsId: (id: string) => void;
  setLanguageId: (id: string) => void;
  setCurrentSlide: (index: number) => void;
  setVenueCarouselMaxIndex: (maxIndex: number) => void;
  scrollVenueCarousel: (direction: VenueCarouselDirection) => void;
};

export const useUIStore = create<UIState>((set, get) => ({
  listingTab: "venue",
  openDropdown: null,
  locationId: "dubai",
  dateId: "anytime",
  guestsId: "10-20",
  languageId: "en",
  currentSlide: 1,
  venueCarouselIndex: 0,
  venueCarouselMaxIndex: 0,
  setListingTab: (listingTab) => set({ listingTab, openDropdown: null }),
  toggleDropdown: (id) =>
    set({ openDropdown: get().openDropdown === id ? null : id }),
  closeDropdowns: () => set({ openDropdown: null }),
  setLocationId: (locationId) => set({ locationId, openDropdown: null }),
  setDateId: (dateId) => set({ dateId, openDropdown: null }),
  setGuestsId: (guestsId) => set({ guestsId, openDropdown: null }),
  setLanguageId: (languageId) => set({ languageId, openDropdown: null }),
  setCurrentSlide: (currentSlide) => set({ currentSlide }),
  setVenueCarouselMaxIndex: (venueCarouselMaxIndex) => {
    const nextIndex = Math.min(get().venueCarouselIndex, venueCarouselMaxIndex);
    set({ venueCarouselMaxIndex, venueCarouselIndex: nextIndex });
  },
  scrollVenueCarousel: (direction) => {
    const { venueCarouselIndex, venueCarouselMaxIndex } = get();

    if (direction === "left" && venueCarouselIndex > 0) {
      set({ venueCarouselIndex: venueCarouselIndex - 1 });
      return;
    }

    if (direction === "right" && venueCarouselIndex < venueCarouselMaxIndex) {
      set({ venueCarouselIndex: venueCarouselIndex + 1 });
    }
  },
}));
