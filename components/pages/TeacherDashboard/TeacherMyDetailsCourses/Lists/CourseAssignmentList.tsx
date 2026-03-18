"use client";

import { useRouter } from "next/navigation";

import BaseTeacherList from "@/components/pages/TeacherDashboard/Base/BaseTeacherList";
import { AssignmentBE } from "@/hooks/assignment/getAssignment";

type Props = {
  courseId: string; // ✅ thêm dòng này
  assignments: AssignmentBE[];
};

export default function IdCourseAssignmentList({ assignments }: Props) {

  const router = useRouter();

  const sorted = [...assignments].sort(
    (a, b) => (a.ordering ?? 0) - (b.ordering ?? 0)
  );

  return (
    <BaseTeacherList
      layout="grid"
      title="Bài tập"
      items={sorted}
      emptyText="No assignments"
      renderItem={(assignment) => (

        <div
          onClick={() => router.push(`/teacher/assignment/${assignment.id}`)}
          className="
            flex gap-4
            w-full
            hover:bg-emerald-700/20
            rounded-xl
            transition
            p-3
            cursor-pointer
            border border-gray-200
            h-full
          "
        >

          {/* ORDER */}


          {/* CONTENT */}
          <div className="flex-1">

            <div className="font-medium text-gray-700">
              {assignment.title || "Untitled"}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              {assignment.deadline
                ? new Date(assignment.deadline).toLocaleDateString()
                : "No deadline"}
            </div>

          </div>

        </div>

      )}
    />
  );
}