"use client";

import { useState } from "react";
import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";
import { Course, patchCourse } from "@/hooks/courses/getCourse";

type Props = {
  open: boolean;
  course: Course;
  onClose: () => void;
  onUpdated?: (course: Course) => void;
};

export default function ManageContentModal({
  open,
  course,
  onClose,
  onUpdated,
}: Props) {

  const [description, setDescription] = useState(course.description ?? "");
  const [objective, setObjective] = useState(course.objective ?? "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {

    try {

      setSaving(true);

      const updated = await patchCourse(course.id, {
        description,
        objective,
      });

      onUpdated?.(updated);
      onClose();

    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }

  };

  return (
    <BaseTeacherModal
      open={open}
      title="Manage Course Content"
      width="max-w-xl"
      onClose={onClose}
    >

      <div className="space-y-6">

        {/* Description */}
        <div className="space-y-2">

          <label className="text-sm font-medium text-cyan-200">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="
              w-full
              bg-emerald-800
              border border-emerald-700
              rounded-lg
              p-3
              text-emerald-100
              placeholder-emerald-400
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-400
              focus:border-cyan-400
              transition
            "
            placeholder="Describe this course..."
          />

        </div>

        {/* Objective */}
        <div className="space-y-2">

          <label className="text-sm font-medium text-cyan-200">
            Objective
          </label>

          <textarea
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            rows={4}
            className="
              w-full
              bg-emerald-800
              border border-emerald-700
              rounded-lg
              p-3
              text-emerald-100
              placeholder-emerald-400
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-400
              focus:border-cyan-400
              transition
            "
            placeholder="Mục tiêu?"
          />

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">

          <button
            onClick={onClose}
            className="
              px-4 py-2
              rounded-lg
              border border-emerald-600
              text-emerald-200
              hover:bg-emerald-800
              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="
              px-4 py-2
              rounded-lg
              bg-cyan-500
              text-white
              font-medium
              hover:bg-cyan-400
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
            "
          >
            {saving ? "Saving..." : "Save"}
          </button>

        </div>

      </div>

    </BaseTeacherModal>
  );
}