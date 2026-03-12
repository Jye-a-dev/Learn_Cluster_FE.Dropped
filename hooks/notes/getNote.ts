import api from "@/hooks/api";

/* ===================== BE MODEL ===================== */
export interface NoteBE {
	id: string;
	user_id: string;
	lesson_id: string;
	content: string | null;
	created_at: string;
}

/* ===================== QUERY ===================== */
export interface NoteQuery {
	user_id?: string;
	lesson_id?: string;
	page?: number;
	limit?: number;
}

/* ===================== CREATE / UPDATE PAYLOAD ===================== */

export interface CreateNotePayload {
	user_id: string;
	lesson_id: string;
	content?: string | null;
}

export interface UpdateNotePayload {
	user_id: string;
	lesson_id: string;
	content?: string | null;
}

export type PatchNotePayload = Partial<CreateNotePayload>;

/* ===================== GET ===================== */

/** GET /api/note */
export async function getNotes(
	query?: NoteQuery
): Promise<NoteBE[]> {
	const res = await api.get<NoteBE[]>("/note", {
		params: query,
	});
	return res.data ?? [];
}

/** GET /api/note/:id */
export async function getNote(
	id: string
): Promise<NoteBE> {
	const res = await api.get<NoteBE>(`/note/id/${id}`);
	return res.data;
}

/** GET /api/note/user/:user_id */
export async function getNotesByUser(
	user_id: string,
	query?: { page?: number; limit?: number }
): Promise<NoteBE[]> {
	const res = await api.get<NoteBE[]>(
		`/note/user/${user_id}`,
		{ params: query }
	);
	return res.data ?? [];
}

/** GET /api/note/lesson/:lesson_id */
export async function getNotesByLesson(
	lesson_id: string,
	query?: { page?: number; limit?: number }
): Promise<NoteBE[]> {
	const res = await api.get<NoteBE[]>(
		`/note/lesson/${lesson_id}`,
		{ params: query }
	);
	return res.data ?? [];
}

/* ===================== MUTATION ===================== */

/** POST /api/note */
export async function createNote(
	body: CreateNotePayload
): Promise<string> {
	const res = await api.post<{ id: string }>("/note", body);
	return res.data.id;
}

/** PUT /api/note/:id */
export async function updateNote(
	id: string,
	body: UpdateNotePayload
): Promise<void> {
	await api.put(`/note/id/${id}`, body);
}

/** PATCH /api/note/:id */
export async function patchNote(
	id: string,
	body: PatchNotePayload
): Promise<void> {
	await api.patch(`/note/id/${id}`, body);
}

/** DELETE /api/note/:id */
export async function deleteNote(
	id: string
): Promise<void> {
	await api.delete(`/note/id/${id}`);
}
