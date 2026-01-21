// components/layouts/base/Footer/BaseFooterLinks.tsx
"use client";

import Link from "next/link";

export type FooterLinkItem = {
  label: string;
  href: string;
};

type BaseFooterLinksProps = {
  title: string;
  items: FooterLinkItem[];
};

export default function BaseFooterLinks({
  title,
  items,
}: BaseFooterLinksProps) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm shadow-sm">
      <h3 className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-white/90">
        {title}
      </h3>

      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-start gap-1 text-white/90 transition-all duration-200 hover:text-emerald-300"
            >
              <span className="transition-transform group-hover:translate-x-0.5">
                - {item.label}
              </span>
              <span className="pl-2 opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
