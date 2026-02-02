// src/hooks/courses/useCoursesMap.ts
"use client";

import { useEffect, useState } from "react";
import { getCourses, type Course } from "./getCourse";

export function useCoursesMap() {
	const [coursesMap, setCoursesMap] = useState<Record<string, Course>>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getCourses()
			.then((courses) => {
				const map: Record<string, Course> = {};
				courses.forEach((c) => {
					map[c.id] = c;
				});
				setCoursesMap(map);
			})
			.finally(() => setLoading(false));
	}, []);

	return { coursesMap, loading };
}
