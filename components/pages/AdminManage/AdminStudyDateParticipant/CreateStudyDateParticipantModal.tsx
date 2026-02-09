"use client";

import { useEffect, useState } from "react";
import { UserIcon, CalendarIcon } from "@heroicons/react/24/outline";

import BaseFormModal from "../BaseModel/BaseFormModal";
import { useUsersMap } from "@/hooks/users/useUsersMap";
import { useStudyDatesMap } from "@/hooks/study_dates/useStudyDatesMap";

import type {
	JoinStudyDateParticipantPayload,
} from "./StudyDateParticipantUiTypes";

type Props = {
	open: boolean;
	studyDateId?: string;
	onClose: () => void;
	onSubmit: (data: JoinStudyDateParticipantPayload) => Promise<void>;
};

export default function CreateStudyDateParticipantModal({
	open,
	studyDateId,
	onClose,
	onSubmit,
}: Props) {
	const { usersMap, loading: userLoading } = useUsersMap();
	const { studyDatesMap, loading: studyDateLoading } = useStudyDatesMap();

	const [form, setForm] = useState({
		study_date_id: studyDateId ?? "",
		user_id: "",
	});

	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (open) {
			setForm((f) => ({
				...f,
				study_date_id: studyDateId ?? "",
				user_id: "",
			}));
		}
	}, [open, studyDateId]);

	async function handleSubmit() {
		if (!form.study_date_id || !form.user_id) return;

		try {
			setSubmitting(true);

			await onSubmit({
				study_date_id: form.study_date_id,
				user_id: form.user_id,
			});

			onClose();
			setForm({
				study_date_id: studyDateId ?? "",
				user_id: "",
			});
		} finally {
			setSubmitting(false);
		}
	}

	/* ===== shared styles ===== */

	const selectBase =
		"w-full rounded-md bg-slate-900 text-slate-100 border border-slate-600 px-3 py-2 text-sm " +
		"focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

	const labelBase = "text-xs font-semibold text-slate-300";

	return (
		<BaseFormModal
			open={open}
			title="Thêm học viên vào Study Date"
			submitting={submitting}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<div className="space-y-5">
				{/* ===== Study Date ===== */}
				<div className="space-y-1.5">
					<label className={labelBase}>Study Date</label>
					<div className="relative">
						<CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<select
							className={`${selectBase} pl-9`}
							value={form.study_date_id}
							disabled={!!studyDateId}
							onChange={(e) =>
								setForm({
									...form,
									study_date_id: e.target.value,
								})
							}
						>
							<option value="" disabled>
								{studyDateLoading
									? "Đang tải study date..."
									: "Chọn study date"}
							</option>
							{Object.values(studyDatesMap).map((sd) => (
								<option key={sd.id} value={sd.id}>
									{sd.title ?? sd.id}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* ===== User ===== */}
				<div className="space-y-1.5">
					<label className={labelBase}>Học viên</label>
					<div className="relative">
						<UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
						<select
							className={`${selectBase} pl-9`}
							value={form.user_id}
							onChange={(e) =>
								setForm({
									...form,
									user_id: e.target.value,
								})
							}
						>
							<option value="">
								{userLoading
									? "Đang tải người dùng..."
									: "Chọn học viên"}
							</option>
							{Object.values(usersMap).map((u) => (
								<option key={u.id} value={u.id}>
									{u.username}
								</option>
							))}
						</select>
					</div>
				</div>

				<p className="text-xs text-slate-400 border-t border-slate-700 pt-3">
					Học viên sẽ được ghi nhận tham gia study date ngay sau khi thêm.
				</p>
			</div>
		</BaseFormModal>
	);
}
