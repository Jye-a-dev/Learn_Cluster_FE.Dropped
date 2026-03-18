"use client";

import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";
import InstructorList from "../Lists/InstructorList";
import { CourseInstructor } from "@/hooks/course_instructors/getCourseInstructor";

type Props = {
  open: boolean;
  instructors: CourseInstructor[];
  onClose: () => void;
};

export default function InstructorModal({
  open,
  instructors,
  onClose,
}: Props) {

  return (
    <BaseTeacherModal
      open={open}
      title="Course Instructors"
      onClose={onClose}
    >

      <InstructorList instructors={instructors} />

    </BaseTeacherModal>
  );
}