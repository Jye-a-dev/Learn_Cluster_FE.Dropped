// src/components/pages/AdminManage/AdminUser/UserTable.tsx
"use client";

import UserActions from "./UserActions";
import type { UserUI } from "./UserUiTypes";

type Props = {
  users: UserUI[];
  onEdit: (u: UserUI) => void;
  onDelete: (u: UserUI) => void; // ✅ đổi sang UserUI
};
export default function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-xl border border-white/50">
      <table className="w-full text-xs text-white">
        <thead className="bg-white/5">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3">Created</th>
            <th className="p-3">Updated</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-white/10">
              <td className="p-3 font-mono text-[10px]">{u.id}</td>
              <td className="p-3">{u.username}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.roleName}</td>
              <td className="p-3">
                {u.created_at
                  ? new Date(u.created_at).toLocaleDateString()
                  : "—"}
              </td>
              <td className="p-3">
                {u.updated_at
                  ? new Date(u.updated_at).toLocaleDateString()
                  : "—"}
              </td>

              {/* CHÌA KHÓA */}
              <td className="p-3 text-right relative">
                <UserActions
                  onEdit={() => onEdit(u)}
                  onDelete={() => onDelete(u)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
