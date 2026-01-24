// src/components/pages/AdminManage/AdminUser/UserTable.tsx
"use client";

import UserActions from "./UserActions";
import type { UserUI } from "./UserUiTypes";

type Props = {
  users: UserUI[];
  onEdit: (u: UserUI) => void;
  onDelete: (id: string) => void;
};

export default function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
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
              <td className="p-3 text-right">
                <UserActions
                  onEdit={() => onEdit(u)}
                  onDelete={() => onDelete(u.id)}
                />
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={7} className="p-6 text-center text-white/50">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
