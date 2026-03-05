/* ===== UI PLAN (READ MODEL) ===== */
export type Plan = {
	id: string;
	name: string;
	description: string | null;
	price: number;
	duration_days: number | null;
	is_active: boolean;
	created_at: string;
};

/* ===== CREATE ===== */
export type CreatePlanPayload = {
	name: string;
	description?: string | null;
	price: number;
	duration_days?: number | null;
	is_active?: boolean;
};

/* ===== UPDATE ===== */
export type UpdatePlanPayload = {
	name: string;
	description: string | null;
	price: number;
	duration_days: number | null;
	is_active: boolean;
};