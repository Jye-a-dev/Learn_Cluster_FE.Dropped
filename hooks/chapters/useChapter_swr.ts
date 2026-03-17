import useSWR from "swr";
import { getChapter } from "@/hooks/chapters/getChapters";
import { getLessonsByChapter } from "@/hooks/lessons/getLesson";

/* =========================
   CHAPTER DETAIL
========================= */
export function useChapterDetail(chapterId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    chapterId ? ["chapter", chapterId] : null,
    () => getChapter(chapterId)
  );

  return {
    chapter: data,
    isLoading,
    isError: error,
    mutate,
  };
}

/* =========================
   LESSONS BY CHAPTER
========================= */
export function useLessonsByChapter(chapterId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    chapterId ? ["lessons", chapterId] : null,
    async () => {
      const res = await getLessonsByChapter(chapterId);
      return res.sort((a, b) => a.ordering - b.ordering);
    }
  );

  return {
    lessons: data ?? [],
    isLoading,
    isError: error,
    mutate,
  };
}

/* =========================
   CHAPTERS BY COURSE
========================= */
import { getChaptersByCourse } from "@/hooks/chapters/getChapters";

export function useChaptersByCourse(courseId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    courseId ? ["chapters", courseId] : null,
    async () => {
      const res = await getChaptersByCourse(courseId);
      return res.sort((a, b) => a.ordering - b.ordering);
    }
  );

  return {
    chapters: data ?? [],
    isLoading,
    isError: error,
    mutate,
  };
}