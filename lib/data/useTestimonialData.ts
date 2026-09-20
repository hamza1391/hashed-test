export const testimonialCopy = {
  title: "Trusted by Event Creators Who Demand Excellence",
  description:
    "Join thousands of planners and hosts who love our seamless discovery and booking experience.",
} as const;

export const testimonialStats = [
  {
    id: "venues",
    value: "1,500+",
    label: "Venues Vetted & Approved",
    background: "#FF786A",
    color: "#FFFFFF",
  },
  {
    id: "events",
    value: "7,500+",
    label: "Events Successfully Hosted",
    background: "#FF5037",
    color: "#FFFFFF",
  },
  {
    id: "cities",
    value: "35+",
    label: "Cities Across the Region",
    background: "#FE8B16",
    color: "#FFFFFF",
  },
  {
    id: "rating",
    value: "4.9★",
    label: "Average Host Rating",
    background: "#FFC332",
    color: "#111111",
  },
] as const;

const quote =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

export const testimonials = [
  {
    id: "michael",
    name: "Michael Carter",
    quote,
    rating: 5,
    image: "/images/testimonials/test-1.svg",
  },
  {
    id: "ayesha",
    name: "by Ayesha M.",
    quote,
    rating: 5,
    image: "/images/testimonials/test-2.svg",
  },
  {
    id: "daniel",
    name: "Daniel Brooks",
    quote,
    rating: 5,
    image: "/images/testimonials/test-1.svg",
  },
  {
    id: "sara",
    name: "by Sara K.",
    quote,
    rating: 5,
    image: "/images/testimonials/test-2.svg",
  },
] as const;

export function useTestimonialData() {
  return { testimonialCopy, testimonialStats, testimonials };
}
