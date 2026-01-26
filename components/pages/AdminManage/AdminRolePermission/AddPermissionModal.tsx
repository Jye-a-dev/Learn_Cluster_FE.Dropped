import { useState } from "react";
import BaseFormModal from "../BaseModel/BaseFormModal";
import type { PermissionOption } from "./RoleAllowUiTypes";

type Props = {
  open: boolean;
  permissions: PermissionOption[];
  onClose: () => void;
  onSubmit: (permissionId: string) => Promise<void>;
};

export default function AddPermissionModal({
  open,
  permissions,
  onClose,
  onSubmit,
}: Props) {
  const [selected, setSelected] = useState("");

  return (
    <BaseFormModal
      open={open}
      title="Thêm quyền cho role"
      onClose={onClose}
      onSubmit={() => onSubmit(selected)}
    >
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full rounded-lg bg-zinc-800 border border-white/10 px-3 py-2 text-sm text-white"
      >
        <option value="" disabled>
          Chọn quyền
        </option>
        {permissions.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </BaseFormModal>
  );
}
