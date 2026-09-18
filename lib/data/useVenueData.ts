export const venueCategories = [
  {
    id: "celebration",
    title: "Celebration Venues",
    count: 37,
    image: "/images/venue/venue-1.svg",
  },
  {
    id: "private-party",
    title: "Private Party Venues",
    count: 37,
    image: "/images/venue/venue-2.svg",
  },
  {
    id: "corporate",
    title: "Corporate Meetings",
    count: 37,
    image: "/images/venue/venue-3.svg",
  },
  {
    id: "creative",
    title: "Creative Studios",
    count: 37,
    image: "/images/venue/venue-4.svg",
  },
  {
    id: "outdoor",
    title: "Outdoor Gardens",
    count: 24,
    image: "/images/venue/venue-2.svg",
  },
  {
    id: "rooftop",
    title: "Rooftop Venues",
    count: 18,
    image: "/images/venue/venue-1.svg",
  },
  {
    id: "ballrooms",
    title: "Wedding Ballrooms",
    count: 29,
    image: "/images/venue/venue-3.svg",
  },
  {
    id: "beach",
    title: "Beach Clubs",
    count: 15,
    image: "/images/venue/venue-4.svg",
  },
] as const;

export function useVenueData() {
  return { venueCategories };
}
