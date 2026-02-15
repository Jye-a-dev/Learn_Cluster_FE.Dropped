"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { Achievement } from "./AchievementUiTypes";

type Props = {
    open: boolean;
    achievement: Achievement | null;
    onClose: () => void;
    onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteAchievementModal({
    open,
    achievement,
    onClose,
    onConfirm,
}: Props) {
    if (!achievement) return null;

    return (
        <BaseConfirmModal
            open={open}
            onClose={onClose}
            title="Xóa Achievement"
            danger
            confirmText="Xóa"
            description={
                <>
                    Bạn có chắc chắn muốn xóa achievement{" "}
                    <span className="font-semibold text-white">
                        {achievement.name}
                    </span>
                    ?
                </>
            }
            onConfirm={() => onConfirm(achievement.id)}
        />
    );
}
