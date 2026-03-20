"use client";

import BaseTeacherList from "@/components/pages/TeacherDashboard/Base/BaseTeacherList";
import { SubmissionBE } from "@/hooks/submission/getSubmission";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Grade, getGradesBySubmission } from "@/hooks/grade/getGrade";

type Props = {
  submission: SubmissionBE;
};

export default function SubmissionItemList({ submission }: Props) {
  const { usersMap, loading } = useUsersMap();
  const [grade, setGrade] = useState<Grade | null>(null);
  const [loadingGrade, setLoadingGrade] = useState(true);

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const res = await getGradesBySubmission(submission.id);
        setGrade(res[0] || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingGrade(false);
      }
    };

    fetchGrade();
  }, [submission.id]);

  const items = [
    {
      label: "Student",
      value: loading
        ? "Loading..."
        : usersMap[submission.student_id]?.username || "Unknown student",
    },
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
      label: "Score",
      value: loadingGrade
        ? "Loading..."
        : grade?.score !== null && grade?.score !== undefined
          ? grade.score
          : "Not graded",
    },
    {
      label: "Feedback",
      value: loadingGrade
        ? "Loading..."
        : grade?.feedback || "No feedback",
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

            {/* Text + truncate */}
            <div
              className={`font-medium text-gray-800 ${item.label === "Text Submission"
                ? "line-clamp-2"
                : "wrap-break-word"
                }`}
              title={
                item.label === "Text Submission"
                  ? submission.text_submission ?? undefined
                  : undefined
              }
            >
              {item.value}
            </div>
          </div>
        )}
        title={"Submission"}
      />

      {/* Button xem chi tiết */}
      <div className="flex justify-end">
        <Link
          href={`/teacher/submission/${submission.id}`}
          className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
        >
          Xem & chấm điểm
        </Link>
      </div>
    </div>
  );
}