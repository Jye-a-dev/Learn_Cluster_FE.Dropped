// src/components/pages/AdminManage/AdminRolePermission/AdminRolePermissionContainer.tsx
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";

import {
    getRolePermissions,
    addRolePermissions,
    updateRolePermission,
    deleteRolePermission,
} from "@/hooks/permissionRole/getPermissionRole";

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
       STATE
    ======================= */
    const [rawItems, setRawItems] = useState<RolePermissionRaw[]>([]);
    const [loading, setLoading] = useState(false);

    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [selectedItem, setSelectedItem] =
        useState<RolePermissionUI | null>(null);

    const [deleteTarget, setDeleteTarget] =
        useState<RolePermissionUI | null>(null);

    /* =======================
       FILTER
    ======================= */
    const [filterRoleId, setFilterRoleId] = useState("");
    const [filterPermissionId, setFilterPermissionId] = useState("");

    const { rolesMap } = useRolesMap();
    const { permissionsMap } = usePermissionsMap();

    /* =======================
       FETCH
    ======================= */
    const refresh = useCallback(async () => {
        setLoading(true);
        const items = await getRolePermissions();
        setRawItems(items);
        setLoading(false);
    }, []);

    useEffect(() => {
        let mounted = true;

        async function fetchRolePermissions() {
            setLoading(true);
            const items = await getRolePermissions();
            if (mounted) {
                setRawItems(items);
                setLoading(false);
            }
        }

        fetchRolePermissions();

        return () => {
            mounted = false;
        };
    }, []);

    /* =======================
       CREATE
    ======================= */
    async function handleCreate(data: CreateRolePermissionPayload) {
        // API yêu cầu mảng
        await addRolePermissions([data]);
        setOpenCreate(false);
        refresh();
    }

    /* =======================
       EDIT
    ======================= */
    function handleEdit(item: RolePermissionUI) {
        setSelectedItem(item);
        setOpenUpdate(true);
    }

    /* =======================
       UPDATE
    ======================= */
    async function handleUpdate(
        id: string,
        data: { role_id: string; permission_id: string }
    ) {
        await updateRolePermission(id, data);
        setOpenUpdate(false);
        setSelectedItem(null);
        refresh();
    }

    /* =======================
       DELETE
    ======================= */
    function handleDelete(item: RolePermissionUI) {
        setDeleteTarget(item);
        setOpenDelete(true);
    }

    async function handleConfirmDelete(id: string) {
        await deleteRolePermission(id);
        setOpenDelete(false);
        setDeleteTarget(null);
        refresh();
    }

    /* =======================
       MAP UI
    ======================= */
    const items: RolePermissionUI[] = useMemo(
        () =>
            rawItems.map((rp) => ({
                id: rp.id,
                role_id: rp.role_id,
                permission_id: rp.permission_id,
                roleName: rolesMap[rp.role_id]?.name ?? "—",
                permissionName: permissionsMap[rp.permission_id]?.name ?? "—",
                created_at: rp.created_at,
            })),
        [rawItems, rolesMap, permissionsMap]
    );

    /* =======================
       FILTER UI
    ======================= */
    const filteredItems = useMemo(() => {
        return items.filter((rp) => {
            const matchRole =
                !filterRoleId || rp.role_id === filterRoleId;
            const matchPermission =
                !filterPermissionId || rp.permission_id === filterPermissionId;

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
                    onClick={() => setOpenCreate(true)}
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

            {loading ? (
                <p className="text-white/60">Đang tải role–permission…</p>
            ) : (
                <RolePermissionTable
                    items={filteredItems}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* CREATE */}
            <CreateRolePermissionModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            {/* UPDATE */}
            <RolePermissionUpdateModal
                open={openUpdate}
                item={selectedItem}
                onClose={() => {
                    setOpenUpdate(false);
                    setSelectedItem(null);
                }}
                onSubmit={handleUpdate}
            />

            {/* DELETE */}
            <ConfirmDeleteRolePermissionModal
                open={openDelete}
                item={deleteTarget}
                onClose={() => {
                    setOpenDelete(false);
                    setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
