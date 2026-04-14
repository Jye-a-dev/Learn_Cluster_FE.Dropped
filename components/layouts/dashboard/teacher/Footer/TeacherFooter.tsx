"use client";

import BaseFooter from "@/components/layouts/base/Footer/BaseFooter";
import {
  TEACHER_FOOTER_LINKS,
  TEACHER_SUPPORT_LINKS,
} from "./TeacherFooterLinks";

export default function TeacherFooter() {
  return (
    <BaseFooter
      gradientClass="bg-linear-to-r from-emerald-900 via-green-900 to-lime-800"
      areaLabel="Teacher Area"
      description="Teacher Dashboard của LearnCluster – không gian cá nhân hoá để theo dõi tiến độ học tập, tài nguyên đã lưu và hoạt động cộng đồng."
      links={TEACHER_FOOTER_LINKS}
      supports={TEACHER_SUPPORT_LINKS}
      logoDisabled
    />
  );
}
