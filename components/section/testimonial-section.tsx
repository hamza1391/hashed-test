"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useHomeContent } from "@/hooks/use-home-content";
import { useUIStore } from "@/store/ui-store";

function TestimonialCard({
  name,
  quote,
  rating,
  image,
  eager = false,
}: {
  name: string;
  quote: string;
  rating: number;
  image: string;
  eager?: boolean;
}) {
  return (
    <article
      data-testimonial-card
      className="flex h-[180px] w-[min(320px,calc(100vw-48px))] shrink-0 snap-start overflow-hidden rounded-[20px] bg-white shadow-[0px_4px_4px_0px_#0000001A] md:h-[172px] md:w-[calc(50%-10px)] md:min-w-[calc(50%-10px)] lg:h-[300px] lg:rounded-[24px]"
    >
      <div className="relative h-[180px] w-[120px] shrink-0 md:h-[172px] md:w-[136px] lg:h-[300px] lg:w-[236px]">
        <Image
          src={image}
          alt={name}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 768px) 120px, (max-width: 1024px) 136px, 236px"
          className="object-cover object-top"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 md:px-5 lg:px-8">
        <p className="text-[13px] leading-relaxed text-black md:text-sm lg:text-[22px] lg:leading-snug">
          {quote}
        </p>
        <p className="mt-3 text-sm font-semibold text-black md:mt-3 lg:mt-8 lg:text-lg">
          {name}
        </p>
        <div className="mt-1 flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: rating }).map((_, index) => (
            <Star
              key={index}
              className="size-3 fill-[#FFC332] text-[#FFC332] lg:size-4"
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function getCarouselMetrics(scroller: HTMLDivElement) {
  const card = scroller.querySelector<HTMLElement>("[data-testimonial-card]");
  const styles = window.getComputedStyle(scroller);
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 20;
  const cardWidth = card?.offsetWidth ?? 320;
  const step = cardWidth + gap;
  const visibleCount = Math.max(
    1,
    Math.floor((scroller.clientWidth + gap) / step)
  );

  return { step, visibleCount };
}

export default function TestimonialSection() {
  const home = useHomeContent();
  const testimonialCopy = home.data?.testimonialCopy;
  const testimonialStats = home.data?.testimonialStats ?? [];
  const testimonials = home.data?.testimonials ?? [];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const testimonialCarouselIndex = useUIStore(
    (state) => state.testimonialCarouselIndex
  );
  const testimonialCarouselMaxIndex = useUIStore(
    (state) => state.testimonialCarouselMaxIndex
  );
  const setTestimonialCarouselMaxIndex = useUIStore(
    (state) => state.setTestimonialCarouselMaxIndex
  );
  const scrollTestimonialCarousel = useUIStore(
    (state) => state.scrollTestimonialCarousel
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateMaxIndex = () => {
      const { visibleCount } = getCarouselMetrics(scroller);
      setTestimonialCarouselMaxIndex(
        Math.max(0, testimonials.length - visibleCount)
      );
    };

    updateMaxIndex();
    window.addEventListener("resize", updateMaxIndex);

    return () => window.removeEventListener("resize", updateMaxIndex);
  }, [setTestimonialCarouselMaxIndex, testimonials.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const { step } = getCarouselMetrics(scroller);
    scroller.scrollTo({
      left: testimonialCarouselIndex * step,
      behavior: "smooth",
    });
  }, [testimonialCarouselIndex]);

  return (
    <section
      className="overflow-x-hidden py-12 md:py-16 lg:py-20"
      style={{
        backgroundColor: "#FDF5E8",
        backgroundImage:
          "linear-gradient(0deg, rgba(253, 245, 232, 0.35), rgba(253, 245, 232, 0.35)), linear-gradient(270deg, #FFDBD8 0%, #FFF0CD 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-0">
        <h2 className="mx-auto max-w-[280px] text-center text-[28px] font-bold leading-[1.2] text-black md:max-w-[520px] md:text-[32px] lg:max-w-none lg:text-[40px]">
          Trusted by Event Creators Who Demand Excellence
        </h2>
        <p className="mx-auto mt-3 max-w-[280px] text-center text-sm leading-relaxed text-[#5F5F5F] md:mt-3 md:max-w-[520px] md:text-[15px] lg:max-w-[720px] lg:text-base">
          {testimonialCopy?.description}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:gap-4 lg:grid-cols-4 lg:gap-5">
          {testimonialStats.map((stat) => (
            <article
              key={stat.id}
              className="flex flex-col items-center justify-center rounded-2xl px-3 py-5 text-center md:rounded-[20px] md:px-4 md:py-6 lg:rounded-[22px] lg:py-7"
              style={{ backgroundColor: stat.background, color: stat.color }}
            >
              <p className="text-[26px] font-bold leading-none md:text-[32px] lg:text-[36px]">
                {stat.value}
              </p>
              <p className="mt-1.5 max-w-[160px] text-[11px] leading-snug md:text-xs lg:text-sm">
                {stat.label}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 md:mt-8">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory md:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((item, index) => (
              <TestimonialCard
                key={item.id}
                name={item.name}
                quote={item.quote}
                rating={item.rating}
                image={item.image}
                eager={index < 2}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              aria-label="Previous testimonials"
              disabled={testimonialCarouselIndex <= 0}
              onClick={() => scrollTestimonialCarousel("left")}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-black shadow-sm transition-opacity hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              disabled={testimonialCarouselIndex >= testimonialCarouselMaxIndex}
              onClick={() => scrollTestimonialCarousel("right")}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-black shadow-sm transition-opacity hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
