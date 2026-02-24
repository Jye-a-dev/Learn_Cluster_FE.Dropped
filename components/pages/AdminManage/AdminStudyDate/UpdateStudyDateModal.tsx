"use client";

import { useEffect, useState } from "react";
import {
    CalendarIcon,
    MapPinIcon,
    BookmarkSquareIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";

import type {
    StudyDate,
    UpdateStudyDatePayload,
} from "./StudyDateUiTypes";

type Props = {
    open: boolean;
    studyDate: StudyDate | null;
    onClose: () => void;
    onSubmit: (data: UpdateStudyDatePayload) => Promise<void>;
};

export default function UpdateStudyDateModal({
    open,
    studyDate,
    onClose,
    onSubmit,
}: Props) {
    const { coursesMap, loading: courseLoading } = useCoursesMap();
    const { usersMap, loading: userLoading } = useUsersMap();

    const [form, setForm] = useState({
        course_id: "",
        title: "",
        scheduled_at: "",
        location: "",
        created_by: "",
    });

    const [submitting, setSubmitting] = useState(false);

    /* ===== Sync khi mở modal ===== */
    useEffect(() => {
        if (open && studyDate) {
            setForm({
                course_id: studyDate.course_id,
                title: studyDate.title ?? "",
                scheduled_at: studyDate.scheduled_at
                    ? studyDate.scheduled_at.slice(0, 16)
                    : "",
                location: studyDate.location ?? "",
                created_by: studyDate.created_by ?? "",
            });
        }
    }, [open, studyDate]);

    if (!open || !studyDate) return null;

    /* ===== Validation ===== */
    const isInvalid =
        !form.course_id.trim() ||
        !form.scheduled_at.trim();

    /* ===== Submit ===== */
    async function handleSubmit() {
        if (isInvalid) return;

        try {
            setSubmitting(true);

            await onSubmit({
                course_id: form.course_id,
                title: form.title || undefined,
                scheduled_at: form.scheduled_at || undefined,
                location: form.location || undefined,
                created_by: form.created_by || undefined,
            });

            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    /* ===== Shared styles ===== */
    const inputBase =
        "w-full rounded-md bg-slate-900 text-slate-100 border border-slate-600 px-3 py-2 text-sm " +
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

    const selectBase = inputBase;
    const labelBase = "text-xs font-semibold text-slate-300";

    return (
        <BaseFormModal
            open={open}
            title="Cập nhật Study Date"
            submitting={submitting}
            isInvalid={isInvalid}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="space-y-5">
                {/* ===== Course ===== */}
                <div className="space-y-1.5">
                    <label className={labelBase}>Khóa học</label>
                    <select
                        className={selectBase}
                        value={form.course_id}
                        onChange={(e) =>
                            setForm({ ...form, course_id: e.target.value })
                        }
                    >
                        <option value="" disabled>
                            {courseLoading
                                ? "Đang tải khóa học..."
                                : "Chọn khóa học"}
                        </option>
                        {Object.values(coursesMap).map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.title}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ===== Created by (readonly) ===== */}
                <div className="space-y-1.5">
                    <label className={labelBase}>Người tạo</label>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <select
                            className={`${selectBase} pl-9 opacity-60 cursor-not-allowed`}
                            value={form.created_by}
                            disabled
                        >
                            <option value="">
                                {userLoading
                                    ? "Đang tải người dùng..."
                                    : "Không thể thay đổi"}
                            </option>
                            {Object.values(usersMap).map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.username}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* ===== Title ===== */}
                <div className="space-y-1.5">
                    <label className={labelBase}>Tiêu đề</label>
                    <div className="relative">
                        <BookmarkSquareIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            className={`${inputBase} pl-9`}
                            placeholder="Tên buổi học"
                            value={form.title}
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                        />
                    </div>
                </div>

                {/* ===== Scheduled at ===== */}
                <div className="space-y-1.5">
                    <label className={labelBase}>Thời gian</label>
                    <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="datetime-local"
                            className={`${inputBase} pl-9`}
                            value={form.scheduled_at}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    scheduled_at: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                {/* ===== Location ===== */}
                <div className="space-y-1.5">
                    <label className={labelBase}>Địa điểm</label>
                    <div className="relative">
                        <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <textarea
                            rows={3}
                            className={`${inputBase} pl-9 resize-none`}
                            placeholder="Phòng học / Link online"
                            value={form.location}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    location: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <p className="text-xs text-slate-400 border-t border-slate-700 pt-3">
                    Thay đổi thời gian hoặc địa điểm sẽ ảnh hưởng đến toàn bộ học viên.
                </p>
            </div>
        </BaseFormModal>
    );
}