"use client";

import { useEffect, useState } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useSubmissionsMap } from "@/hooks/submission/useSubmissionsMap";

import type {
  Grade,
  UpdateGradePayload,
} from "./GradeUITypes";

type Props = {
  open: boolean;
  grade: Grade | null;
  onClose: () => void;
  onSubmit: (id: string, data: UpdateGradePayload) => Promise<void>;
};

type FormState = {
  grader_id: string;
  submission_id: string;
  score: number | "";
  feedback: string;
};

export default function UpdateGradeModal({
  open,
  grade,
  onClose,
  onSubmit,
}: Props) {
  const { usersMap, loading: loadingUsers } = useUsersMap();
  const { submissionsMap } = useSubmissionsMap();

  const [form, setForm] = useState<FormState>({
    grader_id: "",
    submission_id: "",
    score: "",
    feedback: "",
  });

  const [submitting, setSubmitting] = useState(false);

  /* =======================
     INIT FORM
  ======================= */
  useEffect(() => {
    if (!open || !grade) return;

    setForm({
      grader_id: grade.grader_id ?? "",
      submission_id: grade.submission_id,
      score: grade.score ?? "",
      feedback: grade.feedback ?? "",
    });
  }, [open, grade]);

  if (!open || !grade) return null;
  const current = grade;

  /* =======================
     VALIDATION
  ======================= */
  const isInvalid =
    !form.submission_id ||
    !form.grader_id ||
    form.score === "";

  /* =======================
     SUBMIT
  ======================= */
  async function handleSubmit() {
    if (isInvalid) return;

    try {
      setSubmitting(true);

      const payload: UpdateGradePayload = {
        grader_id: form.grader_id,
        submission_id: form.submission_id,
        score: Number(form.score),
        feedback: form.feedback || null,
      };

      await onSubmit(current.id, payload);
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
      title="Cập nhật Grade"
      submitting={submitting}
      isInvalid={isInvalid}   // ✅ FIX: truyền đúng prop
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="space-y-6 text-white">
        {/* ===== SUBMISSION (READONLY) ===== */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase text-white/60">
            Submission
          </label>
          <div className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/80">
            {(() => {
              const s = submissionsMap[form.submission_id];
              return s?.text_submission ?? "—";
            })()}
          </div>
        </div>

        {/* ===== GRADER + SCORE ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* GRADER */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-semibold uppercase text-white/60">
              Grader
            </label>
            <select
              className="w-full rounded-md bg-neutral-900 border border-white/30
                px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.grader_id}
              disabled={loadingUsers}
              onChange={(e) =>
                setForm({ ...form, grader_id: e.target.value })
              }
            >
              <option value="">-- Chọn người chấm --</option>
              {Object.values(usersMap).map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username ?? u.email}
                </option>
              ))}
            </select>
          </div>

          {/* SCORE */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase text-white/60">
              Score
            </label>
            <input
              type="number"
              step="0.1"
              min={0}
              max={10}
              className="w-full rounded-md bg-neutral-900 border border-white/30
                px-3 py-2 text-sm text-center font-semibold
                focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={form.score}
              onChange={(e) =>
                setForm({
                  ...form,
                  score:
                    e.target.value === ""
                      ? ""
                      : Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        {/* ===== FEEDBACK ===== */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase text-white/60">
            Feedback
          </label>
          <textarea
            rows={4}
            placeholder="Nhận xét cho bài làm…"
            className="w-full rounded-md bg-neutral-900 border border-white/30
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.feedback}
            onChange={(e) =>
              setForm({ ...form, feedback: e.target.value })
            }
          />
        </div>
      </div>
    </BaseFormModal>
  );
}