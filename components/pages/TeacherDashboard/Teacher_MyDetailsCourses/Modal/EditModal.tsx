import BaseTeacherModal from "@/components/pages/TeacherDashboard/Base/BaseTeacherModal";

import StudentsManager from "@/components/pages/TeacherDashboard/Teacher_MyDetailsCourses/Manager/StudentsManager";
import ChaptersManager from "@/components/pages/TeacherDashboard/Teacher_MyDetailsCourses/Manager/ChaptersManager";

import { Enrollment } from "@/hooks/enrollment/getEnrollment";
import { Chapter } from "@/hooks/chapters/getChapters";

type Props = {
  open: boolean;
  courseId: string;
  students: Enrollment[];
  chapters: Chapter[];
  onClose: () => void;
};

export default function EditModal({
  open,
  courseId,
  students,
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

      <div className="grid grid-cols-2 gap-6">

        <StudentsManager
          courseId={courseId}
          students={students}
        />

        <ChaptersManager
          courseId={courseId}
          chapters={chapters}
        />

      </div>

    </BaseTeacherModal>
  );
}