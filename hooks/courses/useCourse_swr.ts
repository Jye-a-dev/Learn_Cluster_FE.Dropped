import useSWR from "swr";
import {
  getCourse,
  getCourses,
  Course,
  CourseQuery,
} from "@/hooks/courses/getCourse";

/* =======================
   SINGLE COURSE
======================= */
export function useCourseDetail(courseId?: string) {
  const { data, isLoading, error, mutate } = useSWR<Course>(
    courseId ? ["course", courseId] : null,
    () => getCourse(courseId!)
  );

  return {
    course: data,
    isLoading,
    isError: !!error,
    mutate,
  };
}

/* =======================
   LIST COURSE
======================= */
export function useCourses(query?: CourseQuery) {
  const { data, isLoading, error, mutate } = useSWR<Course[]>(
    ["courses", query],
    () => getCourses(query)
  );

  return {
    courses: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  };
}