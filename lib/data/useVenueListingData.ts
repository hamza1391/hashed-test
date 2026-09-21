import type {
  VenueListing,
  VenueListingCategoryId,
  VenueSortId,
} from "@/lib/venues/types";

export type { VenueListing, VenueListingCategoryId, VenueSortId };

export const venueListingCategories: {
  id: VenueListingCategoryId;
  label: string;
  countLabel: string;
  totalCount: number;
}[] = [
  { id: "all", label: "All Spaces", countLabel: "spaces", totalCount: 12840 },
  {
    id: "photo-studio",
    label: "Photo Studio",
    countLabel: "photo studios",
    totalCount: 3456,
  },
  {
    id: "film-studio",
    label: "Film Studio",
    countLabel: "film studios",
    totalCount: 892,
  },
  { id: "warehouse", label: "Warehouse", countLabel: "warehouses", totalCount: 640 },
  { id: "gallery", label: "Gallery", countLabel: "galleries", totalCount: 418 },
  {
    id: "restaurant",
    label: "Restaurant",
    countLabel: "restaurants",
    totalCount: 1102,
  },
  { id: "apartment", label: "Apartment", countLabel: "apartments", totalCount: 980 },
  {
    id: "office-space",
    label: "Office Space",
    countLabel: "office spaces",
    totalCount: 754,
  },
  { id: "venue", label: "Venue", countLabel: "venues", totalCount: 2210 },
  {
    id: "private-party",
    label: "Private Party",
    countLabel: "private party venues",
    totalCount: 1330,
  },
  { id: "meeting", label: "Meeting", countLabel: "meeting rooms", totalCount: 870 },
];

export const venueTypes = [
  "Office Space",
  "Meeting",
  "Private Party",
  "Villa",
  "Bar",
  "Loft",
  "Apartment",
  "Ballroom",
  "Restaurant",
  "Studio",
  "House",
  "Gallery",
  "test",
] as const;

export const occasionOptions = [
  "Wedding",
  "Reception",
  "Ceremony",
  "Engagement",
  "Birthday",
  "Babyshower",
  "Concert/Performance",
  "Brand Launch",
  "Fashion Show",
  "Corporate Event",
  "Conference",
  "Pop-up",
] as const;

export const amenityOptions = ["Parking", "Kitchen"] as const;

