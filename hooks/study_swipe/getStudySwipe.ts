import api from "@/hooks/api";

/* =======================
   TYPE
======================= */
export type StudySwipeStatus = "pending" | "accepted" | "rejected";

export interface StudySwipe {
	id: string; // UUID
	swiper_id: string; // UUID
	target_id: string; // UUID
	status: StudySwipeStatus;
	created_at?: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddStudySwipePayload = {
	swiper_id: string;
	target_id: string;
	status?: StudySwipeStatus; // mặc định backend = pending
};

export type UpdateStudySwipePayload = {
	swiper_id: string;
	target_id: string;
	status: StudySwipeStatus;
};

export type PatchStudySwipePayload =
	Partial<UpdateStudySwipePayload>;

/* =======================
   QUERY
======================= */
export type StudySwipeQuery = {
	swiper_id?: string;
	target_id?: string;
	status?: StudySwipeStatus;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/study_swipe
 * ======================================================= */
export async function getStudySwipes(
	query?: StudySwipeQuery
): Promise<StudySwipe[]> {
	const res = await api.get<StudySwipe[]>("/study_swipe", {
		params: query,
	});
	return res.data ?? [];
}

/* =========================================================
 * GET /api/study_swipe/count
 * ======================================================= */
export async function countStudySwipes(): Promise<number> {
	const res = await api.get<{ total: number }>("/study_swipe/count");
	return res.data?.total ?? 0;
}

/* =========================================================
 * GET /api/study_swipe/:id
 * ======================================================= */
export async function getStudySwipe(
	id: string
): Promise<StudySwipe> {
	const res = await api.get<StudySwipe>(`/study_swipe/${id}`);
	return res.data;
}

/* =========================================================
 * POST /api/study_swipe
 * ======================================================= */
export async function addStudySwipe(
	payload: AddStudySwipePayload
): Promise<StudySwipe> {
	const res = await api.post<StudySwipe>(
		"/study_swipe",
		payload
	);
	return res.data;
}

/* =========================================================
 * PUT /api/study_swipe/:id
 * ======================================================= */
export async function updateStudySwipe(
	id: string,
	payload: UpdateStudySwipePayload
): Promise<StudySwipe> {
	const res = await api.put<StudySwipe>(
		`/study_swipe/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * PATCH /api/study_swipe/:id
 * ======================================================= */
export async function patchStudySwipe(
	id: string,
	payload: PatchStudySwipePayload
): Promise<StudySwipe> {
	const res = await api.patch<StudySwipe>(
		`/study_swipe/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * DELETE /api/study_swipe/:id
 * ======================================================= */
export async function deleteStudySwipe(
	id: string
): Promise<void> {
	await api.delete(`/study_swipe/${id}`);
}