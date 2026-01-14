"use client";

import NavbarLogo from "../Navbar/NavbarLogo";
import FooterLinking from "./FooterLinking";
import FooterSupport from "./FooterSupport";
import FooterTime from "./FooterTime";

export default function Footer() {
    return (
        <footer className="mt-10 rounded-xl border border-white bg-linear-to-r from-blue-800 to-cyan-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-start">
                    {/* Logo + description */}
                    <div className="space-y-2 border-2 backdrop-blur-sm bg-white/10 border-white p-3 pb-[15%] rounded-2xl">
                        <NavbarLogo />
                        <p className="text-xs text-justify text-white/80 leading-relaxed max-w-sm">
                            LearnCluster là nền tảng học tập và chia sẻ tri thức, kết nối người học,
                            tài liệu và cộng đồng trong một hệ sinh thái mở.
                        </p>
                    </div>

                    {/* Links */}
                    <FooterLinking />

                    {/* Support */}
                    <FooterSupport />
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-white/20" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/70 gap-2">
                    <span>© {new Date().getFullYear()} LearnCluster.</span>
                    <span className="italic text-white/60">
                        Build for learning  <FooterTime />
                    </span>
                  
                </div>
            </div>
        </footer>
    );
}
