"use client";

import { useState } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useUsersMap } from "@/hooks/users/useUsersMap";

import type {
    CreateStudyProfilePayload,
    AvailableTimeUI,
} from "./StudyProfileUiTypes";

import { DAYS } from "./StudyProfileUiTypes";

export default function CreateStudyProfileModal({
    open,
    onClose,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateStudyProfilePayload) => Promise<void>;
}) {
    const { usersMap } = useUsersMap();

    const [form, setForm] = useState<CreateStudyProfilePayload>({
        user_id: "",
        bio: "",
        preferred_subject: "",
        level: "",
        learning_goal: "",
        available_time: null,
        is_active: true,
    });

    const [availableTimeUI, setAvailableTimeUI] =
        useState<AvailableTimeUI>(() => {
            const init: AvailableTimeUI = {};
            DAYS.forEach((day) => {
                init[day] = {
                    enabled: false,
                    from: "",
                    to: "",
                };
            });
            return init;
        });

    const [submitting, setSubmitting] = useState(false);

    if (!open) return null;

    async function handleSubmit() {
        try {
            setSubmitting(true);

            const finalAvailableTime: Record<string, string[]> = {};

            Object.entries(availableTimeUI).forEach(([day, value]) => {
                if (value.enabled && value.from && value.to) {
                    finalAvailableTime[day] = [value.from, value.to];
                }
            });

            await onSubmit({
                ...form,
                available_time:
                    Object.keys(finalAvailableTime).length > 0
                        ? finalAvailableTime
                        : null,
                is_active: Boolean(form.is_active),
            });

            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    const inputStyle =
        "w-full rounded-md bg-zinc-900 text-white border border-white/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

    return (
        <BaseFormModal
            scrollBar
            open={open}
            title="Tạo Study Profile"
            submitting={submitting}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">
                    User
                </label>

                <select
                    value={form.user_id}
                    onChange={(e) =>
                        setForm({ ...form, user_id: e.target.value })
                    }
                    className={inputStyle}
                >
                    <option value="">-- Chọn user --</option>
                    {Object.values(usersMap).map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.username}
                        </option>
                    ))}
                </select>
            </div>

            <input
                placeholder="Preferred Subject"
                value={form.preferred_subject ?? ""}
                onChange={(e) =>
                    setForm({
                        ...form,
                        preferred_subject: e.target.value,
                    })
                }
                className={inputStyle}
            />

            <select
                value={form.level ?? ""}
                onChange={(e) =>
                    setForm({
                        ...form,
                        level: e.target.value,
                    })
                }
                className={inputStyle}
            >
                <option value="">Chọn level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>

            <textarea
                rows={3}
                placeholder="Bio"
                value={form.bio ?? ""}
                onChange={(e) =>
                    setForm({ ...form, bio: e.target.value })
                }
                className={inputStyle}
            />

            <textarea
                rows={3}
                placeholder="Learning Goal"
                value={form.learning_goal ?? ""}
                onChange={(e) =>
                    setForm({
                        ...form,
                        learning_goal: e.target.value,
                    })
                }
                className={inputStyle}
            />

            <div className="space-y-3">
                <label className="text-xs font-semibold text-white">
                    Available Time
                </label>

                {DAYS.map((day) => {
                    const d = availableTimeUI[day];

                    return (
                        <div
                            key={day}
                            className="flex items-center gap-3"
                        >
                            <input
                                type="checkbox"
                                checked={d?.enabled}
                                onChange={(e) =>
                                    setAvailableTimeUI((prev) => ({
                                        ...prev,
                                        [day]: {
                                            ...prev[day],
                                            enabled: e.target.checked,
                                        },
                                    }))
                                }
                                className="h-4 w-4 accent-indigo-500"
                            />

                            <span className="w-24 text-sm text-white/90 capitalize">
                                {day}
                            </span>

                            <input
                                type="time"
                                disabled={!d?.enabled}
                                value={d?.from}
                                onChange={(e) =>
                                    setAvailableTimeUI((prev) => ({
                                        ...prev,
                                        [day]: {
                                            ...prev[day],
                                            from: e.target.value,
                                        },
                                    }))
                                }
                                className={`${inputStyle} w-32`}
                                style={{ colorScheme: "dark" }}
                            />

                            <span className="text-white/70">-</span>

                            <input
                                type="time"
                                disabled={!d?.enabled}
                                value={d?.to}
                                onChange={(e) =>
                                    setAvailableTimeUI((prev) => ({
                                        ...prev,
                                        [day]: {
                                            ...prev[day],
                                            to: e.target.value,
                                        },
                                    }))
                                }
                                className={`${inputStyle} w-32`}
                                style={{ colorScheme: "dark" }}
                            />
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-white/20">
                <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            is_active: e.target.checked,
                        })
                    }
                    className="h-4 w-4 accent-indigo-500"
                />
                <span className="text-sm text-white/90">
                    Kích hoạt profile
                </span>
            </div>
        </BaseFormModal>
    );
}