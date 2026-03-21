"use client";

import BaseTeacherList from "@/components/pages/TeacherDashboard/Base/BaseTeacherList";
import { StudyDateBE } from "@/hooks/study_dates/getStudyDates";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";
import Link from "next/link";

type Props = {
  studyDate: StudyDateBE;
};

export default function TeacherStudyDateList({ studyDate }: Props) {
  const { usersMap, loading: loadingUsers } = useUsersMap();
  const { coursesMap, loading: loadingCourses } = useCoursesMap();

  const course = coursesMap[studyDate.course_id];
  const creator = studyDate.created_by
    ? usersMap[studyDate.created_by]
    : null;

  const items = [
    {
      label: "Course",
      value: loadingCourses
        ? "Loading..."
        : course?.title || "Unknown",
    },
    {
      label: "Title",
      value: studyDate.title || "Untitled",
    },
    {
      label: "Time",
      value: studyDate.scheduled_at
        ? new Date(studyDate.scheduled_at).toLocaleString()
        : "Not set",
    },
    {
      label: "Location",
      value: studyDate.location || "Not set",
    },
    {
      label: "Created by",
      value: loadingUsers
        ? "Loading..."
        : creator?.username || creator?.email || "Unknown",
    },
  ];

  return (
    <div className="space-y-4">
      <BaseTeacherList
        layout="grid"
        items={items}
        emptyText="No data"
        renderItem={(item) => (
          <div className="flex flex-col gap-2 w-full rounded-xl p-4 border border-gray-200 bg-white/60">
            <div className="text-sm text-gray-500">{item.label}</div>
            <div className="font-medium text-gray-800 wrap-break-word">
              {item.value}
            </div>
          </div>
        )}
        title={"Study Date"}
      />

      <div className="flex justify-end">
        <Link
          href={`/teacher/study-date/${studyDate.id}`}
          className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
        >
          View Detail
        </Link>
      </div>
    </div>
  );
}