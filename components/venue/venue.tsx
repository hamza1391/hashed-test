"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { FilterDialog } from "@/components/venue/components/filter-dialog";
import { VenueCard } from "@/components/venue/components/venue-card";
import { VenueCategories } from "@/components/venue/components/venue-categories";
import { VenueEmptyState } from "@/components/venue/components/venue-empty-state";
import { VenueResultsBar } from "@/components/venue/components/venue-results-bar";
import { VenueSearchBar } from "@/components/venue/components/venue-search-bar";
import { useVenueListingsQuery } from "@/hooks/use-venue-listings";
import { parseVenueSearchParams } from "@/lib/search/venue-params";
import { useUIStore } from "@/store/ui-store";
import { useVenueListingStore } from "@/store/venue-store";

const VenueMap = dynamic(
  () => import("@/components/venue/components/venue-map"),
  { ssr: false }
);

export default function Venue() {
  const searchParams = useSearchParams();
  const setLocationId = useUIStore((state) => state.setLocationId);
  const setDateId = useUIStore((state) => state.setDateId);
  const setGuestsId = useUIStore((state) => state.setGuestsId);
  const setListingTab = useUIStore((state) => state.setListingTab);
  const { results, isPending, isError } = useVenueListingsQuery();
  const selectedVenueId = useVenueListingStore((state) => state.selectedVenueId);
  const setSelectedVenueId = useVenueListingStore(
    (state) => state.setSelectedVenueId
  );
  const tabletMapOpen = useVenueListingStore((state) => state.tabletMapOpen);
  const empty = !isPending && !isError && results.length === 0;

  useEffect(() => {
    const query = parseVenueSearchParams(searchParams);
    setLocationId(query.locationId);
    setDateId(query.dateId);
    setGuestsId(query.guestsId);
    setListingTab(query.listingTab);
  }, [
    searchParams,
    setDateId,
    setGuestsId,
    setListingTab,
    setLocationId,
  ]);

  useEffect(() => {
    if (empty || isPending) return;
    if (!results.some((venue) => venue.id === selectedVenueId)) {
      setSelectedVenueId(results[0].id);
    }
  }, [empty, isPending, results, selectedVenueId, setSelectedVenueId]);

  return (
    <div
      className={`bg-white ${
        tabletMapOpen
          ? "flex h-[calc(100svh-132px)] flex-col overflow-hidden md:h-[calc(100svh-80px)] lg:h-[calc(100svh-84px)]"
          : ""
      } lg:flex lg:h-[calc(100svh-84px)] lg:flex-col lg:overflow-hidden`}
    >
      <div className="shrink-0">
        <VenueSearchBar />
        <VenueCategories />
      </div>

      {isPending ? (
        <div className="flex min-h-[420px] flex-1 items-center justify-center text-sm text-[#8A8A8A] lg:min-h-0">
          Loading venues…
        </div>
      ) : isError || empty ? (
        <VenueEmptyState />
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          <VenueResultsBar />
          <div className="flex min-h-0 flex-1">
            <div
              className={`min-w-0 flex-1 lg:overflow-y-auto ${
                tabletMapOpen ? "hidden lg:block" : ""
              }`}
            >
              <div className="grid grid-cols-1 gap-4 px-4 pb-6 md:grid-cols-2 md:px-5 lg:grid-cols-3">
                {results.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </div>
            </div>
            <div
              className={`relative z-0 min-h-0 overflow-hidden ${
                tabletMapOpen ? "block min-h-0 flex-1" : "hidden"
              } lg:block lg:h-full lg:w-[38%] lg:flex-none`}
            >
              <VenueMap venues={results} active={tabletMapOpen} />
            </div>
          </div>
        </div>
      )}

      <FilterDialog />
    </div>
  );
}
