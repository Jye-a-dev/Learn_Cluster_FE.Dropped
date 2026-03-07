"use client";

import BaseNavbar from "@/components/layouts/base/Navbar/BaseNavbar";
import {
  USER_NAV_LINKS,
  USER_NAV_DROPDOWNS,
} from "@/components/layouts/dashboard/user/Navbar/UserNavData";

export default function UserNavbar() {
  return (
    <BaseNavbar
      links={USER_NAV_LINKS}
      dropdowns={USER_NAV_DROPDOWNS}
      className="bg-linear-to-r from-emerald-800 to-lime-500"
      auth
      logoHref="/dashboard"
    />
  );
}
