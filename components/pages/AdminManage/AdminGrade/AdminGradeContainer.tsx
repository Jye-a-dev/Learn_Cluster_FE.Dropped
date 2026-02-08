"use client";

import { useMemo, useState } from "react";

import {
	getGrades,
	addGrade,
	updateGrade,
	deleteGrade,
} from "@/hooks/grade/getGrade";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import GradeTable from "./GradeTable";
import CreateGradeModal from "./CreateGradeModal";
import UpdateGradeModal from "./UpdateGradeModal";
import ConfirmDeleteGradeModal from "./ConfirmDeleteGradeModal";
import SearchGrade from "./SearchGrade";
import CreateGradeButton from "./CreateGradeButton";

import type {
	Grade,
	AddGradePayload,
	UpdateGradePayload,
} from "./GradeUITypes";

export default function AdminGradeContainer() {
	const [search, setSearch] = useState("");

	const crud = useBaseCrudContainer<Grade>({
		fetchList: async () => {
			const data = await getGrades();
			return data ?? [];
		},
	});

	/* ===================== FILTER ===================== */
	const filteredGrades = useMemo(() => {
		const q = search.toLowerCase();
		return crud.items.filter(
			(g) =>
				g.submission_id.toLowerCase().includes(q) ||
				(g.grader_id ?? "").toLowerCase().includes(q)
		);
	}, [crud.items, search]);

	/* ===================== CRUD ===================== */
	async function handleCreate(data: AddGradePayload) {
		await addGrade(data);
		await crud.refresh();
	}

	async function handleUpdate(id: string, data: UpdateGradePayload) {
		await updateGrade(id, data);
		await crud.refresh();
	}

	async function handleConfirmDelete(id: string) {
		await deleteGrade(id);
		await crud.refresh();
	}

	/* ===================== RENDER ===================== */
	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-white">
					Quản lý Grade | Tổng: {crud.items.length}
				</h1>

				<CreateGradeButton
					onClick={() => crud.setOpenCreate(true)}
				/>
			</div>

			<SearchGrade
				search={search}
				onSearchChange={setSearch}
			/>

			{crud.loading ? (
				<p className="text-white/60">Đang tải grade…</p>
			) : filteredGrades.length === 0 ? (
				<p className="text-white/60">Chưa có grade</p>
			) : (
				<GradeTable
					grades={filteredGrades}
					onEdit={(g) => {
						crud.setSelectedItem(g);
						crud.setOpenUpdate(true);
					}}
					onDelete={(g) => {
						crud.setDeleteTarget(g);
						crud.setOpenDelete(true);
					}}
				/>
			)}

			<CreateGradeModal
				open={crud.openCreate}
				onClose={() => crud.setOpenCreate(false)}
				onSubmit={handleCreate}
			/>

			<UpdateGradeModal
				open={crud.openUpdate}
				grade={crud.selectedItem}
				onClose={() => {
					crud.setOpenUpdate(false);
					crud.setSelectedItem(null);
				}}
				onSubmit={handleUpdate}
			/>

			<ConfirmDeleteGradeModal
				open={crud.openDelete}
				grade={crud.deleteTarget}
				onClose={() => {
					crud.setOpenDelete(false);
					crud.setDeleteTarget(null);
				}}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
}
