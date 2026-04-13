// components/layouts/base/Footer/BaseFooter.tsx
"use client";

import NavbarLogo from "@/components/layouts/base/Navbar/NavbarLogo";
import FooterTime from "@/components/layouts/base/Footer/FooterTime";
import BaseFooterLinks, {
  FooterLinkItem,
} from "@/components/layouts/base/Footer/BaseFooterLinks";

type BaseFooterProps = {
  gradientClass: string;
  areaLabel: string;
  description: string;
  links: FooterLinkItem[];
  supports: FooterLinkItem[];
  logoDisabled?: boolean;
};

export default function BaseFooter({
  gradientClass,
  areaLabel,
  description,
  links,
  supports,
  logoDisabled = false,
}: BaseFooterProps) {
  return (
    <footer
      className={`mt-10 rounded-xl border border-white/20 text-white shadow-lg backdrop-blur ${gradientClass}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3 items-start">
          <div className="space-y-2 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
            <NavbarLogo disabled={logoDisabled} />
            <p className="max-w-sm text-justify text-xs leading-relaxed text-white/75">
              {description}
            </p>
          </div>

          <BaseFooterLinks title="Khám phá" items={links} />
          <BaseFooterLinks title="Hỗ trợ" items={supports} />
        </div>

        <div className="my-5 h-px bg-white/15" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-white/65 md:flex-row">
          <span>
            © {new Date().getFullYear()} LearnCluster · {areaLabel}
          </span>
          <span className="italic text-white/55">
            Xây dựng cho việc học · <FooterTime />
          </span>
        </div>
      </div>
    </footer>
  );
}
