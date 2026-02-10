"use client";

import { useEffect, useState } from "react";
import { getLessons } from "@/hooks/lessons/getLesson";
import type { LessonBE } from "@/hooks/lessons/getLesson";

/* =======================
   MAP TYPE
======================= */
export type LessonsMap = Record<string, LessonBE>;

/* =======================
   HOOK
======================= */
export function useLessonsMap() {
	const [lessonsMap, setLessonsMap] = useState<LessonsMap>({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		let mounted = true;

		async function fetchLessons() {
			try {
				setLoading(true);
				const lessons = await getLessons();

				if (!mounted) return;

				const map: LessonsMap = {};
				for (const lesson of lessons) {
					map[lesson.id] = lesson;
				}

				setLessonsMap(map);
			} catch (err) {
				if (mounted) setError(err);
			} finally {
				if (mounted) setLoading(false);
			}
		}

		fetchLessons();

		return () => {
			mounted = false;
		};
	}, []);

	return {
		lessonsMap,
		loading,
		error,
	};
}
