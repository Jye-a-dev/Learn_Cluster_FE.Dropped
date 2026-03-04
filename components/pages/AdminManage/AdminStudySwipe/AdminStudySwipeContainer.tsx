"use client";

import { useMemo, useState } from "react";
import {
	getStudySwipes,
	addStudySwipe,
	deleteStudySwipe,
	patchStudySwipe,
	countStudySwipes,
} from "@/hooks/study_swipe/getStudySwipe";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import StudySwipeTable from "./StudySwipeTable";
import CreateStudySwipeModal from "./CreateStudySwipeModal";
import UpdateStudySwipeModal from "./UpdateStudySwipeModal";
import ConfirmDeleteStudySwipeModal from "./ConfirmDeleteStudySwipeModal";
import SearchStudySwipe from "./SearchStudySwipe";
import CreateStudySwipeButton from "./CreateStudySwipeButton";

import type {
	StudySwipeUI,
	CreateStudySwipePayload,
	UpdateStudySwipePayload,
} from "./StudySwipeUiTypes";

export default function AdminStudySwipeContainer() {
	const [search, setSearch] = useState("");
	const { usersMap } = useUsersMap();

	const fetchList = useMemo(() => {
		return async () => {
			const data = await getStudySwipes();

			return data.map((s) => ({
				...s,
				swiper_name:
					usersMap[s.swiper_id]?.username ?? "—",
				target_name:
					usersMap[s.target_id]?.username ?? "—",
			}));
		};
	}, [usersMap]);

	const crud = useBaseCrudContainer<StudySwipeUI>({
		fetchList,
		fetchCount: countStudySwipes,
	});

	/* CREATE */
	async function handleCreate(data: CreateStudySwipePayload) {
		await addStudySwipe(data);
		crud.setOpenCreate(false);
		crud.refresh();
	}

	/* UPDATE */
	function handleEdit(item: StudySwipeUI) {
		crud.setSelectedItem(item);
		crud.setOpenUpdate(true);
	}

	async function handleUpdate(
		id: string,
		data: UpdateStudySwipePayload
	) {
		await patchStudySwipe(id, data);
		crud.setOpenUpdate(false);
		crud.setSelectedItem(null);
		crud.refresh();
	}

	/* DELETE */
	function handleDelete(item: StudySwipeUI) {
		crud.setDeleteTarget(item);
		crud.setOpenDelete(true);
	}

	async function handleConfirmDelete(id: string) {
		await deleteStudySwipe(id);
		crud.setOpenDelete(false);
		crud.setDeleteTarget(null);
		crud.refresh();
	}

	/* FILTER */
	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) return crud.items;

		return crud.items.filter(
			(p) =>
				p.swiper_name?.toLowerCase().includes(q) ||
				p.target_name?.toLowerCase().includes(q) ||
				p.status?.toLowerCase().includes(q)
		);
	}, [crud.items, search]);

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-white">
					Quản lý Study Swipe | Tổng: {crud.totalCount}
				</h1>

				<CreateStudySwipeButton
					onClick={() => crud.setOpenCreate(true)}
				/>
			</div>

			<SearchStudySwipe
				search={search}
				onSearchChange={setSearch}
			/>

			<StudySwipeTable
				items={filtered}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			<CreateStudySwipeModal
				open={crud.openCreate}
				onClose={() => crud.setOpenCreate(false)}
				onSubmit={handleCreate}
			/>

			<UpdateStudySwipeModal
				open={crud.openUpdate}
				item={crud.selectedItem}
				onClose={() => {
					crud.setOpenUpdate(false);
					crud.setSelectedItem(null);
				}}
				onSubmit={handleUpdate}
			/>

			<ConfirmDeleteStudySwipeModal
				open={crud.openDelete}
				item={crud.deleteTarget}
				onClose={() => {
					crud.setOpenDelete(false);
					crud.setDeleteTarget(null);
				}}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
}