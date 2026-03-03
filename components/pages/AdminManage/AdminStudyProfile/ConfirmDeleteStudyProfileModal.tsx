"use client";

import type { StudyProfileUI } from "./StudyProfileUiTypes";
import BaseConfirmModal from "../BaseModel/BaseConfirmModal";

type Props = {
	open: boolean;
	profile: StudyProfileUI | null;
	onClose: () => void;
	onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteStudyProfileModal({
	open,
	profile,
	onClose,
	onConfirm,
}: Props) {
	if (!profile) return null;

	return (
		<BaseConfirmModal
			open={open}
			onClose={onClose}
			title="Xóa Study Profile"
			danger
			confirmText="Xóa"
			description={
				<>
					Bạn có chắc chắn muốn xóa profile của{" "}
					<span className="text-red-400">
						{profile.user_name ?? profile.user_id}
					</span>
					?
					<br />
					<span className="text-red-400">
						Hành động này không thể hoàn tác.
					</span>
				</>
			}
			onConfirm={() => onConfirm(profile.id)}
		/>
	);
}