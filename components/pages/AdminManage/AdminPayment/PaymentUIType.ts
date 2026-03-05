export type Payment = {
	id: string; // UUID
	order_id: string; // UUID
	provider: string | null; // momo | stripe | vnpay
	transaction_code: string | null;
	amount: number | null; // DECIMAL(10,2)
	status: "pending" | "success" | "failed";
	paid_at: string | null; // DATETIME
	raw_response: unknown | null; // JSON
};

/* ===== CREATE ===== */
export type CreatePaymentPayload = {
	order_id: string; // UUID
	provider: string | null; // momo | stripe | vnpay
	transaction_code: string | null;
	amount: number | null; // DECIMAL(10,2)
	status: "pending" | "success" | "failed";
	paid_at: string | null;
	raw_response: unknown | null; // JSON
};

/* ===== UPDATE ===== */
export type UpdatePaymentPayload = Partial<{
	order_id: string;
	provider: string | null;
	transaction_code: string | null;
	amount: number | null;
	status: "pending" | "success" | "failed";
	paid_at: string | null;
	raw_response: unknown | null;
}>;


