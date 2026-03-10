"use client";

import { useEffect, useState } from "react";
import { getStudentCountByCourse } from "@/hooks/enrollment/getEnrollment";

export function useStudentCountByCourse(course_id?: string) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!course_id) return;

		const id = course_id; // đảm bảo type string

		async function load() {
			const total = await getStudentCountByCourse(id);
			setCount(total);
		}

		load();
	}, [course_id]);

	return count;
}