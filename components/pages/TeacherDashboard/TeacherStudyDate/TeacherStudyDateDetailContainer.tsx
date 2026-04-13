"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import BaseTeacherContainer from "../Base/BaseTeacherContainer";
import BaseLoading from "../Base/BaseLoading";
import StudyDateFormModal from "./StudyDateFormModal";
import StudyDateDeleteModal from "./StudyDateDeleteModal";

import {
  deleteStudyDate,
  getStudyDate,
  updateStudyDate,
  type StudyDate,
  type StudyDateBE,
} from "@/hooks/study_dates/getStudyDates";
import { getParticipantCountByStudyDate } from "@/hooks/study_date_participant/getStudyDateParticipant";
import { getMessagesByStudyDate } from "@/hooks/message/getMessage";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";
import { getCoursesByInstructor } from "@/hooks/course_instructors/getCourseInstructor";

type Props = {
  mode?: "teaching" | "mine";
};

type StudyDateFormValues = {
  title: string;
  location: string;
  scheduledAt: string;
  courseId: string;
};

function toViewModel(item: StudyDateBE): StudyDate {
  return {
    id: item.id,
    title: item.title ?? "",
    location: item.location ?? "",
    scheduledAt: item.scheduled_at ?? "",
    courseId: item.course_id ?? "",
    createdBy: item.created_by ?? "",
  };
}

