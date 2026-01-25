// src/components/pages/AdminManage/AdminUser/SearchFilterUser.tsx
"use client";

import { useMemo } from "react";
import { useRolesMap } from "@/hooks/roles/useRolesMap";

type Props = {
    search: string;
    roleId: string;
    onSearchChange: (v: string) => void;
    onRoleChange: (v: string) => void;
};

export default function SearchFilterUser({
    search,
    roleId,
    onSearchChange,
    onRoleChange,
}: Props) {
    const { rolesMap, loading } = useRolesMap();

    const roles = useMemo(() => Object.values(rolesMap), [rolesMap]);

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-emerald-600 p-4 md:flex-row md:items-center">
            {/* Search */}
            <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tìm username hoặc email..."
                className="flex-1 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
            />

            {/* Role filter */}
            <select
                value={roleId}
                disabled={loading}
                onChange={(e) => onRoleChange(e.target.value)}
                className="w-full cursor-pointer rounded-md border border-cyan-400/30 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 md:w-48"
            >
                <option value="" className="bg-cyan-900 text-white">
                    Tất cả role
                </option>

                {roles.map((r) => (
                    <option key={r.id} value={r.id} className="bg-emerald-900 text-white hover:bg-cyan-700 cursor-pointer">
                        {r.name}
                    </option>
                ))}
            </select>

        </div>
    );
}
