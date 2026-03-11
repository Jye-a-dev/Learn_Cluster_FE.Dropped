"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Course, getCourse } from "@/hooks/courses/getCourse";
import { CourseInstructor, getInstructorsByCourse }
  from "@/hooks/course_instructors/getCourseInstructor";
import { Enrollment, getStudentsByCourse }
  from "@/hooks/enrollment/getEnrollment";
import { Chapter, getChapters } from "@/hooks/chapters/getChapters";

import BaseTeacherContainer from "../Base/BaseTeacherContainer";

import CourseHeader from "./IdHeader";
import CourseChapterList from "./Lists/IdCourseChapterList";
import CourseLoading from "./IdLoading";

import InstructorModal from "./Modal/IdInstructorModal";
import StudentModal from "./Modal/IdStudentModal";
import EditModal from "./Modal/EditModal";
import ManageContentModal from "./Modal/ManageContentModal";

export default function TeacherMyCourseDetailContainer() {

  const params = useParams();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Enrollment[]>([]);
  const [instructors, setInstructors] = useState<CourseInstructor[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const [loading, setLoading] = useState(true);

  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openInstructorModal, setOpenInstructorModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openManageModal, setOpenManageModal] = useState(false);

  useEffect(() => {

    if (!courseId) return;

    const fetchData = async () => {

      try {

        const [
          courseRes,
          instructorRes,
          studentRes,
          chapterRes
        ] = await Promise.all([
          getCourse(courseId),
          getInstructorsByCourse(courseId),
          getStudentsByCourse(courseId),
          getChapters({ course_id: courseId }),
        ]);

        setCourse(courseRes);
        setInstructors(instructorRes);
        setStudents(studentRes);
        setChapters(chapterRes);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

    };

    fetchData();

  }, [courseId]);

  if (loading) return <CourseLoading />;

  if (!course) {
    return (
      <div className="text-center text-gray-500">
        Course not found
      </div>
    );
  }

  return (
    <BaseTeacherContainer
      title={course.title}
      description="Quản lý nội dung và thành viên khóa học"
    >

      <div className="space-y-8">

        <CourseHeader
          course={course}
          onOpenInstructors={() => setOpenInstructorModal(true)}
          onOpenStudents={() => setOpenStudentModal(true)}
          onOpenEdit={() => setOpenEditModal(true)}
          onOpenManage={() => setOpenManageModal(true)}
        />

        <CourseChapterList courseId={courseId} />

      </div>

      <InstructorModal
        open={openInstructorModal}
        instructors={instructors}
        onClose={() => setOpenInstructorModal(false)}
      />

      <StudentModal
        open={openStudentModal}
        students={students}
        onClose={() => setOpenStudentModal(false)}
      />

      <EditModal
        open={openEditModal}
        courseId={courseId}
        students={students}
        chapters={chapters}
        onClose={() => setOpenEditModal(false)}
      />

      <ManageContentModal
        open={openManageModal}
        course={course}
        onClose={() => setOpenManageModal(false)}
        onUpdated={(updated) => setCourse(updated)}
      />

    </BaseTeacherContainer>
  );

}