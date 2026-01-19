"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { linkHighlightClasses, dropdownItemHighlightClasses } from "./Color";
import type { NavLink, NavDropdown } from "./UserNavData";

/* =======================
   Utils
======================= */
function classNames(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

/* =======================
   Props
======================= */
interface NavbarLinksProps {
  links: NavLink[];
  dropdowns: NavDropdown[];
}

/* =======================
   Component
======================= */
export default function UserNavbarLinks({ links, dropdowns }: NavbarLinksProps) {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          title={link.label}
          className={classNames("relative cursor-pointer px-3 py-2 rounded-md border-2 border-white text-sm font-medium transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm whitespace-nowrap overflow-hidden text-ellipsis", link.highlight && linkHighlightClasses[link.highlight])}
        >
          {link.label}
        </Link>
      ))}

      {dropdowns.map((drop) => (
        <Menu as="div" key={drop.label} className="relative">
          <Menu.Button
            title={drop.label}
            className="group relative inline-flex items-center px-3 py-2 rounded-md cursor-pointer text-sm font-medium border-2 border-white transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-md hover:border-lime-400 hover:bg-lime-50 hover:text-lime-600 active:translate-y-0 active:shadow-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-40"
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{drop.label}</span>
            <ChevronDownIcon className="ml-1 h-5 w-5 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity group-hover:opacity-100 bg-linear-to-r from-lime-200/40 to-emerald-200/40" />
          </Menu.Button>

          <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1 scale-95" enterTo="opacity-100 translate-y-0 scale-100" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0 scale-100" leaveTo="opacity-0 translate-y-1 scale-95">
            <Menu.Items className="absolute mt-2 w-45 rounded-xl cursor-pointer bg-zinc-200/95 backdrop-blur-md border border-gray-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 focus:outline-none text-gray-800 z-50">
              {drop.items.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <Link
                      href={item.href}
                      title={item.label}
                      className={classNames("relative block border-2 border-zinc-100 px-4 py-2 m-1 text-sm rounded-lg cursor-pointer transition-all duration-150 ease-out hover:-translate-y-px hover:shadow-sm active:translate-y-0 whitespace-nowrap overflow-hidden text-ellipsis", active && item.highlight ? dropdownItemHighlightClasses[item.highlight] : "text-gray-700")}
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
