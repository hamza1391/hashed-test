import HeroSection from "@/components/section/hero-section";
import VenueSection from "@/components/section/venue-section";
import FeaturedSection from "@/components/section/featured-section";
import TrustedSection from "@/components/section/trusted-section";
import GrowSection from "@/components/section/grow-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <VenueSection />
      <FeaturedSection />
      <TrustedSection />
      <GrowSection />
      <Footer />
    </>
  );
}
