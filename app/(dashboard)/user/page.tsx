"use client";

import { useCurrentRoleName } from "@/hooks/roles/useCurrentRoleName";

export default function UserPage() {
  const { roleId, roleName, loading, isAuth } = useCurrentRoleName();

  if (loading) return <div>Loading...</div>;
  if (!isAuth) return <div>Chưa đăng nhập</div>;

  return (
    <div>
      Current role_id: {roleId} <br />
      Role hiện tại: {roleName}
    </div>
  );
}
