"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useVenueData } from "@/lib/data/useVenueData";
import { useUIStore } from "@/store/ui-store";

function VenueCard({
  title,
  count,
  image,
  eager = false,
}: {
  title: string;
  count: number;
  image: string;
  eager?: boolean;
}) {
  return (
    <article
      data-venue-card
      className="relative h-[320px] w-[240px] shrink-0 snap-start overflow-hidden rounded-[20px] bg-[#1A1A1A] md:h-[360px] md:w-[270px] lg:h-[400px] lg:w-[301px]"
    >
      <Image
        src={image}
        alt={title}
        fill
        loading={eager ? "eager" : "lazy"}
        sizes="(max-width: 768px) 240px, (max-width: 1024px) 270px, 301px"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 30.28%, rgba(0, 0, 0, 0.81) 100%)",
        }}
      />
      <span className="absolute left-4 top-4 rounded-full bg-[#00000080] px-3 py-1 text-[11px] font-medium text-white md:text-xs">
        {count} Venues
      </span>
      <h3 className="absolute bottom-5 left-4 right-4 text-[22px] font-semibold leading-[1.15] text-white md:text-[24px] lg:text-[26px]">
        {title}
      </h3>
    </article>
  );
}

function getCarouselMetrics(scroller: HTMLDivElement) {
  const card = scroller.querySelector<HTMLElement>("[data-venue-card]");
  const styles = window.getComputedStyle(scroller);
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 20;
  const cardWidth = card?.offsetWidth ?? 301;
  const step = cardWidth + gap;
  const visibleCount = Math.max(
    1,
    Math.floor((scroller.clientWidth + gap) / step)
  );

  return { step, visibleCount };
}

export default function VenueSection() {
  const { venueCategories } = useVenueData();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const venueCarouselIndex = useUIStore((state) => state.venueCarouselIndex);
  const venueCarouselMaxIndex = useUIStore(
    (state) => state.venueCarouselMaxIndex
  );
  const setVenueCarouselMaxIndex = useUIStore(
    (state) => state.setVenueCarouselMaxIndex
  );
  const scrollVenueCarousel = useUIStore((state) => state.scrollVenueCarousel);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateMaxIndex = () => {
      const { visibleCount } = getCarouselMetrics(scroller);
      setVenueCarouselMaxIndex(
        Math.max(0, venueCategories.length - visibleCount)
      );
    };

    updateMaxIndex();
    window.addEventListener("resize", updateMaxIndex);

    return () => window.removeEventListener("resize", updateMaxIndex);
  }, [setVenueCarouselMaxIndex, venueCategories.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const { step } = getCarouselMetrics(scroller);
    scroller.scrollTo({
      left: venueCarouselIndex * step,
      behavior: "smooth",
    });
  }, [venueCarouselIndex]);

  return (
    <section className="overflow-x-hidden bg-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
        <h2 className="text-center text-[28px] font-bold leading-[1.2] text-black md:text-[32px] lg:text-[40px]">
          Find The Best Venue For{" "}
          <br className="md:hidden" />
          Any Occasion
        </h2>
        <p className="mx-auto mt-3 max-w-[320px] text-center text-sm leading-relaxed text-[#5F5F5F] md:mt-4 md:max-w-[620px] md:text-[15px] lg:max-w-[820px] lg:text-base">
          Explore venues by category, from timeless ballrooms and rooftops with a
          view to modern studios and outdoor gardens, discover spaces designed to
          inspire unforgettable experiences.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-7xl md:mt-10 lg:px-0">
        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-5 snap-x snap-mandatory md:gap-5 md:px-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {venueCategories.map((venue, index) => (
            <VenueCard
              key={venue.id}
              title={venue.title}
              count={venue.count}
              image={venue.image}
              eager={index < 4}
            />
          ))}
        </div>

        <div className="mt-6 hidden justify-end gap-2 px-5 md:px-8 lg:flex lg:px-0">
          <button
            type="button"
            aria-label="Previous venues"
            disabled={venueCarouselIndex <= 0}
            onClick={() => scrollVenueCarousel("left")}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-black shadow-sm transition-opacity hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next venues"
            disabled={venueCarouselIndex >= venueCarouselMaxIndex}
            onClick={() => scrollVenueCarousel("right")}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-black shadow-sm transition-opacity hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
