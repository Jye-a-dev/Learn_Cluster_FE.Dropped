"use client";

import BaseConfirmModal from "../BaseModel/BaseConfirmModal";
import type { Notification } from "./NotificationUiTypes";

type Props = {
    open: boolean;
    notification: Notification | null;
    onClose: () => void;
    onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteNotificationModal({
    open,
    notification,
    onClose,
    onConfirm,
}: Props) {
    if (!notification) return null;

    return (
        <BaseConfirmModal
            open={open}
            onClose={onClose}
            title="Xóa Notification"
            danger
            confirmText="Xóa"
            description={
                <>
                    Bạn có chắc chắn muốn xóa notification{" "}
                    <span className="font-semibold text-white">
                        {notification.content}
                    </span>
                    ?
                </>
            }
            onConfirm={() => onConfirm(notification.id)}
        />
    );
}
