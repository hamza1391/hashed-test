import HeroSection from "@/components/section/hero-section";
import VenueSection from "@/components/section/venue-section";
import FeaturedSection from "@/components/section/featured-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <VenueSection />
      <FeaturedSection />
      <Footer />
    </>
  );
}
