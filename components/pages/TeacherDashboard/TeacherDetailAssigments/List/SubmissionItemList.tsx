"use client";

import BaseTeacherList from "@/components/pages/TeacherDashboard/Base/BaseTeacherList";
import { SubmissionBE } from "@/hooks/submission/getSubmission";
import { useUsersMap } from "@/hooks/users/useUsersMap";

type Props = {
  submission: SubmissionBE;
};

export default function SubmissionItemList({ submission }: Props) {
  const { usersMap, loading } = useUsersMap();

  const items = [
    {
      label: "Text Submission",
      value: submission.text_submission || "No text submitted",
    },
    {
      label: "File URL",
      value: submission.file_url ? (
        <a
          href={submission.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate text-blue-600 hover:underline"
          title={submission.file_url}
        >
          {submission.file_url}
        </a>
      ) : (
        "No file"
      ),
    },
    {
      label: "Submitted At",
      value: submission.submitted_at
        ? new Date(submission.submitted_at).toLocaleString()
        : "Not submitted",
    },
    {
      label: "Student",
      value: loading
        ? "Loading..."
        : usersMap[submission.student_id]?.username || "Unknown student",
    },
  ];

  return (
    <BaseTeacherList
          layout="grid"
          items={items} // bỏ title nếu không muốn hiển thị
          emptyText="No data"
          renderItem={(item) => (
              <div className="flex flex-col gap-2 w-full rounded-xl p-4 border border-gray-200 bg-white/60">
                  <div className="text-sm text-gray-500">{item.label}</div>
                  <div className="font-medium text-gray-800 wrap-break-word">{item.value}</div>
              </div>
          )} title={""}    />
  );
}