"use client";

import BaseSidebar from "@/components/layouts/base/Sidebar/BaseSidebar";
import {
  USER_SIDE_LINKS,
  USER_SIDE_DROPDOWNS,
} from "./UserSideData";

export default function UserSidebar() {
  return (
    <BaseSidebar
      links={USER_SIDE_LINKS}
      dropdowns={USER_SIDE_DROPDOWNS}
      gradientClass="bg-linear-to-b from-emerald-800 to-lime-600"
    />
  );
}
