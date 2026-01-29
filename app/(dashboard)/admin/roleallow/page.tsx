// app/(dashboard)/admin/roleallow/[roleId]/page.tsx
"use client";

import AdminRolePermissionContainer from "@/components/pages/AdminManage/AdminRolePermission/AdminRolePermissionContainer";
export default function RoleAllowPage() {

    return (
         <section className="space-y-6 bg-cyan-400/20 p-3 rounded-2xl">
              <AdminRolePermissionContainer />
         </section>
      
    );
}
