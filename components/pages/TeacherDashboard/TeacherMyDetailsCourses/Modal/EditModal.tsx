import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";

import StudentsManager from "@/components/pages/TeacherDashboard/TeacherMyDetailsCourses/Manager/StudentsManager";
import ChaptersManager from "@/components/pages/TeacherDashboard/TeacherMyDetailsCourses/Manager/ChaptersManager";
import AssignmentsManager from "@/components/pages/TeacherDashboard/TeacherMyDetailsCourses/Manager/AssignmentsManager";
import { AssignmentBE } from "@/hooks/assignment/getAssignment";
import { Enrollment } from "@/hooks/enrollment/getEnrollment";
import { Chapter } from "@/hooks/chapters/getChapters";

type Props = {
  open: boolean;
  courseId: string;
  students: Enrollment[];
  assignments: AssignmentBE[];
  chapters: Chapter[];
  onClose: () => void;
};

export default function EditModal({
  open,
  courseId,
  students,
  assignments,
  chapters,
  onClose,
}: Props) {

  return (
    <BaseTeacherModal
      open={open}
      title="Edit Course"
      width="w-205"
      onClose={onClose}
    >

      <div className="grid grid-cols-3 gap-6">

        <StudentsManager
          courseId={courseId}
          students={students}
        />

        <ChaptersManager
          courseId={courseId}
          chapters={chapters}
        />

        <AssignmentsManager
          courseId={courseId}
          assignments={assignments}
        />

      </div>

    </BaseTeacherModal>
  );
}