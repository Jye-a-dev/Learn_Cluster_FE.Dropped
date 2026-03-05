import api from "@/hooks/api";

/* =======================
   TYPE
======================= */
export type OrderItemType = "course" | "plan";

export interface OrderItem {
	id: string; // UUID
	order_id: string; // UUID
	item_type: OrderItemType;
	item_id: string; // UUID (course_id hoặc plan_id)
	price: number; // DECIMAL(10,2)
}

/* =======================
   PAYLOAD
======================= */
export type AddOrderItemPayload = {
	order_id: string;
	item_type: OrderItemType;
	item_id: string;
	price: number;
};

export type UpdateOrderItemPayload = {
	order_id: string;
	item_type: OrderItemType;
	item_id: string;
	price: number;
};

export type PatchOrderItemPayload =
	Partial<UpdateOrderItemPayload>;

/* =======================
   QUERY
======================= */
export type OrderItemQuery = {
	order_id?: string;
	item_type?: OrderItemType;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/order_item
 * ======================================================= */
export async function getOrderItems(
	query?: OrderItemQuery
): Promise<OrderItem[]> {
	const res = await api.get<OrderItem[]>("/order_item", {
		params: query,
	});
	return res.data ?? [];
}

/* =========================================================
 * GET /api/order_item/count
 * ======================================================= */
export async function countOrderItems(): Promise<number> {
	const res = await api.get<{ total: number }>("/order_item/count");
	return res.data?.total ?? 0;
}

/* =========================================================
 * GET /api/order_item/:id
 * ======================================================= */
export async function getOrderItem(
	id: string
): Promise<OrderItem> {
	const res = await api.get<OrderItem>(`/order_item/${id}`);
	return res.data;
}

/* =========================================================
 * GET /api/order_item/order/:order_id
 * ======================================================= */
export async function getOrderItemsByOrder(
	order_id: string
): Promise<OrderItem[]> {
	const res = await api.get<OrderItem[]>(
		`/order_item/order/${order_id}`
	);
	return res.data ?? [];
}

/* =========================================================
 * POST /api/order_item
 * ======================================================= */
export async function addOrderItem(
	payload: AddOrderItemPayload
): Promise<OrderItem> {
	const res = await api.post<OrderItem>(
		"/order_item",
		payload
	);
	return res.data;
}

/* =========================================================
 * PUT /api/order_item/:id
 * ======================================================= */
export async function updateOrderItem(
	id: string,
	payload: UpdateOrderItemPayload
): Promise<OrderItem> {
	const res = await api.put<OrderItem>(
		`/order_item/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * PATCH /api/order_item/:id
 * ======================================================= */
export async function patchOrderItem(
	id: string,
	payload: PatchOrderItemPayload
): Promise<OrderItem> {
	const res = await api.patch<OrderItem>(
		`/order_item/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * DELETE /api/order_item/:id
 * ======================================================= */
export async function deleteOrderItem(
	id: string
): Promise<void> {
	await api.delete(`/order_item/${id}`);
}