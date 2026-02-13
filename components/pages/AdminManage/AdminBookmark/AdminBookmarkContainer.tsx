"use client";

import { useMemo, useState } from "react";
import {
  getBookmarks,
  addBookmark,
  updateBookmark,
  deleteBookmark,
} from "@/hooks/bookmark/getBookmark";

import { useBaseCrudContainer } from "@/components/pages/AdminManage/BaseModel/BaseCrudContainer";

import CreateBookmarkButton from "./CreateBookmarkButton";
import BookmarkTable from "./BookmarkTable";
import SearchBookmark from "./SearchBookmark";
import CreateBookmarkModal from "./CreateBookmarkModal";
import UpdateBookmarkModal from "./UpdateBookmarkModal";
import ConfirmDeleteBookmarkModal from "./ConfirmDeleteBookmarkModal";

import type {
  BookmarkBE,
  AddBookmarkPayload,
  UpdateBookmarkPayload,
} from "@/hooks/bookmark/getBookmark";

/* ===================== CONTAINER ===================== */

export default function AdminBookmarkContainer() {
  const [search, setSearch] = useState("");

  const {
    items: bookmarks,
    loading,

    openCreate,
    openUpdate,
    openDelete,

    selectedItem,
    deleteTarget,

    setOpenCreate,
    setOpenUpdate,
    setOpenDelete,
    setSelectedItem,
    setDeleteTarget,

    refresh,
  } = useBaseCrudContainer<BookmarkBE>({
    fetchList: getBookmarks,
    fetchCount: async () => {
      const data = await getBookmarks();
      return data.length;
    },
  });

  /* ===================== HANDLERS ===================== */

  async function handleCreate(data: AddBookmarkPayload) {
    await addBookmark(data);
    setOpenCreate(false);
    refresh();
  }

  function handleEdit(bookmark: BookmarkBE) {
    setSelectedItem(bookmark);
    setOpenUpdate(true);
  }

  async function handleUpdate(
    id: string,
    data: UpdateBookmarkPayload
  ) {
    await updateBookmark(id, data);
    setOpenUpdate(false);
    setSelectedItem(null);
    refresh();
  }

  function handleDelete(bookmark: BookmarkBE) {
    setDeleteTarget(bookmark);
    setOpenDelete(true);
  }

  async function handleConfirmDelete(id: string) {
    await deleteBookmark(id);
    setOpenDelete(false);
    setDeleteTarget(null);
    refresh();
  }

  /* ===================== FILTER ===================== */

  const filteredBookmarks = useMemo(() => {
    const q = search.toLowerCase();
    return bookmarks.filter(
      (b) =>
        b.user_id.toLowerCase().includes(q) ||
        b.lesson_id.toLowerCase().includes(q)
    );
  }, [bookmarks, search]);

  /* ===================== RENDER ===================== */

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">
          Quản lý Bookmark | Tổng bookmarks: {bookmarks.length}
        </h1>
        <CreateBookmarkButton
          onClick={() => setOpenCreate(true)}
        />
      </div>

      <SearchBookmark
        search={search}
        onSearchChange={setSearch}
      />

      {loading ? (
        <p className="text-white/60">Đang tải bookmarks…</p>
      ) : (
        <BookmarkTable
          bookmarks={filteredBookmarks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CreateBookmarkModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreate}
      />

      <UpdateBookmarkModal
        open={openUpdate}
        bookmark={selectedItem}
        onClose={() => {
          setOpenUpdate(false);
          setSelectedItem(null);
        }}
        onSubmit={handleUpdate}
      />

      <ConfirmDeleteBookmarkModal
        open={openDelete}
        bookmark={deleteTarget}
        onClose={() => {
          setOpenDelete(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </section>
  );
}
