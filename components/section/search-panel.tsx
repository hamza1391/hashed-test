"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Building2, ChevronDown, Search, Sparkles } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { useCatalog } from "@/hooks/use-catalog";
import { buildVenueSearchPath } from "@/lib/search/venue-params";
import { useUIStore, type ListingTab } from "@/store/ui-store";

function VenueVendorTabs({
  variant,
}: {
  variant: "overlap" | "stacked";
}) {
  const listingTab = useUIStore((state) => state.listingTab);
  const setListingTab = useUIStore((state) => state.setListingTab);

  const tabs: {
    id: ListingTab;
    label: string;
    icon: typeof Building2;
  }[] = [
    { id: "venue", label: "Venue", icon: Building2 },
    { id: "vendors", label: "Vendors", icon: Sparkles },
  ];

  const stacked = variant === "stacked";

  return (
    <div
      className={`flex items-center lg:h-[55px] rounded-[10px] bg-white ${
        stacked ? "w-full gap-2 p-0" : "p-1 shadow-md"
      }`}
    >
      {tabs.map((tab) => {
        const active = listingTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setListingTab(tab.id)}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl text-sm font-medium transition-colors ${
              stacked ? "h-11 flex-1 px-4" : "px-5 py-2.5"
            } ${
              active
                ? "bg-brand text-white"
                : stacked
                  ? "bg-[#EFEFEF] text-[#000000]"
                  : "bg-white text-[#000000]"
            }`}
          >
            <Icon className="size-5" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

function SearchField({
  id,
  label,
  value,
  selectedId,
  options,
  onSelect,
}: {
  id: "where" | "when" | "guests";
  label: string;
  value: ReactNode;
  selectedId: string;
  options: readonly { id: string; label: string }[];
  onSelect: (id: string) => void;
}) {
  return (
    <Dropdown
      id={id}
      width="w-full min-w-[180px]"
      trigger={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          className="flex w-full cursor-pointer items-center justify-between py-3 text-left md:px-3 md:py-2 lg:px-5"
        >
          <span className="flex min-w-0 flex-col">
            <span className="text-[11px] font-medium leading-none text-[#808080] md:text-xs lg:text-sm">
              {label}
            </span>
            <span className="mt-1.5 truncate text-sm font-semibold text-[#000000] md:text-[15px]">
              {value}
            </span>
          </span>
          <ChevronDown
            className={`size-4 shrink-0 text-neutral-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    >
      {options.map((option) => (
        <DropdownItem
          key={option.id}
          active={option.id === selectedId}
          onClick={() => onSelect(option.id)}
        >
          {option.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

export function SearchPanel() {
  const router = useRouter();
  const catalog = useCatalog();
  const locations = catalog.data?.locations ?? [];
  const dates = catalog.data?.dates ?? [];
  const guestOptions = catalog.data?.guestOptions ?? [];
  const locationId = useUIStore((state) => state.locationId);
  const dateId = useUIStore((state) => state.dateId);
  const guestsId = useUIStore((state) => state.guestsId);
  const setLocationId = useUIStore((state) => state.setLocationId);
  const setDateId = useUIStore((state) => state.setDateId);
  const setGuestsId = useUIStore((state) => state.setGuestsId);

  function handleSearch() {
    const snapshot = useUIStore.getState();
    snapshot.closeDropdowns();
    router.push(
      buildVenueSearchPath({
        locationId: snapshot.locationId,
        dateId: snapshot.dateId,
        guestsId: snapshot.guestsId,
        listingTab: snapshot.listingTab,
        categoryId: "all",
      })
    );
  }

  const location =
    locations.find((item) => item.id === locationId) ?? locations[0] ?? {
      id: "london",
      label: "London, UK",
      shortLabel: "London",
    };
  const date = dates.find((item) => item.id === dateId) ?? dates[0] ?? {
    id: "anytime",
    label: "Anytime",
  };
  const guests =
    guestOptions.find((item) => item.id === guestsId) ?? guestOptions[0] ?? {
      id: "10-20",
      label: "10-20",
    };

  return (
    <div className="relative w-full max-w-[400px] md:max-w-[720px] md:pt-6 lg:max-w-[960px]">
      <div className="absolute left-1/2 top-6 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <VenueVendorTabs variant="overlap" />
      </div>

      <div className="relative z-10 rounded-3xl bg-white p-4 shadow-[0_16px_50px_rgba(0,0,0,0.18)] md:flex md:items-center md:gap-1 md:p-2.5 md:pl-2 md:pt-4 lg:p-3 lg:pl-2 lg:pt-8">
        <div className="md:hidden">
          <VenueVendorTabs variant="stacked" />
        </div>

        <div className="mt-3 divide-y divide-neutral-200 md:mt-0 md:flex md:min-w-0 md:flex-1 md:divide-y-0">
          <div className="md:min-w-0 md:flex-1">
            <SearchField
              id="where"
              label="Where"
              selectedId={locationId}
              value={
                <>
                  <span className="md:hidden">{location.shortLabel}</span>
                  <span className="hidden md:inline">{location.label}</span>
                </>
              }
              options={locations}
              onSelect={setLocationId}
            />
          </div>
          <div className="md:min-w-0 md:flex-1">
            <SearchField
              id="when"
              label="When"
              selectedId={dateId}
              value={date.label}
              options={dates}
              onSelect={setDateId}
            />
          </div>
          <div className="md:min-w-0 md:flex-1">
            <SearchField
              id="guests"
              label="Guests"
              selectedId={guestsId}
              value={guests.label}
              options={guestOptions}
              onSelect={setGuestsId}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="mt-3 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand text-base lg:text-2xl font-medium text-white transition-colors hover:bg-brand/90 md:mt-0 md:h-12 md:w-auto md:shrink-0 md:px-7 lg:h-[52px] lg:px-8"
        >
          <Search className="size-5" />
          Search
        </button>
      </div>
    </div>
  );
}
