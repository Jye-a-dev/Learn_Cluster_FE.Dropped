"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface SidebarToggleButtonProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function SidebarToggleButton({
  collapsed,
  onToggle,
}: SidebarToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle sidebar"
      className={clsx(
        "absolute top-40 right-0 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white bg-black/60 text-white shadow-md backdrop-blur ring-1 ring-white/20 cursor-pointer",
        "transition-transform duration-300 ease-in-out hover:bg-black/80",
        collapsed ? "translate-x-8" : "translate-x-4"
      )}
    >
      {collapsed ? (
        <ChevronRightIcon className="h-4 w-4" />
      ) : (
        <ChevronLeftIcon className="h-4 w-4" />
      )}
    </button>
  );
}
