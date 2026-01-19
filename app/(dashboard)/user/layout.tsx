import UserSetup from "@/components/layouts/dashboard/user/UserSetup";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserSetup>{children}</UserSetup>;
}
