import api from "@/hooks/api";
import type { AxiosError } from "axios";

/* =======================
   BACKEND ENTITY
======================= */
export interface MessageBE {
	id: string; // UUID
	study_date_id: string; // UUID
	sender_id?: string | null;

	content?: string | null;

	sent_at?: string;
	created_at?: string;
	updated_at?: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddMessagePayload = {
	study_date_id: string;
	sender_id?: string | null;
	content?: string | null;
};

export type UpdateMessagePayload = {
	content?: string | null;
};

export type PatchMessagePayload = Partial<UpdateMessagePayload>;

/* =========================================================
 * GET /api/message
 * ======================================================= */
export async function getMessages(): Promise<MessageBE[]> {
	const res = await api.get<MessageBE[]>("/message");
	return res.data ?? [];
}

/* =========================================================
 * GET /api/message/count
 * ======================================================= */
export async function getMessageCount(): Promise<number> {
	const res = await api.get<{ total: number }>("/message/count");
	return res.data?.total ?? 0;
}

/* =========================================================
 * GET /api/message/:id
 * ======================================================= */
export async function getMessage(id: string): Promise<MessageBE> {
	const res = await api.get<MessageBE>(`/message/id/${id}`);
	return res.data;
}

/* =========================================================
 * GET /api/message/study-date/:study_date_id
 * ======================================================= */
export async function getMessagesByStudyDate(study_date_id: string): Promise<MessageBE[]> {
	const res = await api.get<MessageBE[]>(`/message/studydate/${study_date_id}`);
	return res.data ?? [];
}

/* =========================================================
 * POST /api/message
 * ======================================================= */
export async function addMessage(payload: AddMessagePayload): Promise<{ id: string }> {
	try {
		const res = await api.post<{ id: string }>("/message", payload);
		return res.data;
	} catch (err: unknown) {
		if (err instanceof Error) {
			const axiosErr = err as AxiosError;
			console.log("=== ADD MESSAGE ERROR ===");
			console.log(axiosErr.response?.data);
			console.log("STATUS:", axiosErr.response?.status);
		}
		throw err;
	}
}

/* =========================================================
 * PUT /api/message/:id
 * ======================================================= */
export async function updateMessage(id: string, payload: UpdateMessagePayload): Promise<{ message: string }> {
	const res = await api.put<{ message: string }>(`/message/id/${id}`, payload);
	return res.data;
}

/* =========================================================
 * PATCH /api/message/:id
 * ======================================================= */
export async function patchMessage(id: string, payload: PatchMessagePayload): Promise<{ message: string }> {
	const res = await api.patch<{ message: string }>(`/message/id/${id}`, payload);
	return res.data;
}

/* =========================================================
 * DELETE /api/message/:id
 * ======================================================= */
export async function deleteMessage(id: string): Promise<void> {
	await api.delete(`/message/id/${id}`);
}
