"use client";

import { Grade } from "@/hooks/grade/getGrade";
import BaseTeacherForm from "../Base/BaseTeacherForm";
import { useState } from "react";

type Props = {
  form: {
    score: string;
    feedback: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      score: string;
      feedback: string;
    }>
  >;
  onSave: (data: {
    score: number | null;
    feedback: string | null;
  }) => void;
  isEditing: boolean;
  grade: Grade | null;
};

export default function GradeForm({
  form,
  setForm,
  onSave,
  isEditing,
  grade,
}: Props) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);

    let score: number | null = null;

    if (form.score.trim() !== "") {
      const parsed = Number(form.score);

      if (isNaN(parsed)) {
        setError("Score must be a number");
        return;
      }

      if (parsed < 0 || parsed > 100) {
        setError("Score must be between 0 and 100");
        return;
      }

      score = parsed;
    }

    const feedback =
      form.feedback.trim() === "" ? null : form.feedback;

    onSave({
      score,
      feedback,
    });
  };

  return (
    <BaseTeacherForm
      title="Grade"
      description="Enter score and feedback for this submission"
      onSubmit={handleSubmit}
      submitText={isEditing ? "Update Grade" : "Submit Grade"}
      rightContent={
        grade && (
          <span className="text-xs text-gray-500">
            ID: {grade.id}
          </span>
        )
      }
    >
      {/* SCORE */}
      <input
        type="number"
        placeholder="Score (0 - 100)"
        value={form.score}
        onChange={(e) => {
          setForm({ ...form, score: e.target.value });
          setError(null);
        }}
        className="w-full p-3 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 outline-none"
      />

      {/* FEEDBACK */}
      <textarea
        placeholder="Feedback"
        value={form.feedback}
        onChange={(e) =>
          setForm({ ...form, feedback: e.target.value })
        }
        className="w-full p-3 border border-gray-300 rounded-lg h-32 
                   focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 outline-none"
      />

      {/* WARNING TEXT */}
      {error && (
        <div className="text-sm text-red-500 font-medium">
          {error}
        </div>
      )}

      {/* CURRENT GRADE */}
      {grade && (
        <div className="p-4 border border-gray-200 rounded-lg space-y-1">
          <p className="text-sm font-semibold text-gray-200">
            Current Grade
          </p>

          <p className="text-sm text-gray-200">
            Score:{" "}
            {grade.score !== null ? grade.score : "—"}
          </p>

          <p className="text-sm text-gray-200">
            Feedback:{" "}
            {grade.feedback ? grade.feedback : "—"}
          </p>
        </div>
      )}
    </BaseTeacherForm>
  );
}