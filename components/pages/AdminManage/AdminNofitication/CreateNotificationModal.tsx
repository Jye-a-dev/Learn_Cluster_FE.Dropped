"use client";

import { useState } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useAssignmentsMap } from "@/hooks/assignment/useAssignmentsMap";

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
  const { assignmentsMap, loading: loadingAssignment } =
    useAssignmentsMap();

  const [form, setForm] =
    useState<CreateNotificationPayload>({
      sender_id: "",
      user_id: "",
      type: "",
      reference_id: "",
      reference_type: "",
      content: "",
    });

  const [submitting, setSubmitting] = useState(false);

  const isInvalid =
    !form.sender_id || !form.user_id;

  async function handleSubmit() {
    if (isInvalid) return;

    try {
      setSubmitting(true);

      await onSubmit({
        sender_id: form.sender_id,
        user_id: form.user_id,
        type: form.type || null,
        reference_id: form.reference_id || null,
        reference_type: form.reference_type || null,
        content: form.content || null,
      });

      onClose();
      setForm({
        sender_id: "",
        user_id: "",
        type: "",
        reference_id: "",
        reference_type: "",
        content: "",
      });
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

        {/* ================= SENDER ================= */}
        <select
          className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
          value={form.sender_id}
          disabled={loading}
          onChange={(e) =>
            setForm({ ...form, sender_id: e.target.value })
          }
        >
          <option value="">-- Chọn sender --</option>
          {Object.values(usersMap).map((u) => (
            <option key={u.id} value={u.id}>
              {u.username ?? u.email}
            </option>
          ))}
        </select>

        {/* ================= RECEIVER ================= */}
        <select
          className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
          value={form.user_id}
          disabled={loading}
          onChange={(e) =>
            setForm({ ...form, user_id: e.target.value })
          }
        >
          <option value="">-- Chọn user nhận --</option>
          {Object.values(usersMap).map((u) => (
            <option key={u.id} value={u.id}>
              {u.username ?? u.email}
            </option>
          ))}
        </select>

        {/* ================= TYPE ================= */}
        <input
          className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
          placeholder="Type (vd: NEW_ASSIGNMENT)"
          value={form.type ?? ""}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        />

        {/* ================= REFERENCE TYPE ================= */}
        <select
          className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
          value={form.reference_type ?? ""}
          onChange={(e) =>
            setForm({
              ...form,
              reference_type: e.target.value,
              reference_id: "",
            })
          }
        >
          <option value="">-- Không có reference --</option>
          <option value="assignment">Assignment</option>
        </select>

        {/* ================= ASSIGNMENT DROPDOWN ================= */}
        {form.reference_type === "assignment" && (
          <>
            {loadingAssignment ? (
              <p className="text-white/50 text-sm">
                Đang tải assignment…
              </p>
            ) : (
              <select
                className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
                value={form.reference_id ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    reference_id: e.target.value,
                  })
                }
              >
                <option value="">-- Chọn assignment --</option>
                {Object.values(assignmentsMap).map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title ?? a.id}
                  </option>
                ))}
              </select>
            )}
          </>
        )}

        {/* ================= CONTENT ================= */}
        <textarea
          rows={3}
          className="w-full rounded-md bg-black/60 border border-white/30 px-3 py-2 text-sm"
          placeholder="Content"
          value={form.content ?? ""}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />
      </div>
    </BaseFormModal>
  );
}