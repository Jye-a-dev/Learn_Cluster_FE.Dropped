// src/components/pages/AdminManage/AdminUser/AdminUserContainer.tsx
"use client";

import { useMemo, useState } from "react";
import {
    getUsers,
    deleteUser,
    updateUser,
    createUser,
    getUserCount,
} from "@/hooks/users/getUsers";
import { useRolesMap } from "@/hooks/roles/useRolesMap";


import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";
import UserTable from "./UserTable";
import CreateUserModal from "./CreateUserModal";
import CreateUserButton from "./CreateUserButton";
import UserUpdateModal from "./UserUpdateModal";
import ConfirmDeleteUserModal from "./ConfirmDeleteUserModal";
import SearchFilterUser from "./SearchFilterUser";

import type { UserUI, CreateUserPayload } from "./UserUiTypes";

/* ===== RAW API TYPE ===== */
type UserRaw = {
    id: string;
    username: string;
    email: string;
    role_id: string;
    created_at?: string;
    updated_at?: string;
};

export default function AdminUserContainer() {
    const {
        items: rawUsers,
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
    } = useBaseCrudContainer<UserRaw>({
        fetchList: getUsers,
        fetchCount: getUserCount,
    });

    const { rolesMap } = useRolesMap();

    /* ===== SEARCH & FILTER ===== */
    const [search, setSearch] = useState("");
    const [filterRoleId, setFilterRoleId] = useState("");

    /* ===== CREATE ===== */
    async function handleCreate(data: CreateUserPayload) {
        await createUser(data);
        setOpenCreate(false);
        refresh();
    }

    /* ===== EDIT ===== */
    function handleEdit(user: UserUI) {
        setSelectedItem(
            rawUsers.find((u) => u.id === user.id) ?? null
        );
        setOpenUpdate(true);
    }

    /* ===== UPDATE ===== */
    async function handleUpdate(
        userId: string,
        data: { username: string; role_id: string }
    ) {
        await updateUser(userId, data);
        setOpenUpdate(false);
        setSelectedItem(null);
        refresh();
    }

    /* ===== DELETE ===== */
    function handleDelete(user: UserUI) {
        setDeleteTarget(
            rawUsers.find((u) => u.id === user.id) ?? null
        );
        setOpenDelete(true);
    }

    async function handleConfirmDelete(id: string) {
        await deleteUser(id);
        setOpenDelete(false);
        setDeleteTarget(null);
        refresh();
    }

    /* ===== MAP UI ===== */
    const users: UserUI[] = useMemo(
        () =>
            rawUsers.map((u) => ({
                id: u.id,
                username: u.username,
                email: u.email,
                roleName: rolesMap[u.role_id]?.name ?? "—",
                created_at: u.created_at,
                updated_at: u.updated_at,
            })),
        [rawUsers, rolesMap]
    );

    /* ===== FILTER ===== */
    const filteredUsers = useMemo(() => {
        return users.filter((u) => {
            const matchSearch =
                u.username.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase());

            const matchRole =
                !filterRoleId || rolesMap[filterRoleId]?.name === u.roleName;

            return matchSearch && matchRole;
        });
    }, [users, search, filterRoleId, rolesMap]);

    /* ===== RENDER ===== */
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    Quản lý User | Tổng users: {totalCount}
                </h1>
                <CreateUserButton onClick={() => setOpenCreate(true)} />
            </div>

            <SearchFilterUser
                search={search}
                roleId={filterRoleId}
                onSearchChange={setSearch}
                onRoleChange={setFilterRoleId}
            />

            {loading ? (
                <p className="text-white/60">Đang tải users…</p>
            ) : (
                <UserTable
                    users={filteredUsers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* CREATE */}
            <CreateUserModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSubmit={handleCreate}
            />

            {/* UPDATE */}
            <UserUpdateModal
                open={openUpdate}
                user={
                    selectedItem
                        ? {
                              id: selectedItem.id,
                              username: selectedItem.username,
                              email: selectedItem.email,
                              roleName:
                                  rolesMap[selectedItem.role_id]?.name ??
                                  "—",
                          }
                        : null
                }
                onClose={() => {
                    setOpenUpdate(false);
                    setSelectedItem(null);
                }}
                onSubmit={handleUpdate}
            />

            {/* DELETE */}
            <ConfirmDeleteUserModal
                open={openDelete}
                user={
                    deleteTarget
                        ? {
                              id: deleteTarget.id,
                              username: deleteTarget.username,
                              email: deleteTarget.email,
                              roleName:
                                  rolesMap[deleteTarget.role_id]?.name ?? "—",
                          }
                        : null
                }
                onClose={() => {
                    setOpenDelete(false);
                    setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
