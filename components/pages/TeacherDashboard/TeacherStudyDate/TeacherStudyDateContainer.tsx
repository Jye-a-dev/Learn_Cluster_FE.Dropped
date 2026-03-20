"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";

import {
  StudyDateBE,
  getStudyDatesByCourse,
  createStudyDate,
  deleteStudyDate,
} from "@/hooks/study_dates/getStudyDates";

import BaseTeacherContainer from "../Base/BaseTeacherContainer";
import TeacherStudyDateCard from "./TeacherStudyDateCard";
import TeacherStudyDateModal from "./TeacherStudyDateModal";

export default function TeacherStudyDateContainer() {
  /* ================= PARAM ================= */
  const { courseId } = useParams() as { courseId?: string };

  /* ================= STATE ================= */
  const [data, setData] = useState<StudyDateBE[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<StudyDateBE | null>(null);

  /* ================= FETCH ================= */
  const fetchData = useCallback(async () => {
    if (!courseId) return;

    try {
      setLoading(true);
      const res = await getStudyDatesByCourse(courseId);
      setData(res);
    } catch (err) {
      console.error("Lỗi load study date", err);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ================= ACTION ================= */
  async function handleCreate(form: {
    title: string;
    scheduled_at: string;
    location: string;
  }) {
    if (!courseId) return;

    await createStudyDate({
      course_id: courseId,
      title: form.title || null,
      scheduled_at: form.scheduled_at || null,
      location: form.location || null,
    });

    setOpen(false);
    fetchData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Xóa buổi học này?")) return;

    await deleteStudyDate(id);
    fetchData();
  }

  /* ================= RENDER ================= */
  return (
    <>
      <BaseTeacherContainer
        title="Quản lý buổi học"
        description="Tạo và quản lý lịch học cho khóa học"
      >
        {/* ACTION */}
        <div className="mb-6">
          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            + Tạo buổi học
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-emerald-900 animate-pulse rounded-xl"
              />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && data.length === 0 && (
          <div className="text-center text-emerald-400 py-10">
            Chưa có buổi học nào
          </div>
        )}

        {/* LIST */}
        {!loading && data.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data.map((item) => (
              <TeacherStudyDateCard
                key={item.id}
                item={item}
                onEdit={() => {
                  setEditing(item);
                  setOpen(true);
                }}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        )}
      </BaseTeacherContainer>

      {/* MODAL */}
      {open && (
        <TeacherStudyDateModal
          studyDate={editing}
          onClose={() => setOpen(false)}
          onSave={handleCreate}
        />
      )}
    </>
  );
}