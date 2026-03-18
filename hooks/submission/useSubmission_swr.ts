"use client";

import useSWR from "swr";
import {
  getSubmission,
  getSubmissionsByAssignment,
  countSubmissionsByAssignment,
  SubmissionBE,
} from "./getSubmission";

/* =========================
   FETCHER
========================= */

const fetchSubmission = (_: string, id: string) => getSubmission(id);

const fetchSubmissionsByAssignment = (_: string, assignmentId: string) =>
  getSubmissionsByAssignment(assignmentId);

const fetchCountByAssignment = (_: string, assignmentId: string) =>
  countSubmissionsByAssignment(assignmentId);

/* =========================
   GET LIST
========================= */
export function useSubmissionList(assignmentId?: string) {
  const { data, isLoading, error, mutate } = useSWR(
    assignmentId ? ["submissions-by-assignment", assignmentId] : null,
    ([, id]) => fetchSubmissionsByAssignment("submissions-by-assignment", id)
  );

  return {
    submissions: data ?? [] as SubmissionBE[],
    isLoading,
    error,
    mutate,
  };
}

/* =========================
   GET DETAIL
========================= */
export function useSubmissionDetail(id?: string) {
  const { data, isLoading, error, mutate } = useSWR(
    id ? ["submission", id] : null,
    ([, id]) => fetchSubmission("submission", id)
  );

  return {
    submission: data ?? null as SubmissionBE | null,
    isLoading,
    error,
    mutate,
  };
}

/* =========================
   COUNT
========================= */
export function useSubmissionCount(assignmentId?: string) {
  const { data, isLoading, error, mutate } = useSWR(
    assignmentId ? ["submission-count", assignmentId] : null,
    ([, id]) => fetchCountByAssignment("submission-count", id)
  );

  return {
    total: data ?? 0,
    isLoading,
    error,
    mutate,
  };
}