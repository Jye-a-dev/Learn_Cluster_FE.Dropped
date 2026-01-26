import PermissionActions from "./PermissionAction";
import { Permission } from "./PermissionUiTypes";

type Props = {
    permissions: Permission[];
    onEdit: (permission: Permission) => void;
    onDelete: (permission: Permission) => void;
};

export default function PermissionTable({
    permissions,
    onEdit,
    onDelete,
}: Props) {
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
                    {permissions.map((p) => (
                        <tr
                            key={p.id}
                            className="border-t border-white/10 hover:bg-white/5"
                        >
                            <td className="px-4 py-3 font-mono text-xs text-white/60">
                                {p.id}
                            </td>
                            <td className="px-4 py-3 font-medium">
                                {p.name}
                            </td>
                            <td className="px-4 py-3 text-white/60">
                                {p.description ?? "—"}
                            </td>
                            <td className="px-4 py-3 text-right">
                                <PermissionActions
                                    permission={p}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            </td>
                        </tr>
                    ))}

                    {permissions.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-4 py-6 text-center text-white/50"
                            >
                                Không có permission
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
