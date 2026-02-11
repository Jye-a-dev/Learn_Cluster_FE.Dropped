/* ===== UI MESSAGE (READ MODEL) ===== */
export type Message = {
	id: string;
	study_date_id: string;
	sender_id?: string | null;
	content?: string | null;
	sent_at: string;
};


/* ===== CREATE ===== */
export type CreateMessagePayload = {
	study_date_id: string;
	sender_id?: string;
	content?: string;
};


/* ===== UPDATE ===== */
export type UpdateMessagePayload = {
	content?: string;
};
