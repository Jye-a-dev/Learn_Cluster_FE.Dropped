// src/components/pages/AdminManage/AdminPermission/AdminPermissionContainer.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
  countPermissions,
} from "@/hooks/permission/getPermission";

import CreatePermissionButton from "./CreatePermissionButton";
import PermissionTable from "./PermissionTable";
import SearchPermission from "./SearchPermission";
import CreatePermissionModal from "./CreatePermissionModal";
import UpdatePermissionModal from "./UpdatePermissionModal";
import ConfirmDeletePermissionModal from "./ConfirmDeletePermissionModal";

import type {
  Permission,
  CreatePermissionPayload,
  UpdatePermissionPayload,
} from "./PermissionUiTypes";

/* ===================== CONTAINER ===================== */

export default function AdminPermissionContainer() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);
  const [deleteTarget, setDeleteTarget] =
    useState<Permission | null>(null);

  const [search, setSearch] = useState("");

  /* ===================== FETCH ===================== */

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    setLoading(true);
    try {
      const [data, count] = await Promise.all([
        getPermissions(),
        countPermissions(),
      ]);
      setPermissions(data);
      setTotalCount(count);
    } finally {
      setLoading(false);
    }
  }

  /* ===================== HANDLERS ===================== */

  async function handleCreate(data: CreatePermissionPayload) {
    await createPermission(data);
    setOpenCreate(false);
    refresh();
  }

  function handleEdit(permission: Permission) {
    setSelectedPermission(permission);
    setOpenUpdate(true);
  }

  async function handleUpdate(
    id: number,
    data: UpdatePermissionPayload
  ) {
    await updatePermission(id, data);
    setOpenUpdate(false);
    setSelectedPermission(null);
    refresh();
  }

  function handleDelete(permission: Permission) {
    setDeleteTarget(permission);
    setOpenDelete(true);
  }

  async function handleConfirmDelete(id: number) {
    await deletePermission(id);
    setOpenDelete(false);
    setDeleteTarget(null);
    refresh();
  }

  /* ===================== FILTER ===================== */

  const filteredPermissions = useMemo(() => {
    const q = search.toLowerCase();
    return permissions.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.code?.toLowerCase().includes(q) ?? false)
    );
  }, [permissions, search]);

  /* ===================== RENDER ===================== */

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">
          Quản lý Permission | Tổng permissions: {totalCount}
        </h1>
        <CreatePermissionButton
          onClick={() => setOpenCreate(true)}
        />
      </div>

      <SearchPermission
        search={search}
        onSearchChange={setSearch}
      />

      {loading ? (
        <p className="text-white/60">Đang tải permissions…</p>
      ) : (
        <PermissionTable
          permissions={filteredPermissions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CreatePermissionModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreate}
      />

      <UpdatePermissionModal
        open={openUpdate}
        permission={selectedPermission}
        onClose={() => {
          setOpenUpdate(false);
          setSelectedPermission(null);
        }}
        onSubmit={handleUpdate}
      />

      <ConfirmDeletePermissionModal
        open={openDelete}
        permission={deleteTarget}
        onClose={() => {
          setOpenDelete(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}
