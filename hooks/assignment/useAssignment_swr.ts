"use client";

import useSWR from "swr";

import { getAssignments, getAssignment, countAssignments, AssignmentQuery } from "./getAssignment";

/* =========================
   FETCHER
========================= */
const fetchAssignments = (_: string, query?: AssignmentQuery) => getAssignments(query);

const fetchAssignment = (_: string, id: string) => getAssignment(id);

const fetchByCourse = (_: string, courseId: string) => getAssignments({ course_id: courseId });

const fetchCount = (_: string, courseId?: string) => countAssignments(courseId);

/* =========================
   GET LIST
========================= */
export function useAssignments(query?: AssignmentQuery) {
	const { data, isLoading, error, mutate } = useSWR(["assignments", query], ([, q]) => fetchAssignments("assignments", q));

	return {
		assignments: data ?? [],
		isLoading,
		error,
		mutate,
	};
}

/* =========================
   GET DETAIL
========================= */
export function useAssignmentDetail(id?: string) {
	const { data, isLoading, error, mutate } = useSWR(id ? ["assignment", id] : null, ([, id]) => fetchAssignment("assignment", id));

	return {
		assignment: data ?? null,
		isLoading,
		error,
		mutate,
	};
}

/* =========================
   COUNT
========================= */
export function useAssignmentCount(courseId?: string) {
	const { data, isLoading, error, mutate } = useSWR(["assignment-count", courseId], ([, id]) => fetchCount("assignment-count", id));

	return {
		total: data ?? 0,
		isLoading,
		error,
		mutate,
	};
}

export function useAssignmentsByCourse(courseId?: string) {
	const { data, isLoading, error, mutate } = useSWR(courseId ? ["assignments-by-course", courseId] : null, ([, id]) =>
		fetchByCourse("assignments-by-course", id),
	);

	return {
		assignments: data ?? [],
		isLoading,
		error,
		mutate,
	};
}
