"use client";

import { LessonBE } from "@/hooks/lessons/getLesson";
import LessonHeaderActions from "./LessonHeaderActions";

type Props = {
  lesson: LessonBE;
  onOpenEdit?: () => void;
  onOpenManage?: () => void;
};

export default function LessonHeader({
  lesson,
  onOpenEdit,
  onOpenManage,
}: Props) {

  const stats = [
    {
      label: "Type",
      value: lesson.content_type,
    },
    {
      label: "Order",
      value: lesson.ordering,
    },
  ];

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-8">

      <div className="flex items-start justify-between gap-6">

        <div>
          <h1 className="text-3xl font-bold text-cyan-100">
            {lesson.title}
          </h1>

        </div>

        <LessonHeaderActions
          onEdit={onOpenEdit}
          onManage={onOpenManage}
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8 text-sm">
        {stats.map((item) => (
          <div key={item.label} className="bg-white/50 rounded-lg p-4">
            <p className="text-cyan-700">{item.label}</p>
            <p className="text-lg font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>

    </div>
  );
}