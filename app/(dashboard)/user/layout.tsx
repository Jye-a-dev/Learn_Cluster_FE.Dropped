import UserSetup from "@/components/layouts/dashboard/user/UserSetup";
import { RoleGuard } from "@/hooks/roles/useRoleGuard";
import { ROLES } from "@/constants/role.constant";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allow={[ROLES.STUDENT]}>
        <UserSetup>{children}</UserSetup>
    </RoleGuard>
  );
}
