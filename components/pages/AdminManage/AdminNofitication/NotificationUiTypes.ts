/* ===================== BASE TYPES ===================== */

import { ReactNode } from "react";

export interface Notification {
  id: string; // UUID

  sender_id: string | null;   // NEW (NULL = system)
  user_id: string;

  type: string | null;

  reference_id: string | null;    // NEW
  reference_type: string | null;  // NEW

  title?: ReactNode;  // FE-only (không tồn tại trong BE)
  content: string | null;

  is_read: boolean;
  created_at: string; // ISO date
}

/* ===================== FORM PAYLOAD ===================== */

export interface CreateNotificationPayload {
  sender_id: string;        // thêm dòng này
  user_id: string;

  type?: string | null;
  reference_id?: string | null;
  reference_type?: string | null;
  content?: string | null;
}