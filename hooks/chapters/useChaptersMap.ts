"use client";

import { useEffect, useState } from "react";
import { getChapters } from "@/hooks/chapters/getChapters";

/* =======================
   TYPE
======================= */
type ChapterMap = Record<
	string,
	{
		id: string;
		course_id: string;
		title: string;
		description?: string | null;
		ordering: number;
		created_at?: string;
		updated_at?: string;
	}
>;

/* =======================
   HOOK
======================= */
export function useChaptersMap() {
	const [chaptersMap, setChaptersMap] = useState<ChapterMap>({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		let mounted = true;

		async function fetchChapters() {
			try {
				setLoading(true);
				const chapters = await getChapters();

				if (!mounted) return;

				const map: ChapterMap = {};
				for (const c of chapters) {
					map[c.id] = c;
				}

				setChaptersMap(map);
			} catch (err) {
				if (mounted) setError(err);
			} finally {
				if (mounted) setLoading(false);
			}
		}

		fetchChapters();

		return () => {
			mounted = false;
		};
	}, []);

	return {
		chaptersMap,
		loading,
		error,
	};
}
