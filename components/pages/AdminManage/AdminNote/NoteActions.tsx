"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Note } from "./NoteUiTypes";

type Props = {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (note: Note) => void;
};

export default function NoteActions({
    note,
    onEdit,
    onDelete,
}: Props) {
    return (
        <BaseAction
            items={[
                {
                    label: "Sửa",
                    onClick: () => onEdit(note),
                },
                {
                    label: "Xoá",
                    onClick: () => onDelete(note),
                    danger: true,
                },
            ]}
        />
    );
}
