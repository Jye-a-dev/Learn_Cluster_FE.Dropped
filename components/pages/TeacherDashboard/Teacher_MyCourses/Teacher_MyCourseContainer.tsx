"use client";

import { useEffect, useState } from "react";
import { Course } from "@/hooks/courses/getCourse";
import { useCoursesMap } from "@/hooks/courses/useCoursesMap";
import { getCoursesByInstructor }
    from "@/hooks/course_instructors/getCourseInstructor ";
import { useCurrentUser } from "@/hooks/users/useCurrentUser";

import Teacher_MyCourseCard from "./Teacher_MyCourseCard";
import Teacher_MyCourseModal from "./Teacher_MyCourseModal";

export default function Teacher_MyCourseContainer() {
    const { user, loading: userLoading } = useCurrentUser();
    const { coursesMap, loading: coursesLoading } = useCoursesMap();

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    useEffect(() => {
        if (!user?.id || coursesLoading) return;

        const newUser = user

        async function fetchMyCourses() {
            try {
                const instructorRows = await getCoursesByInstructor(newUser.id);

                const myCourses: Course[] = instructorRows
                    .map((row) => coursesMap[row.course_id])
                    .filter(Boolean);

                setCourses(myCourses);
            } catch (err) {
                console.error("Lỗi tải course của teacher", err);
            } finally {
                setLoading(false);
            }
        }

        fetchMyCourses();
    }, [user?.id, coursesMap, coursesLoading, user]);

    const isLoading = loading || userLoading || coursesLoading;

    return (
        <>
            {/* HERO */}
            <section className="bg-gray-50/80 border-b">
                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <h1 className="text-4xl font-bold text-cyan-800 mb-4">
                        Khóa học tôi đang giảng dạy
                    </h1>

                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Danh sách các khóa học bạn đã đăng ký giảng dạy.
                    </p>
                </div>
            </section>

            {/* COURSE GRID */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                {isLoading && (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-48 rounded-xl bg-gray-100 animate-pulse" />
                        ))}
                    </div>
                )}

                {!isLoading && (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {courses.map((course) => (
                            <Teacher_MyCourseCard
                                key={course.id}
                                course={course}
                                onDetail={() => setSelectedCourse(course)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* MODAL */}
            {selectedCourse && (
                <Teacher_MyCourseModal
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                />
            )}
        </>
    );
}