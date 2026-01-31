// src/components/pages/AdminManage/AdminRolePermission/AdminRolePermissionContainer.tsx
"use client";

import { useMemo, useState } from "react";

import {
    getRolePermissions,
    addRolePermissions,
    updateRolePermission,
    deleteRolePermission,
} from "@/hooks/permissionRole/getPermissionRole";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";
import { useRolesMap } from "@/hooks/roles/useRolesMap";
import { usePermissionsMap } from "@/hooks/permissionRole/usePermissionsMap";

import RolePermissionTable from "./RolePermissionTable";
import CreateRolePermissionModal from "./CreateRolePermissionModal";
import RolePermissionUpdateModal from "./RolePermissionUpdateModal";
import ConfirmDeleteRolePermissionModal from "./ConfirmDeleteRolePermissionModal";
import SearchFilterRolePermission from "./SearchFilterRolePermission";

import type {
    RolePermissionUI,
    CreateRolePermissionPayload,
} from "./RolePermissionUiTypes";

/* =======================
   RAW API TYPE
======================= */
type RolePermissionRaw = {
    id: string;
    role_id: string;
    permission_id: string;
    created_at?: string;
};

export default function AdminRolePermissionContainer() {
    /* =======================
       FILTER
    ======================= */
    const [filterRoleId, setFilterRoleId] = useState("");
    const [filterPermissionId, setFilterPermissionId] = useState("");

    const { rolesMap } = useRolesMap();
    const { permissionsMap } = usePermissionsMap();

    /* =======================
       BASE CRUD
    ======================= */
    const crud = useBaseCrudContainer<RolePermissionRaw>({
        fetchList: getRolePermissions,
    });

    /* =======================
       CREATE
    ======================= */
    async function handleCreate(data: CreateRolePermissionPayload) {
        // API yêu cầu mảng
        await addRolePermissions([data]);
        crud.setOpenCreate(false);
        crud.refresh();
    }

    /* =======================
       EDIT
    ======================= */
    function handleEdit(item: RolePermissionUI) {
        crud.setSelectedItem(item as never);
        crud.setOpenUpdate(true);
    }

    /* =======================
       UPDATE
    ======================= */
    async function handleUpdate(
        id: string,
        data: { role_id: string; permission_id: string }
    ) {
        await updateRolePermission(id, data);
        crud.setOpenUpdate(false);
        crud.setSelectedItem(null);
        crud.refresh();
    }

    /* =======================
       DELETE
    ======================= */
    function handleDelete(item: RolePermissionUI) {
        crud.setDeleteTarget(item as never);
        crud.setOpenDelete(true);
    }

    async function handleConfirmDelete(id: string) {
        await deleteRolePermission(id);
        crud.setOpenDelete(false);
        crud.setDeleteTarget(null);
        crud.refresh();
    }

    /* =======================
       MAP RAW → UI
    ======================= */
    const items: RolePermissionUI[] = useMemo(
        () =>
            crud.items.map((rp) => ({
                id: rp.id,
                role_id: rp.role_id,
                permission_id: rp.permission_id,
                roleName: rolesMap[rp.role_id]?.name ?? "—",
                permissionName:
                    permissionsMap[rp.permission_id]?.name ?? "—",
                created_at: rp.created_at,
            })),
        [crud.items, rolesMap, permissionsMap]
    );

    /* =======================
       FILTER UI
    ======================= */
    const filteredItems = useMemo(() => {
        return items.filter((rp) => {
            const matchRole =
                !filterRoleId || rp.role_id === filterRoleId;
            const matchPermission =
                !filterPermissionId ||
                rp.permission_id === filterPermissionId;

            return matchRole && matchPermission;
        });
    }, [items, filterRoleId, filterPermissionId]);

    /* =======================
       RENDER
    ======================= */
    return (
        <section className="space-y-4 bg-white/10 p-2 rounded-2xl">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Role – Permission
                </h1>

                <button
                    onClick={() => crud.setOpenCreate(true)}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
                >
                    + Gán permission
                </button>
            </div>

            <SearchFilterRolePermission
                roleId={filterRoleId}
                permissionId={filterPermissionId}
                onRoleChange={setFilterRoleId}
                onPermissionChange={setFilterPermissionId}
            />

            {crud.loading ? (
                <p className="text-white/60">
                    Đang tải role–permission…
                </p>
            ) : (
                <RolePermissionTable
                    items={filteredItems}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* CREATE */}
            <CreateRolePermissionModal
                open={crud.openCreate}
                onClose={() => crud.setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            {/* UPDATE */}
            <RolePermissionUpdateModal
                open={crud.openUpdate}
                item={crud.selectedItem as RolePermissionUI | null}
                onClose={() => {
                    crud.setOpenUpdate(false);
                    crud.setSelectedItem(null);
                }}
                onSubmit={handleUpdate}
            />

            {/* DELETE */}
            <ConfirmDeleteRolePermissionModal
                open={crud.openDelete}
                item={crud.deleteTarget as RolePermissionUI | null}
                onClose={() => {
                    crud.setOpenDelete(false);
                    crud.setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
