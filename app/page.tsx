import HeroSection from "@/components/section/hero-section";
import VenueSection from "@/components/section/venue-section";
import FeaturedSection from "@/components/section/featured-section";
import TrustedSection from "@/components/section/trusted-section";
import GrowSection from "@/components/section/grow-section";
import PerfectSection from "@/components/section/perfect-section";
import TestimonialSection from "@/components/section/testimonial-section";
import DestinationSection from "@/components/section/destination-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <VenueSection />
      <FeaturedSection />
      <TrustedSection />
      <GrowSection />
      <PerfectSection />
      <TestimonialSection />
      <DestinationSection />
    </>
  );
}
