"use client";

import { SubmissionBE } from "@/hooks/submission/getSubmission";
import { useUsersMap } from "@/hooks/users/useUsersMap";

type Props = {
  submission: SubmissionBE;
};

export default function SubmissionInfo({ submission }: Props) {
  const { usersMap } = useUsersMap();

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-white/60">
        <p className="text-sm text-gray-500">Student</p>
        <p className="text-lg font-semibold">
          {usersMap[submission.student_id]?.username ||
            submission.student_id}
        </p>
      </div>

      {submission.file_url && (
        <div className="p-4 rounded-xl bg-white/60">
          <p className="text-sm text-gray-500">File</p>
          <a href={submission.file_url} target="_blank">
            Open file
          </a>
        </div>
      )}

      {submission.text_submission && (
        <div className="p-4 rounded-xl bg-white/60">
          <p className="text-sm text-gray-500">Text</p>
          <p>{submission.text_submission}</p>
        </div>
      )}
    </div>
  );
}