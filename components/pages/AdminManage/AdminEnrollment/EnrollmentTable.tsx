"use client";

import BaseTable, { BaseColumn } from "@/components/pages/AdminManage/BaseModel/BaseTable";
import EnrollmentActions from "./EnrollmentActions";
import type { Enrollment } from "./EnrollmentUiTypes";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";
import { useUsersMap } from "@/hooks/users/useUsersMap";

export default function EnrollmentTable({
	enrollments,
	onEdit,
	onDelete,
}: {
	enrollments: Enrollment[];
	onEdit: (e: Enrollment) => void;
	onDelete: (e: Enrollment) => void;
}) {
	const { coursesMap, loading: loadingCourses } = useCoursesMap();
	const { usersMap, loading: loadingUsers } = useUsersMap();

	const columns: BaseColumn<Enrollment>[] = [
		{
			key: "user",
			header: "User",
			className: "p-3 font-medium text-white text-left",

			render: (e) => {
				if (loadingUsers) return "Loading…";
				const user = usersMap[e.user_id];
				return user?.username ?? (
					<span className="text-white/50">—</span>
				);
			},
		},
		{
			key: "course",
			header: "Course",
			className: "p-3 text-white/80 text-center",
			render: (e) =>
				loadingCourses
					? "Loading…"
					: coursesMap[e.course_id]?.title ?? (
						<span className="text-white/50">—</span>
					),
		},
		{
			key: "enrolled_at",
			header: "Enrolled At",
			className: "p-3 text-center text-white/70",
			render: (e) =>
				e.enrolled_at ? (
					<span className="inline-flex items-center rounded-md bg-white/10 px-2 py-1 text-xs">
						{new Date(e.enrolled_at).toLocaleString("vi-VN", {
							dateStyle: "medium",
							timeStyle: "short",
						})}
					</span>
				) : (
					"—"
				),
		},
		{
			key: "actions",
			header: "",
			className: "p-3 w-24 text-right",
			render: (e) => (
				<EnrollmentActions
					enrollment={e}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];

	return (
		<BaseTable
			data={enrollments}
			columns={columns}
			wrapperClassName="rounded-xl border border-white/30 "
			headClassName="border-b border-white/20"
			rowClassName={() =>
				"border-t border-white/10 hover:bg-white/5 transition"
			}
			emptyText="Chưa có enrollment"
		/>
	);
}
