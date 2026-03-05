/* ===================== UI TYPES ===================== */

export type OrderStatus =
	| "pending"
	| "paid"
	| "failed"
	| "cancelled";

export interface Order {
	id: string;
	user_id: string;
	total_amount: number;
	status: OrderStatus;
	created_at?: string;
}

export type CreateOrderPayload = {
	user_id: string;
	total_amount: number;
	status?: OrderStatus;
};

export type UpdateOrderPayload = {
	user_id: string;
	total_amount: number;
	status: OrderStatus;
};