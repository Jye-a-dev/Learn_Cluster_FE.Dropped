"use client";

import { useEffect, useState } from "react";
import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";
import {
  SubmissionBE,
  getSubmissionsByAssignment,
  createSubmission,
  patchSubmission,
  deleteSubmission,
} from "@/hooks/submission/getSubmission";
import { getStudentsByCourse, type Enrollment } from "@/hooks/enrollment/getEnrollment";
import { useUsersMap } from "@/hooks/users/useUsersMap";

type Props = {
  open: boolean;
  assignmentId: string;
  courseId: string;
  onUpdated: () => void;
  onClose: () => void;
};

export default function ManageSubmissionModal({
  open,
  assignmentId,
  courseId,
  onUpdated,
  onClose,
}: Props) {
  const { usersMap, loading: usersLoading } = useUsersMap();
  const [submissions, setSubmissions] = useState<SubmissionBE[]>([]);
  const [students, setStudents] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    student_id: "",
    file_url: "",
    text_submission: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Fetch submissions
  useEffect(() => {
    if (!open || !assignmentId) return;

    (async () => {
      try {
        setLoading(true);
        const data = await getSubmissionsByAssignment(assignmentId);
        setSubmissions(data);
      } catch (err) {
        console.error("Failed to fetch submissions", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [open, assignmentId]);

  // Fetch students enrolled in course
  useEffect(() => {
    if (!open || !courseId) return;

    (async () => {
      try {
        const data = await getStudentsByCourse(courseId);
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students", err);
      }
    })();
  }, [open, courseId]);

  const handleSave = async () => {
    if (!form.student_id) return;

    try {
      setSaving(true);

      if (editingId) {
        await patchSubmission(editingId, {
          file_url: form.file_url || null,
          text_submission: form.text_submission || null,
        });
        setSubmissions((prev) =>
          prev.map((s) =>
            s.id === editingId
              ? { ...s, file_url: form.file_url || null, text_submission: form.text_submission || null }
              : s
          )
        );
      } else {
        const id = await createSubmission({
          assignment_id: assignmentId,
          student_id: form.student_id,
          file_url: form.file_url || null,
          text_submission: form.text_submission || null,
        });

        const newSubmission: SubmissionBE = {
          id,
          assignment_id: assignmentId,
          student_id: form.student_id,
          file_url: form.file_url || null,
          text_submission: form.text_submission || null,
        };

        setSubmissions((prev) => [...prev, newSubmission]);
      }

      onUpdated?.();
      setForm({ student_id: "", file_url: "", text_submission: "" });
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteSubmission(id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    if (editingId === id) {
      setForm({ student_id: "", file_url: "", text_submission: "" });
      setEditingId(null);
    }
    onUpdated?.();
  };

  const handleEdit = (submission: SubmissionBE) => {
    setForm({
      student_id: submission.student_id,
      file_url: submission.file_url || "",
      text_submission: submission.text_submission || "",
    });
    setEditingId(submission.id);
  };

  const isLoading = loading || usersLoading;

  return (
    <BaseTeacherModal open={open} title="Manage Submissions" width="w-[900px]" onClose={onClose}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {/* LEFT FORM */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-200">Student</label>
            <select
              value={form.student_id}
              onChange={(e) => setForm({ ...form, student_id: e.target.value })}
              disabled={!!editingId}
              className="w-full p-2 border rounded bg-gray-800 text-white"
            >
              <option value="">Select student</option>
              {students.map((s) => (
                <option key={s.id} value={s.user_id}>
                  {usersMap[s.user_id]?.username || s.user_id}
                </option>
              ))}
            </select>

            <input
              value={form.file_url}
              onChange={(e) => setForm({ ...form, file_url: e.target.value })}
              placeholder="File URL"
              className="w-full p-2 border rounded"
            />
            <textarea
              value={form.text_submission}
              onChange={(e) => setForm({ ...form, text_submission: e.target.value })}
              placeholder="Text Submission"
              className="w-full p-2 border rounded"
            />

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-2 bg-blue-600 text-white rounded"
            >
              {saving ? "Saving..." : editingId ? "Save Changes" : "Add Submission"}
            </button>

            {editingId && (
              <button
                onClick={() => { setForm({ student_id: "", file_url: "", text_submission: "" }); setEditingId(null); }}
                className="w-full py-2 bg-gray-600 text-white rounded"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {/* RIGHT LIST */}
          <div className="space-y-2 overflow-y-auto">
            {submissions.map((s) => (
              <div key={s.id} className="flex justify-between border p-2 rounded">
                <div>
                  <p className="text-sm font-medium">
                    Student: {usersMap[s.student_id]?.username || s.student_id}
                  </p>
                  {s.file_url && (
                    <p className="text-xs text-blue-600">
                      File: <a href={s.file_url} target="_blank">{s.file_url}</a>
                    </p>
                  )}
                  {s.text_submission && (
                    <p className="text-xs text-gray-400">{s.text_submission}</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(s)}>✎</button>
                  <button onClick={() => handleDelete(s.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </BaseTeacherModal>
  );
}