"use client";

import Image from "next/image";

export function VenueEmptyState() {
  return (
    <div className="flex min-h-[520px] flex-1 flex-col items-center justify-center px-6 py-16">
      <Image
        src="/images/no data.svg"
        alt=""
        width={189}
        height={127}
        className="h-[127px] w-[189px]"
      />
      <p className="mt-6 text-sm font-medium text-black">
        No data found for your search.
      </p>
      <p className="mt-1 max-w-[280px] text-center text-xs leading-relaxed text-[#8A8A8A]">
        Explore other options or clear filters to see more results.
      </p>
    </div>
  );
}
