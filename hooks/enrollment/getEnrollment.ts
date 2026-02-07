import api from "@/hooks/api";

/* =======================
   TYPE
======================= */
export interface Enrollment {
	id: string; // UUID
	user_id: string; // UUID
	course_id: string; // UUID
	enrolled_at?: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddEnrollmentPayload = {
	user_id: string;
	course_id: string;
};

export type UpdateEnrollmentPayload = {
	user_id: string;
	course_id: string;
};

export type PatchEnrollmentPayload = Partial<UpdateEnrollmentPayload>;

/* =======================
   QUERY
======================= */
export type EnrollmentQuery = {
	user_id?: string;
	course_id?: string;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/enrollment
 * ======================================================= */
export async function getEnrollments(
	query?: EnrollmentQuery
): Promise<Enrollment[]> {
	const res = await api.get<Enrollment[]>("/enrollment", {
		params: query,
	});
	return res.data ?? [];
}

/* =========================================================
 * GET /api/enrollment/count
 * ======================================================= */
export async function getEnrollmentCount(): Promise<number> {
	const res = await api.get<{ count: number }>("/enrollment/count");
	return res.data?.count ?? 0;
}

/* =========================================================
 * GET /api/enrollment/:id
 * ======================================================= */
export async function getEnrollment(id: string): Promise<Enrollment> {
	const res = await api.get<Enrollment>(`/enrollment/${id}`);
	return res.data;
}

/* =========================================================
 * POST /api/enrollment
 * ======================================================= */
export async function addEnrollment(
	payload: AddEnrollmentPayload
): Promise<Enrollment> {
	const res = await api.post<Enrollment>("/enrollment", payload);
	return res.data;
}

/* =========================================================
 * PUT /api/enrollment/:id
 * ======================================================= */
export async function updateEnrollment(
	id: string,
	payload: UpdateEnrollmentPayload
): Promise<Enrollment> {
	const res = await api.put<Enrollment>(`/enrollment/${id}`, payload);
	return res.data;
}

/* =========================================================
 * PATCH /api/enrollment/:id
 * ======================================================= */
export async function patchEnrollment(
	id: string,
	payload: PatchEnrollmentPayload
): Promise<Enrollment> {
	const res = await api.patch<Enrollment>(`/enrollment/${id}`, payload);
	return res.data;
}

/* =========================================================
 * DELETE /api/enrollment/:id
 * ======================================================= */
export async function deleteEnrollment(id: string): Promise<void> {
	await api.delete(`/enrollment/${id}`);
}
