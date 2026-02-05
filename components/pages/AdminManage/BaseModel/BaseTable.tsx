"use client";

import { ReactNode, useMemo, useState } from "react";

export type BaseColumn<T> = {
	key: string;
	header: ReactNode;
	className?: string;
	render: (row: T, index: number) => ReactNode;
};

type Props<T extends { id?: string | number }> = {
	data: T[];
	columns: BaseColumn<T>[];
	emptyText?: string;
	tableClassName?: string;
	wrapperClassName?: string;
	headClassName?: string;
	bodyClassName?: string;
	rowClassName?: (row: T, index: number) => string;
	colSpan?: number;

	rowsPerPage?: number; // ✅ new
};

export default function BaseTable<T extends { id?: string | number }>({
	data,
	columns,
	emptyText = "Không có dữ liệu",
	tableClassName = "w-full text-sm text-white",
	wrapperClassName = "rounded-xl border border-white/50",
	headClassName = "bg-black/5",
	bodyClassName,
	rowClassName,
	colSpan,
	rowsPerPage,
}: Props<T>) {
	const [page, setPage] = useState(1);

	const totalPages = rowsPerPage
		? Math.ceil(data.length / rowsPerPage)
		: 1;

	const pagedData = useMemo(() => {
		if (!rowsPerPage) return data;

		const start = (page - 1) * rowsPerPage;
		return data.slice(start, start + rowsPerPage);
	}, [data, page, rowsPerPage]);

	return (
		<div className={wrapperClassName}>
			<table className={tableClassName}>
				<thead className={headClassName}>
					<tr>
						{columns.map((c) => (
							<th key={c.key} className={c.className}>
								{c.header}
							</th>
						))}
					</tr>
				</thead>

				<tbody className={bodyClassName}>
					{pagedData.map((row, idx) => (
						<tr
							key={row.id ?? idx}
							className={rowClassName?.(row, idx)}
						>
							{columns.map((c) => (
								<td key={c.key} className={c.className}>
									{c.render(row, idx)}
								</td>
							))}
						</tr>
					))}

					{pagedData.length === 0 && (
						<tr>
							<td
								colSpan={colSpan ?? columns.length}
								className="px-4 py-6 text-center text-white/50"
							>
								{emptyText}
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{/* ===== PAGINATION ===== */}
			{rowsPerPage && totalPages > 1 && (
				<div className="flex items-center justify-between px-4 py-3 text-xs text-white/70">
					<span>
						Trang {page} / {totalPages}
					</span>

					<div className="flex gap-2">
						<button
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							disabled={page === 1}
							className="rounded border cursor-pointer border-white/20 px-3 py-1 disabled:opacity-40"
						>
							Prev
						</button>

						<button
							onClick={() =>
								setPage((p) => Math.min(totalPages, p + 1))
							}
							disabled={page === totalPages}
							className="rounded border cursor-pointer border-white/20 px-3 py-1 disabled:opacity-40"
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
