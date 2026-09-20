export const perfectImages = [
  {
    id: "top-left",
    src: "/images/perfect/perfect-1.svg",
    alt: "Friends celebrating at a party",
  },

    {
    id: "top-right",
    src: "/images/perfect/perfect-3.svg",
    alt: "Couple celebrating together",
  },
  {
    id: "bottom-left",
    src: "/images/perfect/perfect-2.svg",
    alt: "Guest dancing at an event",
  },

  {
    id: "bottom-right",
    src: "/images/perfect/perfect-4.svg",
    alt: "Hands joined in celebration",
  },
] as const;

export const perfectSteps = [
  {
    id: 1,
    title: "Search & filter",
    description:
      "Browse our curated collection of venues and event professionals. Use smart filters, high-quality visuals, and authentic reviews to find options that fit your needs, style, and budget.",
  },
  {
    id: 2,
    title: "Compare & message",
    description:
      "Communicate directly with venue hosts and service providers. Request tailored quotes, discuss requirements, and design every detail of your event or project with confidence.",
  },
  {
    id: 3,
    title: "Book & add services",
    description:
      "Secure your choices with ease through our protected booking system. With clear agreements, secure payments, and ongoing support, you can move forward knowing everything is handled.",
  },
] as const;

export const perfectCopy = {
  title: "Your Path to the Perfect Venue",
  description:
    "Planning an event, production, or gathering shouldn't feel complicated. Our streamlined process connects you with the right venues and trusted professionals, taking the stress out of logistics so you can focus on what matters most  making it a success.",
} as const;

export function usePerfectData() {
  return { perfectImages, perfectSteps, perfectCopy };
}
