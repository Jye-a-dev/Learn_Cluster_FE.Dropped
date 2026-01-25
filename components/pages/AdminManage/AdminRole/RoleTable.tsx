import RoleActions from "./RoleAction";
import { Role } from "./RoleUiTypes";

type Props = {
  roles: Role[];             // ✅ thêm đúng
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
};

export default function RoleTable({ roles, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-hidden overflow-y-visible rounded-xl border border-white bg-red-200/20">
      <table className="w-full text-sm text-white">
        <thead className="bg-black/5">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((r) => (
            <tr
              key={r.id}
              className="border-t border-white/10 hover:bg-white/5"
            >
              <td className="px-4 py-3 font-mono text-xs text-white/60">
                {r.id}
              </td>
              <td className="px-4 py-3 font-medium">{r.name}</td>
              <td className="px-4 py-3 text-white/60">
                {r.description ?? "—"}
              </td>
              <td className="px-4 py-3 text-right">
                <RoleActions
                  role={r}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}

          {roles.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-white/50">
                Không có role
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
