"use client";

import { useState, useEffect } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useUsersMap } from "@/hooks/users/useUsersMap";

import type {
    StudyProfileUI,
    UpdateStudyProfilePayload,
    AvailableTimeUI,
} from "./StudyProfileUiTypes";

import { DAYS } from "./StudyProfileUiTypes";

type Props = {
    open: boolean;
    profile: StudyProfileUI | null;
    onClose: () => void;
    onSubmit: (
        id: string,
        data: UpdateStudyProfilePayload
    ) => Promise<void>;
};

export default function StudyProfileUpdateModal({
    open,
    profile,
    onClose,
    onSubmit,
}: Props) {
    const { usersMap } = useUsersMap();

    const [form, setForm] =
        useState<UpdateStudyProfilePayload>({
            user_id: "",
            bio: null,
            preferred_subject: null,
            level: null,
            learning_goal: null,
            available_time: null,
            is_active: true,
        });

    const [availableTimeUI, setAvailableTimeUI] =
        useState<AvailableTimeUI>({});

    const [submitting, setSubmitting] =
        useState(false);

    const profileId = profile?.id;

    useEffect(() => {
        if (!open || !profile) return;

        setForm({
            user_id: profile.user_id,
            bio: profile.bio,
            preferred_subject: profile.preferred_subject,
            level: profile.level,
            learning_goal: profile.learning_goal,
            available_time: profile.available_time,
            is_active: Boolean(profile.is_active),
        });

        const raw = profile.available_time ?? {};
        const mapped: AvailableTimeUI = {};

        DAYS.forEach((day) => {
            const value = raw?.[day];

            if (Array.isArray(value) && value.length === 2) {
                mapped[day] = {
                    enabled: true,
                    from: value[0] ?? "",
                    to: value[1] ?? "",
                };
            } else {
                mapped[day] = {
                    enabled: false,
                    from: "",
                    to: "",
                };
            }
        });

        setAvailableTimeUI(mapped);

    }, [open, profile, profileId]);

    if (!open || !profile) return null;

    async function handleSubmit() {
        if (!profile) return;

        try {
            setSubmitting(true);

            const finalAvailableTime: Record<string, string[]> = {};

            Object.entries(availableTimeUI).forEach(([day, value]) => {
                if (value?.enabled && value.from && value.to) {
                    finalAvailableTime[day] = [value.from, value.to];
                }
            });

            const payload: UpdateStudyProfilePayload = {
                ...form,
                is_active: Boolean(form.is_active),
            };

            // 🔥 CHỈ gửi nếu có thay đổi
            const original = profile.available_time ?? {};
            const changed =
                JSON.stringify(original) !==
                JSON.stringify(finalAvailableTime);

            if (changed) {
                payload.available_time = finalAvailableTime;
            }

            await onSubmit(profile.id, payload);

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
            title="Cập nhật Study Profile"
            submitting={submitting}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">
                    User
                </label>

                <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                    <input
                        disabled
                        value={
                            usersMap[form.user_id]?.username ??
                            form.user_id
                        }
                        className={`${inputStyle} pl-9 bg-zinc-800 border-white/10 text-white/80 cursor-not-allowed`}
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">
                    Preferred Subject
                </label>

                <input
                    value={form.preferred_subject ?? ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            preferred_subject:
                                e.target.value,
                        })
                    }
                    className={inputStyle}
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">
                    Level
                </label>

                <select
                    value={form.level ?? ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            level:
                                e.target.value,
                        })
                    }
                    className={inputStyle}
                >
                    <option value="">Chọn level</option>
                    <option value="Beginner">
                        Beginner
                    </option>
                    <option value="Intermediate">
                        Intermediate
                    </option>
                    <option value="Advanced">
                        Advanced
                    </option>
                </select>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">
                    Bio
                </label>

                <textarea
                    rows={3}
                    value={form.bio ?? ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            bio: e.target.value,
                        })
                    }
                    className={inputStyle}
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white">
                    Learning Goal
                </label>

                <textarea
                    rows={3}
                    value={form.learning_goal ?? ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            learning_goal:
                                e.target.value,
                        })
                    }
                    className={inputStyle}
                />
            </div>

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
                                checked={d?.enabled ?? false}
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
                                value={d?.from ?? ""}
                                onChange={(e) =>
                                    setAvailableTimeUI((prev) => ({
                                        ...prev,
                                        [day]: {
                                            ...prev[day],
                                            from: e.target.value,
                                        },
                                    }))
                                }
                                className={`${inputStyle} w-32 disabled:text-white disabled:opacity-100`}
                                style={{ colorScheme: "dark" }}
                            />

                            <span className="text-white/70">-</span>

                            <input
                                type="time"
                                disabled={!d?.enabled}
                                value={d?.to ?? ""}
                                onChange={(e) =>
                                    setAvailableTimeUI((prev) => ({
                                        ...prev,
                                        [day]: {
                                            ...prev[day],
                                            to: e.target.value,
                                        },
                                    }))
                                }
                                className={`${inputStyle} w-32 disabled:text-white disabled:opacity-100`}
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
                            is_active:
                                e.target.checked,
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