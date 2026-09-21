export type VenueFilters = {
  venueTypes: string[];
  occasions: string[];
  amenities: string[];
  capacityMin: number;
  capacityMax: number;
  priceMin: number;
  priceMax: number;
  verifiedOnly: boolean;
  minSize: number | null;
};

export const defaultVenueFilters: VenueFilters = {
  venueTypes: [],
  occasions: [],
  amenities: ["Parking", "Kitchen"],
  capacityMin: 10,
  capacityMax: 1500,
  priceMin: 10,
  priceMax: 30000,
  verifiedOnly: true,
  minSize: 2000,
};

export const emptyVenueFilters: VenueFilters = {
  venueTypes: [],
  occasions: [],
  amenities: [],
  capacityMin: 10,
  capacityMax: 1500,
  priceMin: 10,
  priceMax: 30000,
  verifiedOnly: false,
  minSize: null,
};
