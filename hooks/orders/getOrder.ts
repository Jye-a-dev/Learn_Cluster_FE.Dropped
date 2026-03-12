import api from "@/hooks/api";

/* =======================
   TYPE
======================= */
export type OrderStatus =
	| "pending"
	| "paid"
	| "failed"
	| "cancelled";

export interface Order {
	id: string; // UUID
	user_id: string; // UUID
	total_amount: number; // DECIMAL(10,2)
	status: OrderStatus;
	created_at?: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddOrderPayload = {
	user_id: string;
	total_amount: number;
	status?: OrderStatus; // default backend = pending
};

export type UpdateOrderPayload = {
	user_id: string;
	total_amount: number;
	status: OrderStatus;
};

export type PatchOrderPayload =
	Partial<UpdateOrderPayload>;

/* =======================
   QUERY
======================= */
export type OrderQuery = {
	user_id?: string;
	status?: OrderStatus;
	min_amount?: number;
	max_amount?: number;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/order
 * ======================================================= */
export async function getOrders(
	query?: OrderQuery
): Promise<Order[]> {
	const res = await api.get<Order[]>("/order", {
		params: query,
	});
	return res.data ?? [];
}

/* =========================================================
 * GET /api/order/count
 * ======================================================= */
export async function countOrders(): Promise<number> {
	const res = await api.get<{ total: number }>("/order/count");
	return res.data?.total ?? 0;
}

/* =========================================================
 * GET /api/order/:id
 * ======================================================= */
export async function getOrder(
	id: string
): Promise<Order> {
	const res = await api.get<Order>(`/order/id/${id}`);
	return res.data;
}

/* =========================================================
 * GET /api/order/user/:user_id
 * ======================================================= */
export async function getOrdersByUser(
	user_id: string
): Promise<Order[]> {
	const res = await api.get<Order[]>(
		`/order/user/${user_id}`
	);
	return res.data ?? [];
}

/* =========================================================
 * POST /api/order
 * ======================================================= */
export async function addOrder(
	payload: AddOrderPayload
): Promise<Order> {
	const res = await api.post<Order>(
		"/order",
		payload
	);
	return res.data;
}

/* =========================================================
 * PUT /api/order/:id
 * ======================================================= */
export async function updateOrder(
	id: string,
	payload: UpdateOrderPayload
): Promise<Order> {
	const res = await api.put<Order>(
		`/order/id/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * PATCH /api/order/:id
 * ======================================================= */
export async function patchOrder(
	id: string,
	payload: PatchOrderPayload
): Promise<Order> {
	const res = await api.patch<Order>(
		`/order/id/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * DELETE /api/order/:id
 * ======================================================= */
export async function deleteOrder(
	id: string
): Promise<void> {
	await api.delete(`/order/id/${id}`);
}