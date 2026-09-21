"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { countAppliedFilters } from "@/lib/venues/filters";
import { useVenueListingStore } from "@/store/venue-store";

export function VenueSearchBar() {
  const keywordDraft = useVenueListingStore((state) => state.keywordDraft);
  const setKeywordDraft = useVenueListingStore((state) => state.setKeywordDraft);
  const addKeyword = useVenueListingStore((state) => state.addKeyword);
  const openFilters = useVenueListingStore((state) => state.openFilters);
  const appliedFilters = useVenueListingStore((state) => state.appliedFilters);
  const keywords = useVenueListingStore((state) => state.keywords);
  const filterCount = countAppliedFilters(appliedFilters, keywords);

  return (
    <div className="flex items-center gap-3 border-b border-[#EFEFEF] px-4 py-3 md:px-6 lg:px-8">
      <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-[#E6E6E6] bg-white px-4 py-2.5">
        <Search className="size-5 shrink-0 text-[#B0B0B0]" />
        <input
          value={keywordDraft}
          onChange={(event) => setKeywordDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addKeyword();
            }
          }}
          placeholder="Add keywords.."
          className="w-full bg-transparent text-sm text-black outline-none placeholder:text-[#B8B8B8]"
        />
      </label>
      <button
        type="button"
        onClick={openFilters}
        className="flex shrink-0 cursor-pointer items-center gap-2 px-2 py-2 text-sm font-medium text-black"
      >
        <SlidersHorizontal className="size-4" />
        Filters
        {filterCount > 0 ? (
          <span className="flex size-[18px] items-center justify-center rounded-full bg-black text-[10px] font-semibold leading-none text-white">
            {filterCount}
          </span>
        ) : null}
      </button>
    </div>
  );
}
