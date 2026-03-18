"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import BaseTeacherContainer from "@/components/pages/TeacherDashboard/Base/BaseTeacherContainer";
import BaseLoading from "../Base/BaseLoading";

import LessonHeader from "./LessonHeader";
import LessonItemList from "./List/LessonItemList";
import EditLessonModal from "./Modal/EditLessonModal";

import { getLesson } from "@/hooks/lessons/getLesson";
import useSWR from "swr";

export default function TeacherLessonDetailContainer() {

  const params = useParams();
  const lessonId = params.id as string;

  const [openEdit, setOpenEdit] = useState(false);

  const { data: lesson, isLoading, mutate } = useSWR(
    lessonId ? ["lesson", lessonId] : null,
    () => getLesson(lessonId)
  );

  if (isLoading) return <BaseLoading />;

  if (!lesson) return <div>No lesson</div>;

  return (
    <BaseTeacherContainer
      title={lesson.title}
      description="Lesson detail"
    >
      <div className="space-y-8">

        <LessonHeader
          lesson={lesson}
          onOpenEdit={() => setOpenEdit(true)}
        />

        <LessonItemList lesson={lesson} />

      </div>

      <EditLessonModal
        open={openEdit}
        lesson={lesson}
        onClose={() => setOpenEdit(false)}
        onUpdated={() => mutate()}
      />

    </BaseTeacherContainer>
  );
}