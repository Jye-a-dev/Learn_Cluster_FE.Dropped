"use client";

import BaseAction from "../BaseModel/BaseAction";
import type { Plan } from "./PlanUiTypes";

export default function PlanActions({
	plan,
	onEdit,
	onDelete,
}: {
	plan: Plan;
	onEdit: (plan: Plan) => void;
	onDelete: (plan: Plan) => void;
}) {
	return (
		<BaseAction
			items={[
				{ label: "Sửa", onClick: () => onEdit(plan) },
				{ label: "Xoá", onClick: () => onDelete(plan), danger: true },
			]}
		/>
	);
}