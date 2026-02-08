"use client";

import { useEffect, useState } from "react";
import {
	CalendarIcon,
	MapPinIcon,
	BookmarkSquareIcon,
	UserIcon,
} from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";

import type { CreateStudyDatePayload } from "./StudyDateUiTypes";

type Props = {
	open: boolean;
	courseId?: string;
	createdBy?: string | null;
	onClose: () => void;
	onSubmit: (data: CreateStudyDatePayload) => Promise<void>;
};

export default function CreateStudyDateModal({
	open,
	courseId,
	createdBy,
	onClose,
	onSubmit,
}: Props) {
	const { coursesMap, loading: courseLoading } = useCoursesMap();
	const { usersMap, loading: userLoading } = useUsersMap();

	const [form, setForm] = useState({
		course_id: courseId ?? "",
		title: "",
		scheduled_at: "",
		location: "",
		created_by: createdBy ?? "",
	});

	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (open) {
			setForm((f) => ({
				...f,
				course_id: courseId ?? "",
				created_by: createdBy ?? "",
			}));
		}
	}, [open, courseId, createdBy]);

	async function handleSubmit() {
		if (!form.course_id) return;

		try {
			setSubmitting(true);

			await onSubmit({
				course_id: form.course_id,
				title: form.title || undefined,
				scheduled_at: form.scheduled_at || undefined,
				location: form.location || undefined,
				created_by: form.created_by || undefined,
			});

			onClose();
			setForm({
				course_id: courseId ?? "",
				title: "",
				scheduled_at: "",
				location: "",
				created_by: createdBy ?? "",
			});
		} finally {
			setSubmitting(false);
		}
	}

	/* ===== shared styles ===== */
	const inputBase =
		"w-full rounded-md bg-slate-900 text-slate-100 border border-slate-600 px-3 py-2 text-sm " +
		"focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

	const selectBase =
		"w-full rounded-md bg-slate-900 text-slate-100 border border-slate-600 px-3 py-2 text-sm " +
		"focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

	const labelBase = "text-xs font-semibold text-slate-300";

	return (
		<BaseFormModal
			open={open}
			title="Tạo Study Date"
			submitting={submitting}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<div className="space-y-5">
				{/* ===== Course ===== */}
				<div className="space-y-1.5">
					<label className={labelBase}>Khóa học</label>
					<select
						className={selectBase}
						value={form.course_id}
						disabled={!!courseId}
						onChange={(e) =>
							setForm({ ...form, course_id: e.target.value })
						}
					>
						<option value="" disabled>
							{courseLoading ? "Đang tải khóa học..." : "Chọn khóa học"}
						</option>
						{Object.values(coursesMap).map((c) => (
							<option key={c.id} value={c.id}>
								{c.title}
							</option>
						))}
					</select>
				</div>

				{/* ===== Created by ===== */}
				<div className="space-y-1.5">
					<label className={labelBase}>Người tạo</label>
					<div className="relative">
						<UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<select
							className={`${selectBase} pl-9`}
							value={form.created_by}
							onChange={(e) =>
								setForm({ ...form, created_by: e.target.value })
							}
						>
							<option value="">
								{userLoading ? "Đang tải người dùng..." : "Chọn người tạo"}
							</option>
							{Object.values(usersMap).map((u) => (
								<option key={u.id} value={u.id}>
									{u.username}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* ===== Title ===== */}
				<div className="space-y-1.5">
					<label className={labelBase}>Tiêu đề</label>
					<div className="relative">
						<BookmarkSquareIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<input
							className={`${inputBase} pl-9`}
							placeholder="Ví dụ: Ôn tập giữa kỳ"
							value={form.title}
							onChange={(e) =>
								setForm({ ...form, title: e.target.value })
							}
						/>
					</div>
				</div>

				{/* ===== Scheduled at ===== */}
				<div className="space-y-1.5">
					<label className={labelBase}>Thời gian</label>
					<div className="relative">
						<CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<input
							type="datetime-local"
							className={`${inputBase} pl-9`}
							value={form.scheduled_at}
							onChange={(e) =>
								setForm({ ...form, scheduled_at: e.target.value })
							}
						/>
					</div>
				</div>

				{/* ===== Location ===== */}
				<div className="space-y-1.5">
					<label className={labelBase}>Địa điểm</label>
					<div className="relative">
						<MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
						<textarea
							rows={3}
							className={`${inputBase} pl-9 resize-none`}
							placeholder="Phòng học / Link online"
							value={form.location}
							onChange={(e) =>
								setForm({ ...form, location: e.target.value })
							}
						/>
					</div>
				</div>

				<p className="text-xs text-slate-400 border-t border-slate-700 pt-3">
					Study date dùng để lên lịch học cho khóa học (online hoặc offline).
				</p>
			</div>
		</BaseFormModal>
	);
}
