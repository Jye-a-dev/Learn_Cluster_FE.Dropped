// components/layouts/public/Navbar/NavbarMobileMenu.tsx
"use client";
import Link from "next/link";
import { NAV_LINKS, DROPDOWNS } from "./NavData";

interface MobileMenuProps {
  links: typeof NAV_LINKS;
  dropdowns: typeof DROPDOWNS;
}

export default function NavbarMobileMenu({ links, dropdowns }: MobileMenuProps) {
  return (
    <div className="md:hidden bg-blue-700 text-white">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`block px-3 py-2 rounded-md hover:text-${link.highlight}-400 transition-colors duration-200`}
          >
            {link.label}
          </Link>
        ))}

        {dropdowns.map((drop) => (
          <div key={drop.label} className="pt-2">
            <span className="block px-3 py-2 font-medium">{drop.label}</span>
            {drop.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`block px-6 py-2 rounded-md hover:text-${item.highlight}-400 transition-colors duration-200`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}

        {/* Mobile Sign In */}
        <Link
          href="/login"
          className="mt-2 block px-4 py-2 rounded-md bg-blue-900/80 hover:bg-blue-800 transition-colors duration-200 text-white font-semibold text-center"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
