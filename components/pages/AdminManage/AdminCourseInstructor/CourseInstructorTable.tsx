"use client";

import { useMemo } from "react";
import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
import CourseInstructorActions from "./CourseInstructorActions";
import type { CourseInstructor } from "./CourseInstructorUiTypes";

type Option = {
	id: string;
	label: string;
};

type Props = {
	instructors: CourseInstructor[];
	courseOptions: Option[];
	userOptions: Option[];
	onEdit: (instructor: CourseInstructor) => void;
	onDelete: (instructor: CourseInstructor) => void;
};

export default function CourseInstructorTable({
	instructors,
	courseOptions,
	userOptions,
	onEdit,
	onDelete,
}: Props) {
	const courseMap = useMemo(
		() => new Map(courseOptions.map((c) => [c.id, c.label])),
		[courseOptions]
	);

	const userMap = useMemo(
		() => new Map(userOptions.map((u) => [u.id, u.label])),
		[userOptions]
	);

	const columns: BaseColumn<CourseInstructor>[] = [
		{
			key: "id",
			header: "ID",
			className: "px-3 py-2 text-left text-xs text-white/60",
			render: (i) => i.id,
		},
		{
			key: "course",
			header: "Course",
			className: "px-3 py-2 font-medium text-center",
			render: (i) => courseMap.get(i.course_id) || "—",
		},
		{
			key: "user",
			header: "User",
			className: "px-3 py-2 text-white/80 text-center",
			render: (i) => userMap.get(i.user_id) || "—",
		},
		{
			key: "role",
			header: "Role",
			className: "px-3 py-2 text-white/60 text-center",
			render: (i) => i.role_in_course,
		},
		{
			key: "actions",
			header: "Actions",
			className: "px-3 py-2 text-center",
			render: (i) => (
				<CourseInstructorActions
					instructor={i}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={instructors}
			columns={columns}
			emptyText="Không có instructor"
			tableClassName="w-full text-sm text-white"
			headClassName="bg-black/5"
			rowClassName={() =>
				"border-t border-white/10 hover:bg-white/5"
			}
		/>
	);
}
