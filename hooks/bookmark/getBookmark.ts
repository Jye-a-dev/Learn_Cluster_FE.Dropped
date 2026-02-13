import api from "@/hooks/api";
import type { AxiosError } from "axios";

/* =======================
   BACKEND ENTITY
======================= */
export interface BookmarkBE {
	id: string; // UUID
	user_id: string; // UUID
	lesson_id: string; // UUID
	created_at?: string;
}

/* =======================
   PAYLOAD
======================= */

export type AddBookmarkPayload = {
	user_id: string;
	lesson_id: string;
};

export type UpdateBookmarkPayload = {
	lesson_id: string;
};

export type PatchBookmarkPayload = Partial<UpdateBookmarkPayload>;

export type DeleteByUserLessonPayload = {
	user_id: string;
	lesson_id: string;
};

/* =======================
   QUERY
======================= */

export type BookmarkQuery = {
	user_id?: string;
	lesson_id?: string;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/bookmark
 * ======================================================= */
export async function getBookmarks(query?: BookmarkQuery): Promise<BookmarkBE[]> {
	const res = await api.get<BookmarkBE[]>("/bookmark", {
		params: query,
	});
	return res.data ?? [];
}

/* =========================================================
 * GET /api/bookmark/:id
 * ======================================================= */
export async function getBookmark(id: string): Promise<BookmarkBE> {
	const res = await api.get<BookmarkBE>(`/bookmark/${id}`);
	return res.data;
}

/* =========================================================
 * GET /api/bookmark/user/:userId
 * ======================================================= */
export async function getBookmarksByUser(userId: string): Promise<BookmarkBE[]> {
	const res = await api.get<BookmarkBE[]>(`/bookmark/user/${userId}`);
	return res.data ?? [];
}

/* =========================================================
 * GET /api/bookmark/lesson/:lessonId
 * ======================================================= */
export async function getBookmarksByLesson(lessonId: string): Promise<BookmarkBE[]> {
	const res = await api.get<BookmarkBE[]>(`/bookmark/lesson/${lessonId}`);
	return res.data ?? [];
}

/* =========================================================
 * POST /api/bookmark
 * ======================================================= */
export async function addBookmark(payload: AddBookmarkPayload): Promise<{ id: string }> {
	try {
		console.log("=== ADD BOOKMARK PAYLOAD ===");
		console.log(payload);

		const res = await api.post<{ id: string }>("/bookmark", payload);

		return res.data;
	} catch (err: unknown) {
		if (err instanceof Error) {
			const axiosErr = err as AxiosError;

			console.log("=== ADD BOOKMARK ERROR RESPONSE ===");
			console.log(axiosErr.response?.data);

			console.log("=== ADD BOOKMARK STATUS ===");
			console.log(axiosErr.response?.status);
		}
		throw err;
	}
}

/* =========================================================
 * PUT /api/bookmark/:id
 * ======================================================= */
export async function updateBookmark(id: string, payload: UpdateBookmarkPayload): Promise<void> {
	await api.put(`/bookmark/${id}`, payload);
}

/* =========================================================
 * PATCH /api/bookmark/:id
 * ======================================================= */
export async function patchBookmark(id: string, payload: PatchBookmarkPayload): Promise<void> {
	await api.patch(`/bookmark/${id}`, payload);
}

/* =========================================================
 * DELETE /api/bookmark/:id
 * ======================================================= */
export async function deleteBookmark(id: string): Promise<void> {
	await api.delete(`/bookmark/${id}`);
}

/* =========================================================
 * DELETE /api/bookmark/user-lesson
 * ======================================================= */
export async function deleteBookmarkByUserLesson(payload: DeleteByUserLessonPayload): Promise<void> {
	await api.delete(`/bookmark/user-lesson`, {
		data: payload,
	});
}
