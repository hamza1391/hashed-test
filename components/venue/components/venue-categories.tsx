"use client";

import {
  Briefcase,
  Building2,
  Camera,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Landmark,
  LayoutGrid,
  PartyPopper,
  Users,
  UtensilsCrossed,
  Video,
  Warehouse,
} from "lucide-react";
import { venueListingCategories } from "@/lib/data/useVenueListingData";
import {
  useVenueListingStore,
  type VenueListingCategoryId,
} from "@/store/venue-store";

const categoryIcons: Record<
  VenueListingCategoryId,
  typeof LayoutGrid
> = {
  all: LayoutGrid,
  "photo-studio": Camera,
  "film-studio": Video,
  warehouse: Warehouse,
  gallery: ImageIcon,
  restaurant: UtensilsCrossed,
  apartment: Building2,
  "office-space": Briefcase,
  venue: Landmark,
  "private-party": PartyPopper,
  meeting: Users,
};

export function VenueCategories() {
  const categoryId = useVenueListingStore((state) => state.categoryId);
  const setCategoryId = useVenueListingStore((state) => state.setCategoryId);
  const categoryOffset = useVenueListingStore((state) => state.categoryOffset);
  const setCategoryOffset = useVenueListingStore(
    (state) => state.setCategoryOffset
  );

  const maxOffset = Math.max(0, venueListingCategories.length - 8);

  return (
    <div className="flex items-center gap-2 border-b border-[#F0F0F0] px-3 py-3 md:px-5 lg:px-6">
      <button
        type="button"
        aria-label="Previous categories"
        disabled={categoryOffset <= 0}
        onClick={() => setCategoryOffset(Math.max(0, categoryOffset - 1))}
        className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-black disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft className="size-4" />
      </button>

      <div className="flex min-w-0 flex-1 items-end gap-1 overflow-hidden md:gap-2">
        {venueListingCategories
          .slice(categoryOffset, categoryOffset + 11)
          .map((category) => {
            const active = category.id === categoryId;
            const Icon = categoryIcons[category.id];

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setCategoryId(category.id)}
                className={`flex min-w-[76px] shrink-0 cursor-pointer flex-col items-center gap-1.5 rounded-2xl px-3 py-2 text-[11px] font-medium transition-colors md:min-w-[88px] md:text-xs ${
                  active
                    ? "bg-[#FFF1EE] text-brand"
                    : "bg-transparent text-[#6B6B6B] hover:bg-[#F7F7F7]"
                }`}
              >
                <Icon className="size-5" />
                {category.label}
              </button>
            );
          })}
      </div>

      <button
        type="button"
        aria-label="Next categories"
        disabled={categoryOffset >= maxOffset}
        onClick={() =>
          setCategoryOffset(Math.min(maxOffset, categoryOffset + 1))
        }
        className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-black disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
