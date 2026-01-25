// src/components/pages/AdminManage/AdminUser/AdminUserContainer.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
    getUsers,
    deleteUser,
    updateUser,
    createUser,
    getUserCount,
} from "@/hooks/users/getUsers";
import { useRolesMap } from "@/hooks/roles/useRolesMap";

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
    const [rawUsers, setRawUsers] = useState<UserRaw[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const [openDelete, setOpenDelete] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const [selectedUser, setSelectedUser] = useState<UserUI | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<UserUI | null>(null);

    /* ===== SEARCH & FILTER ===== */
    const [search, setSearch] = useState("");
    const [filterRoleId, setFilterRoleId] = useState("");

    const { rolesMap } = useRolesMap();

    /* ===== FETCH ===== */
    useEffect(() => {
        (async () => {
            setLoading(true);

            const [users, count] = await Promise.all([
                getUsers(),
                getUserCount(),
            ]);

            setRawUsers(users);
            setTotalCount(count);

            setLoading(false);
        })();
    }, []);

    async function refresh() {
        setLoading(true);

        const [users, count] = await Promise.all([
            getUsers(),
            getUserCount(),
        ]);

        setRawUsers(users);
        setTotalCount(count);

        setLoading(false);
    }


    /* ===== CREATE ===== */
    async function handleCreate(data: CreateUserPayload) {
        await createUser(data);
        setOpenCreate(false);
        refresh();
    }

    /* ===== EDIT ===== */
    function handleEdit(user: UserUI) {
        setSelectedUser(user);
        setOpenUpdate(true);
    }

    /* ===== UPDATE ===== */
    async function handleUpdate(
        userId: string,
        data: { username: string; role_id: string }
    ) {
        await updateUser(userId, data);
        setOpenUpdate(false);
        setSelectedUser(null);
        refresh();
    }

    /* ===== DELETE ===== */
    function handleDelete(user: UserUI) {
        setDeleteTarget(user);
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
                    Quản lý User |   Tổng users: {totalCount}
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
                user={selectedUser}
                onClose={() => {
                    setOpenUpdate(false);
                    setSelectedUser(null);
                }}
                onSubmit={handleUpdate}
            />

            {/* DELETE */}
            <ConfirmDeleteUserModal
                open={openDelete}
                user={deleteTarget}
                onClose={() => {
                    setOpenDelete(false);
                    setDeleteTarget(null);
                }}
                onConfirm={handleConfirmDelete}
            />
        </section>
    );
}
