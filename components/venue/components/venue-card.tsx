"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Scaling,
  Share2,
  Users,
} from "lucide-react";
import type { VenueListing } from "@/lib/data/useVenueListingData";
import { useUIStore } from "@/store/ui-store";
import { useVenueListingStore } from "@/store/venue-store";

export function VenueCard({ venue }: { venue: VenueListing }) {
  const [imageIndex, setImageIndex] = useState(0);
  const favoriteIds = useUIStore((state) => state.featuredFavoriteIds);
  const toggleFeaturedFavorite = useUIStore(
    (state) => state.toggleFeaturedFavorite
  );
  const selectedVenueId = useVenueListingStore((state) => state.selectedVenueId);
  const setSelectedVenueId = useVenueListingStore(
    (state) => state.setSelectedVenueId
  );
  const isFavorite = favoriteIds.includes(venue.id);
  const selected = selectedVenueId === venue.id;
  const image = venue.images[imageIndex] ?? venue.images[0];

  return (
    <article
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-[18px] border bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${
        selected ? "border-brand" : "border-[#EFEFEF]"
      }`}
      onClick={() => setSelectedVenueId(venue.id)}
    >
      <div className="relative h-[180px] bg-[#1A1A1A]">
        <Image
          src={image}
          alt={venue.title}
          fill
          sizes="(max-width: 1024px) 100vw, 280px"
          className="object-cover"
        />
        {venue.verified ? (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-black">
            <BadgeCheck className="size-3.5 text-brand" />
            Verified
          </span>
        ) : null}
        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Share venue"
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-neutral-700"
          >
            <Share2 className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            onClick={(event) => {
              event.stopPropagation();
              toggleFeaturedFavorite(venue.id);
            }}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-neutral-700"
          >
            <Heart
              className={`size-3.5 ${isFavorite ? "fill-brand text-brand" : ""}`}
            />
          </button>
        </div>
        {venue.images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                setImageIndex(
                  (imageIndex - 1 + venue.images.length) % venue.images.length
                );
              }}
              className="absolute left-2 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black shadow-sm opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                setImageIndex((imageIndex + 1) % venue.images.length);
              }}
              className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black shadow-sm opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="line-clamp-2 min-h-[42px] text-[15px] font-semibold leading-snug text-black">
          {venue.title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-brand">
          <MapPin className="size-3.5 shrink-0" />
          {venue.location}
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6B6B6B]">
          <span className="flex items-center gap-1">
            <Users className="size-3.5" />
            {venue.guests}
          </span>
          <span className="flex items-center gap-1">
            <Scaling className="size-3.5" />
            {venue.size}
          </span>
          <span className="flex items-center gap-1">
            <CarFront className="size-3.5" />
            {venue.parking}
          </span>
        </div>
        <p className="mt-1 text-xs text-[#8A8A8A]">+{venue.extraAmenities} more</p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm text-black">
            From{" "}
            <span className="font-semibold text-brand">${venue.price}</span>
            /hour
          </p>
          <button
            type="button"
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium ${
              selected
                ? "bg-brand text-white"
                : "border border-brand text-brand hover:bg-brand hover:text-white"
            }`}
          >
            View details
          </button>
        </div>
      </div>
    </article>
  );
}
