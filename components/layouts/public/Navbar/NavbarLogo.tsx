/* eslint-disable @next/next/no-img-element */
// components/layouts/public/Navbar/NavbarLogo.tsx
"use client";

import Link from "next/link";

export default function NavbarLogo() {
  return (
    <div className="shrink-0 flex items-center ml-2">

      {/* Logo */}
      <Link href="/" className="flex items-center">
        <div className="rounded-2xl p-0.5 border border-white bg-linear-to-br from-emerald-400 via-cyan-400 to-blue-400 shadow-md">
          <img
            src="/assets/LcLogo_Small.png"
            alt="LearnCluster Logo"
            className="h-11 w-auto rounded-2xl "
          />
        </div>


      </Link>

      {/* Animated text */}
      <span className="ml-3 text-xl font-bold tracking-wide leading-none flex">
        <span className="animate-[swap-emerald-cyan_3s_ease-in-out_infinite] drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]">
          Learn
        </span>
        <span className="ml-1 animate-[swap-cyan-emerald_3s_ease-in-out_infinite] drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]">
          Cluster
        </span>
      </span>
    </div>
  );
}
