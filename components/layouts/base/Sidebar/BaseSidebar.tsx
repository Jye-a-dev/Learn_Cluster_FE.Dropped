"use client";

import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SidebarInformation from "./SidebarInformation";
import SidebarToggleButton from "./SidebarToggleButton";

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
  dropdowns?: SideDropdown[]; // ✅ cho phép truyền nhiều / hoặc không truyền
  gradientClass: string;
}

export default function BaseSidebar({
  links,
  dropdowns = [], // ✅ default để không crash
  gradientClass,
}: BaseSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`absolute inset-0 flex min-h-0 flex-col text-white shadow-xl transition-all duration-300 ${collapsed
          ? "w-0 rounded-2xl border-none "
          : "w-50 rounded-2xl border border-white/20"
        } ${gradientClass}`}
    >

      {/* Toggle button */}
      <SidebarToggleButton
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />

      {/* Top info */}
      {!collapsed && (
        <div className="border-b border-white/20 px-4 py-5">
          <SidebarInformation />
        </div>
      )}

      {/* Navigation */}
      {!collapsed && (
        <nav className="flex-1 px-3 py-4 overflow-y-auto no-scrollbar">
          {/* Normal links */}
          <div className="space-y-1">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-white/15"
              >
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Divider chỉ hiện khi có dropdown */}
          {dropdowns.length > 0 && (
            <div className="my-4 h-px bg-white/20" />
          )}

          {/* Multiple dropdowns – cùng cấp */}
          <div className="space-y-2">
            {dropdowns.map((group) => (
              <Disclosure key={group.label}>
                {({ open }) => (
                  <div className="space-y-1">
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-xl px-3 py-2 cursor-pointer text-sm font-semibold transition hover:bg-white/15">
                      <span className="truncate">{group.label}</span>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""
                          }`}
                      />
                    </Disclosure.Button>

                    <Disclosure.Panel className="ml-3 space-y-1 border-l border-white/20 pl-3 cursor-pointer">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-sm transition hover:bg-white/10 cursor-pointer"
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
          <div className="h-70 shrink-0" />
        </nav>
      )}
    </aside>
  );
}
