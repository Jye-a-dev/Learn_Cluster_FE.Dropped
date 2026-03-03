import api from "@/hooks/api";

/* =======================
   TYPE
======================= */
export interface StudyMatch {
	id: string; // UUID
	user1_id: string; // UUID
	user2_id: string; // UUID
	matched_at?: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddStudyMatchPayload = {
	user1_id: string;
	user2_id: string;
};

/* =======================
   QUERY
======================= */
export type StudyMatchQuery = {
	user1_id?: string;
	user2_id?: string;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/study_match
 * ======================================================= */
export async function getStudyMatches(
	query?: StudyMatchQuery
): Promise<StudyMatch[]> {
	const res = await api.get<StudyMatch[]>("/study_match", {
		params: query,
	});
	return res.data ?? [];
}

/* =========================================================
 * GET /api/study_match/count
 * ======================================================= */
export async function countStudyMatches(): Promise<number> {
	const res = await api.get<{ count: number }>("/study_match/count");
	return res.data?.count ?? 0;
}

/* =========================================================
 * GET /api/study_match/:id
 * ======================================================= */
export async function getStudyMatch(
	id: string
): Promise<StudyMatch> {
	const res = await api.get<StudyMatch>(`/study_match/${id}`);
	return res.data;
}

/* =========================================================
 * POST /api/study_match
 * ======================================================= */
export async function addStudyMatch(
	payload: AddStudyMatchPayload
): Promise<StudyMatch> {
	const res = await api.post<StudyMatch>(
		"/study_match",
		payload
	);
	return res.data;
}

/* =========================================================
 * DELETE /api/study_match/:id
 * ======================================================= */
export async function deleteStudyMatch(
	id: string
): Promise<void> {
	await api.delete(`/study_match/${id}`);
}