// src/components/pages/AdminManage/AdminUser/UserUpdateModal.tsx
"use client";

import { useState, useMemo } from "react";
import { useRolesMap } from "@/hooks/roles/useRolesMap";
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
    /** --------------------------------
     * Hooks PHẢI gọi ở top-level
     * -------------------------------- */
    const { rolesMap, loading } = useRolesMap();

    const initialUsername = user?.username ?? "";
    const initialRoleId = useMemo(() => {
        if (!user?.roleName) return "";
        const role = Object.values(rolesMap).find(
            (r) => r.name === user.roleName
        );
        return role?.id ?? "";
    }, [user, rolesMap]);

    const [username, setUsername] = useState(initialUsername);
    const [roleId, setRoleId] = useState(initialRoleId);
    const [submitting, setSubmitting] = useState(false);

    /** --------------------------------
     * Guard render (sau hook)
     * -------------------------------- */
    if (!open || !user) return null;
    const userId = user.id;

    async function handleSubmit() {
        if (!username.trim() || !roleId) return;

        try {
            setSubmitting(true);
            await onSubmit(userId, {
                username,
                role_id: roleId,
            });
            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6">
                <h2 className="mb-4 text-lg font-semibold text-white">
                    Update User
                </h2>

                {/* Username */}
                <div className="mb-4">
                    <label className="mb-1 block text-xs text-white/60">
                        Username
                    </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-md border border-white/10 bg-black/40 p-2 text-sm text-white outline-none focus:border-white/30"
                    />
                </div>

                {/* Role */}
                <div className="mb-6">
                    <label className="mb-1 block text-xs text-white/60">
                        Role
                    </label>
                    <select
                        value={roleId}
                        disabled={loading}
                        onChange={(e) => setRoleId(e.target.value)}
                        className="w-full rounded-md border border-white/10 bg-black/40 p-2 text-sm text-white outline-none focus:border-white/30"
                    >
                        <option value="" disabled>
                            Select role
                        </option>
                        {Object.values(rolesMap).map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="rounded-md border border-white/10 px-4 py-2 text-xs text-white/70 hover:bg-white/5"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={submitting}
                        onClick={handleSubmit}
                        className="rounded-md bg-white px-4 py-2 text-xs font-semibold text-black disabled:opacity-60"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
