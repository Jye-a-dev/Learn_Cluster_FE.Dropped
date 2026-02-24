// src/components/pages/AdminManage/AdminUser/UserUpdateModal.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { UserIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useRolesMap } from "@/hooks/roles/useRolesMap";
import BaseFormModal from "../BaseModel/BaseFormModal";
import type { UserUI } from "./UserUiTypes";

type Props = {
    open: boolean;
    user: UserUI | null;
    onClose: () => void;
    onSubmit: (
        id: string,
        data: { username: string; role_id: string }
    ) => Promise<void>;
};

export default function UserUpdateModal({
    open,
    user,
    onClose,
    onSubmit,
}: Props) {
    /* ===== Hooks ===== */
    const { rolesMap, loading } = useRolesMap();

    const resolvedRoleId = useMemo(() => {
        if (!user?.roleName) return "";
        const role = Object.values(rolesMap).find(
            (r) => r.name === user.roleName
        );
        return role?.id ?? "";
    }, [user, rolesMap]);

    const [username, setUsername] = useState("");
    const [roleId, setRoleId] = useState("");
    const [submitting, setSubmitting] = useState(false);

    /* ===== Sync khi mở modal ===== */
    useEffect(() => {
        if (open && user) {
            setUsername(user.username);
            setRoleId(resolvedRoleId);
        }
    }, [open, user, resolvedRoleId]);

    if (!open || !user) return null;
    const userId = user.id;

    /* ===== Validation ===== */
    const isInvalid =
        !username.trim() ||
        !roleId ||
        (username === user.username && roleId === resolvedRoleId);

    /* ===== Submit ===== */
    async function handleSubmit() {
        if (isInvalid) return;

        try {
            setSubmitting(true);
            await onSubmit(userId, {
                username: username.trim(),
                role_id: roleId,
            });
            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <BaseFormModal
            open={open}
            title="Cập nhật User"
            submitting={submitting}
            isInvalid={isInvalid}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            {/* ===== Username ===== */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">
                    Username
                </label>
                <div className="relative">
                    <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                        className="input-admin pl-9 text-white"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
            </div>

            {/* ===== Role ===== */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">
                    Role
                </label>

                <div className="relative">
                    <ShieldCheckIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />

                    <svg
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>

                    <select
                        value={roleId}
                        disabled={loading}
                        onChange={(e) => setRoleId(e.target.value)}
                        className="input-admin pl-9 pr-10 border border-cyan-200 rounded-2xl text-white appearance-none cursor-pointer"
                    >
                        <option value="" disabled>
                            Chọn role
                        </option>
                        {Object.values(rolesMap).map((r) => (
                            <option
                                key={r.id}
                                value={r.id}
                                className="bg-zinc-900"
                            >
                                {r.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ===== Hint ===== */}
            <p className="pt-1 text-xs text-white/40">
                Thay đổi username hoặc role sẽ ảnh hưởng quyền truy cập của user.
            </p>
        </BaseFormModal>
    );
}