import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) {
    redirect("http://localhost:3100/login");
  }

  return <>{children}</>;
}
