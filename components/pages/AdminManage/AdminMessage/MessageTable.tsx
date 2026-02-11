"use client";

import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
import MessageActions from "./MessageActions";
import type { Message } from "./MessageUiTypes";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useStudyDatesMap } from "@/hooks/study_dates/useStudyDatesMap";

export default function MessageTable({
    messages,
    onEdit,
    onDelete,
}: {
    messages: Message[];
    onEdit: (m: Message) => void;
    onDelete: (m: Message) => void;
}) {
    const { usersMap, loading: loadingUsers } = useUsersMap();
    const { studyDatesMap, loading: loadingStudyDates } =
        useStudyDatesMap();

    const columns: BaseColumn<Message>[] = [
        {
            key: "content",
            header: "Content",
            className: "p-3 text-left text-white",
            render: (m) =>
                m.content ? (
                    <span
                        className="block max-w-[320px] truncate text-sm text-white/90"
                        title={m.content}
                    >
                        {m.content}
                    </span>
                ) : (
                    <span className="text-white/50">—</span>
                ),
        },

        {
            key: "sender",
            header: "Sender",
            className: "p-3 text-center text-white/80",
            render: (m) => {
                if (loadingUsers) return "Loading…";
                if (!m.sender_id)
                    return <span className="text-white/50">System</span>;

                const user = usersMap[m.sender_id];
                return user?.username ?? (
                    <span className="text-white/50">—</span>
                );
            },
        },

        {
            key: "study_date",
            header: "Study Date",
            className: "p-3 text-center text-white/80",
            render: (m) => {
                if (loadingStudyDates) return "Loading…";

                const studyDate = studyDatesMap[m.study_date_id];
                return studyDate?.title ?? (
                    <span className="text-white/50">—</span>
                );
            },
        },

        {
            key: "sent_at",
            header: "Sent At",
            className: "p-3 text-center text-white/70",
            render: (m) =>
                m.sent_at ? (
                    <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs">
                        {new Date(m.sent_at).toLocaleString("vi-VN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </span>
                ) : (
                    "—"
                ),
        },

        {
            key: "actions",
            header: "",
            className: "p-3 w-24 text-right",
            render: (m) => (
                <MessageActions
                    message={m}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <BaseTable
            data={messages}
            columns={columns}
            wrapperClassName="rounded-xl border border-white/30"
            headClassName="border-b border-white/20"
            rowClassName={() =>
                "border-t border-white/10 hover:bg-white/5 transition"
            }
            emptyText="Chưa có message"
        />
    );
}
