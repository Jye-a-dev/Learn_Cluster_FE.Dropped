"use client";

import { useEffect, useState } from "react";
import BaseFormModal from "@/components/pages/AdminManage/BaseModel/BaseFormModal";
import type {
    Assignment,
    UpdateAssignmentPayload,
} from "./AssignmentUiTypes";

/* =======================
   Helpers
======================= */
function toDateTimeLocal(value?: string | null): string {
    if (!value) return "";

    const d = new Date(value);
    const pad = (n: number) => String(n).padStart(2, "0");

    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
        d.getHours()
    )}:${pad(d.getMinutes())}`;
}

/* =======================
   Component
======================= */
type Props = {
    open: boolean;
    assignment: Assignment | null;
    onClose: () => void;
    onSubmit: (id: string, data: UpdateAssignmentPayload) => Promise<void>;
};

export default function UpdateAssignmentModal({
    open,
    assignment,
    onClose,
    onSubmit,
}: Props) {
    const [form, setForm] = useState<UpdateAssignmentPayload>({
        course_id: "",
    });

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!open || !assignment) return;

        setForm({
            course_id: assignment.course_id,
            title: assignment.title ?? "",
            description: assignment.description ?? "",
            file_url: assignment.file_url ?? "",
            deadline: toDateTimeLocal(assignment.deadline),
        });
    }, [open, assignment]);

    if (!open || !assignment) return null;

    async function handleSubmit() {
        if (!assignment) return;

        try {
            setSubmitting(true);

            await onSubmit(assignment.id, {
                ...form,
                deadline: form.deadline
                    ? new Date(form.deadline).toISOString() // ✅ convert ngược
                    : undefined,
            });

            onClose();
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <BaseFormModal
            open={open}
            title="Cập nhật Assignment"
            submitting={submitting}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="space-y-5 text-white">
                {/* ===== TITLE ===== */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wide text-white/70">
                        Title
                    </label>
                    <input
                        className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
                        value={form.title ?? ""}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        placeholder="Assignment title"
                    />
                </div>

                {/* ===== DESCRIPTION ===== */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wide text-white/70">
                        Description
                    </label>
                    <textarea
                        rows={3}
                        className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm resize-none
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
                        value={form.description ?? ""}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        placeholder="Short description"
                    />
                </div>

                {/* ===== FILE URL ===== */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wide text-white/70">
                        File URL
                    </label>
                    <input
                        className="w-full rounded-md bg-black/60 border border-white/30
						px-3 py-2 text-sm
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
                        value={form.file_url ?? ""}
                        onChange={(e) =>
                            setForm({ ...form, file_url: e.target.value })
                        }
                        placeholder="https://example.com/file.pdf"
                    />
                </div>

                {/* ===== DEADLINE (HIGHLIGHT) ===== */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wide text-blue-400">
                        Deadline
                    </label>
                    <input
                        type="datetime-local"
                        className="w-full rounded-md
						bg-white/10 border-2 border-blue-500/70
						px-3 py-2 text-sm cursor-pointer
						focus:outline-none focus:ring-2 focus:ring-blue-500
						focus:border-blue-500"
                        value={form.deadline ?? ""}
                        onChange={(e) =>
                            setForm({ ...form, deadline: e.target.value })
                        }
                    />
                    <p className="text-[11px] text-white/50">
                        Thời gian theo múi giờ trình duyệt
                    </p>
                </div>
            </div>
        </BaseFormModal>
    );
}
