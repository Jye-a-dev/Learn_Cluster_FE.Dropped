"use client";

import BaseSearch from "@/components/pages/AdminManage/BaseModel/BaseSearch";
import { useMemo } from "react";
import { useRolesMap } from "@/hooks/roles/useRolesMap";

/* ✅ THÊM TYPE Props */
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
			<BaseSearch
				value={search}
				onChange={onSearchChange}
				placeholder="Tìm username hoặc email..."
				className="flex-1"
				inputClassName="rounded-md bg-black/40 focus:border-white/30"
			/>

			<select
				value={roleId}
				disabled={loading}
				onChange={(e) => onRoleChange(e.target.value)}
				className="w-full md:w-48 rounded-md border border-cyan-400/30 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
			>
				<option value="">Tất cả role</option>
				{roles.map((r) => (
					<option key={r.id} value={r.id}>
						{r.name}
					</option>
				))}
			</select>
		</div>
	);
}
