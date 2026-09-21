"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHomeContent } from "@/hooks/use-home-content";
import { useUIStore } from "@/store/ui-store";

function TrustedCard({
  title,
  image,
  eager = false,
}: {
  title: string;
  image: string;
  eager?: boolean;
}) {
  return ( 
    <article
      data-trusted-card
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
      <h3 className="absolute bottom-5 left-4 right-4 text-[22px] font-semibold leading-[1.15] text-white md:text-[24px] lg:text-[26px]">
        {title}
      </h3>
    </article>
  );
}

function getCarouselMetrics(scroller: HTMLDivElement) {
  const card = scroller.querySelector<HTMLElement>("[data-trusted-card]");
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

export default function TrustedSection() {
  const trustedVendors = useHomeContent().data?.trustedVendors ?? [];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trustedCarouselIndex = useUIStore((state) => state.trustedCarouselIndex);
  const trustedCarouselMaxIndex = useUIStore(
    (state) => state.trustedCarouselMaxIndex
  );
  const setTrustedCarouselMaxIndex = useUIStore(
    (state) => state.setTrustedCarouselMaxIndex
  );
  const scrollTrustedCarousel = useUIStore(
    (state) => state.scrollTrustedCarousel
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateMaxIndex = () => {
      const { visibleCount } = getCarouselMetrics(scroller);
      setTrustedCarouselMaxIndex(
        Math.max(0, trustedVendors.length - visibleCount)
      );
    };

    updateMaxIndex();
    window.addEventListener("resize", updateMaxIndex);

    return () => window.removeEventListener("resize", updateMaxIndex);
  }, [setTrustedCarouselMaxIndex, trustedVendors.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const { step } = getCarouselMetrics(scroller);
    scroller.scrollTo({
      left: trustedCarouselIndex * step,
      behavior: "smooth",
    });
  }, [trustedCarouselIndex]);

  return (
    <section className="relative z-0 bg-[#fdf1d2] pt-12 pb-[240px] md:pt-16 md:pb-[190px] lg:pt-20 lg:pb-[160px]">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
        <h2 className="text-center text-[28px] font-bold leading-[1.2] text-black md:text-[32px] lg:text-[40px]">
          Complete Your Event with our{" "}
          <br className="hidden md:block" />
          Trusted Vendors
        </h2>
        <p className="mx-auto mt-3 max-w-[340px] text-center text-sm leading-relaxed text-[#5F5F5F] md:mt-4 md:max-w-[640px] md:text-[15px] lg:max-w-[780px] lg:text-base">
          Venues are just the beginning. Discover caterers, decorators,
          photographers, entertainment, and more all in one place, ready to bring
          your event project to life.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-7xl md:mt-10 lg:px-0">
        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-5 snap-x snap-mandatory md:gap-5 md:px-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {trustedVendors.map((vendor, index) => (
            <TrustedCard
              key={vendor.id}
              title={vendor.title}
              image={vendor.image}
              eager={index < 4}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2 px-5 md:px-8 lg:px-0">
          <button
            type="button"
            aria-label="Previous vendors"
            disabled={trustedCarouselIndex <= 0}
            onClick={() => scrollTrustedCarousel("left")}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-black shadow-sm transition-opacity hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next vendors"
            disabled={trustedCarouselIndex >= trustedCarouselMaxIndex}
            onClick={() => scrollTrustedCarousel("right")}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-black shadow-sm transition-opacity hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
