import type { VenueListingsQuery } from "@/lib/venues/search";

export const queryKeys = {
  catalog: {
    all: ["catalog"] as const,
  },
  home: {
    all: ["home"] as const,
  },
  venues: {
    all: ["venues"] as const,
    list: (query: VenueListingsQuery) => ["venues", "list", query] as const,
  },
};
