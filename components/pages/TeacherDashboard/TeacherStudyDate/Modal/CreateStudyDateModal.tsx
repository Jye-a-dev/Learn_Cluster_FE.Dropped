"use client";

import { useState } from "react";
import useSWR from "swr";

import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";
import { createStudyDate } from "@/hooks/study_dates/getStudyDates";
import { getCoursesByInstructor } from "@/hooks/course_instructors/getCourseInstructor";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";

type Props = {
    open: boolean;
    onClose: () => void;
    onCreated?: () => void;
};

export default function CreateStudyDateModal({
    open,
    onClose,
    onCreated,
}: Props) {
    const { user } = useCurrentUser();
    const { coursesMap } = useCoursesMap();

    const { data: courseInstructors = [] } = useSWR(
        user?.id ? `/course_instructor/user/${user.id}` : null,
        () => getCoursesByInstructor(user!.id)
    );

    const [form, setForm] = useState({
        courseId: "",
        title: "",
        location: "",
        scheduledAt: "",
    });

    const [loading, setLoading] = useState(false);
    const handleCreate = async () => {
        if (!form.courseId || !user?.id) return;

        const payload = {
            course_id: form.courseId,
            title: form.title || "Untitled",
            location: form.location || "TBD",
            scheduled_at: form.scheduledAt
                ? form.scheduledAt.replace('T', ' ').replace('Z', '')
                : new Date().toISOString().replace('T', ' ').replace('Z', ''),
            created_by: user.id,
        };

        await createStudyDate(payload);

        console.log("👉 PAYLOAD SEND:", payload);

        try {
            setLoading(true);

            await createStudyDate(payload);

            console.log("✅ CREATE SUCCESS");

            onCreated?.();
            onClose();

            setForm({
                courseId: "",
                title: "",
                location: "",
                scheduledAt: "",
            });
        } catch (err) {
            console.error("❌ CREATE ERROR:", err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <BaseTeacherModal
            open={open}
            title="Create Study Date"
            width="w-120"
            onClose={onClose}
        >
            <div className="space-y-4">

                {/* COURSE */}
                <select
                    className="w-full px-3 py-2 border rounded-lg"
                    value={form.courseId}
                    onChange={(e) =>
                        setForm((p) => ({ ...p, courseId: e.target.value }))
                    }
                >
                    <option value="">Select course</option>

                    {courseInstructors.map((ci) => (
                        <option key={ci.id} value={ci.course_id}>
                            {coursesMap[ci.course_id]?.title || "Unknown"}
                        </option>
                    ))}
                </select>

                {/* TITLE */}
                <input
                    placeholder="Title"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={form.title}
                    onChange={(e) =>
                        setForm((p) => ({ ...p, title: e.target.value }))
                    }
                />

                {/* LOCATION */}
                <input
                    placeholder="Location"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={form.location}
                    onChange={(e) =>
                        setForm((p) => ({ ...p, location: e.target.value }))
                    }
                />

                {/* TIME */}
                <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={form.scheduledAt}
                    onChange={(e) =>
                        setForm((p) => ({ ...p, scheduledAt: e.target.value }))
                    }
                />

                {/* ACTION */}
                <div className="flex justify-end gap-3 pt-2">
                    <button onClick={onClose} className="px-4 py-2 border rounded-lg">
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>
                </div>

            </div>
        </BaseTeacherModal>
    );
}