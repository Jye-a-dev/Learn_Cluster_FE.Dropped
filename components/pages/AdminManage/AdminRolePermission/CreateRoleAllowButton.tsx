import BaseAction from "../BaseModel/BaseAction";

type Props = {
  onAdd: () => void;
  onDeleteAll: () => void;
};

export default function CreateRoleAllowButton({
  onAdd,
  onDeleteAll,
}: Props) {
  return (
    <BaseAction
      items={[
        { label: "Thêm quyền", onClick: onAdd },
        { label: "Xoá toàn bộ", danger: true, onClick: onDeleteAll },
      ]}
    />
  );
}
