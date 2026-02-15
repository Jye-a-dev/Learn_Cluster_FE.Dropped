"use client";

import { useState } from "react";
import { UserIcon, TrophyIcon } from "@heroicons/react/24/outline";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useUsersMap } from "@/hooks/users/useUsersMap";

import type { CreateAchievementPayload } from "./AchievementUiTypes";

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateAchievementPayload) => Promise<void>;
};

export default function CreateAchievementModal({
    open,
    onClose,
    onSubmit,
}: Props) {
    const { usersMap, loading } = useUsersMap();

    const [form, setForm] = useState<CreateAchievementPayload>({
        user_id: "",
        name: "",
        description: "",
    });

    const [submitting, setSubmitting] = useState(false);

    const isInvalid = !form.user_id || !form.name;

    async function handleSubmit() {
        if (isInvalid) return;

        try {
            setSubmitting(true);

            await onSubmit({
                user_id: form.user_id,
                name: form.name,
                description: form.description || null,
            });

            onClose();
            setForm({ user_id: "", name: "", description: "" });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <BaseFormModal
            open={open}
            title="Tạo Achievement"
            submitting={submitting}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="space-y-5 text-white">
                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase text-white/70">
                        <UserIcon className="h-4 w-4 text-white/40" />
                        User
                    </label>

                    <select
                        className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
                        value={form.user_id}
                        disabled={loading}
                        onChange={(e) =>
                            setForm({ ...form, user_id: e.target.value })
                        }
                    >
                        <option value="">-- Chọn user --</option>
                        {Object.values(usersMap).map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.username ?? u.email}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase text-white/70">
                        <TrophyIcon className="h-4 w-4 text-white/40" />
                        Name
                    </label>

                    <input
                        className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                </div>

                <textarea
                    rows={3}
                    className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
                    placeholder="Description"
                    value={form.description ?? ""}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
            </div>
        </BaseFormModal>
    );
}
