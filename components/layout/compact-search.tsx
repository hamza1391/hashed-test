"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { useCatalog } from "@/hooks/use-catalog";
import { buildVenueSearchPath } from "@/lib/search/venue-params";
import { useUIStore, type DropdownId } from "@/store/ui-store";

function CompactField({
  id,
  label,
  value,
  selectedId,
  options,
  onSelect,
}: {
  id: DropdownId;
  label: string;
  value: string;
  selectedId: string;
  options: readonly { id: string; label: string }[];
  onSelect: (id: string) => void;
}) {
  return (
    <Dropdown
      id={id}
      width="w-[min(220px,70vw)] min-w-[160px]"
      trigger={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-label={label}
          className="flex min-w-0 cursor-pointer items-center justify-center px-2.5 py-2 text-[13px] font-medium leading-none md:px-3.5 md:text-sm lg:px-6 lg:text-[13px] lg:font-normal text-[#000000]"
        >
          <span className="truncate lg:hidden">{label}</span>
          <span className="hidden truncate lg:inline">{value}</span>
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

export function CompactSearch({ className = "" }: { className?: string }) {
  const router = useRouter();
  const catalog = useCatalog();
  const locations = catalog.data?.locations ?? [];
  const dates = catalog.data?.dates ?? [];
  const guestOptions = catalog.data?.guestOptions ?? [];
  const locationId = useUIStore((state) => state.locationId);
  const dateId = useUIStore((state) => state.dateId);
  const guestsId = useUIStore((state) => state.guestsId);
  const listingTab = useUIStore((state) => state.listingTab);
  const setLocationId = useUIStore((state) => state.setLocationId);
  const setDateId = useUIStore((state) => state.setDateId);
  const setGuestsId = useUIStore((state) => state.setGuestsId);
  const closeDropdowns = useUIStore((state) => state.closeDropdowns);

  function handleSearch() {
    closeDropdowns();
    router.push(
      buildVenueSearchPath({
        locationId,
        dateId,
        guestsId,
        listingTab,
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
    <div
      className={`flex items-center rounded-[14px] bg-transparent md:h-[52px] md:rounded-[22px] md:bg-white md:pl-1.5 md:pr-1.5 md:shadow-[0_8px_28px_rgba(0,0,0,0.08)] lg:h-[42px] lg:rounded-full lg:border lg:border-[#EDEDED] lg:pl-1 lg:pr-1 lg:shadow-[0_2px_10px_rgba(0,0,0,0.06)] ${className}`}
    >
      <div className="flex min-w-0 flex-1 items-center">
        <CompactField
          id="compactWhere"
          label="Where"
          value={location.label}
          selectedId={locationId}
          options={locations}
          onSelect={setLocationId}
        />
        <span className="h-4 w-px shrink-0 bg-[#E4E4E4] md:h-5" />
        <CompactField
          id="compactWhen"
          label="When"
          value={date.label}
          selectedId={dateId}
          options={dates}
          onSelect={setDateId}
        />
        <span className="h-4 w-px shrink-0 bg-[#E4E4E4] md:h-5" />
        <CompactField
          id="compactGuests"
          label="Guests"
          value={`${guests.label} Guests`}
          selectedId={guestsId}
          options={guestOptions}
          onSelect={setGuestsId}
        />
      </div>

      <button
        type="button"
        onClick={handleSearch}
        aria-label="Search"
        className="mr-1.5 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-brand text-white transition-colors hover:bg-brand/90 md:mr-0 md:size-11 md:rounded-[12px] lg:size-9 lg:rounded-[10px]"
      >
        <Search className="size-4 md:size-[18px] lg:size-4" />
      </button>
    </div>
  );
}
