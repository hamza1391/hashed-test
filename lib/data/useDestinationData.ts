export const destinationCopy = {
  title: "Discover Exceptional Destinations Across the Region",
  description:
    "From cosmopolitan cityscapes to cultural treasures, explore where celebrations come alive with local flavor.",
} as const;

export const destinationCta = {
  title: "Turn Your Venue into a Destination",
  description:
    "List your space on Venuze and unlock new revenue opportunities. Reach clients looking for venues just like yours.",
  cta: "List Your Venue",
  ctaHref: "/venue",
} as const;

export const destinations = [
  {
    id: "newyork",
    title: "New York, USA",
    count: 24,
    tagline: "Coastal energy, modern Venue",
    popular: "Rooftop",
    price: 50,
    image: "/images/destinations/newyork.svg",
  },
  {
    id: "london",
    title: "London, UK",
    count: 108,
    tagline: "Coastal energy, modern Venue",
    popular: "Rooftop",
    price: 25,
    image: "/images/destinations/london.svg",
  },
  {
    id: "dubai",
    title: "Dubai, UAE",
    count: 17,
    tagline: "Coastal energy, modern Venue",
    popular: "Rooftop",
    price: 50,
    image: "/images/destinations/dubai.svg",
  },
] as const;

export function useDestinationData() {
  return { destinationCopy, destinationCta, destinations };
}
