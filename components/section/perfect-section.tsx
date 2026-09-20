import Image from "next/image";
import { usePerfectData } from "@/lib/data/usePerfectData";

function PerfectPhoto({
  src,
  alt,
  eager = false,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) {
  return (
    <article className="relative h-[113px] w-[162px] overflow-hidden rounded-[14px] bg-neutral-200 md:h-[136px] md:w-[196px] md:rounded-[16px] lg:h-[173px] lg:w-[250px] lg:rounded-[18px]">
      <Image
        src={src}
        alt={alt}
        fill
        loading={eager ? "eager" : "lazy"}
        sizes="(max-width: 768px) 162px, (max-width: 1024px) 196px, 250px"
        className="object-cover"
      />
    </article>
  );
}

function StepNumber({ value }: { value: number }) {
  return (
    <span
      className="relative z-[1] flex size-8 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white md:size-12"
      style={{
        border: "2.04px solid transparent",
        background:
          "linear-gradient(270deg, #FE8B16 0%, #FF5039 100%) padding-box, linear-gradient(270deg, #FE8B16 0%, #FF5037 100%) border-box",
      }}
    >
      {value}
    </span>
  );
}

export default function PerfectSection() {
  const { perfectImages, perfectSteps, perfectCopy } = usePerfectData();
  const leftImages = [perfectImages[0], perfectImages[2]];
  const rightImages = [perfectImages[1], perfectImages[3]];

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-0">
        <h2 className="text-center text-[28px] font-bold leading-[1.2] text-black md:text-[32px] lg:text-[40px]">
          Your Path to the Perfect
          <br className="md:hidden" /> Venue
        </h2>
        <p className="mx-auto mt-3 max-w-[320px] text-center text-sm leading-relaxed text-[#5F5F5F] md:mt-4 md:max-w-[640px] md:text-[15px] lg:max-w-7xl lg:text-xl px-12">
          {perfectCopy.description}
        </p>

        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-10 md:mt-12 lg:mt-14 lg:flex-row lg:items-center lg:justify-center lg:gap-[60px]">
          <div className="relative shrink-0">
            <div className="flex gap-1.5 md:gap-2 lg:gap-2.5">
              <div className="flex flex-col gap-1.5 pt-3 md:gap-2 md:pt-4 lg:gap-2.5 lg:pt-12">
                {leftImages.map((image, index) => (
                  <PerfectPhoto
                    key={image.id}
                    src={image.src}
                    alt={image.alt}
                    eager={index < 2}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-1.5 md:gap-2 lg:gap-2.5">
                {rightImages.map((image) => (
                  <PerfectPhoto
                    key={image.id}
                    src={image.src}
                    alt={image.alt}
                    eager
                  />
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <div className="flex size-[72px] translate-y-1.5 items-center justify-center rounded-full bg-white shadow-[0_8px_28px_rgba(0,0,0,0.12)] md:size-[88px] md:translate-y-2 lg:size-[108px] lg:translate-y-2.5">
                <Image
                  src="/images/perfect/icon.svg"
                  alt=""
                  width={46}
                  height={42}
                  className="h-7 w-auto md:h-8 lg:h-12"
                />
              </div>
            </div>
          </div>

          <ol className="w-full">
            {perfectSteps.map((step, index) => {
              const isLast = index === perfectSteps.length - 1;

              return (
                <li
                  key={step.id}
                  className={`flex gap-3.5 md:gap4 ${isLast ? "" : "pb-6 md:pb-7 lg:pb-8"}`}
                >
                  <div className="flex w-8 shrink-0 flex-col items-center self-stretch md:w-9">
                    <StepNumber value={step.id} />
                    {!isLast ? (
                      <span
                        aria-hidden="true"
                        className="mt-1.5 w-0 flex-1  border-l-[1.5px] border-dashed border-[#A1A1A1]"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-[15px] font-semibold text-black md:text-base lg:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-base leading-relaxed text-[#5F5F5F] lg:text-base">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
