"use client";

import { useMemo, useState } from "react";
import {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
  countPermissions,
} from "@/hooks/permission/getPermission";

import { useBaseCrudContainer } from "@/components/pages/AdminManage/BaseModel/BaseCrudContainer";

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
  const [search, setSearch] = useState("");

  const {
    items: permissions,
    loading,
    totalCount,

    openCreate,
    openUpdate,
    openDelete,

    selectedItem,
    deleteTarget,

    setOpenCreate,
    setOpenUpdate,
    setOpenDelete,
    setSelectedItem,
    setDeleteTarget,

    refresh,
  } = useBaseCrudContainer<Permission>({
    fetchList: getPermissions,
    fetchCount: countPermissions,
  });

  /* ===================== HANDLERS ===================== */

  async function handleCreate(data: CreatePermissionPayload) {
    await createPermission(data);
    setOpenCreate(false);
    refresh();
  }

  function handleEdit(permission: Permission) {
    setSelectedItem(permission);
    setOpenUpdate(true);
  }

  async function handleUpdate(
    id: number,
    data: UpdatePermissionPayload
  ) {
    await updatePermission(id, data);
    setOpenUpdate(false);
    setSelectedItem(null);
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
        permission={selectedItem}
        onClose={() => {
          setOpenUpdate(false);
          setSelectedItem(null);
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
