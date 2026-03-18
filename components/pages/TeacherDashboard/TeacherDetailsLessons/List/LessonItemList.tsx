"use client";

import BaseTeacherList from "@/components/pages/TeacherDashboard/Base/BaseTeacherList";
import { LessonBE } from "@/hooks/lessons/getLesson";

type Props = {
    lesson: LessonBE;
};

export default function LessonItemList({ lesson }: Props) {
    const items = [
        {
            label: "Content Type",
            value: lesson.content_type,
        },
        {
            label: "Content URL",
            value: lesson.content_url ? (
                <a
                    href={lesson.content_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block truncate text-blue-600 hover:underline"
                    title={lesson.content_url}
                >
                    {lesson.content_url}
                </a>
            ) : "No URL",
        },
        {
            label: "Order",
            value: lesson.ordering,
        },
    ];

    return (
        <div className="flex flex-col gap-4 w-full">
            <BaseTeacherList
                layout="grid"
                title="Lesson Info"
                items={items}
                emptyText="No data"
                renderItem={(item) => (
                    <div className="flex flex-col gap-2 w-full rounded-xl p-4 border border-gray-200 bg-white/60">
                        <div className="text-sm text-gray-500">{item.label}</div>
                        <div className="font-medium text-gray-800 wrap-break-word">
                            {item.value}
                        </div>
                    </div>
                )}
            />

            {/* Content Text riêng 1 hàng */}
            <div className="flex flex-col gap-2 w-full rounded-xl p-4 border border-gray-200 bg-white/60">
                <div className="text-sm text-gray-500">Content Text</div>
                <div className="font-medium text-gray-800 whitespace-pre-wrap">
                    {lesson.content_text || "No content"}
                </div>
            </div>
        </div>
    );
}