"use client";

import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SidebarInformation from "./SidebarInformation";
import SidebarToggleButton from "./SidebarToggleButton";

export interface SideItem {
  label: string;
  href?: string;
  items?: SideItem[];
}

interface BaseSidebarProps {
  items: SideItem[];
  gradientClass: string;
}

/* ========================= */
/* RECURSIVE MENU COMPONENT  */
/* ========================= */

function RecursiveMenuItem({ item, level = 0 }: { item: SideItem; level?: number }) {
  const padding = `pl-${3 + level * 3}`;

  if (item.items && item.items.length > 0) {
    return (
      <Disclosure>
        {({ open }) => (
          <div className="space-y-1">
            <Disclosure.Button
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-white/15 ${padding}`}
            >
              <span className="truncate">{item.label}</span>
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </Disclosure.Button>

            <Disclosure.Panel className="space-y-1 border-l border-white/20 ml-2">
              {item.items?.map((child) => (
                <RecursiveMenuItem
                  key={child.label}
                  item={child}
                  level={level + 1}
                />
              ))}
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      className={`block rounded-lg px-3 py-2 text-sm transition hover:bg-white/10 ${padding}`}
    >
      {item.label}
    </Link>
  );
}

/* ========================= */
/* BASE SIDEBAR              */
/* ========================= */

export default function BaseSidebar({
  items,
  gradientClass,
}: BaseSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`absolute inset-0 flex min-h-0 flex-col text-white shadow-xl transition-all duration-300 ${
        collapsed
          ? "w-0 rounded-2xl border-none"
          : "w-64 rounded-2xl border border-white/20"
      } ${gradientClass}`}
    >
      <SidebarToggleButton
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />

      {!collapsed && (
        <>
          <div className="border-b border-white/20 px-4 py-5">
            <SidebarInformation />
          </div>

          <nav className="flex-1 px-3 py-4 overflow-y-auto no-scrollbar space-y-2">
            {items.map((item) => (
              <RecursiveMenuItem key={item.label} item={item} />
            ))}
          </nav>
        </>
      )}
    </aside>
  );
}