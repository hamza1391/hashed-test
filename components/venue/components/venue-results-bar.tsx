"use client";

import { AlignJustify, ChevronDown, List, X } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { useCatalog } from "@/hooks/use-catalog";
import { useVenueListingsQuery } from "@/hooks/use-venue-listings";
import { useUIStore } from "@/store/ui-store";
import { useVenueListingStore } from "@/store/venue-store";

export function VenueResultsBar() {
  const { displayCount, category } = useVenueListingsQuery();
  const catalog = useCatalog();
  const locations = catalog.data?.locations ?? [];
  const guestOptions = catalog.data?.guestOptions ?? [];
  const sortOptions = catalog.data?.sortOptions ?? [];
  const locationId = useUIStore((state) => state.locationId);
  const guestsId = useUIStore((state) => state.guestsId);
  const appliedFilters = useVenueListingStore((state) => state.appliedFilters);
  const keywords = useVenueListingStore((state) => state.keywords);
  const sortId = useVenueListingStore((state) => state.sortId);
  const setSortId = useVenueListingStore((state) => state.setSortId);
  const removeKeyword = useVenueListingStore((state) => state.removeKeyword);
  const removeAppliedChip = useVenueListingStore(
    (state) => state.removeAppliedChip
  );
  const tabletMapOpen = useVenueListingStore((state) => state.tabletMapOpen);
  const setTabletMapOpen = useVenueListingStore(
    (state) => state.setTabletMapOpen
  );

  const location =
    locations.find((item) => item.id === locationId)?.shortLabel ?? "London";
  const guests =
    guestOptions.find((item) => item.id === guestsId)?.label ?? "10-20";
  const sortLabel =
    sortOptions.find((item) => item.id === sortId)?.label ?? "Recommended";

  const chips: { key: string; label: string; onRemove: () => void }[] = [];

  if (appliedFilters.verifiedOnly) {
    chips.push({
      key: "verified",
      label: "Verified",
      onRemove: () => removeAppliedChip("verified"),
    });
  }
  if (appliedFilters.minSize) {
    chips.push({
      key: "size",
      label: `${appliedFilters.minSize.toLocaleString()}+ m²`,
      onRemove: () => removeAppliedChip("size"),
    });
  }
  chips.push({
    key: "guests",
    label: `${guests} guests`,
    onRemove: () => {},
  });
  appliedFilters.amenities.forEach((amenity) => {
    chips.push({
      key: `amenity-${amenity}`,
      label: amenity,
      onRemove: () => removeAppliedChip("amenity", amenity),
    });
  });
  appliedFilters.venueTypes.forEach((type) => {
    chips.push({
      key: `type-${type}`,
      label: type,
      onRemove: () => removeAppliedChip("type", type),
    });
  });
  appliedFilters.occasions.forEach((occasion) => {
    chips.push({
      key: `occasion-${occasion}`,
      label: occasion,
      onRemove: () => removeAppliedChip("occasion", occasion),
    });
  });
  keywords.forEach((keyword) => {
    chips.push({
      key: `keyword-${keyword}`,
      label: keyword,
      onRemove: () => removeKeyword(keyword),
    });
  });

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3 md:px-5">
      <p className="mr-1 text-sm text-[#4A4A4A]">
        {displayCount.toLocaleString()}{" "}
        <span className="font-semibold text-brand">
          {category?.countLabel ?? "spaces"}
        </span>{" "}
        near {location}
      </p>

      <div className="hidden lg:contents">
        {chips.map((chip) => (
          <span
            key={chip.key}
            className="inline-flex items-center gap-1 rounded-full border border-[#E6E6E6] bg-white px-2.5 py-1 text-xs text-[#4A4A4A]"
          >
            {chip.label}
            <button
              type="button"
              aria-label={`Remove ${chip.label}`}
              onClick={chip.onRemove}
              className="cursor-pointer text-[#8A8A8A] hover:text-black"
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setTabletMapOpen(!tabletMapOpen)}
        className="ml-auto inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-[#E6E6E6] bg-white px-3.5 py-1.5 text-sm text-[#4A4A4A] shadow-[0_1px_2px_rgba(0,0,0,0.04)] lg:hidden"
      >
        {tabletMapOpen ? (
          <List className="size-4" />
        ) : (
          <AlignJustify className="size-4" />
        )}
        {tabletMapOpen ? "Show List" : "Show Map"}
      </button>

      <div className="ml-auto hidden lg:block">
        <Dropdown
          id="venueSort"
          align="right"
          width="min-w-[190px]"
          trigger={({ open, toggle }) => (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[#E6E6E6] bg-white px-3 py-1.5 text-xs text-[#4A4A4A]"
            >
              Sort by: {sortLabel}
              <ChevronDown className="size-3.5" />
            </button>
          )}
        >
          {sortOptions.map((option) => (
            <DropdownItem
              key={option.id}
              active={option.id === sortId}
              onClick={() => setSortId(option.id)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </Dropdown>
      </div>
    </div>
  );
}
