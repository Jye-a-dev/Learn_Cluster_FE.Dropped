"use client";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
  highlight: string;
}

interface NavDropdown {
  label: string;
  items: NavLink[];
}

interface MobileMenuProps {
  links: NavLink[];
  dropdowns: NavDropdown[];
  auth?: boolean;
}

export default function NavbarMobileMenu({
  links,
  dropdowns,
  auth = false,
}: MobileMenuProps) {
  return (
    <div className="md:hidden bg-black/30 backdrop-blur-md text-white">
      <div className="px-3 pt-3 pb-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block px-3 py-2 rounded-md hover:bg-white/10"
          >
            {link.label}
          </Link>
        ))}

        {dropdowns.map((drop) => (
          <div key={drop.label} className="pt-2">
            <span className="block px-3 py-2 font-medium opacity-80">
              {drop.label}
            </span>
            {drop.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-6 py-2 rounded-md hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}

        {auth ? (
          <div className="pt-3">
            <Link
              href="/logout"
              className="block text-center px-4 py-2 rounded-md bg-red-500/80 hover:bg-red-500"
            >
              Đăng xuất
            </Link>
          </div>
        ) : (
          <Link
            href="/login"
            className="mt-2 block px-4 py-2 rounded-md bg-white/20 hover:bg-white/30 font-semibold text-center"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
}
