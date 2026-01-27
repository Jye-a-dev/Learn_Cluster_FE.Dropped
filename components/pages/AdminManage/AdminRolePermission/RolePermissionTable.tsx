// src/components/pages/AdminManage/AdminRolePermission/RolePermissionTable.tsx
"use client";

import RolePermissionActions from "./RolePermissionActions";
import type { RolePermissionUI } from "./RolePermissionUiTypes";

type Props = {
  items: RolePermissionUI[];
  onEdit: (rp: RolePermissionUI) => void;
  onDelete: (rp: RolePermissionUI) => void;
};

export default function RolePermissionTable({
  items,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-xl border border-white/50">
      <table className="w-full text-xs text-white">
        <thead className="bg-white/5">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3 text-left">Role ID</th>
            <th className="p-3 text-left">Permission ID</th>
            <th className="p-3 text-left">Role / Permission</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((rp) => (
            <tr key={rp.id} className="border-t border-white/10">
              <td className="p-3 font-mono text-[10px]">{rp.id}</td>
              <td className="p-3 font-mono text-[10px]">{rp.role_id}</td>
              <td className="p-3 font-mono text-[10px]">
                {rp.permission_id}
              </td>
              <td className="p-3">
                <div className="flex flex-col">
                  <span>{rp.roleName ?? "—"}</span>
                  <span className="text-white/60 text-[11px]">
                    {rp.permissionName ?? "—"}
                  </span>
                </div>
              </td>

              <td className="p-3 text-right relative">
                <RolePermissionActions
                  onEdit={() => onEdit(rp)}
                  onDelete={() => onDelete(rp)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
