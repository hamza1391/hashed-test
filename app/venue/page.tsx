import { Suspense } from "react";
import Venue from "@/components/venue/venue";

function VenueFallback() {
  return (
    <div className="h-[calc(100svh-132px)] bg-white md:h-[calc(100svh-80px)] lg:h-[calc(100svh-84px)]" />
  );
}

export default function VenuePage() {
  return (
    <Suspense fallback={<VenueFallback />}>
      <Venue />
    </Suspense>
  );
}
