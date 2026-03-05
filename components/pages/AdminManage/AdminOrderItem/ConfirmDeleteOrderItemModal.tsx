"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { OrderItem } from "./OrderItemUIType";

type Props = {
    open: boolean;
    OrderItem: OrderItem | null;
    onClose: () => void;
    onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteOrderItemModal({
    open,
    OrderItem,
    onClose,
    onConfirm,
}: Props) {
    if (!OrderItem) return null;

    return (
        <BaseConfirmModal
            open={open}
            onClose={onClose}
            title="Xóa OrderItem"
            danger
            confirmText="Xóa"
            description={
                <>
                    Bạn có chắc chắn muốn xóa OrderItem của{" "}
                    <span className="font-semibold text-white">
                        {OrderItem.id}
                    </span>
                    ?
                    <br />
                    <span className="text-red-400">
                        Hành động này không thể hoàn tác.
                    </span>
                </>
            }
            onConfirm={() => onConfirm(OrderItem.id)}
        />
    );
}
