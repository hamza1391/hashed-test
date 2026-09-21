import { Suspense } from "react";

export default function VenueLoading() {
  return (
    <div className="flex h-[calc(100svh-132px)] items-center justify-center bg-white text-sm text-[#8A8A8A] md:h-[calc(100svh-80px)] lg:h-[calc(100svh-84px)]">
      Loading venues…
    </div>
  );
}
