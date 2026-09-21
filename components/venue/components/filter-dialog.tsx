"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { occasionOptions, venueTypes } from "@/lib/data/useVenueListingData";
import { useVenueListingStore } from "@/store/venue-store";

function DualRange({
  min,
  max,
  step,
  valueMin,
  valueMax,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  valueMin: number;
  valueMax: number;
  onChange: (next: { min: number; max: number }) => void;
}) {
  const minPercent = ((valueMin - min) / (max - min)) * 100;
  const maxPercent = ((valueMax - min) / (max - min)) * 100;

  return (
    <div className="relative h-6">
      <div className="absolute top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-[#EDEDED]" />
      <div
        className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-brand"
        style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMin}
        onChange={(event) => {
          const next = Number(event.target.value);
          onChange({ min: Math.min(next, valueMax), max: valueMax });
        }}
        className="venue-range absolute inset-0 z-[2]"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMax}
        onChange={(event) => {
          const next = Number(event.target.value);
          onChange({ min: valueMin, max: Math.max(next, valueMin) });
        }}
        className="venue-range absolute inset-0 z-[3]"
      />
    </div>
  );
}

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs ${
        active
          ? "border-brand bg-[#FFF1EE] text-brand"
          : "border-[#E6E6E6] bg-white text-[#4A4A4A]"
      }`}
    >
      {label}
    </button>
  );
}

export function FilterDialog() {
  const filterOpen = useVenueListingStore((state) => state.filterOpen);
  const closeFilters = useVenueListingStore((state) => state.closeFilters);
  const draftFilters = useVenueListingStore((state) => state.draftFilters);
  const setDraftFilters = useVenueListingStore((state) => state.setDraftFilters);
  const toggleDraftType = useVenueListingStore((state) => state.toggleDraftType);
  const toggleDraftOccasion = useVenueListingStore(
    (state) => state.toggleDraftOccasion
  );
  const applyFilters = useVenueListingStore((state) => state.applyFilters);
  const clearFilters = useVenueListingStore((state) => state.clearFilters);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!filterOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFilters();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [closeFilters, filterOpen]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[10000] ${filterOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <button
        type="button"
        aria-label="Close filters"
        onClick={closeFilters}
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          filterOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute right-3 top-3 flex h-[calc(100svh-24px)] w-[min(420px,calc(100vw-24px))] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out md:right-6 md:top-6 md:h-[calc(100svh-48px)] ${
          filterOpen ? "translate-x-0" : "translate-x-[120%]"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-lg font-semibold text-black">Filters</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={closeFilters}
            className="cursor-pointer text-[#6B6B6B]"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <section>
            <h3 className="text-sm font-semibold text-black">Venue Type</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {venueTypes.map((type) => (
                <Pill
                  key={type}
                  label={type}
                  active={draftFilters.venueTypes.includes(type)}
                  onClick={() => toggleDraftType(type)}
                />
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-sm font-semibold text-black">Capacity</h3>
            <p className="mt-1 text-xs text-[#8A8A8A]">
              Showing venues for {draftFilters.capacityMin} –{" "}
              {draftFilters.capacityMax} guests
            </p>
            <div className="mt-4">
              <DualRange
                min={10}
                max={1500}
                step={10}
                valueMin={draftFilters.capacityMin}
                valueMax={draftFilters.capacityMax}
                onChange={({ min, max }) =>
                  setDraftFilters({ capacityMin: min, capacityMax: max })
                }
              />
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-sm font-semibold text-black">
              Price per hour (AED)
            </h3>
            <div className="mt-1 flex items-center justify-between text-xs text-[#8A8A8A]">
              <span>AED {draftFilters.priceMin.toFixed(2)}</span>
              <span>AED {draftFilters.priceMax.toFixed(2)}</span>
            </div>
            <div className="mt-4">
              <DualRange
                min={10}
                max={30000}
                step={10}
                valueMin={draftFilters.priceMin}
                valueMax={draftFilters.priceMax}
                onChange={({ min, max }) =>
                  setDraftFilters({ priceMin: min, priceMax: max })
                }
              />
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-sm font-semibold text-black">Event / Occasion</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {occasionOptions.map((occasion) => (
                <Pill
                  key={occasion}
                  label={occasion}
                  active={draftFilters.occasions.includes(occasion)}
                  onClick={() => toggleDraftOccasion(occasion)}
                />
              ))}
            </div>
          </section>

          <section className="mt-6 flex items-center justify-between border-t border-[#F0F0F0] pt-5">
            <div>
              <h3 className="text-sm font-semibold text-black">Verified Only</h3>
              <p className="mt-1 text-xs text-[#8A8A8A]">
                Show only verified venues
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={draftFilters.verifiedOnly}
              onClick={() =>
                setDraftFilters({ verifiedOnly: !draftFilters.verifiedOnly })
              }
              className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                draftFilters.verifiedOnly ? "bg-brand" : "bg-[#D9D9D9]"
              }`}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${
                  draftFilters.verifiedOnly ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </section>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#F0F0F0] px-5 py-4">
          <button
            type="button"
            onClick={clearFilters}
            className="cursor-pointer rounded-full bg-[#F2F2F2] px-5 py-2.5 text-sm font-medium text-[#6B6B6B]"
          >
            Clear All
          </button>
          <button
            type="button"
            onClick={applyFilters}
            className="cursor-pointer rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white"
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </div>,
    document.body
  );
}
