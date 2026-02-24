// src/components/pages/AdminManage/AdminRolePermission/RolePermissionUpdateModal.tsx
"use client";

import { useState, useEffect } from "react";
import { ShieldCheckIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useRolesMap } from "@/hooks/roles/useRolesMap";
import { usePermissionsMap } from "@/hooks/permissionRole/usePermissionsMap";
import BaseFormModal from "../BaseModel/BaseFormModal";
import type { RolePermissionUI } from "./RolePermissionUiTypes";

type Props = {
  open: boolean;
  item: RolePermissionUI | null;
  onClose: () => void;
  onSubmit: (
    id: string,
    data: { role_id: string; permission_id: string }
  ) => Promise<void>;
};

export default function RolePermissionUpdateModal({
  open,
  item,
  onClose,
  onSubmit,
}: Props) {
  /* ===== Hooks ===== */
  const { rolesMap, loading: roleLoading } = useRolesMap();
  const { permissionsMap, loading: permLoading } = usePermissionsMap();

  const [roleId, setRoleId] = useState("");
  const [permissionId, setPermissionId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ===== Sync khi mở modal ===== */
  useEffect(() => {
    if (open && item) {
      setRoleId(item.role_id);
      setPermissionId(item.permission_id);
    }
  }, [open, item]);

  if (!open || !item) return null;
  const rpId = item.id;

  const isInvalid = !roleId || !permissionId;

  /* ===== Submit ===== */
  async function handleSubmit() {
    if (isInvalid) return;

    try {
      setSubmitting(true);

      await onSubmit(rpId, {
        role_id: roleId,
        permission_id: permissionId,
      });

      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BaseFormModal
      open={open}
      title="Cập nhật Role – Permission"
      submitting={submitting}
      isInvalid={isInvalid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* ===== Role ===== */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/70">
          Role
        </label>

        <div className="relative">
          <ShieldCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

          <select
            value={roleId}
            disabled={roleLoading}
            onChange={(e) => setRoleId(e.target.value)}
            className="input-admin pl-9 pr-4 border border-white/40 rounded-md text-white appearance-none"
          >
            <option value="">Chọn role</option>
            {Object.values(rolesMap).map((r) => (
              <option key={r.id} value={r.id} className="bg-zinc-900">
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== Permission ===== */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/70">
          Permission
        </label>

        <div className="relative">
          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

          <select
            value={permissionId}
            disabled={permLoading}
            onChange={(e) => setPermissionId(e.target.value)}
            className="input-admin pl-9 pr-4 border border-white/40 rounded-md text-white appearance-none"
          >
            <option value="">Chọn permission</option>
            {Object.values(permissionsMap).map((p) => (
              <option key={p.id} value={p.id} className="bg-zinc-900">
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== Hint ===== */}
      <p className="pt-1 text-xs text-white/40">
        Thay đổi Role hoặc Permission sẽ cập nhật ngay quyền truy cập của hệ thống.
      </p>
    </BaseFormModal>
  );
}