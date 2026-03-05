"use client";

import { useEffect, useState } from "react";
import { getPlans, type Plan } from "@/hooks/plans/getPlan";

export function usePlansMap() {
	const [plansMap, setPlansMap] = useState<Record<string, Plan>>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getPlans()
			.then((plans) => {
				const map: Record<string, Plan> = {};
				plans.forEach((p) => {
					map[p.id] = p;
				});
				setPlansMap(map);
			})
			.finally(() => setLoading(false));
	}, []);

	return { plansMap, loading };
}