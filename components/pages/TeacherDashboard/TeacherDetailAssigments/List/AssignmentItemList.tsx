"use client";

import BaseTeacherList from "@/components/pages/TeacherDashboard/Base/BaseTeacherList";
import { AssignmentBE } from "@/hooks/assignment/getAssignment";

type Props = {
  assignment: AssignmentBE;
};

export default function AssignmentItemList({ assignment }: Props) {
  const items = [
    {
      label: "Description",
      value: assignment.description || "No description",
    },
    {
      label: "File URL",
      value: assignment.file_url ? (
        <a
          href={assignment.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate text-blue-600 hover:underline"
          title={assignment.file_url} // hover xem full link
        >
          {assignment.file_url}
        </a>
      ) : (
        "No file"
      ),
    },
    {
      label: "Deadline",
      value: assignment.deadline
        ? new Date(assignment.deadline).toLocaleString()
        : "No deadline",
    },
  ];

  return (
    <BaseTeacherList
      layout="grid"
      title="Thông tin bài tập"
      items={items}
      emptyText="No data"
      renderItem={(item) => (
        <div
          className="
            flex flex-col gap-2
            w-full
            rounded-xl
            p-4
            border border-gray-200
            bg-white/60
          "
        >
          {/* LABEL */}
          <div className="text-sm text-gray-500">{item.label}</div>

          {/* VALUE */}
          <div className="font-medium text-gray-800 wrap-break-word">
            {item.value}
          </div>
        </div>
      )}
    />
  );
}