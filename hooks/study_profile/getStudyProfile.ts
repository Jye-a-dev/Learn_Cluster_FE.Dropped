import api from "@/hooks/api";

/* =======================
   SHARED TYPE
======================= */

export type AvailableTime = Record<string, string[]>;

/* =======================
   ENTITY
======================= */

export interface StudyProfile {
	id: string; // UUID
	user_id: string; // UUID
	bio: string | null;
	preferred_subject: string | null;
	level: string | null;
	learning_goal: string | null;
	available_time: AvailableTime | null;
	is_active: boolean;
}

/* =======================
   PAYLOAD
======================= */

export type AddStudyProfilePayload = {
	user_id: string;
	bio?: string | null;
	preferred_subject?: string | null;
	level?: string | null;
	learning_goal?: string | null;
	available_time?: AvailableTime | null;
	is_active?: boolean;
};

export type UpdateStudyProfilePayload = {
	user_id: string;
	bio: string | null;
	preferred_subject: string | null;
	level: string | null;
	learning_goal: string | null;
	available_time: AvailableTime | null;
	is_active: boolean;
};

export type PatchStudyProfilePayload =
	Partial<UpdateStudyProfilePayload>;

/* =======================
   QUERY
======================= */

export type StudyProfileQuery = {
	user_id?: string;
	level?: string;
	is_active?: boolean;
	page?: number;
	limit?: number;
};

/* =========================================================
   GET /api/study_profile
========================================================= */

export async function getStudyProfiles(
	query?: StudyProfileQuery
): Promise<StudyProfile[]> {
	const res = await api.get<StudyProfile[]>("/study_profile", {
		params: query,
	});
	return res.data ?? [];
}

/* =========================================================
   GET /api/study_profile/count
========================================================= */

export async function countStudyProfiles(): Promise<number> {
	const res = await api.get<{ total: number }>(
		"/study_profile/count"
	);
	return res.data?.total ?? 0;
}

/* =========================================================
   GET /api/study_profile/:id
========================================================= */

export async function getStudyProfile(
	id: string
): Promise<StudyProfile> {
	const res = await api.get<StudyProfile>(
		`/study_profile/id/${id}`
	);
	return res.data;
}

/* =========================================================
   GET /api/study_profile/user/:userId
========================================================= */

export async function getStudyProfileByUser(
	userId: string
): Promise<StudyProfile> {
	const res = await api.get<StudyProfile>(
		`/study_profile/user/${userId}`
	);
	return res.data;
}

/* =========================================================
   POST /api/study_profile
========================================================= */

export async function addStudyProfile(
	payload: AddStudyProfilePayload
): Promise<StudyProfile> {
	const res = await api.post<StudyProfile>(
		"/study_profile",
		payload
	);
	return res.data;
}

/* =========================================================
   PUT /api/study_profile/:id
   (Full replace – phải gửi đầy đủ field)
========================================================= */

export async function updateStudyProfile(
	id: string,
	payload: UpdateStudyProfilePayload
): Promise<StudyProfile> {
	const res = await api.put<StudyProfile>(
		`/study_profile/id/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
   PATCH /api/study_profile/:id
   (Khuyến nghị dùng cho form)
========================================================= */

export async function patchStudyProfile(
	id: string,
	payload: PatchStudyProfilePayload
): Promise<StudyProfile> {
	const res = await api.patch<StudyProfile>(
		`/study_profile/id/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
   DELETE /api/study_profile/:id
========================================================= */

export async function deleteStudyProfile(
	id: string
): Promise<void> {
	await api.delete(`/study_profile/id/${id}`);
}