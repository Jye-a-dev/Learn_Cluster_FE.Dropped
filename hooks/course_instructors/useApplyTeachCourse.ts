"use client";

import { useState } from "react";
import { addCourseInstructor } from "@/hooks/course_instructors/getCourseInstructor";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";

export function useApplyTeachCourse() {
  const { user } = useCurrentUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function applyTeach(course_id: string) {
    if (!user?.id) {
      setError("Bạn chưa đăng nhập");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      await addCourseInstructor({
        course_id,
        user_id: user.id,
        role_in_course: "Teacher",
      });

      return true;
    } catch (err) {
      console.error(err);
      setError("Không thể đăng ký giảng dạy");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    applyTeach,
    loading,
    error,
  };
}