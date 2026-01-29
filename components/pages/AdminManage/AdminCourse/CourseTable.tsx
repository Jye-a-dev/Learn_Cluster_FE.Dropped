import CourseActions from "./CourseActions";
import type { Course } from "./CourseUiTypes";

type Props = {
	courses: Course[];
	onEdit: (course: Course) => void;
	onDelete: (course: Course) => void;
};

export default function CourseTable({ courses, onEdit, onDelete }: Props) {
	return (
		<div className="overflow-x-auto rounded-xl border border-white bg-white/5">
			<table className="w-full text-sm text-white">
				<thead className="bg-black/5">
					<tr>
						<th className="px-3 py-2 text-left">ID</th>
						<th className="px-3 py-2 text-left">Title</th>
						<th className="px-3 py-2 text-left">Description</th>
						<th className="px-3 py-2 text-left">Objective</th>
						<th className="px-3 py-2 text-right">Hours</th>
						<th className="px-3 py-2 text-left">Status</th>
						<th className="px-3 py-2 text-left">Created</th>
						<th className="px-3 py-2 text-left">Updated</th>
						<th className="px-3 py-2 text-right">Actions</th>
					</tr>
				</thead>

				<tbody>
					{courses.map((c) => (
						<tr
							key={c.id}
							className="border-t border-white/10 hover:bg-white/5 align-top"
						>
							<td className="px-3 py-2 text-xs text-white/60">
								{c.id}
							</td>

							<td className="px-3 py-2 font-medium">
								{c.title}
							</td>

							<td className="px-3 py-2 text-white/70 max-w-xs truncate">
								{c.description ?? "—"}
							</td>

							<td className="px-3 py-2 text-white/70 max-w-xs truncate">
								{c.objective ?? "—"}
							</td>

							<td className="px-3 py-2 text-right">
								{c.duration_hours ?? "—"}
							</td>

							<td className="px-3 py-2 text-white/60">
								{c.status}
							</td>

							<td className="px-3 py-2 text-xs text-white/50">
								{new Date(c.created_at).toLocaleString()}
							</td>

							<td className="px-3 py-2 text-xs text-white/50">
								{new Date(c.updated_at).toLocaleString()}
							</td>

							<td className="px-3 py-2 text-right">
								<CourseActions
									course={c}
									onEdit={onEdit}
									onDelete={onDelete}
								/>
							</td>
						</tr>
					))}

					{courses.length === 0 && (
						<tr>
							<td
								colSpan={9}
								className="px-4 py-6 text-center text-white/50"
							>
								Không có course
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
