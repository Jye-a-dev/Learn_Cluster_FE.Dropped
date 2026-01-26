import BaseConfirmModal from "../BaseModel/BaseConfirmModal";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export default function ConfirmDeleteAllRolePermissionModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseConfirmModal
      open={open}
      danger
      title="Xoá toàn bộ quyền"
      description="Bạn chắc chắn muốn xoá toàn bộ quyền của role này?"
      confirmText="Xoá tất cả"
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
