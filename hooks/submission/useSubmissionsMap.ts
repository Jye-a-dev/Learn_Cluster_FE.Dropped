"use client";

import { useEffect, useState } from "react";
import { getSubmissions } from "@/hooks/submission/getSubmission";

/* ===================== TYPE ===================== */
import type { SubmissionBE } from  "@/hooks/submission/getSubmission";

type SubmissionsMap = Record<string, SubmissionBE>;

/* ===================== HOOK ===================== */
export function useSubmissionsMap() {
	const [submissionsMap, setSubmissionsMap] = useState<SubmissionsMap>({});
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		let mounted = true;

		(async () => {
			try {
				setLoading(true);
				const submissions = await getSubmissions({ limit: 1000 });

				if (!mounted) return;

				const map: SubmissionsMap = {};
				for (const s of submissions) {
					map[s.id] = s;
				}

				setSubmissionsMap(map);
			} finally {
				if (mounted) setLoading(false);
			}
		})();

		return () => {
			mounted = false;
		};
	}, []);

	return {
		submissionsMap,
		loading,
	};
}
