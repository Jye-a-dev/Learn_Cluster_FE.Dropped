"use client";

import BaseFooter from "@/components/layouts/base/Footer/BaseFooter";
import { FOOTER_LINKS, SUPPORT_LINKS } from "./FooterData";

export default function Footer() {
  return (
    <BaseFooter
      gradientClass="bg-linear-to-r from-blue-800 to-cyan-600"
      areaLabel="Public"
      description="LearnCluster là nền tảng học tập và chia sẻ tri thức, kết nối người học, tài liệu và cộng đồng trong một hệ sinh thái mở."
      links={FOOTER_LINKS}
      supports={SUPPORT_LINKS}
    />
  );
}
