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
import { parseVenueSearchParams } from "@/lib/venue-search";
import { useUIStore } from "@/store/ui-store";
import {
  useFilteredVenueListings,
  useVenueListingStore,
} from "@/store/venue-store";

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
  const { results } = useFilteredVenueListings();
  const selectedVenueId = useVenueListingStore((state) => state.selectedVenueId);
  const setSelectedVenueId = useVenueListingStore(
    (state) => state.setSelectedVenueId
  );
  const empty = results.length === 0;

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
    if (empty) return;
    if (!results.some((venue) => venue.id === selectedVenueId)) {
      setSelectedVenueId(results[0].id);
    }
  }, [empty, results, selectedVenueId, setSelectedVenueId]);

  return (
    <div className="flex h-[calc(100svh-132px)] flex-col overflow-hidden bg-white md:h-[calc(100svh-80px)] lg:h-[calc(100svh-84px)]">
      <VenueSearchBar />
      <VenueCategories />

      {empty ? (
        <VenueEmptyState />
      ) : (
        <div className="flex min-h-0 flex-1">
          <div className="min-w-0 flex-1 overflow-y-auto">
            <VenueResultsBar />
            <div className="grid grid-cols-1 gap-4 px-4 pb-6 md:grid-cols-2 md:px-5 lg:grid-cols-3">
              {results.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </div>
          <div className="relative z-0 hidden h-full w-[38%] shrink-0 overflow-hidden lg:block">
            <VenueMap venues={results} />
          </div>
        </div>
      )}

      <FilterDialog />
    </div>
  );
}
