"use client";

import BaseSidebar from "@/components/layouts/base/Sidebar/BaseSidebar";
import {
  ADMIN_SIDE_LINKS,
  ADMIN_SIDE_DROPDOWNS,
} from "./AdminSideData";

export default function AdminSidebar() {
  return (
    <BaseSidebar
      links={ADMIN_SIDE_LINKS}
      dropdowns={ADMIN_SIDE_DROPDOWNS}
      gradientClass="bg-linear-to-b from-yellow-800 to-lime-700"
    />
  );
}
