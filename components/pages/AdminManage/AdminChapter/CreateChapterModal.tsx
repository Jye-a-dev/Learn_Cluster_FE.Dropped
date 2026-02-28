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
			title="Create Chapter"
			submitting={submitting}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<div className="space-y-6">

				{/* Course Section */}
				<div className="space-y-3">
					<label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
						Select Course
					</label>

					<input
						placeholder="Search course..."
						className="w-full bg-slate-800 border border-slate-600 
				text-slate-100 rounded-lg px-3 py-2 text-sm
				focus:outline-none focus:ring-2 focus:ring-emerald-500
				transition"
						value={searchCourse}
						onChange={(e) => setSearchCourse(e.target.value)}
					/>

					<select
						className="w-full bg-slate-800 border border-slate-600 
				text-slate-100 rounded-lg px-3 py-2 text-sm
				focus:outline-none focus:ring-2 focus:ring-emerald-500
				transition"
						value={form.course_id}
						onChange={(e) =>
							setForm({ ...form, course_id: e.target.value })
						}
					>
						<option value="" className="bg-slate-900">
							-- Choose course --
						</option>
						{filteredCourses.map((c) => (
							<option
								key={c.id}
								value={c.id}
								className="bg-slate-900"
							>
								{c.title}
							</option>
						))}
					</select>
				</div>

				{/* Title */}
				<div className="grid grid-cols-[140px_1fr] items-center gap-4">
					<label className="flex items-center gap-2 text-sm text-slate-400 font-medium">
						<BookOpenIcon className="h-4 w-4 text-emerald-400" />
						Title
					</label>
					<input
						className="bg-slate-800 border border-slate-600
				text-slate-100 rounded-lg px-3 py-2 text-sm
				focus:outline-none focus:ring-2 focus:ring-emerald-500
				transition"
						value={form.title}
						onChange={(e) =>
							setForm({ ...form, title: e.target.value })
						}
					/>
				</div>

				{/* Ordering */}
				<div className="grid grid-cols-[140px_1fr] items-center gap-4">
					<label className="flex items-center gap-2 text-sm text-slate-400 font-medium">
						<ListBulletIcon className="h-4 w-4 text-emerald-400" />
						Order
					</label>
					<input
						type="number"
						className="bg-slate-800 border border-slate-600
				text-slate-100 rounded-lg px-3 py-2 text-sm
				focus:outline-none focus:ring-2 focus:ring-emerald-500
				transition"
						value={form.ordering}
						onChange={(e) =>
							setForm({ ...form, ordering: e.target.value })
						}
					/>
				</div>

			</div>
		</BaseFormModal>);
}
