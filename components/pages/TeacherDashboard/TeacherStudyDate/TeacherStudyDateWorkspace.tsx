"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import BaseTeacherContainer from "../Base/BaseTeacherContainer";
import TeacherStudyDateCard from "./TeacherStudyDateCard";
import StudyDateFormModal from "./StudyDateFormModal";
import StudyDateDetailModal from "./StudyDateDetailModal";
import StudyDateDeleteModal from "./StudyDateDeleteModal";

import {
  deleteStudyDate,
  getStudyDates,
  updateStudyDate,
  type StudyDate,
  type StudyDateBE,
} from "@/hooks/study_dates/getStudyDates";
import { useCreateStudyDateByTeacher } from "@/hooks/study_dates/useCreateStudyDateByTeacher";
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

function mapStudyDate(item: StudyDateBE): StudyDate {
  return {
    id: item.id,
    title: item.title ?? "",
    location: item.location ?? "",
    scheduledAt: item.scheduled_at ?? "",
    courseId: item.course_id ?? "",
    createdBy: item.created_by ?? "",
  };
}

function getTimeValue(value?: string | null) {
  const time = value ? new Date(value).getTime() : Number.NaN;
  return Number.isNaN(time) ? 0 : time;
}

function toInputDateTime(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
}

export default function TeacherStudyDateWorkspace({
  mode = "teaching",
}: Props) {
  const isMineMode = mode === "mine";
  const { user } = useCurrentUser();
  const { coursesMap, loading: loadingCourses } = useCoursesMap();
  const { create, loading: creating } = useCreateStudyDateByTeacher();

  const [studyDates, setStudyDates] = useState<StudyDateBE[]>([]);
  const [myCourseIds, setMyCourseIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [selectedStudyDate, setSelectedStudyDate] = useState<StudyDateBE | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const refreshData = useCallback(async (userId: string) => {
    const instructorCourses = await getCoursesByInstructor(userId);
    const courseIds = instructorCourses.map((item) => item.course_id);
    setMyCourseIds(courseIds);

    const rawStudyDates = await getStudyDates(
      isMineMode ? { created_by: userId, limit: 100 } : { limit: 100 }
    );

    const filteredStudyDates = isMineMode
      ? rawStudyDates
      : rawStudyDates.filter((item) => courseIds.includes(item.course_id));

    setStudyDates(
      [...filteredStudyDates].sort(
        (left, right) =>
          getTimeValue(left.scheduled_at) - getTimeValue(right.scheduled_at)
      )
    );
  }, [isMineMode]);

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      if (!user?.id) return;

      try {
        setLoading(true);
        await refreshData(user.id);
      } catch (error) {
        console.error("Load teacher study dates failed:", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    void bootstrap();

    return () => {
      active = false;
    };
  }, [refreshData, user?.id]);

  const courseOptions = Object.values(coursesMap)
    .filter((course) => myCourseIds.includes(course.id))
    .map((course) => ({ id: course.id, title: course.title }));

  const stats = useMemo(() => {
    const now = Date.now();
    const upcoming = studyDates.filter(
      (item) => getTimeValue(item.scheduled_at) >= now
    ).length;
    const past = studyDates.length - upcoming;
    const createdByMe = studyDates.filter(
      (item) => item.created_by === user?.id
    ).length;
    const courseCount = new Set(studyDates.map((item) => item.course_id)).size;

    return [
      {
        label: isMineMode ? "My sessions" : "Visible sessions",
        value: studyDates.length,
      },
      { label: "Upcoming", value: upcoming },
      { label: "Past", value: past },
      {
        label: isMineMode ? "Courses touched" : "Created by me",
        value: isMineMode ? courseCount : createdByMe,
      },
    ];
  }, [isMineMode, studyDates, user?.id]);

  const workflowSteps = isMineMode
    ? [
        "1. Chon mot course ban dang day",
        "2. Tao study date voi tieu de, lich va dia diem",
        "3. Mo chi tiet de sua lich khi can",
        "4. Xoa study date neu ke hoach thay doi",
      ]
    : [
        "1. Xem toan bo study date trong cac course ban day",
        "2. Nhan dien study date nao do chinh ban tao",
        "3. Mo chi tiet de sua hoac xoa study date cua minh",
        "4. Chuyen sang My study dates de thao tac tap trung",
      ];

  const pageTitle = isMineMode ? "My study dates" : "Study dates";
  const pageDescription = isMineMode
    ? "Quan ly cac study date do chinh ban tao cho nhung course dang day."
    : "Theo doi tat ca study date thuoc nhung course ban dang giang day.";

  const handleCreate = async (values: StudyDateFormValues) => {
    if (!user?.id) return;

    try {
      await create({
        title: values.title,
        location: values.location,
        scheduledAt: new Date(values.scheduledAt).toISOString(),
        courseId: values.courseId,
      });

      setOpenCreate(false);
      await refreshData(user.id);
    } catch (error) {
      console.error("Create study date failed:", error);
    }
  };

  const handleUpdate = async (values: StudyDateFormValues) => {
    if (!user?.id || !selectedStudyDate?.id) return;

    try {
      setSavingEdit(true);

      await updateStudyDate(selectedStudyDate.id, {
        course_id: values.courseId,
        title: values.title,
        location: values.location,
        scheduled_at: new Date(values.scheduledAt).toISOString(),
      });

      setOpenEdit(false);
      setSelectedStudyDate(null);
      await refreshData(user.id);
    } catch (error) {
      console.error("Update study date failed:", error);
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async () => {
    if (!user?.id || !selectedStudyDate?.id) return;

    try {
      setDeleting(true);
      await deleteStudyDate(selectedStudyDate.id);
      setOpenDelete(false);
      setSelectedStudyDate(null);
      await refreshData(user.id);
    } catch (error) {
      console.error("Delete study date failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  const selectedStudyDateModel = selectedStudyDate
    ? mapStudyDate(selectedStudyDate)
    : null;

  const isOwner = selectedStudyDate?.created_by === user?.id;

  return (
    <>
      <BaseTeacherContainer title={pageTitle} description={pageDescription}>
        <div className="mb-8 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-emerald-700 bg-emerald-900/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Workflow
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-cyan-200">
              {isMineMode
                ? "Teacher-owned session workflow"
                : "Teaching session workflow"}
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
                <p className="mt-4 text-4xl font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setOpenCreate(true)}
            disabled={courseOptions.length === 0}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Tao study date
          </button>

          <span
            className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
              isMineMode
                ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
            }`}
          >
            {isMineMode
              ? "Only sessions created by you"
              : "Sessions from your teaching courses"}
          </span>
        </div>

        {(loading || loadingCourses) && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-40 rounded-xl bg-emerald-900 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && studyDates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-emerald-700 p-8 text-gray-300">
            {courseOptions.length === 0
              ? "Ban chua co course nao de tao study date."
              : isMineMode
                ? "Ban chua tao study date nao."
                : "Chua co study date nao trong cac course ban dang day."}
          </div>
        ) : null}

        {!loading && studyDates.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {studyDates.map((item) => (
              <TeacherStudyDateCard
                key={item.id}
                studyDate={mapStudyDate(item)}
                courseTitle={coursesMap[item.course_id]?.title}
                onClick={() => setSelectedStudyDate(item)}
              />
            ))}
          </div>
        ) : null}
      </BaseTeacherContainer>

      <StudyDateFormModal
        key={`create-${openCreate ? "open" : "closed"}`}
        open={openCreate}
        loading={creating}
        title="Tao study date"
        submitText="Tao"
        courses={courseOptions}
        onConfirm={handleCreate}
        onClose={() => setOpenCreate(false)}
      />

      <StudyDateFormModal
        key={`edit-${selectedStudyDate?.id ?? "none"}-${openEdit ? "open" : "closed"}`}
        open={openEdit}
        loading={savingEdit}
        title="Cap nhat study date"
        submitText="Luu thay doi"
        courses={courseOptions}
        initialValues={
          selectedStudyDate
            ? {
                title: selectedStudyDate.title ?? "",
                location: selectedStudyDate.location ?? "",
                scheduledAt: toInputDateTime(selectedStudyDate.scheduled_at),
                courseId: selectedStudyDate.course_id ?? "",
              }
            : undefined
        }
        onConfirm={handleUpdate}
        onClose={() => setOpenEdit(false)}
      />

      {selectedStudyDateModel ? (
        <StudyDateDetailModal
          open={Boolean(selectedStudyDateModel)}
          studyDate={selectedStudyDateModel}
          courseTitle={coursesMap[selectedStudyDateModel.courseId]?.title}
          isOwner={Boolean(isOwner)}
          onEdit={() => setOpenEdit(true)}
          onDelete={() => setOpenDelete(true)}
          onClose={() => setSelectedStudyDate(null)}
        />
      ) : null}

      <StudyDateDeleteModal
        open={openDelete}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setOpenDelete(false)}
      />
    </>
  );
}
