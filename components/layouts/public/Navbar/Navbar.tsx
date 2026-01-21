"use client";

import BaseNavbar from "../../base/Navbar/BaseNavbar";
import { NAV_LINKS, DROPDOWNS } from "./NavData";

export default function Navbar() {
  return (
    <BaseNavbar
      links={NAV_LINKS}
      dropdowns={DROPDOWNS}
      className="bg-linear-to-r from-blue-800 to-cyan-600"
      auth={false}
      logoHref="/"
    />
  );
}
