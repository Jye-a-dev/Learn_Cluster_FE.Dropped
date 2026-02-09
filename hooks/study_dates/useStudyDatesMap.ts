"use client";

import { useEffect, useState } from "react";
import { getStudyDates } from "./getStudyDates";

/* ===================== TYPE ===================== */
import type { StudyDateBE } from "./getStudyDates";

/* ===================== HOOK ===================== */
export function useStudyDatesMap() {
	const [studyDatesMap, setStudyDatesMap] = useState<Record<string, StudyDateBE>>({});
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		let mounted = true;

		async function fetchStudyDates() {
			try {
				setLoading(true);
				const list = await getStudyDates();

				if (!mounted) return;

				const map: Record<string, StudyDateBE> = {};
				for (const sd of list) {
					map[sd.id] = sd;
				}

				setStudyDatesMap(map);
			} catch (err) {
				if (mounted) setError(err);
			} finally {
				if (mounted) setLoading(false);
			}
		}

		fetchStudyDates();

		return () => {
			mounted = false;
		};
	}, []);

	return {
		studyDatesMap,
		loading,
		error,
	};
}
