"use client";

import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
import GradeActions from "./GradeActions";
import type { Grade } from "./GradeUITypes";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useSubmissionsMap } from "@/hooks/submission/useSubmissionsMap";

export default function GradeTable({
    grades,
    onEdit,
    onDelete,
}: {
    grades: Grade[];
    onEdit: (g: Grade) => void;
    onDelete: (g: Grade) => void;
}) {
    const { usersMap, loading: loadingUsers } = useUsersMap();
    const { submissionsMap, loading: loadingSubmissions } =
        useSubmissionsMap();

    const columns: BaseColumn<Grade>[] = [
        {
            key: "submission",
            header: "Submission",
            className: "p-3 font-medium text-white text-left",
            render: (g) => {
                if (loadingSubmissions) return "Loading…";

                const submission = submissionsMap[g.submission_id];
                if (!submission)
                    return <span className="text-white/50">—</span>;

                if (submission.text_submission) {
                    return (
                        <span
                            className="block max-w-[320px] truncate text-sm text-white/90"
                            title={submission.text_submission}
                        >
                            {submission.text_submission}
                        </span>
                    );
                }

                return <span className="text-white/50">—</span>;
            },
        },

        {
            key: "grader",
            header: "Grader",
            className: "p-3 text-white/80 text-center",
            render: (g) => {
                if (loadingUsers) return "Loading…";
                if (!g.grader_id)
                    return <span className="text-white/50">—</span>;
                const user = usersMap[g.grader_id];
                return user?.username ?? (
                    <span className="text-white/50">—</span>
                );
            },
        },
        {
            key: "score",
            header: "Score",
            className: "p-3 text-center text-white/80",
            render: (g) =>
                g.score !== null && g.score !== undefined ? (
                    <span className="inline-flex items-center rounded-md bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-300">
                        {g.score}
                    </span>
                ) : (
                    <span className="text-white/50">0</span>
                ),
        },
        {
            key: "feedback",
            header: "Feedback",
            className: "p-3 text-left text-white/80",
            render: (g) =>
                g.feedback ? (
                    <span
                        className="block max-w-90 truncate text-sm text-white/90"
                        title={g.feedback}
                    >
                        {g.feedback}
                    </span>
                ) : (
                    <span className="text-white/50">—</span>
                ),
        },
        {
            key: "graded_at",
            header: "Graded At",
            className: "p-3 text-center text-white/70",
            render: (g) =>
                g.graded_at ? (
                    <span className="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs">
                        {new Date(g.graded_at).toLocaleString("vi-VN", {
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
            render: (g) => (
                <GradeActions
                    grade={g}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        },
    ];

    return (
        <BaseTable
            data={grades}
            columns={columns}
            wrapperClassName="rounded-xl border border-white/30"
            headClassName="border-b border-white/20"
            rowClassName={() =>
                "border-t border-white/10 hover:bg-white/5 transition"
            }
            emptyText="Chưa có grade"
        />
    );
}
