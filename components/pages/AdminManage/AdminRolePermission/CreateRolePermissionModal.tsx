// src/components/pages/AdminManage/AdminRolePermission/CreateRolePermissionModal.tsx
"use client";

import { useState, useMemo } from "react";
import { ShieldCheckIcon, KeyIcon } from "@heroicons/react/24/outline";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useRolesMap } from "@/hooks/roles/useRolesMap";
import { usePermissionsMap } from "@/hooks/permissionRole/usePermissionsMap";
import type { CreateRolePermissionPayload } from "./RolePermissionUiTypes";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateRolePermissionPayload) => Promise<void>;
};

export default function CreateRolePermissionModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const { rolesMap, loading: rolesLoading } = useRolesMap();
  const { permissionsMap, loading: permissionsLoading } =
    usePermissionsMap();

  const roles = useMemo(() => Object.values(rolesMap), [rolesMap]);
  const permissions = useMemo(
    () => Object.values(permissionsMap),
    [permissionsMap]
  );

  const [form, setForm] = useState<CreateRolePermissionPayload>({
    role_id: "",
    permission_id: "",
  });

  const isInvalid =
    !form.role_id ||
    !form.permission_id ||
    rolesLoading ||
    permissionsLoading;

  async function handleSubmit() {
    if (isInvalid) return;

    await onSubmit(form);
    setForm({ role_id: "", permission_id: "" });
    onClose();
  }

  return (
    <BaseFormModal
      open={open}
      title="Gán Permission cho Role"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* ROLE */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/70">
          Role
        </label>
        <div className="relative">
          <ShieldCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <select
            value={form.role_id}
            onChange={(e) =>
              setForm({ ...form, role_id: e.target.value })
            }
            className="input-admin pl-9 text-white"
          >
            <option value="">-- Chọn role --</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id} className="bg-zinc-900 text-white hover:bg-cyan-700">
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* PERMISSION */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/70">
          Permission
        </label>
        <div className="relative">
          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <select


            value={form.permission_id}
            onChange={(e) =>
              setForm({
                ...form,
                permission_id: e.target.value,
              })
            }
            className="bg-zinc-900 text-white hover:bg-cyan-700"
          >
            <option value="">-- Chọn permission --</option>
            {permissions.map((p) => (
              <option key={p.id} value={p.id} className="bg-zinc-900 text-white hover:bg-cyan-700">
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hint */}
      <p className="pt-1 text-xs text-white/40">
        Mỗi cặp Role – Permission là duy nhất. Hệ thống sẽ tự
        động từ chối trùng lặp.
      </p>
    </BaseFormModal>
  );
}
