"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EditAssignmentModal from "./Modal/EditAssignmentModal";
import DeleteModal from "./Modal/ConfirmDeleteModal";
import { useAssignmentDetail } from "@/hooks/assignment/useAssignment_swr";
import { deleteAssignment } from "@/hooks/assignment/getAssignment";
import { useSubmissionList } from "@/hooks/submission/useSubmission_swr";
import BaseTeacherContainer from "@/components/pages/TeacherDashboard/Base/BaseTeacherContainer";
import AssignmentHeader from "./AssignmentHeader";
import AssignmentItemList from "./List/AssignmentItemList";
import BaseLoading from "../Base/BaseLoading";
import ManageSubmissionModal from "./Modal/ManageSubmissionModal";
import BaseTeacherList from "@/components/pages/TeacherDashboard/Base/BaseTeacherList";
import { SubmissionBE } from "@/hooks/submission/getSubmission";
import { useUsersMap } from "@/hooks/users/useUsersMap";

export default function TeacherAssignmentDetailContainer() {
  const router = useRouter();
  const params = useParams();
  const assignmentId = params.id as string;

  const { submissions, isLoading: isLoadingSubmissions } = useSubmissionList(assignmentId);
  const { usersMap, loading: loadingUsers } = useUsersMap(); // <-- lấy users map

  const [openManage, setOpenManage] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { assignment, isLoading, mutate } = useAssignmentDetail(assignmentId);

  if (isLoading) return <BaseLoading />;

  if (!assignment) {
    return <div className="text-center text-gray-500">Assignment not found</div>;
  }

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      await deleteAssignment(assignment.id);
      setDeleteOpen(false);

      if (assignment.course_id) {
        router.push(`/teacher/courses/my/${assignment.course_id}`);
      } else {
        router.push(`/teacher/courses/my`);
      }
    } finally {
      setLoadingDelete(false);
    }
  };

  // Render 1 submission trực tiếp trong Container
  const SubmissionItem = ({ submission, index }: { submission: SubmissionBE; index: number }) => {
    const items = [
      { label: "Text Submission", value: submission.text_submission || "No text submitted" },
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
          : "Not submitted yet",
      },
      {
        label: "Student",
        value: loadingUsers
          ? "Loading..."
          : usersMap[submission.student_id]?.username || "Unknown student",
      },
    ];

    return (
      <BaseTeacherList
        layout="grid"
        title={`Submission #${index + 1}`}
        items={items}
        emptyText="No data"
        renderItem={(item) => (
          <div className="flex flex-col gap-2 w-full rounded-xl p-4 border border-gray-200 bg-white/60">
            <div className="text-sm text-gray-500">{item.label}</div>
            <div className="font-medium text-gray-800 wrap-break-word">{item.value}</div>
          </div>
        )}
      />
    );
  };

  return (
    <BaseTeacherContainer title={assignment.title || "Untitled"} description="Quản lý bài tập">
      <div className="space-y-8">
        <AssignmentHeader
          assignment={assignment}
          onOpenEdit={() => setOpenEdit(true)}
          onOpenManage={() => setOpenManage(true)}
          onDelete={() => setDeleteOpen(true)}
        />

        <AssignmentItemList assignment={assignment} />

        {/* Hiển thị danh sách submissions */}
        {!isLoadingSubmissions && submissions?.length > 0 && (
          <div className="space-y-6">
            {submissions.map((sub, index) => (
              <SubmissionItem key={sub.id} submission={sub} index={index} />
            ))}
          </div>
        )}
      </div>

      <EditAssignmentModal
        open={openEdit}
        assignment={assignment}
        onClose={() => setOpenEdit(false)}
        onUpdated={() => mutate()}
        onOpenDelete={() => setDeleteOpen(true)}
      />

      <ManageSubmissionModal
        open={openManage}
        assignmentId={assignment.id}
        courseId={assignment.course_id}
        onClose={() => setOpenManage(false)}
        onUpdated={() => mutate()}
      />

      <DeleteModal
        open={deleteOpen}
        message="Are you sure you want to delete this assignment?"
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={loadingDelete}
      />
    </BaseTeacherContainer>
  );
}