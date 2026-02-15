"use client";

import BaseTable, {
    BaseColumn,
} from "@/components/pages/AdminManage/BaseModel/BaseTable";

import type { Achievement } from "./AchievementUiTypes";
import AchievementActions from "./AchievementActions";
import { useUsersMap } from "@/hooks/users/useUsersMap";

type Props = {
    achievements: Achievement[];
    onEdit: (a: Achievement) => void;
    onDelete: (a: Achievement) => void;
};

export default function AchievementTable({
    achievements,
    onEdit,
    onDelete,
}: Props) {
    const { usersMap, loading } = useUsersMap();

    const columns: BaseColumn<Achievement>[] = [
        {
            key: "id",
            header: "ID",
            className:
                "px-4 py-3 text-left font-mono text-xs text-white/60",
            render: (a) => a.id,
        },
        {
            key: "user",
            header: "User",
            className: "px-4 py-3 text-white/80",
            render: (a) => {
                if (loading) return "Loading…";
                const user = usersMap[a.user_id];
                return user?.username ?? "—";
            },
        },
        {
            key: "name",
            header: "Name",
            className: "px-4 py-3 text-white/80",
            render: (a) => a.name,
        },
        {
            key: "description",
            header: "Description",
            className: "px-4 py-3 text-white/80 max-w-[300px] truncate",
            render: (a) => a.description ?? "—",
        },
        {
            key: "awarded_at",
            header: "Awarded At",
            className: "px-4 py-3 text-xs text-white/60",
            render: (a) =>
                new Date(a.awarded_at).toLocaleString("vi-VN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                }),
        },
        {
            key: "actions",
            header: "Actions",
            className: "px-4 py-3 text-center",
            render: (a) => (
                <AchievementActions
                    achievement={a}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <BaseTable
            data={achievements}
            columns={columns}
            wrapperClassName="rounded-xl border border-white/30"
            tableClassName="w-full text-sm text-white"
            headClassName="bg-cyan-800/50"
            rowClassName={() =>
                "border-t border-white/10 hover:bg-white/5"
            }
            emptyText="Không có achievement"
            rowsPerPage={10}
        />
    );
}
