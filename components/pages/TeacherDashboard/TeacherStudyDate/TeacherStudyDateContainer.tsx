"use client";

import { useEffect, useState } from "react";

import BaseTeacherContainer from "../Base/BaseTeacherContainer";
import TeacherStudyDateCard from "./TeacherStudyDateCard";
import TeacherStudyDateModal from "./TeacherStudyDateModal";

import {
    StudyDateBE,
    getStudyDates,
} from "@/hooks/study_dates/getStudyDates";

import { useCreateStudyDateByTeacher } from "@/hooks/study_dates/useCreateStudyDateByTeacher";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";

/* ===================== TYPE ===================== */
import type { StudyDate } from "@/hooks/study_dates/getStudyDates";

/* ===================== MAPPER ===================== */
function mapStudyDateBEToFE(item: StudyDateBE): StudyDate {
    return {
        id: item.id,
        title: item.title ?? "",
        location: item.location ?? "",
        scheduledAt: item.scheduled_at ?? "",
        courseId: item.course_id ?? "",
        createdBy: item.created_by ?? "",
    };
}

/* ===================== COMPONENT ===================== */
export default function TeacherStudyDateContainer() {
    const { user } = useCurrentUser();
    const { coursesMap, loading: loadingCourses } = useCoursesMap();

    const [studyDates, setStudyDates] = useState<StudyDateBE[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDate, setSelectedDate] = useState<StudyDateBE | null>(null);

    const { create, loading: creating } = useCreateStudyDateByTeacher();

    /* ===================== FETCH ===================== */
    useEffect(() => {
        let mounted = true;

        async function fetchData() {
            try {
                console.log("🚀 Fetching all study dates...");

                setLoading(true);

                const data = await getStudyDates();

                console.log("📦 API raw data:", data);

                if (!mounted) return;

                setStudyDates(data ?? []);

                console.log("✅ studyDates:", data ?? []);
            } catch (err) {
                console.error("❌ Load study dates error:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchData();

        return () => {
            mounted = false;
        };
    }, []);

    /* ===================== CREATE ===================== */
    async function handleCreate() {
        if (!user?.id) {
            console.log("⚠️ Missing user");
            return;
        }

        try {
            await create({
                title: "Buổi học mới",
                scheduledAt: new Date().toISOString(),
                location: "Phòng học",
                courseId: "",
            });

            setSelectedDate(null);

            setLoading(true);

            const data = await getStudyDates();

            setStudyDates(data ?? []);
        } catch (err) {
            console.error("❌ Create failed:", err);
        } finally {
            setLoading(false);
        }
    }

    /* ===================== RENDER ===================== */
    return (
        <>
            <BaseTeacherContainer
                title="Lịch học"
                description="Quản lý các buổi học"
            >
                {/* LOADING */}
                {(loading || loadingCourses) && (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="h-40 rounded-xl bg-emerald-900 animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {/* EMPTY */}
                {!loading && studyDates.length === 0 && (
                    <div className="text-gray-400">
                        Không có buổi học nào
                    </div>
                )}

                {/* LIST */}
                {!loading && studyDates.length > 0 && (
                    <>
                        <div className="mb-6">
                            <button
                                onClick={() =>
                                    setSelectedDate({
                                        id: "",
                                        course_id: "",
                                        title: "",
                                        location: "",
                                        scheduled_at: "",
                                        created_by: user?.id ?? "",
                                    })
                                }
                                className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                + Tạo buổi học
                            </button>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {studyDates.map((item) => {
                                const course = coursesMap[item.course_id];

                                console.log("🎯 Render item:", item);

                                return (
                                    <TeacherStudyDateCard
                                        key={item.id}
                                        studyDate={mapStudyDateBEToFE(item)}
                                        courseTitle={course?.title} // ✅ truyền title
                                        onClick={() => setSelectedDate(item)}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </BaseTeacherContainer>

            {/* MODAL */}
            {selectedDate && (
                <TeacherStudyDateModal
                    studyDate={mapStudyDateBEToFE(selectedDate)}
                    loading={creating}
                    onConfirm={handleCreate}
                    onClose={() => setSelectedDate(null)}
                />
            )}
        </>
    );
}