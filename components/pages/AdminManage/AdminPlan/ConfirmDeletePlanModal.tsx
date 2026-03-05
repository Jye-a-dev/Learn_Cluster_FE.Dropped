"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { Plan } from "./PlanUiTypes";

type Props = {
    open: boolean;
    plan: Plan | null;
    onClose: () => void;
    onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeletePlanModal({
    open,
    plan,
    onClose,
    onConfirm,
}: Props) {
    if (!plan) return null;

    return (
        <BaseConfirmModal
            open={open}
            onClose={onClose}
            title="Xóa course"
            danger
            confirmText="Xóa"
            description={
                <>
                    Bạn có chắc chắn muốn xóa{" "}
                    <span className="font-semibold text-white">
                        {plan.name}
                    </span>
                    ?
                    <br />
                    <span className="text-red-400">
                        Hành động này không thể hoàn tác.
                    </span>
                </>
            }
            onConfirm={() => onConfirm(plan.id)}
        />
    );
}
