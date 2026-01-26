import BaseAction from "../BaseModel/BaseAction";
import type { RolePermission, PermissionOption } from "./RoleAllowUiTypes";

type Props = {
  permissions: PermissionOption[];
  rolePermissions: RolePermission[];
  onDelete: (rp: RolePermission) => void;
};

export default function RoleAllowTable({
  permissions,
  rolePermissions,
  onDelete,
}: Props) {
  if (rolePermissions.length === 0)
    return <p className="text-white/50">Chưa có quyền nào</p>;

  return (
    <div className="rounded-lg border border-white/10">
      {rolePermissions.map((rp) => {
        const perm = permissions.find(
          (p) => p.id === rp.permission_id
        );
        if (!perm) return null;

        return (
          <div
            key={rp.permission_id}
            className="flex justify-between px-4 py-3 border-t border-white/5"
          >
            <div>
              <div className="text-sm text-white">{perm.name}</div>
              {perm.description && (
                <div className="text-xs text-white/50">
                  {perm.description}
                </div>
              )}
            </div>

            <BaseAction
              buttonLabel="⋮"
              items={[
                {
                  label: "Thu hồi",
                  danger: true,
                  onClick: () => onDelete(rp),
                },
              ]}
            />
          </div>
        );
      })}
    </div>
  );
}
