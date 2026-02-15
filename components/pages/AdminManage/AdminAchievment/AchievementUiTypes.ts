/* ===================== BASE TYPES ===================== */

import { ReactNode } from "react";

export interface Achievement {
    id: string; // UUID
    title: ReactNode; // dùng cho confirm modal
    user_id: string; // UUID
    name: string;
    description: string | null;
    awarded_at: string; // ISO date
}

/* ===================== FORM PAYLOAD ===================== */

export interface CreateAchievementPayload {
    user_id: string;
    name: string;
    description?: string | null;
}

export interface UpdateAchievementPayload {
    user_id?: string;
    name?: string;
    description?: string | null;
}
