export type VenueListingCategoryId =
  | "all"
  | "photo-studio"
  | "film-studio"
  | "warehouse"
  | "gallery"
  | "restaurant"
  | "apartment"
  | "office-space"
  | "venue"
  | "private-party"
  | "meeting";

export type VenueSortId = "recommended" | "price-asc" | "price-desc";

export type VenueListing = {
  id: string;
  title: string;
  location: string;
  city: string;
  locationId: string;
  guests: string;
  size: string;
  parking: string;
  extraAmenities: number;
  price: number;
  images: string[];
  verified: boolean;
  categoryId: VenueListingCategoryId;
  venueTypes: string[];
  occasions: string[];
  amenities: string[];
  capacity: number;
  sizeValue: number;
  lat: number;
  lng: number;
  availableDateIds?: string[];
};
