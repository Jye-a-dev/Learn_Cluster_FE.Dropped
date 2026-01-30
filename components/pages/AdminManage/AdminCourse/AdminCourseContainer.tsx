"use client";

import { useEffect, useMemo, useState } from "react";
import {
	getCourses,
	addCourse,
	updateCourse,
	deleteCourse,
	getCourseCount,
	type Course as CourseApi,
} from "@/hooks/courses/getCourse";

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
	const [rawCourses, setRawCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(false);
	const [totalCount, setTotalCount] = useState(0);

	const [openCreate, setOpenCreate] = useState(false);
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);

	const [search, setSearch] = useState("");

	useEffect(() => {
		refresh();
	}, []);

	async function refresh() {
		setLoading(true);
		try {
			const [courses, count] = await Promise.all([
				getCourses(),
				getCourseCount(),
			]);

			const normalized: Course[] = (courses as CourseRaw[]).map((c) => ({
				...c,
				created_at: c.created_at ?? "",
				updated_at: c.updated_at ?? "",
			}));

			setRawCourses(normalized);
			setTotalCount(count);
		} finally {
			setLoading(false);
		}
	}

	async function handleCreate(data: CreateCoursePayload) {
		await addCourse(data);
		refresh();
	}

	function handleEdit(course: Course) {
		setSelectedCourse(course);
		setOpenUpdate(true);
	}

	async function handleUpdate(id: string, data: UpdateCoursePayload) {
		await updateCourse(id, data);
		setOpenUpdate(false);
		setSelectedCourse(null);
		refresh();
	}

	function handleDelete(course: Course) {
		setDeleteTarget(course);
		setOpenDelete(true);
	}

	async function handleConfirmDelete(id: string) {
		await deleteCourse(id);
		setOpenDelete(false);
		setDeleteTarget(null);
		refresh();
	}

	const courses = useMemo(() => rawCourses, [rawCourses]);

	const filteredCourses = useMemo(() => {
		const q = search.toLowerCase();
		return courses.filter((c) => c.title.toLowerCase().includes(q));
	}, [courses, search]);

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-white">
					Quản lý Course | Tổng course: {totalCount}
				</h1>
				<CreateCourseButton onClick={() => setOpenCreate(true)} />
			</div>

			<SearchCourse search={search} onSearchChange={setSearch} />

			{loading ? (
				<p className="text-white/60">Đang tải course…</p>
			) : (
				<CourseTable
					courses={filteredCourses}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			)}

			<CreateCourseModal
				open={openCreate}
				onClose={() => setOpenCreate(false)}
				onSubmit={handleCreate}
			/>

			<UpdateCourseModal
				open={openUpdate}
				course={selectedCourse}
				onClose={() => {
					setOpenUpdate(false);
					setSelectedCourse(null);
				}}
				onSubmit={handleUpdate}
			/>

			<ConfirmDeleteCourseModal
				open={openDelete}
				course={deleteTarget}
				onClose={() => {
					setOpenDelete(false);
					setDeleteTarget(null);
				}}
				onConfirm={handleConfirmDelete}
			/>
		</section>
	);
}
