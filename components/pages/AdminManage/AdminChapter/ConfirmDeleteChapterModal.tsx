"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { Chapter } from "./ChapterUiTypes";

type Props = {
	open: boolean;
	chapter: Chapter | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteChapterModal({
	open,
	chapter,
	onClose,
	onConfirm,
}: Props) {
	if (!chapter) return null;

	return (
		<BaseConfirmModal
			open={open}
			onClose={onClose}
			title="Xóa chapter"
			danger
			confirmText="Xóa"
			description={
				<>
					Bạn có chắc chắn muốn xóa{" "}
					<span className="font-semibold text-white">
						{chapter.title}
					</span>
					?
					<br />
					<span className="text-red-400">
						Hành động này không thể hoàn tác.
					</span>
				</>
			}
			onConfirm={() => onConfirm(chapter.id)}
		/>
	);
}
