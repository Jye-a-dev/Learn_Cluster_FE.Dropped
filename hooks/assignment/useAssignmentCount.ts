// src/hooks/assignment/useAssignmentCount.ts
"use client";

import useSWR from "swr";
import { getAssignments } from "./getAssignment";

export function useAssignmentCount(courseId?: string) {
  const { data, isLoading, error } = useSWR(
    courseId ? ["assignment-count", courseId] : null,
    () => getAssignments({ course_id: courseId }) // ✅ filter tại đây
  );

  if (isLoading) return "...";
  if (error) return "!";

  return data?.length ?? 0; // ✅ đếm từ list
}