"use client";

import AssignmentActions from "./AssignmentActions";
import type { Assignment } from "./AssignmentUiTypes";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";

export default function AssignmentTable({
	assignments,
	onEdit,
	onDelete,
}: {
	assignments: Assignment[];
	onEdit: (a: Assignment) => void;
	onDelete: (a: Assignment) => void;
}) {
	const { coursesMap, loading } = useCoursesMap();

	console.log("AssignmentTable assignments =", assignments);
	console.log("coursesMap =", coursesMap);

	return (
		<div className="rounded-xl border border-white/50 overflow-x-auto">
			<table className="w-full text-sm text-white">
				<thead className="border-b border-white/20">
					<tr className="text-left">
						<th className="p-3">Title</th>
						<th className="p-3">Course</th>
						<th className="p-3">Description</th>
						<th className="p-3">Deadline</th>
						<th className="p-3">File</th>
						<th className="p-3 w-30"></th>
					</tr>
				</thead>

				<tbody>
					{assignments.map((a) => {
						const course = coursesMap[a.course_id];

						return (
							<tr
								key={a.id}
								className="border-t border-white/10 hover:bg-white/5"
							>
								<td className="p-3 font-medium">
									{a.title ?? "—"}
								</td>

								<td className="p-3 text-white/80">
									{loading
										? "Loading…"
										: course?.title ?? "—"}
								</td>

								<td className="p-3 text-white/70 max-w-[320px] truncate">
									{a.description ?? "—"}
								</td>

								<td className="p-3">
									{a.deadline
										? new Date(a.deadline).toLocaleString("vi-VN", {
											dateStyle: "long",
											timeStyle: "short",
										})
										: "—"}
								</td>

								<td className="p-3">
									{a.file_url ? (
										<a
											href={a.file_url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-400 underline"
										>
											Open
										</a>
									) : (
										"—"
									)}
								</td>



								<td className="p-3">
									<AssignmentActions
										assignment={a}
										onEdit={onEdit}
										onDelete={onDelete}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
