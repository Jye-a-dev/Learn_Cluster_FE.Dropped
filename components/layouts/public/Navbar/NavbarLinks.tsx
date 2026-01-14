"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { linkHighlightClasses, dropdownItemHighlightClasses } from "./Color";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface NavbarLinksProps {
    links: { label: string; href: string; highlight: string }[];
    dropdowns: {
        label: string;
        items: { label: string; href: string; highlight: string }[];
    }[];
}

export default function NavbarLinks({ links, dropdowns }: NavbarLinksProps) {
    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.label}
                    href={link.href}
                    className={classNames("relative cursor-pointer px-3 py-2 rounded-md border-2 border-white text-sm font-medium transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm", linkHighlightClasses[link.highlight] || "")}
                >
                    {link.label}
                </Link>
            ))}

            {dropdowns.map((drop) => (
                <Menu as="div" key={drop.label} className="relative">
                    <Menu.Button className="group relative inline-flex items-center px-3 py-2 rounded-md cursor-pointer text-sm font-medium border-2 border-white transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-md hover:border-lime-400 hover:bg-lime-50 hover:text-lime-600 active:translate-y-0 active:shadow-sm">
                        {drop.label}
                        <ChevronDownIcon className="ml-1 h-5 w-5 transition-transform duration-200 group-hover:rotate-180" />
                        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-100 bg-linear-to-r from-lime-200/40 to-emerald-200/40" />
                    </Menu.Button>

                    <Transition as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1 scale-95"
                        enterTo="opacity-100 translate-y-0 scale-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0 scale-100"
                        leaveTo="opacity-0 translate-y-1 scale-95">
                        <Menu.Items className="absolute mt-2 w-45 rounded-xl cursor-pointer bg-zinc-200/95 backdrop-blur-md border border-gray-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 focus:outline-none text-gray-800 z-50">
                            {drop.items.map((item) => (
                                <Menu.Item key={item.label}>
                                    {({ active }) => (
                                        <Link
                                            href={item.href}
                                            className={classNames("hover:font-bold hover:pl-2 relative block border-2 border-zinc-100 px-4 py-2 m-1 text-sm rounded-lg cursor-pointer transition-all duration-150 ease-out hover:-translate-y-px hover:shadow-sm active:translate-y-0", 
                                                active ? dropdownItemHighlightClasses[item.highlight] : "text-gray-700")}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </Menu>
            ))}
        </>
    );
}
