import api from "@/hooks/api";

/* =======================
   TYPE
======================= */
export interface Chapter {
	id: string; // UUID
	course_id: string; // UUID
	title: string;
	description?: string | null;
	ordering: number; // ✅ đổi từ order
	created_at?: string;
	updated_at?: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddChapterPayload = {
	course_id: string;
	title: string;
	description?: string | null;
	ordering: number; // ✅
};

export type UpdateChapterPayload = {
	course_id: string;
	title: string;
	description?: string | null;
	ordering: number; // ✅
};

export type PatchChapterPayload = Partial<UpdateChapterPayload>;

/* =======================
   QUERY
======================= */
export type ChapterQuery = {
	course_id?: string;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/chapter
 * ======================================================= */
export async function getChapters(query?: ChapterQuery): Promise<Chapter[]> {
	const res = await api.get<Chapter[]>("/chapter", { params: query });
	return res.data ?? [];
}

/* =========================================================
 * GET /api/chapter/count
 * ======================================================= */
export async function getChapterCount(query?: ChapterQuery): Promise<number> {
	const res = await api.get<{ total: number }>("/chapter/count", { params: query });
	return res.data?.total ?? 0;
}

/* =========================================================
 * GET /api/chapter/:id
 * ======================================================= */
export async function getChapter(id: string): Promise<Chapter> {
	const res = await api.get<Chapter>(`/chapter/id/${id}`);
	return res.data;
}

/* =========================================================
 * POST /api/chapter
 * ======================================================= */
export async function addChapter(payload: AddChapterPayload): Promise<Chapter> {
	const res = await api.post<Chapter>("/chapter", payload);
	return res.data;
}

/* =========================================================
 * PUT /api/chapter/:id
 * ======================================================= */
export async function updateChapter(id: string, payload: UpdateChapterPayload): Promise<Chapter> {
	const res = await api.put<Chapter>(`/chapter/id/${id}`, payload);
	return res.data;
}

/* =========================================================
 * PATCH /api/chapter/:id
 * ======================================================= */
export async function patchChapter(id: string, payload: PatchChapterPayload): Promise<Chapter> {
	const res = await api.patch<Chapter>(`/chapter/id/${id}`, payload);
	return res.data;
}

/* =========================================================
 * DELETE /api/chapter/:id
 * ======================================================= */
export async function deleteChapter(id: string): Promise<void> {
	await api.delete(`/chapter/id/${id}`);
}
/* =========================================================
 * COUNT CHAPTER BY COURSE (frontend count)
 * ======================================================= */
export async function countChapterByCourse(course_id: string): Promise<number> {

	const chapters = await getChaptersByCourse(course_id );

	return chapters.length;

}

/* =========================================================
 * GET /api/chapter/course/:course_id
 * ======================================================= */
export async function getChaptersByCourse(
	course_id: string
): Promise<Chapter[]> {

	const res = await api.get<Chapter[]>(
		`/chapter/course/${course_id}`
	);

	return res.data ?? [];
}