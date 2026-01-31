import { Lesson } from "@/components/pages/AdminManage/AdminLesson/LessonUiTypes";
import api from "@/hooks/api";

/* =======================
   TYPE
======================= */
export interface LessonBE {
    content_type: string;
    content_url: null;
	id: string; // UUID
	chapter_id: string; // UUID
	title: string;
	description?: string | null;
	content?: string | null;
	ordering: number;
	created_at?: string;
	updated_at?: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddLessonPayload = {
	chapter_id: string;
	title: string;
	description?: string | null;
    content_type: "video" | "pdf" | "text";
    content_url?: string | null;
	content?: string | null;
	ordering: number;
};

export type UpdateLessonPayload = {
	chapter_id: string;
	title: string;
	description?: string | null;
	content?: string | null;
	ordering: number;
};

export type PatchLessonPayload = Partial<UpdateLessonPayload>;

export type UpdateLessonOrderPayload = {
	ordering: number;
};

/* =======================
   QUERY
======================= */
export type LessonQuery = {
	chapter_id?: string;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/lesson
 * ======================================================= */
export async function getLessons(query?: LessonQuery): Promise<Lesson[]> {
	const res = await api.get<Lesson[]>("/lesson", { params: query });
	return res.data ?? [];
}

/* =========================================================
 * GET /api/lesson/count
 * ======================================================= */
export async function getLessonCount(query?: LessonQuery): Promise<number> {
	const res = await api.get<{ count: number }>("/lesson/count", { params: query });
	return res.data?.count ?? 0;
}

/* =========================================================
 * GET /api/lesson/:id
 * ======================================================= */
export async function getLesson(id: string): Promise<Lesson> {
	const res = await api.get<Lesson>(`/lesson/${id}`);
	return res.data;
}

/* =========================================================
 * POST /api/lesson
 * ======================================================= */
export async function addLesson(payload: AddLessonPayload): Promise<Lesson> {
	const res = await api.post<Lesson>("/lesson", payload);
	return res.data;
}

/* =========================================================
 * PUT /api/lesson/:id
 * ======================================================= */
export async function updateLesson(
	id: string,
	payload: UpdateLessonPayload
): Promise<Lesson> {
	const res = await api.put<Lesson>(`/lesson/${id}`, payload);
	return res.data;
}

/* =========================================================
 * PATCH /api/lesson/:id
 * ======================================================= */
export async function patchLesson(
	id: string,
	payload: PatchLessonPayload
): Promise<Lesson> {
	const res = await api.patch<Lesson>(`/lesson/${id}`, payload);
	return res.data;
}

/* =========================================================
 * DELETE /api/lesson/:id
 * ======================================================= */
export async function deleteLesson(id: string): Promise<void> {
	await api.delete(`/lesson/${id}`);
}

/* =========================================================
 * GET /api/lesson/chapter/:chapter_id
 * ======================================================= */
export async function getLessonsByChapter(
	chapter_id: string
): Promise<Lesson[]> {
	const res = await api.get<Lesson[]>(`/lesson/chapter/${chapter_id}`);
	return res.data ?? [];
}

/* =========================================================
 * PATCH /api/lesson/:id/order
 * ======================================================= */
export async function updateLessonOrder(
	id: string,
	payload: UpdateLessonOrderPayload
): Promise<Lesson> {
	const res = await api.patch<Lesson>(`/lesson/${id}/order`, payload);
	return res.data;
}