function toInputDateTime(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

export default function TeacherStudyDateDetailContainer({
  mode = "teaching",
}: Props) {
  const params = useParams();
  const router = useRouter();
  const { user } = useCurrentUser();
  const { coursesMap, loading: loadingCourses } = useCoursesMap();

  const studyDateId = params.id as string;
  const isMineMode = mode === "mine";

  const [studyDate, setStudyDate] = useState<StudyDateBE | null>(null);
  const [courseIds, setCourseIds] = useState<string[]>([]);
  const [participantCount, setParticipantCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadDetail() {
      if (!studyDateId || !user?.id) return;

      try {
        setLoading(true);

        const [studyDateRes, instructorCourses, participantTotal, messages] =
          await Promise.all([
            getStudyDate(studyDateId),
            getCoursesByInstructor(user.id),
            getParticipantCountByStudyDate(studyDateId),
            getMessagesByStudyDate(studyDateId),
          ]);

        if (!active) return;

        const ownedCourseIds = instructorCourses.map((item) => item.course_id);
        setCourseIds(ownedCourseIds);

        if (!ownedCourseIds.includes(studyDateRes.course_id)) {
          router.push(isMineMode ? "/teacher/my/study_dates" : "/teacher/study_dates");
          return;
        }

        if (isMineMode && studyDateRes.created_by !== user.id) {
          router.push("/teacher/my/study_dates");
          return;
        }

        setStudyDate(studyDateRes);
        setParticipantCount(participantTotal);
        setMessageCount(messages.length);
      } catch (error) {
        console.error("Load study date detail failed:", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadDetail();

    return () => {
      active = false;
    };
  }, [isMineMode, router, studyDateId, user?.id]);

  const handleUpdate = async (values: StudyDateFormValues) => {
    if (!studyDate?.id) return;

    try {
      setEditing(true);
      await updateStudyDate(studyDate.id, {
        course_id: values.courseId,
        title: values.title,
        location: values.location,
        scheduled_at: new Date(values.scheduledAt).toISOString(),
      });

      const refreshed = await getStudyDate(studyDate.id);
      setStudyDate(refreshed);
      setOpenEdit(false);
    } catch (error) {
      console.error("Update study date failed:", error);
    } finally {
      setEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!studyDate?.id) return;

    try {
      setDeleting(true);
      await deleteStudyDate(studyDate.id);
      router.push("/teacher/my/study_dates");
    } catch (error) {
      console.error("Delete study date failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading || loadingCourses) {
    return (
      <BaseTeacherContainer
        title="Study date detail"
        description="Dang tai chi tiet study date"
      >
        <BaseLoading />
      </BaseTeacherContainer>
    );
  }

  if (!studyDate) {
    return (
      <BaseTeacherContainer
        title="Study date detail"
        description="Khong tim thay study date"
      >
        <div className="rounded-2xl border border-dashed border-emerald-700 p-8 text-gray-300">
          Study date khong ton tai hoac khong nam trong teaching scope cua ban.
        </div>
      </BaseTeacherContainer>
    );
  }

  const model = toViewModel(studyDate);
  const isOwner = studyDate.created_by === user?.id;
  const courseTitle = coursesMap[model.courseId]?.title;
  const courseOptions = Object.values(coursesMap)
    .filter((course) => courseIds.includes(course.id))
    .map((course) => ({ id: course.id, title: course.title }));

  const stats = [
    { label: "Participants", value: participantCount },
    { label: "Messages", value: messageCount },
    { label: "Ownership", value: isOwner ? "Mine" : "Teaching view" },
    { label: "Mode", value: isMineMode ? "My study dates" : "Study dates" },
  ];

  const workflowSteps = isOwner
    ? [
        "1. Review the schedule and course context",
        "2. Edit the study date if time or location changes",
        "3. Monitor participation and message activity",
        "4. Delete the study date if the session is no longer valid",
      ]
    : [
        "1. Review the session inside your teaching scope",
        "2. Check course, schedule and activity",
        "3. Return to My study dates for sessions you created",
        "4. Use this page as a teaching reference",
      ];

  return (
    <>
      <BaseTeacherContainer
        title={model.title || "Study date detail"}
        description="Theo doi session, cap nhat thong tin va xu ly workflow cua study date."
      >
        <div className="space-y-8">
          <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-emerald-700 bg-emerald-900/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Session workflow
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-cyan-200">
                {isOwner ? "Manage this study date like a working session" : "Read the session like course context"}
              </h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {workflowSteps.map((step) => (
                  <div
                    key={step}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-emerald-100/85"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-slate-900/70 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/60">
                    {item.label}
                  </p>
                  <p className="mt-4 text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Overview
              </p>
              <div className="mt-4 space-y-4 text-sm text-emerald-100/85">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/60">
                    Course
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {courseTitle || "Khong xac dinh"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/60">
                    Location
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {model.location || "Chua co dia diem"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/60">
                    Schedule
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {model.scheduledAt
                      ? new Date(model.scheduledAt).toLocaleString()
                      : "Chua co lich"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Actions
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-emerald-100/85">
                  <p className="font-semibold text-white">Current route</p>
                  <p className="mt-2">
                    {isMineMode
                      ? "This detail belongs to My study dates."
                      : "This detail belongs to your teaching study dates."}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-emerald-100/85">
                  <p className="font-semibold text-white">Ownership</p>
                  <p className="mt-2">
                    {isOwner
                      ? "You created this session and can edit or delete it."
                      : "You can review this session because it belongs to a course you teach."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {isOwner ? (
                    <>
                      <button
                        onClick={() => setOpenEdit(true)}
                        className="rounded-lg border border-cyan-500 px-4 py-2 text-cyan-200 hover:bg-cyan-600 hover:text-white"
                      >
                        Sua study date
                      </button>
                      <button
                        onClick={() => setOpenDelete(true)}
                        className="rounded-lg border border-red-500 px-4 py-2 text-red-300 hover:bg-red-500 hover:text-white"
                      >
                        Xoa study date
                      </button>
                    </>
                  ) : null}

                  <button
                    onClick={() =>
                      router.push(
                        isMineMode
                          ? "/teacher/my/study_dates"
                          : "/teacher/study_dates"
                      )
                    }
                    className="rounded-lg border px-4 py-2 text-white hover:bg-white/5"
                  >
                    Quay lai danh sach
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </BaseTeacherContainer>

      <StudyDateFormModal
        key={`detail-edit-${model.id}-${openEdit ? "open" : "closed"}`}
        open={openEdit}
        loading={editing}
        title="Cap nhat study date"
        submitText="Luu thay doi"
        courses={courseOptions}
        initialValues={{
          title: studyDate.title ?? "",
          location: studyDate.location ?? "",
          scheduledAt: toInputDateTime(studyDate.scheduled_at),
          courseId: studyDate.course_id ?? "",
        }}
        onConfirm={handleUpdate}
        onClose={() => setOpenEdit(false)}
      />

      <StudyDateDeleteModal
        open={openDelete}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setOpenDelete(false)}
      />
    </>
  );
}
