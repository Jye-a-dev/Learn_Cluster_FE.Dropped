import api from "@/hooks/api";

/* =======================
   TYPE
======================= */
export interface Grade {
	id: string; // UUID
	submission_id: string; // UUID
	grader_id: string | null; // UUID | null
	score: number | null;
	feedback: string | null;
	graded_at?: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddGradePayload = {
	submission_id: string;
	grader_id?: string | null;
	score?: number | null;
	feedback?: string | null;
};

export type UpdateGradePayload = {
	submission_id?: string;
	grader_id?: string | null;
	score?: number | null;
	feedback?: string | null;
};

export type PatchGradeFeedbackPayload = {
	feedback?: string | null;
};

/* =======================
   QUERY (optional)
======================= */
export type GradeQuery = {
	submission_id?: string;
	grader_id?: string;
	min_score?: number;
	max_score?: number;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/grade
 * ======================================================= */
export async function getGrades(
	query?: GradeQuery
): Promise<Grade[]> {
	const res = await api.get<Grade[]>("/grade", {
		params: query,
	});
	return res.data ?? [];
}

/* =========================================================
 * GET /api/grade/count
 * ======================================================= */
export async function countGrades(
	query?: GradeQuery
): Promise<number> {
	const res = await api.get<number>("/grade/count", {
		params: query,
	});
	return res.data ?? 0;
}

/* =========================================================
 * GET /api/grade/:id
 * ======================================================= */
export async function getGrade(
	id: string
): Promise<Grade> {
	const res = await api.get<Grade>(`/grade/${id}`);
	return res.data;
}

/* =========================================================
 * POST /api/grade
 * ======================================================= */
export async function addGrade(
	payload: AddGradePayload
): Promise<Grade> {
	const res = await api.post<Grade>(
		"/grade",
		payload
	);
	return res.data;
}

/* =========================================================
 * PUT /api/grade/:id
 * ======================================================= */
export async function updateGrade(
	id: string,
	payload: UpdateGradePayload
): Promise<Grade> {
	const res = await api.put<Grade>(
		`/grade/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * DELETE /api/grade/:id
 * ======================================================= */
export async function deleteGrade(
	id: string
): Promise<void> {
	await api.delete(`/grade/${id}`);
}

/* =========================================================
 * GET /api/grade/submission/:submission_id
 * ======================================================= */
export async function getGradesBySubmission(
	submission_id: string
): Promise<Grade[]> {
	const res = await api.get<Grade[]>(
		`/grade/submission/${submission_id}`
	);
	return res.data ?? [];
}

/* =========================================================
 * GET /api/grade/grader/:grader_id
 * ======================================================= */
export async function getGradesByGrader(
	grader_id: string
): Promise<Grade[]> {
	const res = await api.get<Grade[]>(
		`/grade/grader/${grader_id}`
	);
	return res.data ?? [];
}

/* =========================================================
 * PATCH /api/grade/:id/feedback
 * ======================================================= */
export async function patchGradeFeedback(
	id: string,
	payload: PatchGradeFeedbackPayload
): Promise<Grade> {
	const res = await api.patch<Grade>(
		`/grade/${id}/feedback`,
		payload
	);
	return res.data;
}

/* =========================================================
 * GET /api/grade/top/:n
 * ======================================================= */
export async function getTopGrades(
	n: number
): Promise<Grade[]> {
	const res = await api.get<Grade[]>(`/grade/top/${n}`);
	return res.data ?? [];
}
