"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Scaling,
  Users,
} from "lucide-react";
import { useFeaturedData } from "@/lib/data/useFeaturedData";
import { useUIStore } from "@/store/ui-store";

function getCarouselMetrics(scroller: HTMLDivElement) {
  const card = scroller.querySelector<HTMLElement>("[data-featured-card]");
  const styles = window.getComputedStyle(scroller);
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 20;
  const cardWidth = card?.offsetWidth ?? 280;
  const step = cardWidth + gap;
  const visibleCount = Math.max(
    1,
    Math.floor((scroller.clientWidth + gap) / step)
  );

  return { step, visibleCount };
}

function FeaturedCard({
  id,
  title,
  location,
  guests,
  size,
  parking,
  price,
  image,
  eager = false,
}: {
  id: string;
  title: string;
  location: string;
  guests: string;
  size: string;
  parking: string;
  price: number;
  image: string;
  eager?: boolean;
}) {
  const favoriteIds = useUIStore((state) => state.featuredFavoriteIds);
  const toggleFeaturedFavorite = useUIStore(
    (state) => state.toggleFeaturedFavorite
  );
  const isFavorite = favoriteIds.includes(id);

  return (
    <article
      data-featured-card
      className="flex w-75 h-104.75 shrink-0 snap-start flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
    >
      <div className="relative h-[200px] bg-[#1A1A1A] ">
        <Image
          src={image}
          alt={title}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 768px) 300px, (max-width: 1024px) 3000px, 300px"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white">
          <BadgeCheck className="size-3.5" />
          Verified
        </span>
        <button
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={() => toggleFeaturedFavorite(id)}
          className="absolute right-3 top-3 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm"
        >
          <Heart
            className={`size-4 ${isFavorite ? "fill-brand text-brand" : ""}`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-black lg:text-base">
          {title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#6B6B6B]">
          <MapPin className="size-3.5 shrink-0 text-brand" />
          {location}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-[#6B6B6B]">
          <span className="flex items-center gap-1">
            <Users className="size-3.5" />
            {guests}
          </span>
          <span className="flex items-center gap-1">
            <Scaling className="size-3.5" />
            {size}
          </span>
          <span className="flex items-center gap-1">
            <CarFront className="size-3.5" />
            {parking}
          </span>
        </div>

        <div className="mt-4 flex flex-1 flex-col justify-end border-t border-neutral-100 pt-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-black">
              from{" "}
              <span className="font-semibold text-brand">${price}</span>
              /hour
            </p>
            <button
              type="button"
              className="hidden cursor-pointer items-center gap-0.5 text-sm font-medium text-brand md:inline-flex"
            >
              View details
              <ChevronRight className="size-4" />
            </button>
          </div>
          <button
            type="button"
            className="mt-3 cursor-pointer rounded-full border border-brand px-4 py-2 text-sm font-medium text-brand md:hidden"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedSection() {
  const { featuredCategories, featuredVenues } = useFeaturedData();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const featuredCategoryId = useUIStore((state) => state.featuredCategoryId);
  const setFeaturedCategory = useUIStore((state) => state.setFeaturedCategory);
  const featuredCarouselIndex = useUIStore(
    (state) => state.featuredCarouselIndex
  );
  const featuredCarouselMaxIndex = useUIStore(
    (state) => state.featuredCarouselMaxIndex
  );
  const setFeaturedCarouselMaxIndex = useUIStore(
    (state) => state.setFeaturedCarouselMaxIndex
  );
  const scrollFeaturedCarousel = useUIStore(
    (state) => state.scrollFeaturedCarousel
  );

  const visibleVenues = useMemo(
    () =>
      featuredVenues.filter((venue) =>
        venue.categoryIds.includes(featuredCategoryId)
      ),
    [featuredCategoryId, featuredVenues]
  );

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateMaxIndex = () => {
      const { visibleCount } = getCarouselMetrics(scroller);
      setFeaturedCarouselMaxIndex(
        Math.max(0, visibleVenues.length - visibleCount)
      );
    };

    updateMaxIndex();
    window.addEventListener("resize", updateMaxIndex);

    return () => window.removeEventListener("resize", updateMaxIndex);
  }, [setFeaturedCarouselMaxIndex, visibleVenues.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const { step } = getCarouselMetrics(scroller);
    scroller.scrollTo({
      left: featuredCarouselIndex * step,
      behavior: "smooth",
    });
  }, [featuredCarouselIndex, featuredCategoryId]);

  return (
    <section className="relative overflow-hidden bg-[#1A0F0C] py-12 md:py-16 lg:min-h-[800px] lg:py-20">
      <Image
        src="/images/featured-venue/featured-dekstop.svg"
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className="pointer-events-none object-cover"
      />
      <div className="absolute inset-0 bg-black/45 lg:bg-black/35" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 className="px-5 text-center text-[28px] font-bold text-white md:text-[36px] lg:text-[44px]">
          Featured Venues
        </h2>

        <div className="mt-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] snap-x snap-mandatory md:mt-6 md:justify-center md:px-8 [&::-webkit-scrollbar]:hidden">
          {featuredCategories.map((category) => {
            const active = category.id === featuredCategoryId;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setFeaturedCategory(category.id)}
                className={`shrink-0 snap-center rounded-full px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors ${
                  active
                    ? "bg-brand text-white"
                    : "bg-black/40 text-white hover:bg-black/55"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 md:mt-10">
          <div
            ref={scrollerRef}
            className="flex gap-4 lg:overflow-x-hidden overflow-x-auto scroll-smooth px-5 snap-x snap-mandatory md:gap-5 md:px-8 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {visibleVenues.map((venue, index) => (
              <FeaturedCard
                key={venue.id}
                id={venue.id}
                title={venue.title}
                location={venue.location}
                guests={venue.guests}
                size={venue.size}
                parking={venue.parking}
                price={venue.price}
                image={venue.image}
                eager={index < 4}
              />
            ))}
          </div>

          <div className="mt-6 hidden justify-end gap-2 px-10 lg:flex">
            <button
              type="button"
              aria-label="Previous featured venues"
              disabled={featuredCarouselIndex <= 0}
              onClick={() => scrollFeaturedCarousel("left")}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-white text-black shadow-sm transition-opacity hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next featured venues"
              disabled={featuredCarouselIndex >= featuredCarouselMaxIndex}
              onClick={() => scrollFeaturedCarousel("right")}
              className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-white text-black shadow-sm transition-opacity hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
