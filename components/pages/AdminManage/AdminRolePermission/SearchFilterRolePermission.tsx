"use client";

import { useMemo } from "react";
import { useRolesMap } from "@/hooks/roles/useRolesMap";
import { usePermissionsMap } from "@/hooks/permissionRole/usePermissionsMap";

type Props = {
    roleId: string;
    permissionId: string;
    onRoleChange: (v: string) => void;
    onPermissionChange: (v: string) => void;
};

export default function SearchFilterRolePermission({
    roleId,
    permissionId,
    onRoleChange,
    onPermissionChange,
}: Props) {
    const { rolesMap, loading: rolesLoading } = useRolesMap();
    const { permissionsMap, loading: permissionsLoading } =
        usePermissionsMap();

    const roles = useMemo(() => Object.values(rolesMap), [rolesMap]);
    const permissions = useMemo(
        () => Object.values(permissionsMap),
        [permissionsMap]
    );

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-emerald-600 p-4 md:flex-row md:items-center">
            {/* ROLE FILTER */}
            <select
                value={roleId}
                disabled={rolesLoading}
                onChange={(e) => onRoleChange(e.target.value)}
                className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-white border border-cyan-400/40 md:w-48"
            >
                <option value="">Tất cả role</option>
                {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                        {r.name}
                    </option>
                ))}
            </select>

            {/* PERMISSION FILTER */}
            <select
                value={permissionId}
                disabled={permissionsLoading}
                onChange={(e) => onPermissionChange(e.target.value)}
                className="w-full rounded-md bg-zinc-900 px-3 py-2 text-sm text-white border border-cyan-400/40 md:w-56"
            >
                <option value="">Tất cả permission</option>
                {permissions.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
