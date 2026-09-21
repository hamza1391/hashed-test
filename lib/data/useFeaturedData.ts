import type { FeaturedCategoryId } from "@/store/ui-store";

export const featuredCategories: {
  id: FeaturedCategoryId;
  label: string;
}[] = [
  { id: "rooftop", label: "ROOFTOP" },
  { id: "gallery", label: "GALLERY" },
  { id: "restaurant", label: "RESTAURANT" },
  { id: "outdoor", label: "OUTDOOR" },
  { id: "studio", label: "STUDIO" },
  { id: "terrace", label: "TERRACE" },
  { id: "ballroom", label: "BALLROOM" },
];

export type FeaturedVenue = {
  id: string;
  categoryIds: FeaturedCategoryId[];
  title: string;
  location: string;
  guests: string;
  size: string;
  parking: string;
  price: number;
  image: string;
  verified: boolean;
};

const cardImages = [
  "/images/card/card-1.svg",
  "/images/card/card-2.svg",
  "/images/card/card-3.svg",
  "/images/card/card-4.svg",
  "/images/card/card-5.svg",
  "/images/card/card-6.svg",
] as const;

const titles = [
  "High-Spec Room in Trendy Home Clapham / Stockwell",
  "Bright Gallery Loft in Shoreditch",
  "Modern Studio Space in Canary Wharf",
  "Rooftop Terrace with City Views",
  "Private Dining Room in Mayfair",
  "Garden Pavilion for Outdoor Events",
] as const;

export const featuredVenues: FeaturedVenue[] = featuredCategories.flatMap(
  (category, categoryIndex) =>
    titles.map((title, index) => ({
      id: `${category.id}-${index + 1}`,
      categoryIds: [category.id],
      title,
      location: index % 2 === 0 ? "London, SW4" : "London, E1",
      guests: index % 2 === 0 ? "20+" : "40+",
      size: index % 2 === 0 ? "2,000 sqft" : "3,200 sqft",
      parking: "Free parking",
      price: 50 + ((categoryIndex + index) % 4) * 15,
      image: cardImages[(categoryIndex + index) % cardImages.length],
      verified: true,
    }))
);


