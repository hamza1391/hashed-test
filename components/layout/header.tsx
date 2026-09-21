"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, User } from "lucide-react";
import { CompactSearch } from "@/components/layout/compact-search";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { useHeroData } from "@/lib/data/useherodata";
import { useUIStore } from "@/store/ui-store";

const TEXT_LOGO = "/images/Venuze-textcolor.svg";

function BrandMark({ compact }: { compact: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3 md:gap-4">
      {compact ? (
        <>
          <Image
            src="/images/Venuze-icon.svg"
            alt="Venuze"
            width={48}
            height={33}
            preload
            decoding="sync"
            className="h-[22px] w-auto md:h-[33px] md:hidden"
          />
          <Image
            src={TEXT_LOGO}
            alt=""
            width={124}
            height={20}
            preload
            decoding="sync"
            className="hidden h-[20px] w-auto md:block lg:h-[30px]"
          />
        </>
      ) : (
        <>
          <Image
            src="/images/logo.svg"
            alt="Venuze"
            width={188}
            height={33}
            preload
            decoding="sync"
            className="hidden h-[33px] w-auto lg:block"
          />
          <Image
            src="/images/Venuze-icon.svg"
            alt="Venuze"
            width={48}
            height={33}
            preload
            decoding="sync"
            className="h-[33px] w-auto lg:hidden"
          />
        </>
      )}
    </Link>
  );
}

function ListingLanguageProfile({ compact }: { compact: boolean }) {
  const { listingOptions, languages, profileOptions, currentUser } =
    useHeroData();
  const languageId = useUIStore((state) => state.languageId);
  const setLanguageId = useUIStore((state) => state.setLanguageId);
  const closeDropdowns = useUIStore((state) => state.closeDropdowns);
  const activeLanguage =
    languages.find((language) => language.id === languageId)?.label ?? "EN";

  const pill = compact
    ? "rounded-full border border-[#E8E8E8] bg-white text-brand"
    : "rounded-[10px] bg-white  text-brand shadow-sm";

  return (
    <div className="flex items-center gap-2 md:gap-2.5">
      <Dropdown
        id="listing"
        align="right"
        trigger={({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            className={`cursor-pointer items-center gap-1.5 whitespace-nowrap px-3 py-2 text-xs font-medium md:px-4 md:py-2.5 md:text-sm ${pill} ${
              compact ? "hidden lg:flex" : "flex"
            }`}
          >
            Add your listing
            <ChevronDown
              className={`size-4 transition-transform text-[#6b7280] ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      >
        {listingOptions.map((option) => (
          <DropdownItem key={option.id} onClick={closeDropdowns}>
            {option.label}
          </DropdownItem>
        ))}
      </Dropdown>

      <Dropdown
        id="language"
        align="right"
        width="min-w-[120px]"
        trigger={({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-label="Select language"
            className={`cursor-pointer items-center gap-1 px-3 py-2.5 text-sm font-medium ${pill} ${
              compact ? "hidden lg:flex" : "hidden md:flex"
            }`}
          >
            {activeLanguage}
            <ChevronDown
              className={`size-4 transition-transform text-[#6b7280] ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      >
        {languages.map((language) => (
          <DropdownItem
            key={language.id}
            active={language.id === languageId}
            onClick={() => setLanguageId(language.id)}
          >
            {language.label}
          </DropdownItem>
        ))}
      </Dropdown>

      <Dropdown
        id="profile"
        align="right"
        trigger={({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-label="Profile"
            className={`cursor-pointer items-center justify-center ${
              compact
                ? "hidden size-10 rounded-full border border-[#E8E8E8] bg-white text-brand lg:flex"
                : `hidden size-10 md:flex ${pill}`
            }`}
          >
            <User className="size-5" />
          </button>
        )}
      >
        {profileOptions.map((option) => (
          <DropdownItem key={option.id} onClick={closeDropdowns}>
            {option.label}
          </DropdownItem>
        ))}
      </Dropdown>

      {compact ? (
        <Dropdown
          id="mobileMenu"
          align="right"
          trigger={({ open, toggle }) => (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              className="flex cursor-pointer items-center gap-2 lg:hidden"
            >
              <span className="text-sm font-medium text-black">
                {currentUser.name}
              </span>
              <Image
                src={currentUser.avatar}
                alt={currentUser.name}
                width={40}
                height={40}
                className="size-9 rounded-full md:size-10"
              />
            </button>
          )}
        >
          {profileOptions.map((option) => (
            <DropdownItem key={option.id} onClick={closeDropdowns}>
              {option.label}
            </DropdownItem>
          ))}
        </Dropdown>
      ) : (
        <Dropdown
          id="mobileMenu"
          align="right"
          trigger={({ open, toggle }) => (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-label="Open menu"
              className={`flex size-10 cursor-pointer items-center justify-center md:hidden ${pill}`}
            >
              <Menu className="size-5" />
            </button>
          )}
        >
          {languages.map((language) => (
            <DropdownItem
              key={language.id}
              active={language.id === languageId}
              onClick={() => setLanguageId(language.id)}
            >
              {language.label}
            </DropdownItem>
          ))}
          {profileOptions.map((option) => (
            <DropdownItem key={option.id} onClick={closeDropdowns}>
              {option.label}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </div>
  );
}

function LandingBar() {
  return (
    <div className="flex items-center justify-between px-4 py-4 md:px-6 md:py-5 lg:px-10 lg:py-6">
      <BrandMark compact={false} />
      <ListingLanguageProfile compact={false} />
    </div>
  );
}

function CompactBar() {
  return (
    <div className="px-3 pt-3 md:relative md:flex md:items-center md:justify-between md:px-6 md:py-3.5 lg:px-10 lg:py-4">
      <div className="rounded-[20px] bg-white p-3 shadow-[0px_4px_10px_0px_#0000001A] md:contents md:rounded-none md:bg-transparent md:p-0 md:shadow-none">
        <div className="flex items-center justify-between gap-3 md:contents">
          <div className="md:order-1">
            <BrandMark compact />
          </div>
          <div className="md:order-3">
            <ListingLanguageProfile compact />
          </div>
        </div>
        <div className="mt-3 md:order-2 md:mx-5 md:mt-0 md:w-[300px] lg:absolute lg:left-1/2 lg:mx-0 lg:w-full lg:max-w-[420px] lg:-translate-x-1/2">
          <CompactSearch />
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const closeDropdowns = useUIStore((state) => state.closeDropdowns);
  const compact = !isHome || scrolled;

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    const handlePointerDown = () => closeDropdowns();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDropdowns();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDropdowns]);

  useEffect(() => {
    closeDropdowns();
  }, [compact, closeDropdowns]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors ${
          compact
            ? "bg-transparent md:bg-white md:shadow-[0px_4px_10px_0px_#0000001A]"
            : "bg-transparent"
        }`}
      >
        {compact ? <CompactBar /> : <LandingBar />}
      </header>
      {!isHome ? (
        <div
          aria-hidden
          className="h-[132px] shrink-0 md:h-[80px] lg:h-[84px]"
        />
      ) : null}
    </>
  );
}
