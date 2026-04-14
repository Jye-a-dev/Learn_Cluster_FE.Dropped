"use client";

import { useRouter } from "next/navigation";

import { ROLES } from "@/constants/role.constant";
import { useAuthGuard } from "@/hooks/auth/useAuthGuard";
import { RoleGuard } from "@/hooks/roles/useRoleGuard";

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuthGuard();
  const router = useRouter();

  if (loading) return null;

  return (
    <RoleGuard
      allow={[ROLES.TEACHER, ROLES.ADMIN]}
      onRoleChange={() => router.refresh()}
    >
      {children}
    </RoleGuard>
  );
}
