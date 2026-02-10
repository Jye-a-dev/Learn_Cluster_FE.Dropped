import api from "@/hooks/api";

/* ===================== BE MODEL ===================== */
export interface StudyDateLessonBE {
	id: string;
	study_date_id: string;
	lesson_id: string;
	order_index?: number | null;
	note?: string | null;
	created_by?: string | null;
}	

/* ===================== QUERY ===================== */
export interface StudyDateLessonQuery {
	study_date_id?: string;
	lesson_id?: string;
	page?: number;
	limit?: number;
}

/* ===================== GET ===================== */

/** GET /api/study_date_lesson */
export async function getStudyDateLessons(query?: StudyDateLessonQuery): Promise<StudyDateLessonBE[]> {
	const res = await api.get<StudyDateLessonBE[]>("/study_date_lesson", { params: query });
	return res.data ?? [];
}

/** GET /api/study_date_lesson/:id */
export async function getStudyDateLesson(id: string): Promise<StudyDateLessonBE> {
	const res = await api.get<StudyDateLessonBE>(`/study_date_lesson/${id}`);
	return res.data;
}

/** GET /api/study_date_lesson/count */
export async function countStudyDateLessons(query?: Pick<StudyDateLessonQuery, "study_date_id" | "lesson_id">): Promise<number> {
	const res = await api.get<{ total: number }>("/study_date_lesson/count", { params: query });
	return res.data.total;
}

/* ===================== MUTATION ===================== */

/** POST /api/study_date_lesson */
export async function createStudyDateLesson(body: Omit<StudyDateLessonBE, "id">): Promise<string> {
	const res = await api.post<{ id: string }>("/study_date_lesson", body);
	return res.data.id;
}

/** PUT /api/study_date_lesson/:id */
export async function updateStudyDateLesson(id: string, body: Omit<StudyDateLessonBE, "id">): Promise<void> {
	await api.put(`/study_date_lesson/${id}`, body);
}

/** PATCH /api/study_date_lesson/:id */
export async function patchStudyDateLesson(id: string, body: Partial<Omit<StudyDateLessonBE, "id">>): Promise<void> {
	await api.patch(`/study_date_lesson/${id}`, body);
}

/** DELETE /api/study_date_lesson/:id */
export async function deleteStudyDateLesson(id: string): Promise<void> {
	await api.delete(`/study_date_lesson/${id}`);
}
