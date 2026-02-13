"use client";

import BaseTable, {
  BaseColumn,
} from "@/components/pages/AdminManage/BaseModel/BaseTable";
import BookmarkActions from "./BookmarkActions";
import type { BookmarkBE } from "@/hooks/bookmark/getBookmark";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";

type Props = {
  bookmarks: BookmarkBE[];
  onEdit: (bookmark: BookmarkBE) => void;
  onDelete: (bookmark: BookmarkBE) => void;
};

export default function BookmarkTable({
  bookmarks,
  onEdit,
  onDelete,
}: Props) {
  const { usersMap, loading: loadingUsers } =
    useUsersMap();

  const {
    lessonsMap,
    loading: loadingLessons,
  } = useLessonsMap();

  const columns: BaseColumn<BookmarkBE>[] = [
    {
      key: "id",
      header: "ID",
      className:
        "px-4 py-3 text-left font-mono text-xs text-white/60",
      render: (b) => b.id,
    },

    /* ================= USER ================= */

    {
      key: "user",
      header: "User",
      className:
        "px-4 py-3 text-left text-white/80",
      render: (b) => {
        if (loadingUsers) return "Loading…";

        const user = usersMap[b.user_id];
        return user?.username ?? (
          <span className="text-white/50">—</span>
        );
      },
    },

    /* ================= LESSON ================= */

    {
      key: "lesson",
      header: "Lesson",
      className:
        "px-4 py-3 text-left text-white/80",
      render: (b) => {
        if (loadingLessons) return "Loading…";

        const lesson =
          lessonsMap[b.lesson_id];

        return lesson?.title ?? (
          <span className="text-white/50">—</span>
        );
      },
    },

    /* ================= CREATED ================= */

    {
      key: "created_at",
      header: "Created At",
      className:
        "px-4 py-3 text-left text-white/60 text-xs",
      render: (b) =>
        b.created_at
          ? new Date(
              b.created_at
            ).toLocaleString("vi-VN", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "—",
    },

    /* ================= ACTIONS ================= */

    {
      key: "actions",
      header: "Actions",
      className:
        "px-4 py-3 text-center",
      render: (b) => (
        <BookmarkActions
          bookmark={b}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <BaseTable
      data={bookmarks}
      columns={columns}
      wrapperClassName="rounded-xl border border-white/30"
      tableClassName="w-full text-sm text-white"
      headClassName="bg-cyan-800/50"
      rowClassName={() =>
        "border-t border-white/10 hover:bg-white/5"
      }
      emptyText="Không có bookmark"
      rowsPerPage={10}
    />
  );
}
