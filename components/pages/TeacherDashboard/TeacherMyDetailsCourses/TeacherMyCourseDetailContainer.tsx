"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Course, getCourse } from "@/hooks/courses/getCourse";
import {
  CourseInstructor,
  getInstructorsByCourse,
  deleteCourseInstructor,
} from "@/hooks/course_instructors/getCourseInstructor";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { Enrollment, getStudentsByCourse } from "@/hooks/enrollment/getEnrollment";
import { Chapter, getChaptersByCourse } from "@/hooks/chapters/getChapters";

import BaseTeacherContainer from "../Base/BaseTeacherContainer";

import CourseHeader from "./Header";
import CourseChapterList from "./Lists/CourseChapterList";
import BaseLoading from "../Base/BaseLoading";

import {
  AssignmentBE,
  getAssignments,
} from "@/hooks/assignment/getAssignment";
import IdCourseAssignmentList from "./Lists/CourseAssignmentList";

import InstructorModal from "./Modal/InstructorModal";
import StudentModal from "./Modal/StudentModal";
import EditModal from "./Modal/EditModal";
import ManageContentModal from "./Modal/ManageContentModal";

/* =====================================
   Container
===================================== */
export default function TeacherMyCourseDetailContainer() {
  const params = useParams();
  const router = useRouter();

  const courseId = params.id as string;

  const [assignments, setAssignments] = useState<AssignmentBE[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Enrollment[]>([]);
  const [instructors, setInstructors] = useState<CourseInstructor[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const [loading, setLoading] = useState(true);

  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openInstructorModal, setOpenInstructorModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openManageModal, setOpenManageModal] = useState(false);

  const { user: currentUser } = useCurrentUser();

  /* =====================================
     FETCH DATA
  ===================================== */
  useEffect(() => {
    if (!courseId) return;

    const fetchData = async () => {
      try {
        const [
          courseRes,
          instructorRes,
          studentRes,
          chapterRes,
          assignmentRes, // ✅ thêm
        ] = await Promise.all([
          getCourse(courseId),
          getInstructorsByCourse(courseId),
          getStudentsByCourse(courseId),
          getChaptersByCourse(courseId),
          getAssignments({ course_id: courseId }), // ✅ thêm
        ]);

        setCourse(courseRes);
        setInstructors(instructorRes);
        setStudents(studentRes);
        setChapters(chapterRes);
        setAssignments(assignmentRes); // ✅ thêm
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  /* =====================================
     EXIT COURSE
  ===================================== */
  async function handleExitCourse() {
    if (!currentUser) return;

    const myInstructor = instructors.find(
      (i) => i.user_id === currentUser.id
    );

    if (!myInstructor) return;

    try {
      await deleteCourseInstructor(myInstructor.id);
      router.push("/teacher/courses/my");
    } catch (err) {
      console.error(err);
    }
  }

  /* =====================================
     LOADING
  ===================================== */
  if (loading) return <BaseLoading />;

  if (!course) {
    return (
      <div className="text-center text-gray-500">
        Course not found
      </div>
    );
  }

  /* =====================================
     UI
  ===================================== */
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
          onExit={handleExitCourse}
        />

        {/* CHAPTER */}
        <CourseChapterList courseId={courseId} />

        {/* ✅ ASSIGNMENT */}
        <IdCourseAssignmentList
          courseId={courseId}
          assignments={assignments}
        />
      </div>

      {/* Instructor Modal */}
      <InstructorModal
        open={openInstructorModal}
        instructors={instructors}
        onClose={() => setOpenInstructorModal(false)}
      />

      {/* Student Modal */}
      <StudentModal
        open={openStudentModal}
        students={students}
        onClose={() => setOpenStudentModal(false)}
      />

      {/* Edit Modal */}
      <EditModal
        open={openEditModal}
        courseId={courseId}
        students={students}
        assignments={assignments}
        chapters={chapters}
        onClose={() => setOpenEditModal(false)}
      />

      {/* Manage Content Modal */}
      <ManageContentModal
        open={openManageModal}
        course={course}
        onClose={() => setOpenManageModal(false)}
        onUpdated={(updated) => setCourse(updated)}
      />
    </BaseTeacherContainer>
  );
}