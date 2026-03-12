import api from "@/hooks/api";

/* =======================
   BACKEND ENTITY
======================= */
export interface AchievementBE {
	id: string; // UUID
	user_id: string; // UUID
	name: string;
	description?: string | null;
	awarded_at: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddAchievementPayload = {
	user_id: string;
	name: string;
	description?: string | null;
};

export type UpdateAchievementPayload = {
	user_id?: string;
	name?: string;
	description?: string | null;
};

export type PatchAchievementPayload = Partial<UpdateAchievementPayload>;

/* =========================================================
 * GET /api/achievement
 * ======================================================= */
export async function getAchievements(): Promise<AchievementBE[]> {
	const res = await api.get<AchievementBE[]>("/achievement");
	return res.data ?? [];
}

/* =========================================================
 * GET /api/achievement/count
 * ======================================================= */
export async function getAchievementCount(): Promise<number> {
	const res = await api.get<{ total: number }>("/achievement/count");
	return res.data?.total ?? 0;
}

/* =========================================================
 * GET /api/achievement/:id
 * ======================================================= */
export async function getAchievement(id: string): Promise<AchievementBE> {
	const res = await api.get<AchievementBE>(`/achievement/id/${id}`);
	return res.data;
}

/* =========================================================
 * GET /api/achievement/user/:userId
 * ======================================================= */
export async function getAchievementsByUser(userId: string): Promise<AchievementBE[]> {
	const res = await api.get<AchievementBE[]>(`/achievement/user/${userId}`);
	return res.data ?? [];
}

/* =========================================================
 * POST /api/achievement
 * ======================================================= */
export async function addAchievement(payload: AddAchievementPayload): Promise<{ id: string }> {
	const res = await api.post<{ id: string }>("/achievement", payload);
	return res.data;
}

/* =========================================================
 * POST /api/achievement/bulk
 * ======================================================= */
export async function bulkAddAchievement(payload: AddAchievementPayload[]): Promise<void> {
	await api.post("/achievement/bulk", payload);
}

/* =========================================================
 * PUT /api/achievement/:id
 * ======================================================= */
export async function updateAchievement(id: string, payload: UpdateAchievementPayload): Promise<void> {
	await api.put(`/achievement/id/${id}`, payload);
}

/* =========================================================
 * PATCH /api/achievement/:id
 * ======================================================= */
export async function patchAchievement(id: string, payload: PatchAchievementPayload): Promise<void> {
	await api.patch(`/achievement/id/${id}`, payload);
}

/* =========================================================
 * DELETE /api/achievement/:id
 * ======================================================= */
export async function deleteAchievement(id: string): Promise<void> {
	await api.delete(`/achievement/id/${id}`);
}

/* =========================================================
 * DELETE /api/achievement/user/:userId
 * ======================================================= */
export async function deleteAchievementsByUser(userId: string): Promise<void> {
	await api.delete(`/achievement/user/${userId}`);
}
