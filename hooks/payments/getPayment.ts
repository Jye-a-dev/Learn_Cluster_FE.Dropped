import api from "@/hooks/api";

/* =======================
   TYPE
======================= */
export type PaymentStatus = "pending" | "success" | "failed";

export interface Payment {
	id: string; // UUID
	order_id: string; // UUID
	provider: string | null; // momo | stripe | vnpay
	transaction_code: string | null;
	amount: number | null; // DECIMAL(10,2)
	status: PaymentStatus;
	paid_at: string | null; // DATETIME
	raw_response: unknown | null; // JSON
}

/* =======================
   PAYLOAD
======================= */
export type AddPaymentPayload = {
	order_id: string;
	provider?: string | null;
	transaction_code?: string | null;
	amount?: number | null;
	status?: PaymentStatus; // default backend = pending
	paid_at?: string | null;
	raw_response?: unknown | null;
};

export type UpdatePaymentPayload = {
	order_id: string;
	provider: string | null;
	transaction_code: string | null;
	amount: number | null;
	status: PaymentStatus;
	paid_at: string | null;
	raw_response: unknown | null;
};

export type PatchPaymentPayload =
	Partial<UpdatePaymentPayload>;

/* =======================
   QUERY
======================= */
export type PaymentQuery = {
	order_id?: string;
	status?: PaymentStatus;
	provider?: string;
	page?: number;
	limit?: number;
};

/* =========================================================
 * GET /api/payment
 * ======================================================= */
export async function getPayments(
	query?: PaymentQuery
): Promise<Payment[]> {
	const res = await api.get<Payment[]>("/payment", {
		params: query,
	});
	return res.data ?? [];
}

/* =========================================================
 * GET /api/payment/count
 * ======================================================= */
export async function countPayments(): Promise<number> {
	const res = await api.get<{ count: number }>("/payment/count");
	return res.data?.count ?? 0;
}

/* =========================================================
 * GET /api/payment/:id
 * ======================================================= */
export async function getPayment(
	id: string
): Promise<Payment> {
	const res = await api.get<Payment>(`/payment/id/${id}`);
	return res.data;
}

/* =========================================================
 * GET /api/payment/order/:order_id
 * ======================================================= */
export async function getPaymentsByOrder(
	order_id: string
): Promise<Payment[]> {
	const res = await api.get<Payment[]>(
		`/payment/order/${order_id}`
	);
	return res.data ?? [];
}

/* =========================================================
 * POST /api/payment
 * ======================================================= */
export async function addPayment(
	payload: AddPaymentPayload
): Promise<Payment> {
	const res = await api.post<Payment>(
		"/payment",
		payload
	);
	return res.data;
}

/* =========================================================
 * PUT /api/payment/:id
 * ======================================================= */
export async function updatePayment(
	id: string,
	payload: UpdatePaymentPayload
): Promise<Payment> {
	const res = await api.put<Payment>(
		`/payment/id/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * PATCH /api/payment/:id
 * ======================================================= */
export async function patchPayment(
	id: string,
	payload: PatchPaymentPayload
): Promise<Payment> {
	const res = await api.patch<Payment>(
		`/payment/${id}`,
		payload
	);
	return res.data;
}

/* =========================================================
 * DELETE /api/payment/:id
 * ======================================================= */
export async function deletePayment(
	id: string
): Promise<void> {
	await api.delete(`/payment/id/${id}`);
}