export const sortOptions: { id: VenueSortId; label: string }[] = [
  { id: "recommended", label: "Recommended" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

const cardImages = [
  "/images/card/card-1.svg",
  "/images/card/card-2.svg",
  "/images/card/card-3.svg",
  "/images/card/card-4.svg",
  "/images/card/card-5.svg",
  "/images/card/card-6.svg",
] as const;

const photoStudios: VenueListing[] = [
  {
    id: "ps-1",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    city: "London",
    locationId: "london",
    guests: "300+",
    size: "2,000 sq ft",
    parking: "Free parking",
    extraAmenities: 25,
    price: 50,
    images: [cardImages[0], cardImages[1], cardImages[2]],
    verified: true,
    categoryId: "photo-studio",
    venueTypes: ["Studio", "House"],
    occasions: ["Brand Launch", "Fashion Show", "Pop-up"],
    amenities: ["Parking", "Kitchen"],
    capacity: 300,
    sizeValue: 2000,
    lat: 51.5115,
    lng: -0.1278,
  },
  {
    id: "ps-2",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    city: "London",
    locationId: "london",
    guests: "300+",
    size: "2,000 sq ft",
    parking: "Free parking",
    extraAmenities: 25,
    price: 50,
    images: [cardImages[1], cardImages[0], cardImages[3]],
    verified: true,
    categoryId: "photo-studio",
    venueTypes: ["Studio", "Loft"],
    occasions: ["Fashion Show", "Brand Launch"],
    amenities: ["Parking", "Kitchen"],
    capacity: 320,
    sizeValue: 2100,
    lat: 51.505,
    lng: -0.118,
  },
  {
    id: "ps-3",
    title: "Downtown Loft",
    location: "New York, USA",
    city: "New York",
    locationId: "london",
    guests: "300+",
    size: "2,000 sq ft",
    parking: "Free parking",
    extraAmenities: 25,
    price: 50,
    images: [cardImages[2], cardImages[4], cardImages[5]],
    verified: true,
    categoryId: "photo-studio",
    venueTypes: ["Loft", "Studio"],
    occasions: ["Fashion Show", "Pop-up"],
    amenities: ["Parking", "Kitchen"],
    capacity: 280,
    sizeValue: 2000,
    lat: 51.5088,
    lng: -0.102,
  },
  {
    id: "ps-4",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    city: "London",
    locationId: "london",
    guests: "300+",
    size: "2,000 sq ft",
    parking: "Free parking",
    extraAmenities: 25,
    price: 50,
    images: [cardImages[3], cardImages[1], cardImages[0]],
    verified: true,
    categoryId: "photo-studio",
    venueTypes: ["Studio", "Apartment"],
    occasions: ["Birthday", "Brand Launch"],
    amenities: ["Parking", "Kitchen"],
    capacity: 310,
    sizeValue: 2050,
    lat: 51.498,
    lng: -0.135,
  },
  {
    id: "ps-5",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    city: "London",
    locationId: "london",
    guests: "300+",
    size: "2,000 sq ft",
    parking: "Free parking",
    extraAmenities: 25,
    price: 50,
    images: [cardImages[4], cardImages[2], cardImages[1]],
    verified: true,
    categoryId: "photo-studio",
    venueTypes: ["Studio"],
    occasions: ["Fashion Show", "Corporate Event"],
    amenities: ["Parking", "Kitchen"],
    capacity: 290,
    sizeValue: 2000,
    lat: 51.5158,
    lng: -0.141,
  },
  {
    id: "ps-6",
    title: "High-Spec Room in Trendy Home Clapham/ Stockwell",
    location: "London, SW1",
    city: "London",
    locationId: "london",
    guests: "300+",
    size: "2,000 sq ft",
    parking: "Free parking",
    extraAmenities: 25,
    price: 50,
    images: [cardImages[5], cardImages[0], cardImages[4]],
    verified: true,
    categoryId: "photo-studio",
    venueTypes: ["Studio", "Gallery"],
    occasions: ["Brand Launch", "Pop-up"],
    amenities: ["Parking", "Kitchen"],
    capacity: 305,
    sizeValue: 2200,
    lat: 51.501,
    lng: -0.092,
  },
];

function makeCategoryVenues(
  categoryId: VenueListingCategoryId,
  titles: string[],
  types: string[],
  lngOffset: number
): VenueListing[] {
  return titles.map((title, index) => ({
    id: `${categoryId}-${index + 1}`,
    title,
    location: index % 2 === 0 ? "London, SW1" : "London, E1",
    city: "London",
    locationId: "london",
    guests: index % 2 === 0 ? "40+" : "80+",
    size: index % 2 === 0 ? "1,200 sq ft" : "3,200 sq ft",
    parking: "Free parking",
    extraAmenities: 12 + index,
    price: 40 + index * 15,
    images: [
      cardImages[index % cardImages.length],
      cardImages[(index + 2) % cardImages.length],
    ],
    verified: index !== 1,
    categoryId,
    venueTypes: types,
    occasions: [occasionOptions[index % occasionOptions.length]],
    amenities: index % 2 === 0 ? ["Parking"] : ["Parking", "Kitchen"],
    capacity: 40 + index * 20,
    sizeValue: index % 2 === 0 ? 1200 : 3200,
    lat: 51.5 + index * 0.004,
    lng: -0.12 + lngOffset + index * 0.006,
  }));
}

const otherCityCopies: {
  locationId: string;
  city: string;
  location: string;
  lat: number;
  lng: number;
}[] = [
  {
    locationId: "dubai",
    city: "Dubai",
    location: "Dubai, UAE",
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    locationId: "abudhabi",
    city: "Abu Dhabi",
    location: "Abu Dhabi, UAE",
    lat: 24.4539,
    lng: 54.3773,
  },
  {
    locationId: "sharjah",
    city: "Sharjah",
    location: "Sharjah, UAE",
    lat: 25.3463,
    lng: 55.4209,
  },
  {
    locationId: "doha",
    city: "Doha",
    location: "Doha, Qatar",
    lat: 25.2854,
    lng: 51.531,
  },
];

const londonListings: VenueListing[] = [
  ...photoStudios,
  ...makeCategoryVenues(
    "film-studio",
    ["Sound Stage in Shoreditch", "Daylight Film Studio"],
    ["Studio"],
    0.02
  ),
  ...makeCategoryVenues(
    "warehouse",
    ["Industrial Warehouse Loft", "Converted Brick Warehouse"],
    ["Loft"],
    0.04
  ),
  ...makeCategoryVenues(
    "gallery",
    ["White Cube Gallery", "Riverfront Exhibition Space"],
    ["Gallery"],
    0.06
  ),
  ...makeCategoryVenues(
    "restaurant",
    ["Private Dining Room in Mayfair", "Chef’s Table Loft"],
    ["Restaurant", "Bar"],
    0.08
  ),
  ...makeCategoryVenues(
    "apartment",
    ["Penthouse Apartment with Skyline Views", "Townhouse Apartment"],
    ["Apartment", "House"],
    0.1
  ),
  ...makeCategoryVenues(
    "office-space",
    ["Boardroom in Canary Wharf", "Creative Office Suite"],
    ["Office Space", "Meeting"],
    0.12
  ),
  ...makeCategoryVenues(
    "venue",
    ["Grand Hall for Celebrations", "Riverside Event Venue"],
    ["Ballroom", "Villa"],
    0.14
  ),
  ...makeCategoryVenues(
    "private-party",
    ["Hidden Speakeasy for Private Parties", "Garden Party House"],
    ["Private Party", "Bar", "House"],
    0.16
  ),
  ...makeCategoryVenues(
    "meeting",
    ["Executive Meeting Suite", "Workshop Meeting Room"],
    ["Meeting", "Office Space"],
    0.18
  ),
];

const regionalListings = otherCityCopies.flatMap((city) =>
  londonListings.map((venue, index) => ({
    ...venue,
    id: `${city.locationId}-${venue.id}`,
    location: city.location,
    city: city.city,
    locationId: city.locationId,
    lat: city.lat + (index % 8) * 0.008,
    lng: city.lng + (index % 8) * 0.006,
  }))
);

export const venueListings: VenueListing[] = [
  ...londonListings,
  ...regionalListings,
];

