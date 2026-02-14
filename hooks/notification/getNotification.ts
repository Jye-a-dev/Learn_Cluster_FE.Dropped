import api from "@/hooks/api";

/* =======================
   BACKEND ENTITY
======================= */
export interface NotificationBE {
	id: string; // UUID
	user_id: string; // UUID
	type?: string | null;
	content?: string | null;
	is_read: boolean;
	created_at: string;
}

/* =======================
   PAYLOAD
======================= */
export type AddNotificationPayload = {
	user_id: string;
	type?: string | null;
	content?: string | null;
};

export type BulkMarkReadPayload = {
	ids: string[];
};

/* =========================================================
 * GET /api/notification
 * ======================================================= */
export async function getNotifications(): Promise<NotificationBE[]> {
	const res = await api.get<NotificationBE[]>("/notification");
	return res.data ?? [];
}

/* =========================================================
 * GET /api/notification/user/:user_id
 * ======================================================= */
export async function getNotificationsByUser(user_id: string): Promise<NotificationBE[]> {
	const res = await api.get<NotificationBE[]>(`/notification/user/${user_id}`);
	return res.data ?? [];
}

/* =========================================================
 * GET /api/notification/user/:user_id/unread
 * ======================================================= */
export async function getUnreadNotifications(user_id: string): Promise<NotificationBE[]> {
	const res = await api.get<NotificationBE[]>(`/notification/user/${user_id}/unread`);
	return res.data ?? [];
}

/* =========================================================
 * GET /api/notification/user/:user_id/unread/count
 * ======================================================= */
export async function getUnreadCount(user_id: string): Promise<number> {
	const res = await api.get<{ total: number }>(`/notification/user/${user_id}/unread/count`);
	return res.data?.total ?? 0;
}

/* =========================================================
 * POST /api/notification
 * ======================================================= */
export async function addNotification(payload: AddNotificationPayload): Promise<{ id: string }> {
	const res = await api.post<{ id: string }>("/notification", payload);
	return res.data;
}

/* =========================================================
 * PATCH /api/notification/:id/read
 * ======================================================= */
export async function markNotificationRead(id: string): Promise<void> {
	await api.patch(`/notification/${id}/read`);
}

/* =========================================================
 * PATCH /api/notification/user/:user_id/read-all
 * ======================================================= */
export async function markAllNotificationRead(user_id: string): Promise<void> {
	await api.patch(`/notification/user/${user_id}/read-all`);
}

/* =========================================================
 * PATCH /api/notification/read (bulk)
 * ======================================================= */
export async function bulkMarkNotificationRead(payload: BulkMarkReadPayload): Promise<void> {
	await api.patch("/notification/read", payload);
}

/* =========================================================
 * DELETE /api/notification/:id
 * ======================================================= */
export async function deleteNotification(id: string): Promise<void> {
	await api.delete(`/notification/${id}`);
}

/* =========================================================
 * DELETE /api/notification/user/:user_id
 * ======================================================= */
export async function deleteNotificationsByUser(user_id: string): Promise<void> {
	await api.delete(`/notification/user/${user_id}`);
}
