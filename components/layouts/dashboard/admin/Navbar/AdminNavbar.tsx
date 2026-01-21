// components/layouts/user/Navbar/UserNavbar.tsx
"use client";

import { useState } from "react";
import {ADMIN_NAV_LINKS, ADMIN_NAV_DROPDOWNS} from "./AdminNavData";
import NavbarLogo from "@/components/layouts/public/Navbar/NavbarLogo";
import UserNavbarLinks from "@/components/layouts/dashboard/user/Navbar/UserNavbarLinks";
import NavbarMobileMenu from "@/components/layouts/dashboard/user/Navbar/UserNavbarMobileMenu";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LogoutButton from "../../LogoutButton";

export default function AdminNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="z-9999 bg-linear-to-r from-yellow-800 to-lime-500 text-white shadow-lg rounded-2xl border-2 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavbarLogo />

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            <UserNavbarLinks
              links={ADMIN_NAV_LINKS}
              dropdowns={ADMIN_NAV_DROPDOWNS}
            />

            {/* Divider */}
            <div className="h-6 w-px bg-white" />

            {/* Logout action */}
            <LogoutButton />
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-md p-2 hover:text-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300"
            >
              {mobileOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/20">
          <NavbarMobileMenu
            links={ADMIN_NAV_LINKS}
            dropdowns={ADMIN_NAV_DROPDOWNS}
            hideSignIn
          />

          {/* Mobile logout (separate from nav links) */}
          <div className="px-4 py-3">
            <LogoutButton />
          </div>
        </div>
      )}
    </header>
  );
}
