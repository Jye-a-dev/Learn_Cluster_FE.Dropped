"use client";

import BaseNavbar from "@/components/layouts/base/Navbar/BaseNavbar";
import {
  ADMIN_NAV_LINKS,
  ADMIN_NAV_DROPDOWNS,
} from "./AdminNavData";

export default function AdminNavbar() {
  return (
    <BaseNavbar
      links={ADMIN_NAV_LINKS}
      dropdowns={ADMIN_NAV_DROPDOWNS}
      className="bg-linear-to-r from-yellow-800 to-lime-600"
      auth
      logoHref="/admin"
    />
  );
}
