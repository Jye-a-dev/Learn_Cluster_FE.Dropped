"use client";

import { useMemo, useState } from "react";
import {
	getChapters,
	addChapter,
	updateChapter,
	deleteChapter,
	getChapterCount,
	type Chapter as ChapterApi,
	type AddChapterPayload,
	type UpdateChapterPayload as UpdateChapterApiPayload,
} from "@/hooks/chapters/getChapters";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import CreateChapterButton from "./CreateChapterButton";
import ChapterTable from "./ChapterTable";
import SearchChapter from "./SearchChapter";
import CreateChapterModal from "./CreateChapterModal";
import UpdateChapterModal from "./UpdateChapterModal";
import ConfirmDeleteChapterModal from "./ConfirmDeleteChapterModal";

import type {
	Chapter,
	CreateChapterPayload,
	UpdateChapterPayload,
} from "./ChapterUiTypes";

export default function AdminChapterContainer() {
	const [search, setSearch] = useState("");

	/* =======================
	   BASE CRUD
	======================= */
	const crud = useBaseCrudContainer<Chapter>({
		fetchList: async () => {
			const chapters = (await getChapters()) as ChapterApi[];

			return chapters.map((c) => ({
				id: c.id,
				course_id: c.course_id,
				title: c.title,
				description: c.description ?? null,
				ordering: c.ordering ?? 0,
				order: undefined, // ✅ FIX BẮT BUỘC
			}));
		},
		fetchCount: getChapterCount,
	});

	/* =======================
	   CREATE
	======================= */
	async function handleCreate(data: CreateChapterPayload) {
		const payload: AddChapterPayload = {
			course_id: data.course_id,
			title: data.title,
			description: data.description ?? null,
			ordering: data.ordering ?? 0,
		};

		await addChapter(payload);
		crud.setOpenCreate(false);
		crud.refresh();
	}

	/* =======================
	   UPDATE
	======================= */
	function handleEdit(chapter: Chapter) {
		crud.setSelectedItem(chapter);
		crud.setOpenUpdate(true);
	}

	async function handleUpdate(id: string, data: UpdateChapterPayload) {
		if (!crud.selectedItem) return;

		const current = crud.selectedItem;

		const payload: UpdateChapterApiPayload = {
			course_id: current.course_id,
			title: data.title ?? current.title,
			description:
				data.description !== undefined
					? data.description
					: current.description,
			ordering:
				data.ordering !== undefined
					? data.ordering
					: current.ordering,
		};

		await updateChapter(id, payload);
		crud.setOpenUpdate(false);
		crud.setSelectedItem(null);
		crud.refresh();
	}

	/* =======================
	   DELETE
	======================= */
	function handleDelete(chapter: Chapter) {
		crud.setDeleteTarget(chapter);
		crud.setOpenDelete(true);
	}

	async function handleConfirmDelete(id: string) {
		await deleteChapter(id);
		crud.setOpenDelete(false);
		crud.setDeleteTarget(null);
		crud.refresh();
	}

	/* =======================
	   FILTER
	======================= */
	const filteredChapters = useMemo(() => {
		const q = search.toLowerCase();
		return crud.items.filter((c) =>
			c.title.toLowerCase().includes(q)
		);
	}, [crud.items, search]);

	/* =======================
	   RENDER
	======================= */
	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-white">
					Quản lý Chapter | Tổng chapter: {crud.totalCount}
				</h1>
				<CreateChapterButton
					onClick={() => crud.setOpenCreate(true)}
				/>
			</div>

			<SearchChapter
				search={search}
				onSearchChange={setSearch}
			/>

			{crud.loading ? (
				<p className="text-white/60">
					Đang tải chapter…
				</p>
			) : (
				<ChapterTable
					chapters={filteredChapters}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			)}

			<CreateChapterModal
				open={crud.openCreate}
				onClose={() => crud.setOpenCreate(false)}
				onSubmit={handleCreate}
			/>

			<UpdateChapterModal
				open={crud.openUpdate}
				chapter={crud.selectedItem}
				onClose={() => {
					crud.setOpenUpdate(false);
					crud.setSelectedItem(null);
				}}
				onSubmit={handleUpdate}
			/>

			<ConfirmDeleteChapterModal
				open={crud.openDelete}
				chapter={crud.deleteTarget}
				onClose={() => {
					crud.setOpenDelete(false);
					crud.setDeleteTarget(null);
				}}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
}
