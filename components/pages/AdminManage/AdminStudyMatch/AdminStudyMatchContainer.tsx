"use client";

import { useMemo, useState } from "react";

import {
	getStudyMatches,
	addStudyMatch,
	deleteStudyMatch,
	countStudyMatches,
} from "@/hooks/study_matches/getStudyMatch";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import StudyMatchTable from "./StudyMatchTable";
import CreateStudyMatchModal from "./CreateStudyMatchModal";
import ConfirmDeleteStudyMatchModal from "./ConfirmDeleteStudyMatchModal";
import SearchStudyMatch from "./SearchStudyMatch";
import CreateStudyMatchButton from "./CreateStudyMatchButton";

import type {
	StudyMatchUI,
	CreateStudyMatchPayload,
} from "./StudyMatchUiTypes";

export default function AdminStudyMatchContainer() {
	const [search, setSearch] = useState("");
	const { usersMap } = useUsersMap();

	const fetchList = useMemo(() => {
		return async () => {
			const data = await getStudyMatches();

			return data.map((m) => ({
				...m,
				user1_name:
					usersMap[m.user1_id]?.username ??
					"—",
				user2_name:
					usersMap[m.user2_id]?.username ??
					"—",
			}));
		};
	}, [usersMap]);

	const crud =
		useBaseCrudContainer<StudyMatchUI>({
			fetchList,
			fetchCount: countStudyMatches,
		});

	/* CREATE */
	async function handleCreate(
		data: CreateStudyMatchPayload
	) {
		await addStudyMatch(data);
		crud.setOpenCreate(false);
		crud.refresh();
	}

	/* DELETE */
	function handleDelete(item: StudyMatchUI) {
		crud.setDeleteTarget(item);
		crud.setOpenDelete(true);
	}

	async function handleConfirmDelete(id: string) {
		await deleteStudyMatch(id);
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
				p.user1_name
					?.toLowerCase()
					.includes(q) ||
				p.user2_name
					?.toLowerCase()
					.includes(q)
		);
	}, [crud.items, search]);

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-white">
					Quản lý Study Match | Tổng:{" "}
					{crud.totalCount}
				</h1>

				<CreateStudyMatchButton
					onClick={() =>
						crud.setOpenCreate(true)
					}
				/>
			</div>

			<SearchStudyMatch
				search={search}
				onSearchChange={setSearch}
			/>

			<StudyMatchTable
				items={filtered}
				onDelete={handleDelete}
			/>

			<CreateStudyMatchModal
				open={crud.openCreate}
				onClose={() =>
					crud.setOpenCreate(false)
				}
				onSubmit={handleCreate}
			/>

			<ConfirmDeleteStudyMatchModal
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