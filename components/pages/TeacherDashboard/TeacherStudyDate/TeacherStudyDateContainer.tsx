"use client";

import { useState } from "react";
import useSWR from "swr";

import {
  StudyDateBE,
  getStudyDatesByCourse,
  createStudyDate,
  deleteStudyDate,
} from "@/hooks/study_dates/getStudyDates";

import BaseTeacherContainer from "../Base/BaseTeacherContainer";
import TeacherStudyDateList from "./List/TeacherStudyDateList";
import TeacherStudyDateModal from "./Modal/TeacherStudyDateModal";
import CreateStudyDateModal from "./Modal/CreateStudyDateModal";

type Props = {
  courseId: string;
};

export default function TeacherStudyDateContainer({ courseId }: Props) {
  const [selected, setSelected] = useState<StudyDateBE | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  /* ================= SWR ================= */
  const { data: studyDates = [], isLoading, mutate } = useSWR(
    courseId ? `/study_date/course/${courseId}` : null,
    () => getStudyDatesByCourse(courseId)
  );

  /* ================= CREATE ================= */
  const handleCreate = async () => {
    await createStudyDate({
      course_id: courseId,
      title: "New Study Date",
      scheduled_at: new Date().toISOString(), // ✅ bắt buộc
      location: "TBD",
      // created_by: currentUser.id (nếu BE cần)
      
    });

    mutate();
    
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!selected) return;

    await deleteStudyDate(selected.id);
    setDeleteOpen(false);
    setOpenModal(false);

    mutate(); // ✅ reload
  };

  return (
    <BaseTeacherContainer
      title="Study Dates"
      description="Quản lý lịch học"
    >
      <div className="space-y-6">

        {/* CREATE */}
        <div className="flex justify-end">
          <button
            onClick={() => setOpenCreate(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Create Study Date
          </button>
        </div>

        {/* LIST */}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-6">
            {studyDates.map((sd) => (
              <div
                key={sd.id}
                onClick={() => {
                  setSelected(sd);
                  setOpenModal(true);
                }}
                className="cursor-pointer"
              >
                <TeacherStudyDateList studyDate={sd} />
              </div>
            ))} 
          </div>
        )}
      </div>
      <CreateStudyDateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={handleCreate}
      />
      {/* MODAL */}
      {selected && (
        <TeacherStudyDateModal
          open={openModal}
          studyDate={selected}
          onClose={() => setOpenModal(false)}
          onOpenDelete={() => setDeleteOpen(true)}
          onUpdated={mutate}
        />
      )}

      {/* DELETE */}
      {deleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl space-y-4">
            <div>Are you sure?</div>

            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteOpen(false)}>
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </BaseTeacherContainer>
  );
}