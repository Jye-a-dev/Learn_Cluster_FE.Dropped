"use client";

import NavbarLogo from "@/components/layouts/public/Navbar/NavbarLogo";
import UserFooterLinking from "./AdminFooterLinking";
import UserFooterSupport from "./AdminFooterSupport";
import FooterTime from "@/components/layouts/public/Footer/FooterTime";

export default function AdminFooter() {
  return (
    <footer className="mt-10 rounded-xl border border-white/20 bg-linear-to-r from-yellow-900 via-green-900 to-lime-800 text-white shadow-lg backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3 items-start">
          {/* Logo + description */}
          <div className="space-y-2 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
            <NavbarLogo disabled={true}/>
            <p className="max-w-sm text-xs leading-relaxed text-justify text-white/75">
              Admin Dashboard của LearnCluster – không gian cá nhân hoá để theo dõi
              tiến độ học tập, tài nguyên đã lưu và hoạt động cộng đồng.
            </p>
          </div>

          {/* User Links */}
          <UserFooterLinking />

          {/* User Support */}
          <UserFooterSupport />
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-white/15" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-2 text-xs text-white/65 md:flex-row">
          <span>© {new Date().getFullYear()} LearnCluster · Admin Area</span>
          <span className="italic text-white/55">
            Personalized learning · <FooterTime />
          </span>
        </div>
      </div>
    </footer>
  );
}
