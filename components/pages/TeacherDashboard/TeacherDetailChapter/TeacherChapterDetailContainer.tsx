"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ManageLessonsModal from "./Modal/ManageLessonsModal";
import { Chapter, getChapter } from "@/hooks/chapters/getChapters";
import { LessonBE, getLessonsByChapter } from "@/hooks/lessons/getLesson";

import BaseTeacherContainer from "@/components/pages/TeacherDashboard/Base/BaseTeacherContainer";
import EditChapterModal from "./Modal/EditChapterModal";
import ChapterHeader from "./IdHeader";
import ChapterLessonList from "./List/IdChapterLessonList";
import BaseLoading from "../Base/BaseLoading";

/* =====================================
   Container
===================================== */
export default function TeacherChapterDetailContainer() {

  const params = useParams();

  const chapterId = params.id as string;
  const [openManage, setOpenManage] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
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
        const chapterRes = await getChapter(chapterId);
        setChapter(chapterRes);

        const lessonRes = await getLessonsByChapter(chapterId);
        setLessons(lessonRes.sort((a, b) => a.ordering - b.ordering));
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

        <ChapterHeader
          chapter={chapter}
          onOpenEdit={() => setOpenEdit(true)}
          onOpenManage={() => setOpenManage(true)}
        />

        <ChapterLessonList
          chapterId={chapterId}
          lessons={lessons}
        />

      </div>

      <EditChapterModal
        open={openEdit}
        chapter={chapter}
        onClose={() => setOpenEdit(false)}
        onUpdated={(updated) => {
          setChapter(updated);
        }}
      />

      <ManageLessonsModal
        open={openManage}
        chapterId={chapterId}
        onClose={() => setOpenManage(false)}
      />

    </BaseTeacherContainer>
  );
}