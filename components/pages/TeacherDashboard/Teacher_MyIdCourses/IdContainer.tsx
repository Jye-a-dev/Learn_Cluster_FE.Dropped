"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Course, getCourse } from "@/hooks/courses/getCourse";
import { CourseInstructor, getInstructorsByCourse } 
from "@/hooks/course_instructors/getCourseInstructor";

import CourseHeader from "./IdHeader";
import InstructorList from "./IdInstructorList";
import CourseLoading from "./IdLoading";

export default function TeacherMyCourseDetailContainer() {

  const params = useParams();
  const courseId = params.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [instructors, setInstructors] = useState<CourseInstructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!courseId) return;

    const fetchData = async () => {

      try {

        const [courseRes, instructorRes] = await Promise.all([
          getCourse(courseId),
          getInstructorsByCourse(courseId),
        ]);

        setCourse(courseRes);
        setInstructors(instructorRes);

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
    return <div className="text-center text-gray-500">Course not found</div>;
  }

  return (
    <div className="space-y-8">

      <CourseHeader course={course} />

      <InstructorList instructors={instructors} />

    </div>
  );
}