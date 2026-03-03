"use client";

import BaseSidebar from "@/components/layouts/base/Sidebar/BaseSidebar";
import {
  USER_SIDEBAR_ITEMS,
} from "./UserSideData";

export default function UserSidebar() {
  return (
     <BaseSidebar
        items={USER_SIDEBAR_ITEMS}
        gradientClass="bg-linear-to-b from-yellow-800 to-lime-700"
      />
  );
}
