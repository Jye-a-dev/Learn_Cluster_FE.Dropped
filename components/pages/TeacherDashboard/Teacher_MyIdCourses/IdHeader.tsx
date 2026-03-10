"use client";
import CourseHeaderActions from "./IdHeaderActions";
import { Course } from "@/hooks/courses/getCourse";
import { useInstructorCount } from "@/hooks/course_instructors/countCourseInstructor";
import { useStudentCountByCourse } from "@/hooks/enrollment/countStudentCountByCourse";
type Props = {
    course: Course;
    studentCount?: number;
    lessonCount?: number;
};

export default function CourseHeader({
    course,
    lessonCount = 0,
}: Props) {
    const studentCount = useStudentCountByCourse(course.id);
    const instructorCount = useInstructorCount(course.id);

    const stats = [
        { label: "Instructors", value: instructorCount },
        { label: "Students", value: studentCount },
        { label: "Lessons", value: lessonCount },
        {
            label: "Created",
            value: new Date(course.created_at ?? "").toLocaleDateString(),
        },
    ];

    return (
        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-8">

            {/* TITLE */}
            <div className="flex items-start justify-between gap-6">

                <div>
                    <h1 className="text-3xl font-bold text-cyan-100">
                        {course.title}
                    </h1>

                    <p className="mt-2 text-cyan-200 max-w-2xl">
                        {course.description}
                    </p>
                </div>

                <div className="flex gap-3">
                    <CourseHeaderActions
                        onEdit={() => console.log("Edit course")}
                        onManage={() => console.log("Manage content")}
                    />
                </div>

            </div>

            {/* COURSE META */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 text-sm">

                {stats.map((item) => (
                    <div key={item.label} className="bg-white/50 rounded-lg p-4">
                        <p className="text-cyan-700">{item.label}</p>
                        <p className="text-lg font-semibold text-white">
                            {item.value}
                        </p>
                    </div>
                ))}

            </div>

        </div>
    );
}