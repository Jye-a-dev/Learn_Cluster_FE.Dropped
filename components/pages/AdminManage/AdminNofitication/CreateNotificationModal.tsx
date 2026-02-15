"use client";

import { useState } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useUsersMap } from "@/hooks/users/useUsersMap";

import type { CreateNotificationPayload } from "./NotificationUiTypes";

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateNotificationPayload) => Promise<void>;
};

export default function CreateNotificationModal({
    open,
    onClose,
    onSubmit,
}: Props) {
    const { usersMap, loading } = useUsersMap();

    const [form, setForm] =
        useState<CreateNotificationPayload>({
            user_id: "",
            type: "",
            content: "",
        });

    const [submitting, setSubmitting] = useState(false);

    const isInvalid = !form.user_id;

    async function handleSubmit() {
        if (isInvalid) return;

        try {
            setSubmitting(true);

            await onSubmit({
                user_id: form.user_id,
                type: form.type || null,
                content: form.content || null,
            });

            onClose();
            setForm({ user_id: "", type: "", content: "" });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <BaseFormModal
            open={open}
            title="Tạo Notification"
            submitting={submitting}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="space-y-5 text-white">
                <select
                    className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
                    value={form.user_id}
                    disabled={loading}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            user_id: e.target.value,
                        })
                    }
                >
                    <option value="">-- Chọn user --</option>
                    {Object.values(usersMap).map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.username ?? u.email}
                        </option>
                    ))}
                </select>

                <input
                    className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
                    placeholder="Type"
                    value={form.type ?? ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            type: e.target.value,
                        })
                    }
                />

                <textarea
                    rows={3}
                    className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
                    placeholder="Content"
                    value={form.content ?? ""}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            content: e.target.value,
                        })
                    }
                />
            </div>
        </BaseFormModal>
    );
}
