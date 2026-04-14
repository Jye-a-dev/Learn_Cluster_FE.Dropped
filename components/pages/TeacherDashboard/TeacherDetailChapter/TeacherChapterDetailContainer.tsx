"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import ManageLessonsModal from "./Modal/ManageLessonsModal";
import EditChapterModal from "./Modal/EditChapterModal";

import { useChapterDetail, useLessonsByChapter } from "@/hooks/chapters/useChapter_swr";
import BaseTeacherContainer from "@/components/pages/TeacherDashboard/Base/BaseTeacherContainer";
import ChapterHeader from "./IdHeader";
import ChapterLessonList from "./List/IdChapterLessonList";
import BaseLoading from "../Base/BaseLoading";
import TeacherEmptyState from "../Base/TeacherEmptyState";

/* =====================================
   Container
===================================== */
export default function TeacherChapterDetailContainer() {

  const params = useParams();
  const chapterId = params.id as string;
  
  const [openManage, setOpenManage] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  /* =====================================
     SWR DATA
  ===================================== */
  const {
    chapter,
    isLoading: chapterLoading,
    mutate: mutateChapter,
  } = useChapterDetail(chapterId);

  const {
    lessons,
    isLoading: lessonLoading,
    mutate: mutateLessons,
  } = useLessonsByChapter(chapterId);

  /* =====================================
     LOADING
  ===================================== */
  if (chapterLoading || lessonLoading) return <BaseLoading />;

  if (!chapter) {
    return (
      <BaseTeacherContainer
        title="Chapter detail"
        description="Manage the lesson structure inside this chapter."
      >
        <TeacherEmptyState
          title="Chapter not found"
          description="This chapter may have been deleted, or it is no longer reachable from your current teaching workflow."
        />
      </BaseTeacherContainer>
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

      {/* EDIT CHAPTER */}
      <EditChapterModal
        open={openEdit}
        chapter={chapter}
        onClose={() => setOpenEdit(false)}
        onUpdated={() => {
          mutateChapter();
        }}
      />

      {/* MANAGE LESSON */}
      <ManageLessonsModal
        open={openManage}
        chapterId={chapterId}
        onClose={() => setOpenManage(false)}
        onUpdated={() => {
          mutateLessons();
        }}
      />

    </BaseTeacherContainer>
  );
}
