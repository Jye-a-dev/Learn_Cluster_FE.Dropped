"use client";

import { useEffect, useState } from "react";
import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";
import {
  StudyDateBE,
  updateStudyDate,
} from "@/hooks/study_dates/getStudyDates";

type Props = {
  open: boolean;
  studyDate: StudyDateBE;
  onClose: () => void;
  onOpenDelete?: () => void;
  onUpdated?: () => void;
};

export default function TeacherStudyDateModal({
  open,
  studyDate,
  onClose,
  onOpenDelete,
  onUpdated,
}: Props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);

  /* INIT */
  useEffect(() => {
    if (!studyDate) return;

    setTitle(studyDate.title ?? "");
    setLocation(studyDate.location ?? "");
    setScheduledAt(
      studyDate.scheduled_at
        ? studyDate.scheduled_at.slice(0, 16)
        : ""
    );
  }, [studyDate]);

  /* SAVE */
  const handleSave = async () => {
    try {
      setLoading(true);

      await updateStudyDate(studyDate.id, {
        ...studyDate,
        title,
        location,
        scheduled_at: scheduledAt || null,
      });

      onUpdated?.();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseTeacherModal
      open={open}
      title="Manage Study Date"
      width="w-140"
      onClose={onClose}
    >
      <div className="space-y-5">

        {/* TITLE */}
        <div>
          <label className="text-sm font-medium">Title</label>
          <input
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="text-sm font-medium">Location</label>
          <input
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* TIME */}
        <div>
          <label className="text-sm font-medium">Scheduled At</label>
          <input
            type="datetime-local"
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-between pt-4">
          <button
            onClick={onOpenDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white"
          >
            Delete
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

      </div>
    </BaseTeacherModal>
  );
}