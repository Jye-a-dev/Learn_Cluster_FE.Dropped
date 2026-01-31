"use client";

import { useMemo, useState } from "react";
import {
    getRoles,
    createRole,
    updateRole,
    deleteRole,
    getRoleCount,
} from "@/hooks/roles/getRoles";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import CreateRoleButton from "./CreateRoleButton";
import RoleTable from "./RoleTable";
import SearchRole from "./SearchRole";
import CreateRoleModal from "./CreateRoleModal";
import UpdateRoleModal from "./UpdateRoleModal";
import ConfirmDeleteRoleModal from "./ConfirmDeleteRoleModal";

import type { Role, CreateRolePayload, UpdateRolePayload } from "./RoleUiTypes";

/* ===== RAW TYPE (API) ===== */
type RoleRaw = {
    id: string;
    name: string;
    description?: string | null;
    code?: string | null;
};

/* ===== MAPPER ===== */
function toRole(r: RoleRaw): Role {
    return {
        id: r.id,
        name: r.name as Role["name"],
        description: r.description ?? undefined,
    };
}

export default function AdminRoleContainer() {
    /* ===== BASE CRUD (RAW) ===== */
    const {
        items: rawRoles,
        loading,
        totalCount,

        openCreate,
        openUpdate,
        openDelete,

        setOpenCreate,
        setOpenUpdate,
        setOpenDelete,

        refresh,
    } = useBaseCrudContainer<RoleRaw>({
        fetchList: getRoles,
        fetchCount: getRoleCount,
    });

    /* ===== UI STATE ===== */
    const [search, setSearch] = useState("");
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);

    /* ===== CRUD HANDLERS ===== */
    async function handleCreate(data: CreateRolePayload) {
        await createRole(data);
        refresh();
    }

    function handleEdit(role: Role) {
        setSelectedRole(role);
        setOpenUpdate(true);
    }

    async function handleUpdate(id: string, data: UpdateRolePayload) {
        await updateRole(id, data);
        setOpenUpdate(false);
        setSelectedRole(null);
        refresh();
    }

    function handleDelete(role: Role) {
        setDeleteTarget(role);
        setOpenDelete(true);
    }

    async function handleConfirmDelete(id: string) {
        await deleteRole(id);
        setOpenDelete(false);
        setDeleteTarget(null);
        refresh();
    }

    /* ===== NORMALIZE RAW → UI ===== */
    const roles: Role[] = useMemo(
        () => rawRoles.map(toRole),
        [rawRoles]
    );

    const filteredRoles = useMemo(() => {
        const q = search.toLowerCase();
        return roles.filter((r) => r.name.toLowerCase().includes(q));
    }, [roles, search]);

    /* ===== RENDER ===== */
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý Role | Tổng roles: {totalCount}
                </h1>
                <CreateRoleButton onClick={() => setOpenCreate(true)} />
            </div>

            <SearchRole search={search} onSearchChange={setSearch} />

            {loading ? (
                <p className="text-white/60">Đang tải roles…</p>
            ) : (
                <RoleTable
                    roles={filteredRoles}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            <CreateRoleModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            <UpdateRoleModal
                open={openUpdate}
                role={selectedRole}
                onClose={() => {
                    setOpenUpdate(false);
                    setSelectedRole(null);
                }}
                onSubmit={handleUpdate}
            />

            <ConfirmDeleteRoleModal
                open={openDelete}
                role={deleteTarget}
                onClose={() => {
                    setOpenDelete(false);
                    setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
