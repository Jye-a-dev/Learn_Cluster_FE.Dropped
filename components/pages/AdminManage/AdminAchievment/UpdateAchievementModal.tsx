"use client";

import { useEffect, useState } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useUsersMap } from "@/hooks/users/useUsersMap";

import type {
    Achievement,
    UpdateAchievementPayload,
} from "./AchievementUiTypes";

type Props = {
    open: boolean;
    achievement: Achievement | null;
    onClose: () => void;
    onSubmit: (
        id: string,
        data: UpdateAchievementPayload
    ) => Promise<void>;
};

type FormState = {
    user_id: string;
    name: string;
    description: string;
};

export default function UpdateAchievementModal({
    open,
    achievement,
    onClose,
    onSubmit,
}: Props) {
    const { usersMap } = useUsersMap();

    const [form, setForm] = useState<FormState>({
        user_id: "",
        name: "",
        description: "",
    });

    const [submitting, setSubmitting] = useState(false);

    /* =======================
       INIT FORM
    ======================= */
    useEffect(() => {
        if (!open || !achievement) return;

        setForm({
            user_id: achievement.user_id,
            name: achievement.name,
            description: achievement.description ?? "",
        });
    }, [open, achievement]);

    if (!open || !achievement) return null;
    const achievementId = achievement.id;

    /* =======================
       VALIDATION
    ======================= */
    const isInvalid =
        !form.user_id ||
        !form.name.trim();

    /* =======================
       SUBMIT
    ======================= */
    async function handleSubmit() {
        try {
            setSubmitting(true);

            const payload: UpdateAchievementPayload = {
                user_id: form.user_id,
                name: form.name.trim(),
                description:
                    form.description.trim() || null,
            };

            await onSubmit(achievementId, payload);
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
            title="Cập nhật Achievement"
            submitting={submitting}
            isInvalid={isInvalid}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="space-y-5 text-white">
                {/* USER */}
                <select
                    className="w-full rounded-md bg-neutral-900 border border-white/30 px-3 py-2 text-sm"
                    value={form.user_id}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            user_id: e.target.value,
                        })
                    }
                >
                    <option value="">
                        -- Chọn user --
                    </option>
                    {Object.values(usersMap).map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.username ?? u.email}
                        </option>
                    ))}
                </select>

                {/* NAME */}
                <input
                    className="w-full rounded-md bg-neutral-900 border border-white/30 px-3 py-2 text-sm"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                />

                {/* DESCRIPTION */}
                <textarea
                    rows={3}
                    className="w-full rounded-md bg-neutral-900 border border-white/30 px-3 py-2 text-sm"
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
                        })
                    }
                />
            </div>
        </BaseFormModal>
    );
}