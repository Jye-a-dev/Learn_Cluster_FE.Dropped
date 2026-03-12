"use client";

import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";
import StudentList from "../Lists/IdStudentList";
import { Enrollment } from "@/hooks/enrollment/getEnrollment";

type Props = {
  open: boolean;
  students: Enrollment[];
  onClose: () => void;
};

export default function StudentModal({
  open,
  students,
  onClose,
}: Props) {

  return (
    <BaseTeacherModal
      open={open}
      title="Course Students"
      onClose={onClose}
    >

      <StudentList students={students} />

    </BaseTeacherModal>
  );
}