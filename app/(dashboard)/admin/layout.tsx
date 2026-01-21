"use client";

import { RoleGuard } from "@/hooks/roles/useRoleGuard";
import { ROLES } from "@/constants/role.constant";
import { useAuthGuard } from "@/hooks/auth/useAuthGuard";
import { useRouter } from "next/navigation";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuthGuard();
  const router = useRouter();

  if (loading) return null;

  return (
    <RoleGuard
      allow={[ROLES.ADMIN] }
      
      onRoleChange={() => router.refresh()}
    >
     {children}
    </RoleGuard>
  );
}
