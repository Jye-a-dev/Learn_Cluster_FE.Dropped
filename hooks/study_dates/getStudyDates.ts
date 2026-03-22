import api from "@/hooks/api";

/* ===================== BE MODEL ===================== */
export interface StudyDateBE {
	id: string;
	course_id: string;
	title?: string | null;
	scheduled_at?: string | null;
	location?: string | null;
	created_by?: string | null;
}

export type StudyDate = {
  id: string;
  courseId: string;
  title: string;
  scheduledAt: string;
  location: string;
  createdBy: string;
};

/* ===================== QUERY ===================== */
export interface StudyDateQuery {
	course_id?: string;
	upcoming?: boolean;
	page?: number;
	limit?: number;
}

/* ===================== GET ===================== */

/** GET /api/study_date */
export async function getStudyDates(
  query?: StudyDateQuery
): Promise<StudyDateBE[]> {
  const res = await api.get<StudyDateBE[]>("/study_date", {
    params: query,
  });

  return res.data ?? [];
}

/** GET /api/study_date/:id */
export async function getStudyDate(
	id: string
): Promise<StudyDateBE> {
	const res = await api.get<StudyDateBE>(`/study_date/${id}`);
	return res.data;
}

/** GET /api/study_date/count */
export async function countStudyDates(
	query?: Pick<StudyDateQuery, "course_id" | "upcoming">
): Promise<number> {
	const res = await api.get<{ total: number }>(
		"/study_date/count",
		{ params: query }
	);
	return res.data.total;
}

/* ===================== FULL ===================== */

/** GET /api/study_date/:id/full */
export async function getStudyDateFull(
	id: string
): Promise<unknown> {
	const res = await api.get(`/study_date/${id}/full`);
	return res.data;
}

/* ===================== COURSE ===================== */

/** GET /api/study_date/course/:course_id */
export async function getStudyDatesByCourse(
	course_id: string,
	query?: { page?: number; limit?: number }
): Promise<StudyDateBE[]> {
	const res = await api.get<StudyDateBE[]>(
		`/study_date/course/${course_id}`,
		{ params: query }
	);
	return res.data ?? [];	
}

/* ===================== UPCOMING ===================== */

/** GET /api/study_date/upcoming */
export async function getUpcomingStudyDates(
	query?: { page?: number; limit?: number }
): Promise<StudyDateBE[]> {
	const res = await api.get<StudyDateBE[]>(
		"/study_date/upcoming",
		{ params: query }
	);
	return res.data ?? [];
}

/* ===================== MUTATION ===================== */

/** POST /api/study_date */
export async function createStudyDate(
	body: Omit<StudyDateBE, "id">
): Promise<string> {
	const res = await api.post<{ id: string }>(
		"/study_date",
		body
	);
	return res.data.id;
}

/** PUT /api/study_date/:id */
export async function updateStudyDate(
	id: string,
	body: Omit<StudyDateBE, "id">
): Promise<void> {
	await api.put(`/study_date/id/${id}`, body);
}

/** PATCH /api/study_date/:id */
export async function patchStudyDate(
	id: string,
	body: Partial<Omit<StudyDateBE, "id">>
): Promise<void> {
	await api.patch(`/study_date/id/${id}`, body);
}

/** DELETE /api/study_date/:id */
export async function deleteStudyDate(
	id: string
): Promise<void> {
	await api.delete(`/study_date/id/${id}`);
}
