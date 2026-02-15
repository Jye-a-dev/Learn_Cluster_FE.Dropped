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

export default function UpdateAchievementModal({
    open,
    achievement,
    onClose,
    onSubmit,
}: Props) {
    const { usersMap } = useUsersMap();

    const [form, setForm] =
        useState<UpdateAchievementPayload>({
            user_id: "",
            name: "",
            description: "",
        });

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open && achievement) {
            setForm({
                user_id: achievement.user_id,
                name: achievement.name,
                description: achievement.description,
            });
        }
    }, [open, achievement]);

    if (!open || !achievement) return null;

    // 🔥 Tách ra biến local để TS chắc chắn không null
    const achievementId = achievement.id;

    const isInvalid = !form.user_id || !form.name;

    async function handleSubmit() {
        if (isInvalid) return;

        try {
            setSubmitting(true);

            await onSubmit(achievementId, {
                user_id: form.user_id,
                name: form.name,
                description: form.description || null,
            });

            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <BaseFormModal
            open={open}
            title="Cập nhật Achievement"
            submitting={submitting}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="space-y-5 text-white">
                <select
                    className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
                    value={form.user_id}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            user_id: e.target.value,
                        })
                    }
                >
                    {Object.values(usersMap).map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.username ?? u.email}
                        </option>
                    ))}
                </select>

                <input
                    className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value,
                        })
                    }
                />

                <textarea
                    rows={3}
                    className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
                    value={form.description ?? ""}
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
