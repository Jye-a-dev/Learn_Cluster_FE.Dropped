/* ===================== BASE TYPES ===================== */

import { ReactNode } from "react";

export interface Notification {
    id: string; // UUID
    title: ReactNode;
    user_id: string; // UUID
    type: string | null;
    content: string | null;
    is_read: boolean;
    created_at: string; // ISO date
}

/* ===================== FORM PAYLOAD ===================== */

export interface CreateNotificationPayload {
    user_id: string;
    type?: string | null;
    content?: string | null;
}
