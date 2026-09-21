import type { SVGProps } from "react";
import Image from "next/image";
import { ContactForm } from "@/components/layout/contact-form";
import {
  footerColumns,
  footerHeadline,
  socialLinks,
} from "@/lib/data/useFooterData";

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.83L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.4V9.41c0-2.38 1.41-3.69 3.57-3.69 1.04 0 2.12.19 2.12.19v2.34h-1.2c-1.18 0-1.54.73-1.54 1.48v1.78h2.63l-.42 2.89h-2.21V22c4.78-.75 8.44-4.89 8.44-9.93z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socialIcons = {
  x: XIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

export function Footer() {
  return (
    <footer className="relative z-0 overflow-hidden rounded-t-[50px] bg-black px-6 pb-8 pt-36 text-white md:px-10 md:pb-8 md:pt-40 lg:px-16 lg:pt-44 xl:px-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-8 md:gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-3 md:gap-4">
              <Image
                src="/images/Venuze-icon.svg"
                alt="Venuze"
                width={48}
                height={33}
                className="mt-0.5 h-8 w-auto shrink-0 md:h-10"
              />
              <h2 className="text-[20px] font-semibold leading-[1.35] md:text-xl lg:max-w-[560px] lg:text-2xl lg:leading-snug">
                {footerHeadline}
              </h2>
            </div>

            <nav
              aria-label="Footer"
              className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:mt-10 md:grid-cols-4 md:gap-x-8 lg:mt-12"
            >
              {footerColumns.map((column) => (
                <div key={column.title} className={column.orderClass}>
                  <h3 className="text-base font-medium text-footer-muted md:text-lg lg:text-xl">
                    {column.title}
                  </h3>
                  <ul className="mt-3 space-y-2 lg:mt-4 lg:space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-white transition-colors hover:text-brand"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <ContactForm />
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 md:mt-12 lg:mt-16">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="order-1 flex items-center gap-5 md:order-2 md:gap-4 lg:order-1">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.id];

                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="text-white transition-colors hover:text-brand"
                  >
                    <Icon className="size-6 md:size-5" />
                  </a>
                );
              })}
            </div>
            <p className="order-2 text-sm text-white/80 md:order-1 lg:order-2">
              © 2026 Venuze. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
