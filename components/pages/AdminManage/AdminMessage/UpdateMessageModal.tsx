"use client";

import { useEffect, useState } from "react";
import {
    ChatBubbleLeftRightIcon,
    UserIcon,
    CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type {
    Message,
    UpdateMessagePayload,
} from "./MessageUiTypes";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useStudyDatesMap } from "@/hooks/study_dates/useStudyDatesMap";

type Props = {
    open: boolean;
    message: Message | null;
    onClose: () => void;
    onSubmit: (id: string, data: UpdateMessagePayload) => Promise<void>;
};

export default function UpdateMessageModal({
    open,
    message,
    onClose,
    onSubmit,
}: Props) {
    const { usersMap } = useUsersMap();
    const { studyDatesMap } = useStudyDatesMap();

    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open && message) {
            setContent(message.content ?? "");
        }
    }, [open, message]);

    if (!open || !message) return null;

    const currentMessage = message;

    const isInvalid = !content.trim();

    async function handleSubmit() {
        if (isInvalid) return;

        try {
            setSubmitting(true);

            await onSubmit(currentMessage.id, {
                content: content.trim(),
            });

            onClose();
        } finally {
            setSubmitting(false);
        }
    }

    const studyDate = studyDatesMap[currentMessage.study_date_id];
    const sender = currentMessage.sender_id
        ? usersMap[currentMessage.sender_id]
        : null;

    return (
        <BaseFormModal
            open={open}
            title="Cập nhật Message"
            submitting={submitting}
            isInvalid={isInvalid}   // ✅ FIX
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="space-y-5 text-white">
                {/* ===== STUDY DATE (LOCKED) ===== */}
                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
                        <CalendarDaysIcon className="h-4 w-4 text-white/40" />
                        Study Date
                    </label>
                    <select
                        disabled
                        className="w-full rounded-md bg-black/60 border border-white/30
              px-3 py-2 text-sm opacity-60 cursor-not-allowed"
                        value={currentMessage.study_date_id}
                    >
                        <option value={currentMessage.study_date_id}>
                            {studyDate?.title ?? currentMessage.study_date_id}
                        </option>
                    </select>
                </div>

                {/* ===== SENDER (LOCKED) ===== */}
                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
                        <UserIcon className="h-4 w-4 text-white/40" />
                        Sender
                    </label>
                    <select
                        disabled
                        className="w-full rounded-md bg-black/60 border border-white/30
              px-3 py-2 text-sm opacity-60 cursor-not-allowed"
                        value={currentMessage.sender_id ?? ""}
                    >
                        <option value={currentMessage.sender_id ?? ""}>
                            {sender?.username ??
                                sender?.email ??
                                "System"}
                        </option>
                    </select>
                </div>

                {/* ===== CONTENT (EDITABLE) ===== */}
                <div className="space-y-1">
                    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
                        <ChatBubbleLeftRightIcon className="h-4 w-4 text-white/40" />
                        Content
                    </label>
                    <textarea
                        rows={3}
                        className="w-full rounded-md bg-black/60 border border-white/30
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>

                <p className="text-[11px] text-white/50">
                    Chỉ có thể chỉnh sửa nội dung tin nhắn.
                </p>
            </div>
        </BaseFormModal>
    );
}