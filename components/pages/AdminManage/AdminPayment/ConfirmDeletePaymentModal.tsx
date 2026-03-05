"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { Payment } from "./PaymentUIType";

type Props = {
    open: boolean;
    Payment: Payment | null;
    onClose: () => void;
    onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeletePlanModal({
    open,
    Payment,
    onClose,
    onConfirm,
}: Props) {
    if (!Payment) return null;

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
                        {Payment.id}
                    </span>
                    ?
                    <br />
                    <span className="text-red-400">
                        Hành động này không thể hoàn tác.
                    </span>
                </>
            }
            onConfirm={() => onConfirm(Payment.id)}
        />
    );
}
