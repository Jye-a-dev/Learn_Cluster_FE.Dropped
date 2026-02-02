"use client";

import { useEffect, useMemo, useState } from "react";

import {
	getCourseInstructors,
	addCourseInstructor,
	updateCourseInstructor,
	deleteCourseInstructor,
	type CourseInstructor as CourseInstructorApi,
} from "@/hooks/course_instructors/getCourseInstructor ";

import { getCourses } from "@/hooks/courses/getCourse";
import { getUsers } from "@/hooks/users/getUsers";

import { useBaseCrudContainer } from "../BaseModel/BaseCrudContainer";

import CreateCourseInstructorButton from "./CreateCourseInstructorButton";
import CourseInstructorTable from "./CourseInstructorTable";
import SearchCourseInstructor from "./SearchCourseInstructor";
import CreateCourseInstructorModal from "./CreateCourseInstructorModal";
import UpdateCourseInstructorModal from "./UpdateCourseInstructorModal";
import ConfirmDeleteCourseInstructorModal from "./ConfirmDeleteCourseInstructorModal";

import type {
	CourseInstructor,
	CreateCourseInstructorPayload,
	UpdateCourseInstructorPayload,
} from "./CourseInstructorUiTypes";

/* ===== SHARED OPTION TYPE ===== */
type Option = {
	id: string;
	label: string;
};

type CourseInstructorRaw = CourseInstructorApi;

export default function AdminCourseInstructorContainer() {
	const [search, setSearch] = useState("");

	/* ===== lookup options (CHUẨN UI) ===== */
	const [courseOptions, setCourseOptions] = useState<Option[]>([]);
	const [userOptions, setUserOptions] = useState<Option[]>([]);

	/* ===== CRUD ===== */
	const crud = useBaseCrudContainer<CourseInstructor>({
		fetchList: async () => {
			const instructors =
				(await getCourseInstructors()) as CourseInstructorRaw[];
			return instructors.map((i) => ({
				...i,
				created_at: i.created_at ?? "",
			}));
		},
	});

	/* ===== fetch courses + users → OPTION ===== */
	useEffect(() => {
		getCourses().then((res) =>
			setCourseOptions(
				res.map((c) => ({
					id: c.id,
					label: c.title,
				}))
			)
		);

		getUsers().then((res) =>
			setUserOptions(
				res.map((u) => ({
					id: u.id,
					label: u.email, // không dùng full_name
				}))
			)
		);
	}, []);

	/* ===================== HANDLERS ===================== */

	async function handleCreate(data: CreateCourseInstructorPayload) {
		await addCourseInstructor(data);
		crud.setOpenCreate(false);
		crud.refresh();
	}

	function handleEdit(instructor: CourseInstructor) {
		crud.setSelectedItem(instructor);
		crud.setOpenUpdate(true);
	}

	async function handleUpdate(
		id: string,
		data: UpdateCourseInstructorPayload
	) {
		await updateCourseInstructor(id, data);
		crud.setOpenUpdate(false);
		crud.setSelectedItem(null);
		crud.refresh();
	}

	function handleDelete(instructor: CourseInstructor) {
		crud.setDeleteTarget(instructor);
		crud.setOpenDelete(true);
	}

	async function handleConfirmDelete(id: string) {
		await deleteCourseInstructor(id);
		crud.setOpenDelete(false);
		crud.setDeleteTarget(null);
		crud.refresh();
	}

	/* ===================== FILTER ===================== */

	const filteredInstructors = useMemo(() => {
		const q = search.toLowerCase();
		return crud.items.filter(
			(i) =>
				i.user_id.toLowerCase().includes(q) ||
				i.course_id.toLowerCase().includes(q) ||
				i.role_in_course.toLowerCase().includes(q)
		);
	}, [crud.items, search]);

	/* ===================== RENDER ===================== */

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-white">
					Quản lý Course Instructor
				</h1>
				<CreateCourseInstructorButton
					onClick={() => crud.setOpenCreate(true)}
				/>
			</div>

			<SearchCourseInstructor
				search={search}
				onSearchChange={setSearch}
			/>

			{crud.loading ? (
				<p className="text-white/60">Đang tải instructor…</p>
			) : (
				<CourseInstructorTable
					instructors={filteredInstructors}
					courseOptions={courseOptions}
					userOptions={userOptions}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			)}

			<CreateCourseInstructorModal
				open={crud.openCreate}
				onClose={() => crud.setOpenCreate(false)}
				onSubmit={handleCreate}
			/>

			<UpdateCourseInstructorModal
				open={crud.openUpdate}
				instructor={crud.selectedItem}
				onClose={() => {
					crud.setOpenUpdate(false);
					crud.setSelectedItem(null);
				}}
				onSubmit={handleUpdate}
				courseOptions={courseOptions}
				userOptions={userOptions}
			/>

			<ConfirmDeleteCourseInstructorModal
				open={crud.openDelete}
				instructor={crud.deleteTarget}
				onClose={() => {
					crud.setOpenDelete(false);
					crud.setDeleteTarget(null);
				}}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
}
