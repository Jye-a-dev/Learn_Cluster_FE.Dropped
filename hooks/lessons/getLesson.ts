import api from "@/hooks/api";
import type { AxiosError } from "axios";
import type { LessonContentType } from "@/components/pages/AdminManage/AdminLesson/LessonUiTypes";

/* =======================
   BACKEND ENTITY
======================= */
export interface LessonBE {
	id: string; // UUID
	chapter_id: string; // UUID
	title: string;

	content_type: LessonContentType;
	content_url?: string | null;
	content_text?: string | null;

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
	content_type: LessonContentType;

	content_url?: string | null;
	content_text?: string | null;

	ordering: number;
};

export type UpdateLessonPayload = {
	chapter_id: string;
	title: string;

	content_url?: string | null;
	content_text?: string | null;

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
export async function getLessons(query?: LessonQuery): Promise<LessonBE[]> {
	const res = await api.get<LessonBE[]>("/lesson", { params: query });
	return res.data ?? [];
}

/* =========================================================
 * GET /api/lesson/count
 * ======================================================= */
export async function getLessonCount(query?: LessonQuery): Promise<number> {
	const res = await api.get<{ total: number }>("/lesson/count", {
		params: query,
	});
	return res.data?.total ?? 0;
}

/* =========================================================
 * GET /api/lesson/:id
 * ======================================================= */
export async function getLesson(id: string): Promise<LessonBE> {
	const res = await api.get<LessonBE>(`/lesson/id/${id}`);
	return res.data;
}

/* =========================================================
 * POST /api/lesson
 * ======================================================= */
export async function addLesson(payload: AddLessonPayload): Promise<LessonBE> {
	try {
		console.log("=== ADD LESSON PAYLOAD ===");
		console.log(payload);

		const res = await api.post<LessonBE>("/lesson", payload);
		return res.data;
	} catch (err: unknown) {
		if (err instanceof Error) {
			const axiosErr = err as AxiosError;

			console.log("=== ADD LESSON ERROR RESPONSE ===");
			console.log(axiosErr.response?.data);

			console.log("=== ADD LESSON STATUS ===");
			console.log(axiosErr.response?.status);
		}

		throw err;
	}
}

/* =========================================================
 * PUT /api/lesson/:id
 * ======================================================= */
export async function updateLesson(id: string, payload: UpdateLessonPayload): Promise<LessonBE> {
	const res = await api.put<LessonBE>(`/lesson/id/${id}`, payload);
	return res.data;
}

/* =========================================================
 * PATCH /api/lesson/:id
 * ======================================================= */
export async function patchLesson(id: string, payload: PatchLessonPayload): Promise<LessonBE> {
	const res = await api.patch<LessonBE>(`/lesson/id/${id}`, payload);
	return res.data;
}

/* =========================================================
 * DELETE /api/lesson/:id
 * ======================================================= */
export async function deleteLesson(id: string): Promise<void> {
	await api.delete(`/lesson/id/${id}`);
}

/* =========================================================
 * GET /api/lesson/chapter/:chapter_id
 * ======================================================= */
export async function getLessonsByChapter(chapter_id: string): Promise<LessonBE[]> {
	const res = await api.get<LessonBE[]>(`/lesson/chapter/${chapter_id}`);
	return res.data ?? [];
}

/* =========================================================
 * PATCH /api/lesson/:id/order
 * ======================================================= */
export async function updateLessonOrder(id: string, payload: UpdateLessonOrderPayload): Promise<LessonBE> {
	const res = await api.patch<LessonBE>(`/lesson/${id}/order`, payload);
	return res.data;
}
