import { useMemo } from "react";
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
	/* ===== lookup maps (typed) ===== */
	const courseMap = useMemo<Map<string, string>>(
		() => new Map(courseOptions.map((c) => [c.id, c.label])),
		[courseOptions]
	);

	const userMap = useMemo<Map<string, string>>(
		() => new Map(userOptions.map((u) => [u.id, u.label])),
		[userOptions]
	);

	return (
		<div className="overflow-x-auto rounded-xl border border-white bg-white/5">
			<table className="w-full text-sm text-white">
				<thead className="bg-black/5">
					<tr>
						<th className="px-3 py-2 text-left">ID</th>
						<th className="px-3 py-2 text-left">Course</th>
						<th className="px-3 py-2 text-left">User</th>
						<th className="px-3 py-2 text-left">Role</th>
						<th className="px-3 py-2 text-right">Actions</th>
					</tr>
				</thead>

				<tbody>
					{instructors.map((i) => (
						<tr
							key={i.id}
							className="border-t border-white/10 hover:bg-white/5"
						>
							<td className="px-3 py-2 text-xs text-white/60">
								{i.id}
							</td>

							<td className="px-3 py-2 font-medium">
								{courseMap.get(i.course_id) || "—"}
							</td>

							<td className="px-3 py-2 text-white/80">
								{userMap.get(i.user_id) || "—"}
							</td>

							<td className="px-3 py-2 text-white/60">
								{i.role_in_course}
							</td>

							<td className="px-3 py-2 text-right">
								<CourseInstructorActions
									instructor={i}
									onEdit={onEdit}
									onDelete={onDelete}
								/>
							</td>
						</tr>
					))}

					{instructors.length === 0 && (
						<tr>
							<td
								colSpan={5}
								className="px-4 py-6 text-center text-white/50"
							>
								Không có instructor
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
