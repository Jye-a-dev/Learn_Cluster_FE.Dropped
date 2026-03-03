import api from "@/hooks/api";

/* =======================
   TYPE
======================= */
export interface Plan {
	id: string; // UUID
	name: string;
	description: string | null;
	price: number; // DECIMAL(10,2)
	duration_days: number | null; // null = vĩnh viễn
	is_active: boolean;
	created_at?: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddPlanPayload = {
	name: string;
	description?: string | null;
	price: number;
	duration_days?: number | null;
	is_active?: boolean;
};

export type UpdatePlanPayload = {
	name: string;
	description: string | null;
	price: number;
	duration_days: number | null;
	is_active: boolean;
};

export type PatchPlanPayload = Partial<UpdatePlanPayload>;

/* =======================
   QUERY
======================= */
export type PlanQuery = {
	is_active?: boolean;
	min_price?: number;
	max_price?: number;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/plan
 * ======================================================= */
export async function getPlans(
	query?: PlanQuery
): Promise<Plan[]> {
	const res = await api.get<Plan[]>("/plan", {
		params: query,
	});
	return res.data ?? [];
}

/* =========================================================
 * GET /api/plan/count
 * ======================================================= */
export async function countPlans(): Promise<number> {
	const res = await api.get<{ count: number }>("/plan/count");
	return res.data?.count ?? 0;
}

/* =========================================================
 * GET /api/plan/:id
 * ======================================================= */
export async function getPlan(
	id: string
): Promise<Plan> {
	const res = await api.get<Plan>(`/plan/${id}`);
	return res.data;
}

/* =========================================================
 * POST /api/plan
 * ======================================================= */
export async function addPlan(
	payload: AddPlanPayload
): Promise<Plan> {
	const res = await api.post<Plan>(
		"/plan",
		payload
	);
	return res.data;
}

/* =========================================================
 * PUT /api/plan/:id
 * ======================================================= */
export async function updatePlan(
	id: string,
	payload: UpdatePlanPayload
): Promise<Plan> {
	const res = await api.put<Plan>(
		`/plan/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * PATCH /api/plan/:id
 * ======================================================= */
export async function patchPlan(
	id: string,
	payload: PatchPlanPayload
): Promise<Plan> {
	const res = await api.patch<Plan>(
		`/plan/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * DELETE /api/plan/:id
 * ======================================================= */
export async function deletePlan(
	id: string
): Promise<void> {
	await api.delete(`/plan/${id}`);
}