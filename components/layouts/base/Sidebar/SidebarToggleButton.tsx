"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

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
            className="absolute -right-4 border border-white cursor-pointer top-40 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white shadow-md backdrop-blur ring-1 ring-white/20 transition hover:bg-black/80"
        >
            {collapsed ? (
                <ChevronRightIcon className="h-4 w-4" />
            ) : (
                <ChevronLeftIcon className="h-4 w-4" />
            )}
        </button>
    );
}
