"use client";

import { useEffect, useState } from "react";

import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";

import {
  AssignmentBE,
  updateAssignment,
} from "@/hooks/assignment/getAssignment";

type Props = {
  open: boolean;
  assignment: AssignmentBE;
  onClose: () => void;
  onOpenDelete?: () => void;
  onUpdated?: () => void;
};

export default function ManageAssignmentModal({
  open,
  assignment,
  onClose,
  onOpenDelete,
  onUpdated,
}: Props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     INIT DATA
  ========================= */
  useEffect(() => {
    if (!assignment) return;

    setTitle(assignment.title ?? "");
    setDescription(assignment.description ?? "");
    setFileUrl(assignment.file_url ?? "");
    setDeadline(
      assignment.deadline
        ? assignment.deadline.slice(0, 16) // format for input datetime-local
        : ""
    );
  }, [assignment]);

  /* =========================
     UPDATE
  ========================= */
  const handleSave = async () => {
    try {
      setLoading(true);

      await updateAssignment(assignment.id, {
        title,
        description,
        file_url: fileUrl,
        deadline: deadline || null,
      });

      onUpdated?.();
      onClose();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE
  ========================= */


  /* =========================
     UI
  ========================= */
  return (
    <BaseTeacherModal
      open={open}
      title="Manage Assignment"
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

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* FILE URL */}
        <div>
          <label className="text-sm font-medium">File URL</label>
          <input
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
          />
        </div>

        {/* DEADLINE */}
        <div>
          <label className="text-sm font-medium">Deadline</label>
          <input
            type="datetime-local"
            className="w-full mt-1 px-3 py-2 border rounded-lg"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
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