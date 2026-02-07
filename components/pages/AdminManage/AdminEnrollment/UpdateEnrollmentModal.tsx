"use client";

import { useEffect, useState } from "react";
import {
    UserIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";

import type {
    Enrollment,
    UpdateEnrollmentPayload,
} from "./EnrollmentUiTypes";

type Props = {
    open: boolean;
    enrollment: Enrollment | null;
    onClose: () => void;
    onSubmit: (id: string, data: UpdateEnrollmentPayload) => Promise<void>;
};

type FormState = {
    user_id: string;
    course_id: string;
};

export default function UpdateEnrollmentModal({
    open,
    enrollment,
    onClose,
    onSubmit,
}: Props) {
    const { usersMap, loading: loadingUsers } = useUsersMap();
    const { coursesMap, loading: loadingCourses } = useCoursesMap();

    const [form, setForm] = useState<FormState>({
        user_id: "",
        course_id: "",
    });

    const [submitting, setSubmitting] = useState(false);

    /* =======================
       INIT FORM
    ======================= */
    useEffect(() => {
        if (!open || !enrollment) return;

        setForm({
            user_id: enrollment.user_id,
            course_id: enrollment.course_id,
        });
    }, [open, enrollment]);

    if (!open || !enrollment) return null;
    const current = enrollment;

    /* =======================
       VALIDATION
    ======================= */
    const isInvalid = !form.user_id || !form.course_id;

    /* =======================
       SUBMIT
    ======================= */
    async function handleSubmit() {
        if (isInvalid) return;

        try {
            setSubmitting(true);

            const payload: UpdateEnrollmentPayload = {
                user_id: form.user_id,
                course_id: form.course_id,
            };

            await onSubmit(current.id, payload);
            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    /* =======================
       RENDER
    ======================= */
    return (
        <BaseFormModal
            open={open}
            title="Cập nhật Enrollment"
            submitting={submitting}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="space-y-5 text-white">
                {/* ===== USER ===== */}
                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase text-white/70">
                        <UserIcon className="h-4 w-4 text-white/40" />
                        User
                    </label>
                    <select
                        className="input-admin bg-neutral-900 text-white border border-white/40 rounded-md"
                        value={form.user_id}
                        disabled={loadingUsers}
                        onChange={(e) =>
                            setForm({ ...form, user_id: e.target.value })
                        }
                    >
                        <option value="">-- Chọn user --</option>
                        {Object.values(usersMap).map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name ?? u.email}
                            </option>

                        ))}
                    </select>
                </div>

                {/* ===== COURSE ===== */}
                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase text-white/70">
                        <AcademicCapIcon className="h-4 w-4 text-white/40" />
                        Course
                    </label>
                    <select
                        className="input-admin bg-neutral-900 text-white border border-white/40 rounded-md"
                        value={form.course_id}
                        disabled={loadingCourses}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                course_id: e.target.value,
                            })
                        }
                    >
                        <option value="">-- Chọn course --</option>
                        {Object.values(coursesMap).map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.title}
                            </option>
                        ))}
                    </select>
                </div>

                <p className="text-[11px] text-white/50">
                    Mỗi user chỉ được enroll một lần cho mỗi course.
                </p>
            </div>
        </BaseFormModal>
    );
}
