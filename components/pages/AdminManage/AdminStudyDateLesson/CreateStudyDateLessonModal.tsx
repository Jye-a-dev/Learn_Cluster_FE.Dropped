// CreateStudyDateLessonModal.tsx
"use client";

import { useEffect, useState } from "react";
import { BookmarkSquareIcon } from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import { useStudyDatesMap } from "@/hooks/study_dates/useStudyDatesMap";
import { useLessonsMap } from "@/hooks/lessons/useLessonsMap";

import type { AddStudyDateLessonPayload } from "./StudyDateLessonUiTypes";

type Props = {
	open: boolean;
	studyDateId?: string;
	onClose: () => void;
	onSubmit: (data: AddStudyDateLessonPayload) => Promise<void>;
};

export default function CreateStudyDateLessonModal({
	open,
	studyDateId,
	onClose,
	onSubmit,
}: Props) {
	const { studyDatesMap } = useStudyDatesMap();
	const { lessonsMap } = useLessonsMap();

	const [form, setForm] = useState<AddStudyDateLessonPayload>({
		study_date_id: "",
		lesson_id: "",
	});

	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (!open) return;
		setForm({
			study_date_id: studyDateId ?? "",
			lesson_id: "",
		});
	}, [open, studyDateId]);

	async function handleSubmit() {
		if (!form.study_date_id || !form.lesson_id) return;

		try {
			setSubmitting(true);
			await onSubmit(form);
			onClose();
		} finally {
			setSubmitting(false);
		}
	}

	const inputBase =
		"w-full rounded-md bg-slate-900 text-slate-100 border border-slate-600 px-3 py-2 text-sm " +
		"focus:outline-none focus:ring-2 focus:ring-indigo-500";

	const labelBase = "text-xs font-semibold text-slate-300";

	return (
		<BaseFormModal
			open={open}
			title="Thêm Lesson vào Study Date"
			submitting={submitting}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<div className="space-y-4">
				{/* Study Date */}
				<div className="space-y-1.5">
					<label className={labelBase}>Study Date</label>
					<select
						className={inputBase}
						value={form.study_date_id}
						disabled={!!studyDateId}
						onChange={(e) =>
							setForm({ ...form, study_date_id: e.target.value })
						}
					>
						<option value="" disabled>
							Chọn study date
						</option>
						{Object.values(studyDatesMap).map((sd) => (
							<option key={sd.id} value={sd.id}>
								{sd.title ?? sd.id}
							</option>
						))}
					</select>
				</div>

				{/* Lesson */}
				<div className="space-y-1.5">
					<label className={labelBase}>Lesson</label>
					<div className="relative">
						<BookmarkSquareIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<select
							className={`${inputBase} pl-9`}
							value={form.lesson_id}
							onChange={(e) =>
								setForm({ ...form, lesson_id: e.target.value })
							}
						>
							<option value="">Chọn lesson</option>
							{Object.values(lessonsMap).map((l) => (
								<option key={l.id} value={l.id}>
									{l.title}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
		</BaseFormModal>
	);
}
