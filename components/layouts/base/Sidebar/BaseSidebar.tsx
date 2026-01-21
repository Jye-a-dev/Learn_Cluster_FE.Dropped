"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SidebarInformation from "./SidebarInformation";

export interface SideLink {
  label: string;
  href: string;
}

export interface SideDropdown {
  label: string;
  items: SideLink[];
}

interface BaseSidebarProps {
  links: SideLink[];
  dropdowns: SideDropdown[];
  gradientClass: string;
}

export default function BaseSidebar({
  links,
  dropdowns,
  gradientClass,
}: BaseSidebarProps) {
  return (
    <aside
      className={`w-50 flex-col self-start rounded-2xl border border-white/20 text-white shadow-xl ${gradientClass}`}
    >
      {/* Top info */}
      <div className="border-b border-white/20 px-4 py-5">
        <SidebarInformation />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* Normal links */}
        <div className="space-y-1">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="my-4 h-px bg-white/20" />

        {/* Dropdowns */}
        <div className="space-y-1">
          {dropdowns.map((group) => (
            <Disclosure key={group.label}>
              {({ open }) => (
                <div className="space-y-1">
                  <Disclosure.Button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                    <span className="truncate">{group.label}</span>
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </Disclosure.Button>

                  <Disclosure.Panel className="ml-3 space-y-1 border-l border-white/20 pl-3">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </nav>
    </aside>
  );
}
