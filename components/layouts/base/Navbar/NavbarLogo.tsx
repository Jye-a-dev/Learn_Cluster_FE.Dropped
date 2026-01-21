// components/layouts/public/Navbar/NavbarLogo.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

interface NavbarLogoProps {
  disabled?: boolean;
  href?: string;
}

export default function NavbarLogo({
  disabled = false,
  href = "/",
}: NavbarLogoProps) {
  const LogoContent = (
    <>
      <div className="rounded-2xl p-0.5 border border-white bg-linear-to-br from-emerald-400 via-cyan-400 to-blue-400 shadow-md">
        <Image
          src="/assets/LcLogo_Small.png"
          alt="LearnCluster Logo"
          width={44}
          height={44}
          priority
          className="rounded-2xl"
        />
      </div>

      <span
        className={`ml-3 text-xl font-bold tracking-wide leading-none flex ${
          disabled ? "select-none opacity-70" : ""
        }`}
      >
        <span className="animate-[swap-emerald-cyan_3s_ease-in-out_infinite] drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]">
          Learn
        </span>
        <span className="ml-1 animate-[swap-cyan-emerald_3s_ease-in-out_infinite] drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]">
          Cluster
        </span>
      </span>
    </>
  );

  return (
    <div className="shrink-0 flex items-center ml-2">
      {disabled ? (
        <div className="flex items-center cursor-default opacity-70">
          {LogoContent}
        </div>
      ) : (
        <Link href={href} className="flex items-center">
          {LogoContent}
        </Link>
      )}
    </div>
  );
}
