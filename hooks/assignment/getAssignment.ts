// src/hooks/assignment/getAssignment.ts
import api from "@/hooks/api";

/* ===================== BE MODEL ===================== */
export interface AssignmentBE {
	id: string;
	course_id: string;
	title?: string | null;
	description?: string | null;
	file_url?: string | null;
	deadline?: string | null;
}

/* ===================== QUERY ===================== */
export interface AssignmentQuery {
	course_id?: string;
	page?: number;
	limit?: number;
	keyword?: string;
}

/* ===================== GET ===================== */

/** GET /api/assignment */
export async function getAssignments(
	query?: AssignmentQuery
): Promise<AssignmentBE[]> {
	const res = await api.get<AssignmentBE[]>("/assignment", {
		params: query,
	});
	return res.data ?? [];
}

/** GET /api/assignment/:id */
export async function getAssignment(
	id: string
): Promise<AssignmentBE> {
	const res = await api.get<AssignmentBE>(`/assignment/id/${id}`);
	return res.data;
}

/** GET /api/assignment/count */
export async function countAssignments(
	course_id?: string
): Promise<number> {
	const res = await api.get<{ total: number }>(
		"/assignment/count",
		{ params: { course_id } }
	);
	return res.data.total;
}

/* ===================== MUTATION ===================== */

/** POST /api/assignment */
export async function createAssignment(
	body: Omit<AssignmentBE, "id" | "created_at">
): Promise<string> {
	const res = await api.post<{ id: string }>(
		"/assignment",
		body
	);
	return res.data.id;
}

/** PUT /api/assignment/:id */
export async function updateAssignment(
	id: string,
	body: Partial<Omit<AssignmentBE, "id" | "course_id">>
): Promise<void> {
	await api.put(`/assignment/id/${id}`, body);
}

/** DELETE /api/assignment/:id */
export async function deleteAssignment(
	id: string
): Promise<void> {
	await api.delete(`/assignment/id/${id}`);
}

/** DELETE /api/assignment/course/:courseId */
export async function deleteAssignmentsByCourse(
	courseId: string
): Promise<void> {
	await api.delete(`/assignment/course/${courseId}`);
}
