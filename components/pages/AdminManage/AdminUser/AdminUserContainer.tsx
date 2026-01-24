"use client";

import { useEffect, useMemo, useState } from "react";
import {
    getUsers,
    deleteUser,
    updateUser,
    createUser,
} from "@/hooks/users/getUsers";
import { useRolesMap } from "@/hooks/roles/useRolesMap";

import UserTable from "./UserTable";
import CreateUserModal from "./CreateUserModal";
import CreateUserButton from "./CreateUserButton";
import UserUpdateModal from "./UserUpdateModal";

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

    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserUI | null>(null);

    const { rolesMap } = useRolesMap();

    /* ===== FETCH ===== */
    useEffect(() => {
        (async () => {
            setLoading(true);
            setRawUsers(await getUsers());
            setLoading(false);
        })();
    }, []);

    async function refresh() {
        setLoading(true);
        setRawUsers(await getUsers());
        setLoading(false);
    }

    /* ===== CREATE ===== */
    async function handleCreate(data: CreateUserPayload) {
        await createUser(data);
        setOpenCreate(false);
        refresh();
    }

    /* ===== EDIT (OPEN MODAL) ===== */
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
    async function handleDelete(id: string) {
        if (!confirm("Delete this user?")) return;
        await deleteUser(id);
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

    /* ===== RENDER ===== */
    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">
                    User Management
                </h1>

                <CreateUserButton onClick={() => setOpenCreate(true)} />
            </div>

            {loading ? (
                <p className="text-white/60">Loading users…</p>
            ) : (
                <UserTable
                    users={users}
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
        </section>
    );
}
