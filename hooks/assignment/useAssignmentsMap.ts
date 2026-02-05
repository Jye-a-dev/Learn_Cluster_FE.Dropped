// src/hooks/assignment/useAssignmentsMap.ts
"use client";

import { useEffect, useMemo, useState } from "react";
import {
	getAssignments,
	type AssignmentBE,
	type AssignmentQuery,
} from "@/hooks/assignment/getAssignment";

/**
 * Hook: map assignment_id -> AssignmentBE
 * Dùng cho dropdown / lookup nhanh
 */
export function useAssignmentsMap(query?: AssignmentQuery) {
	const [data, setData] = useState<AssignmentBE[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		let mounted = true;

		(async () => {
			setLoading(true);
			setError(null);
			try {
				const res = await getAssignments(query);
				if (mounted) setData(res);
			} catch (err) {
				if (mounted) setError(err);
			} finally {
				if (mounted) setLoading(false);
			}
		})();

		return () => {
			mounted = false;
		};
	}, [query?.course_id, query?.page, query?.limit, query?.keyword, query]);

	/** Map: assignmentId -> assignment */
	const assignmentsMap = useMemo(() => {
		const map: Record<string, AssignmentBE> = {};
		for (const a of data) {
			map[a.id] = a;
		}
		return map;
	}, [data]);

	/** Options cho select */
	const assignmentOptions = useMemo(
		() =>
			data.map((a) => ({
				value: a.id,
				label: a.title ?? "(No title)",
			})),
		[data]
	);

	return {
		assignments: data,
		assignmentsMap,
		assignmentOptions,
		loading,
		error,
	};
}
