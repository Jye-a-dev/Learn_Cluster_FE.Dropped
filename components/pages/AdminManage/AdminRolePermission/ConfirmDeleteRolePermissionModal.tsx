import BaseConfirmModal from "../BaseModel/BaseConfirmModal";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export default function ConfirmDeleteRolePermissionModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <BaseConfirmModal
      open={open}
      danger
      title="Thu hồi quyền"
      description="Bạn chắc chắn muốn thu hồi quyền này?"
      confirmText="Thu hồi"
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
