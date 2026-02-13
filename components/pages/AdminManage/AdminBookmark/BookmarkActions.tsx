"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { BookmarkBE } from "@/hooks/bookmark/getBookmark";

type Props = {
  bookmark: BookmarkBE;
  onEdit: (bookmark: BookmarkBE) => void;
  onDelete: (bookmark: BookmarkBE) => void;
};

export default function BookmarkActions({
  bookmark,
  onEdit,
  onDelete,
}: Props) {
  return (
    <BaseAction
      items={[
        {
          label: "Sửa",
          onClick: () => onEdit(bookmark),
        },
        {
          label: "Xoá",
          onClick: () => onDelete(bookmark),
          danger: true,
        },
      ]}
    />
  );
}
