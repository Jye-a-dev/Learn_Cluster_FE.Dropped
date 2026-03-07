"use client";

import { ReactNode } from "react";
import { useCurrentRoleName } from "@/hooks/roles/useCurrentRoleName";
import { ROLES } from "@/constants/role.constant";
import AdminSetup from "@/components/layouts/dashboard/admin/AdminSetup";
import UserSetup from "@/components/layouts/dashboard/user/UserSetup";
import TeacherSetup from "./teacher/TeacherSetup";

export default function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  const { roleName, loading } = useCurrentRoleName();

  if (loading) return null;

  if (roleName === ROLES.ADMIN) {
    return <AdminSetup>{children}</AdminSetup>;
  }
  if (roleName === ROLES.TEACHER) {
    return <TeacherSetup>{children}</TeacherSetup>;
  }
  if (roleName === ROLES.STUDENT) {
    return <UserSetup>{children}</UserSetup>;
  }

  return null;
}
