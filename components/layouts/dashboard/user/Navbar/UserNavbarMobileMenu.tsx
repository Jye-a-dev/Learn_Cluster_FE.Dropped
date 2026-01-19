// components/layouts/dashboard/user/Navbar/UserNavbarMobileMenu.tsx
"use client";

import { NavLink, NavDropdown } from "@/components/layouts/dashboard/user/Navbar/UserNavData";
import UserNavbarLinks from "./UserNavbarLinks";

interface Props {
  links: NavLink[];
  dropdowns: NavDropdown[];
  hideSignIn?: boolean;
}

export default function UserNavbarMobileMenu({
  links,
  dropdowns,
}: Props) {
  return (
    <div className="md:hidden px-4 py-4">
      <UserNavbarLinks links={links} dropdowns={dropdowns} />
    </div>
  );
}
