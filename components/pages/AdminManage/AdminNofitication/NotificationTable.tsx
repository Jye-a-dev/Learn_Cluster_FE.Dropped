"use client";

import BaseTable, {
    BaseColumn,
} from "@/components/pages/AdminManage/BaseModel/BaseTable";

import type { Notification } from "./NotificationUiTypes";
import NotificationActions from "./NotificationActions";
import { useUsersMap } from "@/hooks/users/useUsersMap";

type Props = {
    notifications: Notification[];
    onMarkRead: (n: Notification) => void;
    onDelete: (n: Notification) => void;
};

export default function NotificationTable({
    notifications,
    onMarkRead,
    onDelete,
}: Props) {
    const { usersMap, loading } = useUsersMap();

    const columns: BaseColumn<Notification>[] = [
        {
            key: "id",
            header: "ID",
            className:
                "px-4 py-3 text-left font-mono text-xs text-white/60",
            render: (n) => n.id,
        },
        {
            key: "user",
            header: "User",
            className: "px-4 py-3 text-white/80",
            render: (n) => {
                if (loading) return "Loading…";
                const user = usersMap[n.user_id];
                return user?.username ?? "—";
            },
        },
        {
            key: "type",
            header: "Type",
            className: "px-4 py-3 text-white/80",
            render: (n) => n.type ?? "—",
        },
        {
            key: "content",
            header: "Content",
            className:
                "px-4 py-3 text-white/80 max-w-[300px] truncate",
            render: (n) => n.content ?? "—",
        },
        {
            key: "status",
            header: "Status",
            className: "px-4 py-3 text-white/80",
            render: (n) =>
                n.is_read ? (
                    <span className="text-green-400">
                        Đã đọc
                    </span>
                ) : (
                    <span className="text-yellow-400">
                        Chưa đọc
                    </span>
                ),
        },
        {
            key: "created_at",
            header: "Created At",
            className: "px-4 py-3 text-xs text-white/60",
            render: (n) =>
                new Date(n.created_at).toLocaleString(
                    "vi-VN",
                    {
                        dateStyle: "medium",
                        timeStyle: "short",
                    }
                ),
        },
        {
            key: "actions",
            header: "Actions",
            className: "px-4 py-3 text-center",
            render: (n) => (
                <NotificationActions
                    notification={n}
                    onMarkRead={onMarkRead}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <BaseTable
            data={notifications}
            columns={columns}
            wrapperClassName="rounded-xl border border-white/30"
            tableClassName="w-full text-sm text-white"
            headClassName="bg-cyan-800/50"
            rowClassName={() =>
                "border-t border-white/10 hover:bg-white/5"
            }
            emptyText="Không có notification"
            rowsPerPage={10}
        />
    );
}
