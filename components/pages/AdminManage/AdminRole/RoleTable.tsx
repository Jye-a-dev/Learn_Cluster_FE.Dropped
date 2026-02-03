import RoleActions from "./RoleAction";
import { Role } from "./RoleUiTypes";

type Props = {
    roles: Role[];
    onEdit: (role: Role) => void;
    onDelete: (role: Role) => void;
};

export default function RoleTable({ roles, onEdit, onDelete }: Props) {
    return (
       <div className="rounded-xl border border-white/50">
            <table className="w-full text-sm text-slate-100">
                {/* ===== HEADER ===== */}
                <thead className="bg-slate-900 text-xs uppercase tracking-wide text-slate-300">
                    <tr>
                        <th className="px-4 py-3 text-left">ID</th>
                        <th className="px-4 py-3 text-left">Role name</th>
                        <th className="px-4 py-3 text-left">Description</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>

                {/* ===== BODY ===== */}
                <tbody className="divide-y divide-white/5">
                    {roles.map((r, idx) => (
                        <tr
                            key={r.id}
                            className={`
                                transition-colors
                                ${idx % 2 === 0 ? "bg-slate-800/40" : "bg-slate-800/20"}
                                hover:bg-indigo-500/10
                            `}
                        >
                            {/* ID */}
                            <td className="px-4 py-3 font-mono text-xs text-slate-400">
                                {r.id}
                            </td>

                            {/* NAME */}
                            <td className="px-4 py-3 font-semibold text-slate-100">
                                {r.name}
                            </td>

                            {/* DESCRIPTION */}
                            <td className="px-4 py-3 text-slate-300">
                                {r.description ?? (
                                    <span className="italic text-slate-500">No description</span>
                                )}
                            </td>

                            {/* ACTIONS */}
                            <td className="px-4 py-3 text-right">
                                <RoleActions
                                    role={r}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            </td>
                        </tr>
                    ))}

                    {/* ===== EMPTY STATE ===== */}
                    {roles.length === 0 && (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-4 py-10 text-center text-slate-400"
                            >
                                Không có role nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
