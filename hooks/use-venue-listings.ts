"use client";

import { useMemo } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getVenueListings } from "@/lib/api/venues";
import { queryKeys } from "@/lib/query/keys";
import { parseVenueSearchParams } from "@/lib/search/venue-params";
import { useVenueListingStore } from "@/store/venue-store";

export function useVenueListingsQuery() {
  const searchParams = useSearchParams();
  const search = parseVenueSearchParams(searchParams);
  const keywords = useVenueListingStore((state) => state.keywords);
  const keywordDraft = useVenueListingStore((state) => state.keywordDraft);
  const categoryId = useVenueListingStore((state) => state.categoryId);
  const sortId = useVenueListingStore((state) => state.sortId);
  const appliedFilters = useVenueListingStore((state) => state.appliedFilters);

  const liveKeywords = useMemo(() => {
    const next = [...keywords];
    const draft = keywordDraft.trim();
    if (draft) next.push(draft);
    return next;
  }, [keywordDraft, keywords]);

  const query = useMemo(
    () => ({
      locationId: search.locationId,
      dateId: search.dateId,
      guestsId: search.guestsId,
      listingTab: search.listingTab,
      categoryId,
      sortId,
      keywords: liveKeywords,
      filters: appliedFilters,
    }),
    [
      appliedFilters,
      categoryId,
      liveKeywords,
      search.dateId,
      search.guestsId,
      search.listingTab,
      search.locationId,
      sortId,
    ]
  );

  const listings = useQuery({
    queryKey: queryKeys.venues.list(query),
    queryFn: () => getVenueListings(query),
    placeholderData: keepPreviousData,
  });

  return {
    ...listings,
    results: listings.data?.results ?? [],
    displayCount: listings.data?.displayCount ?? 0,
    category: listings.data?.category,
  };
}
