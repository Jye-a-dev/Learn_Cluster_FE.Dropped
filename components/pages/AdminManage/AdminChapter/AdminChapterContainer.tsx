"use client";

import { useEffect, useMemo, useState } from "react";
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
	const [rawChapters, setRawChapters] = useState<Chapter[]>([]);
	const [loading, setLoading] = useState(false);
	const [totalCount, setTotalCount] = useState(0);

	const [openCreate, setOpenCreate] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
	const [deleteTarget, setDeleteTarget] = useState<Chapter | null>(null);

	const [search, setSearch] = useState("");

	useEffect(() => {
		refresh();
	}, []);

	async function refresh() {
		setLoading(true);
		try {
			const [chapters, count] = await Promise.all([
				getChapters(),
				getChapterCount(),
			]);

			const normalized: Chapter[] = (chapters as ChapterApi[]).map((c) => ({
				id: c.id,
				course_id: c.course_id,
				title: c.title,
				description: c.description ?? null,
				ordering: c.ordering ?? 0,
				order: undefined, // ✅ FIX BẮT BUỘC
			}));

			setRawChapters(normalized);
			setTotalCount(count);
		} finally {
			setLoading(false);
		}
	}

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
		refresh();
	}

	/* =======================
	   UPDATE
	======================= */
	function handleEdit(chapter: Chapter) {
		setSelectedChapter(chapter);
		setOpenUpdate(true);
	}

	async function handleUpdate(id: string, data: UpdateChapterPayload) {
		if (!selectedChapter) return;

		const payload: UpdateChapterApiPayload = {
			course_id: selectedChapter.course_id,
			title: data.title ?? selectedChapter.title,
			description:
				data.description !== undefined
					? data.description
					: selectedChapter.description,
			ordering:
				data.ordering !== undefined
					? data.ordering
					: selectedChapter.ordering,
		};

		await updateChapter(id, payload);
		setOpenUpdate(false);
		setSelectedChapter(null);
		refresh();
	}

	/* =======================
	   DELETE
	======================= */
	function handleDelete(chapter: Chapter) {
		setDeleteTarget(chapter);
		setOpenDelete(true);
	}

	async function handleConfirmDelete(id: string) {
		await deleteChapter(id);
		setOpenDelete(false);
		setDeleteTarget(null);
		refresh();
	}

	/* =======================
	   FILTER
	======================= */
	const filteredChapters = useMemo(() => {
		const q = search.toLowerCase();
		return rawChapters.filter((c) =>
			c.title.toLowerCase().includes(q)
		);
	}, [rawChapters, search]);

	/* =======================
	   RENDER
	======================= */
	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-white">
					Quản lý Chapter | Tổng chapter: {totalCount}
				</h1>
				<CreateChapterButton onClick={() => setOpenCreate(true)} />
			</div>

			<SearchChapter search={search} onSearchChange={setSearch} />

			{loading ? (
				<p className="text-white/60">Đang tải chapter…</p>
			) : (
				<ChapterTable
					chapters={filteredChapters}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			)}

			<CreateChapterModal
				open={openCreate}
				onClose={() => setOpenCreate(false)}
				onSubmit={handleCreate}
			/>

			<UpdateChapterModal
				open={openUpdate}
				chapter={selectedChapter}
				onClose={() => {
					setOpenUpdate(false);
					setSelectedChapter(null);
				}}
				onSubmit={handleUpdate}
			/>

			<ConfirmDeleteChapterModal
				open={openDelete}
				chapter={deleteTarget}
				onClose={() => {
					setOpenDelete(false);
					setDeleteTarget(null);
				}}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
}
