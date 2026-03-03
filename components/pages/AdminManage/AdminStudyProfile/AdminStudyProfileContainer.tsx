"use client";

import { useMemo, useState } from "react";

import {
	getStudyProfiles,
	addStudyProfile,
	deleteStudyProfile,
	patchStudyProfile,
	countStudyProfiles,
} from "@/hooks/study_profile/getStudyProfile";

import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import StudyProfileTable from "./StudyProfileTable";
import CreateStudyProfileModal from "./CreateStudyProfileModal";
import UpdateStudyProfileModal from "./UpdateStudyProfileModal";
import ConfirmDeleteStudyProfileModal from "./ConfirmDeleteStudyProfileModal";
import SearchStudyProfile from "./SearchStudyProfile";
import CreateStudyProfileButton from "./CreateStudyProfileButton";

import type {
	StudyProfileUI,
	CreateStudyProfilePayload,
	UpdateStudyProfilePayload,
} from "./StudyProfileUiTypes";

export default function AdminStudyProfileContainer() {
	const [search, setSearch] = useState("");
	const { usersMap } = useUsersMap();

	const fetchList = useMemo(() => {
		return async () => {
			const data = await getStudyProfiles();

			return data.map((p) => ({
				...p,
				user_name: usersMap[p.user_id]?.username ?? "—",
			}));
		};
	}, [usersMap]);

	const crud = useBaseCrudContainer<StudyProfileUI>({
		fetchList,
		fetchCount: countStudyProfiles,
	});


	/* ================= CREATE ================= */
	async function handleCreate(data: CreateStudyProfilePayload) {
		await addStudyProfile(data);
		crud.setOpenCreate(false);
		crud.refresh();
	}

	/* ================= UPDATE ================= */
	function handleEdit(profile: StudyProfileUI) {
		crud.setSelectedItem(profile);
		crud.setOpenUpdate(true);
	}

	async function handleUpdate(
		id: string,
		data: UpdateStudyProfilePayload
	) {
		await patchStudyProfile(id, data);
		crud.setOpenUpdate(false);
		crud.setSelectedItem(null);
		crud.refresh();
	}

	/* ================= DELETE ================= */
	function handleDelete(profile: StudyProfileUI) {
		crud.setDeleteTarget(profile);
		crud.setOpenDelete(true);
	}

	async function handleConfirmDelete(id: string) {
		await deleteStudyProfile(id);
		crud.setOpenDelete(false);
		crud.setDeleteTarget(null);
		crud.refresh();
	}

	/* ================= FILTER ================= */
	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) return crud.items;

		return crud.items.filter(
			(p) =>
				p.user_name?.toLowerCase().includes(q) ||
				p.preferred_subject?.toLowerCase().includes(q)
		);
	}, [crud.items, search]);

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-white">
					Quản lý Study Profile | Tổng: {crud.totalCount}
				</h1>

				<CreateStudyProfileButton
					onClick={() => crud.setOpenCreate(true)}
				/>
			</div>

			<SearchStudyProfile
				search={search}
				onSearchChange={setSearch}
			/>

			<StudyProfileTable
				profiles={filtered}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			<CreateStudyProfileModal
				open={crud.openCreate}
				onClose={() => crud.setOpenCreate(false)}
				onSubmit={handleCreate}
			/>

			<UpdateStudyProfileModal
				open={crud.openUpdate}
				profile={crud.selectedItem}
				onClose={() => {
					crud.setOpenUpdate(false);
					crud.setSelectedItem(null);
				}}
				onSubmit={handleUpdate}
			/>

			<ConfirmDeleteStudyProfileModal
				open={crud.openDelete}
				profile={crud.deleteTarget}
				onClose={() => {
					crud.setOpenDelete(false);
					crud.setDeleteTarget(null);
				}}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
}