// components/layouts/public/Navbar/Navbar.tsx
"use client";

import { useState } from "react";
import { NAV_LINKS, DROPDOWNS } from "./NavData";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarSignIn from "./NavbarSignIn";
import NavbarMobileMenu from "./NavbarMobileMenu";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
   <header className="sticky top-2 z-9999 bg-linear-to-r from-blue-800 to-cyan-600 text-white shadow-lg rounded-2xl border-2 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavbarLogo />

          {/* Desktop Links + SignIn */}
          <div className="hidden md:flex md:items-center md:space-x-9">
            <NavbarLinks links={NAV_LINKS} dropdowns={DROPDOWNS} />
            <NavbarSignIn />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-lime-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-300"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && <NavbarMobileMenu links={NAV_LINKS} dropdowns={DROPDOWNS} />}
    </header>
  );
}
