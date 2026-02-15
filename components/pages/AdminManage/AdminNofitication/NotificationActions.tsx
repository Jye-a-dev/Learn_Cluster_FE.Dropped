"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Notification } from "./NotificationUiTypes";

type Props = {
    notification: Notification;
    onMarkRead: (n: Notification) => void;
    onDelete: (n: Notification) => void;
};

export default function NotificationActions({
    notification,
    onMarkRead,
    onDelete,
}: Props) {
    return (
        <BaseAction
            items={[
                {
                    label: "Đánh dấu đã đọc",
                    onClick: () => onMarkRead(notification),
                },
                {
                    label: "Xoá",
                    onClick: () => onDelete(notification),
                    danger: true,
                },
            ]}
        />
    );
}
