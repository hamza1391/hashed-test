export const listingOptions = [
  { id: "venue", label: "Add a venue" },
  { id: "vendor", label: "Add a vendor" },
] as const;

export const languages = [
  { id: "en", label: "EN" },
  { id: "ar", label: "AR" },
] as const;

export const locations = [
  { id: "dubai", label: "Dubai, UAE", shortLabel: "Dubai" },
  { id: "abudhabi", label: "Abu Dhabi, UAE", shortLabel: "Abu Dhabi" },
  { id: "sharjah", label: "Sharjah, UAE", shortLabel: "Sharjah" },
  { id: "doha", label: "Doha, Qatar", shortLabel: "Doha" },
] as const;

export const dates = [
  { id: "anytime", label: "Anytime" },
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "03-11-2025", label: "03-11-2025" },
] as const;

export const guestOptions = [
  { id: "10", label: "10" },
  { id: "10-20", label: "10-20" },
  { id: "20-50", label: "20-50" },
  { id: "50+", label: "50+" },
] as const;

export const profileOptions = [
  { id: "signin", label: "Sign in" },
  { id: "signup", label: "Create account" },
] as const;

export const heroSlides = [
  { id: 0, src: "/images/hero/hero.svg" },
  { id: 1, src: "/images/hero/hero.svg" },
  { id: 2, src: "/images/hero/hero.svg" },
  { id: 3, src: "/images/hero/hero.svg" },
] as const;

export function useHeroData() {
  return {
    listingOptions,
    languages,
    locations,
    dates,
    guestOptions,
    profileOptions,
    heroSlides,
  };
}
