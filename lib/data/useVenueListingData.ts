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
  ...buildSearchMatchListings(),
];

function buildSearchMatchListings(): VenueListing[] {
  const cities = [
    {
      locationId: "london",
      city: "London",
      location: "London, UK",
      lat: 51.5074,
      lng: -0.1278,
    },
    ...otherCityCopies,
  ];

  const guestProfiles = [
    { id: "10", capacity: 10, guests: "10", sizeValue: 2000 },
    { id: "10-20", capacity: 16, guests: "10-20", sizeValue: 2100 },
    { id: "20-50", capacity: 36, guests: "20-50", sizeValue: 2200 },
    { id: "50+", capacity: 80, guests: "80+", sizeValue: 3200 },
  ] as const;

  const categorySeeds: {
    id: VenueListingCategoryId;
    types: string[];
    titles: Record<string, string[]>;
  }[] = [
    {
      id: "photo-studio",
      types: ["Studio"],
      titles: {
        london: ["Shoreditch Daylight Studio", "Hackney Cyclorama Studio"],
        dubai: ["Al Quoz Photo Studio", "Business Bay Light Studio"],
        abudhabi: ["Saadiyat Natural Light Studio", "Yas Island Photo Loft"],
        sharjah: ["Al Majaz Photo Studio", "University City Studio"],
        doha: ["Msheireb Photo Studio", "The Pearl Cyclorama"],
      },
    },
    {
      id: "venue",
      types: ["Ballroom", "Villa"],
      titles: {
        london: ["Southbank Celebration Hall", "Mayfair Private Venue"],
        dubai: ["Palm Jumeirah Event Hall", "Downtown Dubai Venue"],
        abudhabi: ["Corniche Celebration Pavilion", "Saadiyat Event Hall"],
        sharjah: ["Al Qasba Event Hall", "Khalid Lagoon Venue"],
        doha: ["West Bay Banquet Hall", "Katara Event Pavilion"],
      },
    },
    {
      id: "apartment",
      types: ["Apartment", "House"],
      titles: {
        london: ["Canary Wharf Apartment Loft", "Camden Townhouse"],
        dubai: ["Marina Skyline Apartment", "JBR Beach Apartment"],
        abudhabi: ["Al Reem Skyline Apartment", "Saadiyat Beach Apartment"],
        sharjah: ["Al Khan Apartment", "Corniche Sharjah Apartment"],
        doha: ["Lusail Waterfront Apartment", "Porto Arabia Apartment"],
      },
    },
    {
      id: "restaurant",
      types: ["Restaurant", "Bar"],
      titles: {
        london: ["Soho Private Dining Room", "Shoreditch Chef’s Table"],
        dubai: ["DIFC Private Dining Room", "Jumeirah Restaurant Loft"],
        abudhabi: ["Al Maryah Private Dining", "Corniche Chef’s Table"],
        sharjah: ["Al Majaz Dining Room", "Sharjah Art District Kitchen"],
        doha: ["Souq Waqif Private Dining", "Msheireb Chef’s Table"],
      },
    },
    {
      id: "gallery",
      types: ["Gallery"],
      titles: {
        london: ["Whitechapel Exhibition Room", "Bankside Gallery"],
        dubai: ["Alserkal Exhibition Room", "DIFC Art Gallery"],
        abudhabi: ["Manarat Al Saadiyat Gallery", "Cultural District Gallery"],
        sharjah: ["Sharjah Art Foundation Room", "Al Qasba Gallery"],
        doha: ["Fire Station Gallery Room", "Katara Art Gallery"],
      },
    },
  ];

  return cities.flatMap((city, cityIndex) =>
    categorySeeds.flatMap((category, categoryIndex) =>
      guestProfiles.flatMap((profile, profileIndex) => {
        const titles =
          category.titles[city.locationId] ??
          category.titles.london ??
          [`${city.city} ${category.id}`];
        const title = titles[profileIndex % titles.length];
        const tomorrowFirst = profile.id === "20-50" || profileIndex % 2 === 1;
        const availableDateIds = tomorrowFirst
          ? ["tomorrow"]
          : profileIndex === 0
            ? ["today", "tomorrow"]
            : ["anytime"];

        return {
          id: `search-${city.locationId}-${category.id}-${profile.id}-${categoryIndex}`,
          title,
          location: city.location,
          city: city.city,
          locationId: city.locationId,
          guests: profile.guests,
          size: `${profile.sizeValue.toLocaleString()} sq ft`,
          parking: "Free parking",
          extraAmenities: 12 + profileIndex,
          price: 45 + cityIndex * 5 + profileIndex * 8,
          images: [
            cardImages[(cityIndex + profileIndex) % cardImages.length],
            cardImages[(cityIndex + profileIndex + 2) % cardImages.length],
          ],
          verified: true,
          categoryId: category.id,
          venueTypes: category.types,
          occasions: [
            occasionOptions[(cityIndex + profileIndex) % occasionOptions.length],
          ],
          amenities: ["Parking", "Kitchen"],
          capacity: profile.capacity,
          sizeValue: profile.sizeValue,
          lat: city.lat + ((categoryIndex + profileIndex) % 6) * 0.008,
          lng: city.lng + ((categoryIndex + profileIndex) % 6) * 0.006,
          availableDateIds,
        } satisfies VenueListing;
      })
    )
  );
}

