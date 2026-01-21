// components/layouts/shared/BaseNavbar.tsx
"use client";

import { useState } from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarMobileMenu from "./NavbarMobileMenu";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LogInButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export interface NavLink {
  label: string;
  href: string;
  highlight: string;
}

export interface NavDropdown {
  label: string;
  items: NavLink[];
}

interface BaseNavbarProps {
  links: NavLink[];
  dropdowns: NavDropdown[];
  className?: string;
  auth?: boolean;
  logoHref?: string;
}

export default function BaseNavbar({
  links,
  dropdowns,
  className = "",
  auth = false,
  logoHref = "/",
}: BaseNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={`z-9999 text-white shadow-lg rounded-2xl border-2 border-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavbarLogo href={logoHref} />

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <NavbarLinks links={links} dropdowns={dropdowns} />

            <div className="h-6 w-px bg-white" />

            {auth ? <LogoutButton /> : <LoginButton />}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(v => !v)}
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

      {/* Mobile menu */}
      {mobileOpen && (
        <NavbarMobileMenu
          links={links}
          dropdowns={dropdowns}
          auth={auth}
        />
      )}
    </header>
  );
}
