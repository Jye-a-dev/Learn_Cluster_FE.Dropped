"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import BaseTeacherContainer from "../Base/BaseTeacherContainer";
import BaseLoading from "../Base/BaseLoading";
import StudyDateFormModalV2 from "./StudyDateFormModalV2";
import StudyDateDeleteModalV2 from "./StudyDateDeleteModalV2";

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

export default function TeacherStudyDateDetailContainerV2({
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
        console.error("Tải chi tiết study date thất bại:", error);
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
      console.error("Cập nhật study date thất bại:", error);
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
      console.error("Xóa study date thất bại:", error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading || loadingCourses) {
    return (
      <BaseTeacherContainer
        title="Chi tiết study date"
        description="Đang tải chi tiết study date"
      >
        <BaseLoading />
      </BaseTeacherContainer>
    );
  }

  if (!studyDate) {
    return (
      <BaseTeacherContainer
        title="Chi tiết study date"
        description="Không tìm thấy study date"
      >
        <div className="rounded-2xl border border-dashed border-emerald-700 p-8 text-gray-300">
          Study date không tồn tại hoặc không nằm trong phạm vi giảng dạy của bạn.
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
    { label: "Người tham gia", value: participantCount },
    { label: "Tin nhắn", value: messageCount },
    { label: "Quyền sở hữu", value: isOwner ? "Của tôi" : "Chế độ giảng dạy" },
    { label: "Chế độ", value: isMineMode ? "Study date của tôi" : "Study date giảng dạy" },
  ];

  return (
    <>
      <BaseTeacherContainer
        title={model.title || "Chi tiết study date"}
        description="Theo dõi thông tin, tình trạng và các thao tác liên quan đến study date."
      >
        <div className="space-y-8">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Tổng quan
              </p>
              <div className="mt-4 space-y-4 text-sm text-emerald-100/85">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/60">
                    Khóa học
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {courseTitle || "Không xác định"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/60">
                    Địa điểm
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {model.location || "Chưa có địa điểm"}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/60">
                    Thời gian
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {model.scheduledAt
                      ? new Date(model.scheduledAt).toLocaleString()
                      : "Chưa có lịch"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Thao tác
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-emerald-100/85">
                  <p className="font-semibold text-white">Ngữ cảnh hiện tại</p>
                  <p className="mt-2">
                    {isMineMode
                      ? "Chi tiết này thuộc khu Study date của tôi."
                      : "Chi tiết này thuộc khu Study date giảng dạy của bạn."}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-emerald-100/85">
                  <p className="font-semibold text-white">Quyền thao tác</p>
                  <p className="mt-2">
                    {isOwner
                      ? "Bạn đã tạo study date này nên có thể chỉnh sửa hoặc xóa."
                      : "Bạn có thể xem study date này vì nó thuộc một khóa học bạn đang giảng dạy."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {isOwner ? (
                    <>
                      <button
                        onClick={() => setOpenEdit(true)}
                        className="rounded-lg border border-cyan-500 px-4 py-2 text-cyan-200 hover:bg-cyan-600 hover:text-white"
                      >
                        Sửa study date
                      </button>
                      <button
                        onClick={() => setOpenDelete(true)}
                        className="rounded-lg border border-red-500 px-4 py-2 text-red-300 hover:bg-red-500 hover:text-white"
                      >
                        Xóa study date
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
                    Quay lại danh sách
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </BaseTeacherContainer>

      <StudyDateFormModalV2
        key={`detail-edit-${model.id}-${openEdit ? "open" : "closed"}`}
        open={openEdit}
        loading={editing}
        title="Cập nhật study date"
        submitText="Lưu thay đổi"
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

      <StudyDateDeleteModalV2
        open={openDelete}
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setOpenDelete(false)}
      />
    </>
  );
}
