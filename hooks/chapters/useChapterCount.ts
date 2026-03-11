"use client";

import { useEffect, useState } from "react";
import { countChapterByCourse } from "@/hooks/chapters/getChapters";

export function useChapterCount(course_id?: string) {

	const [count, setCount] = useState(0);

	useEffect(() => {

		if (!course_id) return;

		async function load() {

			const total = await countChapterByCourse(course_id!); // lúc này chắc chắn là string
			setCount(total);

		}

		load();

	}, [course_id]);

	return count;

}