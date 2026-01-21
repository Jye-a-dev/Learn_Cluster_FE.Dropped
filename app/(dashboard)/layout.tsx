"use client";

import DashboardShell from "@/components/layouts/dashboard/DashboardShell";
import { useAuthGuard } from "@/hooks/auth/useAuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuthGuard("/login");

  if (loading) return null;

  return <DashboardShell>{children}</DashboardShell>;
}
