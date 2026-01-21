"use client";

import BaseFooter from "@/components/layouts/base/Footer/BaseFooter";
import {
  ADMIN_FOOTER_LINKS,
  ADMIN_SUPPORT_LINKS,
} from "./FooterData";

export default function AdminFooter() {
  return (
    <BaseFooter
      gradientClass="bg-linear-to-r from-yellow-900 via-green-900 to-lime-800"
      areaLabel="Admin Area"
      description="Admin Dashboard của LearnCluster – không gian cá nhân hoá để theo dõi tiến độ học tập, tài nguyên đã lưu và hoạt động cộng đồng."
      links={ADMIN_FOOTER_LINKS}
      supports={ADMIN_SUPPORT_LINKS}
      logoDisabled
    />
  );
}
