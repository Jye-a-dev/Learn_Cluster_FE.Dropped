"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import {
  getRolePermissionsByRole,
  createRolePermission,
  deleteRolePermission,
  deleteRolePermissionsByRole,
} from "@/hooks/permissionRole/usePermissionRole";
import { getPermissions } from "@/hooks/permission/getPermission";

import CreateRoleAllowButton from "./CreateRoleAllowButton";
import RoleAllowTable from "./RoleAllowTable";
import AddPermissionModal from "./AddPermissionModal";
import ConfirmDeleteRolePermissionModal from "./ConfirmDeleteRolePermissionModal";
import ConfirmDeleteAllRolePermissionModal from "./ConfirmDeleteAllRolePermissionModal";

import type { RolePermission, PermissionOption } from "./RoleAllowUiTypes";

type Props = {
  roleId: string;
};

export default function AdminRoleAllowContainer({ roleId }: Props) {
  const [permissions, setPermissions] = useState<PermissionOption[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [openDeleteOne, setOpenDeleteOne] = useState(false);
  const [openDeleteAll, setOpenDeleteAll] = useState(false);

  const [deleteTarget, setDeleteTarget] =
    useState<RolePermission | null>(null);

  /* ===================== FETCH ===================== */

  const refresh = useCallback(async () => {
    if (!roleId) return;

    setLoading(true);
    try {
      const [perms, rolePerms] = await Promise.all([
        getPermissions(),
        getRolePermissionsByRole(roleId),
      ]);

      // ✅ ÉP STRING TẬP TRUNG – RÕ RÀNG – NHẤT QUÁN
      setPermissions(
        perms.map((p) => ({
          id: String(p.id),
          name: p.name,
          description: p.description,
        }))
      );

      setRolePermissions(
        rolePerms.map((rp) => ({
          role_id: String(rp.role_id),
          permission_id: String(rp.permission_id),
        }))
      );
    } finally {
      setLoading(false);
    }
  }, [roleId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  /* ===================== DERIVED ===================== */

  const assignedPermissionIds = useMemo(
    () => rolePermissions.map((r) => r.permission_id),
    [rolePermissions]
  );

  const availablePermissions = useMemo(
    () =>
      permissions.filter(
        (p) => !assignedPermissionIds.includes(p.id)
      ),
    [permissions, assignedPermissionIds]
  );

  /* ===================== ACTIONS ===================== */

  async function handleAdd(permissionId: string) {
    await createRolePermission({
      role_id: roleId,
      permission_id: permissionId,
    });
    setOpenAdd(false);
    refresh();
  }

  function handleDeleteOne(rp: RolePermission) {
    setDeleteTarget(rp);
    setOpenDeleteOne(true);
  }

  async function handleConfirmDeleteOne() {
    if (!deleteTarget) return;
    await deleteRolePermission(deleteTarget);
    setOpenDeleteOne(false);
    setDeleteTarget(null);
    refresh();
  }

  async function handleDeleteAll() {
    await deleteRolePermissionsByRole(roleId);
    setOpenDeleteAll(false);
    refresh();
  }

  /* ===================== RENDER ===================== */

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Phân quyền cho Role
        </h2>

        <CreateRoleAllowButton
          onAdd={() => setOpenAdd(true)}
          onDeleteAll={() => setOpenDeleteAll(true)}
        />
      </div>

      {loading ? (
        <p className="text-white/60">Đang tải quyền…</p>
      ) : (
        <RoleAllowTable
          permissions={permissions}
          rolePermissions={rolePermissions}
          onDelete={handleDeleteOne}
        />
      )}

      <AddPermissionModal
        open={openAdd}
        permissions={availablePermissions}
        onClose={() => setOpenAdd(false)}
        onSubmit={handleAdd}
      />

      <ConfirmDeleteRolePermissionModal
        open={openDeleteOne}
        onClose={() => setOpenDeleteOne(false)}
        onConfirm={handleConfirmDeleteOne}
      />

      <ConfirmDeleteAllRolePermissionModal
        open={openDeleteAll}
        onClose={() => setOpenDeleteAll(false)}
        onConfirm={handleDeleteAll}
      />
    </section>
  );
}
