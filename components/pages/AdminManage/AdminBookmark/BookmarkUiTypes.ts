/* ===================== BASE TYPES ===================== */

export type BookmarkName = string;

export interface Bookmark {
  id: number;   // ✅ UUID
  name: string;
  url: string;
  description?: string;
}


/* ===================== FORM PAYLOAD ===================== */

export interface CreateBookmarkPayload {
  name: string;
  url: string;
  description?: string;
}

export interface UpdateBookmarkPayload {
  name?: string;
  url?: string;
  description?: string;
}
