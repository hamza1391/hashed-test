"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/header";
import { SearchPanel } from "@/components/section/search-panel";
import { useHeroData } from "@/lib/data/useherodata";
import { useUIStore } from "@/store/ui-store";

function SlideDots() {
  const { heroSlides } = useHeroData();
  const currentSlide = useUIStore((state) => state.currentSlide);
  const setCurrentSlide = useUIStore((state) => state.setCurrentSlide);

  return (
    <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-2 md:bottom-6">
      {heroSlides.map((slide) => {
        const active = slide.id === currentSlide;

        return (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${slide.id + 1}`}
            onClick={() => setCurrentSlide(slide.id)}
            className={`cursor-pointer rounded-full transition-all ${
              active
                ? "h-1.5 w-6 bg-[#F5C242]"
                : "size-1.5 bg-white/70"
            }`}
          />
        );
      })}
    </div>
  );
}

export default function HeroSection() {
  const { heroSlides } = useHeroData();
  const currentSlide = useUIStore((state) => state.currentSlide);
  const closeDropdowns = useUIStore((state) => state.closeDropdowns);
  const activeSlide =
    heroSlides.find((slide) => slide.id === currentSlide) ?? heroSlides[0];

  useEffect(() => {
    const handlePointerDown = () => closeDropdowns();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDropdowns();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDropdowns]);

  return (
    <section className="relative isolate min-h-svh overflow-hidden">
        <img
          src={activeSlide.src}
          alt=""
          fetchPriority="high"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

      <div className="relative z-10 flex min-h-svh flex-col">
        <Header />

        <div className="flex flex-1 flex-col items-center justify-center px-5 pb-16 pt-6 md:px-8 md:pb-20 lg:px-10">
          <h1 className="max-w-[300px] text-center text-[30px] font-semibold leading-[1.15] tracking-tight text-white md:max-w-[720px] md:text-[50px] lg:max-w-[840px] lg:text-[70px]">
            Celebrate{" "}
            <br className="hidden md:block lg:hidden" />
            in venues{" "}
            <br className="md:hidden lg:block" />
            big and small
          </h1>

          <div className="mt-8 w-full md:mt-10 lg:mt-14">
            <div className="flex justify-center">
              <SearchPanel />
            </div>
          </div>
        </div>
      </div>

      <SlideDots />
    </section>
  );
}
