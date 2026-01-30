import ChapterActions from "./ChapterActions";
import type { Chapter } from "./ChapterUiTypes";

type Props = {
	chapters: Chapter[];
	onEdit: (chapter: Chapter) => void;
	onDelete: (chapter: Chapter) => void;
};

export default function ChapterTable({
	chapters,
	onEdit,
	onDelete,
}: Props) {
	return (
		<div className="overflow-x-auto rounded-xl border border-white bg-white/5">
			<table className="w-full text-sm text-white">
				<thead className="bg-black/5">
					<tr>
						<th className="px-3 py-2 text-left">ID</th>
						<th className="px-3 py-2 text-left">Course ID</th>
						<th className="px-3 py-2 text-left">Title</th>
						<th className="px-3 py-2 text-right">Ordering</th>
						<th className="px-3 py-2 text-right">Actions</th>
					</tr>
				</thead>

				<tbody>
					{chapters.map((c) => (
						<tr
							key={c.id}
							className="border-t border-white/10 hover:bg-white/5"
						>
							<td className="px-3 py-2 text-xs text-white/60">
								{c.id}
							</td>

							<td className="px-3 py-2 text-xs text-white/60">
								{c.course_id}
							</td>

							<td className="px-3 py-2 font-medium">
								{c.title}
							</td>

							<td className="px-3 py-2 text-right font-semibold">
								{c.ordering}
							</td>

							<td className="px-3 py-2 text-right">
								<ChapterActions
									chapter={c}
									onEdit={onEdit}
									onDelete={onDelete}
								/>
							</td>
						</tr>
					))}

					{chapters.length === 0 && (
						<tr>
							<td
								colSpan={5}
								className="px-4 py-6 text-center text-white/50"
							>
								Không có chapter
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
