import { dates, guestOptions, locations } from "@/lib/data/useherodata";
import type { ListingTab } from "@/store/ui-store";

export type VenueSearchQuery = {
  locationId: string;
  dateId: string;
  guestsId: string;
  listingTab: ListingTab;
};

export function buildVenueSearchPath({
  locationId,
  dateId,
  guestsId,
  listingTab,
}: VenueSearchQuery) {
  const params = new URLSearchParams({
    where: locationId,
    when: dateId,
    guests: guestsId,
    tab: listingTab,
  });

  return `/venue?${params.toString()}`;
}

export function parseVenueSearchParams(
  searchParams: URLSearchParams
): VenueSearchQuery {
  const where = searchParams.get("where");
  const when = searchParams.get("when");
  const guests = searchParams.get("guests");
  const tab = searchParams.get("tab");

  return {
    locationId: locations.some((item) => item.id === where)
      ? (where as string)
      : "london",
    dateId: dates.some((item) => item.id === when)
      ? (when as string)
      : "anytime",
    guestsId: guestOptions.some((item) => item.id === guests)
      ? (guests as string)
      : "10-20",
    listingTab: tab === "vendors" ? "vendors" : "venue",
  };
}

export function guestRangeFromId(guestsId: string) {
  if (guestsId === "10") return { min: 10, max: 10 };
  if (guestsId === "10-20") return { min: 10, max: 20 };
  if (guestsId === "20-50") return { min: 20, max: 50 };
  if (guestsId === "50+") return { min: 50, max: 10000 };
  return { min: 1, max: 10000 };
}
