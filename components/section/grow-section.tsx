"use client";

import Image from "next/image";
import { useGrowData } from "@/lib/data/useGrowData";

export default function GrowSection() {
  const { cta, ctaHref } = useGrowData();

  return (
    <section className="relative z-20 bg-white">
      <div className="relative z-20 mx-auto -mt-[210px] max-w-7xl px-5 md:-mt-[160px] md:px-8 lg:-mt-[130px] lg:px-0">
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
                <span className="md:whitespace-nowrap">
                  Grow Your Business with
                </span>
                <br />
                Venuze
              </h2>
              <p className="mx-auto mt-3 max-w-[280px] text-sm leading-relaxed text-white/95 md:mx-0 md:mt-3 md:max-w-none md:text-[13px] lg:text-xl">
                <span className="md:block">
                  Showcase your services to thousands of event organizers and
                  creators{" "}
                </span>
                <span className="relative inline-block">
                  searching for talent like yours.
                  <Image
                    src="/images/grow/dekstop-vector.svg"
                    alt=""
                    width={199}
                    height={59}
                    className="pointer-events-none absolute top-1/2 left-[calc(100%+192px)] z-30 hidden w-[199px] max-w-none -translate-y-[30%] lg:block"
                  />
                  <Image
                    src="/images/grow/tablet-vector.svg"
                    alt=""
                    width={84}
                    height={27}
                    className="pointer-events-none absolute bottom-12 left-[calc(100%+200px)] z-30 hidden w-[84px] max-w-none -translate-y-1/2 md:block lg:hidden"
                  />
                </span>
              </p>
              <a
                href={ctaHref}
                className="mt-5 inline-flex w-full cursor-pointer items-center justify-center rounded-[16px] bg-black px-6 py-3.5 text-base font-medium text-white md:mt-5 md:w-auto md:rounded-full md:px-5 md:py-2.5 md:text-sm lg:px-6 lg:py-2.5"
              >
                {cta}
              </a>
            </div>

            <div className="relative z-[5] mt-8 w-full shrink-0 md:mt-0 md:w-[340px] lg:w-[447px]">
              <Image
                src="/images/grow/dec.svg"
                alt=""
                width={447}
                height={204}
                className="mx-auto h-auto w-full max-w-[447px] object-contain object-bottom"
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
