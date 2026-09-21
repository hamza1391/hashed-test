"use client";

import { create } from "zustand";

export type ListingTab = "venue" | "vendors";
export type VenueCarouselDirection = "left" | "right";
export type FeaturedCategoryId =
  | "rooftop"
  | "gallery"
  | "restaurant"
  | "outdoor"
  | "studio"
  | "terrace"
  | "ballroom";

export type DropdownId =
  | "listing"
  | "language"
  | "profile"
  | "mobileMenu"
  | "where"
  | "when"
  | "guests"
  | "compactWhere"
  | "compactWhen"
  | "compactGuests"
  | "venueSort";

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
  featuredCategoryId: FeaturedCategoryId;
  featuredCarouselIndex: number;
  featuredCarouselMaxIndex: number;
  featuredFavoriteIds: string[];
  trustedCarouselIndex: number;
  trustedCarouselMaxIndex: number;
  testimonialCarouselIndex: number;
  testimonialCarouselMaxIndex: number;
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
  setFeaturedCategory: (id: FeaturedCategoryId) => void;
  setFeaturedCarouselMaxIndex: (maxIndex: number) => void;
  scrollFeaturedCarousel: (direction: VenueCarouselDirection) => void;
  toggleFeaturedFavorite: (id: string) => void;
  setTrustedCarouselMaxIndex: (maxIndex: number) => void;
  scrollTrustedCarousel: (direction: VenueCarouselDirection) => void;
  setTestimonialCarouselMaxIndex: (maxIndex: number) => void;
  scrollTestimonialCarousel: (direction: VenueCarouselDirection) => void;
};

export const useUIStore = create<UIState>((set, get) => ({
  listingTab: "venue",
  openDropdown: null,
  locationId: "london",
  dateId: "anytime",
  guestsId: "10-20",
  languageId: "en",
  currentSlide: 1,
  venueCarouselIndex: 0,
  venueCarouselMaxIndex: 0,
  featuredCategoryId: "gallery",
  featuredCarouselIndex: 0,
  featuredCarouselMaxIndex: 0,
  featuredFavoriteIds: [],
  trustedCarouselIndex: 0,
  trustedCarouselMaxIndex: 0,
  testimonialCarouselIndex: 0,
  testimonialCarouselMaxIndex: 0,
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
  setFeaturedCategory: (featuredCategoryId) =>
    set({ featuredCategoryId, featuredCarouselIndex: 0 }),
  setFeaturedCarouselMaxIndex: (featuredCarouselMaxIndex) => {
    const nextIndex = Math.min(
      get().featuredCarouselIndex,
      featuredCarouselMaxIndex
    );
    set({ featuredCarouselMaxIndex, featuredCarouselIndex: nextIndex });
  },
  scrollFeaturedCarousel: (direction) => {
    const { featuredCarouselIndex, featuredCarouselMaxIndex } = get();

    if (direction === "left" && featuredCarouselIndex > 0) {
      set({ featuredCarouselIndex: featuredCarouselIndex - 1 });
      return;
    }

    if (
      direction === "right" &&
      featuredCarouselIndex < featuredCarouselMaxIndex
    ) {
      set({ featuredCarouselIndex: featuredCarouselIndex + 1 });
    }
  },
  toggleFeaturedFavorite: (id) => {
    const { featuredFavoriteIds } = get();
    set({
      featuredFavoriteIds: featuredFavoriteIds.includes(id)
        ? featuredFavoriteIds.filter((item) => item !== id)
        : [...featuredFavoriteIds, id],
    });
  },
  setTrustedCarouselMaxIndex: (trustedCarouselMaxIndex) => {
    const nextIndex = Math.min(
      get().trustedCarouselIndex,
      trustedCarouselMaxIndex
    );
    set({ trustedCarouselMaxIndex, trustedCarouselIndex: nextIndex });
  },
  scrollTrustedCarousel: (direction) => {
    const { trustedCarouselIndex, trustedCarouselMaxIndex } = get();

    if (direction === "left" && trustedCarouselIndex > 0) {
      set({ trustedCarouselIndex: trustedCarouselIndex - 1 });
      return;
    }

    if (
      direction === "right" &&
      trustedCarouselIndex < trustedCarouselMaxIndex
    ) {
      set({ trustedCarouselIndex: trustedCarouselIndex + 1 });
    }
  },
  setTestimonialCarouselMaxIndex: (testimonialCarouselMaxIndex) => {
    const nextIndex = Math.min(
      get().testimonialCarouselIndex,
      testimonialCarouselMaxIndex
    );
    set({ testimonialCarouselMaxIndex, testimonialCarouselIndex: nextIndex });
  },
  scrollTestimonialCarousel: (direction) => {
    const { testimonialCarouselIndex, testimonialCarouselMaxIndex } = get();

    if (direction === "left" && testimonialCarouselIndex > 0) {
      set({ testimonialCarouselIndex: testimonialCarouselIndex - 1 });
      return;
    }

    if (
      direction === "right" &&
      testimonialCarouselIndex < testimonialCarouselMaxIndex
    ) {
      set({ testimonialCarouselIndex: testimonialCarouselIndex + 1 });
    }
  },
}));
