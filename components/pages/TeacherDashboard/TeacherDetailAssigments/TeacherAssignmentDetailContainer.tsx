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
import SubmissionItemList from "./List/SubmissionItemList";
import { useUsersMap } from "@/hooks/users/useUsersMap";

export default function TeacherAssignmentDetailContainer() {
  const router = useRouter();
  const params = useParams();
  const assignmentId = params.id as string;

  const { submissions, isLoading: isLoadingSubmissions } =
    useSubmissionList(assignmentId);

  useUsersMap();

  const [openManage, setOpenManage] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { assignment, isLoading, mutate } =
    useAssignmentDetail(assignmentId);

  if (isLoading) return <BaseLoading />;

  if (!assignment) {
    return (
      <div className="text-center text-gray-500">
        Assignment not found
      </div>
    );
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

  return (
    <BaseTeacherContainer
      title={assignment.title || "Untitled"}
      description="Quản lý bài tập"
    >
      <div className="space-y-8">
        <AssignmentHeader
          assignment={assignment}
          onOpenEdit={() => setOpenEdit(true)}
          onOpenManage={() => setOpenManage(true)}
          onDelete={() => setDeleteOpen(true)}
        />

        <AssignmentItemList assignment={assignment} />

        {/* Submissions */}
        {!isLoadingSubmissions && submissions?.length > 0 && (
          <div className="space-y-6">
            {submissions.map((sub) => (
              <SubmissionItemList
                key={sub.id}
                submission={sub}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
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