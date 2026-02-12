"use client";

import type { Note } from "./NoteUiTypes";
import BaseConfirmModal from "../BaseModel/BaseConfirmModal";

type Props = {
    open: boolean;
    note: Note | null;
    onClose: () => void;
    onConfirm: (id: string) => Promise<void>;
};

export default function ConfirmDeleteNoteModal({
    open,
    note,
    onClose,
    onConfirm,
}: Props) {
    if (!note) return null;

    return (
        <BaseConfirmModal
            open={open}
            onClose={onClose}
            title="Xóa ghi chú"
            danger
            confirmText="Xóa"
            description={
                <>
                    Bạn có chắc chắn muốn xóa ghi chú{" "}
                    <span className="font-semibold text-white">
                        {note.title}
                    </span>
                    ?
                    <br />
                    <span className="text-red-400">
                        Hành động này không thể hoàn tác.
                    </span>
                </>
            }
            onConfirm={() => onConfirm(note.id)}
        />
    );
}
