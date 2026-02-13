"use client";

import type { BookmarkBE } from "@/hooks/bookmark/getBookmark";
import BaseConfirmModal from "../BaseModel/BaseConfirmModal";

type Props = {
  open: boolean;
  bookmark: BookmarkBE | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteBookmarkModal({
  open,
  bookmark,
  onClose,
  onConfirm,
}: Props) {
  if (!bookmark) return null;

  return (
    <BaseConfirmModal
      open={open}
      onClose={onClose}
      title="Xóa bookmark"
      danger
      confirmText="Xóa"
      description={
        <>
          Bạn có chắc chắn muốn xóa bookmark của user{" "}
          <span className="font-semibold text-white">
            {bookmark.user_id}
          </span>{" "}
          với lesson{" "}
          <span className="font-semibold text-white">
            {bookmark.lesson_id}
          </span>
          ?
          <br />
          <span className="text-red-400">
            Hành động này không thể hoàn tác.
          </span>
        </>
      }
      onConfirm={() => onConfirm(bookmark.id)}
    />
  );
}
