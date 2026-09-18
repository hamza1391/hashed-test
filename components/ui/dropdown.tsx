"use client";

import type { ReactNode } from "react";
import { useUIStore, type DropdownId } from "@/store/ui-store";

type DropdownProps = {
  id: DropdownId;
  align?: "left" | "right";
  width?: string;
  trigger: (opts: { open: boolean; toggle: () => void }) => ReactNode;
  children: ReactNode;
};

export function Dropdown({
  id,
  align = "left",
  width = "min-w-[200px]",
  trigger,
  children,
}: DropdownProps) {
  const openDropdown = useUIStore((state) => state.openDropdown);
  const toggleDropdown = useUIStore((state) => state.toggleDropdown);
  const open = openDropdown === id;

  return (
    <div
      className="relative"
      onPointerDown={(event) => event.stopPropagation()}
    >
      {trigger({ open, toggle: () => toggleDropdown(id) })}
      {open ? (
        <div
          className={`absolute top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl bg-white py-1 shadow-[0_12px_40px_rgba(0,0,0,0.14)] ${width} ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  active = false,
}: {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full cursor-pointer px-4 py-2.5 text-left text-sm transition-colors ${
        active
          ? "bg-[#FFF1EE] font-medium text-brand"
          : "text-neutral-800 hover:bg-neutral-50"
      }`}
    >
      {children}
    </button>
  );
}
