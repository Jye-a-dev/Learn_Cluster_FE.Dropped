// components/layouts/user/Sidebar/UserSidebar.tsx
"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ADMIN_SIDE_LINKS, ADMIN_SIDE_DROPDOWNS } from "./AdminSideData";
import SidebarInformation from "../../user/Sidebar/SidebarInformation";
import Link from "next/link";

export default function AdminSidebar() {
    return (
        <aside className=" self-start] w-50 flex-col rounded-2xl border border-white/20 bg-linear-to-b from-emerald-800 to-lime-600 text-white shadow-xl">
            <div className="border-b border-white/20 px-4 py-5">
                <SidebarInformation />
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
                <div className="space-y-1">
                    {ADMIN_SIDE_LINKS.map((item) => (
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

                <div className="space-y-1">
                    {ADMIN_SIDE_DROPDOWNS.map((group) => (
                        <Disclosure key={group.label}>
                            {({ open }) => (
                                <div className="space-y-1">
                                    <Disclosure.Button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                                        <span className="truncate">{group.label}</span>
                                        <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
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
