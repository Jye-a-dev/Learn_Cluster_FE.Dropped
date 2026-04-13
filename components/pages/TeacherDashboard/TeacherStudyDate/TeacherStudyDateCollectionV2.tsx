"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import BaseTeacherContainer from "../Base/BaseTeacherContainer";
import StudyDateFormModalV2 from "./StudyDateFormModalV2";
import StudyDateListCardV2 from "./StudyDateListCardV2";

import {
  getStudyDates,
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

function getTimeValue(value?: string | null) {
  const time = value ? new Date(value).getTime() : Number.NaN;
  return Number.isNaN(time) ? 0 : time;
}

export default function TeacherStudyDateCollectionV2({
  mode = "teaching",
}: Props) {
  const isMineMode = mode === "mine";
  const router = useRouter();
  const { user } = useCurrentUser();
  const { coursesMap, loading: loadingCourses } = useCoursesMap();
  const { create, loading: creating } = useCreateStudyDateByTeacher();

  const [studyDates, setStudyDates] = useState<StudyDateBE[]>([]);
  const [myCourseIds, setMyCourseIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);

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
        console.error("Tải danh sách study date thất bại:", error);
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
        label: isMineMode ? "Study date của tôi" : "Study date hiển thị",
        value: studyDates.length,
      },
      { label: "Sắp diễn ra", value: upcoming },
      { label: "Đã qua", value: past },
      {
        label: isMineMode ? "Số khóa học" : "Do tôi tạo",
        value: isMineMode ? courseCount : createdByMe,
      },
    ];
  }, [isMineMode, studyDates, user?.id]);

  const workflowSteps = isMineMode
    ? [
        "1. Chọn một khóa học bạn đang dạy",
        "2. Tạo study date với tiêu đề, lịch và địa điểm",
        "3. Bấm vào thẻ để mở trang chi tiết",
        "4. Sửa hoặc xóa study date ở trang chi tiết",
      ]
    : [
        "1. Xem toàn bộ study date trong các khóa học bạn dạy",
        "2. Bấm vào thẻ để mở trang chi tiết",
        "3. Study date do bạn tạo sẽ cho phép sửa và xóa",
        "4. Chuyển sang Study date của tôi để thao tác tập trung",
      ];

  const pageTitle = isMineMode ? "Study date của tôi" : "Study dates";
  const pageDescription = isMineMode
    ? "Quản lý các study date do chính bạn tạo cho những khóa học đang dạy."
    : "Theo dõi tất cả study date thuộc những khóa học bạn đang giảng dạy.";

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
      console.error("Tạo study date thất bại:", error);
    }
  };

  return (
    <>
      <BaseTeacherContainer title={pageTitle} description={pageDescription}>
        <div className="mb-8 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-emerald-700 bg-emerald-900/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Quy trình
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-cyan-200">
              {isMineMode
                ? "Quy trình quản lý study date của bạn"
                : "Quy trình theo dõi study date giảng dạy"}
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
            + Tạo study date
          </button>

          <span
            className={`rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
              isMineMode
                ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
            }`}
          >
            {isMineMode
              ? "Chỉ hiển thị study date do bạn tạo"
              : "Hiển thị study date trong các khóa học bạn dạy"}
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
              ? "Bạn chưa có khóa học nào để tạo study date."
              : isMineMode
                ? "Bạn chưa tạo study date nào."
                : "Chưa có study date nào trong các khóa học bạn đang dạy."}
          </div>
        ) : null}

        {!loading && studyDates.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {studyDates.map((item) => (
              <StudyDateListCardV2
                key={item.id}
                studyDate={{
                  id: item.id,
                  title: item.title ?? "",
                  location: item.location ?? "",
                  scheduledAt: item.scheduled_at ?? "",
                  courseId: item.course_id ?? "",
                  createdBy: item.created_by ?? "",
                }}
                courseTitle={coursesMap[item.course_id]?.title}
                onClick={() =>
                  router.push(
                    isMineMode
                      ? `/teacher/my/study_dates/${item.id}`
                      : `/teacher/study_dates/${item.id}`
                  )
                }
              />
            ))}
          </div>
        ) : null}
      </BaseTeacherContainer>

      <StudyDateFormModalV2
        key={`create-${openCreate ? "open" : "closed"}`}
        open={openCreate}
        loading={creating}
        title="Tạo study date"
        submitText="Tạo"
        courses={courseOptions}
        onConfirm={handleCreate}
        onClose={() => setOpenCreate(false)}
      />
    </>
  );
}
