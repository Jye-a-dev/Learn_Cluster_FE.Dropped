"use client";

import { useEffect, useState } from "react";
import {
    BookOpenIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { Course, UpdateCoursePayload } from "./CourseUiTypes";

type Props = {
    open: boolean;
    course: Course | null;
    onClose: () => void;
    onSubmit: (id: string, data: UpdateCoursePayload) => Promise<void>;
};

export default function UpdateCourseModal({
    open,
    course,
    onClose,
    onSubmit,
}: Props) {
    const [form, setForm] = useState<UpdateCoursePayload>({
        title: "",
        description: "",
        objective: "",
        duration_hours: undefined,
        status: "draft",
    });

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open && course) {
            setForm({
                title: course.title,
                description: course.description ?? "",
                objective: course.objective ?? "",
                duration_hours: course.duration_hours ?? undefined,
                status: course.status,
            });
        }
    }, [open, course]);


    if (!open || !course) return null;
    const courseId = course.id;

    async function handleSubmit() {
        try {
            setSubmitting(true);
            await onSubmit(courseId, {
                ...form,
                description: form.description || undefined,
                objective: form.objective || undefined,
            });
            onClose();
        } finally {
            setSubmitting(false);
        }
    }


    return (
        <BaseFormModal
            open={open}
            title="Cập nhật Course"
            submitting={submitting}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            {/* Title */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">
                    Title
                </label>
                <div className="relative">
                    <BookOpenIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                        className="input-admin pl-9 text-white border border-white rounded-b-md"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                    />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">
                    Description
                </label>
                <textarea
                    rows={3}
                    className="input-admin text-white border border-white rounded-b-md"
                    value={form.description ?? ""}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
            </div>

            {/* Objective */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">
                    Objective
                </label>
                <textarea
                    rows={3}
                    className="input-admin text-white border border-white rounded-b-md"
                    value={form.objective ?? ""}
                    onChange={(e) =>
                        setForm({ ...form, objective: e.target.value })
                    }
                />
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">
                    Duration (hours)
                </label>
                <div className="relative">
                    <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                    <input
                        type="number"
                        min={0}
                        className="input-admin pl-9 text-white border border-white rounded-b-md"
                        value={form.duration_hours ?? ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                duration_hours: e.target.value
                                    ? Number(e.target.value)
                                    : undefined,
                            })
                        }
                    />
                </div>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">
                    Status
                </label>
                <select
                    className="input-admin text-white border border-white rounded-b-md"
                    value={form.status}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            status: e.target.value as never,
                        })
                    }
                >
                    <option value="draft">Draft</option>
                    <option value="public">Public</option>
                    <option value="closed">Closed</option>
                </select>
            </div>
        </BaseFormModal>
    );
}
