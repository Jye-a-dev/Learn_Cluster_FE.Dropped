"use client";

import BaseFooter from "@/components/layouts/base/Footer/BaseFooter";
import {
  USER_FOOTER_LINKS,
  USER_SUPPORT_LINKS,
} from "./FooterData";

export default function UserFooter() {
  return (
    <BaseFooter
      gradientClass="bg-linear-to-r from-emerald-900 via-green-900 to-lime-800"
      areaLabel="User Area"
      description="User Dashboard của LearnCluster – không gian cá nhân hoá để theo dõi tiến độ học tập, tài nguyên đã lưu và hoạt động cộng đồng."
      links={USER_FOOTER_LINKS}
      supports={USER_SUPPORT_LINKS}
      logoDisabled
    />
  );
}
