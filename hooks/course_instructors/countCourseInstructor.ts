"use client";

import { useEffect, useState } from "react";
import { countInstructorsByCourse } from "@/hooks/course_instructors/getCourseInstructor";

export function useInstructorCount(course_id?: string) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!course_id) return;

		const id = course_id; // đảm bảo type là string

		async function load() {
			const total = await countInstructorsByCourse(id);
			setCount(total);
		}

		load();
	}, [course_id]);

	return count;
}
