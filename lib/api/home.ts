import { destinationCopy, destinationCta, destinations } from "@/lib/data/useDestinationData";
import { featuredCategories, featuredVenues } from "@/lib/data/useFeaturedData";
import { growCopy } from "@/lib/data/useGrowData";
import { perfectCopy, perfectImages, perfectSteps } from "@/lib/data/usePerfectData";
import {
  testimonialCopy,
  testimonialStats,
  testimonials,
} from "@/lib/data/useTestimonialData";
import { trustedVendors } from "@/lib/data/useTrustedData";
import { venueCategories } from "@/lib/data/useVenueData";
import { api } from "@/lib/api/client";

export function buildHomeContent() {
  return {
    featuredCategories,
    featuredVenues,
    venueCategories,
    trustedVendors,
    growCopy,
    perfectImages,
    perfectSteps,
    perfectCopy,
    testimonialCopy,
    testimonialStats,
    testimonials,
    destinationCopy,
    destinationCta,
    destinations,
  };
}

export type HomeContent = ReturnType<typeof buildHomeContent>;

export async function getHomeContent(): Promise<HomeContent> {
  if (typeof window === "undefined") {
    return buildHomeContent();
  }

  const { data } = await api.get<HomeContent>("/home");
  return data;
}
