"use client";

import { useMemo, useState } from "react";
import {
	getCourses,
	addCourse,
	updateCourse,
	deleteCourse,
	getCourseCount,
	type Course as CourseApi,
} from "@/hooks/courses/getCourse";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import CreateCourseButton from "./CreateCourseButton";
import CourseTable from "./CourseTable";
import SearchCourse from "./SearchCourse";
import CreateCourseModal from "./CreateCourseModal";
import UpdateCourseModal from "./UpdateCourseModal";
import ConfirmDeleteCourseModal from "./ConfirmDeleteCourseModal";

import type {
	Course,
	CreateCoursePayload,
	UpdateCoursePayload,
} from "./CourseUiTypes";

type CourseRaw = CourseApi;

export default function AdminCourseContainer() {
	const [search, setSearch] = useState("");

	const crud = useBaseCrudContainer<Course>({
		fetchList: async () => {
			const courses = (await getCourses()) as CourseRaw[];
			return courses.map((c) => ({
				...c,
				created_at: c.created_at ?? "",
				updated_at: c.updated_at ?? "",
			}));
		},
		fetchCount: getCourseCount,
	});

	/* ===================== HANDLERS ===================== */

	async function handleCreate(data: CreateCoursePayload) {
		await addCourse(data);
		crud.setOpenCreate(false);
		crud.refresh();
	}

	function handleEdit(course: Course) {
		crud.setSelectedItem(course);
		crud.setOpenUpdate(true);
	}

	async function handleUpdate(id: string, data: UpdateCoursePayload) {
		await updateCourse(id, data);
		crud.setOpenUpdate(false);
		crud.setSelectedItem(null);
		crud.refresh();
	}

	function handleDelete(course: Course) {
		crud.setDeleteTarget(course);
		crud.setOpenDelete(true);
	}

	async function handleConfirmDelete(id: string) {
		await deleteCourse(id);
		crud.setOpenDelete(false);
		crud.setDeleteTarget(null);
		crud.refresh();
	}

	/* ===================== FILTER ===================== */

	const filteredCourses = useMemo(() => {
		const q = search.toLowerCase();
		return crud.items.filter((c) =>
			c.title.toLowerCase().includes(q)
		);
	}, [crud.items, search]);

	/* ===================== RENDER ===================== */

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-white">
					Quản lý Course | Tổng course: {crud.totalCount}
				</h1>
				<CreateCourseButton
					onClick={() => crud.setOpenCreate(true)}
				/>
			</div>

			<SearchCourse
				search={search}
				onSearchChange={setSearch}
			/>

			{crud.loading ? (
				<p className="text-white/60">Đang tải course…</p>
			) : (
				<CourseTable
					courses={filteredCourses}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			)}

			<CreateCourseModal
				open={crud.openCreate}
				onClose={() => crud.setOpenCreate(false)}
				onSubmit={handleCreate}
			/>

			<UpdateCourseModal
				open={crud.openUpdate}
				course={crud.selectedItem}
				onClose={() => {
					crud.setOpenUpdate(false);
					crud.setSelectedItem(null);
				}}
				onSubmit={handleUpdate}
			/>

			<ConfirmDeleteCourseModal
				open={crud.openDelete}
				course={crud.deleteTarget}
				onClose={() => {
					crud.setOpenDelete(false);
					crud.setDeleteTarget(null);
				}}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
}
