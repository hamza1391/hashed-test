"use client";

import Image from "next/image";
import { ChevronDown, Menu, User } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { useHeroData } from "@/lib/data/useherodata";
import { useUIStore } from "@/store/ui-store";

export function Header() {
  const { listingOptions, languages, profileOptions } = useHeroData();
  const languageId = useUIStore((state) => state.languageId);
  const setLanguageId = useUIStore((state) => state.setLanguageId);
  const closeDropdowns = useUIStore((state) => state.closeDropdowns);
  const activeLanguage =
    languages.find((language) => language.id === languageId)?.label ?? "EN";

  return (
    <header className="relative z-30 flex items-center justify-between px-4 py-4 md:px-6 md:py-5 lg:px-10 lg:py-6">
      <a href="/" className="shrink-0" onClick={closeDropdowns}>
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
      </a>

      <div className="flex items-center gap-2 md:gap-2.5">
        <Dropdown
          id="listing"
          align="right"
          trigger={({ open, toggle }) => (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-2xl bg-white px-3 py-2 text-xs font-medium text-brand shadow-sm md:px-4 md:py-2.5 md:text-sm"
            >
              Add your listing
              <ChevronDown
                className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
          )}
        >
          {listingOptions.map((option) => (
            <DropdownItem
              key={option.id}
              onClick={closeDropdowns}
            >
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
              className="hidden cursor-pointer items-center gap-1 rounded-2xl bg-white px-3 py-2.5 text-sm font-medium text-brand shadow-sm md:flex"
            >
              {activeLanguage}
              <ChevronDown
                className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
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
              className="hidden size-10 cursor-pointer items-center justify-center rounded-2xl bg-white text-brand shadow-sm md:flex"
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

        <Dropdown
          id="mobileMenu"
          align="right"
          trigger={({ open, toggle }) => (
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-label="Open menu"
              className="flex size-10 cursor-pointer items-center justify-center rounded-2xl bg-white text-brand shadow-sm md:hidden"
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
      </div>
    </header>
  );
}
