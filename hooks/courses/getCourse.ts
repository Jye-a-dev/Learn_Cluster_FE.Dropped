import api from "@/hooks/api";
import { ReactNode } from "react";

/* =======================
   TYPE
======================= */
export interface Course {
    thumbnail: never;
	name: ReactNode;
	id: string; // UUID
	title: string;
	description?: string | null;
	objective?: string | null;
	duration_hours?: number | null;
	status: "draft" | "public" | "closed";
	created_at?: string;
	updated_at?: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddCoursePayload = {
	title: string;
	description?: string | null;
	objective?: string | null;
	duration_hours?: number | null;
	status?: "draft" | "public" | "closed";
};

export type UpdateCoursePayload = {
	title: string;
	description?: string | null;
	objective?: string | null;
	duration_hours?: number | null;
	status?: "draft" | "public" | "closed";
};

export type PatchCoursePayload = Partial<UpdateCoursePayload>;

/* =======================
   QUERY
======================= */
export type CourseQuery = {
	status?: "draft" | "public" | "closed";
	keyword?: string;
	search?: string;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/course
 * ======================================================= */
export async function getCourses(query?: CourseQuery): Promise<Course[]> {
	const params = query
		? {
			status: query.status,
			page: query.page,
			limit:
				typeof query.limit === "number"
					? Math.min(Math.max(query.limit, 1), 100)
					: undefined,
			search: query.search ?? query.keyword,
		}
		: undefined;

	const res = await api.get<Course[]>("/course", { params });
	return res.data ?? [];
}

/* =========================================================
 * GET /api/course/count
 * ======================================================= */
export async function getCourseCount(): Promise<number> {
	const res = await api.get<{ total: number }>("/course/count");
	return res.data?.total ?? 0;
}

/* =========================================================
 * GET /api/course/:id
 * ======================================================= */
export async function getCourse(id: string): Promise<Course> {
	const res = await api.get<Course>(`/course/id/${id}`);
	return res.data;
}

/* =========================================================
 * POST /api/course
 * ======================================================= */
export async function addCourse(payload: AddCoursePayload): Promise<Course> {
	const res = await api.post<Course>("/course", payload);
	return res.data;
}

/* =========================================================
 * PUT /api/course/:id
 * ======================================================= */
export async function updateCourse(id: string, payload: UpdateCoursePayload): Promise<Course> {
	const res = await api.put<Course>(`/course/id/${id}`, payload);
	return res.data;
}

/* =========================================================
 * PATCH /api/course/:id
 * ======================================================= */
export async function patchCourse(id: string, payload: PatchCoursePayload): Promise<Course> {
	const res = await api.patch<Course>(`/course/id/${id}`, payload);
	return res.data;
}

/* =========================================================
 * DELETE /api/course/:id
 * ======================================================= */
export async function deleteCourse(id: string): Promise<void> {
	await api.delete(`/course/id/${id}`);
}
