"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpenIcon, ListBulletIcon } from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import type { CreateChapterPayload } from "./ChapterUiTypes";
import { getCourses } from "@/hooks/courses/getCourse";

type CourseOption = {
	id: string;
	title: string;
};

type Props = {
	open: boolean;
	onClose: () => void;
	onSubmit: (data: CreateChapterPayload) => Promise<void>;
};

export default function CreateChapterModal({
	open,
	onClose,
	onSubmit,
}: Props) {
	const [courses, setCourses] = useState<CourseOption[]>([]);
	const [searchCourse, setSearchCourse] = useState("");

	const [form, setForm] = useState({
		course_id: "",
		title: "",
		description: "",
		ordering: "",
	});

	const [submitting, setSubmitting] = useState(false);

	/* =======================
	   LOAD COURSES
	======================= */
	useEffect(() => {
		if (!open) return;

		getCourses().then((res) => {
			setCourses(
				res.map((c) => ({
					id: c.id,
					title: c.title,
				}))
			);
		});
	}, [open]);

	const filteredCourses = useMemo(() => {
		const q = searchCourse.toLowerCase();
		return courses.filter((c) =>
			c.title.toLowerCase().includes(q)
		);
	}, [courses, searchCourse]);

	/* =======================
	   SUBMIT
	======================= */
	async function handleSubmit() {
		if (!form.title.trim() || !form.course_id) return;

		try {
			setSubmitting(true);

			await onSubmit({
				course_id: form.course_id,
				title: form.title.trim(),
				description: form.description || undefined,
				ordering: form.ordering
					? Number(form.ordering)
					: undefined,
			});

			onClose();
			setForm({
				course_id: "",
				title: "",
				description: "",
				ordering: "",
			});
			setSearchCourse("");
		} finally {
			setSubmitting(false);
		}
	}

	/* =======================
	   RENDER
	======================= */
	return (
		<BaseFormModal
			open={open}
			title="Tạo Chapter"
			submitting={submitting}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			{/* Course Dropdown */}
			<div className="space-y-2">
				<label className="text-xs font-medium text-white/70">
					Course
				</label>

				<input
					placeholder="Tìm course theo tên…"
					className="input-admin text-white border border-white rounded-md"
					value={searchCourse}
					onChange={(e) => setSearchCourse(e.target.value)}
				/>

				<select
					className="input-admin text-white border border-white rounded-md"
					value={form.course_id}
					onChange={(e) =>
						setForm({ ...form, course_id: e.target.value })
					}
				>
					<option value="">-- Chọn course --</option>
					{filteredCourses.map((c) => (
						<option key={c.id} value={c.id}>
							{c.title}
						</option>
					))}
				</select>
			</div>

			{/* Title */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<BookOpenIcon className="h-4 w-4 text-white/40" />
					Title
				</label>
				<input
					className="input-admin text-white border border-white rounded-md"
					value={form.title}
					onChange={(e) =>
						setForm({ ...form, title: e.target.value })
					}
				/>
			</div>

			{/* Description */}
			<div className="grid grid-cols-[140px_1fr] items-start gap-3">
				<label className="pt-2 text-xs font-medium text-white/70">
					Description
				</label>
				<textarea
					rows={3}
					className="input-admin text-white border border-white rounded-md"
					value={form.description}
					onChange={(e) =>
						setForm({ ...form, description: e.target.value })
					}
				/>
			</div>

			{/* Ordering */}
			<div className="grid grid-cols-[140px_1fr] items-center gap-3">
				<label className="flex items-center gap-2 text-xs font-medium text-white/70">
					<ListBulletIcon className="h-4 w-4 text-white/40" />
					Ordering
				</label>
				<input
					type="number"
					className="input-admin text-white border border-white rounded-md"
					value={form.ordering}
					onChange={(e) =>
						setForm({ ...form, ordering: e.target.value })
					}
				/>
			</div>
		</BaseFormModal>
	);
}
