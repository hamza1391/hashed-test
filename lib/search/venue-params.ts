import { dates, guestOptions, locations } from "@/lib/data/useherodata";
import type { ListingTab } from "@/store/ui-store";

export type VenueSearchQuery = {
  locationId: string;
  dateId: string;
  guestsId: string;
  listingTab: ListingTab;
  categoryId?: string;
  guestsSpecified: boolean;
  dateSpecified: boolean;
};

export function buildVenueSearchPath({
  locationId,
  dateId,
  guestsId,
  listingTab,
  categoryId = "all",
}: Omit<VenueSearchQuery, "guestsSpecified" | "dateSpecified"> & {
  categoryId?: string;
}) {
  const params = new URLSearchParams({
    where: locationId,
    when: dateId,
    guests: guestsId,
    tab: listingTab,
    category: categoryId,
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
  const category = searchParams.get("category");

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
    categoryId: category ?? undefined,
    guestsSpecified: searchParams.has("guests"),
    dateSpecified: searchParams.has("when") && when !== "anytime",
  };
}

export function guestRangeFromId(guestsId: string) {
  if (guestsId === "10") return { min: 8, max: 12 };
  if (guestsId === "10-20") return { min: 10, max: 20 };
  if (guestsId === "20-50") return { min: 20, max: 50 };
  if (guestsId === "50+") return { min: 50, max: 10000 };
  return { min: 1, max: 10000 };
}

export function matchesGuestCapacity(
  capacity: number,
  guestsId: string,
  strict = false
) {
  const { min, max } = guestRangeFromId(guestsId);
  if (capacity < min) return false;
  if (strict && max < 10000 && capacity > max) return false;
  return true;
}

export function matchesVenueDate(
  availableDateIds: string[] | undefined,
  dateId: string,
  dateSpecified: boolean
) {
  if (!dateSpecified || dateId === "anytime") return true;
  const dates = availableDateIds ?? ["anytime"];
  return dates.includes("anytime") || dates.includes(dateId);
}
