import api from "@/hooks/api";

/* ===================== BE MODEL ===================== */
export interface SubmissionBE {
	id: string;
	assignment_id: string;
	student_id: string;
	file_url?: string | null;
	text_submission?: string | null;
	submitted_at?: string;
}

/* ===================== QUERY ===================== */
export interface SubmissionQuery {
	assignment_id?: string;
	student_id?: string;
	page?: number;
	limit?: number;
}

/* ===================== GET ===================== */

/** GET /api/submission */
export async function getSubmissions(
	query?: SubmissionQuery
): Promise<SubmissionBE[]> {
	const res = await api.get<SubmissionBE[]>("/submission", {
		params: query,
	});
	return res.data ?? [];
}

/** GET /api/submission/:id */
export async function getSubmission(
	id: string
): Promise<SubmissionBE> {
	const res = await api.get<SubmissionBE>(`/submission/id/${id}`);
	return res.data;
}

/** GET /api/submission/count */
export async function countSubmissions(
	query?: Pick<SubmissionQuery, "assignment_id" | "student_id">
): Promise<number> {
	const res = await api.get<{ total: number }>(
		"/submission/count",
		{ params: query }
	);
	return res.data.total;
}

/* ===================== ASSIGNMENT ===================== */

/** GET /api/submission/assignment/:assignment_id */
export async function getSubmissionsByAssignment(
	assignment_id: string,
	query?: { page?: number; limit?: number }
): Promise<SubmissionBE[]> {
	const res = await api.get<SubmissionBE[]>(
		`/submission/assignment/${assignment_id}`,
		{ params: query }
	);
	return res.data ?? [];
}

/** GET /api/submission/assignment/:assignment_id/count */
export async function countSubmissionsByAssignment(
	assignment_id: string
): Promise<number> {
	const res = await api.get<{ total: number }>(
		`/submission/assignment/${assignment_id}/count`
	);
	return res.data.total;
}

/* ===================== STUDENT ===================== */

/** GET /api/submission/student/:student_id */
export async function getSubmissionsByStudent(
	student_id: string,
	query?: { page?: number; limit?: number }
): Promise<SubmissionBE[]> {
	const res = await api.get<SubmissionBE[]>(
		`/submission/student/${student_id}`,
		{ params: query }
	);
	return res.data ?? [];
}

/** GET /api/submission/student/:student_id/count */
export async function countSubmissionsByStudent(
	student_id: string
): Promise<number> {
	const res = await api.get<{ total: number }>(
		`/submission/student/${student_id}/count`
	);
	return res.data.total;
}

/* ===================== ASSIGNMENT + STUDENT ===================== */

/** GET /api/submission/assignment/:assignment_id/student/:student_id */
export async function getSubmissionByAssignmentAndStudent(
	assignment_id: string,
	student_id: string
): Promise<SubmissionBE | null> {
	const res = await api.get<SubmissionBE | null>(
		`/submission/assignment/${assignment_id}/student/${student_id}`
	);
	return res.data;
}

/* ===================== MUTATION ===================== */

/** POST /api/submission */
export async function createSubmission(
	body: Omit<SubmissionBE, "id" | "submitted_at">
): Promise<string> {
	const res = await api.post<{ id: string }>(
		"/submission",
		body
	);
	return res.data.id;
}

/** PUT /api/submission/:id */
export async function updateSubmission(
	id: string,
	body: Partial<Omit<SubmissionBE, "id" | "assignment_id" | "student_id" | "submitted_at">>
): Promise<void> {
	await api.put(`/submission/id/${id}`, body);
}

/** PATCH /api/submission/:id */
export async function patchSubmission(
	id: string,
	body: Partial<Omit<SubmissionBE, "id" | "submitted_at">>
): Promise<void> {
	await api.patch(`/submission/id/${id}`, body);
}

/** DELETE /api/submission/:id */
export async function deleteSubmission(
	id: string
): Promise<void> {
	await api.delete(`/submission/id/${id}`);
}
