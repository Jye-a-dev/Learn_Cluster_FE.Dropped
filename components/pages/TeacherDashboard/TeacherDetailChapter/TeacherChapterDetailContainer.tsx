"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Chapter, getChapter } from "@/hooks/chapters/getChapters";
import { LessonBE, getLessonsByChapter } from "@/hooks/lessons/getLesson";

import BaseTeacherContainer from "@/components/pages/TeacherDashboard/Base/BaseTeacherContainer";

import ChapterHeader from "./IdHeader";
import ChapterLessonList from "./List/IdChapterLessonList";
import BaseLoading from "../Base/BaseLoading";

/* =====================================
   Container
===================================== */
export default function TeacherChapterDetailContainer() {

  const params = useParams();

  const chapterId = params.id as string;

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [lessons, setLessons] = useState<LessonBE[]>([]);

  const [loading, setLoading] = useState(true);

  /* =====================================
     FETCH DATA
  ===================================== */
  useEffect(() => {

    if (!chapterId) return;

    const fetchData = async () => {

      try {

        const [chapterRes, lessonRes] = await Promise.all([
          getChapter(chapterId),
          getLessonsByChapter(chapterId),
        ]);

        setChapter(chapterRes);
        setLessons(lessonRes);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

    };

    fetchData();

  }, [chapterId]);

  /* =====================================
     LOADING
  ===================================== */
  if (loading) return <BaseLoading />;

  if (!chapter) {
    return (
      <div className="text-center text-gray-500">
        Chapter not found
      </div>
    );
  }

  /* =====================================
     UI
  ===================================== */
  return (
    <BaseTeacherContainer
      title={chapter.title}
      description="Quản lý nội dung chương"
    >

      <div className="space-y-8">

        <ChapterHeader chapter={chapter} />

        <ChapterLessonList
          chapterId={chapterId}
          lessons={lessons}
        />

      </div>

    </BaseTeacherContainer>
  );
}