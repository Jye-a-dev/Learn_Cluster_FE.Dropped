"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Achievement } from "./AchievementUiTypes";

type Props = {
    achievement: Achievement;
    onEdit: (a: Achievement) => void;
    onDelete: (a: Achievement) => void;
};

export default function AchievementActions({
    achievement,
    onEdit,
    onDelete,
}: Props) {
    return (
        <BaseAction
            items={[
                {
                    label: "Sửa",
                    onClick: () => onEdit(achievement),
                },
                {
                    label: "Xoá",
                    onClick: () => onDelete(achievement),
                    danger: true,
                },
            ]}
        />
    );
}
