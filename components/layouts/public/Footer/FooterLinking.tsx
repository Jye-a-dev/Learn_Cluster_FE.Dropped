"use client";

import Link from "next/link";
import { FOOTER_LINKS } from "./FooterData";

export default function FooterLinking() {
    return (
        <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 shadow-sm  pb-[5%] border-white border-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/90 mb-3 text-center">
                Khám phá
            </h3>

            <ul className="space-y-2 text-sm">
                {FOOTER_LINKS.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className="group flex items-start justify-start gap-1 text-white/90 hover:text-emerald-300 transition-all duration-200"
                        >
                            <span className="group-hover:translate-x-0.5 transition-transform">
                                - {item.label}
                            </span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity pl-2">
                                →
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
