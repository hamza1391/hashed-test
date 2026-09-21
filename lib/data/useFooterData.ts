export const footerHeadline =
  "Make it memorable—book the perfect venue and the pros who make it shine.";

export const footerColumns = [
  {
    title: "Venuze",
    orderClass: "lg:order-1",
    links: [
      { label: "About", href: "/about" },
      { label: "News", href: "/news" },
      { label: "Careers", href: "/careers" },
      { label: "Investors", href: "/investors" },
    ],
  },
  {
    title: "Explore",
    orderClass: "lg:order-3",
    links: [
      { label: "Venue types", href: "/explore/venue-types" },
      { label: "Venue features", href: "/explore/venue-features" },
      { label: "Service options", href: "/explore/service-options" },
      { label: "Locations", href: "/explore/locations" },
    ],
  },
  {
    title: "Support",
    orderClass: "lg:order-2",
    links: [
      { label: "Listings your venue", href: "/support/list-venue" },
      { label: "Listing your service", href: "/support/list-service" },
      { label: "Help center", href: "/help" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal & Privacy",
    orderClass: "lg:order-4",
    links: [
      { label: "Terms of service", href: "/legal/terms" },
      { label: "Payment & refund policy", href: "/legal/payments" },
      { label: "Host agreement", href: "/legal/host-agreement" },
      { label: "Vendor agreement", href: "/legal/vendor-agreement" },
    ],
  },
] as const;

export const socialLinks = [
  { id: "x", label: "X", href: "https://x.com" },
  { id: "facebook", label: "Facebook", href: "https://facebook.com" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com" },
] as const;

