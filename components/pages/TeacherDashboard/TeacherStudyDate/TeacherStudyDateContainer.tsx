"use client";

import { useEffect, useState } from "react";

import BaseTeacherContainer from "../Base/BaseTeacherContainer";
import TeacherStudyDateCard from "./TeacherStudyDateCard";
import TeacherStudyDateModal from "./TeacherStudyDateModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import CreateStudyDateModal from "./CreateStudyDateModal";

import {
    StudyDateBE,
    deleteStudyDate,
    getStudyDates,
} from "@/hooks/study_dates/getStudyDates";

import { useCreateStudyDateByTeacher } from "@/hooks/study_dates/useCreateStudyDateByTeacher";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";
import { getCoursesByInstructor } from "@/hooks/course_instructors/getCourseInstructor";

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
    const { create, loading: creating } = useCreateStudyDateByTeacher();

    const [studyDates, setStudyDates] = useState<StudyDateBE[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [selectedDate, setSelectedDate] = useState<StudyDateBE | null>(null);

    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [myCourses, setMyCourses] = useState<string[]>([]);

    /* ===================== FETCH STUDY DATES ===================== */
    useEffect(() => {
        let mounted = true;

        async function fetchData() {
            try {
                setLoading(true);
                const data = await getStudyDates();

                if (!mounted) return;
                setStudyDates(data ?? []);
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

    /* ===================== FETCH COURSES BY INSTRUCTOR ===================== */
    useEffect(() => {
        if (!user?.id) return;

        const userId = user.id; // ✅ TS hiểu chắc chắn

        async function fetchMyCourses() {
            try {
                const data = await getCoursesByInstructor(userId);
                const ids = data.map((c) => c.course_id);
                setMyCourses(ids);
            } catch (err) {
                console.error("❌ Load instructor courses error:", err);
            }
        }

        fetchMyCourses();
    }, [user?.id]);

    /* ===================== MAP COURSE OPTIONS ===================== */
    const courseOptions = Object.values(coursesMap)
        .filter((c) => myCourses.includes(c.id))
        .map((c) => ({
            id: c.id,
            title: c.title,
        }));

    /* ===================== CREATE ===================== */
    const handleCreate = async (form: {
        title: string;
        location: string;
        scheduledAt: string;
        courseId: string;
    }) => {
        if (!user?.id) return;

        try {
            await create({
                title: form.title,
                scheduledAt: new Date(form.scheduledAt).toISOString(),
                location: form.location,
                courseId: form.courseId,
            });

            setOpenCreate(false);

            const data = await getStudyDates();
            setStudyDates(data ?? []);
        } catch (err) {
            console.error("❌ Create failed:", err);
        }
    };

    /* ===================== DELETE ===================== */
    const handleDelete = async () => {
        if (!selectedDate?.id) return;

        try {
            setDeleting(true);

            await deleteStudyDate(selectedDate.id);

            setOpenDelete(false);
            setSelectedDate(null);

            const data = await getStudyDates();
            setStudyDates(data ?? []);
        } catch (err) {
            console.error("❌ Delete failed:", err);
        } finally {
            setDeleting(false);
        }
    };

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
                    <div className="text-gray-400">Không có buổi học nào</div>
                )}

                {/* LIST */}
                {!loading && studyDates.length > 0 && (
                    <>
                        <div className="mb-6">
                            <button
                                onClick={() => setOpenCreate(true)}
                                className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                + Tạo buổi học
                            </button>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {studyDates.map((item) => {
                                const course = coursesMap[item.course_id];

                                return (
                                    <TeacherStudyDateCard
                                        key={item.id}
                                        studyDate={mapStudyDateBEToFE(item)}
                                        courseTitle={course?.title}
                                        onClick={() => setSelectedDate(item)}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </BaseTeacherContainer>

            {/* VIEW / MANAGE MODAL */}
            {selectedDate && (
                <TeacherStudyDateModal
                    studyDate={mapStudyDateBEToFE(selectedDate)}
                    onConfirm={() => { }}
                    onDelete={() => setOpenDelete(true)}
                    onClose={() => setSelectedDate(null)}
                />
            )}

            {/* CREATE MODAL */}
            <CreateStudyDateModal
                key={openCreate ? "open" : "closed"}
                open={openCreate}
                loading={creating}
                courses={courseOptions} // ✅ FIXED
                onConfirm={handleCreate}
                onClose={() => setOpenCreate(false)}
            />

            {/* DELETE CONFIRM */}
            <ConfirmDeleteModal
                open={openDelete}
                loading={deleting}
                onConfirm={handleDelete}
                onClose={() => setOpenDelete(false)}
            />
        </>
    );
}