"use client";

import { useMemo, useState } from "react";

import {
	getEnrollments,
	addEnrollment,
	updateEnrollment,
	deleteEnrollment,
} from "@/hooks/enrollment/getEnrollment";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import EnrollmentTable from "./EnrollmentTable";
import CreateEnrollmentModal from "./CreateEnrollmentModal";
import UpdateEnrollmentModal from "./UpdateEnrollmentModal";
import ConfirmDeleteEnrollmentModal from "./ConfirmDeleteEnrollmentModal";
import SearchEnrollment from "./SearchEnrollment";
import CreateEnrollmentButton from "./CreateEnrollmentButton";

import type {
	Enrollment,
	AddEnrollmentPayload,
	UpdateEnrollmentPayload,
} from "./EnrollmentUiTypes";

export default function AdminEnrollmentContainer() {
	const [search, setSearch] = useState("");

	const crud = useBaseCrudContainer<Enrollment>({
		fetchList: async () => {
			const data = await getEnrollments();
			return data ?? [];
		},
	});

	const filteredEnrollments = useMemo(() => {
		const q = search.toLowerCase();
		return crud.items.filter(
			(e) =>
				e.user_id.toLowerCase().includes(q) ||
				e.course_id.toLowerCase().includes(q)
		);
	}, [crud.items, search]);

	async function handleCreate(data: AddEnrollmentPayload) {
		await addEnrollment(data);
		await crud.refresh();
	}

	async function handleUpdate(id: string, data: UpdateEnrollmentPayload) {
		await updateEnrollment(id, data);
		await crud.refresh();
	}

	async function handleConfirmDelete(id: string) {
		await deleteEnrollment(id);
		await crud.refresh();
	}

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-white">
					Quản lý Enrollment | Tổng: {crud.items.length}
				</h1>

				<CreateEnrollmentButton
					onClick={() => crud.setOpenCreate(true)}
				/>
			</div>

			<SearchEnrollment
				search={search}
				onSearchChange={setSearch}
			/>

			{crud.loading ? (
				<p className="text-white/60">Đang tải enrollment…</p>
			) : filteredEnrollments.length === 0 ? (
				<p className="text-white/60">Chưa có enrollment</p>
			) : (
				<EnrollmentTable
					enrollments={filteredEnrollments}
					onEdit={(e) => {
						crud.setSelectedItem(e);
						crud.setOpenUpdate(true);
					}}
					onDelete={(e) => {
						crud.setDeleteTarget(e);
						crud.setOpenDelete(true);
					}}
				/>
			)}

			<CreateEnrollmentModal
				open={crud.openCreate}
				onClose={() => crud.setOpenCreate(false)}
				onSubmit={handleCreate}
			/>

			<UpdateEnrollmentModal
				open={crud.openUpdate}
				enrollment={crud.selectedItem}
				onClose={() => {
					crud.setOpenUpdate(false);
					crud.setSelectedItem(null);
				}}
				onSubmit={handleUpdate}
			/>

			<ConfirmDeleteEnrollmentModal
				open={crud.openDelete}
				enrollment={crud.deleteTarget}
				onClose={() => {
					crud.setOpenDelete(false);
					crud.setDeleteTarget(null);
				}}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
}
