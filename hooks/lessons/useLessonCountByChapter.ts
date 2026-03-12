"use client";

import { useEffect, useState } from "react";
import { getLessonCount } from "@/hooks/lessons/getLesson";

export function useLessonCountByChapter(chapterId?: string) {

  const [count, setCount] = useState<number>(0);

  useEffect(() => {

    if (!chapterId) return;

    async function fetchCount() {

      try {

        const total = await getLessonCount({
          chapter_id: chapterId,
        });

        setCount(total);

      } catch (err) {
        console.error(err);
      }

    }

    fetchCount();

  }, [chapterId]);

  return count;

}