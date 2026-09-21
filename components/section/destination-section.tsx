"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDestinationData } from "@/lib/data/useDestinationData";

function DestinationCard({
  title,
  count,
  tagline,
  popular,
  price,
  image,
  eager = false,
}: {
  title: string;
  count: number;
  tagline: string;
  popular: string;
  price: number;
  image: string;
  eager?: boolean;
}) {
  return (
    <article className="relative h-[380px] w-[min(300px,85vw)] shrink-0 overflow-hidden rounded-[24px] bg-[#1A1A1A] max-md:snap-center md:h-[282px] md:w-[230px] lg:h-[500px] lg:w-[408px]">
      <Image
        src={image}
        alt={title}
        fill
        loading={eager ? "eager" : "lazy"}
        sizes="(max-width: 768px) 300px, (max-width: 1024px) 230px, 408px"
        className="object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 30.28%, rgba(0, 0, 0, 0.81) 100%)",
        }}
      />
      <span className="absolute left-4 top-4 rounded-full bg-[#00000080] px-3 py-1 text-[11px] font-medium text-white md:text-xs lg:left-5 lg:top-5 lg:px-3.5 lg:py-1.5">
        {count} Venues
      </span>
      <div className="absolute inset-x-4 bottom-5 text-white lg:inset-x-6 lg:bottom-6">
        <h3 className="text-[22px] font-semibold leading-tight md:text-[20px] lg:text-[28px]">
          {title}
        </h3>
        <p className="mt-1 text-xs text-white/85 md:text-[11px] lg:text-sm">
          {tagline}
        </p>
        <div className="mt-2 flex items-end justify-between gap-3 text-xs lg:mt-3 lg:text-sm">
          <p className="text-white/80">
            Popular: <span className="text-white">{popular}</span>
          </p>
          <p className="shrink-0 font-medium">From ${price} per hour</p>
        </div>
      </div>
    </article>
  );
}

function DestinationCta() {
  const { destinationCta } = useDestinationData();
  const router = useRouter();

  return (
    <div className="relative z-30 mx-auto -mb-[120px] max-w-7xl px-5 md:-mb-[140px] md:px-8 lg:-mb-[160px] lg:px-0">
      <article
        className="relative overflow-hidden rounded-[32px] md:rounded-[28px] lg:rounded-[24px]"
        style={{
          background:
            "linear-gradient(90deg, #FF786A 0%, #FF4F37 50%, #FFC331 100%)",
        }}
      >
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="relative z-20 shrink-0 overflow-visible px-6 pt-10 text-center md:px-10 md:py-8 md:text-left lg:px-14 lg:py-10">
            <h2 className="text-[28px] font-semibold leading-[1.2] tracking-tight text-white md:text-[30px] lg:text-[44px]">
              Turn Your Venue into a
              <br />
              Destination
            </h2>
            <p className="mx-auto mt-3 max-w-[280px] text-sm leading-relaxed text-white/95 md:mx-0 md:mt-3 md:max-w-[420px] md:text-[13px] lg:max-w-7xl lg:text-xl">
              <span className="md:block">
                List your space on Venuze and unlock new revenue opportunities.
                Reach{" "}
              </span>
              <span className="relative inline-block">
                clients looking for venues just like yours.
                <Image
                  src="/images/grow/dekstop-vector.svg"
                  alt=""
                  width={199}
                  height={59}
                  className="pointer-events-none absolute top-12 left-[calc(100%+120px)] z-30 hidden w-[199px] max-w-none -translate-y-[38%] lg:block"
                />
                <Image
                  src="/images/grow/tablet-vector.svg"
                  alt=""
                  width={84}
                  height={27}
                  className="pointer-events-none absolute top-1/2 left-[calc(100%+10px)] z-30 hidden w-[84px] max-w-none -translate-y-1/2 md:block lg:hidden"
                />
              </span>
            </p>
            <button
              type="button"
              onClick={() => router.push(destinationCta.ctaHref)}
              className="mt-5 inline-flex w-full cursor-pointer items-center justify-center rounded-[16px] bg-black px-6 py-3.5 text-base font-medium text-white md:mt-5 md:w-auto md:rounded-full md:px-5 md:py-2.5 md:text-sm lg:px-6 lg:py-2.5"
            >
              {destinationCta.cta}
            </button>
          </div>

          <div className="relative z-[5] mt-8 w-full shrink-0 md:mt-0 md:w-[280px] lg:w-[328px] lg:pr-6">
            <Image
              src="/images/destinations/destination.svg"
              alt=""
              width={328}
              height={222}
              className="mx-auto h-auto w-full max-w-[328px] object-contain object-bottom"
            />
          </div>
        </div>
      </article>
    </div>
  );
}

export default function DestinationSection() {
  const { destinationCopy, destinations } = useDestinationData();

  return (
    <>
      <section className="relative bg-white pt-12 md:pt-16 lg:pt-20">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-10">
          <h2 className="mx-auto max-w-[280px] text-center text-[28px] font-bold leading-[1.2] text-black md:max-w-[520px] md:text-[32px] lg:max-w-none lg:text-[40px]">
            Discover Exceptional Destinations Across the Region
          </h2>
          <p className="mx-auto mt-3 max-w-[300px] text-center text-sm leading-relaxed text-[#5F5F5F] md:mt-4 md:max-w-[520px] md:text-[15px] lg:max-w-[720px] lg:text-base">
            {destinationCopy.description}
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-[1320px] overflow-x-hidden md:mt-10 md:overflow-visible">
          <div className="flex gap-4 overflow-x-auto scroll-smooth px-[calc((100%-min(300px,85vw))/2)] snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center md:gap-4 md:overflow-visible md:px-8 md:snap-none lg:gap-5 lg:px-10">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                title={destination.title}
                count={destination.count}
                tagline={destination.tagline}
                popular={destination.popular}
                price={destination.price}
                image={destination.image}
                eager={index < 3}
              />
            ))}
          </div>
        </div>
        <div className="h-10 md:h-12 lg:h-14" />
      </section>

      <DestinationCta />
    </>
  );
}
